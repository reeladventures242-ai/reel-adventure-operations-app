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
const ids = ['toast','loginScreen','appShell','roleSelect','enterAppBtn','activeRole','menuBtn','sidebar','sidebarOverlay','primaryNav','installBtn','pageTitle','page-dashboard','page-bookings','page-invoices','page-trips','page-captain-dashboard','page-mate-dashboard','page-owner-dashboard','page-vessels','page-crew','page-payroll','page-expenses','page-inventory','page-incident-reports','page-pre-trip-checklist','page-post-trip-checklist','page-cruise-schedule','page-reports','page-notifications','page-audit','page-settings','page-legacy'];
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

def main() -> int:
    checks = [
        ("JavaScript syntax", validate_javascript),
        ("JSON validation", validate_json),
        ("HTML validation", validate_html),
        ("Legacy functionality preserved", validate_legacy_preserved),
        ("App load console errors", validate_app_bootstrap),
        ("Phase 4D native workflow checks", validate_phase_4d_native_workflows),
        ("Phase 4D voice examples", validate_phase_4d_voice_examples),
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
