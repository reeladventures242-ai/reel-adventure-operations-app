const STORE_KEY = 'rat_ops_v1_store';
const STORE_VERSION = 6;

const navItems = [
  ['dashboard', '🏠', 'Dashboard'], ['bookings', '📘', 'Bookings'], ['invoices', '🧾', 'Invoices'],
  ['trips', '🧭', 'Trips'], ['vessels', '⛵', 'Vessels'], ['crew', '👥', 'Crew'],
  ['payroll', '💸', 'Payroll'], ['expenses', '💳', 'Expenses'], ['inventory', '📦', 'Inventory'],
  ['pre-trip-checklist', '✅', 'Pre Trip Checklist'], ['post-trip-checklist', '🧽', 'Post Trip Checklist'],
  ['cruise-schedule', '🚢', 'Cruise Schedule'], ['reports', '📊', 'Reports'],
  ['notifications', '🔔', 'Notifications'], ['audit', '🧾', 'Audit Trail'], ['settings', '⚙️', 'Settings']
];

const legacyTools = [
  { title: 'Legacy Booking Dashboard', file: 'reel_adventure_tours_dashboard.html', desc: 'Original cruise schedule and booking tracking board.' },
  { title: 'Customer Invoice / Booking Tool', file: 'customer-invoice.html', desc: 'Existing customer invoice and tour booking HTML tool.' },
  { title: 'Legacy Operations v5', file: 'ReelAdventureTours_App_v5.html', desc: 'Existing payroll, trip, expense, reimbursement, export, and reporting app.' },
  { title: 'Pre Trip Vessel Check', file: 'RAT-PreTrip-VesselCheck.html', desc: 'Existing pre-trip checklist workflow.' },
  { title: 'Post Trip Vessel Check', file: 'RAT-PostTrip-VesselCheck.html', desc: 'Existing post-trip checklist workflow.' }
];

const voiceFieldAliases = {
  customer: ['customer', 'customer name', 'guest name', 'client name'],
  phone: ['phone', 'phone number', 'telephone', 'contact number', 'cell number'],
  email: ['email', 'email address'],
  guests: ['guests', 'guest count', 'number of guests', 'passengers', 'party size'],
  passengers: ['guests', 'guest count', 'number of guests', 'passengers', 'party size'],
  captain: ['captain', 'assigned captain', 'boat captain'],
  mate: ['mate', 'assigned mate', 'crew mate'],
  vessel: ['vessel', 'boat', 'assigned boat'],
  depositPaid: ['deposit', 'deposit paid', 'amount paid'],
  balanceDue: ['balance', 'balance due', 'remaining balance'],
  balance: ['balance', 'balance due', 'remaining balance'],
  tourType: ['tour type', 'tour package', 'package', 'trip type'],
  product: ['tour type', 'tour package', 'package', 'trip type', 'product'],
  departureTime: ['departure time', 'start time', 'trip time', 'pickup time'],
  startTime: ['departure time', 'start time', 'trip time', 'pickup time'],
  notes: ['notes', 'special notes', 'customer notes', 'trip notes', 'captain notes', 'mate notes', 'owner notes', 'crew notes'],
  amount: ['amount', 'expense amount', 'cost'],
  incident: ['incident', 'incident report', 'issue'],
  status: ['status', 'trip status'],
  date: ['date', 'trip date'],
  tripDate: ['date', 'trip date'],
  time: ['time', 'trip time', 'pickup time'],
  owner: ['owner', 'vessel owner']
};

const supportedVoiceRoutes = new Set(['bookings', 'trips', 'expenses', 'reports', 'pre-trip-checklist', 'post-trip-checklist', 'vessels', 'crew']);

const seedData = {
  roles: [
    { id: 'role-owner', name: 'Owner' },
    { id: 'role-captain', name: 'Captain' },
    { id: 'role-mate', name: 'Mate' },
    { id: 'role-bookkeeper', name: 'Bookkeeper' }
  ],
  bookingSources: [
    { id: 'source-website', name: 'Website' },
    { id: 'source-viator', name: 'Viator' },
    { id: 'source-tripadvisor', name: 'TripAdvisor' },
    { id: 'source-getyourguide', name: 'GetYourGuide' },
    { id: 'source-boatbooker', name: 'BoatBooker' },
    { id: 'source-airbnb', name: 'Airbnb' },
    { id: 'source-facebook', name: 'Facebook' },
    { id: 'source-whatsapp', name: 'WhatsApp' },
    { id: 'source-direct-booking', name: 'Direct Booking' },
    { id: 'source-travel-agent', name: 'Travel Agent' },
    { id: 'source-referral', name: 'Referral' }
  ],
  standardPayoutRates: [
    { id: 'standard-captain', role: 'Captain', fourHourTrip: 120, hourlyRate: 30 },
    { id: 'standard-mate', role: 'Mate', fourHourTrip: 50, hourlyRate: 12.5 }
  ],
  vesselOwnerPayoutRates: [
    { id: 'owner-walter', owner: 'Walter', fourHourTrip: 700, hourlyRate: 175, rule: '$700 for 4 hour trip; $175 per hour' },
    { id: 'owner-ryan', owner: 'Ryan', fourHourTrip: 750, hourlyRate: 187.5, rule: '$750 for 4 hour trip; $187.50 per hour' },
    { id: 'owner-toons', owner: 'Toons', fourHourTrip: 700, hourlyRate: 175, rule: '$700 for 4 hour trip; $175 per hour' },
    { id: 'owner-eddie', owner: 'Eddie', oneToEightGuests: 700, nineToTenGuests: 800, hourlyRate: 175, rule: '$700 for 1-8 guests; $800 for 9-10 guests; $175 per hour' },
    { id: 'owner-mr-pat', owner: 'Mr. Pat', fourHourTrip: 700, hourlyRate: 175, rule: '$700 for 4 hour trip; $175 per hour' }
  ],
  vessels: [
    { id: 'vessel-rat-1', name: 'Reel Adventure Tours I', model: "29' Seabird", owner: 'Eugene', capacity: 12, status: '', notes: '' },
    { id: 'vessel-rat-2', name: 'Reel Adventure Tours II', model: "26' Mako", owner: 'Walter', capacity: 12, status: '', notes: '' },
    { id: 'vessel-century-26', name: "26' Century", model: "26' Century", owner: 'Toons', capacity: 10, status: '', notes: '' },
    { id: 'vessel-century-30', name: "30' Century", model: "30' Century", owner: 'Bain', capacity: 12, status: '', notes: '' },
    { id: 'vessel-donzi-29', name: "29' Donzi", model: "29' Donzi", owner: 'Ryan', capacity: 11, status: '', notes: '' },
    { id: 'vessel-performance-32', name: "32' Performance", model: "32' Performance", owner: 'Eddie', capacity: 12, status: '', notes: '' },
    { id: 'vessel-sea-chaser-25', name: "25' Sea Chaser", model: "25' Sea Chaser", owner: 'Mr. Pat', capacity: 8, status: '', notes: '' },
    { id: 'vessel-scarab-30', name: "30' Scarab", model: "30' Scarab", owner: 'Mr. Pat', capacity: 12, status: '', notes: '' }
  ],
  crew: [
    { id: 'crew-eugene', name: 'Eugene', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-dj', name: 'DJ', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-phillip', name: 'Phillip', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-curry', name: 'Curry', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-bain', name: 'Bain', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-laquan', name: 'Laquan', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-rick', name: 'Rick', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-curry-daughter', name: 'Curry Daughter', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-eddie', name: 'Eddie', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-walter', name: 'Walter', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-ryan', name: 'Ryan', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-toons', name: 'Toons', role: '', phone: '', email: '', active: 'Yes', notes: '' },
    { id: 'crew-mr-pat', name: 'Mr. Pat', role: '', phone: '', email: '', active: 'Yes', notes: '' }
  ],
  bookings: [],
  trips: [],
  payrollPayments: [],
  notifications: [],
  auditTrail: []
};

const crudConfig = {
  bookings: {
    title: 'Bookings', eyebrow: 'Simple CRUD', summary: 'Create, read, update, and delete booking records in local storage while the legacy booking dashboard remains available.', collection: 'bookings', addLabel: 'Add booking',
    fields: [['order','Order #','text'], ['customer','Customer','text'], ['date','Trip date','date'], ['time','Time','time'], ['guests','Guests','number'], ['product','Product','text'], ['source','Source','select:bookingSources'], ['balance','Balance due','number'], ['status','Status','select:bookingStatus'], ['notes','Notes','textarea']],
    columns: [['order','Order'], ['customer','Customer'], ['date','Date'], ['guests','Guests'], ['product','Product'], ['source','Source'], ['balance','Balance']]
  },
  trips: {
    title: 'Trips', eyebrow: 'Daily operations', summary: 'Create trips, assign vessels and crew, detect assignment conflicts, and calculate separated owner/captain/mate payroll.', collection: 'trips', addLabel: 'Create trip',
    fields: [['customer','Customer name','text'], ['phone','Phone number','tel'], ['email','Email','email'], ['bookingSource','Booking source','select:bookingSources'], ['tourType','Tour type','text'], ['tripDate','Date','date'], ['startTime','Start time','time'], ['departureTime','Departure time','time'], ['passengers','Guest count','number'], ['hours','Hours','number'], ['tourPrice','Tour price','number'], ['depositPaid','Deposit paid','number'], ['balanceDue','Balance due','number'], ['vessel','Assigned vessel','select:vessels'], ['captain','Assigned captain','select:crew'], ['mate','Assigned mate','select:crewOptional'], ['status','Trip status','select:tripStatus'], ['notes','Notes','textarea']],
    columns: [['tripDate','Date'], ['startTime','Time'], ['customer','Customer'], ['passengers','Guests'], ['tourType','Tour'], ['bookingSource','Source'], ['tourPrice','Price'], ['depositPaid','Deposit'], ['balanceDue','Balance'], ['vessel','Vessel'], ['captain','Captain'], ['mate','Mate'], ['status','Status']]
  },
  crew: {
    title: 'Crew', eyebrow: 'Simple CRUD', summary: 'Maintain the seeded crew roster, roles, and active status in the new app data layer.', collection: 'crew', addLabel: 'Add crew',
    fields: [['name','Name','text'], ['role','Role','text'], ['phone','Phone','tel'], ['email','Email','email'], ['active','Active','select:yesNo'], ['notes','Notes','textarea']],
    columns: [['name','Name'], ['role','Role'], ['phone','Phone'], ['email','Email'], ['active','Active'], ['notes','Notes']]
  },
  vessels: {
    title: 'Vessels', eyebrow: 'Simple CRUD', summary: 'Manage boats and owner payout defaults from the documented legacy payout rules.', collection: 'vessels', addLabel: 'Add vessel',
    fields: [['name','Vessel name','text'], ['model','Model','text'], ['owner','Owner','select:owners'], ['capacity','Capacity','number'], ['status','Status','text'], ['notes','Notes','textarea']],
    columns: [['name','Vessel'], ['model','Model'], ['owner','Owner'], ['capacity','Capacity'], ['status','Status'], ['notes','Notes']]
  }
};

let store = loadStore();
let currentRoute = 'dashboard';
let editing = {};
let deferredInstallPrompt = null;
let voiceRecognition = null;
let voiceSession = null;
let dispatchView = 'tree';
let dispatchFilter = { date: '', time: '' };

function loadStore() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) return seedStore();
  try {
    const parsed = JSON.parse(raw);
    return migrateStore(parsed);
  } catch (error) {
    console.warn('Resetting invalid local data', error);
    return seedStore();
  }
}

function seedStore(existing = {}) {
  const next = migrateStore({ ...structuredClone(seedData), ...existing });
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}

function migrateStore(existing = {}) {
  const next = { ...structuredClone(seedData), ...existing, version: STORE_VERSION, updatedAt: existing.updatedAt || new Date().toISOString() };
  next.payrollPayments = Array.isArray(next.payrollPayments) ? next.payrollPayments : [];
  next.notifications = Array.isArray(next.notifications) ? next.notifications : [];
  next.auditTrail = Array.isArray(next.auditTrail) ? next.auditTrail : [];
  next.trips = (Array.isArray(next.trips) ? next.trips : []).map((trip) => ({
    ...trip,
    bookingSource: trip.bookingSource || trip.source || '',
    depositPaid: Number(trip.depositPaid || 0),
    balanceDue: Number(trip.balanceDue ?? trip.balance ?? 0),
    passengers: Number(trip.passengers ?? trip.guests ?? 0),
    hours: Number(trip.hours || 4),
    tourType: trip.tourType || trip.product || '',
    departureTime: trip.departureTime || trip.startTime || '',
    status: trip.status || 'Scheduled'
  }));
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}

function saveStore() {
  store.updatedAt = new Date().toISOString();
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function currentUserLabel() {
  return document.getElementById('activeRole')?.textContent || document.getElementById('roleSelect')?.value || 'Demo user';
}

function summarizeRecord(record = {}) {
  return record.customer || record.name || record.order || record.id || 'record';
}

function addAudit(action, area, detail, metadata = {}) {
  store.auditTrail = Array.isArray(store.auditTrail) ? store.auditTrail : [];
  store.auditTrail.unshift({ id: makeId('audit'), at: new Date().toISOString(), user: currentUserLabel(), action, area, detail, metadata });
  store.auditTrail = store.auditTrail.slice(0, 250);
}

function addNotification(title, message, level = 'info', metadata = {}) {
  store.notifications = Array.isArray(store.notifications) ? store.notifications : [];
  store.notifications.unshift({ id: makeId('notice'), at: new Date().toISOString(), title, message, level, read: false, metadata });
  store.notifications = store.notifications.slice(0, 100);
}

function unreadNotificationCount() {
  return (store.notifications || []).filter((notice) => !notice.read).length;
}

function money(value) { return Number(value || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: Number(value || 0) % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
function byDate(a, b) { return String(a.date || a.tripDate).localeCompare(String(b.date || b.tripDate)); }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
function makeId(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`; }
function getOptions(kind) {
  const maps = {
    bookingSources: store.bookingSources.map((s) => s.name),
    bookingStatus: ['Inquiry', 'Deposit paid', 'Balance due', 'Paid in full', 'Cancelled'],
    tripStatus: ['Scheduled', 'Completed', 'Needs review', 'Cancelled'],
    yesNo: ['Yes', 'No'],
    owners: [...new Set([...store.vessels.map((v) => v.owner), ...store.vesselOwnerPayoutRates.map((r) => r.owner)])].filter(Boolean),
    vessels: store.vessels.map((v) => v.name),
    crew: store.crew.filter((c) => c.active !== 'No').map((c) => c.name),
    crewOptional: ['None', ...store.crew.filter((c) => c.active !== 'No').map((c) => c.name)]
  };
  return maps[kind] || [];
}

function init() {
  renderNav();
  wireEvents();
  renderRoute('dashboard');
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js').catch(console.warn);
}

function renderNav() {
  document.getElementById('primaryNav').innerHTML = navItems.map(([route, icon, label]) => `
    <button class="nav-link" data-route="${route}"><span class="nav-icon">${icon}</span><span>${label}</span></button>
  `).join('');
}

function wireEvents() {
  document.getElementById('enterAppBtn').addEventListener('click', () => {
    document.getElementById('loginScreen').hidden = true;
    document.getElementById('appShell').hidden = false;
    document.getElementById('activeRole').textContent = document.getElementById('roleSelect').value;
    toast('Demo role selected. Real authentication is intentionally not enabled yet.');
  });
  document.getElementById('menuBtn').addEventListener('click', toggleSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);
  document.body.addEventListener('click', (event) => {
    const routeBtn = event.target.closest('[data-route]');
    if (routeBtn) renderRoute(routeBtn.dataset.route);
    const legacyEmbed = event.target.closest('[data-embed-legacy]');
    if (legacyEmbed) embedLegacy(legacyEmbed.dataset.embedLegacy);
    const voiceButton = event.target.closest('[data-voice-fill]');
    if (voiceButton) startVoiceFill(voiceButton);
    if (event.target.closest('[data-export-store]')) exportStoreData();
    if (event.target.closest('[data-reset-store]')) { addAudit('reset', 'Settings', 'Reset local data to seed defaults.'); localStorage.removeItem(STORE_KEY); store = seedStore({ auditTrail: store.auditTrail, notifications: store.notifications }); renderRoute(currentRoute); toast('Seed data restored.'); }
    const dispatchViewButton = event.target.closest('[data-dispatch-view]');
    if (dispatchViewButton) { dispatchView = dispatchViewButton.dataset.dispatchView; renderAssignmentBoard(); }
    const dispatchDate = event.target.closest('[data-dispatch-date]');
    if (dispatchDate && !dispatchDate.dataset.dispatchTime) { dispatchFilter = { date: dispatchDate.dataset.dispatchDate, time: '' }; renderAssignmentBoard(); }
    const dispatchTime = event.target.closest('[data-dispatch-time]');
    if (dispatchTime) { dispatchFilter = { date: dispatchTime.dataset.dispatchDate, time: dispatchTime.dataset.dispatchTime }; renderAssignmentBoard(); }
    if (event.target.closest('[data-dispatch-clear]')) { dispatchFilter = { date: '', time: '' }; renderAssignmentBoard(); }
    if (event.target.closest('[data-voice-accept]')) event.target.closest('[data-voice-confirmation]').hidden = true;
    const voiceRetry = event.target.closest('[data-voice-retry]');
    if (voiceRetry) startVoiceFill(voiceRetry.closest('form').querySelector('[data-voice-fill]'));
    const voiceClear = event.target.closest('[data-voice-clear]');
    if (voiceClear) { const form = voiceClear.closest('form'); const field = form?.elements[voiceClear.dataset.voiceClear]; if (field) field.value = ''; voiceClear.closest('[data-voice-confirmation]').hidden = true; }
    if (event.target.closest('[data-mark-notices-read]')) markNotificationsRead();
  });
  document.body.addEventListener('change', (event) => {
    if (event.target.matches('[data-import-store]')) importStoreData(event.target.files[0]);
  });
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    const button = document.getElementById('installBtn');
    button.hidden = false;
    button.onclick = async () => { deferredInstallPrompt.prompt(); deferredInstallPrompt = null; button.hidden = true; };
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const open = !sidebar.classList.contains('open');
  sidebar.classList.toggle('open', open);
  document.getElementById('sidebarOverlay').classList.toggle('open', open);
  document.getElementById('menuBtn').setAttribute('aria-expanded', String(open));
}
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('open'); document.getElementById('menuBtn').setAttribute('aria-expanded', 'false'); }

function renderRoute(route) {
  currentRoute = route;
  closeSidebar();
  document.querySelectorAll('.page').forEach((page) => page.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.dataset.route === route));
  const page = document.getElementById(`page-${route}`);
  if (!page) return;
  page.classList.add('active');
  const nav = navItems.find(([key]) => key === route);
  document.getElementById('pageTitle').textContent = nav ? nav[2] : 'Legacy Tools';
  if (crudConfig[route]) renderCrud(route);
  else if (route === 'dashboard') renderDashboard();
  else if (route === 'payroll') renderPayroll();
  else if (route === 'notifications') renderNotifications();
  else if (route === 'audit') renderAuditTrail();
  else if (route === 'legacy') renderLegacy();
  else if (['expenses', 'reports', 'pre-trip-checklist', 'post-trip-checklist'].includes(route)) renderOperationalVoicePage(route);
  else renderPlaceholder(route);
}

function renderDashboard() {
  const upcomingBookings = store.bookings.filter((b) => b.status !== 'Cancelled').sort(byDate).slice(0, 4);
  const scheduledTrips = store.trips.filter((t) => t.status === 'Scheduled').sort(byDate);
  const totalBalance = store.bookings.reduce((sum, b) => sum + Number(b.balance || 0), 0) + store.trips.reduce((sum, t) => sum + Number(t.balanceDue || 0), 0);
  const payroll = payrollEntries();
  const outstandingPayroll = payroll.reduce((sum, entry) => sum + entry.outstanding, 0);
  document.getElementById('page-dashboard').innerHTML = `
    <div class="page-stack">
      <div class="section-heading"><div><p class="eyebrow">Phase 3A operations</p><h1>Daily trip operations dashboard</h1><p class="section-summary">Create trips, assign vessels and crew, monitor balances, and calculate weekly owner/captain/mate payroll while keeping all legacy HTML tools intact.</p></div><button class="btn btn-primary" data-route="trips">Create / assign trips</button></div>
      <div class="grid kpi-grid dashboard-kpis">
        ${kpi('Active bookings', store.bookings.length, `${money(totalBalance)} total balances`)}
        ${kpi('Scheduled trips', scheduledTrips.length, 'Assignment board ready')}
        ${kpi('Payroll owed', money(outstandingPayroll), 'Outstanding by role')}
        ${kpi('Crew', store.crew.length, `${store.roles.length} documented roles`)}
        ${kpi('Unread alerts', unreadNotificationCount(), `${(store.auditTrail || []).length} audit entries`)}
      </div>
      <div class="grid dashboard-grid">
        <div class="card"><div class="card-header"><h3>Upcoming bookings</h3><button class="btn btn-outline btn-small" data-route="bookings">View all</button></div><div class="stat-list">${upcomingBookings.map((b) => `<div class="stat-row"><span>${escapeHtml(b.date)} · ${escapeHtml(b.time)}</span><strong>${escapeHtml(b.customer)}<br><small>${escapeHtml(b.product)} · ${b.guests} guests</small></strong></div>`).join('')}</div></div>
        <div class="card"><div class="card-header"><h3>Payout setup</h3><span class="badge gold">Documented data</span></div><div class="stat-list">
          <div class="stat-row"><span>Owner payout rules</span><strong>${store.vesselOwnerPayoutRates.length} documented</strong></div>
          <div class="stat-row"><span>Standard crew rates</span><strong>${store.standardPayoutRates.length} documented</strong></div>
          <div class="stat-row"><span>Booking sources</span><strong>${store.bookingSources.length} documented</strong></div>
          <div class="stat-row"><span>Roles / crew</span><strong>${store.roles.length} / ${store.crew.length}</strong></div>
        </div></div>
      </div>
      <div class="card"><div class="card-header"><h3>Legacy tools</h3><button class="btn btn-outline btn-small" data-route="legacy">Open tools</button></div><div class="legacy-list">${legacyTools.map((tool) => `<div class="legacy-tool"><h3>${tool.title}</h3><p>${tool.desc}</p><div class="legacy-actions"><a class="btn btn-outline btn-small" href="${tool.file}" target="_blank" rel="noopener">Open link</a><button class="btn btn-primary btn-small" data-route="legacy" data-embed-legacy="${tool.file}">Embed</button></div></div>`).join('')}</div></div>
    </div>`;
}
function kpi(label, value, sub) { return `<div class="card kpi"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${sub}</div></div>`; }

function renderCrud(route) {
  const config = crudConfig[route];
  const page = document.getElementById(`page-${route}`);
  const template = document.getElementById('crudPageTemplate').content.cloneNode(true);
  template.querySelector('.eyebrow').textContent = config.eyebrow;
  template.querySelector('h1').textContent = config.title;
  template.querySelector('.section-summary').textContent = config.summary;
  template.querySelector('.add-record-btn').textContent = config.addLabel;
  template.querySelector('.add-record-btn').onclick = () => showForm(route);
  template.querySelector('.card-header h3').textContent = `${config.title} records`;
  template.querySelector('thead').innerHTML = `<tr>${config.columns.map(([, label]) => `<th>${label}</th>`).join('')}<th>Actions</th></tr>`;
  page.innerHTML = '';
  page.appendChild(template);
  page.querySelector('.search-input').addEventListener('input', () => renderTable(route));
  renderForm(route);
  if (route === 'trips') renderAssignmentBoard();
  if (route === 'crew') renderCrewDashboard();
  renderTable(route);
}

function renderForm(route, record = {}) {
  const config = crudConfig[route];
  const form = document.querySelector(`#page-${route} .record-form`);
  form.dataset.voiceRoute = route;
  form.innerHTML = `${renderVoiceFillPanel(route)}<div class="form-grid">${config.fields.map(([key, label, type]) => renderField(key, label, type, record[key])).join('')}</div>${route === 'trips' ? '<div class="conflict-panel" data-conflict-panel hidden></div>' : ''}<div class="form-actions"><button class="btn btn-primary" type="submit">Save ${config.title.slice(0, -1)}</button><button class="btn btn-outline" type="button" data-cancel>Cancel</button></div>`;
  if (route === 'trips') {
    form.addEventListener('input', () => updateTripConflictPreview(form));
    form.addEventListener('change', (event) => {
      if (['tourPrice', 'depositPaid'].includes(event.target.name)) updateBalanceDue(form);
    });
  }
  form.onsubmit = (event) => saveRecord(event, route);
  form.querySelector('[data-cancel]').onclick = () => { editing[route] = null; form.hidden = true; };
}

function renderVoiceFillPanel(route) {
  if (!supportedVoiceRoutes.has(route)) return '';
  return `<div class="voice-fill-panel" data-voice-panel><div><strong>Speak to Fill</strong><p>Say a field name first, then say the value. Example: “Customer Name” then “Crystal Belle”.</p><p class="voice-status" data-voice-status>Field Command Mode is selected by default.</p></div><div class="voice-actions"><select data-voice-mode aria-label="Voice fill mode"><option value="command">Field Command Mode</option><option value="natural">Natural Sentence Mode</option></select><button class="btn btn-primary" type="button" data-voice-fill>🎙️ Voice Fill</button></div><div class="voice-confirmation" data-voice-confirmation hidden></div></div>`;
}

function renderField(key, label, type, value = '') {
  const aliases = fieldAliasesFor(key, label).join('|');
  const voiceAttrs = `data-voice-field="${key}" data-voice-label="${escapeHtml(label)}" data-voice-aliases="${escapeHtml(aliases)}"`;
  if (type === 'textarea') return `<div class="field"><label for="${key}">${label}</label><textarea id="${key}" name="${key}" ${voiceAttrs}>${escapeHtml(value)}</textarea></div>`;
  if (type.startsWith('select:')) {
    const options = getOptions(type.split(':')[1]);
    return `<div class="field"><label for="${key}">${label}</label><select id="${key}" name="${key}" ${voiceAttrs}><option value="">— Select —</option>${options.map((opt) => `<option value="${escapeHtml(opt)}" ${String(value) === String(opt) ? 'selected' : ''}>${escapeHtml(opt)}</option>`).join('')}</select></div>`;
  }
  return `<div class="field"><label for="${key}">${label}</label><input id="${key}" name="${key}" type="${type}" value="${escapeHtml(value)}" ${voiceAttrs}></div>`;
}

function showForm(route, id = null) {
  const config = crudConfig[route];
  const record = id ? store[config.collection].find((item) => item.id === id) : {};
  editing[route] = id;
  renderForm(route, record);
  const form = document.querySelector(`#page-${route} .record-form`);
  form.hidden = false;
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function saveRecord(event, route) {
  event.preventDefault();
  const config = crudConfig[route];
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  config.fields.forEach(([key,, type]) => { if (type === 'number') data[key] = Number(data[key] || 0); });
  if (route === 'trips') {
    const missing = missingTripAssignmentFields(data);
    if (missing.length) {
      showTripAssignmentWarning(event.currentTarget, 'Assignment details required', missing);
      toast('Select vessel, captain, mate, date, and start time before saving.');
      return;
    }
    const conflicts = findTripConflicts(data, editing[route]);
    if (conflicts.length) {
      showTripConflicts(event.currentTarget, conflicts);
      addNotification('Assignment conflict blocked', `${data.vessel || 'A vessel'} or crew is already booked for ${data.tripDate || 'the selected date'}.`, 'critical', { route, customer: data.customer });
      addAudit('blocked', 'Trips', `Prevented overlapping assignment for ${data.customer || 'new trip'}.`, { conflicts: conflicts.length });
      saveStore();
      toast('Assignment conflict found. Resolve before saving.');
      return;
    }
    data.status = data.status || 'Scheduled';
    data.payroll = calculateTripPayroll(data);
  }
  const action = editing[route] ? 'updated' : 'created';
  if (editing[route]) {
    store[config.collection] = store[config.collection].map((item) => item.id === editing[route] ? { ...item, ...data } : item);
  } else {
    store[config.collection].push({ id: makeId(config.collection), ...data });
  }
  addAudit(action, config.title, `${config.title.slice(0, -1)} ${summarizeRecord(data)} ${action}.`, { route });
  if (route === 'trips') addNotification('Trip saved', `${data.customer || 'A trip'} is ${data.status || 'Scheduled'} for ${formatDate(data.tripDate)}.`, 'success', { route });
  editing[route] = null;
  saveStore();
  renderCrud(route);
  toast(`${config.title.slice(0, -1)} saved locally.`);
}

function deleteRecord(route, id) {
  const config = crudConfig[route];
  if (!confirm(`Delete this ${config.title.slice(0, -1).toLowerCase()}?`)) return;
  const record = store[config.collection].find((item) => item.id === id);
  store[config.collection] = store[config.collection].filter((item) => item.id !== id);
  addAudit('deleted', config.title, `${config.title.slice(0, -1)} ${summarizeRecord(record)} deleted.`, { route });
  addNotification(`${config.title.slice(0, -1)} deleted`, `${summarizeRecord(record)} was removed from ${config.title}.`, 'warning', { route });
  saveStore();
  if (route === 'trips') renderAssignmentBoard();
  if (route === 'crew') renderCrewDashboard();
  renderTable(route);
  toast(`${config.title.slice(0, -1)} deleted locally.`);
}

function renderTable(route) {
  const config = crudConfig[route];
  const page = document.getElementById(`page-${route}`);
  const query = page.querySelector('.search-input')?.value?.toLowerCase() || '';
  const rows = store[config.collection].filter((item) => JSON.stringify(item).toLowerCase().includes(query));
  const tbody = page.querySelector('tbody');
  tbody.innerHTML = rows.length ? rows.map((item) => `<tr>${config.columns.map(([key]) => `<td>${formatCell(key, item[key])}</td>`).join('')}<td><div class="row-actions"><button class="btn btn-outline btn-small" onclick="showForm('${route}','${item.id}')">Edit</button><button class="btn btn-danger btn-small" onclick="deleteRecord('${route}','${item.id}')">Delete</button></div></td></tr>`).join('') : `<tr><td colspan="${config.columns.length + 1}" class="empty-state">No records found.</td></tr>`;
}
function formatCell(key, value) {
  if (['balance', 'tourPrice', 'depositPaid', 'balanceDue', 'defaultPayout'].includes(key)) return value === '' || value == null ? '—' : money(value);
  if (key === 'status') return `<span class="badge blue">${escapeHtml(value || '—')}</span>`;
  if (key === 'active') return `<span class="badge ${value === 'Yes' ? 'green' : 'red'}">${escapeHtml(value || '—')}</span>`;
  return escapeHtml(value || '—');
}

function tripWindow(trip) {
  if (!trip.tripDate || !trip.startTime) return null;
  const start = new Date(`${trip.tripDate}T${trip.startTime}`);
  if (Number.isNaN(start.getTime())) return null;
  const hours = Number(trip.hours || 4) || 4;
  return { start, end: new Date(start.getTime() + hours * 60 * 60 * 1000) };
}

function windowsOverlap(a, b) {
  return a && b && a.start < b.end && b.start < a.end;
}

function crewAssignmentsForTrip(trip) {
  return [
    trip.captain ? { role: 'Captain', name: trip.captain } : null,
    trip.mate && trip.mate !== 'None' ? { role: 'Mate', name: trip.mate } : null
  ].filter(Boolean);
}

function crewNamesForTrip(trip) {
  return crewAssignmentsForTrip(trip).map((assignment) => assignment.name);
}

function describeTripWindow(trip) {
  const window = tripWindow(trip);
  if (!window) return `${trip.tripDate || 'No date'} · ${trip.startTime || 'No time'}`;
  return `${trip.tripDate} · ${trip.startTime}–${window.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
}

function findTripConflicts(candidate, excludeId = null) {
  const candidateWindow = tripWindow(candidate);
  if (!candidateWindow) return [];
  const candidateCrew = crewAssignmentsForTrip(candidate);
  return store.trips.flatMap((trip) => {
    if (trip.id === excludeId || trip.status === 'Cancelled' || !windowsOverlap(candidateWindow, tripWindow(trip))) return [];
    const conflicts = [];
    if (candidate.vessel && candidate.vessel === trip.vessel) conflicts.push({ type: 'Vessel', name: candidate.vessel, trip });
    const existingCrew = crewAssignmentsForTrip(trip);
    candidateCrew.forEach((assignment) => {
      if (existingCrew.some((existing) => existing.name === assignment.name)) conflicts.push({ type: assignment.role, name: assignment.name, trip });
    });
    return conflicts;
  });
}

function showTripConflicts(form, conflicts) {
  const panel = form.querySelector('[data-conflict-panel]');
  if (!panel) return;
  panel.hidden = false;
  panel.innerHTML = `<strong>Assignment conflict detected</strong><p>Resolve these overlapping vessel or crew assignments before saving this trip.</p><ul>${conflicts.map((conflict) => `<li>${escapeHtml(conflict.type)} <strong>${escapeHtml(conflict.name)}</strong> is already assigned to ${escapeHtml(conflict.trip.customer || 'another trip')} (${escapeHtml(describeTripWindow(conflict.trip))}).</li>`).join('')}</ul>`;
}

function showTripAssignmentWarning(form, title, messages) {
  const panel = form.querySelector('[data-conflict-panel]');
  if (!panel) return;
  panel.hidden = false;
  panel.innerHTML = `<strong>${escapeHtml(title)}</strong><ul>${messages.map((message) => `<li>${escapeHtml(message)}</li>`).join('')}</ul>`;
}

function missingTripAssignmentFields(data) {
  const missing = [];
  if (!data.customer) missing.push('Customer name is required.');
  if (!data.phone) missing.push('Phone number is required.');
  if (!data.email) missing.push('Email is required.');
  if (!data.bookingSource) missing.push('Booking source is required.');
  if (!data.tripDate) missing.push('Trip date is required for assignment conflict checks.');
  if (!data.startTime) missing.push('Start time is required for assignment conflict checks.');
  if (!Number(data.passengers)) missing.push('Guest count is required.');
  if (!Number(data.hours)) missing.push('Hours are required.');
  if (!data.vessel) missing.push('Select a vessel for this trip.');
  if (!data.captain) missing.push('Select a captain for this trip.');
  if (!data.mate || data.mate === 'None') missing.push('Select a mate for this trip.');
  return missing;
}

function updateTripConflictPreview(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  data.hours = Number(data.hours || 0);
  const conflicts = findTripConflicts(data, editing.trips);
  const panel = form.querySelector('[data-conflict-panel]');
  if (!panel) return;
  if (conflicts.length) showTripConflicts(form, conflicts);
  else {
    panel.hidden = true;
    panel.innerHTML = '';
  }
}

function renderAssignmentBoard() {
  const page = document.getElementById('page-trips');
  if (!page) return;
  let board = page.querySelector('[data-assignment-board]');
  if (!board) {
    board = document.createElement('div');
    board.className = 'card assignment-board';
    board.dataset.assignmentBoard = 'true';
    page.querySelector('.record-form').after(board);
  }
  const trips = filteredDispatchTrips();
  board.innerHTML = `<div class="card-header dispatch-header"><div><h3>Dispatch Board</h3><p class="muted-text">Tree View is the default for fast assignment clarity.</p></div><div class="dispatch-toggle" role="group" aria-label="Dispatch view"><button class="btn ${dispatchView === 'tree' ? 'btn-primary' : 'btn-outline'} btn-small" data-dispatch-view="tree">Tree View</button><button class="btn ${dispatchView === 'card' ? 'btn-primary' : 'btn-outline'} btn-small" data-dispatch-view="card">Card View</button></div></div>${dispatchFilter.date || dispatchFilter.time ? `<div class="dispatch-filter"><span>Filtered to ${escapeHtml([dispatchFilter.date, dispatchFilter.time].filter(Boolean).join(' · '))}</span><button class="btn btn-outline btn-small" data-dispatch-clear>Clear filter</button></div>` : ''}${dispatchView === 'tree' ? renderDispatchTree(trips) : renderDispatchCardList(trips)}`;
}

function filteredDispatchTrips() {
  return [...store.trips]
    .filter((trip) => trip.status !== 'Cancelled')
    .filter((trip) => !dispatchFilter.date || trip.tripDate === dispatchFilter.date)
    .filter((trip) => !dispatchFilter.time || trip.startTime === dispatchFilter.time)
    .sort((a, b) => String((a.tripDate || '') + (a.startTime || '')).localeCompare(String((b.tripDate || '') + (b.startTime || ''))));
}

function renderDispatchCardList(trips) {
  const buckets = ['Today', 'Tomorrow', 'This Week', 'Future'];
  const grouped = buckets.reduce((acc, bucket) => ({ ...acc, [bucket]: [] }), {});
  trips.forEach((trip) => grouped[tripBucket(trip)].push(trip));
  return `<div class="assignment-list">${trips.length ? buckets.map((bucket) => renderAssignmentBucket(bucket, grouped[bucket])).join('') : '<div class="empty-state">No trips assigned yet. Create a trip with a vessel, captain, mate, date, and start time to populate the board.</div>'}</div>`;
}

function renderDispatchTree(trips) {
  if (!trips.length) return '<div class="dispatch-tree empty-state">No trips assigned yet. Create a trip to populate the Dispatch Tree View.</div>';
  const byDate = groupBy(trips, (trip) => trip.tripDate || 'No date');
  return `<div class="dispatch-tree" data-dispatch-tree>${Object.entries(byDate).map(([date, dateTrips]) => renderDispatchDateNode(date, dateTrips)).join('')}</div>`;
}

function renderDispatchDateNode(date, trips) {
  const byTime = groupBy(trips, (trip) => trip.startTime || 'No time');
  return `<section class="dispatch-date-node"><button class="dispatch-date-box" data-dispatch-date="${escapeHtml(date)}"><strong>${escapeHtml(formatFullDate(date))}</strong>${renderDaySummary(trips)}</button><div class="dispatch-time-branch">${Object.entries(byTime).map(([time, timeTrips]) => renderDispatchTimeNode(date, time, timeTrips)).join('')}</div></section>`;
}

function renderDispatchTimeNode(date, time, trips) {
  return `<section class="dispatch-time-node"><button class="dispatch-time-box" data-dispatch-date="${escapeHtml(date)}" data-dispatch-time="${escapeHtml(time)}">${escapeHtml(formatTime(time))}</button><div class="dispatch-trip-branch">${trips.map(renderDispatchTripCard).join('')}</div></section>`;
}

function renderDispatchTripCard(trip) {
  const vessel = store.vessels.find((item) => item.name === trip.vessel);
  const owner = vessel?.owner || 'Unassigned';
  const statuses = dispatchStatuses(trip);
  const readiness = dispatchReadiness(trip, statuses);
  return `<article class="dispatch-trip-card ${readiness.className}" data-trip-id="${escapeHtml(trip.id || '')}"><button class="dispatch-trip-title" onclick="showForm('trips','${escapeHtml(trip.id || '')}')"><strong>${escapeHtml(trip.customer || 'Unassigned customer')} – ${Number(trip.passengers || 0)} Guests</strong><span>${escapeHtml(trip.tourType || trip.product || 'Tour type needed')} · ${escapeHtml(trip.bookingSource || 'No booking source')}</span></button><div class="dispatch-trip-meta"><span>Trip Date <strong>${escapeHtml(formatDate(trip.tripDate))}</strong></span><span>Start <strong>${escapeHtml(formatTime(trip.startTime))}</strong></span><span>Depart <strong>${escapeHtml(formatTime(trip.departureTime || trip.startTime))}</strong></span><span>Status <strong>${escapeHtml(trip.status || 'Scheduled')}</strong></span><span>Deposit <strong>${money(trip.depositPaid)}</strong></span><span>Balance <strong>${money(trip.balanceDue)}</strong></span><span>Dispatch Readiness <strong>${escapeHtml(readiness.label)}</strong></span></div>${renderAssignmentStrip(trip, owner)}<div class="dispatch-status-grid">${statuses.map((status) => renderStatusBox(status, trip)).join('')}</div></article>`;
}

function renderAssignmentStrip(trip, owner) {
  return `<div class="assignment-strip"><button class="assignment-person ${statusClass(trip.vessel ? 'ready' : 'missing')}" data-route="vessels"><span>⛵ VESSEL</span><strong>${escapeHtml(trip.vessel || 'Unassigned')}</strong><em>${trip.vessel ? 'Ready' : 'Not Ready'}</em></button><button class="assignment-person ${statusClass(owner !== 'Unassigned' ? 'ready' : 'pending')}" data-route="crew"><span>👤 OWNER</span><strong>${escapeHtml(owner)}</strong><em>${owner !== 'Unassigned' ? 'Acknowledged' : 'Pending'}</em></button><button class="assignment-person ${statusClass(trip.captain ? 'ready' : 'missing')}" data-route="crew"><span>🧢 CAPTAIN</span><strong>${escapeHtml(trip.captain || 'Unassigned')}</strong><em>${trip.captain ? 'Accepted' : 'Pending'}</em></button><button class="assignment-person ${statusClass(trip.mate && trip.mate !== 'None' ? 'ready' : 'missing')}" data-route="crew"><span>⚓ MATE</span><strong>${escapeHtml(trip.mate && trip.mate !== 'None' ? trip.mate : 'Unassigned')}</strong><em>${trip.mate && trip.mate !== 'None' ? 'Accepted' : 'Pending'}</em></button></div>`;
}

function dispatchStatuses(trip) {
  const conflicts = findTripConflicts(trip, trip.id);
  return [
    { label: 'Vessel Ready', state: trip.vessel ? 'ready' : 'missing', route: 'vessels' },
    { label: 'Captain Accepted', state: trip.captain ? 'ready' : 'pending', route: 'crew' },
    { label: 'Mate Accepted', state: trip.mate && trip.mate !== 'None' ? 'ready' : 'pending', route: 'crew' },
    { label: 'Pre Trip Complete', state: trip.preTripComplete === 'Yes' ? 'complete' : 'pending', route: 'pre-trip-checklist' },
    { label: 'Post Trip Pending', state: trip.postTripComplete === 'Yes' ? 'complete' : 'pending', route: 'post-trip-checklist' },
    { label: Number(trip.balanceDue || 0) > 0 ? 'Payment Balance Due' : 'Payment Complete', state: Number(trip.balanceDue || 0) > 0 ? 'pending' : 'complete', route: 'payroll' },
    { label: payrollEntries().some((entry) => entry.trip.id === trip.id && entry.outstanding > 0) ? 'Payroll Pending' : 'Payroll Complete', state: payrollEntries().some((entry) => entry.trip.id === trip.id && entry.outstanding > 0) ? 'pending' : 'complete', route: 'payroll' },
    { label: conflicts.length ? 'Conflict Detected' : 'No Conflicts', state: conflicts.length ? 'conflict' : 'ready', route: 'trips' }
  ];
}

function dispatchReadiness(trip, statuses = dispatchStatuses(trip)) {
  if (trip.status === 'Cancelled') return { label: 'Cancelled', className: 'is-cancelled' };
  if (statuses.some((status) => ['missing', 'conflict'].includes(status.state))) return { label: 'Not Ready', className: 'is-not-ready' };
  if (statuses.some((status) => status.state === 'pending')) return { label: 'Needs Attention', className: 'needs-attention' };
  return { label: 'Fully Ready', className: 'is-ready' };
}

function renderStatusBox(status) {
  return `<button class="status-box ${statusClass(status.state)}" data-route="${escapeHtml(status.route)}"><span>${escapeHtml(status.label)}</span></button>`;
}

function statusClass(state) {
  return ({ ready: 'status-green', complete: 'status-blue', pending: 'status-yellow', missing: 'status-red', conflict: 'status-red', cancelled: 'status-gray' })[state] || 'status-yellow';
}

function renderDaySummary(trips) {
  const ready = trips.filter((trip) => dispatchReadiness(trip).label === 'Fully Ready').length;
  const conflicts = trips.filter((trip) => findTripConflicts(trip, trip.id).length).length;
  const unassigned = trips.filter((trip) => !trip.vessel || !trip.captain || !trip.mate || trip.mate === 'None').length;
  const balances = trips.reduce((sum, trip) => sum + Number(trip.balanceDue || 0), 0);
  const needs = trips.length - ready;
  return `<span class="day-summary"><b>${trips.length}</b> Total Trips <b>${ready}</b> Fully Ready <b>${needs}</b> Needs Attention <b>${unassigned}</b> Unassigned <b>${conflicts}</b> Conflicts <b>${money(balances)}</b> Outstanding Balances</span>`;
}

function groupBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] ||= [];
    acc[key].push(item);
    return acc;
  }, {});
}

function formatFullDate(dateText) {
  return dateText && dateText !== 'No date' ? new Date(`${dateText}T00:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'No date';
}

function renderAssignmentBucket(bucket, trips) {
  return `<section class="assignment-bucket"><h4>${escapeHtml(bucket)}</h4>${trips.length ? trips.map(renderAssignmentTrip).join('') : '<p class="empty-state">No trips in this group.</p>'}</section>`;
}

function renderAssignmentTrip(trip) {
  const payroll = trip.payroll || calculateTripPayroll(trip);
  return `<div class="assignment-item"><div><strong>${escapeHtml(trip.customer || 'Unassigned customer')}</strong><span>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(formatTime(trip.startTime))} · ${Number(trip.hours || 4)} hrs</span><span>${escapeHtml(trip.bookingSource || 'No source')} · ${Number(trip.passengers || 0)} guests · Status: ${escapeHtml(trip.status || 'Scheduled')}</span><span>Phone: ${escapeHtml(trip.phone || '—')} · Email: ${escapeHtml(trip.email || '—')}</span><span>${trip.notes ? `Notes: ${escapeHtml(trip.notes)}` : ''}</span></div><div class="assignment-detail-grid"><span class="badge blue">${escapeHtml(trip.vessel || 'No vessel')}</span><span class="badge green">Captain: ${escapeHtml(trip.captain || 'Unassigned')}</span><span class="badge gold">Mate: ${escapeHtml(trip.mate || 'None')}</span><span>Tour: <strong>${money(trip.tourPrice)}</strong></span><span>Deposit: <strong>${money(trip.depositPaid)}</strong></span><span>Balance: <strong>${money(trip.balanceDue)}</strong></span><span>Payroll: ${payroll.map((entry) => `${escapeHtml(entry.role)} ${money(entry.amount)}`).join(' · ')}</span></div></div>`;
}


function updateBalanceDue(form) {
  const tourPrice = Number(form.elements.tourPrice?.value || 0);
  const depositPaid = Number(form.elements.depositPaid?.value || 0);
  if (form.elements.balanceDue) form.elements.balanceDue.value = Math.max(tourPrice - depositPaid, 0).toFixed(2).replace(/\.00$/, '');
}

function sameDate(a, b) { return a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10); }
function startOfDay(date) { const next = new Date(date); next.setHours(0, 0, 0, 0); return next; }
function addDays(date, days) { const next = new Date(date); next.setDate(next.getDate() + days); return next; }
function startOfWeekSunday(date) { const next = startOfDay(date); next.setDate(next.getDate() - next.getDay()); return next; }
function parseTripDate(trip) { return trip.tripDate ? startOfDay(new Date(`${trip.tripDate}T00:00:00`)) : null; }
function formatDate(dateText) { return dateText ? new Date(`${dateText}T00:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'No date'; }
function formatTime(timeText) { return timeText || 'No time'; }

function tripBucket(trip, today = startOfDay(new Date())) {
  const tripDate = parseTripDate(trip);
  if (!tripDate) return 'Future';
  const tomorrow = addDays(today, 1);
  const weekEnd = addDays(startOfWeekSunday(today), 7);
  if (sameDate(tripDate, today)) return 'Today';
  if (sameDate(tripDate, tomorrow)) return 'Tomorrow';
  if (tripDate >= today && tripDate < weekEnd) return 'This Week';
  return 'Future';
}

function calculateTripPayroll(trip) {
  const hours = Number(trip.hours || 4) || 4;
  const passengers = Number(trip.passengers || 0);
  const vessel = store.vessels.find((item) => item.name === trip.vessel);
  const owner = vessel?.owner || '';
  const captainRate = store.standardPayoutRates.find((rate) => rate.role === 'Captain');
  const mateRate = store.standardPayoutRates.find((rate) => rate.role === 'Mate');
  const ownerRate = store.vesselOwnerPayoutRates.find((rate) => rate.owner === owner);
  const roleEntries = [];
  const captainAmount = hours === 4 ? captainRate?.fourHourTrip || 120 : hours * (captainRate?.hourlyRate || 30);
  const mateAmount = hours === 4 ? mateRate?.fourHourTrip || 50 : hours * (mateRate?.hourlyRate || 12.5);
  if (owner) roleEntries.push({ person: owner, role: 'Owner', amount: calculateOwnerPay(ownerRate, hours, passengers), vessel: trip.vessel, rule: ownerRate?.rule || 'No owner payout rule configured' });
  if (trip.captain) roleEntries.push({ person: trip.captain, role: 'Captain', amount: captainAmount, vessel: trip.vessel, rule: hours === 4 ? '4 hour trip = $120' : '$30/hour' });
  if (trip.mate && trip.mate !== 'None') roleEntries.push({ person: trip.mate, role: 'Mate', amount: mateAmount, vessel: trip.vessel, rule: hours === 4 ? '4 hour trip = $50' : '$12.50/hour' });
  return roleEntries;
}

function calculateOwnerPay(rate, hours, passengers) {
  if (!rate) return 0;
  if (rate.owner === 'Eddie' && hours === 4) return passengers >= 9 ? rate.nineToTenGuests : rate.oneToEightGuests;
  return hours === 4 ? rate.fourHourTrip : hours * rate.hourlyRate;
}

function payrollEntries() {
  return store.trips.filter((trip) => trip.status !== 'Cancelled').flatMap((trip) => {
    const entries = trip.payroll || calculateTripPayroll(trip);
    return entries.map((entry, index) => {
      const key = `${trip.id || trip.tripDate}-${entry.person}-${entry.role}-${index}`;
      const payments = store.payrollPayments.filter((payment) => payment.entryKey === key);
      const amountPaid = payments.reduce((sum, payment) => sum + Number(payment.amountPaid || 0), 0);
      return { ...entry, key, trip, amountOwed: Number(entry.amount || 0), amountPaid, outstanding: Number(entry.amount || 0) - amountPaid, payments };
    });
  });
}

function payrollWeekLabel(dateText) {
  const date = dateText ? new Date(`${dateText}T00:00:00`) : new Date();
  const start = startOfWeekSunday(date);
  const end = addDays(start, 6);
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

function savePayrollPayment(event, entryKey) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const entry = payrollEntries().find((item) => item.key === entryKey);
  store.payrollPayments.push({ id: makeId('payroll-payment'), entryKey, amountPaid: Number(data.amountPaid || 0), datePaid: data.datePaid, paymentMethod: data.paymentMethod, paymentNotes: data.paymentNotes });
  addAudit('created', 'Payroll', `Recorded ${money(data.amountPaid)} payroll payment for ${entry?.person || 'crew'}.`, { entryKey });
  addNotification('Payroll payment recorded', `${money(data.amountPaid)} saved for ${entry?.person || 'crew'}.`, 'success', { entryKey });
  saveStore();
  renderPayroll();
  toast('Payroll payment saved.');
}

function renderPayroll() {
  const entries = payrollEntries();
  const grouped = entries.reduce((acc, entry) => {
    const week = payrollWeekLabel(entry.trip.tripDate);
    acc[week] ||= [];
    acc[week].push(entry);
    return acc;
  }, {});
  const totalOwed = entries.reduce((sum, entry) => sum + entry.amountOwed, 0);
  const totalPaid = entries.reduce((sum, entry) => sum + entry.amountPaid, 0);
  document.getElementById('page-payroll').innerHTML = `<div class="page-stack">
    <div class="section-heading"><div><p class="eyebrow">Sunday–Saturday payroll</p><h1>Weekly payroll engine</h1><p class="section-summary">Owner, captain, and mate payouts are calculated as separate role lines so the same person can be paid independently for multiple roles on one trip.</p></div><button class="btn btn-primary" data-route="trips">Create trip</button></div>
    <div class="grid kpi-grid">${kpi('Amount owed', money(totalOwed), 'All active trips')}${kpi('Amount paid', money(totalPaid), 'Recorded payments')}${kpi('Outstanding', money(totalOwed - totalPaid), 'Still due')}${kpi('Payment records', store.payrollPayments.length, 'Local history')}</div>
    ${Object.keys(grouped).length ? Object.entries(grouped).map(([week, weekEntries]) => renderPayrollWeek(week, weekEntries)).join('') : '<div class="card card-pad empty-state">No payroll yet. Create assigned trips to calculate weekly payouts.</div>'}
  </div>`;
}

function renderPayrollWeek(week, entries) {
  const owed = entries.reduce((sum, entry) => sum + entry.amountOwed, 0);
  const outstanding = entries.reduce((sum, entry) => sum + entry.outstanding, 0);
  return `<div class="card payroll-week"><div class="card-header"><h3>${escapeHtml(week)}</h3><span class="badge gold">${money(outstanding)} outstanding / ${money(owed)} owed</span></div><div class="responsive-table-wrap"><table><thead><tr><th>Trip</th><th>Person</th><th>Role</th><th>Amount owed</th><th>Paid</th><th>Outstanding</th><th>Record payment</th></tr></thead><tbody>${entries.map(renderPayrollRow).join('')}</tbody></table></div></div>`;
}

function renderPayrollRow(entry) {
  const history = entry.payments.length ? `<details><summary>${entry.payments.length} payment${entry.payments.length === 1 ? '' : 's'}</summary><ul>${entry.payments.map((payment) => `<li>${escapeHtml(payment.datePaid || 'No date')} · ${money(payment.amountPaid)} · ${escapeHtml(payment.paymentMethod || 'No method')} ${payment.paymentNotes ? `· ${escapeHtml(payment.paymentNotes)}` : ''}</li>`).join('')}</ul></details>` : '<span class="muted-text">No payments</span>';
  return `<tr><td>${escapeHtml(formatDate(entry.trip.tripDate))}<br><small>${escapeHtml(formatTime(entry.trip.startTime))} · ${escapeHtml(entry.trip.customer || 'No customer')} · ${escapeHtml(entry.trip.vessel || 'No vessel')}</small></td><td>${escapeHtml(entry.person || 'Unassigned')}</td><td><span class="badge blue">${escapeHtml(entry.role)}</span></td><td>${money(entry.amountOwed)}<br><small>${escapeHtml(entry.rule || '')}</small></td><td>${money(entry.amountPaid)}${history}</td><td><strong>${money(entry.outstanding)}</strong></td><td><form class="inline-payment-form" onsubmit="savePayrollPayment(event, decodeURIComponent('${encodeURIComponent(entry.key)}'))"><input name="amountPaid" type="number" min="0" step="0.01" value="${entry.outstanding > 0 ? entry.outstanding.toFixed(2) : 0}"><input name="datePaid" type="date"><select name="paymentMethod"><option value="Cash">Cash</option><option value="Zelle">Zelle</option><option value="Check">Check</option><option value="ACH">ACH</option><option value="Other">Other</option></select><input name="paymentNotes" type="text" placeholder="Notes"><button class="btn btn-primary btn-small" type="submit">Save</button></form></td></tr>`;
}

function renderCrewDashboard() {
  const page = document.getElementById('page-crew');
  const form = page.querySelector('.record-form');
  if (!form) return;
  let dashboard = page.querySelector('[data-crew-dashboard]');
  if (!dashboard) {
    dashboard = document.createElement('div');
    dashboard.className = 'card crew-dashboard';
    dashboard.dataset.crewDashboard = 'true';
    form.after(dashboard);
  }
  const selected = dashboard.querySelector('[data-crew-select]')?.value || getOptions('crew')[0] || '';
  const entries = payrollEntries().filter((entry) => entry.person === selected);
  const assignedTrips = store.trips.filter((trip) => trip.captain === selected || trip.mate === selected || store.vessels.find((vessel) => vessel.name === trip.vessel)?.owner === selected).sort(byDate);
  const outstanding = entries.reduce((sum, entry) => sum + entry.outstanding, 0);
  const history = entries.flatMap((entry) => entry.payments.map((payment) => ({ ...payment, entry })));
  dashboard.innerHTML = `<div class="card-header"><h3>Crew dashboard</h3><select data-crew-select onchange="renderCrewDashboard()">${getOptions('crew').map((name) => `<option value="${escapeHtml(name)}" ${name === selected ? 'selected' : ''}>${escapeHtml(name)}</option>`).join('')}</select></div><div class="crew-dashboard-body"><div><h4>Assigned trips</h4>${assignedTrips.length ? assignedTrips.map((trip) => `<div class="stat-row"><span>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(formatTime(trip.startTime))}</span><strong>${escapeHtml(trip.customer || 'No customer')}<br><small>${escapeHtml([trip.vessel, trip.captain === selected ? 'Captain' : '', trip.mate === selected ? 'Mate' : '', store.vessels.find((vessel) => vessel.name === trip.vessel)?.owner === selected ? 'Owner' : ''].filter(Boolean).join(' · '))}</small></strong></div>`).join('') : '<p class="empty-state">No assigned trips.</p>'}</div><div><h4>Outstanding pay</h4><div class="kpi-value">${money(outstanding)}</div>${entries.map((entry) => `<div class="stat-row"><span>${escapeHtml(entry.role)} · ${escapeHtml(formatDate(entry.trip.tripDate))}</span><strong>${money(entry.outstanding)}</strong></div>`).join('') || '<p class="empty-state">No outstanding pay.</p>'}</div><div><h4>Payment history</h4>${history.length ? history.map((payment) => `<div class="stat-row"><span>${escapeHtml(payment.datePaid || 'No date')} · ${escapeHtml(payment.paymentMethod || 'No method')}</span><strong>${money(payment.amountPaid)}<br><small>${escapeHtml(payment.paymentNotes || payment.entry.role)}</small></strong></div>`).join('') : '<p class="empty-state">No payment history.</p>'}</div></div>`;
}

function fieldAliasesFor(key, label = '') {
  return [...new Set([key, label, ...(voiceFieldAliases[key] || [])].filter(Boolean).map(normalizeVoiceText))];
}

function normalizeVoiceText(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function getVoiceFields(form) {
  return [...form.querySelectorAll('[data-voice-field]')].map((element) => ({
    element,
    key: element.name,
    label: element.dataset.voiceLabel || element.name,
    aliases: String(element.dataset.voiceAliases || '').split('|').filter(Boolean)
  }));
}

function findVoiceField(form, spokenField) {
  const phrase = normalizeVoiceText(spokenField);
  return getVoiceFields(form).find((field) => field.aliases.some((alias) => alias === phrase || phrase.includes(alias) || alias.includes(phrase)));
}

function startVoiceFill(button) {
  const form = button.closest('form');
  if (!form) return;
  const mode = form.querySelector('[data-voice-mode]')?.value || 'command';
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  voiceSession = { form, button, mode, step: mode === 'natural' ? 'natural' : 'field', selectedField: null };
  updateVoiceStatus(form, mode === 'natural' ? 'Listening. Say the full sentence with field names and values.' : 'Listening. Say the field name you want to fill.');
  if (!SpeechRecognition) {
    updateVoiceStatus(form, 'Voice recognition is not supported in this browser. You can still type manually.');
    toast('Voice fill is not supported in this browser.');
    return;
  }
  listenForVoiceCommand();
}

function listenForVoiceCommand() {
  if (!voiceSession) return;
  if (voiceRecognition) voiceRecognition.stop();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  voiceRecognition = new SpeechRecognition();
  voiceRecognition.continuous = false;
  voiceRecognition.interimResults = false;
  voiceRecognition.lang = 'en-US';
  voiceSession.button.textContent = 'Listening…';
  voiceRecognition.onresult = (event) => handleVoiceTranscript(event.results[0][0].transcript || '');
  voiceRecognition.onerror = () => updateVoiceStatus(voiceSession.form, 'Voice fill stopped before text was captured. Click Voice Fill to retry.');
  voiceRecognition.onend = () => { if (voiceSession?.button) voiceSession.button.textContent = '🎙️ Voice Fill'; voiceRecognition = null; };
  voiceRecognition.start();
}

function handleVoiceTranscript(transcript) {
  if (!voiceSession) return;
  if (voiceSession.mode === 'natural') {
    const filled = applyNaturalVoiceTranscript(voiceSession.form, transcript);
    updateVoiceStatus(voiceSession.form, filled.length ? `Filled ${filled.length} field${filled.length === 1 ? '' : 's'} from the sentence. Review before saving.` : 'No matching fields found. Try field command mode.');
    voiceSession = null;
    return;
  }
  if (voiceSession.step === 'field') {
    const field = findVoiceField(voiceSession.form, transcript);
    if (!field) {
      updateVoiceStatus(voiceSession.form, `Could not find “${transcript}”. Say a visible field label such as Customer Name or Phone Number.`);
      return;
    }
    voiceSession.selectedField = field;
    voiceSession.step = 'value';
    field.element.focus();
    updateVoiceStatus(voiceSession.form, `${field.label} selected. Now say the value.`);
    listenForVoiceCommand();
    return;
  }
  const field = voiceSession.selectedField;
  const value = formatVoiceValue(field.key, transcript);
  fillVoiceField(voiceSession.form, field, value);
  showVoiceConfirmation(voiceSession.form, field, value);
  updateVoiceStatus(voiceSession.form, `Filled ${field.label}: ${value}. Review and click Save when ready.`);
  voiceSession = null;
}

function fillVoiceField(form, field, value) {
  field.element.value = value;
  field.element.dispatchEvent(new Event('input', { bubbles: true }));
  field.element.dispatchEvent(new Event('change', { bubbles: true }));
  if (form.dataset.voiceRoute === 'trips') updateTripConflictPreview(form);
  addAudit('voice-fill', form.dataset.voiceRoute || currentRoute, `Voice fill set ${field.label}.`, { field: field.key });
}

function showVoiceConfirmation(form, field, value) {
  const panel = form.querySelector('[data-voice-confirmation]');
  if (!panel) return;
  panel.hidden = false;
  panel.innerHTML = `<strong>Filled ${escapeHtml(field.label)}: ${escapeHtml(value)}</strong><div class="voice-confirm-actions"><button class="btn btn-primary btn-small" type="button" data-voice-accept>Accept</button><button class="btn btn-outline btn-small" type="button" data-voice-retry>Retry</button><button class="btn btn-danger btn-small" type="button" data-voice-clear="${escapeHtml(field.key)}">Clear</button></div>`;
}

function updateVoiceStatus(form, message) {
  const status = form.querySelector('[data-voice-status]');
  if (status) status.textContent = message;
  toast(message);
}

function applyNaturalVoiceTranscript(form, transcript) {
  const filled = [];
  getVoiceFields(form).forEach((field) => {
    const value = extractNaturalFieldValue(transcript, field);
    if (value) {
      fillVoiceField(form, field, value);
      filled.push(field.label);
    }
  });
  if (filled.length) showVoiceConfirmation(form, { key: 'multiple', label: 'multiple fields' }, filled.join(', '));
  return filled;
}

function extractNaturalFieldValue(transcript, field) {
  const text = String(transcript || '');
  const lower = text.toLowerCase();
  for (const alias of field.aliases.sort((a, b) => b.length - a.length)) {
    const index = lower.indexOf(alias);
    if (index === -1) continue;
    const after = text.slice(index + alias.length).replace(/^\s*(is|are|equals|equal|:|-)?\s*/i, '');
    const stop = after.search(/,|;|\b(phone|email|customer|guest|guests|captain|mate|vessel|boat|deposit|balance|tour|package|notes|date|time|status)\b/i);
    const raw = (stop >= 0 ? after.slice(0, stop) : after).trim();
    if (raw) return formatVoiceValue(field.key, raw);
  }
  const guestMatch = lower.match(/\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(guests|passengers|people)\b/);
  if (['guests', 'passengers'].includes(field.key) && guestMatch) return String(wordNumberToDigit(guestMatch[1]) ?? guestMatch[1]);
  return '';
}

function formatVoiceValue(key, transcript) {
  if (['phone'].includes(key)) return formatPhoneVoiceValue(transcript);
  if (['guests', 'passengers'].includes(key)) return String(wordNumberToDigit(transcript) ?? transcript).replace(/\D+/g, '') || transcript;
  return String(transcript || '').trim().replace(/\s+/g, ' ');
}

function wordNumberToDigit(value) {
  const words = { zero: 0, oh: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12 };
  const normalized = normalizeVoiceText(value);
  if (/^\d+$/.test(normalized)) return Number(normalized);
  return words[normalized];
}

function formatPhoneVoiceValue(transcript) {
  const digitWords = { zero: '0', oh: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9' };
  const digits = normalizeVoiceText(transcript).split(' ').map((part) => digitWords[part] ?? part).join('').replace(/\D+/g, '');
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length === 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return digits || String(transcript || '').trim();
}


function exportStoreData() {
  const payload = JSON.stringify({ exportedAt: new Date().toISOString(), store }, null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `reel-adventure-operations-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  addAudit('exported', 'Settings', 'Exported local operations data.', { bytes: payload.length });
  addNotification('Export ready', 'Operations data was exported to a JSON file.', 'success');
  saveStore();
  renderRoute(currentRoute);
}

function importStoreData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      store = migrateStore(parsed.store || parsed);
      addAudit('imported', 'Settings', `Imported operations data from ${file.name}.`, { file: file.name });
      addNotification('Import complete', `${file.name} replaced the local operations data.`, 'success');
      saveStore();
      renderRoute(currentRoute);
      toast('Import complete. Local data updated.');
    } catch (error) {
      console.warn('Import failed', error);
      toast('Import failed. Choose a valid JSON export.');
    }
  };
  reader.onerror = () => toast('Import failed. Choose a valid JSON export.');
  reader.readAsText(file);
}

function renderNotifications() {
  const notices = store.notifications || [];
  document.getElementById('page-notifications').innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Operational alerts</p><h1>Notifications</h1><p class="section-summary">Local alerts are created for trip changes, assignment conflicts, payroll updates, export/import activity, and deletions.</p></div><button class="btn btn-outline" data-mark-notices-read>Mark all read</button></div><div class="card card-pad notice-list">${notices.length ? notices.map((notice) => `<div class="notice-item ${notice.read ? '' : 'unread'}"><span class="badge ${notice.level === 'critical' ? 'red' : notice.level === 'success' ? 'green' : 'gold'}">${escapeHtml(notice.level || 'info')}</span><div><strong>${escapeHtml(notice.title)}</strong><p>${escapeHtml(notice.message)}</p><small>${escapeHtml(new Date(notice.at).toLocaleString())}</small></div></div>`).join('') : '<p class="empty-state">No notifications yet.</p>'}</div></div>`;
}

function markNotificationsRead() {
  (store.notifications || []).forEach((notice) => { notice.read = true; });
  addAudit('updated', 'Notifications', 'Marked all notifications as read.');
  saveStore();
  renderNotifications();
  toast('Notifications marked read.');
}

function renderAuditTrail() {
  const entries = store.auditTrail || [];
  document.getElementById('page-audit').innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Change history</p><h1>Audit trail</h1><p class="section-summary">A local append-only history records creates, updates, deletes, payroll payments, conflict blocks, voice fill, and data transfers.</p></div></div><div class="card table-card"><div class="responsive-table-wrap"><table><thead><tr><th>Time</th><th>User</th><th>Area</th><th>Action</th><th>Detail</th></tr></thead><tbody>${entries.length ? entries.map((entry) => `<tr><td>${escapeHtml(new Date(entry.at).toLocaleString())}</td><td>${escapeHtml(entry.user)}</td><td>${escapeHtml(entry.area)}</td><td><span class="badge blue">${escapeHtml(entry.action)}</span></td><td>${escapeHtml(entry.detail)}</td></tr>`).join('') : '<tr><td colspan="5" class="empty-state">No audit events yet.</td></tr>'}</tbody></table></div></div></div>`;
}

const operationalVoiceForms = {
  expenses: {
    title: 'Expense Form',
    summary: 'Capture operating expenses while the legacy expense workflows remain linked.',
    fields: [['date', 'Date', 'date'], ['amount', 'Amount', 'number'], ['vessel', 'Vessel', 'select:vessels'], ['owner', 'Owner', 'select:owners'], ['notes', 'Notes', 'textarea']]
  },
  reports: {
    title: 'Incident Report Form',
    summary: 'Capture incident details with command voice fill before exporting or transferring to legacy reports.',
    fields: [['date', 'Date', 'date'], ['time', 'Time', 'time'], ['customer', 'Customer Name', 'text'], ['vessel', 'Vessel', 'select:vessels'], ['captain', 'Captain', 'select:crew'], ['mate', 'Mate', 'select:crewOptional'], ['incident', 'Incident Report', 'textarea'], ['notes', 'Notes', 'textarea']]
  },
  'pre-trip-checklist': {
    title: 'Pre Trip Checklist',
    summary: 'Quick readiness notes; the preserved checklist tool is still available from Legacy Tools.',
    fields: [['tripDate', 'Trip Date', 'date'], ['startTime', 'Start Time', 'time'], ['vessel', 'Vessel', 'select:vessels'], ['captain', 'Captain', 'select:crew'], ['mate', 'Mate', 'select:crewOptional'], ['status', 'Status', 'text'], ['notes', 'Captain Notes', 'textarea']]
  },
  'post-trip-checklist': {
    title: 'Post Trip Checklist',
    summary: 'Quick closeout notes; the preserved checklist tool is still available from Legacy Tools.',
    fields: [['tripDate', 'Trip Date', 'date'], ['vessel', 'Vessel', 'select:vessels'], ['captain', 'Captain', 'select:crew'], ['mate', 'Mate', 'select:crewOptional'], ['status', 'Status', 'text'], ['notes', 'Mate Notes', 'textarea']]
  }
};

function renderOperationalVoicePage(route) {
  const config = operationalVoiceForms[route];
  const page = document.getElementById(`page-${route}`);
  page.innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Phase 4B voice-enabled form</p><h1>${escapeHtml(config.title)}</h1><p class="section-summary">${escapeHtml(config.summary)}</p></div></div><form class="record-form card" data-voice-route="${escapeHtml(route)}">${renderVoiceFillPanel(route)}<div class="form-grid">${config.fields.map(([key, label, type]) => renderField(key, label, type)).join('')}</div><div class="form-actions"><button class="btn btn-primary" type="button" onclick="toast('Review complete. Use the preserved workflow or export when ready.');">Review only</button>${legacyShortcut(route)}</div></form></div>`;
}

function renderLegacy() {
  document.getElementById('page-legacy').innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Preserved HTML tools</p><h1>Legacy tools</h1><p class="section-summary">These tools are intentionally linked and embeddable during Phase 2. They have not been rewritten or removed.</p></div></div><div class="grid">${legacyTools.map((tool) => `<div class="legacy-tool"><h3>${tool.title}</h3><p>${tool.desc}</p><div class="legacy-actions"><a class="btn btn-outline" href="${tool.file}" target="_blank" rel="noopener">Open in new tab</a><button class="btn btn-primary" data-embed-legacy="${tool.file}">Embed in shell</button></div></div>`).join('')}</div><div id="legacyEmbedTarget"></div></div>`;
}
function embedLegacy(file) {
  renderRoute('legacy');
  document.getElementById('legacyEmbedTarget').innerHTML = `<iframe class="legacy-frame" src="${file}" title="Embedded legacy tool: ${file}"></iframe>`;
  document.getElementById('legacyEmbedTarget').scrollIntoView({ behavior: 'smooth' });
}

function renderPlaceholder(route) {
  const label = (navItems.find(([key]) => key === route) || [,'',route])[2];
  const map = {
    invoices: ['Invoice list and customer balance workflow placeholder.', 'Legacy customer invoice tool is linked under Legacy Tools.'],
    payroll: ['Payroll summaries will later connect to trips, roles, owner payouts, and rates.', 'Gmail automation is not implemented.'],
    expenses: ['Expense capture placeholder for ice, reimbursements, and operating costs.', 'Legacy operations v5 still handles detailed expense workflows.'],
    inventory: ['Inventory placeholder for supplies, parts, and vessel consumables.'],
    'pre-trip-checklist': ['Use the preserved pre-trip checklist tool for now.'],
    'post-trip-checklist': ['Use the preserved post-trip checklist tool for now.'],
    'cruise-schedule': ['Cruise schedule placeholder; legacy booking dashboard remains linked and embeddable.'],
    reports: ['Reports placeholder with demo data totals from local storage.'],
    settings: ['Local storage tools, seed data summaries, and phase guardrails.']
  };
  const lines = map[route] || ['Phase 2 placeholder.'];
  const extra = route === 'settings' ? settingsMarkup() : '';
  document.getElementById(`page-${route}`).innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Phase 2 placeholder</p><h1>${label}</h1><p class="section-summary">This section is present in the unified navigation and ready for Phase 3 expansion.</p></div></div><div class="card card-pad"><ul class="placeholder-list">${lines.map((line) => `<li>${line}</li>`).join('')}</ul>${legacyShortcut(route)}${extra}</div></div>`;
}
function legacyShortcut(route) {
  const matches = { invoices: 'customer-invoice.html', 'pre-trip-checklist': 'RAT-PreTrip-VesselCheck.html', 'post-trip-checklist': 'RAT-PostTrip-VesselCheck.html', 'cruise-schedule': 'reel_adventure_tours_dashboard.html', payroll: 'ReelAdventureTours_App_v5.html', expenses: 'ReelAdventureTours_App_v5.html', reports: 'ReelAdventureTours_App_v5.html' };
  return matches[route] ? `<p><button class="btn btn-primary" type="button" data-route="legacy" data-embed-legacy="${matches[route]}">Open related legacy tool</button></p>` : '';
}
function settingsMarkup() {
  return `<div class="grid settings-grid" style="margin-top:18px"><div class="legacy-tool"><h3>Seed data</h3><p>${store.vessels.length} vessels, ${store.crew.length} crew members, ${store.roles.length} roles, ${store.bookingSources.length} booking sources, ${store.standardPayoutRates.length} standard crew payout rates, and ${store.vesselOwnerPayoutRates.length} documented owner payout rules loaded.</p></div><div class="legacy-tool"><h3>Local data layer</h3><p>Storage key: ${STORE_KEY}. Last updated: ${new Date(store.updatedAt).toLocaleString()}.</p><div class="legacy-actions"><button class="btn btn-outline" data-export-store>Export JSON</button><label class="btn btn-outline" for="importStoreFile">Import JSON<input id="importStoreFile" data-import-store type="file" accept="application/json" hidden></label><button class="btn btn-danger" data-reset-store>Reset seed data</button></div></div><div class="legacy-tool"><h3>Preserved Phase 3 safeguards</h3><p>Dispatch board, payroll, audit trail, notifications, voice fill, export/import, legacy shell links, and the static validator are all active.</p></div></div>`;
}

function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}

document.addEventListener('DOMContentLoaded', init);
