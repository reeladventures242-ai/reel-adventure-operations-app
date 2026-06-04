const STORE_KEY = 'rat_ops_v1_store';
const STORE_VERSION = 8;

const navItems = [
  ['dashboard', '🏠', 'Dashboard'], ['bookings', '📘', 'Bookings'], ['invoices', '🧾', 'Invoices'],
  ['trips', '🧭', 'Trips'], ['captain-dashboard', '🧢', 'Captain Dashboard'], ['mate-dashboard', '⚓', 'Mate Dashboard'], ['owner-dashboard', '👑', 'Owner Dashboard'], ['vessels', '⛵', 'Vessels'], ['crew', '👥', 'Crew'],
  ['payroll', '💸', 'Payroll'], ['expenses', '💳', 'Expenses'], ['inventory', '📦', 'Inventory'], ['incident-reports', '🚨', 'Incident Reports'],
  ['pre-trip-checklist', '✅', 'Pre Trip Checklist'], ['post-trip-checklist', '🧽', 'Post Trip Checklist'],
  ['cruise-schedule', '🚢', 'Cruise Schedule'], ['reports', '📊', 'Reports'],
  ['notifications', '🔔', 'Notifications'], ['audit', '🧾', 'Audit Trail'], ['settings', '⚙️', 'Settings']
];

const mobilePrimaryNav = [
  ['dashboard', '🏠', 'Dashboard'],
  ['trips', '🧭', 'Dispatch'],
  ['bookings', '📘', 'Bookings'],
  ['crew', '👥', 'Crew'],
  ['more', '☰', 'More']
];

const mobileMoreNav = [
  ['invoices', '🧾', 'Invoices'], ['vessels', '⛵', 'Vessels'], ['payroll', '💸', 'Payroll'],
  ['expenses', '💳', 'Expenses'], ['inventory', '📦', 'Inventory'], ['pre-trip-checklist', '✅', 'Pre Trip'],
  ['post-trip-checklist', '🧽', 'Post Trip'], ['incident-reports', '🚨', 'Incident Reports'], ['cruise-schedule', '🚢', 'Cruise Schedule'],
  ['reports', '📊', 'Reports'], ['notifications', '🔔', 'Notifications'], ['audit', '🧾', 'Audit Trail'], ['settings', '⚙️', 'Settings']
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
  checklistRecords: [],
  invoices: [],
  cruiseSchedule: [],
  inventory: []
};

const crudConfig = {
  bookings: {
    title: 'Bookings', eyebrow: 'Simple CRUD', summary: 'Create, read, update, and delete booking records directly in the native operations app.', collection: 'bookings', addLabel: 'Add booking',
    fields: [['order','Order #','text'], ['customer','Customer','text'], ['date','Trip date','date'], ['time','Time','time'], ['guests','Guests','number'], ['product','Product','text'], ['source','Source','select:bookingSources'], ['balance','Balance due','number'], ['status','Status','select:bookingStatus'], ['notes','Notes','textarea']],
    columns: [['order','Order'], ['customer','Customer'], ['date','Date'], ['guests','Guests'], ['product','Product'], ['source','Source'], ['balance','Balance']]
  },
  trips: {
    title: 'Trips', eyebrow: 'Daily operations', summary: 'Create trips, assign vessels and crew, detect assignment conflicts, and calculate separated owner/captain/mate payroll.', collection: 'trips', addLabel: 'Create trip',
    fields: [['customer','Customer name','text'], ['phone','Phone number','tel'], ['email','Email','email'], ['bookingSource','Booking source','select:bookingSources'], ['tripDate','Date','date'], ['startTime','Departure time','time'], ['passengers','Guest count','number'], ['hours','Hours','number'], ['tourType','Tour type','text'], ['tourPrice','Tour price','number'], ['depositPaid','Deposit paid','number'], ['balanceDue','Balance due','number'], ['vessel','Assigned vessel','select:vessels'], ['captain','Assigned captain','select:crew'], ['mate','Assigned mate','select:crewOptional'], ['status','Trip status','select:tripStatus'], ['passengerManifest','Passenger manifest (one passenger per line)','textarea'], ['notes','Notes','textarea']],
    columns: [['tripDate','Date'], ['startTime','Time'], ['customer','Customer'], ['passengers','Guests'], ['tourType','Tour type'], ['bookingSource','Source'], ['tourPrice','Price'], ['depositPaid','Deposit'], ['balanceDue','Balance'], ['vessel','Vessel'], ['captain','Captain'], ['mate','Mate'], ['status','Status'], ['passengerManifest','Manifest']]
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
    title: 'Expenses', eyebrow: 'Operations costs', summary: 'Capture operating expenses, receipt/photo notes, approvals, and vessel cost alerts directly in the native operations app.', collection: 'expenses', addLabel: 'Add expense',
    fields: [['date','Expense date','date'], ['vessel','Vessel','select:vessels'], ['category','Category','select:expenseCategories'], ['description','Item / Description','text'], ['amount','Amount','number'], ['paidBy','Paid by','select:crew'], ['linkedTrip','Link to Trip','select:trips'], ['weekStart','Week Start for Payout','date'], ['addToPayout','Add to Payout This Week?','select:yesNo'], ['reimbursementStatus','Reimbursement Status','select:reimbursementStatus'], ['receiptNumber','Receipt / Reference #','text'], ['status','Status','select:expenseStatus'], ['receiptPhotos','Receipt/photo notes','textarea'], ['notes','Notes','textarea']],
    columns: [['date','Date'], ['vessel','Vessel'], ['category','Category'], ['amount','Amount'], ['paidBy','Paid by'], ['status','Status']]
  },
  invoices: {
    title: 'Invoices', eyebrow: 'Native billing', summary: 'Create, edit, link, and settle customer invoices directly in the main operations app.', collection: 'invoices', addLabel: 'Create Invoice',
    fields: [['invoiceNumber','Invoice Number','text'], ['documentType','Document Type (Quote or Invoice)','select:documentTypes'], ['customerName','Customer Name','text'], ['phone','Phone Number','tel'], ['email','Email','email'], ['tripDate','Trip Date','date'], ['startTime','Start Time','time'], ['endTime','End Time','time'], ['tourType','Tour Package / Product','text'], ['adultCount','Adults on Boat 1','number'], ['kidCount','Kids on Boat 1','number'], ['guestCount','Guest Count','number'], ['pickupLocation','Pickup Location','select:pickupLocations'], ['customPickupLocation','Custom Pickup Location','text'], ['pickupDirections','Directions / Notes','textarea'], ['landingFeeNote','Landing Fee / Note','text'], ['baseTourPrice','Base Tour Price','number'], ['swimmingPigsPeople','Swimming Pigs People ($20/person)','number'], ['secondBoat','Add Second Boat','select:yesNo'], ['boat2Adults','Adults on Boat 2','number'], ['boat2Kids','Kids on Boat 2','number'], ['vessel','Vessel','select:vessels'], ['bookingSource','Booking Source','select:bookingSources'], ['tourPrice','Calculated Tour Price','number'], ['depositPercent','Deposit Percent','number'], ['depositPaid','Deposit Paid','number'], ['balanceDue','Balance Due','number'], ['paymentStatus','Payment Status','select:paymentStatus'], ['paymentMethod','Preferred Payment Method','select:paymentMethods'], ['tripId','Link Invoice to Trip','select:trips'], ['bookingId','Link Invoice to Booking','select:bookings'], ['customerSummary','Customer-Facing Summary','textarea'], ['notes','Notes','textarea']],
    columns: [['invoiceNumber','Invoice #'], ['customerName','Customer'], ['tripDate','Trip Date'], ['tourPrice','Total Price'], ['depositPaid','Deposit'], ['balanceDue','Balance'], ['paymentStatus','Payment Status'], ['vessel','Vessel']]
  },
  'cruise-schedule': {
    title: 'Cruise Schedule', eyebrow: 'Native ships in port', summary: 'Track cruise ship arrivals, departures, capacity, terminal, and upcoming port load inside the app.', collection: 'cruiseSchedule', addLabel: 'Create Cruise Entry',
    fields: [['shipName','Ship Name','text'], ['cruiseLine','Cruise Line','text'], ['departureDate','Cruise Departs','date'], ['returnDate','Cruise Returns','date'], ['arrivalDate','Nassau Arrival Date','date'], ['arrivalTime','Nassau Arrival Time','time'], ['departureTime','Nassau Departure Time','time'], ['passengerCapacity','Passenger Capacity','number'], ['terminalDock','Terminal / Dock','text'], ['facebookSearchTerm','Facebook Search Term','text'], ['postedStatus','Posted?','select:postedStatus'], ['opportunityStatus','Opportunity Status','select:opportunityStatus'], ['notes','Notes','textarea']],
    columns: [['shipName','Ship Name'], ['cruiseLine','Cruise Line'], ['arrivalDate','Nassau Arrival'], ['arrivalTime','Arrival Time'], ['departureTime','Departure Time'], ['passengerCapacity','Passenger Capacity'], ['facebookSearchTerm','Facebook Search Term'], ['postedStatus','Posted?'], ['opportunityStatus','Status']]
  },
  'incident-reports': {
    title: 'Incident Reports', eyebrow: 'Safety and operations', summary: 'Document guest, vessel, weather, injury, and equipment incidents for operational follow-up.', collection: 'incidentReports', addLabel: 'Add incident',
    fields: [['date','Incident date','date'], ['tripId','Related trip','select:trips'], ['vessel','Vessel','select:vessels'], ['reportedBy','Reported by','select:crew'], ['severity','Severity','select:incidentSeverity'], ['category','Category','select:incidentCategories'], ['status','Status','select:incidentStatus'], ['description','Description','textarea'], ['actionsTaken','Actions taken','textarea'], ['photos','Photo notes','textarea']],
    columns: [['date','Date'], ['vessel','Vessel'], ['reportedBy','Reported by'], ['severity','Severity'], ['category','Category'], ['status','Status']]
  }
};

const defaultInventoryItems = [
  { id: 'inv-water', name: 'Water', category: 'Beverages', unit: 'case(s)', currentStock: 1, minimumRequiredStock: 1, recommendedStock: 2 },
  { id: 'inv-soda-coke', name: 'Coke', category: 'Beverages', unit: 'units', currentStock: 6, minimumRequiredStock: 6, recommendedStock: 12 },
  { id: 'inv-soda-diet', name: 'Diet Coke', category: 'Beverages', unit: 'units', currentStock: 6, minimumRequiredStock: 6, recommendedStock: 12 },
  { id: 'inv-rum', name: 'Rum', category: 'Beverages', unit: 'bottles', currentStock: 3, minimumRequiredStock: 3, recommendedStock: 5 },
  { id: 'inv-rum-punch', name: 'Rum Punch Mixed & Ready', category: 'Beverages', unit: 'batch status', currentStock: 1, minimumRequiredStock: 1, recommendedStock: 1 },
  { id: 'inv-pina', name: 'Pina Colada', category: 'Beverages', unit: 'bottles', currentStock: 2, minimumRequiredStock: 2, recommendedStock: 3 },
  { id: 'inv-yellow-juice', name: 'Yellow Juice', category: 'Beverages', unit: 'units', currentStock: 3, minimumRequiredStock: 3, recommendedStock: 6 },
  { id: 'inv-red-juice', name: 'Red Juice', category: 'Beverages', unit: 'units', currentStock: 3, minimumRequiredStock: 3, recommendedStock: 6 },
  { id: 'inv-goombay', name: 'White Goombay Punch', category: 'Beverages', unit: 'units', currentStock: 6, minimumRequiredStock: 6, recommendedStock: 12 },
  { id: 'inv-champagne', name: 'Gold Champagne', category: 'Beverages', unit: 'units', currentStock: 6, minimumRequiredStock: 6, recommendedStock: 12 },
  { id: 'inv-ice', name: 'Ice', category: 'Consumables', unit: 'bags', currentStock: 0, minimumRequiredStock: 2, recommendedStock: 4 },
  { id: 'inv-snacks', name: 'Chips / Snacks', category: 'Consumables', unit: 'box(es)', currentStock: 2, minimumRequiredStock: 2, recommendedStock: 4 },
  { id: 'inv-cups', name: 'Cups', category: 'Consumables', unit: 'sleeves', currentStock: 1, minimumRequiredStock: 1, recommendedStock: 3 },
  { id: 'inv-napkins', name: 'Napkins', category: 'Consumables', unit: 'packs', currentStock: 1, minimumRequiredStock: 1, recommendedStock: 3 },
  { id: 'inv-trash-bags', name: 'Trash Bags', category: 'Consumables', unit: 'rolls', currentStock: 1, minimumRequiredStock: 1, recommendedStock: 2 },
  { id: 'inv-bleach', name: 'Bleach', category: 'Cleaning Products', unit: 'bottles', currentStock: 1, minimumRequiredStock: 1, recommendedStock: 2 },
  { id: 'inv-joy', name: 'Joy Dish Soap', category: 'Cleaning Products', unit: 'bottles', currentStock: 1, minimumRequiredStock: 1, recommendedStock: 2 },
  { id: 'inv-cleaning', name: 'Cleaning Supplies', category: 'Cleaning Products', unit: 'kits', currentStock: 1, minimumRequiredStock: 1, recommendedStock: 2 },
  { id: 'inv-snorkel', name: 'Snorkel Gear', category: 'Safety Gear', unit: 'sets', currentStock: 12, minimumRequiredStock: 12, recommendedStock: 16 },
  { id: 'inv-life-jackets', name: 'Life Jackets', category: 'Safety Gear', unit: 'jackets', currentStock: 12, minimumRequiredStock: 12, recommendedStock: 16 },
  { id: 'inv-fuel', name: 'Fuel', category: 'Fuel', unit: 'level', currentStock: 75, minimumRequiredStock: 50, recommendedStock: 100 }
];


let store = loadStore();
let currentRoute = 'dashboard';
let editing = {};
let deferredInstallPrompt = null;
let voiceRecognition = null;
let assignmentViewMode = 'tree';
let voiceCommand = { state: 'IDLE', route: '', field: null, form: null, lastValue: '', message: 'Command Voice Fill idle.', suggestions: [] };
let dashboardFilters = { captain: '', mate: '', owner: '' };

const voiceSupportedRoutes = new Set(['dashboard', 'bookings', 'trips', 'invoices', 'captain-dashboard', 'mate-dashboard', 'owner-dashboard', 'vessels', 'crew', 'payroll', 'expenses', 'inventory', 'incident-reports', 'pre-trip-checklist', 'post-trip-checklist', 'cruise-schedule', 'reports', 'settings']);

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
  next.invoices = Array.isArray(next.invoices) ? next.invoices : [];
  next.cruiseSchedule = Array.isArray(next.cruiseSchedule) ? next.cruiseSchedule : [];
  next.inventory = normalizeInventory(Array.isArray(next.inventory) ? next.inventory : []);
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
    tourType: trip.tourType || trip.product || (trip.hours ? `${trip.hours} hour tour` : ''),
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
    reimbursementStatus: ['Outstanding (not yet reimbursed)', 'Paid / Reimbursed', 'Track only'],
    incidentSeverity: ['Low', 'Medium', 'High', 'Critical'],
    incidentCategories: ['Guest', 'Crew', 'Vessel', 'Weather', 'Injury', 'Equipment', 'Other'],
    incidentStatus: ['Open', 'Needs Review', 'Resolved'],
    trips: store.trips.map((t) => `${t.id}|${formatDate(t.tripDate)} ${t.startTime || ''} ${t.customer || 'Trip'}`),
    bookings: store.bookings.map((b) => `${b.id}|${formatDate(b.date)} ${b.time || ''} ${b.customer || 'Booking'}`),
    paymentStatus: ['Deposit Due', 'Deposit Paid', 'Balance Due', 'Paid in Full', 'Refunded', 'Cancelled'],
    paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'Zelle', 'ACH', 'Check', 'Online', 'CashApp', 'PayPal (Friends & Family)', 'Payment Link', 'Other'],
    documentTypes: ['Quote', 'Invoice'],
    pickupLocations: ['Woodes Rodgers Walk', 'Montague Dock', "Jimmy Buffett's Margaritaville", 'Other / Custom Location'],
    postedStatus: ['Not Posted', 'Posted', 'Needs Follow-up'],
    opportunityStatus: ['Opportunity', 'Booked', 'Watched', 'Closed'],
    checklistStatus: ['Draft', 'Submitted', 'Needs Review'],
    inventoryStatus: ['In Stock', 'Low Stock', 'Restock Needed', 'Empty'],
    inventoryCategories: ['Beverages', 'Cleaning Products', 'Safety Gear', 'Consumables', 'Vessel Supplies', 'Fuel']
  };
  return maps[kind] || [];
}

function init() {
  renderNav();
  wireEvents();
  generateChecklistReminders();
  renderRoute('dashboard');
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js').catch(console.warn);
}

function renderNav() {
  document.getElementById('primaryNav').innerHTML = navItems.map(([route, icon, label]) => `
    <button class="nav-link" data-route="${route}"><span class="nav-icon">${icon}</span><span>${label}</span></button>
  `).join('');
  renderMobileNav();
}

function renderMobileNav() {
  const bottom = document.getElementById('mobileBottomNav');
  const more = document.getElementById('mobileMoreMenu');
  if (!bottom || !more) return;
  const unread = unreadNotificationCount();
  bottom.innerHTML = mobilePrimaryNav.map(([route, icon, label]) => {
    const isMore = route === 'more';
    const active = isMore ? mobileMoreNav.some(([itemRoute]) => itemRoute === currentRoute) : currentRoute === route;
    const badge = label === 'More' && unread ? `<span class="mobile-nav-badge" aria-label="${unread} unread notifications">${unread}</span>` : '';
    return `<button class="mobile-nav-link ${active ? 'active' : ''}" data-${isMore ? 'mobile-more-toggle' : 'route'}="${route}"><span class="mobile-nav-icon">${icon}${badge}</span><span>${label}</span></button>`;
  }).join('');
  more.innerHTML = `<div class="mobile-more-sheet"><div class="mobile-more-handle" aria-hidden="true"></div><div class="card-header"><h3>More operations</h3><button class="btn btn-outline btn-small" type="button" data-close-mobile-more>Close</button></div><div class="mobile-more-grid">${mobileMoreNav.map(([route, icon, label]) => `<button class="mobile-more-item ${currentRoute === route ? 'active' : ''}" data-route="${route}"><span>${icon}</span><strong>${label}</strong>${route === 'notifications' && unread ? `<em>${unread}</em>` : ''}</button>`).join('')}</div></div>`;
}

function closeMobileMore() {
  const menu = document.getElementById('mobileMoreMenu');
  if (menu) menu.hidden = true;
}

function updateMobileChrome() {
  renderMobileNav();
  const offline = document.getElementById('offlineState');
  if (offline) offline.hidden = navigator.onLine !== false;
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
    if (routeBtn) { closeMobileMore(); renderRoute(routeBtn.dataset.route); }
    const mobileMoreToggle = event.target.closest('[data-mobile-more-toggle]');
    if (mobileMoreToggle) { const menu = document.getElementById('mobileMoreMenu'); if (menu) menu.hidden = !menu.hidden; renderMobileNav(); }
    if (event.target.closest('[data-close-mobile-more]')) closeMobileMore();
    const legacyEmbed = event.target.closest('[data-embed-legacy]');
    if (legacyEmbed) embedLegacy(legacyEmbed.dataset.embedLegacy);
    const voiceButton = event.target.closest('[data-voice-fill], [data-command-voice-start]');
    if (voiceButton) startVoiceFill(voiceButton);
    const voiceAction = event.target.closest('[data-voice-action]');
    if (voiceAction) handleVoiceAction(voiceAction.dataset.voiceAction);
    const dispatchViewButton = event.target.closest('[data-dispatch-view]');
    if (dispatchViewButton) { assignmentViewMode = dispatchViewButton.dataset.dispatchView; renderAssignmentBoard(); }
    if (event.target.closest('[data-export-store]')) exportStoreData();
    if (event.target.closest('[data-reset-store]')) { addAudit('reset', 'Settings', 'Reset local data to seed defaults.'); localStorage.removeItem(STORE_KEY); store = seedStore({ auditTrail: store.auditTrail, notifications: store.notifications }); renderRoute(currentRoute); toast('Seed data restored.'); }
    if (event.target.closest('[data-mark-notices-read]')) markNotificationsRead();
    const markNotice = event.target.closest('[data-mark-notice-read]');
    if (markNotice) markNotificationRead(markNotice.dataset.markNoticeRead);
    const treeAction = event.target.closest('[data-tree-action]');
    if (treeAction && treeAction.tagName !== 'SUMMARY') handleTreeNodeAction(treeAction);
  });
  document.body.addEventListener('change', (event) => {
    if (event.target.matches('[data-import-store]')) importStoreData(event.target.files[0]);
  });
  window.addEventListener('online', updateMobileChrome);
  window.addEventListener('offline', updateMobileChrome);
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
  generateChecklistReminders();
  currentRoute = route;
  closeSidebar();
  document.querySelectorAll('.page').forEach((page) => page.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.dataset.route === route));
  closeMobileMore();
  const page = document.getElementById(`page-${route}`);
  if (!page) return;
  page.classList.add('active');
  const nav = navItems.find(([key]) => key === route);
  document.getElementById('pageTitle').textContent = nav ? nav[2] : 'Legacy Tools';
  if (crudConfig[route]) renderCrud(route);
  else if (route === 'dashboard') renderDashboard();
  else if (route === 'payroll') renderPayroll();
  else if (route === 'inventory') renderInventory();
  else if (route === 'captain-dashboard') renderCrewRoleDashboard('captain');
  else if (route === 'mate-dashboard') renderCrewRoleDashboard('mate');
  else if (route === 'owner-dashboard') renderOwnerDashboard();
  else if (route === 'pre-trip-checklist') renderChecklistPage('Pre Trip');
  else if (route === 'post-trip-checklist') renderChecklistPage('Post Trip');
  else if (route === 'reports') renderReports();
  else if (route === 'notifications') renderNotifications();
  else if (route === 'audit') renderAuditTrail();
  else renderPlaceholder(route);
  renderVoiceCommandPanel(route);
  updateMobileChrome();
}

function renderDashboard() {
  const todayKey = new Date().toISOString().slice(0, 10);
  const scheduledTrips = store.trips.filter((t) => t.status === 'Scheduled').sort(byDate);
  const todayTrips = scheduledTrips.filter((trip) => trip.tripDate === todayKey);
  const readyTrips = scheduledTrips.filter((trip) => calculateDispatchReadiness(trip) === 'Dispatch Ready');
  const notReadyTrips = scheduledTrips.filter((trip) => calculateDispatchReadiness(trip) === 'Not Ready');
  const needsAttention = scheduledTrips.filter((trip) => !['Dispatch Ready', 'Completed'].includes(calculateDispatchReadiness(trip)));
  const totalBalance = store.bookings.reduce((sum, b) => sum + Number(b.balance || 0), 0) + store.trips.reduce((sum, t) => sum + Number(t.balanceDue || 0), 0) + store.invoices.reduce((sum, invoice) => sum + Number(invoice.balanceDue || 0), 0);
  const urgentItems = dashboardUrgentItems(scheduledTrips).slice(0, 8);
  const lowStockItems = inventoryAlerts();
  document.getElementById('page-dashboard').innerHTML = `
    <div class="page-stack dashboard-command-center" data-mobile-command-center>
      <div class="hero-command-card">
        <div><p class="eyebrow">Phase 4E mobile command center</p><h1>Today’s Operations</h1><p class="section-summary">Premium one-handed dashboard for Admin, Owner, Captain, Mate, and Bookkeeper workflows.</p></div>
        <div class="hero-badge">Reel Adventure Tours</div>
      </div>
      <div class="grid kpi-grid dashboard-kpis command-kpis">
        ${kpi('Today’s Trips', todayTrips.length, 'Departures for today')}
        ${kpi('Ready Trips', readyTrips.length, 'Dispatch ready')}
        ${kpi('Needs Attention', needsAttention.length, `${notReadyTrips.length} not ready`)}
        ${kpi('Outstanding Balances', money(totalBalance), 'Bookings + trips + invoices')}
        ${kpi('Unread Alerts', unreadNotificationCount(), 'Mobile notification inbox')}
        ${kpi('Low Stock Alerts', lowStockItems.length, 'Inventory restock needed')}
      </div>
      <div class="quick-action-dock" data-dashboard-quick-actions>
        <button class="btn btn-primary" data-route="trips">Create Trip</button>
        <button class="btn btn-outline" data-command-voice-start>🎙️ Voice Fill</button>
        <button class="btn btn-outline" data-route="expenses">Add Expense</button>
        <button class="btn btn-danger" data-route="incident-reports">Report Incident</button>
        <button class="btn btn-outline" data-route="trips">Open Dispatch</button>
      </div>
      <div class="grid dashboard-grid">
        <div class="card urgent-card"><div class="card-header"><h3>Stock level alerts</h3><span class="badge ${lowStockItems.length ? 'red' : 'green'}">${lowStockItems.length ? 'Restock Needed' : 'Stock OK'}</span></div><div class="stat-list">${lowStockItems.length ? lowStockItems.map((item) => `<button class="urgent-item" data-route="inventory"><span class="badge red">Low Stock Alert</span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.currentStock)} ${escapeHtml(item.unit)} on hand · minimum ${escapeHtml(item.minimumRequiredStock)}</small></button>`).join('') : '<p class="empty-state">No inventory stock alerts right now.</p>'}</div></div>
        <div class="card urgent-card"><div class="card-header"><h3>Urgent items first</h3><span class="badge red">Needs review</span></div><div class="stat-list">${urgentItems.length ? urgentItems.map((item) => `<button class="urgent-item" data-route="trips"><span class="badge ${item.color}">${escapeHtml(item.type)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></button>`).join('') : '<p class="empty-state">No urgent dispatch blockers right now.</p>'}</div></div>
        <div class="card"><div class="card-header"><h3>Native daily workflow</h3><span class="badge green">All native</span></div><div class="stat-list">
          ${['Bookings', 'Invoices', 'Dispatch Tree', 'Card View', 'Captain Dashboard', 'Mate Dashboard', 'Owner Dashboard', 'Pre Trip Checklist', 'Post Trip Checklist', 'Expenses', 'Incident Reports', 'Payroll', 'Reports', 'Notifications', 'Audit Trail', 'Settings'].map((item) => `<div class="stat-row"><span>${item}</span><strong>Available in main navigation</strong></div>`).join('')}
        </div></div>
      </div>
    </div>`;
}

function dashboardUrgentItems(trips) {
  const items = [];
  trips.forEach((trip) => {
    const readiness = calculateDispatchReadiness(trip);
    if (readiness === 'Not Ready') items.push({ type: 'Not Ready', color: 'red', title: trip.customer || 'Trip missing customer', detail: `${formatDate(trip.tripDate)} · ${formatTime(trip.startTime)} · ${trip.vessel || 'Missing vessel'}` });
    if (!trip.captain) items.push({ type: 'Missing captain', color: 'red', title: trip.customer || 'Unassigned trip', detail: 'Assign a captain before dispatch.' });
    if (!trip.mate || trip.mate === 'None') items.push({ type: 'Missing mate', color: 'red', title: trip.customer || 'Unassigned trip', detail: 'Assign a mate before dispatch.' });
    if (latestChecklistStatus(trip, 'Pre Trip') !== 'Completed') items.push({ type: 'Pre trip', color: 'gold', title: trip.customer || 'Checklist needed', detail: 'Pre trip not complete.' });
    if (Number(trip.balanceDue || 0) > 0) items.push({ type: 'Balance Due', color: 'gold', title: trip.customer || 'Customer balance', detail: `${money(trip.balanceDue)} outstanding.` });
  });
  (store.incidentReports || []).filter((incident) => incident.status !== 'Resolved').forEach((incident) => items.push({ type: 'Incident', color: 'red', title: incident.vessel || incident.category || 'Incident alert', detail: incident.description || 'Open incident requires review.' }));
  return items;
}

function kpi(label, value, sub) { return `<div class="card kpi"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${sub}</div></div>`; }

function statusColor(value = '') {
  const text = String(value || '').toLowerCase();
  if (/ready|accepted|paid|complete|resolved|success|operational/.test(text)) return 'green';
  if (/pending|review|balance|deposit due|submitted|draft|notified|partial/.test(text)) return 'gold';
  if (/missing|declined|conflict|not ready|incident|critical|out of service|open/.test(text)) return 'red';
  if (/completed|archived/.test(text)) return 'blue';
  if (/cancelled|canceled|inactive|none/.test(text)) return 'gray';
  return 'blue';
}

function statusBadge(value, fallback = 'Status') {
  const label = value || fallback;
  return `<span class="badge ${statusColor(label)}">${escapeHtml(label)}</span>`;
}

function assignmentStatusBadge(status) {
  return statusBadge(status || 'Assigned');
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
  if (status !== 'Completed' && trip.status === 'Completed') trip.status = 'Scheduled';
  if (trip.assignmentStatus.captain === 'Completed' && trip.assignmentStatus.mate === 'Completed' && trip.status === 'Scheduled') trip.status = 'Completed';
  const person = trip[role] || role;
  const label = `${role === 'captain' ? 'Captain' : 'Mate'} assignment ${status}`;
  addAudit('updated', 'Assignments', `${label} for ${person} on ${trip.customer || 'trip'}.`, { tripId, role, status });
  addRoleNotification(role === 'captain' ? 'Captain' : 'Mate', person, label, `${trip.customer || 'A trip'} is now ${status.toLowerCase()} for ${formatDate(trip.tripDate)}.`, status === 'Declined' ? 'critical' : 'info', 'Assignment', { tripId, role, status });
  if (status === 'Declined') addRoleNotification('Operations', '', 'Assignment declined', `${person} declined ${trip.customer || 'a trip'} on ${formatDate(trip.tripDate)}.`, 'critical', 'Assignment', { tripId, role });
  saveStore();
  renderRoute(currentRoute);
  toast(`${label}.`);
}

function tripSortValue(trip) {
  return String((trip.tripDate || '') + (trip.startTime || ''));
}

function isCompletedTrip(trip) {
  return trip.status === 'Completed' || ['Completed'].includes(normalizeAssignmentStatus(trip).captain) && ['Completed'].includes(normalizeAssignmentStatus(trip).mate);
}

function renderCrewRoleDashboard(role) {
  const route = `${role}-dashboard`;
  const page = document.getElementById(`page-${route}`);
  const roleLabel = role === 'captain' ? 'Captain' : 'Mate';
  const selected = dashboardFilters[role] || page.querySelector('[data-role-person]')?.value || getOptions('crew')[0] || '';
  dashboardFilters[role] = '';
  const assigned = store.trips.filter((trip) => trip[role] === selected && trip.status !== 'Cancelled').sort((a, b) => tripSortValue(a).localeCompare(tripSortValue(b)));
  const upcoming = assigned.filter((trip) => !isCompletedTrip(trip));
  const completed = assigned.filter(isCompletedTrip);
  page.innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Phase 4A crew portal</p><h1>${roleLabel} Dashboard</h1><p class="section-summary">Assigned trips appear immediately, upcoming work stays visible until completed, and completed trips move into the archive below.</p></div><select data-role-person onchange="renderCrewRoleDashboard('${role}')">${getOptions('crew').map((name) => `<option value="${escapeHtml(name)}" ${name === selected ? 'selected' : ''}>${escapeHtml(name)}</option>`).join('')}</select></div><div class="grid kpi-grid dashboard-kpis">${kpi('Assigned', assigned.length, `${roleLabel} trip cards`)}${kpi('Upcoming', upcoming.length, 'Not completed or cancelled')}${kpi('Accepted', assigned.filter((trip) => normalizeAssignmentStatus(trip)[role] === 'Accepted').length, 'Accepted status')}${kpi('Completed archive', completed.length, 'Archived completed trips')}</div><div class="role-trip-list">${upcoming.length ? upcoming.map((trip) => renderRoleTripCard(trip, role)).join('') : '<div class="card card-pad empty-state">No upcoming assignments for this crew member.</div>'}</div><div class="card"><div class="card-header"><h3>Completed Trip Archive</h3><span class="badge green">${completed.length} completed</span></div><div class="role-archive-list">${completed.length ? completed.map((trip) => renderRoleArchiveTrip(trip, role)).join('') : '<p class="empty-state">Completed trips will archive here.</p>'}</div></div></div>`;
}

function renderRoleArchiveTrip(trip, role) {
  const status = normalizeAssignmentStatus(trip)[role];
  return `<div class="stat-row"><span>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(formatTime(trip.startTime))}</span><strong>${escapeHtml(trip.customer || 'Trip')}<br><small>${escapeHtml(trip.vessel || 'No vessel')} · ${escapeHtml(role === 'captain' ? 'Captain' : 'Mate')} ${escapeHtml(status)}</small></strong></div>`;
}

function tripReminderBadges(trip, role = '') {
  const notices = (store.notifications || []).filter((notice) => notice.metadata?.tripId === trip.id && notice.metadata?.reminderType && (!role || notice.recipientRole.toLowerCase() === role));
  return notices.length ? `<div class="reminder-strip">${notices.slice(0, 3).map((notice) => `<span class="badge gold">${escapeHtml(notice.message)}</span>`).join('')}</div>` : '';
}

function renderRoleTripCard(trip, role) {
  const roleLabel = role === 'captain' ? 'Captain' : 'Mate';
  const notesKey = role === 'captain' ? 'captainNotes' : 'mateNotes';
  const status = normalizeAssignmentStatus(trip)[role];
  const readiness = calculateDispatchReadiness(trip);
  return `<div class="card role-trip-card ${readinessColorClass(readiness)}"><div class="card-header"><div class="role-card-title">${crewAvatar(trip[role], roleLabel)}<div><h3>${escapeHtml(formatTime(trip.startTime))} · ${escapeHtml(trip.customer || 'Trip')}</h3><p>${escapeHtml(formatDate(trip.tripDate))} · ${Number(trip.passengers || 0)} guests · ${escapeHtml(trip.vessel || 'No vessel')}</p></div></div><div>${assignmentStatusBadge(status)} ${readinessBadge(readiness)}</div></div>${tripReminderBadges(trip, role)}<div class="role-trip-details"><div><span>Pickup / Departure</span><strong>${escapeHtml(formatTime(trip.startTime))}</strong></div><div><span>${roleLabel} role</span><strong>${escapeHtml(trip[role] || 'Unassigned')}</strong></div><div><span>Pre Trip Status</span><strong>${escapeHtml(latestChecklistStatus(trip, 'Pre Trip'))}</strong></div><div><span>Post Trip Status</span><strong>${escapeHtml(latestChecklistStatus(trip, 'Post Trip'))}</strong></div></div>${readinessChecklistHtml(trip)}<div class="assignment-actions"><button class="btn btn-primary" onclick="acceptAssignment('${trip.id}','${role}')">Accept</button><button class="btn btn-danger" onclick="declineAssignment('${trip.id}','${role}')">Decline</button><button class="btn btn-outline" onclick="completeAssignment('${trip.id}','${role}')">Complete</button><button class="btn btn-outline" onclick="document.querySelector('[data-trip-notes=\'${trip.id}\'][data-note-role=\'${role}\']')?.focus()">Add Notes</button><button class="btn btn-outline" data-command-voice-start>🎙️ Voice Fill Notes</button></div><div class="field"><label>${roleLabel} notes</label><textarea data-trip-notes="${trip.id}" data-note-role="${role}">${escapeHtml(trip[notesKey] || '')}</textarea></div><div class="form-actions"><button class="btn btn-outline btn-small" onclick="saveCrewTripNotes('${trip.id}','${role}')">Submit Notes</button>${role === 'captain' ? `<label class="btn btn-outline btn-small">Upload Photos<input type="file" accept="image/*" multiple hidden onchange="saveCaptainPhotos('${trip.id}', this.files)"></label>` : ''}</div>${role === 'captain' ? renderPhotoList(trip.captainPhotos) : ''}</div>`;
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
  page.querySelector('.search-input').addEventListener('input', () => renderTable(route));
  renderForm(route);
  if (route === 'trips') renderAssignmentBoard();
  if (route === 'crew') renderCrewDashboard();
  if (route === 'vessels') renderVesselReadinessPanel();
  renderTable(route);
  if (route === 'invoices') renderInvoiceModule();
  if (route === 'cruise-schedule') renderCruiseScheduleModule();
}

function renderForm(route, record = {}) {
  const config = crudConfig[route];
  const form = document.querySelector(`#page-${route} .record-form`);
  form.innerHTML = `${route === 'trips' ? naturalSentenceModeHint() : ''}<div class="form-section-stack" data-mobile-form-sections>${renderFormSections(route, config, record)}</div>${route === 'trips' ? '<div class="conflict-panel" data-conflict-panel hidden></div>' : ''}<div class="form-actions sticky-save-controls" data-sticky-save-controls><button class="btn btn-primary" type="submit">Save ${config.title.slice(0, -1)}</button>${voiceFillButton(route)}<button class="btn btn-outline" type="button" data-cancel>Cancel</button></div>`;
  if (route === 'invoices') {
    form.addEventListener('input', () => updateInvoiceBalanceDue(form));
    form.addEventListener('change', () => updateInvoiceBalanceDue(form));
  }
  if (route === 'trips') {
    form.addEventListener('input', () => updateTripConflictPreview(form));
    form.addEventListener('change', (event) => {
      if (['tourPrice', 'depositPaid'].includes(event.target.name)) updateBalanceDue(form);
    });
  }
  form.onsubmit = (event) => saveRecord(event, route);
  form.querySelector('[data-cancel]').onclick = () => { editing[route] = null; form.hidden = true; };
}

function formSectionForField(key) {
  if (['customer', 'customerName', 'phone', 'email', 'bookingSource', 'source'].includes(key)) return 'Customer';
  if (['tripDate', 'date', 'startTime', 'time', 'arrivalDate', 'arrivalTime', 'departureTime', 'passengers', 'guests', 'guestCount', 'hours', 'tourType', 'product', 'vessel', 'shipName', 'cruiseLine', 'terminalDock', 'passengerCapacity'].includes(key)) return 'Trip';
  if (['tourPrice', 'price', 'depositPaid', 'balanceDue', 'balance', 'paymentStatus', 'paymentMethod', 'amount', 'defaultPayout', 'invoiceNumber'].includes(key)) return 'Financial';
  if (['captain', 'mate', 'owner', 'role', 'active', 'tripId', 'bookingId', 'reportedBy', 'severity', 'category', 'status'].includes(key)) return 'Assignment';
  return 'Notes';
}

function renderFormSections(route, config, record) {
  const sections = config.fields.reduce((acc, field) => {
    const section = formSectionForField(field[0]);
    acc[section] ||= [];
    acc[section].push(field);
    return acc;
  }, {});
  return Object.entries(sections).map(([section, fields], index) => `<section class="form-section-card"><div class="form-section-title"><span>${index + 1}</span><h3>${escapeHtml(section)}</h3></div><div class="form-grid">${fields.map(([key, label, type]) => renderField(key, label, type, record[key])).join('')}</div>${index < Object.keys(sections).length - 1 ? '<button class="btn btn-outline btn-small next-section-btn" type="button" onclick="this.closest(\'.form-section-card\').nextElementSibling?.scrollIntoView({behavior:\'smooth\',block:\'start\'})">Next Section</button>' : ''}</section>`).join('');
}

function naturalSentenceModeHint() {
  return '<div class="natural-sentence-mode"><strong>Natural Sentence Mode</strong><span>Use Command Voice Fill with a sentence like: “Book John Smith, phone 242 555 0198, tomorrow at 9 AM, four guests, Da Salty, captain Eugene, mate DJ, deposit 200.”</span></div>';
}

function voiceFillButton(route) {
  return voiceSupportedRoutes.has(route) ? '<button class="btn btn-outline" type="button" data-voice-fill>🎙️ Command Voice Fill</button>' : '';
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
  if (data.phone) data.phone = normalizePhoneNumber(data.phone);
  if (route === 'invoices') {
    data.tourPrice = Number(data.tourPrice || data.baseTourPrice || 0) + Number(data.swimmingPigsPeople || 0) * 20 + (data.secondBoat === 'Yes' ? 900 : 0);
    data.guestCount = Number(data.guestCount || 0) || Number(data.adultCount || 0) + Number(data.kidCount || 0) + Number(data.boat2Adults || 0) + Number(data.boat2Kids || 0);
    data.balanceDue = Math.max(Number(data.tourPrice || 0) - Number(data.depositPaid || 0), Number(data.balanceDue || 0));
    data.paymentStatus = data.paymentStatus || (data.balanceDue <= 0 ? 'Paid in Full' : Number(data.depositPaid || 0) > 0 ? 'Deposit Paid' : 'Deposit Due');
    data.invoiceNumber = data.invoiceNumber || `INV-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${String(store.invoices.length + 1).padStart(3, '0')}`;
  }
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
    data.assignmentStatus = normalizeAssignmentStatus(data);
    if (previous?.captain === data.captain && previous.assignmentStatus?.captain) data.assignmentStatus.captain = previous.assignmentStatus.captain;
    if (previous?.mate === data.mate && previous.assignmentStatus?.mate) data.assignmentStatus.mate = previous.assignmentStatus.mate;
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
  if (route === 'invoices') {
    addNotification('Invoice saved', `${data.invoiceNumber || 'Invoice'} for ${data.customerName || 'customer'} is ${data.paymentStatus}.`, 'success', { route, category: 'Invoice', invoiceId: savedId });
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
  if (route === 'invoices') renderInvoiceModule();
  if (route === 'cruise-schedule') renderCruiseScheduleModule();
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
  if (key === 'status' || key === 'readinessStatus' || key === 'paymentStatus') return statusBadge(value || '—');
  if (key === 'active') return statusBadge(value === 'Yes' ? 'Ready' : 'Inactive');
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

function readinessChecklist(trip) {
  const assignment = normalizeAssignmentStatus(trip);
  const conflicts = trip.id ? findTripConflicts(trip, trip.id) : [];
  const vessel = vesselForTrip(trip);
  const vesselStatus = vessel?.readinessStatus || vessel?.status || '';
  const vesselReady = Boolean(trip.vessel) && (!vessel || ['', 'Operational'].includes(vesselStatus));
  const preTripComplete = latestChecklistStatus(trip, 'Pre Trip') === 'Completed';
  const captainAssigned = Boolean(trip.captain) && assignment.captain !== 'Declined';
  const mateAssigned = Boolean(trip.mate) && trip.mate !== 'None' && assignment.mate !== 'Declined';
  return {
    vesselAssigned: Boolean(trip.vessel),
    captainAssigned,
    mateAssigned,
    vesselReady,
    preTripComplete,
    hasConflicts: conflicts.length > 0,
    captainAccepted: ['Accepted', 'Completed'].includes(assignment.captain),
    mateAccepted: ['Accepted', 'Completed'].includes(assignment.mate),
    vesselStatus: vesselStatus || (trip.vessel ? 'Operational' : 'Unassigned')
  };
}

function calculateDispatchReadiness(trip) {
  const checks = readinessChecklist(trip);
  if (trip.status === 'Completed' && latestChecklistStatus(trip, 'Post Trip') === 'Completed') return 'Completed';
  if (!checks.vesselAssigned || !checks.captainAssigned || !checks.mateAssigned || checks.hasConflicts) return 'Not Ready';
  if (checks.vesselReady && checks.preTripComplete && checks.captainAccepted && checks.mateAccepted) return 'Dispatch Ready';
  return 'Partial';
}

function readinessBadge(status) {
  const normalized = status === 'Ready' ? 'Dispatch Ready' : status === 'Needs Review' ? 'Partial' : status;
  return statusBadge(normalized || 'Partial');
}

function readinessColorClass(status) {
  const normalized = status === 'Ready' ? 'Dispatch Ready' : status === 'Needs Review' ? 'Partial' : status;
  return normalized === 'Dispatch Ready' || normalized === 'Completed' ? 'ready-green' : normalized === 'Not Ready' ? 'ready-red' : 'ready-yellow';
}

function crewAvatar(name, role = '') {
  const initials = String(name || role || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || '?';
  return `<span class="crew-avatar" aria-hidden="true">${escapeHtml(initials)}</span>`;
}

function renderCrewPill(name, role, status) {
  return `<div class="crew-pill">${crewAvatar(name, role)}<div><span class="crew-role-label">${escapeHtml(role)}</span><strong>${escapeHtml(name || 'Unassigned')}</strong>${assignmentStatusBadge(status)}</div></div>`;
}

function readinessChecklistHtml(trip) {
  const checks = readinessChecklist(trip);
  const item = (ok, label, detail = '') => `<span class="readiness-chip ${ok ? 'ok' : 'pending'}">${ok ? '✓' : '•'} ${escapeHtml(label)}${detail ? ` <small>${escapeHtml(detail)}</small>` : ''}</span>`;
  return `<div class="readiness-chips">
    ${item(checks.vesselAssigned, 'Vessel Assigned', trip.vessel || '')}
    ${item(checks.captainAssigned, 'Captain Assigned', trip.captain || '')}
    ${item(checks.mateAssigned, 'Mate Assigned', trip.mate && trip.mate !== 'None' ? trip.mate : '')}
    ${item(checks.vesselReady, 'Vessel Ready', checks.vesselStatus)}
    ${item(checks.preTripComplete, 'Pre Trip Complete', latestChecklistStatus(trip, 'Pre Trip'))}
  </div>`;
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
  const trips = sortedDispatchTrips();
  const daily = dailyOperationsSummary(trips);
  const viewToggle = `<div class="dispatch-view-toggle" role="group" aria-label="Dispatch view mode"><button class="btn btn-small ${assignmentViewMode === 'tree' ? 'btn-primary' : 'btn-outline'}" type="button" data-dispatch-view="tree">Dispatch Tree View</button><button class="btn btn-small ${assignmentViewMode === 'cards' ? 'btn-primary' : 'btn-outline'}" type="button" data-dispatch-view="cards">Card View</button></div>`;
  const summary = `<div class="daily-summary-bar"><div><span>Total Trips</span><strong>${daily.total}</strong></div><div><span>Ready Trips</span><strong class="summary-green">${daily.ready}</strong></div><div><span>Pending Trips</span><strong class="summary-yellow">${daily.pending}</strong></div><div><span>Not Ready Trips</span><strong class="summary-red">${daily.notReady}</strong></div><div><span>Outstanding Balances</span><strong>${money(daily.balance)}</strong></div><div><span>Crew Conflicts</span><strong class="summary-red">${daily.conflicts}</strong></div></div>`;
  const content = assignmentViewMode === 'cards'
    ? `<div class="assignment-list assignment-card-list">${trips.length ? trips.map(renderAssignmentTrip).join('') : renderEmptyDispatchState()}</div>`
    : renderDispatchTree(trips);
  board.innerHTML = `<div class="card-header assignment-board-header"><div><h3>Operational Trip Assignment Board</h3><p class="muted-text">Dispatch Tree View is the default, grouped Date → Time → Trip → Status for fast assignment decisions.</p></div><div class="assignment-board-tools">${viewToggle}<div class="assignment-board-legend"><span class="legend-dot red"></span>Not Ready <span class="legend-dot yellow"></span>Partial <span class="legend-dot green"></span>Dispatch Ready</div></div></div>${summary}${content}`;
}

function sortedDispatchTrips() {
  return [...store.trips]
    .filter((trip) => trip.status !== 'Cancelled')
    .sort((a, b) => String((a.tripDate || '') + (a.startTime || '') + (a.customer || '')).localeCompare(String((b.tripDate || '') + (b.startTime || '') + (b.customer || ''))));
}

function renderEmptyDispatchState() {
  return '<div class="empty-state">No trips assigned yet. Create a trip with a vessel, captain, mate, date, and start time to populate the dispatch tree.</div>';
}

function groupByValue(items, getKey) {
  return items.reduce((groups, item) => {
    const key = getKey(item) || 'Unscheduled';
    groups[key] ||= [];
    groups[key].push(item);
    return groups;
  }, {});
}

function dailyOperationsSummary(trips) {
  return trips.reduce((acc, trip) => {
    const readiness = calculateDispatchReadiness(trip);
    acc.total += 1;
    if (readiness === 'Dispatch Ready' || readiness === 'Completed') acc.ready += 1;
    else if (readiness === 'Not Ready') acc.notReady += 1;
    else acc.pending += 1;
    acc.balance += Number(trip.balanceDue || 0);
    acc.conflicts += findTripConflicts(trip, trip.id).length;
    return acc;
  }, { total: 0, ready: 0, pending: 0, notReady: 0, balance: 0, conflicts: 0 });
}

function renderDispatchTree(trips) {
  if (!trips.length) return `<div class="dispatch-tree true-dispatch-tree">${renderEmptyDispatchState()}</div>`;
  const byDate = groupByValue(trips, (trip) => trip.tripDate || 'No date');
  return `<div class="dispatch-tree true-dispatch-tree">${Object.entries(byDate).map(([date, dateTrips]) => renderDispatchDateNode(date, dateTrips)).join('')}</div>`;
}

function renderDispatchDateNode(date, trips) {
  const byTime = groupByValue(trips, (trip) => trip.startTime || 'No time');
  const ready = trips.filter((trip) => ['Dispatch Ready', 'Completed'].includes(calculateDispatchReadiness(trip))).length;
  return `<details class="dispatch-date-node tree-branch" open><summary class="dispatch-node-heading dispatch-date-heading"><div><span class="tree-level">Date</span><strong>${escapeHtml(date === 'No date' ? 'No date' : formatDate(date))}</strong></div><div class="node-actions"><span class="badge blue">${trips.length} trip${trips.length === 1 ? '' : 's'} · ${ready} ready</span><button class="btn btn-outline btn-small" type="button" data-tree-action="date" data-tree-value="${escapeHtml(date)}">Filter day</button></div></summary><div class="tree-children">${Object.entries(byTime).map(([time, timeTrips]) => renderDispatchTimeNode(time, timeTrips, date)).join('')}</div></details>`;
}

function renderDispatchTimeNode(time, trips, date) {
  return `<details class="dispatch-time-node tree-branch" open><summary class="dispatch-node-heading dispatch-time-heading"><div><span class="tree-level">Time</span><strong>${escapeHtml(time === 'No time' ? 'No time' : formatTime(time))}</strong></div><div class="node-actions"><span class="badge gold">${trips.length} trip${trips.length === 1 ? '' : 's'}</span><button class="btn btn-outline btn-small" type="button" data-tree-action="time" data-tree-value="${escapeHtml(time)}">Filter timeslot</button></div></summary><div class="tree-children">${trips.map(renderDispatchTripNode).join('')}</div></details>`;
}

function renderDispatchTripNode(trip) {
  const readiness = calculateDispatchReadiness(trip);
  const assignment = normalizeAssignmentStatus(trip);
  const vessel = vesselForTrip(trip);
  const owner = ownerForVesselName(trip.vessel) || 'Unassigned owner';
  const preStatus = latestChecklistStatus(trip, 'Pre Trip');
  const postStatus = latestChecklistStatus(trip, 'Post Trip');
  return `<details class="dispatch-trip-node tree-branch ${readinessColorClass(readiness)}" open><summary class="dispatch-trip-main"><div><span class="tree-level">Trip</span><strong>${escapeHtml(trip.customer || 'Unassigned customer')}</strong><p>${escapeHtml(trip.tourType || `${Number(trip.hours || 4)} hour tour`)} · ${Number(trip.passengers || 0)} guests · ${money(trip.tourPrice)} price · ${money(trip.depositPaid)} deposit · ${money(trip.balanceDue)} balance</p></div><div class="node-actions"><div class="dispatch-status">${readinessBadge(readiness)}</div><button class="btn btn-primary btn-small" type="button" data-tree-action="trip" data-tree-value="${escapeHtml(trip.id)}">Open editor</button></div></summary><div class="tree-children dispatch-leaf-list">
    ${renderDispatchLeaf('Owner', owner, ownerStatusLabel(owner), 'owner', owner, 'gold')}
    ${renderDispatchLeaf('Vessel', trip.vessel || 'Unassigned vessel', vessel?.readinessStatus || vessel?.status || 'Not Ready', 'vessel', trip.vessel, readinessChecklist(trip).vesselReady ? 'green' : 'red')}
    ${renderDispatchLeaf('Captain', `${crewAvatar(trip.captain, 'Captain')}<span>${escapeHtml(trip.captain || 'Unassigned')}</span>`, assignment.captain, 'captain', trip.captain, assignmentColor(assignment.captain), true)}
    ${renderDispatchLeaf('Mate', `${crewAvatar(trip.mate, 'Mate')}<span>${escapeHtml(trip.mate && trip.mate !== 'None' ? trip.mate : 'Unassigned')}</span>`, assignment.mate, 'mate', trip.mate, assignmentColor(assignment.mate), true)}
    ${renderDispatchLeaf('Readiness', readiness, 'Open details', 'status', trip.id, readiness === 'Dispatch Ready' ? 'green' : readiness === 'Not Ready' ? 'red' : 'gold')}
    ${tripReminderBadges(trip)}
    ${renderDispatchLeaf('Pre Trip Status', preStatus, 'Checklist', 'pre', trip.id, checklistColor(preStatus))}
    ${renderDispatchLeaf('Post Trip Status', postStatus, 'Checklist', 'post', trip.id, checklistColor(postStatus))}
    ${renderDispatchLeaf('Countdown', departureCountdown(trip), 'Departure timer', 'trip', trip.id, 'blue')}
  </div></details>`;
}

function renderDispatchLeaf(label, value, status, action, actionValue, color = 'blue', htmlValue = false) {
  return `<button class="dispatch-leaf" type="button" data-tree-action="${escapeHtml(action)}" data-tree-value="${escapeHtml(actionValue || '')}"><span class="branch-stem" aria-hidden="true">├──</span><span class="leaf-label">${escapeHtml(label)}</span><strong>${htmlValue ? value : escapeHtml(value || '—')}</strong><span class="badge ${color}">${escapeHtml(status || 'Open')}</span></button>`;
}

function ownerStatusLabel(owner) { return owner && owner !== 'Unassigned owner' ? 'Owner assigned' : 'Missing'; }
function assignmentColor(status) { return ['Accepted', 'Completed'].includes(status) ? 'green' : status === 'Declined' || status === 'Unassigned' ? 'red' : 'gold'; }
function checklistColor(status) { return status === 'Completed' ? 'blue' : status === 'Cancelled' ? 'gray' : status === 'Not Started' ? 'gold' : 'green'; }
function departureCountdown(trip) {
  const tripDate = parseTripDate(trip);
  if (!tripDate) return 'No departure date';
  const days = Math.ceil((tripDate - startOfDay(new Date())) / 86400000);
  if (days < 0) return `Departed ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} ago`;
  if (days === 0) return 'Departs today';
  if (days === 1) return 'Departs tomorrow';
  return `Departs in ${days} days`;
}

function renderDispatchStatusNode(status, trips) {
  const color = status === 'Dispatch Ready' || status === 'Completed' ? 'green' : status === 'Not Ready' ? 'red' : 'gold';
  return `<div class="dispatch-status-node"><span class="tree-level">Status</span><span class="badge ${color}">${escapeHtml(status)} · ${trips.length}</span></div>`;
}

function renderAssignmentTrip(trip) {
  const assignment = normalizeAssignmentStatus(trip);
  const readiness = calculateDispatchReadiness(trip);
  const preStatus = latestChecklistStatus(trip, 'Pre Trip');
  const postStatus = latestChecklistStatus(trip, 'Post Trip');
  const vessel = vesselForTrip(trip);
  const vesselReady = readinessChecklist(trip).vesselReady;
  return `<article class="assignment-card ${readinessColorClass(readiness)}"><div class="assignment-card-top"><div><p class="eyebrow">${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(formatTime(trip.startTime))}</p><h3>${escapeHtml(trip.customer || 'Unassigned customer')}</h3><p>${escapeHtml(trip.tourType || `${Number(trip.hours || 4)} hour tour`)} · ${Number(trip.passengers || 0)} guests</p></div><div class="dispatch-status">${readinessBadge(readiness)}</div></div>
    <div class="assignment-card-metrics">
      <div><span>Vessel</span><strong>${escapeHtml(trip.vessel || 'Unassigned')}</strong></div>
      <div><span>Price</span><strong>${money(trip.tourPrice)}</strong></div>
      <div><span>Deposit</span><strong>${money(trip.depositPaid)}</strong></div>
      <div><span>Balance</span><strong>${money(trip.balanceDue)}</strong></div>
    </div>
    <div class="crew-visual-row">${renderCrewPill(trip.captain, 'Captain', assignment.captain)}${renderCrewPill(trip.mate && trip.mate !== 'None' ? trip.mate : '', 'Mate', assignment.mate)}</div>
    ${readinessChecklistHtml(trip)}
    <div class="vessel-verification-row"><span class="badge ${vesselReady ? 'green' : 'gold'}">Fuel Verified: ${vesselReady ? 'Ready' : 'Needs check'}</span><span class="badge ${vesselReady ? 'green' : 'gold'}">Safety Equipment Verified: ${vesselReady ? 'Ready' : 'Needs check'}</span><span class="badge ${vesselReady ? 'green' : 'gold'}">Vessel Ready: ${escapeHtml(vessel?.readinessStatus || vessel?.status || (trip.vessel ? 'Operational' : 'Unassigned'))}</span></div>
    <div class="assignment-card-footer"><div><strong>Acceptance:</strong> Captain ${assignmentStatusBadge(assignment.captain)} Mate ${assignmentStatusBadge(assignment.mate)} <span class="muted-text">Trip ${escapeHtml(trip.status || 'Scheduled')} · Pre ${escapeHtml(preStatus)} · Post ${escapeHtml(postStatus)}</span></div><div class="assignment-actions"><button class="btn btn-outline btn-small" onclick="notifyAssignment('${trip.id}','captain')">Notify Captain</button><button class="btn btn-outline btn-small" onclick="notifyAssignment('${trip.id}','mate')">Notify Mate</button><button class="btn btn-primary btn-small" onclick="completeAssignment('${trip.id}','captain');completeAssignment('${trip.id}','mate')">Mark Crew Completed</button></div></div>
  </article>`;
}

function updateBalanceDue(form) {
  const base = Number(form.elements.baseTourPrice?.value || form.elements.tourPrice?.value || 0);
  const pigs = Number(form.elements.swimmingPigsPeople?.value || 0) * 20;
  const secondBoat = form.elements.secondBoat?.value === 'Yes' ? 900 : 0;
  const tourPrice = base + pigs + secondBoat;
  if (form.elements.tourPrice) form.elements.tourPrice.value = tourPrice.toFixed(2).replace(/\.00$/, '');
  const depositPercent = Number(form.elements.depositPercent?.value || 0);
  if (form.elements.depositPaid && depositPercent && !Number(form.elements.depositPaid.value || 0)) form.elements.depositPaid.value = (tourPrice * depositPercent / 100).toFixed(2).replace(/\.00$/, '');
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


const legacyFeatureAudit = {
  'RAT-PreTrip-VesselCheck.html': {
    sections: ['Save as PDF modal', 'Preview modal', 'Action bar', 'Vessel/date/initials/time details', 'Boat status confirmations', 'Stock groups', 'Engine oil and fuel', 'Bilge pump checks', 'Photo attachments', 'General notes', 'Preview/PDF/WhatsApp workflow'],
    fields: ['Vessel select', 'Date', 'Captain initials', 'Time', 'Boat cleaned', 'Boat stocked', 'Trash removed', 'Ready for charter', 'Rum', 'Pina Colada', 'Rum Punch mixed ready', 'Yellow Juice', 'Red Juice', 'Coke', 'Diet Coke', 'White Goombay Punch', 'Gold Champagne', 'Water', 'Chips/Snacks', 'Bleach whole/open level', 'Joy Dish Soap whole/open level', 'Engine 1 oil', 'Engine 2 oil', 'Fuel level E/1/4/1/2/3/4/F', 'Bilge Pump 1 tested', 'Bilge Pump 2 tested', 'Photos/files', 'Management notes'],
    calculations: ['Quantity status compares current stock to minimum/restock thresholds', 'Cleaning product restock when open bottle is half/empty and no whole bottle remains', 'Preview summarizes stock, engines, restock alerts, notes, and photos'],
    alerts: ['Restock alert list', 'Empty stock badges', 'Need to add oil', 'Too full oil'],
    exports: ['Preview', 'Print dialog Save as PDF', 'WhatsApp handoff']
  },
  'RAT-PostTrip-VesselCheck.html': {
    sections: ['Save as PDF modal', 'Preview modal', 'Action bar', 'Vessel/date/initials/time details', 'Boat status confirmations', 'Remaining stock groups', 'Fuel level', 'Bilge/flush checks', 'Photo attachments', 'Guest feedback/general notes', 'Preview/PDF/WhatsApp workflow'],
    fields: ['Vessel select', 'Date', 'Captain initials', 'Return time', 'Boat cleaned', 'Trash removed', 'Ready for next charter', 'Remaining Rum', 'Remaining Pina Colada', 'Remaining Yellow Juice', 'Remaining Red Juice', 'Remaining Coke', 'Remaining Diet Coke', 'Remaining White Goombay Punch', 'Remaining Gold Champagne', 'Remaining Water', 'Remaining Chips/Snacks', 'Remaining Bleach', 'Remaining Joy Dish Soap', 'Fuel level', 'Bilge Pump 1 left working', 'Engine 1 flushed today', 'Engine 1 flush overdue', 'Engine 1 last flush date/initials/issues', 'Bilge Pump 2 left working', 'Engine 2 flushed today', 'Engine 2 flush overdue', 'Engine 2 last flush date/initials/issues', 'Photos/files', 'Guest feedback/incidents/equipment notes'],
    calculations: ['Remaining stock status compares quantities to next-charter minimum/restock thresholds', 'Cleaning product restock when open bottle is half/empty and no whole bottle remains', 'Preview summarizes remaining stock, bilge/flush status, alerts, notes, and photos'],
    alerts: ['Restock alert list', 'Flush overdue checkboxes', 'Empty stock badges'],
    exports: ['Preview', 'Print dialog Save as PDF', 'WhatsApp handoff']
  },
  'customer-invoice.html': {
    sections: ['Customer details', 'Tour details', 'Pickup location', 'Tour price', 'Document type/payment', 'Customer email confirmation'],
    fields: ['Full name', 'Phone', 'Email', 'Tour date', 'Adults/kids boat 1', 'Start/end time and calculated duration', 'Pickup option/custom pickup/directions/landing fee note', 'Base tour price', 'Swimming Pigs add-on per person', 'Second boat add-on', 'Quote vs invoice', 'Deposit required percentage/custom/pay in full', 'Preferred payment method'],
    calculations: ['Guest totals and 12-person boat max warning', 'Duration from start/end time', 'Pigs add-on', 'Second boat price', 'Deposit amount', 'Balance due'],
    alerts: ['Boat capacity warning', 'Landing fee note', 'Payment next-step guidance'],
    exports: ['Email-app booking request/receipt summary']
  },
  'reel_adventure_tours_dashboard.html': {
    sections: ['KPI summary', 'June/July/August cruise schedules', 'Direct bookings table'],
    fields: ['Ship', 'Cruise line', 'Departure/return length', 'Nassau arrival', 'Facebook search term', 'Posted marker', 'Order', 'Placed', 'Customer/email/phone', 'Product', 'Tour date/time', 'Guests/pigs', 'Full price/deposit/balance due/payment', 'Invoice', 'Notes'],
    calculations: ['Cruise opportunities by month', 'Direct bookings count', 'Total balance due', 'Upcoming tours'],
    alerts: ['Live status marker', 'Search/filter workflow'],
    exports: ['Dashboard print/export-ready tables']
  },
  'ReelAdventureTours_App_v5.html': {
    sections: ['Weekly dashboard', 'All charter trips', 'Ice expenses', 'Weekly summary', 'Person statements', 'Profit report', 'Reimbursements', 'Exports/backup', 'Settings'],
    fields: ['Trip date', 'Tour price', 'Boat owner', 'Passengers', 'Hours', 'Captain/mate', 'Captain/mate paid by Eugene', 'Captain/mate pay overrides', 'Owner payout override', 'Eugene profit override', 'Trip notes/photo', 'Ice date/amount/trip/paid/notes', 'Reimbursement date/person/item/amount/trip/week/add-to-payout/status/receipt/notes/photo', 'Business name/owner name'],
    calculations: ['Owner rate by boat owner and passenger count', 'Captain $30/hr and mate $12.50/hr defaults', 'Ryan mate share 50%', 'Owner net payment', 'Eugene gross margin/net profit', 'Week start/end and payout Monday', 'Weekly/month/all-time totals'],
    alerts: ['Required field alerts', 'SheetJS missing alert', 'Import/clear/settings alerts'],
    exports: ['Excel workbook', 'CSV trip/payout/profit/ice/reimbursements', 'Weekly PDF', 'Person receipt PDF', 'Profit PDF', 'JSON backup/import']
  }
};

function normalizeInventory(items = []) {
  const byName = new Map(items.map((item) => [String(item.name || '').toLowerCase(), item]));
  return defaultInventoryItems.map((item) => normalizeInventoryItem({ ...item, ...(byName.get(item.name.toLowerCase()) || {}) }));
}

function normalizeInventoryItem(item = {}) {
  const currentStock = Number(item.currentStock ?? 0);
  const minimumRequiredStock = Number(item.minimumRequiredStock ?? 0);
  return {
    ...item,
    id: item.id || makeId('inventory'),
    currentStock,
    minimumRequiredStock,
    recommendedStock: Number(item.recommendedStock ?? minimumRequiredStock),
    status: inventoryStatus({ ...item, currentStock, minimumRequiredStock }),
    lastUpdated: item.lastUpdated || new Date().toISOString(),
    updatedBy: item.updatedBy || 'Seed data',
    linkedVessel: item.linkedVessel || '',
    linkedTrip: item.linkedTrip || '',
    restockNeeded: currentStock <= minimumRequiredStock ? 'Yes' : 'No'
  };
}

function inventoryStatus(item) {
  if (Number(item.currentStock || 0) <= 0) return 'Empty';
  if (Number(item.currentStock || 0) <= Number(item.minimumRequiredStock || 0)) return 'Restock Needed';
  if (Number(item.currentStock || 0) < Number(item.recommendedStock || item.minimumRequiredStock || 0)) return 'Low Stock';
  return 'In Stock';
}

function inventoryAlerts() {
  return (store.inventory || []).map(normalizeInventoryItem).filter((item) => ['Empty', 'Restock Needed', 'Low Stock'].includes(item.status));
}

function renderInventory() {
  store.inventory = normalizeInventory(store.inventory || []);
  const alerts = inventoryAlerts();
  const rows = store.inventory.map((item) => `<tr><td><strong>${escapeHtml(item.name)}</strong><br><small>${escapeHtml(item.category)} · ${escapeHtml(item.unit)}</small></td><td>${escapeHtml(item.currentStock)}</td><td>${escapeHtml(item.minimumRequiredStock)}</td><td>${escapeHtml(item.recommendedStock)}</td><td>${statusBadge(item.status)}</td><td>${escapeHtml(item.restockNeeded)}</td><td>${escapeHtml(item.linkedVessel || 'All vessels')}</td><td>${escapeHtml(item.linkedTrip || '—')}</td><td>${escapeHtml(item.updatedBy || '—')}<br><small>${escapeHtml(new Date(item.lastUpdated).toLocaleString())}</small></td></tr>`).join('');
  document.getElementById('page-inventory').innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Native stock levels and alerts</p><h1>Inventory</h1><p class="section-summary">Track current stock, minimum required stock, recommended stock, stock status, low stock alerts, restock needed, last updated, updated by, linked vessel, and linked trip.</p></div></div><form class="record-form card" onsubmit="saveInventoryItem(event)"><div class="form-section-stack" data-mobile-form-sections><section class="form-section-card"><div class="form-section-title"><span>1</span><h3>Stock Update</h3></div><div class="form-grid"><div class="field"><label>Inventory Item</label><select name="id">${store.inventory.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`).join('')}</select></div><div class="field"><label>Current Stock</label><input name="currentStock" type="number" step="0.01"></div><div class="field"><label>Minimum Required Stock</label><input name="minimumRequiredStock" type="number" step="0.01"></div><div class="field"><label>Recommended Stock</label><input name="recommendedStock" type="number" step="0.01"></div><div class="field"><label>Linked Vessel</label><select name="linkedVessel"><option value="">All vessels</option>${getOptions('vessels').map((vessel) => `<option value="${escapeHtml(vessel)}">${escapeHtml(vessel)}</option>`).join('')}</select></div><div class="field"><label>Linked Trip</label><select name="linkedTrip"><option value="">— None —</option>${getOptions('trips').map((opt) => `<option value="${escapeHtml(opt.split('|')[0])}">${escapeHtml(opt.split('|').slice(1).join('|'))}</option>`).join('')}</select></div><div class="field"><label>Updated By</label><input name="updatedBy" type="text" value="${escapeHtml(currentUserLabel())}"></div><div class="field"><label>Notes</label><textarea name="notes"></textarea></div></div></section></div><div class="form-actions sticky-save-controls"><button class="btn btn-primary" type="submit">Save Stock Update</button>${voiceFillButton('inventory')}<button class="btn btn-outline" type="button" onclick="window.print()">Print / Export</button></div></form><div class="card urgent-card"><div class="card-header"><h3>Low Stock Alerts</h3><span class="badge ${alerts.length ? 'red' : 'green'}">${alerts.length ? 'Restock Needed' : 'Stock OK'}</span></div><div class="stat-list">${alerts.length ? alerts.map((item) => `<div class="stat-row"><span>${escapeHtml(item.name)}</span><strong>${statusBadge(item.status)} ${escapeHtml(item.currentStock)} / min ${escapeHtml(item.minimumRequiredStock)}</strong></div>`).join('') : '<p class="empty-state">No low stock warnings.</p>'}</div></div><div class="card table-card"><div class="card-header"><h3>Inventory records</h3><button class="btn btn-outline btn-small" type="button" onclick="window.print()">Print / Export Inventory</button></div><div class="responsive-table-wrap"><table><thead><tr><th>Item</th><th>Current Stock</th><th>Minimum Required Stock</th><th>Recommended Stock</th><th>Stock Status</th><th>Restock Needed</th><th>Linked Vessel</th><th>Linked Trip</th><th>Last Updated / By</th></tr></thead><tbody>${rows}</tbody></table></div></div></div>`;
}

function saveInventoryItem(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const item = store.inventory.find((entry) => entry.id === data.id);
  if (!item) return;
  Object.assign(item, normalizeInventoryItem({ ...item, ...data, currentStock: Number(data.currentStock || item.currentStock || 0), minimumRequiredStock: Number(data.minimumRequiredStock || item.minimumRequiredStock || 0), recommendedStock: Number(data.recommendedStock || item.recommendedStock || 0), lastUpdated: new Date().toISOString(), updatedBy: data.updatedBy || currentUserLabel() }));
  if (['Empty', 'Restock Needed', 'Low Stock'].includes(item.status)) addNotification('Low Stock Alert', `${item.name} is ${item.status}. Restock needed before dispatch.`, 'warning', { category: 'Inventory', itemId: item.id, displayTargets: ['Dashboard', 'Inventory', 'Pre Trip Checklist', 'Post Trip Checklist', 'Dispatch Tree', 'Notifications'] });
  addAudit('updated', 'Inventory', `${item.name} stock updated to ${item.currentStock} ${item.unit}.`, { itemId: item.id });
  saveStore();
  renderInventory();
  toast('Inventory stock update saved.');
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
    <div class="section-heading"><div><p class="eyebrow">Sunday–Saturday payroll and person statements</p><h1>Weekly payroll engine</h1><p class="section-summary">Owner payouts, captain payouts, mate payouts, reimbursements, person statements, receipts, weekly summaries, and export/print workflows are calculated as separate role lines so the same person can be paid independently for multiple roles on one trip.</p></div><div class="legacy-actions"><button class="btn btn-primary" data-route="trips">Create trip</button><button class="btn btn-outline" type="button" onclick="window.print()">Print / Export Statements</button></div></div>
    <div class="grid kpi-grid">${kpi('Amount owed', money(totalOwed), 'All active trips')}${kpi('Amount paid', money(totalPaid), 'Recorded payments')}${kpi('Outstanding', money(totalOwed - totalPaid), 'Still due')}${kpi('Payment records', store.payrollPayments.length, 'Local history')}${kpi('Owner Statements', entries.filter((entry) => entry.role === 'Owner').length, 'Owner payout lines')}${kpi('Captain Statements', entries.filter((entry) => entry.role === 'Captain').length, 'Captain payout lines')}${kpi('Mate Statements', entries.filter((entry) => entry.role === 'Mate').length, 'Mate payout lines')}</div><div class="card card-pad"><h3>Person Statement Summary</h3>${renderPersonStatementSummary(entries)}</div>
    ${Object.keys(grouped).length ? Object.entries(grouped).map(([week, weekEntries]) => renderPayrollWeek(week, weekEntries)).join('') : '<div class="card card-pad empty-state">No payroll yet. Create assigned trips to calculate weekly payouts.</div>'}
  </div>`;
}


function renderPersonStatementSummary(entries) {
  const byPerson = entries.reduce((acc, entry) => {
    const person = entry.person || 'Unassigned';
    acc[person] ||= { owed: 0, paid: 0, outstanding: 0, roles: new Set(), items: 0 };
    acc[person].owed += entry.amountOwed;
    acc[person].paid += entry.amountPaid;
    acc[person].outstanding += entry.outstanding;
    acc[person].roles.add(entry.role);
    acc[person].items += 1;
    return acc;
  }, {});
  const rows = Object.entries(byPerson).map(([person, summary]) => `<div class="stat-row"><span>${escapeHtml(person)}<br><small>${escapeHtml([...summary.roles].join(', '))} · ${summary.items} item(s)</small></span><strong>${money(summary.outstanding)} outstanding<br><small>${money(summary.owed)} owed / ${money(summary.paid)} paid</small></strong></div>`).join('');
  return rows || '<p class="empty-state">No person statements yet.</p>';
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

function updateInvoiceBalanceDue(form) {
  const base = Number(form.elements.baseTourPrice?.value || form.elements.tourPrice?.value || 0);
  const pigs = Number(form.elements.swimmingPigsPeople?.value || 0) * 20;
  const secondBoat = form.elements.secondBoat?.value === 'Yes' ? 900 : 0;
  const tourPrice = base + pigs + secondBoat;
  if (form.elements.tourPrice) form.elements.tourPrice.value = tourPrice.toFixed(2).replace(/\.00$/, '');
  const depositPercent = Number(form.elements.depositPercent?.value || 0);
  if (form.elements.depositPaid && depositPercent && !Number(form.elements.depositPaid.value || 0)) form.elements.depositPaid.value = (tourPrice * depositPercent / 100).toFixed(2).replace(/\.00$/, '');
  const depositPaid = Number(form.elements.depositPaid?.value || 0);
  if (form.elements.balanceDue) form.elements.balanceDue.value = Math.max(tourPrice - depositPaid, 0).toFixed(2).replace(/\.00$/, '');
}

function renderInvoiceModule() {
  const page = document.getElementById('page-invoices');
  if (!page || page.querySelector('[data-invoice-module]')) return;
  const table = page.querySelector('.table-card');
  const invoices = store.invoices || [];
  const cards = invoices.length ? invoices.map((invoice) => `<article class="invoice-card"><div class="card-header"><div><h3>${escapeHtml(invoice.customerName || 'Customer')}</h3><p>${escapeHtml(invoice.invoiceNumber || 'No invoice #')} · ${escapeHtml(formatDate(invoice.tripDate))}</p></div>${readinessBadge(invoice.paymentStatus || 'Deposit Due')}</div><div class="assignment-card-metrics"><div><span>Total Price</span><strong>${money(invoice.tourPrice)}</strong></div><div><span>Deposit</span><strong>${money(invoice.depositPaid)}</strong></div><div><span>Balance</span><strong>${money(invoice.balanceDue)}</strong></div><div><span>Payment Status</span><strong>${escapeHtml(invoice.paymentStatus || 'Deposit Due')}</strong></div></div><p class="muted-text">${escapeHtml(invoice.vessel || 'No vessel')} · ${escapeHtml(invoice.bookingSource || 'No source')}</p><div class="assignment-actions"><button class="btn btn-outline btn-small" onclick="showForm('invoices','${invoice.id}')">Edit Invoice</button><button class="btn btn-outline btn-small" onclick="markInvoiceDepositPaid('${invoice.id}')">Mark Deposit Paid</button><button class="btn btn-primary btn-small" onclick="markInvoicePaidInFull('${invoice.id}')">Mark Paid in Full</button><button class="btn btn-outline btn-small" onclick="generateReceiptSummary('${invoice.id}')">Generate Receipt Summary</button></div></article>`).join('') : '<p class="empty-state">No invoices yet. Use Create Invoice to add a native invoice.</p>';
  const module = document.createElement('div');
  module.className = 'card native-invoice-module';
  module.dataset.invoiceModule = 'true';
  module.innerHTML = `<div class="card-header"><div><h3>Native Invoice Module</h3><p class="muted-text">Create Invoice · Edit Invoice · Mark Deposit Paid · Mark Paid in Full · Generate Receipt Summary · Link Invoice to Trip · Link Invoice to Booking</p></div></div><div class="grid invoice-card-grid">${cards}</div><div class="card card-pad" data-receipt-summary><strong>Receipt summary output</strong><p class="muted-text">Choose Generate Receipt Summary on an invoice to review a customer receipt before sending externally.</p></div>`;
  table.before(module);
}

function findInvoice(id) { return (store.invoices || []).find((invoice) => invoice.id === id); }
function markInvoiceDepositPaid(id) {
  const invoice = findInvoice(id); if (!invoice) return;
  invoice.paymentStatus = 'Deposit Paid';
  invoice.balanceDue = Math.max(Number(invoice.tourPrice || 0) - Number(invoice.depositPaid || 0), 0);
  addAudit('updated', 'Invoices', `Marked deposit paid for ${invoice.customerName || invoice.invoiceNumber}.`, { invoiceId: id });
  saveStore(); renderCrud('invoices'); toast('Deposit marked paid.');
}
function markInvoicePaidInFull(id) {
  const invoice = findInvoice(id); if (!invoice) return;
  invoice.paymentStatus = 'Paid in Full'; invoice.depositPaid = Number(invoice.tourPrice || invoice.depositPaid || 0); invoice.balanceDue = 0;
  addAudit('updated', 'Invoices', `Marked paid in full for ${invoice.customerName || invoice.invoiceNumber}.`, { invoiceId: id });
  saveStore(); renderCrud('invoices'); toast('Invoice marked paid in full.');
}
function generateReceiptSummary(id) {
  const invoice = findInvoice(id); if (!invoice) return;
  const target = document.querySelector('[data-receipt-summary]');
  if (target) target.innerHTML = `<strong>Receipt Summary</strong><p>${escapeHtml(invoice.invoiceNumber || 'Invoice')} · ${escapeHtml(invoice.customerName || 'Customer')} · ${escapeHtml(formatDate(invoice.tripDate))}</p><p>Total ${money(invoice.tourPrice)} · Deposit ${money(invoice.depositPaid)} · Balance ${money(invoice.balanceDue)} · ${escapeHtml(invoice.paymentStatus || 'Deposit Due')}</p>`;
  addAudit('generated', 'Invoices', `Generated receipt summary for ${invoice.customerName || invoice.invoiceNumber}.`, { invoiceId: id });
  saveStore(); toast('Receipt summary generated for review.');
}

function renderCruiseScheduleModule() {
  const page = document.getElementById('page-cruise-schedule');
  if (!page || page.querySelector('[data-cruise-module]')) return;
  const table = page.querySelector('.table-card');
  const today = new Date().toISOString().slice(0, 10);
  const entries = store.cruiseSchedule || [];
  const todayShips = entries.filter((entry) => entry.arrivalDate === today);
  const upcoming = entries.filter((entry) => String(entry.arrivalDate || '') >= today).sort((a, b) => String(a.arrivalDate + a.arrivalTime).localeCompare(String(b.arrivalDate + b.arrivalTime))).slice(0, 8);
  const panel = document.createElement('div');
  panel.className = 'grid cruise-dashboard-grid';
  panel.dataset.cruiseModule = 'true';
  panel.innerHTML = `<div class="card card-pad"><h3>Ships in Port Today</h3>${todayShips.length ? todayShips.map((entry) => `<div class="stat-row"><span>${escapeHtml(entry.arrivalTime || 'No arrival')}–${escapeHtml(entry.departureTime || 'No departure')}</span><strong>${escapeHtml(entry.shipName)}<br><small>${escapeHtml(entry.terminalDock || 'No dock')}</small></strong></div>`).join('') : '<p class="empty-state">No ships in port today.</p>'}</div><div class="card card-pad"><h3>Upcoming Ships</h3>${upcoming.length ? upcoming.map((entry) => `<div class="stat-row"><span>${escapeHtml(formatDate(entry.arrivalDate))}</span><strong>${escapeHtml(entry.shipName)}<br><small>${escapeHtml(entry.cruiseLine || 'Cruise line')} · ${Number(entry.passengerCapacity || 0).toLocaleString()} pax</small></strong></div>`).join('') : '<p class="empty-state">No upcoming cruise entries.</p>'}</div>`;
  table.before(panel);
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
  const form = resolveVoiceForm(currentRoute, button);
  if (!form) {
    updateVoiceCommand({ state: 'ERROR', message: 'No editable fields are available on this page yet. Open or create a record first.' });
    toast('Open or create a record to use Command Voice Fill on this page.');
    return;
  }
  voiceCommand = { state: 'LISTENING_FOR_FIELD', route: currentRoute, field: null, form, lastValue: '', message: 'Listening for field name.', suggestions: [] };
  renderVoiceCommandPanel(currentRoute);
  listenForVoiceTranscript((transcript) => processVoiceCommandTranscript(transcript));
}

function listenForVoiceTranscript(onTranscript) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    updateVoiceCommand({ state: 'ERROR', message: 'Voice recognition is not supported in this browser. Try Chrome or Edge, or type directly into the field.' });
    toast('Voice recognition is not supported in this browser.');
    return;
  }
  if (voiceRecognition) voiceRecognition.stop();
  voiceRecognition = new SpeechRecognition();
  voiceRecognition.continuous = false;
  voiceRecognition.interimResults = false;
  voiceRecognition.lang = 'en-US';
  voiceRecognition.onresult = (event) => onTranscript(event.results[0][0].transcript || '');
  voiceRecognition.onerror = () => updateVoiceCommand({ state: 'ERROR', message: 'Voice fill stopped before text was captured.' });
  voiceRecognition.onend = () => { voiceRecognition = null; renderVoiceCommandPanel(currentRoute); };
  voiceRecognition.start();
}

function resolveVoiceForm(route, button) {
  const explicit = button?.closest('form');
  if (explicit) return explicit;
  if (crudConfig[route]) {
    let form = document.querySelector(`#page-${route} .record-form`);
    if (form?.hidden) showForm(route);
    form = document.querySelector(`#page-${route} .record-form`);
    return form && !form.hidden ? form : form;
  }
  return document.querySelector(`#page-${route} form, #page-${route} .role-trip-card, #page-${route}`);
}

function updateVoiceCommand(patch = {}) {
  voiceCommand = { ...voiceCommand, ...patch };
  renderVoiceCommandPanel(currentRoute);
}

function processVoiceCommandTranscript(transcript) {
  const clean = normalizeVoiceText(transcript);
  if (!clean) return updateVoiceCommand({ state: 'ERROR', message: 'Nothing was heard. Try again.' });
  if (voiceCommand.state === 'LISTENING_FOR_FIELD' || voiceCommand.state === 'IDLE' || !voiceCommand.field) {
    const field = matchVoiceField(clean, voiceCommand.form);
    if (!field) {
      return updateVoiceCommand({ state: 'ERROR', message: 'Field not found.', suggestions: voiceFieldExamples() });
    }
    voiceCommand.field = field;
    highlightVoiceField(field.element);
    updateVoiceCommand({ state: 'FIELD_SELECTED', message: `${field.label} selected. Now say the value.` });
    window.setTimeout?.(() => {
      updateVoiceCommand({ state: 'LISTENING_FOR_VALUE', message: `Listening for value for ${field.label}.` });
      listenForVoiceTranscript((nextTranscript) => processVoiceCommandTranscript(nextTranscript));
    }, 300);
    return;
  }
  if (['FIELD_SELECTED', 'LISTENING_FOR_VALUE'].includes(voiceCommand.state)) {
    fillVoiceFieldValue(clean);
  }
}

function fillVoiceFieldValue(value) {
  const field = voiceCommand.field;
  if (!field?.element) return updateVoiceCommand({ state: 'ERROR', message: 'Selected field is no longer available.' });
  let normalized = value;
  if (field.key === 'phone') normalized = normalizePhoneNumber(value);
  else if (['passengers', 'guests', 'guestCount'].includes(field.key)) normalized = spokenNumberToNumber(value) ?? (value.replace(/[^0-9]/g, '') || value);
  else if (['depositPaid', 'balanceDue', 'balance', 'tourPrice', 'amount'].includes(field.key)) normalized = spokenNumberToNumber(value) ?? (value.replace(/[^0-9.]/g, '') || value);
  else if (['startTime', 'time', 'arrivalTime', 'departureTime', 'returnTime'].includes(field.key)) normalized = normalizeTimeInput(value);

  if (field.element.tagName === 'SELECT') {
    const matched = setSelectLikeValue(field.element, normalized);
    if (!matched) {
      const suggestions = closestSelectOptions(field.element, normalized);
      return updateVoiceCommand({ state: 'ERROR', message: `${field.label} option not found for “${value}”.`, suggestions });
    }
    normalized = field.element.value;
  } else {
    field.element.value = normalized;
  }
  field.element.dispatchEvent(new Event('change', { bubbles: true }));
  field.element.dispatchEvent(new Event('input', { bubbles: true }));
  highlightVoiceField(field.element);
  if (currentRoute === 'trips' && voiceCommand.form?.elements) { updateBalanceDue(voiceCommand.form); updateTripConflictPreview(voiceCommand.form); }
  if (currentRoute === 'invoices' && voiceCommand.form?.elements) updateInvoiceBalanceDue(voiceCommand.form);
  voiceCommand.lastValue = normalized;
  updateVoiceCommand({ state: 'VALUE_FILLED', message: `Filled ${field.label}: ${normalized}` });
}

function highlightVoiceField(element) {
  document.querySelectorAll('.voice-selected-field').forEach((item) => item.classList.remove('voice-selected-field'));
  element?.classList?.add('voice-selected-field');
  element?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
}

function handleVoiceAction(action) {
  if (action === 'stop') { if (voiceRecognition) voiceRecognition.stop(); return updateVoiceCommand({ state: 'IDLE', message: 'Command Voice Fill stopped.' }); }
  if (action === 'accept') return updateVoiceCommand({ state: 'CONFIRMING', message: `${voiceCommand.field?.label || 'Field'} accepted. Say or select Next Field to continue.` });
  if (action === 'retry') {
    updateVoiceCommand({ state: 'LISTENING_FOR_VALUE', message: `Listening for value for ${voiceCommand.field?.label || 'selected field'}.` });
    return listenForVoiceTranscript((transcript) => processVoiceCommandTranscript(transcript));
  }
  if (action === 'clear') {
    if (voiceCommand.field?.element) voiceCommand.field.element.value = '';
    return updateVoiceCommand({ state: 'IDLE', field: null, lastValue: '', message: 'Cleared. Command Voice Fill idle.' });
  }
  if (action === 'next') {
    updateVoiceCommand({ state: 'LISTENING_FOR_FIELD', field: null, lastValue: '', message: 'Listening for field name.' });
    return listenForVoiceTranscript((transcript) => processVoiceCommandTranscript(transcript));
  }
}

function spokenNumberToNumber(value) {
  if (!value) return null;
  const text = String(value).toLowerCase().replace(/-/g, ' ').trim();
  if (/^\d+(?:\.\d+)?$/.test(text)) return Number(text);
  const numbers = { zero: 0, one: 1, two: 2, too: 2, to: 2, three: 3, four: 4, for: 4, five: 5, six: 6, seven: 7, eight: 8, ate: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100 };
  const parts = text.split(/\s+/).filter(Boolean);
  let total = 0;
  let current = 0;
  let found = false;
  parts.forEach((part) => {
    if (numbers[part] == null) return;
    found = true;
    if (part === 'hundred') current = (current || 1) * 100;
    else current += numbers[part];
  });
  total += current;
  return found ? total : null;
}

function normalizeVoiceText(transcript) {
  return String(transcript || '').replace(/\s+/g, ' ').trim();
}

function normalizePhoneNumber(value) {
  const raw = String(value || '').trim();
  const wordDigits = { zero: '0', oh: '0', o: '0', one: '1', won: '1', two: '2', too: '2', to: '2', three: '3', four: '4', for: '4', five: '5', six: '6', seven: '7', eight: '8', ate: '8', nine: '9' };
  const spokenDigits = raw.toLowerCase().split(/\s+/).map((part) => wordDigits[part.replace(/[^a-z]/g, '')]).join('');
  const extensionMatch = raw.match(/(?:ext\.?|extension|x)\s*(\d+)$/i);
  const extension = extensionMatch ? ` x${extensionMatch[1]}` : '';
  let digits = raw.replace(/(?:ext\.?|extension|x)\s*\d+$/i, '').replace(/\D/g, '');
  if (!digits && spokenDigits) digits = spokenDigits;
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}${extension}`;
  if (digits.length === 7) return `${digits.slice(0, 3)}-${digits.slice(3)}${extension}`;
  return raw;
}

function extractVoiceSegment(transcript, patterns) {
  for (const pattern of patterns) {
    const match = transcript.match(pattern);
    if (match?.[1]) return match[1].trim().replace(/^(is|as|for)\s+/i, '').replace(/\s+(please|thanks)$/i, '').trim();
  }
  return '';
}

function setFormValue(form, key, value) {
  if (!form.elements[key] || value == null || value === '') return false;
  const element = form.elements[key];
  if (element.tagName === 'SELECT') setSelectLikeValue(element, value);
  else element.value = value;
  if (typeof Event !== 'undefined' && element.dispatchEvent) element.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}

function setMoneyField(form, key, transcript, labels) {
  const labelPattern = labels.join('|');
  const match = transcript.match(new RegExp(`(?:${labelPattern})\\s*(?:is|of|for)?\\s*\\$?\\s*([0-9]+(?:\\.[0-9]{1,2})?|[a-z -]+?)(?=\\s*(?:dollars?|bucks?)?(?:[,.;]|$|\\s+(?:balance|deposit|amount|paid|for|on)))`, 'i'));
  if (!match) return false;
  const parsed = spokenNumberToNumber(match[1]);
  return setFormValue(form, key, parsed != null ? parsed : match[1].replace(/[^0-9.]/g, ''));
}

function applyVoiceTranscript(form, transcript) {
  const clean = normalizeVoiceText(transcript);
  const lower = clean.toLowerCase();
  const notes = form.elements.notes || form.elements.description || form.elements.actionsTaken;
  if (notes) notes.value = [notes.value, clean].filter(Boolean).join(notes.value ? '\n' : '');

  const firstPhrase = clean.split(/[,.;]/)[0]?.trim();
  const customer = extractVoiceSegment(clean, [/customer(?: name)?\s+(?:is\s+)?([^,.]+)/i, /(?:book|booking|trip)\s+(?:for|under)\s+([^,.]+)/i]) || (form.elements.customer && firstPhrase && !/\b(guest|passenger|captain|mate|vessel|tour|deposit|balance|phone|email|expense|incident)\b/i.test(firstPhrase) ? firstPhrase : '');
  if (customer) setFormValue(form, 'customer', customer);

  const phone = extractVoiceSegment(clean, [/(?:phone|mobile|cell)(?: number)?\s+(?:is\s+)?([+0-9 ()-]{7,}(?:\s*(?:ext\.?|extension|x)\s*\d+)?|(?:\d\s*){7,})/i]);
  if (phone) setFormValue(form, 'phone', normalizePhoneNumber(phone));

  const email = extractVoiceSegment(clean, [/(?:email|e-mail)\s+(?:is\s+)?([^,.;\s]+(?:\s*(?:at|@)\s*[^,.;\s]+)?(?:\s*(?:dot|\.)\s*[^,.;\s]+)?)/i]);
  if (email) setFormValue(form, 'email', email.replace(/\s+at\s+/i, '@').replace(/\s+dot\s+/gi, '.').replace(/\s+/g, ''));

  const guestsPhrase = extractVoiceSegment(clean, [/(\d+|[a-z -]+)\s+(?:guests?|passengers?|people|pax)\b/i, /(?:guest count|guests?|passengers?)\s+(?:is\s+)?(\d+|[a-z -]+)/i]);
  const guests = spokenNumberToNumber(guestsPhrase);
  if (guests != null) { setFormValue(form, 'passengers', guests); setFormValue(form, 'guests', guests); }

  const hoursPhrase = extractVoiceSegment(clean, [/(\d+|[a-z -]+)\s*(?:hour|hr)\s+(?:tour|charter|trip)/i]);
  const hours = spokenNumberToNumber(hoursPhrase);
  if (hours != null) setFormValue(form, 'hours', hours);

  const tourType = extractVoiceSegment(clean, [/(?:tour type|tour|charter|trip type)\s+(?:is\s+)?([^,.]+)/i, /((?:\d+|[a-z -]+)\s*(?:hour|hr)\s+(?:tour|charter|trip))/i]);
  if (tourType) { setFormValue(form, 'tourType', tourType); setFormValue(form, 'product', tourType); }

  const departure = extractVoiceSegment(clean, [/(?:departure time|depart(?:ure)?|leave|leaves|time)\s+(?:is\s+|at\s+)?(\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)?)/i]);
  if (departure) { setFormValue(form, 'startTime', normalizeTimeInput(departure)); setFormValue(form, 'time', normalizeTimeInput(departure)); }

  const vessel = extractVoiceSegment(clean, [/(?:vessel|boat)\s+(?:is\s+)?([^,.]+)/i]);
  if (vessel) setFormValue(form, 'vessel', vessel);
  const captain = extractVoiceSegment(clean, [/captain\s+(?:is\s+)?([^,.]+)/i]);
  if (captain) setFormValue(form, 'captain', captain);
  const mate = extractVoiceSegment(clean, [/mate\s+(?:is\s+)?([^,.]+)/i]);
  if (mate) setFormValue(form, 'mate', mate);

  setMoneyField(form, 'depositPaid', lower, ['deposit', 'deposit paid']);
  setMoneyField(form, 'balanceDue', lower, ['balance', 'balance due']);
  setMoneyField(form, 'balance', lower, ['balance', 'balance due']);
  setMoneyField(form, 'amount', lower, ['expense amount', 'incident amount', 'amount', 'cost', 'expense']);

  const expenseDescription = extractVoiceSegment(clean, [/(?:expense description|expense|description)\s+(?:is\s+|for\s+)?([^,.]+)/i]);
  if (expenseDescription && form.elements.notes && currentRoute === 'expenses') form.elements.notes.value = expenseDescription;
  const incidentDescription = extractVoiceSegment(clean, [/(?:incident description|incident)\s+(?:is\s+)?([^,.]+)/i]);
  if (incidentDescription && form.elements.description) form.elements.description.value = incidentDescription;
  const operationalNotes = extractVoiceSegment(clean, [/(?:operational notes?|notes?)\s+(?:are\s+|is\s+)?(.+)/i]);
  if (operationalNotes && notes) notes.value = operationalNotes;

  const severityMatch = clean.match(/severity\s+(low|medium|high|critical)/i);
  if (severityMatch && form.elements.severity) form.elements.severity.value = severityMatch[1][0].toUpperCase() + severityMatch[1].slice(1).toLowerCase();
  if (currentRoute === 'trips') { updateBalanceDue(form); updateTripConflictPreview(form); }
  addAudit('voice-fill', currentRoute, `Voice fill parsed fields for ${currentRoute}.`, { transcriptLength: clean.length });
  saveStore();
  toast('Voice fill populated matching fields. Review before saving.');
}

function normalizeTimeInput(value) {
  const text = String(value || '').toLowerCase().replace(/\./g, '').trim();
  const match = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
  if (!match) return value;
  let hour = Number(match[1]);
  const minute = match[2] || '00';
  if (match[3] === 'pm' && hour < 12) hour += 12;
  if (match[3] === 'am' && hour === 12) hour = 0;
  return `${String(hour).padStart(2, '0')}:${minute}`;
}

function setSelectLikeValue(element, text) {
  const target = normalizeMatchText(text);
  const options = Array.from(element.options || []);
  const exact = options.find((option) => normalizeMatchText(option.textContent) === target || normalizeMatchText(option.value) === target);
  const contains = exact || options.find((option) => normalizeMatchText(option.textContent).includes(target) || target.includes(normalizeMatchText(option.textContent)) || normalizeMatchText(option.value).includes(target));
  const roman = contains || options.find((option) => normalizeMatchText(romanToWords(option.textContent)).includes(target) || normalizeMatchText(option.textContent).includes(normalizeMatchText(wordsToRomanText(text))));
  if (roman) {
    element.value = roman.value;
    return true;
  }
  return false;
}

function normalizeMatchText(value) {
  return String(value || '').toLowerCase().replace(/\b(i)\b/g, ' one ').replace(/\b(ii)\b/g, ' two ').replace(/\b(iii)\b/g, ' three ').replace(/[^a-z0-9]+/g, ' ').trim();
}

function romanToWords(value) {
  return String(value || '').replace(/\bIII\b/gi, 'three').replace(/\bII\b/gi, 'two').replace(/\bI\b/gi, 'one');
}

function wordsToRomanText(value) {
  return String(value || '').replace(/\bone\b/gi, 'I').replace(/\btwo\b/gi, 'II').replace(/\bthree\b/gi, 'III');
}

function closestSelectOptions(element, value) {
  const target = normalizeMatchText(value);
  return Array.from(element.options || []).map((option) => option.textContent).filter(Boolean).map((label) => ({ label, score: similarityScore(target, normalizeMatchText(label)) })).sort((a, b) => b.score - a.score).slice(0, 3).map((item) => item.label);
}

function similarityScore(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 100;
  if (a.includes(b) || b.includes(a)) return 80;
  const aSet = new Set(a.split(' '));
  return b.split(' ').reduce((score, part) => score + (aSet.has(part) ? 10 : 0), 0);
}

const voiceFieldAliases = [
  { key: 'customer', fallbackKeys: ['customerName'], label: 'Customer Name', aliases: ['customer', 'customer name', 'guest name', 'client name', 'booking name'] },
  { key: 'phone', label: 'Phone Number', aliases: ['phone', 'phone number', 'telephone', 'cell', 'cell number', 'contact number'] },
  { key: 'email', label: 'Email', aliases: ['email', 'email address'] },
  { key: 'passengers', fallbackKeys: ['guests', 'guestCount', 'passengerCapacity'], label: 'Guest Count', aliases: ['guests', 'guest count', 'party size', 'passengers', 'passenger capacity'] },
  { key: 'tourType', fallbackKeys: ['product'], label: 'Tour Type', aliases: ['tour type', 'tour package', 'package', 'trip type'] },
  { key: 'tripDate', fallbackKeys: ['date', 'arrivalDate'], label: 'Trip Date', aliases: ['trip date', 'date', 'arrival date'] },
  { key: 'startTime', fallbackKeys: ['time', 'arrivalTime'], label: 'Start Time', aliases: ['start time', 'departure time', 'trip time', 'pickup time', 'arrival time'] },
  { key: 'departureTime', fallbackKeys: ['returnTime'], label: 'Departure Time', aliases: ['departure time', 'return time'] },
  { key: 'vessel', label: 'Vessel', aliases: ['vessel', 'boat', 'assigned boat'] },
  { key: 'owner', label: 'Owner', aliases: ['owner', 'boat owner', 'vessel owner'] },
  { key: 'captain', label: 'Captain', aliases: ['captain', 'assigned captain', 'boat captain'] },
  { key: 'mate', label: 'Mate', aliases: ['mate', 'crew mate', 'assigned mate'] },
  { key: 'tourPrice', fallbackKeys: ['price'], label: 'Price', aliases: ['price', 'tour price', 'total price'] },
  { key: 'depositPaid', label: 'Deposit', aliases: ['deposit', 'deposit paid'] },
  { key: 'balanceDue', fallbackKeys: ['balance'], label: 'Balance', aliases: ['balance', 'balance due'] },
  { key: 'paymentStatus', label: 'Payment Status', aliases: ['payment status', 'invoice status'] },
  { key: 'paymentMethod', label: 'Payment Method', aliases: ['payment method', 'pay method'] },
  { key: 'notes', fallbackKeys: ['description', 'actionsTaken', 'paymentNotes', 'customerFeedbackNotes'], label: 'Notes', aliases: ['notes', 'trip notes', 'special notes', 'customer notes', 'checklist notes'] },
  { key: 'amount', label: 'Expense Amount', aliases: ['expense amount', 'amount', 'cost'] },
  { key: 'notes', fallbackKeys: ['description'], label: 'Expense Description', aliases: ['expense description', 'description'] },
  { key: 'severity', label: 'Incident Severity', aliases: ['incident severity', 'severity'] },
  { key: 'description', label: 'Incident Description', aliases: ['incident description'] },
  { key: 'captainSignature', label: 'Captain Signature', aliases: ['captain signature', 'captain signature name'] },
  { key: 'mateSignature', label: 'Mate Signature', aliases: ['mate signature', 'mate signature name'] }
];

function matchVoiceField(transcript, form) {
  const target = normalizeMatchText(transcript);
  const spec = voiceFieldAliases.find((item) => item.aliases.some((alias) => normalizeMatchText(alias) === target || target.includes(normalizeMatchText(alias))));
  if (!spec) return null;
  const keys = [spec.key, ...(spec.fallbackKeys || [])];
  for (const key of keys) {
    const element = form?.elements?.[key] || form?.querySelector?.(`[name="${key}"], #${key}, textarea[data-trip-notes]`);
    if (element) return { ...spec, key, element };
  }
  return null;
}

function voiceFieldExamples() {
  return ['Customer Name', 'Phone Number', 'Email', 'Guest Count', 'Tour Type', 'Trip Date', 'Start Time', 'Departure Time', 'Vessel', 'Owner', 'Captain', 'Mate', 'Price', 'Deposit', 'Balance', 'Payment Status', 'Payment Method', 'Notes', 'Expense Amount', 'Incident Severity', 'Captain Signature', 'Mate Signature'];
}

function renderVoiceCommandPanel(route) {
  const page = document.getElementById(`page-${route}`);
  if (!page || !voiceSupportedRoutes.has(route)) return;
  page.querySelector('[data-voice-command-panel]')?.remove();
  const stack = page.querySelector('.page-stack') || page;
  const active = voiceCommand.route === route ? voiceCommand : { state: 'IDLE', message: 'Command Voice Fill idle. Click to select a field by voice.' };
  const stateClass = voiceCommand.route === route ? voiceCommand.state.toLowerCase().replace(/_/g, '-') : 'idle';
  const mode = active.state === 'IDLE' ? 'Field Command Mode + Natural Sentence Mode' : active.field ? 'Natural Sentence Mode' : 'Field Command Mode';
  const currentStep = active.state === 'LISTENING_FOR_VALUE' ? 'Listening for value' : active.state === 'LISTENING_FOR_FIELD' ? 'Listening for field name' : active.message;
  const markup = `<div class="voice-command-panel state-${stateClass}" data-voice-command-panel><div class="voice-mic" aria-hidden="true">🎙️</div><div><p class="eyebrow">Command Voice Fill</p><h3>${escapeHtml(active.state.replace(/_/g, ' '))}</h3><div class="voice-mode-grid"><span><strong>Mode:</strong> ${escapeHtml(mode)}</span><span><strong>Current Step:</strong> ${escapeHtml(currentStep)}</span></div><p>${escapeHtml(active.message)}</p>${active.suggestions?.length ? `<p class="voice-suggestions">Try saying: ${active.suggestions.map(escapeHtml).join(' · ')}</p>` : '<p class="voice-suggestions">Say: Customer Name. Then say: Crystal Belle.</p>'}</div><div class="voice-command-actions"><button class="btn btn-primary btn-small" type="button" data-command-voice-start>Start Listening</button><button class="btn btn-outline btn-small" type="button" data-voice-action="stop">Stop</button><button class="btn btn-outline btn-small" type="button" data-voice-action="accept">Accept</button><button class="btn btn-outline btn-small" type="button" data-voice-action="retry">Retry</button><button class="btn btn-outline btn-small" type="button" data-voice-action="clear">Clear</button><button class="btn btn-outline btn-small" type="button" data-voice-action="next">Next Field</button></div></div>`;
  const heading = stack.querySelector('.section-heading');
  if (heading?.insertAdjacentHTML) heading.insertAdjacentHTML('afterend', markup);
  else if (stack.insertAdjacentHTML) stack.insertAdjacentHTML('afterbegin', markup);
}

function handleTreeNodeAction(node) {
  const action = node.dataset.treeAction;
  const value = node.dataset.treeValue;
  if (action === 'trip' || action === 'status') return openTripEditor(node.dataset.tripId || value);
  if (action === 'owner') return openOwnerDashboard(value);
  if (action === 'captain') return openCrewRoleDashboard('captain', value);
  if (action === 'mate') return openCrewRoleDashboard('mate', value);
  if (action === 'vessel') return openVesselReadiness(value);
  if (action === 'pre') return renderRoute('pre-trip-checklist');
  if (action === 'post') return renderRoute('post-trip-checklist');
  if (['date', 'time'].includes(action)) filterTripsTable(value);
}

function openTripEditor(tripId) { renderRoute('trips'); showForm('trips', tripId); }
function openOwnerDashboard(owner) { dashboardFilters.owner = owner || ''; renderRoute('owner-dashboard'); }
function openCrewRoleDashboard(role, name) { dashboardFilters[role] = name || ''; renderRoute(`${role}-dashboard`); }
function openVesselReadiness(vessel) { renderRoute('vessels'); const input = document.querySelector('#page-vessels .search-input'); if (input) { input.value = vessel || ''; renderTable('vessels'); } }
function filterTripsTable(value) { const input = document.querySelector('#page-trips .search-input'); if (input) { input.value = value || ''; renderTable('trips'); } }


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
  const grouped = groupNotificationsByAge(filtered);
  const groupMarkup = ['Today', 'This Week', 'Older'].map((group) => `<section class="notification-group"><h3>${group}</h3>${grouped[group].length ? grouped[group].map(renderNoticeItem).join('') : '<p class="empty-state">No notifications in this group.</p>'}</section>`).join('');
  page.innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Modern mobile inbox</p><h1>Notifications</h1><p class="section-summary">Grouped by Today, This Week, and Older with unread, assignment, checklist, incident, payroll, and expense badges.</p></div><div class="notification-tools"><select data-notice-filter onchange="renderNotifications()">${options.map((option) => `<option value="${option}" ${option === selected ? 'selected' : ''}>${option}</option>`).join('')}</select><button class="btn btn-outline" data-mark-notices-read>Mark all read</button></div></div><div class="grid kpi-grid dashboard-kpis">${kpi('Owner alerts', unreadByRole('Owner'), 'Unread')}${kpi('Captain alerts', unreadByRole('Captain'), 'Unread')}${kpi('Mate alerts', unreadByRole('Mate'), 'Unread')}${kpi('Operations alerts', unreadByRole('Operations'), 'Unread')}</div><div class="card notification-inbox">${groupMarkup}</div></div>`;
}

function groupNotificationsByAge(notices) {
  const today = startOfDay(new Date());
  const weekStart = startOfWeekSunday(today);
  return notices.reduce((groups, notice) => {
    const date = notice.at ? startOfDay(new Date(notice.at)) : today;
    const key = sameDate(date, today) ? 'Today' : date >= weekStart ? 'This Week' : 'Older';
    groups[key].push(notice);
    return groups;
  }, { Today: [], 'This Week': [], Older: [] });
}

function renderNoticeItem(notice) {
  const level = notice.level === 'critical' ? 'red' : notice.level === 'success' ? 'green' : notice.level === 'warning' ? 'gold' : 'blue';
  return `<article class="notice-item ${notice.read ? '' : 'unread'}"><div class="notice-badges"><span class="badge ${notice.read ? 'gray' : 'green'}">${notice.read ? 'Read' : 'Unread'}</span><span class="badge ${level}">${escapeHtml(notice.category || notice.level || 'info')}</span></div><div><strong>${escapeHtml(notice.title)}</strong><p>${escapeHtml(notice.message)}</p><small>${escapeHtml([notice.recipientRole || 'All', notice.recipientName, new Date(notice.at).toLocaleString()].filter(Boolean).join(' · '))}</small><div class="notice-actions"><button class="btn btn-outline btn-small" data-mark-notice-read="${notice.id}">${notice.read ? 'Read' : 'Mark Read'}</button><button class="btn btn-outline btn-small" data-mark-notice-read="${notice.id}">Acknowledge</button><button class="btn btn-primary btn-small" data-route="${notice.metadata?.tripId ? 'trips' : 'dashboard'}">Open Related Trip</button></div></div></article>`;
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



const preTripChecklistItems = [
  ['pre_clean','Boat has been cleaned','checkbox','Boat Status'],
  ['pre_stocked','Boat is fully stocked','checkbox','Boat Status'],
  ['pre_trash','All trash has been removed','checkbox','Boat Status'],
  ['pre_ready','Boat is ready for charter','checkbox','Boat Status'],
  ['rum','Rum — minimum 3 bottles required on board','number','Stock'],
  ['pinac','Pina Colada — restock alert at 1 bottle','number','Stock'],
  ['pre_punch','Rum Punch Mixed & Ready','select:punchReady','Stock'],
  ['juicy','Yellow Juice — minimum 3 required on board','number','Stock'],
  ['juicr','Red Juice — minimum 3 required on board','number','Stock'],
  ['coke','Coke — minimum 6 required on board','number','Stock'],
  ['dietcoke','Diet Coke — minimum 6 required on board','number','Stock'],
  ['gombe','White Goombay Punch — minimum 6 required on board','number','Stock'],
  ['champ','Gold Champagne — minimum 6 required on board','number','Stock'],
  ['water','Water — minimum 1 full case required on board','number','Stock'],
  ['snacks','Chips / Snacks — restock alert at 1 box remaining','number','Stock'],
  ['bleach_whole','Bleach whole bottles','number','Cleaning Products'],
  ['bleach_open','Bleach open bottle level','select:bottleLevel','Cleaning Products'],
  ['joy_whole','Joy Dish Soap whole bottles','number','Cleaning Products'],
  ['joy_open','Joy Dish Soap open bottle level','select:bottleLevel','Cleaning Products'],
  ['engine1Oil','Engine 1 oil status','select:oilStatus','Engines / Fuel'],
  ['engine2Oil','Engine 2 oil status','select:oilStatus','Engines / Fuel'],
  ['fuelLevel','Fuel level','select:fuelLevel','Engines / Fuel'],
  ['bilgePump1Tested','Bilge Pump 1 — Tested and confirmed working','checkbox','Engines / Fuel'],
  ['bilgePump2Tested','Bilge Pump 2 — Tested and confirmed working','checkbox','Engines / Fuel'],
  ['photoNotes','Photos / files attached notes','textarea','Photos / Notes'],
  ['generalNotes','Equipment issues, weather, anything management should know before this charter','textarea','Photos / Notes'],
  ['captainSignature','Captain signature / initials','text','Sign-Off'],
  ['mateSignature','Mate signature / initials','text','Sign-Off']
];
const postTripChecklistItems = [
  ['post_clean','Boat has been cleaned','checkbox','Boat Status'],
  ['post_trash','All trash has been removed','checkbox','Boat Status'],
  ['post_ready','Boat is ready for the next charter','checkbox','Boat Status'],
  ['rum','Rum remaining — minimum 3 bottles needed for next charter','number','Remaining Stock'],
  ['pinac','Pina Colada remaining — restock alert at 1 bottle','number','Remaining Stock'],
  ['juicy','Yellow Juice remaining — minimum 3 needed for next charter','number','Remaining Stock'],
  ['juicr','Red Juice remaining — minimum 3 needed for next charter','number','Remaining Stock'],
  ['coke','Coke remaining — minimum 6 needed for next charter','number','Remaining Stock'],
  ['dietcoke','Diet Coke remaining — minimum 6 needed for next charter','number','Remaining Stock'],
  ['gombe','White Goombay Punch remaining — minimum 6 needed for next charter','number','Remaining Stock'],
  ['champ','Gold Champagne remaining — minimum 6 needed for next charter','number','Remaining Stock'],
  ['water','Water remaining — minimum 1 full case needed for next charter','number','Remaining Stock'],
  ['snacks','Chips / Snacks remaining — restock alert at 1 box remaining','number','Remaining Stock'],
  ['bleach_whole','Bleach remaining whole bottles','number','Cleaning Products'],
  ['bleach_open','Bleach open bottle level','select:bottleLevel','Cleaning Products'],
  ['joy_whole','Joy Dish Soap remaining whole bottles','number','Cleaning Products'],
  ['joy_open','Joy Dish Soap open bottle level','select:bottleLevel','Cleaning Products'],
  ['fuelLevel','Fuel level after trip','select:fuelLevel','Fuel / Engines'],
  ['bilgePump1Working','Bilge Pump 1 — Left in working order','checkbox','Fuel / Engines'],
  ['engine1FlushedToday','Engine 1 flushed today after this trip','checkbox','Fuel / Engines'],
  ['engine1FlushOverdue','Engine 1 flush overdue — needs attention','checkbox','Fuel / Engines'],
  ['engine1FlushDate','Engine 1 last flush date','date','Fuel / Engines'],
  ['engine1FlushInitials','Engine 1 captain sign-off initials','text','Fuel / Engines'],
  ['engine1Issues','Engine 1 issues or observations','textarea','Fuel / Engines'],
  ['bilgePump2Working','Bilge Pump 2 — Left in working order','checkbox','Fuel / Engines'],
  ['engine2FlushedToday','Engine 2 flushed today after this trip','checkbox','Fuel / Engines'],
  ['engine2FlushOverdue','Engine 2 flush overdue — needs attention','checkbox','Fuel / Engines'],
  ['engine2FlushDate','Engine 2 last flush date','date','Fuel / Engines'],
  ['engine2FlushInitials','Engine 2 captain sign-off initials','text','Fuel / Engines'],
  ['engine2Issues','Engine 2 issues or observations','textarea','Fuel / Engines'],
  ['photoNotes','Photos / files attached notes','textarea','Photos / Notes'],
  ['customerFeedbackNotes','Guest feedback, incidents, equipment issues, anything management should know about this charter','textarea','Photos / Notes'],
  ['captainSignature','Captain confirmation / initials','text','Sign-Off'],
  ['mateSignature','Mate confirmation / initials','text','Sign-Off']
];

const checklistStockThresholds = {
  rum: { min: 3, restockAt: null, inventoryName: 'Rum' },
  pinac: { min: 2, restockAt: 1, inventoryName: 'Pina Colada' },
  juicy: { min: 3, restockAt: null, inventoryName: 'Yellow Juice' },
  juicr: { min: 3, restockAt: null, inventoryName: 'Red Juice' },
  coke: { min: 6, restockAt: null, inventoryName: 'Coke' },
  dietcoke: { min: 6, restockAt: null, inventoryName: 'Diet Coke' },
  gombe: { min: 6, restockAt: null, inventoryName: 'White Goombay Punch' },
  champ: { min: 6, restockAt: null, inventoryName: 'Gold Champagne' },
  water: { min: 1, restockAt: null, inventoryName: 'Water' },
  snacks: { min: 2, restockAt: 1, inventoryName: 'Chips / Snacks' }
};

function renderChecklistPage(type) {
  const route = type === 'Pre Trip' ? 'pre-trip-checklist' : 'post-trip-checklist';
  const page = document.getElementById(`page-${route}`);
  const records = (store.checklistRecords || []).filter((record) => record.type === type).sort((a, b) => String(b.submittedAt || '').localeCompare(String(a.submittedAt || '')));
  const isPre = type === 'Pre Trip';
  const items = isPre ? preTripChecklistItems : postTripChecklistItems;
  const timeLabel = isPre ? 'Start Time' : 'Return Time';
  const timeName = isPre ? 'startTime' : 'returnTime';
  const alerts = inventoryAlerts();
  page.innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Legacy parity native checklist workflow</p><h1>${type} Checklist</h1><p class="section-summary">Mobile-first native version of ${isPre ? 'RAT-PreTrip-VesselCheck.html' : 'RAT-PostTrip-VesselCheck.html'} with vessel details, boat status confirmations, stock counts, restock alerts, engine/fuel checks, notes, sign-off, preview, print/PDF, and WhatsApp handoff.</p></div></div><div class="card urgent-card"><div class="card-header"><h3>Stock level alerts for checklist</h3><span class="badge ${alerts.length ? 'red' : 'green'}">${alerts.length ? 'Low Stock Warning' : 'Stock OK'}</span></div><div class="stat-list">${alerts.length ? alerts.map((item) => `<div class="stat-row"><span>${escapeHtml(item.name)}</span><strong>${statusBadge(item.status)} ${escapeHtml(item.currentStock)} / min ${escapeHtml(item.minimumRequiredStock)}</strong></div>`).join('') : '<p class="empty-state">No low stock warnings before this checklist.</p>'}</div></div><form class="record-form card" onsubmit="saveChecklistRecord(event,'${type}')"><section class="form-section-card"><div class="form-section-title"><span>1</span><h3>Vessel / Crew Details</h3></div><div class="form-grid"><div class="field"><label>Trip</label><select name="tripId" onchange="populateChecklistTripDetails(this.form)"><option value="">— Select Trip —</option>${getOptions('trips').map((opt) => `<option value="${escapeHtml(opt.split('|')[0])}">${escapeHtml(opt.split('|').slice(1).join('|'))}</option>`).join('')}</select></div><div class="field"><label>Vessel</label><select name="vessel"><option value="">— Select —</option>${getOptions('vessels').map((vessel) => `<option value="${escapeHtml(vessel)}">${escapeHtml(vessel)}</option>`).join('')}</select></div><div class="field"><label>Captain / Initials</label><select name="captain"><option value="">— Select —</option>${getOptions('crew').map((crew) => `<option value="${escapeHtml(crew)}">${escapeHtml(crew)}</option>`).join('')}</select></div><div class="field"><label>Mate</label><select name="mate"><option value="">— Select —</option>${getOptions('crew').map((crew) => `<option value="${escapeHtml(crew)}">${escapeHtml(crew)}</option>`).join('')}</select></div><div class="field"><label>Date</label><input name="date" type="date"></div><div class="field"><label>${timeLabel}</label><input name="${timeName}" type="time"></div><div class="field"><label>Status</label><select name="status"><option>Draft</option><option>Submitted</option><option>Needs Review</option></select></div></div></section>${renderChecklistSections(items)}<div class="form-actions sticky-save-controls"><button class="btn btn-outline" type="submit" name="action" value="draft">Save Draft</button><button class="btn btn-primary" type="submit" name="action" value="submit">Submit ${type} Checklist</button><button class="btn btn-outline" type="submit" name="action" value="review">Mark Needs Review</button><button class="btn btn-outline" type="button" onclick="window.print()">Preview / Print / Save PDF</button><a class="btn btn-outline" href="https://wa.me/" target="_blank" rel="noopener">WhatsApp</a>${voiceFillButton(route)}</div></form><div class="card table-card"><div class="card-header"><h3>${type} records</h3><button class="btn btn-outline btn-small" type="button" onclick="window.print()">Print / Export Records</button></div><div class="responsive-table-wrap"><table><thead><tr><th>Submitted</th><th>Trip</th><th>Vessel</th><th>Captain</th><th>Mate</th><th>Status</th><th>Notes</th></tr></thead><tbody>${records.length ? records.map((record) => `<tr><td>${escapeHtml(new Date(record.submittedAt).toLocaleString())}</td><td>${escapeHtml(record.tripLabel || record.tripId)}</td><td>${escapeHtml(record.vessel)}</td><td>${escapeHtml(record.captain)}</td><td>${escapeHtml(record.mate)}</td><td>${readinessBadge(record.status)}</td><td>${escapeHtml(record.generalNotes || record.customerFeedbackNotes || record.notes || '—')}</td></tr>`).join('') : '<tr><td colspan="7" class="empty-state">No checklist records yet.</td></tr>'}</tbody></table></div></div></div>`;
}

function renderChecklistSections(items) {
  const groups = items.reduce((acc, item) => { const section = item[3] || 'Checklist'; acc[section] ||= []; acc[section].push(item); return acc; }, {});
  return Object.entries(groups).map(([section, fields], index) => `<section class="form-section-card"><div class="form-section-title"><span>${index + 2}</span><h3>${escapeHtml(section)}</h3></div><div class="checklist-grid">${fields.map(([key, label, inputType]) => renderChecklistInput(key, label, inputType)).join('')}</div></section>`).join('');
}

function renderChecklistInput(key, label, inputType) {
  if (inputType === 'checkbox') return `<label class="checklist-item"><input type="checkbox" name="${key}" value="Yes"><span>${escapeHtml(label)}</span></label>`;
  if (inputType === 'textarea') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><textarea name="${key}"></textarea></div>`;
  if (inputType === 'number') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><input name="${key}" type="number" min="0" step="1" value="0"></div>`;
  if (inputType === 'date') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><input name="${key}" type="date"></div>`;
  if (inputType === 'select:punchReady') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><select name="${key}"><option value="">— Select —</option><option>Confirmed Mixed & Ready</option><option>Needs Preparation</option></select></div>`;
  if (inputType === 'select:bottleLevel') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><select name="${key}"><option value="">— Select —</option><option>Full</option><option>Half</option><option>Empty</option></select></div>`;
  if (inputType === 'select:oilStatus') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><select name="${key}"><option value="">— Select —</option><option>Need to Add</option><option>OK</option><option>Too Full</option></select></div>`;
  if (inputType === 'select:fuelLevel') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><select name="${key}"><option value="">— Select —</option><option>E</option><option>1/4</option><option>1/2</option><option>3/4</option><option>F</option></select></div>`;
  return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><input name="${key}" type="text"></div>`;
}

function populateChecklistTripDetails(form) {
  const trip = store.trips.find((item) => item.id === form.elements.tripId?.value);
  if (!trip) return;
  setFormValue(form, 'vessel', trip.vessel || '');
  setFormValue(form, 'captain', trip.captain || '');
  setFormValue(form, 'mate', trip.mate || '');
  setFormValue(form, 'date', trip.tripDate || '');
  setFormValue(form, 'startTime', trip.startTime || '');
}

function checklistRestockAlerts(data) {
  const alerts = [];
  Object.entries(checklistStockThresholds).forEach(([key, info]) => {
    if (!(key in data)) return;
    const value = Number(data[key] || 0);
    const trigger = info.restockAt !== null ? info.restockAt : info.min - 1;
    if (value <= trigger) alerts.push(`${info.inventoryName} at ${value}; restock needed`);
  });
  ['bleach', 'joy'].forEach((key) => {
    const whole = Number(data[`${key}_whole`] || 0);
    const open = data[`${key}_open`] || '';
    if (open === 'Empty' || (open === 'Half' && whole === 0)) alerts.push(`${key === 'bleach' ? 'Bleach' : 'Joy Dish Soap'} ${open.toLowerCase()} with ${whole} whole bottles; restock needed`);
  });
  if (data.engine1Oil === 'Need to Add' || data.engine2Oil === 'Need to Add') alerts.push('Oil status indicates need to add oil');
  if (data.pre_punch === 'Needs Preparation') alerts.push('Rum Punch needs preparation before departure');
  if (data.engine1FlushOverdue === 'Yes' || data.engine2FlushOverdue === 'Yes') alerts.push('Flush overdue needs attention');
  return alerts;
}

function syncChecklistInventory(data, type, trip) {
  Object.entries(checklistStockThresholds).forEach(([key, info]) => {
    if (!(key in data)) return;
    const item = store.inventory.find((entry) => entry.name === info.inventoryName);
    if (!item) return;
    item.currentStock = Number(data[key] || 0);
    item.linkedVessel = data.vessel || item.linkedVessel || '';
    item.linkedTrip = data.tripId || item.linkedTrip || '';
    item.updatedBy = data.captain || currentUserLabel();
    item.lastUpdated = new Date().toISOString();
    Object.assign(item, normalizeInventoryItem(item));
  });
  if (data.fuelLevel) {
    const fuel = store.inventory.find((entry) => entry.name === 'Fuel');
    if (fuel) {
      const map = { E: 0, '1/4': 25, '1/2': 50, '3/4': 75, F: 100 };
      fuel.currentStock = map[data.fuelLevel] ?? fuel.currentStock;
      fuel.linkedVessel = data.vessel || fuel.linkedVessel || '';
      fuel.linkedTrip = data.tripId || fuel.linkedTrip || '';
      fuel.updatedBy = data.captain || currentUserLabel();
      fuel.lastUpdated = new Date().toISOString();
      Object.assign(fuel, normalizeInventoryItem(fuel));
    }
  }
  const alerts = checklistRestockAlerts(data);
  if (alerts.length) addNotification(`${type} low stock warning`, alerts.join('; '), 'warning', { category: 'Inventory', tripId: data.tripId, vessel: data.vessel, displayTargets: ['Dashboard', 'Inventory', 'Pre Trip Checklist', 'Post Trip Checklist', 'Dispatch Tree', 'Notifications'] });
  return alerts;
}

function saveChecklistRecord(event, type) {
  event.preventDefault();
  const submitterAction = event.submitter?.value || 'draft';
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  data.status = submitterAction === 'submit' ? 'Submitted' : submitterAction === 'review' ? 'Needs Review' : 'Draft';
  const trip = store.trips.find((item) => item.id === data.tripId);
  const restockAlerts = syncChecklistInventory(data, type, trip);
  const record = { id: makeId('checklist'), type, ...data, restockAlerts, tripLabel: trip ? `${formatDate(trip.tripDate)} ${trip.customer || ''}` : '', submittedAt: new Date().toISOString() };
  store.checklistRecords.push(record);
  if (trip) {
    if (type === 'Pre Trip') trip.preTripChecklistStatus = data.status === 'Submitted' ? 'Completed' : data.status;
    else trip.postTripChecklistStatus = data.status === 'Submitted' ? 'Completed' : data.status;
    if (type === 'Post Trip' && data.status === 'Submitted' && ['Completed', 'Accepted'].includes(trip.assignmentStatus?.captain) && ['Completed', 'Accepted'].includes(trip.assignmentStatus?.mate)) trip.status = 'Completed';
    trip.dispatchReadinessStatus = calculateDispatchReadiness(trip);
    if (type === 'Post Trip' && data.status === 'Submitted') trip.payrollReady = true;
  }
  const completeLabel = data.status === 'Submitted' ? 'Complete' : data.status;
  addAudit(data.status === 'Draft' ? 'drafted' : data.status === 'Needs Review' ? 'review' : 'submitted', `${type} Checklist`, `${type} checklist ${completeLabel} for ${data.vessel || 'trip'}.`, { tripId: data.tripId, restockAlerts });
  addRoleNotification('Operations', '', `${type} checklist ${completeLabel}`, `${data.vessel || 'A vessel'} checklist is ${completeLabel}.${restockAlerts.length ? ' Restock needed: ' + restockAlerts.join('; ') : ''}`, restockAlerts.length || data.status === 'Needs Review' ? 'warning' : 'success', 'Checklist', { tripId: data.tripId, vessel: data.vessel });
  saveStore();
  renderChecklistPage(type);
  toast(`${type} checklist ${completeLabel}.`);
}

function tripDateTime(trip) {
  if (!trip.tripDate || !trip.startTime) return null;
  const date = new Date(`${trip.tripDate}T${trip.startTime}`);
  return Number.isNaN(date.getTime()) ? null : date;
}
function postTripReminderTime(trip) {
  const start = tripDateTime(trip);
  if (!start) return null;
  return new Date(start.getTime() + Math.max(Number(trip.hours || 4) * 60 - 30, 0) * 60000);
}
function reminderExists(key) {
  return (store.notifications || []).some((notice) => notice.metadata?.reminderKey === key);
}
function generateChecklistReminders(now = new Date()) {
  (store.trips || []).filter((trip) => trip.status !== 'Cancelled').forEach((trip) => {
    const crew = crewAssignmentsForTrip(trip);
    const start = tripDateTime(trip);
    if (start && now <= start && latestChecklistStatus(trip, 'Pre Trip') !== 'Completed') {
      crew.forEach(({ role, name }) => {
        const key = `pre-${trip.id}-${role}-${name}`;
        if (!reminderExists(key)) addRoleNotification(role, name, 'Pre Trip Checklist due', `Pre Trip Checklist due for ${trip.customer || 'customer'} on ${trip.vessel || 'assigned vessel'}.`, 'warning', 'Checklist', { tripId: trip.id, reminderKey: key, reminderType: 'pre-trip', displayTargets: ['Notifications', 'Captain Dashboard', 'Mate Dashboard', 'Trip card', 'Dispatch Tree node'] });
      });
    }
    const postReminderAt = postTripReminderTime(trip);
    if (postReminderAt && now >= postReminderAt && latestChecklistStatus(trip, 'Post Trip') !== 'Completed') {
      crew.forEach(({ role, name }) => {
        const key = `post-${trip.id}-${role}-${name}`;
        if (!reminderExists(key)) addRoleNotification(role, name, 'Post Trip Checklist due soon', `Post Trip Checklist due soon for ${trip.customer || 'customer'} on ${trip.vessel || 'assigned vessel'}.`, 'warning', 'Checklist', { tripId: trip.id, reminderKey: key, reminderType: 'post-trip-30-minute', reminderAt: postReminderAt.toISOString(), displayTargets: ['Notifications', 'Captain Dashboard', 'Mate Dashboard', 'Trip card', 'Dispatch Tree node'] });
      });
    }
  });
  saveStore();
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
  const selected = dashboardFilters.owner || page.querySelector('[data-owner-select]')?.value || getOptions('owners')[0] || '';
  dashboardFilters.owner = '';
  const ownerVessels = store.vessels.filter((vessel) => vessel.owner === selected).map((vessel) => vessel.name);
  const trips = store.trips.filter((trip) => ownerVessels.includes(trip.vessel)).sort(byDate);
  const notices = (store.notifications || []).filter((notice) => notice.recipientRole === 'Owner' || ownerVessels.includes(notice.metadata?.vessel));
  const ownerPayroll = payrollEntries().filter((entry) => entry.role === 'Owner' && entry.person === selected);
  const outstanding = ownerPayroll.reduce((sum, entry) => sum + entry.outstanding, 0);
  const checklistDone = trips.filter((trip) => latestChecklistStatus(trip, 'Pre Trip') === 'Completed').length;
  const incidentAlerts = (store.incidentReports || []).filter((incident) => ownerVessels.includes(incident.vessel) && incident.status !== 'Resolved');
  const expenseAlerts = (store.expenses || []).filter((expense) => ownerVessels.includes(expense.vessel) && expense.status !== 'Paid');
  page.innerHTML = `<div class="page-stack owner-command-center"><div class="section-heading"><div><p class="eyebrow">Owner mobile command</p><h1>Owner Dashboard</h1><p class="section-summary">Assigned vessels, upcoming trips, owner payouts, checklist completion, incidents, expenses, and payroll alerts at a glance.</p></div><select data-owner-select onchange="renderOwnerDashboard()">${getOptions('owners').map((owner) => `<option value="${escapeHtml(owner)}" ${owner === selected ? 'selected' : ''}>${escapeHtml(owner)}</option>`).join('')}</select></div><div class="grid kpi-grid dashboard-kpis">${kpi('Assigned vessels', ownerVessels.length, ownerVessels.join(', ') || 'None')}${kpi('Upcoming trips', trips.length, 'Owner vessel assignments')}${kpi('Outstanding owner payouts', money(outstanding), 'Unpaid owner payroll')}${kpi('Checklist completion', `${checklistDone}/${trips.length}`, 'Pre trip complete')}${kpi('Incident alerts', incidentAlerts.length, 'Open owner vessel incidents')}${kpi('Expense alerts', expenseAlerts.length, 'Submitted or review needed')}${kpi('Payroll alerts', ownerPayroll.filter((entry) => entry.outstanding > 0).length, 'Outstanding payout lines')}</div><div class="grid dashboard-grid"><div class="card"><div class="card-header"><h3>Upcoming trips</h3>${statusBadge(trips.length ? 'Pending' : 'Ready')}</div><div class="stat-list">${trips.length ? trips.map((trip) => `<div class="stat-row"><span>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(trip.vessel)}</span><strong>${escapeHtml(trip.customer || 'Trip')}<br><small>Captain ${escapeHtml(trip.captain || 'Missing')} · Mate ${escapeHtml(trip.mate || 'Missing')} · ${escapeHtml(calculateDispatchReadiness(trip))}</small></strong></div>`).join('') : '<p class="empty-state">No owner vessel assignments.</p>'}</div></div><div class="card"><div class="card-header"><h3>Owner alerts</h3>${statusBadge(incidentAlerts.length ? 'Incident' : expenseAlerts.length ? 'Needs Review' : 'Ready')}</div><div class="notice-list card-pad">${notices.length ? notices.slice(0, 8).map((notice) => `<div class="notice-item ${notice.read ? '' : 'unread'}"><span class="badge ${statusColor(notice.category)}">${escapeHtml(notice.category)}</span><div><strong>${escapeHtml(notice.title)}</strong><p>${escapeHtml(notice.message)}</p></div></div>`).join('') : '<p class="empty-state">No owner alerts.</p>'}</div></div></div></div>`;
}


function renderReports() {
  const trips = store.trips || [];
  const revenue = trips.reduce((sum, trip) => sum + Number(trip.tourPrice || 0), 0) + (store.invoices || []).reduce((sum, invoice) => sum + Number(invoice.tourPrice || 0), 0);
  const outstandingBalances = trips.reduce((sum, trip) => sum + Number(trip.balanceDue || 0), 0) + (store.invoices || []).reduce((sum, invoice) => sum + Number(invoice.balanceDue || 0), 0);
  const payrollOwed = payrollEntries().reduce((sum, entry) => sum + entry.outstanding, 0);
  const expenseTotal = (store.expenses || []).reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const readyTrips = trips.filter((trip) => calculateDispatchReadiness(trip) === 'Dispatch Ready').length;
  const notReadyTrips = trips.filter((trip) => calculateDispatchReadiness(trip) === 'Not Ready').length;
  const by = (key) => Object.entries(trips.reduce((acc, trip) => { const label = trip[key] || 'Unassigned'; acc[label] = (acc[label] || 0) + 1; return acc; }, {})).sort((a, b) => b[1] - a[1]);
  const listRows = (items) => items.length ? items.map(([label, count]) => `<div class="stat-row"><span>${escapeHtml(label)}</span><strong>${count}</strong></div>`).join('') : '<p class="empty-state">No trip data yet.</p>';
  document.getElementById('page-reports').innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Native reports dashboard</p><h1>Reports</h1><p class="section-summary">Revenue, balances, payroll, expenses, trip readiness, and operational summaries generated from current local app data.</p></div></div><div class="grid kpi-grid">${kpi('Revenue Summary', money(revenue), 'Trips + invoices')}${kpi('Outstanding Balances', money(outstandingBalances), 'Unpaid customer balances')}${kpi('Payroll Owed', money(payrollOwed), 'Outstanding crew/owner pay')}${kpi('Expenses', money(expenseTotal), 'Local expense records')}${kpi('Trip Count', trips.length, 'All local trips')}${kpi('Ready vs Not Ready Trips', `${readyTrips} / ${notReadyTrips}`, 'Dispatch readiness')}</div><div class="grid dashboard-grid"><div class="card card-pad"><h3>Trips by Vessel</h3>${listRows(by('vessel'))}</div><div class="card card-pad"><h3>Trips by Captain</h3>${listRows(by('captain'))}</div><div class="card card-pad"><h3>Trips by Booking Source</h3>${listRows(by('bookingSource'))}</div><div class="card card-pad"><h3>Trip Status</h3><div class="stat-row"><span>Completed Trips</span><strong>${trips.filter((trip) => trip.status === 'Completed').length}</strong></div><div class="stat-row"><span>Cancelled Trips</span><strong>${trips.filter((trip) => trip.status === 'Cancelled').length}</strong></div><div class="stat-row"><span>Ready Trips</span><strong>${readyTrips}</strong></div><div class="stat-row"><span>Not Ready Trips</span><strong>${notReadyTrips}</strong></div></div></div></div>`;
}

function renderLegacy() { renderRoute('settings'); }

function embedLegacy() { renderRoute('settings'); }

function renderPlaceholder(route) {
  const label = (navItems.find(([key]) => key === route) || [,'',route])[2];
  const map = {
    payroll: ['Payroll summaries will later connect to trips, roles, owner payouts, and rates.', 'Gmail automation is not implemented.'],
    expenses: ['Expense capture, approvals, alerts, and reporting are handled in this native tab.'],
    inventory: ['Inventory placeholder for supplies, parts, and vessel consumables.'],
    'pre-trip-checklist': ['Native pre-trip checklist records are available here for daily dispatch readiness.'],
    'post-trip-checklist': ['Native post-trip checklist records are available here for completion and archive workflows.'],
    reports: ['Reports use current local app data for revenue, balances, payroll, expenses, and trip readiness.'],
    settings: ['Local storage tools, seed data summaries, and phase guardrails.']
  };
  const lines = map[route] || ['Phase 2 placeholder.'];
  const extra = route === 'settings' ? settingsMarkup() : '';
  document.getElementById(`page-${route}`).innerHTML = `<div class="page-stack"><div class="section-heading"><div><p class="eyebrow">Phase 2 placeholder</p><h1>${label}</h1><p class="section-summary">This section is present in the unified navigation and ready for Phase 3 expansion.</p></div></div><div class="card card-pad"><ul class="placeholder-list">${lines.map((line) => `<li>${line}</li>`).join('')}</ul>${legacyShortcut(route)}${extra}</div></div>`;
}
function legacyShortcut(route) {
  return '';
}


function renderLegacyAuditSummary() {
  return Object.entries(legacyFeatureAudit).map(([file, audit]) => `<details class="legacy-tool"><summary><strong>${escapeHtml(file)}</strong> · ${audit.sections.length} sections · ${audit.fields.length} fields/checks</summary><div class="placeholder-list"><p><strong>Sections:</strong> ${escapeHtml(audit.sections.join(', '))}</p><p><strong>Fields / checklist items:</strong> ${escapeHtml(audit.fields.join(', '))}</p><p><strong>Calculations:</strong> ${escapeHtml(audit.calculations.join(', '))}</p><p><strong>Alerts:</strong> ${escapeHtml(audit.alerts.join(', '))}</p><p><strong>Exports / workflows:</strong> ${escapeHtml(audit.exports.join(', '))}</p></div></details>`).join('');
}

function settingsMarkup() {
  return `<div class="grid settings-grid" style="margin-top:18px"><div class="legacy-tool"><h3>Seed data</h3><p>${store.vessels.length} vessels, ${store.crew.length} crew members, ${store.roles.length} roles, ${store.bookingSources.length} booking sources, ${store.standardPayoutRates.length} standard crew payout rates, and ${store.vesselOwnerPayoutRates.length} documented owner payout rules loaded.</p></div><div class="legacy-tool"><h3>Local data layer</h3><p>Storage key: ${STORE_KEY}. Last updated: ${new Date(store.updatedAt).toLocaleString()}.</p><div class="legacy-actions"><button class="btn btn-outline" data-export-store>Export JSON</button><label class="btn btn-outline" for="importStoreFile">Import JSON<input id="importStoreFile" data-import-store type="file" accept="application/json" hidden></label><button class="btn btn-danger" data-reset-store>Reset seed data</button></div></div><div class="legacy-tool"><h3>Preserved Phase 4 safeguards</h3><p>Dispatch board, true tree view, assignment lifecycle, crew dashboards, checklist readiness, vessel readiness, passenger manifests, payroll, audit trail, notifications, command voice fill, export/import, and the static validator are all active.</p></div><div class="legacy-tool archived-legacy-tools"><h3>Legacy Parity Audit</h3><p>These audited legacy sections, fields, calculations, alerts, exports, and workflows drove the native migration correction.</p><div class="legacy-list">${renderLegacyAuditSummary()}</div></div><div class="legacy-tool archived-legacy-tools"><h3>Archived Legacy Tools</h3><p>Legacy tools are retained for reference only. Active operations should be completed through the main application tabs.</p><div class="legacy-list">${legacyTools.map((tool) => `<div class="legacy-tool"><h3>${tool.title}</h3><p>${tool.desc}</p><div class="legacy-actions"><a class="btn btn-outline btn-small" href="${tool.file}" target="_blank" rel="noopener">Open reference</a></div></div>`).join('')}</div></div></div>`;
}
function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}

document.addEventListener('DOMContentLoaded', init);
