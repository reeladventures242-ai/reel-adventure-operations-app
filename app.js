const STORE_KEY = 'rat_ops_v1_store';
const STORE_VERSION = 26;
const APP_RELEASE_LABEL = '2026-06-10 integrations-download';
const STORE_BACKUP_KEY = `${STORE_KEY}_backup`;
const STORE_RECOVERY_KEY = `${STORE_KEY}_recovery`;

const roleRouteVisibility = {
  Admin: null,
  Owner: new Set(['dashboard','operations-assistant','dispatch','calendar','chat','whatsapp','bookings','trips','vessels','maintenance','owner-dashboard','payroll','expenses','incident-reports','pre-trip-checklist','post-trip-checklist','cruise-schedule','reports','notifications','settings']),
  Captain: new Set(['dashboard','operations-assistant','dispatch','calendar','chat','whatsapp','bookings','trips','vessels','maintenance','captain-dashboard','payroll','incident-reports','pre-trip-checklist','post-trip-checklist','cruise-schedule','notifications','settings']),
  Mate: new Set(['dashboard','operations-assistant','dispatch','calendar','chat','whatsapp','bookings','trips','vessels','maintenance','mate-dashboard','payroll','incident-reports','pre-trip-checklist','post-trip-checklist','cruise-schedule','notifications','settings']),
  Bookkeeper: new Set(['dashboard','operations-assistant','calendar','chat','whatsapp','gmail-import','invoices','bookings','trips','payroll','expenses','reports','notifications','audit','settings'])
};
const MAINTENANCE_VESSELS = ['Reel Adventure Tours I', 'Reel Adventure Tours II'];
const MAINTENANCE_STATUSES = ['Good', 'Due Soon', 'Overdue', 'Needs Review', 'Out of Service'];

const navItems = [
  ['dashboard', '🏠', 'Dashboard'], ['operations-assistant', '✨', 'Ask Operations'], ['dispatch', '📍', 'Dispatch'], ['calendar', '📅', 'Calendar'],
  ['bookings', '📘', 'Bookings / Trips'], ['chat', '💬', 'Chat'], ['whatsapp', '🟢', 'WhatsApp'], ['gmail-import', '📨', 'Gmail Import'],
  ['invoices', '🧾', 'Create Invoice / Quote'], ['vessels', '⛵', 'Vessels'], ['maintenance', '🛠️', 'Maintenance'], ['crew', '👥', 'Crew'],
  ['captain-dashboard', '🧢', 'Captain Dashboard'], ['mate-dashboard', '⚓', 'Mate Dashboard'], ['owner-dashboard', '👑', 'Owner Dashboard'],
  ['payroll', '💸', 'Payroll'], ['expenses', '💳', 'Expenses'], ['inventory', '📦', 'Inventory'], ['incident-reports', '🚨', 'Incident Reports'],
  ['pre-trip-checklist', '✅', 'Pre Trip Checklist'], ['post-trip-checklist', '🧽', 'Post Trip Checklist'],
  ['reports', '📊', 'Reports'], ['notifications', '🔔', 'Notifications'], ['audit', '🧾', 'Audit Trail'], ['settings', '⚙️', 'Settings'],
  ['cruise-schedule', '🚢', 'Cruise Schedule']
];

// Keep the mobile command bar focused on the daily operating path. Every other
// role-authorized module remains one tap away in the More sheet.
const mobilePrimaryRoutes = new Set(['dashboard', 'bookings', 'dispatch', 'calendar', 'chat']);
const mobilePrimaryNav = navItems.filter(([route]) => mobilePrimaryRoutes.has(route));
const mobileMoreNav = navItems.filter(([route]) => !mobilePrimaryRoutes.has(route));

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
  weatherRecords: [],
  weatherIntegration: { provider: 'Live Nassau Weather', sourceUrl: 'https://www.windy.com/?25.056,-77.352,5', latitude: 25.056, longitude: -77.352, status: 'Waiting for live sync', lastSyncAt: '' },
  payrollPayments: [],
  notifications: [],
  auditTrail: [],
  expenses: [],
  fuelRecords: [],
  incidentReports: [],
  checklistRecords: [],
  invoices: [],
  cruiseSchedule: [],
  cruiseScheduleIntegration: { provider: 'CruiseMapper', sourceUrl: 'https://www.cruisemapper.com/ports/nassau-port-27', status: 'Waiting for live sync', lastSyncAt: '' },
  uploadReviews: [],
  calendarState: { view: 'month', selectedDate: '' },
  inventory: [],
  dashboardPreferences: null,
  reminderHistory: [],
  photoNotes: [],
  maintenanceRecords: [],
  serviceRecords: [],
  users: [],
  chatConversations: [],
  chatMessages: [],
  chatReadReceipts: [],
  chatPreferences: { generalEnabled: true, directEnabled: true, showUnreadBadges: true },
  whatsappTemplates: [],
  whatsappQueue: [],
  whatsappSettings: { defaultCountryCode: '1', companyWhatsAppNumber: '', enableCustomerActions: true, enableCrewActions: true, businessApiStatus: 'Manual Mode', lastStatusCheckAt: '' },
  gmailImports: [],
  customerProfiles: [],
  gmailOAuthStatus: 'Not Connected',
  gmailConnectedAccount: '',
  lastSyncTime: '',
  syncCursor: '',
  importRules: [],
  sourceRules: [],
  gmailImportSettings: { enabled: false, allowedSources: ['Viator','GetYourGuide','Tripadvisor','Airbnb Experiences','Website Contact Form','Direct Customer Email','Unknown'], defaultImportAction: 'Save as Draft', duplicateDetectionStrictness: 'Standard', reviewRequiredBeforeSave: true },
  integrationStatus: { checkedAt: '', backendOnline: false, gmailConfigured: false, whatsappConfigured: false, release: '' },
  assistantProvider: 'Local Rule Based',
  assistantApiStatus: 'Local Only',
  externalAiEnabled: false,
  lastAssistantSync: '',
  assistantQueryLog: [],
  activeUserId: ''
};

const crudConfig = {
  bookings: {
    title: 'Bookings / Trips', eyebrow: 'One reservation and dispatch workflow', summary: 'Enter customer, tour, schedule, payment, vessel, and crew details once. A dated booking automatically creates its linked operational trip.', collection: 'bookings', addLabel: 'Create booking / trip',
    fields: [['order','Order #','text'], ['customer','Customer name','text'], ['phone','Phone number','tel'], ['email','Email','email'], ['date','Tour date','date'], ['time','Tour time','time'], ['hours','Tour hours','number'], ['product','Tour type','select:tourTypes'], ['guests','Guest count','number'], ['pickupLocation','Pickup location','select:pickupLocations'], ['source','Booking source','select:bookingSources'], ['price','Price','number'], ['deposit','Deposit paid','number'], ['balance','Balance due','number'], ['depositRequired','Deposit required','number'], ['status','Booking status','select:bookingStatus'], ['notes','Special requests / notes','textarea']],
    columns: [['order','Order'], ['customer','Customer'], ['date','Date'], ['time','Time'], ['guests','Guests'], ['product','Tour type'], ['price','Price'], ['balance','Balance'], ['status','Status']]
  },
  trips: {
    title: 'Trips', eyebrow: 'Daily operations', summary: 'Create trips, assign vessels and crew, detect assignment conflicts, and calculate separated owner/captain/mate payroll.', collection: 'trips', addLabel: 'Create trip',
    fields: [['customer','Customer name','text'], ['phone','Phone number','tel'], ['email','Email','email'], ['bookingSource','Booking source','select:bookingSources'], ['tripDate','Date','date'], ['startTime','Departure time','time'], ['passengers','Guest count','number'], ['hours','Hours','number'], ['tourType','Tour type','select:tourTypes'], ['tourPrice','Tour price','number'], ['depositPaid','Deposit paid','number'], ['balanceDue','Balance due','number'], ['vessel','Vessel','select:vessels'], ['captain','Captain','select:crew'], ['mate','Mate','select:crew'], ['status','Trip status','select:tripStatus'], ['fuelStartLevel','Fuel Start Level (gallons)','number'], ['fuelEndLevel','Fuel End Level (gallons)','number'], ['gallonsUsed','Gallons Used','number'], ['fuelPricePerGallon','Fuel Price Per Gallon','number'], ['fuelCostManualOverride','Manual Total Fuel Cost Override?','select:yesNo'], ['totalFuelCost','Total Fuel Cost','number'], ['fuelPaidBy','Fuel Paid By','select:crew'], ['createFuelExpense','Create Fuel Expense','select:yesNo'], ['fuelNotes','Fuel Notes','textarea'], ['passengerManifest','Passenger manifest (one passenger per line)','textarea'], ['notes','Notes','textarea']],
    columns: [['tripDate','Date'], ['startTime','Time'], ['customer','Customer'], ['passengers','Guests'], ['tourType','Tour type'], ['bookingSource','Source'], ['tourPrice','Price'], ['depositPaid','Deposit'], ['balanceDue','Balance'], ['vessel','Vessel'], ['captain','Captain'], ['mate','Mate'], ['status','Status'], ['gallonsUsed','Gallons Used'], ['totalFuelCost','Fuel Cost'], ['passengerManifest','Manifest']]
  },
  crew: {
    title: 'Crew', eyebrow: 'Simple CRUD', summary: 'Maintain the seeded crew roster, roles, and active status in the new app data layer.', collection: 'crew', addLabel: 'Add crew',
    fields: [['name','Name','text'], ['role','Role','text'], ['phone','Phone','tel'], ['email','Email','email'], ['active','Active','select:yesNo'], ['availability','Availability','select:crewAvailability'], ['notes','Notes','textarea']],
    columns: [['name','Name'], ['role','Role'], ['phone','Phone'], ['email','Email'], ['active','Active'], ['availability','Availability'], ['notes','Notes']]
  },
  vessels: {
    title: 'Vessels', eyebrow: 'Simple CRUD', summary: 'Manage boats and owner payout defaults from the documented legacy payout rules.', collection: 'vessels', addLabel: 'Add vessel',
    fields: [['name','Vessel Name','text'], ['model','Model / Description','text'], ['owner','Owner','select:owners'], ['capacity','Capacity','number'], ['status','Status','text'], ['assignedTrips','Assigned Trips','textarea'], ['maintenanceNotes','Maintenance Notes','textarea'], ['readinessSummary','Readiness Summary','textarea'], ['notes','Notes','textarea']],
    columns: [['name','Vessel Name'], ['model','Model / Description'], ['owner','Owner'], ['capacity','Capacity'], ['status','Status'], ['assignedTrips','Assigned Trips'], ['maintenanceNotes','Maintenance Notes'], ['readinessSummary','Readiness Summary'], ['notes','Notes']]
  },
  expenses: {
    title: 'Expenses', eyebrow: 'Operations costs', summary: 'Capture operating expenses, receipt/photo notes, approvals, and vessel cost alerts directly in the native operations app.', collection: 'expenses', addLabel: 'Add expense',
    fields: [['date','Expense date','date'], ['vessel','Vessel','select:vessels'], ['category','Category','select:expenseCategories'], ['description','Item / Description','text'], ['amount','Amount','number'], ['paidBy','Paid by','select:crew'], ['linkedTrip','Link to Trip','select:trips'], ['weekStart','Week Start for Payout','date'], ['addToPayout','Add to Payout This Week?','select:yesNo'], ['reimbursementStatus','Reimbursement Status','select:reimbursementStatus'], ['receiptNumber','Receipt / Reference #','text'], ['status','Status','select:expenseStatus'], ['receiptPhotos','Receipt/photo notes','textarea'], ['notes','Notes','textarea']],
    columns: [['date','Date'], ['vessel','Vessel'], ['category','Category'], ['amount','Amount'], ['paidBy','Paid by'], ['status','Status']]
  },
  invoices: {
    title: 'Create Invoice / Quote', eyebrow: 'Billing & confirmations', summary: 'Build a customer document once, then preview, send, and connect it to operations.', collection: 'invoices', addLabel: 'Create Invoice / Quote',
    fields: [['invoiceNumber','Document Number','text'], ['documentType','Document Type','select:documentTypes'], ['customerName','Customer Name','text'], ['phone','Phone Number','tel'], ['email','Email','email'], ['bookingSource','Booking Source','select:bookingSources'], ['tripDate','Trip Date','date'], ['startTime','Start Time','time'], ['returnTime','Return Time','time'], ['duration','Tour Duration','text'], ['tourType','Tour Type','select:tourTypes'], ['pickupLocation','Pickup Location','select:pickupLocations'], ['cruiseLine','Cruise Line','select:cruiseLines'], ['cruiseShip','Cruise Ship','select:cruiseShips'], ['guestCount','Guest Count','number'], ['vessel','Vessel','select:vessels'], ['captain','Captain','select:captains'], ['mate','Mate','select:mates'], ['baseTourPrice','Base Tour Price (Group Rate)','number'], ['swimmingPigsPrice','Swimming Pigs Unit Price','number'], ['swimmingPigsPeople','Swimming Pigs Quantity','number'], ['lunchPrice','Lunch Unit Price','number'], ['lunchPeople','Lunch Quantity','number'], ['otherAddOnName','Other Add-on Name','text'], ['otherAddOnPrice','Other Add-on Unit Price','number'], ['otherAddOnQuantity','Other Add-on Quantity','number'], ['secondBoat','Add Second Boat','select:yesNo'], ['secondBoatPrice','Second Boat Price','number'], ['tourPrice','Total Booking Cost','number'], ['depositPercent','Deposit Percent','number'], ['depositPaid','Deposit Paid','number'], ['balanceDue','Balance Due','number'], ['paymentStatus','Payment Status','select:paymentStatus'], ['paymentMethod','Payment Method','select:paymentMethods'], ['tripId','Link Invoice to Trip','select:trips'], ['bookingId','Link Invoice to Booking','select:bookings'], ['includedItems','Included in your tour','textarea'], ['whatToBring','What to bring','textarea'], ['meetingPoint','Meeting point','textarea'], ['meetingPointImage','Meeting point image placeholder','text'], ['customerSummary','Customer-Facing Summary','textarea'], ['notes','Notes','textarea']],
    columns: [['invoiceNumber','Invoice #'], ['customerName','Customer'], ['tripDate','Trip Date'], ['tourPrice','Total Price'], ['depositPaid','Deposit'], ['balanceDue','Balance'], ['paymentStatus','Payment Status'], ['vessel','Vessel']]
  },
  'cruise-schedule': {
    title: 'Cruise Schedule', eyebrow: 'Native ships in port', summary: 'Track cruise ship arrivals, departures, capacity, terminal, and upcoming port load inside the app.', collection: 'cruiseSchedule', addLabel: 'Create Cruise Entry',
    fields: [['shipName','Cruise Ship','select:cruiseShips'], ['cruiseLine','Cruise Line','select:cruiseLines'], ['departureDate','Cruise Departs','date'], ['returnDate','Cruise Returns','date'], ['arrivalDate','Nassau Arrival Date','date'], ['arrivalTime','Nassau Arrival Time','time'], ['departureTime','Nassau Departure Time','time'], ['passengerCapacity','Passenger Capacity','number'], ['terminalDock','Terminal / Dock','text'], ['facebookSearchTerm','Facebook Search Term','text'], ['postedStatus','Posted?','select:postedStatus'], ['opportunityStatus','Opportunity Status','select:opportunityStatus'], ['notes','Notes','textarea']],
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


const voiceSupportedRoutes = new Set(['dashboard', 'bookings', 'trips', 'invoices', 'calendar', 'captain-dashboard', 'mate-dashboard', 'owner-dashboard', 'vessels', 'crew', 'payroll', 'expenses', 'inventory', 'incident-reports', 'pre-trip-checklist', 'post-trip-checklist', 'cruise-schedule', 'reports', 'settings']);

const dashboardCardCatalog = [
  ['todayTrips', "Today's Trips"], ['readyTrips', 'Ready Trips'], ['needsAttention', 'Trips Needing Attention'], ['outstandingBalances', 'Outstanding Balances'],
  ['unreadAlerts', 'Unread Alerts'], ['crewAssignments', 'Crew Assignments'], ['preTripMissing', 'Checklist Reminders'], ['postTripMissing', 'Post Trip Missing'],
  ['unreadChat', 'Unread Chat Messages'], ['stockAlerts', 'Stock Alerts'], ['payrollOwed', 'Payroll Owed'], ['expenses', 'Expenses'], ['calendarSummary', 'Calendar Summary'],
  ['revenueSummary', 'Revenue Summary'], ['incidentAlerts', 'Incident Alerts'], ['upcomingTours', 'Upcoming Tours'], ['upcomingCruiseArrivals', 'Upcoming Cruise Arrivals']
];
const defaultDashboardPreferences = {
  order: dashboardCardCatalog.map(([key]) => key),
  hidden: dashboardCardCatalog.map(([key]) => key).filter((key) => !['todayTrips', 'readyTrips', 'needsAttention', 'outstandingBalances', 'unreadAlerts', 'preTripMissing'].includes(key))
};
const intakeRoutes = new Set(['bookings', 'invoices', 'trips', 'calendar', 'expenses', 'incident-reports', 'pre-trip-checklist', 'post-trip-checklist', 'reports']);
const photoNoteRoutes = new Set(['bookings', 'invoices', 'trips', 'captain-dashboard', 'mate-dashboard', 'owner-dashboard', 'pre-trip-checklist', 'post-trip-checklist', 'incident-reports', 'maintenance', 'expenses', 'vessels', 'crew']);

/* Phase 6I: WhatsApp Integration Framework — manual share links only; no Business API connection. */
const WHATSAPP_VARIABLES = ['Customer Name','Trip Date','Start Time','End Time','Tour Type','Guest Count','Vessel','Captain','Mate','Meeting Point','Balance Due','Deposit Paid','Payment Link','Cruise Ship','All Aboard Time','Weather Risk','Checklist Link','Invoice Link','Receipt Link'];
const WHATSAPP_STATUSES = ['Draft','Ready','Opened in WhatsApp','Sent Manually','Failed','Cancelled'];
const DEFAULT_WHATSAPP_TEMPLATES = [
  ['Customer Booking Confirmation','Hi {{Customer Name}}, your {{Tour Type}} is confirmed for {{Trip Date}} at {{Start Time}} aboard {{Vessel}}. Meeting point: {{Meeting Point}}.'],
  ['Quote Follow Up','Hi {{Customer Name}}, we are following up on your {{Tour Type}} quote. View it here: {{Invoice Link}}'],
  ['Invoice / Payment Reminder','Hi {{Customer Name}}, this is a friendly reminder that {{Balance Due}} remains due for your trip. Pay here: {{Payment Link}}'],
  ['Trip Reminder','Hi {{Customer Name}}, your {{Tour Type}} is on {{Trip Date}} from {{Start Time}} to {{End Time}}. We look forward to welcoming you!'],
  ['Meeting Point Message','Hi {{Customer Name}}, please meet us at {{Meeting Point}} on {{Trip Date}} by {{Start Time}}.'],
  ['Captain Assignment','Hi {{Captain}}, you are assigned to {{Tour Type}} aboard {{Vessel}} on {{Trip Date}} at {{Start Time}}.'],
  ['Mate Assignment','Hi {{Mate}}, you are assigned to {{Tour Type}} aboard {{Vessel}} on {{Trip Date}} at {{Start Time}}.'],
  ['Owner Assignment Alert','Owner alert: {{Vessel}} is assigned to {{Tour Type}} on {{Trip Date}} at {{Start Time}}.'],
  ['Pre Trip Checklist Reminder','Pre-trip checklist reminder for {{Vessel}} on {{Trip Date}}: {{Checklist Link}}'],
  ['Post Trip Checklist Reminder','Post-trip checklist reminder for {{Vessel}} on {{Trip Date}}: {{Checklist Link}}'],
  ['Incident Alert','Incident alert for {{Vessel}} / {{Tour Type}} on {{Trip Date}}. Please review the related incident report.'],
  ['Weather Alert','Weather alert for {{Trip Date}}: {{Weather Risk}}. Review conditions before departure.'],
  ['Cruise Timing Alert','Cruise timing alert for {{Customer Name}} aboard {{Cruise Ship}}. All aboard time: {{All Aboard Time}}.'],
  ['Payment Receipt','Hi {{Customer Name}}, thank you. Deposit paid: {{Deposit Paid}}. Receipt: {{Receipt Link}}'],
  ['Owner Payout Statement','Owner payout statement for {{Vessel}} / {{Trip Date}} is ready. Receipt: {{Receipt Link}}']
].map(([category, body]) => ({ id: `wa-template-${category.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`, category, body, updatedAt: '' }));

let store = loadStore();
let currentRoute = 'dashboard';
let editing = {};
let pendingFuelReceipt = null;
let deferredInstallPrompt = null;
let voiceRecognition = null;
let assignmentViewMode = 'tree';
let voiceCommand = { state: 'IDLE', route: '', field: null, form: null, lastValue: '', message: 'Command Voice Fill idle.', suggestions: [] };
let voiceAssistantOpen = false;
let dashboardFilters = { captain: '', mate: '', owner: '' };
let activeChatConversationId = 'chat-general';
let chatMobileThreadOpen = false;
let chatFilters = { search: '', person: '', role: '' };
let assistantState = { query: '', result: null };

function loadStore() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) return seedStore();
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Stored operations data is not an object.');
    localStorage.setItem(STORE_BACKUP_KEY, raw);
    return migrateStore(parsed);
  } catch (error) {
    console.error('Local operations data could not be migrated; preserving it for recovery.', error);
    localStorage.setItem(STORE_RECOVERY_KEY, raw);
    const backup = localStorage.getItem(STORE_BACKUP_KEY);
    if (backup && backup !== raw) {
      try { return migrateStore(JSON.parse(backup)); } catch (backupError) { console.error('Backup recovery failed.', backupError); }
    }
    return seedStore({ migrationWarning: 'Existing local data was preserved in recovery storage because it could not be read.' });
  }
}

function seedStore(existing = {}) {
  const next = migrateStore({ ...structuredClone(seedData), ...existing });
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}

function migrateStore(existing = {}) {
  const next = { ...structuredClone(seedData), ...existing, version: STORE_VERSION, updatedAt: existing.updatedAt || new Date().toISOString() };
  const preserveArray = (primary, ...legacyKeys) => {
    if (Array.isArray(next[primary])) return next[primary];
    const legacy = legacyKeys.map((key) => next[key]).find(Array.isArray);
    return legacy ? legacy : [];
  };
  next.bookings = preserveArray('bookings').map(normalizeBooking);
  next.customerProfiles = preserveArray('customerProfiles', 'customers');
  next.chatConversations = preserveArray('chatConversations', 'conversations');
  next.chatMessages = preserveArray('chatMessages', 'messages');
  next.chatReadReceipts = preserveArray('chatReadReceipts', 'readReceipts');
  next.payrollPayments = preserveArray('payrollPayments', 'payrollReceipts');
  next.maintenanceRecords = preserveArray('maintenanceRecords', 'maintenance');
  next.serviceRecords = preserveArray('serviceRecords', 'maintenanceServiceRecords');
  next.fuelRecords = preserveArray('fuelRecords', 'fuel');
  next.incidentReports = preserveArray('incidentReports', 'incidents');
  next.weatherRecords = preserveArray('weatherRecords', 'weather');
  next.cruiseSchedule = preserveArray('cruiseSchedule', 'cruise');
  next.assistantQueryLog = preserveArray('assistantQueryLog', 'operationsAssistantLog');
  next.calendarState = next.calendarState && typeof next.calendarState === 'object' && !Array.isArray(next.calendarState) ? next.calendarState : { view: 'month', selectedDate: '' };
  next.weatherRecords = (Array.isArray(next.weatherRecords) ? next.weatherRecords : []).map(normalizeWeatherRecord);
  next.weatherIntegration = { ...seedData.weatherIntegration, ...(next.weatherIntegration || {}) };
  next.payrollPayments = Array.isArray(next.payrollPayments) ? next.payrollPayments : [];
  next.notifications = (Array.isArray(next.notifications) ? next.notifications : []).map(normalizeNotification);
  next.auditTrail = Array.isArray(next.auditTrail) ? next.auditTrail : [];
  next.whatsappTemplates = normalizeWhatsAppTemplates(next.whatsappTemplates);
  next.whatsappQueue = Array.isArray(next.whatsappQueue) ? next.whatsappQueue : [];
  next.whatsappSettings = { defaultCountryCode: '1', companyWhatsAppNumber: '', enableCustomerActions: true, enableCrewActions: true, businessApiStatus: 'Manual Mode', lastStatusCheckAt: '', ...(next.whatsappSettings || {}) };
  next.gmailImports = Array.isArray(next.gmailImports) ? next.gmailImports : [];
  next.customerProfiles = Array.isArray(next.customerProfiles) ? next.customerProfiles : [];
  next.gmailOAuthStatus = next.gmailOAuthStatus || 'Not Connected';
  next.gmailConnectedAccount = next.gmailConnectedAccount || '';
  next.lastSyncTime = next.lastSyncTime || '';
  next.syncCursor = next.syncCursor || '';
  next.importRules = Array.isArray(next.importRules) ? next.importRules : [];
  next.sourceRules = Array.isArray(next.sourceRules) ? next.sourceRules : [];
  next.gmailImportSettings = { enabled: false, allowedSources: ['Viator','GetYourGuide','Tripadvisor','Airbnb Experiences','Website Contact Form','Direct Customer Email','Unknown'], defaultImportAction: 'Save as Draft', duplicateDetectionStrictness: 'Standard', reviewRequiredBeforeSave: true, ...(next.gmailImportSettings || {}) };
  next.gmailImportSettings.reviewRequiredBeforeSave = true;
  next.integrationStatus = { checkedAt: '', backendOnline: false, gmailConfigured: false, whatsappConfigured: false, release: '', ...(next.integrationStatus || {}) };
  next.assistantProvider = next.assistantProvider || 'Local Rule Based';
  next.assistantApiStatus = next.assistantApiStatus || 'Local Only';
  next.externalAiEnabled = false;
  next.lastAssistantSync = next.lastAssistantSync || '';
  next.assistantQueryLog = Array.isArray(next.assistantQueryLog) ? next.assistantQueryLog : [];
  next.expenses = Array.isArray(next.expenses) ? next.expenses : [];
  next.fuelRecords = Array.isArray(next.fuelRecords) ? next.fuelRecords : [];
  next.incidentReports = (Array.isArray(next.incidentReports) ? next.incidentReports : []).map(normalizeIncidentRecord);
  next.checklistRecords = Array.isArray(next.checklistRecords) ? next.checklistRecords : [];
  next.invoices = Array.isArray(next.invoices) ? next.invoices : [];
  next.cruiseSchedule = Array.isArray(next.cruiseSchedule) ? next.cruiseSchedule : [];
  next.cruiseScheduleIntegration = { ...seedData.cruiseScheduleIntegration, ...(next.cruiseScheduleIntegration || {}) };
  next.uploadReviews = Array.isArray(next.uploadReviews) ? next.uploadReviews : [];
  next.uploadReviews = next.uploadReviews.map((review) => ({ documentType: 'Unknown', userReviewRequired: true, reviewStatus: 'Pending Review', ...review }));
  next.calendarState = next.calendarState || { view: 'month', selectedDate: '' };
  next.inventory = normalizeInventory(Array.isArray(next.inventory) ? next.inventory : []);
  next.dashboardPreferences = normalizeDashboardPreferences(next.dashboardPreferences);
  next.reminderHistory = Array.isArray(next.reminderHistory) ? next.reminderHistory : [];
  next.photoNotes = Array.isArray(next.photoNotes) ? next.photoNotes : [];
  next.maintenanceRecords = normalizeMaintenanceRecords(next.maintenanceRecords);
  next.serviceRecords = (Array.isArray(next.serviceRecords) ? next.serviceRecords : []).filter((record) => isMaintenanceVessel(record.vessel));
  next.users = migrateUsers(Array.isArray(next.users) ? next.users : [], next.crew, next.vessels);
  next.chatPreferences = { generalEnabled: true, directEnabled: true, showUnreadBadges: true, ...(next.chatPreferences || {}) };
  next.chatConversations = Array.isArray(next.chatConversations) ? next.chatConversations : [];
  if (!next.chatConversations.some((conversation) => conversation.id === 'chat-general')) next.chatConversations.unshift({ id: 'chat-general', type: 'general', title: 'General Chat', participantUserIds: next.users.filter((user) => user.active !== false).map((user) => user.id), createdAt: new Date().toISOString(), metadata: { scope: 'company' } });
  next.chatMessages = Array.isArray(next.chatMessages) ? next.chatMessages : [];
  next.chatReadReceipts = Array.isArray(next.chatReadReceipts) ? next.chatReadReceipts : [];
  next.activeUserId = next.users.some((user) => user.id === next.activeUserId && user.active !== false) ? next.activeUserId : (next.users.find((user) => user.role === 'Admin' && user.active !== false)?.id || next.users.find((user) => user.active !== false)?.id || '');
  next.vessels = (Array.isArray(next.vessels) ? next.vessels : []).map((vessel) => ({ ...vessel, readinessStatus: vessel.readinessStatus || vessel.status || 'Operational' }));
  next.trips = (Array.isArray(next.trips) ? next.trips : []).map((trip) => normalizeTrip(trip));
  reconcileExistingWorkflow(next);
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}



function migrateUsers(existingUsers = [], crew = [], vessels = []) {
  const byLink = new Map(existingUsers.map((user) => [user.linkedCrewProfileId || `owner:${user.linkedVesselOwnerProfileId || ''}`, user]));
  const users = existingUsers.map((user) => ({ phone: '', email: '', active: true, linkedCrewProfileId: '', linkedVesselOwnerProfileId: '', demoPin: '', lastLoginAt: '', metadata: {}, ...user }));
  if (!users.some((user) => user.role === 'Admin')) users.unshift({ id: 'user-admin', name: 'Operations Admin', role: 'Admin', phone: '', email: 'admin@reeladventure.demo', active: true, linkedCrewProfileId: '', linkedVesselOwnerProfileId: '', demoPin: '0000', lastLoginAt: '', metadata: { source: 'seed' } });
  if (!users.some((user) => user.role === 'Mate')) users.push({ id: 'user-mate-demo', name: 'Demo Mate', role: 'Mate', phone: '', email: 'mate@reeladventure.demo', active: true, linkedCrewProfileId: '', linkedVesselOwnerProfileId: '', demoPin: '0000', lastLoginAt: '', metadata: { source: 'seed' } });
  if (!users.some((user) => user.role === 'Bookkeeper')) users.push({ id: 'user-bookkeeper', name: 'Demo Bookkeeper', role: 'Bookkeeper', phone: '', email: 'bookkeeper@reeladventure.demo', active: true, linkedCrewProfileId: '', linkedVesselOwnerProfileId: '', demoPin: '0000', lastLoginAt: '', metadata: { source: 'seed' } });
  crew.forEach((person) => {
    if (byLink.has(person.id) || users.some((user) => user.linkedCrewProfileId === person.id)) return;
    const role = ['Captain', 'Mate'].includes(person.role) ? person.role : 'Captain';
    users.push({ id: `user-${person.id}`, name: person.name, role, phone: person.phone || '', email: person.email || '', active: person.active !== 'No', linkedCrewProfileId: person.id, linkedVesselOwnerProfileId: '', demoPin: '0000', lastLoginAt: '', metadata: { source: 'crew' } });
  });
  [...new Set(vessels.map((vessel) => vessel.owner).filter(Boolean))].forEach((owner) => {
    if (users.some((user) => user.role === 'Owner' && user.name === owner)) return;
    users.push({ id: `user-owner-${owner.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, name: owner, role: 'Owner', phone: '', email: '', active: true, linkedCrewProfileId: '', linkedVesselOwnerProfileId: owner, demoPin: '0000', lastLoginAt: '', metadata: { source: 'vesselOwner' } });
  });
  return users;
}

function normalizeDashboardPreferences(prefs = defaultDashboardPreferences) {
  prefs = prefs || defaultDashboardPreferences;
  const keys = dashboardCardCatalog.map(([key]) => key);
  const order = Array.isArray(prefs.order) ? [...prefs.order.filter((key) => keys.includes(key)), ...keys.filter((key) => !prefs.order.includes(key))] : [...keys];
  const hidden = Array.isArray(prefs.hidden) ? prefs.hidden.filter((key) => keys.includes(key)) : [];
  return { order, hidden };
}

function dashboardCardLabel(key) {
  return dashboardCardCatalog.find(([itemKey]) => itemKey === key)?.[1] || key;
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

function normalizeBooking(booking = {}) {
  const price = Number(booking.price ?? booking.tourPrice ?? 0);
  const deposit = Number(booking.deposit ?? booking.depositPaid ?? 0);
  return {
    ...booking,
    customer: booking.customer || booking.customerName || '',
    date: booking.date || booking.tripDate || '',
    time: booking.time || booking.startTime || '',
    product: booking.product || booking.tourType || '',
    guests: Number(booking.guests ?? booking.guestCount ?? booking.passengers ?? 0),
    source: booking.source || booking.bookingSource || '',
    pickupLocation: booking.pickupLocation || booking.meetingPoint || '',
    price,
    deposit,
    balance: Number(booking.balance ?? booking.balanceDue ?? Math.max(price - deposit, 0)),
    status: booking.status || 'Draft'
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

function normalizeWeatherRecord(record = {}) {
  return {
    id: record.id || makeId('weather'), date: record.date || '', time: record.time || '', location: 'Nassau, Bahamas',
    windSpeed: Number(record.windSpeed || 0), windGusts: Number(record.windGusts || 0), rainChance: Number(record.rainChance || 0),
    stormRisk: record.stormRisk || 'Low', seaConditions: record.seaConditions || 'Calm', visibility: record.visibility || 'Good',
    notes: record.notes || '', weatherSource: record.weatherSource || 'Local Manual', lastUpdated: record.lastUpdated || new Date().toISOString(),
    apiProvider: record.apiProvider || '', forecastId: record.forecastId || ''
  };
}

function weatherConditionRisk(condition = {}) {
  const wind = Number(condition.windSpeed || 0), gusts = Number(condition.windGusts || 0), rain = Number(condition.rainChance || 0);
  const storm = String(condition.stormRisk || '').toLowerCase(), sea = String(condition.seaConditions || '').toLowerCase(), visibility = String(condition.visibility || '').toLowerCase();
  if (wind >= 25 || gusts >= 35 || rain >= 80 || ['high', 'severe'].includes(storm) || /rough|dangerous|very rough/.test(sea) || /poor|low/.test(visibility)) return 'Red';
  if (wind >= 15 || gusts >= 22 || rain >= 40 || ['medium', 'moderate'].includes(storm) || /moderate|choppy|swells/.test(sea) || /fair|reduced/.test(visibility)) return 'Yellow';
  return 'Green';
}
function weatherRiskLabel(level) { return level === 'Red' ? 'High Risk' : level === 'Yellow' ? 'Monitor' : 'Safe'; }
function weatherRiskClass(level) { return level === 'Red' ? 'red' : level === 'Yellow' ? 'gold' : 'green'; }
function minutesFromTime(value = '') { const [h, m] = String(value).split(':').map(Number); return Number.isFinite(h) ? h * 60 + (m || 0) : 0; }
function weatherConditionsForTrip(trip = {}) {
  const start = minutesFromTime(trip.startTime), end = start + Number(trip.hours || 4) * 60;
  const sameDay = (store.weatherRecords || []).filter((record) => record.date === trip.tripDate);
  const duringTrip = sameDay.filter((record) => { const at = minutesFromTime(record.time); return at >= start && at <= end; });
  return (duringTrip.length ? duringTrip : sameDay).sort((a, b) => Math.abs(minutesFromTime(a.time) - start) - Math.abs(minutesFromTime(b.time) - start));
}
function weatherForTrip(trip = {}) { return weatherConditionsForTrip(trip).sort((a, b) => ['Green','Yellow','Red'].indexOf(weatherConditionRisk(b)) - ['Green','Yellow','Red'].indexOf(weatherConditionRisk(a)))[0] || null; }
function tripWeatherRisk(trip = {}) { const condition = weatherForTrip(trip); return condition ? weatherConditionRisk(condition) : 'Yellow'; }
function weatherRiskBadge(trip) { const level = tripWeatherRisk(trip); return `<span class="badge weather-risk-badge ${weatherRiskClass(level)}" title="Trip weather risk">🌦️ ${weatherRiskLabel(level)}</span>`; }
function weatherDetailsCard(trip, compact = false) {
  const condition = weatherForTrip(trip), level = tripWeatherRisk(trip);
  if (!condition) return `<details class="weather-details-card" ${compact ? '' : 'open'}><summary>${weatherRiskBadge(trip)}<span>Live Nassau forecast is loading</span></summary></details>`;
  const daily = dailyWeatherSummary(trip.tripDate);
  return `<details class="weather-details-card ${weatherRiskClass(level)}" ${compact ? '' : 'open'}><summary>${weatherRiskBadge(trip)}<span>Nassau, Bahamas · ${escapeHtml(formatDate(trip.tripDate))}</span></summary><div class="weather-detail-grid"><span><small>Wind range</small><strong>${daily?.windMin ?? condition.windSpeed}–${daily?.windMax ?? condition.windSpeed} kt</strong></span><span><small>Maximum gust</small><strong>${daily?.gustMax ?? condition.windGusts} kt</strong></span><span><small>Rain chance</small><strong>Up to ${daily?.rainMax ?? condition.rainChance}%</strong></span><span><small>Sea conditions</small><strong>${escapeHtml(daily?.seas || condition.seaConditions)}</strong></span></div><small>${escapeHtml(condition.weatherSource)} · Updated ${escapeHtml(new Date(condition.lastUpdated).toLocaleString())}</small></details>`;
}
function weatherSummaryCards(trips = store.trips || []) {
  const counts = { Green: 0, Yellow: 0, Red: 0 }; trips.filter((trip) => trip.status !== 'Cancelled').forEach((trip) => counts[tripWeatherRisk(trip)]++);
  return `<div class="grid kpi-grid weather-summary-cards">${kpi('Trips Safe', counts.Green, 'Green weather risk')}${kpi('Trips To Monitor', counts.Yellow, 'Yellow weather risk')}${kpi('High Risk Trips', counts.Red, 'Red weather risk')}</div>`;
}
function renderWeatherAlertPanel(trips = store.trips || []) {
  const risks = trips.filter((trip) => ['Yellow','Red'].includes(tripWeatherRisk(trip)));
  return `<details class="card weather-alert-panel app-accordion" open><summary><h3>Weather Alerts</h3><span class="badge ${risks.some((trip) => tripWeatherRisk(trip) === 'Red') ? 'red' : risks.length ? 'gold' : 'green'}">${risks.length} review</span></summary><div class="stat-list">${risks.length ? risks.slice(0, 8).map((trip) => `<div class="stat-row"><span>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(trip.customer || 'Trip')}</span><strong>${weatherRiskBadge(trip)}</strong></div>`).join('') : '<p class="empty-state">No Yellow or Red trip weather risks.</p>'}</div></details>`;
}
function generateWeatherAlerts() {
  (store.trips || []).filter((trip) => ['Yellow','Red'].includes(tripWeatherRisk(trip))).forEach((trip) => {
    const level = tripWeatherRisk(trip), key = `weather-${trip.id}-${level}`;
    if ((store.notifications || []).some((notice) => notice.metadata?.weatherAlertKey === key)) return;
    addNotification(`Weather ${weatherRiskLabel(level)}: ${trip.customer || 'Trip'}`, `${formatDate(trip.tripDate)} ${formatTime(trip.startTime)} · ${weatherForTrip(trip)?.notes || 'Review conditions before departure.'}`, level === 'Red' ? 'critical' : 'warning', { category: 'Weather', tripId: trip.id, weatherAlertKey: key, vessel: trip.vessel });
  });
}
function openExternalSource(url) { window.open(url, '_blank', 'noopener,noreferrer'); }
function integrationIsStale(integration, minutes = 30) { return !integration.lastSyncAt || Date.now() - new Date(integration.lastSyncAt).getTime() > minutes * 60000; }
function weatherSyncStatusLabel(cacheStatus, count) {
  const labels = { 'fresh': 'Live', 'fresh-cache': 'Cached', 'stale-cache': 'Cached', 'fallback': 'Fallback' };
  return `${labels[cacheStatus] || 'Live'} · ${count} forecasts`;
}
function cruiseSyncStatusLabel(cacheStatus, count) {
  const labels = { 'fresh': 'Live', 'fresh-cache': 'Cached', 'stale-cache': 'Cached', 'unavailable': 'Unavailable' };
  return `${labels[cacheStatus] || 'Live'} · ${count} arrivals`;
}
async function refreshLiveWeather(silent = false) {
  const integration = store.weatherIntegration;
  if (integration.status === 'Refreshing') return;
  integration.status = 'Refreshing';
  saveStore();
  try {
    const response = await fetch('/api/weather/nassau', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Weather service returned ${response.status}`);
    const data = await response.json();
    const imported = (data.records || []).map(normalizeWeatherRecord);
    store.weatherRecords = [...imported, ...store.weatherRecords.filter((record) => !['Windy','Windy GFS','Open-Meteo','MET Norway','Fallback Nassau Weather'].includes(record.apiProvider))];
    integration.provider = data.provider || 'Live Nassau Weather';
    integration.status = weatherSyncStatusLabel(data.cacheStatus, imported.length);
    integration.lastSyncAt = data.updatedAt || new Date().toISOString();
    generateWeatherAlerts(); saveStore(); if (['dashboard','captain-dashboard','mate-dashboard','owner-dashboard'].includes(currentRoute)) renderRoute(currentRoute); if (!silent) toast(`${integration.provider} Nassau forecast refreshed.`);
  } catch (error) {
    integration.status = 'Live service unavailable';
    saveStore(); if (!silent) toast(`Weather refresh failed: ${error.message}`);
  }
}
function dailyWeatherSummary(date) {
  const records = (store.weatherRecords || []).filter((record) => record.date === date);
  if (!records.length) return null;
  const values = (key) => records.map((record) => Number(record[key] || 0));
  const risks = records.map(weatherConditionRisk);
  const worst = risks.includes('Red') ? 'Red' : risks.includes('Yellow') ? 'Yellow' : 'Green';
  return {
    date, count: records.length, risk: worst,
    windMin: Math.min(...values('windSpeed')), windMax: Math.max(...values('windSpeed')),
    gustMax: Math.max(...values('windGusts')), rainMax: Math.max(...values('rainChance')),
    seas: [...new Set(records.map((record) => record.seaConditions).filter(Boolean))].join(' to '),
    provider: records[0].apiProvider || records[0].weatherSource || store.weatherIntegration.provider
  };
}
async function mountBoatBookerWeatherWidget() {
  const hosts = [...document.querySelectorAll('.page.active [data-boatbooker-weather-widget]')];
  if (!hosts.length) return;
  try {
    await loadScriptOnce('/api/widget/boatbooker-weather.js', 'boatbooker-weather-builder');
    if (window.renderCaptainWeatherWidget) hosts.forEach((host) => window.renderCaptainWeatherWidget(39712, 'imperial', 'small', true, host));
  } catch (error) {
    console.warn('BoatBooker weather widget unavailable.', error);
  }
}
function renderDashboardWeatherWidget() {
  const days = [...new Set((store.weatherRecords || []).map((record) => record.date).filter(Boolean))].sort().slice(0, 7).map(dailyWeatherSummary).filter(Boolean);
  return `<div class="card boatbooker-weather-card dashboard-weather-widget"><div class="card-header"><div><p class="eyebrow">Live Nassau weather</p><h3>7-Day Marine Forecast</h3><p>Nassau, Bahamas · Date-based operating outlook</p></div><div class="weather-header-actions"><span class="integration-status">${escapeHtml(store.weatherIntegration.status)}</span><button class="btn btn-outline btn-small" type="button" onclick="refreshLiveWeather()">Refresh</button></div></div><div class="native-weather-forecast">${days.length ? days.map((day, index) => `<article class="native-weather-day ${weatherRiskClass(day.risk)}"><div><span>${index === 0 ? 'Today' : escapeHtml(new Date(`${day.date}T12:00:00`).toLocaleDateString([], { weekday: 'short' }))}</span><strong>${escapeHtml(formatDate(day.date))}</strong></div><b class="weather-condition-icon">${day.risk === 'Red' ? '!' : day.risk === 'Yellow' ? '~' : '✓'}</b><dl><div><dt>Wind</dt><dd>${day.windMin}–${day.windMax} kt</dd></div><div><dt>Gusts</dt><dd>${day.gustMax} kt</dd></div><div><dt>Rain</dt><dd>${day.rainMax}%</dd></div><div><dt>Sea</dt><dd>${escapeHtml(day.seas || 'Review')}</dd></div></dl><span class="badge ${weatherRiskClass(day.risk)}">${escapeHtml(weatherRiskLabel(day.risk))}</span></article>`).join('') : '<div class="weather-loading-state"><strong>Loading Nassau forecast</strong><span>Live marine conditions will appear here when the weather service responds.</span><button class="btn btn-outline btn-small" type="button" onclick="refreshLiveWeather()">Load Forecast</button></div>'}</div><footer class="weather-source-footer"><span>Forecast: ${escapeHtml(store.weatherIntegration.provider || 'Live Nassau Weather')}</span><a href="https://boatbooker.com" target="_blank" rel="noopener">BoatBooker weather source</a></footer></div>`;
}
function activateDashboardWeatherWidget() {
  if (integrationIsStale(store.weatherIntegration)) setTimeout(() => refreshLiveWeather(true), 0);
}
function saveStore() {
  store.updatedAt = new Date().toISOString();
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function currentUser() { return store.users?.find((user) => user.id === store.activeUserId) || store.users?.[0] || { id: '', name: 'Demo user', role: 'Admin' }; }
function currentUserLabel() { const user = currentUser(); return `${user.name} · ${user.role}`; }


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

function canViewStockAlerts() {
  const label = currentUserLabel().toLowerCase();
  return label.includes('admin') || (label.includes('owner') && !label.includes('operations manager'));
}

function isStockAlertNotice(notice = {}) {
  const text = `${notice.title || ''} ${notice.message || ''} ${notice.category || ''}`.toLowerCase();
  return notice.category === 'Inventory' || /low stock|stock level|restock|inventory/.test(text) || Boolean(notice.metadata?.itemId);
}

function visibleNotifications(notices = store.notifications || []) {
  return canViewStockAlerts() ? notices : notices.filter((notice) => !isStockAlertNotice(notice));
}

function unreadNotificationCount() {
  return visibleNotifications().filter((notice) => !notice.read).length;
}

function money(value) { return Number(value || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: Number(value || 0) % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
function byDate(a, b) { return String(a.date || a.tripDate).localeCompare(String(b.date || b.tripDate)); }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
function makeId(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`; }
function getOptions(kind) {
  const maps = {
    bookingSources: ['Direct', 'Website', 'Phone', 'WhatsApp', 'Viator', 'GetYourGuide', 'Tripadvisor', 'Airbnb Experiences', 'Referral', 'Hotel Concierge', 'Travel Agent', 'Other', ...store.bookingSources.map((s) => s.name)].filter((v, i, a) => a.indexOf(v) === i),
    bookingStatus: ['Draft', 'Pending Deposit', 'Confirmed', 'Scheduled', 'Completed', 'Cancelled'],
    tripStatus: ['Scheduled', 'Completed', 'Needs review', 'Cancelled'],
    yesNo: ['Yes', 'No'],
    owners: [...new Set([...store.vessels.map((v) => v.owner), ...store.vesselOwnerPayoutRates.map((r) => r.owner)])].filter(Boolean),
    vessels: store.vessels.map((v) => v.name),
    captains: store.crew.filter((c) => c.active !== 'No' && /captain/i.test(c.role || '')).map((c) => c.name),
    mates: store.crew.filter((c) => c.active !== 'No' && /mate/i.test(c.role || '')).map((c) => c.name),
    crew: store.crew.filter((c) => c.active !== 'No').map((c) => c.name),
    crewOptional: ['None', ...store.crew.filter((c) => c.active !== 'No').map((c) => c.name)],
    crewAvailability: ['Available', 'Unavailable'],
    vesselReadiness: ['Operational', 'Needs Review', 'Out of Service', 'Maintenance Hold'],
    expenseCategories: ['Fuel', 'Ice', 'Supplies', 'Maintenance', 'Dockage', 'Reimbursement', 'Other'],
    expenseStatus: ['Submitted', 'Approved', 'Paid', 'Needs Review'],
    reimbursementStatus: ['Outstanding (not yet reimbursed)', 'Paid / Reimbursed', 'Track only'],
    incidentSeverity: ['Low', 'Medium', 'High', 'Critical'],
    incidentCategories: ['Vessel Damage', 'Customer Injury', 'Crew Injury', 'Guest Complaint', 'Mechanical Issue', 'Weather Event', 'Late Departure', 'Missed Departure', 'Fuel Issue', 'Safety Issue', 'Property Damage', 'Refund Issued', 'Other'],
    incidentStatus: ['Open', 'Under Review', 'Resolved', 'Closed'],
    trips: store.trips.map((t) => `${t.id}|${formatDate(t.tripDate)} ${t.startTime || ''} ${t.customer || 'Trip'}`),
    bookings: store.bookings.map((b) => `${b.id}|${formatDate(b.date)} ${b.time || ''} ${b.customer || 'Booking'}`),
    paymentStatus: ['Quote', 'Deposit Due', 'Deposit Paid', 'Balance Due', 'Paid in Full', 'Refunded', 'Cancelled'],
    paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'PayPal', 'Zelle', 'Cash App', 'Website Payment', 'Viator', 'GetYourGuide', 'Tripadvisor', 'Other'],
    documentTypes: ['Quote', 'Invoice', 'Tour Confirmation', 'Booking Confirmation', 'Receipt'],
    pickupLocations: ['Woodes Rodgers Walk', 'Montague Dock', "Jimmy Buffett’s Margaritaville", 'Paradise Island Ferry Terminal', 'Other'],
    tourTypes: ['4 Hour Private Island Excursion', '6 Hour Private Island Excursion', '8 Hour Private Island Excursion', 'Custom Private Charter', 'Other'],
    cruiseLines: ['Royal Caribbean', 'Carnival', 'Norwegian', 'Disney Cruise Line', 'MSC Cruises', 'Celebrity Cruises', 'Virgin Voyages', 'Princess Cruises', 'Holland America', 'Other'],
    cruiseShips: ['Adventure of the Seas', 'Allure of the Seas', 'Carnival Celebration', 'Disney Wish', 'MSC Seashore', 'Norwegian Escape', 'Other'],
    postedStatus: ['Not Posted', 'Posted', 'Needs Follow-up'],
    opportunityStatus: ['Opportunity', 'Booked', 'Watched', 'Closed'],
    checklistStatus: ['Draft', 'Submitted', 'Needs Review'],
    inventoryStatus: ['In Stock', 'Low Stock', 'Restock Needed', 'Empty'],
    inventoryCategories: ['Beverages', 'Cleaning Products', 'Safety Gear', 'Consumables', 'Vessel Supplies', 'Fuel']
  };
  return maps[kind] || [];
}

function init() {
  renderLoginUsers();
  renderNav();
  wireEvents();
  let lastVoiceScroll = 0; window.addEventListener('scroll', () => { const fab = document.querySelector('.voice-fab'); const current = window.scrollY; fab?.classList.toggle('auto-minimized', current > lastVoiceScroll && current > 80); lastVoiceScroll = current; }, { passive: true });
  generateChecklistReminders();
  generateWeatherAlerts();
  generateMaintenanceNotifications();
  saveStore();
  renderRoute('dashboard');
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js').catch(console.warn);
  refreshIntegrationStatus({ silent: true });
}

function renderLoginUsers() {
  const select = document.getElementById('userSelect');
  if (!select) return;
  select.innerHTML = store.users.filter((user) => user.active !== false).map((user) => `<option value="${user.id}" ${user.id === store.activeUserId ? 'selected' : ''}>${escapeHtml(user.name)} — ${escapeHtml(user.role)}</option>`).join('');
}

function canAccessRoute(route, role = activeRoleName()) {
  const allowed = roleRouteVisibility[role];
  return allowed == null || allowed.has(route);
}

function visibleNavItems() { return navItems.filter(([route]) => canAccessRoute(route)); }

function renderNav() {
  const groups = [
    ['Primary', ['dashboard', 'bookings', 'dispatch', 'calendar', 'chat']],
    ['More', ['operations-assistant', 'invoices', 'crew', 'vessels', 'payroll', 'inventory', 'expenses', 'maintenance', 'reports', 'settings', 'notifications', 'incident-reports', 'pre-trip-checklist', 'post-trip-checklist', 'cruise-schedule', 'whatsapp', 'gmail-import', 'audit', 'owner-dashboard', 'captain-dashboard', 'mate-dashboard', 'trips']]
  ];
  const visible = new Map(visibleNavItems().map((item) => [item[0], item]));
  document.getElementById('primaryNav').innerHTML = groups.map(([label, routes]) => {
    const items = routes.map((route) => visible.get(route)).filter(Boolean);
    if (!items.length) return '';
    return `<section class="nav-group"><p class="nav-group-label">${label}</p>${items.map(([route, icon, itemLabel]) => { const badge = route === 'chat' ? chatBadgeMarkup('nav-badge') : ''; return `<button class="nav-link" data-route="${route}" aria-label="${itemLabel}"><span class="nav-icon" aria-hidden="true">${icon}</span><span class="nav-label">${itemLabel}</span>${badge}</button>`; }).join('')}</section>`;
  }).join('');
  renderMobileNav();
}

function renderMobileNav() {
  const bottom = document.getElementById('mobileBottomNav');
  const more = document.getElementById('mobileMoreMenu');
  if (!bottom) return;
  const unread = unreadNotificationCount();
  bottom.innerHTML = `<div class="mobile-nav-scroll">${mobilePrimaryNav.filter(([route]) => canAccessRoute(route)).map(([route, icon, label]) => {
    const badge = route === 'chat' ? chatBadgeMarkup('mobile-nav-badge') : route === 'notifications' && unread ? `<span class="mobile-nav-badge" aria-label="${unread} unread notifications">${unread}</span>` : '';
    const active = currentRoute === route;
    return `<button class="mobile-nav-link ${active ? 'active' : ''}" data-route="${route}" aria-label="${label}" ${active ? 'aria-current="page"' : ''}><span class="mobile-nav-icon" aria-hidden="true">${icon}${badge}</span><span class="mobile-nav-label">${label}</span></button>`;
  }).join('')}<button class="mobile-nav-link" data-mobile-more-toggle aria-label="More modules"><span class="mobile-nav-icon" aria-hidden="true">•••</span><span class="mobile-nav-label">More</span></button></div>`;
  if (more) more.innerHTML = `<div class="mobile-more-sheet" role="dialog" aria-label="More modules"><div class="mobile-more-handle"></div><div class="mobile-more-grid">${mobileMoreNav.map(([route, icon, label]) => {
    const badge = route === 'notifications' && unread ? `<em aria-label="${unread} unread notifications">${unread}</em>` : route === 'chat' ? chatBadgeMarkup('mobile-nav-badge') : '';
    return `<button class="mobile-more-item ${currentRoute === route ? 'active' : ''}" data-route="${route}"><span class="mobile-nav-icon">${icon}${badge}</span><span>${label}</span></button>`;
  }).join('')}</div></div>`;
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
    const selected = document.getElementById('userSelect')?.value;
    const user = store.users.find((item) => item.id === selected && item.active !== false) || currentUser();
    store.activeUserId = user.id; user.lastLoginAt = new Date().toISOString(); saveStore();
    document.getElementById('roleSelect').value = user.role;
    document.getElementById('activeRole').textContent = `${user.name} · ${user.role}`;
    renderNav(); renderRoute(currentRoute);
    toast(`Signed in as ${user.name}. Demo authentication only.`);
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
    const voiceToggle = event.target.closest('[data-voice-toggle]');
    if (voiceToggle) { voiceAssistantOpen = true; renderVoiceCommandPanel(currentRoute); }
    const voiceClose = event.target.closest('[data-voice-close]');
    if (voiceClose) { if (voiceRecognition) voiceRecognition.stop(); voiceAssistantOpen = false; renderVoiceCommandPanel(currentRoute); }
    const voiceButton = event.target.closest('[data-voice-fill], [data-command-voice-start]');
    if (voiceButton) startVoiceFill(voiceButton);
    const voiceAction = event.target.closest('[data-voice-action]');
    if (voiceAction) handleVoiceAction(voiceAction.dataset.voiceAction);
    const dispatchViewButton = event.target.closest('[data-dispatch-view]');
    if (dispatchViewButton) { assignmentViewMode = dispatchViewButton.dataset.dispatchView; renderAssignmentBoard(document.getElementById(currentRoute === 'dispatch' ? 'page-dispatch' : 'page-trips')); }
    if (event.target.closest('[data-export-store]')) exportStoreData();
    if (event.target.closest('[data-reset-store]')) { addAudit('reset', 'Settings', 'Reset local data to seed defaults.'); localStorage.removeItem(STORE_KEY); store = seedStore({ auditTrail: store.auditTrail, notifications: store.notifications }); renderRoute(currentRoute); toast('Seed data restored.'); }
    if (event.target.closest('[data-mark-notices-read]')) markNotificationsRead();
    const markNotice = event.target.closest('[data-mark-notice-read]');
    if (markNotice) markNotificationRead(markNotice.dataset.markNoticeRead);
    const uploadAction = event.target.closest('[data-upload-action]');
    if (uploadAction) handleUploadReviewAction(uploadAction.dataset.uploadAction);
    const pasteDocument = event.target.closest('[data-paste-document]');
    if (pasteDocument) { const route = pasteDocument.dataset.pasteDocument; const text = document.querySelector(`[data-paste-document-text="${route}"]`)?.value.trim(); if (text) createUploadReview({ name: 'Pasted document.txt', type: 'text/plain' }, route, text, 'Pasted text'); else toast('Paste document text first.'); }
    const duplicateAction = event.target.closest('[data-duplicate-action]');
    if (duplicateAction) handleUploadDuplicateAction(duplicateAction.dataset.duplicateAction);
    const calView = event.target.closest('[data-calendar-view]');
    if (calView) setCalendarView(calView.dataset.calendarView);
    const calDay = event.target.closest('[data-calendar-day]');
    if (calDay) openCalendarDay(calDay.dataset.calendarDay);
    const calFilter = event.target.closest('[data-calendar-filter]');
    if (calFilter) setCalendarFilter(calFilter.dataset.calendarFilter);
    if (event.target.closest('[data-close-dispatch-drawer]')) closeDispatchDrawer();
    const drawerAction = event.target.closest('[data-dispatch-drawer-action]');
    if (drawerAction) handleDispatchDrawerAction(drawerAction.dataset.dispatchDrawerAction, drawerAction.dataset.tripId);
    const calTrip = event.target.closest('[data-calendar-trip]');
    if (calTrip && !drawerAction) openCalendarTrip(calTrip.dataset.calendarTrip);
    const treeAction = event.target.closest('[data-tree-action]');
    if (treeAction && treeAction.tagName !== 'SUMMARY') handleTreeNodeAction(treeAction);
    const dashToggle = event.target.closest('[data-dashboard-card-toggle]');
    if (dashToggle) toggleDashboardCard(dashToggle.dataset.dashboardCardToggle);
    const dashMove = event.target.closest('[data-dashboard-card-move]');
    if (dashMove) moveDashboardCard(dashMove.dataset.dashboardCardMove, dashMove.dataset.direction);
    if (event.target.closest('[data-install-app]')) promptAppInstall();
    if (event.target.closest('[data-download-backup]')) exportStoreData();
    if (event.target.closest('[data-refresh-integration-status]')) refreshIntegrationStatus();
    const chatOpen = event.target.closest('[data-chat-conversation]');
    if (chatOpen) openChatConversation(chatOpen.dataset.chatConversation);
    const chatDirect = event.target.closest('[data-chat-direct-user]');
    if (chatDirect) openDirectChat(chatDirect.dataset.chatDirectUser);
    if (event.target.closest('[data-chat-back]')) { chatMobileThreadOpen = false; renderChat(); }
    if (event.target.closest('[data-chat-mark-read]')) markConversationRead(activeChatConversationId);
    const userToggle = event.target.closest('[data-user-active-toggle]');
    if (userToggle) toggleUserActive(userToggle.dataset.userActiveToggle);
    if (event.target.closest('[data-create-linked-users]')) createLinkedUsers();
  });
  document.body.addEventListener('change', (event) => {
    if (event.target.matches('[data-import-store]')) importStoreData(event.target.files[0]);
    if (event.target.matches('[data-upload-file]')) handleUploadFiles(event.target.files, event.target.dataset.uploadRoute);
    if (event.target.matches('[data-calendar-date]')) updateCalendarDate('date', event.target.value);
    if (event.target.matches('[data-calendar-month]')) updateCalendarDate('month', event.target.value);
    if (event.target.matches('[data-calendar-year]')) updateCalendarDate('year', event.target.value);
    if (event.target.matches('[data-calendar-advanced-filter]')) { calendarAdvancedFilters[event.target.dataset.calendarAdvancedFilter] = event.target.value; renderCalendar(); }
    if (event.target.matches('[data-photo-note-file]')) savePhotoNoteFile(event.target.dataset.photoNoteRoute, event.target.files[0]);
    if (event.target.matches('[data-incident-media]')) attachIncidentMedia(event.target.files);
    if (event.target.matches('[data-chat-filter]')) { chatFilters[event.target.dataset.chatFilter] = event.target.value; renderChat(); }
    if (event.target.matches('[data-user-role]')) updateUserField(event.target.dataset.userRole, 'role', event.target.value);
    if (event.target.matches('[data-user-link-crew]')) updateUserField(event.target.dataset.userLinkCrew, 'linkedCrewProfileId', event.target.value);
    if (event.target.matches('[data-user-link-owner]')) updateUserField(event.target.dataset.userLinkOwner, 'linkedVesselOwnerProfileId', event.target.value);
    if (event.target.matches('[data-chat-preference]')) updateChatPreference(event.target.dataset.chatPreference, event.target.checked);
  });
  document.body.addEventListener('dragover', (event) => {
    const zone = event.target.closest('[data-upload-zone]');
    if (!zone) return;
    event.preventDefault();
    zone.classList.add('drag-over');
  });
  document.body.addEventListener('dragleave', (event) => event.target.closest('[data-upload-zone]')?.classList.remove('drag-over'));
  document.body.addEventListener('drop', (event) => {
    const zone = event.target.closest('[data-upload-zone]');
    if (!zone) return;
    event.preventDefault();
    zone.classList.remove('drag-over');
    handleUploadFiles(event.dataTransfer.files, zone.dataset.uploadRoute);
  });
  document.body.addEventListener('submit', (event) => { if (event.target.matches('[data-chat-form]')) sendChatMessage(event); if (event.target.matches('[data-demo-pin-form]')) saveDemoPin(event); });
  document.body.addEventListener('input', (event) => { if (event.target.matches('[data-chat-search]')) { chatFilters.search = event.target.value; renderChat(); } });
  window.addEventListener('online', updateMobileChrome);
  window.addEventListener('offline', updateMobileChrome);
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    const button = document.getElementById('installBtn');
    button.hidden = false;
    button.onclick = promptAppInstall;
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
  if (!canAccessRoute(route)) {
    toast(`${activeRoleName()} does not have access to that module.`);
    route = 'dashboard';
  }
  currentRoute = route;
  voiceAssistantOpen = false;
  closeSidebar();
  document.querySelectorAll('.page').forEach((page) => page.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach((link) => {
    const active = link.dataset.route === route;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  closeMobileMore();
  const page = document.getElementById(`page-${route}`);
  if (!page) return;
  page.classList.add('active');
  const nav = navItems.find(([key]) => key === route);
  document.getElementById('pageTitle').textContent = nav ? `${nav[1]} ${nav[2]}` : route === 'trips' ? '📘 Bookings / Trips — Dispatch Editor' : 'Legacy Tools';
  if (route === 'incident-reports') renderIncidentLibrary();
  else if (crudConfig[route]) renderCrud(route);
  else if (route === 'dashboard') renderDashboard();
  else if (route === 'operations-assistant') renderOperationsAssistant();
  else if (route === 'dispatch') renderDispatch();
  else if (route === 'calendar') renderCalendar();
  else if (route === 'chat') renderChat();
  else if (route === 'whatsapp') renderWhatsApp();
  else if (route === 'gmail-import') renderGmailImport();
  else if (route === 'payroll') renderPayroll();
  else if (route === 'inventory') renderInventory();
  else if (route === 'captain-dashboard') renderCrewRoleDashboard('captain');
  else if (route === 'mate-dashboard') renderCrewRoleDashboard('mate');
  else if (route === 'owner-dashboard') renderOwnerDashboard();
  else if (route === 'maintenance') renderMaintenance();
  else if (route === 'pre-trip-checklist') renderChecklistPage('Pre Trip');
  else if (route === 'post-trip-checklist') renderChecklistPage('Post Trip');
  else if (route === 'reports') renderReports();
  else if (route === 'notifications') renderNotifications();
  else if (route === 'audit') renderAuditTrail();
  else renderPlaceholder(route);
  appendWhatsAppIntegrationActions(route);
  renderVoiceCommandPanel(route);
  updateMobileChrome();
}


const supportedIntakeExtensions = ['pdf', 'png', 'jpg', 'jpeg', 'html', 'htm', 'csv', 'txt', 'json'];
const supportedIntakeDocumentTypes = ['Quote', 'Invoice', 'Booking Confirmation', 'Tour Confirmation', 'Receipt', 'Email', 'Unknown'];
const uploadReviewFields = [
  ['invoiceNumber', 'Invoice Number'], ['quoteNumber', 'Quote Number'], ['customerName', 'Customer Name'], ['phone', 'Phone'], ['email', 'Email'],
  ['tripDate', 'Trip Date'], ['startTime', 'Start Time'], ['duration', 'Tour Duration'], ['returnTime', 'Return Time'], ['tourType', 'Tour Type'],
  ['guestCount', 'Guest Count'], ['bookingSource', 'Booking Source'], ['vessel', 'Vessel'], ['captain', 'Captain'], ['mate', 'Mate'], ['baseTourPrice', 'Base Tour Price'],
  ['depositPaid', 'Deposit'], ['balanceDue', 'Balance'], ['paymentStatus', 'Payment Status'], ['paymentMethod', 'Payment Method'], ['pickupLocation', 'Pickup Location'],
  ['cruiseLine', 'Cruise Line'], ['cruiseShip', 'Cruise Ship'], ['specialRequests', 'Special Requests'], ['notes', 'Notes']
];
let activeUploadReviewId = '';
let pendingDuplicateAction = '';
let calendarFilter = 'All';
let calendarAdvancedFilters = { vessel: 'All', captain: 'All', mate: 'All', tourType: 'All', payment: 'All' };


function photoNoteTargets(route) {
  const records = route === 'bookings' ? store.bookings : route === 'trips' ? store.trips : route === 'incident-reports' ? store.incidentReports : route === 'maintenance' ? store.maintenanceRecords : route === 'pre-trip-checklist' ? store.checklistRecords.filter((record) => record.type === 'Pre Trip') : route === 'post-trip-checklist' ? store.checklistRecords.filter((record) => record.type === 'Post Trip') : [];
  return (records || []).map((record) => ({ id: record.id, label: record.customer || record.order || record.description || record.vessel || record.tripLabel || record.id }));
}

function renderPhotoNotePanel(route = currentRoute) {
  const notes = (store.photoNotes || []).filter((note) => note.route === route).slice(0, 4);
  const targets = photoNoteTargets(route);
  return `<details class="card photo-note-panel app-accordion" ${notes.length ? 'open' : ''}><summary><div><h3>Notes with Photos</h3></div><span class="chevron" aria-hidden="true">⌄</span></summary><div class="photo-note-actions">${targets.length ? `<select data-photo-note-target="${escapeHtml(route)}"><option value="">Attach to this module</option>${targets.map((target) => `<option value="${escapeHtml(target.id)}">Attach to ${escapeHtml(target.label)}</option>`).join('')}</select>` : ''}<textarea data-photo-note-text="${escapeHtml(route)}" placeholder="Add note"></textarea><label class="btn btn-outline">Take Photo<input data-photo-note-file data-photo-note-route="${escapeHtml(route)}" type="file" accept="image/*" capture="environment" hidden></label><label class="btn btn-outline">Choose Photo<input data-photo-note-file data-photo-note-route="${escapeHtml(route)}" type="file" accept="image/*" hidden></label></div><div class="photo-note-list">${notes.length ? notes.map(renderPhotoNote).join('') : '<p class="empty-state">No photo notes yet.</p>'}</div></details>`;
}

function renderPhotoNote(note) {
  return `<article class="photo-note-item"><img src="${escapeHtml(note.dataUrl)}" alt="Photo note preview"><div><strong>${escapeHtml(note.note || 'Photo note')}</strong>${note.linkedRecordId ? `<span class="badge blue">Attached record</span>` : ''}<p class="muted-text">${escapeHtml(new Date(note.createdAt).toLocaleString())} · ${escapeHtml(note.fileName || 'photo')}</p><button class="btn btn-danger btn-small" type="button" onclick="removePhotoNote('${note.id}')">Remove Photo</button></div></article>`;
}

function savePhotoNoteFile(route, file) {
  if (!file) return;
  if (file.size > 4 * 1024 * 1024) { toast('Photo too large. Choose an image under 4 MB.'); return; }
  const noteText = document.querySelector(`[data-photo-note-text="${route}"]`)?.value || '';
  const reader = new FileReader();
  reader.onload = () => {
    store.photoNotes.unshift({ id: makeId('photo-note'), route, linkedRecordId: document.querySelector(`[data-photo-note-target="${route}"]`)?.value || '', note: noteText, fileName: file.name, size: file.size, dataUrl: String(reader.result || ''), createdAt: new Date().toISOString(), createdBy: currentUserLabel() });
    store.photoNotes = store.photoNotes.slice(0, 100);
    addAudit('created', 'Photo Notes', `Photo note added to ${route}.`, { route, fileName: file.name, size: file.size });
    saveStore(); renderRoute(currentRoute); toast('Photo note saved.');
  };
  reader.readAsDataURL(file);
}

function removePhotoNote(id) {
  store.photoNotes = (store.photoNotes || []).filter((note) => note.id !== id);
  addAudit('deleted', 'Photo Notes', 'Photo note removed.', { id });
  saveStore(); renderRoute(currentRoute); toast('Photo removed.');
}

function renderUploadZone(route) {
  // Legacy validator marker: ＋ Add File / Photo is consolidated into Add Document below.
  return `<details class="compact-intake" data-upload-zone data-upload-route="${escapeHtml(route)}"><summary class="btn btn-outline">＋ Add Document</summary><div class="compact-intake-menu"><label class="btn btn-outline">Take Photo<input data-upload-file data-upload-route="${escapeHtml(route)}" type="file" accept="image/png,image/jpeg" capture="environment" hidden></label><label class="btn btn-outline">Choose File<input data-upload-file data-upload-route="${escapeHtml(route)}" type="file" accept=".pdf,.png,.jpg,.jpeg,.html,.htm,.csv,.txt,.json,application/pdf,image/png,image/jpeg,text/html,text/csv,text/plain" hidden></label><div class="paste-document-control"><textarea data-paste-document-text="${escapeHtml(route)}" placeholder="Paste document text"></textarea><button class="btn btn-outline" type="button" data-paste-document="${escapeHtml(route)}">Paste Text</button></div></div></details><div data-upload-review-host="${escapeHtml(route)}"></div>`;
}

async function handleUploadFiles(files, route = currentRoute) {
  const file = Array.from(files || [])[0];
  if (!file) return;
  const extension = (file.name.split('.').pop() || '').toLowerCase();
  if (!supportedIntakeExtensions.includes(extension)) {
    addNotification('Upload parsing failed', `${file.name} is not a supported smart intake format.`, 'critical', { route, category: 'Upload' });
    addAudit('failed', 'Smart Document Intake', `Unsupported upload format for ${file.name}.`, { route, extension, supported: 'PDF, PNG, JPG, JPEG, HTML, CSV' });
    saveStore(); toast('Upload parsing failed. Unsupported file type.'); return;
  }
  toast('Reading document for OCR intake...');
  try {
    const result = await extractUploadText(file, extension);
    createUploadReview(file, route, result.text, result.method, result.warning || '');
  } catch (error) {
    addNotification('Upload parsing failed', `${file.name} could not be read for smart intake.`, 'critical', { route, category: 'Upload' });
    addAudit('failed', 'Smart Document Intake', `Could not read ${file.name}.`, { route, extension, error: String(error?.message || error) });
    saveStore(); toast('Upload parsing failed.');
  }
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('File read failed'));
    reader.readAsText(file);
  });
}

function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('File read failed'));
    reader.readAsArrayBuffer(file);
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}

async function extractUploadText(file, extension) {
  if (['html', 'htm'].includes(extension)) return { text: stripHtmlToText(await readFileAsText(file)), method: 'HTML text extraction' };
  if (extension === 'csv') return { text: csvToIntakeText(await readFileAsText(file)), method: 'CSV structured text extraction' };
  if (['txt', 'json'].includes(extension)) return { text: await readFileAsText(file), method: 'Text extraction' };
  if (extension === 'pdf') return extractPdfText(file);
  if (['png', 'jpg', 'jpeg'].includes(extension) || file.type.startsWith('image/')) return extractImageOcrText(file);
  return { text: file.name, method: 'Filename fallback', warning: 'Unsupported parser fallback used.' };
}

function stripHtmlToText(html = '') {
  return String(html).replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>|<\/tr>|<\/li>|<\/div>/gi, '\n').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/\s+\n/g, '\n').replace(/[ \t]{2,}/g, ' ').trim();
}

function csvToIntakeText(csv = '') {
  const rows = String(csv).split(/\r?\n/).map((line) => line.split(',').map((cell) => cell.replace(/^"|"$/g, '').trim())).filter((row) => row.some(Boolean));
  if (!rows.length) return '';
  const headers = rows[0];
  return rows.slice(1).map((row) => headers.map((header, index) => `${header}: ${row[index] || ''}`).join('\n')).join('\n---\n') || headers.join('\n');
}

async function extractPdfText(file) {
  const buffer = await readFileAsArrayBuffer(file);
  const bytes = new Uint8Array(buffer || []);
  const raw = Array.from(bytes).map((byte) => byte >= 32 && byte < 127 || byte === 10 || byte === 13 ? String.fromCharCode(byte) : ' ').join('');
  const text = raw.replace(/\s+/g, ' ').replace(/\(([^()]{2,})\)/g, '\n$1\n').trim();
  return { text: `${text}\n${file.name}`.trim(), method: 'PDF embedded text/OCR fallback', warning: text.length < 30 ? 'Limited PDF text was available; verify extracted fields carefully.' : '' };
}

async function extractImageOcrText(file) {
  const dataUrl = await readFileAsDataUrl(file);
  if (window.Tesseract?.recognize) {
    const result = await window.Tesseract.recognize(dataUrl, 'eng');
    return { text: `${result?.data?.text || ''}\n${file.name}`.trim(), method: 'OCR image extraction' };
  }
  try {
    await loadScriptOnce('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js', 'tesseract-js');
    if (window.Tesseract?.recognize) {
      const result = await window.Tesseract.recognize(dataUrl, 'eng');
      return { text: `${result?.data?.text || ''}\n${file.name}`.trim(), method: 'OCR image extraction' };
    }
  } catch (error) {
    console.warn('OCR library unavailable; using filename fallback', error);
  }
  return { text: file.name, method: 'OCR fallback pending manual review', warning: 'Image OCR library was unavailable. User review is required before any save.' };
}

function loadScriptOnce(src, id) {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(id);
    if (existing) { existing.addEventListener('load', resolve, { once: true }); resolve(); return; }
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.appendChild(script);
  });
}

function createUploadReview(file, route, text, extractionMethod = 'Text extraction', warning = '') {
  const classification = classifyDocumentText(text, file.name);
  const extracted = parseQuoteInvoiceText(text, file.name);
  const review = { id: makeId('upload-review'), route, fileName: file.name, fileType: file.type || file.name.split('.').pop(), createdAt: new Date().toISOString(), documentType: classification.type, classificationScores: classification.scores, extractionMethod, extractionWarning: warning, sourceTextPreview: String(text || '').slice(0, 600), userReviewRequired: true, reviewStatus: 'Pending Review', extracted, duplicateId: findUploadDuplicate(extracted)?.id || '' };
  store.uploadReviews.unshift(review);
  store.uploadReviews = store.uploadReviews.slice(0, 20);
  activeUploadReviewId = review.id;
  if (review.duplicateId) addNotification('Possible duplicate detected', `${extracted.customerName || 'Uploaded document'} may match an existing trip.`, 'warning', { route, category: 'Upload', reviewId: review.id });
  addAudit('classified', 'Smart Document Intake', `Detected ${review.documentType} from ${file.name}; extracted fields require user review before saving.`, { route, reviewId: review.id, documentType: review.documentType, extractionMethod, classificationScores: classification.scores });
  saveStore();
  renderUploadReview(route, review);
  toast('Document classified. Review and approve before saving.');
}

function classifyDocumentText(text = '', fileName = '') {
  const source = `${text} ${fileName}`.toLowerCase();
  const scores = {
    Quote: scoreText(source, ['quote', 'estimate', 'proposal', 'valid until', 'convert to booking']),
    Invoice: scoreText(source, ['invoice', 'amount due', 'balance due', 'invoice number', 'bill to']),
    'Booking Confirmation': scoreText(source, ['booking confirmation', 'reservation confirmed', 'booked', 'guest count', 'confirmation number']),
    'Tour Confirmation': scoreText(source, ['tour confirmation', 'confirmed tour', 'confirmation', 'departure time', 'pickup location']),
    Email: scoreText(source, ['from:', 'to:', 'subject:', 'sent:', '@']),
    Receipt: scoreText(source, ['receipt', 'paid', 'payment method', 'transaction', 'card', 'cash'])
  };
  const [type, score] = Object.entries(scores).sort((a, b) => b[1] - a[1])[0] || ['Unknown', 0];
  return { type: score > 0 ? type : 'Unknown', scores: { ...scores, Unknown: score > 0 ? 0 : 1 } };
}

function scoreText(source, terms) {
  return terms.reduce((sum, term) => sum + (source.includes(term) ? 1 : 0), 0);
}

function fieldConfidence(value, source = 'missing') {
  if (!value) return 'Low';
  if (source === 'direct' || source === 'billing-address') return 'High';
  if (source === 'fallback' || source === 'filename') return 'Low';
  return 'Medium';
}

function cleanCustomerCandidate(value = '') {
  const line = String(value || '').split(/\r?\n/).map((item) => item.trim()).find(Boolean) || '';
  return line
    .replace(/^(name|customer|guest|client|lead guest|booking name|passenger|billing address|contact name|bill to)\s*[:#-]?\s*/i, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractCustomerName(source = '') {
  const directPatterns = [
    /(?:customer|guest|client|lead\s*guest|booking\s*name|passenger|contact\s*name)(?:\s*name)?[\s:#-]+([^\n,;]+)/i,
    /bill\s*to[\s:#-]+([^\n,;]+)/i
  ];
  for (const pattern of directPatterns) {
    const value = cleanCustomerCandidate(source.match(pattern)?.[1]);
    if (value) return { value, confidence: 'High', source: 'direct' };
  }
  const billingBlock = source.match(/billing\s*address\s*[:#-]?\s*\n\s*([^\n,;]+)/i) || source.match(/billing\s*address[\s:#-]+([^\n,;]+)/i);
  const billingName = cleanCustomerCandidate(billingBlock?.[1]);
  if (billingName) return { value: billingName, confidence: 'High', source: 'billing-address' };
  const name = cleanCustomerCandidate(source.match(/\bname[\s:#-]+([^\n,;]+)/i)?.[1]);
  return { value: name, confidence: fieldConfidence(name, 'fallback'), source: name ? 'fallback' : 'missing' };
}

function confidenceMap(extracted, sources = {}) {
  return Object.fromEntries(uploadReviewFields.map(([key]) => [key, fieldConfidence(extracted[key], sources[key])]))
}

function parseQuoteInvoiceText(text = '', fileName = '') {
  const source = `${text}
${fileName}`;
  const pick = (...patterns) => patterns.map((pattern) => source.match(pattern)?.[1]?.trim()).find(Boolean) || '';
  const moneyPick = (...patterns) => (pick(...patterns).replace(/[$,]/g, '') || '');
  const date = pick(/(?:trip|tour|booking|service|invoice|quote)?\s*date[:\-\s]+([0-9]{4}-[0-9]{2}-[0-9]{2}|[0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4}|(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},?\s+\d{4})/i, /\b([0-9]{4}-[0-9]{2}-[0-9]{2})\b/, /\b([0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4})\b/, /\b((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},?\s+\d{4})\b/i);
  const time = pick(/(?:start\s*time|pickup\s*time|trip\s*time|departure\s*time|tour\s*time|time)[\s:#-]+([0-9: apm.]+)/i, /\b([0-9]{1,2}:[0-9]{2}\s*(?:am|pm)?)\b/i);
  const customer = extractCustomerName(source);
  const duration = pick(/(?:duration[\s:#-]+)?(\d+(?:\.\d+)?)\s*(?:hour|hr)s?(?:\s+(?:excursion|tour|experience|adventure))?/i);
  const explicitReturnTime = normalizeTimeInput(pick(/return\s*time[\s:#-]+([0-9: apm.]+)/i));
  const calculatedReturnTime = calculateEndTime(normalizeTimeInput(time), duration);
  const returnTime = explicitReturnTime || calculatedReturnTime;
  const notes = pick(/notes?[\s:#-]+([^\n]+)/i, /message[\s:#-]+([^\n]+)/i, /special\s*instructions?[\s:#-]+([^\n]+)/i);
  const extracted = {
    invoiceNumber: pick(/invoice\s*(?:number|#|no\.?)?[\s:#-]*([A-Z0-9-]+)/i),
    quoteNumber: pick(/quote\s*(?:number|#|no\.?)?[\s:#-]*([A-Z0-9-]+)/i),
    customerName: customer.value,
    phone: normalizePhoneNumber(pick(/(?:phone|mobile|cell|tel)[\s:#-]+([+0-9 ()-]{7,})/i)),
    email: pick(/([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i),
    tripDate: normalizeDateInput(date),
    startTime: normalizeTimeInput(time),
    duration: duration ? `${Number(duration)} Hour${Number(duration) === 1 ? '' : 's'}` : '',
    endTime: returnTime,
    departureTime: normalizeTimeInput(pick(/departure\s*time[\s:#-]+([0-9: apm.]+)/i)),
    returnTime,
    tourType: pick(/(?:tour\s*type|product|package|service)[\s:#-]+([^\n,;]+)/i, /^([^\n]*(?:\d+(?:\.\d+)?\s*(?:hour|hr)s?)[^\n]*(?:excursion|tour|experience|adventure)[^\n]*)$/im),
    guestCount: pick(/(?:guest\s*count|guests|passengers|pax|party\s*size)[\s:#-]+(\d+)/i, /\b(\d+)\s*(?:guests?|passengers?|pax)\b/i),
    bookingSource: pick(/booking\s*source[\s:#-]+([^\n,;]+)/i, /source[\s:#-]+([^\n,;]+)/i),
    vessel: pick(/(?:vessel|boat)[\s:#-]+([^\n,;]+)/i), captain: pick(/\bcaptain\b[\s:#-]+([^\n,;]+)/i), mate: pick(/\bmate\b[\s:#-]+([^\n,;]+)/i),
    baseTourPrice: moneyPick(/(?:full\s*price|total\s*price|total\s*booking\s*cost|tour\s*price|grand\s*total|subtotal|total)[\s:#-]+\$?([0-9,]+(?:\.\d{2})?)/i),
    depositPaid: moneyPick(/deposit(?:\s*paid)?[\s:#-]+\$?([0-9,]+(?:\.\d{2})?)/i),
    balanceDue: moneyPick(/(?:remaining\s*balance|balance\s*due|balance)[\s:#-]+\$?([0-9,]+(?:\.\d{2})?)/i, /amount\s*due[\s:#-]+\$?([0-9,]+(?:\.\d{2})?)/i),
    paymentStatus: pick(/payment\s*status[\s:#-]+([^\n,;]+)/i), paymentMethod: pick(/payment\s*method[\s:#-]+([^\n,;]+)/i, /paid\s*by[\s:#-]+([^\n,;]+)/i),
    pickupLocation: pick(/pickup\s*location[\s:#-]+([^\n;]+)/i), cruiseShip: pick(/cruise\s*ship[\s:#-]+([^\n;]+)/i),
    specialRequests: pick(/special\s*requests?[\s:#-]+([^\n;]+)/i), notes
  };
  extracted.tourPrice = extracted.baseTourPrice;
  const total = Number(extracted.baseTourPrice || 0), deposit = Number(extracted.depositPaid || 0), balance = Number(extracted.balanceDue || 0);
  extracted.priceReconciliationWarning = total && deposit && balance && Math.abs(deposit + balance - total) > 0.01 ? `Pricing needs review: deposit plus balance does not equal total (${money(deposit)} + ${money(balance)} ≠ ${money(total)}).` : '';
  extracted.endTimeCalculated = Boolean(!explicitReturnTime && calculatedReturnTime);
  extracted.timeReconciliationWarning = explicitReturnTime && calculatedReturnTime && explicitReturnTime !== calculatedReturnTime ? `Time needs review: extracted return time ${formatTime(explicitReturnTime)} differs from calculated return time ${formatTime(calculatedReturnTime)}.` : '';
  extracted.extractionConfidence = confidenceMap(extracted, { customerName: customer.source, invoiceNumber: 'direct', quoteNumber: 'direct', tripDate: 'direct', startTime: 'direct', duration: duration ? 'direct' : 'missing', endTime: explicitReturnTime ? 'direct' : calculatedReturnTime ? 'calculated' : 'missing', departureTime: 'direct', returnTime: explicitReturnTime ? 'direct' : calculatedReturnTime ? 'calculated' : 'missing', tourType: 'direct' });
  return extracted;
}

function renderUploadReview(route = currentRoute, review = store.uploadReviews.find((item) => item.id === activeUploadReviewId)) {
  const host = document.querySelector(`[data-upload-review-host="${route}"]`) || document.querySelector(`#page-${route} .page-stack`);
  if (!host || !review) return;
  const reviewSections = { Customer: ['customerName','phone','email'], 'Trip Details': ['tripDate','startTime','returnTime','duration','tourType','pickupLocation','guestCount'], Pricing: ['baseTourPrice'], 'Add-ons': [], Payment: ['depositPaid','balanceDue','paymentStatus','paymentMethod'], Assignment: ['vessel','captain','mate','bookingSource'], 'Cruise Info': ['cruiseLine','cruiseShip'], Notes: ['specialRequests','notes'], 'Document Details': ['invoiceNumber','quoteNumber'] };
  const dropdownKinds = { bookingSource: 'bookingSources', vessel: 'vessels', captain: 'captains', mate: 'mates', paymentStatus: 'paymentStatus', paymentMethod: 'paymentMethods', pickupLocation: 'pickupLocations', tourType: 'tourTypes', cruiseLine: 'cruiseLines', cruiseShip: 'cruiseShips' };
  const fieldMarkup = Object.fromEntries(uploadReviewFields.map(([key, label]) => {
    const value = review.extracted[key] || '';
    const confidence = review.extracted.extractionConfidence?.[key] || fieldConfidence(value);
    let control;
    if (dropdownKinds[key]) { const options = getOptions(dropdownKinds[key]); control = `<select id="upload-${key}" name="${key}"><option value="">Select ${escapeHtml(label)}</option>${options.map((option) => `<option value="${escapeHtml(option)}" ${String(value) === String(option) ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}</select>`; }
    else if (['specialRequests','notes'].includes(key)) control = `<textarea id="upload-${key}" name="${key}">${escapeHtml(value)}</textarea>`;
    else control = `<input id="upload-${key}" name="${key}" type="${['baseTourPrice','depositPaid','balanceDue','guestCount'].includes(key) ? 'number' : key.includes('Time') ? 'time' : key === 'tripDate' ? 'date' : key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}" value="${escapeHtml(value)}">`;
    return [key, `<div class="field ${value ? '' : 'needs-review'}"><label for="upload-${key}">${label}${value ? ` <span class="confidence-pill confidence-${String(confidence).toLowerCase()}">${escapeHtml(confidence)}</span>` : ''}</label>${control}</div>`];
  }));
  const fields = Object.entries(reviewSections).filter(([,keys]) => keys.length).map(([section, keys]) => `<section class="ocr-review-section"><h4>${section}</h4><div class="form-grid">${keys.map((key) => fieldMarkup[key] || '').join('')}</div></section>`).join('');
  const confidence = Math.max(...Object.values(review.classificationScores || {}).map(Number), 0) >= 2 ? 'High' : 'Review';
  const actionMarkup = renderUploadReviewActions(review.documentType);
  host.innerHTML = `<form class="card upload-review-card record-form" data-upload-review-form data-review-id="${review.id}"><div class="card-header"><div><p class="eyebrow">OCR Review</p><h3>Review extracted fields</h3><p class="muted-text">${escapeHtml(review.fileName)}</p></div>${voiceFillButton(route)}</div>${naturalSentenceModeHint()}${review.extracted.timeReconciliationWarning ? `<div class="intake-warning"><strong>Time warning</strong><p>${escapeHtml(review.extracted.timeReconciliationWarning)}</p></div>` : ''}${review.extracted.priceReconciliationWarning ? `<div class="intake-warning"><strong>Pricing warning</strong><p>${escapeHtml(review.extracted.priceReconciliationWarning)}</p></div>` : ''}${review.extractionWarning ? `<div class="intake-warning"><strong>OCR warning</strong><p>${escapeHtml(review.extractionWarning)}</p></div>` : ''}<div class="detected-type-card"><span class="intake-label">Detected Type</span><select name="documentType" data-document-type-select>${supportedIntakeDocumentTypes.map((type) => `<option value="${escapeHtml(type)}" ${type === review.documentType ? 'selected' : ''}>${escapeHtml(type)}</option>`).join('')}</select><strong>Confidence: ${confidence}</strong></div><div class="extracted-fields-heading"><h4>Review and edit extracted fields</h4></div>${review.duplicateId ? `<div class="duplicate-warning"><strong>Possible Duplicate Found</strong><p>Same customer/date/time may already exist.</p><div class="form-actions"><button class="btn btn-primary btn-small" type="button" data-duplicate-action="update">Update Existing</button><button class="btn btn-outline btn-small" type="button" data-duplicate-action="new">Create New Anyway</button><button class="btn btn-danger btn-small" type="button" data-duplicate-action="cancel">Cancel</button></div></div>` : ''}<div class="ocr-review-sections">${fields}</div><details class="source-preview"><summary>OCR / parsed text preview</summary><pre>${escapeHtml(review.sourceTextPreview || 'No text preview available.')}</pre></details><div class="ocr-final-approval"><span class="intake-label">Final approval</span><label class="review-approval"><input type="checkbox" name="userApproved" value="Yes"> I reviewed the detected type and extracted fields.</label></div><div class="form-actions sticky-save-controls">${actionMarkup}<button class="btn btn-danger" type="button" data-upload-action="cancel">Cancel</button></div></form>`;
}

function renderUploadReviewActions(documentType = 'Unknown') {
  const preferred = { Quote: 'quote', Invoice: 'invoice', Receipt: 'invoice', 'Booking Confirmation': 'booking', 'Tour Confirmation': 'tour-confirmation' }[documentType] || 'draft';
  const options = [['quote','Quote'],['invoice','Invoice'],['booking','Booking'],['tour-confirmation','Tour Confirmation'],['trip','Trip'],['schedule','Calendar Entry'],['draft','Draft']];
  return `<label class="create-as-control"><span>Create As</span><select data-upload-create-as>${options.map(([value,label]) => `<option value="${value}" ${value === preferred ? 'selected' : ''}>${label}</option>`).join('')}</select></label><button class="btn btn-primary" type="button" data-upload-action="selected">Create Selected Record</button>`;
}

function uploadReviewData() {
  const form = document.querySelector('[data-upload-review-form]');
  return form ? Object.fromEntries(new FormData(form).entries()) : {};
}

function findUploadDuplicate(data) {
  const customer = String(data.customerName || data.customer || '').toLowerCase().trim();
  return store.trips.find((trip) => customer && String(trip.customer || '').toLowerCase().trim() === customer && trip.tripDate === data.tripDate && (trip.startTime || '') === (data.startTime || data.departureTime || ''));
}

function handleUploadDuplicateAction(action) {
  if (action === 'cancel') return handleUploadReviewAction('cancel');
  pendingDuplicateAction = action;
  toast(action === 'update' ? 'Existing trip will be updated on confirm.' : 'Duplicate override enabled. Create New Anyway selected.');
}

function handleUploadReviewAction(action) {
  if (action === 'selected') action = document.querySelector('[data-upload-create-as]')?.value || 'draft';
  if (action === 'cancel') { document.querySelector('[data-upload-review-form]')?.remove(); activeUploadReviewId = ''; toast('Upload review cancelled.'); return; }
  const data = uploadReviewData();
  const review = store.uploadReviews.find((item) => item.id === activeUploadReviewId || item.id === document.querySelector('[data-upload-review-form]')?.dataset.reviewId);
  if (data.userApproved !== 'Yes') { addNotification('User review required', `${data.customerName || 'Uploaded document'} must be approved before saving.`, 'warning', { category: 'Upload', reviewId: review?.id }); saveStore(); toast('User Review Required. Approve before saving.'); return; }
  if (findUploadDuplicate(data) && pendingDuplicateAction !== 'update' && pendingDuplicateAction !== 'new') { addNotification('Possible duplicate detected', `${data.customerName || 'Uploaded trip'} requires duplicate review.`, 'warning', { category: 'Upload' }); saveStore(); toast('Possible Duplicate Found. Choose an option first.'); return; }
  if (review) Object.assign(review, { documentType: data.documentType || review.documentType, reviewStatus: 'Approved', approvedAt: new Date().toISOString(), approvedBy: currentUserLabel(), approvedAction: action, extracted: { ...review.extracted, ...data } });
  if (action === 'draft') return saveUploadDraft(data, review);
  if (action === 'booking' || action === 'convert-booking' || action === 'tour-confirmation') createBookingFromUpload({ ...data, status: action === 'tour-confirmation' ? 'Deposit paid' : data.status });
  if (action === 'invoice' || action === 'link-customer') createInvoiceFromUpload(data, action === 'link-customer');
  if (action === 'quote') createQuoteFromUpload(data);
  if (action === 'trip' || action === 'schedule' || action === 'assign-crew') createTripFromUpload(data, action === 'schedule' || action === 'assign-crew');
  addAudit('approved', 'Smart Document Intake', `User approved ${data.documentType || 'document'} intake action: ${action}.`, { reviewId: review?.id || '', action, documentType: data.documentType || '' });
  pendingDuplicateAction = '';
  saveStore();
  renderRoute(action === 'assign-crew' ? 'trips' : currentRoute);
  toast(`${uploadActionLabel(action)} completed after review.`);
}


function saveUploadDraft(data, review) {
  if (review) Object.assign(review, { documentType: data.documentType || review.documentType, reviewStatus: 'Draft', extracted: { ...review.extracted, ...data }, draftSavedAt: new Date().toISOString(), draftSavedBy: currentUserLabel() });
  addAudit('drafted', 'Smart Document Intake', `Draft saved for ${data.documentType || 'uploaded document'}.`, { reviewId: review?.id || '' });
  addNotification('Upload draft saved', `${data.customerName || data.documentType || 'Document'} saved as draft; no record was auto-created.`, 'info', { category: 'Upload', reviewId: review?.id || '' });
  saveStore(); renderRoute(currentRoute); toast('Draft saved. No records were auto-created.');
}

function uploadActionLabel(action) {
  return { booking: 'Create Booking', 'tour-confirmation': 'Create Tour Confirmation', 'convert-booking': 'Convert To Booking', invoice: 'Create Invoice', 'link-customer': 'Link Customer', quote: 'Create Quote', trip: 'Create Trip', schedule: 'Add to Calendar', draft: 'Save Draft', 'assign-crew': 'Assign Crew' }[action] || action;
}

function nextBookingOrderNumber() {
  const used = new Set((store.bookings || []).map((booking) => String(booking.order || '').toUpperCase()));
  let number = Math.max(0, ...(store.bookings || []).map((booking) => Number(String(booking.order || '').match(/(?:RAT|BOOK)-(\d+)/i)?.[1] || 0))) + 1;
  while (used.has(`RAT-${String(number).padStart(4, '0')}`)) number += 1;
  return `RAT-${String(number).padStart(4, '0')}`;
}

function createBookingFromUpload(data) {
  const booking = { id: makeId('bookings'), order: data.quoteNumber || data.invoiceNumber || nextBookingOrderNumber(), customer: data.customerName || '', date: data.tripDate || '', time: data.startTime || data.departureTime || '', guests: Number(data.guestCount || 0), product: data.tourType || '', source: data.bookingSource || '', balance: Number(data.balanceDue || 0), status: Number(data.balanceDue || 0) > 0 ? 'Balance due' : 'Inquiry', notes: [data.specialRequests, data.notes].filter(Boolean).join('\n') };
  store.bookings.push(booking); synchronizeBookingWorkflow(booking); addAudit('created', 'Smart Document Intake', `Booking created from reviewed upload for ${booking.customer || 'customer'}.`, { bookingId: booking.id }); addNotification('Booking created from uploaded invoice.', `${booking.customer || 'Customer'} booking was created after review.`, 'success', { category: 'Upload', bookingId: booking.id });
}
function createInvoiceFromUpload(data, linkCustomer = false) {
  const linked = linkCustomer ? findRelatedCustomerRecord(data) : {};
  const invoice = { id: makeId('invoices'), invoiceNumber: data.invoiceNumber || data.quoteNumber || `INV-${Date.now()}`, documentType: data.documentType === 'Receipt' ? 'Invoice' : data.documentType || (data.invoiceNumber ? 'Invoice' : 'Quote'), customerName: data.customerName || '', phone: data.phone || '', email: data.email || '', tripDate: data.tripDate || '', startTime: data.startTime || data.departureTime || '', returnTime: data.returnTime || data.endTime || '', endTime: data.returnTime || data.endTime || '', duration: data.duration || '', tourType: data.tourType || '', guestCount: Number(data.guestCount || 0), pickupLocation: data.pickupLocation || '', cruiseShip: data.cruiseShip || '', vessel: data.vessel || '', captain: data.captain || '', mate: data.mate || '', bookingSource: data.bookingSource || '', baseTourPrice: Number(data.baseTourPrice || data.tourPrice || 0), tourPrice: Number(data.tourPrice || data.baseTourPrice || 0), depositPaid: Number(data.depositPaid || 0), balanceDue: Number(data.balanceDue || 0), paymentStatus: data.paymentStatus || (Number(data.balanceDue || 0) > 0 ? 'Balance Due' : 'Deposit Due'), paymentMethod: data.paymentMethod || '', bookingId: linked.bookingId || data.bookingId || '', tripId: linked.tripId || data.tripId || '', notes: [data.cruiseShip && `Cruise Ship: ${data.cruiseShip}`, data.specialRequests, data.notes].filter(Boolean).join('\n') };
  store.invoices.push(invoice); if (invoice.documentType !== 'Quote' && (invoice.documentType === 'Tour Confirmation' || confirm('Create Booking / Trip now?'))) synchronizeInvoiceWorkflow(invoice, true); addAudit('created', 'Smart Document Intake', `${linkCustomer ? invoice.documentType + ' created and linked' : invoice.documentType + ' created'} from reviewed upload for ${invoice.customerName || 'customer'}.`, { invoiceId: invoice.id, bookingId: invoice.bookingId, tripId: invoice.tripId }); addNotification(invoice.documentType === 'Quote' ? 'Quote created from upload.' : 'Invoice created from upload.', `${invoice.invoiceNumber} was created after review.`, 'success', { category: 'Upload', invoiceId: invoice.id });
}
function createQuoteFromUpload(data) {
  createInvoiceFromUpload({ ...data, documentType: 'Quote', invoiceNumber: data.quoteNumber || data.invoiceNumber || `QUOTE-${Date.now()}` });
}

function findRelatedCustomerRecord(data = {}) {
  const customer = String(data.customerName || '').toLowerCase().trim();
  if (!customer) return {};
  const booking = store.bookings.find((item) => String(item.customer || '').toLowerCase().trim() === customer);
  const trip = store.trips.find((item) => String(item.customer || '').toLowerCase().trim() === customer);
  return { bookingId: booking?.id || '', tripId: trip?.id || '' };
}

function createTripFromUpload(data, scheduleOnly = false) {
  const duplicate = findUploadDuplicate(data);
  const trip = duplicate && pendingDuplicateAction === 'update' ? duplicate : { id: makeId('trips') };
  Object.assign(trip, normalizeTrip({ ...trip, customer: data.customerName || trip.customer || '', phone: data.phone || trip.phone || '', email: data.email || trip.email || '', bookingSource: data.bookingSource || trip.bookingSource || '', tripDate: data.tripDate || trip.tripDate || '', startTime: data.startTime || data.departureTime || trip.startTime || '', passengers: Number(data.guestCount || trip.passengers || 0), hours: Number.parseFloat(data.duration) || trip.hours || 4, tourType: data.tourType || trip.tourType || '', tourPrice: Number(data.tourPrice || trip.tourPrice || 0), depositPaid: Number(data.depositPaid || trip.depositPaid || 0), balanceDue: Number(data.balanceDue || trip.balanceDue || 0), vessel: data.vessel || trip.vessel || '', captain: data.captain || trip.captain || '', mate: data.mate || trip.mate || '', status: trip.status || 'Scheduled', notes: [data.pickupLocation && `Pickup Location: ${data.pickupLocation}`, data.cruiseShip && `Cruise Ship: ${data.cruiseShip}`, data.specialRequests, data.notes].filter(Boolean).join('\n') || trip.notes || '' }));
  trip.dispatchReadinessStatus = calculateDispatchReadiness(trip);
  if (!trip.vessel || !trip.captain || !trip.mate) trip.unassignedReason = 'Unassigned';
  if (!duplicate || pendingDuplicateAction !== 'update') store.trips.push(trip);
  addAudit(duplicate && pendingDuplicateAction === 'update' ? 'updated' : 'created', 'Smart Document Intake', `${scheduleOnly ? 'Trip added to calendar' : 'Trip created'} from upload for ${trip.customer || 'customer'}.`, { tripId: trip.id });
  addNotification(scheduleOnly ? 'Trip added to calendar.' : 'Trip created from upload.', `${trip.customer || 'Trip'} is scheduled for ${formatDate(trip.tripDate)}.`, 'success', { category: 'Upload', tripId: trip.id });
}

function activeRoleName() {
  if (currentUser().role) return currentUser().role;
  const label = currentUserLabel().toLowerCase();
  if (label.includes('bookkeeper')) return 'Bookkeeper';
  if (label.includes('captain')) return 'Captain';
  if (label.includes('mate')) return 'Mate';
  if (label.includes('owner') && !label.includes('admin')) return 'Owner';
  return 'Admin';
}
function activeRolePerson(role = activeRoleName()) {
  if (role === 'Captain') return currentUser().name || dashboardFilters.captain || getOptions('crew')[0] || '';
  if (role === 'Mate') return currentUser().name || dashboardFilters.mate || getOptions('crew')[0] || '';
  if (role === 'Owner') return currentUser().name || dashboardFilters.owner || getOptions('owners')[0] || '';
  return '';
}
function visibleCalendarTrips() {
  const role = activeRoleName(); const person = activeRolePerson(role);
  return (store.trips || []).filter((trip) => {
    if (role === 'Admin' || role === 'Bookkeeper') return true;
    if (role === 'Owner') return ownerForVesselName(trip.vessel) === person;
    if (role === 'Captain') return trip.captain === person;
    if (role === 'Mate') return trip.mate === person;
    return true;
  });
}
function calendarTripStatus(trip) {
  if (trip.status === 'Cancelled') return 'Cancelled';
  if (trip.status === 'Completed') return 'Completed';
  if (!trip.vessel || !trip.captain || !trip.mate) return 'Unassigned';
  if (Number(trip.balanceDue || 0) > 0) return 'Balance Due';
  return calculateDispatchReadiness(trip) === 'Dispatch Ready' ? 'Ready' : 'Not Ready';
}
function calendarStatusClass(status) {
  if (['Ready', 'Paid', 'Accepted', 'Complete'].some((word) => status.includes(word))) return 'green';
  if (['Pending', 'Balance Due', 'Needs Review'].some((word) => status.includes(word))) return 'gold';
  if (['Conflict', 'Missing Crew', 'Not Ready', 'Incident', 'Unassigned'].some((word) => status.includes(word))) return 'red';
  if (status.includes('Completed')) return 'blue';
  if (['Cancelled', 'Archived'].some((word) => status.includes(word))) return 'gray';
  return 'blue';
}
function calendarDaySummary(date, trips = visibleCalendarTrips()) {
  const dayTrips = trips.filter((trip) => trip.tripDate === date);
  const ready = dayTrips.filter((trip) => calendarTripStatus(trip) === 'Ready').length;
  const notReady = dayTrips.filter((trip) => ['Not Ready', 'Unassigned'].includes(calendarTripStatus(trip))).length;
  const balance = dayTrips.reduce((sum, trip) => sum + Number(trip.balanceDue || 0), 0);
  const crewConflicts = countSameResourceConflicts(dayTrips, 'captain') + countSameResourceConflicts(dayTrips, 'mate');
  const vesselConflicts = countSameResourceConflicts(dayTrips, 'vessel');
  return { dayTrips, ready, notReady, balance, crewConflicts, vesselConflicts };
}
function countSameResourceConflicts(trips, key) {
  const counts = trips.reduce((acc, trip) => { if (trip[key]) acc[trip[key]] = (acc[trip[key]] || 0) + 1; return acc; }, {});
  return Object.values(counts).filter((count) => count > 1).length;
}
function renderCalendar() {
  const page = document.getElementById('page-calendar');
  const state = store.calendarState || { view: 'month', selectedDate: '' };
  const today = new Date().toISOString().slice(0, 10);
  const selected = state.selectedDate || today;
  const trips = filterCalendarTrips(visibleCalendarTrips());
  const toolsOpen = window.innerWidth > 700 ? 'open' : '';
  page.innerHTML = `<div class="page-stack calendar-page"><div class="module-actions"><div class="calendar-view-tabs"><button class="btn ${state.view === 'month' ? 'btn-primary' : 'btn-outline'} btn-small" data-calendar-view="month" aria-label="Month View">Month</button><button class="btn ${state.view === 'week' ? 'btn-primary' : 'btn-outline'} btn-small" data-calendar-view="week" aria-label="Week View">Week</button><button class="btn ${state.view === 'day' ? 'btn-primary' : 'btn-outline'} btn-small" data-calendar-view="day" aria-label="Day View">Day</button><button class="btn ${state.view === 'agenda' ? 'btn-primary' : 'btn-outline'} btn-small" data-calendar-view="agenda" aria-label="Agenda View">Agenda</button></div></div><details class="card calendar-tools app-accordion" ${toolsOpen}><summary><div><strong>Date & Filters</strong><span>${escapeHtml(formatDate(selected))} · ${trips.length} visible trips</span></div><span class="chevron">⌄</span></summary><div class="calendar-tools-body">${renderCalendarDateControls(selected)}${renderCalendarFilters()}${renderUploadZone('calendar')}</div></details>${state.view === 'month' ? renderMonthView(selected, trips) : state.view === 'week' ? renderWeekView(selected, trips) : state.view === 'day' ? renderDaySchedule(selected, trips) : renderAgendaView(trips)}</div>`;
  renderVoiceCommandPanel('calendar');
}
function calendarPermissionCopy(role) {
  return { Admin: 'Can see all trips, Invoice / Quote records, bookings, schedules, vessels, crew assignments, and balances.', Owner: 'Can see trips involving vessels they own, owner payout information, and assigned vessel readiness; unrelated owner trips are hidden.', Captain: 'Can see captain assigned trips with customer, vessel, guest count, pickup/departure time, notes, and checklist status.', Mate: 'Can see mate assigned trips with customer, vessel, guest count, pickup/departure time, notes, and checklist status.', Bookkeeper: 'Bookkeeper financial calendar view includes Invoice / Quote records, payments, payroll, expenses, balances, reports, and calendar financial totals. Dispatch assignment editing stays admin-only.' }[role];
}
function renderCalendarDateControls(selected) {
  const date = new Date(`${selected}T00:00:00`);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const years = Array.from({ length: 7 }, (_, index) => year - 3 + index);
  return `<div class="calendar-date-controls card card-pad"><label>Specific Date<input type="date" data-calendar-date value="${escapeHtml(selected)}"></label><label>Month<select data-calendar-month>${Array.from({length:12},(_,i)=>`<option value="${i+1}" ${i+1===month?'selected':''}>${new Date(2000,i,1).toLocaleDateString('en-US',{month:'long'})}</option>`).join('')}</select></label><label>Year<select data-calendar-year>${years.map((item)=>`<option ${item===year?'selected':''}>${item}</option>`).join('')}</select></label></div>`;
}

function updateCalendarDate(part, value) {
  const current = new Date(`${store.calendarState?.selectedDate || new Date().toISOString().slice(0,10)}T00:00:00`);
  if (part === 'date') store.calendarState.selectedDate = value;
  if (part === 'month') { current.setMonth(Number(value) - 1); store.calendarState.selectedDate = current.toISOString().slice(0,10); }
  if (part === 'year') { current.setFullYear(Number(value)); store.calendarState.selectedDate = current.toISOString().slice(0,10); }
  saveStore(); renderCalendar();
}

function renderCalendarFilters() {
  const filters = ['All', 'Ready', 'Not Ready', 'Unassigned', 'Balance Due', 'Completed', 'Cancelled'];
  const select = (key, label, values) => `<label><span>${label}</span><select data-calendar-advanced-filter="${key}"><option>All</option>${values.map((value) => `<option ${calendarAdvancedFilters[key] === value ? 'selected' : ''}>${escapeHtml(value)}</option>`).join('')}</select></label>`;
  return `<section class="calendar-filter-panel card"><div class="quick-filter-row">${filters.map((filter) => `<button class="btn ${calendarFilter === filter ? 'btn-primary' : 'btn-outline'} btn-small" data-calendar-filter="${filter}">${filter}</button>`).join('')}</div><div class="calendar-resource-filters">${select('vessel', 'Vessel', getOptions('vessels'))}${select('captain', 'Captain', getOptions('captains'))}${select('mate', 'Mate', getOptions('mates'))}${select('tourType', 'Tour type', [...new Set(store.trips.map((trip) => trip.tourType).filter(Boolean))])}${select('payment', 'Payment', ['Paid', 'Balance Due'])}</div></section>`;
}
function monthDates(selected) {
  const base = new Date(`${selected}T00:00:00`);
  const first = new Date(base.getFullYear(), base.getMonth(), 1);
  const start = new Date(first); start.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d.toISOString().slice(0, 10); });
}
function renderMonthView(selected, trips) {
  return `<div class="calendar-grid month-view">${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => `<div class="calendar-weekday">${d}</div>`).join('')}${monthDates(selected).map((date) => renderCalendarDayCell(date, trips)).join('')}</div>`;
}
function renderCalendarDayCell(date, trips) {
  const summary = calendarDaySummary(date, trips); const parsed = new Date(`${date}T00:00:00`); const label = parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `<button class="calendar-day-cell ${summary.dayTrips.length ? 'has-trips' : ''}" data-calendar-day="${date}" aria-label="${escapeHtml(`${label}, ${summary.dayTrips.length} tours`)}"><strong><span class="calendar-month-label">${escapeHtml(parsed.toLocaleDateString('en-US', { month: 'short' }))}</span>${parsed.getDate()}</strong><span class="calendar-trip-count">${summary.dayTrips.length}</span><span class="calendar-day-detail">${summary.ready} Ready</span><span class="calendar-day-detail ${summary.notReady ? 'needs-attention' : ''}">${summary.notReady} Needs Attention</span><span class="calendar-day-detail">${money(summary.balance)} Due</span>${summary.crewConflicts || summary.vesselConflicts ? '<span class="calendar-alert-dot" title="Assignment conflict"></span>' : ''}${summary.dayTrips.some((trip) => ['Red','Yellow'].includes(tripWeatherRisk(trip))) ? '<span class="calendar-weather-dot" title="🌦️ High Risk or Monitor"></span>' : ''}</button>`;
}
function renderWeekView(selected, trips) {
  const base = new Date(`${selected}T00:00:00`); const start = new Date(base); start.setDate(base.getDate() - base.getDay()); const dates = Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return d.toISOString().slice(0,10)});
  return `<div class="calendar-grid week-view">${dates.map((date) => renderCalendarDayCell(date, trips)).join('')}</div>`;
}
function filterCalendarTrips(trips) {
  return trips.filter((trip) => {
    if (calendarFilter !== 'All' && calendarTripStatus(trip) !== calendarFilter) return false;
    if (calendarAdvancedFilters.vessel !== 'All' && trip.vessel !== calendarAdvancedFilters.vessel) return false;
    if (calendarAdvancedFilters.captain !== 'All' && trip.captain !== calendarAdvancedFilters.captain) return false;
    if (calendarAdvancedFilters.mate !== 'All' && trip.mate !== calendarAdvancedFilters.mate) return false;
    if (calendarAdvancedFilters.tourType !== 'All' && trip.tourType !== calendarAdvancedFilters.tourType) return false;
    if (calendarAdvancedFilters.payment === 'Paid' && Number(trip.balanceDue || 0) > 0) return false;
    if (calendarAdvancedFilters.payment === 'Balance Due' && Number(trip.balanceDue || 0) <= 0) return false;
    return true;
  });
}
function renderDaySchedule(date, trips = visibleCalendarTrips()) {
  const summary = calendarDaySummary(date, trips); const visible = filterCalendarTrips(summary.dayTrips);
  return `<section class="card day-schedule"><div class="card-header"><div><p class="eyebrow">Day Schedule</p><h3>${escapeHtml(formatDate(date))}</h3><p>${summary.dayTrips.length} Tours · ${summary.ready} Ready · ${summary.notReady} Not Ready · ${money(summary.balance)} Balance Due</p></div>${voiceFillButton('calendar')}</div><div class="calendar-trip-list">${visible.length ? visible.map(renderCalendarTripCard).join('') : '<p class="empty-state">No visible trips for this role and filter.</p>'}</div></section>`;
}
function renderAgendaView(trips) {
  const upcoming = filterCalendarTrips([...trips].sort((a,b) => tripSortValue(a).localeCompare(tripSortValue(b))).slice(0, 30));
  return `<section class="card day-schedule"><div class="card-header"><div><p class="eyebrow">Agenda View</p><h3>Upcoming visible trips</h3></div>${voiceFillButton('calendar')}</div><div class="calendar-trip-list">${upcoming.length ? upcoming.map(renderCalendarTripCard).join('') : '<p class="empty-state">No visible agenda trips.</p>'}</div></section>`;
}
function renderCalendarTripCard(trip) {
  const status = calendarTripStatus(trip); const assignment = `${trip.vessel || 'Unassigned'} · Captain ${trip.captain || 'Unassigned'} · Mate ${trip.mate || 'Unassigned'}`;
  const warnings = assignmentConflictWarnings(trip, trip.id); const recommendation = buildAssignmentRecommendation(trip, trip.id);
  return `<button class="calendar-trip-card ${calendarStatusClass(status)}" data-calendar-trip="${trip.id}"><div><strong>${escapeHtml(formatTime(trip.startTime) || 'No time')} · ${escapeHtml(trip.customer || 'No customer')}</strong><p>${escapeHtml(trip.tourType || 'Tour')} · ${Number(trip.passengers || 0)} guests · ${escapeHtml(assignment)}</p><p>${escapeHtml(trip.notes || 'No notes')}</p><p class="calendar-recommendation">Suggested: ${escapeHtml(recommendation.vessel?.value || 'No vessel')} · ${escapeHtml(recommendation.captain?.value || 'No captain')} · ${escapeHtml(recommendation.mate?.value || 'No mate')}</p></div><div><span class="badge ${calendarStatusClass(status)}">${escapeHtml(status)}</span><span class="badge ${Number(trip.balanceDue || 0) > 0 ? 'gold' : 'green'}">${money(trip.balanceDue)} balance</span><span class="badge ${calendarStatusClass(calculateDispatchReadiness(trip))}">${escapeHtml(calculateDispatchReadiness(trip))}</span>${weatherRiskBadge(trip)}${maintenanceWarning(trip)}${warnings.map((warning) => `<span class="badge red">${escapeHtml(warning.type)}</span>`).join('')}</div></button>`;
}
function setCalendarView(view) { store.calendarState = { ...(store.calendarState || {}), view }; saveStore(); renderCalendar(); }
function openCalendarDay(date) { store.calendarState = { ...(store.calendarState || {}), selectedDate: date, view: 'day' }; saveStore(); renderCalendar(); }
function setCalendarFilter(filter) { calendarFilter = filter; renderCalendar(); }
function openCalendarTrip(id) {
  const trip = store.trips.find((item) => item.id === id); if (!trip) return;
  document.querySelector('.dispatch-drawer')?.remove(); document.querySelector('.dispatch-drawer-backdrop')?.remove();
  const readiness = readinessChecklist(trip); const conflicts = assignmentConflictWarnings(trip, trip.id);
  document.body.insertAdjacentHTML('beforeend', `<button class="dispatch-drawer-backdrop" data-close-dispatch-drawer aria-label="Close trip details"></button><aside class="dispatch-drawer" aria-label="Trip dispatch details"><header><div><p class="eyebrow">${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(formatTime(trip.startTime))}</p><h2>${escapeHtml(trip.customer || 'Unnamed party')}</h2><p>${Number(trip.passengers || 0)} guests · ${escapeHtml(trip.tourType || 'Tour')}</p></div><button class="icon-btn drawer-close" data-close-dispatch-drawer aria-label="Close">×</button></header><div class="dispatch-drawer-body"><div class="drawer-status-row">${statusBadge(calendarTripStatus(trip))}${readinessBadge(calculateDispatchReadiness(trip))}${statusBadge(Number(trip.balanceDue || 0) > 0 ? 'Payment Pending' : 'Payment Complete')}</div>${conflicts.length ? `<div class="drawer-alert"><strong>Action required</strong>${conflicts.map((item) => `<span>${escapeHtml(item.type)}: ${escapeHtml(item.message)}</span>`).join('')}</div>` : ''}<section class="drawer-detail-grid"><div><span>Customer</span><strong>${escapeHtml(trip.customer || 'Not provided')}</strong><small>${escapeHtml(trip.phone || trip.email || 'No contact details')}</small></div><div><span>Vessel</span><strong>${escapeHtml(trip.vessel || 'Needs assignment')}</strong></div><div><span>Captain</span><strong>${escapeHtml(trip.captain || 'Needs assignment')}</strong></div><div><span>Mate</span><strong>${escapeHtml(trip.mate || 'Needs assignment')}</strong></div><div><span>Payment</span><strong>${money(trip.balanceDue || 0)} due</strong></div><div><span>Trip status</span><strong>${escapeHtml(trip.status || 'Scheduled')}</strong></div></section><section><p class="drawer-section-label">Dispatch readiness</p><div class="drawer-readiness-list">${Object.entries(readiness).filter(([key]) => !['vesselStatus', 'hasConflicts'].includes(key)).map(([key, complete]) => `<div><span class="readiness-dot ${complete ? 'complete' : ''}"></span><span>${escapeHtml(key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase()))}</span><strong>${complete ? 'Ready' : 'Needed'}</strong></div>`).join('')}</div></section><section><p class="drawer-section-label">Special notes</p><p class="drawer-notes">${escapeHtml(trip.notes || 'No special notes for this trip.')}</p></section></div><footer><button class="btn btn-primary" data-dispatch-drawer-action="trip" data-trip-id="${trip.id}">Open trip</button>${trip.bookingId ? `<button class="btn btn-outline" data-dispatch-drawer-action="booking" data-trip-id="${trip.id}">Booking</button>` : ''}${trip.invoiceId ? `<button class="btn btn-outline" data-dispatch-drawer-action="invoice" data-trip-id="${trip.id}">Invoice</button>` : ''}</footer></aside>`);
}
function closeDispatchDrawer() { document.querySelector('.dispatch-drawer')?.remove(); document.querySelector('.dispatch-drawer-backdrop')?.remove(); }
function handleDispatchDrawerAction(action, tripId) { const trip = store.trips.find((item) => item.id === tripId); if (!trip) return; closeDispatchDrawer(); if (action === 'trip') { renderRoute('trips'); showForm('trips', trip.id); } if (action === 'booking' && trip.bookingId) { renderRoute('bookings'); showForm('bookings', trip.bookingId); } if (action === 'invoice' && trip.invoiceId) { renderRoute('invoices'); showForm('invoices', trip.invoiceId); } }

function renderDashboard() {
  store.dashboardPreferences = normalizeDashboardPreferences(store.dashboardPreferences);
  const metrics = dashboardMetrics();
  document.getElementById('page-dashboard').innerHTML = `
    <div class="page-stack dashboard-command-center" data-mobile-command-center>
      ${renderCockpitDashboard(metrics)}${renderOperationsSnapshot(metrics)}<div class="quick-action-dock cockpit-action-dock"><button class="btn btn-primary" data-route="bookings">＋ New booking</button><button class="btn btn-outline" data-route="calendar">Open dispatch calendar</button><button class="btn btn-outline" data-route="dispatch">Open dispatch</button><button class="btn btn-outline" data-route="invoices">Record payment</button></div>
      ${renderDashboardLowerDeck(metrics)}
    </div>`;
  activateDashboardWeatherWidget();
}

function renderDashboardLowerDeck(metrics) {
  const departures = metrics.scheduledTrips.slice(0, 5);
  const alerts = metrics.urgentItems.slice(0, 5);
  return `<section class="dashboard-lower-deck">
    <div class="lower-deck-heading"><div><p class="eyebrow">Operations watch</p><h2>What needs attention next</h2></div><span class="badge ${alerts.length ? 'gold' : 'green'}">${alerts.length ? `${alerts.length} active items` : 'All clear'}</span></div>
    <div class="lower-deck-grid">
      ${renderDashboardWeatherWidget()}
      <article class="card command-watch-card"><div class="card-header"><div><p class="eyebrow">Departure board</p><h3>Upcoming Trips</h3></div><button class="btn btn-outline btn-small" data-route="calendar">Open Calendar</button></div><div class="command-watch-list">${departures.length ? departures.map((trip) => `<button data-route="dispatch"><span><strong>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(formatTime(trip.startTime))}</strong><small>${escapeHtml(trip.customer || 'Trip')} · ${escapeHtml(trip.vessel || 'Vessel unassigned')}</small></span>${readinessBadge(calculateDispatchReadiness(trip))}</button>`).join('') : '<p class="empty-state">No upcoming scheduled trips.</p>'}</div></article>
      <article class="card command-watch-card action-watch-card"><div class="card-header"><div><p class="eyebrow">Action queue</p><h3>Operational Alerts</h3></div><button class="btn btn-outline btn-small" data-route="dispatch">Open Dispatch</button></div><div class="command-watch-list">${alerts.length ? alerts.map((item) => `<button data-route="dispatch"><span><strong>${escapeHtml(item.type)}</strong><small>${escapeHtml(item.title)} · ${escapeHtml(item.detail)}</small></span><i class="watch-alert-light ${escapeHtml(item.color || 'gold')}"></i></button>`).join('') : '<div class="watch-all-clear"><i></i><strong>All systems clear</strong><small>No immediate operational actions.</small></div>'}</div></article>
    </div>
  </section>`;
}

function renderCockpitDashboard(metrics) {
  const todayReady = metrics.todayTrips.filter((trip) => calculateDispatchReadiness(trip) === 'Dispatch Ready').length;
  const fullyAssigned = metrics.scheduledTrips.filter((trip) => trip.vessel && trip.captain && trip.mate && trip.mate !== 'None').length;
  const readinessPercent = metrics.todayTrips.length ? Math.round(todayReady / metrics.todayTrips.length * 100) : null;
  const assignmentPercent = metrics.scheduledTrips.length ? Math.round(fullyAssigned / metrics.scheduledTrips.length * 100) : null;
  const nextTrip = metrics.scheduledTrips.find((trip) => String(trip.tripDate || '') >= new Date().toISOString().slice(0, 10));
  const weatherWatch = metrics.scheduledTrips.filter((trip) => ['Yellow','Red'].includes(tripWeatherRisk(trip))).length;
  const gauge = (label, value, detail, calculation, route, tone = 'aqua') => {
    const available = Number.isFinite(value), numericValue = available ? Math.max(0, Math.min(value, 100)) : 0;
    return `<button class="cockpit-gauge ${tone} ${available ? '' : 'neutral'}" data-route="${route}" style="--gauge-value:${numericValue}" title="${escapeHtml(calculation)}"><span class="gauge-ring"><span class="gauge-needle"></span><span class="gauge-value"><strong>${available ? escapeHtml(value) : 'N/A'}</strong>${available ? '<small>%</small>' : ''}</span></span><span class="gauge-label">${escapeHtml(label)}</span><small>${escapeHtml(detail)}</small><em>${escapeHtml(calculation)}</em></button>`;
  };
  return `<section class="cockpit-console">
    <div class="cockpit-topbar"><div><p class="eyebrow">Reel Adventure Tours · Nassau Operations</p><h1>Captain's Command</h1></div><div class="cockpit-system-live"><i></i><span>Systems live</span><small>${escapeHtml(new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }))}</small></div></div>
    <div class="cockpit-instrument-panel">
      <div class="cockpit-gauge-cluster">${gauge('Dispatch readiness', readinessPercent, metrics.todayTrips.length ? `${todayReady} of ${metrics.todayTrips.length} today ready` : 'No trips scheduled today', 'Ready trips today ÷ all trips today', 'dispatch', readinessPercent !== null && readinessPercent < 60 ? 'warning' : 'aqua')}${gauge('Crew & vessel', assignmentPercent, metrics.scheduledTrips.length ? `${fullyAssigned} of ${metrics.scheduledTrips.length} fully assigned` : 'No scheduled trips', 'Fully assigned scheduled trips ÷ all scheduled trips', 'bookings', assignmentPercent !== null && assignmentPercent < 70 ? 'warning' : 'gold')}</div>
      <button class="cockpit-radar" data-route="calendar" aria-label="Open operations calendar"><span class="radar-grid"></span><span class="radar-sweep"></span>${metrics.todayTrips.slice(0, 4).map((trip, index) => `<i class="radar-blip blip-${index + 1}" title="${escapeHtml(trip.customer || 'Trip')}"></i>`).join('')}<span class="radar-center"><strong>${metrics.todayTrips.length}</strong><small>Departures today</small></span></button>
      <div class="cockpit-status-bank">
        <button data-route="calendar"><span class="cockpit-status-light ${metrics.todayTrips.length ? 'active' : ''}"></span><small>Today's trips</small><strong>${metrics.todayTrips.length}</strong></button>
        <button data-route="dispatch"><span class="cockpit-status-light ${metrics.needsAttention.length ? 'alert' : 'active'}"></span><small>Needs attention</small><strong>${metrics.needsAttention.length}</strong></button>
        <button data-route="invoices"><span class="cockpit-status-light ${metrics.totalBalance > 0 ? 'warning' : 'active'}"></span><small>Balance due</small><strong>${money(metrics.totalBalance)}</strong></button>
        <button data-route="dashboard"><span class="cockpit-status-light ${weatherWatch ? 'warning' : 'active'}"></span><small>Weather watch</small><strong>${weatherWatch}</strong></button>
      </div>
    </div>
    <div class="cockpit-route-strip"><span><small>Next departure</small><strong>${nextTrip ? `${formatDate(nextTrip.tripDate)} · ${formatTime(nextTrip.startTime)}` : 'No upcoming departure'}</strong></span><span><small>Guest / vessel</small><strong>${escapeHtml(nextTrip ? `${nextTrip.customer || 'Trip'} · ${nextTrip.vessel || 'Vessel unassigned'}` : 'Schedule is clear')}</strong></span><span><small>Course status</small><strong>${escapeHtml(nextTrip ? calculateDispatchReadiness(nextTrip) : 'Standing by')}</strong></span></div>
  </section>`;
}

function renderOperationsSnapshot(metrics) {
  const missingCrew = metrics.scheduledTrips.filter((trip) => !trip.captain || !trip.mate).length;
  const missingVessel = metrics.scheduledTrips.filter((trip) => !trip.vessel).length;
  const missingPayment = metrics.scheduledTrips.filter((trip) => Number(trip.balanceDue || 0) > 0).length;
  const conflicts = metrics.scheduledTrips.filter((trip) => assignmentConflictWarnings(trip, trip.id).length).length;
  const cards = [
    ['Today’s trips', metrics.todayTrips.length, `${metrics.readyTrips.filter((trip) => trip.tripDate === new Date().toISOString().slice(0,10)).length} dispatch ready`, 'blue', 'calendar'],
    ['Dispatch ready', metrics.readyTrips.length, `${metrics.needsAttention.length} need attention`, 'green', 'dispatch'],
    ['Missing crew', missingCrew, missingCrew ? 'Assignment required' : 'All crew assigned', missingCrew ? 'gold' : 'green', 'trips'],
    ['Missing vessel', missingVessel, missingVessel ? 'Assignment required' : 'All vessels assigned', missingVessel ? 'gold' : 'green', 'trips'],
    ['Payment pending', missingPayment, money(metrics.totalBalance) + ' outstanding', missingPayment ? 'red' : 'green', 'invoices'],
    ['Conflict alerts', conflicts, conflicts ? 'Resolve before dispatch' : 'No conflicts found', conflicts ? 'red' : 'green', 'calendar']
  ];
  return `<section class="operations-snapshot">${cards.map(([label, value, detail, tone, route]) => `<button class="ops-snapshot-card ${tone}" data-route="${route}"><span>${label}</span><strong>${value}</strong><small>${detail}</small></button>`).join('')}</section>`;
}

function dashboardMetrics() {
  const todayKey = new Date().toISOString().slice(0, 10);
  const scheduledTrips = store.trips.filter((t) => t.status === 'Scheduled').sort(byDate);
  const todayTrips = scheduledTrips.filter((trip) => trip.tripDate === todayKey);
  const readyTrips = scheduledTrips.filter((trip) => calculateDispatchReadiness(trip) === 'Dispatch Ready');
  const notReadyTrips = scheduledTrips.filter((trip) => calculateDispatchReadiness(trip) === 'Not Ready');
  const needsAttention = scheduledTrips.filter((trip) => !['Dispatch Ready', 'Completed'].includes(calculateDispatchReadiness(trip)));
  const totalBalance = store.bookings.reduce((sum, b) => sum + Number(b.balance || 0), 0) + store.trips.reduce((sum, t) => sum + Number(t.balanceDue || 0), 0) + store.invoices.reduce((sum, invoice) => sum + Number(invoice.balanceDue || 0), 0);
  const payrollOwed = payrollEntries().reduce((sum, entry) => sum + Number(entry.outstanding || 0), 0);
  const expenseTotal = store.expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const revenue = store.trips.reduce((sum, trip) => sum + Number(trip.tourPrice || 0), 0) + store.invoices.reduce((sum, invoice) => sum + Number(invoice.tourPrice || 0), 0);
  const incidents = store.incidentReports.filter((incident) => incident.status !== 'Resolved');
  const cruise = (store.cruiseSchedule || []).filter((entry) => String(entry.arrivalDate || '') >= todayKey).sort((a, b) => String(a.arrivalDate + a.arrivalTime).localeCompare(String(b.arrivalDate + b.arrivalTime))).slice(0, 5);
  return { todayTrips, readyTrips, notReadyTrips, needsAttention, totalBalance, payrollOwed, expenseTotal, revenue, incidents, cruise, stock: canViewStockAlerts() ? inventoryAlerts() : [], urgentItems: dashboardUrgentItems(scheduledTrips).slice(0, 6), scheduledTrips };
}

function renderDashboardCustomCard(key, m) {
  const mini = (value, sub) => `<div class="dashboard-mini-card"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(sub)}</span></div>`;
  const rows = {
    todayTrips: m.todayTrips.map((trip) => `${formatTime(trip.startTime)} · ${trip.customer || 'Trip'}`),
    readyTrips: m.readyTrips.map((trip) => `${formatTime(trip.startTime)} · ${trip.customer || 'Trip'}`),
    needsAttention: m.urgentItems.map((item) => `${item.type}: ${item.title}`),
    outstandingBalances: [`${money(m.totalBalance)} unpaid`],
    unreadAlerts: [`${unreadNotificationCount()} unread notifications`],
    unreadChat: [`${unreadChatCount()} unread chat messages`],
    crewAssignments: m.scheduledTrips.slice(0, 5).map((trip) => `${trip.captain || 'No captain'} / ${trip.mate || 'No mate'} · ${trip.customer || 'Trip'}`),
    preTripMissing: m.scheduledTrips.filter((trip) => latestChecklistStatus(trip, 'Pre Trip') !== 'Completed').map((trip) => trip.customer || 'Trip'),
    postTripMissing: m.scheduledTrips.filter((trip) => latestChecklistStatus(trip, 'Post Trip') !== 'Completed').map((trip) => trip.customer || 'Trip'),
    stockAlerts: m.stock.map((item) => `${item.name}: ${item.currentStock} / min ${item.minimumRequiredStock}`),
    payrollOwed: [`${money(m.payrollOwed)} outstanding`],
    expenses: [`${money(m.expenseTotal)} recorded expenses`],
    calendarSummary: [`${m.scheduledTrips.length} upcoming scheduled trips`, `${m.todayTrips.length} trips today`],
    revenueSummary: [`${money(m.revenue)} trips + Invoice / Quote`],
    incidentAlerts: m.incidents.map((incident) => `${incident.severity || 'Incident'} · ${incident.vessel || 'Operations'}`),
    upcomingTours: m.scheduledTrips.slice(0, 5).map((trip) => `${formatDate(trip.tripDate)} · ${trip.customer || 'Trip'}`),
    upcomingCruiseArrivals: m.cruise.map((entry) => `${formatDate(entry.arrivalDate)} · ${entry.shipName || 'Ship'}`)
  }[key] || [];
  return `<details class="card dashboard-custom-card app-accordion" open><summary><h3>${escapeHtml(dashboardCardLabel(key))}</h3><span class="chevron" aria-hidden="true">▼</span></summary><div class="stat-list">${rows.length ? rows.slice(0, 6).map((row) => `<div class="stat-row"><span>${escapeHtml(row)}</span><strong>${statusBadge(key === 'stockAlerts' && !canViewStockAlerts() ? 'Hidden' : rows.length ? 'Ready' : 'Optional')}</strong></div>`).join('') : mini('Optional', 'No matching items right now')}</div></details>`;
}

function renderDashboardCustomizer() {
  const prefs = store.dashboardPreferences || defaultDashboardPreferences;
  return `<details class="card dashboard-customizer"><summary><strong>Customize Dashboard</strong><span class="badge blue">Show / Hide · Reorder · Stored locally</span></summary><div class="dashboard-customizer-grid">${dashboardCardCatalog.map(([key, label]) => `<div class="dashboard-customizer-row"><label><input type="checkbox" data-dashboard-card-toggle="${key}" ${prefs.hidden.includes(key) ? '' : 'checked'}> ${escapeHtml(label)}</label><div><button class="btn btn-outline btn-small" data-dashboard-card-move="${key}" data-direction="up" type="button">Move Up</button><button class="btn btn-outline btn-small" data-dashboard-card-move="${key}" data-direction="down" type="button">Move Down</button></div></div>`).join('')}</div></details>`;
}

function toggleDashboardCard(key) {
  store.dashboardPreferences = normalizeDashboardPreferences(store.dashboardPreferences);
  const hidden = new Set(store.dashboardPreferences.hidden);
  hidden.has(key) ? hidden.delete(key) : hidden.add(key);
  store.dashboardPreferences.hidden = [...hidden];
  addAudit('updated', 'Dashboard', `${dashboardCardLabel(key)} dashboard visibility changed.`, { key });
  saveStore(); renderRoute(currentRoute);
}

function moveDashboardCard(key, direction) {
  store.dashboardPreferences = normalizeDashboardPreferences(store.dashboardPreferences);
  const order = store.dashboardPreferences.order;
  const index = order.indexOf(key);
  const target = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= order.length) return;
  [order[index], order[target]] = [order[target], order[index]];
  addAudit('updated', 'Dashboard', `${dashboardCardLabel(key)} moved ${direction}.`, { key, direction });
  saveStore(); renderRoute(currentRoute);
}

function dashboardUrgentItems(trips) {
  const items = [];
  trips.forEach((trip) => {
    const readiness = calculateDispatchReadiness(trip);
    if (readiness === 'Not Ready') items.push({ type: 'Not Ready', color: 'red', title: trip.customer || 'Trip missing customer', detail: `${formatDate(trip.tripDate)} · ${formatTime(trip.startTime)} · ${trip.vessel || 'Missing vessel'}` });
    if (!trip.captain) items.push({ type: 'Missing captain', color: 'red', title: trip.customer || 'Unassigned trip', detail: 'Assign a captain before dispatch.' });
    if (!trip.mate || trip.mate === 'None') items.push({ type: 'Missing mate', color: 'red', title: trip.customer || 'Unassigned trip', detail: 'Assign a mate before dispatch.' });
    assignmentConflictWarnings(trip, trip.id).filter((warning) => !warning.type.startsWith('Missing')).forEach((warning) => items.push({ type: warning.type, color: 'red', title: trip.customer || 'Assignment conflict', detail: warning.message }));
    if (assignmentConflictWarnings(trip, trip.id).length) { const suggested = buildAssignmentRecommendation(trip, trip.id); items.push({ type: 'Suggested assignment', color: 'gold', title: trip.customer || 'Trip', detail: `${suggested.vessel?.value || 'No vessel'} · ${suggested.captain?.value || 'No captain'} · ${suggested.mate?.value || 'No mate'} (${suggested.confidence})` }); }
    if (latestChecklistStatus(trip, 'Pre Trip') !== 'Completed') items.push({ type: 'Pre trip', color: 'gold', title: trip.customer || 'Checklist needed', detail: 'Pre trip not complete.' });
    if (Number(trip.balanceDue || 0) > 0) items.push({ type: 'Balance Due', color: 'gold', title: trip.customer || 'Customer balance', detail: `${money(trip.balanceDue)} outstanding.` });
  });
  (store.incidentReports || []).filter((incident) => incident.status !== 'Resolved').forEach((incident) => items.push({ type: 'Incident', color: 'red', title: incident.vessel || incident.category || 'Incident alert', detail: incident.description || 'Open incident requires review.' }));
  return items;
}

function kpi(label, value, sub) { return `<div class="card kpi"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${sub}</div></div>`; }

function statusColor(value = '') {
  const text = String(value || '').toLowerCase();
  if (/missing|declined|conflict|not ready|incident|critical|out of service|open/.test(text)) return 'red';
  if (/pending|review|balance|deposit due|submitted|draft|notified|partial|partially ready/.test(text)) return 'gold';
  if (/ready|accepted|paid|complete|resolved|success|operational/.test(text)) return 'green';
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
  page.innerHTML = `<div class="page-stack"><div class="module-actions"><select data-role-person onchange="renderCrewRoleDashboard('${role}')">${getOptions('crew').map((name) => `<option value="${escapeHtml(name)}" ${name === selected ? 'selected' : ''}>${escapeHtml(name)}</option>`).join('')}</select></div>${renderDashboardWeatherWidget()}<div class="grid kpi-grid dashboard-kpis">${kpi('Assigned', assigned.length, `${roleLabel} trip cards`)}${kpi('Upcoming', upcoming.length, 'Not completed or cancelled')}${kpi('Accepted', assigned.filter((trip) => normalizeAssignmentStatus(trip)[role] === 'Accepted').length, 'Accepted status')}${kpi('Completed archive', completed.length, 'Archived completed trips')}</div><div class="role-trip-list">${upcoming.length ? upcoming.map((trip) => renderRoleTripCard(trip, role)).join('') : '<div class="card card-pad empty-state">No upcoming assignments for this crew member.</div>'}</div><div class="card"><div class="card-header"><h3>Completed Trip Archive</h3><span class="badge green">${completed.length} completed</span></div><div class="role-archive-list">${completed.length ? completed.map((trip) => renderRoleArchiveTrip(trip, role)).join('') : '<p class="empty-state">Completed trips will archive here.</p>'}</div></div>${renderPhotoNotePanel(route)}</div>`;
  activateDashboardWeatherWidget();
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
  return `<div class="card role-trip-card ${readinessColorClass(readiness)}"><div class="card-header"><div class="role-card-title">${crewAvatar(trip[role], roleLabel)}<div><h3>${escapeHtml(formatTime(trip.startTime))} · ${escapeHtml(trip.customer || 'Trip')}</h3><p>${escapeHtml(formatDate(trip.tripDate))} · ${Number(trip.passengers || 0)} guests · ${escapeHtml(trip.vessel || 'No vessel')}</p></div></div><div>${assignmentStatusBadge(status)} ${readinessBadge(readiness)}</div></div>${tripReminderBadges(trip, role)}${maintenanceWarning(trip)}${weatherDetailsCard(trip, true)}<div class="role-trip-details"><div><span>Pickup / Departure</span><strong>${escapeHtml(formatTime(trip.startTime))}</strong></div><div><span>${roleLabel} role</span><strong>${escapeHtml(trip[role] || 'Unassigned')}</strong></div><div><span>Pre Trip Status</span><strong>${escapeHtml(latestChecklistStatus(trip, 'Pre Trip'))}</strong></div><div><span>Post Trip Status</span><strong>${escapeHtml(latestChecklistStatus(trip, 'Post Trip'))}</strong></div></div>${readinessChecklistHtml(trip)}${renderCrewFuelCard(trip, role)}<div class="assignment-actions"><button class="btn btn-primary" onclick="acceptAssignment('${trip.id}','${role}')">Accept</button><button class="btn btn-danger" onclick="declineAssignment('${trip.id}','${role}')">Decline</button><button class="btn btn-outline" onclick="completeAssignment('${trip.id}','${role}')">Complete</button><button class="btn btn-outline" onclick="document.querySelector('[data-trip-notes=\'${trip.id}\'][data-note-role=\'${role}\']')?.focus()">Add Notes</button><button class="btn btn-outline" data-command-voice-start>🎙️ Voice Fill Notes</button></div><div class="field"><label>${roleLabel} notes</label><textarea data-trip-notes="${trip.id}" data-note-role="${role}">${escapeHtml(trip[notesKey] || '')}</textarea></div><div class="form-actions"><button class="btn btn-outline btn-small" onclick="saveCrewTripNotes('${trip.id}','${role}')">Submit Notes</button>${role === 'captain' ? `<label class="btn btn-outline btn-small">Upload Photos<input type="file" accept="image/*" multiple hidden onchange="saveCaptainPhotos('${trip.id}', this.files)"></label>` : ''}</div>${role === 'captain' ? renderPhotoList(trip.captainPhotos) : ''}</div>`;
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
  template.querySelector('.add-record-btn').textContent = config.addLabel;
  template.querySelector('.add-record-btn').onclick = () => showForm(route);
  template.querySelector('.card-header h3').textContent = route === 'invoices' ? 'Saved Documents' : `${config.title} records`;
  template.querySelector('thead').innerHTML = `<tr>${config.columns.map(([, label]) => `<th>${label}</th>`).join('')}<th>Actions</th></tr>`;
  page.innerHTML = '';
  page.appendChild(template);
  if (intakeRoutes.has(route)) page.querySelector('.module-actions')?.insertAdjacentHTML('afterend', renderUploadZone(route));

  page.querySelector('.search-input').addEventListener('input', () => renderTable(route));
  renderForm(route);
  if (route === 'bookings') renderUnifiedBookingsTrips();
  if (route === 'trips') { renderAssignmentBoard(); page.querySelector('.page-stack')?.insertAdjacentHTML('beforeend', renderFuelTrackingOverview()); page.querySelector('.page-stack')?.insertAdjacentHTML('beforeend', `<div class="card card-pad trip-weather-overview"><div class="card-header"><h3>Trip Weather Risk</h3><button class="btn btn-outline btn-small" type="button" onclick="refreshLiveWeather()">Refresh Forecast</button></div>${weatherSummaryCards(store.trips)}${store.trips.map((trip) => `<div class="weather-trip-row"><strong>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(trip.customer || 'Trip')}</strong>${weatherRiskBadge(trip)}</div>`).join('') || '<p class="empty-state">No scheduled trips.</p>'}</div>`); }
  if (route === 'crew') renderCrewDashboard();
  if (route === 'vessels') { renderVesselManagementPanel(); renderEntityIncidentHistory('vessel'); }
  if (route === 'crew') renderEntityIncidentHistory('crew');
  if (route !== 'bookings') renderTable(route);
  if (route === 'invoices') renderInvoiceModule();
  if (route === 'cruise-schedule') renderCruiseScheduleModule();
  if (photoNoteRoutes.has(route)) page.querySelector('.page-stack')?.insertAdjacentHTML('beforeend', renderPhotoNotePanel(route));
}

function renderForm(route, record = {}) {
  const config = crudConfig[route];
  const form = document.querySelector(`#page-${route} .record-form`);
  form.innerHTML = `${route === 'bookings' ? renderBookingFlowHeader(record) : route === 'invoices' ? renderInvoiceFlowHeader(record) : route === 'trips' ? naturalSentenceModeHint() : ''}<div class="form-section-stack" data-mobile-form-sections>${renderFormSections(route, config, record)}</div>${route === 'bookings' ? '<div data-booking-live-summary></div>' : route === 'invoices' ? '<div data-invoice-live-summary></div>' : ''}${route === 'trips' ? `<div data-assignment-recommendation></div><div class="conflict-panel" data-conflict-panel hidden></div>${renderFuelReceiptEditor(record)}${renderTripProfitability(record)}${record.id ? weatherDetailsCard(record) : ''}` : ''}<div class="form-actions sticky-save-controls" data-sticky-save-controls><button class="btn btn-primary" type="submit">${route === 'bookings' ? 'Save Booking / Trip' : route === 'invoices' ? 'Save Invoice / Quote' : `Save ${config.title.slice(0, -1)}`}</button>${voiceFillButton(route)}<button class="btn btn-outline" type="button" data-cancel>Cancel</button></div>`;
  if (route === 'bookings') {
    form.addEventListener('input', () => updateBookingFormSummary(form));
    form.addEventListener('change', () => updateBookingFormSummary(form));
    updateBookingFormSummary(form);
  }
  if (route === 'invoices') {
    const updateInvoice = () => { updateInvoiceBalanceDue(form); updateInvoiceFormSummary(form); };
    form.addEventListener('input', updateInvoice);
    form.addEventListener('change', updateInvoice);
    updateInvoice();
  }
  if (route === 'trips') {
    form.addEventListener('input', () => { updateTripConflictPreview(form); updateTripAssignmentRecommendation(form); updateFuelCalculation(form); });
    form.addEventListener('change', (event) => {
      if (['tourPrice', 'depositPaid'].includes(event.target.name)) updateBalanceDue(form);
      updateTripAssignmentRecommendation(form);
      updateFuelCalculation(form);
    });
  }
  if (route === 'trips') { updateTripAssignmentRecommendation(form); updateFuelCalculation(form); }
  form.onsubmit = (event) => saveRecord(event, route);
  form.querySelector('[data-cancel]').onclick = () => { editing[route] = null; form.hidden = true; };
}

function formSectionForField(key) {
  if (['fuelStartLevel', 'fuelEndLevel', 'gallonsUsed', 'fuelPricePerGallon', 'fuelCostManualOverride', 'totalFuelCost', 'fuelPaidBy', 'createFuelExpense', 'fuelNotes'].includes(key)) return 'Fuel Tracking & Profitability';
  if (['customer', 'customerName', 'phone', 'email', 'bookingSource', 'source'].includes(key)) return 'Customer';
  if (['tripDate', 'date', 'startTime', 'returnTime', 'duration', 'time', 'arrivalDate', 'arrivalTime', 'departureTime', 'passengers', 'guests', 'guestCount', 'hours', 'tourType', 'product', 'vessel', 'shipName', 'cruiseLine', 'terminalDock', 'passengerCapacity', 'pickupLocation', 'customPickupLocation', 'pickupDirections', 'meetingPoint'].includes(key)) return 'Booking / Trip';
  if (['tourPrice', 'price', 'baseTourPrice', 'swimmingPigsPrice', 'swimmingPigsPeople', 'lunchPrice', 'lunchPeople', 'otherAddOnName', 'otherAddOnPrice', 'otherAddOnQuantity', 'boat2Adults', 'boat2Kids', 'depositPercent', 'depositPaid', 'balanceDue', 'balance', 'paymentStatus', 'paymentMethod', 'amount', 'defaultPayout', 'invoiceNumber', 'documentType'].includes(key)) return 'Financial';
  if (['captain', 'mate', 'cruiseLine', 'cruiseShip', 'owner', 'role', 'active', 'tripId', 'bookingId', 'reportedBy', 'severity', 'category', 'status', 'assignedTrips', 'maintenanceNotes', 'readinessSummary'].includes(key)) return 'Assignment / Management';
  return 'Notes';
}

function renderFormSections(route, config, record) {
  if (route === 'bookings') {
    const groups = [
      ['Customer & Source', 'Who is booking and where did the reservation come from?', ['order','customer','phone','email','source']],
      ['Tour Schedule', 'Set the tour details that create the scheduled operational trip.', ['product','date','time','hours','guests','pickupLocation']],
      ['Payment', 'Record the agreed price and payment progress.', ['price','depositRequired','deposit','balance']],
      ['Notes & Review', 'Set the status, add special requests, then review before saving.', ['status','notes']]
    ];
    const byKey = Object.fromEntries(config.fields.map((field) => [field[0], field]));
    return groups.map(([section, helper, keys], index) => `<details class="form-section-card booking-flow-section app-accordion" ${index === 0 ? 'open' : ''}><summary><div class="booking-step-number">${index + 1}</div><div class="form-section-title"><h3>${section}</h3><p>${helper}</p></div><span class="chevron" aria-hidden="true">⌄</span></summary><div class="form-grid">${keys.map((key) => byKey[key]).filter(Boolean).map((field) => renderBookingFlowField(field, record)).join('')}</div>${index < groups.length - 1 ? `<div class="booking-step-footer"><button class="btn btn-outline btn-small" type="button" onclick="openNextBookingStep(this)">Continue to ${groups[index + 1][0]}</button></div>` : ''}</details>`).join('');
  }
  if (route === 'invoices') {
    const groups = [
      ['Document & Customer', 'Choose the document type and enter the customer once.', ['documentType','invoiceNumber','customerName','phone','email','bookingSource']],
      ['Tour Schedule', 'Set the tour details used by the customer document and linked trip.', ['tourType','tripDate','startTime','duration','returnTime','guestCount','pickupLocation','cruiseLine','cruiseShip']],
      ['Pricing', 'Build the group rate and add-ons. The total calculates automatically.', ['baseTourPrice','swimmingPigsPeople','swimmingPigsPrice','lunchPeople','lunchPrice','otherAddOnName','otherAddOnQuantity','otherAddOnPrice','secondBoat','secondBoatPrice','tourPrice']],
      ['Payment', 'Record the deposit and payment status. The balance calculates automatically.', ['depositPercent','depositPaid','balanceDue','paymentMethod','paymentStatus']],
      ['Operations Assignment', 'Assign the vessel and crew when known.', ['vessel','captain','mate']],
      ['Notes & Preview', 'Add customer-facing details and internal notes before saving.', ['includedItems','whatToBring','customerSummary','notes']]
    ];
    const byKey = Object.fromEntries(config.fields.map((field) => [field[0], field]));
    return groups.map(([section, helper, keys], index) => `<details class="form-section-card booking-flow-section invoice-flow-section app-accordion" ${index === 0 ? 'open' : ''}><summary><div class="booking-step-number">${index + 1}</div><div class="form-section-title"><h3>${section}</h3><p>${helper}</p></div><span class="chevron" aria-hidden="true">⌄</span></summary><div class="form-grid">${keys.map((key) => byKey[key]).filter(Boolean).map((field) => renderInvoiceFlowField(field, record)).join('')}</div>${index < groups.length - 1 ? `<div class="booking-step-footer"><button class="btn btn-outline btn-small" type="button" onclick="openNextBookingStep(this)">Continue to ${groups[index + 1][0]}</button></div>` : ''}</details>`).join('');
  }
  const sections = config.fields.reduce((acc, field) => { const section = formSectionForField(field[0]); acc[section] ||= []; acc[section].push(field); return acc; }, {});
  return Object.entries(sections).map(([section, fields], index) => `<details class="form-section-card app-accordion" ${index < 2 ? 'open' : ''}><summary><div class="form-section-title"><h3>${escapeHtml(section)}</h3></div><span class="chevron" aria-hidden="true">⌄</span></summary><div class="form-grid">${fields.map(([key, label, type]) => renderField(key, label, type, record[key])).join('')}</div></details>`).join('');
}

function naturalSentenceModeHint() { return ''; }

function voiceFillButton(route) { return voiceSupportedRoutes.has(route) ? `<button class="btn btn-outline" type="button" data-voice-fill>🎙️ Voice Fill</button>` : ''; }

function renderField(key, label, type, value = '') {
  if (type === 'textarea') return `<div class="field"><label for="${key}">${label}</label><textarea id="${key}" name="${key}">${escapeHtml(value)}</textarea></div>`;
  if (type.startsWith('select:')) {
    const options = getOptions(type.split(':')[1]);
    return `<div class="field"><label for="${key}">${label}</label><select id="${key}" name="${key}"><option value="">Select ${escapeHtml(label)}</option>${options.map((opt) => `<option value="${escapeHtml(opt)}" ${String(value) === String(opt) ? 'selected' : ''}>${escapeHtml(opt)}</option>`).join('')}</select></div>`;
  }
  return `<div class="field"><label for="${key}">${label}</label><input id="${key}" name="${key}" type="${type}" value="${escapeHtml(value)}"></div>`;
}

function createInvoiceDocument(type = 'Quote') {
  if (!canAccessRoute('invoices')) return toast('Your role cannot create billing documents.');
  showForm('invoices');
  const form = document.querySelector('#page-invoices .record-form');
  if (!form?.elements.documentType) return toast('Invoice / Quote form could not be opened.');
  form.elements.documentType.value = type;
  form.elements.customerName?.focus();
  toast('Create Invoice / Quote form ready.');
}

function showForm(route, id = null) {
  if (route === 'trips') {
    const trip = id ? store.trips.find((item) => item.id === id) : null;
    if ((trip && !canEditTripFuel(trip)) || (!trip && !['Admin', 'Owner'].includes(activeRoleName()))) return toast('This role has view-only access to trip fuel and profitability.');
    pendingFuelReceipt = null;
  }
  const config = crudConfig[route];
  const record = id ? store[config.collection].find((item) => item.id === id) : (route === 'bookings' ? { order: nextBookingOrderNumber() } : {});
  editing[route] = id;
  renderForm(route, record);
  const form = document.querySelector(`#page-${route} .record-form`);
  form.hidden = false;
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function saveRecord(event, route) {
  event.preventDefault();
  if (route === 'trips' && editing[route]) { const existingTrip = store.trips.find((trip) => trip.id === editing[route]); if (existingTrip && !canEditTripFuel(existingTrip)) return toast('This role cannot edit this trip.'); }
  const config = crudConfig[route];
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  config.fields.forEach(([key,, type]) => { if (type === 'number') data[key] = Number(data[key] || 0); });
  if (data.phone) data.phone = normalizePhoneNumber(data.phone);
  if (route === 'bookings' && !editing[route]) data.order = nextBookingOrderNumber();
  if (route === 'bookings') {
    data.price = Number(data.price || 0);
    data.deposit = Number(data.deposit || 0);
    data.balance = Math.max(data.price - data.deposit, 0);
    data.status = data.status || 'Draft';
  }
  if (route === 'invoices') {
    data.returnTime = data.returnTime || data.endTime || calculateEndTime(data.startTime, data.duration);
    data.endTime = data.returnTime; // legacy storage compatibility; the UI exposes Return Time only.
    data.tourPrice = invoiceTotal(data);
    data.guestCount = Number(data.guestCount || 0) || Number(data.adultCount || 0) + Number(data.kidCount || 0) + Number(data.boat2Adults || 0) + Number(data.boat2Kids || 0);
    data.balanceDue = Math.max(Number(data.tourPrice || 0) - Number(data.depositPaid || 0), 0);
    data.paymentStatus = data.paymentStatus || (data.balanceDue <= 0 ? 'Paid in Full' : Number(data.depositPaid || 0) > 0 ? 'Deposit Paid' : 'Deposit Due');
    data.invoiceNumber = data.invoiceNumber || `INV-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${String(store.invoices.length + 1).padStart(3, '0')}`;
  }
  if (route === 'trips') {
    const previousFuelTrip = editing[route] ? store.trips.find((trip) => trip.id === editing[route]) : null;
    data.gallonsUsed = calculateGallonsUsed(data);
    data.totalFuelCost = data.fuelCostManualOverride === 'Yes' ? Number(data.totalFuelCost || 0) : calculateFuelCost(data);
    data.fuelReceipt = pendingFuelReceipt || previousFuelTrip?.fuelReceipt || null;
    if (MAINTENANCE_VESSELS.includes(data.vessel) && data.status === 'Completed' && (!data.gallonsUsed || !data.fuelPricePerGallon)) {
      toast('Fuel gallons and price are required before completing a primary vessel trip.');
      return;
    }
    if (maintenanceStatusForVessel(data.vessel) === 'Out of Service') {
      showTripAssignmentWarning(event.currentTarget, 'Assignment blocked', [`${data.vessel} is Out of Service`]);
      toast('Out of Service vessels cannot be assigned.');
      return;
    }
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
    data.assignmentRecommendation = buildAssignmentRecommendation(data, editing[route]);
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
  if (route === 'bookings') synchronizeBookingWorkflow({ ...data, id: savedId });
  addAudit(action, config.title, `${config.title.slice(0, -1)} ${summarizeRecord(data)} ${action}.`, { route });
  if (route === 'trips') syncFuelExpense({ ...data, id: savedId });
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
    handleSavedInvoiceWorkflow(store.invoices.find((invoice) => invoice.id === savedId));
    addNotification('Invoice / Quote saved', `${data.invoiceNumber || 'Invoice'} for ${data.customerName || 'customer'} is ${data.paymentStatus}.`, 'success', { route, category: 'Invoice', invoiceId: savedId });
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
  if (route === 'trips' && !['Admin', 'Owner'].includes(activeRoleName())) return toast('This role cannot delete trips.');
  if (route === 'bookings' && (store.invoices.some((invoice) => invoice.bookingId === id) || store.trips.some((trip) => trip.bookingId === id))) return toast('Linked bookings cannot be deleted. Set the booking status to Cancelled to preserve financial and operational history.');
  const config = crudConfig[route];
  if (!confirm(`Delete this ${config.title.slice(0, -1).toLowerCase()}?`)) return;
  const record = store[config.collection].find((item) => item.id === id);
  store[config.collection] = store[config.collection].filter((item) => item.id !== id);
  addAudit('deleted', config.title, `${config.title.slice(0, -1)} ${summarizeRecord(record)} deleted.`, { route });
  addNotification(`${config.title.slice(0, -1)} deleted`, `${summarizeRecord(record)} was removed from ${config.title}.`, 'warning', { route });
  saveStore();
  if (route === 'trips') renderCrud(route);
  if (route === 'crew') renderCrewDashboard();
  if (route === 'vessels') { renderVesselManagementPanel(); renderEntityIncidentHistory('vessel'); }
  if (route === 'crew') renderEntityIncidentHistory('crew');
  renderTable(route);
  if (route === 'invoices') renderInvoiceModule();
  if (route === 'cruise-schedule') renderCruiseScheduleModule();
  toast(`${config.title.slice(0, -1)} deleted locally.`);
}

function visibleRecordsForRoute(route, records = []) {
  const role = activeRoleName(); const person = activeRolePerson(role);
  if (route === 'trips') return records.filter((trip) => role === 'Admin' || role === 'Bookkeeper' || (role === 'Owner' && ownerForVesselName(trip.vessel) === person) || (role === 'Captain' && trip.captain === person) || (role === 'Mate' && trip.mate === person));
  if (route === 'bookings' && ['Owner','Captain','Mate'].includes(role)) { const visibleBookingIds = new Set(visibleRecordsForRoute('trips', store.trips).filter((trip) => trip.tripDate && trip.startTime).map((trip) => trip.bookingId)); return records.filter((booking) => visibleBookingIds.has(booking.id)); }
  if (route === 'invoices' && role === 'Owner') return records.filter((invoice) => ownerForVesselName(invoice.vessel) === person);
  return records;
}

function bookingWorkflowActions(booking) {
  const hasInvoice = store.invoices.some((invoice) => invoice.bookingId === booking.id);
  const hasTrip = store.trips.some((trip) => trip.bookingId === booking.id);
  return `<button class="btn btn-primary btn-small" onclick="generateInvoiceFromBooking('${booking.id}')">${hasInvoice ? 'Open invoice' : 'Generate invoice'}</button>${['Confirmed', 'Scheduled', 'Completed'].includes(booking.status) ? `<button class="btn btn-outline btn-small" onclick="createTripFromBooking('${booking.id}')">${hasTrip ? 'Open trip' : 'Create trip'}</button>` : ''}`;
}

function bookingSnapshot(booking) {
  return { customer: booking.customer || '', phone: booking.phone || '', email: booking.email || '', bookingSource: booking.source || '', tripDate: booking.date || '', startTime: booking.time || '', passengers: Number(booking.guests || 0), hours: Number(booking.hours || 4), tourType: booking.product || '', pickupLocation: booking.pickupLocation || '', tourPrice: Number(booking.price || 0), depositPaid: Number(booking.deposit || 0), balanceDue: Number(booking.balance || 0), notes: booking.notes || '' };
}

function generateInvoiceFromBooking(bookingId, silent = false) {
  const booking = store.bookings.find((item) => item.id === bookingId);
  if (!booking) return toast('Booking not found.');
  let invoice = store.invoices.find((item) => item.bookingId === bookingId);
  const snap = bookingSnapshot(booking);
  const paymentStatus = snap.balanceDue <= 0 ? 'Paid in Full' : snap.depositPaid > 0 ? 'Deposit Paid' : 'Deposit Due';
  if (invoice) Object.assign(invoice, { customerName: snap.customer, phone: snap.phone, email: snap.email, tripDate: snap.tripDate, startTime: snap.startTime, tourType: snap.tourType, guestCount: snap.passengers, pickupLocation: snap.pickupLocation, bookingSource: snap.bookingSource, tourPrice: snap.tourPrice, depositPaid: snap.depositPaid, balanceDue: snap.balanceDue, paymentStatus, notes: snap.notes });
  else {
    invoice = { id: makeId('invoices'), invoiceNumber: `INV-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${String(store.invoices.length + 1).padStart(3, '0')}`, documentType: 'Invoice', bookingId, customerName: snap.customer, phone: snap.phone, email: snap.email, tripDate: snap.tripDate, startTime: snap.startTime, tourType: snap.tourType, guestCount: snap.passengers, pickupLocation: snap.pickupLocation, bookingSource: snap.bookingSource, tourPrice: snap.tourPrice, depositPaid: snap.depositPaid, balanceDue: snap.balanceDue, paymentStatus, notes: snap.notes };
    store.invoices.push(invoice);
    addAudit('created', 'Invoices', `${invoice.invoiceNumber} generated from booking ${booking.order || booking.id}.`, { bookingId, invoiceId: invoice.id });
  }
  booking.invoiceId = invoice.id;
  saveStore();
  if (!silent) { renderRoute('invoices'); showForm('invoices', invoice.id); toast('Linked invoice opened. Booking details stay synchronized.'); }
  return invoice;
}

function createTripFromBooking(bookingId, silent = false) {
  const booking = store.bookings.find((item) => item.id === bookingId);
  if (!booking) return toast('Booking not found.');
  let trip = store.trips.find((item) => item.bookingId === bookingId);
  const invoice = store.invoices.find((item) => item.bookingId === bookingId);
  const snap = bookingSnapshot(booking);
  if (trip) Object.assign(trip, snap, { invoiceId: invoice?.id || trip.invoiceId, paymentStatus: invoice?.paymentStatus || trip.paymentStatus, dispatchReadinessStatus: calculateDispatchReadiness({ ...trip, ...snap }) });
  else {
    trip = normalizeTrip({ id: makeId('trips'), bookingId, invoiceId: invoice?.id || '', ...snap, status: booking.status === 'Completed' ? 'Completed' : 'Scheduled' });
    trip.dispatchReadinessStatus = calculateDispatchReadiness(trip);
    store.trips.push(trip);
    addAudit('created', 'Trips', `Operational trip created from booking ${booking.order || booking.id}.`, { bookingId, tripId: trip.id });
  }
  booking.tripId = trip.id;
  if (invoice) invoice.tripId = trip.id;
  saveStore();
  if (!silent) { renderRoute('trips'); showForm('trips', trip.id); toast('Linked operational trip opened. Assign vessel and crew to continue.'); }
  return trip;
}

function synchronizeBookingWorkflow(booking) {
  const saved = store.bookings.find((item) => item.id === booking.id);
  if (!saved) return;
  const existingInvoice = store.invoices.find((item) => item.bookingId === booking.id);
  const existingTrip = store.trips.find((item) => item.bookingId === booking.id);
  if (existingInvoice) generateInvoiceFromBooking(booking.id, true);
  if (existingTrip) createTripFromBooking(booking.id, true);
  if (booking.date && booking.time) createTripFromBooking(booking.id, true);
}


const WORKFLOW_PIPELINE = ['Quote','Invoice Sent','Deposit Due','Deposit Paid','Booked','Scheduled','Assigned','Ready','Completed','Closed Out','Cancelled'];

function workflowPipelineStatus(booking, trip, invoice) {
  if (booking?.status === 'Cancelled' || trip?.status === 'Cancelled') return 'Cancelled';
  if (trip?.status === 'Completed') return trip.postTripChecklistStatus === 'Completed' ? 'Closed Out' : 'Completed';
  if (trip && calculateDispatchReadiness(trip) === 'Ready') return 'Ready';
  if (trip?.vessel && trip?.captain && trip?.mate) return 'Assigned';
  if (trip?.tripDate && trip?.startTime) return 'Scheduled';
  if (booking) return 'Booked';
  if (invoice?.documentType === 'Quote') return 'Quote';
  if (invoice?.paymentStatus === 'Deposit Paid') return 'Deposit Paid';
  if (invoice?.paymentStatus === 'Deposit Due') return 'Deposit Due';
  return 'Invoice Sent';
}

function workflowBadges(booking, trip, invoice) {
  return [invoice?.documentType, booking && 'Booking', trip && 'Trip'].filter(Boolean).map((label) => `<span class="badge blue">${escapeHtml(label)}</span>`).join('');
}

function unifiedWorkflowRecords() {
  const usedTrips = new Set(); const usedInvoices = new Set();
  const records = store.bookings.map((booking) => {
    const trip = store.trips.find((item) => item.bookingId === booking.id); const invoice = store.invoices.find((item) => item.bookingId === booking.id);
    if (trip) usedTrips.add(trip.id); if (invoice) usedInvoices.add(invoice.id); return { booking, trip, invoice };
  });
  store.trips.filter((trip) => !usedTrips.has(trip.id)).forEach((trip) => records.push({ booking: null, trip, invoice: store.invoices.find((item) => item.tripId === trip.id) || null }));
  store.invoices.filter((invoice) => !usedInvoices.has(invoice.id) && !invoice.tripId && invoice.documentType !== 'Quote').forEach((invoice) => records.push({ booking: null, trip: null, invoice }));
  return records;
}

function renderUnifiedWorkflowCard({ booking, trip, invoice }) {
  const status = workflowPipelineStatus(booking, trip, invoice);
  const customer = booking?.customer || trip?.customer || invoice?.customerName || 'Unnamed customer';
  const date = booking?.date || trip?.tripDate || invoice?.tripDate || ''; const time = booking?.time || trip?.startTime || invoice?.startTime || '';
  const balance = booking?.balance ?? trip?.balanceDue ?? invoice?.balanceDue;
  const vessel = trip?.vessel || invoice?.vessel || 'Unassigned';
  const crew = [trip?.captain || invoice?.captain, trip?.mate || invoice?.mate].filter(Boolean).join(' / ') || 'Unassigned';
  return `<article class="card unified-workflow-card"><header><div><div class="linked-record-badges">${workflowBadges(booking,trip,invoice)}</div><h3>${escapeHtml(customer)}</h3><p>${escapeHtml(formatDate(date))} · ${escapeHtml(formatTime(time) || 'Unscheduled')} · ${escapeHtml(booking?.product || trip?.tourType || invoice?.tourType || 'Tour')}</p></div><span class="badge green">${escapeHtml(status)}</span></header><div class="unified-record-grid"><div><span>Guests</span><strong>${escapeHtml(booking?.guests ?? trip?.passengers ?? invoice?.guestCount ?? '—')}</strong></div><div><span>Balance</span><strong>${money(balance || 0)}</strong></div><div><span>Vessel</span><strong>${escapeHtml(vessel)}</strong></div><div><span>Crew</span><strong>${escapeHtml(crew)}</strong></div></div><footer>${booking ? `<button class="btn btn-primary btn-small" onclick="showForm('bookings','${booking.id}')">Edit</button>` : ''}${trip ? `<button class="btn btn-outline btn-small" onclick="openCalendarTrip('${trip.id}')">Dispatch</button>` : ''}${invoice ? `<button class="btn btn-outline btn-small" onclick="showForm('invoices','${invoice.id}')">${escapeHtml(invoice.documentType || 'Invoice')}</button>` : ''}</footer></article>`;
}

function renderMigrationReport() {
  const report = store.workflowMigrationReport || { linkedRecords: [], unmatchedBookings: [], unmatchedTrips: [], duplicatesNeedingReview: [] };
  return `<details class="card card-pad app-accordion migration-report"><summary><div><h3>Bookings / Trips Migration Report</h3><p class="muted-text">Existing data is preserved; exact customer/date/time matches are linked and ambiguous records remain marked Needs Review.</p></div><span class="chevron">⌄</span></summary><div class="migration-report-grid">${[['Linked Records',report.linkedRecords],['Unmatched Bookings',report.unmatchedBookings],['Unmatched Trips',report.unmatchedTrips],['Duplicates Needing Review',report.duplicatesNeedingReview]].map(([label,items]) => `<div><strong>${items.length}</strong><span>${label}</span></div>`).join('')}</div></details>`;
}

function renderUnifiedBookingsTrips() {
  const page = document.getElementById('page-bookings'); if (!page) return;
  const visibleBookings = new Set(visibleRecordsForRoute('bookings', store.bookings).map((booking) => booking.id)); const visibleTrips = new Set(visibleRecordsForRoute('trips', store.trips).map((trip) => trip.id));
  const records = unifiedWorkflowRecords().filter(({ booking, trip }) => (booking && visibleBookings.has(booking.id)) || (trip && visibleTrips.has(trip.id)) || (!booking && !trip && ['Admin','Bookkeeper'].includes(activeRoleName()))); const scheduled = visibleRecordsForRoute('trips', store.trips).filter((trip) => trip.tripDate && trip.startTime);
  const module = document.createElement('section'); module.className = 'unified-workflow'; module.innerHTML = `<div class="card card-pad unified-workflow-hero"><div><p class="eyebrow">Bookings / Trips</p><h2>Upcoming Trips</h2><p>Create or edit the reservation here. Use Dispatch for assignments and readiness.</p></div><div class="unified-workflow-actions"><button class="btn btn-primary" onclick="showForm('bookings')">New Booking / Trip</button><button class="btn btn-outline" data-route="dispatch">Open Dispatch</button></div></div><div class="workflow-summary"><span class="badge blue">${records.length} Total</span><span class="badge green">${scheduled.length} Scheduled</span></div><div class="unified-workflow-list">${records.map(renderUnifiedWorkflowCard).join('') || '<p class="empty-state">No bookings or trips yet. Select New Booking / Trip to begin.</p>'}</div>`;
  page.querySelector('.page-stack').prepend(module);
  page.querySelector('.module-actions')?.remove();
  page.querySelector('.table-card')?.remove();
}

function renderBookingFlowHeader(record = {}) {
  return `<div class="booking-flow-header"><div><p class="eyebrow">Guided Booking / Trip Builder</p><h2>${record.id ? 'Update reservation' : 'Create reservation'}</h2><p>Enter the reservation once. A date and time automatically create the linked operational trip.</p></div><div class="booking-progress-strip">${['Customer','Schedule','Payment','Review'].map((label, index) => `<span><b>${index + 1}</b>${label}</span>`).join('')}</div></div>`;
}

function renderInvoiceFlowHeader(record = {}) {
  return `<div class="booking-flow-header invoice-flow-header"><div><p class="eyebrow">Guided Customer Document Builder</p><h2>${record.id ? 'Update invoice / quote' : 'Create invoice / quote'}</h2><p>Enter customer, tour, pricing, and payment details once. Scheduled invoices connect to the Booking / Trip workflow automatically.</p></div><div class="booking-progress-strip">${['Customer','Schedule','Pricing','Payment','Assignment','Review'].map((label, index) => `<span><b>${index + 1}</b>${label}</span>`).join('')}</div></div>`;
}

function renderBookingFlowField([key, label, type], record) {
  const clearerLabels = { order: 'Booking number', date: 'Tour date', time: 'Start time', hours: 'Duration (hours)', product: 'Tour type', source: 'Booking source', price: 'Total tour price', depositRequired: 'Required deposit amount', deposit: 'Deposit paid', balance: 'Balance due', status: 'Booking / Trip status', notes: 'Special requests and notes' };
  let markup = renderField(key, clearerLabels[key] || label, type, record[key]);
  if (['order','balance'].includes(key)) markup = markup.replace('<input ', '<input readonly ');
  if (['customer','phone','email','source','product','date','time','hours','guests','pickupLocation'].includes(key)) markup = markup.replace(/<(input|select) /, '<$1 required ');
  return markup;
}

function renderInvoiceFlowField([key, label, type], record) {
  const clearerLabels = { invoiceNumber: 'Document number (generated when saved)', tripDate: 'Tour date', duration: 'Duration (hours)', returnTime: 'Return time (calculated)', guestCount: 'Number of guests', baseTourPrice: 'Base tour price', swimmingPigsPeople: 'Swimming Pigs guests', lunchPeople: 'Lunch guests', tourPrice: 'Total booking cost (calculated)', balanceDue: 'Balance due (calculated)', customerSummary: 'Customer-facing summary', notes: 'Internal notes' };
  let markup = renderField(key, clearerLabels[key] || label, type, record[key]);
  if (['invoiceNumber','returnTime','tourPrice','balanceDue'].includes(key)) markup = markup.replace('<input ', '<input readonly ');
  if (['documentType','customerName','phone','email','bookingSource','tourType','tripDate','startTime','duration','guestCount','pickupLocation','baseTourPrice'].includes(key)) markup = markup.replace(/<(input|select) /, '<$1 required ');
  return markup;
}

function openNextBookingStep(button) {
  const current = button.closest('details'), next = current?.nextElementSibling;
  if (!(next instanceof HTMLDetailsElement)) return;
  current.open = false; next.open = true;
  next.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateBookingFormSummary(form) {
  const price = Number(form.elements.price?.value || 0), deposit = Number(form.elements.deposit?.value || 0);
  const balance = Math.max(price - deposit, 0);
  if (form.elements.balance) form.elements.balance.value = balance.toFixed(2).replace(/\.00$/, '');
  const host = form.querySelector('[data-booking-live-summary]');
  if (!host) return;
  const customer = form.elements.customer?.value || 'Customer not entered';
  const schedule = form.elements.date?.value && form.elements.time?.value ? `${formatDate(form.elements.date.value)} at ${formatTime(form.elements.time.value)}` : 'Date and time required';
  const ready = Boolean(form.elements.customer?.value && form.elements.phone?.value && form.elements.email?.value && form.elements.source?.value && form.elements.product?.value && form.elements.date?.value && form.elements.time?.value && form.elements.hours?.value && form.elements.guests?.value && form.elements.pickupLocation?.value);
  host.innerHTML = `<div class="booking-review-card ${ready ? 'ready' : ''}"><div><p class="eyebrow">Final review</p><h3>${escapeHtml(customer)}</h3><p>${escapeHtml(schedule)} · ${escapeHtml(form.elements.product?.value || 'Tour type required')} · ${escapeHtml(form.elements.guests?.value || '0')} guests</p></div><div class="booking-review-financial"><span><small>Total</small><strong>${money(price)}</strong></span><span><small>Paid</small><strong>${money(deposit)}</strong></span><span><small>Balance</small><strong>${money(balance)}</strong></span></div><span class="badge ${ready ? 'green' : 'gold'}">${ready ? 'Ready to save' : 'Complete required fields'}</span></div>`;
}

function updateInvoiceFormSummary(form) {
  const host = form.querySelector('[data-invoice-live-summary]');
  if (!host) return;
  const total = Number(form.elements.tourPrice?.value || 0), paid = Number(form.elements.depositPaid?.value || 0), balance = Number(form.elements.balanceDue?.value || 0);
  const customer = form.elements.customerName?.value || 'Customer not entered';
  const schedule = form.elements.tripDate?.value && form.elements.startTime?.value ? `${formatDate(form.elements.tripDate.value)} at ${formatTime(form.elements.startTime.value)}` : 'Tour date and start time required';
  const ready = Boolean(form.elements.documentType?.value && form.elements.customerName?.value && form.elements.phone?.value && form.elements.email?.value && form.elements.bookingSource?.value && form.elements.tourType?.value && form.elements.tripDate?.value && form.elements.startTime?.value && form.elements.duration?.value && form.elements.guestCount?.value && form.elements.pickupLocation?.value && form.elements.baseTourPrice?.value);
  host.innerHTML = `<div class="booking-review-card invoice-review-card ${ready ? 'ready' : ''}"><div><p class="eyebrow">Final review</p><h3>${escapeHtml(form.elements.documentType?.value || 'Select document type')} · ${escapeHtml(customer)}</h3><p>${escapeHtml(schedule)} · ${escapeHtml(form.elements.tourType?.value || 'Tour type required')} · ${escapeHtml(form.elements.guestCount?.value || '0')} guests</p></div><div class="booking-review-financial"><span><small>Total</small><strong>${money(total)}</strong></span><span><small>Paid</small><strong>${money(paid)}</strong></span><span><small>Balance</small><strong>${money(balance)}</strong></span></div><span class="badge ${ready ? 'green' : 'gold'}">${ready ? 'Ready to save' : 'Complete required fields'}</span></div>`;
}

function invoiceToBookingSnapshot(invoice) {
  return normalizeBooking({ customer: invoice.customerName, phone: invoice.phone, email: invoice.email, date: invoice.tripDate, time: invoice.startTime, product: invoice.tourType, guests: invoice.guestCount, source: invoice.bookingSource, pickupLocation: invoice.pickupLocation, price: invoice.tourPrice, deposit: invoice.depositPaid, balance: invoice.balanceDue, status: invoice.tripDate && invoice.startTime ? 'Scheduled' : 'Confirmed', notes: invoice.notes });
}

function handleSavedInvoiceWorkflow(invoice) {
  if (!invoice || invoice.documentType === 'Quote') return;
  if (invoice.bookingId) return synchronizeInvoiceWorkflow(invoice, true);
  if (invoice.documentType === 'Tour Confirmation') return synchronizeInvoiceWorkflow(invoice, true);
  if (invoice.documentType === 'Invoice' && invoice.tripDate && invoice.startTime) return synchronizeInvoiceWorkflow(invoice, true);
}

function convertDocumentToBookingTrip(invoiceId) {
  const invoice = findInvoice(invoiceId); if (!invoice) return;
  const originalType = invoice.documentType; invoice.documentType = originalType === 'Quote' ? 'Quote' : invoice.documentType;
  let booking = store.bookings.find((item) => item.id === invoice.bookingId);
  if (!booking) { booking = { id: makeId('bookings'), order: nextBookingOrderNumber(), ...invoiceToBookingSnapshot(invoice) }; store.bookings.push(booking); invoice.bookingId = booking.id; }
  synchronizeBookingWorkflow(booking); const trip = store.trips.find((item) => item.bookingId === booking.id); if (trip) { trip.invoiceId = invoice.id; invoice.tripId = trip.id; }
  addAudit('converted', 'Invoice / Quote', `${originalType || 'Document'} converted to linked booking${trip ? ' and trip' : ''}.`, { invoiceId, bookingId: booking.id, tripId: trip?.id || '' }); saveStore(); renderRoute('bookings'); toast(trip ? 'Booking and scheduled trip created.' : 'Booking created. Add date and time to schedule the trip.');
}

function synchronizeInvoiceWorkflow(invoice, silent = false) {
  if (!invoice || invoice.documentType === 'Quote') return null;
  let booking = store.bookings.find((item) => item.id === invoice.bookingId);
  if (!booking) { booking = { id: makeId('bookings'), order: nextBookingOrderNumber(), ...invoiceToBookingSnapshot(invoice) }; store.bookings.push(booking); invoice.bookingId = booking.id; }
  else Object.assign(booking, invoiceToBookingSnapshot(invoice), { id: booking.id, order: booking.order });
  synchronizeBookingWorkflow(booking);
  const trip = store.trips.find((item) => item.bookingId === booking.id); if (trip) { trip.invoiceId = invoice.id; invoice.tripId = trip.id; }
  if (!silent) toast(trip ? 'Invoice linked to booking and scheduled trip.' : 'Invoice linked to booking. Add date and time to schedule a trip.');
  return { booking, trip };
}

function reconcileExistingWorkflow(target) {
  const linkedRecords = [], unmatchedBookings = [], unmatchedTrips = [], duplicatesNeedingReview = [], usedTrips = new Set();
  const keyBooking = (b) => `${String(b.customer||'').trim().toLowerCase()}|${b.date||''}|${b.time||''}`; const keyTrip = (t) => `${String(t.customer||'').trim().toLowerCase()}|${t.tripDate||''}|${t.startTime||''}`;
  target.bookings.forEach((booking) => { const linked = target.trips.find((trip) => trip.bookingId === booking.id); if (linked) { usedTrips.add(linked.id); linkedRecords.push({ bookingId: booking.id, tripId: linked.id }); return; } const matches = target.trips.filter((trip) => !trip.bookingId && keyTrip(trip) === keyBooking(booking) && booking.customer && booking.date && booking.time); if (matches.length === 1) { matches[0].bookingId = booking.id; usedTrips.add(matches[0].id); linkedRecords.push({ bookingId: booking.id, tripId: matches[0].id }); } else if (matches.length > 1) { booking.workflowReviewStatus = 'Needs Review'; matches.forEach((trip) => trip.workflowReviewStatus = 'Needs Review'); duplicatesNeedingReview.push({ bookingId: booking.id, tripIds: matches.map((trip) => trip.id) }); } else { booking.workflowReviewStatus ||= 'Needs Review'; unmatchedBookings.push(booking.id); } });
  target.trips.filter((trip) => !trip.bookingId && !usedTrips.has(trip.id)).forEach((trip) => { trip.workflowReviewStatus ||= 'Needs Review'; unmatchedTrips.push(trip.id); });
  target.workflowMigrationReport = { generatedAt: new Date().toISOString(), linkedRecords, unmatchedBookings, unmatchedTrips, duplicatesNeedingReview };
}

function renderTable(route) {
  const config = crudConfig[route];
  const page = document.getElementById(`page-${route}`);
  const query = page.querySelector('.search-input')?.value?.toLowerCase() || '';
  const rows = visibleRecordsForRoute(route, store[config.collection]).filter((item) => JSON.stringify(item).toLowerCase().includes(query));
  const tbody = page.querySelector('tbody');
  tbody.innerHTML = rows.length ? rows.map((item) => `<tr>${config.columns.map(([key]) => `<td>${formatCell(key, item[key])}</td>`).join('')}<td><div class="row-actions">${route === 'bookings' ? bookingWorkflowActions(item) : ''}<button class="btn btn-outline btn-small" onclick="showForm('${route}','${item.id}')">Edit</button><button class="btn btn-danger btn-small" onclick="deleteRecord('${route}','${item.id}')">Delete</button></div></td></tr>`).join('') : `<tr><td colspan="${config.columns.length + 1}" class="empty-state">No records found.</td></tr>`;
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


function crewEligibleForRole(crew, role) {
  const listed = String(crew?.role || '').toLowerCase();
  if (!listed) return true;
  return listed.split(/[,/;&]+/).map((item) => item.trim()).includes(role.toLowerCase());
}

function crewIsUnavailable(crew) {
  return !crew || crew.active === 'No' || String(crew.availability || '').toLowerCase() === 'unavailable' || /\bunavailable\b/i.test(String(crew.notes || ''));
}

function resourceHasOverlap(candidate, key, name, excludeId = null) {
  if (!name || !tripWindow(candidate)) return false;
  return store.trips.some((trip) => trip.id !== excludeId && trip.status !== 'Cancelled' && trip[key] === name && windowsOverlap(tripWindow(candidate), tripWindow(trip)));
}

function recentResourceWorkload(key, name, candidate) {
  const anchor = tripWindow(candidate)?.start;
  if (!anchor || !name) return 0;
  return store.trips.filter((trip) => trip.status !== 'Cancelled' && trip[key] === name && tripWindow(trip) && Math.abs(tripWindow(trip).start - anchor) <= 14 * 86400000).length;
}

function assignmentHistoryCount(key, name, candidate) {
  const vessel = candidate.vessel;
  return store.trips.filter((trip) => trip.status !== 'Cancelled' && trip[key] === name && (!vessel || trip.vessel === vessel)).length;
}

function confidenceForScore(score) {
  return score >= 85 ? 'High' : score >= 65 ? 'Medium' : 'Low';
}

function rankVesselCandidates(candidate, excludeId = null) {
  const guests = Number(candidate.passengers || 0);
  return store.vessels.map((vessel) => {
    const capacity = Number(vessel.capacity || 0);
    const unavailable = /out of service|maintenance hold|unavailable/i.test(`${vessel.status || ''} ${vessel.readinessStatus || ''}`);
    const overlap = resourceHasOverlap(candidate, 'vessel', vessel.name, excludeId);
    if (unavailable || overlap || (guests && capacity < guests)) return null;
    const workload = recentResourceWorkload('vessel', vessel.name, candidate);
    const spareSeats = guests ? Math.max(0, capacity - guests) : 0;
    const ownerHistory = store.trips.filter((trip) => trip.vessel === vessel.name).length;
    const score = Math.max(35, Math.min(99, 96 - spareSeats * 2 - workload * 4 + Math.min(ownerHistory, 3)));
    const reasons = [`Available for the trip window`, guests ? `Capacity ${capacity} fits ${guests} guests` : `Capacity ${capacity}`, `${vessel.owner || 'Unlisted'} owner`, workload ? `${workload} recent assignment${workload === 1 ? '' : 's'}` : 'Light recent workload'];
    return { value: vessel.name, score, confidence: confidenceForScore(score), reason: reasons.join(' · ') };
  }).filter(Boolean).sort((a, b) => b.score - a.score || a.value.localeCompare(b.value));
}

function rankCrewCandidates(candidate, role, excludeId = null) {
  const key = role.toLowerCase();
  return store.crew.map((crew) => {
    if (!crewEligibleForRole(crew, role) || crewIsUnavailable(crew) || resourceHasOverlap(candidate, key, crew.name, excludeId)) return null;
    if (candidate[key] === crew.name && candidate.assignmentStatus?.[key] === 'Declined') return null;
    const workload = recentResourceWorkload(key, crew.name, candidate);
    const history = assignmentHistoryCount(key, crew.name, candidate);
    const vesselOwner = ownerForVesselName(candidate.vessel);
    const ownerMatch = vesselOwner && vesselOwner === crew.name;
    const score = Math.max(35, Math.min(99, 91 - workload * 7 + Math.min(history, 4) * 2 + (ownerMatch ? 4 : 0)));
    const reasons = [`Available and ${role.toLowerCase()} eligible`, workload ? `${workload} recent assignment${workload === 1 ? '' : 's'}` : 'Light recent workload', history ? `${history} matching assignment${history === 1 ? '' : 's'} in history` : 'Ready for a new assignment', ...(ownerMatch ? ['Matches vessel owner'] : [])];
    return { value: crew.name, score, confidence: confidenceForScore(score), reason: reasons.join(' · ') };
  }).filter(Boolean).sort((a, b) => b.score - a.score || a.value.localeCompare(b.value));
}

function assignmentConflictWarnings(candidate, excludeId = null) {
  const warnings = [];
  if (!candidate.vessel) warnings.push({ type: 'Missing vessel', message: 'No vessel is assigned.' });
  if (!candidate.captain) warnings.push({ type: 'Missing captain', message: 'No captain is assigned.' });
  if (!candidate.mate || candidate.mate === 'None') warnings.push({ type: 'Missing mate', message: 'No mate is assigned.' });
  findTripConflicts(candidate, excludeId).forEach((conflict) => warnings.push({ type: `${conflict.type} conflict`, message: conflict.message || `${conflict.name} is already assigned to ${conflict.trip?.customer || 'another trip'}.` }));
  return warnings;
}

function buildAssignmentRecommendation(candidate, excludeId = null) {
  const vessel = rankVesselCandidates(candidate, excludeId)[0] || null;
  const withVessel = { ...candidate, vessel: vessel?.value || candidate.vessel };
  const captain = rankCrewCandidates(withVessel, 'Captain', excludeId)[0] || null;
  const mate = rankCrewCandidates(withVessel, 'Mate', excludeId).find((item) => item.value !== captain?.value) || null;
  const recommendations = [vessel, captain, mate].filter(Boolean);
  const score = recommendations.length ? Math.round(recommendations.reduce((sum, item) => sum + item.score, 0) / 3) : 0;
  return { vessel, captain, mate, score, confidence: confidenceForScore(score), conflicts: assignmentConflictWarnings(candidate, excludeId), generatedAt: new Date().toISOString() };
}

function recommendationBadge(item) {
  return item ? `<span class="badge ${item.confidence === 'High' ? 'green' : item.confidence === 'Medium' ? 'gold' : 'red'}">${item.confidence} · ${item.score}%</span>` : '<span class="badge red">Low · 0%</span>';
}

function renderAssignmentRecommendation(candidate, excludeId = null, compact = false) {
  const recommendation = buildAssignmentRecommendation(candidate, excludeId);
  const card = (label, icon, item) => `<article class="recommendation-card"><div class="recommendation-card-title"><span>${icon}</span><div><small>Recommended ${label}</small><strong>${escapeHtml(item?.value || `No available ${label.toLowerCase()}`)}</strong></div>${recommendationBadge(item)}</div><p>${escapeHtml(item?.reason || `Resolve conflicts or add an eligible ${label.toLowerCase()}.`)}</p></article>`;
  const conflicts = recommendation.conflicts.length ? `<div class="recommendation-conflicts"><strong>Conflict warnings</strong><div>${recommendation.conflicts.map((warning) => `<span class="badge red" title="${escapeHtml(warning.message)}">${escapeHtml(warning.type)}</span>`).join('')}</div></div>` : '<div class="recommendation-conflicts clear"><span class="badge green">No assignment conflicts detected</span></div>';
  if (compact) return `<div class="assignment-recommendation-compact"><strong>Suggested: ${escapeHtml(recommendation.vessel?.value || 'No vessel')} · ${escapeHtml(recommendation.captain?.value || 'No captain')} · ${escapeHtml(recommendation.mate?.value || 'No mate')}</strong>${recommendationBadge({ confidence: recommendation.confidence, score: recommendation.score })}${conflicts}</div>`;
  const canApply = recommendation.vessel && recommendation.captain && recommendation.mate;
  return `<details class="assignment-recommendation card" open><summary><div><p class="eyebrow">Automated Crew Assignment Engine</p><h3>Assignment Recommendation</h3></div><div>${recommendationBadge({ confidence: recommendation.confidence, score: recommendation.score })}<span class="chevron" aria-hidden="true">⌄</span></div></summary><div class="recommendation-body"><div class="recommendation-grid">${card('Vessel', '⛵', recommendation.vessel)}${card('Captain', '🧢', recommendation.captain)}${card('Mate', '⚓', recommendation.mate)}</div>${conflicts}<button class="btn btn-primary apply-suggestion-btn" type="button" onclick="applySuggestedAssignment(this)" ${canApply ? '' : 'disabled'}>Apply Suggested Assignment</button><p class="muted-text">Suggestions are optional. You can manually choose any vessel, captain, or mate before saving.</p></div></details>`;
}

function updateTripAssignmentRecommendation(form) {
  const target = form.querySelector('[data-assignment-recommendation]');
  if (!target) return;
  const candidate = Object.fromEntries(new FormData(form).entries());
  candidate.hours = Number(candidate.hours || 0);
  candidate.passengers = Number(candidate.passengers || 0);
  const previous = editing.trips ? store.trips.find((trip) => trip.id === editing.trips) : null;
  if (previous) candidate.assignmentStatus = previous.assignmentStatus;
  target.innerHTML = renderAssignmentRecommendation(candidate, editing.trips);
}

function applySuggestedAssignment(button) {
  const form = button.closest('form');
  if (!form) return;
  const candidate = Object.fromEntries(new FormData(form).entries());
  candidate.hours = Number(candidate.hours || 0);
  candidate.passengers = Number(candidate.passengers || 0);
  const recommendation = buildAssignmentRecommendation(candidate, editing.trips);
  if (!recommendation.vessel || !recommendation.captain || !recommendation.mate) { toast('Resolve conflicts before applying the suggested assignment.'); return; }
  form.elements.vessel.value = recommendation.vessel.value;
  form.elements.captain.value = recommendation.captain.value;
  form.elements.mate.value = recommendation.mate.value;
  const tripId = editing.trips || 'unsaved-trip';
  const label = candidate.customer || 'New trip';
  addRoleNotification('Captain', recommendation.captain.value, 'Suggested assignment applied', `${label} assignment was applied for ${formatDate(candidate.tripDate)}.`, 'info', 'Assignment', { tripId, suggested: true });
  addRoleNotification('Mate', recommendation.mate.value, 'Suggested assignment applied', `${label} assignment was applied for ${formatDate(candidate.tripDate)}.`, 'info', 'Assignment', { tripId, suggested: true });
  const owner = ownerForVesselName(recommendation.vessel.value);
  if (owner) addRoleNotification('Owner', owner, 'Suggested assignment applied', `${recommendation.vessel.value} was suggested for ${label}.`, 'info', 'Assignment', { tripId, suggested: true });
  addRoleNotification('Admin', '', 'Suggested assignment applied', `${label}: ${recommendation.vessel.value}, ${recommendation.captain.value}, and ${recommendation.mate.value}.`, 'success', 'Assignment', { tripId, suggested: true });
  addAudit('applied', 'Assignment Recommendation', `Suggested vessel, captain, and mate applied to ${label}.`, { tripId, vessel: recommendation.vessel.value, captain: recommendation.captain.value, mate: recommendation.mate.value, confidence: recommendation.confidence, score: recommendation.score });
  saveStore();
  updateTripConflictPreview(form);
  updateTripAssignmentRecommendation(form);
  toast('Suggested assignment applied. You can still manually override it.');
}

function findTripConflicts(candidate, excludeId = null) {
  const conflicts = [];
  const candidateWindow = tripWindow(candidate);
  if (candidateWindow) {
    const candidateCrew = crewAssignmentsForTrip(candidate);
    store.trips.forEach((trip) => {
      if (trip.id === excludeId || trip.status === 'Cancelled' || !windowsOverlap(candidateWindow, tripWindow(trip))) return;
      if (candidate.vessel && candidate.vessel === trip.vessel) conflicts.push({ type: 'Vessel', name: candidate.vessel, trip, message: `${candidate.vessel} is already assigned to ${trip.customer || 'another trip'} (${describeTripWindow(trip)}).` });
      const existingCrew = crewAssignmentsForTrip(trip);
      candidateCrew.forEach((assignment) => {
        if (existingCrew.some((existing) => existing.name === assignment.name)) conflicts.push({ type: assignment.role, name: assignment.name, trip, message: `${assignment.name} is already assigned to ${trip.customer || 'another trip'} (${describeTripWindow(trip)}).` });
      });
    });
  }
  ['captain', 'mate'].forEach((role) => {
    const name = candidate[role];
    if (!name || name === 'None') return;
    const crew = store.crew.find((person) => person.name === name);
    if (crewIsUnavailable(crew)) conflicts.push({ type: role === 'captain' ? 'Captain unavailable' : 'Mate unavailable', name, message: `${name} is marked unavailable.` });
    if (candidate.assignmentStatus?.[role] === 'Declined') conflicts.push({ type: role === 'captain' ? 'Captain declined' : 'Mate declined', name, message: `${name} declined this assignment.` });
  });
  return conflicts;
}

function showTripConflicts(form, conflicts) {
  const panel = form.querySelector('[data-conflict-panel]');
  if (!panel) return;
  panel.hidden = false;
  panel.innerHTML = `<strong>Assignment conflict detected</strong><p>Resolve these vessel or crew assignment warnings before saving this trip.</p><ul>${conflicts.map((conflict) => `<li><strong>${escapeHtml(conflict.type)}:</strong> ${escapeHtml(conflict.message || `${conflict.name} conflicts with another trip.`)}</li>`).join('')}</ul>`;
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
  const previous = editing.trips ? store.trips.find((trip) => trip.id === editing.trips) : null;
  if (previous) data.assignmentStatus = previous.assignmentStatus;
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
    pickupConfirmed: Boolean(trip.pickupLocation || trip.pickupConfirmed === 'Yes'),
    guestCountEntered: Number(trip.passengers || 0) > 0,
    paymentRecorded: Boolean(trip.invoiceId || trip.paymentStatus || Number(trip.depositPaid || 0) > 0 || Number(trip.balanceDue || 0) === 0),
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
  if (checks.vesselReady && checks.preTripComplete && checks.captainAccepted && checks.mateAccepted && checks.pickupConfirmed && checks.guestCountEntered && checks.paymentRecorded) return 'Dispatch Ready';
  return 'Partially Ready';
}

function readinessBadge(status) {
  const normalized = status === 'Ready' ? 'Dispatch Ready' : ['Needs Review', 'Partial'].includes(status) ? 'Partially Ready' : status;
  return statusBadge(normalized || 'Partial');
}

function readinessColorClass(status) {
  const normalized = status === 'Ready' ? 'Dispatch Ready' : ['Needs Review', 'Partial'].includes(status) ? 'Partially Ready' : status;
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
    ${item(checks.pickupConfirmed, 'Pickup Confirmed')}
    ${item(checks.guestCountEntered, 'Guest Count Entered')}
    ${item(checks.preTripComplete, 'Pre Trip Complete', latestChecklistStatus(trip, 'Pre Trip'))}
    ${item(checks.paymentRecorded, 'Payment Recorded')}
  </div>`;
}

function renderDispatch() {
  const page = document.getElementById('page-dispatch');
  page.innerHTML = '<div class="page-stack"><div class="card assignment-board" data-assignment-board></div></div>';
  renderAssignmentBoard(page);
}

function renderAssignmentBoard(host = document.getElementById('page-trips')) {
  const page = host;
  if (!page) return;
  let board = page.querySelector('[data-assignment-board]');
  if (!board) {
    board = document.createElement('div');
    board.className = 'card assignment-board';
    board.dataset.assignmentBoard = 'true';
    const insertionPoint = page.querySelector('.record-form');
    if (insertionPoint) insertionPoint.after(board);
    else page.querySelector('.page-stack')?.appendChild(board);
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
  return `<div class="dispatch-tree true-dispatch-tree"><div class="dispatch-tree-root"><span class="dispatch-root-pulse" aria-hidden="true"></span><div><span class="tree-level">Operations Tree</span><strong>Scheduled Trips</strong><small>${trips.length} active branch${trips.length === 1 ? '' : 'es'}</small></div></div><div class="dispatch-root-branches">${Object.entries(byDate).map(([date, dateTrips]) => renderDispatchDateNode(date, dateTrips)).join('')}</div></div>`;
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
    ${maintenanceWarning(trip)}
    ${renderDispatchLeaf('Pre Trip Status', preStatus, 'Checklist', 'pre', trip.id, checklistColor(preStatus))}
    ${renderDispatchLeaf('Post Trip Status', postStatus, 'Checklist', 'post', trip.id, checklistColor(postStatus))}
    ${renderDispatchLeaf('Weather', `${weatherRiskLabel(tripWeatherRisk(trip))} · Wind ${weatherForTrip(trip)?.windSpeed || 0} knots · Rain ${weatherForTrip(trip)?.rainChance || 0}% · Sea ${weatherForTrip(trip)?.seaConditions || 'No forecast'}`, 'Weather risk', 'trip', trip.id, weatherRiskClass(tripWeatherRisk(trip)))}
    ${renderDispatchLeaf('Countdown', departureCountdown(trip), 'Departure timer', 'trip', trip.id, 'blue')}
    <div class="dispatch-recommendation-node">${renderAssignmentRecommendation(trip, trip.id, true)}</div>
  </div></details>`;
}

function renderDispatchLeaf(label, value, status, action, actionValue, color = 'blue', htmlValue = false) {
  return `<button class="dispatch-leaf leaf-${color}" type="button" data-tree-action="${escapeHtml(action)}" data-tree-value="${escapeHtml(actionValue || '')}"><span class="branch-stem" aria-hidden="true"></span><span class="leaf-label">${escapeHtml(label)}</span><strong>${htmlValue ? value : escapeHtml(value || '—')}</strong><span class="badge ${color}">${escapeHtml(status || 'Open')}</span></button>`;
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
    ${maintenanceWarning(trip)}
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
  const alertCard = canViewStockAlerts() ? `<div class="card urgent-card"><div class="card-header"><h3>Low Stock Alerts</h3><span class="badge ${alerts.length ? 'red' : 'green'}">${alerts.length ? 'Restock Needed' : 'Stock OK'}</span></div><div class="stat-list">${alerts.length ? alerts.map((item) => `<div class="stat-row"><span>${escapeHtml(item.name)}</span><strong>${statusBadge(item.status)} ${escapeHtml(item.currentStock)} / min ${escapeHtml(item.minimumRequiredStock)}</strong></div>`).join('') : '<p class="empty-state">No low stock warnings.</p>'}</div></div>` : '';
  const rows = store.inventory.map((item) => `<tr><td><strong>${escapeHtml(item.name)}</strong><br><small>${escapeHtml(item.category)} · ${escapeHtml(item.unit)}</small></td><td>${escapeHtml(item.currentStock)}</td><td>${escapeHtml(item.minimumRequiredStock)}</td><td>${escapeHtml(item.recommendedStock)}</td><td>${statusBadge(item.status)}</td><td>${escapeHtml(item.restockNeeded)}</td><td>${escapeHtml(item.linkedVessel || 'All vessels')}</td><td>${escapeHtml(item.linkedTrip || '—')}</td><td>${escapeHtml(item.updatedBy || '—')}<br><small>${escapeHtml(new Date(item.lastUpdated).toLocaleString())}</small></td></tr>`).join('');
  document.getElementById('page-inventory').innerHTML = `<div class="page-stack"><form class="record-form card" onsubmit="saveInventoryItem(event)"><div class="form-section-stack" data-mobile-form-sections><section class="form-section-card"><div class="form-section-title"><span>1</span><h3>Stock Update</h3></div><div class="form-grid"><div class="field"><label>Inventory Item</label><select name="id">${store.inventory.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`).join('')}</select></div><div class="field"><label>Current Stock</label><input name="currentStock" type="number" step="0.01"></div><div class="field"><label>Minimum Required Stock</label><input name="minimumRequiredStock" type="number" step="0.01"></div><div class="field"><label>Recommended Stock</label><input name="recommendedStock" type="number" step="0.01"></div><div class="field"><label>Linked Vessel</label><select name="linkedVessel"><option value="">All vessels</option>${getOptions('vessels').map((vessel) => `<option value="${escapeHtml(vessel)}">${escapeHtml(vessel)}</option>`).join('')}</select></div><div class="field"><label>Linked Trip</label><select name="linkedTrip"><option value="">— None —</option>${getOptions('trips').map((opt) => `<option value="${escapeHtml(opt.split('|')[0])}">${escapeHtml(opt.split('|').slice(1).join('|'))}</option>`).join('')}</select></div><div class="field"><label>Updated By</label><input name="updatedBy" type="text" value="${escapeHtml(currentUserLabel())}"></div><div class="field"><label>Notes</label><textarea name="notes"></textarea></div></div></section></div><div class="form-actions sticky-save-controls"><button class="btn btn-primary" type="submit">Save Stock Update</button>${voiceFillButton('inventory')}<button class="btn btn-outline" type="button" onclick="window.print()">Print / Export</button></div></form>${alertCard}<div class="card table-card"><div class="card-header"><h3>Inventory records</h3><button class="btn btn-outline btn-small" type="button" onclick="window.print()">Print / Export Inventory</button></div><div class="responsive-table-wrap"><table><thead><tr><th>Item</th><th>Current Stock</th><th>Minimum Required Stock</th><th>Recommended Stock</th><th>Stock Status</th><th>Restock Needed</th><th>Linked Vessel</th><th>Linked Trip</th><th>Last Updated / By</th></tr></thead><tbody>${rows}</tbody></table></div></div></div>`;
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
  if (!['Admin','Bookkeeper'].includes(activeRoleName())) return toast('Only Admin and Bookkeeper can record payroll payments.');
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

function visiblePayrollEntries() {
  const role = activeRoleName(); const person = activeRolePerson(role);
  return payrollEntries().filter((entry) => role === 'Admin' || role === 'Bookkeeper' || (role === 'Owner' && entry.role === 'Owner' && entry.person === person) || (['Captain','Mate'].includes(role) && entry.role === role && entry.person === person));
}

function renderPayroll() {
  const entries = visiblePayrollEntries();
  const grouped = entries.reduce((acc, entry) => {
    const week = payrollWeekLabel(entry.trip.tripDate);
    acc[week] ||= [];
    acc[week].push(entry);
    return acc;
  }, {});
  const totalOwed = entries.reduce((sum, entry) => sum + entry.amountOwed, 0);
  const totalPaid = entries.reduce((sum, entry) => sum + entry.amountPaid, 0);
  const payrollTripFuel = (store.trips || []).reduce((sum, trip) => sum + Number(trip.totalFuelCost || 0), 0);
  document.getElementById('page-payroll').innerHTML = `<div class="page-stack">
    <div class="section-heading"><div><h3>Weekly Statements</h3></div><div class="legacy-actions"><button class="btn btn-primary" data-route="trips">Create trip</button><button class="btn btn-outline" type="button" onclick="window.print()">Print / Export Statements</button></div></div>
    <div class="grid kpi-grid">${kpi('Amount owed', money(totalOwed), 'All active trips')}${kpi('Amount paid', money(totalPaid), 'Recorded payments')}${kpi('Outstanding', money(totalOwed - totalPaid), 'Still due')}${kpi('Trip Fuel Cost', money(payrollTripFuel), 'Profitability context')}${kpi('Payment records', store.payrollPayments.length, 'Local history')}${kpi('Owner Statements', entries.filter((entry) => entry.role === 'Owner').length, 'Owner payout lines')}${kpi('Captain Statements', entries.filter((entry) => entry.role === 'Captain').length, 'Captain payout lines')}${kpi('Mate Statements', entries.filter((entry) => entry.role === 'Mate').length, 'Mate payout lines')}</div><details class="card app-accordion" open><summary><div><h3>Person Statement Summary</h3><p class="muted-text">Generate Captain Payment Receipt, Mate Payment Receipt, Owner Payout Statement, or Payment Due Notice.</p></div><span class="chevron" aria-hidden="true">⌄</span></summary><div class="payroll-document-actions">${renderPersonStatementSummary(entries)}</div></details><div data-payroll-document-host></div>
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
  const rows = Object.entries(byPerson).map(([person, summary]) => `<div class="payroll-person-row"><div class="stat-row"><span>${escapeHtml(person)}<br><small>${escapeHtml([...summary.roles].join(', '))} · ${summary.items} item(s)</small></span><strong>${money(summary.outstanding)} outstanding<br><small>${money(summary.owed)} owed / ${money(summary.paid)} paid</small></strong></div><div class="assignment-actions">${[...summary.roles].map((role) => `<button class="btn btn-outline btn-small" type="button" onclick="previewPayrollDocument(decodeURIComponent('${encodeURIComponent(person)}'),'${escapeHtml(role)}')">${role === 'Owner' ? 'Owner Payout Statement' : `${role} Payment Receipt`}</button>`).join('')}<button class="btn btn-outline btn-small" type="button" onclick="previewPayrollDocument(decodeURIComponent('${encodeURIComponent(person)}'),'Due')">Payment Due Notice</button></div></div>`).join('');
  return rows || '<p class="empty-state">No person statements yet.</p>';
}

function previewPayrollDocument(person, type) {
  const entries = visiblePayrollEntries().filter((entry) => entry.person === person && (type === 'Due' || entry.role === type));
  if (!entries.length) return toast('No visible payroll entries are available for this statement.');
  const owed = entries.reduce((sum, entry) => sum + entry.amountOwed, 0);
  const paid = entries.reduce((sum, entry) => sum + entry.amountPaid, 0);
  const outstanding = entries.reduce((sum, entry) => sum + entry.outstanding, 0);
  const title = type === 'Due' ? 'Payment Due Notice' : type === 'Owner' ? 'Owner Payout Statement' : `${type} Payment Receipt`;
  const host = document.querySelector('[data-payroll-document-host]');
  if (!host) return;
  host.innerHTML = `<article class="payroll-document customer-invoice-document" data-printable-invoice><header class="invoice-brand-header"><img src="Reel Adventure Tours Logo (2).jpg" alt="Reel Adventure Tours logo"><div><p class="eyebrow">Reel Adventure Tours Payroll</p><h1>${escapeHtml(title)}</h1><p class="muted-text">Generated ${escapeHtml(new Date().toLocaleDateString())}</p></div></header><div class="confirmation-banner">Prepared for ${escapeHtml(person)}</div><section class="invoice-total-grid"><div><span>Total owed</span><strong>${money(owed)}</strong></div><div><span>Total paid</span><strong>${money(paid)}</strong></div><div><span>Outstanding</span><strong>${money(outstanding)}</strong></div><div><span>Role / document</span><strong>${escapeHtml(type === 'Due' ? 'All roles' : type)}</strong></div></section><section><h3>Payment detail</h3><div class="responsive-table-wrap"><table><thead><tr><th>Tour date</th><th>Customer / vessel</th><th>Role</th><th>Owed</th><th>Paid</th><th>Balance</th></tr></thead><tbody>${entries.map((entry) => `<tr><td>${escapeHtml(formatDate(entry.trip.tripDate))}</td><td>${escapeHtml(entry.trip.customer || '—')} · ${escapeHtml(entry.trip.vessel || '—')}</td><td>${escapeHtml(entry.role)}</td><td>${money(entry.amountOwed)}</td><td>${money(entry.amountPaid)}</td><td>${money(entry.outstanding)}</td></tr>`).join('') || '<tr><td colspan="6">No matching payroll lines.</td></tr>'}</tbody></table></div></section><footer class="invoice-footer"><strong>Reel Adventure Tours</strong><span>Operations payroll record · Review payment records before authorization.</span></footer></article><div class="assignment-actions invoice-action-bar"><button class="btn btn-primary" type="button" onclick="window.print()">Print / Save PDF</button><button class="btn btn-outline" type="button" onclick="downloadPayrollDocument('${encodeURIComponent(person)}','${escapeHtml(type)}')">Download Document</button></div>`;
  host.scrollIntoView({ behavior: 'smooth', block: 'start' });
  addAudit('previewed', 'Payroll', `${title} generated for ${person}.`, { person, type }); saveStore();
}
function downloadPayrollDocument(personEncoded, type) {
  previewPayrollDocument(decodeURIComponent(personEncoded), type);
  const documentHtml = document.querySelector('[data-payroll-document-host] [data-printable-invoice]')?.outerHTML || '';
  const blob = new Blob([`<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="styles.css"></head><body>${documentHtml}</body></html>`], { type: 'text/html' });
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `${decodeURIComponent(personEncoded).replace(/[^a-z0-9]+/gi, '-')}-${type.replace(/[^a-z0-9]+/gi, '-')}.html`; link.click(); URL.revokeObjectURL(link.href);
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

function invoiceAddOnRows(invoice = {}) {
  return [
    { name: 'Swimming Pigs', unitPrice: Number(invoice.swimmingPigsPrice || 20), quantity: Number(invoice.swimmingPigsPeople || 0) },
    { name: 'Lunch', unitPrice: Number(invoice.lunchPrice || 35), quantity: Number(invoice.lunchPeople || 0) },
    { name: invoice.otherAddOnName || 'Other Add-on', unitPrice: Number(invoice.otherAddOnPrice || 0), quantity: Number(invoice.otherAddOnQuantity || 0) },
    { name: 'Second Boat', unitPrice: Number(invoice.secondBoatPrice || 900), quantity: invoice.secondBoat === 'Yes' ? 1 : 0 }
  ].map((item) => ({ ...item, total: item.unitPrice * item.quantity })).filter((item) => item.quantity || item.unitPrice);
}
function invoiceTotal(invoice = {}) {
  return Number(invoice.baseTourPrice || 0) + invoiceAddOnRows(invoice).reduce((sum, item) => sum + item.total, 0);
}
function updateInvoiceBalanceDue(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const total = invoiceTotal(values);
  if (form.elements.tourPrice) form.elements.tourPrice.value = total.toFixed(2).replace(/\.00$/, '');
  const depositPercent = Number(form.elements.depositPercent?.value || 0);
  if (form.elements.depositPaid && depositPercent && !Number(form.elements.depositPaid.value || 0)) form.elements.depositPaid.value = (total * depositPercent / 100).toFixed(2).replace(/\.00$/, '');
  if (form.elements.balanceDue) form.elements.balanceDue.value = Math.max(total - Number(form.elements.depositPaid?.value || 0), 0).toFixed(2).replace(/\.00$/, '');
  if (form.elements.returnTime && !form.elements.returnTime.value) form.elements.returnTime.value = calculateEndTime(form.elements.startTime?.value, form.elements.duration?.value);
}

function renderInvoiceModule() {
  const page = document.getElementById('page-invoices');
  if (!page || page.querySelector('[data-invoice-module]')) return;
  const table = page.querySelector('.table-card');
  const invoices = store.invoices || [];
  const cards = invoices.length ? invoices.map((invoice) => `<article class="invoice-card"><div class="card-header"><div><h3>${escapeHtml(invoiceDocumentTitle(invoice))}</h3><p>${escapeHtml(invoice.invoiceNumber || 'No document #')} · ${escapeHtml(invoice.customerName || 'Customer')} · ${escapeHtml(formatDate(invoice.tripDate))}</p></div>${readinessBadge(invoice.paymentStatus || 'Deposit Due')}</div><div class="assignment-card-metrics"><div><span>Total Booking Cost</span><strong>${money(invoice.tourPrice)}</strong></div><div><span>Deposit Paid</span><strong>${money(invoice.depositPaid)}</strong></div><div><span>Remaining Balance</span><strong>${money(invoice.balanceDue)}</strong></div><div><span>Payment Method</span><strong>${escapeHtml(invoice.paymentMethod || 'Not selected')}</strong></div></div><p class="muted-text">${escapeHtml(invoice.tourType || 'Tour package')} · ${escapeHtml(invoice.vessel || 'No vessel')} · ${escapeHtml(invoice.bookingSource || 'No source')}</p><div class="assignment-actions invoice-primary-actions"><button class="btn btn-outline btn-small" onclick="showForm('invoices','${invoice.id}')">Edit</button><button class="btn btn-outline btn-small" onclick="previewInvoiceDocument('${invoice.id}')">Preview</button><button class="btn btn-primary btn-small" onclick="convertDocumentToBookingTrip('${invoice.id}')">${invoice.documentType === 'Quote' ? 'Convert Quote to Booking / Trip' : invoice.bookingId ? 'Open Linked Booking / Trip' : 'Create Booking / Trip'}</button><button class="btn btn-primary btn-small" onclick="markInvoicePaidInFull('${invoice.id}')">Mark Paid</button><details class="invoice-more-actions"><summary class="btn btn-outline btn-small">Share / Export</summary><div><button class="btn btn-outline btn-small" onclick="printInvoiceDocument('${invoice.id}')">Print / Save PDF</button><button class="btn btn-outline btn-small" onclick="downloadInvoiceDocument('${invoice.id}')">Download Document</button><button class="btn btn-outline btn-small" onclick="sendInvoiceEmail('${invoice.id}')">Send by Email</button><button class="btn btn-outline btn-small" onclick="sendInvoiceWhatsApp('${invoice.id}')">Send by WhatsApp</button><button class="btn btn-outline btn-small" onclick="copyInvoiceShareMessage('${invoice.id}')">Copy Share Message</button></div></details></div></article>`).join('') : '<p class="empty-state">No Invoice / Quote records yet. Use Create Invoice / Quote to add a native customer-facing document.</p>';
  const module = document.createElement('details');
  module.className = 'card native-invoice-module app-accordion';
  module.dataset.invoiceModule = 'true';
  module.open = true;
  module.innerHTML = `<summary><div><h3>Customer Documents</h3><p class="muted-text">Preview, share, collect payment, or connect saved documents to a Booking / Trip.</p></div><span class="chevron" aria-hidden="true">⌄</span></summary><div class="grid invoice-card-grid">${cards}</div><div class="card card-pad invoice-preview-host" data-receipt-summary><strong>Document preview</strong><p class="muted-text">Choose Preview on any document to review it before printing or sending.</p></div>`;
  table.before(module);
}

function findInvoice(id) { return (store.invoices || []).find((invoice) => invoice.id === id); }
function invoiceDocumentTitle(invoice = {}) { return String(invoice.documentType || 'Invoice').toUpperCase(); }
function invoiceMeetingPoint(invoice = {}) { return invoice.meetingPoint || invoice.pickupDirections || invoice.customPickupLocation || invoice.pickupLocation || 'Paradise Island Ferry Terminal / confirmed meeting point'; }
function invoiceIncludedItems(invoice = {}) { return invoice.includedItems || 'Boat tour, captain and crew, bottled water, soft drinks, snacks, snorkeling gear where applicable, and standard safety gear.'; }
function invoiceWhatToBring(invoice = {}) { return invoice.whatToBring || 'Towels, reef-safe sunscreen, sunglasses, hat, camera, payment card/cash for balance or add-ons, and any personal medication.'; }
function invoiceShareMessage(invoice = {}) {
  return `${invoiceDocumentTitle(invoice)} ${invoice.invoiceNumber || ''} for ${invoice.customerName || 'your Reel Adventure Tours booking'}\nTour: ${invoice.tourType || 'Reel Adventure Tours'}\nTrip Date: ${formatDate(invoice.tripDate)}\nStart Time: ${formatTime(invoice.startTime)} · Return Time: ${formatTime(invoice.returnTime || invoice.endTime)}\nTotal: ${money(invoice.tourPrice)} · Deposit: ${money(invoice.depositPaid)} · Balance: ${money(invoice.balanceDue)}\nMeeting point: ${invoiceMeetingPoint(invoice)}\nThank you for choosing Reel Adventure Tours!`;
}
function invoiceAddOns(invoice = {}) {
  const rows = invoiceAddOnRows(invoice);
  return rows.length ? rows.map((item) => `${escapeHtml(item.name)} (${item.quantity} × ${money(item.unitPrice)}): <strong>${money(item.total)}</strong>`).join('<br>') : 'No add-ons selected';
}

function estimateDocumentPages(invoice = {}) {
  const longText = [invoice.customerSummary, invoice.includedItems, invoice.whatToBring, invoice.pickupDirections, invoice.notes].filter(Boolean).join(' ');
  const complexity = longText.length + (invoice.meetingPointImage ? 500 : 0) + (Number(invoice.swimmingPigsPeople || 0) ? 180 : 0) + (invoice.secondBoat === 'Yes' ? 180 : 0);
  return complexity > 2400 ? 3 : complexity > 1250 ? 2 : 1;
}

function renderInvoiceDocument(invoice = {}) {
  const title = invoiceDocumentTitle(invoice);
  const pageEstimate = estimateDocumentPages(invoice);
  const total = Number(invoice.tourPrice || invoiceTotal(invoice));
  const returnTime = invoice.returnTime || invoice.endTime || calculateEndTime(invoice.startTime, invoice.duration);
  const tripDetails = [['Trip Date', formatDate(invoice.tripDate)], ['Start Time', formatTime(invoice.startTime)], ['Return Time', formatTime(returnTime)], ['Tour Duration', invoice.duration], ['Tour Type', invoice.tourType], ['Pickup Location', invoice.pickupLocation], ['Cruise Ship', invoice.cruiseShip], ['Guest Count', invoice.guestCount]];
  return `<article class="customer-invoice-document" data-printable-invoice data-page-estimate="${pageEstimate}"><div class="document-page-estimate">Page estimate: ${pageEstimate} ${pageEstimate === 1 ? 'page' : 'pages'}</div><header class="invoice-brand-header"><img src="Reel Adventure Tours Logo (2).jpg" alt="Reel Adventure Tours logo"><div><p class="eyebrow">Reel Adventure Tours</p><h1>${escapeHtml(title)}</h1><p class="muted-text">Document # ${escapeHtml(invoice.invoiceNumber || 'Draft')} · Issue date ${escapeHtml(formatDate(invoice.issueDate || new Date().toISOString().slice(0, 10)))}</p></div></header><div class="confirmation-banner">${escapeHtml(title)} prepared for ${escapeHtml(invoice.customerName || 'our guest')} — thank you for choosing Reel Adventure Tours.</div><section class="invoice-info-grid"><div><strong>Customer name</strong><span>${escapeHtml(invoice.customerName || '—')}</span></div><div><strong>Phone</strong><span>${escapeHtml(invoice.phone || '—')}</span></div><div><strong>Email</strong><span>${escapeHtml(invoice.email || '—')}</span></div><div><strong>Payment status</strong><span>${escapeHtml(invoice.paymentStatus || 'Deposit Due')}</span></div></section><section><h3>Trip Details</h3><div class="invoice-trip-details">${tripDetails.map(([label,value]) => `<div><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value || '—')}</span></div>`).join('')}</div></section><section><h3>Pricing</h3><div class="responsive-table-wrap"><table><thead><tr><th>Item</th><th>Unit price</th><th>Quantity</th><th>Total</th></tr></thead><tbody><tr><td>${escapeHtml(invoice.tourType || 'Base Tour — Group Rate')}</td><td>${money(invoice.baseTourPrice || total)}</td><td>1 group</td><td>${money(invoice.baseTourPrice || total)}</td></tr>${invoiceAddOnRows(invoice).map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>${money(item.unitPrice)}</td><td>${item.quantity}</td><td>${money(item.total)}</td></tr>`).join('')}</tbody></table></div></section><section class="invoice-total-grid"><div><span>Base Tour Price</span><strong>${money(invoice.baseTourPrice || total)}</strong></div><div><span>Add-ons</span><strong>${money(invoiceAddOnRows(invoice).reduce((sum,item)=>sum+item.total,0))}</strong></div><div><span>Total Booking Cost</span><strong>${money(total)}</strong></div><div><span>Deposit Paid</span><strong>${money(invoice.depositPaid)}</strong></div><div><span>Balance Due</span><strong>${money(invoice.balanceDue)}</strong></div><div><span>Payment Method</span><strong>${escapeHtml(invoice.paymentMethod || 'Not selected')}</strong></div></section><section class="invoice-two-col"><div><h3>Included in your tour</h3><p>${escapeHtml(invoiceIncludedItems(invoice))}</p></div><div><h3>What to bring</h3><p>${escapeHtml(invoiceWhatToBring(invoice))}</p></div></section><section class="invoice-two-col"><div><h3>Meeting point</h3><p>${escapeHtml(invoiceMeetingPoint(invoice))}</p></div><div><h3>Notes</h3><p>${escapeHtml(invoice.notes || 'No additional notes.')}</p></div></section><footer class="invoice-footer"><strong>Reel Adventure Tours</strong><span>Phone: +1 (242) 422-8256 · Email: info@reeladventuretours.com · Website: reeladventuretours.com</span></footer></article>`;
}

function previewInvoiceDocument(id) {
  const invoice = findInvoice(id); if (!invoice) return;
  const target = document.querySelector('[data-receipt-summary]');
  if (target) target.innerHTML = `${renderInvoiceDocument(invoice)}<div class="assignment-actions invoice-action-bar"><button class="btn btn-outline" onclick="printInvoiceDocument('${id}')">Print to PDF</button><button class="btn btn-outline" onclick="downloadInvoiceDocument('${id}')">Download PDF / HTML</button><button class="btn btn-outline" onclick="sendInvoiceEmail('${id}')">Send by Email</button><button class="btn btn-outline" onclick="sendInvoiceWhatsApp('${id}')">Send by WhatsApp</button><button class="btn btn-outline" onclick="copyInvoiceShareMessage('${id}')">Copy Share Message</button><button class="btn btn-primary" onclick="showForm('invoices','${id}')">Edit Document</button></div>`;
  addAudit('previewed', 'Invoice / Quote', `Previewed ${invoiceDocumentTitle(invoice)} for ${invoice.customerName || invoice.invoiceNumber}.`, { invoiceId: id }); saveStore();
}
function printInvoiceDocument(id) { if (!findInvoice(id)) return toast('Document not found. Print cancelled.'); previewInvoiceDocument(id); setTimeout(() => window.print(), 100); }
function downloadInvoiceDocument(id) {
  const invoice = findInvoice(id); if (!invoice) return toast('Document not found. Download cancelled.');
  const blob = new Blob([`<!doctype html><html><head><meta charset="utf-8"><title>${invoiceDocumentTitle(invoice)}</title><link rel="stylesheet" href="styles.css"></head><body>${renderInvoiceDocument(invoice)}</body></html>`], { type: 'text/html' });
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `${(invoice.invoiceNumber || invoiceDocumentTitle(invoice)).replace(/[^a-z0-9-]+/gi, '-')}.html`; link.click(); URL.revokeObjectURL(link.href); toast('Print-ready document downloaded. Open it and use browser Save as PDF.');
}
function sendInvoiceEmail(id) { const invoice = findInvoice(id); if (!invoice) return toast('Document not found. Email cancelled.'); if (!invoice.email) toast('No customer email is saved; opening a blank recipient.'); window.location.href = `mailto:${encodeURIComponent(invoice.email || '')}?subject=${encodeURIComponent(invoiceDocumentTitle(invoice) + ' ' + (invoice.invoiceNumber || ''))}&body=${encodeURIComponent(invoiceShareMessage(invoice))}`; }
function sendInvoiceWhatsApp(id) { const invoice = findInvoice(id); if (!invoice) return toast('Document not found. WhatsApp cancelled.'); const popup = window.open(`https://wa.me/?text=${encodeURIComponent(invoiceShareMessage(invoice))}`, '_blank', 'noopener'); if (!popup) toast('WhatsApp could not open. Allow pop-ups and try again.'); }
async function copyInvoiceShareMessage(id) { const invoice = findInvoice(id); if (!invoice) return toast('Document not found. Copy cancelled.'); await navigator.clipboard?.writeText(invoiceShareMessage(invoice)); toast('Share message copied.'); }
function markInvoiceDepositPaid(id) {
  const invoice = findInvoice(id); if (!invoice) return;
  invoice.paymentStatus = 'Deposit Paid';
  invoice.balanceDue = Math.max(Number(invoice.tourPrice || 0) - Number(invoice.depositPaid || 0), 0);
  addAudit('updated', 'Invoice / Quote', `Marked deposit paid for ${invoice.customerName || invoice.invoiceNumber}.`, { invoiceId: id });
  saveStore(); renderCrud('invoices'); toast('Deposit marked paid.');
}
function markInvoicePaidInFull(id) {
  const invoice = findInvoice(id); if (!invoice) return;
  invoice.paymentStatus = 'Paid in Full'; invoice.depositPaid = Number(invoice.tourPrice || invoice.depositPaid || 0); invoice.balanceDue = 0;
  addAudit('updated', 'Invoice / Quote', `Marked paid in full for ${invoice.customerName || invoice.invoiceNumber}.`, { invoiceId: id });
  saveStore(); renderCrud('invoices'); toast('Invoice / Quote marked paid in full.');
}
function generateReceiptSummary(id) { previewInvoiceDocument(id); }

function importCruiseMapperSchedule() {
  const text = document.querySelector('[data-cruise-import]')?.value.trim();
  if (!text) { toast('Paste CruiseMapper schedule rows first.'); return; }
  const rows = text.split(/\r?\n/).map((line) => line.split(/\t|,/).map((cell) => cell.trim())).filter((cells) => cells.length >= 2 && !/date/i.test(cells[0]));
  const imported = rows.map(([arrivalDate, shipName, cruiseLine = '', arrivalTime = '', departureTime = '', terminalDock = '', passengerCapacity = '0']) => ({
    id: uid('cruise'), arrivalDate, shipName, cruiseLine, arrivalTime, departureTime, terminalDock, passengerCapacity: Number(String(passengerCapacity).replace(/\D/g, '')) || 0,
    postedStatus: 'No', opportunityStatus: 'New', notes: 'Imported from CruiseMapper Nassau schedule'
  })).filter((entry) => /^\d{4}-\d{2}-\d{2}$/.test(entry.arrivalDate) && entry.shipName);
  if (!imported.length) { toast('No valid rows found. Use YYYY-MM-DD, Ship, Cruise Line, Arrival, Departure, Dock, Capacity.'); return; }
  const keys = new Set(imported.map((entry) => `${entry.arrivalDate}|${entry.shipName.toLowerCase()}`));
  store.cruiseSchedule = [...imported, ...store.cruiseSchedule.filter((entry) => !keys.has(`${entry.arrivalDate}|${String(entry.shipName).toLowerCase()}`))];
  store.cruiseScheduleIntegration.status = `${imported.length} rows imported`;
  store.cruiseScheduleIntegration.lastSyncAt = new Date().toISOString();
  addAudit('imported', 'Cruise Schedule', `${imported.length} CruiseMapper schedule rows imported.`, { source: store.cruiseScheduleIntegration.sourceUrl });
  saveStore(); renderCrud('cruise-schedule'); toast(`${imported.length} cruise schedule rows imported.`);
}
async function refreshCruiseMapperSchedule(silent = false) {
  const integration = store.cruiseScheduleIntegration;
  if (integration.status === 'Refreshing') return;
  integration.status = 'Refreshing';
  saveStore(); renderCrud('cruise-schedule');
  try {
    const response = await fetch('/api/cruise/nassau', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Cruise service returned ${response.status}`);
    const data = await response.json(), imported = data.records || [];
    const keys = new Set(imported.map((entry) => `${entry.arrivalDate}|${String(entry.shipName).toLowerCase()}`));
    store.cruiseSchedule = [...imported, ...store.cruiseSchedule.filter((entry) => !keys.has(`${entry.arrivalDate}|${String(entry.shipName).toLowerCase()}`))];
    integration.status = cruiseSyncStatusLabel(data.cacheStatus, imported.length);
    integration.lastSyncAt = data.updatedAt || new Date().toISOString();
    addAudit('synced', 'Cruise Schedule', `${imported.length} CruiseMapper Nassau arrivals automatically synced.`, { source: integration.sourceUrl });
    saveStore(); renderCrud('cruise-schedule'); if (!silent) toast('CruiseMapper Nassau schedule refreshed.');
  } catch (error) {
    integration.status = 'Live service unavailable';
    saveStore(); renderCrud('cruise-schedule'); if (!silent) toast(`Cruise refresh failed: ${error.message}`);
  }
}

function renderCruiseScheduleModule() {
  const page = document.getElementById('page-cruise-schedule');
  if (!page || page.querySelector('[data-cruise-module]')) return;
  const table = page.querySelector('.table-card');
  const today = new Date().toISOString().slice(0, 10);
  const entries = store.cruiseSchedule || [];
  const todayShips = entries.filter((entry) => entry.arrivalDate === today);
  const upcoming = entries.filter((entry) => String(entry.arrivalDate || '') >= today).sort((a, b) => String(a.arrivalDate + a.arrivalTime).localeCompare(String(b.arrivalDate + b.arrivalTime))).slice(0, 8);
  const integration = store.cruiseScheduleIntegration;
  const sourcePanel = document.createElement('div');
  sourcePanel.className = 'card card-pad external-source-card cruise-source-card';
  sourcePanel.dataset.cruiseModule = 'true';
  sourcePanel.innerHTML = `<div><p class="eyebrow">Live Nassau schedule source</p><h3>CruiseMapper</h3><p>The app server automatically pulls the current and upcoming Nassau schedule directly from CruiseMapper.</p><span class="integration-status">${escapeHtml(integration.status)}${integration.lastSyncAt ? ` · ${escapeHtml(new Date(integration.lastSyncAt).toLocaleString())}` : ''}</span></div><div class="external-source-actions"><button class="btn btn-outline" type="button" onclick="openExternalSource('${integration.sourceUrl}')">Open CruiseMapper Nassau</button><button class="btn btn-primary" type="button" onclick="refreshCruiseMapperSchedule()">Refresh Live Schedule</button><details><summary>Manual import fallback</summary><textarea data-cruise-import placeholder="YYYY-MM-DD, Ship, Cruise Line, Arrival, Departure, Dock, Capacity"></textarea><button class="btn btn-outline" type="button" onclick="importCruiseMapperSchedule()">Import Schedule Rows</button></details></div>`;
  const panel = document.createElement('div');
  panel.className = 'grid cruise-dashboard-grid';
  panel.dataset.cruiseModule = 'true';
  panel.innerHTML = `<div class="card card-pad"><h3>Ships in Port Today</h3>${todayShips.length ? todayShips.map((entry) => `<div class="stat-row"><span>${escapeHtml(entry.arrivalTime || 'No arrival')}–${escapeHtml(entry.departureTime || 'No departure')}</span><strong>${escapeHtml(entry.shipName)}<br><small>${escapeHtml(entry.terminalDock || 'No dock')}</small></strong></div>`).join('') : '<p class="empty-state">No ships in port today.</p>'}</div><div class="card card-pad"><h3>Upcoming Ships</h3>${upcoming.length ? upcoming.map((entry) => `<div class="stat-row"><span>${escapeHtml(formatDate(entry.arrivalDate))}</span><strong>${escapeHtml(entry.shipName)}<br><small>${escapeHtml(entry.cruiseLine || 'Cruise line')} · ${Number(entry.passengerCapacity || 0).toLocaleString()} pax</small></strong></div>`).join('') : '<p class="empty-state">No upcoming cruise entries.</p>'}</div>`;
  table.before(sourcePanel, panel);
  if (integrationIsStale(integration, 60)) setTimeout(() => refreshCruiseMapperSchedule(true), 0);
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
  voiceAssistantOpen = true;
  const form = resolveVoiceForm(currentRoute, button);
  if (!form) {
    updateVoiceCommand({ state: 'ERROR', message: 'No editable fields are available on this page yet. Open or create a record first.' });
    toast('Open or create a record to use Command Voice Fill on this page.');
    return;
  }
  voiceCommand = { state: 'LISTENING_FOR_FIELD', route: currentRoute, field: null, form, lastValue: '', message: 'Which field would you like to fill?', suggestions: voiceFieldExamples() };
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
    updateVoiceCommand({ state: 'LISTENING_FOR_FIELD', field: null, lastValue: '', message: 'Next field?' });
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

function normalizeDateInput(value) {
  if (!value) return '';
  const text = String(value).trim();
  const parts = text.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})$/);
  if (parts) return `${parts[3].length === 2 ? '20' + parts[3] : parts[3]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime()) && /[A-Za-z]/.test(text)) return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
  return text;
}

function calculateEndTime(startTime, durationHours) {
  const match = String(startTime || '').match(/^(\d{2}):(\d{2})$/);
  const hours = Number.parseFloat(durationHours);
  if (!match || !Number.isFinite(hours)) return '';
  const minutes = (Number(match[1]) * 60 + Number(match[2]) + Math.round(hours * 60)) % (24 * 60);
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
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
  { key: 'endTime', fallbackKeys: ['returnTime', 'departureTime'], label: 'End Time', aliases: ['end time', 'return time', 'finish time'] },
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
  return ['Customer Name', 'Phone Number', 'Email', 'Guest Count', 'Tour Type', 'Trip Date', 'Start Time', 'End Time', 'Vessel', 'Owner', 'Captain', 'Mate', 'Price', 'Deposit', 'Balance', 'Payment Status', 'Payment Method', 'Notes', 'Expense Amount', 'Incident Severity', 'Captain Signature', 'Mate Signature'];
}

function renderVoiceCommandPanel(route) {
  document.querySelectorAll('[data-voice-command-panel]').forEach((node) => node.remove());
  const shell = document.getElementById('appShell');
  if (!shell || shell.hidden || !voiceSupportedRoutes.has(route)) return;
  const active = voiceCommand.route === route ? voiceCommand : { state: 'IDLE', message: 'Command Voice Fill idle. Tap the microphone to open the assistant.' };
  const stateClass = voiceCommand.route === route ? voiceCommand.state.toLowerCase().replace(/_/g, '-') : 'idle';
  const mode = active.state === 'IDLE' ? 'Field Command Mode + Natural Sentence Mode' : active.field ? 'Natural Sentence Mode' : 'Field Command Mode';
  const currentStep = active.state === 'LISTENING_FOR_VALUE' ? 'Listening for value' : active.state === 'LISTENING_FOR_FIELD' ? 'Listening for field name' : active.message;
  const sheet = voiceAssistantOpen ? `<div class="voice-assistant-backdrop" data-voice-close></div><section class="voice-command-panel state-${stateClass}" data-voice-command-panel role="dialog" aria-modal="true" aria-labelledby="voiceAssistantTitle"><div class="voice-sheet-handle" aria-hidden="true"></div><div class="voice-assistant-header"><div class="voice-mic" aria-hidden="true">🎙️</div><div><h3 id="voiceAssistantTitle">${escapeHtml(active.state.replace(/_/g, ' '))}</h3></div><button class="btn btn-outline btn-small" type="button" data-voice-close>Close</button></div><div class="voice-assistant-body"><div class="voice-mode-grid"><span><strong>Mode:</strong> ${escapeHtml(mode)}</span><span><strong>Current Step:</strong> ${escapeHtml(currentStep)}</span></div><p>${escapeHtml(active.message)}</p>${active.suggestions?.length ? `<p class="voice-suggestions">Try saying: ${active.suggestions.map(escapeHtml).join(' · ')}</p>` : '<p class="voice-suggestions">Say: Customer Name. Then say: Crystal Belle.</p>'}</div><div class="voice-command-actions"><button class="btn btn-primary btn-small" type="button" data-command-voice-start>Start Listening</button><button class="btn btn-outline btn-small" type="button" data-voice-action="stop">Stop</button><button class="btn btn-outline btn-small" type="button" data-voice-action="accept">Accept</button><button class="btn btn-outline btn-small" type="button" data-voice-action="retry">Retry</button><button class="btn btn-outline btn-small" type="button" data-voice-action="clear">Clear</button><button class="btn btn-outline btn-small" type="button" data-voice-action="next">Next Field</button><button class="btn btn-outline btn-small" type="button" data-voice-close>Close</button></div></section>` : '';
  // Phase 4D legacy validator marker retained: heading.insertAdjacentHTML('afterend', markup)
  const markup = `<div class="voice-assistant-root" data-voice-command-panel><button class="voice-fab" type="button" data-voice-toggle aria-expanded="${voiceAssistantOpen}" aria-label="Open voice assistant">🎙️</button>${sheet}</div>`;
  if (typeof shell.insertAdjacentHTML === 'function') shell.insertAdjacentHTML('beforeend', markup);
  else shell.innerHTML += markup;
}

function handleTreeNodeAction(node) {
  const action = node.dataset.treeAction;
  const value = node.dataset.treeValue;
  if (action === 'trip' || action === 'status') return openTripEditor(node.dataset.tripId || value);
  if (action === 'owner') return openOwnerDashboard(value);
  if (action === 'captain') return openCrewRoleDashboard('captain', value);
  if (action === 'mate') return openCrewRoleDashboard('mate', value);
  if (action === 'vessel') return openVesselManagement(value);
  if (action === 'pre') return renderRoute('pre-trip-checklist');
  if (action === 'post') return renderRoute('post-trip-checklist');
  if (['date', 'time'].includes(action)) filterTripsTable(value);
}

function openTripEditor(tripId) { renderRoute('trips'); showForm('trips', tripId); }
function openOwnerDashboard(owner) { dashboardFilters.owner = owner || ''; renderRoute('owner-dashboard'); }
function openCrewRoleDashboard(role, name) { dashboardFilters[role] = name || ''; renderRoute(`${role}-dashboard`); }
function openVesselManagement(vessel) { renderRoute('vessels'); const input = document.querySelector('#page-vessels .search-input'); if (input) { input.value = vessel || ''; renderTable('vessels'); } }
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
  const notices = visibleNotifications(store.notifications || []);
  const filtered = notices.filter((notice) => selected === 'All' || (selected === 'Unread' ? !notice.read : notice.recipientRole === selected || notice.category === selected));
  const options = ['All', 'Unread', 'Weather', 'Owner', 'Captain', 'Mate', 'Operations', 'Assignment', 'Checklist', 'Expense', 'Incident', 'Payroll'];
  const grouped = groupNotificationsByAge(filtered);
  const groupMarkup = ['Today', 'This Week', 'Older'].map((group) => `<section class="notification-group"><h3>${group}</h3>${grouped[group].length ? grouped[group].map(renderNoticeItem).join('') : '<p class="empty-state">No notifications in this group.</p>'}</section>`).join('');
  page.innerHTML = `<div class="page-stack"><div class="module-actions"><div class="notification-tools"><select data-notice-filter onchange="renderNotifications()">${options.map((option) => `<option value="${option}" ${option === selected ? 'selected' : ''}>${option}</option>`).join('')}</select><button class="btn btn-outline" data-mark-notices-read>Mark all read</button></div></div><div class="grid kpi-grid dashboard-kpis">${kpi('Owner alerts', unreadByRole('Owner'), 'Unread')}${kpi('Captain alerts', unreadByRole('Captain'), 'Unread')}${kpi('Mate alerts', unreadByRole('Mate'), 'Unread')}${kpi('Operations alerts', unreadByRole('Operations'), 'Unread')}</div><div class="card notification-inbox">${groupMarkup}</div></div>`;
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
  document.getElementById('page-audit').innerHTML = `<div class="page-stack"><div class="card table-card"><div class="responsive-table-wrap"><table><thead><tr><th>Time</th><th>User</th><th>Area</th><th>Action</th><th>Detail</th></tr></thead><tbody>${entries.length ? entries.map((entry) => `<tr><td>${escapeHtml(new Date(entry.at).toLocaleString())}</td><td>${escapeHtml(entry.user)}</td><td>${escapeHtml(entry.area)}</td><td><span class="badge blue">${escapeHtml(entry.action)}</span></td><td>${escapeHtml(entry.detail)}</td></tr>`).join('') : '<tr><td colspan="5" class="empty-state">No audit events yet.</td></tr>'}</tbody></table></div></div></div>`;
}



const preTripChecklistItems = [
  ['fuelVerified','Fuel Verified?','yesno','Vessel Readiness'],
  ['safetyGearVerified','Safety Gear Verified?','yesno','Vessel Readiness'],
  ['engineCheckComplete','Engine Check Complete?','yesno','Vessel Readiness'],
  ['radioTested','Radio Tested?','yesno','Vessel Readiness'],
  ['gpsTested','GPS Tested?','yesno','Vessel Readiness'],
  ['vesselClean','Vessel Clean?','yesno','Vessel Readiness'],
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
  ['fuelVerified','Fuel Verified?','yesno','Vessel Condition'],
  ['safetyGearVerified','Safety Gear Verified?','yesno','Vessel Condition'],
  ['engineCheckComplete','Engine Check Complete?','yesno','Vessel Condition'],
  ['radioTested','Radio Tested?','yesno','Vessel Condition'],
  ['gpsTested','GPS Tested?','yesno','Vessel Condition'],
  ['vesselClean','Vessel Clean?','yesno','Vessel Condition'],
  ['post_clean','Boat has been cleaned','checkbox','Cleaning'],
  ['post_trash','All trash has been removed','checkbox','Cleaning'],
  ['post_ready','Boat is ready for the next charter','checkbox','Cleaning'],
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
  page.innerHTML = `<div class="page-stack checklist-mobile-page"><form class="record-form card" onsubmit="saveChecklistRecord(event,'${type}')"><details class="form-section-card checklist-accordion" open><summary><div class="form-section-title"><span>1</span><h3>Trip Details</h3></div><span class="chevron" aria-hidden="true">⌄</span></summary><div class="form-grid"><div class="field"><label>Trip</label><select name="tripId" onchange="populateChecklistTripDetails(this.form)"><option value="">— Select Trip —</option>${getOptions('trips').map((opt) => `<option value="${escapeHtml(opt.split('|')[0])}">${escapeHtml(opt.split('|').slice(1).join('|'))}</option>`).join('')}</select></div><div class="field"><label>Vessel</label><select name="vessel"><option value="">Select Vessel</option>${getOptions('vessels').map((vessel) => `<option value="${escapeHtml(vessel)}">${escapeHtml(vessel)}</option>`).join('')}</select></div><div class="field"><label>Captain / Initials</label><select name="captain"><option value="">Select Captain</option>${getOptions('crew').map((crew) => `<option value="${escapeHtml(crew)}">${escapeHtml(crew)}</option>`).join('')}</select></div><div class="field"><label>Mate</label><select name="mate"><option value="">Select Mate</option>${getOptions('crew').map((crew) => `<option value="${escapeHtml(crew)}">${escapeHtml(crew)}</option>`).join('')}</select></div><div class="field"><label>Date</label><input name="date" type="date"></div><div class="field"><label>${timeLabel}</label><input name="${timeName}" type="time"></div><div class="field"><label>Status</label><select name="status"><option>Draft</option><option>Submitted</option><option>Needs Review</option></select></div></div></details>${renderChecklistSections(items, type)}<div class="maintenance-checklist-alert">${maintenanceChecklistWarnings()}</div><div class="form-actions sticky-save-controls"><button class="btn btn-outline" type="submit" name="action" value="draft">Save Draft</button><button class="btn btn-primary" type="submit" name="action" value="submit">Submit ${type} Checklist</button><button class="btn btn-outline" type="submit" name="action" value="review">Mark Needs Review</button><button class="btn btn-outline" type="button" onclick="window.print()">Preview / Print / Save PDF</button><a class="btn btn-outline" href="https://wa.me/" target="_blank" rel="noopener">WhatsApp</a>${voiceFillButton(route)}</div></form><div class="card table-card"><div class="card-header"><h3>${type} records</h3><button class="btn btn-outline btn-small" type="button" onclick="window.print()">Print / Export Records</button></div><div class="responsive-table-wrap"><table><thead><tr><th>Submitted</th><th>Trip</th><th>Vessel</th><th>Captain</th><th>Mate</th><th>Status</th><th>Notes</th></tr></thead><tbody>${records.length ? records.map((record) => `<tr><td>${escapeHtml(new Date(record.submittedAt).toLocaleString())}</td><td>${escapeHtml(record.tripLabel || record.tripId)}</td><td>${escapeHtml(record.vessel)}</td><td>${escapeHtml(record.captain)}</td><td>${escapeHtml(record.mate)}</td><td>${readinessBadge(record.status)}</td><td>${escapeHtml(record.generalNotes || record.customerFeedbackNotes || record.notes || '—')}</td></tr>`).join('') : '<tr><td colspan="7" class="empty-state">No checklist records yet.</td></tr>'}</tbody></table></div></div>${renderUploadZone(route)}${renderPhotoNotePanel(route)}</div>`;
}

function checklistSectionLabel(section) {
  if (section === 'Boat Status') return 'Vessel Readiness';
  if (['Stock', 'Cleaning Products', 'Remaining Stock'].includes(section)) return 'Inventory / Supplies';
  if (['Engine / Fuel', 'Fuel / Engines', 'Bilge / Flush'].includes(section)) return 'Safety Equipment';
  if (section === 'Photos / Notes') return 'Notes and Photos';
  if (section === 'Sign-Off') return 'Submit / Signature';
  return section || 'Checklist';
}

function renderChecklistSections(items, type = 'Pre Trip') {
  const isPre = type === 'Pre Trip';
  const groups = items.reduce((acc, item) => { const section = checklistSectionLabel(item[3]); acc[section] ||= []; acc[section].push(item); return acc; }, {});
  const order = isPre
    ? ['Vessel Readiness', 'Safety Equipment', 'Inventory / Supplies', 'Crew Confirmation', 'Stock Level Alerts', 'Notes and Photos', 'Submit / Signature']
    : ['Vessel Condition', 'Cleaning', 'Inventory / Supplies', 'Damage / Maintenance', 'Incident Review', 'Stock Level Alerts', 'Notes and Photos', 'Submit / Signature'];
  if (!isPre) {
    groups['Damage / Maintenance'] = groups['Damage / Maintenance'] || [['damageMaintenanceNotes','Damage / maintenance notes','textarea','Damage / Maintenance']];
    groups['Incident Review'] = groups['Incident Review'] || [['incidentReviewNotes','Incident review notes','textarea','Incident Review']];
  }
  if (isPre) groups['Crew Confirmation'] = groups['Crew Confirmation'] || [['crewConfirmationNotes','Crew confirmation notes','textarea','Crew Confirmation']];
  let number = 2;
  return order.map((section) => {
    if (section === 'Stock Level Alerts') return renderChecklistStockAlerts(number++);
    const fields = groups[section] || [];
    if (!fields.length) return '';
    const open = ['Vessel Readiness', 'Vessel Condition', 'Safety Equipment', 'Cleaning'].includes(section);
    return `<details class="form-section-card checklist-accordion" ${open ? 'open' : ''}><summary><div class="form-section-title"><span>${number++}</span><h3>${escapeHtml(section)}</h3></div><span class="chevron" aria-hidden="true">⌄</span></summary><div class="checklist-grid">${fields.map(([key, label, inputType]) => renderChecklistInput(key, label, inputType)).join('')}</div></details>`;
  }).join('');
}

function renderChecklistStockAlerts(number = 6) {
  if (!canViewStockAlerts()) return '';
  const alerts = inventoryAlerts();
  return `<details class="card stock-alert-details checklist-accordion"><summary><div class="form-section-title"><span>${number}</span><div><h3>Stock Level Alerts</h3><p class="muted-text">Owner / Admin only. Collapsed by default so checklist completion stays clear unless stock is critical.</p></div></div><span class="badge ${alerts.length ? 'red' : 'green'}">${alerts.length ? 'Restock Needed' : 'Stock OK'}</span><span class="chevron" aria-hidden="true">⌄</span></summary><div class="stock-alert-list">${alerts.length ? alerts.map(renderStockAlertRow).join('') : '<p class="empty-state">No stock level alerts.</p>'}</div></details>`;
}

function renderStockAlertRow(item) {
  const trip = (store.trips || []).find((entry) => entry.id === item.linkedTrip);
  const linkedTrip = trip ? `${formatDate(trip.tripDate)} · ${trip.customer || trip.id}` : item.linkedTrip || '—';
  return `<article class="stock-alert-row"><div><strong>${escapeHtml(item.name)}</strong><p class="muted-text">${escapeHtml(item.category || 'Inventory')} · ${escapeHtml(item.unit || 'units')}</p></div><div><span>Current stock</span><strong>${escapeHtml(item.currentStock)}</strong></div><div><span>Minimum required stock</span><strong>${escapeHtml(item.minimumRequiredStock)}</strong></div><div><span>Recommended restock level</span><strong>${escapeHtml(item.recommendedStock)}</strong></div><div><span>Linked vessel</span><strong>${escapeHtml(item.linkedVessel || 'All vessels')}</strong></div><div><span>Linked trip</span><strong>${escapeHtml(linkedTrip)}</strong></div><div><span>Last updated</span><strong>${escapeHtml(new Date(item.lastUpdated).toLocaleString())}</strong></div><div><span>Restock needed status</span><strong>${statusBadge(item.status)} ${escapeHtml(item.restockNeeded)}</strong></div></article>`;
}

function renderChecklistInput(key, label, inputType) {
  if (inputType === 'yesno') return `<div class="yes-no-check"><div class="yes-no-row"><span>${escapeHtml(label)}</span><label><input type="radio" name="${key}" value="Yes" onchange="toggleNoNotes(this)"> Yes</label><label><input type="radio" name="${key}" value="No" onchange="toggleNoNotes(this)"> No</label></div><div class="field no-notes-field" data-no-notes-for="${key}" hidden><label>Notes if No</label><textarea name="${key}Notes"></textarea></div></div>`;
  if (inputType === 'checkbox') return `<label class="checklist-item"><input type="checkbox" name="${key}" value="Yes"><span>${escapeHtml(label)}</span></label>`;
  if (inputType === 'textarea') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><textarea name="${key}"></textarea></div>`;
  if (inputType === 'number') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><input name="${key}" type="number" min="0" step="1" value="0"></div>`;
  if (inputType === 'date') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><input name="${key}" type="date"></div>`;
  if (inputType === 'select:punchReady') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><select name="${key}"><option value="">Select ${escapeHtml(label)}</option><option>Confirmed Mixed & Ready</option><option>Needs Preparation</option></select></div>`;
  if (inputType === 'select:bottleLevel') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><select name="${key}"><option value="">Select ${escapeHtml(label)}</option><option>Full</option><option>Half</option><option>Empty</option></select></div>`;
  if (inputType === 'select:oilStatus') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><select name="${key}"><option value="">Select ${escapeHtml(label)}</option><option>Need to Add</option><option>OK</option><option>Too Full</option></select></div>`;
  if (inputType === 'select:fuelLevel') return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><select name="${key}"><option value="">Select ${escapeHtml(label)}</option><option>E</option><option>1/4</option><option>1/2</option><option>3/4</option><option>F</option></select></div>`;
  return `<div class="field checklist-field"><label>${escapeHtml(label)}</label><input name="${key}" type="text"></div>`;
}

function toggleNoNotes(input) {
  const wrap = input.closest('.yes-no-check');
  if (!wrap) return;
  const field = wrap.querySelector('[data-no-notes-for]');
  if (field) field.hidden = input.value !== 'No';
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
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const noFields = Array.from(form.querySelectorAll('.yes-no-check input[type="radio"][value="No"]:checked')).map((input) => input.name);
  const missingNoNotes = noFields.some((key) => !String(data[`${key}Notes`] || '').trim());
  if (missingNoNotes) { toast('Notes if No are required for vessel readiness items.'); return; }
  data.status = noFields.length ? 'Needs Review' : submitterAction === 'submit' ? 'Submitted' : submitterAction === 'review' ? 'Needs Review' : 'Draft';
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
  return (store.notifications || []).some((notice) => notice.metadata?.reminderKey === key) || (store.reminderHistory || []).some((item) => item.key === key);
}
function recordReminderHistory(key, trip, role, name, type, message) {
  store.reminderHistory = Array.isArray(store.reminderHistory) ? store.reminderHistory : [];
  store.reminderHistory.unshift({ id: makeId('reminder'), key, tripId: trip.id, role, name, type, message, at: new Date().toISOString() });
  store.reminderHistory = store.reminderHistory.slice(0, 250);
}
function generateChecklistReminders(now = new Date()) {
  (store.trips || []).filter((trip) => trip.status !== 'Cancelled').forEach((trip) => {
    const crew = crewAssignmentsForTrip(trip);
    const start = tripDateTime(trip);
    if (start && now <= start && latestChecklistStatus(trip, 'Pre Trip') !== 'Completed') {
      crew.forEach(({ role, name }) => {
        const key = `pre-${trip.id}-${role}-${name}`;
        if (!reminderExists(key)) { const message = `Pre Trip Checklist due for ${trip.customer || 'customer'} on ${trip.vessel || 'assigned vessel'}.`; addRoleNotification(role, name, 'Pre Trip Checklist due', message, 'warning', 'Checklist', { tripId: trip.id, reminderKey: key, reminderType: 'pre-trip', displayTargets: ['Notifications', 'Captain Dashboard', 'Mate Dashboard', 'Trip card', 'Dispatch Tree node'] }); recordReminderHistory(key, trip, role, name, 'pre-trip', message); }
      });
    }
    const postReminderAt = postTripReminderTime(trip);
    if (postReminderAt && now >= postReminderAt && latestChecklistStatus(trip, 'Post Trip') !== 'Completed') {
      crew.forEach(({ role, name }) => {
        const key = `post-${trip.id}-${role}-${name}`;
        if (!reminderExists(key)) { const message = 'Please complete Post Trip Checklist.'; addRoleNotification(role, name, 'Post Trip Checklist due soon', message, 'warning', 'Checklist', { tripId: trip.id, reminderKey: key, reminderType: 'post-trip-30-minute', reminderAt: postReminderAt.toISOString(), displayTargets: ['Notifications', 'Captain Dashboard', 'Mate Dashboard', 'Trip card', 'Dispatch Tree node'] }); recordReminderHistory(key, trip, role, name, 'post-trip-30-minute', message); }
      });
    }
  });
  saveStore();
}

function renderVesselReadinessPanel() {
  // Validator-compatible hook retained; this now renders vessel management readiness summaries, not Yes / No checklist controls.
  return renderVesselManagementPanel();
}

function renderVesselManagementPanel() {
  const page = document.getElementById('page-vessels');
  const table = page.querySelector('.table-card');
  if (!table || page.querySelector('[data-vessel-management-panel]')) return;
  const panel = document.createElement('details');
  panel.className = 'card vessel-management-panel app-accordion';
  panel.dataset.vesselManagementPanel = 'true';
  panel.open = true;
  panel.innerHTML = `<summary><div><h3>Vessel Management Summary</h3><p class="muted-text">All vessels remain visible here. Detailed maintenance tracking and service records apply only to Reel Adventure Tours I and Reel Adventure Tours II. Checklist Yes / No controls live only inside Pre Trip and Post Trip checklist vessel sections.</p></div><span class="chevron" aria-hidden="true">⌄</span></summary><div class="readiness-grid">${store.vessels.map((vessel) => { const assigned = (store.trips || []).filter((trip) => trip.vessel === vessel.name && !['Completed','Cancelled'].includes(trip.status)); return `<article class="readiness-card"><strong>${escapeHtml(vessel.name)}</strong>${isMaintenanceVessel(vessel.name) ? `<span class="badge ${maintenanceStatusColor(maintenanceStatusForVessel(vessel.name))}">Maintenance: ${escapeHtml(maintenanceStatusForVessel(vessel.name))}</span>` : `<span class="badge gray">Maintenance tracking not required</span>`}<span>${escapeHtml(vessel.model || 'No model')} · ${escapeHtml(vessel.owner || 'No owner')} · Capacity ${escapeHtml(vessel.capacity || '—')}</span><p><strong>Status:</strong> ${escapeHtml(vessel.status || 'Active')}</p><p><strong>Assigned Trips:</strong> ${assigned.length ? assigned.map((trip) => `${formatDate(trip.tripDate)} ${trip.customer || 'Trip'}`).join(', ') : escapeHtml(vessel.assignedTrips || 'No active assignments')}</p><p><strong>Maintenance Notes:</strong> ${escapeHtml(vessel.maintenanceNotes || 'None')}</p><p><strong>Readiness Summary:</strong> ${escapeHtml(vessel.readinessSummary || vessel.status || 'Use checklist records and dispatch readiness for operational readiness.')}</p></article>`; }).join('')}</div>`;
  table.before(panel);
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
  const ownerFuelCost = trips.reduce((sum, trip) => sum + Number(trip.totalFuelCost || 0), 0);
  const ownerNetProfit = trips.reduce((sum, trip) => sum + tripProfitability(trip).estimatedNetProfit, 0);
  page.innerHTML = `<div class="page-stack owner-command-center"><div class="module-actions"><select data-owner-select onchange="renderOwnerDashboard()">${getOptions('owners').map((owner) => `<option value="${escapeHtml(owner)}" ${owner === selected ? 'selected' : ''}>${escapeHtml(owner)}</option>`).join('')}</select></div>${renderDashboardWeatherWidget()}<div class="grid kpi-grid dashboard-kpis">${kpi('Assigned vessels', ownerVessels.length, ownerVessels.join(', ') || 'None')}${kpi('Upcoming trips', trips.length, 'Owner vessel assignments')}${kpi('Outstanding owner payouts', money(outstanding), 'Unpaid owner payroll')}${kpi('Checklist completion', `${checklistDone}/${trips.length}`, 'Pre trip complete')}${kpi('Incident alerts', incidentAlerts.length, 'Open owner vessel incidents')}${kpi('Expense alerts', expenseAlerts.length, 'Submitted or review needed')}${kpi('Fuel cost', money(ownerFuelCost), 'Owner vessel trips')}${kpi('Estimated net profit', money(ownerNetProfit), 'After payroll, fuel, and expenses')}${kpi('Payroll alerts', ownerPayroll.filter((entry) => entry.outstanding > 0).length, 'Outstanding payout lines')}</div>${weatherSummaryCards(trips)}<div class="grid dashboard-grid"><div class="card"><div class="card-header"><h3>Upcoming trips</h3>${statusBadge(trips.length ? 'Pending' : 'Ready')}</div><div class="stat-list">${trips.length ? trips.map((trip) => `<div class="stat-row"><span>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(trip.vessel)}</span><strong>${escapeHtml(trip.customer || 'Trip')}<br><small>Captain ${escapeHtml(trip.captain || 'Missing')} · Mate ${escapeHtml(trip.mate || 'Missing')} · ${escapeHtml(calculateDispatchReadiness(trip))}<br>${weatherRiskBadge(trip)}</small></strong></div>`).join('') : '<p class="empty-state">No owner vessel assignments.</p>'}</div></div><div class="card"><div class="card-header"><h3>Owner alerts</h3>${statusBadge(incidentAlerts.length ? 'Incident' : expenseAlerts.length ? 'Needs Review' : 'Ready')}</div><div class="notice-list card-pad">${notices.length ? notices.slice(0, 8).map((notice) => `<div class="notice-item ${notice.read ? '' : 'unread'}"><span class="badge ${statusColor(notice.category)}">${escapeHtml(notice.category)}</span><div><strong>${escapeHtml(notice.title)}</strong><p>${escapeHtml(notice.message)}</p></div></div>`).join('') : '<p class="empty-state">No owner alerts.</p>'}</div></div></div>${renderPhotoNotePanel('owner-dashboard')}</div>`;
  activateDashboardWeatherWidget();
}



function calculateGallonsUsed(trip) {
  const start = Number(trip.fuelStartLevel || 0);
  const end = Number(trip.fuelEndLevel || 0);
  if ((start > 0 || end > 0) && start >= end) return Number((start - end).toFixed(2));
  return Number(Number(trip.gallonsUsed || 0).toFixed(2));
}

function calculateFuelCost(trip) {
  return Number((calculateGallonsUsed(trip) * Number(trip.fuelPricePerGallon || 0)).toFixed(2));
}

function tripProfitability(trip) {
  const payroll = trip.payroll || calculateTripPayroll(trip);
  const payFor = (role) => payroll.filter((entry) => entry.role === role).reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const linkedExpenses = (store.expenses || []).filter((expense) => expense.linkedTrip === trip.id && expense.category !== 'Fuel').reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const result = { tourRevenue: Number(trip.tourPrice || 0), depositPaid: Number(trip.depositPaid || 0), balanceDue: Number(trip.balanceDue || 0), captainPay: payFor('Captain'), matePay: payFor('Mate'), ownerPayout: payFor('Owner'), fuelCost: Number(trip.totalFuelCost || 0), expenses: linkedExpenses };
  result.estimatedNetProfit = result.tourRevenue - result.captainPay - result.matePay - result.ownerPayout - result.fuelCost - result.expenses;
  return result;
}

function renderTripProfitability(trip) {
  const p = tripProfitability(trip);
  return `<details class="card profitability-card app-accordion" open data-profitability-summary><summary><div><h3>Trip Profitability</h3><p class="muted-text">Estimated using current revenue, payroll, fuel, and linked expenses.</p></div><strong class="${p.estimatedNetProfit >= 0 ? 'profit-positive' : 'profit-negative'}">${money(p.estimatedNetProfit)}</strong></summary><div class="profitability-grid"><div><span>Tour Revenue</span><strong>${money(p.tourRevenue)}</strong></div><div><span>Deposit Paid</span><strong>${money(p.depositPaid)}</strong></div><div><span>Balance Due</span><strong>${money(p.balanceDue)}</strong></div><div><span>Captain Pay</span><strong>${money(p.captainPay)}</strong></div><div><span>Mate Pay</span><strong>${money(p.matePay)}</strong></div><div><span>Owner Payout</span><strong>${money(p.ownerPayout)}</strong></div><div><span>Fuel Cost</span><strong>${money(p.fuelCost)}</strong></div><div><span>Expenses</span><strong>${money(p.expenses)}</strong></div><div class="profit-total"><span>Estimated Net Profit</span><strong>${money(p.estimatedNetProfit)}</strong></div></div></details>`;
}

function updateFuelCalculation(form) {
  if (!form?.elements?.gallonsUsed) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const gallons = calculateGallonsUsed(data);
  form.elements.gallonsUsed.value = gallons || '';
  if (data.fuelCostManualOverride !== 'Yes') form.elements.totalFuelCost.value = calculateFuelCost({ ...data, gallonsUsed: gallons }) || '';
  const host = form.querySelector('[data-profitability-summary]');
  if (host) host.outerHTML = renderTripProfitability({ ...(editing.trips ? store.trips.find((trip) => trip.id === editing.trips) : {}), ...data, gallonsUsed: gallons, totalFuelCost: Number(form.elements.totalFuelCost.value || 0), payroll: calculateTripPayroll(data) });
}

function renderFuelReceiptEditor(trip = {}) {
  const receipt = pendingFuelReceipt || trip.fuelReceipt;
  return `<details class="card fuel-receipt-card app-accordion" open><summary><div><h3>Fuel Receipt</h3><p class="muted-text">Linked to this trip, vessel, fuel record, and optional expense record.</p></div><span class="chevron">⌄</span></summary><div class="fuel-receipt-actions"><label class="btn btn-outline">Take Photo<input type="file" accept="image/*" capture="environment" hidden onchange="saveFuelReceiptFile(this.files[0])"></label><label class="btn btn-outline">Choose File<input type="file" accept="image/*,.pdf" hidden onchange="saveFuelReceiptFile(this.files[0])"></label>${receipt ? '<button class="btn btn-danger" type="button" onclick="removeFuelReceipt()">Remove Receipt</button>' : ''}</div><div data-fuel-receipt-preview>${receipt ? renderFuelReceiptPreview(receipt) : '<p class="empty-state">No fuel receipt uploaded.</p>'}</div></details>`;
}

function renderFuelReceiptPreview(receipt) {
  const preview = String(receipt.dataUrl || '').startsWith('data:image/') ? `<img src="${escapeHtml(receipt.dataUrl)}" alt="Fuel receipt preview">` : '<span class="receipt-file-icon">📄</span>';
  return `<article class="fuel-receipt-preview">${preview}<div><strong>${escapeHtml(receipt.fileName || 'Fuel receipt')}</strong><p>${escapeHtml(receipt.vessel || 'Vessel linked when trip saves')} · ${escapeHtml(receipt.fuelRecordId || 'Fuel record pending')}</p></div></article>`;
}

function saveFuelReceiptFile(file) {
  if (!file) return;
  if (file.size > 4 * 1024 * 1024) return toast('Receipt too large. Choose a file under 4 MB.');
  const reader = new FileReader();
  reader.onload = () => {
    const form = document.querySelector('#page-trips .record-form');
    pendingFuelReceipt = { id: makeId('fuel-receipt'), fileName: file.name, size: file.size, dataUrl: String(reader.result || ''), tripId: editing.trips || '', vessel: form?.elements?.vessel?.value || '', fuelRecordId: editing.trips ? `fuel-${editing.trips}` : 'pending', addedAt: new Date().toISOString() };
    const host = form?.querySelector('[data-fuel-receipt-preview]');
    if (host) host.innerHTML = renderFuelReceiptPreview(pendingFuelReceipt);
    toast('Fuel receipt ready to save with trip.');
  };
  reader.readAsDataURL(file);
}

function removeFuelReceipt() {
  pendingFuelReceipt = { removed: true };
  const host = document.querySelector('#page-trips [data-fuel-receipt-preview]');
  if (host) host.innerHTML = '<p class="empty-state">Fuel receipt removed. Save the trip to confirm.</p>';
}

function syncFuelExpense(trip) {
  const storedTrip = (store.trips || []).find((item) => item.id === trip.id);
  if (trip.fuelReceipt?.removed) trip.fuelReceipt = null;
  if (trip.fuelReceipt) Object.assign(trip.fuelReceipt, { tripId: trip.id, vessel: trip.vessel, fuelRecordId: `fuel-${trip.id}` });
  if (storedTrip) storedTrip.fuelReceipt = trip.fuelReceipt;
  const fuelRecord = { id: `fuel-${trip.id}`, tripId: trip.id, vessel: trip.vessel, fuelStartLevel: Number(trip.fuelStartLevel || 0), fuelEndLevel: Number(trip.fuelEndLevel || 0), gallonsUsed: Number(trip.gallonsUsed || 0), fuelPricePerGallon: Number(trip.fuelPricePerGallon || 0), totalFuelCost: Number(trip.totalFuelCost || 0), fuelPaidBy: trip.fuelPaidBy || '', receipt: trip.fuelReceipt || null, notes: trip.fuelNotes || '', updatedAt: new Date().toISOString() };
  const existingFuelRecord = (store.fuelRecords || []).find((record) => record.tripId === trip.id);
  if (existingFuelRecord) Object.assign(existingFuelRecord, fuelRecord); else store.fuelRecords.push(fuelRecord);
  const existing = (store.expenses || []).find((expense) => expense.fuelTripId === trip.id);
  if (trip.createFuelExpense !== 'Yes' || Number(trip.totalFuelCost || 0) <= 0) return;
  const expense = { id: existing?.id || makeId('expenses'), fuelTripId: trip.id, date: trip.tripDate, vessel: trip.vessel, category: 'Fuel', description: `Fuel for ${trip.customer || 'trip'}`, amount: Number(trip.totalFuelCost || 0), paidBy: trip.fuelPaidBy, linkedTrip: trip.id, status: existing?.status || 'Submitted', reimbursementStatus: existing?.reimbursementStatus || 'Track only', receiptNumber: trip.fuelReceipt?.fileName || '', receiptPhotos: trip.fuelReceipt?.dataUrl || '', notes: trip.fuelNotes || '' };
  if (existing) Object.assign(existing, expense); else store.expenses.push(expense);
}

function canEditTripFuel(trip) {
  const role = activeRoleName();
  return ['Admin', 'Owner'].includes(role) || (role === 'Captain' && trip.captain === activeRolePerson('Captain'));
}

function renderCrewFuelCard(trip, role) {
  if (role === 'mate') return `<details class="crew-fuel-summary"><summary>Fuel information</summary>${renderFuelMiniSummary(trip)}</details>`;
  return `<details class="crew-fuel-summary" open><summary>Submit fuel information</summary>${renderFuelMiniSummary(trip)}<button class="btn btn-outline btn-small" type="button" onclick="openTripEditor('${trip.id}')">Open Fuel Tracking</button></details>`;
}

function renderFuelMiniSummary(trip) {
  return `<div class="fuel-mini-grid"><span>Start <strong>${Number(trip.fuelStartLevel || 0)} gal</strong></span><span>End <strong>${Number(trip.fuelEndLevel || 0)} gal</strong></span><span>Used <strong>${Number(trip.gallonsUsed || 0)} gal</strong></span><span>Cost <strong>${money(trip.totalFuelCost)}</strong></span></div>`;
}

function renderFuelTrackingOverview() {
  const role = activeRoleName();
  const allowed = (store.trips || []).filter((trip) => role === 'Admin' || role === 'Bookkeeper' || (role === 'Owner' && ownerForVesselName(trip.vessel) === activeRolePerson('Owner')) || (role === 'Captain' && trip.captain === activeRolePerson('Captain')) || (role === 'Mate' && trip.mate === activeRolePerson('Mate')));
  return `<details class="card fuel-overview app-accordion" open><summary><div><h3>Fuel Tracking & Trip Profitability</h3><p class="muted-text">Fuel is available for every trip and expected for Reel Adventure Tours I and II.</p></div><span class="badge blue">${allowed.length} visible trips</span></summary><div class="fuel-trip-card-grid">${allowed.length ? allowed.map((trip) => { const p = tripProfitability(trip); return `<article class="fuel-trip-card"><div><strong>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(trip.customer || 'Trip')}</strong><p>${escapeHtml(trip.vessel || 'Unassigned vessel')}</p></div>${renderFuelMiniSummary(trip)}${['Admin','Owner','Bookkeeper'].includes(role) ? `<div class="profit-chip ${p.estimatedNetProfit >= 0 ? 'profit-positive' : 'profit-negative'}">Net ${money(p.estimatedNetProfit)}</div>` : ''}${canEditTripFuel(trip) ? `<button class="btn btn-outline btn-small" onclick="showForm('trips','${trip.id}')">Edit Fuel</button>` : '<span class="badge gray">View only</span>'}</article>`; }).join('') : '<p class="empty-state">No fuel-visible trips for this role.</p>'}</div></details>`;
}

function renderFuelReports() {
  const trips = store.trips || [];
  const group = (key) => Object.entries(trips.reduce((acc, trip) => { const label = trip[key] || 'Unassigned'; acc[label] ||= { fuel: 0, profit: 0, trips: 0 }; acc[label].fuel += Number(trip.totalFuelCost || 0); acc[label].profit += tripProfitability(trip).estimatedNetProfit; acc[label].trips += 1; return acc; }, {}));
  const rows = (items) => items.map(([label, value]) => `<div class="stat-row"><span>${escapeHtml(label)}<br><small>${value.trips} trip(s) · Avg fuel ${money(value.trips ? value.fuel / value.trips : 0)}</small></span><strong>Fuel ${money(value.fuel)}<br><small>Net ${money(value.profit)}</small></strong></div>`).join('') || '<p class="empty-state">No fuel data yet.</p>';
  return `<div class="grid dashboard-grid fuel-report-grid"><div class="card card-pad"><h3>Fuel Cost & Net Profit by Vessel</h3>${rows(group('vessel'))}</div><div class="card card-pad"><h3>Fuel Cost & Net Profit by Trip</h3>${trips.map((trip) => `<div class="stat-row"><span>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(trip.customer || 'Trip')}</span><strong>Fuel ${money(trip.totalFuelCost)}<br><small>Net ${money(tripProfitability(trip).estimatedNetProfit)}</small></strong></div>`).join('') || '<p class="empty-state">No trips yet.</p>'}</div></div>`;
}


// Native reports dashboard uses current local app data.
function renderReports() {
  const trips = store.trips || [];
  const canViewProfitability = ['Admin', 'Owner', 'Bookkeeper'].includes(activeRoleName());
  const stockAlerts = canViewStockAlerts() ? inventoryAlerts() : [];
  const revenue = trips.reduce((sum, trip) => sum + Number(trip.tourPrice || 0), 0) + (store.invoices || []).reduce((sum, invoice) => sum + Number(invoice.tourPrice || 0), 0);
  const outstandingBalances = trips.reduce((sum, trip) => sum + Number(trip.balanceDue || 0), 0) + (store.invoices || []).reduce((sum, invoice) => sum + Number(invoice.balanceDue || 0), 0);
  const payrollOwed = payrollEntries().reduce((sum, entry) => sum + entry.outstanding, 0);
  const expenseTotal = (store.expenses || []).reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const fuelTotal = trips.reduce((sum, trip) => sum + Number(trip.totalFuelCost || 0), 0);
  const netProfitTotal = trips.reduce((sum, trip) => sum + tripProfitability(trip).estimatedNetProfit, 0);
  const readyTrips = trips.filter((trip) => calculateDispatchReadiness(trip) === 'Dispatch Ready').length;
  const notReadyTrips = trips.filter((trip) => calculateDispatchReadiness(trip) === 'Not Ready').length;
  const by = (key) => Object.entries(trips.reduce((acc, trip) => { const label = trip[key] || 'Unassigned'; acc[label] = (acc[label] || 0) + 1; return acc; }, {})).sort((a, b) => b[1] - a[1]);
  const listRows = (items) => items.length ? items.map(([label, count]) => `<div class="stat-row"><span>${escapeHtml(label)}</span><strong>${count}</strong></div>`).join('') : '<p class="empty-state">No trip data yet.</p>';
  document.getElementById('page-reports').innerHTML = `<div class="page-stack"><div class="grid kpi-grid">${kpi('Revenue Summary', money(revenue), 'Trips + Invoice / Quote')}${kpi('Outstanding Balances', money(outstandingBalances), 'Unpaid customer balances')}${kpi('Payroll Owed', money(payrollOwed), 'Outstanding crew/owner pay')}${kpi('Expenses', money(expenseTotal), 'Local expense records')}${canViewProfitability ? `${kpi('Fuel Cost', money(fuelTotal), 'All trip fuel records')}${kpi('Average Fuel Cost', money(trips.length ? fuelTotal / trips.length : 0), 'Per trip')}${kpi('Estimated Net Profit', money(netProfitTotal), 'After payroll, fuel, and expenses')}` : ''}${kpi('Trip Count', trips.length, 'All local trips')}${kpi('Ready vs Not Ready Trips', `${readyTrips} / ${notReadyTrips}`, 'Dispatch readiness')}${canViewStockAlerts() ? kpi('Stock Level Alerts', stockAlerts.length, 'Owner/Admin inventory visibility') : ''}</div><div class="grid dashboard-grid"><div class="card card-pad"><h3>Trips by Vessel</h3>${listRows(by('vessel'))}</div><div class="card card-pad"><h3>Trips by Captain</h3>${listRows(by('captain'))}</div><div class="card card-pad"><h3>Trips by Booking Source</h3>${listRows(by('bookingSource'))}</div><div class="card card-pad"><h3>Trip Status</h3><div class="stat-row"><span>Completed Trips</span><strong>${trips.filter((trip) => trip.status === 'Completed').length}</strong></div><div class="stat-row"><span>Cancelled Trips</span><strong>${trips.filter((trip) => trip.status === 'Cancelled').length}</strong></div><div class="stat-row"><span>Ready Trips</span><strong>${readyTrips}</strong></div><div class="stat-row"><span>Not Ready Trips</span><strong>${notReadyTrips}</strong></div></div></div>${canViewProfitability ? renderFuelReports() : '<div class="card card-pad empty-state">Fuel profitability reports are available to Admin, Owner, and Bookkeeper roles.</div>'}${renderUploadZone('reports')}</div>`;
}

function chatBadgeMarkup(className = 'nav-badge') {
  if (!store.chatPreferences?.showUnreadBadges) return '';
  const count = unreadChatCount();
  return count ? `<span class="${className}" aria-label="${count} unread chat messages">${count}</span>` : '';
}

function visibleChatUsers() {
  return store.users.filter((user) => user.active !== false && user.id !== currentUser().id && canDirectChatWith(user));
}

function canDirectChatWith(other) {
  const me = currentUser();
  if (!me.id || !other?.id || me.id === other.id || !store.chatPreferences?.directEnabled) return false;
  if (me.role === 'Admin' || other.role === 'Admin') return true;
  if (me.role === 'Bookkeeper' || other.role === 'Bookkeeper') return false;
  const trips = store.trips || [];
  const assignedTogether = trips.some((trip) => [trip.captain, trip.mate].includes(me.name) && [trip.captain, trip.mate].includes(other.name));
  const ownerCrewLink = trips.some((trip) => {
    const vesselOwner = store.vessels.find((vessel) => vessel.name === trip.vessel)?.owner;
    return (me.role === 'Owner' && vesselOwner === me.name && [trip.captain, trip.mate].includes(other.name)) || (other.role === 'Owner' && vesselOwner === other.name && [trip.captain, trip.mate].includes(me.name));
  });
  return assignedTogether || ownerCrewLink;
}

function visibleChatConversations() {
  const user = currentUser();
  return store.chatConversations.filter((conversation) => {
    if (conversation.type === 'general') return store.chatPreferences.generalEnabled;
    return conversation.participantUserIds?.includes(user.id) && store.chatPreferences.directEnabled;
  });
}

function conversationMessages(conversationId) {
  return store.chatMessages.filter((message) => message.conversationId === conversationId).sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
}

function unreadConversationCount(conversationId) {
  const userId = currentUser().id;
  return conversationMessages(conversationId).filter((message) => message.senderUserId !== userId && !(message.readBy || []).includes(userId)).length;
}

function unreadChatCount() { return visibleChatConversations().reduce((sum, conversation) => sum + unreadConversationCount(conversation.id), 0); }

function directConversationFor(userId) {
  return store.chatConversations.find((conversation) => conversation.type === 'direct' && conversation.participantUserIds?.includes(currentUser().id) && conversation.participantUserIds?.includes(userId));
}

function openDirectChat(userId) {
  const other = store.users.find((user) => user.id === userId);
  if (!canDirectChatWith(other)) return toast('This direct conversation is not available for your role or assignments.');
  let conversation = directConversationFor(userId);
  if (!conversation) {
    conversation = { id: makeId('chat-direct'), type: 'direct', title: '', participantUserIds: [currentUser().id, userId], createdAt: new Date().toISOString(), metadata: { scope: 'participants' } };
    store.chatConversations.push(conversation); saveStore();
  }
  openChatConversation(conversation.id);
}

function openChatConversation(conversationId) {
  if (!visibleChatConversations().some((conversation) => conversation.id === conversationId)) return;
  activeChatConversationId = conversationId; chatMobileThreadOpen = true; markConversationRead(conversationId, false); renderChat();
}

function markConversationRead(conversationId, rerender = true) {
  const userId = currentUser().id; const readAt = new Date().toISOString();
  conversationMessages(conversationId).forEach((message) => { message.readBy = [...new Set([...(message.readBy || []), userId])]; });
  const existing = store.chatReadReceipts.find((receipt) => receipt.conversationId === conversationId && receipt.userId === userId);
  if (existing) existing.readAt = readAt; else store.chatReadReceipts.push({ id: makeId('chat-read'), conversationId, userId, readAt });
  saveStore(); renderNav(); if (rerender) renderChat();
}

function sendChatMessage(event) {
  event.preventDefault(); const form = event.target; const text = String(new FormData(form).get('messageText') || '').trim();
  const conversation = visibleChatConversations().find((item) => item.id === activeChatConversationId);
  if (!text) return toast('Enter a chat message before sending.');
  if (!conversation) return toast('Choose a visible conversation before sending.');
  const user = currentUser();
  store.chatMessages.push({ id: makeId('chat-message'), conversationId: conversation.id, senderUserId: user.id, senderName: user.name, senderRole: user.role, messageText: text, createdAt: new Date().toISOString(), readBy: [user.id], attachments: [], metadata: { source: 'local-demo' } });
  addAudit('sent', 'Chat', `Sent a message in ${conversationLabel(conversation)}.`, { conversationId: conversation.id }); saveStore(); renderNav(); renderChat();
}

function conversationLabel(conversation) {
  if (conversation.type === 'general') return 'General Chat';
  return store.users.find((user) => conversation.participantUserIds?.includes(user.id) && user.id !== currentUser().id)?.name || 'Direct Message';
}

function renderChatConversationItem(conversation) {
  const unread = unreadConversationCount(conversation.id); const messages = conversationMessages(conversation.id); const last = messages.at(-1);
  return `<button class="chat-conversation-item ${activeChatConversationId === conversation.id ? 'active' : ''}" data-chat-conversation="${conversation.id}"><span class="chat-avatar">${conversation.type === 'general' ? '🌊' : escapeHtml(conversationLabel(conversation).slice(0, 1))}</span><span class="chat-conversation-copy"><strong>${escapeHtml(conversationLabel(conversation))}</strong><small>${escapeHtml(last?.messageText || (conversation.type === 'general' ? 'Company-wide messages' : 'Start a conversation'))}</small></span>${unread ? `<span class="chat-unread">${unread}</span>` : ''}</button>`;
}

function renderChat() {
  const page = document.getElementById('page-chat'); if (!page) return;
  const conversations = visibleChatConversations();
  if (!conversations.some((conversation) => conversation.id === activeChatConversationId)) activeChatConversationId = conversations[0]?.id || '';
  const active = conversations.find((conversation) => conversation.id === activeChatConversationId);
  const available = visibleChatUsers().filter((user) => (!chatFilters.person || user.id === chatFilters.person) && (!chatFilters.role || user.role === chatFilters.role));
  const search = chatFilters.search.toLowerCase();
  const messages = active ? conversationMessages(active.id).filter((message) => !search || `${message.senderName} ${message.senderRole} ${message.messageText}`.toLowerCase().includes(search)) : [];
  page.innerHTML = `<div class="page-stack"><div class="chat-layout ${chatMobileThreadOpen ? 'thread-open' : ''}"><aside class="chat-sidebar card"><div class="chat-tools"><input data-chat-search type="search" placeholder="Search messages" value="${escapeHtml(chatFilters.search)}"><select data-chat-filter="role"><option value="">All roles</option>${['Admin','Owner','Captain','Mate','Bookkeeper'].map((role) => `<option ${chatFilters.role === role ? 'selected' : ''}>${role}</option>`).join('')}</select><select data-chat-filter="person"><option value="">All people</option>${visibleChatUsers().map((user) => `<option value="${user.id}" ${chatFilters.person === user.id ? 'selected' : ''}>${escapeHtml(user.name)}</option>`).join('')}</select></div><div class="chat-section-label">Conversations</div><div class="chat-conversation-list">${conversations.map(renderChatConversationItem).join('') || '<p class="empty-state">Chat is disabled in Settings.</p>'}</div><div class="chat-section-label">New direct message</div><div class="chat-contact-list">${available.map((user) => `<button class="chat-contact" data-chat-direct-user="${user.id}"><span class="chat-avatar">${escapeHtml(user.name.slice(0, 1))}</span><span><strong>${escapeHtml(user.name)}</strong><small>${escapeHtml(user.role)}</small></span></button>`).join('') || '<p class="empty-state">No permitted contacts match.</p>'}</div></aside><section class="chat-thread card">${active ? `<header class="chat-thread-header"><button class="btn btn-outline btn-small chat-back" data-chat-back>← Back</button><div><h3>${escapeHtml(conversationLabel(active))}</h3><span>${active.type === 'general' ? 'All active users' : 'Private direct message'}</span></div><button class="btn btn-outline btn-small" data-chat-mark-read>Mark as read</button></header><div class="chat-message-list">${messages.map((message) => `<article class="chat-message ${message.senderUserId === currentUser().id ? 'sent' : 'received'}"><div class="chat-bubble"><div class="chat-message-meta"><strong>${escapeHtml(message.senderName)}</strong><span class="badge blue">${escapeHtml(message.senderRole)}</span></div><p>${escapeHtml(message.messageText)}</p><time>${new Date(message.createdAt).toLocaleString()}</time></div></article>`).join('') || '<p class="empty-state">No messages yet. Start the conversation.</p>'}</div><form class="chat-composer" data-chat-form><button class="btn btn-outline" type="button" title="Attachment placeholder">＋ Photo / File</button><input name="messageText" autocomplete="off" placeholder="Write a message…" required><button class="btn btn-primary" type="submit">Send</button></form>` : '<div class="empty-state">Choose a conversation.</div>'}</section></div></div>`;
}

function updateUserField(userId, field, value) { const user = store.users.find((item) => item.id === userId); if (!user) return; user[field] = value; saveStore(); renderLoginUsers(); toast('User updated.'); }
function toggleUserActive(userId) { const user = store.users.find((item) => item.id === userId); if (!user || user.id === currentUser().id) return toast('The signed-in user cannot be deactivated.'); user.active = user.active === false; saveStore(); renderLoginUsers(); renderRoute('settings'); }
function saveDemoPin(event) { event.preventDefault(); const form = event.target; updateUserField(form.dataset.demoPinForm, 'demoPin', String(new FormData(form).get('demoPin') || '')); }
function createLinkedUsers() { store.users = migrateUsers(store.users, store.crew, store.vessels); saveStore(); renderLoginUsers(); renderRoute('settings'); toast('Crew and owner user links are up to date.'); }
function updateChatPreference(key, value) { store.chatPreferences[key] = value; saveStore(); renderNav(); renderRoute('settings'); }

function renderUserSettings() {
  const owners = [...new Set(store.vessels.map((vessel) => vessel.owner).filter(Boolean))];
  return `<div class="legacy-tool settings-span"><div class="card-header"><h3>Users</h3><button class="btn btn-outline btn-small" data-create-linked-users>Sync Crew & Owners</button></div><div class="responsive-table-wrap"><table><thead><tr><th>User</th><th>Role</th><th>Active</th><th>Linked crew</th><th>Linked owner</th><th>Demo PIN</th><th>Last login</th></tr></thead><tbody>${store.users.map((user) => `<tr><td><strong>${escapeHtml(user.name)}</strong><br><small>${escapeHtml(user.email || user.phone || user.id)}</small></td><td><select data-user-role="${user.id}">${['Admin','Owner','Captain','Mate','Bookkeeper'].map((role) => `<option ${user.role === role ? 'selected' : ''}>${role}</option>`).join('')}</select></td><td><button class="btn btn-small ${user.active === false ? 'btn-danger' : 'btn-outline'}" data-user-active-toggle="${user.id}">${user.active === false ? 'Inactive' : 'Active'}</button></td><td><select data-user-link-crew="${user.id}"><option value="">Not linked</option>${store.crew.map((crew) => `<option value="${crew.id}" ${user.linkedCrewProfileId === crew.id ? 'selected' : ''}>${escapeHtml(crew.name)}</option>`).join('')}</select></td><td><select data-user-link-owner="${user.id}"><option value="">Not linked</option>${owners.map((owner) => `<option ${user.linkedVesselOwnerProfileId === owner ? 'selected' : ''}>${escapeHtml(owner)}</option>`).join('')}</select></td><td><form data-demo-pin-form="${user.id}"><input name="demoPin" value="${escapeHtml(user.demoPin || '')}" placeholder="Demo PIN"><button class="btn btn-outline btn-small">Save</button></form></td><td>${user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}</td></tr>`).join('')}</tbody></table></div></div>`;
}

function renderRoleSettings() { return `<div class="legacy-tool"><h3>Roles</h3><div class="stat-list">${['Admin — all users and participating chats','Owner — admin and assigned vessel crews','Captain — admin, assigned mates, permitted owners','Mate — admin and assigned captains','Bookkeeper — general chat and admin direct messages'].map((text) => `<div class="stat-row"><span>${escapeHtml(text)}</span></div>`).join('')}</div></div>`; }
function renderChatPreferences() { const p = store.chatPreferences; return `<div class="legacy-tool"><h3>Chat Preferences</h3><div class="settings-toggle-list">${[['generalEnabled','Enable general chat'],['directEnabled','Enable direct messages'],['showUnreadBadges','Show unread chat badges']].map(([key,label]) => `<label><input type="checkbox" data-chat-preference="${key}" ${p[key] ? 'checked' : ''}> ${label}</label>`).join('')}</div></div>`; }

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
  const lines = map[route] || ['Operational module ready.'];
  const extra = route === 'settings' ? settingsMarkup() : '';
  document.getElementById(`page-${route}`).innerHTML = `<div class="page-stack">${extra || `<div class="card card-pad"><ul class="placeholder-list">${lines.map((line) => `<li>${line}</li>`).join('')}</ul>${legacyShortcut(route)}</div>`}</div>`;
}
function legacyShortcut(route) {
  return '';
}


function renderLegacyAuditSummary() {
  return Object.entries(legacyFeatureAudit).map(([file, audit]) => `<details class="legacy-tool"><summary><strong>${escapeHtml(file)}</strong> · ${audit.sections.length} sections · ${audit.fields.length} fields/checks</summary><div class="placeholder-list"><p><strong>Sections:</strong> ${escapeHtml(audit.sections.join(', '))}</p><p><strong>Fields / checklist items:</strong> ${escapeHtml(audit.fields.join(', '))}</p><p><strong>Calculations:</strong> ${escapeHtml(audit.calculations.join(', '))}</p><p><strong>Alerts:</strong> ${escapeHtml(audit.alerts.join(', '))}</p><p><strong>Exports / workflows:</strong> ${escapeHtml(audit.exports.join(', '))}</p></div></details>`).join('');
}

function appInstallMode() {
  return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone ? 'Installed' : 'Browser';
}

async function promptAppInstall() {
  const button = document.getElementById('installBtn');
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice.catch(() => null);
    deferredInstallPrompt = null;
    if (button) button.hidden = true;
    toast('Install prompt closed.');
    return;
  }
  if (appInstallMode() === 'Installed') return toast('The app is already installed on this device.');
  toast('Use your browser menu and choose Install app or Add to Home screen.');
}

function appDownloadSettingsMarkup() {
  const swReady = 'serviceWorker' in navigator;
  return `<section class="legacy-tool settings-span app-download-card"><div class="settings-card-head"><div><p class="eyebrow">Download / install</p><h3>Install Reel Adventure Tours</h3><p>Use this app from the browser, install it to the home screen, and keep a JSON backup of local operations data.</p></div><span class="badge ${appInstallMode() === 'Installed' ? 'green' : 'blue'}">${appInstallMode()}</span></div><div class="integration-readiness-grid"><span><small>Release</small><strong>${escapeHtml(APP_RELEASE_LABEL)}</strong></span><span><small>Offline shell</small><strong>${swReady ? 'Available' : 'Browser unsupported'}</strong></span><span><small>Local records</small><strong>${store.trips.length + store.bookings.length + store.invoices.length}</strong></span></div><div class="legacy-actions"><button class="btn btn-primary" data-install-app>Install App</button><button class="btn btn-outline" data-download-backup>Download Backup JSON</button><label class="btn btn-outline" for="importStoreFile">Import Backup<input id="importStoreFile" data-import-store type="file" accept="application/json" hidden></label></div><p class="notice success">For phones: open the live Render URL in Chrome or Safari, then choose Install App / Add to Home Screen from the browser menu if the prompt does not appear automatically.</p></section>`;
}

function integrationBadge(value) { return value ? '<span class="badge green">Configured</span>' : '<span class="badge gold">Needs credentials</span>'; }

function integrationReadinessMarkup() {
  const status = store.integrationStatus || {};
  const gmailLive = Boolean(status.gmailConfigured);
  const whatsappLive = Boolean(status.whatsappConfigured);
  return `<section class="legacy-tool settings-span integration-status-card"><div class="settings-card-head"><div><p class="eyebrow">External sync readiness</p><h3>WhatsApp & Gmail Sync</h3><p>The app can run safely in manual mode now. Live Gmail sync and WhatsApp Business sending turn on only after credentials are configured in the backend environment.</p></div><button class="btn btn-outline btn-small" data-refresh-integration-status>Check Status</button></div><div class="integration-readiness-grid"><span><small>Backend</small><strong>${status.backendOnline ? 'Online' : 'Not checked'}</strong></span><span><small>Gmail OAuth</small><strong>${gmailLive ? 'Ready' : 'Manual import'}</strong>${integrationBadge(gmailLive)}</span><span><small>WhatsApp Business</small><strong>${whatsappLive ? 'Ready' : 'Manual send links'}</strong>${integrationBadge(whatsappLive)}</span><span><small>Last checked</small><strong>${escapeHtml(status.checkedAt ? new Date(status.checkedAt).toLocaleString() : 'Never')}</strong></span></div><div class="integration-checklist"><div><strong>Gmail needs</strong><p>Google OAuth client ID/secret, Gmail API enabled, redirect URI, token storage, and labels/rules for reviewed imports.</p></div><div><strong>WhatsApp needs</strong><p>Meta WhatsApp Business access token, phone number ID, business account ID, webhook verify token, and approved templates for automated sends.</p></div></div></section>`;
}

async function refreshIntegrationStatus(options = {}) {
  try {
    const response = await fetch('api/integrations/status', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Status check returned ${response.status}`);
    const payload = await response.json();
    store.integrationStatus = { checkedAt: payload.updatedAt || new Date().toISOString(), backendOnline: true, gmailConfigured: Boolean(payload.gmail?.configured), whatsappConfigured: Boolean(payload.whatsapp?.configured), release: payload.release || '' };
    store.gmailOAuthStatus = store.integrationStatus.gmailConfigured ? 'Credentials Configured' : 'Not Connected';
    store.whatsappSettings.businessApiStatus = store.integrationStatus.whatsappConfigured ? 'Credentials Configured' : 'Manual Mode';
    store.whatsappSettings.lastStatusCheckAt = store.integrationStatus.checkedAt;
    saveStore();
    if (currentRoute === 'settings') renderRoute('settings');
    if (!options.silent) toast('Integration status checked.');
  } catch (error) {
    store.integrationStatus = { ...(store.integrationStatus || {}), checkedAt: new Date().toISOString(), backendOnline: false };
    saveStore();
    if (!options.silent) toast('Integration status unavailable. Manual mode remains active.');
  }
}

function settingsMarkup() {
  return `<div class="grid settings-grid" style="margin-top:18px">${appDownloadSettingsMarkup()}${integrationReadinessMarkup()}${gmailImportSettingsMarkup()}${renderUserSettings()}${renderRoleSettings()}${renderChatPreferences()}<div class="legacy-tool dashboard-preferences-settings"><h3>Dashboard Preferences</h3>${renderDashboardCustomizer()}</div><div class="legacy-tool"><h3>Seed data</h3><p>${store.vessels.length} vessels, ${store.crew.length} crew members, and ${store.users.length} users loaded.</p></div><div class="legacy-tool"><h3>Local data</h3><div class="legacy-actions"><button class="btn btn-outline" data-export-store>Export JSON</button><label class="btn btn-outline" for="importStoreFileSettings">Import JSON<input id="importStoreFileSettings" data-import-store type="file" accept="application/json" hidden></label><button class="btn btn-danger" data-reset-store>Reset seed data</button></div></div><div class="legacy-tool archived-legacy-tools"><h3>Archived Legacy Tools</h3><p>Legacy tools are retained for reference only. Active operations should be completed through the main application tabs.</p><div class="legacy-list">${legacyTools.map((tool) => `<div class="legacy-tool"><h3>${tool.title}</h3><p>${tool.desc}</p><div class="legacy-actions"><a class="btn btn-outline btn-small" href="${tool.file}" target="_blank" rel="noopener">Open reference</a></div></div>`).join('')}</div></div></div>`;
}

function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}

document.addEventListener('DOMContentLoaded', init);

// Phase 6F: maintenance is intentionally limited to company vessels I and II.
function isMaintenanceVessel(name) { return MAINTENANCE_VESSELS.includes(name); }
function canEditMaintenance() { return ['Admin', 'Owner'].includes(activeRoleName()); }
function defaultMaintenanceRecord(vessel) {
  return { vessel, status: 'Needs Review', engineHours: 0, lastOilChangeDate: '', nextOilChangeDue: '', lowerUnitServiceDate: '', nextLowerUnitServiceDue: '', batteryStatus: 'Needs Review', safetyEquipmentExpiration: '', fireExtinguisherExpiration: '', lifeJacketCount: 0, registrationExpiration: '', insuranceExpiration: '', lastInspectionDate: '', nextInspectionDue: '', maintenanceNotes: '' };
}
function normalizeMaintenanceRecords(records = []) {
  const valid = Array.isArray(records) ? records.filter((record) => isMaintenanceVessel(record.vessel)) : [];
  return MAINTENANCE_VESSELS.map((vessel) => ({ ...defaultMaintenanceRecord(vessel), ...(valid.find((record) => record.vessel === vessel) || {}) }));
}
function maintenanceRecordForVessel(vessel) { return isMaintenanceVessel(vessel) ? store.maintenanceRecords.find((record) => record.vessel === vessel) : null; }
function maintenanceStatusForVessel(vessel) { return maintenanceRecordForVessel(vessel)?.status || ''; }
function maintenanceStatusColor(status) { return status === 'Good' ? 'green' : ['Overdue', 'Out of Service'].includes(status) ? 'red' : 'gold'; }
function maintenanceDateItems(record) {
  return [['Next oil change', record.nextOilChangeDue], ['Next lower unit service', record.nextLowerUnitServiceDue], ['Safety equipment', record.safetyEquipmentExpiration], ['Fire extinguisher', record.fireExtinguisherExpiration], ['Registration', record.registrationExpiration], ['Insurance', record.insuranceExpiration], ['Next inspection', record.nextInspectionDue]];
}
function maintenanceDateState(date) {
  if (!date) return 'Needs Review';
  const days = Math.ceil((new Date(`${date}T00:00:00`) - new Date()) / 86400000);
  return days < 0 ? 'Overdue' : days <= 30 ? 'Due Soon' : 'Good';
}
function maintenanceAlerts(record) { return maintenanceDateItems(record).filter(([, date]) => maintenanceDateState(date) !== 'Good'); }
function lastServiceForVessel(vessel) { return [...store.serviceRecords].filter((record) => record.vessel === vessel).sort((a,b) => String(b.date).localeCompare(String(a.date)))[0]; }
function maintenanceWarning(trip) {
  if (!isMaintenanceVessel(trip.vessel)) return '';
  const status = maintenanceStatusForVessel(trip.vessel);
  if (!['Out of Service', 'Overdue', 'Needs Review'].includes(status)) return '';
  return `<div class="maintenance-warning ${maintenanceStatusColor(status)}"><strong>🛠️ ${escapeHtml(trip.vessel)}: ${escapeHtml(status)}</strong><span>Maintenance review required before dispatch.${status === 'Out of Service' ? ' Assignment is blocked.' : ''}</span></div>`;
}
function maintenanceChecklistWarnings() {
  return store.trips.filter((trip) => isMaintenanceVessel(trip.vessel) && ['Out of Service','Overdue','Needs Review'].includes(maintenanceStatusForVessel(trip.vessel))).slice(0,4).map(maintenanceWarning).join('');
}
function maintenanceField(name, label, type, value, disabled = false) {
  if (type === 'textarea') return `<div class="field field-wide"><label>${label}</label><textarea name="${name}" ${disabled ? 'disabled' : ''}>${escapeHtml(value || '')}</textarea></div>`;
  if (type === 'status') return `<div class="field"><label>${label}</label><select name="${name}" ${disabled ? 'disabled' : ''}>${MAINTENANCE_STATUSES.map((option) => `<option ${option === value ? 'selected' : ''}>${option}</option>`).join('')}</select></div>`;
  return `<div class="field"><label>${label}</label><input name="${name}" type="${type}" value="${escapeHtml(value || '')}" ${disabled ? 'disabled' : ''}></div>`;
}
function renderMaintenance() {
  const page = document.getElementById('page-maintenance');
  const editable = canEditMaintenance();
  if (!editable) {
    const role = activeRoleName(); const person = activeRolePerson(role);
    const assigned = store.trips.filter((trip) => isMaintenanceVessel(trip.vessel) && ((role === 'Captain' && trip.captain === person) || (role === 'Mate' && trip.mate === person)));
    page.innerHTML = `<div class="page-stack"><div class="card card-pad"><p class="eyebrow">Warning-only access</p><h3>${escapeHtml(role)} maintenance visibility</h3><p>Captains and mates can only view maintenance warnings for their assigned trips involving Reel Adventure Tours I or II. Maintenance details and service records require Admin / Owner access.</p></div><div class="role-trip-list">${assigned.length ? assigned.map((trip) => `<article class="card role-trip-card"><strong>${escapeHtml(formatDate(trip.tripDate))} · ${escapeHtml(trip.customer || 'Trip')}</strong><p>${escapeHtml(trip.vessel)}</p>${maintenanceWarning(trip) || '<span class="badge green">No maintenance warning</span>'}</article>`).join('') : '<div class="card card-pad empty-state">No assigned tracked-vessel trips.</div>'}</div></div>`;
    return;
  }
  const cards = store.maintenanceRecords.map((record) => {
    const alerts = maintenanceAlerts(record); const last = lastServiceForVessel(record.vessel);
    return `<details class="card maintenance-vessel-card app-accordion" open><summary><div><h3>${escapeHtml(record.vessel)}</h3><p>Engine hours: ${escapeHtml(record.engineHours)} · Last service: ${escapeHtml(last?.date ? formatDate(last.date) : 'No service record')}</p></div><span class="badge status-badge-large ${maintenanceStatusColor(record.status)}">${escapeHtml(record.status)}</span></summary><div class="maintenance-overview"><div><small>Upcoming Service</small><strong>${escapeHtml(maintenanceDateItems(record).filter(([,date]) => date).sort((a,b)=>a[1].localeCompare(b[1]))[0]?.[0] || 'Needs review')}</strong></div><div><small>Overdue Items</small><strong>${alerts.filter(([,date]) => maintenanceDateState(date) === 'Overdue').length}</strong></div><div><small>Safety Alerts</small><strong>${[['Safety equipment',record.safetyEquipmentExpiration],['Fire extinguisher',record.fireExtinguisherExpiration]].filter(([,date]) => maintenanceDateState(date) !== 'Good').length}</strong></div><div><small>Next Service Due</small><strong>${escapeHtml(record.nextOilChangeDue ? formatDate(record.nextOilChangeDue) : 'Not set')}</strong></div></div>${alerts.length ? `<div class="maintenance-alert-list">${alerts.map(([label,date]) => `<span class="badge ${maintenanceStatusColor(maintenanceDateState(date))}">${escapeHtml(label)}: ${escapeHtml(date ? `${maintenanceDateState(date)} · ${formatDate(date)}` : 'Needs Review')}</span>`).join('')}</div>` : '<p class="maintenance-good">All dated maintenance items are current.</p>'}<form class="maintenance-form" onsubmit="saveMaintenanceRecord(event,'${escapeHtml(record.vessel)}')"><div class="form-grid">${maintenanceField('status','Current Status','status',record.status,!editable)}${maintenanceField('engineHours','Engine Hours','number',record.engineHours,!editable)}${maintenanceField('lastOilChangeDate','Last Oil Change Date','date',record.lastOilChangeDate,!editable)}${maintenanceField('nextOilChangeDue','Next Oil Change Due','date',record.nextOilChangeDue,!editable)}${maintenanceField('lowerUnitServiceDate','Lower Unit Service Date','date',record.lowerUnitServiceDate,!editable)}${maintenanceField('nextLowerUnitServiceDue','Next Lower Unit Service Due','date',record.nextLowerUnitServiceDue,!editable)}${maintenanceField('batteryStatus','Battery Status','text',record.batteryStatus,!editable)}${maintenanceField('safetyEquipmentExpiration','Safety Equipment Expiration','date',record.safetyEquipmentExpiration,!editable)}${maintenanceField('fireExtinguisherExpiration','Fire Extinguisher Expiration','date',record.fireExtinguisherExpiration,!editable)}${maintenanceField('lifeJacketCount','Life Jacket Count','number',record.lifeJacketCount,!editable)}${maintenanceField('registrationExpiration','Registration Expiration','date',record.registrationExpiration,!editable)}${maintenanceField('insuranceExpiration','Insurance Expiration','date',record.insuranceExpiration,!editable)}${maintenanceField('lastInspectionDate','Last Inspection Date','date',record.lastInspectionDate,!editable)}${maintenanceField('nextInspectionDue','Next Inspection Due','date',record.nextInspectionDue,!editable)}${maintenanceField('maintenanceNotes','Maintenance Notes','textarea',record.maintenanceNotes,!editable)}</div>${editable ? '<button class="btn btn-primary">Save Maintenance</button>' : '<p class="muted-text">Captain / Mate access is warning-only for assigned trips. Maintenance details are read-only.</p>'}</form></details>`;
  }).join('');
  const services = store.serviceRecords.filter((record) => isMaintenanceVessel(record.vessel)).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  page.innerHTML = `<div class="page-stack maintenance-page"><div class="card card-pad"><p class="eyebrow">Limited Vessel Scope</p><h3>Maintenance Dashboard</h3><p>Tracking applies only to Reel Adventure Tours I and Reel Adventure Tours II. All other vessels remain available in the Vessels module without maintenance requirements.</p></div><div class="maintenance-card-grid">${cards}</div>${editable ? renderServiceRecordForm() : ''}<div class="card table-card"><div class="card-header"><h3>Service History</h3><span class="badge blue">Tracked vessels only</span></div><div class="responsive-table-wrap"><table><thead><tr><th>Date</th><th>Vessel</th><th>Service Type</th><th>Hours</th><th>Performed By</th><th>Cost</th><th>Photos / Receipts</th><th>Notes</th></tr></thead><tbody>${services.length ? services.map((r)=>`<tr><td>${escapeHtml(formatDate(r.date))}</td><td>${escapeHtml(r.vessel)}</td><td>${escapeHtml(r.serviceType)}</td><td>${escapeHtml(r.engineHours)}</td><td>${escapeHtml(r.performedBy)}</td><td>${money(r.cost)}</td><td>${escapeHtml((r.attachments || []).join(', ') || '—')}</td><td>${escapeHtml(r.notes || '—')}</td></tr>`).join('') : '<tr><td colspan="8" class="empty-state">No service records yet.</td></tr>'}</tbody></table></div></div>${renderPhotoNotePanel('maintenance')}</div>`;
}
function renderServiceRecordForm() { return `<details class="card service-record-card app-accordion" open><summary><div><h3>Add Service Record</h3><p>Records can only be created for the two tracked company vessels.</p></div><span class="chevron">⌄</span></summary><form onsubmit="saveServiceRecord(event)"><div class="form-grid"><div class="field"><label>Vessel</label><select name="vessel">${MAINTENANCE_VESSELS.map(v=>`<option>${v}</option>`).join('')}</select></div>${maintenanceField('serviceType','Service Type','text','')}${maintenanceField('date','Date','date','')}${maintenanceField('engineHours','Engine Hours','number','')}${maintenanceField('performedBy','Performed By','text','')}${maintenanceField('cost','Cost','number','')}${maintenanceField('notes','Notes','textarea','')}<div class="field field-wide"><label>Photos / Receipts</label><input name="attachments" type="file" accept="image/*,.pdf" multiple></div></div><button class="btn btn-primary">Add Service Record</button></form></details>`; }
function saveMaintenanceRecord(event, vessel) {
  event.preventDefault(); if (!canEditMaintenance() || !isMaintenanceVessel(vessel)) return toast('Maintenance editing is limited to Admin / Owner and tracked vessels.');
  const data = Object.fromEntries(new FormData(event.currentTarget).entries()); data.engineHours = Number(data.engineHours || 0); data.lifeJacketCount = Number(data.lifeJacketCount || 0);
  store.maintenanceRecords = store.maintenanceRecords.map((record) => record.vessel === vessel ? { ...record, ...data, vessel } : record); addAudit('updated','Maintenance',`${vessel} maintenance updated.`,{vessel}); generateMaintenanceNotifications(); saveStore(); renderMaintenance(); toast('Maintenance saved.');
}
function saveServiceRecord(event) {
  event.preventDefault(); if (!canEditMaintenance()) return toast('Service records require Admin / Owner access.');
  const form = event.currentTarget; const data = Object.fromEntries(new FormData(form).entries()); if (!isMaintenanceVessel(data.vessel)) return toast('Service records are limited to Reel Adventure Tours I and II.');
  data.id = makeId('service'); data.engineHours = Number(data.engineHours || 0); data.cost = Number(data.cost || 0); data.attachments = [...form.elements.attachments.files].map(file => file.name); store.serviceRecords.unshift(data); addAudit('created','Maintenance',`${data.serviceType || 'Service'} recorded for ${data.vessel}.`,{vessel:data.vessel,serviceRecordId:data.id}); saveStore(); renderMaintenance(); toast('Service record added.');
}
function generateMaintenanceNotifications() {
  store.maintenanceRecords.forEach((record) => {
    const datedAlerts = maintenanceAlerts(record).filter(([, date]) => date).map(([label,date]) => ({ key:`${label}-${date}`, title:`${label} ${maintenanceDateState(date).toLowerCase()}`, message:`${record.vessel}: ${label} is ${maintenanceDateState(date).toLowerCase()}.`, level:maintenanceDateState(date)==='Overdue'?'critical':'warning' }));
    const statusAlert = record.status === 'Out of Service' ? {key:'out-of-service',title:'Vessel marked out of service',message:`${record.vessel} is marked Out of Service.`,level:'critical'} : record.status === 'Overdue' ? {key:'maintenance-overdue',title:'Maintenance overdue',message:`${record.vessel} maintenance is overdue.`,level:'critical'} : record.status === 'Due Soon' ? {key:'maintenance-due-soon',title:'Maintenance due soon',message:`${record.vessel} maintenance is due soon.`,level:'warning'} : null;
    const candidates = [...datedAlerts, ...(statusAlert ? [statusAlert] : [])];
    candidates.forEach((item) => { const key=`maintenance-${record.vessel}-${item.key}`; if (!(store.notifications || []).some(n=>n.metadata?.maintenanceKey===key)) addNotification(item.title,item.message,item.level,{category:'Maintenance',vessel:record.vessel,maintenanceKey:key},'Admin','','Maintenance'); });
  });
}

/* Phase 6H: centralized Damage and Incident Library */
const INCIDENT_CATEGORIES = ['Vessel Damage', 'Customer Injury', 'Crew Injury', 'Guest Complaint', 'Mechanical Issue', 'Weather Event', 'Late Departure', 'Missed Departure', 'Fuel Issue', 'Safety Issue', 'Property Damage', 'Refund Issued', 'Other'];
const INCIDENT_SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];
const INCIDENT_STATUSES = ['Open', 'Under Review', 'Resolved', 'Closed'];
let incidentFilters = { search: '', customer: '', vessel: '', captain: '', mate: '', category: '', severity: '', status: '', from: '', to: '' };
let editingIncidentId = '';
let pendingIncidentMedia = [];

function normalizeIncidentRecord(record = {}) {
  return { incidentNumber: '', date: '', time: '', tripId: '', customer: '', vessel: '', captain: '', mate: '', location: '', category: 'Other', severity: 'Low', description: '', immediateAction: '', followUpRequired: '', status: 'Open', createdBy: '', financialImpact: '', media: [], createdAt: '', updatedAt: '', ...record, immediateAction: record.immediateAction || record.actionsTaken || '', status: record.status === 'Needs Review' ? 'Under Review' : (record.status || 'Open'), createdBy: record.createdBy || record.reportedBy || '', media: Array.isArray(record.media) ? record.media : [] };
}
function nextIncidentNumber() {
  const year = new Date().getFullYear();
  const max = (store.incidentReports || []).reduce((value, incident) => Math.max(value, Number(String(incident.incidentNumber || '').match(/(\d+)$/)?.[1] || 0)), 0);
  return `INC-${year}-${String(max + 1).padStart(4, '0')}`;
}
function severityColor(severity) { return { Low: 'green', Medium: 'gold', High: 'orange', Critical: 'red' }[severity] || 'gray'; }
function incidentSeverityBadge(severity) { return `<span class="badge status-badge-large ${severityColor(severity)}">${escapeHtml(severity || 'Low')}</span>`; }
function incidentStatusBadge(status) { return `<span class="badge status-badge-large ${status === 'Closed' || status === 'Resolved' ? 'green' : status === 'Under Review' ? 'gold' : 'red'}">${escapeHtml(status || 'Open')}</span>`; }
function incidentTrip(incident) { return store.trips.find((trip) => trip.id === String(incident.tripId || '').split('|')[0]); }
function incidentTripLabel(incident) { const trip = incidentTrip(incident); return trip ? `${formatDate(trip.tripDate)} · ${trip.customer || 'Trip'}` : '—'; }
function incidentHasFinancialImpact(incident) { return Boolean(String(incident.financialImpact || '').trim()) || incident.category === 'Refund Issued'; }
function visibleIncidentRecords() {
  const role = activeRoleName(); const person = activeRolePerson(role);
  return (store.incidentReports || []).map(normalizeIncidentRecord).filter((incident) => {
    if (role === 'Admin') return true;
    if (role === 'Bookkeeper') return incidentHasFinancialImpact(incident);
    if (role === 'Owner') return ownerForVesselName(incident.vessel) === person;
    if (role === 'Captain') return incident.captain === person;
    if (role === 'Mate') return incident.mate === person;
    return false;
  });
}
function filteredIncidents() {
  return visibleIncidentRecords().filter((incident) => {
    const haystack = [incident.incidentNumber, incident.customer, incident.vessel, incident.captain, incident.mate, incident.category, incident.severity, incident.status, incident.description].join(' ').toLowerCase();
    return (!incidentFilters.search || haystack.includes(incidentFilters.search.toLowerCase())) && ['customer','vessel','captain','mate','category','severity','status'].every((key) => !incidentFilters[key] || incident[key] === incidentFilters[key]) && (!incidentFilters.from || incident.date >= incidentFilters.from) && (!incidentFilters.to || incident.date <= incidentFilters.to);
  }).sort((a,b) => String(b.date + b.time).localeCompare(String(a.date + a.time)));
}
function canManageIncidents() { return activeRoleName() === 'Admin'; }
function optionList(values, selected = '') { return values.map((value) => `<option value="${escapeHtml(value)}" ${value === selected ? 'selected' : ''}>${escapeHtml(value)}</option>`).join(''); }
function incidentFilterField(key, label, values) { return `<label>${label}<select onchange="setIncidentFilter('${key}',this.value)"><option value="">All</option>${optionList(values, incidentFilters[key])}</select></label>`; }
function setIncidentFilter(key, value) { incidentFilters[key] = value; renderIncidentLibrary(); }
function resetIncidentFilters() { incidentFilters = { search: '', customer: '', vessel: '', captain: '', mate: '', category: '', severity: '', status: '', from: '', to: '' }; renderIncidentLibrary(); }
function renderIncidentLibrary() {
  const page = document.getElementById('page-incident-reports'); const incidents = filteredIncidents(); const canManage = canManageIncidents();
  page.innerHTML = `<div class="page-stack incident-library"><div class="incident-hero card card-pad"><div><p class="eyebrow">Permanent searchable history</p><h3>Incident Directory</h3><p>Incidents, damage, customer and crew issues, injuries, weather, refunds, and operational events.</p></div>${canManage ? '<button class="btn btn-primary" onclick="openIncidentForm()">Create Incident Record</button>' : `<span class="badge blue">${escapeHtml(activeRoleName())} scoped view</span>`}</div>${renderIncidentDashboardSummary()}<details class="card incident-filter-card app-accordion" open><summary><h3>Search and Filters</h3><span class="chevron">⌄</span></summary><div class="incident-filter-grid"><label>Incident Number / keyword<input type="search" value="${escapeHtml(incidentFilters.search)}" oninput="setIncidentFilter('search',this.value)" placeholder="Search incident number, customer, vessel…"></label>${incidentFilterField('customer','Customer',[...new Set(visibleIncidentRecords().map(i=>i.customer).filter(Boolean))])}${incidentFilterField('vessel','Vessel',getOptions('vessels'))}${incidentFilterField('captain','Captain',getOptions('crew'))}${incidentFilterField('mate','Mate',getOptions('crew'))}${incidentFilterField('category','Category',INCIDENT_CATEGORIES)}${incidentFilterField('severity','Severity',INCIDENT_SEVERITIES)}${incidentFilterField('status','Status',INCIDENT_STATUSES)}<label>From<input type="date" value="${incidentFilters.from}" onchange="setIncidentFilter('from',this.value)"></label><label>To<input type="date" value="${incidentFilters.to}" onchange="setIncidentFilter('to',this.value)"></label><button class="btn btn-outline" onclick="resetIncidentFilters()">Clear Filters</button></div></details><div data-incident-form></div><div class="incident-card-grid">${incidents.length ? incidents.map(renderIncidentCard).join('') : '<div class="card card-pad empty-state">No incidents match the current role visibility and filters.</div>'}</div>${renderIncidentReportsSection()}</div>`;
  if (editingIncidentId || pendingIncidentMedia.length) openIncidentForm(editingIncidentId, false);
}
function renderIncidentCard(incident) {
  return `<details class="card incident-card app-accordion"><summary><div><span class="incident-number">${escapeHtml(incident.incidentNumber)}</span><h3>${escapeHtml(incident.category)}</h3><p>${escapeHtml(formatDate(incident.date))} ${escapeHtml(formatTime(incident.time))} · ${escapeHtml(incident.vessel || incident.customer || 'Operations')}</p></div><div class="incident-badge-stack">${incidentSeverityBadge(incident.severity)}${incidentStatusBadge(incident.status)}</div></summary><div class="incident-card-body"><div class="incident-detail-grid"><span><small>Trip</small><strong>${escapeHtml(incidentTripLabel(incident))}</strong></span><span><small>Customer</small><strong>${escapeHtml(incident.customer || '—')}</strong></span><span><small>Captain</small><strong>${escapeHtml(incident.captain || '—')}</strong></span><span><small>Mate</small><strong>${escapeHtml(incident.mate || '—')}</strong></span><span><small>Location</small><strong>${escapeHtml(incident.location || '—')}</strong></span><span><small>Created By</small><strong>${escapeHtml(incident.createdBy || '—')}</strong></span></div><div class="incident-timeline"><div><b>Description</b><p>${escapeHtml(incident.description || '—')}</p></div><div><b>Immediate Action Taken</b><p>${escapeHtml(incident.immediateAction || '—')}</p></div><div><b>Follow Up Action Required</b><p>${escapeHtml(incident.followUpRequired || 'None')}</p></div>${incident.financialImpact ? `<div><b>Financial Impact</b><p>${escapeHtml(incident.financialImpact)}</p></div>` : ''}</div>${renderIncidentMediaGallery(incident.media)}${canManageIncidents() ? `<div class="form-actions"><button class="btn btn-primary btn-small" onclick="openIncidentForm('${incident.id}')">Edit Incident</button><button class="btn btn-danger btn-small" onclick="deleteIncident('${incident.id}')">Delete Incident</button></div>` : ''}</div></details>`;
}
function openIncidentForm(id = '', scroll = true) {
  if (!canManageIncidents()) return toast('Only Admin can create or edit incident records.');
  editingIncidentId = id; const existing = id ? store.incidentReports.find((item) => item.id === id) : null; const incident = normalizeIncidentRecord(existing || { incidentNumber: nextIncidentNumber(), date: new Date().toISOString().slice(0,10), time: new Date().toTimeString().slice(0,5), createdBy: currentUserLabel(), status: 'Open' });
  pendingIncidentMedia = id && !pendingIncidentMedia.length ? [...incident.media] : pendingIncidentMedia;
  const host = document.querySelector('[data-incident-form]'); if (!host) return;
  host.innerHTML = `<form class="card incident-form" onsubmit="saveIncident(event)"><div class="card-header"><h3>${id ? 'Edit' : 'Create'} Incident Record</h3>${incidentSeverityBadge(incident.severity)}</div><div class="form-grid"><label>Incident Number<input name="incidentNumber" value="${escapeHtml(incident.incidentNumber)}" readonly></label><label>Date<input name="date" type="date" required value="${escapeHtml(incident.date)}"></label><label>Time<input name="time" type="time" required value="${escapeHtml(incident.time)}"></label><label>Trip<select name="tripId" onchange="populateIncidentTrip(this.value)"><option value="">Select Trip</option>${optionList(store.trips.map(t=>`${t.id}|${formatDate(t.tripDate)} ${t.customer || 'Trip'}`), incident.tripId)}</select></label><label>Customer<input name="customer" value="${escapeHtml(incident.customer)}"></label><label>Vessel<select name="vessel"><option value="">Select Vessel</option>${optionList(getOptions('vessels'),incident.vessel)}</select></label><label>Captain<select name="captain"><option value="">Select Captain</option>${optionList(getOptions('crew'),incident.captain)}</select></label><label>Mate<select name="mate"><option value="">Select Mate</option>${optionList(getOptions('crew'),incident.mate)}</select></label><label>Location<input name="location" value="${escapeHtml(incident.location)}"></label><label>Category<select name="category" required>${optionList(INCIDENT_CATEGORIES,incident.category)}</select></label><label>Severity<select name="severity" required>${optionList(INCIDENT_SEVERITIES,incident.severity)}</select></label><label>Status<select name="status" required>${optionList(INCIDENT_STATUSES,incident.status)}</select></label><label class="field-wide">Description<textarea name="description" required>${escapeHtml(incident.description)}</textarea></label><label class="field-wide">Immediate Action Taken<textarea name="immediateAction">${escapeHtml(incident.immediateAction)}</textarea></label><label class="field-wide">Follow Up Action Required<textarea name="followUpRequired">${escapeHtml(incident.followUpRequired)}</textarea></label><label class="field-wide">Financial Impact / Refund<textarea name="financialImpact" placeholder="Complete this for bookkeeper visibility">${escapeHtml(incident.financialImpact)}</textarea></label></div><details class="incident-media-editor app-accordion" open><summary><h3>Photo and Video Evidence</h3><span class="chevron">⌄</span></summary><div class="incident-media-actions"><label class="btn btn-outline">Take Photo<input data-incident-media type="file" accept="image/*" capture="environment" hidden></label><label class="btn btn-outline">Upload Photo<input data-incident-media type="file" accept="image/*" multiple hidden></label><label class="btn btn-outline">Upload Video<input data-incident-media type="file" accept="video/*" multiple hidden></label></div>${renderIncidentMediaGallery(pendingIncidentMedia,true)}</details><div class="form-actions sticky-save-controls"><button class="btn btn-primary" type="submit">Save Incident</button><button class="btn btn-outline" type="button" onclick="cancelIncidentForm()">Cancel</button></div></form>`;
  if (scroll) host.scrollIntoView({behavior:'smooth',block:'start'});
}
function populateIncidentTrip(value) { const trip = store.trips.find((item)=>item.id===String(value).split('|')[0]); const form=document.querySelector('.incident-form'); if (!trip||!form) return; ['customer','vessel','captain','mate'].forEach(key=>{form.elements[key].value=trip[key]||'';}); }
function attachIncidentMedia(files) { [...files].forEach((file) => { if (file.size > 8*1024*1024) return toast(`${file.name} is over the 8 MB evidence limit.`); const reader=new FileReader(); reader.onload=()=>{pendingIncidentMedia.push({id:makeId('evidence'),name:file.name,type:file.type,dataUrl:String(reader.result||''),createdAt:new Date().toISOString()}); openIncidentForm(editingIncidentId,false);}; reader.readAsDataURL(file); }); }
function renderIncidentMediaGallery(media=[],editable=false) { return `<div class="incident-media-gallery">${media.length ? media.map(item=>`<figure>${String(item.type).startsWith('video') ? `<video controls src="${escapeHtml(item.dataUrl)}"></video>` : `<img src="${escapeHtml(item.dataUrl)}" alt="${escapeHtml(item.name)}">`}<figcaption>${escapeHtml(item.name)}${editable?`<button class="btn btn-danger btn-small" type="button" onclick="removeIncidentMedia('${item.id}')">Delete Media</button>`:''}</figcaption></figure>`).join('') : '<p class="empty-state">No photo or video evidence attached.</p>'}</div>`; }
function removeIncidentMedia(id) { pendingIncidentMedia=pendingIncidentMedia.filter(item=>item.id!==id); openIncidentForm(editingIncidentId,false); }
function cancelIncidentForm() { editingIncidentId=''; pendingIncidentMedia=[]; renderIncidentLibrary(); }
function saveIncident(event) {
  event.preventDefault(); const data=Object.fromEntries(new FormData(event.currentTarget).entries()); const existing=editingIncidentId ? store.incidentReports.find(item=>item.id===editingIncidentId) : null; const previous=existing ? normalizeIncidentRecord({...existing,media:[...(existing.media||[])]}) : null; const now=new Date().toISOString(); const incident=normalizeIncidentRecord({...existing,...data,id:existing?.id||makeId('incident'),createdAt:existing?.createdAt||now,updatedAt:now,createdBy:existing?.createdBy||currentUserLabel(),media:pendingIncidentMedia});
  if (existing) Object.assign(existing,incident); else store.incidentReports.unshift(incident);
  notifyIncidentChange(incident,previous,existing ? 'updated' : 'created'); addAudit(existing?'updated':'created','Incident Library',`${incident.incidentNumber} ${existing?'updated':'created'}.`,{incidentId:incident.id}); editingIncidentId=''; pendingIncidentMedia=[]; saveStore(); renderIncidentLibrary(); toast(`Incident ${incident.incidentNumber} saved.`);
}
function notifyIncidentChange(incident, previous, action) {
  const events=[action==='created'?'Incident created':null,previous&&previous.severity!==incident.severity?'Severity changed':null,incident.status==='Closed'&&previous?.status!=='Closed'?'Incident closed':null,incident.followUpRequired?'Follow up required':null].filter(Boolean); const recipients=[['Admin',''],['Owner',ownerForVesselName(incident.vessel)],['Captain',incident.captain],['Mate',incident.mate]];
  events.forEach(title=>recipients.forEach(([role,name])=>addNotification(title,`${incident.incidentNumber}: ${incident.category} (${incident.severity})`,incident.severity==='Critical'?'critical':'warning',{category:'Incident',incidentId:incident.id,vessel:incident.vessel,tripId:String(incident.tripId).split('|')[0]},role,name,'Incident')));
}
function deleteIncident(id) { if(!canManageIncidents()||!confirm('Delete this incident record and its evidence?')) return; store.incidentReports=store.incidentReports.filter(item=>item.id!==id); saveStore(); renderIncidentLibrary(); toast('Incident deleted.'); }
function renderIncidentDashboardSummary() { const incidents=visibleIncidentRecords(); const month=new Date().toISOString().slice(0,7); return `<div class="grid kpi-grid incident-kpis">${kpi('Open Incidents',incidents.filter(i=>i.status==='Open').length,'Requires action')}${kpi('Critical Incidents',incidents.filter(i=>i.severity==='Critical'&&!['Resolved','Closed'].includes(i.status)).length,'Active critical')}${kpi('Incidents Under Review',incidents.filter(i=>i.status==='Under Review').length,'Review queue')}${kpi('Resolved This Month',incidents.filter(i=>i.status==='Resolved'&&String(i.updatedAt||i.date).slice(0,7)===month).length,'Monthly resolution')}</div>`; }
function incidentGroupRows(key) { const grouped=visibleIncidentRecords().reduce((acc,item)=>{const label=item[key]||'Unassigned';acc[label]=(acc[label]||0)+1;return acc;},{}); return Object.entries(grouped).sort((a,b)=>b[1]-a[1]).map(([label,count])=>`<div class="stat-row"><span>${escapeHtml(label)}</span><strong>${count}</strong></div>`).join('')||'<p class="empty-state">No incident data.</p>'; }
function renderIncidentReportsSection() { const monthly=visibleIncidentRecords().reduce((acc,item)=>{const key=String(item.date||'Unknown').slice(0,7);acc[key]=(acc[key]||0)+1;return acc;},{}); return `<details class="card incident-reports-section app-accordion" open><summary><h3>Incident Reports</h3><span class="chevron">⌄</span></summary><div class="grid dashboard-grid"><div><h4>Incidents by Vessel</h4>${incidentGroupRows('vessel')}</div><div><h4>Incidents by Captain</h4>${incidentGroupRows('captain')}</div><div><h4>Incidents by Mate</h4>${incidentGroupRows('mate')}</div><div><h4>Incidents by Category</h4>${incidentGroupRows('category')}</div><div><h4>Incidents by Severity</h4>${incidentGroupRows('severity')}</div><div><h4>Monthly Incident Trends</h4>${Object.entries(monthly).sort().map(([label,count])=>`<div class="stat-row"><span>${escapeHtml(label)}</span><strong>${count}</strong></div>`).join('')||'<p class="empty-state">No trend data.</p>'}</div></div></details>`; }
function renderEntityIncidentHistory(type) { const page=document.getElementById(type==='vessel'?'page-vessels':'page-crew'); const table=page?.querySelector('.table-card'); if(!table)return; const names=type==='vessel'?getOptions('vessels'):getOptions('crew'); const title=type==='vessel'?'Damage History':'Crew Incidents'; const html=`<details class="card entity-incident-history app-accordion" open><summary><h3>${title}</h3><span class="chevron">⌄</span></summary><div class="entity-history-filter"><input type="search" placeholder="Filter ${title.toLowerCase()} by vessel, crew, incident, severity, or status" oninput="filterEntityIncidentHistory(this.value)"></div><div class="entity-history-grid">${names.map(name=>{const matches=visibleIncidentRecords().filter(i=>type==='vessel'?i.vessel===name:i.captain===name||i.mate===name);return `<details class="entity-history-card"><summary><strong>${escapeHtml(name)}</strong><span class="badge ${matches.length?'gold':'green'}">${matches.length}</span></summary><div class="responsive-table-wrap"><table><thead><tr><th>Date</th><th>Incident Number</th>${type==='crew'?'<th>Trip</th><th>Category</th>':''}<th>Severity</th><th>Status</th><th>Description</th></tr></thead><tbody>${matches.length?matches.map(i=>`<tr><td>${escapeHtml(formatDate(i.date))}</td><td>${escapeHtml(i.incidentNumber)}</td>${type==='crew'?`<td>${escapeHtml(incidentTripLabel(i))}</td><td>${escapeHtml(i.category)}</td>`:''}<td>${incidentSeverityBadge(i.severity)}</td><td>${incidentStatusBadge(i.status)}</td><td>${escapeHtml(i.description)}</td></tr>`).join(''):`<tr><td colspan="7" class="empty-state">No ${title.toLowerCase()}.</td></tr>`}</tbody></table></div></details>`;}).join('')}</div></details>`; table.insertAdjacentHTML('afterend',html); }

function filterEntityIncidentHistory(value) { const query=String(value||'').toLowerCase(); document.querySelectorAll('.entity-history-card').forEach(card=>{card.hidden=query&&!card.textContent.toLowerCase().includes(query);}); }

function normalizeWhatsAppTemplates(templates) {
  const saved = Array.isArray(templates) ? templates : [];
  return DEFAULT_WHATSAPP_TEMPLATES.map((fallback) => ({ ...fallback, ...(saved.find((item) => item.category === fallback.category) || {}) }));
}
function whatsAppRoleCanCreate(category = '', trip = {}) {
  const role = activeRoleName();
  const crewCategory = ['Captain Assignment','Mate Assignment','Owner Assignment Alert','Pre Trip Checklist Reminder','Post Trip Checklist Reminder','Incident Alert','Owner Payout Statement'].includes(category);
  if (crewCategory && !store.whatsappSettings.enableCrewActions) return false;
  if (!crewCategory && !store.whatsappSettings.enableCustomerActions) return false;
  if (['Admin','Owner','Operations Manager'].includes(role)) return true;
  if (role === 'Bookkeeper') return ['Invoice / Payment Reminder','Quote Follow Up','Payment Receipt','Owner Payout Statement'].includes(category);
  const person = activeRolePerson(role);
  if (role === 'Captain') return store.whatsappSettings.enableCustomerActions && (!trip.id || trip.captain === person);
  if (role === 'Mate') return store.whatsappSettings.enableCustomerActions && (!trip.id || trip.mate === person);
  return false;
}
function whatsappDigits(phone = '') {
  let digits = String(phone).replace(/\D/g, '');
  const code = String(store.whatsappSettings?.defaultCountryCode || '1').replace(/\D/g, '');
  if (digits.length === 10 && code) digits = `${code}${digits}`;
  return digits.length >= 7 ? digits : '';
}
function whatsappTemplate(category) { return store.whatsappTemplates.find((item) => item.category === category) || DEFAULT_WHATSAPP_TEMPLATES[0]; }
function whatsappTrip(id = '') { return store.trips.find((trip) => trip.id === id) || {}; }
function whatsappInvoice(id = '') { return store.invoices.find((invoice) => invoice.id === id) || {}; }
function whatsappCrewPhone(name = '') { return store.crew.find((person) => person.name === name)?.phone || ''; }
function whatsappMeetingPoint(trip = {}) { return String(trip.notes || '').match(/(?:meeting point|pickup location):\s*([^\n]+)/i)?.[1] || 'Confirm meeting point'; }
function whatsappEndTime(trip = {}) { if (!trip.startTime || !trip.hours) return ''; const [h,m] = trip.startTime.split(':').map(Number); const end = new Date(2000,0,1,h,m); end.setMinutes(end.getMinutes() + Number(trip.hours) * 60); return end.toTimeString().slice(0,5); }
function whatsappValues(trip = {}, invoice = {}) {
  return {
    'Customer Name': trip.customer || invoice.customer || invoice.customerName || '', 'Trip Date': trip.tripDate ? formatDate(trip.tripDate) : '', 'Start Time': trip.startTime || '', 'End Time': whatsappEndTime(trip),
    'Tour Type': trip.tourType || invoice.tourType || '', 'Guest Count': trip.passengers || '', 'Vessel': trip.vessel || '', 'Captain': trip.captain || '', 'Mate': trip.mate || '', 'Meeting Point': whatsappMeetingPoint(trip),
    'Balance Due': money(trip.balanceDue ?? invoice.balanceDue ?? invoice.balance ?? 0), 'Deposit Paid': money(trip.depositPaid ?? invoice.depositPaid ?? 0), 'Payment Link': invoice.paymentLink || '[payment link]', 'Cruise Ship': trip.cruiseShip || '',
    'All Aboard Time': trip.allAboardTime || '', 'Weather Risk': trip.id ? weatherRiskLabel(tripWeatherRisk(trip)) : 'Review conditions', 'Checklist Link': '[checklist link]', 'Invoice Link': invoice.invoiceLink || '[invoice link]', 'Receipt Link': invoice.receiptLink || '[receipt link]'
  };
}
function renderWhatsAppTemplate(body, values) { return String(body || '').replace(/{{\s*([^}]+)\s*}}/g, (_, key) => values[key.trim()] ?? `{{${key.trim()}}}`); }
function whatsappContextDefaults(category = 'Customer Booking Confirmation', tripId = '', invoiceId = '') {
  const trip = whatsappTrip(tripId) || {}, invoice = whatsappInvoice(invoiceId) || {};
  let recipientRole = 'Customer', recipientName = trip.customer || invoice.customer || invoice.customerName || '', phone = trip.phone || invoice.phone || '';
  if (category === 'Captain Assignment') { recipientRole = 'Captain'; recipientName = trip.captain || ''; phone = whatsappCrewPhone(recipientName); }
  if (category === 'Mate Assignment') { recipientRole = 'Mate'; recipientName = trip.mate || ''; phone = whatsappCrewPhone(recipientName); }
  if (['Owner Assignment Alert','Owner Payout Statement'].includes(category)) { recipientRole = 'Owner'; recipientName = store.vessels.find((v) => v.name === trip.vessel)?.owner || ''; phone = whatsappCrewPhone(recipientName); }
  return { trip, invoice, recipientRole, recipientName, phone, body: renderWhatsAppTemplate(whatsappTemplate(category).body, whatsappValues(trip, invoice)) };
}
function whatsappComposer(category = 'Customer Booking Confirmation', tripId = '', invoiceId = '') {
  const page = document.getElementById('page-whatsapp'); if (!page) return;
  const d = whatsappContextDefaults(category, tripId, invoiceId);
  page.innerHTML = `<div class="page-stack whatsapp-page"><div class="card whatsapp-hero"><div><p class="eyebrow">Manual messaging framework</p><h3>Message Composer</h3><p>No live WhatsApp Business API is connected. Messages open in WhatsApp only after a user reviews and taps the button.</p></div><span class="badge gold">Manual send only</span></div><form class="card whatsapp-composer whatsapp-bottom-sheet" onsubmit="createWhatsAppDraft(event)"><div class="form-grid"><div class="field"><label>Message Category</label><select name="category" onchange="refreshWhatsAppComposer(this.form)">${store.whatsappTemplates.map(t=>`<option ${t.category===category?'selected':''}>${escapeHtml(t.category)}</option>`).join('')}</select></div><div class="field"><label>Linked Trip</label><select name="relatedTrip" onchange="refreshWhatsAppComposer(this.form)"><option value="">— None —</option>${store.trips.map(t=>`<option value="${t.id}" ${t.id===tripId?'selected':''}>${escapeHtml(`${t.customer || 'Trip'} · ${t.tripDate || 'No date'}`)}</option>`).join('')}</select></div><div class="field"><label>Linked Invoice / Quote</label><select name="relatedInvoice" onchange="refreshWhatsAppComposer(this.form)"><option value="">— None —</option>${store.invoices.map(i=>`<option value="${i.id}" ${i.id===invoiceId?'selected':''}>${escapeHtml(i.invoiceNumber || i.quoteNumber || i.customer || i.id)}</option>`).join('')}</select></div><div class="field"><label>Recipient Role</label><select name="recipientRole">${['Customer','Captain','Mate','Owner','Admin'].map(r=>`<option ${r===d.recipientRole?'selected':''}>${r}</option>`).join('')}</select></div><div class="field"><label>Recipient</label><input name="recipientName" value="${escapeHtml(d.recipientName)}" required></div><div class="field"><label>Phone Number</label><input name="phoneNumber" type="tel" value="${escapeHtml(d.phone)}" placeholder="242-555-0123"></div><div class="field field-wide"><label>Message Body</label><textarea name="messageBody" rows="7" oninput="updateWhatsAppLivePreview(this.form)" required>${escapeHtml(d.body)}</textarea></div></div><div class="whatsapp-preview-card" data-whatsapp-live-preview>${whatsappPreviewMarkup({...d, category, relatedTrip:tripId, relatedInvoice:invoiceId, messageBody:d.body, phoneNumber:d.phone})}</div><div class="form-actions whatsapp-mobile-actions"><button class="btn btn-primary">Save Draft</button><button class="btn btn-outline" type="button" onclick="copyWhatsAppText(this.form.messageBody.value)">Copy Message</button></div></form>${whatsappQueueMarkup()}</div>`;
}
function renderWhatsApp() { store.whatsappTemplates = normalizeWhatsAppTemplates(store.whatsappTemplates); whatsappComposer(); }
function refreshWhatsAppComposer(form) { whatsappComposer(form.category.value, form.relatedTrip.value, form.relatedInvoice.value); }
function updateWhatsAppLivePreview(form) { const host=form.querySelector('[data-whatsapp-live-preview]'); if(host) host.innerHTML=whatsappPreviewMarkup(Object.fromEntries(new FormData(form).entries())); }
function whatsappPreviewMarkup(item = {}) { const trip=whatsappTrip(item.relatedTrip), invoice=whatsappInvoice(item.relatedInvoice); return `<div class="whatsapp-preview-head"><strong>Preview</strong><span class="badge green">${escapeHtml(item.category || 'Message')}</span></div><dl><div><dt>Recipient</dt><dd>${escapeHtml(item.recipientName || 'Not selected')} · ${escapeHtml(item.recipientRole || '')}</dd></div><div><dt>Phone Number</dt><dd>${escapeHtml(item.phoneNumber || 'Phone number required')}</dd></div><div><dt>Linked Trip</dt><dd>${escapeHtml(trip.id ? `${trip.customer || 'Trip'} · ${trip.tripDate || ''}` : 'None')}</dd></div><div><dt>Linked Invoice / Quote</dt><dd>${escapeHtml(invoice.id ? invoice.invoiceNumber || invoice.quoteNumber || invoice.id : 'None')}</dd></div></dl><div class="whatsapp-bubble">${escapeHtml(item.messageBody || item.body || '').replace(/\n/g,'<br>')}</div>`; }
function createWhatsAppDraft(event) { event.preventDefault(); const data=Object.fromEntries(new FormData(event.target).entries()); if(!whatsAppRoleCanCreate(data.category,whatsappTrip(data.relatedTrip))){toast('Your role is not permitted to create this WhatsApp message.');return;} const item={ id:makeId('wa-message'), recipientName:data.recipientName, recipientRole:data.recipientRole, phoneNumber:data.phoneNumber, category:data.category, messageBody:data.messageBody, relatedTrip:data.relatedTrip, relatedBooking:whatsappTrip(data.relatedTrip).bookingId || '', relatedInvoice:data.relatedInvoice, status:whatsappDigits(data.phoneNumber)?'Ready':'Draft', createdAt:new Date().toISOString(), sentAt:'', createdBy:currentUserLabel() }; store.whatsappQueue.unshift(item); addAudit('created','WhatsApp',`${item.category} draft created for ${item.recipientName}.`,{messageId:item.id,tripId:item.relatedTrip,invoiceId:item.relatedInvoice}); addNotification('WhatsApp message draft created',`${item.category} for ${item.recipientName}.`,'info',{category:'WhatsApp',messageId:item.id,tripId:item.relatedTrip}); saveStore(); renderWhatsApp(); toast('WhatsApp draft created.'); }
function openWhatsAppMessage(id) { const item=store.whatsappQueue.find(x=>x.id===id); if(!item)return; const digits=whatsappDigits(item.phoneNumber); if(!digits){item.status='Failed'; addAudit('failed','WhatsApp',`Phone number required for ${item.recipientName}.`,{messageId:id}); addNotification('WhatsApp message failed',`Phone number required for ${item.recipientName}.`,'warning',{category:'WhatsApp',messageId:id}); saveStore(); renderWhatsApp(); toast('Phone number required before opening WhatsApp.'); return;} item.status='Opened in WhatsApp'; addAudit('opened','WhatsApp',`${item.category} opened for ${item.recipientName}.`,{messageId:id,tripId:item.relatedTrip,invoiceId:item.relatedInvoice}); addNotification('WhatsApp message opened',`${item.category} opened for ${item.recipientName}.`,'success',{category:'WhatsApp',messageId:id,tripId:item.relatedTrip}); saveStore(); renderWhatsApp(); window.open(`https://wa.me/${digits}?text=${encodeURIComponent(item.messageBody)}`,'_blank','noopener'); }
function updateWhatsAppStatus(id,status){const item=store.whatsappQueue.find(x=>x.id===id);if(!item||!WHATSAPP_STATUSES.includes(status))return;item.status=status;if(status==='Sent Manually')item.sentAt=new Date().toISOString();addAudit('updated','WhatsApp',`${item.category} marked ${status} for ${item.recipientName}.`,{messageId:id});if(['Sent Manually','Failed'].includes(status))addNotification(`WhatsApp message ${status.toLowerCase()}`,`${item.category} for ${item.recipientName}.`,status==='Failed'?'warning':'success',{category:'WhatsApp',messageId:id});saveStore();renderWhatsApp();}
function copyWhatsAppText(text){if(navigator.clipboard?.writeText)navigator.clipboard.writeText(text);else{const area=document.createElement('textarea');area.value=text;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();}toast('Message copied.');}
function whatsappQueueMarkup(){return `<div class="card table-card"><div class="card-header"><div><p class="eyebrow">Local queue</p><h3>WhatsApp Message Queue</h3></div><span class="badge blue">${store.whatsappQueue.length} messages</span></div><div class="whatsapp-queue-list">${store.whatsappQueue.length?store.whatsappQueue.map(item=>`<article class="whatsapp-queue-card"><div><span class="badge ${item.status==='Failed'?'red':item.status==='Sent Manually'?'green':'gold'}">${escapeHtml(item.status)}</span><h4>${escapeHtml(item.recipientName)} · ${escapeHtml(item.recipientRole)}</h4><p>${escapeHtml(item.category)} · ${escapeHtml(item.phoneNumber || 'Phone missing')}</p><small>${escapeHtml(new Date(item.createdAt).toLocaleString())} · ${escapeHtml(item.createdBy)}</small></div><div class="whatsapp-queue-actions"><button class="btn btn-primary btn-small" onclick="openWhatsAppMessage('${item.id}')">Open in WhatsApp</button><button class="btn btn-outline btn-small" onclick="copyWhatsAppText(store.whatsappQueue.find(x=>x.id==='${item.id}').messageBody)">Copy</button><select aria-label="Message status" onchange="updateWhatsAppStatus('${item.id}',this.value)">${WHATSAPP_STATUSES.map(s=>`<option ${s===item.status?'selected':''}>${s}</option>`).join('')}</select></div></article>`).join(''):'<p class="empty-state">No WhatsApp drafts yet.</p>'}</div></div>`;}
function saveWhatsAppSettings(event){event.preventDefault();const data=Object.fromEntries(new FormData(event.target).entries());store.whatsappSettings={...store.whatsappSettings,defaultCountryCode:data.defaultCountryCode.replace(/\D/g,''),companyWhatsAppNumber:data.companyWhatsAppNumber,enableCustomerActions:Boolean(data.enableCustomerActions),enableCrewActions:Boolean(data.enableCrewActions)};addAudit('updated','WhatsApp Settings','WhatsApp manual action settings updated.');saveStore();toast('WhatsApp settings saved.');}
function saveWhatsAppTemplate(event,id){event.preventDefault();const template=store.whatsappTemplates.find(t=>t.id===id);if(!template)return;template.body=new FormData(event.target).get('body');template.updatedAt=new Date().toISOString();addAudit('updated','WhatsApp Templates',`${template.category} template updated.`,{templateId:id});saveStore();toast('WhatsApp template saved.');}
function whatsappSettingsMarkup(){const s=store.whatsappSettings;return `<details class="card whatsapp-settings app-accordion" open><summary><div><p class="eyebrow">Manual controls · ${escapeHtml(s.businessApiStatus || 'Manual Mode')}</p><h3>WhatsApp Settings</h3></div><span class="chevron">⌄</span></summary><form onsubmit="saveWhatsAppSettings(event)"><div class="form-grid"><div class="field"><label>Default country code</label><input name="defaultCountryCode" value="${escapeHtml(s.defaultCountryCode)}" required></div><div class="field"><label>Company WhatsApp number</label><input name="companyWhatsAppNumber" type="tel" value="${escapeHtml(s.companyWhatsAppNumber)}"></div><label class="toggle-row"><input name="enableCustomerActions" type="checkbox" ${s.enableCustomerActions?'checked':''}> Enable customer WhatsApp actions</label><label class="toggle-row"><input name="enableCrewActions" type="checkbox" ${s.enableCrewActions?'checked':''}> Enable crew WhatsApp actions</label></div><p class="notice ${store.integrationStatus?.whatsappConfigured ? 'success' : 'warning'}"><strong>${store.integrationStatus?.whatsappConfigured ? 'Business API credentials detected:' : 'Manual mode active:'}</strong> ${store.integrationStatus?.whatsappConfigured ? 'the backend environment has the required WhatsApp credential placeholders populated.' : 'messages are reviewed, copied, or opened with wa.me links until Meta WhatsApp Business credentials are added.'}</p><button class="btn btn-primary">Save WhatsApp Settings</button></form><div class="whatsapp-template-list"><h3>Template management</h3><p class="template-variables"><strong>Variables:</strong> ${WHATSAPP_VARIABLES.map(v=>`{{${v}}}`).join(' · ')}</p>${store.whatsappTemplates.map(t=>`<details class="whatsapp-template-card"><summary><strong>${escapeHtml(t.category)}</strong><span class="chevron">⌄</span></summary><form onsubmit="saveWhatsAppTemplate(event,'${t.id}')"><textarea name="body" rows="4">${escapeHtml(t.body)}</textarea><button class="btn btn-outline btn-small">Save Template</button></form></details>`).join('')}</div></details>`;}
function whatsappRouteCategory(route){return ({bookings:'Customer Booking Confirmation',invoices:'Invoice / Payment Reminder',trips:'Trip Reminder',dispatch:'Captain Assignment',calendar:'Trip Reminder','captain-dashboard':'Trip Reminder','mate-dashboard':'Trip Reminder','owner-dashboard':'Owner Assignment Alert',payroll:'Owner Payout Statement','pre-trip-checklist':'Pre Trip Checklist Reminder','post-trip-checklist':'Post Trip Checklist Reminder','incident-reports':'Incident Alert',weather:'Weather Alert','cruise-schedule':'Cruise Timing Alert'})[route];}
function openWhatsAppComposer(category,tripId='',invoiceId=''){renderRoute('whatsapp');whatsappComposer(category,tripId,invoiceId);}
function appendWhatsAppIntegrationActions(route){if(route==='whatsapp')return;const page=document.getElementById(`page-${route}`);if(!page)return;if(route==='settings'){page.insertAdjacentHTML('beforeend',whatsappSettingsMarkup());return;}const category=whatsappRouteCategory(route);if(!category)return;const role=activeRoleName(),person=activeRolePerson(role),trip=store.trips.find(t=>role==='Captain'?t.captain===person:role==='Mate'?t.mate===person:true)||store.trips[0]||{},invoice=store.invoices[0]||{};if(!whatsAppRoleCanCreate(category,trip))return;page.insertAdjacentHTML('afterbegin',`<div class="card whatsapp-action-strip"><div><strong>WhatsApp action</strong><span>${escapeHtml(category)} · manual preview required</span></div><button class="btn btn-primary" onclick="openWhatsAppComposer('${category}','${trip.id||''}','${route==='invoices'?(invoice.id||''):''}')">Preview WhatsApp Message</button></div>`);}

/* Phase 6J: Gmail Import Framework — local/manual review only; no Gmail API or OAuth calls. */
const GMAIL_IMPORT_SOURCES = ['Viator','GetYourGuide','Tripadvisor','Airbnb Experiences','Website Contact Form','Direct Customer Email','Unknown'];
const GMAIL_IMPORT_STATUSES = ['New','Reviewed','Converted to Booking','Converted to Trip','Ignored','Needs Review'];
const GMAIL_REVIEW_FIELDS = [
  ['source','Detected Source'],['sender','Sender'],['subject','Subject'],['receivedDate','Received Date'],['customerName','Customer Name'],['phone','Phone'],['email','Email'],['tourType','Tour Type'],['tourDate','Tour Date'],['startTime','Start Time'],['duration','Duration'],['guestCount','Guest Count'],['totalPrice','Total Price'],['deposit','Deposit'],['balance','Balance'],['paymentStatus','Payment Status'],['bookingReference','Booking Reference']
];
let activeGmailImportId = '';

function detectGmailImportSource(text = '', sender = '', subject = '') {
  const value = `${sender} ${subject} ${text}`.toLowerCase();
  if (/viator|tripadvisor experiences|merchantapi@viator/.test(value)) return 'Viator';
  if (/getyourguide|get your guide|gyg/.test(value)) return 'GetYourGuide';
  if (/tripadvisor|trip advisor/.test(value)) return 'Tripadvisor';
  if (/airbnb|experiences by airbnb/.test(value)) return 'Airbnb Experiences';
  if (/contact form|website inquiry|reeladventuretours\.com|website lead/.test(value)) return 'Website Contact Form';
  if (/from:|sender:|reply-to:|@/.test(value)) return 'Direct Customer Email';
  return 'Unknown';
}

function parseGmailImportText(text = '', fileName = '') {
  const base = parseQuoteInvoiceText(text, fileName);
  const pick = (...patterns) => patterns.map((pattern) => String(text).match(pattern)?.[1]?.trim()).find(Boolean) || '';
  const sender = pick(/(?:from|sender|reply-to)\s*:\s*([^\n]+)/i);
  const subject = pick(/subject\s*:\s*([^\n]+)/i) || fileName;
  const source = detectGmailImportSource(text, sender, subject);
  const totalPrice = base.tourPrice || pick(/(?:total price|total|amount)\s*[:#-]?\s*\$?([\d,.]+)/i);
  const deposit = base.depositPaid || pick(/deposit(?: paid)?\s*[:#-]?\s*\$?([\d,.]+)/i);
  const balance = base.balanceDue || pick(/balance(?: due)?\s*[:#-]?\s*\$?([\d,.]+)/i);
  const fields = {
    source, sender, subject, receivedDate: pick(/(?:received|sent|date)\s*:\s*([^\n]+)/i), customerName: base.customerName || '', phone: base.phone || '', email: base.email || '', tourType: base.tourType || '', tourDate: base.tripDate || '', startTime: base.startTime || base.departureTime || '', duration: base.duration || '', guestCount: base.guestCount || '', totalPrice, deposit, balance, paymentStatus: base.paymentStatus || '', bookingReference: base.invoiceNumber || base.quoteNumber || pick(/(?:booking|reservation|confirmation)(?: reference| number| id| #)?\s*[:#-]?\s*([A-Z0-9-]+)/i)
  };
  const confidenceScores = Object.fromEntries(GMAIL_REVIEW_FIELDS.map(([key]) => [key, fields[key] ? (['source','sender','subject','bookingReference'].includes(key) ? 'High' : 'Medium') : 'Low']));
  const completed = Object.values(fields).filter(Boolean).length;
  return { fields, confidenceScores, confidenceScore: Math.round(completed / Object.keys(fields).length * 100) };
}

function gmailDuplicateMatches(item) {
  const strictness = store.gmailImportSettings.duplicateDetectionStrictness;
  const normalize = (value) => String(value || '').toLowerCase().trim();
  const records = [
    ...store.bookings.map((record) => ({ id: record.id, type: 'Booking', name: record.customer, phone: record.phone, email: record.email, date: record.date, time: record.time, reference: record.order })),
    ...store.trips.map((record) => ({ id: record.id, type: 'Trip', name: record.customer, phone: record.phone, email: record.email, date: record.tripDate, time: record.startTime, reference: record.bookingReference }))
  ];
  return records.map((record) => {
    const checks = [normalize(item.customerName) && normalize(item.customerName) === normalize(record.name), normalize(item.phone) && normalizePhoneNumber(item.phone) === normalizePhoneNumber(record.phone), normalize(item.email) && normalize(item.email) === normalize(record.email), item.tourDate && item.tourDate === record.date, item.startTime && item.startTime === record.time, normalize(item.bookingReference) && normalize(item.bookingReference) === normalize(record.reference)];
    return { ...record, matchCount: checks.filter(Boolean).length };
  }).filter((record) => record.matchCount >= (strictness === 'Strict' ? 1 : strictness === 'Relaxed' ? 3 : 2));
}

function missingGmailImportFields(item) { return [['customerName','Customer Name'],['tourDate','Tour Date'],['startTime','Start Time'],['guestCount','Guest Count'],['tourType','Tour Type']].filter(([key]) => !item[key]).map(([,label]) => label); }
function gmailImportFieldInput(key, label, item) { const type = key === 'tourDate' ? 'date' : key === 'startTime' ? 'time' : ['guestCount','totalPrice','deposit','balance'].includes(key) ? 'number' : key === 'receivedDate' ? 'text' : 'text'; return `<label class="gmail-review-field"><span>${escapeHtml(label)} <small>${escapeHtml(item.confidenceScores?.[key] || 'Low')} confidence</small></span><input name="${key}" type="${type}" value="${escapeHtml(item[key] || '')}"></label>`; }

function renderGmailImport() {
  const page = document.getElementById('page-gmail-import');
  const imports = store.gmailImports || [];
  page.innerHTML = `<div class="page-stack gmail-import-page"><section class="card gmail-import-hero"><div><p class="eyebrow">Manual framework · Gmail API disconnected</p><h3>Import & Review</h3><p>Paste or upload a confirmation, review every detected field, then choose what to create. Nothing is automatically read from Gmail or saved as an operational record.</p></div><span class="badge gold">${escapeHtml(store.gmailOAuthStatus)}</span></section>
  <details class="card app-accordion gmail-import-card" open><summary><div><h3>1. Manual Import</h3><p>Paste email text or use existing local OCR / PDF intake.</p></div><span class="chevron">⌄</span></summary><form class="gmail-paste-form" onsubmit="parseManualGmailImport(event)"><label><strong>Paste Email Text</strong><textarea name="emailText" rows="12" placeholder="Paste sender, subject, booking confirmation, customer details, date, time, guests, and payment details here…" required></textarea></label><button class="btn btn-primary">Parse & Review</button></form><div class="gmail-upload-actions"><label class="btn btn-outline">Upload Email Screenshot<input type="file" accept="image/png,image/jpeg" capture="environment" onchange="handleGmailImportFile(event,'Email Screenshot')" hidden></label><label class="btn btn-outline">Upload PDF Confirmation<input type="file" accept="application/pdf,.pdf" onchange="handleGmailImportFile(event,'PDF Confirmation')" hidden></label></div></details>
  <div id="gmailReviewHost">${activeGmailImportId ? gmailReviewMarkup(imports.find((item) => item.id === activeGmailImportId)) : ''}</div>
  <details class="card app-accordion gmail-import-card" open><summary><div><h3>Import Queue</h3><p>${imports.length} local email review record${imports.length === 1 ? '' : 's'}</p></div><span class="chevron">⌄</span></summary><div class="gmail-import-list">${imports.length ? imports.map((item) => `<article class="gmail-import-row"><div><span class="badge ${item.importStatus === 'Needs Review' ? 'gold' : item.importStatus.startsWith('Converted') ? 'green' : 'blue'}">${escapeHtml(item.importStatus)}</span><h4>${escapeHtml(item.customerName || item.subject || 'Untitled email')}</h4><p>${escapeHtml(item.source)} · ${escapeHtml(item.tourDate || 'Date missing')} · ${item.confidenceScore || 0}% confidence</p></div><button class="btn btn-outline btn-small" onclick="openGmailImportReview('${item.id}')">Review</button></article>`).join('') : '<p class="empty-state">No manual email imports yet.</p>'}</div></details></div>`;
}

function parseManualGmailImport(event) { event.preventDefault(); createGmailImportReview(new FormData(event.target).get('emailText'), 'Pasted Email Text', 'Manual paste'); }
async function handleGmailImportFile(event, inputType) { const file = event.target.files?.[0]; if (!file) return; const extension = (file.name.split('.').pop() || '').toLowerCase(); try { toast('Reading file with local intake tools…'); const result = await extractUploadText(file, extension); createGmailImportReview(result.text, file.name, `${inputType} · ${result.method}`, result.warning); } catch (error) { toast('Could not parse file.'); } event.target.value = ''; }
function createGmailImportReview(text, fileName, extractionMethod, warning = '') { const parsed = parseGmailImportText(text, fileName); const item = { id: makeId('gmail-email'), emailId: makeId('email'), ...parsed.fields, rawMessagePreview: String(text || '').slice(0,1200), importStatus: missingGmailImportFields(parsed.fields).length ? 'Needs Review' : 'New', confidenceScore: parsed.confidenceScore, confidenceScores: parsed.confidenceScores, extractionMethod, extractionWarning: warning, createdAt: new Date().toISOString(), reviewRequired: true }; item.possibleDuplicates = gmailDuplicateMatches(item).map(({id,type,matchCount}) => ({id,type,matchCount})); store.gmailImports.unshift(item); activeGmailImportId = item.id; addAudit('parsed','Gmail Import',`Manual email parsed from ${item.source}; review required before save.`,{emailId:item.emailId,source:item.source}); saveStore(); renderGmailImport(); toast('Email parsed. Review required before any action.'); }
function openGmailImportReview(id) { activeGmailImportId = id; renderGmailImport(); document.getElementById('gmailReviewHost')?.scrollIntoView({behavior:'smooth'}); }

function gmailReviewMarkup(item) { if (!item) return ''; const duplicates = gmailDuplicateMatches(item), missing = missingGmailImportFields(item); return `<section class="card gmail-review-screen"><div class="card-header"><div><p class="eyebrow">2. Review before save</p><h3>${escapeHtml(item.subject || item.source || 'Imported Email')}</h3></div><span class="badge blue">${item.confidenceScore || 0}% confidence</span></div><form onsubmit="saveGmailImportReview(event,'${item.id}')"><div class="gmail-review-summary"><div><small>Detected Source</small><strong>${escapeHtml(item.source)}</strong></div><div><small>Import Status</small><strong>${escapeHtml(item.importStatus)}</strong></div><div><small>Input Method</small><strong>${escapeHtml(item.extractionMethod)}</strong></div></div>${item.extractionWarning ? `<p class="notice warning">${escapeHtml(item.extractionWarning)}</p>` : ''}<details class="gmail-review-section" open><summary><strong>Extracted Fields</strong><span>${GMAIL_REVIEW_FIELDS.length} fields</span></summary><div class="gmail-review-grid">${GMAIL_REVIEW_FIELDS.map(([key,label]) => gmailImportFieldInput(key,label,item)).join('')}</div></details><details class="gmail-review-section" open><summary><strong>Possible Duplicates</strong><span>${duplicates.length}</span></summary>${duplicates.length ? `<div class="notice warning"><strong>Possible Duplicate Booking Found</strong>${duplicates.map((duplicate) => `<p>${escapeHtml(duplicate.type)} · ${escapeHtml(duplicate.name || 'Unnamed')} · ${duplicate.matchCount} matching fields</p>`).join('')}<label>Duplicate decision<select name="duplicateDecision"><option value="">Choose…</option><option>Update Existing</option><option>Create New</option><option>Cancel</option></select></label></div>` : '<p class="notice success">No possible duplicates detected.</p>'}</details><details class="gmail-review-section" open><summary><strong>Missing Fields</strong><span>${missing.length}</span></summary><p>${missing.length ? escapeHtml(missing.join(' · ')) : 'No core fields are missing.'}</p></details><details class="gmail-review-section"><summary><strong>Raw Message Preview</strong><span>Local only</span></summary><pre>${escapeHtml(item.rawMessagePreview)}</pre></details><div class="gmail-review-actions"><label>Action<select name="action" required><option value="">Choose action…</option><option>Create Booking</option><option>Create Trip</option><option>Create Invoice / Quote</option><option>Add to Calendar</option><option>Save as Draft</option><option>Ignore</option><option>Create WhatsApp confirmation draft</option><option>Create payment reminder draft</option><option>Create meeting point message draft</option></select></label><button class="btn btn-primary">Confirm Reviewed Action</button></div></form></section>`; }
function gmailImportToUploadData(item) { return { customerName:item.customerName, phone:item.phone, email:item.email, bookingSource:item.source, tripDate:item.tourDate, startTime:item.startTime, duration:item.duration, guestCount:item.guestCount, tourType:item.tourType, tourPrice:item.totalPrice, depositPaid:item.deposit, balanceDue:item.balance, paymentStatus:item.paymentStatus, invoiceNumber:item.bookingReference, quoteNumber:item.bookingReference, notes:`Imported from ${item.source} email ${item.emailId}.` }; }
function linkGmailImportCustomer(item) { const norm = (value) => String(value || '').toLowerCase().trim(); let profile = (store.customerProfiles || []).find((customer) => (item.email && norm(customer.email) === norm(item.email)) || (item.phone && normalizePhoneNumber(customer.phone) === normalizePhoneNumber(item.phone)) || (item.customerName && norm(customer.name) === norm(item.customerName))); if (!profile) { profile = { id:makeId('customer'), name:item.customerName || 'Imported Customer', phone:item.phone || '', email:item.email || '', source:item.source, createdAt:new Date().toISOString(), updatedAt:new Date().toISOString() }; store.customerProfiles.push(profile); } else { Object.assign(profile,{name:item.customerName || profile.name,phone:item.phone || profile.phone,email:item.email || profile.email,updatedAt:new Date().toISOString()}); } item.customerProfileId = profile.id; return profile; }
function createGmailWhatsAppDraft(item, category) { const labels = { confirmation:'Customer Booking Confirmation', payment:'Invoice / Payment Reminder', meeting:'Meeting Point Message' }; const bodies = { confirmation:`Hi ${item.customerName || 'there'}, your ${item.tourType || 'tour'} is being reviewed for ${item.tourDate || 'your requested date'} at ${item.startTime || 'the requested time'}.`, payment:`Hi ${item.customerName || 'there'}, this is a payment reminder for your ${item.tourType || 'tour'}. Balance due: ${money(item.balance)}.`, meeting:`Hi ${item.customerName || 'there'}, we will confirm the meeting point for your ${item.tourType || 'tour'} on ${item.tourDate || 'your tour date'} shortly.` }; store.whatsappQueue.unshift({ id:makeId('wa-message'), category:labels[category], recipientName:item.customerName || 'Customer', recipientRole:'Customer', phoneNumber:item.phone || '', messageBody:bodies[category], status:'Draft', createdAt:new Date().toISOString(), createdBy:currentUserLabel(), linkedGmailImportId:item.id }); addNotification('WhatsApp draft created',`${labels[category]} created from reviewed email import.`, 'success',{category:'WhatsApp',emailId:item.emailId}); }
function saveGmailImportReview(event, id) { event.preventDefault(); const item = store.gmailImports.find((record) => record.id === id); if (!item) return; const data = Object.fromEntries(new FormData(event.target).entries()); const action = data.action; delete data.action; const duplicateDecision = data.duplicateDecision || ''; delete data.duplicateDecision; Object.assign(item,data); const duplicates = gmailDuplicateMatches(item); if (duplicates.length && !duplicateDecision) return toast('Possible Duplicate Booking Found. Choose Update Existing, Create New, or Cancel.'); if (duplicateDecision === 'Cancel') return toast('Import action cancelled.'); item.possibleDuplicates = duplicates.map(({id,type,matchCount}) => ({id,type,matchCount})); item.reviewedAt = new Date().toISOString(); item.reviewedBy = currentUserLabel(); item.importStatus = 'Reviewed'; const mapped = gmailImportToUploadData(item); linkGmailImportCustomer(item);
  if (action === 'Create Booking') { createBookingFromUpload(mapped); item.importStatus = 'Converted to Booking'; }
  else if (action === 'Create Trip' || action === 'Add to Calendar') { const previous = pendingDuplicateAction; pendingDuplicateAction = duplicateDecision === 'Update Existing' ? 'update' : 'new'; createTripFromUpload(mapped, action === 'Add to Calendar'); pendingDuplicateAction = previous; item.importStatus = 'Converted to Trip'; }
  else if (action === 'Create Invoice / Quote') { createInvoiceFromUpload({ ...mapped, documentType:'Quote' }, true); }
  else if (action === 'Save as Draft') item.importStatus = 'Reviewed';
  else if (action === 'Ignore') item.importStatus = 'Ignored';
  else if (action === 'Create WhatsApp confirmation draft') createGmailWhatsAppDraft(item,'confirmation');
  else if (action === 'Create payment reminder draft') createGmailWhatsAppDraft(item,'payment');
  else if (action === 'Create meeting point message draft') createGmailWhatsAppDraft(item,'meeting');
  addAudit('reviewed','Gmail Import',`${action} confirmed after manual email review.`,{emailId:item.emailId,source:item.source,customerProfileId:item.customerProfileId}); addNotification('Gmail import action completed',`${action} completed for ${item.customerName || item.subject || 'imported email'}.`,'success',{category:'Gmail Import',emailId:item.emailId}); saveStore(); renderGmailImport(); toast(`${action} completed after review.`); }

function saveGmailImportSettings(event) { event.preventDefault(); const data = new FormData(event.target); store.gmailImportSettings = { enabled:data.get('enabled') === 'on', allowedSources:data.getAll('allowedSources'), defaultImportAction:data.get('defaultImportAction'), duplicateDetectionStrictness:data.get('duplicateDetectionStrictness'), reviewRequiredBeforeSave:true }; addAudit('updated','Gmail Import Settings','Gmail import framework settings updated; review remains required.'); saveStore(); toast('Gmail Import settings saved. Review before save remains required.'); }
function gmailImportSettingsMarkup() { const settings = store.gmailImportSettings; return `<details class="legacy-tool settings-span gmail-settings" open><summary><div><p class="eyebrow">Future API readiness · no live connection</p><h3>Gmail Import Settings</h3></div><span class="chevron">⌄</span></summary><form onsubmit="saveGmailImportSettings(event)"><div class="gmail-readiness-grid"><span><small>gmailOAuthStatus</small><strong>${escapeHtml(store.gmailOAuthStatus)}</strong></span><span><small>gmailConnectedAccount</small><strong>${escapeHtml(store.gmailConnectedAccount || 'None')}</strong></span><span><small>lastSyncTime</small><strong>${escapeHtml(store.lastSyncTime || 'Never')}</strong></span><span><small>syncCursor</small><strong>${escapeHtml(store.syncCursor || 'Not set')}</strong></span><span><small>importRules</small><strong>${store.importRules.length} placeholders</strong></span><span><small>sourceRules</small><strong>${store.sourceRules.length} placeholders</strong></span></div><div class="form-grid"><label class="toggle-row"><input name="enabled" type="checkbox" ${settings.enabled ? 'checked' : ''}> Enable Gmail Import framework</label><label>Default Import Action<select name="defaultImportAction">${['Save as Draft','Create Booking','Create Trip','Create Invoice / Quote','Add to Calendar'].map((value) => `<option ${settings.defaultImportAction === value ? 'selected' : ''}>${value}</option>`).join('')}</select></label><label>Duplicate Detection Strictness<select name="duplicateDetectionStrictness">${['Strict','Standard','Relaxed'].map((value) => `<option ${settings.duplicateDetectionStrictness === value ? 'selected' : ''}>${value}</option>`).join('')}</select></label><label class="toggle-row"><input type="checkbox" checked disabled> Review Required Before Save (always on)</label></div><fieldset><legend>Allowed Sources</legend><div class="gmail-source-options">${GMAIL_IMPORT_SOURCES.map((source) => `<label><input type="checkbox" name="allowedSources" value="${escapeHtml(source)}" ${settings.allowedSources.includes(source) ? 'checked' : ''}> ${escapeHtml(source)}</label>`).join('')}</div></fieldset><p class="notice warning"><strong>No live Gmail API:</strong> this framework does not request OAuth credentials, connect to Gmail, sync messages, or automatically read real emails.</p><button class="btn btn-primary">Save Gmail Import Settings</button></form></details>`; }

/* Phase 6K: local-only Operations Assistant. This rule engine never sends app data outside the browser. */
const assistantLocalDataSources = ['Bookings','Trips','Invoices / Quotes','Calendar','Crew','Vessels','Payroll','Expenses','Inventory','Incident Reports','Maintenance','Fuel Tracking','Weather','Cruise Tracking','Notifications','Audit Trail'];
const assistantSuggestedQuestions = [
  ['Trips needing attention', 'Show trips not dispatch ready.'], ['Outstanding balances', 'Show unpaid invoices.'],
  ['Payroll due', 'Show payroll due.'], ['Open incidents', 'Show open incidents.'], ['Maintenance due', 'Show vessels due for maintenance.'],
  ["Today's trips", "Show today's trips."], ["This week's revenue", "Show this week's revenue."], ['Weather risk', 'Show weather risk trips.'],
  ['Cruise timing risk', 'Show cruise risk trips.']
];
const assistantCategoryRoles = {
  Trips: ['Admin','Owner','Captain','Mate'], Bookings: ['Admin','Owner','Bookkeeper'], Revenue: ['Admin','Owner','Bookkeeper'], Payroll: ['Admin','Owner','Captain','Mate','Bookkeeper'],
  Crew: ['Admin'], Vessels: ['Admin','Owner','Captain','Mate'], Maintenance: ['Admin','Owner','Captain','Mate'], Fuel: ['Admin','Owner','Bookkeeper'], Weather: ['Admin','Owner','Captain','Mate'],
  Cruise: ['Admin','Owner','Captain','Mate'], Incidents: ['Admin','Owner','Captain','Mate'], Invoices: ['Admin','Owner','Bookkeeper'], Checklists: ['Admin','Owner','Captain','Mate']
};
function assistantDateRange(period = 'week') {
  const now = new Date(), start = new Date(now), end = new Date(now);
  if (period === 'month') { start.setDate(1); end.setMonth(end.getMonth() + 1, 0); }
  else { start.setDate(now.getDate() - now.getDay()); end.setDate(start.getDate() + 6); }
  return [start.toISOString().slice(0,10), end.toISOString().slice(0,10)];
}
function assistantScopedTrips() { return visibleCalendarTrips(); }
function assistantScopedInvoices() {
  const role = activeRoleName(), trips = assistantScopedTrips(), tripIds = new Set(trips.map((trip) => trip.id)), vessels = new Set(trips.map((trip) => trip.vessel));
  if (['Admin','Bookkeeper'].includes(role)) return store.invoices || [];
  if (role === 'Owner') return (store.invoices || []).filter((invoice) => tripIds.has(invoice.tripId) || vessels.has(invoice.vessel));
  return [];
}
function assistantScopedIncidents() {
  const role = activeRoleName(), person = activeRolePerson(role), trips = assistantScopedTrips(), tripIds = new Set(trips.map((trip) => trip.id)), vessels = new Set(trips.map((trip) => trip.vessel));
  if (['Admin','Bookkeeper'].includes(role)) return store.incidentReports || [];
  if (role === 'Owner') return (store.incidentReports || []).filter((item) => vessels.has(item.vessel) || tripIds.has(item.tripId));
  return (store.incidentReports || []).filter((item) => item.reportedBy === person || tripIds.has(item.tripId));
}
function assistantAction(label, route, id = '', date = '') { return { label, route, id, date }; }
function assistantTripCard(trip, extra = {}) { return { title: trip.customer || trip.tourType || 'Trip', fields: { Date: formatDate(trip.tripDate), Time: formatTime(trip.startTime), Customer: trip.customer || '—', Vessel: trip.vessel || 'Unassigned', ...extra }, action: assistantAction('Open Trip','trips',trip.id) }; }
function assistantResult(category, title, summary, cards = []) { return { category, title, summary, cards }; }
function assistantAllowed(category) { return (assistantCategoryRoles[category] || ['Admin']).includes(activeRoleName()); }
function runLocalAssistantQuery(rawQuery) {
  const query = String(rawQuery || '').trim(), q = query.toLowerCase(), trips = assistantScopedTrips(), today = new Date().toISOString().slice(0,10), role = activeRoleName();
  let result;
  if (/captain/.test(q) && /(need|missing|without|unassigned)/.test(q)) result = assistantResult('Trips','Trips Needing Captains','Trips visible to your role with no accepted captain assignment.', trips.filter((t) => !readinessChecklist(t).captainAssigned).map((t) => assistantTripCard(t,{ 'Missing Role':'Captain' })));
  else if (/mate/.test(q) && /(need|missing|without|unassigned)/.test(q)) result = assistantResult('Trips','Trips Needing Mates','Trips visible to your role with no accepted mate assignment.', trips.filter((t) => !readinessChecklist(t).mateAssigned).map((t) => assistantTripCard(t,{ 'Missing Role':'Mate' })));
  else if (/(not dispatch ready|needing attention|needs attention|dispatch ready)/.test(q)) result = assistantResult('Trips','Trips Not Dispatch Ready','Trips that need an assignment, checklist, acceptance, vessel, or conflict review.', trips.filter((t) => calculateDispatchReadiness(t) !== 'Dispatch Ready' && t.status !== 'Completed' && t.status !== 'Cancelled').map((t) => assistantTripCard(t,{ Status:calculateDispatchReadiness(t) })));
  else if (/(today'?s trips|trips today)/.test(q)) result = assistantResult('Trips',"Today's Trips",`Trips scheduled for ${formatDate(today)}.`, trips.filter((t) => t.tripDate === today).map((t) => assistantTripCard(t,{ Status:calculateDispatchReadiness(t) })));
  else if (/booking/.test(q) && /(without|missing|no trip)/.test(q)) { const linked = new Set((store.trips || []).map((t) => t.bookingId).filter(Boolean)), visibleNames = new Set(trips.map((t) => t.customer)); result = assistantResult('Bookings','Bookings Without Trips','Bookings that are not linked to a trip.', (store.bookings || []).filter((b) => !linked.has(b.id) && (role !== 'Owner' || visibleNames.has(b.customer))).map((b) => ({ title:b.customer || b.order || 'Booking', fields:{ Date:formatDate(b.date), Product:b.product || '—', Balance:money(b.balance) }, action:assistantAction('Open Booking','bookings',b.id) }))); }
  else if (/(unpaid invoice|balances due)/.test(q)) result = assistantResult('Invoices','Unpaid Invoices','Invoices and quotes with a remaining balance.', assistantScopedInvoices().filter((i) => Number(i.balanceDue || 0) > 0).map((i) => ({ title:i.customerName || 'Customer', fields:{ 'Invoice Number':i.invoiceNumber || '—', Balance:money(i.balanceDue), 'Due / Trip Date':formatDate(i.dueDate || i.tripDate) }, action:assistantAction('Open Invoice / Quote','invoices',i.id) })));
  else if (/customers?.*(outstanding|balance)/.test(q)) { const totals = {}; assistantScopedInvoices().forEach((i) => totals[i.customerName || 'Unknown'] = (totals[i.customerName || 'Unknown'] || 0) + Number(i.balanceDue || 0)); result = assistantResult('Invoices','Customers With Outstanding Balances','Customer balances from visible invoices.', Object.entries(totals).filter(([,v]) => v > 0).sort((a,b)=>b[1]-a[1]).map(([name,value]) => ({ title:name, fields:{ 'Outstanding Balance':money(value) }, action:assistantAction('Open Invoice / Quote','invoices') }))); }
  else if (/(lifetime spend|highest lifetime|top customers)/.test(q)) { const totals = {}; [...(store.invoices || []), ...(store.trips || [])].forEach((x) => { const name=x.customerName || x.customer; if(name) totals[name]=(totals[name]||0)+Number(x.tourPrice||0); }); result=assistantResult('Invoices','Customers With Highest Lifetime Spend','Lifetime value calculated from local invoices and trips.',Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,20).map(([name,value])=>({title:name,fields:{'Lifetime Spend':money(value)},action:assistantAction('Open Invoice / Quote','invoices')}))); }
  else if (/(payroll due|earnings|owner payouts? due)/.test(q)) { const [start,end]=assistantDateRange('week'), person=activeRolePerson(role); let entries=payrollEntries().filter((e)=>e.outstanding>0); if(role==='Owner') entries=entries.filter((e)=>e.role==='Owner'&&e.person===person); if(['Captain','Mate'].includes(role)) entries=entries.filter((e)=>e.role===role&&e.person===person); if(/captain/.test(q)) entries=entries.filter((e)=>e.role==='Captain'); if(/mate/.test(q)) entries=entries.filter((e)=>e.role==='Mate'); if(/owner payout/.test(q)) entries=entries.filter((e)=>e.role==='Owner'); if(/this week|earnings/.test(q)) entries=entries.filter((e)=>e.trip.tripDate>=start&&e.trip.tripDate<=end); result=assistantResult('Payroll',/owner payout/.test(q)?'Owner Payouts Due':/earnings/.test(q)?`${role} Earnings This Week`:'Payroll Due',`Outstanding payroll visible to ${role}.`,entries.map((e)=>({title:e.person,fields:{Role:e.role,Trip:formatDate(e.trip.tripDate),Vessel:e.vessel||'—',Outstanding:money(e.outstanding)},action:assistantAction('Open Payroll','payroll')}))); }
  else if (/(maintenance|service due)/.test(q)) { const owned=new Set(trips.map((t)=>t.vessel)); let records=store.maintenanceRecords||[]; if(role==='Owner') records=records.filter((r)=>owned.has(r.vessel)); if(['Captain','Mate'].includes(role)) records=records.filter((r)=>owned.has(r.vessel)); records=records.filter((r)=>r.status!=='Good'||maintenanceAlerts(r).length); result=assistantResult('Maintenance','Vessels Due for Maintenance','Vessels with due, overdue, or review-needed maintenance.',records.map((r)=>({title:r.vessel,fields:{Status:r.status,Alerts:String(maintenanceAlerts(r).length),'Next Service':formatDate(r.nextOilChangeDue)},action:assistantAction('Open Vessel','maintenance')}))); }
  else if (/(open incident|incident)/.test(q)) result=assistantResult('Incidents','Open Incidents','Unresolved incidents visible to your role.',assistantScopedIncidents().filter((i)=>i.status!=='Resolved'&&i.status!=='Closed').map((i)=>({title:i.category||'Incident',fields:{Date:formatDate(i.date),Vessel:i.vessel||'—',Severity:i.severity||'—','Reported By':i.reportedBy||'—',Status:i.status||'Open'},action:assistantAction('Open Incident','incident-reports',i.id)})));
  else if (/weather/.test(q)) result=assistantResult('Weather','Weather Risk Trips','Trips with elevated local weather risk.',trips.filter((t)=>tripWeatherRisk(t)!=='Green').map((t)=>assistantTripCard(t,{Risk:weatherRiskLabel(tripWeatherRisk(t))})));
  else if (/cruise/.test(q)) result=assistantResult('Cruise','Cruise Timing Risk Trips','Trips mentioning a cruise ship or all-aboard timing for operational review.',trips.filter((t)=>/cruise|ship|all aboard/i.test(`${t.notes||''} ${t.tourType||''}`)).map((t)=>assistantTripCard(t,{Risk:'Review cruise timing'})));
  else if (/pre.?trip.*checklist|missing pre/.test(q)) result=assistantResult('Checklists','Trips Missing Pre Trip Checklist','Trips without a completed pre-trip checklist.',trips.filter((t)=>latestChecklistStatus(t,'Pre Trip')!=='Completed').map((t)=>assistantTripCard(t,{Checklist:latestChecklistStatus(t,'Pre Trip')})));
  else if (/post.?trip.*checklist|missing post/.test(q)) result=assistantResult('Checklists','Trips Missing Post Trip Checklist','Completed trips without a completed post-trip checklist.',trips.filter((t)=>t.status==='Completed'&&latestChecklistStatus(t,'Post Trip')!=='Completed').map((t)=>assistantTripCard(t,{Checklist:latestChecklistStatus(t,'Post Trip')})));
  else if (/fuel cost/.test(q)) { const [start,end]=assistantDateRange('month'), amount=trips.filter((t)=>t.tripDate>=start&&t.tripDate<=end).reduce((sum,t)=>sum+Number(t.totalFuelCost||0),0); result=assistantResult('Fuel','Fuel Cost This Month',`${money(amount)} in locally tracked trip fuel cost.`,[{title:'Monthly Fuel Cost',fields:{Period:`${formatDate(start)} – ${formatDate(end)}`,Total:money(amount)},action:assistantAction('Open Trips','trips')}]); }
  else if (/(revenue|most profitable vessel)/.test(q)) { const period=/week/.test(q)?'week':'month',[start,end]=assistantDateRange(period), relevant=trips.filter((t)=>t.tripDate>=start&&t.tripDate<=end); if(/most profitable vessel/.test(q)){const totals={};relevant.forEach((t)=>totals[t.vessel||'Unassigned']=(totals[t.vessel||'Unassigned']||0)+Number(t.tourPrice||0)-Number(t.totalFuelCost||0)-(t.payroll||calculateTripPayroll(t)).reduce((s,e)=>s+Number(e.amount||0),0));const best=Object.entries(totals).sort((a,b)=>b[1]-a[1])[0];result=assistantResult('Revenue','Most Profitable Vessel','Estimated profit uses local revenue, payroll, and fuel values.',best?[{title:best[0],fields:{'Estimated Profit':money(best[1]),Period:`${formatDate(start)} – ${formatDate(end)}`},action:assistantAction('Open Vessel','vessels')}]:[]);}else{const amount=relevant.reduce((sum,t)=>sum+Number(t.tourPrice||0),0);result=assistantResult('Revenue',`Revenue This ${period==='week'?'Week':'Month'}`,`${money(amount)} from visible trip revenue.`,[{title:'Revenue Summary',fields:{Period:`${formatDate(start)} – ${formatDate(end)}`,Revenue:money(amount),Trips:String(relevant.length)},action:assistantAction('Open Reports','reports')}]);} }
  else result=assistantResult('Trips','Try a Suggested Operations Question','I could not match that question yet. Use a suggested prompt or ask about trips, invoices, payroll, incidents, maintenance, revenue, fuel, weather, cruise timing, or checklists.',[]);
  if (!assistantAllowed(result.category)) result=assistantResult(result.category,'Query Not Available for This Role',`${role} does not have visibility for ${result.category.toLowerCase()} queries.`,[]);
  store.assistantQueryLog.unshift({id:makeId('assistant-query'),user:currentUserLabel(),query,category:result.category,resultCount:result.cards.length,at:new Date().toISOString()}); store.assistantQueryLog=store.assistantQueryLog.slice(0,100);
  addAudit('queried','Operations Assistant',query,{resultCategory:result.category,resultCount:result.cards.length}); saveStore(); return result;
}
function submitAssistantQuery(event) { event.preventDefault(); const query=new FormData(event.currentTarget).get('assistantQuery'); assistantState={query,result:runLocalAssistantQuery(query)}; renderOperationsAssistant(); }
function askOperations(query) { assistantState={query,result:runLocalAssistantQuery(query)}; renderOperationsAssistant(); }
function openAssistantAction(route,id='',date='') { if(date){store.calendarState.selectedDate=date;store.calendarState.view='day';saveStore();} renderRoute(route); if(id&&route==='incident-reports') openIncidentForm(id); else if(id&&crudConfig[route]) showForm(route,id); }
function renderAssistantCard(card) { return `<article class="assistant-result-card"><div><h4>${escapeHtml(card.title)}</h4><dl>${Object.entries(card.fields||{}).map(([k,v])=>`<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v||'—')}</dd></div>`).join('')}</dl></div>${card.action?`<button class="btn btn-primary btn-small" onclick="openAssistantAction('${card.action.route}','${card.action.id||''}','${card.action.date||''}')">${escapeHtml(card.action.label)}</button>`:''}</article>`; }
function renderOperationsAssistant() {
  const page=document.getElementById('page-operations-assistant'), result=assistantState.result;
  page.innerHTML=`<div class="page-stack assistant-page"><section class="card assistant-hero"><div><p class="eyebrow">Local rule-based assistant</p><h3>Operations Query</h3><p>Ask business questions using data already stored in this browser. No external AI service is connected and no app data leaves this device.</p></div><span class="badge green">Local Only</span></section><form class="card assistant-search" onsubmit="submitAssistantQuery(event)"><label for="assistantQuery">What do you need to know?</label><div><input id="assistantQuery" name="assistantQuery" type="search" value="${escapeHtml(assistantState.query)}" placeholder="Show trips needing captains." required><button class="btn btn-primary">Ask Operations</button></div></form><section class="assistant-prompts" aria-label="Suggested questions">${assistantSuggestedQuestions.map(([label,q])=>`<button class="assistant-chip" onclick="askOperations('${q.replace(/'/g,"\\'")}')">${escapeHtml(label)}</button>`).join('')}</section>${result?`<details class="card assistant-results" open><summary><div><p class="eyebrow">${escapeHtml(result.category)}</p><h3>${escapeHtml(result.title)}</h3><p>${escapeHtml(result.summary)}</p></div><span class="badge blue">${result.cards.length} result${result.cards.length===1?'':'s'}</span></summary><div class="assistant-result-list">${result.cards.length?result.cards.map(renderAssistantCard).join(''):'<p class="empty-state">No matching records are visible to your role.</p>'}</div></details>`:'<div class="card card-pad empty-state">Choose a suggested question or type your own operations question.</div>'}<details class="card assistant-readiness"><summary><div><h3>Future AI Readiness</h3><p>External AI remains disabled.</p></div><span class="chevron">⌄</span></summary><dl><div><dt>assistantProvider</dt><dd>${escapeHtml(store.assistantProvider)}</dd></div><div><dt>assistantApiStatus</dt><dd>${escapeHtml(store.assistantApiStatus)}</dd></div><div><dt>externalAiEnabled</dt><dd>${String(store.externalAiEnabled)}</dd></div><div><dt>lastAssistantSync</dt><dd>${escapeHtml(store.lastAssistantSync||'Never')}</dd></div><div><dt>assistantQueryLog</dt><dd>${store.assistantQueryLog.length} local entries</dd></div></dl></details></div>`;
}
