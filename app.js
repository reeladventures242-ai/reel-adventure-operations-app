const STORE_KEY = 'rat_ops_v1_store';
const STORE_VERSION = 6;

const navItems = [
  ['dashboard', '🏠', 'Dashboard'], ['bookings', '📘', 'Bookings'], ['invoices', '🧾', 'Invoices'],
  ['trips', '🧭', 'Trips'], ['captain-dashboard', '🧢', 'Captain Dashboard'], ['mate-dashboard', '⚓', 'Mate Dashboard'], ['owner-dashboard', '👑', 'Owner Dashboard'], ['vessels', '⛵', 'Vessels'], ['crew', '👥', 'Crew'],
  ['payroll', '💸', 'Payroll'], ['expenses', '💳', 'Expenses'], ['inventory', '📦', 'Inventory'], ['incident-reports', '🚨', 'Incident Reports'],
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
  auditTrail: [],
  expenses: [],
  incidentReports: [],
  checklistRecords: []
};

const crudConfig = {
  bookings: {
    title: 'Bookings', eyebrow: 'Simple CRUD', summary: 'Create, read, update, and delete booking records in local storage while the legacy booking dashboard remains available.', collection: 'bookings', addLabel: 'Add booking',
    fields: [['order','Order #','text'], ['customer','Customer','text'], ['date','Trip date','date'], ['time','Time','time'], ['guests','Guests','number'], ['product','Product','text'], ['source','Source','select:bookingSources'], ['balance','Balance due','number'], ['status','Status','select:bookingStatus'], ['notes','Notes','textarea']],
    columns: [['order','Order'], ['customer','Customer'], ['date','Date'], ['guests','Guests'], ['product','Product'], ['source','Source'], ['balance','Balance']]
  },
  trips: {
    title: 'Trips', eyebrow: 'Daily operations', summary: 'Create trips, assign vessels and crew, detect assignment conflicts, and calculate separated owner/captain/mate payroll.', collection: 'trips', addLabel: 'Create trip',
    fields: [['customer','Customer name','text'], ['phone','Phone number','tel'], ['email','Email','email'], ['bookingSource','Booking source','select:bookingSources'], ['tripDate','Date','date'], ['startTime','Time','time'], ['passengers','Guest count','number'], ['hours','Hours','number'], ['tourPrice','Tour price','number'], ['depositPaid','Deposit paid','number'], ['balanceDue','Balance due','number'], ['vessel','Assigned vessel','select:vessels'], ['captain','Assigned captain','select:crew'], ['mate','Assigned mate','select:crewOptional'], ['status','Trip status','select:tripStatus'], ['passengerManifest','Passenger manifest (one passenger per line)','textarea'], ['notes','Notes','textarea']],
    columns: [['tripDate','Date'], ['startTime','Time'], ['customer','Customer'], ['passengers','Guests'], ['bookingSource','Source'], ['tourPrice','Price'], ['depositPaid','Deposit'], ['balanceDue','Balance'], ['vessel','Vessel'], ['captain','Captain'], ['mate','Mate'], ['status','Status'], ['passengerManifest','Manifest']]
  },
  crew: {
    title: 'Crew', eyebrow: 'Simple CRUD', summary: 'Maintain the seeded crew roster, roles, and active status in the new app data layer.', collection: 'crew', addLabel: 'Add crew',
    fields: [['name','Name','text'], ['role','Role','text'], ['phone','Phone','tel'], ['email','Email','email'], ['active','Active','select:yesNo'], ['notes','Notes','textarea']],
    columns: [['name','Name'], ['role','Role'], ['phone','Phone'], ['email','Email'], ['active','Active'], ['notes','Notes']]
  },
  vessels: {
    title: 'Vessels', eyebrow: 'Simple CRUD', summary: 'Manage boats and owner payout defaults from the documented legacy payout rules.', collection: 'vessels', addLabel: 'Add vessel',
    fields: [['name','Vessel name','text'], ['model','Model','text'], ['owner','Owner','select:owners'], ['capacity','Capacity','number'], ['status','Status','text'], ['readinessStatus','Readiness status','select:vesselReadiness'], ['notes','Notes','textarea']],
    columns: [['name','Vessel'], ['model','Model'], ['owner','Owner'], ['capacity','Capacity'], ['status','Status'], ['readinessStatus','Readiness'], ['notes','Notes']]
  },
  expenses: {
    title: 'Expenses', eyebrow: 'Operations costs', summary: 'Capture operating expenses, receipt/photo notes, and vessel cost alerts while the legacy operations app remains available.', collection: 'expenses', addLabel: 'Add expense',
    fields: [['date','Expense date','date'], ['vessel','Vessel','select:vessels'], ['category','Category','select:expenseCategories'], ['amount','Amount','number'], ['paidBy','Paid by','select:crew'], ['status','Status','select:expenseStatus'], ['receiptPhotos','Receipt/photo notes','textarea'], ['notes','Notes','textarea']],
    columns: [['date','Date'], ['vessel','Vessel'], ['category','Category'], ['amount','Amount'], ['paidBy','Paid by'], ['status','Status']]
  },
  'incident-reports': {
    title: 'Incident Reports', eyebrow: 'Safety and operations', summary: 'Document guest, vessel, weather, injury, and equipment incidents for operational follow-up.', collection: 'incidentReports', addLabel: 'Add incident',
    fields: [['date','Incident date','date'], ['tripId','Related trip','select:trips'], ['vessel','Vessel','select:vessels'], ['reportedBy','Reported by','select:crew'], ['severity','Severity','select:incidentSeverity'], ['category','Category','select:incidentCategories'], ['status','Status','select:incidentStatus'], ['description','Description','textarea'], ['actionsTaken','Actions taken','textarea'], ['photos','Photo notes','textarea']],
    columns: [['date','Date'], ['vessel','Vessel'], ['reportedBy','Reported by'], ['severity','Severity'], ['category','Category'], ['status','Status']]
  }
};

let store = loadStore();
let currentRoute = 'dashboard';
let editing = {};
let deferredInstallPrompt = null;
let voiceRecognition = null;

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
  next.notifications = (Array.isArray(next.notifications) ? next.notifications : []).map(normalizeNotification);
  next.auditTrail = Array.isArray(next.auditTrail) ? next.auditTrail : [];
  next.expenses = Array.isArray(next.expenses) ? next.expenses : [];
  next.incidentReports = Array.isArray(next.incidentReports) ? next.incidentReports : [];
  next.checklistRecords = Array.isArray(next.checklistRecords) ? next.checklistRecords : [];
  next.vessels = (Array.isArray(next.vessels) ? next.vessels : []).map((vessel) => ({ ...vessel, readinessStatus: vessel.readinessStatus || vessel.status || 'Operational' }));
  next.trips = (Array.isArray(next.trips) ? next.trips : []).map((trip) => normalizeTrip(trip));
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}


function normalizeNotification(notice = {}) {
  return {
    ...notice,
    level: notice.level || 'info',
    read: Boolean(notice.read),
    recipientRole: notice.recipientRole || notice.metadata?.recipientRole || 'All',
    recipientName: notice.recipientName || notice.metadata?.recipientName || '',
    category: notice.category || notice.metadata?.category || 'General'
  };
}

function normalizeTrip(trip = {}) {
  const next = {
    ...trip,
    bookingSource: trip.bookingSource || trip.source || '',
    depositPaid: Number(trip.depositPaid || 0),
    balanceDue: Number(trip.balanceDue ?? trip.balance ?? 0),
    passengers: Number(trip.passengers ?? trip.guests ?? 0),
    hours: Number(trip.hours || 4),
    status: trip.status || 'Scheduled',
    passengerManifest: trip.passengerManifest || '',
    captainNotes: trip.captainNotes || '',
    mateNotes: trip.mateNotes || '',
    captainPhotos: Array.isArray(trip.captainPhotos) ? trip.captainPhotos : [],
    preTripChecklistStatus: trip.preTripChecklistStatus || 'Not Started',
    postTripChecklistStatus: trip.postTripChecklistStatus || 'Not Started'
  };
  next.assignmentStatus = normalizeAssignmentStatus(next);
  next.dispatchReadinessStatus = trip.dispatchReadinessStatus || 'Needs Review';
  return next;
}

function normalizeAssignmentStatus(trip = {}) {
  const existing = trip.assignmentStatus || {};
  return {
    captain: trip.captain ? existing.captain || 'Assigned' : 'Unassigned',
    mate: trip.mate && trip.mate !== 'None' ? existing.mate || 'Assigned' : 'Unassigned'
  };
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

function addNotification(title, message, level = 'info', metadata = {}, recipientRole = metadata.recipientRole || 'All', recipientName = metadata.recipientName || '', category = metadata.category || 'General') {
  store.notifications = Array.isArray(store.notifications) ? store.notifications : [];
  store.notifications.unshift({ id: makeId('notice'), at: new Date().toISOString(), title, message, level, read: false, recipientRole, recipientName, category, metadata });
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
    crewOptional: ['None', ...store.crew.filter((c) => c.active !== 'No').map((c) => c.name)],
    vesselReadiness: ['Operational', 'Needs Review', 'Out of Service', 'Maintenance Hold'],
    expenseCategories: ['Fuel', 'Ice', 'Supplies', 'Maintenance', 'Dockage', 'Reimbursement', 'Other'],
    expenseStatus: ['Submitted', 'Approved', 'Paid', 'Needs Review'],
    incidentSeverity: ['Low', 'Medium', 'High', 'Critical'],
    incidentCategories: ['Guest', 'Crew', 'Vessel', 'Weather', 'Injury', 'Equipment', 'Other'],
    incidentStatus: ['Open', 'Needs Review', 'Resolved'],
    trips: store.trips.map((t) => `${t.id}|${formatDate(t.tripDate)} ${t.startTime || ''} ${t.customer || 'Trip'}`)
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
    if (event.target.closest('[data-mark-notices-read]')) markNotificationsRead();
    const markNotice = event.target.closest('[data-mark-notice-read]');
    if (markNotice) markNotificationRead(markNotice.dataset.markNoticeRead);
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
  else if (route === 'captain-dashboard') renderCrewRoleDashboard('captain');
  else if (route === 'mate-dashboard') renderCrewRoleDashboard('mate');
  else if (route === 'owner-dashboard') renderOwnerDashboard();
  else if (route === 'pre-trip-checklist') renderChecklistPage('Pre Trip');
  else if (route === 'post-trip-checklist') renderChecklistPage('Post Trip');
  else if (route === 'notifications') renderNotifications();
  else if (route === 'audit') renderAuditTrail();
  else if (route === 'legacy') renderLegacy();
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

function assignmentStatusBadge(status) {
  const color = status === 'Accepted' || status === 'Completed' ? 'green' : status === 'Declined' ? 'red' : status === 'Notified' ? 'gold' : 'blue';
  return `<span class="badge ${color}">${escapeHtml(status || 'Assigned')}</span>`;
}

function addRoleNotification(recipientRole, recipientName, title, message, level = 'info', category = 'General', metadata = {}) {
  addNotification(title, message, level, { ...metadata, recipientRole, recipientName, category }, recipientRole, recipientName, category);
}

function ownerForVesselName(vesselName) {
  return store.vessels.find((vessel) => vessel.name === vesselName)?.owner || '';
}

function notifyAssignment(tripId, role) {
  updateAssignmentStatus(tripId, role, 'Notified');
}
function acceptAssignment(tripId, role) {
  updateAssignmentStatus(tripId, role, 'Accepted');
}
function declineAssignment(tripId, role) {
  updateAssignmentStatus(tripId, role, 'Declined');
}
function completeAssignment(tripId, role) {
  updateAssignmentStatus(tripId, role, 'Completed');
}

function updateAssignmentStatus(tripId, role, status) {
  const trip = store.trips.find((item) => item.id === tripId);
  if (!trip) return;
  trip.assignmentStatus = normalizeAssignmentStatus(trip);
  trip.assignmentStatus[role] = status;
  if (status === 'Completed' && role === 'captain') trip.status = trip.status === 'Scheduled' ? 'Completed' : trip.status;
  const person = trip[role] || role;
  const label = `${role === 'captain' ? 'Captain' : 'Mate'} assignment ${status}`;
  addAudit('updated', 'Assignments', `${label} for ${person} on ${trip.customer || 'trip'}.`, { tripId, role, status });
  addRoleNotification(role === 'captain' ? 'Captain' : 'Mate', person, label, `${trip.customer || 'A trip'} is now ${status.toLowerCase()} for ${formatDate(trip.tripDate)}.`, status === 'Declined' ? 'critical' : 'info', 'Assignment', { tripId, role, status });
  if (status === 'Declined') addRoleNotification('Operations', '', 'Assignment declined', `${person} declined ${trip.customer || 'a trip'} on ${formatDate(trip.tripDate)}.`, 'critical', 'Assignment', { tripId, role });
  saveStore();
  renderRoute(currentRoute);
  toast(`${label}.`);
}

function renderCrewRoleDashboard(role) {
  const route = `${role}-dashboard`;
  const page = document.getElementById(`page-${route}`);
  const roleLabel = role === 'captain' ? 'Captain' : 'Mate';
  const selected = page.querySelector('[data-role-person]')?.value || getOptions('crew')[0] || '';
  const trips = store.trips.filter((trip) => trip[role] === selected && trip.status !== 'Cancelled').sort(byDate);
  page.innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Phase 4 crew portal</p><h1>${roleLabel} Dashboard</h1><p class="section-summary">Review upcoming assigned trips, accept or decline work, and submit operational notes${role === 'captain' ? ' and photos' : ''}.</p></div><select data-role-person onchange="renderCrewRoleDashboard('${role}')">${getOptions('crew').map((name) => `<option value="${escapeHtml(name)}" ${name === selected ? 'selected' : ''}>${escapeHtml(name)}</option>`).join('')}</select></div><div class="role-trip-list">${trips.length ? trips.map((trip) => renderRoleTripCard(trip, role)).join('') : '<div class="card card-pad empty-state">No upcoming assignments for this crew member.</div>'}</div></div>`;
}

function renderRoleTripCard(trip, role) {
  const roleLabel = role === 'captain' ? 'Captain' : 'Mate';
  const notesKey = role === 'captain' ? 'captainNotes' : 'mateNotes';
  const status = normalizeAssignmentStatus(trip)[role];
  return `<div class="card role-trip-card"><div class="card-header"><div><h3>${escapeHtml(trip.customer || 'Trip')}</h3><p>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(formatTime(trip.startTime))} · ${escapeHtml(trip.vessel || 'No vessel')}</p></div>${assignmentStatusBadge(status)}</div><div class="assignment-actions"><button class="btn btn-primary btn-small" onclick="acceptAssignment('${trip.id}','${role}')">Accept Assignment</button><button class="btn btn-danger btn-small" onclick="declineAssignment('${trip.id}','${role}')">Decline Assignment</button><button class="btn btn-outline btn-small" onclick="completeAssignment('${trip.id}','${role}')">Mark Completed</button></div><div class="field"><label>${roleLabel} notes</label><textarea data-trip-notes="${trip.id}" data-note-role="${role}">${escapeHtml(trip[notesKey] || '')}</textarea></div><div class="form-actions"><button class="btn btn-outline btn-small" onclick="saveCrewTripNotes('${trip.id}','${role}')">Submit Notes</button>${role === 'captain' ? `<label class="btn btn-outline btn-small">Upload Photos<input type="file" accept="image/*" multiple hidden onchange="saveCaptainPhotos('${trip.id}', this.files)"></label>` : ''}</div>${role === 'captain' ? renderPhotoList(trip.captainPhotos) : ''}</div>`;
}

function saveCrewTripNotes(tripId, role) {
  const trip = store.trips.find((item) => item.id === tripId);
  const field = document.querySelector(`[data-trip-notes="${tripId}"][data-note-role="${role}"]`);
  if (!trip || !field) return;
  const key = role === 'captain' ? 'captainNotes' : 'mateNotes';
  trip[key] = field.value;
  addAudit('updated', `${role === 'captain' ? 'Captain' : 'Mate'} Dashboard`, `Submitted notes for ${trip.customer || 'trip'}.`, { tripId });
  addRoleNotification('Operations', '', 'Crew notes submitted', `${trip[role] || role} submitted notes for ${trip.customer || 'a trip'}.`, 'info', 'Assignment', { tripId, role });
  saveStore();
  toast('Notes saved.');
}

function saveCaptainPhotos(tripId, files) {
  const trip = store.trips.find((item) => item.id === tripId);
  if (!trip || !files?.length) return;
  trip.captainPhotos = Array.isArray(trip.captainPhotos) ? trip.captainPhotos : [];
  Array.from(files).forEach((file) => trip.captainPhotos.push({ name: file.name, size: file.size, addedAt: new Date().toISOString() }));
  addAudit('uploaded', 'Captain Dashboard', `Added ${files.length} captain photo record(s) for ${trip.customer || 'trip'}.`, { tripId });
  addRoleNotification('Operations', '', 'Captain photos uploaded', `${trip.captain || 'Captain'} added ${files.length} photo record(s) for ${trip.customer || 'a trip'}.`, 'info', 'Trip Completion', { tripId });
  saveStore();
  renderCrewRoleDashboard('captain');
  toast('Photo records saved locally.');
}

function renderPhotoList(photos = []) {
  return photos.length ? `<div class="photo-list">${photos.map((photo) => `<span class="badge blue">📷 ${escapeHtml(photo.name)}</span>`).join('')}</div>` : '<p class="muted-text">No photo records uploaded yet.</p>';
}


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
  if (route === 'expenses') page.querySelector('.section-heading').insertAdjacentHTML('beforeend', '<button class="btn btn-outline" data-route="legacy" data-embed-legacy="ReelAdventureTours_App_v5.html">Open legacy expenses</button>');
  page.querySelector('.search-input').addEventListener('input', () => renderTable(route));
  renderForm(route);
  if (route === 'trips') renderAssignmentBoard();
  if (route === 'crew') renderCrewDashboard();
  if (route === 'vessels') renderVesselReadinessPanel();
  renderTable(route);
}

function renderForm(route, record = {}) {
  const config = crudConfig[route];
  const form = document.querySelector(`#page-${route} .record-form`);
  form.innerHTML = `<div class="form-grid">${config.fields.map(([key, label, type]) => renderField(key, label, type, record[key])).join('')}</div>${route === 'trips' ? '<div class="conflict-panel" data-conflict-panel hidden></div>' : ''}<div class="form-actions"><button class="btn btn-primary" type="submit">Save ${config.title.slice(0, -1)}</button>${voiceFillButton(route)}<button class="btn btn-outline" type="button" data-cancel>Cancel</button></div>`;
  if (route === 'trips') {
    form.addEventListener('input', () => updateTripConflictPreview(form));
    form.addEventListener('change', (event) => {
      if (['tourPrice', 'depositPaid'].includes(event.target.name)) updateBalanceDue(form);
    });
  }
  form.onsubmit = (event) => saveRecord(event, route);
  form.querySelector('[data-cancel]').onclick = () => { editing[route] = null; form.hidden = true; };
}

function voiceFillButton(route) {
  if (!['bookings', 'trips', 'expenses', 'pre-trip-checklist', 'post-trip-checklist', 'incident-reports'].includes(route)) return '';
  return '<button class="btn btn-outline" type="button" data-voice-fill>🎙️ Voice fill</button>';
}

function renderField(key, label, type, value = '') {
  if (type === 'textarea') return `<div class="field"><label for="${key}">${label}</label><textarea id="${key}" name="${key}">${escapeHtml(value)}</textarea></div>`;
  if (type.startsWith('select:')) {
    const options = getOptions(type.split(':')[1]);
    return `<div class="field"><label for="${key}">${label}</label><select id="${key}" name="${key}"><option value="">— Select —</option>${options.map((opt) => `<option value="${escapeHtml(opt)}" ${String(value) === String(opt) ? 'selected' : ''}>${escapeHtml(opt)}</option>`).join('')}</select></div>`;
  }
  return `<div class="field"><label for="${key}">${label}</label><input id="${key}" name="${key}" type="${type}" value="${escapeHtml(value)}"></div>`;
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
    const previous = editing[route] ? store.trips.find((trip) => trip.id === editing[route]) : null;
    data.assignmentStatus = normalizeAssignmentStatus({ ...previous, ...data });
    data.preTripChecklistStatus = previous?.preTripChecklistStatus || data.preTripChecklistStatus || 'Not Started';
    data.postTripChecklistStatus = previous?.postTripChecklistStatus || data.postTripChecklistStatus || 'Not Started';
    data.dispatchReadinessStatus = calculateDispatchReadiness({ ...previous, ...data });
    data.payroll = calculateTripPayroll(data);
  }
  const action = editing[route] ? 'updated' : 'created';
  const savedId = editing[route] || makeId(config.collection);
  data.id = savedId;
  if (editing[route]) {
    store[config.collection] = store[config.collection].map((item) => item.id === editing[route] ? { ...item, ...data } : item);
  } else {
    store[config.collection].push({ ...data });
  }
  addAudit(action, config.title, `${config.title.slice(0, -1)} ${summarizeRecord(data)} ${action}.`, { route });
  if (route === 'trips') {
    addNotification('Trip saved', `${data.customer || 'A trip'} is ${data.status || 'Scheduled'} for ${formatDate(data.tripDate)}.`, 'success', { route, category: 'Assignment' });
    if (data.captain) addRoleNotification('Captain', data.captain, 'New captain assignment', `${data.customer || 'A trip'} is assigned for ${formatDate(data.tripDate)}.`, 'info', 'Assignment', { route, tripId: savedId });
    if (data.mate && data.mate !== 'None') addRoleNotification('Mate', data.mate, 'New mate assignment', `${data.customer || 'A trip'} is assigned for ${formatDate(data.tripDate)}.`, 'info', 'Assignment', { route, tripId: savedId });
    const owner = ownerForVesselName(data.vessel);
    if (owner) addRoleNotification('Owner', owner, 'Owner assignment alert', `${data.vessel} is assigned to ${data.customer || 'a trip'} on ${formatDate(data.tripDate)}.`, 'info', 'Assignment', { route, tripId: savedId, vessel: data.vessel });
  }
  if (route === 'expenses') {
    addRoleNotification('Operations', '', 'Expense alert', `${data.category || 'Expense'} ${money(data.amount)} was saved for ${data.vessel || 'operations'}.`, 'warning', 'Expense', { route, vessel: data.vessel });
    const owner = ownerForVesselName(data.vessel);
    if (owner) addRoleNotification('Owner', owner, 'Expense alert', `${data.category || 'Expense'} ${money(data.amount)} was saved for ${data.vessel}.`, 'warning', 'Expense', { route, vessel: data.vessel });
  }
  if (route === 'incident-reports') {
    addRoleNotification('Operations', '', 'Incident alert', `${data.severity || 'Incident'} report saved for ${data.vessel || 'operations'}.`, data.severity === 'Critical' ? 'critical' : 'warning', 'Incident', { route, vessel: data.vessel });
    const owner = ownerForVesselName(data.vessel);
    if (owner) addRoleNotification('Owner', owner, 'Incident alert', `${data.severity || 'Incident'} report saved for ${data.vessel}.`, data.severity === 'Critical' ? 'critical' : 'warning', 'Incident', { route, vessel: data.vessel });
  }
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
  if (route === 'vessels') renderVesselReadinessPanel();
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
  if (['balance', 'tourPrice', 'depositPaid', 'balanceDue', 'defaultPayout', 'amount'].includes(key)) return value === '' || value == null ? '—' : money(value);
  if (key === 'passengerManifest') return passengerManifestSummary(value);
  if (key === 'status' || key === 'readinessStatus') return `<span class="badge blue">${escapeHtml(value || '—')}</span>`;
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


function passengerManifestSummary(value) {
  const count = String(value || '').split(/\n|,/).map((item) => item.trim()).filter(Boolean).length;
  return count ? `${count} passenger${count === 1 ? '' : 's'}` : '—';
}

function vesselForTrip(trip) {
  return store.vessels.find((vessel) => vessel.name === trip.vessel);
}

function latestChecklistStatus(trip, type) {
  const record = (store.checklistRecords || []).filter((item) => item.tripId === trip.id && item.type === type).sort((a, b) => String(b.submittedAt || '').localeCompare(String(a.submittedAt || '')))[0];
  return record?.status || trip[type === 'Pre Trip' ? 'preTripChecklistStatus' : 'postTripChecklistStatus'] || 'Not Started';
}

function calculateDispatchReadiness(trip) {
  const assignment = normalizeAssignmentStatus(trip);
  const conflicts = trip.id ? findTripConflicts(trip, trip.id) : [];
  const vessel = vesselForTrip(trip);
  if (!trip.vessel || !trip.captain || !trip.mate || trip.mate === 'None' || !trip.tripDate || !trip.startTime) return 'Not Ready';
  if (assignment.captain === 'Declined' || assignment.mate === 'Declined') return 'Not Ready';
  if (conflicts.length) return 'Not Ready';
  if (vessel && !['', 'Operational'].includes(vessel.readinessStatus || vessel.status || '')) return 'Needs Review';
  if (latestChecklistStatus(trip, 'Pre Trip') !== 'Completed') return 'Needs Review';
  if (!['Accepted', 'Completed'].includes(assignment.captain) || !['Accepted', 'Completed'].includes(assignment.mate)) return 'Needs Review';
  if (trip.status === 'Completed' && latestChecklistStatus(trip, 'Post Trip') === 'Completed') return 'Completed';
  return 'Ready';
}

function readinessBadge(status) {
  const color = status === 'Ready' || status === 'Completed' ? 'green' : status === 'Not Ready' ? 'red' : 'gold';
  return `<span class="badge ${color}">${escapeHtml(status || 'Needs Review')}</span>`;
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
  const trips = [...store.trips].filter((trip) => trip.status !== 'Cancelled').sort((a, b) => String(a.tripDate + a.startTime).localeCompare(String(b.tripDate + b.startTime)));
  const buckets = ['Today', 'Tomorrow', 'This Week', 'Future'];
  const grouped = buckets.reduce((acc, bucket) => ({ ...acc, [bucket]: [] }), {});
  trips.forEach((trip) => grouped[tripBucket(trip)].push(trip));
  board.innerHTML = `<div class="card-header"><h3>Trip Assignment Board</h3><span class="badge blue">${trips.length} active trips</span></div><div class="assignment-list">${trips.length ? buckets.map((bucket) => renderAssignmentBucket(bucket, grouped[bucket])).join('') : '<div class="empty-state">No trips assigned yet. Create a trip with a vessel, captain, mate, date, and start time to populate the board.</div>'}</div>`;
}

function renderAssignmentBucket(bucket, trips) {
  return `<section class="assignment-bucket"><h4>${escapeHtml(bucket)}</h4>${trips.length ? trips.map(renderAssignmentTrip).join('') : '<p class="empty-state">No trips in this group.</p>'}</section>`;
}

function renderAssignmentTrip(trip) {
  const payroll = trip.payroll || calculateTripPayroll(trip);
  const assignment = normalizeAssignmentStatus(trip);
  const readiness = calculateDispatchReadiness(trip);
  const preStatus = latestChecklistStatus(trip, 'Pre Trip');
  const postStatus = latestChecklistStatus(trip, 'Post Trip');
  const manifest = passengerManifestSummary(trip.passengerManifest);
  return `<div class="assignment-item"><div><strong>${escapeHtml(trip.customer || 'Unassigned customer')}</strong><span>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(formatTime(trip.startTime))} · ${Number(trip.hours || 4)} hrs</span><span>${escapeHtml(trip.bookingSource || 'No source')} · ${Number(trip.passengers || 0)} guests · Manifest: ${escapeHtml(manifest)} · Status: ${escapeHtml(trip.status || 'Scheduled')}</span><span>Phone: ${escapeHtml(trip.phone || '—')} · Email: ${escapeHtml(trip.email || '—')}</span><span>${trip.notes ? `Notes: ${escapeHtml(trip.notes)}` : ''}</span><div class="assignment-actions"><button class="btn btn-outline btn-small" onclick="notifyAssignment('${trip.id}','captain')">Notify Captain</button><button class="btn btn-outline btn-small" onclick="notifyAssignment('${trip.id}','mate')">Notify Mate</button><button class="btn btn-primary btn-small" onclick="completeAssignment('${trip.id}','captain');completeAssignment('${trip.id}','mate')">Mark Crew Completed</button></div></div><div class="assignment-detail-grid"><span class="badge blue">${escapeHtml(trip.vessel || 'No vessel')}</span><span>Dispatch: ${readinessBadge(readiness)}</span><span>Pre Trip: ${readinessBadge(preStatus)}</span><span>Post Trip: ${readinessBadge(postStatus)}</span><span>Captain: ${escapeHtml(trip.captain || 'Unassigned')} ${assignmentStatusBadge(assignment.captain)}</span><span>Mate: ${escapeHtml(trip.mate || 'None')} ${assignmentStatusBadge(assignment.mate)}</span><span>Tour: <strong>${money(trip.tourPrice)}</strong></span><span>Deposit: <strong>${money(trip.depositPaid)}</strong></span><span>Balance: <strong>${money(trip.balanceDue)}</strong></span><span>Payroll: ${payroll.map((entry) => `${escapeHtml(entry.role)} ${money(entry.amount)}`).join(' · ')}</span></div></div>`;
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
  addNotification('Payroll payment recorded', `${money(data.amountPaid)} saved for ${entry?.person || 'crew'}.`, 'success', { entryKey, category: 'Payroll' });
  if (entry?.role === 'Owner') addRoleNotification('Owner', entry.person, 'Payroll alert', `${money(data.amountPaid)} owner payment recorded.`, 'success', 'Payroll', { entryKey, vessel: entry.vessel });
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

function startVoiceFill(button) {
  const form = button.closest('form');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!form || !SpeechRecognition) {
    toast('Voice fill is not supported in this browser.');
    return;
  }
  if (voiceRecognition) voiceRecognition.stop();
  voiceRecognition = new SpeechRecognition();
  voiceRecognition.continuous = false;
  voiceRecognition.interimResults = false;
  voiceRecognition.lang = 'en-US';
  button.textContent = 'Listening…';
  voiceRecognition.onresult = (event) => applyVoiceTranscript(form, event.results[0][0].transcript || '');
  voiceRecognition.onerror = () => toast('Voice fill stopped before text was captured.');
  voiceRecognition.onend = () => { button.textContent = '🎙️ Voice fill'; voiceRecognition = null; };
  voiceRecognition.start();
}

function applyVoiceTranscript(form, transcript) {
  const notes = form.elements.notes || form.elements.description || form.elements.actionsTaken;
  if (notes) notes.value = [notes.value, transcript].filter(Boolean).join(notes.value ? '\n' : '');
  const customerMatch = transcript.match(/customer\s+([^,.]+)/i);
  if (customerMatch && form.elements.customer) form.elements.customer.value = customerMatch[1].trim();
  const guestsMatch = transcript.match(/(?:guests|passengers)\s+(\d+)/i);
  if (guestsMatch && form.elements.passengers) form.elements.passengers.value = guestsMatch[1];
  if (guestsMatch && form.elements.guests) form.elements.guests.value = guestsMatch[1];
  const amountMatch = transcript.match(/(?:amount|cost|expense)\s+\$?(\d+(?:\.\d{1,2})?)/i);
  if (amountMatch && form.elements.amount) form.elements.amount.value = amountMatch[1];
  const vesselMatch = transcript.match(/vessel\s+([^,.]+)/i);
  if (vesselMatch && form.elements.vessel) setSelectLikeValue(form.elements.vessel, vesselMatch[1].trim());
  const captainMatch = transcript.match(/captain\s+([^,.]+)/i);
  if (captainMatch && form.elements.captain) setSelectLikeValue(form.elements.captain, captainMatch[1].trim());
  const mateMatch = transcript.match(/mate\s+([^,.]+)/i);
  if (mateMatch && form.elements.mate) setSelectLikeValue(form.elements.mate, mateMatch[1].trim());
  const severityMatch = transcript.match(/severity\s+(low|medium|high|critical)/i);
  if (severityMatch && form.elements.severity) form.elements.severity.value = severityMatch[1][0].toUpperCase() + severityMatch[1].slice(1).toLowerCase();
  addAudit('voice-fill', currentRoute, `Voice fill captured notes for ${currentRoute}.`, { transcriptLength: transcript.length });
  saveStore();
  if (currentRoute === 'trips') updateTripConflictPreview(form);
  toast('Voice fill added transcript and field suggestions. Review before saving.');
}

function setSelectLikeValue(element, text) {
  const match = Array.from(element.options || []).find((option) => option.textContent.toLowerCase().includes(text.toLowerCase()) || option.value.toLowerCase().includes(text.toLowerCase()));
  if (match) element.value = match.value;
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
  const page = document.getElementById('page-notifications');
  const selected = page.querySelector('[data-notice-filter]')?.value || 'All';
  const notices = store.notifications || [];
  const filtered = notices.filter((notice) => selected === 'All' || (selected === 'Unread' ? !notice.read : notice.recipientRole === selected || notice.category === selected));
  const options = ['All', 'Unread', 'Owner', 'Captain', 'Mate', 'Operations', 'Assignment', 'Checklist', 'Expense', 'Incident', 'Payroll'];
  page.innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Operational alerts</p><h1>Notification Center</h1><p class="section-summary">Role-targeted owner, captain, mate, and operations alerts with read/unread status.</p></div><div class="notification-tools"><select data-notice-filter onchange="renderNotifications()">${options.map((option) => `<option value="${option}" ${option === selected ? 'selected' : ''}>${option}</option>`).join('')}</select><button class="btn btn-outline" data-mark-notices-read>Mark all read</button></div></div><div class="grid kpi-grid dashboard-kpis">${kpi('Owner alerts', unreadByRole('Owner'), 'Unread')}${kpi('Captain alerts', unreadByRole('Captain'), 'Unread')}${kpi('Mate alerts', unreadByRole('Mate'), 'Unread')}${kpi('Operations alerts', unreadByRole('Operations'), 'Unread')}</div><div class="card card-pad notice-list">${filtered.length ? filtered.map((notice) => `<div class="notice-item ${notice.read ? '' : 'unread'}"><span class="badge ${notice.level === 'critical' ? 'red' : notice.level === 'success' ? 'green' : notice.level === 'warning' ? 'gold' : 'blue'}">${escapeHtml(notice.category || notice.level || 'info')}</span><div><strong>${escapeHtml(notice.title)}</strong><p>${escapeHtml(notice.message)}</p><small>${escapeHtml([notice.recipientRole || 'All', notice.recipientName, new Date(notice.at).toLocaleString()].filter(Boolean).join(' · '))}</small></div><button class="btn btn-outline btn-small" data-mark-notice-read="${notice.id}">${notice.read ? 'Read' : 'Mark read'}</button></div>`).join('') : '<p class="empty-state">No notifications match this filter.</p>'}</div></div>`;
}

function unreadByRole(role) {
  return (store.notifications || []).filter((notice) => !notice.read && notice.recipientRole === role).length;
}

function markNotificationRead(id) {
  const notice = (store.notifications || []).find((item) => item.id === id);
  if (notice) notice.read = true;
  addAudit('updated', 'Notifications', `Marked notification ${id} as read.`);
  saveStore();
  renderNotifications();
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


function renderChecklistPage(type) {
  const route = type === 'Pre Trip' ? 'pre-trip-checklist' : 'post-trip-checklist';
  const page = document.getElementById(`page-${route}`);
  const relatedLegacy = type === 'Pre Trip' ? 'RAT-PreTrip-VesselCheck.html' : 'RAT-PostTrip-VesselCheck.html';
  const records = (store.checklistRecords || []).filter((record) => record.type === type).sort((a, b) => String(b.submittedAt || '').localeCompare(String(a.submittedAt || '')));
  page.innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Checklist integration</p><h1>${type} Checklist</h1><p class="section-summary">Track checklist status inside dispatch readiness while preserving the original legacy checklist tool.</p></div><button class="btn btn-primary" data-route="legacy" data-embed-legacy="${relatedLegacy}">Open legacy ${type.toLowerCase()} tool</button></div><form class="record-form card" onsubmit="saveChecklistRecord(event,'${type}')"><div class="form-grid"><div class="field"><label>Related trip</label><select name="tripId">${getOptions('trips').map((opt) => `<option value="${escapeHtml(opt.split('|')[0])}">${escapeHtml(opt.split('|').slice(1).join('|'))}</option>`).join('')}</select></div><div class="field"><label>Vessel</label><select name="vessel"><option value="">— Select —</option>${getOptions('vessels').map((vessel) => `<option value="${escapeHtml(vessel)}">${escapeHtml(vessel)}</option>`).join('')}</select></div><div class="field"><label>Submitted by</label><select name="submittedBy">${getOptions('crew').map((crew) => `<option value="${escapeHtml(crew)}">${escapeHtml(crew)}</option>`).join('')}</select></div><div class="field"><label>Status</label><select name="status"><option>Not Started</option><option>In Progress</option><option>Completed</option><option>Needs Review</option></select></div><div class="field"><label>Photo notes</label><textarea name="photos"></textarea></div><div class="field"><label>Notes</label><textarea name="notes"></textarea></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Save ${type} Status</button>${voiceFillButton(route)}</div></form><div class="card table-card"><div class="card-header"><h3>${type} records</h3></div><div class="responsive-table-wrap"><table><thead><tr><th>Submitted</th><th>Trip</th><th>Vessel</th><th>By</th><th>Status</th><th>Notes</th></tr></thead><tbody>${records.length ? records.map((record) => `<tr><td>${escapeHtml(new Date(record.submittedAt).toLocaleString())}</td><td>${escapeHtml(record.tripLabel || record.tripId)}</td><td>${escapeHtml(record.vessel)}</td><td>${escapeHtml(record.submittedBy)}</td><td>${readinessBadge(record.status)}</td><td>${escapeHtml(record.notes || '—')}</td></tr>`).join('') : '<tr><td colspan="6" class="empty-state">No checklist records yet.</td></tr>'}</tbody></table></div></div></div>`;
}

function saveChecklistRecord(event, type) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const trip = store.trips.find((item) => item.id === data.tripId);
  const record = { id: makeId('checklist'), type, ...data, tripLabel: trip ? `${formatDate(trip.tripDate)} ${trip.customer || ''}` : '', submittedAt: new Date().toISOString() };
  store.checklistRecords.push(record);
  if (trip) {
    if (type === 'Pre Trip') trip.preTripChecklistStatus = data.status;
    else trip.postTripChecklistStatus = data.status;
    trip.dispatchReadinessStatus = calculateDispatchReadiness(trip);
  }
  addAudit('created', `${type} Checklist`, `${type} status ${data.status} saved for ${data.vessel || 'trip'}.`, { tripId: data.tripId });
  addRoleNotification('Operations', '', `${type} checklist ${data.status}`, `${data.vessel || 'A vessel'} checklist is ${data.status}.`, data.status === 'Needs Review' ? 'warning' : 'success', 'Checklist', { tripId: data.tripId, vessel: data.vessel });
  saveStore();
  renderChecklistPage(type);
  toast(`${type} checklist saved.`);
}

function renderVesselReadinessPanel() {
  const page = document.getElementById('page-vessels');
  const table = page.querySelector('.table-card');
  if (!table || page.querySelector('[data-vessel-readiness-panel]')) return;
  const panel = document.createElement('div');
  panel.className = 'card vessel-readiness-panel';
  panel.dataset.vesselReadinessPanel = 'true';
  panel.innerHTML = `<div class="card-header"><h3>Vessel Readiness Workflow</h3><span class="badge gold">Feeds dispatch readiness</span></div><div class="readiness-grid">${store.vessels.map((vessel) => `<div class="readiness-card"><strong>${escapeHtml(vessel.name)}</strong><span>${escapeHtml(vessel.owner || 'No owner')} · Capacity ${escapeHtml(vessel.capacity || '—')}</span><select onchange="updateVesselReadiness('${vessel.id}', this.value)">${getOptions('vesselReadiness').map((status) => `<option value="${escapeHtml(status)}" ${status === (vessel.readinessStatus || 'Operational') ? 'selected' : ''}>${escapeHtml(status)}</option>`).join('')}</select></div>`).join('')}</div>`;
  table.before(panel);
}

function updateVesselReadiness(vesselId, readinessStatus) {
  const vessel = store.vessels.find((item) => item.id === vesselId);
  if (!vessel) return;
  vessel.readinessStatus = readinessStatus;
  store.trips.filter((trip) => trip.vessel === vessel.name).forEach((trip) => { trip.dispatchReadinessStatus = calculateDispatchReadiness(trip); });
  addAudit('updated', 'Vessel Readiness', `${vessel.name} marked ${readinessStatus}.`, { vesselId });
  addRoleNotification('Operations', '', 'Vessel readiness updated', `${vessel.name} is ${readinessStatus}.`, readinessStatus === 'Operational' ? 'success' : 'warning', 'Checklist', { vessel: vessel.name });
  saveStore();
  renderRoute(currentRoute);
}

function renderOwnerDashboard() {
  const page = document.getElementById('page-owner-dashboard');
  const selected = page.querySelector('[data-owner-select]')?.value || getOptions('owners')[0] || '';
  const ownerVessels = store.vessels.filter((vessel) => vessel.owner === selected).map((vessel) => vessel.name);
  const trips = store.trips.filter((trip) => ownerVessels.includes(trip.vessel)).sort(byDate);
  const notices = (store.notifications || []).filter((notice) => notice.recipientRole === 'Owner' || ownerVessels.includes(notice.metadata?.vessel));
  const ownerPayroll = payrollEntries().filter((entry) => entry.role === 'Owner' && entry.person === selected);
  page.innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Phase 4B owner operations</p><h1>Owner Dashboard</h1><p class="section-summary">Assignment, completion, expense, incident, and payroll alert view for vessel owners.</p></div><select data-owner-select onchange="renderOwnerDashboard()">${getOptions('owners').map((owner) => `<option value="${escapeHtml(owner)}" ${owner === selected ? 'selected' : ''}>${escapeHtml(owner)}</option>`).join('')}</select></div><div class="grid kpi-grid dashboard-kpis">${kpi('Owned vessels', ownerVessels.length, ownerVessels.join(', ') || 'None')}${kpi('Assigned trips', trips.length, 'Active owner vessels')}${kpi('Unread alerts', notices.filter((notice) => !notice.read).length, 'Owner related')}${kpi('Outstanding payroll', money(ownerPayroll.reduce((sum, entry) => sum + entry.outstanding, 0)), 'Owner payouts')}</div><div class="grid dashboard-grid"><div class="card"><div class="card-header"><h3>Assignment alerts</h3></div><div class="stat-list">${trips.length ? trips.map((trip) => `<div class="stat-row"><span>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(trip.vessel)}</span><strong>${escapeHtml(trip.customer || 'Trip')}<br><small>Captain ${escapeHtml(trip.captain || '—')} · Mate ${escapeHtml(trip.mate || '—')}</small></strong></div>`).join('') : '<p class="empty-state">No owner vessel assignments.</p>'}</div></div><div class="card"><div class="card-header"><h3>Owner alerts</h3></div><div class="notice-list card-pad">${notices.length ? notices.slice(0, 8).map((notice) => `<div class="notice-item ${notice.read ? '' : 'unread'}"><span class="badge gold">${escapeHtml(notice.category)}</span><div><strong>${escapeHtml(notice.title)}</strong><p>${escapeHtml(notice.message)}</p></div></div>`).join('') : '<p class="empty-state">No owner alerts.</p>'}</div></div></div></div>`;
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
function settingsMarkup() {
  return `<div class="grid settings-grid" style="margin-top:18px"><div class="legacy-tool"><h3>Seed data</h3><p>${store.vessels.length} vessels, ${store.crew.length} crew members, ${store.roles.length} roles, ${store.bookingSources.length} booking sources, ${store.standardPayoutRates.length} standard crew payout rates, and ${store.vesselOwnerPayoutRates.length} documented owner payout rules loaded.</p></div><div class="legacy-tool"><h3>Local data layer</h3><p>Storage key: ${STORE_KEY}. Last updated: ${new Date(store.updatedAt).toLocaleString()}.</p><div class="legacy-actions"><button class="btn btn-outline" data-export-store>Export JSON</button><label class="btn btn-outline" for="importStoreFile">Import JSON<input id="importStoreFile" data-import-store type="file" accept="application/json" hidden></label><button class="btn btn-danger" data-reset-store>Reset seed data</button></div></div><div class="legacy-tool"><h3>Preserved Phase 3 safeguards</h3><p>Dispatch board, assignment lifecycle, crew dashboards, checklist readiness, vessel readiness, passenger manifests, payroll, audit trail, notifications, voice fill, export/import, legacy shell links, and the static validator are all active.</p></div></div>`;
}

function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}

document.addEventListener('DOMContentLoaded', init);
