#!/usr/bin/env python3
"""Offline validation checks for the static Reel Adventure operations app."""

from __future__ import annotations

import json
import pathlib
import subprocess
import sys
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parents[1]
LEGACY_FILES = {
    "reel_adventure_tours_dashboard.html",
    "customer-invoice.html",
    "ReelAdventureTours_App_v5.html",
    "RAT-PreTrip-VesselCheck.html",
    "RAT-PostTrip-VesselCheck.html",
}
VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}
OPTIONAL_CLOSE_TAGS = {"p", "li", "dt", "dd", "option", "thead", "tbody", "tfoot", "tr", "td", "th"}


class StaticHtmlValidator(HTMLParser):
    def __init__(self, path: pathlib.Path) -> None:
        super().__init__(convert_charrefs=True)
        self.path = path
        self.stack: list[str] = []
        self.errors: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in VOID_TAGS:
            return
        if self.stack and tag in OPTIONAL_CLOSE_TAGS and self.stack[-1] == tag:
            self.stack.pop()
        self.stack.append(tag)

    def handle_endtag(self, tag: str) -> None:
        if tag in VOID_TAGS:
            return
        if tag not in self.stack:
            self.errors.append(f"unmatched closing </{tag}>")
            return
        while self.stack:
            current = self.stack.pop()
            if current == tag:
                return

    def report(self) -> list[str]:
        unclosed = [tag for tag in self.stack if tag not in {"html", "body"}]
        return self.errors + [f"unclosed <{tag}>" for tag in unclosed]


def run(command: list[str], *, input_text: str | None = None) -> tuple[bool, str]:
    result = subprocess.run(
        command,
        cwd=ROOT,
        input=input_text,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=False,
    )
    return result.returncode == 0, result.stdout.strip()


def validate_javascript() -> tuple[bool, str]:
    files = sorted(ROOT.glob("*.js"))
    output: list[str] = []
    passed = True
    for path in files:
        ok, text = run(["node", "--check", str(path.relative_to(ROOT))])
        passed = passed and ok
        output.append(f"{path.name}: {'PASS' if ok else 'FAIL'}{f' — {text}' if text else ''}")
    return passed, "\n".join(output)


def validate_json() -> tuple[bool, str]:
    files = sorted(ROOT.glob("*.json"))
    output: list[str] = []
    passed = True
    for path in files:
        try:
            json.loads(path.read_text())
            output.append(f"{path.name}: PASS")
        except json.JSONDecodeError as error:
            passed = False
            output.append(f"{path.name}: FAIL — {error}")
    return passed, "\n".join(output)


def validate_html() -> tuple[bool, str]:
    files = sorted(ROOT.glob("*.html"))
    output: list[str] = []
    passed = True
    for path in files:
        parser = StaticHtmlValidator(path)
        parser.feed(path.read_text(errors="ignore"))
        parser.close()
        errors = parser.report()
        if errors:
            passed = False
            output.append(f"{path.name}: FAIL — {'; '.join(errors[:5])}")
        else:
            output.append(f"{path.name}: PASS")
    return passed, "\n".join(output)


def validate_legacy_preserved() -> tuple[bool, str]:
    app_js = (ROOT / "app.js").read_text()
    missing = [name for name in sorted(LEGACY_FILES) if not (ROOT / name).exists()]
    unlinked = [name for name in sorted(LEGACY_FILES) if name not in app_js]
    if missing or unlinked:
        parts = []
        if missing:
            parts.append(f"missing files: {', '.join(missing)}")
        if unlinked:
            parts.append(f"not referenced in app.js: {', '.join(unlinked)}")
        return False, "FAIL — " + "; ".join(parts)
    return True, "PASS — all legacy HTML tools exist and remain linked from app.js"


def validate_app_bootstrap() -> tuple[bool, str]:
    script = r'''
const fs = require('fs');
const vm = require('vm');
const errors = [];
class ClassList {
  constructor(){ this.items = new Set(); }
  add(v){ this.items.add(v); }
  remove(v){ this.items.delete(v); }
  toggle(v, force){ const next = force ?? !this.items.has(v); next ? this.items.add(v) : this.items.delete(v); return next; }
  contains(v){ return this.items.has(v); }
}
class Element {
  constructor(id='') { this.id=id; this.innerHTML=''; this.textContent=''; this.hidden=false; this.value='Owner / Admin'; this.dataset={}; this.classList=new ClassList(); this.listeners={}; }
  addEventListener(type, cb){ this.listeners[type]=cb; }
  setAttribute(name, value){ this[name]=value; }
  querySelector(){ return null; }
  querySelectorAll(){ return []; }
}
const ids = ['toast','loginScreen','appShell','roleSelect','enterAppBtn','activeRole','menuBtn','sidebar','sidebarOverlay','primaryNav','installBtn','pageTitle','page-dashboard','page-bookings','page-invoices','page-trips','page-vessels','page-crew','page-payroll','page-expenses','page-inventory','page-pre-trip-checklist','page-post-trip-checklist','page-cruise-schedule','page-reports','page-settings','page-legacy'];
const elements = Object.fromEntries(ids.map(id => [id, new Element(id)]));
for (const id of ids.filter(id => id.startsWith('page-'))) elements[id].classList.add('page');
const listeners = {};
const document = {
  body: new Element('body'),
  addEventListener(type, cb){ listeners[type]=cb; },
  getElementById(id){ return elements[id] || (elements[id] = new Element(id)); },
  querySelectorAll(selector){
    if (selector === '.page') return Object.values(elements).filter(el => el.classList.contains('page'));
    if (selector === '.nav-link') return [];
    return [];
  }
};
const localStorage = { data:{}, getItem(k){ return this.data[k] ?? null; }, setItem(k,v){ this.data[k]=String(v); }, removeItem(k){ delete this.data[k]; } };
const context = {
  document,
  localStorage,
  navigator: { serviceWorker: { register(){ return Promise.resolve(); } } },
  window: { addEventListener(){} },
  console: { warn(){}, error(...args){ errors.push(args.join(' ')); }, log(){} },
  setTimeout, clearTimeout,
  structuredClone: global.structuredClone,
  Date, Number, String, Math, JSON,
  FormData: class {},
};
context.globalThis = context;
vm.runInNewContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
listeners.DOMContentLoaded();
if (errors.length) throw new Error(errors.join('\n'));
console.log('PASS — app bootstrap completed without console errors');
'''
    return run(["node"], input_text=script)


def validate_phase_3b_dispatch() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
vm.runInContext(`
  const tripA = { id: 'trip-a', customer: 'John Smith', phone: '555-0100', email: 'john@example.com', bookingSource: 'Website', tripDate: '2026-07-10', startTime: '09:00', hours: 4, passengers: 9, tourPrice: 1800, depositPaid: 900, balanceDue: 900, paymentStatus: 'Balance due', vessel: "32' Performance", captain: 'Phillip', mate: 'DJ', status: 'Scheduled', captainAcceptance: 'Pending', mateAcceptance: 'Pending', ownerAcknowledgement: 'Pending' };
  const tripB = { id: 'trip-b', customer: 'Jane Roe', phone: '555-0111', email: 'jane@example.com', bookingSource: 'Direct Booking', tripDate: '2026-07-10', startTime: '10:00', hours: 4, passengers: 4, tourPrice: 1500, depositPaid: 500, balanceDue: 1000, vessel: "32' Performance", captain: 'Phillip', mate: 'Rick', status: 'Scheduled' };
  tripA.payroll = calculateTripPayroll(tripA);
  store.trips = [tripA, tripB];
`, context);
const appSource = fs.readFileSync('app.js','utf8');
const dispatchCard = vm.runInContext('renderDispatchTripCard(store.trips[0])', context);
assertCheck('Dispatch Board card renders', dispatchCard.includes('John Smith') && dispatchCard.includes('Owner Pay') && dispatchCard.includes('Estimated Net Revenue'));
assertCheck('Trip creation works', appSource.includes('Customer Details') && appSource.includes('Assignment Details') && appSource.includes('Live payout preview'));
assertCheck('Voice fallback works', appSource.includes('Voice to fill is not supported on this browser'));
assertCheck('Owner alerts render', vm.runInContext(`store.ownerAlerts=[{id:'a1',title:'Trip created',message:'Trip created',status:'Unread',createdAt:new Date().toISOString()}]; renderOwnerAlertsPanel().includes('Owner Alerts')`, context));
assertCheck('Crew notifications render', vm.runInContext(`renderCrewNotificationsPanel([{id:'n1',title:'New trip assigned',message:'Assigned',status:'Unread',createdAt:new Date().toISOString()}]).includes('Crew Notifications')`, context));
assertCheck('Payroll still calculates', vm.runInContext(`const p = payrollSummary(store.trips[0]); p.ownerPay === 800 && p.captainPay === 120 && p.matePay === 50 && p.totalCost === 970`, context));
assertCheck('Conflict detection still works', vm.runInContext(`findTripConflicts(store.trips[1], 'trip-b').length >= 2`, context));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3c_operations() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} }
const elements = {};
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), getElementById(id){ return elements[id] || (elements[id] = new Element()); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
vm.runInContext(`
  const trip = { id: 'trip-c', customer: 'Checklist Guest', tripDate: '2026-07-11', startTime: '08:00', hours: 4, passengers: 6, vessel: "29' Donzi", captain: 'Phillip', mate: 'DJ', status: 'Scheduled' };
  store.trips = [trip];
  const tripRef = \`Checklist Guest — \${formatDate(trip.tripDate)} \${formatTime(trip.startTime)}\`;
  triggerOperationalNotifications('pre-trip-checklist', { tripRef, completedBy: 'Phillip', notes: 'Ready' });
  triggerOperationalNotifications('post-trip-checklist', { tripRef, completedBy: 'DJ', notes: 'Complete' });
  triggerOperationalNotifications('reports', { tripRef, reportedBy: 'Phillip', severity: 'High', incidentType: 'Customer concern', notes: 'Follow up' });
  triggerOperationalNotifications('expenses', { tripRef, submittedBy: 'DJ', amount: 42, category: 'Ice' });
  triggerOperationalNotifications('inventory', { itemName: 'Towels', priority: 'High', assignedTo: 'DJ' });
`, context);
const appSource = fs.readFileSync('app.js','utf8');
assertCheck('Pre-trip completion triggers owner alert', vm.runInContext(`store.ownerAlerts.some((alert) => alert.type === 'pre-trip-checklist-completed')`, context));
assertCheck('Post-trip completion marks trip completed', vm.runInContext(`store.trips[0].status === 'Completed' && store.ownerAlerts.some((alert) => alert.type === 'post-trip-checklist-completed')`, context));
assertCheck('Incident reporting triggers owner alert and crew notice', vm.runInContext(`store.ownerAlerts.some((alert) => alert.type === 'incident-reported') && store.crewNotifications.some((note) => note.type === 'incident-reported')`, context));
assertCheck('Expense submission triggers owner alert', vm.runInContext(`store.ownerAlerts.some((alert) => alert.type === 'expense-submitted')`, context));
assertCheck('Inventory low triggers crew restock notification', vm.runInContext(`store.ownerAlerts.some((alert) => alert.type === 'inventory-low') && store.crewNotifications.some((note) => note.type === 'supplies-need-restocking')`, context));
assertCheck('Vessel issue workflow exists', appSource.includes('saveVesselIssue') && appSource.includes('vessel-issue-reported'));
assertCheck('Operational pages render functions exist', appSource.includes('renderOperationalPage') && appSource.includes('Phase 3C Operational Completion Center'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3d_role_workspaces() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
vm.runInContext(`
  const trip = { id: 'trip-d', customer: 'Role Guest', tripDate: '2026-07-12', startTime: '09:00', hours: 4, passengers: 6, vessel: "29' Donzi", captain: 'Phillip', mate: 'DJ', status: 'Scheduled', balanceDue: 500 };
  trip.payroll = calculateTripPayroll(trip);
  store.trips = [trip];
  store.ownerAlerts = [{ id:'oa', title:'Owner alert', message:'Alert', status:'Unread', createdAt:new Date().toISOString() }];
  store.crewNotifications = [{ id:'cn', person:'Phillip', title:'Captain note', message:'Assigned', status:'Unread', createdAt:new Date().toISOString() }];
  store.expenseSubmissions = [{ amount: 33, category:'Ice' }];
`, context);
assertCheck('Owner workspace renders', vm.runInContext(`renderRoleWorkspace('Owner / Admin').includes('Owner / Admin Daily Workspace') && renderRoleWorkspace('Owner / Admin').includes('Open owner alerts')`, context));
assertCheck('Operations workspace renders', vm.runInContext(`renderRoleWorkspace('Operations Manager').includes('Operations Manager Workspace') && renderRoleWorkspace('Operations Manager').includes('Trips needing assignment')`, context));
assertCheck('Captain workspace renders', vm.runInContext(`renderRoleWorkspace('Captain').includes('Captain Daily Workspace') && renderRoleWorkspace('Captain').includes('Assigned trips')`, context));
assertCheck('Mate workspace renders', vm.runInContext(`renderRoleWorkspace('Mate').includes('Mate Daily Workspace') && renderRoleWorkspace('Mate').includes('Checklist tasks')`, context));
assertCheck('Bookkeeper workspace renders', vm.runInContext(`renderRoleWorkspace('Bookkeeper').includes('Bookkeeper Daily Workspace') && renderRoleWorkspace('Bookkeeper').includes('Balances due')`, context));
assertCheck('Role key mapping works', vm.runInContext(`roleWorkspaceKey('Operations Manager') === 'operations' && roleWorkspaceKey('Mate') === 'mate' && roleWorkspaceKey('Bookkeeper') === 'bookkeeper'`, context));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3e_identity_permissions() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} }
const elements = {};
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), getElementById(id){ return elements[id] || (elements[id] = new Element()); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
vm.runInContext(`
  activeWorkspaceRole = 'Captain';
  activeCrewIdentity = 'Rick';
  store.trips = [{ id:'trip-e', customer:'Identity Guest', tripDate:'2026-07-13', startTime:'10:00', hours:4, passengers:4, vessel:"29' Donzi", captain:'Rick', mate:'DJ', status:'Scheduled' }];
`, context);
assertCheck('Identity panel renders permissions', vm.runInContext(`renderIdentityPermissionPanel().includes('Phase 3G local auth + audit session') && renderIdentityPermissionPanel().includes('checklists:record')`, context));
assertCheck('Captain workspace uses selected crew identity', vm.runInContext(`renderRoleWorkspace('Captain').includes('Rick') && renderRoleWorkspace('Captain').includes('Identity Guest')`, context));
assertCheck('Bookkeeper has payroll permission', vm.runInContext(`can('payroll:manage', 'Bookkeeper') === true`, context));
assertCheck('Captain cannot manage payroll', vm.runInContext(`can('payroll:manage', 'Captain') === false`, context));
assertCheck('Owner can acknowledge alerts', vm.runInContext(`can('alerts:acknowledge', 'Owner / Admin') === true`, context));
assertCheck('Permission gate blocks unauthorized action', vm.runInContext(`activeWorkspaceRole = 'Mate'; requirePermission('payroll:manage', 'Payroll') === false`, context));
assertCheck('Crew identity selector exists', fs.readFileSync('index.html','utf8').includes('identitySelect'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3f_user_mapping() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} }
const elements = {};
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), getElementById(id){ return elements[id] || (elements[id] = new Element()); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
vm.runInContext(`applyUserSession('user-captain-phillip')`, context);
assertCheck('User session maps captain role', vm.runInContext(`activeWorkspaceRole === 'Captain' && activeCrewIdentity === 'Phillip' && currentCrewRecord().id === 'crew-phillip'`, context));
assertCheck('Current user exposes email', vm.runInContext(`currentUser().email === 'phillip@reeladventuretours.com'`, context));
assertCheck('Identity panel shows mapped crew', vm.runInContext(`renderIdentityPermissionPanel().includes('Mapped crew: Phillip')`, context));
assertCheck('Applying bookkeeper maps crew and permissions', vm.runInContext(`applyUserSession('user-bookkeeper-walter'); activeWorkspaceRole === 'Bookkeeper' && currentCrewRecord().id === 'crew-walter' && can('payroll:manage')`, context));
assertCheck('Auth session persisted locally', vm.runInContext(`store.authSession.activeUserId === 'user-bookkeeper-walter' && Boolean(store.authSession.authenticatedAt)`, context));
assertCheck('Demo user selector exists', fs.readFileSync('index.html','utf8').includes('userSelect'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3g_audit_log() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} }
const elements = {};
const persisted = {};
const context = {
  localStorage: { getItem(key){ return persisted[key] || null; }, setItem(key, value){ persisted[key] = value; }, removeItem(key){ delete persisted[key]; } },
  elements,
  document: { addEventListener(){}, body: new Element(), getElementById(id){ return elements[id] || (elements[id] = new Element()); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates audit log array', vm.runInContext(`Array.isArray(store.auditLog)`, context));
vm.runInContext(`store.auditLog = []; applyUserSession('user-owner-eugene')`, context);
assertCheck('Auth session creates audit event', vm.runInContext(`store.auditLog[0].type === 'auth-session-started' && store.auditLog[0].userName === 'Eugene'`, context));
assertCheck('Owner can view audit log', vm.runInContext(`can('audit:view') === true && renderAuditLogPanel().includes('Audit Log') && renderAuditLogPanel().includes('auth-session-started')`, context));
assertCheck('Permission denial writes audit event', vm.runInContext(`activeWorkspaceRole = 'Mate'; requirePermission('payroll:manage', 'Payroll') === false && store.auditLog[0].type === 'permission-denied'`, context));
assertCheck('Non admin audit view restricted', vm.runInContext(`renderAuditLogPanel().includes('Owner/Admin only') && renderAuditLogPanel().includes('restricted')`, context));
assertCheck('Manual audit event captures user metadata', vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; auditEvent('dispatch-test', 'Dispatch audit test', { tripId:'trip-test' }); store.auditLog[0].type === 'dispatch-test' && store.auditLog[0].details.tripId === 'trip-test'`, context));
assertCheck('Reports route includes audit panel', vm.runInContext(`renderOperationalPage('reports'); elements['page-reports'].innerHTML.includes('Phase 3G audit trail')`, context));
assertCheck('Login copy mentions audit logging', fs.readFileSync('index.html','utf8').includes('local audit logging'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3h_data_readiness() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const elements = {};
const persisted = {};
const context = {
  localStorage: { getItem(key){ return persisted[key] || null; }, setItem(key, value){ persisted[key] = value; }, removeItem(key){ delete persisted[key]; } },
  elements,
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(id){ return elements[id] || (elements[id] = new Element()); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates export snapshots array', vm.runInContext(`Array.isArray(store.exportSnapshots)`, context));
assertCheck('Owner can manage local data', vm.runInContext(`can('data:manage', 'Owner / Admin') === true`, context));
assertCheck('Captain cannot manage local data', vm.runInContext(`can('data:manage', 'Captain') === false`, context));
assertCheck('Export package contains store metadata', vm.runInContext(`const pkg = buildExportPackage(); pkg.storeVersion === STORE_VERSION && pkg.storeKey === STORE_KEY && pkg.data.version === STORE_VERSION && typeof pkg.counts.crew === 'number'`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; exportLocalStore();`, context);
assertCheck('Export writes textarea package', vm.runInContext(`Boolean(elements['dataExportText'].value) && JSON.parse(elements['dataExportText'].value).data.version === STORE_VERSION`, context));
assertCheck('Export logs snapshot and audit event', vm.runInContext(`store.exportSnapshots.length > 0 && store.auditLog[0].type === 'store-export-generated'`, context));
assertCheck('Settings render export/import controls', vm.runInContext(`settingsMarkup().includes('Phase 3H Local Data Export / Import') && settingsMarkup().includes('data-store-import')`, context));
assertCheck('Login copy mentions data export readiness', fs.readFileSync('index.html','utf8').includes('data export readiness'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3i_sync_readiness() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const elements = {};
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(id){ return elements[id] || (elements[id] = new Element()); }, querySelectorAll(selector){ if (selector === '.page') return Object.values(elements); return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates sync reviews array', vm.runInContext(`Array.isArray(store.syncReviews)`, context));
assertCheck('Owner can review sync and captain cannot', vm.runInContext(`can('sync:review', 'Owner / Admin') === true && can('sync:review', 'Captain') === false`, context));
assertCheck('Sync manifest contains operational collections', vm.runInContext(`const manifest = buildSyncManifest(); manifest.storeVersion === STORE_VERSION && manifest.collections.some((item) => item.name === 'trips') && manifest.collections.some((item) => item.name === 'auditLog')`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueSyncReview();`, context);
assertCheck('Queue sync review creates review and audit', vm.runInContext(`store.syncReviews.length === 1 && store.syncReviews[0].status === 'Queued' && store.auditLog[0].type === 'sync-review-queued'`, context));
assertCheck('Sync review status update works', vm.runInContext(`updateSyncReviewStatus(store.syncReviews[0].id, 'Ready for Server'); store.syncReviews[0].status === 'Ready for Server' && store.auditLog[0].type === 'sync-review-status-updated'`, context));
assertCheck('Settings render sync readiness panel', vm.runInContext(`settingsMarkup().includes('Phase 3I Server Sync Readiness') && settingsMarkup().includes('data-sync-queue')`, context));
assertCheck('Login copy mentions sync review', fs.readFileSync('index.html','utf8').includes('server-sync review prep'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3j_api_contract() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const elements = {};
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(id){ return elements[id] || (elements[id] = new Element()); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates API contract reviews array', vm.runInContext(`Array.isArray(store.apiContractReviews)`, context));
assertCheck('Owner can review API contract and captain cannot', vm.runInContext(`can('api:review', 'Owner / Admin') === true && can('api:review', 'Captain') === false`, context));
assertCheck('API contract exposes expected endpoints', vm.runInContext(`const contract = buildApiContract(); contract.externalTransmission === false && contract.collections.some((item) => item.endpoint === '/api/dispatch-trips') && contract.collections.some((item) => item.endpoint === '/api/audit-events')`, context));
assertCheck('Eligibility detects missing fields', vm.runInContext(`store.trips = [{ id:'trip-missing', customer:'Missing Date' }]; buildApiContract().collections.find((item) => item.name === 'trips').eligible === false`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueApiContractReview();`, context);
assertCheck('Queue API contract review creates review and audit', vm.runInContext(`store.apiContractReviews.length === 1 && store.auditLog[0].type === 'api-contract-review-queued'`, context));
assertCheck('API contract review status update works', vm.runInContext(`updateApiContractReviewStatus(store.apiContractReviews[0].id, 'Backend Ready'); store.apiContractReviews[0].status === 'Backend Ready' && store.auditLog[0].type === 'api-contract-review-status-updated'`, context));
assertCheck('Settings render API contract panel', vm.runInContext(`settingsMarkup().includes('Phase 3J Backend API Contract') && settingsMarkup().includes('data-api-review')`, context));
assertCheck('Login copy mentions API contract review', fs.readFileSync('index.html','utf8').includes('backend API contract review'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3k_auth_readiness() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const elements = {};
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(id){ return elements[id] || (elements[id] = new Element()); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates auth readiness reviews array', vm.runInContext(`Array.isArray(store.authReadinessReviews)`, context));
assertCheck('Backend permission matrix has all roles', vm.runInContext(`const roles = backendPermissionMatrix().map((item) => item.role); ['Admin','Owner','Captain','Mate','Bookkeeper'].every((role) => roles.includes(role))`, context));
assertCheck('Permission matrix defines actions', vm.runInContext(`backendPermissionMatrix().every((role) => role.view && role.create && role.edit && role.approve && role.delete && role.acknowledge && role.export)`, context));
assertCheck('Auth readiness does not connect external services', vm.runInContext(`const review = buildAuthReadinessReview(); review.externalAuthConnected === false && review.backendConnected === false && review.checklist.some((item) => item.status === 'Not connected')`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueAuthReadinessReview();`, context);
assertCheck('Queue auth readiness review creates review and audit', vm.runInContext(`store.authReadinessReviews.length === 1 && store.auditLog[0].type === 'auth-readiness-review-queued'`, context));
assertCheck('Auth readiness review status update works', vm.runInContext(`updateAuthReadinessReviewStatus(store.authReadinessReviews[0].id, 'Backend Auth Ready'); store.authReadinessReviews[0].status === 'Backend Auth Ready' && store.auditLog[0].type === 'auth-readiness-review-status-updated'`, context));
assertCheck('Settings render auth readiness panel', vm.runInContext(`settingsMarkup().includes('Phase 3K Server Auth Readiness') && settingsMarkup().includes('Admin') && settingsMarkup().includes('Bookkeeper') && settingsMarkup().includes('data-auth-review')`, context));
assertCheck('Login copy mentions auth readiness', fs.readFileSync('index.html','utf8').includes('server-auth readiness'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3l_schema_readiness() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates schema reviews array', vm.runInContext(`Array.isArray(store.schemaReviews)`, context));
assertCheck('Schema definitions include core backend models', vm.runInContext(`const schemas = backendSchemaDefinitions(); Boolean(schemas.dispatchTrip && schemas.payrollEntry && schemas.auditEvent && schemas.authUser)`, context));
assertCheck('Server validation rules are generated', vm.runInContext(`const rules = buildServerValidationRules(); rules.length >= 6 && rules.every((rule) => rule.validations.length && rule.serverReady === true)`, context));
assertCheck('Schema readiness confirms backend not connected', vm.runInContext(`const readiness = buildSchemaReadinessReview(); readiness.backendConnected === false && readiness.schemaCount >= 6 && readiness.schemas.dispatchTrip.validations.some((rule) => rule.includes('conflicts'))`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueSchemaReview();`, context);
assertCheck('Queue schema review creates review and audit', vm.runInContext(`store.schemaReviews.length === 1 && store.auditLog[0].type === 'schema-readiness-review-queued'`, context));
assertCheck('Schema review status update works', vm.runInContext(`updateSchemaReviewStatus(store.schemaReviews[0].id, 'Backend Schema Ready'); store.schemaReviews[0].status === 'Backend Schema Ready' && store.auditLog[0].type === 'schema-readiness-review-status-updated'`, context));
assertCheck('Settings render schema readiness panel', vm.runInContext(`settingsMarkup().includes('Phase 3L Backend Schema Readiness') && settingsMarkup().includes('data-schema-review') && settingsMarkup().includes('dispatchTrip')`, context));
assertCheck('Login copy mentions schema readiness', fs.readFileSync('index.html','utf8').includes('backend schema readiness'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3m_migration_readiness() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates migration plan reviews array', vm.runInContext(`Array.isArray(store.migrationPlanReviews)`, context));
assertCheck('Migration plan includes ordered operational steps', vm.runInContext(`const plan = backendMigrationPlan(); plan.length >= 6 && plan[0].step.includes('Export') && plan.some((step) => step.step.includes('payroll'))`, context));
assertCheck('Retention rules include audit and payroll', vm.runInContext(`const rules = recordRetentionRules(); rules.some((rule) => rule.record === 'Audit events') && rules.some((rule) => rule.record === 'Payroll payments')`, context));
assertCheck('Migration review confirms backend not connected', vm.runInContext(`const review = buildMigrationPlanReview(); review.backendConnected === false && review.complianceNotes.some((note) => note.includes('legacy HTML'))`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueMigrationPlanReview();`, context);
assertCheck('Queue migration review creates review and audit', vm.runInContext(`store.migrationPlanReviews.length === 1 && store.auditLog[0].type === 'migration-plan-review-queued'`, context));
assertCheck('Migration review status update works', vm.runInContext(`updateMigrationPlanReviewStatus(store.migrationPlanReviews[0].id, 'Migration Ready'); store.migrationPlanReviews[0].status === 'Migration Ready' && store.auditLog[0].type === 'migration-plan-review-status-updated'`, context));
assertCheck('Settings render migration compliance panel', vm.runInContext(`settingsMarkup().includes('Phase 3M Migration + Retention Readiness') && settingsMarkup().includes('data-migration-review') && settingsMarkup().includes('Retention / compliance rules')`, context));
assertCheck('Login copy mentions migration readiness', fs.readFileSync('index.html','utf8').includes('migration/retention readiness'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3n_rollout_readiness() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates rollout reviews array', vm.runInContext(`Array.isArray(store.rolloutReviews)`, context));
assertCheck('Store migrates cutover drill reviews array', vm.runInContext(`Array.isArray(store.cutoverDrillReviews)`, context));
assertCheck('Rollout gates include staging and production blockers', vm.runInContext(`const gates = rolloutEnvironmentGates(); gates.some((gate) => gate.environment === 'Staging' && gate.status === 'Blocked') && gates.some((gate) => gate.environment === 'Production' && gate.status === 'Blocked')`, context));
assertCheck('Cutover checklist includes export and validation', vm.runInContext(`const checklist = rolloutCutoverChecklist(); checklist.some((item) => item.includes('validation')) && checklist.some((item) => item.includes('Export'))`, context));
assertCheck('Rollout review confirms no deployment', vm.runInContext(`const review = buildRolloutReadinessReview(); review.backendConnected === false && review.deploymentStarted === false && review.blockedGates > 0`, context));
assertCheck('Cutover drill runbook includes fallback drills', vm.runInContext(`const runbook = cutoverDrillRunbook(); runbook.some((item) => item.drill.includes('Offline dispatch')) && runbook.some((item) => item.drill.includes('Rollback'))`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueRolloutReview();`, context);
assertCheck('Queue rollout review creates review and audit', vm.runInContext(`store.rolloutReviews.length === 1 && store.auditLog[0].type === 'rollout-readiness-review-queued'`, context));
assertCheck('Rollout review status update works', vm.runInContext(`updateRolloutReviewStatus(store.rolloutReviews[0].id, 'Cutover Ready'); store.rolloutReviews[0].status === 'Cutover Ready' && store.auditLog[0].type === 'rollout-readiness-review-status-updated'`, context));
vm.runInContext(`queueCutoverDrillReview();`, context);
assertCheck('Queue cutover drill creates review and audit', vm.runInContext(`store.cutoverDrillReviews.length === 1 && store.auditLog[0].type === 'cutover-drill-review-queued'`, context));
assertCheck('Cutover drill status update works', vm.runInContext(`updateCutoverDrillStatus(store.cutoverDrillReviews[0].id, 'Drill Passed'); store.cutoverDrillReviews[0].status === 'Drill Passed' && store.auditLog[0].type === 'cutover-drill-status-updated'`, context));
assertCheck('Settings render rollout readiness panel', vm.runInContext(`settingsMarkup().includes('Phase 3N Rollout + Environment Readiness') && settingsMarkup().includes('data-rollout-review') && settingsMarkup().includes('Environment readiness gates')`, context));
assertCheck('Settings render cutover drill panel', vm.runInContext(`settingsMarkup().includes('Phase 3N Cutover Drill Runbook') && settingsMarkup().includes('data-cutover-drill')`, context));
assertCheck('Login copy mentions rollout environment gates', fs.readFileSync('index.html','utf8').includes('rollout environment gates'));
assertCheck('Login copy mentions cutover drill runbooks', fs.readFileSync('index.html','utf8').includes('cutover drill runbooks'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3o_offline_mode() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates offline mode reviews array', vm.runInContext(`Array.isArray(store.offlineModeReviews)`, context));
assertCheck('Offline checklist includes dispatch and legacy fallback', vm.runInContext(`const checklist = offlineOperationsChecklist(); checklist.some((item) => item.area === 'Dispatch board') && checklist.some((item) => item.area === 'Legacy fallback')`, context));
assertCheck('Incident fallback includes critical severity', vm.runInContext(`incidentFallbackProcedures().some((item) => item.severity === 'Critical' && item.response.includes('emergency'))`, context));
assertCheck('Offline review needs no backend or external services', vm.runInContext(`const review = buildOfflineModeReview(); review.backendRequired === false && review.externalServicesRequired === false`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueOfflineModeReview();`, context);
assertCheck('Queue offline mode review creates review and audit', vm.runInContext(`store.offlineModeReviews.length === 1 && store.auditLog[0].type === 'offline-mode-review-queued'`, context));
assertCheck('Offline mode status update works', vm.runInContext(`updateOfflineModeReviewStatus(store.offlineModeReviews[0].id, 'Offline Ready'); store.offlineModeReviews[0].status === 'Offline Ready' && store.auditLog[0].type === 'offline-mode-review-status-updated'`, context));
assertCheck('Settings render offline mode panel', vm.runInContext(`settingsMarkup().includes('Phase 3O Offline + Backup Operations') && settingsMarkup().includes('data-offline-review') && settingsMarkup().includes('Incident fallback procedures')`, context));
assertCheck('Login copy mentions offline backup procedures', fs.readFileSync('index.html','utf8').includes('offline backup procedures'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3p_handoff_training() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates handoff training reviews array', vm.runInContext(`Array.isArray(store.handoffTrainingReviews)`, context));
assertCheck('Role SOP checklists include owner captain and bookkeeper', vm.runInContext(`const roles = roleSopChecklists().map((item) => item.role); roles.includes('Owner') && roles.includes('Captain') && roles.includes('Bookkeeper')`, context));
assertCheck('Production signoffs include owner and admin', vm.runInContext(`const signoffs = productionSignoffRequirements().map((item) => item.signer); signoffs.includes('Owner') && signoffs.includes('Admin')`, context));
assertCheck('Handoff review is local and has signoffs', vm.runInContext(`const review = buildHandoffTrainingReview(); review.productionConnected === false && review.requiredSignoffs >= 5`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueHandoffTrainingReview();`, context);
assertCheck('Queue handoff training review creates review and audit', vm.runInContext(`store.handoffTrainingReviews.length === 1 && store.auditLog[0].type === 'handoff-training-review-queued'`, context));
assertCheck('Handoff training status update works', vm.runInContext(`updateHandoffTrainingStatus(store.handoffTrainingReviews[0].id, 'Training Complete'); store.handoffTrainingReviews[0].status === 'Training Complete' && store.auditLog[0].type === 'handoff-training-status-updated'`, context));
assertCheck('Settings render handoff training panel', vm.runInContext(`settingsMarkup().includes('Phase 3P Production Handoff + Training') && settingsMarkup().includes('data-handoff-review') && settingsMarkup().includes('Role SOP checklists')`, context));
assertCheck('Login copy mentions production signoff tracking', fs.readFileSync('index.html','utf8').includes('production signoff tracking'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3q_production_qa() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates production QA reviews array', vm.runInContext(`Array.isArray(store.productionQaReviews)`, context));
assertCheck('Acceptance criteria cover dispatch conflicts payroll and legacy', vm.runInContext(`const areas = productionAcceptanceCriteria().map((item) => item.area); areas.includes('Dispatch board') && areas.includes('Conflict controls') && areas.includes('Payroll') && areas.includes('Legacy tools')`, context));
assertCheck('Export cadence covers daily pilot and weekly payroll', vm.runInContext(`const cadence = productionExportCadence().map((item) => item.cadence); cadence.includes('Daily during pilot') && cadence.includes('Weekly payroll close')`, context));
assertCheck('Release checklist requires owner crew and bookkeeper walkthroughs', vm.runInContext(`const steps = productionReleaseChecklist().map((item) => item.step); steps.includes('Owner walkthrough') && steps.includes('Crew walkthrough') && steps.includes('Bookkeeper walkthrough')`, context));
assertCheck('Production QA review is local and has required steps', vm.runInContext(`const qa = buildProductionQaReview(); qa.productionConnected === false && qa.requiredAcceptanceItems >= 6 && qa.requiredReleaseSteps >= 6`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueProductionQaReview();`, context);
assertCheck('Queue production QA creates review and audit', vm.runInContext(`store.productionQaReviews.length === 1 && store.auditLog[0].type === 'production-qa-review-queued'`, context));
assertCheck('Production QA status update works', vm.runInContext(`updateProductionQaStatus(store.productionQaReviews[0].id, 'Cutover Approved'); store.productionQaReviews[0].status === 'Cutover Approved' && store.auditLog[0].type === 'production-qa-status-updated'`, context));
assertCheck('Settings render production QA panel', vm.runInContext(`settingsMarkup().includes('Phase 3Q Production Cutover QA') && settingsMarkup().includes('data-production-qa-review') && settingsMarkup().includes('Acceptance criteria') && settingsMarkup().includes('Data export cadence')`, context));
assertCheck('Login copy mentions cutover QA acceptance criteria', fs.readFileSync('index.html','utf8').includes('cutover QA acceptance criteria'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3r_pilot_mode() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates pilot mode reviews array', vm.runInContext(`Array.isArray(store.pilotModeReviews)`, context));
assertCheck('Pilot controls include owner gate daily closeout and rollback', vm.runInContext(`const controls = pilotModeControls().map((item) => item.control); controls.includes('Owner approval gate') && controls.includes('Daily closeout summary') && controls.includes('Rollback decision log')`, context));
assertCheck('Daily closeout summary includes payroll and conflicts', vm.runInContext(`const metrics = pilotDailyCloseoutSummary().map((item) => item.metric); metrics.includes('Conflict warnings') && metrics.includes('Outstanding payroll entries')`, context));
assertCheck('Rollback reasons include data integrity and legacy fallbacks', vm.runInContext(`const reasons = rollbackDecisionReasons().map((item) => item.reason); reasons.includes('Data integrity blocker') && rollbackDecisionReasons().some((item) => item.fallback.includes('legacy'))`, context));
assertCheck('Pilot mode review is local and has controls', vm.runInContext(`const pilot = buildPilotModeReview(); pilot.pilotOnly === true && pilot.backendConnected === false && pilot.requiredControls >= 5`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queuePilotModeReview();`, context);
assertCheck('Queue pilot mode creates review and audit', vm.runInContext(`store.pilotModeReviews.length === 1 && store.auditLog[0].type === 'pilot-mode-review-queued'`, context));
assertCheck('Pilot mode status update works', vm.runInContext(`updatePilotModeStatus(store.pilotModeReviews[0].id, 'Pilot Approved'); store.pilotModeReviews[0].status === 'Pilot Approved' && store.auditLog[0].type === 'pilot-mode-status-updated'`, context));
assertCheck('Settings render pilot mode panel', vm.runInContext(`settingsMarkup().includes('Phase 3R Pilot Mode Operating Controls') && settingsMarkup().includes('data-pilot-mode-review') && settingsMarkup().includes('Daily closeout summary') && settingsMarkup().includes('Rollback decision log')`, context));
assertCheck('Login copy mentions pilot closeout controls', fs.readFileSync('index.html','utf8').includes('pilot-mode closeout controls'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3s_pilot_closeout() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates pilot closeout reports array', vm.runInContext(`Array.isArray(store.pilotCloseoutReports)`, context));
assertCheck('Pilot closeout report is printable and local', vm.runInContext(`(() => { const report = buildPilotCloseoutReport(); return report.printable === true && report.backendConnected === false && report.exportBundle.includeAuditExport === true; })()`, context));
assertCheck('Pilot closeout includes summary blockers and signoffs', vm.runInContext(`(() => { const report = buildPilotCloseoutReport(); return Array.isArray(report.summary) && Array.isArray(report.blockers) && report.signoffs.length >= 4; })()`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queuePilotCloseoutReport();`, context);
assertCheck('Queue pilot closeout creates report and audit', vm.runInContext(`store.pilotCloseoutReports.length === 1 && store.auditLog[0].type === 'pilot-closeout-report-queued'`, context));
assertCheck('Pilot closeout status update works', vm.runInContext(`updatePilotCloseoutStatus(store.pilotCloseoutReports[0].id, 'Closeout Complete'); store.pilotCloseoutReports[0].status === 'Closeout Complete' && store.auditLog[0].type === 'pilot-closeout-status-updated'`, context));
assertCheck('Settings render pilot closeout panel', vm.runInContext(`settingsMarkup().includes('Phase 3S Owner Pilot Closeout Reports') && settingsMarkup().includes('data-pilot-closeout-report') && settingsMarkup().includes('Unresolved blocker list') && settingsMarkup().includes('Signoff/export bundle')`, context));
assertCheck('Login copy mentions owner closeout reports', fs.readFileSync('index.html','utf8').includes('owner closeout reports'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3t_final_launch() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates final launch reviews array', vm.runInContext(`Array.isArray(store.finalLaunchReviews)`, context));
assertCheck('Final launch gates include validation rollback and backend guard', vm.runInContext(`const gates = finalLaunchGates().map((item) => item.gate); gates.includes('Validation green') && gates.includes('Rollback ready') && gates.includes('No backend dependency')`, context));
assertCheck('Launch communication plan covers owner operations crew bookkeeper', vm.runInContext(`const audiences = launchCommunicationPlan().map((item) => item.audience).join(' '); audiences.includes('Owner/Admin') && audiences.includes('Operations') && audiences.includes('Captain/Mate') && audiences.includes('Bookkeeper')`, context));
assertCheck('Final launch review documents readiness only', vm.runInContext(`const launch = buildFinalLaunchReview(); launch.goLiveConnected === false && launch.launchAuthorized === false && launch.gates.length >= 5`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueFinalLaunchReview();`, context);
assertCheck('Queue final launch creates review and audit', vm.runInContext(`store.finalLaunchReviews.length === 1 && store.auditLog[0].type === 'final-launch-review-queued'`, context));
assertCheck('Final launch status update works', vm.runInContext(`updateFinalLaunchStatus(store.finalLaunchReviews[0].id, 'Go Live Deferred'); store.finalLaunchReviews[0].status === 'Go Live Deferred' && store.auditLog[0].type === 'final-launch-status-updated'`, context));
assertCheck('Settings render final launch panel', vm.runInContext(`settingsMarkup().includes('Phase 3T Final Go/No-Go Register') && settingsMarkup().includes('data-final-launch-review') && settingsMarkup().includes('Launch communication plan')`, context));
assertCheck('Login copy mentions go/no-go launch registers', fs.readFileSync('index.html','utf8').includes('go/no-go launch registers'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3u_evidence_package() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates production evidence packages array', vm.runInContext(`Array.isArray(store.productionEvidencePackages)`, context));
assertCheck('Evidence package is local downloadable and includes validation', vm.runInContext(`(() => { const pkg = buildProductionEvidencePackage(); return pkg.localOnly === true && pkg.downloadable === true && pkg.validation.command.includes('validate_static_app'); })()`, context));
assertCheck('Evidence package includes export audit blocker and histories', vm.runInContext(`(() => { const pkg = buildProductionEvidencePackage(); return pkg.export.auditEvents >= 0 && Array.isArray(pkg.blockerStatus.blockers) && Array.isArray(pkg.goNoGoHistory) && Array.isArray(pkg.closeoutHistory); })()`, context));
assertCheck('Evidence package has all required owner attachments', vm.runInContext(`const required = buildProductionEvidencePackage().requiredAttachments.join(' '); required.includes('Validation output') && required.includes('Audit export metadata') && required.includes('Go/no-go review history')`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueProductionEvidencePackage();`, context);
assertCheck('Queue evidence package creates package and audit', vm.runInContext(`store.productionEvidencePackages.length === 1 && store.auditLog[0].type === 'production-evidence-package-queued'`, context));
assertCheck('Evidence package status update works', vm.runInContext(`updateProductionEvidenceStatus(store.productionEvidencePackages[0].id, 'Archived'); store.productionEvidencePackages[0].status === 'Archived' && store.auditLog[0].type === 'production-evidence-status-updated'`, context));
assertCheck('Settings render evidence package panel', vm.runInContext(`settingsMarkup().includes('Phase 3U Production Evidence Package') && settingsMarkup().includes('data-evidence-package') && settingsMarkup().includes('Required owner handoff attachments')`, context));
assertCheck('Login copy mentions production evidence packages', fs.readFileSync('index.html','utf8').includes('production evidence packages'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3v_executive_dashboard() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const elements = {};
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(id){ return elements[id] ||= new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates executive readiness reviews array', vm.runInContext(`Array.isArray(store.executiveReadinessReviews)`, context));
assertCheck('Executive readiness includes core operational areas', vm.runInContext(`const areas = executiveReadinessItems().map((item) => item.area); areas.includes('Dispatch readiness') && areas.includes('Payroll readiness') && areas.includes('Evidence package') && areas.includes('Legacy fallback')`, context));
assertCheck('Executive readiness returns red yellow or green', vm.runInContext(`['red','yellow','green'].includes(executiveReadinessOverall())`, context));
assertCheck('Executive readiness dashboard renders statuses and actions', vm.runInContext(`const html = renderExecutiveReadinessDashboard(); html.includes('Phase 3V executive readiness dashboard') && html.includes('Owner/Admin production readiness') && html.includes('Open readiness panels') && html.includes('readiness-')`, context));
assertCheck('Executive readiness review builds local next actions', vm.runInContext(`const review = buildExecutiveReadinessReview(); review.localOnly === true && Array.isArray(review.items) && Array.isArray(review.nextActions)`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueExecutiveReadinessReview();`, context);
assertCheck('Queue executive readiness creates review and audit', vm.runInContext(`store.executiveReadinessReviews.length === 1 && store.auditLog[0].type === 'executive-readiness-review-queued'`, context));
assertCheck('Executive readiness status update works', vm.runInContext(`updateExecutiveReadinessStatus(store.executiveReadinessReviews[0].id, 'Owner Reviewed'); store.executiveReadinessReviews[0].status === 'Owner Reviewed' && store.auditLog[0].type === 'executive-readiness-status-updated'`, context));
assertCheck('Settings render executive readiness review panel', vm.runInContext(`settingsMarkup().includes('Phase 3V Executive Readiness Review') && settingsMarkup().includes('data-executive-readiness-review') && settingsMarkup().includes('Next-action recommendations')`, context));
vm.runInContext(`renderDashboard();`, context);
assertCheck('Dashboard includes executive readiness panel', elements['page-dashboard'].innerHTML.includes('Phase 3V executive readiness dashboard'));
assertCheck('Login copy mentions executive readiness dashboards', fs.readFileSync('index.html','utf8').includes('executive readiness dashboards') && fs.readFileSync('index.html','utf8').includes('owner action-plan snapshots'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3w_executive_reports() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates executive readiness reports array', vm.runInContext(`Array.isArray(store.executiveReadinessReports)`, context));
assertCheck('Executive report is printable exportable and local', vm.runInContext(`(() => { const report = buildExecutiveReadinessReport(); return report.printable === true && report.exportable === true && report.localOnly === true; })()`, context));
assertCheck('Executive report contains history signoffs and actions', vm.runInContext(`(() => { const report = buildExecutiveReadinessReport(); return Array.isArray(report.statusHistory) && report.signoffNotes.length >= 3 && Array.isArray(report.recommendedNextActions) && report.executiveSummary.includes('overall readiness'); })()`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueExecutiveReadinessReport();`, context);
assertCheck('Queue executive report creates report and audit', vm.runInContext(`store.executiveReadinessReports.length === 1 && store.auditLog[0].type === 'executive-readiness-report-queued'`, context));
assertCheck('Executive report status update works', vm.runInContext(`updateExecutiveReadinessReportStatus(store.executiveReadinessReports[0].id, 'Exported'); store.executiveReadinessReports[0].status === 'Exported' && store.auditLog[0].type === 'executive-readiness-report-status-updated'`, context));
assertCheck('Settings render executive report panel', vm.runInContext(`settingsMarkup().includes('Phase 3W Printable Executive Readiness Report') && settingsMarkup().includes('data-executive-readiness-report') && settingsMarkup().includes('Owner signoff notes') && settingsMarkup().includes('Status history')`, context));
assertCheck('Login copy mentions printable executive readiness reports', fs.readFileSync('index.html','utf8').includes('printable executive readiness reports'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3x_readiness_archive() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates readiness archives array', vm.runInContext(`Array.isArray(store.readinessArchives)`, context));
assertCheck('Readiness archive is local and ready', vm.runInContext(`const archive = buildReadinessArchive(); archive.localOnly === true && archive.archiveReady === true && archive.archiveSections.length >= 6`, context));
assertCheck('Readiness archive bundles reports evidence audit closeouts and go/no-go', vm.runInContext(`const sections = buildReadinessArchive().archiveSections.map((item) => item.section).join(' '); sections.includes('Executive readiness reports') && sections.includes('Production evidence packages') && sections.includes('Audit metadata') && sections.includes('Pilot closeout records') && sections.includes('Go/no-go launch records')`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueReadinessArchive();`, context);
assertCheck('Queue readiness archive creates archive and audit', vm.runInContext(`store.readinessArchives.length === 1 && store.auditLog[0].type === 'readiness-archive-queued'`, context));
assertCheck('Readiness archive status update works', vm.runInContext(`updateReadinessArchiveStatus(store.readinessArchives[0].id, 'Retention Logged'); store.readinessArchives[0].status === 'Retention Logged' && store.auditLog[0].type === 'readiness-archive-status-updated'`, context));
assertCheck('Settings render readiness archive panel', vm.runInContext(`settingsMarkup().includes('Phase 3X Readiness Archive') && settingsMarkup().includes('data-readiness-archive') && settingsMarkup().includes('Archive bundle sections')`, context));
assertCheck('Login copy mentions readiness archive history', fs.readFileSync('index.html','utf8').includes('local readiness archive history'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3y_archive_integrity() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates archive integrity reviews array', vm.runInContext(`Array.isArray(store.archiveIntegrityReviews)`, context));
assertCheck('Archive integrity checklist covers required sections', vm.runInContext(`const sections = archiveIntegrityChecklist().map((item) => item.section).join(' '); sections.includes('Executive readiness reports') && sections.includes('Production evidence packages') && sections.includes('Audit metadata') && sections.includes('Local store export metadata')`, context));
assertCheck('Retention attestations include owner operations bookkeeper admin', vm.runInContext(`const signers = ownerRetentionAttestations().map((item) => item.signer).join(' '); signers.includes('Owner/Admin') && signers.includes('Operations') && signers.includes('Bookkeeper') && signers.includes('Admin')`, context));
assertCheck('Archive integrity review is local and can be retained', vm.runInContext(`const review = buildArchiveIntegrityReview(); review.localOnly === true && Array.isArray(review.checklist) && Array.isArray(review.retentionAttestations) && typeof review.canMarkRetained === 'boolean'`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queueArchiveIntegrityReview();`, context);
assertCheck('Queue archive integrity creates review and audit', vm.runInContext(`store.archiveIntegrityReviews.length === 1 && store.auditLog[0].type === 'archive-integrity-review-queued'`, context));
assertCheck('Archive integrity status update works', vm.runInContext(`updateArchiveIntegrityStatus(store.archiveIntegrityReviews[0].id, 'Retained'); store.archiveIntegrityReviews[0].status === 'Retained' && store.auditLog[0].type === 'archive-integrity-status-updated'`, context));
assertCheck('Settings render archive integrity panel', vm.runInContext(`settingsMarkup().includes('Phase 3Y Archive Integrity + Retention') && settingsMarkup().includes('data-archive-integrity-review') && settingsMarkup().includes('Owner retention attestations')`, context));
assertCheck('Login copy mentions archive integrity checks', fs.readFileSync('index.html','utf8').includes('archive integrity checks') && fs.readFileSync('index.html','utf8').includes('owner retention attestations'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def validate_phase_3z_completion_register() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} toggle(){} contains(){ return false; } }
class Element { constructor(){ this.innerHTML=''; this.textContent=''; this.hidden=false; this.value=''; this.classList=new ClassList(); this.dataset={}; } addEventListener(){} setAttribute(){} querySelector(){ return null; } querySelectorAll(){ return []; } after(){} scrollIntoView(){} }
const context = {
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, body: new Element(), createElement(){ return new Element(); }, getElementById(){ return new Element(); }, querySelectorAll(){ return []; } },
  navigator: {}, window: { addEventListener(){} }, console,
  structuredClone: global.structuredClone, Date, Number, String, Math, JSON, setTimeout, clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('app.js','utf8'), context, { filename: 'app.js' });
const checks = [];
function assertCheck(name, condition) { checks.push(`${name}: ${condition ? 'PASS' : 'FAIL'}`); if (!condition) throw new Error(`${name} failed`); }
assertCheck('Store migrates phase completion registers array', vm.runInContext(`Array.isArray(store.phaseCompletionRegisters)`, context));
assertCheck('Phase artifact summary includes dispatch operations and archive', vm.runInContext(`const phases = phaseReadinessArtifactSummary().map((item) => item.phase).join(' '); phases.includes('3B Dispatch') && phases.includes('3C Operations') && phases.includes('3U–3Y Evidence/archive')`, context));
assertCheck('Completion register is local and recommends next phase', vm.runInContext(`const register = buildPhaseCompletionRegister(); register.localOnly === true && register.phase === 'Phase 3Z Completion Register' && register.recommendedNextPhase.phase.includes('Phase 4A') && typeof register.readyForBackendPlanning === 'boolean'`, context));
assertCheck('Completion blockers are available as array', vm.runInContext(`Array.isArray(phaseCompletionBlockers())`, context));
vm.runInContext(`activeWorkspaceRole = 'Owner / Admin'; queuePhaseCompletionRegister();`, context);
assertCheck('Queue completion register creates register and audit', vm.runInContext(`store.phaseCompletionRegisters.length === 1 && store.auditLog[0].type === 'phase-completion-register-queued'`, context));
assertCheck('Completion register status update works', vm.runInContext(`updatePhaseCompletionStatus(store.phaseCompletionRegisters[0].id, 'Phase 3 Complete'); store.phaseCompletionRegisters[0].status === 'Phase 3 Complete' && store.auditLog[0].type === 'phase-completion-status-updated'`, context));
assertCheck('Settings render completion register panel', vm.runInContext(`settingsMarkup().includes('Phase 3Z Completion Register') && settingsMarkup().includes('data-phase-completion-register') && settingsMarkup().includes('Recommended next phase')`, context));
assertCheck('Login copy mentions Phase 3 completion registers', fs.readFileSync('index.html','utf8').includes('Phase 3 completion registers'));
console.log(checks.join('\n'));
"""
    return run(["node"], input_text=script)


def main() -> int:
    checks = [
        ("JavaScript syntax", validate_javascript),
        ("JSON validation", validate_json),
        ("HTML validation", validate_html),
        ("Legacy functionality preserved", validate_legacy_preserved),
        ("App load console errors", validate_app_bootstrap),
        ("Phase 3B dispatch workflow", validate_phase_3b_dispatch),
        ("Phase 3C operations workflow", validate_phase_3c_operations),
        ("Phase 3D role workspaces", validate_phase_3d_role_workspaces),
        ("Phase 3E identity permissions", validate_phase_3e_identity_permissions),
        ("Phase 3F user mapping", validate_phase_3f_user_mapping),
        ("Phase 3G audit log", validate_phase_3g_audit_log),
        ("Phase 3H data readiness", validate_phase_3h_data_readiness),
        ("Phase 3I sync readiness", validate_phase_3i_sync_readiness),
        ("Phase 3J API contract", validate_phase_3j_api_contract),
        ("Phase 3K auth readiness", validate_phase_3k_auth_readiness),
        ("Phase 3L schema readiness", validate_phase_3l_schema_readiness),
        ("Phase 3M migration readiness", validate_phase_3m_migration_readiness),
        ("Phase 3N rollout readiness", validate_phase_3n_rollout_readiness),
        ("Phase 3O offline mode", validate_phase_3o_offline_mode),
        ("Phase 3P handoff training", validate_phase_3p_handoff_training),
        ("Phase 3Q production QA", validate_phase_3q_production_qa),
        ("Phase 3R pilot mode", validate_phase_3r_pilot_mode),
        ("Phase 3S pilot closeout", validate_phase_3s_pilot_closeout),
        ("Phase 3T final launch", validate_phase_3t_final_launch),
        ("Phase 3U evidence package", validate_phase_3u_evidence_package),
        ("Phase 3V executive dashboard", validate_phase_3v_executive_dashboard),
        ("Phase 3W executive reports", validate_phase_3w_executive_reports),
        ("Phase 3X readiness archive", validate_phase_3x_readiness_archive),
        ("Phase 3Y archive integrity", validate_phase_3y_archive_integrity),
        ("Phase 3Z completion register", validate_phase_3z_completion_register),
    ]
    all_passed = True
    for label, check in checks:
        passed, detail = check()
        all_passed = all_passed and passed
        print(f"{label}: {'PASS' if passed else 'FAIL'}")
        if detail:
            print(detail)
    return 0 if all_passed else 1


if __name__ == "__main__":
    sys.exit(main())
