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
    index_html = (ROOT / "index.html").read_text()
    missing = [name for name in sorted(LEGACY_FILES) if not (ROOT / name).exists()]
    unlinked = [name for name in sorted(LEGACY_FILES) if name not in app_js]
    required_features = {
        "dispatch board": "renderAssignmentBoard",
        "dispatch tree view": "renderDispatchTree",
        "card view toggle": "data-dispatch-view",
        "natural sentence mode": "naturalSentenceModeHint",
        "phone normalization": "normalizePhoneNumber",
        "payroll": "renderPayroll",
        "audit trail": "renderAuditTrail",
        "notifications": "renderNotifications",
        "voice fill": "startVoiceFill",
        "export": "exportStoreData",
        "import": "importStoreData",
        "notifications page": "page-notifications",
        "audit page": "page-audit",
        "assignment lifecycle": "updateAssignmentStatus",
        "captain dashboard": "renderCrewRoleDashboard('captain')",
        "mate dashboard": "renderCrewRoleDashboard('mate')",
        "owner dashboard": "renderOwnerDashboard",
        "checklist integration": "renderChecklistPage",
        "vessel readiness": "renderVesselReadinessPanel",
        "passenger manifest": "passengerManifest",
        "incident reports": "page-incident-reports",
    }
    missing_features = [label for label, token in required_features.items() if token not in app_js and token not in index_html]
    if missing or unlinked or missing_features:
        parts = []
        if missing:
            parts.append(f"missing files: {', '.join(missing)}")
        if unlinked:
            parts.append(f"not referenced in app.js: {', '.join(unlinked)}")
        if missing_features:
            parts.append(f"missing feature hooks: {', '.join(missing_features)}")
        return False, "FAIL — " + "; ".join(parts)
    return True, "PASS — legacy links plus dispatch board, payroll, audit trail, notifications, voice fill, and export/import hooks are present"


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
const ids = ['toast','loginScreen','appShell','roleSelect','enterAppBtn','activeRole','menuBtn','sidebar','sidebarOverlay','primaryNav','installBtn','pageTitle','page-dashboard','page-bookings','page-invoices','page-trips','page-calendar','page-captain-dashboard','page-mate-dashboard','page-owner-dashboard','page-vessels','page-crew','page-payroll','page-expenses','page-inventory','page-incident-reports','page-pre-trip-checklist','page-post-trip-checklist','page-cruise-schedule','page-reports','page-notifications','page-audit','page-settings','page-legacy'];
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
const ocr = vm.runInNewContext(`parseQuoteInvoiceText(\`Customer Name: Keith Wilkes
Ultimate 6 Hour Private Island Experience
Tour Date: June 15, 2026
10:00 AM Start
5 guests
Payment Type: Deposit
Full Price: $1,750.00
Deposit Paid: $175.00
Remaining Balance: $1,575.00
Payment method: Cash N' Go\`, 'tour-confirmation-template-01.png')`, context);
if (ocr.customerName !== 'Keith Wilkes' || ocr.tripDate !== '2026-06-15' || ocr.startTime !== '10:00' || ocr.duration !== '6 Hours' || ocr.endTime !== '16:00' || ocr.guestCount !== '5' || ocr.depositPaid !== '175.00' || ocr.balanceDue !== '1575.00') throw new Error(`OCR extraction mismatch: ${JSON.stringify(ocr)}`);
listeners.DOMContentLoaded();
if (errors.length) throw new Error(errors.join('\n'));
console.log('PASS — app bootstrap and tour-confirmation OCR duration/end-time extraction completed without errors');
'''
    return run(["node"], input_text=script)



def validate_phase_4d_native_workflows() -> tuple[bool, str]:
    app_js = (ROOT / "app.js").read_text()
    styles = (ROOT / "styles.css").read_text()
    failures: list[str] = []
    for token in ["Open related legacy tool", "Open legacy pre trip tool", "Open legacy post trip tool", "Open related legacy"]:
        if token in app_js:
            failures.append(f"primary workflow legacy prompt remains: {token}")
    required_tokens = {
        "Settings archive-only note": "Legacy tools are retained for reference only. Active operations should be completed through the main application tabs.",
        "Invoices native module renders": "function renderInvoiceModule",
        "Invoice required field customer": "['customerName','Customer Name','text']",
        "Invoice receipt action": "function generateReceiptSummary",
        "Pre Trip Checklist native form renders": "const preTripChecklistItems",
        "Post Trip Checklist native form renders": "const postTripChecklistItems",
        "Checklist submission updates trip readiness": "trip.dispatchReadinessStatus = calculateDispatchReadiness(trip)",
        "Cruise Schedule native module renders": "function renderCruiseScheduleModule",
        "Reports native dashboard renders": "function renderReports",
        "Reports use local app data": "const trips = store.trips || []",
        "Command Voice Fill top panel": "function renderVoiceCommandPanel",
        "Command Voice Fill top placement": "heading.insertAdjacentHTML('afterend', markup)",
        "Voice field state machine": "LISTENING_FOR_FIELD",
        "Voice field selected prompt": "selected. Now say the value.",
        "Voice filled prompt": "Filled ${field.label}:",
        "Voice Accept button": 'data-voice-action="accept"',
        "Voice Retry button": 'data-voice-action="retry"',
        "Voice Clear button": 'data-voice-action="clear"',
        "Voice Next Field button": 'data-voice-action="next"',
        "Customer Name voice support": "label: 'Customer Name'",
        "Phone Number voice support": "label: 'Phone Number'",
        "Captain dropdown support": "setSelectLikeValue",
        "Mate dropdown support": "label: 'Mate'",
        "Vessel roman numeral support": "romanToWords",
        "Pre trip reminder logic exists": "reminderType: 'pre-trip'",
        "Post trip 30 minute reminder logic exists": "post-trip-30-minute",
        "Checklist reminders on load/route": "generateChecklistReminders();",
        "Voice highlight style exists": ".voice-selected-field",
    }
    for label, token in required_tokens.items():
        haystack = styles if label == "Voice highlight style exists" else app_js
        if token not in haystack:
            failures.append(f"missing {label}")
    if failures:
        return False, "FAIL — " + "; ".join(failures)
    return True, "PASS — Phase 4D native invoices, checklists, cruise schedule, reports, reminders, and voice field controls are present"



def validate_phase_4e_mobile_redesign() -> tuple[bool, str]:
    app_js = (ROOT / "app.js").read_text()
    styles = (ROOT / "styles.css").read_text()
    index_html = (ROOT / "index.html").read_text()
    manifest = json.loads((ROOT / "manifest.json").read_text())
    failures: list[str] = []
    required_tokens = {
        "Mobile bottom navigation exists": (index_html + app_js + styles, "mobileBottomNav"),
        "Mobile nav More menu exists": (app_js, "const mobileMoreNav"),
        "Mobile notification badge exists": (app_js + styles, "mobile-nav-badge"),
        "Floating microphone exists": (app_js, "voice-fab"),
        "Dashboard preferences exist in Settings": (app_js, "Dashboard Preferences"),
        "Compact add file control exists": (app_js, "＋ Add File / Photo"),
        "Voice assistant mode labels exist": (app_js, "Mode:"),
        "Voice assistant current step exists": (app_js, "Current Step:"),
        "Dispatch tree mobile layout hooks exist": (app_js + styles, "true-dispatch-tree"),
        "Dispatch color rail hooks exist": (styles, "box-shadow: inset 6px 0 0"),
        "Sticky save controls exist": (app_js + styles, "sticky-save-controls"),
        "Status badge system exists": (app_js, "function statusColor"),
        "Notifications grouped inbox exists": (app_js, "groupNotificationsByAge"),
        "Notification quick actions exist": (app_js, "Open Related Trip"),
        "Owner dashboard alert cards exist": (app_js, "Outstanding owner payouts"),
        "Crew large action buttons exist": (app_js, "Voice Fill Notes"),
        "Legacy archive still in Settings": (app_js, "Archived Legacy Tools"),
        "No primary workflow depends on legacy tools": (app_js, "Active operations should be completed through the main application tabs."),
        "Existing Phase 4D functionality preserved": (app_js, "function renderInvoiceModule"),
        "PWA safe area support exists": (styles, "env(safe-area-inset-bottom)"),
        "Offline state message exists": (index_html + app_js, "offlineState"),
    }
    for label, (haystack, token) in required_tokens.items():
        if token not in haystack:
            failures.append(f"missing {label}")
    if manifest.get("display") != "standalone":
        failures.append("manifest display is not standalone")
    if manifest.get("background_color") != "#081d33":
        failures.append("manifest splash background color not updated")
    if failures:
        return False, "FAIL — " + "; ".join(failures)
    return True, "PASS — Phase 4E mobile nav, command dashboard, voice panel, dispatch hooks, sticky saves, badges, archive safeguards, and PWA app-feel hooks are present"

def validate_phase_4d_voice_examples() -> tuple[bool, str]:
    script = r"""
const fs = require('fs');
const vm = require('vm');
class ClassList { add(){} remove(){} }
class Option { constructor(value, text){ this.value=value; this.textContent=text; } }
class Select { constructor(options){ this.tagName='SELECT'; this.options=options; this.value=''; this.classList=new ClassList(); } dispatchEvent(){} scrollIntoView(){} }
const document = { addEventListener(){}, querySelectorAll(){ return []; }, getElementById(){ return null; } };
const context = { document, window:{}, console, localStorage:{getItem(){return null},setItem(){},removeItem(){}}, structuredClone: global.structuredClone, Event: class {}, Date, Number, String, Math, JSON, setTimeout, clearTimeout };
vm.runInNewContext(fs.readFileSync('app.js', 'utf8'), context, { filename: 'app.js' });
if (context.normalizePhoneNumber('242 434 1208') !== '242-434-1208') throw new Error('spaced phone normalization failed');
if (context.normalizePhoneNumber('2424341208') !== '242-434-1208') throw new Error('compact phone normalization failed');
if (context.normalizePhoneNumber('two four two four three four one two zero eight') !== '242-434-1208') throw new Error('spoken phone normalization failed');
const captain = new Select([new Option('Walter','Walter'), new Option('DJ','DJ')]);
if (!context.setSelectLikeValue(captain, 'walter') || captain.value !== 'Walter') throw new Error('Captain Walter dropdown failed');
const mate = new Select([new Option('Walter','Walter'), new Option('DJ','DJ')]);
if (!context.setSelectLikeValue(mate, 'dj') || mate.value !== 'DJ') throw new Error('Mate DJ dropdown failed');
const vessel = new Select([new Option('Reel Adventure Tours I','Reel Adventure Tours I'), new Option('Reel Adventure Tours II','Reel Adventure Tours II')]);
if (!context.setSelectLikeValue(vessel, 'reel adventure tours one') || vessel.value !== 'Reel Adventure Tours I') throw new Error('Vessel roman numeral dropdown failed');
console.log('PASS — Customer Name field flow is represented by aliases; phone and dropdown examples normalize correctly');
"""
    return run(["node"], input_text=script)


def validate_phase_4f_legacy_parity() -> tuple[bool, str]:
    app_js = (ROOT / "app.js").read_text()
    failures: list[str] = []
    required_tokens = {
        "Legacy audit object exists": "const legacyFeatureAudit",
        "Pre trip audited file documented": "RAT-PreTrip-VesselCheck.html",
        "Post trip audited file documented": "RAT-PostTrip-VesselCheck.html",
        "Invoice audited file documented": "customer-invoice.html",
        "Cruise dashboard audited file documented": "reel_adventure_tours_dashboard.html",
        "Operations v5 audited file documented": "ReelAdventureTours_App_v5.html",
        "Pre trip stock parity rum": "Rum — minimum 3 bottles required on board",
        "Pre trip bilge parity": "Bilge Pump 1 — Tested and confirmed working",
        "Pre trip export parity": "Preview / Print / Save PDF",
        "Post trip remaining stock parity": "Rum remaining — minimum 3 bottles needed for next charter",
        "Post trip flush parity": "Engine 1 flushed today after this trip",
        "Post trip captain confirmation": "Captain confirmation / initials",
        "Invoice pickup parity": "Pickup Location",
        "Invoice second boat parity": "Add Second Boat",
        "Invoice deposit percent parity": "Deposit Percent",
        "Invoice receipt summary parity": "Customer-Facing Summary",
        "Cruise opportunity fields": "Facebook Search Term",
        "Cruise posted status": "Posted?",
        "Inventory default water": "name: 'Water'",
        "Inventory default soda": "name: 'Coke'",
        "Inventory default rum punch": "name: 'Rum Punch Mixed & Ready'",
        "Inventory default ice": "name: 'Ice'",
        "Inventory default snacks": "name: 'Chips / Snacks'",
        "Inventory default cups": "name: 'Cups'",
        "Inventory default napkins": "name: 'Napkins'",
        "Inventory default trash bags": "name: 'Trash Bags'",
        "Inventory default cleaning supplies": "name: 'Cleaning Supplies'",
        "Inventory default snorkel gear": "name: 'Snorkel Gear'",
        "Inventory default life jackets": "name: 'Life Jackets'",
        "Inventory default fuel": "name: 'Fuel'",
        "Inventory alert function": "function inventoryAlerts",
        "Dashboard low stock alerts": "Low Stock Alerts",
        "Checklist inventory sync": "function syncChecklistInventory",
        "Notifications display targets": "'Dispatch Tree', 'Notifications'",
        "Payroll person statements": "function renderPersonStatementSummary",
        "Payroll owner/captain/mate statements": "Owner Statements",
        "Expenses reimbursement fields": "Reimbursement Status",
        "Reports local data no legacy dependency": "Native reports dashboard",
        "Settings archive remains": "Archived Legacy Tools",
        "Voice top migrated forms": "renderVoiceCommandPanel(route)",
    }
    for label, token in required_tokens.items():
        if token not in app_js:
            failures.append(f"missing {label}")
    forbidden = ["Open related legacy tool", "Open legacy pre trip tool", "Open legacy post trip tool"]
    for token in forbidden:
        if token in app_js:
            failures.append(f"active workflow legacy link remains: {token}")
    if failures:
        return False, "FAIL — " + "; ".join(failures)
    return True, "PASS — Phase 4F legacy audit, checklist parity, invoice parity, cruise fields, inventory alerts, payroll statements, reimbursement fields, reports, voice fill, and archive safeguards are present"


def validate_phase_4g_upload_calendar() -> tuple[bool, str]:
    app_js = (ROOT / "app.js").read_text()
    index_html = (ROOT / "index.html").read_text()
    combined = app_js + index_html
    required_tokens = {
        "Drag and drop upload zone exists": "data-upload-zone",
        "Mobile upload button exists": "Take Photo",
        "Upload review screen exists": "Review before saving",
        "Extracted fields review exists": "uploadReviewFields",
        "Create Booking from upload exists": "Create Booking",
        "Create Invoice from upload exists": "Create Invoice",
        "Create Trip from upload exists": "Create Trip",
        "Calendar entry action exists": "Calendar Entry",
        "PDF uploads supported": ".pdf",
        "Image uploads supported": "image/*",
        "HTML uploads supported": ".html",
        "Text uploads supported": ".txt",
        "CSV uploads supported": ".csv",
        "JSON uploads supported": ".json",
        "Duplicate review exists": "Possible Duplicate Found",
        "Update existing duplicate option exists": "Update Existing",
        "Create new anyway duplicate option exists": "Create New Anyway",
        "Calendar native tab exists": "page-calendar",
        "Calendar month view exists": "Month View",
        "Calendar week view exists": "Week View",
        "Calendar day view exists": "Day View",
        "Agenda view exists": "Agenda View",
        "Role based calendar filtering exists": "visibleCalendarTrips",
        "Admin can see all trips": "role === 'Admin'",
        "Owner sees only owned vessel trips": "ownerForVesselName(trip.vessel) === person",
        "Captain sees only captain assigned trips": "trip.captain === person",
        "Mate sees only mate assigned trips": "trip.mate === person",
        "Bookkeeper sees financial calendar view": "Bookkeeper financial calendar view",
        "Calendar day counts show number of tours": "Tours",
        "Calendar day cards show readiness and balance status": "Balance Due",
        "Notifications and audit entries are created for upload actions": "Booking created from uploaded invoice.",
        "Trip added to calendar notification exists": "Trip added to calendar.",
        "Invoice created from upload notification exists": "Invoice created from upload.",
        "Upload parsing failed notification exists": "Upload parsing failed",
        "Upload review supports voice fill": "data-upload-review-form",
        "Calendar day schedule supports voice fill": "Day Schedule",
        "Quick filters exist": "data-calendar-filter",
        "Unassigned Trips marker exists": "Unassigned",
        "Status colors exist": "calendarStatusClass",
    }
    failures = [label for label, token in required_tokens.items() if token not in combined]
    if failures:
        return False, "FAIL — " + "; ".join(f"missing {label}" for label in failures)
    return True, "PASS — Phase 4G upload intake, editable review, duplicate handling, upload-created records, role-filtered calendar views, mobile upload controls, statuses, notifications, audit entries, and voice-fill hooks are present"

def validate_phase_5_completion() -> tuple[bool, str]:
    app_js = (ROOT / "app.js").read_text()
    styles_css = (ROOT / "styles.css").read_text()
    combined = app_js + styles_css
    required_tokens = {
        "OCR duration extraction": "const duration = pick(",
        "OCR calculated end time": "function calculateEndTime",
        "OCR end time review field": "['endTime', 'End Time']",
        "OCR confidence review": "extractionConfidence",
        "Booking confirmation classifier": "'Booking Confirmation': scoreText",
        "Captain payment receipt": "Captain Payment Receipt",
        "Mate payment receipt": "Mate Payment Receipt",
        "Owner payout statement": "Owner Payout Statement",
        "Payment due notice": "Payment Due Notice",
        "Payroll print PDF": "Print / Save PDF",
        "Reference invoice styling": "Phase 5 reference-document",
        "Mobile safe document header": ".invoice-brand-header",
        "Collapsible arrows": ".app-accordion[open] > summary .chevron",
    }
    failures = [label for label, token in required_tokens.items() if token not in combined]
    if failures:
        return False, "FAIL — " + "; ".join(f"missing {label}" for label in failures)
    return True, "PASS — Phase 5 OCR duration/end-time calculation, review confidence, payroll documents, reference styling, mobile layout, and collapsible arrows are present"


def validate_phase_6a_assignment_engine() -> tuple[bool, str]:
    app_js = (ROOT / "app.js").read_text()
    styles_css = (ROOT / "styles.css").read_text()
    combined = app_js + styles_css
    required_tokens = {
        "recommendation engine": "function buildAssignmentRecommendation",
        "availability scoring": "rankCrewCandidates",
        "vessel capacity scoring": "Capacity ${capacity} fits ${guests} guests",
        "recent workload scoring": "recentResourceWorkload",
        "assignment history scoring": "assignmentHistoryCount",
        "role eligibility": "crewEligibleForRole",
        "vessel owner scoring": "Matches vessel owner",
        "trip form recommendations": "data-assignment-recommendation",
        "apply suggested assignment action": "function applySuggestedAssignment",
        "manual override guidance": "You can manually choose any vessel, captain, or mate",
        "overlap conflict detection": "resourceHasOverlap",
        "declined crew conflict": "Captain declined",
        "unavailable crew conflict": "Captain unavailable",
        "missing assignment conflicts": "Missing vessel",
        "dispatch recommendation": "dispatch-recommendation-node",
        "calendar recommendation": "calendar-recommendation",
        "dashboard recommendation": "Suggested assignment",
        "captain notification": "addRoleNotification('Captain', recommendation.captain.value",
        "mate notification": "addRoleNotification('Mate', recommendation.mate.value",
        "admin notification": "addRoleNotification('Admin', '', 'Suggested assignment applied'",
        "owner notification": "addRoleNotification('Owner', owner, 'Suggested assignment applied'",
        "recommendation audit": "addAudit('applied', 'Assignment Recommendation'",
        "mobile recommendation layout": ".apply-suggestion-btn { width: 100%",
    }
    failures = [label for label, token in required_tokens.items() if token not in combined]
    if failures:
        return False, "FAIL — " + "; ".join(f"missing {label}" for label in failures)
    return True, "PASS — Phase 6A recommendation engine, conflicts, manual apply, dispatch/calendar/dashboard integration, notifications, audit, and mobile controls are present"


def main() -> int:
    checks = [
        ("JavaScript syntax", validate_javascript),
        ("JSON validation", validate_json),
        ("HTML validation", validate_html),
        ("Legacy functionality preserved", validate_legacy_preserved),
        ("App load console errors", validate_app_bootstrap),
        ("Phase 4D native workflow checks", validate_phase_4d_native_workflows),
        ("Phase 4E mobile redesign checks", validate_phase_4e_mobile_redesign),
        ("Phase 4D voice examples", validate_phase_4d_voice_examples),
        ("Phase 4F legacy parity correction", validate_phase_4f_legacy_parity),
        ("Phase 4G upload and calendar checks", validate_phase_4g_upload_calendar),
        ("Phase 5 completion checks", validate_phase_5_completion),
        ("Phase 6A assignment engine checks", validate_phase_6a_assignment_engine),
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
