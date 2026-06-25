import fs from 'node:fs';
import vm from 'node:vm';

const BASE_URL = process.env.RAT_BASE_URL || 'https://reel-adventure-operations-app.onrender.com';
const MODE = process.argv[2] || 'viator';
const MODES = {
  latest: { label: 'latest bookings', maxResults: 50, q: 'newer_than:365d ("New booking" OR "Ext. booking ref" OR "Product booking ref" OR "Booking Reference" OR "Viator booking" OR "VIA-" OR "REE-T" OR reservation OR confirmation)' },
  all: { label: 'all booking history', maxResults: 2000, q: '("New booking" OR "Updated booking" OR "Cancelled booking" OR "Ext. booking ref" OR "Product booking ref" OR "Booking Reference" OR "Viator booking" OR "Booking details" OR "VIA-" OR "REE-T" OR "BR-")' },
  june: { label: 'June tours', maxResults: 75, q: 'newer_than:365d (June OR Jun OR ".Jun" OR "6/" OR "06/" OR "2026-06" OR "Viator booking" OR "New booking" OR "Ext. booking ref" OR "REE-T")' },
  viator: { label: 'Viator booking refs', maxResults: 75, q: 'newer_than:365d ("New booking" OR "Ext. booking ref" OR "Product booking ref" OR "Viator booking" OR "Booking Reference" OR "VIA-" OR "REE-T" OR "BR-")' }
};

const mode = MODES[MODE] || MODES.viator;
if (process.env.RAT_SYNC_MAX_RESULTS) mode.maxResults = Number(process.env.RAT_SYNC_MAX_RESULTS) || mode.maxResults;
const appCode = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');

const elementStub = () => ({
  innerHTML: '',
  textContent: '',
  value: '',
  hidden: false,
  classList: { add() {}, remove() {}, toggle() {} },
  appendChild() {},
  insertAdjacentHTML() {},
  querySelector() { return null; },
  querySelectorAll() { return []; },
  addEventListener() {},
  setAttribute() {},
  removeAttribute() {},
  scrollIntoView() {}
});

const storage = new Map();
const context = {
  console,
  fetch,
  URL,
  URLSearchParams,
  Date,
  Math,
  structuredClone: globalThis.structuredClone,
  setTimeout,
  clearTimeout,
  navigator: {
    onLine: true,
    serviceWorker: { register: async () => ({}) }
  },
  window: {
    addEventListener() {},
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    open() {},
    location: { origin: BASE_URL }
  },
  document: {
    addEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    getElementById() { return elementStub(); },
    createElement() { return elementStub(); },
    body: elementStub(),
    activeElement: null
  },
  localStorage: {
    getItem: (key) => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key)
  }
};

context.window.document = context.document;
context.window.localStorage = context.localStorage;
context.window.navigator = context.navigator;

vm.createContext(context);
vm.runInContext(appCode, context, { filename: 'app.js' });

const syncCode = `
(async () => {
  const storeResponse = await fetch('${BASE_URL}/api/store', { cache: 'no-store' });
  const storePayload = await storeResponse.json();
  if (!storeResponse.ok || storePayload.error) throw new Error(storePayload.error || 'Could not load store');
  store = migrateStore(storePayload.store || {});
  if (${process.env.RAT_RESET_GMAIL_GENERATED ? 'true' : 'false'}) {
    store.trips = [];
    store.gmailImports = [];
    store.autoOpsRuns = [];
    store.whatsappQueue = [];
    store.customerProfiles = [];
  }
  const owner = (store.users || []).find((user) => user.name === 'Eugene' && user.role === 'Owner') || (store.users || [])[0];
  if (owner) store.activeUserId = owner.id;
  store.integrationStatus = { ...(store.integrationStatus || {}), gmailConnected: true };
  store.gmailOAuthStatus = 'Connected';

  const params = new URLSearchParams({ maxResults: '${mode.maxResults}', q: ${JSON.stringify(mode.q)} });
  const gmailResponse = await fetch('${BASE_URL}/api/gmail/sync?' + params.toString(), { cache: 'no-store' });
  const gmailPayload = await gmailResponse.json();
  if (!gmailResponse.ok || gmailPayload.error) throw new Error(gmailPayload.error || 'Gmail sync failed');

  const existing = new Map((store.gmailImports || []).map((item) => [item.emailId || item.gmailMessageId, item]));
  let created = 0;
  let refreshed = 0;
  for (const message of (gmailPayload.messages || [])) {
    const parsed = parseGmailImportText(message.rawText || message.snippet || '', message.subject || 'Live Gmail Message');
    const current = existing.get(message.id);
    if (current) {
      const beforeMissing = missingGmailImportFields(current).length;
      Object.entries(parsed.fields).forEach(([key, value]) => {
        const currentValue = String(current[key] || '').trim();
        if (value && (!currentValue || currentValue === 'erence' || currentValue === 'and' || currentValue === 'details' || currentValue === 'using')) current[key] = value;
      });
      current.confidenceScores = { ...(current.confidenceScores || {}), ...parsed.confidenceScores };
      current.confidenceScore = Math.max(Number(current.confidenceScore || 0), parsed.confidenceScore);
      current.rawMessagePreview = String(message.rawText || message.snippet || current.rawMessagePreview || '').slice(0, 1200);
      enrichGmailImportAi(current);
      if (missingGmailImportFields(current).length < beforeMissing) {
        current.importStatus = missingGmailImportFields(current).length ? 'Needs Review' : 'New';
        refreshed += 1;
      }
      continue;
    }
    const item = enrichGmailImportAi({
      id: makeId('gmail-email'),
      emailId: message.id,
      gmailMessageId: message.id,
      threadId: message.threadId || '',
      ...parsed.fields,
      source: parsed.fields.source === 'Unknown' ? 'Live Gmail API' : parsed.fields.source,
      sender: parsed.fields.sender || message.sender || '',
      subject: parsed.fields.subject || message.subject || '',
      receivedDate: parsed.fields.receivedDate || message.receivedDate || '',
      rawMessagePreview: String(message.rawText || message.snippet || '').slice(0, 1200),
      importStatus: missingGmailImportFields(parsed.fields).length ? 'Needs Review' : 'New',
      confidenceScore: parsed.confidenceScore,
      confidenceScores: parsed.confidenceScores,
      extractionMethod: 'Live Gmail API',
      extractionWarning: '',
      createdAt: new Date().toISOString(),
      reviewRequired: true
    });
    item.possibleDuplicates = gmailDuplicateMatches(item).map(({ id, type, matchCount }) => ({ id, type, matchCount }));
    store.gmailImports.unshift(item);
    existing.set(message.id, item);
    created += 1;
  }

  store.lastSyncTime = gmailPayload.updatedAt || new Date().toISOString();
  store.syncCursor = 'Direct Gmail ${mode.label} sync imported ' + created + ' new message(s) and refreshed ' + refreshed + ' existing record(s)';
  const autoResults = runAutoOpsForGmailImports({ silent: true });
  addAudit('synced', 'Gmail Import', store.syncCursor + '; Auto Operations created ' + autoResults.length + ' calendar item(s).', { mode: '${MODE}', count: created, refreshed, autoCalendarCount: autoResults.length });
  store.updatedAt = new Date().toISOString();

  const saveResponse = await fetch('${BASE_URL}/api/store', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ store, clientUpdatedAt: store.updatedAt, user: currentUserLabel() })
  });
  const savePayload = await saveResponse.json();
  if (!saveResponse.ok || savePayload.error) throw new Error(savePayload.error || 'Could not save store');

  return {
    mode: '${MODE}',
    gmailMessages: (gmailPayload.messages || []).length,
    created,
    refreshed,
    autoCalendarCreated: autoResults.length,
    gmailImports: (savePayload.store.gmailImports || []).length,
    trips: (savePayload.store.trips || []).length,
    juneTrips: (savePayload.store.trips || []).filter((trip) => String(trip.tripDate || '').startsWith('2026-06-')).length,
    years: [...new Set((savePayload.store.trips || []).map((trip) => String(trip.tripDate || '').slice(0, 4)).filter(Boolean))].sort(),
    sampleTrips: (savePayload.store.trips || []).slice(0, 8).map((trip) => ({ date: trip.tripDate, time: trip.startTime, customer: trip.customer, ref: trip.bookingReference, source: trip.bookingSource }))
  };
})()
`;

const result = await vm.runInContext(syncCode, context, { timeout: 120000 });
console.log(JSON.stringify(result, null, 2));
