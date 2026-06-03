const STORE_KEY = 'rat_ops_v1_store';
const STORE_VERSION = 29;

const navItems = [
  ['dashboard', '🏠', 'Dashboard'], ['bookings', '📘', 'Bookings'], ['invoices', '🧾', 'Invoices'],
  ['trips', '🧭', 'Dispatch / Trips'], ['vessels', '⛵', 'Vessels'], ['crew', '👥', 'Crew'],
  ['payroll', '💸', 'Payroll'], ['expenses', '💳', 'Expenses'], ['inventory', '📦', 'Inventory'],
  ['pre-trip-checklist', '✅', 'Pre Trip Checklist'], ['post-trip-checklist', '🧽', 'Post Trip Checklist'],
  ['cruise-schedule', '🚢', 'Cruise Schedule'], ['reports', '📊', 'Reports'], ['settings', '⚙️', 'Settings']
];

const legacyTools = [
  { title: 'Legacy Booking Dashboard', file: 'reel_adventure_tours_dashboard.html', desc: 'Original cruise schedule and booking tracking board.' },
  { title: 'Customer Invoice / Booking Tool', file: 'customer-invoice.html', desc: 'Existing customer invoice and tour booking HTML tool.' },
  { title: 'Legacy Operations v5', file: 'ReelAdventureTours_App_v5.html', desc: 'Existing payroll, trip, expense, reimbursement, export, and reporting app.' },
  { title: 'Pre Trip Vessel Check', file: 'RAT-PreTrip-VesselCheck.html', desc: 'Existing pre-trip checklist workflow.' },
  { title: 'Post Trip Vessel Check', file: 'RAT-PostTrip-VesselCheck.html', desc: 'Existing post-trip checklist workflow.' }
];

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
  demoUsers: [
    { id: 'user-owner-eugene', name: 'Eugene', email: 'owner@reeladventuretours.com', role: 'Owner / Admin', crewId: 'crew-eugene', active: 'Yes' },
    { id: 'user-ops-bain', name: 'Bain', email: 'ops@reeladventuretours.com', role: 'Operations Manager', crewId: 'crew-bain', active: 'Yes' },
    { id: 'user-captain-phillip', name: 'Phillip', email: 'phillip@reeladventuretours.com', role: 'Captain', crewId: 'crew-phillip', active: 'Yes' },
    { id: 'user-mate-dj', name: 'DJ', email: 'dj@reeladventuretours.com', role: 'Mate', crewId: 'crew-dj', active: 'Yes' },
    { id: 'user-bookkeeper-walter', name: 'Walter', email: 'books@reeladventuretours.com', role: 'Bookkeeper', crewId: 'crew-walter', active: 'Yes' }
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
  ownerAlerts: [],
  crewNotifications: [],
  checklistCompletions: [],
  incidentReports: [],
  expenseSubmissions: [],
  inventoryEvents: [],
  vesselIssues: [],
  auditLog: [],
  exportSnapshots: [],
  syncReviews: [],
  apiContractReviews: [],
  authReadinessReviews: [],
  schemaReviews: [],
  migrationPlanReviews: [],
  rolloutReviews: [],
  cutoverDrillReviews: [],
  offlineModeReviews: [],
  handoffTrainingReviews: [],
  productionQaReviews: [],
  pilotModeReviews: [],
  pilotCloseoutReports: [],
  finalLaunchReviews: [],
  productionEvidencePackages: [],
  executiveReadinessReviews: [],
  executiveReadinessReports: [],
  readinessArchives: [],
  archiveIntegrityReviews: [],
  phaseCompletionRegisters: [],
  authSession: { activeUserId: 'user-owner-eugene', authenticatedAt: '' }
};

const crudConfig = {
  bookings: {
    title: 'Bookings', eyebrow: 'Simple CRUD', summary: 'Create, read, update, and delete booking records in local storage while the legacy booking dashboard remains available.', collection: 'bookings', addLabel: 'Add booking',
    fields: [['order','Order #','text'], ['customer','Customer','text'], ['date','Trip date','date'], ['time','Time','time'], ['guests','Guests','number'], ['product','Product','text'], ['source','Source','select:bookingSources'], ['balance','Balance due','number'], ['status','Status','select:bookingStatus'], ['notes','Notes','textarea']],
    columns: [['order','Order'], ['customer','Customer'], ['date','Date'], ['guests','Guests'], ['product','Product'], ['source','Source'], ['balance','Balance']]
  },
  trips: {
    title: 'Dispatch / Trips', eyebrow: 'Dispatch workflow', summary: 'Dispatch-first workflow for booking intake, vessel assignment, owner auto-assignment, crew acceptance, checklist readiness, alerts, and payroll.', collection: 'trips', addLabel: 'Create dispatch trip',
    fields: [['customer','Customer name','text'], ['phone','Phone number','tel'], ['email','Email','email'], ['cruiseShip','Cruise ship','text'], ['bookingSource','Booking source','select:bookingSources'], ['tripDate','Trip date','date'], ['startTime','Start time','time'], ['hours','Hours','number'], ['passengers','Guest count','number'], ['tourPackage','Tour package','text'], ['specialRequests','Special requests','textarea'], ['tourPrice','Tour price','number'], ['depositPaid','Deposit paid','number'], ['balanceDue','Balance due','number'], ['paymentStatus','Payment status','select:paymentStatus'], ['vessel','Assigned vessel','select:vessels'], ['ownerOverride','Owner override','select:owners'], ['captain','Assigned captain','select:crewOptional'], ['mate','Assigned mate','select:crewOptional'], ['status','Trip status','select:tripStatus'], ['adminOverride','Admin override conflicts','checkbox'], ['overrideReason','Override reason','textarea'], ['adminNotes','Admin notes','textarea'], ['crewNotes','Crew notes','textarea'], ['ownerNotes','Owner notes','textarea']],
    columns: [['tripDate','Date'], ['startTime','Time'], ['customer','Customer'], ['passengers','Guests'], ['bookingSource','Source'], ['tourPrice','Price'], ['depositPaid','Deposit'], ['balanceDue','Balance'], ['vessel','Vessel'], ['captain','Captain'], ['mate','Mate'], ['status','Status']]
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


const operationalConfig = {
  'pre-trip-checklist': {
    title: 'Pre Trip Checklist', eyebrow: 'Checklist workflow', collection: 'checklistCompletions', type: 'pre-trip-checklist', legacyFile: 'RAT-PreTrip-VesselCheck.html', addLabel: 'Record pre-trip completion',
    summary: 'Record pre-trip checklist completion in the operations shell while preserving the legacy checklist tool.',
    fields: [['tripRef','Dispatch trip','select:trips'], ['completedBy','Completed by','select:crewOptional'], ['completedAt','Completed date/time','datetime-local'], ['engineCheck','Engine / fuel / battery','select:yesNoCritical'], ['safetyCheck','Safety gear check','select:yesNoCritical'], ['cleanlinessCheck','Cleanliness / readiness','select:yesNoCritical'], ['notes','Checklist notes','textarea']]
  },
  'post-trip-checklist': {
    title: 'Post Trip Checklist', eyebrow: 'Completion workflow', collection: 'checklistCompletions', type: 'post-trip-checklist', legacyFile: 'RAT-PostTrip-VesselCheck.html', addLabel: 'Record post-trip completion',
    summary: 'Record post-trip checklist completion, issues, owner alerts, and payroll readiness without removing the legacy checklist.',
    fields: [['tripRef','Dispatch trip','select:trips'], ['completedBy','Completed by','select:crewOptional'], ['completedAt','Completed date/time','datetime-local'], ['vesselCondition','Vessel condition','select:yesNoCritical'], ['fuelTrashCleaned','Fuel / trash / cleanup','select:yesNoCritical'], ['customerOutcome','Customer outcome','text'], ['notes','Completion notes','textarea']]
  },
  expenses: {
    title: 'Expenses', eyebrow: 'Expense workflow', collection: 'expenseSubmissions', type: 'expense-submitted', legacyFile: 'ReelAdventureTours_App_v5.html', addLabel: 'Submit expense',
    summary: 'Submit operating expenses in app and notify owners/bookkeeping while keeping the legacy expense tool available.',
    fields: [['submittedBy','Submitted by','select:crewOptional'], ['tripRef','Related dispatch trip','select:trips'], ['expenseDate','Expense date','date'], ['category','Category','text'], ['amount','Amount','number'], ['paymentMethod','Payment method','text'], ['status','Status','select:expenseStatus'], ['notes','Payment notes','textarea']]
  },
  inventory: {
    title: 'Inventory', eyebrow: 'Inventory workflow', collection: 'inventoryEvents', type: 'inventory-low', legacyFile: '', addLabel: 'Report low inventory',
    summary: 'Report low inventory or restocking needs and notify crew in app.',
    fields: [['reportedBy','Reported by','select:crewOptional'], ['itemName','Item name','text'], ['currentLevel','Current level','text'], ['neededBy','Needed by','date'], ['priority','Priority','select:issueSeverity'], ['assignedTo','Assigned to','select:crewOptional'], ['notes','Restock notes','textarea']]
  },
  reports: {
    title: 'Incident Reports', eyebrow: 'Incident workflow', collection: 'incidentReports', type: 'incident-reported', legacyFile: 'ReelAdventureTours_App_v5.html', addLabel: 'Report incident',
    summary: 'Capture customer, safety, crew, or operational incidents and alert the owner immediately in app.',
    fields: [['reportedBy','Reported by','select:crewOptional'], ['tripRef','Related dispatch trip','select:trips'], ['incidentDate','Incident date','date'], ['severity','Severity','select:issueSeverity'], ['incidentType','Incident type','text'], ['peopleInvolved','People involved','text'], ['notes','Incident notes','textarea']]
  },
  vessels: null
};

let store = loadStore();
let currentRoute = 'dashboard';
let activeWorkspaceRole = 'Owner / Admin';
let activeCrewIdentity = 'Eugene';
let activeUserId = 'user-owner-eugene';
let editing = {};
let deferredInstallPrompt = null;

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
  next.demoUsers = Array.isArray(next.demoUsers) ? next.demoUsers : structuredClone(seedData.demoUsers);
  next.authSession = next.authSession && next.authSession.activeUserId ? next.authSession : { activeUserId: next.demoUsers[0]?.id || 'user-owner-eugene', authenticatedAt: '' };
  next.payrollPayments = Array.isArray(next.payrollPayments) ? next.payrollPayments : [];
  next.ownerAlerts = Array.isArray(next.ownerAlerts) ? next.ownerAlerts : [];
  next.crewNotifications = Array.isArray(next.crewNotifications) ? next.crewNotifications : [];
  next.checklistCompletions = Array.isArray(next.checklistCompletions) ? next.checklistCompletions : [];
  next.incidentReports = Array.isArray(next.incidentReports) ? next.incidentReports : [];
  next.expenseSubmissions = Array.isArray(next.expenseSubmissions) ? next.expenseSubmissions : [];
  next.inventoryEvents = Array.isArray(next.inventoryEvents) ? next.inventoryEvents : [];
  next.vesselIssues = Array.isArray(next.vesselIssues) ? next.vesselIssues : [];
  next.auditLog = Array.isArray(next.auditLog) ? next.auditLog : [];
  next.exportSnapshots = Array.isArray(next.exportSnapshots) ? next.exportSnapshots : [];
  next.syncReviews = Array.isArray(next.syncReviews) ? next.syncReviews : [];
  next.apiContractReviews = Array.isArray(next.apiContractReviews) ? next.apiContractReviews : [];
  next.authReadinessReviews = Array.isArray(next.authReadinessReviews) ? next.authReadinessReviews : [];
  next.schemaReviews = Array.isArray(next.schemaReviews) ? next.schemaReviews : [];
  next.migrationPlanReviews = Array.isArray(next.migrationPlanReviews) ? next.migrationPlanReviews : [];
  next.rolloutReviews = Array.isArray(next.rolloutReviews) ? next.rolloutReviews : [];
  next.cutoverDrillReviews = Array.isArray(next.cutoverDrillReviews) ? next.cutoverDrillReviews : [];
  next.offlineModeReviews = Array.isArray(next.offlineModeReviews) ? next.offlineModeReviews : [];
  next.handoffTrainingReviews = Array.isArray(next.handoffTrainingReviews) ? next.handoffTrainingReviews : [];
  next.productionQaReviews = Array.isArray(next.productionQaReviews) ? next.productionQaReviews : [];
  next.pilotModeReviews = Array.isArray(next.pilotModeReviews) ? next.pilotModeReviews : [];
  next.pilotCloseoutReports = Array.isArray(next.pilotCloseoutReports) ? next.pilotCloseoutReports : [];
  next.finalLaunchReviews = Array.isArray(next.finalLaunchReviews) ? next.finalLaunchReviews : [];
  next.productionEvidencePackages = Array.isArray(next.productionEvidencePackages) ? next.productionEvidencePackages : [];
  next.executiveReadinessReviews = Array.isArray(next.executiveReadinessReviews) ? next.executiveReadinessReviews : [];
  next.executiveReadinessReports = Array.isArray(next.executiveReadinessReports) ? next.executiveReadinessReports : [];
  next.readinessArchives = Array.isArray(next.readinessArchives) ? next.readinessArchives : [];
  next.archiveIntegrityReviews = Array.isArray(next.archiveIntegrityReviews) ? next.archiveIntegrityReviews : [];
  next.phaseCompletionRegisters = Array.isArray(next.phaseCompletionRegisters) ? next.phaseCompletionRegisters : [];
  next.trips = (Array.isArray(next.trips) ? next.trips : []).map((trip) => ({
    ...trip,
    bookingSource: trip.bookingSource || trip.source || '',
    depositPaid: Number(trip.depositPaid || 0),
    balanceDue: Number(trip.balanceDue ?? trip.balance ?? 0),
    passengers: Number(trip.passengers ?? trip.guests ?? 0),
    hours: Number(trip.hours || 4),
    status: trip.status || 'Dispatch Pending',
    paymentStatus: trip.paymentStatus || (Number(trip.balanceDue ?? trip.balance ?? 0) > 0 ? 'Balance due' : 'Deposit paid'),
    captainAcceptance: trip.captainAcceptance || 'Pending',
    mateAcceptance: trip.mateAcceptance || 'Pending',
    ownerAcknowledgement: trip.ownerAcknowledgement || 'Pending',
    ownerOverride: trip.ownerOverride || '',
    cruiseShip: trip.cruiseShip || '',
    tourPackage: trip.tourPackage || trip.product || '',
    specialRequests: trip.specialRequests || '',
    adminNotes: trip.adminNotes || trip.notes || '',
    crewNotes: trip.crewNotes || '',
    ownerNotes: trip.ownerNotes || '',
    adminOverride: trip.adminOverride || '',
    overrideReason: trip.overrideReason || ''
  }));
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}

function saveStore() {
  store.updatedAt = new Date().toISOString();
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function money(value) { return Number(value || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: Number(value || 0) % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
function byDate(a, b) { return String(a.date || a.tripDate).localeCompare(String(b.date || b.tripDate)); }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
function makeId(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`; }
function getOptions(kind) {
  const maps = {
    bookingSources: store.bookingSources.map((s) => s.name),
    bookingStatus: ['Inquiry', 'Deposit paid', 'Balance due', 'Paid in full', 'Cancelled'],
    tripStatus: ['Dispatch Pending', 'Scheduled', 'Crew Notified', 'Crew Accepted', 'Pre Trip Complete', 'Completed', 'Needs review', 'Cancelled'],
    paymentStatus: ['Deposit paid', 'Balance due', 'Paid in full', 'Unpaid'],
    yesNo: ['Yes', 'No'],
    owners: [...new Set([...store.vessels.map((v) => v.owner), ...store.vesselOwnerPayoutRates.map((r) => r.owner)])].filter(Boolean),
    vessels: store.vessels.map((v) => v.name),
    crew: store.crew.filter((c) => c.active !== 'No').map((c) => c.name),
    crewOptional: ['None', ...store.crew.filter((c) => c.active !== 'No').map((c) => c.name)],
    trips: store.trips.map((trip) => `${trip.customer || 'Trip'} — ${formatDate(trip.tripDate)} ${formatTime(trip.startTime)}`),
    expenseStatus: ['Submitted', 'Approved', 'Rejected', 'Paid'],
    issueSeverity: ['Low', 'Medium', 'High', 'Critical'],
    yesNoCritical: ['No issue', 'Needs attention', 'Critical']
  };
  return maps[kind] || [];
}

function init() {
  syncIdentityFromSession();
  renderNav();
  populateIdentityControls();
  wireEvents();
  renderRoute('dashboard');
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js').catch(console.warn);
}

function renderNav() {
  document.getElementById('primaryNav').innerHTML = navItems.map(([route, icon, label]) => `
    <button class="nav-link" data-route="${route}"><span class="nav-icon">${icon}</span><span>${label}</span></button>
  `).join('');
}


function populateIdentityControls() {
  const userSelect = document.getElementById('userSelect');
  if (userSelect) {
    userSelect.innerHTML = store.demoUsers.filter((user) => user.active !== 'No').map((user) => `<option value="${escapeHtml(user.id)}" ${user.id === activeUserId ? 'selected' : ''}>${escapeHtml(user.name)} — ${escapeHtml(user.role)}</option>`).join('');
  }
  const roleSelect = document.getElementById('roleSelect');
  if (roleSelect) roleSelect.value = activeWorkspaceRole;
  const identitySelect = document.getElementById('identitySelect');
  if (identitySelect) identitySelect.value = activeCrewIdentity;
  updateActiveIdentityBadge();
}

function syncIdentityFromSession() {
  const sessionUser = store.demoUsers.find((user) => user.id === store.authSession?.activeUserId) || store.demoUsers[0];
  if (sessionUser) {
    activeUserId = sessionUser.id;
    activeWorkspaceRole = sessionUser.role;
    activeCrewIdentity = crewNameFromId(sessionUser.crewId) || sessionUser.name;
  }
}

function applyUserSession(userId) {
  const user = store.demoUsers.find((item) => item.id === userId) || store.demoUsers[0];
  if (!user) return;
  activeUserId = user.id;
  activeWorkspaceRole = user.role;
  activeCrewIdentity = crewNameFromId(user.crewId) || user.name;
  store.authSession = { activeUserId, authenticatedAt: new Date().toISOString() };
  auditEvent('auth-session-started', `Demo user ${user.name} started a local session.`, { userId: user.id, role: user.role, crewId: user.crewId });
  saveStore();
  populateIdentityControls();
}

function updateSessionFromActiveIdentity() {
  const existing = store.demoUsers.find((user) => user.id === activeUserId);
  store.authSession = { activeUserId: existing?.id || activeUserId, authenticatedAt: store.authSession?.authenticatedAt || new Date().toISOString(), roleOverride: activeWorkspaceRole, crewOverride: activeCrewIdentity };
  auditEvent('auth-session-override', `Local identity override set to ${activeWorkspaceRole} / ${activeCrewIdentity}.`, { activeUserId, roleOverride: activeWorkspaceRole, crewOverride: activeCrewIdentity });
  saveStore();
}

function currentUser() {
  return store.demoUsers.find((user) => user.id === activeUserId) || store.demoUsers[0] || null;
}

function currentCrewRecord() {
  const user = currentUser();
  return store.crew.find((crew) => crew.id === user?.crewId) || store.crew.find((crew) => crew.name === activeCrewIdentity) || null;
}

function crewNameFromId(crewId) {
  return store.crew.find((crew) => crew.id === crewId)?.name || '';
}

function wireEvents() {
  document.getElementById('enterAppBtn').addEventListener('click', () => {
    document.getElementById('loginScreen').hidden = true;
    document.getElementById('appShell').hidden = false;
    applyUserSession(document.getElementById('userSelect')?.value || activeUserId);
    renderRoute('dashboard');
    toast('Demo role selected. Real authentication is intentionally not enabled yet.');
  });
  document.getElementById('userSelect')?.addEventListener('change', (event) => {
    applyUserSession(event.target.value);
    renderRoute('dashboard');
  });
  document.getElementById('roleSelect').addEventListener('change', (event) => {
    activeWorkspaceRole = event.target.value;
    updateSessionFromActiveIdentity();
    updateActiveIdentityBadge();
    if (currentRoute === 'dashboard') renderDashboard();
  });
  document.getElementById('identitySelect')?.addEventListener('change', (event) => {
    activeCrewIdentity = event.target.value;
    updateSessionFromActiveIdentity();
    updateActiveIdentityBadge();
    if (currentRoute === 'dashboard') renderDashboard();
    if (currentRoute === 'crew') renderCrewDashboard();
  });
  document.getElementById('menuBtn').addEventListener('click', toggleSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);
  document.body.addEventListener('submit', (event) => {
    const operationalForm = event.target.closest('[data-operational-form]');
    if (operationalForm) saveOperationalRecord(event, operationalForm.dataset.operationalForm);
    const vesselIssueForm = event.target.closest('[data-vessel-issue-form]');
    if (vesselIssueForm) saveVesselIssue(event);
  });
  document.body.addEventListener('click', (event) => {
    const voiceBtn = event.target.closest('[data-voice-field]');
    if (voiceBtn) startVoiceFill(voiceBtn);
    const clearVoice = event.target.closest('[data-voice-clear]');
    if (clearVoice) clearVoiceField(clearVoice.dataset.voiceClear);
    const acceptBtn = event.target.closest('[data-accept-role]');
    if (acceptBtn) acceptAssignment(acceptBtn.dataset.tripId, acceptBtn.dataset.acceptRole);
    const noteBtn = event.target.closest('[data-notification-status]');
    if (noteBtn) updateCrewNotification(noteBtn.dataset.notificationId, noteBtn.dataset.notificationStatus);
    const alertBtn = event.target.closest('[data-alert-ack]');
    if (alertBtn) acknowledgeOwnerAlert(alertBtn.dataset.alertAck);
    const auditExport = event.target.closest('[data-audit-export]');
    if (auditExport) exportAuditLog();
    const auditClear = event.target.closest('[data-audit-clear]');
    if (auditClear) clearAuditLog();
    const storeExport = event.target.closest('[data-store-export]');
    if (storeExport) exportLocalStore();
    const storeImport = event.target.closest('[data-store-import]');
    if (storeImport) importLocalStore();
    const seedReset = event.target.closest('[data-reset-seed]');
    if (seedReset) resetSeedData();
    const syncQueue = event.target.closest('[data-sync-queue]');
    if (syncQueue) queueSyncReview();
    const syncStatus = event.target.closest('[data-sync-review-status]');
    if (syncStatus) updateSyncReviewStatus(syncStatus.dataset.syncReviewId, syncStatus.dataset.syncReviewStatus);
    const apiReview = event.target.closest('[data-api-review]');
    if (apiReview) queueApiContractReview();
    const apiStatus = event.target.closest('[data-api-review-status]');
    if (apiStatus) updateApiContractReviewStatus(apiStatus.dataset.apiReviewId, apiStatus.dataset.apiReviewStatus);
    const authReview = event.target.closest('[data-auth-review]');
    if (authReview) queueAuthReadinessReview();
    const authStatus = event.target.closest('[data-auth-review-status]');
    if (authStatus) updateAuthReadinessReviewStatus(authStatus.dataset.authReviewId, authStatus.dataset.authReviewStatus);
    const schemaReview = event.target.closest('[data-schema-review]');
    if (schemaReview) queueSchemaReview();
    const schemaStatus = event.target.closest('[data-schema-review-status]');
    if (schemaStatus) updateSchemaReviewStatus(schemaStatus.dataset.schemaReviewId, schemaStatus.dataset.schemaReviewStatus);
    const migrationReview = event.target.closest('[data-migration-review]');
    if (migrationReview) queueMigrationPlanReview();
    const migrationStatus = event.target.closest('[data-migration-review-status]');
    if (migrationStatus) updateMigrationPlanReviewStatus(migrationStatus.dataset.migrationReviewId, migrationStatus.dataset.migrationReviewStatus);
    const rolloutReview = event.target.closest('[data-rollout-review]');
    if (rolloutReview) queueRolloutReview();
    const rolloutStatus = event.target.closest('[data-rollout-review-status]');
    if (rolloutStatus) updateRolloutReviewStatus(rolloutStatus.dataset.rolloutReviewId, rolloutStatus.dataset.rolloutReviewStatus);
    const cutoverDrill = event.target.closest('[data-cutover-drill]');
    if (cutoverDrill) queueCutoverDrillReview();
    const drillStatus = event.target.closest('[data-cutover-drill-status]');
    if (drillStatus) updateCutoverDrillStatus(drillStatus.dataset.cutoverDrillId, drillStatus.dataset.cutoverDrillStatus);
    const offlineReview = event.target.closest('[data-offline-review]');
    if (offlineReview) queueOfflineModeReview();
    const offlineStatus = event.target.closest('[data-offline-review-status]');
    if (offlineStatus) updateOfflineModeReviewStatus(offlineStatus.dataset.offlineReviewId, offlineStatus.dataset.offlineReviewStatus);
    const handoffReview = event.target.closest('[data-handoff-review]');
    if (handoffReview) queueHandoffTrainingReview();
    const handoffStatus = event.target.closest('[data-handoff-review-status]');
    if (handoffStatus) updateHandoffTrainingStatus(handoffStatus.dataset.handoffReviewId, handoffStatus.dataset.handoffReviewStatus);
    const productionQa = event.target.closest('[data-production-qa-review]');
    if (productionQa) queueProductionQaReview();
    const productionQaStatus = event.target.closest('[data-production-qa-status]');
    if (productionQaStatus) updateProductionQaStatus(productionQaStatus.dataset.productionQaId, productionQaStatus.dataset.productionQaStatus);
    const pilotMode = event.target.closest('[data-pilot-mode-review]');
    if (pilotMode) queuePilotModeReview();
    const pilotModeStatus = event.target.closest('[data-pilot-mode-status]');
    if (pilotModeStatus) updatePilotModeStatus(pilotModeStatus.dataset.pilotModeId, pilotModeStatus.dataset.pilotModeStatus);
    const closeoutReport = event.target.closest('[data-pilot-closeout-report]');
    if (closeoutReport) queuePilotCloseoutReport();
    const closeoutStatus = event.target.closest('[data-pilot-closeout-status]');
    if (closeoutStatus) updatePilotCloseoutStatus(closeoutStatus.dataset.pilotCloseoutId, closeoutStatus.dataset.pilotCloseoutStatus);
    const launchReview = event.target.closest('[data-final-launch-review]');
    if (launchReview) queueFinalLaunchReview();
    const launchStatus = event.target.closest('[data-final-launch-status]');
    if (launchStatus) updateFinalLaunchStatus(launchStatus.dataset.finalLaunchId, launchStatus.dataset.finalLaunchStatus);
    const evidencePackage = event.target.closest('[data-evidence-package]');
    if (evidencePackage) queueProductionEvidencePackage();
    const evidenceStatus = event.target.closest('[data-evidence-package-status]');
    if (evidenceStatus) updateProductionEvidenceStatus(evidenceStatus.dataset.evidencePackageId, evidenceStatus.dataset.evidencePackageStatus);
    const executiveReview = event.target.closest('[data-executive-readiness-review]');
    if (executiveReview) queueExecutiveReadinessReview();
    const executiveStatus = event.target.closest('[data-executive-readiness-status]');
    if (executiveStatus) updateExecutiveReadinessStatus(executiveStatus.dataset.executiveReadinessId, executiveStatus.dataset.executiveReadinessStatus);
    const executiveReport = event.target.closest('[data-executive-readiness-report]');
    if (executiveReport) queueExecutiveReadinessReport();
    const executiveReportStatus = event.target.closest('[data-executive-readiness-report-status]');
    if (executiveReportStatus) updateExecutiveReadinessReportStatus(executiveReportStatus.dataset.executiveReadinessReportId, executiveReportStatus.dataset.executiveReadinessReportStatus);
    const readinessArchive = event.target.closest('[data-readiness-archive]');
    if (readinessArchive) queueReadinessArchive();
    const readinessArchiveStatus = event.target.closest('[data-readiness-archive-status]');
    if (readinessArchiveStatus) updateReadinessArchiveStatus(readinessArchiveStatus.dataset.readinessArchiveId, readinessArchiveStatus.dataset.readinessArchiveStatus);
    const archiveIntegrity = event.target.closest('[data-archive-integrity-review]');
    if (archiveIntegrity) queueArchiveIntegrityReview();
    const archiveIntegrityStatus = event.target.closest('[data-archive-integrity-status]');
    if (archiveIntegrityStatus) updateArchiveIntegrityStatus(archiveIntegrityStatus.dataset.archiveIntegrityId, archiveIntegrityStatus.dataset.archiveIntegrityStatus);
    const completionRegister = event.target.closest('[data-phase-completion-register]');
    if (completionRegister) queuePhaseCompletionRegister();
    const completionStatus = event.target.closest('[data-phase-completion-status]');
    if (completionStatus) updatePhaseCompletionStatus(completionStatus.dataset.phaseCompletionId, completionStatus.dataset.phaseCompletionStatus);
    const routeBtn = event.target.closest('[data-route]');
    if (routeBtn) renderRoute(routeBtn.dataset.route);
    const legacyEmbed = event.target.closest('[data-embed-legacy]');
    if (legacyEmbed) embedLegacy(legacyEmbed.dataset.embedLegacy);
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
  else if (operationalConfig[route]) renderOperationalPage(route);
  else if (route === 'legacy') renderLegacy();
  else renderPlaceholder(route);
}

function renderDashboard() {
  const upcomingBookings = store.bookings.filter((b) => b.status !== 'Cancelled').sort(byDate).slice(0, 4);
  const scheduledTrips = store.trips.filter((t) => t.status !== 'Cancelled').sort(byDate);
  const totalBalance = store.bookings.reduce((sum, b) => sum + Number(b.balance || 0), 0) + store.trips.reduce((sum, t) => sum + Number(t.balanceDue || 0), 0);
  const payroll = payrollEntries();
  const outstandingPayroll = payroll.reduce((sum, entry) => sum + entry.outstanding, 0);
  const unreadOwnerAlerts = store.ownerAlerts.filter((alert) => alert.status !== 'Acknowledged').length;
  document.getElementById('page-dashboard').innerHTML = `
    <div class="page-stack">
      <div class="section-heading"><div><p class="eyebrow">Phase 3G–3P operations control</p><h1>Dispatch board is mission control</h1><p class="section-summary">Daily operations now follow the real workflow: booking received, assign vessel, owner auto-assigned, assign crew, notify crew, accept assignment, operate trip, complete checklists, alert owner, and calculate payroll.</p></div><button class="btn btn-primary" data-route="trips">Open Dispatch Board</button></div>
      <div class="grid kpi-grid">
        ${kpi('Dispatch trips', scheduledTrips.length, 'Active operational cards')}
        ${kpi('Balances due', money(totalBalance), 'Bookings + dispatch trips')}
        ${kpi('Payroll owed', money(outstandingPayroll), 'Separated by role')}
        ${kpi('Owner alerts', unreadOwnerAlerts, 'Unread / pending')}
      </div>
      ${renderExecutiveReadinessDashboard()}
      ${renderIdentityPermissionPanel()}
      ${renderRoleWorkspace(activeWorkspaceRole)}
      ${renderOwnerAlertsPanel()}
      ${renderOperationalCommandCenter()}
      ${renderAuditLogPanel(6)}
      <div class="grid dashboard-grid">
        <div class="card"><div class="card-header"><h3>Dispatch workflow</h3><button class="btn btn-outline btn-small" data-route="trips">Create trip</button></div><div class="stat-list">
          <div class="stat-row"><span>1. Booking received</span><strong>Create dispatch trip</strong></div>
          <div class="stat-row"><span>2. Assign vessel</span><strong>Owner auto appears</strong></div>
          <div class="stat-row"><span>3. Assign captain / mate</span><strong>Crew notified in app</strong></div>
          <div class="stat-row"><span>4. Crew accepts</span><strong>Owner alert generated</strong></div>
          <div class="stat-row"><span>5. Trip completed</span><strong>Payroll calculated</strong></div>
        </div></div>
        <div class="card"><div class="card-header"><h3>Upcoming bookings</h3><button class="btn btn-outline btn-small" data-route="bookings">View all</button></div><div class="stat-list">${upcomingBookings.length ? upcomingBookings.map((b) => `<div class="stat-row"><span>${escapeHtml(b.date)} · ${escapeHtml(b.time)}</span><strong>${escapeHtml(b.customer)}<br><small>${escapeHtml(b.product)} · ${b.guests} guests</small></strong></div>`).join('') : '<div class="empty-state">No booking records yet.</div>'}</div></div>
      </div>
      <div class="card"><div class="card-header"><h3>Legacy tools</h3><button class="btn btn-outline btn-small" data-route="legacy">Open tools</button></div><div class="legacy-list">${legacyTools.map((tool) => `<div class="legacy-tool"><h3>${tool.title}</h3><p>${tool.desc}</p><div class="legacy-actions"><a class="btn btn-outline btn-small" href="${tool.file}" target="_blank" rel="noopener">Open link</a><button class="btn btn-primary btn-small" data-route="legacy" data-embed-legacy="${tool.file}">Embed</button></div></div>`).join('')}</div></div>
    </div>`;
}



function executiveReadinessItems() {
  const activeTrips = store.trips.filter((trip) => trip.status !== 'Cancelled');
  const conflictCount = activeTrips.reduce((sum, trip) => sum + findTripConflicts(trip).length, 0);
  const unassigned = activeTrips.filter(isTripUnassigned).length;
  const balancesDue = activeTrips.reduce((sum, trip) => sum + Number(trip.balanceDue || 0), 0);
  const outstandingPayroll = payrollEntries().reduce((sum, entry) => sum + entry.outstanding, 0);
  const pendingAlerts = store.ownerAlerts.filter((alert) => alert.status !== 'Acknowledged').length;
  const unreadCrew = store.crewNotifications.filter((notice) => notice.status === 'Unread').length;
  const evidencePackages = store.productionEvidencePackages.length;
  const latestLaunch = store.finalLaunchReviews[0]?.status || 'Not queued';
  const blockers = unresolvedPilotBlockers().length;
  return [
    { area: 'Dispatch readiness', status: conflictCount ? 'red' : (unassigned || balancesDue ? 'yellow' : 'green'), metric: `${conflictCount} conflicts · ${unassigned} unassigned · ${money(balancesDue)} due`, nextAction: conflictCount ? 'Resolve dispatch conflicts before pilot/launch.' : (unassigned ? 'Finish vessel/captain/mate assignments.' : 'Keep dispatch board current.') },
    { area: 'Payroll readiness', status: outstandingPayroll ? 'yellow' : 'green', metric: money(outstandingPayroll), nextAction: outstandingPayroll ? 'Bookkeeper reviews outstanding pay lines.' : 'Payroll is clear for current records.' },
    { area: 'Alerts + notifications', status: (pendingAlerts || unreadCrew) ? 'yellow' : 'green', metric: `${pendingAlerts} owner alerts · ${unreadCrew} crew unread`, nextAction: (pendingAlerts || unreadCrew) ? 'Acknowledge owner alerts and follow up with crew.' : 'Notifications are clear.' },
    { area: 'Pilot blockers', status: blockers ? 'red' : 'green', metric: `${blockers} blockers`, nextAction: blockers ? 'Use rollback decision log until blockers are closed.' : 'No unresolved pilot blockers detected.' },
    { area: 'Go/no-go readiness', status: latestLaunch.includes('Blocked') ? 'red' : (latestLaunch === 'Not queued' ? 'yellow' : 'green'), metric: latestLaunch, nextAction: latestLaunch === 'Not queued' ? 'Queue final go/no-go review.' : 'Review latest owner decision status.' },
    { area: 'Evidence package', status: evidencePackages ? 'green' : 'yellow', metric: `${evidencePackages} packages`, nextAction: evidencePackages ? 'Export/archive owner evidence package.' : 'Queue Phase 3U production evidence package.' },
    { area: 'Legacy fallback', status: legacyTools.length >= 5 ? 'green' : 'red', metric: `${legacyTools.length} tools linked`, nextAction: legacyTools.length >= 5 ? 'Legacy fallback remains available.' : 'Restore missing legacy links before launch.' }
  ];
}

function executiveReadinessOverall(items = executiveReadinessItems()) {
  if (items.some((item) => item.status === 'red')) return 'red';
  if (items.some((item) => item.status === 'yellow')) return 'yellow';
  return 'green';
}

function renderExecutiveReadinessDashboard() {
  const items = executiveReadinessItems();
  const overall = executiveReadinessOverall(items);
  const label = overall === 'green' ? 'Ready' : (overall === 'yellow' ? 'Needs owner review' : 'Blocked');
  const rows = items.map((item) => `<div class="stat-row readiness-${item.status}"><span>${escapeHtml(item.area)}<br><small>${escapeHtml(item.nextAction)}</small></span><strong><span class="badge ${item.status}">${escapeHtml(labelForStatus(item.status))}</span><br><small>${escapeHtml(item.metric)}</small></strong></div>`).join('');
  return `<section class="card executive-readiness-dashboard"><div class="card-header"><div><p class="eyebrow">Phase 3V executive readiness dashboard</p><h3>Owner/Admin production readiness</h3></div><span class="badge ${overall}">${label}</span></div><p class="section-summary">Single executive view of dispatch, payroll, alerts, pilot blockers, go/no-go status, evidence packaging, and legacy fallback readiness.</p><div class="stat-list">${rows}</div><div class="legacy-actions"><button class="btn btn-outline btn-small" data-route="settings">Open readiness panels</button><button class="btn btn-primary btn-small" data-route="trips">Open Dispatch Board</button></div></section>`;
}

function labelForStatus(status) {
  return status === 'green' ? 'Green' : (status === 'yellow' ? 'Yellow' : 'Red');
}


function updateActiveIdentityBadge() {
  const badge = document.getElementById('activeRole');
  if (badge) badge.textContent = `${activeWorkspaceRole}${['Captain', 'Mate'].includes(activeWorkspaceRole) ? ` · ${activeCrewIdentity}` : ''}`;
}

function currentIdentity() {
  const user = currentUser();
  const crew = currentCrewRecord();
  return { user, crew, role: activeWorkspaceRole, roleKey: roleWorkspaceKey(activeWorkspaceRole), crewName: crew?.name || activeCrewIdentity, permissions: permissionsForRole(activeWorkspaceRole) };
}

const rolePermissionMap = {
  owner: ['dispatch:manage', 'payroll:manage', 'alerts:acknowledge', 'crew:notify', 'checklists:record', 'expenses:approve', 'inventory:manage', 'vessels:manage', 'audit:view', 'data:manage', 'sync:review', 'api:review', 'legacy:open'],
  operations: ['dispatch:manage', 'alerts:view', 'crew:notify', 'checklists:record', 'incidents:record', 'inventory:manage', 'vessels:view', 'legacy:open'],
  captain: ['dispatch:view-assigned', 'crew:acknowledge', 'checklists:record', 'incidents:record', 'expenses:submit', 'inventory:report', 'legacy:open'],
  mate: ['dispatch:view-assigned', 'crew:acknowledge', 'checklists:record', 'incidents:record', 'expenses:submit', 'inventory:report', 'legacy:open'],
  bookkeeper: ['dispatch:view', 'payroll:manage', 'expenses:manage', 'invoices:manage', 'alerts:view', 'legacy:open']
};

function permissionsForRole(role = activeWorkspaceRole) {
  return rolePermissionMap[roleWorkspaceKey(role)] || rolePermissionMap.owner;
}

function can(permission, role = activeWorkspaceRole) {
  return permissionsForRole(role).includes(permission);
}

function requirePermission(permission, actionLabel) {
  if (can(permission)) return true;
  auditEvent('permission-denied', `${actionLabel} denied for ${activeWorkspaceRole}.`, { permission, actionLabel, role: activeWorkspaceRole });
  saveStore();
  toast(`${actionLabel} requires ${permission} permission for ${activeWorkspaceRole}.`);
  return false;
}

function auditEvent(type, message, details = {}) {
  if (!store || !Array.isArray(store.auditLog)) return null;
  const user = currentUser?.();
  const entry = {
    id: makeId('audit'),
    type,
    message,
    details,
    userId: activeUserId,
    userName: user?.name || activeCrewIdentity || 'Local demo user',
    role: activeWorkspaceRole,
    crew: activeCrewIdentity,
    createdAt: new Date().toISOString()
  };
  store.auditLog.unshift(entry);
  store.auditLog = store.auditLog.slice(0, 250);
  return entry;
}

function renderAuditLogPanel(limit = 10) {
  if (!can('audit:view')) {
    return `<section class="card audit-log-panel"><div class="card-header"><div><p class="eyebrow">Phase 3G audit trail</p><h3>Audit Log</h3></div><span class="badge red">Owner/Admin only</span></div><p class="section-summary">Audit Log restricted to Owner / Admin. This local audit trail prepares the app for production authentication and server-side compliance logging.</p></section>`;
  }
  const entries = (store.auditLog || []).slice(0, limit);
  const summary = auditTypeSummary(entries.length ? entries : store.auditLog || []);
  return `<section class="card audit-log-panel"><div class="card-header"><div><p class="eyebrow">Phase 3G audit trail</p><h3>Audit Log</h3></div><span class="badge blue">${store.auditLog.length} events</span></div><p class="section-summary">Local in-app audit trail for auth changes, permission denials, dispatch updates, payroll, acknowledgements, and operational submissions. External/server logging is intentionally deferred.</p><div class="audit-toolbar"><button class="btn btn-outline btn-small" data-audit-export="json">Export audit JSON</button><button class="btn btn-outline btn-small" data-audit-clear="true">Clear audit log</button></div><div class="audit-summary">${summary}</div><textarea id="auditExportText" class="export-textarea" readonly placeholder="Audit export JSON appears here after export." hidden></textarea><div class="audit-log">${entries.length ? entries.map(renderAuditEntry).join('') : '<div class="empty-state">No audit events recorded yet.</div>'}</div></section>`;
}

function auditTypeSummary(entries = store.auditLog || []) {
  const counts = entries.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + 1;
    return acc;
  }, {});
  const chips = Object.entries(counts).slice(0, 8).map(([type, count]) => `<span class="permission-chip">${escapeHtml(type)}: ${count}</span>`).join('');
  return chips || '<span class="permission-chip">No audit events</span>';
}

function renderAuditEntry(entry) {
  const detail = entry.details && Object.keys(entry.details).length ? JSON.stringify(entry.details) : '';
  return `<div class="audit-entry"><div><strong>${escapeHtml(entry.message || entry.type)}</strong><p>${escapeHtml(entry.type)} · ${escapeHtml(entry.role || 'Unknown role')} · ${escapeHtml(entry.userName || 'Unknown user')}</p>${detail ? `<small class="audit-details">${escapeHtml(detail)}</small>` : ''}</div><time>${escapeHtml(new Date(entry.createdAt).toLocaleString())}</time></div>`;
}

function renderIdentityPermissionPanel() {
  const identity = currentIdentity();
  return `<section class="card identity-panel"><div class="card-header"><div><p class="eyebrow">Phase 3G local auth + audit session</p><h3>${escapeHtml(identity.user?.name || 'Demo user')} · ${escapeHtml(identity.role)}</h3><p class="identity-subtitle">Mapped crew: ${escapeHtml(identity.crew?.name || identity.crewName || 'No crew mapping')} · ${escapeHtml(identity.user?.email || 'No email')}</p></div><span class="badge blue">${identity.permissions.length} permissions</span></div><div class="permission-list">${identity.permissions.map((permission) => `<span class="permission-chip">${escapeHtml(permission)}</span>`).join('')}</div><p class="section-summary identity-note">Local authenticated-user preview: selected users map to crew records, permissions, and audit events before real server-side auth is added.</p></section>`;
}

function renderRoleWorkspace(role = activeWorkspaceRole) {
  const normalized = roleWorkspaceKey(role);
  const workspaces = {
    owner: renderOwnerWorkspace,
    operations: renderOperationsWorkspace,
    captain: renderCaptainMateWorkspace,
    mate: renderCaptainMateWorkspace,
    bookkeeper: renderBookkeeperWorkspace
  };
  return (workspaces[normalized] || renderOwnerWorkspace)(role, normalized);
}

function roleWorkspaceKey(role) {
  const value = String(role || '').toLowerCase();
  if (value.includes('operation')) return 'operations';
  if (value.includes('captain')) return 'captain';
  if (value.includes('mate')) return 'mate';
  if (value.includes('bookkeeper')) return 'bookkeeper';
  return 'owner';
}

function workspaceCard(title, eyebrow, body, actions = []) {
  return `<section class="card role-workspace"><div class="card-header"><div><p class="eyebrow">${escapeHtml(eyebrow)}</p><h3>${escapeHtml(title)}</h3></div><span class="badge green">Phase 3D</span></div><div class="role-workspace-body">${body}</div><div class="role-workspace-actions">${actions.map(([label, route]) => `<button class="btn btn-outline btn-small" data-route="${route}">${escapeHtml(label)}</button>`).join('')}</div></section>`;
}

function renderOwnerWorkspace() {
  const activeTrips = store.trips.filter((trip) => trip.status !== 'Cancelled');
  const conflicts = activeTrips.filter((trip) => tripHasConflict(trip)).length;
  const unassigned = activeTrips.filter(isTripUnassigned).length;
  const openAlerts = store.ownerAlerts.filter((alert) => alert.status !== 'Acknowledged').length;
  const vesselIssues = store.vesselIssues.length;
  const body = `<div class="grid role-workspace-grid">${kpi('Open owner alerts', openAlerts, 'Needs acknowledgement')}${kpi('Active dispatch trips', activeTrips.length, `${unassigned} unassigned`) }${kpi('Conflict warnings', conflicts, 'Dispatch blockers')}${kpi('Vessel issues', vesselIssues, 'Reported in app')}</div><p class="section-summary">Owner/Admin workspace prioritizes dispatch health, owner alerts, vessel issues, operational completion, and payroll exposure.</p>`;
  return workspaceCard('Owner / Admin Daily Workspace', 'Role workspace', body, [['Dispatch Board', 'trips'], ['Payroll', 'payroll'], ['Vessels', 'vessels'], ['Audit Log', 'reports'], ['Legacy Tools', 'legacy']]);
}

function renderOperationsWorkspace() {
  const activeTrips = store.trips.filter((trip) => trip.status !== 'Cancelled');
  const preTrips = store.checklistCompletions.filter((item) => item.type === 'pre-trip-checklist').length;
  const postTrips = store.checklistCompletions.filter((item) => item.type === 'post-trip-checklist').length;
  const body = `<div class="grid role-workspace-grid">${kpi('Trips needing assignment', activeTrips.filter(isTripUnassigned).length, 'Vessel / crew gaps')}${kpi('Conflict warnings', activeTrips.filter((trip) => tripHasConflict(trip)).length, 'Resolve or override')}${kpi('Pre-trip complete', preTrips, 'Checklist records')}${kpi('Post-trip complete', postTrips, 'Owner completion alerts')}</div><p class="section-summary">Operations Manager workspace focuses on the daily dispatch queue, unassigned trips, conflict warnings, checklist throughput, and incidents.</p>`;
  return workspaceCard('Operations Manager Workspace', 'Role workspace', body, [['Dispatch Board', 'trips'], ['Pre Trip', 'pre-trip-checklist'], ['Post Trip', 'post-trip-checklist'], ['Incidents', 'reports']]);
}

function renderCaptainMateWorkspace(role, normalized) {
  const preferredName = activeCrewNameForRole(normalized);
  const assignedTrips = store.trips.filter((trip) => normalized === 'captain' ? trip.captain === preferredName : trip.mate === preferredName).filter((trip) => trip.status !== 'Cancelled');
  const notifications = store.crewNotifications.filter((notification) => notification.person === preferredName && notification.status !== 'Acknowledged');
  const pay = payrollEntries().filter((entry) => entry.person === preferredName).reduce((sum, entry) => sum + entry.outstanding, 0);
  const checklistDue = assignedTrips.filter((trip) => trip.status !== 'Completed').length;
  const body = `<div class="grid role-workspace-grid">${kpi('Assigned trips', assignedTrips.length, preferredName)}${kpi('Checklist tasks', checklistDue, 'Open trip workflow')}${kpi('Notifications', notifications.length, 'Unread / read')}${kpi('Outstanding pay', money(pay), 'Role-separated')}</div><div class="role-trip-list">${assignedTrips.length ? assignedTrips.slice(0, 4).map((trip) => `<div class="stat-row"><span>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(formatTime(trip.startTime))}</span><strong>${escapeHtml(trip.customer || 'Trip')}<br><small>${escapeHtml(trip.vessel || 'No vessel')}</small></strong></div>`).join('') : '<div class="empty-state">No assigned trips for this demo crew member.</div>'}</div>`;
  return workspaceCard(`${role} Daily Workspace`, 'Role workspace', body, [['Crew Dashboard', 'crew'], ['Dispatch Board', 'trips'], ['Pre Trip', 'pre-trip-checklist'], ['Post Trip', 'post-trip-checklist']]);
}

function activeCrewNameForRole(role) {
  if (role === 'captain' || role === 'mate') return activeCrewIdentity || getOptions('crew')[0] || '';
  return getOptions('crew')[0] || '';
}

function renderBookkeeperWorkspace() {
  const entries = payrollEntries();
  const owed = entries.reduce((sum, entry) => sum + entry.amountOwed, 0);
  const paid = entries.reduce((sum, entry) => sum + entry.amountPaid, 0);
  const balances = store.trips.reduce((sum, trip) => sum + Number(trip.balanceDue || 0), 0) + store.bookings.reduce((sum, booking) => sum + Number(booking.balance || 0), 0);
  const expenses = store.expenseSubmissions.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const body = `<div class="grid role-workspace-grid">${kpi('Balances due', money(balances), 'Trips + bookings')}${kpi('Payroll owed', money(owed), 'All role lines')}${kpi('Payroll paid', money(paid), 'Recorded payments')}${kpi('Expenses submitted', money(expenses), `${store.expenseSubmissions.length} records`)}</div><p class="section-summary">Bookkeeper workspace centers balances, payroll payment tracking, expense submissions, and payment notes.</p>`;
  return workspaceCard('Bookkeeper Daily Workspace', 'Role workspace', body, [['Payroll', 'payroll'], ['Expenses', 'expenses'], ['Bookings', 'bookings'], ['Invoices', 'invoices']]);
}

function renderOperationalCommandCenter() {
  return `<div class="card"><div class="card-header"><h3>Phase 3C Operational Completion Center</h3><span class="badge green">In-app alerts only</span></div><div class="stat-list">
    <div class="stat-row"><span>Pre-trip checklist completions</span><strong>${store.checklistCompletions.filter((item) => item.type === 'pre-trip-checklist').length}<br><small><button class="btn btn-outline btn-small" data-route="pre-trip-checklist">Record</button></small></strong></div>
    <div class="stat-row"><span>Post-trip checklist completions</span><strong>${store.checklistCompletions.filter((item) => item.type === 'post-trip-checklist').length}<br><small><button class="btn btn-outline btn-small" data-route="post-trip-checklist">Record</button></small></strong></div>
    <div class="stat-row"><span>Incident reports</span><strong>${store.incidentReports.length}<br><small><button class="btn btn-outline btn-small" data-route="reports">Report</button></small></strong></div>
    <div class="stat-row"><span>Expenses submitted</span><strong>${store.expenseSubmissions.length}<br><small><button class="btn btn-outline btn-small" data-route="expenses">Submit</button></small></strong></div>
    <div class="stat-row"><span>Low inventory events</span><strong>${store.inventoryEvents.length}<br><small><button class="btn btn-outline btn-small" data-route="inventory">Report</button></small></strong></div>
    <div class="stat-row"><span>Vessel issues</span><strong>${store.vesselIssues.length}<br><small><button class="btn btn-outline btn-small" data-route="vessels">Report</button></small></strong></div>
  </div></div>`;
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
  if (route === 'vessels') renderVesselIssuePanel();
  renderTable(route);
}

function renderForm(route, record = {}) {
  if (route === 'trips') return renderTripForm(record);
  const config = crudConfig[route];
  const form = document.querySelector(`#page-${route} .record-form`);
  form.innerHTML = `<div class="form-grid">${config.fields.map(([key, label, type]) => renderField(key, label, type, record[key], { voice: true })).join('')}</div><div class="form-actions"><button class="btn btn-primary" type="submit">Save ${config.title.slice(0, -1)}</button><button class="btn btn-outline" type="button" data-cancel>Cancel</button></div>`;
  form.onsubmit = (event) => saveRecord(event, route);
  form.querySelector('[data-cancel]').onclick = () => { editing[route] = null; form.hidden = true; };
}

function renderTripForm(record = {}) {
  const form = document.querySelector('#page-trips .record-form');
  const field = (key, label, type, required = false) => renderField(key, label, type, record[key], { voice: true, required });
  form.innerHTML = `
    <div class="dispatch-form-layout">
      <section class="form-section"><h3>Customer Details</h3><div class="form-grid">
        ${field('customer','Customer name','text', true)}${field('phone','Phone number','tel', true)}${field('email','Email','email', true)}${field('cruiseShip','Cruise ship (optional)','text')}${field('bookingSource','Booking source','select:bookingSources', true)}
      </div></section>
      <section class="form-section"><h3>Trip Details</h3><div class="form-grid">
        ${field('tripDate','Trip date','date', true)}${field('startTime','Start time','time', true)}${field('hours','Hours','number', true)}${field('passengers','Guest count','number', true)}${field('tourPackage','Tour package','text')}${field('specialRequests','Special requests','textarea')}
      </div></section>
      <section class="form-section"><h3>Financial Details</h3><div class="form-grid">
        ${field('tourPrice','Tour price','number')}${field('depositPaid','Deposit paid','number')}${field('balanceDue','Balance due','number')}${field('paymentStatus','Payment status','select:paymentStatus')}
      </div></section>
      <section class="form-section"><h3>Assignment Details</h3><div class="form-grid">
        ${field('vessel','Assigned vessel','select:vessels')}
        <div class="field"><label>Vessel Owner</label><output data-owner-preview>${escapeHtml(tripOwner(record) || 'Select a vessel')}</output><small>Auto-populates from the selected vessel. Use Owner Override only when admin needs to override.</small></div>
        ${field('ownerOverride','Owner override (optional)','select:owners')}${field('captain','Assigned captain','select:crewOptional')}${field('mate','Assigned mate','select:crewOptional')}${field('status','Trip status','select:tripStatus')}${field('adminOverride','Admin override conflicts','checkbox')}${field('overrideReason','Override reason','textarea')}
      </div></section>
      <section class="form-section"><h3>Notes</h3><div class="form-grid">
        ${field('adminNotes','Admin notes','textarea')}${field('crewNotes','Crew notes','textarea')}${field('ownerNotes','Owner notes','textarea')}
      </div></section>
    </div>
    <div class="conflict-panel" data-conflict-panel hidden></div>
    <div class="voice-panel" data-voice-panel hidden></div>
    <div class="payout-preview" data-payout-preview></div>
    <div class="form-actions"><button class="btn btn-primary" type="submit">Save Dispatch Trip</button><button class="btn btn-outline" type="button" data-cancel>Cancel</button></div>`;
  form.addEventListener('input', () => updateTripFormPreview(form));
  form.addEventListener('change', (event) => {
    if (['tourPrice', 'depositPaid'].includes(event.target.name)) updateBalanceDue(form);
    updateTripFormPreview(form);
  });
  form.onsubmit = (event) => saveRecord(event, 'trips');
  form.querySelector('[data-cancel]').onclick = () => { editing.trips = null; form.hidden = true; };
  updateTripFormPreview(form);
}

function renderField(key, label, type, value = '', options = {}) {
  const required = options.required ? 'required' : '';
  const voice = options.voice ? renderVoiceControls(key) : '';
  if (type === 'checkbox') return `<div class="field field-checkbox"><label for="${key}"><input id="${key}" name="${key}" type="checkbox" ${value ? 'checked' : ''}> ${label}</label>${voice}</div>`;
  if (type === 'textarea') return `<div class="field"><label for="${key}">${label}</label><div class="voice-field-wrap"><textarea id="${key}" name="${key}" ${required}>${escapeHtml(value)}</textarea>${voice}</div></div>`;
  if (type.startsWith('select:')) {
    const optionsList = getOptions(type.split(':')[1]);
    return `<div class="field"><label for="${key}">${label}</label><div class="voice-field-wrap"><select id="${key}" name="${key}" ${required}><option value="">— Select —</option>${optionsList.map((opt) => `<option value="${escapeHtml(opt)}" ${String(value) === String(opt) ? 'selected' : ''}>${escapeHtml(opt)}</option>`).join('')}</select>${voice}</div></div>`;
  }
  return `<div class="field"><label for="${key}">${label}</label><div class="voice-field-wrap"><input id="${key}" name="${key}" type="${type}" value="${escapeHtml(value)}" ${required}>${voice}</div></div>`;
}

function renderVoiceControls(key) {
  return `<div class="voice-controls" data-voice-controls="${key}"><button class="btn btn-outline btn-small" type="button" data-voice-field="${key}">🎙 Start Speaking</button><button class="btn btn-outline btn-small" type="button" data-voice-stop hidden>Stop</button><button class="btn btn-outline btn-small" type="button" data-voice-clear="${key}">Clear</button><span class="voice-state" data-voice-state>Insert Text</span></div>`;
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
  const existingRecord = editing[route] ? store[config.collection].find((item) => item.id === editing[route]) : null;
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  config.fields.forEach(([key,, type]) => {
    if (type === 'number') data[key] = Number(data[key] || 0);
    if (type === 'checkbox') data[key] = data[key] === 'on' ? 'Yes' : '';
  });
  if (route === 'trips') {
    data.status = data.status || 'Dispatch Pending';
    data.captainAcceptance = existingRecord?.captain === data.captain ? existingRecord?.captainAcceptance || 'Pending' : 'Pending';
    data.mateAcceptance = existingRecord?.mate === data.mate ? existingRecord?.mateAcceptance || 'Pending' : 'Pending';
    data.ownerAcknowledgement = tripOwner(existingRecord || {}) === tripOwner(data) ? existingRecord?.ownerAcknowledgement || 'Pending' : 'Pending';
    const missing = missingTripAssignmentFields(data);
    if (missing.length) {
      showTripAssignmentWarning(event.currentTarget, 'Required dispatch details missing', missing);
      toast('Complete required dispatch details before saving.');
      return;
    }
    const conflicts = findTripConflicts(data, editing[route]);
    if (conflicts.length && data.adminOverride !== 'Yes') {
      showTripConflicts(event.currentTarget, conflicts);
      toast('Conflict found. Resolve it or use Admin Override with a reason.');
      return;
    }
    if (conflicts.length && data.adminOverride === 'Yes' && !data.overrideReason.trim()) {
      showTripAssignmentWarning(event.currentTarget, 'Override reason required', ['Admin Override requires a written reason before saving.']);
      toast('Add an override reason before saving.');
      return;
    }
    data.conflictOverride = conflicts.length && data.adminOverride === 'Yes' ? 'Yes' : '';
    data.payroll = calculateTripPayroll(data);
  }
  let savedRecord;
  if (editing[route]) {
    store[config.collection] = store[config.collection].map((item) => {
      if (item.id !== editing[route]) return item;
      savedRecord = { ...item, ...data };
      return savedRecord;
    });
  } else {
    savedRecord = { id: makeId(config.collection), ...data };
    store[config.collection].push(savedRecord);
  }
  if (route === 'trips') afterTripSaved(savedRecord, existingRecord);
  auditEvent(route === 'trips' ? 'dispatch-trip-saved' : 'crud-record-saved', `${config.title} saved locally.`, { route, recordId: savedRecord.id, customer: savedRecord.customer || savedRecord.name || '' });
  editing[route] = null;
  saveStore();
  renderCrud(route);
  toast(`${config.title.slice(0, -1)} saved locally.`);
}

function deleteRecord(route, id) {
  const config = crudConfig[route];
  if (!confirm(`Delete this ${config.title.slice(0, -1).toLowerCase()}?`)) return;
  store[config.collection] = store[config.collection].filter((item) => item.id !== id);
  saveStore();
  if (route === 'trips') renderAssignmentBoard();
  if (route === 'crew') renderCrewDashboard();
  if (route === 'vessels') renderVesselIssuePanel();
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
    trip.captain && trip.captain !== 'None' ? { role: 'Captain', name: trip.captain } : null,
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
    board.className = 'dispatch-board';
    board.dataset.assignmentBoard = 'true';
    page.querySelector('.record-form').after(board);
  }
  const trips = [...store.trips].sort((a, b) => String(a.tripDate + a.startTime).localeCompare(String(b.tripDate + b.startTime)));
  const buckets = ['Today', 'Tomorrow', 'This Week', 'Future', 'Unassigned Trips', 'Conflict Warnings'];
  const grouped = buckets.reduce((acc, bucket) => ({ ...acc, [bucket]: [] }), {});
  trips.forEach((trip) => {
    if (tripHasConflict(trip)) grouped['Conflict Warnings'].push(trip);
    if (isTripUnassigned(trip)) grouped['Unassigned Trips'].push(trip);
    grouped[tripBucket(trip)].push(trip);
  });
  board.innerHTML = `<div class="dispatch-board-header"><div><p class="eyebrow">Primary workflow</p><h2>Dispatch Board</h2><p>Booking received → assign vessel → owner auto-assigned → assign crew → notify → accept → checklist → operate → payroll.</p></div><button class="btn btn-primary" onclick="showForm('trips')">Create Dispatch Trip</button></div>${buckets.map((bucket) => renderDispatchBucket(bucket, grouped[bucket])).join('')}`;
}

function renderDispatchBucket(bucket, trips) {
  const warning = bucket === 'Conflict Warnings';
  return `<section class="dispatch-bucket ${warning ? 'dispatch-bucket-warning' : ''}"><div class="dispatch-bucket-title"><h3>${escapeHtml(bucket)}</h3><span class="badge ${warning && trips.length ? 'red' : 'blue'}">${trips.length}</span></div><div class="dispatch-card-grid">${trips.length ? trips.map(renderDispatchTripCard).join('') : '<div class="empty-state">No trips in this group.</div>'}</div></section>`;
}

function renderDispatchTripCard(trip) {
  const owner = tripOwner(trip) || 'Unassigned';
  const payroll = payrollSummary(trip);
  const conflicts = findTripConflicts(trip, trip.id);
  const status = dispatchVisualStatus(trip, conflicts);
  return `<article class="dispatch-card status-${status.color}">
    <div class="dispatch-card-top"><div><span class="dispatch-time">${escapeHtml(formatTime(trip.startTime))}</span><h3>${escapeHtml(trip.customer || 'No customer')}</h3><p>${escapeHtml(formatDate(trip.tripDate))} · ${Number(trip.hours || 4)} hrs · ${Number(trip.passengers || 0)} guests</p></div><span class="badge ${status.color}">${escapeHtml(status.label)}</span></div>
    <div class="dispatch-card-gridline">
      ${dispatchMetric('Phone', trip.phone || '—')}${dispatchMetric('Email', trip.email || '—')}${dispatchMetric('Source', trip.bookingSource || '—')}${dispatchMetric('Package', trip.tourPackage || '—')}
      ${dispatchMetric('Tour Price', money(trip.tourPrice))}${dispatchMetric('Deposit Paid', money(trip.depositPaid))}${dispatchMetric('Balance Due', money(trip.balanceDue))}${dispatchMetric('Payment', trip.paymentStatus || '—')}
      ${dispatchMetric('Vessel', trip.vessel || 'Unassigned')}${dispatchMetric('Vessel Owner', owner)}${dispatchMetric('Captain', trip.captain || 'Unassigned')}${dispatchMetric('Mate', trip.mate || 'Unassigned')}
      ${dispatchMetric('Owner Pay', money(payroll.ownerPay))}${dispatchMetric('Captain Pay', money(payroll.captainPay))}${dispatchMetric('Mate Pay', money(payroll.matePay))}${dispatchMetric('Total Cost', money(payroll.totalCost))}${dispatchMetric('Estimated Net Revenue', money(payroll.netRevenue))}${dispatchMetric('Trip Status', trip.status || 'Dispatch Pending')}${dispatchMetric('Conflict Status', conflicts.length ? `${conflicts.length} conflict(s)` : (trip.conflictOverride === 'Yes' ? 'Admin override' : 'Clear'))}
    </div>
    ${conflicts.length ? renderConflictDetails(conflicts) : ''}
    <div class="acceptance-row"><span>Captain: ${escapeHtml(trip.captainAcceptance || 'Pending')}</span><span>Mate: ${escapeHtml(trip.mateAcceptance || 'Pending')}</span><span>Owner: ${escapeHtml(trip.ownerAcknowledgement || 'Pending')}</span></div>
    <div class="row-actions"><button class="btn btn-outline btn-small" data-accept-role="captain" data-trip-id="${trip.id}">Captain Accept</button><button class="btn btn-outline btn-small" data-accept-role="mate" data-trip-id="${trip.id}">Mate Accept</button><button class="btn btn-outline btn-small" data-accept-role="owner" data-trip-id="${trip.id}">Owner Acknowledge</button><button class="btn btn-primary btn-small" onclick="showForm('trips','${trip.id}')">Edit Dispatch</button></div>
  </article>`;
}

function dispatchMetric(label, value) {
  return `<div class="dispatch-metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function renderConflictDetails(conflicts) {
  return `<div class="conflict-details"><strong>Conflict Warning</strong><ul>${conflicts.map((conflict) => `<li>${escapeHtml(conflict.type)} ${escapeHtml(conflict.name)} is already assigned to ${escapeHtml(conflict.trip.customer || 'another trip')} on ${escapeHtml(formatDate(conflict.trip.tripDate))} at ${escapeHtml(formatTime(conflict.trip.startTime))} aboard ${escapeHtml(conflict.trip.vessel || 'no vessel')}.</li>`).join('')}</ul></div>`;
}

function isTripUnassigned(trip) {
  return !trip.vessel || !trip.captain || !trip.mate || trip.mate === 'None';
}

function tripHasConflict(trip) {
  return findTripConflicts(trip, trip.id).length > 0 || trip.conflictOverride === 'Yes';
}

function dispatchVisualStatus(trip, conflicts = findTripConflicts(trip, trip.id)) {
  if (trip.status === 'Cancelled') return { color: 'gray', label: 'Cancelled' };
  if (trip.status === 'Completed') return { color: 'blue', label: 'Completed' };
  if (conflicts.length) return { color: 'red', label: 'Conflict' };
  if (isTripUnassigned(trip) || Number(trip.balanceDue || 0) > 0) return { color: 'gold', label: 'Needs attention' };
  return { color: 'green', label: 'Fully assigned' };
}


function tripOwner(trip) {
  if (trip?.ownerOverride) return trip.ownerOverride;
  return store.vessels.find((vessel) => vessel.name === trip?.vessel)?.owner || '';
}

function payrollSummary(trip) {
  const entries = trip.payroll || calculateTripPayroll(trip);
  const ownerPay = entries.filter((entry) => entry.role === 'Owner').reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const captainPay = entries.filter((entry) => entry.role === 'Captain').reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const matePay = entries.filter((entry) => entry.role === 'Mate').reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const totalCost = ownerPay + captainPay + matePay;
  return { ownerPay, captainPay, matePay, totalCost, netRevenue: Number(trip.tourPrice || 0) - totalCost };
}

function updateTripFormPreview(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  ['hours', 'passengers', 'tourPrice', 'depositPaid', 'balanceDue'].forEach((key) => { data[key] = Number(data[key] || 0); });
  data.adminOverride = data.adminOverride === 'on' ? 'Yes' : '';
  const ownerOutput = form.querySelector('[data-owner-preview]');
  if (ownerOutput) ownerOutput.textContent = tripOwner(data) || 'Select a vessel';
  updateTripConflictPreview(form);
  const preview = form.querySelector('[data-payout-preview]');
  if (!preview) return;
  const payroll = payrollSummary({ ...data, payroll: calculateTripPayroll(data) });
  preview.innerHTML = `<h3>Live payout preview</h3><div class="dispatch-card-gridline">${dispatchMetric('Owner Pay', money(payroll.ownerPay))}${dispatchMetric('Captain Pay', money(payroll.captainPay))}${dispatchMetric('Mate Pay', money(payroll.matePay))}${dispatchMetric('Total Crew / Owner Cost', money(payroll.totalCost))}${dispatchMetric('Estimated Net Revenue', money(payroll.netRevenue))}</div>`;
}

function createOwnerAlert(type, title, message, tripId = '') {
  store.ownerAlerts.unshift({ id: makeId('owner-alert'), type, title, message, tripId, status: 'Unread', createdAt: new Date().toISOString(), channelReady: ['in-app'] });
}

function createCrewNotification(person, type, title, message, tripId = '') {
  if (!person || person === 'None') return;
  store.crewNotifications.unshift({ id: makeId('crew-notification'), person, type, title, message, tripId, status: 'Unread', createdAt: new Date().toISOString(), channelReady: ['in-app'] });
}

function afterTripSaved(trip, previous = null) {
  const owner = tripOwner(trip);
  if (!previous) createOwnerAlert('trip-created', 'Trip created', `${trip.customer} was added to dispatch for ${formatDate(trip.tripDate)} at ${formatTime(trip.startTime)}.`, trip.id);
  if (!previous || previous.vessel !== trip.vessel || previous.captain !== trip.captain || previous.mate !== trip.mate) {
    createOwnerAlert('trip-assigned', 'Trip assignment updated', `${trip.customer} assignment: ${trip.vessel || 'no vessel'}, Captain ${trip.captain || 'unassigned'}, Mate ${trip.mate || 'unassigned'}. Owner: ${owner || 'unassigned'}.`, trip.id);
    createCrewNotification(trip.captain, 'new-trip-assigned', 'New captain assignment', `${trip.customer} at ${formatTime(trip.startTime)} on ${formatDate(trip.tripDate)}.`, trip.id);
    createCrewNotification(trip.mate, 'new-trip-assigned', 'New mate assignment', `${trip.customer} at ${formatTime(trip.startTime)} on ${formatDate(trip.tripDate)}.`, trip.id);
  }
  if (previous && previous.startTime !== trip.startTime) {
    createOwnerAlert('trip-time-changed', 'Trip time changed', `${trip.customer} moved from ${formatTime(previous.startTime)} to ${formatTime(trip.startTime)}.`, trip.id);
    createCrewNotification(trip.captain, 'trip-time-changed', 'Trip time changed', `${trip.customer} now starts at ${formatTime(trip.startTime)}.`, trip.id);
    createCrewNotification(trip.mate, 'trip-time-changed', 'Trip time changed', `${trip.customer} now starts at ${formatTime(trip.startTime)}.`, trip.id);
  }
  if (trip.status === 'Cancelled' && previous?.status !== 'Cancelled') {
    createOwnerAlert('trip-cancelled', 'Trip cancelled', `${trip.customer} on ${formatDate(trip.tripDate)} was cancelled.`, trip.id);
    createCrewNotification(trip.captain, 'trip-cancelled', 'Trip cancelled', `${trip.customer} on ${formatDate(trip.tripDate)} was cancelled.`, trip.id);
    createCrewNotification(trip.mate, 'trip-cancelled', 'Trip cancelled', `${trip.customer} on ${formatDate(trip.tripDate)} was cancelled.`, trip.id);
  }
}

function acceptAssignment(tripId, role) {
  if (role !== 'owner' && !requirePermission('crew:acknowledge', 'Crew assignment acceptance')) return;
  if (role === 'owner' && !requirePermission('alerts:acknowledge', 'Owner acknowledgement')) return;
  const trip = store.trips.find((item) => item.id === tripId);
  if (!trip) return;
  if (role === 'captain') {
    trip.captainAcceptance = 'Accepted';
    createOwnerAlert('captain-accepted', 'Captain accepted trip', `${trip.captain || 'Captain'} accepted ${trip.customer}.`, trip.id);
  } else if (role === 'mate') {
    trip.mateAcceptance = 'Accepted';
    createOwnerAlert('mate-accepted', 'Mate accepted trip', `${trip.mate || 'Mate'} accepted ${trip.customer}.`, trip.id);
  } else if (role === 'owner') {
    trip.ownerAcknowledgement = 'Acknowledged';
  }
  auditEvent('assignment-accepted', `${role === 'owner' ? 'Owner acknowledged' : `${role} accepted`} ${trip.customer || 'dispatch trip'}.`, { tripId: trip.id, role, captainAcceptance: trip.captainAcceptance, mateAcceptance: trip.mateAcceptance, ownerAcknowledgement: trip.ownerAcknowledgement });
  saveStore();
  if (currentRoute === 'trips') renderCrud('trips');
  if (currentRoute === 'dashboard') renderDashboard();
  toast('Assignment status updated.');
}

function acknowledgeOwnerAlert(id) {
  if (!requirePermission('alerts:acknowledge', 'Owner alert acknowledgement')) return;
  const alert = store.ownerAlerts.find((item) => item.id === id);
  store.ownerAlerts = store.ownerAlerts.map((item) => item.id === id ? { ...item, status: 'Acknowledged' } : item);
  auditEvent('owner-alert-acknowledged', `${alert?.title || 'Owner alert'} acknowledged.`, { alertId: id, type: alert?.type || '' });
  saveStore();
  renderDashboard();
}

function updateCrewNotification(id, status) {
  store.crewNotifications = store.crewNotifications.map((notification) => notification.id === id ? { ...notification, status } : notification);
  saveStore();
  renderCrewDashboard();
}

function renderOwnerAlertsPanel() {
  const alerts = store.ownerAlerts.slice(0, 8);
  return `<div class="card owner-alerts"><div class="card-header"><h3>Owner Alerts</h3><span class="badge red">${store.ownerAlerts.filter((alert) => alert.status !== 'Acknowledged').length} open</span></div><div class="alert-list">${alerts.length ? alerts.map((alert) => `<div class="alert-card"><div><strong>${escapeHtml(alert.title)}</strong><p>${escapeHtml(alert.message)}</p><small>${new Date(alert.createdAt).toLocaleString()} · ${escapeHtml(alert.status)}</small></div><button class="btn btn-outline btn-small" data-alert-ack="${alert.id}">Acknowledge</button></div>`).join('') : '<div class="empty-state">No owner alerts yet.</div>'}</div></div>`;
}

function voiceSupported() {
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

function startVoiceFill(button) {
  const key = button.dataset.voiceField;
  const form = button.closest('form');
  const panel = form?.querySelector('[data-voice-panel]') || document.querySelector('[data-voice-panel]');
  if (!voiceSupported()) {
    const message = 'Voice to fill is not supported on this browser. Please use your phone keyboard microphone.';
    if (panel) { panel.hidden = false; panel.textContent = message; }
    toast(message);
    return;
  }
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new Recognition();
  const controls = button.closest('[data-voice-controls]');
  const state = controls?.querySelector('[data-voice-state]');
  if (state) state.textContent = 'Listening';
  button.textContent = 'Listening';
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    applyVoiceText(form, key, text);
    if (state) state.textContent = `Insert Text: ${text}`;
    button.textContent = '🎙 Start Speaking';
    updateTripFormPreview(form);
  };
  recognition.onerror = () => {
    if (state) state.textContent = 'Start Speaking';
    button.textContent = '🎙 Start Speaking';
  };
  recognition.start();
}

function clearVoiceField(key) {
  const field = document.getElementById(key);
  if (field) field.value = '';
}

function applyVoiceText(form, key, spokenText) {
  const text = spokenText.trim();
  const lower = text.toLowerCase();
  const commandMap = [
    [/customer name is (.+)/i, 'customer'], [/trip date is (.+)/i, 'tripDate'], [/assign (.+) as captain/i, 'captain'], [/assign (.+) as mate/i, 'mate'], [/balance due is \$?(.+)/i, 'balanceDue'], [/notes are (.+)/i, 'adminNotes']
  ];
  for (const [regex, target] of commandMap) {
    const match = text.match(regex);
    if (match) return setVoiceValue(form, target, normalizeVoiceValue(target, match[1]));
  }
  if (lower === 'mark checklist completed') return setVoiceValue(form, key, 'Completed');
  setVoiceValue(form, key, normalizeVoiceValue(key, text));
}

function normalizeVoiceValue(key, value) {
  if (key === 'balanceDue') return value.replace(/[^0-9.]/g, '');
  if (key === 'tripDate') {
    const parsed = new Date(`${value} ${new Date().getFullYear()}`);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  }
  return value;
}

function setVoiceValue(form, key, value) {
  const field = form?.elements?.[key] || document.getElementById(key);
  if (!field) return;
  field.value = value;
  field.dispatchEvent(new Event('input', { bubbles: true }));
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
  const owner = tripOwner(trip);
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
  if (!requirePermission('payroll:manage', 'Payroll payment recording')) return;
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const entry = payrollEntries().find((item) => item.key === entryKey);
  const payment = { id: makeId('payroll-payment'), entryKey, amountPaid: Number(data.amountPaid || 0), datePaid: data.datePaid, paymentMethod: data.paymentMethod, paymentNotes: data.paymentNotes };
  store.payrollPayments.push(payment);
  if (entry) {
    createOwnerAlert('payment-recorded', 'Payment recorded', `${money(data.amountPaid)} recorded for ${entry.person} (${entry.role}) on ${entry.trip.customer}.`, entry.trip.id);
    createCrewNotification(entry.person, 'payment-recorded', 'Payment recorded', `${money(data.amountPaid)} recorded for your ${entry.role} payout on ${entry.trip.customer}.`, entry.trip.id);
  }
  auditEvent('payroll-payment-recorded', `${money(payment.amountPaid)} payroll payment recorded.`, { entryKey, paymentId: payment.id, person: entry?.person || '', role: entry?.role || '', paymentMethod: payment.paymentMethod || '' });
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
  const assignedTrips = store.trips.filter((trip) => trip.captain === selected || trip.mate === selected || tripOwner(trip) === selected).sort(byDate);
  const outstanding = entries.reduce((sum, entry) => sum + entry.outstanding, 0);
  const history = entries.flatMap((entry) => entry.payments.map((payment) => ({ ...payment, entry })));
  const notifications = store.crewNotifications.filter((notification) => notification.person === selected).slice(0, 12);
  dashboard.innerHTML = `<div class="card-header"><h3>Crew dashboard</h3><select data-crew-select onchange="renderCrewDashboard()">${getOptions('crew').map((name) => `<option value="${escapeHtml(name)}" ${name === selected ? 'selected' : ''}>${escapeHtml(name)}</option>`).join('')}</select></div><div class="crew-dashboard-body"><div><h4>Assigned trips</h4>${assignedTrips.length ? assignedTrips.map((trip) => `<div class="stat-row"><span>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(formatTime(trip.startTime))}</span><strong>${escapeHtml(trip.customer || 'No customer')}<br><small>${escapeHtml([trip.vessel, trip.captain === selected ? `Captain ${trip.captainAcceptance || 'Pending'}` : '', trip.mate === selected ? `Mate ${trip.mateAcceptance || 'Pending'}` : '', tripOwner(trip) === selected ? `Owner ${trip.ownerAcknowledgement || 'Pending'}` : ''].filter(Boolean).join(' · '))}</small></strong></div>`).join('') : '<p class="empty-state">No assigned trips.</p>'}</div><div><h4>Outstanding pay</h4><div class="kpi-value">${money(outstanding)}</div>${entries.map((entry) => `<div class="stat-row"><span>${escapeHtml(entry.role)} · ${escapeHtml(formatDate(entry.trip.tripDate))}</span><strong>${money(entry.outstanding)}</strong></div>`).join('') || '<p class="empty-state">No outstanding pay.</p>'}</div><div><h4>Payment history</h4>${history.length ? history.map((payment) => `<div class="stat-row"><span>${escapeHtml(payment.datePaid || 'No date')} · ${escapeHtml(payment.paymentMethod || 'No method')}</span><strong>${money(payment.amountPaid)}<br><small>${escapeHtml(payment.paymentNotes || payment.entry.role)}</small></strong></div>`).join('') : '<p class="empty-state">No payment history.</p>'}</div></div>${renderCrewNotificationsPanel(notifications)}`;
}

function renderCrewNotificationsPanel(notifications) {
  return `<div class="crew-notifications"><h4>Crew Notifications</h4>${notifications.length ? notifications.map((notification) => `<div class="notification-card"><div><strong>${escapeHtml(notification.title)}</strong><p>${escapeHtml(notification.message)}</p><small>${new Date(notification.createdAt).toLocaleString()} · ${escapeHtml(notification.status)}</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-notification-id="${notification.id}" data-notification-status="Unread">Unread</button><button class="btn btn-outline btn-small" data-notification-id="${notification.id}" data-notification-status="Read">Read</button><button class="btn btn-primary btn-small" data-notification-id="${notification.id}" data-notification-status="Acknowledged">Acknowledged</button></div></div>`).join('') : '<p class="empty-state">No crew notifications.</p>'}</div>`;
}


function renderOperationalPage(route) {
  const config = operationalConfig[route];
  const records = store[config.collection] || [];
  document.getElementById(`page-${route}`).innerHTML = `<div class="page-stack operational-page"><div class="section-heading"><div><p class="eyebrow">${escapeHtml(config.eyebrow)}</p><h1>${escapeHtml(config.title)}</h1><p class="section-summary">${escapeHtml(config.summary)}</p></div><button class="btn btn-primary" data-route="trips">Open Dispatch Board</button></div>${renderOperationalSummary(route)}${route === 'reports' ? renderAuditLogPanel(12) : ''}<form class="record-form card" data-operational-form="${route}"><div class="form-grid">${config.fields.map(([key, label, type]) => renderField(key, label, type, defaultOperationalValue(key, type), { voice: true })).join('')}</div><div class="form-actions"><button class="btn btn-primary" type="submit">${escapeHtml(config.addLabel)}</button>${config.legacyFile ? `<button class="btn btn-outline" type="button" data-route="legacy" data-embed-legacy="${config.legacyFile}">Open legacy tool</button>` : ''}</div></form><div class="card"><div class="card-header"><h3>Recent ${escapeHtml(config.title)}</h3><span class="badge blue">${records.length}</span></div><div class="stat-list">${records.length ? records.slice(0, 8).map((record) => renderOperationalRecord(route, record)).join('') : '<div class="empty-state">No records submitted yet.</div>'}</div></div></div>`;
}

function defaultOperationalValue(key, type) {
  if (type === 'datetime-local') return new Date().toISOString().slice(0, 16);
  if (key.endsWith('Date') || key === 'neededBy') return new Date().toISOString().slice(0, 10);
  if (key === 'status') return 'Submitted';
  return '';
}

function renderOperationalSummary(route) {
  if (route === 'pre-trip-checklist' || route === 'post-trip-checklist') {
    const type = operationalConfig[route].type;
    const count = store.checklistCompletions.filter((item) => item.type === type).length;
    return `<div class="grid kpi-grid">${kpi('Completions', count, 'Recorded in app')}${kpi('Open trips', store.trips.filter((trip) => trip.status !== 'Cancelled' && trip.status !== 'Completed').length, 'Dispatch ready')}${kpi('Owner alerts', store.ownerAlerts.length, 'In-app only')}${kpi('Crew notices', store.crewNotifications.length, 'In-app only')}</div>`;
  }
  return `<div class="grid kpi-grid">${kpi('Records', (store[operationalConfig[route].collection] || []).length, 'Submitted locally')}${kpi('Owner alerts', store.ownerAlerts.length, 'In-app only')}${kpi('Crew notices', store.crewNotifications.length, 'In-app only')}${kpi('Dispatch trips', store.trips.length, 'Related trips')}</div>`;
}

function renderOperationalRecord(route, record) {
  const primary = record.tripRef || record.itemName || record.incidentType || record.category || record.vessel || 'Operational record';
  const secondary = record.notes || record.status || record.severity || record.priority || 'No notes';
  const date = record.completedAt || record.expenseDate || record.incidentDate || record.neededBy || record.reportedAt;
  return `<div class="stat-row"><span>${escapeHtml(date ? new Date(date).toLocaleString() : 'No date')}<br><small>${escapeHtml(secondary)}</small></span><strong>${escapeHtml(primary)}<br><small>${escapeHtml(record.completedBy || record.reportedBy || record.submittedBy || record.assignedTo || '')}</small></strong></div>`;
}

function saveOperationalRecord(event, route) {
  event.preventDefault();
  const config = operationalConfig[route];
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  config.fields.forEach(([key,, type]) => { if (type === 'number') data[key] = Number(data[key] || 0); });
  const record = { id: makeId(config.collection), type: config.type, reportedAt: new Date().toISOString(), ...data };
  store[config.collection].unshift(record);
  triggerOperationalNotifications(route, record);
  auditEvent('operational-record-submitted', `${config.title} record submitted.`, { route, recordId: record.id, type: record.type, tripRef: record.tripRef || '' });
  saveStore();
  renderOperationalPage(route);
  toast(`${config.title} record saved.`);
}

function triggerOperationalNotifications(route, record) {
  const trip = tripFromRef(record.tripRef);
  const tripId = trip?.id || '';
  if (route === 'pre-trip-checklist') {
    createOwnerAlert('pre-trip-checklist-completed', 'Pre trip checklist completed', `${record.completedBy || 'Crew'} completed pre-trip checklist for ${record.tripRef || 'a dispatch trip'}.`, tripId);
    if (trip) trip.status = 'Pre Trip Complete';
  } else if (route === 'post-trip-checklist') {
    createOwnerAlert('post-trip-checklist-completed', 'Post trip checklist completed', `${record.completedBy || 'Crew'} completed post-trip checklist for ${record.tripRef || 'a dispatch trip'}. Owner completion alert generated.`, tripId);
    if (trip) trip.status = 'Completed';
  } else if (route === 'reports') {
    createOwnerAlert('incident-reported', 'Incident reported', `${record.severity || 'Incident'}: ${record.incidentType || 'Incident'} for ${record.tripRef || 'operations'}.`, tripId);
    notifyTripCrew(trip, 'incident-reported', 'Incident reported', record.notes || 'Incident reported for your trip.');
  } else if (route === 'expenses') {
    createOwnerAlert('expense-submitted', 'Expense submitted', `${money(record.amount)} ${record.category || 'expense'} submitted by ${record.submittedBy || 'crew'}.`, tripId);
  } else if (route === 'inventory') {
    createOwnerAlert('inventory-low', 'Inventory item marked low', `${record.itemName || 'Inventory item'} is ${record.priority || 'reported'} and needs restocking.`, tripId);
    createCrewNotification(record.assignedTo, 'supplies-need-restocking', 'Supplies need restocking', `${record.itemName || 'Inventory item'} needs attention.`, tripId);
  }
}

function renderVesselIssuePanel() {
  const page = document.getElementById('page-vessels');
  const form = page.querySelector('.record-form');
  if (!form || page.querySelector('[data-vessel-issue-panel]')) return;
  const panel = document.createElement('div');
  panel.className = 'card operational-panel';
  panel.dataset.vesselIssuePanel = 'true';
  panel.innerHTML = `<div class="card-header"><h3>Vessel Issue Report</h3><span class="badge red">Owner alert trigger</span></div><form class="record-form" data-vessel-issue-form><div class="form-grid">${renderField('vessel','Vessel','select:vessels','',{ voice: true })}${renderField('reportedBy','Reported by','select:crewOptional','',{ voice: true })}${renderField('severity','Severity','select:issueSeverity','Medium',{ voice: true })}${renderField('issueType','Issue type','text','',{ voice: true })}${renderField('assignedTo','Assigned to','select:crewOptional','',{ voice: true })}${renderField('notes','Issue notes','textarea','',{ voice: true })}</div><div class="form-actions"><button class="btn btn-primary" type="submit">Report vessel issue</button></div></form><div class="stat-list">${store.vesselIssues.length ? store.vesselIssues.slice(0, 5).map((issue) => renderOperationalRecord('vessels', issue)).join('') : '<div class="empty-state">No vessel issues reported.</div>'}</div>`;
  form.after(panel);
}

function saveVesselIssue(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const issue = { id: makeId('vessel-issue'), type: 'vessel-issue-reported', reportedAt: new Date().toISOString(), ...data };
  store.vesselIssues.unshift(issue);
  createOwnerAlert('vessel-issue-reported', 'Vessel issue reported', `${issue.severity || 'Issue'} issue on ${issue.vessel || 'a vessel'}: ${issue.issueType || issue.notes || 'No details'}.`, '');
  createCrewNotification(issue.assignedTo, 'vessel-issue-assigned', 'Vessel issue assigned', `${issue.vessel || 'Vessel'} issue needs attention: ${issue.issueType || 'No type'}.`, '');
  auditEvent('vessel-issue-reported', `Vessel issue reported for ${issue.vessel || 'a vessel'}.`, { issueId: issue.id, vessel: issue.vessel || '', severity: issue.severity || '', assignedTo: issue.assignedTo || '' });
  saveStore();
  renderCrud('vessels');
  toast('Vessel issue reported.');
}

function tripFromRef(tripRef) {
  if (!tripRef) return null;
  return store.trips.find((trip) => `${trip.customer || 'Trip'} — ${formatDate(trip.tripDate)} ${formatTime(trip.startTime)}` === tripRef) || null;
}

function notifyTripCrew(trip, type, title, message) {
  if (!trip) return;
  createCrewNotification(trip.captain, type, title, message, trip.id);
  createCrewNotification(trip.mate, type, title, message, trip.id);
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
  return matches[route] ? `<p><button class="btn btn-primary" data-route="legacy" data-embed-legacy="${matches[route]}">Open related legacy tool</button></p>` : '';
}
function buildExportPackage() {
  const counts = Object.keys(seedData).reduce((acc, key) => {
    if (Array.isArray(store[key])) acc[key] = store[key].length;
    return acc;
  }, {});
  return { exportedAt: new Date().toISOString(), storeKey: STORE_KEY, storeVersion: STORE_VERSION, exportedBy: currentUser()?.name || activeCrewIdentity, role: activeWorkspaceRole, counts, data: structuredClone(store) };
}

function exportAuditLog() {
  if (!requirePermission('audit:view', 'Audit export')) return;
  auditEvent('audit-log-exported', 'Audit log JSON exported locally.', { eventCount: store.auditLog.length });
  saveStore();
  const text = JSON.stringify({ exportedAt: new Date().toISOString(), storeVersion: STORE_VERSION, auditLog: store.auditLog }, null, 2);
  const target = document.getElementById('auditExportText');
  if (target) { target.hidden = false; target.value = text; }
  downloadText(`rat-audit-log-${new Date().toISOString().slice(0, 10)}.json`, text);
  toast('Audit export prepared locally.');
}

function clearAuditLog() {
  if (!requirePermission('audit:view', 'Audit log clear')) return;
  if (!confirm('Clear local audit log? This only clears the browser demo audit trail.')) return;
  store.auditLog = [];
  auditEvent('audit-log-cleared', 'Local audit log cleared by Owner/Admin.', { clearedAt: new Date().toISOString() });
  saveStore();
  renderRoute(currentRoute);
  toast('Local audit log cleared.');
}

function exportLocalStore() {
  if (!requirePermission('data:manage', 'Local data export')) return;
  auditEvent('store-export-generated', 'Full local store export generated.', { storeVersion: STORE_VERSION });
  const snapshot = { id: makeId('export-snapshot'), exportedAt: new Date().toISOString(), exportedBy: currentUser()?.name || activeCrewIdentity, recordCount: Object.values(store).filter(Array.isArray).reduce((sum, records) => sum + records.length, 0) };
  store.exportSnapshots.unshift(snapshot);
  store.exportSnapshots = store.exportSnapshots.slice(0, 10);
  saveStore();
  const text = JSON.stringify(buildExportPackage(), null, 2);
  const target = document.getElementById('dataExportText');
  if (target) target.value = text;
  downloadText(`rat-local-store-${new Date().toISOString().slice(0, 10)}.json`, text);
  toast('Local store export prepared.');
}

function importLocalStore() {
  if (!requirePermission('data:manage', 'Local data import')) return;
  const source = document.getElementById('dataImportText');
  const raw = source?.value?.trim();
  if (!raw) { toast('Paste an export JSON package before importing.'); return; }
  try {
    const parsed = JSON.parse(raw);
    const imported = parsed.data || parsed;
    store = migrateStore(imported);
    auditEvent('store-import-completed', 'Local store import completed.', { importedVersion: parsed.storeVersion || imported.version || 'unknown' });
    saveStore();
    renderRoute('settings');
    toast('Local store import completed.');
  } catch (error) {
    toast(`Import failed: ${error.message}`);
  }
}

function resetSeedData() {
  if (!requirePermission('data:manage', 'Seed data reset')) return;
  if (!confirm('Reset local demo data to seed records?')) return;
  localStorage.removeItem(STORE_KEY);
  store = seedStore();
  syncIdentityFromSession();
  auditEvent('seed-data-reset', 'Seed data restored locally.', { storeVersion: STORE_VERSION });
  saveStore();
  renderRoute(currentRoute);
  toast('Seed data restored.');
}

function downloadText(filename, text) {
  if (!window.URL || typeof Blob === 'undefined') return;
  const blob = new Blob([text], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}


function syncCollections() {
  return ['trips', 'payrollPayments', 'ownerAlerts', 'crewNotifications', 'checklistCompletions', 'incidentReports', 'expenseSubmissions', 'inventoryEvents', 'vesselIssues', 'auditLog'];
}

function buildSyncManifest() {
  const collections = syncCollections().map((name) => {
    const records = Array.isArray(store[name]) ? store[name] : [];
    const latest = records.map((record) => record.updatedAt || record.createdAt || record.reportedAt || record.completedAt || record.exportedAt || '').filter(Boolean).sort().at(-1) || '';
    return { name, count: records.length, latestChange: latest, ready: true };
  });
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, storeKey: STORE_KEY, reviewedBy: currentUser()?.name || activeCrewIdentity, role: activeWorkspaceRole, collections };
}

function queueSyncReview() {
  if (!requirePermission('sync:review', 'Sync review queue')) return;
  const manifest = buildSyncManifest();
  const review = { id: makeId('sync-review'), status: 'Queued', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, manifest };
  store.syncReviews.unshift(review);
  store.syncReviews = store.syncReviews.slice(0, 25);
  auditEvent('sync-review-queued', 'Server sync review queued locally.', { reviewId: review.id, collections: manifest.collections.length });
  saveStore();
  renderRoute('settings');
  toast('Sync review queued locally.');
}

function updateSyncReviewStatus(id, status) {
  if (!requirePermission('sync:review', 'Sync review status update')) return;
  store.syncReviews = store.syncReviews.map((review) => review.id === id ? { ...review, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : review);
  auditEvent('sync-review-status-updated', `Sync review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Sync review marked ${status}.`);
}

function renderSyncReadinessPanel() {
  const manifest = buildSyncManifest();
  const rows = manifest.collections.map((collection) => `<div class="stat-row"><span>${escapeHtml(collection.name)}<br><small>${escapeHtml(collection.latestChange || 'No timestamp yet')}</small></span><strong>${collection.count} records<br><small>${collection.ready ? 'Ready for review' : 'Needs cleanup'}</small></strong></div>`).join('');
  const reviews = store.syncReviews.slice(0, 5).map((review) => `<div class="sync-review-card"><div><strong>${escapeHtml(review.status)}</strong><p>${escapeHtml(new Date(review.createdAt).toLocaleString())} · ${escapeHtml(review.createdBy || 'Unknown')}</p><small>${review.manifest.collections.reduce((sum, item) => sum + item.count, 0)} records across ${review.manifest.collections.length} collections</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-sync-review-id="${review.id}" data-sync-review-status="Reviewed">Reviewed</button><button class="btn btn-primary btn-small" data-sync-review-id="${review.id}" data-sync-review-status="Ready for Server">Ready for Server</button></div></div>`).join('');
  return `<div class="legacy-tool sync-readiness-panel"><h3>Phase 3I Server Sync Readiness</h3><p>Review the local operational collections before any future backend sync. This phase does not transmit data externally.</p><div class="legacy-actions"><button class="btn btn-primary" data-sync-queue="true">Queue sync review</button></div><div class="stat-list">${rows}</div><h4>Recent sync reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No sync reviews queued yet.</div>'}</div></div>`;
}


function apiContractCollections() {
  return {
    trips: { endpoint: '/api/dispatch-trips', method: 'POST/PUT', required: ['id', 'customer', 'tripDate', 'startTime', 'vessel', 'captain', 'mate', 'status'] },
    payrollPayments: { endpoint: '/api/payroll-payments', method: 'POST', required: ['id', 'entryKey', 'amountPaid', 'datePaid'] },
    ownerAlerts: { endpoint: '/api/owner-alerts', method: 'POST/PATCH', required: ['id', 'type', 'title', 'message', 'status'] },
    crewNotifications: { endpoint: '/api/crew-notifications', method: 'POST/PATCH', required: ['id', 'person', 'type', 'title', 'status'] },
    checklistCompletions: { endpoint: '/api/checklists', method: 'POST', required: ['id', 'type', 'tripRef', 'completedBy'] },
    incidentReports: { endpoint: '/api/incidents', method: 'POST', required: ['id', 'incidentDate', 'severity', 'incidentType'] },
    expenseSubmissions: { endpoint: '/api/expenses', method: 'POST/PATCH', required: ['id', 'submittedBy', 'amount', 'status'] },
    inventoryEvents: { endpoint: '/api/inventory-events', method: 'POST/PATCH', required: ['id', 'itemName', 'priority'] },
    vesselIssues: { endpoint: '/api/vessel-issues', method: 'POST/PATCH', required: ['id', 'vessel', 'severity', 'issueType'] },
    auditLog: { endpoint: '/api/audit-events', method: 'POST', required: ['id', 'type', 'message', 'createdAt'] }
  };
}

function syncEligibilityForCollection(name, contract) {
  const records = Array.isArray(store[name]) ? store[name] : [];
  const blockers = [];
  records.forEach((record) => {
    const missing = contract.required.filter((field) => record[field] === undefined || record[field] === null || record[field] === '');
    if (missing.length) blockers.push({ id: record.id || 'missing-id', missing });
  });
  return { name, endpoint: contract.endpoint, method: contract.method, required: contract.required, count: records.length, eligible: blockers.length === 0, blockers };
}

function buildApiContract() {
  const contracts = apiContractCollections();
  const collections = Object.entries(contracts).map(([name, contract]) => syncEligibilityForCollection(name, contract));
  const blockerCount = collections.reduce((sum, collection) => sum + collection.blockers.length, 0);
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, environment: 'browser-local-demo', externalTransmission: false, collections, blockerCount };
}

function queueApiContractReview() {
  if (!requirePermission('api:review', 'API contract review')) return;
  const contract = buildApiContract();
  const review = { id: makeId('api-contract-review'), status: contract.blockerCount ? 'Needs Cleanup' : 'Ready for Backend', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, contract };
  store.apiContractReviews.unshift(review);
  store.apiContractReviews = store.apiContractReviews.slice(0, 25);
  auditEvent('api-contract-review-queued', 'API contract review queued locally.', { reviewId: review.id, blockerCount: contract.blockerCount });
  saveStore();
  renderRoute('settings');
  toast('API contract review queued.');
}

function updateApiContractReviewStatus(id, status) {
  if (!requirePermission('api:review', 'API contract review status update')) return;
  store.apiContractReviews = store.apiContractReviews.map((review) => review.id === id ? { ...review, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : review);
  auditEvent('api-contract-review-status-updated', `API contract review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`API contract review marked ${status}.`);
}

function renderApiContractPanel() {
  const contract = buildApiContract();
  const rows = contract.collections.map((collection) => `<div class="stat-row"><span>${escapeHtml(collection.endpoint)}<br><small>${escapeHtml(collection.method)} · required: ${escapeHtml(collection.required.join(', '))}</small></span><strong>${collection.eligible ? 'Eligible' : 'Needs cleanup'}<br><small>${collection.count} records · ${collection.blockers.length} blockers</small></strong></div>`).join('');
  const reviews = store.apiContractReviews.slice(0, 5).map((review) => `<div class="sync-review-card"><div><strong>${escapeHtml(review.status)}</strong><p>${escapeHtml(new Date(review.createdAt).toLocaleString())} · ${escapeHtml(review.createdBy || 'Unknown')}</p><small>${review.contract.collections.length} endpoints · ${review.contract.blockerCount} blockers</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-api-review-id="${review.id}" data-api-review-status="Reviewed">Reviewed</button><button class="btn btn-primary btn-small" data-api-review-id="${review.id}" data-api-review-status="Backend Ready">Backend Ready</button></div></div>`).join('');
  return `<div class="legacy-tool api-contract-panel"><h3>Phase 3J Backend API Contract</h3><p>Draft backend endpoints and record-level eligibility checks for future server auth/sync. No network requests are made in this phase.</p><div class="legacy-actions"><button class="btn btn-primary" data-api-review="true">Queue API contract review</button></div><div class="stat-list">${rows}</div><h4>Recent API contract reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No API contract reviews queued yet.</div>'}</div></div>`;
}


function backendPermissionMatrix() {
  return [
    { role: 'Admin', view: 'All records, settings, audit, exports, auth readiness, API readiness', create: 'All operational records and users when backend auth exists', edit: 'All dispatch, crew, vessel, payroll, settings records', approve: 'Payroll, expenses, overrides, sync/API readiness', delete: 'Allowed with audit trail and future server policy', acknowledge: 'All owner/admin alerts and sync/auth reviews', export: 'Full data, audit, payroll, and settings exports' },
    { role: 'Owner', view: 'Dispatch, vessels, owner alerts, payroll, audit, reports, exports', create: 'Trips, alerts, vessel issues, reviews, operational records', edit: 'Trips, vessel ownership, owner notes, payroll review fields', approve: 'Payroll, expenses, admin overrides, completion reviews', delete: 'Limited operational cleanup with audit trail', acknowledge: 'Owner alerts, crew acceptance events, sync/API/auth reviews', export: 'Operational, payroll, audit, and owner reports' },
    { role: 'Captain', view: 'Assigned trips, checklist tasks, crew notifications, own pay history', create: 'Checklist completions, incidents, expenses, vessel issues', edit: 'Own checklist/incident notes before submission lock', approve: 'None in backend phase unless delegated by admin', delete: 'None', acknowledge: 'Captain assignments and crew notifications', export: 'Own trip/pay summary only' },
    { role: 'Mate', view: 'Assigned trips, checklist tasks, crew notifications, own pay history', create: 'Checklist notes, incident notes, expenses, inventory restock needs', edit: 'Own submitted notes before submission lock', approve: 'None in backend phase unless delegated by admin', delete: 'None', acknowledge: 'Mate assignments and crew notifications', export: 'Own trip/pay summary only' },
    { role: 'Bookkeeper', view: 'Invoices, balances, payroll, expenses, payment history', create: 'Payroll payment records, expense/payment notes, invoice updates', edit: 'Payroll paid fields, payment methods, invoice balances', approve: 'Payment reconciliation and bookkeeper review statuses', delete: 'None without Admin override', acknowledge: 'Payment alerts and bookkeeping notifications', export: 'Payroll, invoice, expense, and payment reports' }
  ];
}

function authReadinessChecklist() {
  return [
    { item: 'Real authentication provider', status: 'Not connected', notes: 'Future backend should replace demo user selector with secure login.' },
    { item: 'Server-side sessions', status: 'Not connected', notes: 'Current authSession remains browser-local only.' },
    { item: 'Role claims', status: 'Designed locally', notes: 'Backend should issue Admin/Owner/Captain/Mate/Bookkeeper claims.' },
    { item: 'Crew-user mapping', status: 'Designed locally', notes: 'Existing demoUsers show the required user-to-crew relationship.' },
    { item: 'Permission audit trail', status: 'Designed locally', notes: 'Permission denials and readiness reviews are audit logged in app.' },
    { item: 'External services', status: 'Not connected', notes: 'No email, SMS, WhatsApp, push, or backend APIs are called in this phase.' }
  ];
}

function buildAuthReadinessReview() {
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, externalAuthConnected: false, backendConnected: false, roles: backendPermissionMatrix(), checklist: authReadinessChecklist() };
}

function queueAuthReadinessReview() {
  if (!requirePermission('api:review', 'Auth readiness review')) return;
  const review = { id: makeId('auth-readiness-review'), status: 'Drafted', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, readiness: buildAuthReadinessReview() };
  store.authReadinessReviews.unshift(review);
  store.authReadinessReviews = store.authReadinessReviews.slice(0, 25);
  auditEvent('auth-readiness-review-queued', 'Server auth readiness review queued locally.', { reviewId: review.id, roles: review.readiness.roles.length });
  saveStore();
  renderRoute('settings');
  toast('Auth readiness review queued.');
}

function updateAuthReadinessReviewStatus(id, status) {
  if (!requirePermission('api:review', 'Auth readiness status update')) return;
  store.authReadinessReviews = store.authReadinessReviews.map((review) => review.id === id ? { ...review, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : review);
  auditEvent('auth-readiness-review-status-updated', `Auth readiness review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Auth readiness review marked ${status}.`);
}

function renderAuthReadinessPanel() {
  const roles = backendPermissionMatrix();
  const checklist = authReadinessChecklist();
  const roleRows = roles.map((role) => `<tr><th>${escapeHtml(role.role)}</th><td>${escapeHtml(role.view)}</td><td>${escapeHtml(role.create)}</td><td>${escapeHtml(role.edit)}</td><td>${escapeHtml(role.approve)}</td><td>${escapeHtml(role.delete)}</td><td>${escapeHtml(role.acknowledge)}</td><td>${escapeHtml(role.export)}</td></tr>`).join('');
  const checklistRows = checklist.map((item) => `<div class="stat-row"><span>${escapeHtml(item.item)}<br><small>${escapeHtml(item.notes)}</small></span><strong>${escapeHtml(item.status)}</strong></div>`).join('');
  const reviews = store.authReadinessReviews.slice(0, 5).map((review) => `<div class="sync-review-card"><div><strong>${escapeHtml(review.status)}</strong><p>${escapeHtml(new Date(review.createdAt).toLocaleString())} · ${escapeHtml(review.createdBy || 'Unknown')}</p><small>${review.readiness.roles.length} roles · real auth not connected</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-auth-review-id="${review.id}" data-auth-review-status="Reviewed">Reviewed</button><button class="btn btn-primary btn-small" data-auth-review-id="${review.id}" data-auth-review-status="Backend Auth Ready">Backend Auth Ready</button></div></div>`).join('');
  return `<div class="legacy-tool auth-readiness-panel"><h3>Phase 3K Server Auth Readiness</h3><p>Future authentication design only. Real login, server sessions, external identity providers, and backend services are intentionally not connected yet.</p><div class="legacy-actions"><button class="btn btn-primary" data-auth-review="true">Queue auth readiness review</button></div><div class="table-wrap permission-matrix"><table><thead><tr><th>Role</th><th>View</th><th>Create</th><th>Edit</th><th>Approve</th><th>Delete</th><th>Acknowledge</th><th>Export</th></tr></thead><tbody>${roleRows}</tbody></table></div><h4>Authentication readiness checklist</h4><div class="stat-list">${checklistRows}</div><h4>Recent auth readiness reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No auth readiness reviews queued yet.</div>'}</div></div>`;
}


function backendSchemaDefinitions() {
  return {
    dispatchTrip: { table: 'dispatch_trips', primaryKey: 'id', fields: ['id:string', 'customer:string|required', 'phone:string', 'email:string', 'tripDate:date|required', 'startTime:time|required', 'hours:number|required', 'passengers:number|required', 'vessel:string|required', 'captain:string', 'mate:string', 'status:string|required', 'createdBy:string', 'updatedAt:datetime'], validations: ['tripDate must be valid date', 'hours must be greater than 0', 'passengers must be 1 or greater', 'vessel/captain/mate conflicts must be rejected unless admin override reason exists'] },
    payrollEntry: { table: 'payroll_entries', primaryKey: 'tripId+role+person', fields: ['tripId:string|required', 'person:string|required', 'role:string|required', 'amount:number|required', 'weekStart:date|required', 'paidAmount:number'], validations: ['amount must be non-negative', 'role must be Owner/Captain/Mate', 'payments cannot exceed amount owed without override'] },
    ownerAlert: { table: 'owner_alerts', primaryKey: 'id', fields: ['id:string', 'type:string|required', 'title:string|required', 'message:string|required', 'status:string|required', 'tripId:string', 'createdAt:datetime|required'], validations: ['status must be Unread/Read/Acknowledged', 'message cannot be empty'] },
    crewNotification: { table: 'crew_notifications', primaryKey: 'id', fields: ['id:string', 'person:string|required', 'type:string|required', 'title:string|required', 'status:string|required', 'tripId:string'], validations: ['person must map to active crew', 'status must be Unread/Read/Acknowledged'] },
    operationalRecord: { table: 'operational_records', primaryKey: 'id', fields: ['id:string', 'type:string|required', 'tripRef:string', 'reportedAt:datetime|required', 'reportedBy:string', 'status:string'], validations: ['type must map to checklist/incident/expense/inventory/vessel issue', 'critical records trigger owner alert'] },
    auditEvent: { table: 'audit_events', primaryKey: 'id', fields: ['id:string', 'type:string|required', 'message:string|required', 'userId:string', 'role:string', 'createdAt:datetime|required'], validations: ['audit events are append-only', 'permission denials must include permission detail'] },
    authUser: { table: 'auth_users', primaryKey: 'id', fields: ['id:string', 'email:string|required', 'role:string|required', 'crewId:string', 'active:boolean|required'], validations: ['role must be Admin/Owner/Captain/Mate/Bookkeeper', 'crewId must map when role is Captain/Mate'] }
  };
}

function buildServerValidationRules() {
  return Object.entries(backendSchemaDefinitions()).map(([entity, schema]) => ({ entity, table: schema.table, primaryKey: schema.primaryKey, fieldCount: schema.fields.length, validations: schema.validations, serverReady: true }));
}

function buildSchemaReadinessReview() {
  const schemas = backendSchemaDefinitions();
  const rules = buildServerValidationRules();
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, backendConnected: false, schemaCount: Object.keys(schemas).length, schemas, rules };
}

function queueSchemaReview() {
  if (!requirePermission('api:review', 'Schema readiness review')) return;
  const readiness = buildSchemaReadinessReview();
  const review = { id: makeId('schema-review'), status: 'Drafted', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, readiness };
  store.schemaReviews.unshift(review);
  store.schemaReviews = store.schemaReviews.slice(0, 25);
  auditEvent('schema-readiness-review-queued', 'Server schema readiness review queued locally.', { reviewId: review.id, schemaCount: readiness.schemaCount });
  saveStore();
  renderRoute('settings');
  toast('Schema readiness review queued.');
}

function updateSchemaReviewStatus(id, status) {
  if (!requirePermission('api:review', 'Schema readiness status update')) return;
  store.schemaReviews = store.schemaReviews.map((review) => review.id === id ? { ...review, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : review);
  auditEvent('schema-readiness-review-status-updated', `Schema readiness review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Schema readiness review marked ${status}.`);
}

function renderSchemaReadinessPanel() {
  const readiness = buildSchemaReadinessReview();
  const rows = Object.entries(readiness.schemas).map(([entity, schema]) => `<div class="stat-row"><span>${escapeHtml(entity)} → ${escapeHtml(schema.table)}<br><small>PK: ${escapeHtml(schema.primaryKey)} · ${schema.fields.length} fields</small></span><strong>${schema.validations.length} rules<br><small>${escapeHtml(schema.validations[0])}</small></strong></div>`).join('');
  const reviews = store.schemaReviews.slice(0, 5).map((review) => `<div class="sync-review-card"><div><strong>${escapeHtml(review.status)}</strong><p>${escapeHtml(new Date(review.createdAt).toLocaleString())} · ${escapeHtml(review.createdBy || 'Unknown')}</p><small>${review.readiness.schemaCount} schemas · backend not connected</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-schema-review-id="${review.id}" data-schema-review-status="Reviewed">Reviewed</button><button class="btn btn-primary btn-small" data-schema-review-id="${review.id}" data-schema-review-status="Backend Schema Ready">Backend Schema Ready</button></div></div>`).join('');
  return `<div class="legacy-tool schema-readiness-panel"><h3>Phase 3L Backend Schema Readiness</h3><p>Draft backend data models and server-side validation rules for future implementation. This is local planning only; no backend is connected.</p><div class="legacy-actions"><button class="btn btn-primary" data-schema-review="true">Queue schema readiness review</button></div><div class="stat-list">${rows}</div><h4>Server validation rules</h4><div class="permission-list">${readiness.rules.map((rule) => `<span class="permission-chip">${escapeHtml(rule.entity)}: ${rule.validations.length} rules</span>`).join('')}</div><h4>Recent schema reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No schema readiness reviews queued yet.</div>'}</div></div>`;
}


function backendMigrationPlan() {
  return [
    { step: '1. Export browser store', owner: 'Admin', status: 'Planned', notes: 'Use existing local export package as pre-migration snapshot.' },
    { step: '2. Validate schema readiness', owner: 'Admin', status: 'Planned', notes: 'Run backend schema validation rules before writing server data.' },
    { step: '3. Migrate dispatch trips', owner: 'Operations', status: 'Planned', notes: 'Preserve conflict override reasons, assignment statuses, and payout previews.' },
    { step: '4. Migrate payroll/payment history', owner: 'Bookkeeper', status: 'Planned', notes: 'Keep role-separated owner/captain/mate payouts and weekly paid status.' },
    { step: '5. Migrate alerts and notifications', owner: 'Owner', status: 'Planned', notes: 'Preserve unread/read/acknowledged states for owner and crew notices.' },
    { step: '6. Migrate audit events last', owner: 'Admin', status: 'Planned', notes: 'Audit log should be append-only and tied to server user IDs after auth is live.' }
  ];
}

function recordRetentionRules() {
  return [
    { record: 'Dispatch trips', retention: '7 years', reason: 'Customer, crew assignment, payroll, and incident traceability.' },
    { record: 'Payroll payments', retention: '7 years', reason: 'Bookkeeping and tax support.' },
    { record: 'Audit events', retention: '7 years minimum', reason: 'Permission, override, export, and readiness-review traceability.' },
    { record: 'Incident reports', retention: '7 years', reason: 'Safety and liability recordkeeping.' },
    { record: 'Crew notifications', retention: '2 years', reason: 'Assignment acknowledgement and operational communication history.' },
    { record: 'Inventory events', retention: '2 years', reason: 'Operational restocking and vessel readiness history.' },
    { record: 'Export/import snapshots', retention: '1 year after backend migration', reason: 'Rollback and local migration verification.' }
  ];
}

function buildMigrationPlanReview() {
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, backendConnected: false, migrationSteps: backendMigrationPlan(), retentionRules: recordRetentionRules(), complianceNotes: ['Do not delete legacy HTML tools during migration.', 'Do not transmit data externally until backend auth is approved.', 'Require audit entries for exports, imports, overrides, and destructive actions.'] };
}

function queueMigrationPlanReview() {
  if (!requirePermission('api:review', 'Migration plan review')) return;
  const plan = buildMigrationPlanReview();
  const review = { id: makeId('migration-plan-review'), status: 'Drafted', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, plan };
  store.migrationPlanReviews.unshift(review);
  store.migrationPlanReviews = store.migrationPlanReviews.slice(0, 25);
  auditEvent('migration-plan-review-queued', 'Backend migration and retention review queued locally.', { reviewId: review.id, steps: plan.migrationSteps.length, retentionRules: plan.retentionRules.length });
  saveStore();
  renderRoute('settings');
  toast('Migration plan review queued.');
}

function updateMigrationPlanReviewStatus(id, status) {
  if (!requirePermission('api:review', 'Migration plan status update')) return;
  store.migrationPlanReviews = store.migrationPlanReviews.map((review) => review.id === id ? { ...review, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : review);
  auditEvent('migration-plan-review-status-updated', `Migration plan review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Migration plan review marked ${status}.`);
}

function renderMigrationCompliancePanel() {
  const plan = buildMigrationPlanReview();
  const steps = plan.migrationSteps.map((step) => `<div class="stat-row"><span>${escapeHtml(step.step)}<br><small>${escapeHtml(step.notes)}</small></span><strong>${escapeHtml(step.status)}<br><small>${escapeHtml(step.owner)}</small></strong></div>`).join('');
  const retention = plan.retentionRules.map((rule) => `<div class="stat-row"><span>${escapeHtml(rule.record)}<br><small>${escapeHtml(rule.reason)}</small></span><strong>${escapeHtml(rule.retention)}</strong></div>`).join('');
  const reviews = store.migrationPlanReviews.slice(0, 5).map((review) => `<div class="sync-review-card"><div><strong>${escapeHtml(review.status)}</strong><p>${escapeHtml(new Date(review.createdAt).toLocaleString())} · ${escapeHtml(review.createdBy || 'Unknown')}</p><small>${review.plan.migrationSteps.length} steps · ${review.plan.retentionRules.length} retention rules</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-migration-review-id="${review.id}" data-migration-review-status="Reviewed">Reviewed</button><button class="btn btn-primary btn-small" data-migration-review-id="${review.id}" data-migration-review-status="Migration Ready">Migration Ready</button></div></div>`).join('');
  return `<div class="legacy-tool migration-compliance-panel"><h3>Phase 3M Migration + Retention Readiness</h3><p>Local backend migration plan and record-retention rules. No database migration or external transmission occurs in this phase.</p><div class="legacy-actions"><button class="btn btn-primary" data-migration-review="true">Queue migration plan review</button></div><h4>Migration plan</h4><div class="stat-list">${steps}</div><h4>Retention / compliance rules</h4><div class="stat-list">${retention}</div><h4>Compliance guardrails</h4><div class="permission-list">${plan.complianceNotes.map((note) => `<span class="permission-chip">${escapeHtml(note)}</span>`).join('')}</div><h4>Recent migration reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No migration plan reviews queued yet.</div>'}</div></div>`;
}


function rolloutEnvironmentGates() {
  return [
    { environment: 'Local Demo', gate: 'Validation suite', status: 'Ready', requirement: 'tools/validate_static_app.py passes before every PR.' },
    { environment: 'Local Demo', gate: 'Legacy preservation', status: 'Ready', requirement: 'All legacy HTML files remain present and linked.' },
    { environment: 'Staging', gate: 'Backend auth provider selected', status: 'Blocked', requirement: 'Choose provider and map Admin/Owner/Captain/Mate/Bookkeeper claims.' },
    { environment: 'Staging', gate: 'Database schema provisioned', status: 'Blocked', requirement: 'Create schema from Phase 3L definitions and retention policy.' },
    { environment: 'Staging', gate: 'Seed import rehearsal', status: 'Blocked', requirement: 'Import exported browser package and verify dispatch/payroll/audit counts.' },
    { environment: 'Production', gate: 'Owner sign-off', status: 'Blocked', requirement: 'Owner confirms dispatch, payroll, alerts, and checklists are production ready.' },
    { environment: 'Production', gate: 'Rollback plan', status: 'Blocked', requirement: 'Keep local export snapshot and legacy tools available during cutover.' },
    { environment: 'Production', gate: 'External notifications', status: 'Deferred', requirement: 'SMS/WhatsApp/email/push remain disabled until a later integration phase.' }
  ];
}

function rolloutCutoverChecklist() {
  return [
    'Freeze local data entry before final export.',
    'Run validation suite and smoke checks.',
    'Export local store and audit log.',
    'Import into staging and compare collection counts.',
    'Verify role permissions and crew identity mappings.',
    'Run payroll spot-check for owner/captain/mate payouts.',
    'Confirm rollback path to legacy tools and local export.',
    'Schedule production cutover after owner approval.'
  ];
}

function buildRolloutReadinessReview() {
  const gates = rolloutEnvironmentGates();
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, backendConnected: false, deploymentStarted: false, gates, checklist: rolloutCutoverChecklist(), blockedGates: gates.filter((gate) => gate.status === 'Blocked').length };
}

function queueRolloutReview() {
  if (!requirePermission('api:review', 'Rollout readiness review')) return;
  const readiness = buildRolloutReadinessReview();
  const review = { id: makeId('rollout-review'), status: readiness.blockedGates ? 'Blocked' : 'Ready', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, readiness };
  store.rolloutReviews.unshift(review);
  store.rolloutReviews = store.rolloutReviews.slice(0, 25);
  auditEvent('rollout-readiness-review-queued', 'Backend rollout readiness review queued locally.', { reviewId: review.id, blockedGates: readiness.blockedGates });
  saveStore();
  renderRoute('settings');
  toast('Rollout readiness review queued.');
}

function updateRolloutReviewStatus(id, status) {
  if (!requirePermission('api:review', 'Rollout readiness status update')) return;
  store.rolloutReviews = store.rolloutReviews.map((review) => review.id === id ? { ...review, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : review);
  auditEvent('rollout-readiness-review-status-updated', `Rollout readiness review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Rollout readiness review marked ${status}.`);
}

function renderRolloutReadinessPanel() {
  const readiness = buildRolloutReadinessReview();
  const gates = readiness.gates.map((gate) => `<div class="stat-row"><span>${escapeHtml(gate.environment)} · ${escapeHtml(gate.gate)}<br><small>${escapeHtml(gate.requirement)}</small></span><strong>${escapeHtml(gate.status)}</strong></div>`).join('');
  const checklist = readiness.checklist.map((item) => `<span class="permission-chip">${escapeHtml(item)}</span>`).join('');
  const reviews = store.rolloutReviews.slice(0, 5).map((review) => `<div class="sync-review-card"><div><strong>${escapeHtml(review.status)}</strong><p>${escapeHtml(new Date(review.createdAt).toLocaleString())} · ${escapeHtml(review.createdBy || 'Unknown')}</p><small>${review.readiness.gates.length} gates · ${review.readiness.blockedGates} blocked</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-rollout-review-id="${review.id}" data-rollout-review-status="Reviewed">Reviewed</button><button class="btn btn-primary btn-small" data-rollout-review-id="${review.id}" data-rollout-review-status="Cutover Ready">Cutover Ready</button></div></div>`).join('');
  return `<div class="legacy-tool rollout-readiness-panel"><h3>Phase 3N Rollout + Environment Readiness</h3><p>Staging/production cutover checklist and environment gates. No deployment, backend, or external service is connected in this phase.</p><div class="legacy-actions"><button class="btn btn-primary" data-rollout-review="true">Queue rollout readiness review</button></div><h4>Environment readiness gates</h4><div class="stat-list">${gates}</div><h4>Cutover checklist</h4><div class="permission-list">${checklist}</div><h4>Recent rollout reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No rollout readiness reviews queued yet.</div>'}</div></div>`;
}


function cutoverDrillRunbook() {
  return [
    { drill: 'Offline dispatch continuity', owner: 'Operations', expected: 'Create/assign trips locally and export after connectivity returns.' },
    { drill: 'Payroll verification', owner: 'Bookkeeper', expected: 'Spot-check owner/captain/mate pay against Phase 3 rules before cutover.' },
    { drill: 'Owner alert acknowledgement', owner: 'Owner', expected: 'Confirm critical alerts remain visible and acknowledgeable during fallback.' },
    { drill: 'Crew assignment acceptance', owner: 'Captain/Mate', expected: 'Verify assigned crew can acknowledge trips before production switch.' },
    { drill: 'Rollback to legacy tools', owner: 'Admin', expected: 'Open preserved legacy HTML tools and use latest export snapshot if cutover pauses.' },
    { drill: 'Post-cutover audit review', owner: 'Admin', expected: 'Confirm exports, imports, overrides, and readiness status changes have audit events.' }
  ];
}

function buildCutoverDrillReview() {
  const runbook = cutoverDrillRunbook();
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, backendConnected: false, deploymentStarted: false, runbook, requiredPassCount: runbook.length };
}

function queueCutoverDrillReview() {
  if (!requirePermission('api:review', 'Cutover drill review')) return;
  const drill = buildCutoverDrillReview();
  const review = { id: makeId('cutover-drill-review'), status: 'Scheduled', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, drill };
  store.cutoverDrillReviews.unshift(review);
  store.cutoverDrillReviews = store.cutoverDrillReviews.slice(0, 25);
  auditEvent('cutover-drill-review-queued', 'Cutover drill review queued locally.', { reviewId: review.id, drills: drill.runbook.length });
  saveStore();
  renderRoute('settings');
  toast('Cutover drill review queued.');
}

function updateCutoverDrillStatus(id, status) {
  if (!requirePermission('api:review', 'Cutover drill status update')) return;
  store.cutoverDrillReviews = store.cutoverDrillReviews.map((review) => review.id === id ? { ...review, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : review);
  auditEvent('cutover-drill-status-updated', `Cutover drill marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Cutover drill marked ${status}.`);
}

function renderCutoverDrillPanel() {
  const drill = buildCutoverDrillReview();
  const rows = drill.runbook.map((item) => `<div class="stat-row"><span>${escapeHtml(item.drill)}<br><small>${escapeHtml(item.expected)}</small></span><strong>${escapeHtml(item.owner)}</strong></div>`).join('');
  const reviews = store.cutoverDrillReviews.slice(0, 5).map((review) => `<div class="sync-review-card"><div><strong>${escapeHtml(review.status)}</strong><p>${escapeHtml(new Date(review.createdAt).toLocaleString())} · ${escapeHtml(review.createdBy || 'Unknown')}</p><small>${review.drill.requiredPassCount} required drills · backend not connected</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-cutover-drill-id="${review.id}" data-cutover-drill-status="Reviewed">Reviewed</button><button class="btn btn-primary btn-small" data-cutover-drill-id="${review.id}" data-cutover-drill-status="Drill Passed">Drill Passed</button></div></div>`).join('');
  return `<div class="legacy-tool cutover-drill-panel"><h3>Phase 3N Cutover Drill Runbook</h3><p>Operational fallback drills for rollout planning. These are local planning records only and do not deploy or sync externally.</p><div class="legacy-actions"><button class="btn btn-primary" data-cutover-drill="true">Queue cutover drill review</button></div><div class="stat-list">${rows}</div><h4>Recent cutover drill reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No cutover drill reviews queued yet.</div>'}</div></div>`;
}


function offlineOperationsChecklist() {
  return [
    { area: 'Dispatch board', fallback: 'Continue creating trips in local storage and export when connectivity returns.', owner: 'Operations' },
    { area: 'Crew assignments', fallback: 'Use in-app crew notifications plus phone/radio backup outside the app if required.', owner: 'Operations' },
    { area: 'Payroll', fallback: 'Record payments locally and reconcile from export snapshot after service restoration.', owner: 'Bookkeeper' },
    { area: 'Checklists', fallback: 'Complete in-app checklist records; use preserved legacy checklist HTML if needed.', owner: 'Captain/Mate' },
    { area: 'Incidents', fallback: 'Capture incident report locally, alert owner in app, export audit package after event.', owner: 'Owner/Admin' },
    { area: 'Legacy fallback', fallback: 'Open preserved legacy HTML tools from the shell and attach latest export snapshot to handoff notes.', owner: 'Admin' }
  ];
}

function incidentFallbackProcedures() {
  return [
    { severity: 'Low', response: 'Record incident/notes locally and review before end of day.', notify: 'Crew lead' },
    { severity: 'Medium', response: 'Record incident, owner alert, crew notification, and add trip notes.', notify: 'Owner/Admin' },
    { severity: 'High', response: 'Record incident, preserve audit/export snapshot, pause affected vessel assignment.', notify: 'Owner/Admin immediately' },
    { severity: 'Critical', response: 'Use emergency procedures outside app first, then record incident/audit/export when safe.', notify: 'Emergency contacts and Owner/Admin' }
  ];
}

function buildOfflineModeReview() {
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, backendRequired: false, externalServicesRequired: false, checklist: offlineOperationsChecklist(), incidentProcedures: incidentFallbackProcedures() };
}

function queueOfflineModeReview() {
  if (!requirePermission('api:review', 'Offline mode review')) return;
  const readiness = buildOfflineModeReview();
  const review = { id: makeId('offline-mode-review'), status: 'Drafted', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, readiness };
  store.offlineModeReviews.unshift(review);
  store.offlineModeReviews = store.offlineModeReviews.slice(0, 25);
  auditEvent('offline-mode-review-queued', 'Offline/backup operations review queued locally.', { reviewId: review.id, checklistItems: readiness.checklist.length });
  saveStore();
  renderRoute('settings');
  toast('Offline mode review queued.');
}

function updateOfflineModeReviewStatus(id, status) {
  if (!requirePermission('api:review', 'Offline mode status update')) return;
  store.offlineModeReviews = store.offlineModeReviews.map((review) => review.id === id ? { ...review, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : review);
  auditEvent('offline-mode-review-status-updated', `Offline mode review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Offline mode review marked ${status}.`);
}

function renderOfflineModePanel() {
  const readiness = buildOfflineModeReview();
  const checklist = readiness.checklist.map((item) => `<div class="stat-row"><span>${escapeHtml(item.area)}<br><small>${escapeHtml(item.fallback)}</small></span><strong>${escapeHtml(item.owner)}</strong></div>`).join('');
  const incidents = readiness.incidentProcedures.map((item) => `<div class="stat-row"><span>${escapeHtml(item.severity)}<br><small>${escapeHtml(item.response)}</small></span><strong>${escapeHtml(item.notify)}</strong></div>`).join('');
  const reviews = store.offlineModeReviews.slice(0, 5).map((review) => `<div class="sync-review-card"><div><strong>${escapeHtml(review.status)}</strong><p>${escapeHtml(new Date(review.createdAt).toLocaleString())} · ${escapeHtml(review.createdBy || 'Unknown')}</p><small>${review.readiness.checklist.length} offline areas · ${review.readiness.incidentProcedures.length} incident procedures</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-offline-review-id="${review.id}" data-offline-review-status="Reviewed">Reviewed</button><button class="btn btn-primary btn-small" data-offline-review-id="${review.id}" data-offline-review-status="Offline Ready">Offline Ready</button></div></div>`).join('');
  return `<div class="legacy-tool offline-mode-panel"><h3>Phase 3O Offline + Backup Operations</h3><p>Offline/backup operations mode and incident fallback procedures. This phase keeps all data local and does not connect external services.</p><div class="legacy-actions"><button class="btn btn-primary" data-offline-review="true">Queue offline mode review</button></div><h4>Offline operations checklist</h4><div class="stat-list">${checklist}</div><h4>Incident fallback procedures</h4><div class="stat-list">${incidents}</div><h4>Recent offline reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No offline mode reviews queued yet.</div>'}</div></div>`;
}


function roleSopChecklists() {
  return [
    { role: 'Admin', checklist: ['Run validation before PR/cutover', 'Export local store and audit log', 'Confirm legacy tools open', 'Review permissions and readiness panels', 'Own rollback communications'] },
    { role: 'Owner', checklist: ['Review dispatch board health', 'Acknowledge owner alerts', 'Approve payroll/expense readiness', 'Confirm incident escalation flow', 'Sign off production cutover'] },
    { role: 'Operations', checklist: ['Create dispatch trip from booking', 'Assign vessel/captain/mate', 'Resolve conflicts or document override', 'Monitor crew acceptance', 'Run offline dispatch fallback drill'] },
    { role: 'Captain', checklist: ['Review assigned trips', 'Accept captain assignment', 'Complete pre/post checklist', 'Report incidents/vessel issues', 'Confirm pay history visibility'] },
    { role: 'Mate', checklist: ['Review assigned trips', 'Accept mate assignment', 'Assist checklist completion', 'Report inventory/incident needs', 'Confirm pay history visibility'] },
    { role: 'Bookkeeper', checklist: ['Review weekly payroll', 'Record payment amount/method/date', 'Reconcile invoice/balance data', 'Export payroll reports', 'Confirm retention requirements'] }
  ];
}

function productionSignoffRequirements() {
  return [
    { signer: 'Owner', requirement: 'Dispatch workflow, owner alerts, payroll rules, and rollback plan approved.' },
    { signer: 'Admin', requirement: 'Validation, export, audit, legacy preservation, and readiness reviews completed.' },
    { signer: 'Operations', requirement: 'Trip creation, assignment, conflict handling, and offline fallback practiced.' },
    { signer: 'Captain/Mate Lead', requirement: 'Crew acceptance, checklist, incident, and notification SOPs reviewed.' },
    { signer: 'Bookkeeper', requirement: 'Payroll, payment history, expense, invoice, and retention SOPs reviewed.' }
  ];
}

function buildHandoffTrainingReview() {
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, productionConnected: false, sopChecklists: roleSopChecklists(), signoffs: productionSignoffRequirements(), requiredSignoffs: productionSignoffRequirements().length };
}

function queueHandoffTrainingReview() {
  if (!requirePermission('api:review', 'Handoff training review')) return;
  const handoff = buildHandoffTrainingReview();
  const review = { id: makeId('handoff-training-review'), status: 'Drafted', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, handoff };
  store.handoffTrainingReviews.unshift(review);
  store.handoffTrainingReviews = store.handoffTrainingReviews.slice(0, 25);
  auditEvent('handoff-training-review-queued', 'Production handoff training review queued locally.', { reviewId: review.id, roles: handoff.sopChecklists.length, signoffs: handoff.requiredSignoffs });
  saveStore();
  renderRoute('settings');
  toast('Handoff training review queued.');
}

function updateHandoffTrainingStatus(id, status) {
  if (!requirePermission('api:review', 'Handoff training status update')) return;
  store.handoffTrainingReviews = store.handoffTrainingReviews.map((review) => review.id === id ? { ...review, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : review);
  auditEvent('handoff-training-status-updated', `Handoff training review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Handoff training review marked ${status}.`);
}

function renderHandoffTrainingPanel() {
  const handoff = buildHandoffTrainingReview();
  const sops = handoff.sopChecklists.map((item) => `<div class="stat-row"><span>${escapeHtml(item.role)}<br><small>${escapeHtml(item.checklist.join(' · '))}</small></span><strong>${item.checklist.length} SOPs</strong></div>`).join('');
  const signoffs = handoff.signoffs.map((item) => `<div class="stat-row"><span>${escapeHtml(item.signer)}<br><small>${escapeHtml(item.requirement)}</small></span><strong>Required</strong></div>`).join('');
  const reviews = store.handoffTrainingReviews.slice(0, 5).map((review) => `<div class="sync-review-card"><div><strong>${escapeHtml(review.status)}</strong><p>${escapeHtml(new Date(review.createdAt).toLocaleString())} · ${escapeHtml(review.createdBy || 'Unknown')}</p><small>${review.handoff.sopChecklists.length} role SOPs · ${review.handoff.requiredSignoffs} signoffs</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-handoff-review-id="${review.id}" data-handoff-review-status="Reviewed">Reviewed</button><button class="btn btn-primary btn-small" data-handoff-review-id="${review.id}" data-handoff-review-status="Training Complete">Training Complete</button></div></div>`).join('');
  return `<div class="legacy-tool handoff-training-panel"><h3>Phase 3P Production Handoff + Training</h3><p>Role-specific SOP checklists and owner/admin signoff tracking for production readiness. No backend cutover is performed in this phase.</p><div class="legacy-actions"><button class="btn btn-primary" data-handoff-review="true">Queue handoff training review</button></div><h4>Role SOP checklists</h4><div class="stat-list">${sops}</div><h4>Production signoff requirements</h4><div class="stat-list">${signoffs}</div><h4>Recent handoff reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No handoff training reviews queued yet.</div>'}</div></div>`;
}


function productionAcceptanceCriteria() {
  return [
    { area: 'Dispatch board', criterion: 'Today, tomorrow, this week, future, unassigned, and conflict buckets render with owner/captain/mate/payroll context.', evidence: 'Phase 3B dispatch validation and owner review' },
    { area: 'Trip creation', criterion: 'Guided dispatch form saves required customer, trip, financial, assignment, and notes fields with payout preview.', evidence: 'Create sample dispatch trip before cutover' },
    { area: 'Conflict controls', criterion: 'Double-booked vessels, captains, and mates are blocked unless admin override reason is provided.', evidence: 'Conflict scenario validation' },
    { area: 'Crew acceptance', criterion: 'Captain, mate, and owner acknowledgement states update and generate in-app alerts/notifications.', evidence: 'Acceptance smoke test' },
    { area: 'Payroll', criterion: 'Owner, captain, and mate payouts remain separated by role and weekly payments can be recorded.', evidence: 'Payroll calculation validation' },
    { area: 'Legacy tools', criterion: 'Invoices, cruise dashboard, legacy v5 app, and pre/post trip HTML checklists remain linked and loadable.', evidence: 'Static HTTP legacy smoke test' }
  ];
}

function productionExportCadence() {
  return [
    { cadence: 'Before cutover drill', action: 'Generate full local store export and audit export; attach both to owner/admin handoff notes.', owner: 'Admin' },
    { cadence: 'Daily during pilot', action: 'Export local store after close of business and keep the previous seven daily snapshots.', owner: 'Operations' },
    { cadence: 'Weekly payroll close', action: 'Export payroll/audit data after payments are marked paid and store with bookkeeper records.', owner: 'Bookkeeper' },
    { cadence: 'Before schema/backend changes', action: 'Generate sync/API/schema/migration reviews and compare against latest export package.', owner: 'Admin' },
    { cadence: 'Incident or rollback', action: 'Export immediately after incident logging or before resetting seed/local data.', owner: 'Owner/Admin' }
  ];
}

function productionReleaseChecklist() {
  return [
    { step: 'Run automated validation', required: 'PASS for JS, JSON, HTML, bootstrap, legacy links, dispatch, payroll, alerts, and readiness checks.' },
    { step: 'Owner walkthrough', required: 'Owner confirms dispatch board can be understood in under five seconds and alerts are visible.' },
    { step: 'Crew walkthrough', required: 'Captain and mate confirm assignment, acceptance, checklist, notification, and pay history flows.' },
    { step: 'Bookkeeper walkthrough', required: 'Bookkeeper confirms weekly payroll, payment fields, export cadence, and notes workflow.' },
    { step: 'Offline drill', required: 'Admin verifies offline fallback, legacy tool access, and export/rollback runbooks.' },
    { step: 'Production decision', required: 'Owner/Admin mark this review Cutover Approved only after all evidence is attached outside the app.' }
  ];
}

function buildProductionQaReview() {
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, productionConnected: false, acceptanceCriteria: productionAcceptanceCriteria(), exportCadence: productionExportCadence(), releaseChecklist: productionReleaseChecklist(), requiredAcceptanceItems: productionAcceptanceCriteria().length, requiredReleaseSteps: productionReleaseChecklist().length };
}

function queueProductionQaReview() {
  if (!requirePermission('api:review', 'Production QA review')) return;
  const qa = buildProductionQaReview();
  const review = { id: makeId('production-qa-review'), status: 'Drafted', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, qa };
  store.productionQaReviews.unshift(review);
  store.productionQaReviews = store.productionQaReviews.slice(0, 25);
  auditEvent('production-qa-review-queued', 'Phase 3Q production QA review queued locally.', { reviewId: review.id, acceptanceItems: qa.requiredAcceptanceItems, releaseSteps: qa.requiredReleaseSteps });
  saveStore();
  renderRoute('settings');
  toast('Production QA review queued.');
}

function updateProductionQaStatus(id, status) {
  if (!requirePermission('api:review', 'Production QA status update')) return;
  store.productionQaReviews = store.productionQaReviews.map((review) => review.id === id ? { ...review, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : review);
  auditEvent('production-qa-status-updated', `Production QA review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Production QA review marked ${status}.`);
}

function renderProductionQaPanel() {
  const qa = buildProductionQaReview();
  const criteria = qa.acceptanceCriteria.map((item) => `<div class="stat-row"><span>${escapeHtml(item.area)}<br><small>${escapeHtml(item.criterion)}</small></span><strong>${escapeHtml(item.evidence)}</strong></div>`).join('');
  const cadence = qa.exportCadence.map((item) => `<div class="stat-row"><span>${escapeHtml(item.cadence)}<br><small>${escapeHtml(item.action)}</small></span><strong>${escapeHtml(item.owner)}</strong></div>`).join('');
  const checklist = qa.releaseChecklist.map((item) => `<div class="stat-row"><span>${escapeHtml(item.step)}<br><small>${escapeHtml(item.required)}</small></span><strong>Required</strong></div>`).join('');
  const reviews = store.productionQaReviews.slice(0, 5).map((review) => `<div class="sync-review-card"><div><strong>${escapeHtml(review.status)}</strong><p>${escapeHtml(new Date(review.createdAt).toLocaleString())} · ${escapeHtml(review.createdBy || 'Unknown')}</p><small>${review.qa.requiredAcceptanceItems} acceptance checks · ${review.qa.requiredReleaseSteps} release steps</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-production-qa-id="${review.id}" data-production-qa-status="QA Reviewed">QA Reviewed</button><button class="btn btn-primary btn-small" data-production-qa-id="${review.id}" data-production-qa-status="Cutover Approved">Cutover Approved</button></div></div>`).join('');
  return `<div class="legacy-tool production-qa-panel"><h3>Phase 3Q Production Cutover QA</h3><p>Final acceptance criteria, local export cadence, and release checklist before any production cutover. This remains an in-app readiness review only; no backend services are connected.</p><div class="legacy-actions"><button class="btn btn-primary" data-production-qa-review="true">Queue production QA review</button></div><h4>Acceptance criteria</h4><div class="stat-list">${criteria}</div><h4>Data export cadence</h4><div class="stat-list">${cadence}</div><h4>Release checklist</h4><div class="stat-list">${checklist}</div><h4>Recent production QA reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No production QA reviews queued yet.</div>'}</div></div>`;
}


function pilotModeControls() {
  return [
    { control: 'Owner approval gate', requirement: 'Pilot mode starts only after Owner/Admin marks production QA reviewed and confirms no external backend services are connected.', owner: 'Owner/Admin' },
    { control: 'Limited live-ops window', requirement: 'Use pilot mode for selected trips only while maintaining legacy tools and export backups as fallback.', owner: 'Operations' },
    { control: 'Daily closeout summary', requirement: 'At end of day, review dispatch status, unresolved conflicts, owner alerts, crew notifications, payroll changes, incidents, expenses, and inventory lows.', owner: 'Operations' },
    { control: 'Rollback decision log', requirement: 'If dispatch, payroll, checklist, or notification blockers appear, record rollback reason and return to legacy/offline procedures.', owner: 'Owner/Admin' },
    { control: 'Evidence package', requirement: 'Attach validation output, local export, audit export, and daily closeout notes to the owner handoff record outside the app.', owner: 'Admin' }
  ];
}

function pilotDailyCloseoutSummary() {
  const openTrips = store.trips.filter((trip) => !['Completed', 'Cancelled'].includes(trip.status)).length;
  const conflicts = store.trips.reduce((total, trip) => total + findTripConflicts(trip).length, 0);
  const unresolvedAlerts = store.ownerAlerts.filter((alert) => alert.status !== 'Acknowledged').length;
  const unreadCrew = store.crewNotifications.filter((notice) => notice.status === 'Unread').length;
  const unpaidPayroll = payrollEntries().filter((entry) => entry.outstanding > 0).length;
  return [
    { metric: 'Open dispatch trips', value: openTrips, action: 'Confirm every active trip has assignment/status notes.' },
    { metric: 'Conflict warnings', value: conflicts, action: 'Resolve conflicts or document admin override before pilot closeout.' },
    { metric: 'Unacknowledged owner alerts', value: unresolvedAlerts, action: 'Owner/Admin reviews and acknowledges important alerts.' },
    { metric: 'Unread crew notifications', value: unreadCrew, action: 'Crew lead follows up before next operating day.' },
    { metric: 'Outstanding payroll entries', value: unpaidPayroll, action: 'Bookkeeper reviews before weekly payroll close.' }
  ];
}

function rollbackDecisionReasons() {
  return [
    { reason: 'Dispatch blocker', trigger: 'Trip cannot be created, assigned, or displayed clearly on dispatch board.', fallback: 'Use legacy booking dashboard and paper/phone dispatch notes.' },
    { reason: 'Payroll blocker', trigger: 'Owner/captain/mate payouts cannot be verified or payment record cannot be saved.', fallback: 'Use legacy v5 payroll tool and export current app audit log.' },
    { reason: 'Checklist blocker', trigger: 'Pre/post trip checklist workflow cannot be completed or reviewed.', fallback: 'Use preserved legacy pre/post trip HTML checklists.' },
    { reason: 'Notification blocker', trigger: 'Owner alerts or crew notifications do not appear in app during pilot.', fallback: 'Use manual call/text procedures outside the app and record notes later.' },
    { reason: 'Data integrity blocker', trigger: 'Export, audit log, or local store validation fails.', fallback: 'Stop pilot mode, preserve browser data, and revert to legacy tools until resolved.' }
  ];
}

function buildPilotModeReview() {
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, pilotOnly: true, backendConnected: false, controls: pilotModeControls(), closeoutSummary: pilotDailyCloseoutSummary(), rollbackReasons: rollbackDecisionReasons(), requiredControls: pilotModeControls().length };
}

function queuePilotModeReview() {
  if (!requirePermission('api:review', 'Pilot mode review')) return;
  const pilot = buildPilotModeReview();
  const review = { id: makeId('pilot-mode-review'), status: 'Owner Approval Pending', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, pilot };
  store.pilotModeReviews.unshift(review);
  store.pilotModeReviews = store.pilotModeReviews.slice(0, 25);
  auditEvent('pilot-mode-review-queued', 'Phase 3R pilot mode review queued locally.', { reviewId: review.id, controls: pilot.requiredControls, closeoutMetrics: pilot.closeoutSummary.length });
  saveStore();
  renderRoute('settings');
  toast('Pilot mode review queued.');
}

function updatePilotModeStatus(id, status) {
  if (!requirePermission('api:review', 'Pilot mode status update')) return;
  store.pilotModeReviews = store.pilotModeReviews.map((review) => review.id === id ? { ...review, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : review);
  auditEvent('pilot-mode-status-updated', `Pilot mode review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Pilot mode review marked ${status}.`);
}

function renderPilotModePanel() {
  const pilot = buildPilotModeReview();
  const controls = pilot.controls.map((item) => `<div class="stat-row"><span>${escapeHtml(item.control)}<br><small>${escapeHtml(item.requirement)}</small></span><strong>${escapeHtml(item.owner)}</strong></div>`).join('');
  const closeout = pilot.closeoutSummary.map((item) => `<div class="stat-row"><span>${escapeHtml(item.metric)}<br><small>${escapeHtml(item.action)}</small></span><strong>${item.value}</strong></div>`).join('');
  const rollback = pilot.rollbackReasons.map((item) => `<div class="stat-row"><span>${escapeHtml(item.reason)}<br><small>${escapeHtml(item.trigger)}</small></span><strong>${escapeHtml(item.fallback)}</strong></div>`).join('');
  const reviews = store.pilotModeReviews.slice(0, 5).map((review) => `<div class="sync-review-card"><div><strong>${escapeHtml(review.status)}</strong><p>${escapeHtml(new Date(review.createdAt).toLocaleString())} · ${escapeHtml(review.createdBy || 'Unknown')}</p><small>${review.pilot.controls.length} controls · ${review.pilot.closeoutSummary.length} closeout metrics</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-pilot-mode-id="${review.id}" data-pilot-mode-status="Pilot Approved">Pilot Approved</button><button class="btn btn-primary btn-small" data-pilot-mode-id="${review.id}" data-pilot-mode-status="Rollback Required">Rollback Required</button></div></div>`).join('');
  return `<div class="legacy-tool pilot-mode-panel"><h3>Phase 3R Pilot Mode Operating Controls</h3><p>Limited live-ops pilot controls with owner approval gate, daily closeout summary, and rollback decision log. Pilot mode remains local-only and keeps legacy/offline procedures available.</p><div class="legacy-actions"><button class="btn btn-primary" data-pilot-mode-review="true">Queue pilot mode review</button></div><h4>Pilot operating controls</h4><div class="stat-list">${controls}</div><h4>Daily closeout summary</h4><div class="stat-list">${closeout}</div><h4>Rollback decision log</h4><div class="stat-list">${rollback}</div><h4>Recent pilot mode reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No pilot mode reviews queued yet.</div>'}</div></div>`;
}


function unresolvedPilotBlockers() {
  const tripBlockers = store.trips.filter((trip) => !['Completed', 'Cancelled'].includes(trip.status) && (findTripConflicts(trip).length || !trip.vessel || !trip.captain || !trip.mate || Number(trip.balanceDue || 0) > 0)).map((trip) => ({ type: 'Dispatch', item: trip.customer || trip.id, detail: `${trip.tripDate || 'No date'} ${trip.startTime || ''} · ${trip.vessel || 'No vessel'} · balance ${money(trip.balanceDue || 0)}` }));
  const alertBlockers = store.ownerAlerts.filter((alert) => alert.status !== 'Acknowledged').map((alert) => ({ type: 'Owner alert', item: alert.title, detail: alert.message }));
  const crewBlockers = store.crewNotifications.filter((notice) => notice.status === 'Unread').map((notice) => ({ type: 'Crew notification', item: notice.person || 'Crew', detail: notice.title }));
  return [...tripBlockers, ...alertBlockers, ...crewBlockers].slice(0, 20);
}

function buildPilotCloseoutReport() {
  const summary = pilotDailyCloseoutSummary();
  const blockers = unresolvedPilotBlockers();
  const exportBundle = { includeLocalStoreExport: true, includeAuditExport: true, includeLegacyLinks: true, generatedStoreVersion: STORE_VERSION, generatedAt: new Date().toISOString() };
  const signoffs = ['Owner daily closeout reviewed', 'Operations confirms next-day dispatch ready', 'Bookkeeper confirms payroll deltas reviewed', 'Admin confirms export/audit bundle saved'];
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, printable: true, backendConnected: false, summary, blockers, exportBundle, signoffs, blockerCount: blockers.length };
}

function queuePilotCloseoutReport() {
  if (!requirePermission('api:review', 'Pilot closeout report')) return;
  const report = buildPilotCloseoutReport();
  const record = { id: makeId('pilot-closeout-report'), status: report.blockerCount ? 'Blockers Open' : 'Ready for Signoff', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, report };
  store.pilotCloseoutReports.unshift(record);
  store.pilotCloseoutReports = store.pilotCloseoutReports.slice(0, 25);
  auditEvent('pilot-closeout-report-queued', 'Phase 3S pilot closeout report queued locally.', { reportId: record.id, blockers: report.blockerCount });
  saveStore();
  renderRoute('settings');
  toast('Pilot closeout report queued.');
}

function updatePilotCloseoutStatus(id, status) {
  if (!requirePermission('api:review', 'Pilot closeout status update')) return;
  store.pilotCloseoutReports = store.pilotCloseoutReports.map((record) => record.id === id ? { ...record, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : record);
  auditEvent('pilot-closeout-status-updated', `Pilot closeout report marked ${status}.`, { reportId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Pilot closeout marked ${status}.`);
}

function renderPilotCloseoutPanel() {
  const report = buildPilotCloseoutReport();
  const summary = report.summary.map((item) => `<div class="stat-row"><span>${escapeHtml(item.metric)}<br><small>${escapeHtml(item.action)}</small></span><strong>${item.value}</strong></div>`).join('');
  const blockers = report.blockers.map((item) => `<div class="stat-row"><span>${escapeHtml(item.type)} · ${escapeHtml(item.item)}<br><small>${escapeHtml(item.detail)}</small></span><strong>Open</strong></div>`).join('');
  const signoffs = report.signoffs.map((item) => `<div class="stat-row"><span>${escapeHtml(item)}</span><strong>Required</strong></div>`).join('');
  const reviews = store.pilotCloseoutReports.slice(0, 5).map((record) => `<div class="sync-review-card"><div><strong>${escapeHtml(record.status)}</strong><p>${escapeHtml(new Date(record.createdAt).toLocaleString())} · ${escapeHtml(record.createdBy || 'Unknown')}</p><small>${record.report.blockerCount} blockers · ${record.report.signoffs.length} signoffs · printable report</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-pilot-closeout-id="${record.id}" data-pilot-closeout-status="Owner Reviewed">Owner Reviewed</button><button class="btn btn-primary btn-small" data-pilot-closeout-id="${record.id}" data-pilot-closeout-status="Closeout Complete">Closeout Complete</button></div></div>`).join('');
  return `<div class="legacy-tool pilot-closeout-panel"><h3>Phase 3S Owner Pilot Closeout Reports</h3><p>Printable owner-facing daily pilot summary, unresolved blocker list, and signoff/export bundle checklist. Reports are generated locally and do not transmit data externally.</p><div class="legacy-actions"><button class="btn btn-primary" data-pilot-closeout-report="true">Queue pilot closeout report</button></div><h4>Printable daily summary</h4><div class="stat-list">${summary}</div><h4>Unresolved blocker list</h4><div class="stat-list">${blockers || '<div class="empty-state">No unresolved pilot blockers detected.</div>'}</div><h4>Signoff/export bundle</h4><div class="stat-list">${signoffs}</div><h4>Recent pilot closeout reports</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No pilot closeout reports queued yet.</div>'}</div></div>`;
}

function finalLaunchGates() {
  return [
    { gate: 'Validation green', requirement: 'Full static validator passes and latest output is attached to launch notes.', status: 'Required' },
    { gate: 'Owner closeout signoff', requirement: 'Latest pilot closeout report is Owner Reviewed or Closeout Complete.', status: 'Required' },
    { gate: 'Rollback ready', requirement: 'Legacy tools, offline procedures, export bundle, and rollback decision log are confirmed.', status: 'Required' },
    { gate: 'Payroll verified', requirement: 'Bookkeeper confirms outstanding payroll deltas and payment history are understood.', status: 'Required' },
    { gate: 'No backend dependency', requirement: 'Real auth, sync, SMS, email, push, and third-party integrations remain disabled until approved.', status: 'Required' }
  ];
}

function launchCommunicationPlan() {
  return [
    { audience: 'Owner/Admin', message: 'Review go/no-go register, approve rollback plan, and own launch decision.' },
    { audience: 'Operations', message: 'Use dispatch board as mission control and run daily closeout until pilot exits.' },
    { audience: 'Captain/Mate', message: 'Confirm assigned trips, acceptance buttons, checklist steps, and incident reporting.' },
    { audience: 'Bookkeeper', message: 'Confirm payroll review cadence, payment recording, and export retention.' }
  ];
}

function buildFinalLaunchReview() {
  const latestCloseout = store.pilotCloseoutReports[0];
  const gates = finalLaunchGates();
  const blockers = unresolvedPilotBlockers();
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, goLiveConnected: false, launchAuthorized: false, gates, communications: launchCommunicationPlan(), blockerCount: blockers.length, latestCloseoutStatus: latestCloseout?.status || 'No closeout report queued' };
}

function queueFinalLaunchReview() {
  if (!requirePermission('api:review', 'Final launch review')) return;
  const launch = buildFinalLaunchReview();
  const record = { id: makeId('final-launch-review'), status: launch.blockerCount ? 'Go/No-Go Blocked' : 'Ready for Owner Decision', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, launch };
  store.finalLaunchReviews.unshift(record);
  store.finalLaunchReviews = store.finalLaunchReviews.slice(0, 25);
  auditEvent('final-launch-review-queued', 'Phase 3T final launch review queued locally.', { reviewId: record.id, blockers: launch.blockerCount, gates: launch.gates.length });
  saveStore();
  renderRoute('settings');
  toast('Final launch review queued.');
}

function updateFinalLaunchStatus(id, status) {
  if (!requirePermission('api:review', 'Final launch status update')) return;
  store.finalLaunchReviews = store.finalLaunchReviews.map((record) => record.id === id ? { ...record, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : record);
  auditEvent('final-launch-status-updated', `Final launch review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Final launch marked ${status}.`);
}

function renderFinalLaunchPanel() {
  const launch = buildFinalLaunchReview();
  const gates = launch.gates.map((item) => `<div class="stat-row"><span>${escapeHtml(item.gate)}<br><small>${escapeHtml(item.requirement)}</small></span><strong>${escapeHtml(item.status)}</strong></div>`).join('');
  const comms = launch.communications.map((item) => `<div class="stat-row"><span>${escapeHtml(item.audience)}<br><small>${escapeHtml(item.message)}</small></span><strong>Comms</strong></div>`).join('');
  const reviews = store.finalLaunchReviews.slice(0, 5).map((record) => `<div class="sync-review-card"><div><strong>${escapeHtml(record.status)}</strong><p>${escapeHtml(new Date(record.createdAt).toLocaleString())} · ${escapeHtml(record.createdBy || 'Unknown')}</p><small>${record.launch.gates.length} gates · ${record.launch.blockerCount} blockers · ${escapeHtml(record.launch.latestCloseoutStatus)}</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-final-launch-id="${record.id}" data-final-launch-status="Owner Decision Pending">Owner Decision Pending</button><button class="btn btn-primary btn-small" data-final-launch-id="${record.id}" data-final-launch-status="Go Live Deferred">Go Live Deferred</button></div></div>`).join('');
  return `<div class="legacy-tool final-launch-panel"><h3>Phase 3T Final Go/No-Go Register</h3><p>Final launch gates, communication plan, and owner decision register. This does not authorize real backend production launch; it documents readiness only.</p><div class="legacy-actions"><button class="btn btn-primary" data-final-launch-review="true">Queue final launch review</button></div><h4>Go/no-go gates</h4><div class="stat-list">${gates}</div><h4>Launch communication plan</h4><div class="stat-list">${comms}</div><h4>Recent final launch reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No final launch reviews queued yet.</div>'}</div></div>`;
}


function validationEvidenceSummary() {
  return { command: 'python3 tools/validate_static_app.py', expected: 'PASS', covers: ['JavaScript syntax', 'JSON validation', 'HTML validation', 'legacy preservation', 'app bootstrap', 'dispatch/payroll/operations', 'Phase 3 readiness reviews'] };
}

function exportEvidenceSummary() {
  const pkg = buildExportPackage();
  return { storeVersion: pkg.storeVersion, storeKey: pkg.storeKey, exportedBy: pkg.exportedBy, recordCollections: Object.keys(pkg.counts).length, totalArrayRecords: Object.values(pkg.counts).reduce((sum, count) => sum + count, 0), auditEvents: store.auditLog.length };
}

function reviewEvidenceSummary() {
  return [
    { area: 'Pilot closeout', count: store.pilotCloseoutReports.length, latestStatus: store.pilotCloseoutReports[0]?.status || 'Not queued' },
    { area: 'Final go/no-go', count: store.finalLaunchReviews.length, latestStatus: store.finalLaunchReviews[0]?.status || 'Not queued' },
    { area: 'Production QA', count: store.productionQaReviews.length, latestStatus: store.productionQaReviews[0]?.status || 'Not queued' },
    { area: 'Handoff training', count: store.handoffTrainingReviews.length, latestStatus: store.handoffTrainingReviews[0]?.status || 'Not queued' },
    { area: 'Pilot mode', count: store.pilotModeReviews.length, latestStatus: store.pilotModeReviews[0]?.status || 'Not queued' }
  ];
}

function buildProductionEvidencePackage() {
  const blockers = unresolvedPilotBlockers();
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, localOnly: true, downloadable: true, validation: validationEvidenceSummary(), export: exportEvidenceSummary(), reviews: reviewEvidenceSummary(), blockerStatus: { count: blockers.length, blockers }, goNoGoHistory: store.finalLaunchReviews.slice(0, 10), closeoutHistory: store.pilotCloseoutReports.slice(0, 10), requiredAttachments: ['Validation output', 'Local store export metadata', 'Audit export metadata', 'Pilot closeout reports', 'Blocker status', 'Go/no-go review history'] };
}

function queueProductionEvidencePackage() {
  if (!requirePermission('data:manage', 'Production evidence package')) return;
  const evidence = buildProductionEvidencePackage();
  const record = { id: makeId('production-evidence-package'), status: evidence.blockerStatus.count ? 'Blockers Included' : 'Ready for Owner Export', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, evidence };
  store.productionEvidencePackages.unshift(record);
  store.productionEvidencePackages = store.productionEvidencePackages.slice(0, 25);
  auditEvent('production-evidence-package-queued', 'Phase 3U production evidence package queued locally.', { packageId: record.id, blockers: evidence.blockerStatus.count, attachments: evidence.requiredAttachments.length });
  saveStore();
  renderRoute('settings');
  toast('Production evidence package queued.');
}

function updateProductionEvidenceStatus(id, status) {
  if (!requirePermission('data:manage', 'Production evidence package status update')) return;
  store.productionEvidencePackages = store.productionEvidencePackages.map((record) => record.id === id ? { ...record, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : record);
  auditEvent('production-evidence-status-updated', `Production evidence package marked ${status}.`, { packageId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Evidence package marked ${status}.`);
}

function renderProductionEvidencePanel() {
  const evidence = buildProductionEvidencePackage();
  const attachments = evidence.requiredAttachments.map((item) => `<div class="stat-row"><span>${escapeHtml(item)}</span><strong>Included</strong></div>`).join('');
  const reviews = evidence.reviews.map((item) => `<div class="stat-row"><span>${escapeHtml(item.area)}<br><small>${escapeHtml(item.latestStatus)}</small></span><strong>${item.count}</strong></div>`).join('');
  const packages = store.productionEvidencePackages.slice(0, 5).map((record) => `<div class="sync-review-card"><div><strong>${escapeHtml(record.status)}</strong><p>${escapeHtml(new Date(record.createdAt).toLocaleString())} · ${escapeHtml(record.createdBy || 'Unknown')}</p><small>${record.evidence.requiredAttachments.length} attachments · ${record.evidence.blockerStatus.count} blockers · downloadable package</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-evidence-package-id="${record.id}" data-evidence-package-status="Owner Exported">Owner Exported</button><button class="btn btn-primary btn-small" data-evidence-package-id="${record.id}" data-evidence-package-status="Archived">Archived</button></div></div>`).join('');
  return `<div class="legacy-tool production-evidence-panel"><h3>Phase 3U Production Evidence Package</h3><p>Single owner handoff package summary containing validation status, local store export metadata, audit export metadata, pilot closeout reports, blocker status, and go/no-go history. Package records stay local until manually exported.</p><div class="legacy-actions"><button class="btn btn-primary" data-evidence-package="true">Queue evidence package</button></div><h4>Required owner handoff attachments</h4><div class="stat-list">${attachments}</div><h4>Review history summary</h4><div class="stat-list">${reviews}</div><h4>Blocker status</h4><div class="stat-list"><div class="stat-row"><span>Unresolved pilot blockers</span><strong>${evidence.blockerStatus.count}</strong></div></div><h4>Recent evidence packages</h4><div class="sync-review-list">${packages || '<div class="empty-state">No production evidence packages queued yet.</div>'}</div></div>`;
}


function buildExecutiveReadinessReview() {
  const items = executiveReadinessItems();
  const overall = executiveReadinessOverall(items);
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, localOnly: true, overall, items, nextActions: items.filter((item) => item.status !== 'green').map((item) => ({ area: item.area, status: item.status, action: item.nextAction })) };
}

function queueExecutiveReadinessReview() {
  if (!requirePermission('data:manage', 'Executive readiness review')) return;
  const executive = buildExecutiveReadinessReview();
  const record = { id: makeId('executive-readiness-review'), status: executive.overall === 'green' ? 'Ready Snapshot' : 'Owner Review Needed', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, executive };
  store.executiveReadinessReviews.unshift(record);
  store.executiveReadinessReviews = store.executiveReadinessReviews.slice(0, 25);
  auditEvent('executive-readiness-review-queued', 'Phase 3V executive readiness review queued locally.', { reviewId: record.id, overall: executive.overall, nextActions: executive.nextActions.length });
  saveStore();
  renderRoute('settings');
  toast('Executive readiness review queued.');
}

function updateExecutiveReadinessStatus(id, status) {
  if (!requirePermission('data:manage', 'Executive readiness status update')) return;
  store.executiveReadinessReviews = store.executiveReadinessReviews.map((record) => record.id === id ? { ...record, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : record);
  auditEvent('executive-readiness-status-updated', `Executive readiness review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Executive readiness marked ${status}.`);
}

function renderExecutiveReadinessPanel() {
  const review = buildExecutiveReadinessReview();
  const actions = review.nextActions.map((item) => `<div class="stat-row readiness-${item.status}"><span>${escapeHtml(item.area)}<br><small>${escapeHtml(item.action)}</small></span><strong>${escapeHtml(labelForStatus(item.status))}</strong></div>`).join('');
  const rows = review.items.map((item) => `<div class="stat-row readiness-${item.status}"><span>${escapeHtml(item.area)}<br><small>${escapeHtml(item.metric)}</small></span><strong>${escapeHtml(labelForStatus(item.status))}</strong></div>`).join('');
  const reviews = store.executiveReadinessReviews.slice(0, 5).map((record) => `<div class="sync-review-card"><div><strong>${escapeHtml(record.status)}</strong><p>${escapeHtml(new Date(record.createdAt).toLocaleString())} · ${escapeHtml(record.createdBy || 'Unknown')}</p><small>${escapeHtml(labelForStatus(record.executive.overall))} overall · ${record.executive.nextActions.length} next actions</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-executive-readiness-id="${record.id}" data-executive-readiness-status="Owner Reviewed">Owner Reviewed</button><button class="btn btn-primary btn-small" data-executive-readiness-id="${record.id}" data-executive-readiness-status="Action Plan Accepted">Action Plan Accepted</button></div></div>`).join('');
  return `<div class="legacy-tool executive-readiness-panel"><h3>Phase 3V Executive Readiness Review</h3><p>Owner/Admin snapshot of readiness status, open next actions, and green/yellow/red operating signals. This review stays local and does not approve backend launch.</p><div class="legacy-actions"><button class="btn btn-primary" data-executive-readiness-review="true">Queue executive readiness review</button></div><h4>Readiness signals</h4><div class="stat-list">${rows}</div><h4>Next-action recommendations</h4><div class="stat-list">${actions || '<div class="empty-state">All executive readiness signals are green.</div>'}</div><h4>Recent executive readiness reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No executive readiness reviews queued yet.</div>'}</div></div>`;
}


function buildExecutiveReadinessReport() {
  const snapshot = buildExecutiveReadinessReview();
  const history = store.executiveReadinessReviews.slice(0, 10).map((record) => ({ id: record.id, status: record.status, overall: record.executive?.overall || 'yellow', createdAt: record.createdAt, reviewedAt: record.reviewedAt || '', reviewedBy: record.reviewedBy || '' }));
  const signoffNotes = [
    { signer: 'Owner/Admin', note: 'Review overall readiness and approve or defer next actions.' },
    { signer: 'Operations', note: 'Confirm dispatch, alerts, pilot blockers, and legacy fallback status.' },
    { signer: 'Bookkeeper', note: 'Confirm payroll and export evidence are ready for owner review.' }
  ];
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, printable: true, exportable: true, localOnly: true, snapshot, statusHistory: history, signoffNotes, recommendedNextActions: snapshot.nextActions, executiveSummary: `${labelForStatus(snapshot.overall)} overall readiness with ${snapshot.nextActions.length} recommended next actions.` };
}

function queueExecutiveReadinessReport() {
  if (!requirePermission('data:manage', 'Executive readiness report')) return;
  const report = buildExecutiveReadinessReport();
  const record = { id: makeId('executive-readiness-report'), status: report.recommendedNextActions.length ? 'Needs Action' : 'Ready to Export', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, report };
  store.executiveReadinessReports.unshift(record);
  store.executiveReadinessReports = store.executiveReadinessReports.slice(0, 25);
  auditEvent('executive-readiness-report-queued', 'Phase 3W executive readiness report queued locally.', { reportId: record.id, nextActions: report.recommendedNextActions.length, history: report.statusHistory.length });
  saveStore();
  renderRoute('settings');
  toast('Executive readiness report queued.');
}

function updateExecutiveReadinessReportStatus(id, status) {
  if (!requirePermission('data:manage', 'Executive readiness report status update')) return;
  store.executiveReadinessReports = store.executiveReadinessReports.map((record) => record.id === id ? { ...record, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : record);
  auditEvent('executive-readiness-report-status-updated', `Executive readiness report marked ${status}.`, { reportId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Executive readiness report marked ${status}.`);
}

function renderExecutiveReadinessReportPanel() {
  const report = buildExecutiveReadinessReport();
  const actions = report.recommendedNextActions.map((item) => `<div class="stat-row readiness-${item.status}"><span>${escapeHtml(item.area)}<br><small>${escapeHtml(item.action)}</small></span><strong>${escapeHtml(labelForStatus(item.status))}</strong></div>`).join('');
  const signoffs = report.signoffNotes.map((item) => `<div class="stat-row"><span>${escapeHtml(item.signer)}<br><small>${escapeHtml(item.note)}</small></span><strong>Signoff note</strong></div>`).join('');
  const history = report.statusHistory.map((item) => `<div class="stat-row readiness-${item.overall}"><span>${escapeHtml(item.status)}<br><small>${escapeHtml(item.createdAt || '')}</small></span><strong>${escapeHtml(labelForStatus(item.overall))}</strong></div>`).join('');
  const reports = store.executiveReadinessReports.slice(0, 5).map((record) => `<div class="sync-review-card"><div><strong>${escapeHtml(record.status)}</strong><p>${escapeHtml(new Date(record.createdAt).toLocaleString())} · ${escapeHtml(record.createdBy || 'Unknown')}</p><small>${record.report.statusHistory.length} history rows · ${record.report.recommendedNextActions.length} next actions · printable/exportable</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-executive-readiness-report-id="${record.id}" data-executive-readiness-report-status="Owner Signed">Owner Signed</button><button class="btn btn-primary btn-small" data-executive-readiness-report-id="${record.id}" data-executive-readiness-report-status="Exported">Exported</button></div></div>`).join('');
  return `<div class="legacy-tool executive-readiness-report-panel"><h3>Phase 3W Printable Executive Readiness Report</h3><p>Printable/exportable owner report generated from Phase 3V readiness snapshots, status history, signoff notes, and recommended next actions. Reports stay local until manually exported.</p><div class="legacy-actions"><button class="btn btn-primary" data-executive-readiness-report="true">Queue executive readiness report</button></div><h4>Executive summary</h4><div class="stat-list"><div class="stat-row"><span>${escapeHtml(report.executiveSummary)}</span><strong>${escapeHtml(labelForStatus(report.snapshot.overall))}</strong></div></div><h4>Recommended next actions</h4><div class="stat-list">${actions || '<div class="empty-state">No recommended next actions.</div>'}</div><h4>Owner signoff notes</h4><div class="stat-list">${signoffs}</div><h4>Status history</h4><div class="stat-list">${history || '<div class="empty-state">No executive readiness history yet.</div>'}</div><h4>Recent executive readiness reports</h4><div class="sync-review-list">${reports || '<div class="empty-state">No executive readiness reports queued yet.</div>'}</div></div>`;
}


function buildReadinessArchive() {
  const exportSummary = exportEvidenceSummary();
  const executiveReports = store.executiveReadinessReports.slice(0, 10);
  const evidencePackages = store.productionEvidencePackages.slice(0, 10);
  const closeouts = store.pilotCloseoutReports.slice(0, 10);
  const goNoGo = store.finalLaunchReviews.slice(0, 10);
  const auditMetadata = { eventCount: store.auditLog.length, latestEvent: store.auditLog[0]?.createdAt || '', exportedAt: new Date().toISOString() };
  const archiveSections = [
    { section: 'Executive readiness reports', count: executiveReports.length, required: true },
    { section: 'Production evidence packages', count: evidencePackages.length, required: true },
    { section: 'Audit metadata', count: auditMetadata.eventCount, required: true },
    { section: 'Pilot closeout records', count: closeouts.length, required: true },
    { section: 'Go/no-go launch records', count: goNoGo.length, required: true },
    { section: 'Local store export metadata', count: exportSummary.totalArrayRecords, required: true }
  ];
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, localOnly: true, archiveReady: true, exportSummary, auditMetadata, archiveSections, executiveReports, evidencePackages, closeouts, goNoGo, retentionNote: 'Keep this local archive with owner/admin launch records; do not transmit externally until backend/auth approval.' };
}

function queueReadinessArchive() {
  if (!requirePermission('data:manage', 'Readiness archive')) return;
  const archive = buildReadinessArchive();
  const record = { id: makeId('readiness-archive'), status: 'Archive Drafted', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, archive };
  store.readinessArchives.unshift(record);
  store.readinessArchives = store.readinessArchives.slice(0, 25);
  auditEvent('readiness-archive-queued', 'Phase 3X readiness archive queued locally.', { archiveId: record.id, sections: archive.archiveSections.length, auditEvents: archive.auditMetadata.eventCount });
  saveStore();
  renderRoute('settings');
  toast('Readiness archive queued.');
}

function updateReadinessArchiveStatus(id, status) {
  if (!requirePermission('data:manage', 'Readiness archive status update')) return;
  store.readinessArchives = store.readinessArchives.map((record) => record.id === id ? { ...record, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : record);
  auditEvent('readiness-archive-status-updated', `Readiness archive marked ${status}.`, { archiveId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Readiness archive marked ${status}.`);
}

function renderReadinessArchivePanel() {
  const archive = buildReadinessArchive();
  const sections = archive.archiveSections.map((item) => `<div class="stat-row"><span>${escapeHtml(item.section)}<br><small>${item.required ? 'Required archive section' : 'Optional section'}</small></span><strong>${item.count}</strong></div>`).join('');
  const archives = store.readinessArchives.slice(0, 5).map((record) => `<div class="sync-review-card"><div><strong>${escapeHtml(record.status)}</strong><p>${escapeHtml(new Date(record.createdAt).toLocaleString())} · ${escapeHtml(record.createdBy || 'Unknown')}</p><small>${record.archive.archiveSections.length} sections · ${record.archive.auditMetadata.eventCount} audit events · local archive</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-readiness-archive-id="${record.id}" data-readiness-archive-status="Owner Archived">Owner Archived</button><button class="btn btn-primary btn-small" data-readiness-archive-id="${record.id}" data-readiness-archive-status="Retention Logged">Retention Logged</button></div></div>`).join('');
  return `<div class="legacy-tool readiness-archive-panel"><h3>Phase 3X Readiness Archive</h3><p>Locally tracked archive history bundling executive reports, evidence packages, audit metadata, pilot closeouts, go/no-go records, and export metadata. This is a local archive register only.</p><div class="legacy-actions"><button class="btn btn-primary" data-readiness-archive="true">Queue readiness archive</button></div><h4>Archive bundle sections</h4><div class="stat-list">${sections}</div><h4>Retention note</h4><div class="stat-list"><div class="stat-row"><span>${escapeHtml(archive.retentionNote)}</span><strong>Local only</strong></div></div><h4>Recent readiness archives</h4><div class="sync-review-list">${archives || '<div class="empty-state">No readiness archives queued yet.</div>'}</div></div>`;
}


function archiveIntegrityChecklist(archive = buildReadinessArchive()) {
  const requiredSections = ['Executive readiness reports', 'Production evidence packages', 'Audit metadata', 'Pilot closeout records', 'Go/no-go launch records', 'Local store export metadata'];
  return requiredSections.map((section) => {
    const match = archive.archiveSections.find((item) => item.section === section);
    const complete = Boolean(match && Number(match.count) >= 0);
    return { section, complete, count: match?.count ?? 0, note: complete ? 'Section present in archive bundle.' : 'Section missing from archive bundle.' };
  });
}

function ownerRetentionAttestations() {
  return [
    { signer: 'Owner/Admin', attestation: 'Archive contents reviewed for completeness before retention status is marked.' },
    { signer: 'Operations', attestation: 'Pilot closeout and go/no-go records match the latest operating notes.' },
    { signer: 'Bookkeeper', attestation: 'Payroll/export evidence is retained with owner records.' },
    { signer: 'Admin', attestation: 'Audit metadata and local export metadata are retained locally; no external transmission occurred.' }
  ];
}

function buildArchiveIntegrityReview() {
  const latestArchive = store.readinessArchives[0];
  const archive = latestArchive?.archive || buildReadinessArchive();
  const checklist = archiveIntegrityChecklist(archive);
  const missing = checklist.filter((item) => !item.complete);
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, localOnly: true, archiveId: latestArchive?.id || '', archiveStatus: latestArchive?.status || 'No archive queued', checklist, missingSections: missing, complete: missing.length === 0, retentionAttestations: ownerRetentionAttestations(), canMarkRetained: missing.length === 0 };
}

function queueArchiveIntegrityReview() {
  if (!requirePermission('data:manage', 'Archive integrity review')) return;
  const integrity = buildArchiveIntegrityReview();
  const record = { id: makeId('archive-integrity-review'), status: integrity.complete ? 'Integrity Ready' : 'Missing Sections', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, integrity };
  store.archiveIntegrityReviews.unshift(record);
  store.archiveIntegrityReviews = store.archiveIntegrityReviews.slice(0, 25);
  auditEvent('archive-integrity-review-queued', 'Phase 3Y archive integrity review queued locally.', { reviewId: record.id, archiveId: integrity.archiveId, missingSections: integrity.missingSections.length });
  saveStore();
  renderRoute('settings');
  toast('Archive integrity review queued.');
}

function updateArchiveIntegrityStatus(id, status) {
  if (!requirePermission('data:manage', 'Archive integrity status update')) return;
  store.archiveIntegrityReviews = store.archiveIntegrityReviews.map((record) => record.id === id ? { ...record, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : record);
  auditEvent('archive-integrity-status-updated', `Archive integrity review marked ${status}.`, { reviewId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Archive integrity marked ${status}.`);
}

function renderArchiveIntegrityPanel() {
  const integrity = buildArchiveIntegrityReview();
  const checklist = integrity.checklist.map((item) => `<div class="stat-row ${item.complete ? 'readiness-green' : 'readiness-red'}"><span>${escapeHtml(item.section)}<br><small>${escapeHtml(item.note)}</small></span><strong>${item.complete ? 'Complete' : 'Missing'}<br><small>${item.count}</small></strong></div>`).join('');
  const attestations = integrity.retentionAttestations.map((item) => `<div class="stat-row"><span>${escapeHtml(item.signer)}<br><small>${escapeHtml(item.attestation)}</small></span><strong>Required</strong></div>`).join('');
  const reviews = store.archiveIntegrityReviews.slice(0, 5).map((record) => `<div class="sync-review-card"><div><strong>${escapeHtml(record.status)}</strong><p>${escapeHtml(new Date(record.createdAt).toLocaleString())} · ${escapeHtml(record.createdBy || 'Unknown')}</p><small>${record.integrity.checklist.length} checks · ${record.integrity.missingSections.length} missing · ${record.integrity.retentionAttestations.length} attestations</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-archive-integrity-id="${record.id}" data-archive-integrity-status="Owner Attested">Owner Attested</button><button class="btn btn-primary btn-small" data-archive-integrity-id="${record.id}" data-archive-integrity-status="Retained">Retained</button></div></div>`).join('');
  return `<div class="legacy-tool archive-integrity-panel"><h3>Phase 3Y Archive Integrity + Retention</h3><p>Completeness checks and owner retention attestations before a readiness archive is marked retained. This stays local and does not transmit archive contents.</p><div class="legacy-actions"><button class="btn btn-primary" data-archive-integrity-review="true">Queue archive integrity review</button></div><h4>Archive completeness checks</h4><div class="stat-list">${checklist}</div><h4>Owner retention attestations</h4><div class="stat-list">${attestations}</div><h4>Recent archive integrity reviews</h4><div class="sync-review-list">${reviews || '<div class="empty-state">No archive integrity reviews queued yet.</div>'}</div></div>`;
}


function phaseReadinessArtifactSummary() {
  return [
    { phase: '3B Dispatch', artifact: 'Dispatch board, conflict detection, trip creation, payroll preview', count: store.trips.length, status: 'Implemented' },
    { phase: '3C Operations', artifact: 'Checklists, incidents, expenses, inventory, vessel issues', count: store.checklistCompletions.length + store.incidentReports.length + store.expenseSubmissions.length + store.inventoryEvents.length + store.vesselIssues.length, status: 'Implemented' },
    { phase: '3G Audit/Identity', artifact: 'Demo users, permissions, local audit trail', count: store.auditLog.length, status: 'Implemented' },
    { phase: '3H–3M Data readiness', artifact: 'Export/import, sync/API/auth/schema/migration reviews', count: store.exportSnapshots.length + store.syncReviews.length + store.apiContractReviews.length + store.authReadinessReviews.length + store.schemaReviews.length + store.migrationPlanReviews.length, status: 'Implemented' },
    { phase: '3N–3Q Rollout readiness', artifact: 'Rollout, cutover, offline, handoff, production QA', count: store.rolloutReviews.length + store.cutoverDrillReviews.length + store.offlineModeReviews.length + store.handoffTrainingReviews.length + store.productionQaReviews.length, status: 'Implemented' },
    { phase: '3R–3T Pilot/launch', artifact: 'Pilot mode, closeout reports, go/no-go launch reviews', count: store.pilotModeReviews.length + store.pilotCloseoutReports.length + store.finalLaunchReviews.length, status: 'Implemented' },
    { phase: '3U–3Y Evidence/archive', artifact: 'Evidence packages, executive reviews/reports, archive/integrity reviews', count: store.productionEvidencePackages.length + store.executiveReadinessReviews.length + store.executiveReadinessReports.length + store.readinessArchives.length + store.archiveIntegrityReviews.length, status: 'Implemented' }
  ];
}

function phaseCompletionBlockers() {
  const operationalBlockers = unresolvedPilotBlockers().map((item) => ({ area: item.type, blocker: item.item, action: item.detail }));
  const readinessItems = executiveReadinessItems().filter((item) => item.status !== 'green').map((item) => ({ area: item.area, blocker: item.metric, action: item.nextAction }));
  return [...operationalBlockers, ...readinessItems].slice(0, 25);
}

function recommendedNextPhase() {
  const blockers = phaseCompletionBlockers();
  if (blockers.length) return { phase: 'Phase 4A preparation deferred', recommendation: 'Resolve open blockers, archive integrity reviews, and owner attestations before backend planning begins.' };
  return { phase: 'Phase 4A backend discovery', recommendation: 'Begin backend architecture discovery for real auth, server persistence, and controlled sync only after owner approval.' };
}

function buildPhaseCompletionRegister() {
  const artifacts = phaseReadinessArtifactSummary();
  const blockers = phaseCompletionBlockers();
  const next = recommendedNextPhase();
  return { generatedAt: new Date().toISOString(), storeVersion: STORE_VERSION, localOnly: true, phase: 'Phase 3Z Completion Register', artifacts, blockers, blockerCount: blockers.length, recommendedNextPhase: next, readyForBackendPlanning: blockers.length === 0, completionNote: 'Phase 3 remains browser-local; backend work should begin only after owner/admin accepts this register.' };
}

function queuePhaseCompletionRegister() {
  if (!requirePermission('data:manage', 'Phase completion register')) return;
  const completion = buildPhaseCompletionRegister();
  const record = { id: makeId('phase-completion-register'), status: completion.readyForBackendPlanning ? 'Ready for Phase 4 Review' : 'Blockers Open', createdAt: new Date().toISOString(), createdBy: currentUser()?.name || activeCrewIdentity, completion };
  store.phaseCompletionRegisters.unshift(record);
  store.phaseCompletionRegisters = store.phaseCompletionRegisters.slice(0, 25);
  auditEvent('phase-completion-register-queued', 'Phase 3Z completion register queued locally.', { registerId: record.id, artifacts: completion.artifacts.length, blockers: completion.blockerCount });
  saveStore();
  renderRoute('settings');
  toast('Phase completion register queued.');
}

function updatePhaseCompletionStatus(id, status) {
  if (!requirePermission('data:manage', 'Phase completion status update')) return;
  store.phaseCompletionRegisters = store.phaseCompletionRegisters.map((record) => record.id === id ? { ...record, status, reviewedAt: new Date().toISOString(), reviewedBy: currentUser()?.name || activeCrewIdentity } : record);
  auditEvent('phase-completion-status-updated', `Phase completion register marked ${status}.`, { registerId: id, status });
  saveStore();
  renderRoute('settings');
  toast(`Phase completion marked ${status}.`);
}

function renderPhaseCompletionPanel() {
  const completion = buildPhaseCompletionRegister();
  const artifacts = completion.artifacts.map((item) => `<div class="stat-row"><span>${escapeHtml(item.phase)}<br><small>${escapeHtml(item.artifact)}</small></span><strong>${escapeHtml(item.status)}<br><small>${item.count}</small></strong></div>`).join('');
  const blockers = completion.blockers.map((item) => `<div class="stat-row readiness-red"><span>${escapeHtml(item.area)} · ${escapeHtml(item.blocker)}<br><small>${escapeHtml(item.action)}</small></span><strong>Open</strong></div>`).join('');
  const registers = store.phaseCompletionRegisters.slice(0, 5).map((record) => `<div class="sync-review-card"><div><strong>${escapeHtml(record.status)}</strong><p>${escapeHtml(new Date(record.createdAt).toLocaleString())} · ${escapeHtml(record.createdBy || 'Unknown')}</p><small>${record.completion.artifacts.length} artifacts · ${record.completion.blockerCount} blockers · ${escapeHtml(record.completion.recommendedNextPhase.phase)}</small></div><div class="row-actions"><button class="btn btn-outline btn-small" data-phase-completion-id="${record.id}" data-phase-completion-status="Owner Reviewed">Owner Reviewed</button><button class="btn btn-primary btn-small" data-phase-completion-id="${record.id}" data-phase-completion-status="Phase 3 Complete">Phase 3 Complete</button></div></div>`).join('');
  return `<div class="legacy-tool phase-completion-panel"><h3>Phase 3Z Completion Register</h3><p>Final owner/admin register summarizing Phase 3 readiness artifacts, unresolved blockers, and the recommended next phase before backend work begins. This register is local-only.</p><div class="legacy-actions"><button class="btn btn-primary" data-phase-completion-register="true">Queue Phase 3 completion register</button></div><h4>Readiness artifacts</h4><div class="stat-list">${artifacts}</div><h4>Unresolved blockers</h4><div class="stat-list">${blockers || '<div class="empty-state">No unresolved blockers detected.</div>'}</div><h4>Recommended next phase</h4><div class="stat-list"><div class="stat-row"><span>${escapeHtml(completion.recommendedNextPhase.phase)}<br><small>${escapeHtml(completion.recommendedNextPhase.recommendation)}</small></span><strong>${completion.readyForBackendPlanning ? 'Ready' : 'Deferred'}</strong></div></div><h4>Recent completion registers</h4><div class="sync-review-list">${registers || '<div class="empty-state">No Phase 3 completion registers queued yet.</div>'}</div></div>`;
}

function settingsMarkup() {
  return `<div class="grid settings-grid" style="margin-top:18px"><div class="legacy-tool"><h3>Seed data</h3><p>${store.vessels.length} vessels, ${store.crew.length} crew members, ${store.roles.length} roles, ${store.bookingSources.length} booking sources, ${store.standardPayoutRates.length} standard crew payout rates, and ${store.vesselOwnerPayoutRates.length} documented owner payout rules loaded.</p><div class="legacy-actions"><button class="btn btn-outline" data-reset-seed="true">Reset seed data</button></div></div><div class="legacy-tool data-export-panel"><h3>Phase 3H Local Data Export / Import</h3><p>Storage key: ${STORE_KEY}. Last updated: ${new Date(store.updatedAt).toLocaleString()}. Export/import prepares dispatch, payroll, notifications, audit, and operational records for future server sync.</p><div class="legacy-actions"><button class="btn btn-primary" data-store-export="json">Generate export JSON</button><button class="btn btn-outline" data-store-import="json">Import pasted JSON</button></div><label for="dataExportText">Latest export package</label><textarea id="dataExportText" class="export-textarea" readonly placeholder="Click Generate export JSON to prepare a local backup."></textarea><label for="dataImportText">Paste export package to import</label><textarea id="dataImportText" class="export-textarea" placeholder="Paste a previous RAT local export JSON package here."></textarea></div><div class="legacy-tool"><h3>Recent export snapshots</h3><div class="stat-list">${store.exportSnapshots.length ? store.exportSnapshots.slice(0, 5).map((snapshot) => `<div class="stat-row"><span>${escapeHtml(new Date(snapshot.exportedAt).toLocaleString())}</span><strong>${escapeHtml(snapshot.exportedBy || 'Unknown')}<br><small>${snapshot.recordCount || 0} array records</small></strong></div>`).join('') : '<div class="empty-state">No export snapshots yet.</div>'}</div></div>${renderSyncReadinessPanel()}${renderApiContractPanel()}${renderAuthReadinessPanel()}${renderSchemaReadinessPanel()}${renderMigrationCompliancePanel()}${renderRolloutReadinessPanel()}${renderCutoverDrillPanel()}${renderOfflineModePanel()}${renderHandoffTrainingPanel()}${renderProductionQaPanel()}${renderPilotModePanel()}${renderPilotCloseoutPanel()}${renderFinalLaunchPanel()}${renderProductionEvidencePanel()}${renderExecutiveReadinessPanel()}${renderExecutiveReadinessReportPanel()}${renderReadinessArchivePanel()}${renderArchiveIntegrityPanel()}${renderPhaseCompletionPanel()}</div>`;
}

function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}

document.addEventListener('DOMContentLoaded', init);
