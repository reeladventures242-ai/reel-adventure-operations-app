#!/usr/bin/env python3
"""Serve the operations app with live Nassau weather and cruise schedule APIs."""

from datetime import datetime, timedelta, timezone
import base64
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import html
import json
import os
import re
import secrets
import sqlite3
import tempfile
import urllib.error
import urllib.parse
import urllib.request

try:
    import psycopg
except ImportError:
    psycopg = None

ROOT = os.path.dirname(os.path.abspath(__file__))
NASSAU_LAT = 25.056
NASSAU_LON = -77.352
CRUISEMAPPER_URL = "https://www.cruisemapper.com/ports/nassau-port-27"
WINDY_URL = "https://api.windy.com/api/point-forecast/v2"
OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"
MET_NO_URL = "https://api.met.no/weatherapi/locationforecast/2.0/compact"
BOATBOOKER_WIDGET_BUILDER_URL = "https://boatbooker.com/js/widgets/captainWeatherWidgetBuilder.js?v=1777446641"
USER_AGENT = "ReelAdventureOperations/1.0 https://github.com/reeladventures242-ai/reel-adventure-operations-app"
APP_RELEASE = "2026-06-10-owner-integrations-v1"
CACHE_DIR = os.environ.get("CACHE_DIR", os.path.join(tempfile.gettempdir(), "reel-adventure-cache"))
WEATHER_CACHE_FILE = os.path.join(CACHE_DIR, "weather-nassau.json")
CRUISE_CACHE_FILE = os.path.join(CACHE_DIR, "cruise-nassau.json")
GMAIL_TOKEN_FILE = os.path.join(CACHE_DIR, "gmail-owner-token.json")
GMAIL_STATE_FILE = os.path.join(CACHE_DIR, "gmail-oauth-state.json")
WHATSAPP_WEBHOOK_FILE = os.path.join(CACHE_DIR, "whatsapp-webhook-events.json")
DATABASE_PATH = os.environ.get("DATABASE_PATH", os.path.join(CACHE_DIR, "operations.sqlite3"))
SUPABASE_DATABASE_URL = os.environ.get("SUPABASE_DATABASE_URL", "").strip()
DATABASE_URL = (SUPABASE_DATABASE_URL or os.environ.get("DATABASE_URL", "")).strip()
if SUPABASE_DATABASE_URL and DATABASE_URL and "sslmode=" not in DATABASE_URL:
    DATABASE_URL = f"{DATABASE_URL}{'&' if '?' in DATABASE_URL else '?'}sslmode=require"
WEATHER_CACHE_TTL_SECONDS = int(os.environ.get("WEATHER_CACHE_TTL_SECONDS", "1800"))
WEATHER_FALLBACK_TTL_SECONDS = int(os.environ.get("WEATHER_FALLBACK_TTL_SECONDS", "600"))
CRUISE_CACHE_TTL_SECONDS = int(os.environ.get("CRUISE_CACHE_TTL_SECONDS", "21600"))
GMAIL_REQUIRED_ENV = ("GMAIL_CLIENT_ID", "GMAIL_CLIENT_SECRET", "GMAIL_REDIRECT_URI")
WHATSAPP_REQUIRED_ENV = ("WHATSAPP_ACCESS_TOKEN", "WHATSAPP_PHONE_NUMBER_ID", "WHATSAPP_BUSINESS_ACCOUNT_ID")
GMAIL_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GMAIL_TOKEN_URL = "https://oauth2.googleapis.com/token"
GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.readonly"
GMAIL_API_ROOT = "https://gmail.googleapis.com/gmail/v1/users/me"
WHATSAPP_GRAPH_VERSION = os.environ.get("WHATSAPP_GRAPH_VERSION", "v20.0")
WHATSAPP_AUTO_SEND_ENABLED = os.environ.get("WHATSAPP_AUTO_SEND_ENABLED", "1").strip().lower() not in ("0", "false", "no", "off")
WHATSAPP_AUTO_SEND_LIMIT = max(1, int(os.environ.get("WHATSAPP_AUTO_SEND_LIMIT", "10")))
WHATSAPP_CUSTOMER_AUTO_SEND = os.environ.get("WHATSAPP_CUSTOMER_AUTO_SEND", "0").strip().lower() in ("1", "true", "yes", "on")
COMPANY_OWNER_NAME = os.environ.get("COMPANY_OWNER_NAME", "Eugene").strip() or "Eugene"
VESSEL_OWNER_ROLE = "Vessel Owner"

DEFAULT_NOTIFICATION_RULES = {
    "tripAssignments": {"enabled": True, "autoSendWhatsApp": True, "roles": ["Owner", "Vessel Owner", "Captain", "Mate"]},
    "tripChanges": {"enabled": True, "autoSendWhatsApp": True, "roles": ["Owner", "Vessel Owner", "Captain", "Mate"]},
    "checklists": {"enabled": True, "autoSendWhatsApp": True, "roles": ["Owner", "Vessel Owner", "Captain", "Mate"]},
    "incidents": {"enabled": True, "autoSendWhatsApp": True, "roles": ["Owner", "Vessel Owner", "Captain", "Mate"]},
    "payroll": {"enabled": True, "autoSendWhatsApp": True, "roles": ["Owner", "Vessel Owner", "Captain", "Mate", "Crew"]},
    "chat": {"enabled": True, "autoSendWhatsApp": False, "roles": ["Owner", "Vessel Owner", "Captain", "Mate", "Bookkeeper"]},
    "customerMessages": {"enabled": True, "autoSendWhatsApp": WHATSAPP_CUSTOMER_AUTO_SEND, "roles": ["Customer"]},
}


def db_provider():
    if SUPABASE_DATABASE_URL:
        return "Supabase Postgres"
    return "Postgres" if DATABASE_URL else "SQLite"


def db_connection():
    if DATABASE_URL:
        if psycopg is None:
            raise RuntimeError("DATABASE_URL is set but psycopg is not installed")
        conn = psycopg.connect(DATABASE_URL)
        conn.execute("CREATE TABLE IF NOT EXISTS app_state (id TEXT PRIMARY KEY, payload TEXT NOT NULL, updated_at TEXT NOT NULL)")
        conn.execute("CREATE TABLE IF NOT EXISTS event_log (id TEXT PRIMARY KEY, kind TEXT NOT NULL, payload TEXT NOT NULL, created_at TEXT NOT NULL)")
        return conn
    os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)
    conn = sqlite3.connect(DATABASE_PATH, timeout=20)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("CREATE TABLE IF NOT EXISTS app_state (id TEXT PRIMARY KEY, payload TEXT NOT NULL, updated_at TEXT NOT NULL)")
    conn.execute("CREATE TABLE IF NOT EXISTS event_log (id TEXT PRIMARY KEY, kind TEXT NOT NULL, payload TEXT NOT NULL, created_at TEXT NOT NULL)")
    return conn


def database_status():
    try:
        with db_connection() as conn:
            conn.execute("SELECT 1")
        status = {"configured": True, "provider": db_provider()}
        if DATABASE_URL:
            status["databaseUrlConfigured"] = True
            status["supabaseConfigured"] = bool(SUPABASE_DATABASE_URL)
        else:
            status["path"] = DATABASE_PATH
        return status
    except (sqlite3.Error, RuntimeError, psycopg.Error if psycopg else Exception) as error:
        return {"configured": False, "provider": db_provider(), "error": str(error)}


def load_operations_state():
    with db_connection() as conn:
        row = conn.execute("SELECT payload, updated_at FROM app_state WHERE id = 'main'").fetchone()
    if not row:
        return {"hasStore": False, "store": None, "updatedAt": ""}
    payload, updated_at = row["payload"] if isinstance(row, sqlite3.Row) else row[0], row["updated_at"] if isinstance(row, sqlite3.Row) else row[1]
    store = json.loads(payload)
    normalize_server_store(store)
    return {"hasStore": True, "store": store, "updatedAt": updated_at}


def normalize_server_store(store):
    if not isinstance(store, dict):
        return {}
    rules = store.get("notificationRules")
    if not isinstance(rules, dict):
        rules = {}
    store["notificationRules"] = {key: {**value, **(rules.get(key) if isinstance(rules.get(key), dict) else {})} for key, value in DEFAULT_NOTIFICATION_RULES.items()}
    store["whatsappQueue"] = normalize_whatsapp_queue(store.get("whatsappQueue", []))
    store["whatsappDeliveryLog"] = store.get("whatsappDeliveryLog") if isinstance(store.get("whatsappDeliveryLog"), list) else []
    store["whatsappInbox"] = normalize_whatsapp_inbox(store.get("whatsappInbox", []))
    store["users"] = store.get("users") if isinstance(store.get("users"), list) else []
    return store


def normalize_whatsapp_inbox(inbox):
    normalized = []
    for item in inbox if isinstance(inbox, list) else []:
        if not isinstance(item, dict):
            continue
        normalized.append({
            "id": item.get("id") or server_id("wa-inbound"),
            "messageId": item.get("messageId", ""),
            "from": item.get("from", ""),
            "profileName": item.get("profileName", ""),
            "messageType": item.get("messageType", "text"),
            "text": item.get("text", ""),
            "receivedAt": item.get("receivedAt") or iso_now(),
            "status": item.get("status", "New"),
            "raw": item.get("raw") if isinstance(item.get("raw"), dict) else {},
        })
    return normalized[:200]


def normalize_whatsapp_queue(queue):
    normalized = []
    for item in queue if isinstance(queue, list) else []:
        if not isinstance(item, dict):
            continue
        status = item.get("status") or ("Ready" if normalize_digits(item.get("phoneNumber")) else "Draft")
        normalized.append({
            "id": item.get("id") or server_id("wa-message"),
            "category": item.get("category", "Operations Alert"),
            "recipientName": item.get("recipientName", ""),
            "recipientRole": item.get("recipientRole", "Crew"),
            "phoneNumber": item.get("phoneNumber", ""),
            "messageBody": item.get("messageBody", ""),
            "relatedTrip": item.get("relatedTrip", ""),
            "relatedBooking": item.get("relatedBooking", ""),
            "relatedInvoice": item.get("relatedInvoice", ""),
            "status": status,
            "createdAt": item.get("createdAt") or iso_now(),
            "scheduledFor": item.get("scheduledFor", ""),
            "sentAt": item.get("sentAt", ""),
            "createdBy": item.get("createdBy", "Operations"),
            "serverRuleKey": item.get("serverRuleKey", ""),
            "autoSend": bool(item.get("autoSend")),
            "approvalRequired": bool(item.get("approvalRequired", str(item.get("recipientRole", "")).lower() == "customer")),
            "attemptCount": int(item.get("attemptCount") or 0),
            "lastAttemptAt": item.get("lastAttemptAt", ""),
            "lastError": item.get("lastError", ""),
            "businessMessageId": item.get("businessMessageId", ""),
            "linkedGmailImportId": item.get("linkedGmailImportId", ""),
            "linkedChatMessageId": item.get("linkedChatMessageId", ""),
        })
    return normalized


def extract_whatsapp_inbound_messages(event):
    messages = []
    for entry in event.get("entry", []) if isinstance(event, dict) else []:
        for change in entry.get("changes", []) if isinstance(entry, dict) else []:
            value = change.get("value", {}) if isinstance(change, dict) else {}
            contacts = {
                contact.get("wa_id"): ((contact.get("profile") or {}).get("name") or "")
                for contact in value.get("contacts", []) or []
                if isinstance(contact, dict)
            }
            for message in value.get("messages", []) or []:
                if not isinstance(message, dict):
                    continue
                message_type = message.get("type", "unknown")
                text = ((message.get("text") or {}).get("body") or "").strip()
                if not text and message_type != "text":
                    text = f"[{message_type} message]"
                sender = message.get("from", "")
                timestamp = message.get("timestamp", "")
                received_at = datetime.fromtimestamp(int(timestamp), timezone.utc).isoformat() if str(timestamp).isdigit() else iso_now()
                messages.append({
                    "id": server_id("wa-inbound"),
                    "messageId": message.get("id", ""),
                    "from": sender,
                    "profileName": contacts.get(sender, ""),
                    "messageType": message_type,
                    "text": text,
                    "receivedAt": received_at,
                    "status": "New",
                    "raw": message,
                })
    return messages


def save_whatsapp_webhook_event(event):
    saved = read_json_file(WHATSAPP_WEBHOOK_FILE) or []
    if not isinstance(saved, list):
        saved = []
    inbound = extract_whatsapp_inbound_messages(event)
    saved.append({"receivedAt": iso_now(), "event": event, "inboundCount": len(inbound)})
    write_json_file(WHATSAPP_WEBHOOK_FILE, saved[-100:])
    if inbound:
        try:
            state = load_operations_state()
            store = state.get("store") if state.get("hasStore") else {}
            if not isinstance(store, dict):
                store = {}
            normalize_server_store(store)
            inbox = store.setdefault("whatsappInbox", [])
            existing_ids = {item.get("messageId") for item in inbox if isinstance(item, dict)}
            added = [item for item in inbound if item.get("messageId") not in existing_ids]
            if added:
                updated_at = iso_now()
                store["whatsappInbox"] = normalize_whatsapp_inbox(added + inbox)
                store["updatedAt"] = updated_at
                store["serverSyncedAt"] = updated_at
                latest = added[0]
                ensure_notification(
                    store,
                    f"whatsapp-inbound:{latest.get('messageId') or latest.get('id')}",
                    "WhatsApp message received",
                    f"{latest.get('profileName') or latest.get('from') or 'Customer'}: {latest.get('text') or 'New WhatsApp message'}",
                    "info",
                    "Owner",
                    "",
                    "WhatsApp",
                    {"whatsappMessageId": latest.get("messageId", "")},
                )
                save_operations_state(store)
        except Exception as error:
            append_event_log("whatsapp-webhook-store-error", {"error": str(error), "inboundCount": len(inbound)})
    append_event_log("whatsapp-webhook", {"inboundCount": len(inbound)})
    return inbound


def load_app_state_record(record_id):
    with db_connection() as conn:
        placeholder = "%s" if DATABASE_URL else "?"
        row = conn.execute(f"SELECT payload FROM app_state WHERE id = {placeholder}", (record_id,)).fetchone()
    if not row:
        return {}
    payload = row["payload"] if isinstance(row, sqlite3.Row) else row[0]
    parsed = json.loads(payload or "{}")
    return parsed if isinstance(parsed, dict) else {}


def save_app_state_record(record_id, payload):
    updated_at = iso_now()
    body = json.dumps(payload, separators=(",", ":"))
    with db_connection() as conn:
        if DATABASE_URL:
            conn.execute(
                "INSERT INTO app_state(id, payload, updated_at) VALUES(%s, %s, %s) "
                "ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at",
                (record_id, body, updated_at),
            )
        else:
            conn.execute(
                "INSERT INTO app_state(id, payload, updated_at) VALUES(?, ?, ?) "
                "ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at",
                (record_id, body, updated_at),
            )
    return updated_at


def save_operations_state(store):
    updated_at = iso_now()
    payload = json.dumps(store, separators=(",", ":"))
    with db_connection() as conn:
        if DATABASE_URL:
            conn.execute(
                "INSERT INTO app_state(id, payload, updated_at) VALUES('main', %s, %s) "
                "ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at",
                (payload, updated_at),
            )
        else:
            conn.execute(
                "INSERT INTO app_state(id, payload, updated_at) VALUES('main', ?, ?) "
                "ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at",
                (payload, updated_at),
            )
    return updated_at


def append_event_log(kind, payload):
    try:
        with db_connection() as conn:
            values = (f"event-{int(datetime.now(timezone.utc).timestamp() * 1000)}-{secrets.token_hex(3)}", kind, json.dumps(payload), iso_now())
            if DATABASE_URL:
                conn.execute("INSERT INTO event_log(id, kind, payload, created_at) VALUES(%s, %s, %s, %s)", values)
            else:
                conn.execute("INSERT INTO event_log(id, kind, payload, created_at) VALUES(?, ?, ?, ?)", values)
    except Exception:
        pass


def items_by_id(items):
    return {str(item.get("id")): item for item in items or [] if isinstance(item, dict) and item.get("id")}


def normalize_digits(value):
    return re.sub(r"\D+", "", str(value or ""))


def server_id(prefix):
    return f"{prefix}-{int(datetime.now(timezone.utc).timestamp() * 1000)}-{secrets.token_hex(3)}"


def owner_for_vessel(store, vessel_name):
    return next((v.get("owner", "") for v in store.get("vessels", []) if v.get("name") == vessel_name), "")


def is_company_owner(name):
    return str(name or "").strip().lower() == COMPANY_OWNER_NAME.lower()


def crew_phone(store, name):
    return next((c.get("phone", "") for c in store.get("crew", []) if c.get("name") == name), "")


def user_phone(store, user):
    if user.get("phone"):
        return user.get("phone", "")
    crew_id = user.get("linkedCrewProfileId", "")
    return next((c.get("phone", "") for c in store.get("crew", []) if c.get("id") == crew_id), "")


def ensure_notification(store, rule_key, title, message, level="info", recipient_role="All", recipient_name="", category="General", metadata=None):
    notices = store.setdefault("notifications", [])
    if any((notice.get("metadata") or {}).get("serverRuleKey") == rule_key for notice in notices):
        return False
    payload = {
        "id": server_id("notice"),
        "at": iso_now(),
        "title": title,
        "message": message,
        "level": level,
        "read": False,
        "recipientRole": recipient_role,
        "recipientName": recipient_name,
        "category": category,
        "metadata": {**(metadata or {}), "serverRuleKey": rule_key},
    }
    notices.insert(0, payload)
    del notices[150:]
    return True


def notification_rule(store, rule_name):
    rules = store.setdefault("notificationRules", {})
    rule = rules.get(rule_name)
    if not isinstance(rule, dict):
        rule = {}
    return {**DEFAULT_NOTIFICATION_RULES.get(rule_name, {"enabled": True, "autoSendWhatsApp": False, "roles": []}), **rule}


def rule_enabled(store, rule_name):
    return bool(notification_rule(store, rule_name).get("enabled", True))


def should_auto_send(store, rule_name, recipient_role):
    role = str(recipient_role or "").strip()
    rule = notification_rule(store, rule_name)
    if not WHATSAPP_AUTO_SEND_ENABLED or not rule.get("enabled", True) or not rule.get("autoSendWhatsApp"):
        return False
    if role == "Customer" and not WHATSAPP_CUSTOMER_AUTO_SEND:
        return False
    roles = rule.get("roles") if isinstance(rule.get("roles"), list) else []
    return not roles or role in roles


def ensure_whatsapp_draft(store, rule_key, category, recipient_role, recipient_name, phone_number, message_body, related_trip="", related_booking="", related_invoice=""):
    queue = store.setdefault("whatsappQueue", [])
    if any(item.get("serverRuleKey") == rule_key for item in queue):
        return False
    rule_name = whatsapp_rule_name_for_category(category)
    auto_send = should_auto_send(store, rule_name, recipient_role)
    approval_required = str(recipient_role or "").strip() == "Customer" and not WHATSAPP_CUSTOMER_AUTO_SEND
    queue.insert(0, {
        "id": server_id("wa-message"),
        "category": category,
        "recipientName": recipient_name or recipient_role or "Recipient",
        "recipientRole": recipient_role or "Crew",
        "phoneNumber": phone_number or "",
        "messageBody": message_body,
        "relatedTrip": related_trip,
        "relatedBooking": related_booking,
        "relatedInvoice": related_invoice,
        "status": "Ready" if normalize_digits(phone_number) else "Draft",
        "createdAt": iso_now(),
        "scheduledFor": "",
        "sentAt": "",
        "createdBy": "Notification Rules Engine",
        "serverRuleKey": rule_key,
        "autoSend": auto_send,
        "approvalRequired": approval_required,
        "attemptCount": 0,
        "lastAttemptAt": "",
        "lastError": "",
    })
    del queue[150:]
    return True


def whatsapp_rule_name_for_category(category):
    value = str(category or "").lower()
    if "checklist" in value:
        return "checklists"
    if "incident" in value or "weather" in value or "cruise" in value:
        return "incidents"
    if "payout" in value or "payroll" in value or "payment" in value:
        return "payroll"
    if "chat" in value:
        return "chat"
    if "customer" in value or "meeting" in value or "quote" in value or "invoice" in value or "trip reminder" in value:
        return "customerMessages"
    if "assignment" in value or "owner assignment" in value:
        return "tripAssignments"
    return "tripChanges"


def trip_label(trip):
    return f"{trip.get('customer') or 'Trip'} on {trip.get('tripDate') or 'date pending'} at {trip.get('startTime') or 'time pending'}"


def trip_start_datetime(trip):
    date = str(trip.get("tripDate") or trip.get("date") or "").strip()
    time = str(trip.get("startTime") or trip.get("time") or "09:00").strip() or "09:00"
    if not date:
        return None
    parsed = parse_iso(f"{date}T{time}:00") or parse_iso(f"{date}T09:00:00")
    return parsed.replace(tzinfo=timezone.utc) if parsed and parsed.tzinfo is None else parsed


def add_scheduled_trip_prompts(store, trip):
    if not rule_enabled(store, "checklists"):
        return 0
    start = trip_start_datetime(trip)
    if not start:
        return 0
    trip_id = trip.get("id", "")
    vessel = trip.get("vessel") or "assigned vessel"
    label = trip_label(trip)
    changes = 0
    schedules = [
        ("Pre Trip Checklist Reminder", start - timedelta(hours=18), f"Pre-trip checklist reminder for {label}. Vessel: {vessel}."),
        ("Post Trip Checklist Reminder", start + timedelta(hours=float(trip.get("hours") or 4) + 1), f"Post-trip checklist reminder for {label}. Please complete the return checklist."),
    ]
    for category, scheduled_for, body in schedules:
        for role_key, role in (("captain", "Captain"), ("mate", "Mate")):
            name = trip.get(role_key, "")
            if not name or name == "None":
                continue
            key = f"scheduled:{category}:{trip_id}:{role}:{name}:{scheduled_for.isoformat()}"
            if ensure_notification(store, key, category, body, "info", role, name, "Checklist", {"tripId": trip_id, "scheduledFor": scheduled_for.isoformat()}):
                changes += 1
            if ensure_whatsapp_draft(store, f"wa:{key}", category, role, name, crew_phone(store, name), body, related_trip=trip_id, related_booking=trip.get("bookingId", "")):
                store["whatsappQueue"][0]["scheduledFor"] = scheduled_for.isoformat()
                changes += 1
    return changes


def queue_trip_role_messages(store, trip, reason):
    if not rule_enabled(store, "tripAssignments" if reason == "newly scheduled" else "tripChanges"):
        return 0
    trip_id = trip.get("id", "")
    date_time = f"{trip.get('tripDate') or 'date pending'} {trip.get('startTime') or ''}".strip()
    changes = 0
    customer = trip.get("customer") or "A trip"
    vessel = trip.get("vessel") or "unassigned vessel"
    owner = owner_for_vessel(store, trip.get("vessel", ""))
    recipients = [
        ("Owner", COMPANY_OWNER_NAME, crew_phone(store, COMPANY_OWNER_NAME), "Owner Booking Alert", f"Owner alert: {customer} is {reason} for {date_time}. Vessel: {vessel}."),
        ("Captain", trip.get("captain", ""), crew_phone(store, trip.get("captain", "")), "Captain Assignment", f"Hi {trip.get('captain') or 'Captain'}, {customer} is {reason} for {date_time}. Vessel: {vessel}."),
        ("Mate", trip.get("mate", ""), crew_phone(store, trip.get("mate", "")), "Mate Assignment", f"Hi {trip.get('mate') or 'Mate'}, {customer} is {reason} for {date_time}. Vessel: {vessel}."),
    ]
    if owner and not is_company_owner(owner):
        recipients.append((VESSEL_OWNER_ROLE, owner, crew_phone(store, owner), "Owner Assignment Alert", f"Owner alert: {vessel} is {reason} for {customer} on {date_time}."))
    for role, name, phone, category, body in recipients:
        if not name or name == "None":
            continue
        key = f"trip:{trip_id}:{reason}:{role}:{name}:{trip.get('tripDate')}:{trip.get('startTime')}:{trip.get('vessel')}"
        changes += ensure_notification(store, key, f"{role} trip update", body, "info", role, name, "Assignment", {"tripId": trip_id, "vessel": trip.get("vessel", "")})
        changes += ensure_whatsapp_draft(store, f"wa:{key}", category, role, name, phone, body, related_trip=trip_id, related_booking=trip.get("bookingId", ""))
    return changes


def apply_notification_rules(previous_store, next_store):
    changes = 0
    normalize_server_store(next_store)
    previous_store = previous_store or {}
    previous_trips = items_by_id(previous_store.get("trips", []))
    for trip in next_store.get("trips", []) or []:
        if not isinstance(trip, dict) or not trip.get("id"):
            continue
        before = previous_trips.get(str(trip.get("id")))
        if not before:
            changes += queue_trip_role_messages(next_store, trip, "newly scheduled")
            changes += add_scheduled_trip_prompts(next_store, trip)
            continue
        watched = ("tripDate", "startTime", "vessel", "captain", "mate", "status")
        if any(str(before.get(key, "")) != str(trip.get(key, "")) for key in watched):
            changes += queue_trip_role_messages(next_store, trip, "updated")
        changes += add_scheduled_trip_prompts(next_store, trip)
        if trip.get("payrollReady") and not before.get("payrollReady"):
            if not rule_enabled(next_store, "payroll"):
                continue
            for role_key, role in (("captain", "Captain"), ("mate", "Mate")):
                name = trip.get(role_key, "")
                if name and name != "None":
                    body = f"Payroll update: payout is ready for {trip_label(trip)}."
                    key = f"payroll-ready:{trip.get('id')}:{role}:{name}"
                    changes += ensure_notification(next_store, key, "Payout ready", body, "success", role, name, "Payroll", {"tripId": trip.get("id")})
                    changes += ensure_whatsapp_draft(next_store, f"wa:{key}", "Owner Payout Statement", role, name, crew_phone(next_store, name), body, related_trip=trip.get("id", ""))

    previous_checklists = items_by_id(previous_store.get("checklistRecords", []))
    trips = items_by_id(next_store.get("trips", []))
    for record in next_store.get("checklistRecords", []) or []:
        if not rule_enabled(next_store, "checklists") or not isinstance(record, dict) or not record.get("id") or str(record.get("id")) in previous_checklists:
            continue
        trip = trips.get(str(record.get("tripId"))) or {}
        vessel_owner = owner_for_vessel(next_store, record.get("vessel") or trip.get("vessel", ""))
        people = [("Captain", record.get("captain") or trip.get("captain", "")), ("Mate", record.get("mate") or trip.get("mate", ""))]
        if vessel_owner and not is_company_owner(vessel_owner):
            people.append((VESSEL_OWNER_ROLE, vessel_owner))
        body = f"{record.get('type', 'Trip')} checklist is {record.get('status', 'saved')} for {record.get('vessel') or trip.get('vessel') or 'a vessel'}."
        if record.get("restockAlerts"):
            body += " Restock needed: " + "; ".join(record.get("restockAlerts", []))
        for role, name in people:
            if not name or name == "None":
                continue
            key = f"checklist:{record.get('id')}:{role}:{name}"
            changes += ensure_notification(next_store, key, f"{record.get('type', 'Trip')} checklist update", body, "warning" if record.get("status") == "Needs Review" or record.get("restockAlerts") else "success", role, name, "Checklist", {"tripId": record.get("tripId", ""), "vessel": record.get("vessel", "")})
            changes += ensure_whatsapp_draft(next_store, f"wa:{key}", f"{record.get('type', 'Trip')} Checklist Reminder", role, name, crew_phone(next_store, name), body, related_trip=record.get("tripId", ""))

    previous_messages = items_by_id(previous_store.get("chatMessages", []))
    conversations = items_by_id(next_store.get("chatConversations", []))
    users = items_by_id(next_store.get("users", []))
    for message in next_store.get("chatMessages", []) or []:
        if not rule_enabled(next_store, "chat") or not isinstance(message, dict) or not message.get("id") or str(message.get("id")) in previous_messages:
            continue
        conversation = conversations.get(str(message.get("conversationId"))) or {}
        for user_id in conversation.get("participantUserIds", []) or []:
            if user_id == message.get("senderUserId"):
                continue
            user = users.get(str(user_id)) or {}
            if not user:
                continue
            body = f"{message.get('senderName') or 'Operations'}: {message.get('messageText') or ''}"
            key = f"chat:{message.get('id')}:{user_id}"
            changes += ensure_notification(next_store, key, "New chat message", body, "info", user.get("role", ""), user.get("name", ""), "Chat", {"conversationId": message.get("conversationId", "")})
            changes += ensure_whatsapp_draft(next_store, f"wa:{key}", "Chat Notification", user.get("role", ""), user.get("name", ""), user_phone(next_store, user), body)

    previous_incidents = items_by_id(previous_store.get("incidentReports", []))
    for incident in next_store.get("incidentReports", []) or []:
        if not rule_enabled(next_store, "incidents") or not isinstance(incident, dict) or not incident.get("id") or str(incident.get("id")) in previous_incidents:
            continue
        owner = owner_for_vessel(next_store, incident.get("vessel", ""))
        body = f"Incident alert: {incident.get('severity', 'Incident')} {incident.get('category', '')} for {incident.get('vessel') or 'operations'}."
        people = [("Captain", incident.get("captain", "")), ("Mate", incident.get("mate", ""))]
        if owner and not is_company_owner(owner):
            people.append((VESSEL_OWNER_ROLE, owner))
        for role, name in people:
            if not name:
                continue
            key = f"incident:{incident.get('id')}:{role}:{name}"
            changes += ensure_notification(next_store, key, "Incident alert", body, "critical" if incident.get("severity") == "Critical" else "warning", role, name, "Incident", {"incidentId": incident.get("id"), "vessel": incident.get("vessel", "")})
            changes += ensure_whatsapp_draft(next_store, f"wa:{key}", "Incident Alert", role, name, crew_phone(next_store, name), body, related_trip=str(incident.get("tripId", "")).split("|")[0])

    previous_payments = items_by_id(previous_store.get("payrollPayments", []))
    for payment in next_store.get("payrollPayments", []) or []:
        if not rule_enabled(next_store, "payroll") or not isinstance(payment, dict) or not payment.get("id") or str(payment.get("id")) in previous_payments:
            continue
        person = payment.get("person") or payment.get("recipient") or payment.get("name") or ""
        if not person:
            continue
        body = f"Payroll payment recorded for {person}: {payment.get('amountPaid') or payment.get('amount') or ''}."
        key = f"payroll-payment:{payment.get('id')}:{person}"
        changes += ensure_notification(next_store, key, "Payroll payment recorded", body, "success", "Crew", person, "Payroll", {"payrollPaymentId": payment.get("id")})
        changes += ensure_whatsapp_draft(next_store, f"wa:{key}", "Owner Payout Statement", "Crew", person, crew_phone(next_store, person), body)
    return changes


def request_json(url, data=None):
    body = json.dumps(data).encode() if data else None
    headers = {"User-Agent": USER_AGENT, "Accept": "application/json"}
    if body:
        headers["Content-Type"] = "application/json"
    with urllib.request.urlopen(urllib.request.Request(url, data=body, headers=headers), timeout=25) as response:
        return json.loads(response.read().decode("utf-8"))


def request_form_json(url, form):
    body = urllib.parse.urlencode(form).encode()
    request = urllib.request.Request(url, data=body, headers={
        "User-Agent": USER_AGENT,
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    })
    with urllib.request.urlopen(request, timeout=25) as response:
        return json.loads(response.read().decode("utf-8"))


def request_authed_json(url, token, data=None):
    body = json.dumps(data).encode() if data is not None else None
    headers = {"User-Agent": USER_AGENT, "Accept": "application/json", "Authorization": f"Bearer {token}"}
    if body is not None:
        headers["Content-Type"] = "application/json"
    request = urllib.request.Request(url, data=body, headers=headers)
    with urllib.request.urlopen(request, timeout=25) as response:
        return json.loads(response.read().decode("utf-8") or "{}")


def request_text(url):
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 ReelAdventureOperations/1.0"})
    with urllib.request.urlopen(request, timeout=25) as response:
        return response.read().decode("utf-8", errors="replace")


def iso_now():
    return datetime.now(timezone.utc).isoformat()


def env_readiness(required_names):
    missing = [name for name in required_names if not os.environ.get(name)]
    return {"configured": not missing, "missing": missing}


def gmail_token_payload():
    try:
        payload = load_app_state_record("gmail_owner_token")
        if isinstance(payload, dict) and payload:
            return payload
    except Exception:
        pass
    payload = read_json_file(GMAIL_TOKEN_FILE) or {}
    if isinstance(payload, dict) and payload:
        try:
            save_app_state_record("gmail_owner_token", payload)
        except Exception:
            pass
        return payload
    refresh_token = os.environ.get("GMAIL_REFRESH_TOKEN", "").strip()
    if refresh_token:
        return {"refresh_token": refresh_token, "updatedAt": "env:GMAIL_REFRESH_TOKEN"}
    return {}


def save_gmail_token(payload):
    token = dict(payload)
    expires_in = int(token.get("expires_in") or 0)
    if expires_in:
        token["expiresAt"] = (datetime.now(timezone.utc) + timedelta(seconds=max(60, expires_in - 60))).isoformat()
    existing = gmail_token_payload()
    if "refresh_token" not in token and existing.get("refresh_token"):
        token["refresh_token"] = existing["refresh_token"]
    token["updatedAt"] = token.get("updatedAt") or iso_now()
    try:
        save_app_state_record("gmail_owner_token", token)
    except Exception:
        pass
    write_json_file(GMAIL_TOKEN_FILE, token)
    return token


def gmail_token_status():
    token = gmail_token_payload()
    now = datetime.now(timezone.utc)
    access_token = token.get("access_token", "")
    refresh_token = token.get("refresh_token", "")
    expires_at = parse_iso(token.get("expiresAt"))
    access_token_valid = bool(access_token and expires_at and expires_at > now)
    expired = bool(access_token and expires_at and expires_at <= now)
    refreshable = bool(refresh_token)
    connected = bool(refreshable or access_token_valid)
    if refreshable:
        status = "Connected + auto-refresh"
        reason = "Refresh token saved. Gmail can refresh automatically after redeploys."
    elif access_token_valid:
        status = "Connected until token expires"
        reason = "Access token is valid now, but no refresh token is saved. Reconnect Gmail to prevent future disconnects."
    elif expired:
        status = "Reconnect required"
        reason = "Access token expired and no Gmail refresh token is saved."
    else:
        status = "Not connected"
        reason = "No Gmail owner token is saved."
    return {
        "connected": connected,
        "refreshable": refreshable,
        "hasRefreshToken": refreshable,
        "accessTokenValid": access_token_valid,
        "expired": expired,
        "needsReconnect": not connected,
        "status": status,
        "reason": reason,
        "email": token.get("email", ""),
        "expiresAt": token.get("expiresAt", ""),
        "updatedAt": token.get("updatedAt", ""),
    }


def gmail_access_token():
    token = gmail_token_payload()
    access_token = token.get("access_token", "")
    expires_at = parse_iso(token.get("expiresAt"))
    if access_token and expires_at and expires_at > datetime.now(timezone.utc):
        return access_token
    refresh_token = token.get("refresh_token")
    if not refresh_token:
        if access_token:
            raise ValueError("Gmail reconnect required: access token expired and no refresh token is saved")
        raise ValueError("Gmail reconnect required: owner account is not connected")
    try:
        refreshed = request_form_json(GMAIL_TOKEN_URL, {
            "client_id": os.environ.get("GMAIL_CLIENT_ID", ""),
            "client_secret": os.environ.get("GMAIL_CLIENT_SECRET", ""),
            "refresh_token": refresh_token,
            "grant_type": "refresh_token",
        })
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace").strip()
        raise ValueError(f"Gmail refresh failed: {detail or error.reason or error.code}") from error
    except urllib.error.URLError as error:
        raise ValueError(f"Gmail refresh failed: {error.reason}") from error
    refreshed["updatedAt"] = iso_now()
    return save_gmail_token(refreshed)["access_token"]


def gmail_message_text(message):
    headers = {item.get("name", "").lower(): item.get("value", "") for item in message.get("payload", {}).get("headers", [])}
    body_text = gmail_payload_text(message.get("payload", {}))
    parts = [
        f"From: {headers.get('from', '')}",
        f"Subject: {headers.get('subject', '')}",
        f"Date: {headers.get('date', '')}",
        "",
        message.get("snippet", ""),
        "",
        body_text,
    ]
    return "\n".join(parts).strip()


def gmail_decode_part(data):
    if not data:
        return ""
    try:
        padded = data + "=" * (-len(data) % 4)
        return base64.urlsafe_b64decode(padded.encode()).decode("utf-8", errors="replace")
    except (ValueError, TypeError):
        return ""


def gmail_payload_text(payload):
    if not isinstance(payload, dict):
        return ""
    mime_type = payload.get("mimeType", "")
    body_data = (payload.get("body") or {}).get("data", "")
    chunks = []
    if body_data and (mime_type.startswith("text/") or not payload.get("parts")):
        text = gmail_decode_part(body_data)
        if mime_type == "text/html":
            text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
            text = re.sub(r"<[^>]+>", " ", text)
            text = html.unescape(text)
        chunks.append(text)
    for part in payload.get("parts", []) or []:
        nested = gmail_payload_text(part)
        if nested:
            chunks.append(nested)
    return "\n".join(chunk.strip() for chunk in chunks if chunk.strip())


def gmail_sync_payload(params=None):
    params = params or {}
    token = gmail_access_token()
    max_results = int(params.get("maxResults", [os.environ.get("GMAIL_SYNC_MAX_RESULTS", "50")])[0] or 50)
    max_results = max(1, min(max_results, 2000))
    page_size = min(max_results, 500)
    default_query = os.environ.get(
        "GMAIL_SYNC_QUERY",
        'newer_than:365d ("New booking" OR "Ext. booking ref" OR "Product booking ref" OR "Booking Reference" OR "Viator booking" OR "VIA-" OR "REE-T" OR reservation OR confirmation)',
    )
    query_text = params.get("q", [default_query])[0]
    messages = []
    result_estimate = 0
    next_page_token = ""
    while len(messages) < max_results:
        query = urllib.parse.urlencode({
            "maxResults": min(page_size, max_results - len(messages)),
            "q": query_text,
            **({"pageToken": next_page_token} if next_page_token else {}),
        })
        listing = request_authed_json(f"{GMAIL_API_ROOT}/messages?{query}", token)
        result_estimate = max(result_estimate, int(listing.get("resultSizeEstimate", 0) or 0))
        for item in listing.get("messages", []):
            msg_id = item.get("id")
            if not msg_id:
                continue
            meta_query = urllib.parse.urlencode({"format": "full", "metadataHeaders": ["From", "Subject", "Date"]}, doseq=True)
            message = request_authed_json(f"{GMAIL_API_ROOT}/messages/{urllib.parse.quote(msg_id)}?{meta_query}", token)
            headers = {header.get("name", ""): header.get("value", "") for header in message.get("payload", {}).get("headers", [])}
            messages.append({
                "id": msg_id,
                "threadId": message.get("threadId", ""),
                "source": "Live Gmail API",
                "sender": headers.get("From", ""),
                "subject": headers.get("Subject", ""),
                "receivedDate": headers.get("Date", ""),
                "snippet": message.get("snippet", ""),
                "rawText": gmail_message_text(message),
            })
            if len(messages) >= max_results:
                break
        next_page_token = listing.get("nextPageToken", "")
        if not next_page_token:
            break
    return {"ok": True, "messages": messages, "resultSizeEstimate": result_estimate or len(messages), "updatedAt": iso_now()}


def whatsapp_send_message(payload):
    readiness = env_readiness(WHATSAPP_REQUIRED_ENV)
    if not readiness["configured"]:
        raise ValueError(f"WhatsApp Business credentials missing: {', '.join(readiness['missing'])}")
    phone = re.sub(r"\D+", "", str(payload.get("phoneNumber", "")))
    body = str(payload.get("messageBody", "")).strip()
    if not phone or not body:
        raise ValueError("phoneNumber and messageBody are required")
    url = f"https://graph.facebook.com/{WHATSAPP_GRAPH_VERSION}/{os.environ['WHATSAPP_PHONE_NUMBER_ID']}/messages"
    result = request_authed_json(url, os.environ["WHATSAPP_ACCESS_TOKEN"], {
        "messaging_product": "whatsapp",
        "to": phone,
        "type": "text",
        "text": {"preview_url": False, "body": body},
    })
    return {"ok": True, "provider": "Meta WhatsApp Cloud API", "result": result, "updatedAt": iso_now()}


def whatsapp_queue_item_ready(item, now=None, include_manual=False):
    now = now or datetime.now(timezone.utc)
    if str(item.get("status")) != "Ready":
        return False
    if not normalize_digits(item.get("phoneNumber")) or not str(item.get("messageBody", "")).strip():
        return False
    if item.get("approvalRequired") and not include_manual:
        return False
    if not item.get("autoSend") and not include_manual:
        return False
    scheduled = parse_iso(item.get("scheduledFor"))
    return not scheduled or scheduled <= now


def delivery_log_entry(item, status, detail):
    return {
        "id": server_id("wa-delivery"),
        "messageId": item.get("id", ""),
        "category": item.get("category", ""),
        "recipientName": item.get("recipientName", ""),
        "recipientRole": item.get("recipientRole", ""),
        "status": status,
        "detail": detail,
        "at": iso_now(),
    }


def process_whatsapp_queue(limit=None, include_manual=False):
    state = load_operations_state()
    if not state.get("hasStore"):
        return {"ok": True, "processed": 0, "sent": 0, "failed": 0, "results": [], "updatedAt": iso_now()}
    store = state.get("store") or {}
    normalize_server_store(store)
    limit = max(1, int(limit or WHATSAPP_AUTO_SEND_LIMIT))
    results = []
    sent = failed = 0
    now = datetime.now(timezone.utc)
    for item in store.get("whatsappQueue", []):
        if len(results) >= limit:
            break
        if not whatsapp_queue_item_ready(item, now, include_manual):
            continue
        item["attemptCount"] = int(item.get("attemptCount") or 0) + 1
        item["lastAttemptAt"] = iso_now()
        try:
            response = whatsapp_send_message(item)
            business_id = (((response.get("result") or {}).get("messages") or [{}])[0] or {}).get("id", "")
            item["status"] = "Sent via Business API"
            item["sentAt"] = response.get("updatedAt") or iso_now()
            item["businessMessageId"] = business_id
            item["lastError"] = ""
            sent += 1
            results.append({"messageId": item.get("id"), "ok": True, "businessMessageId": business_id})
            store["whatsappDeliveryLog"].insert(0, delivery_log_entry(item, "Sent", business_id or "Sent via Business API"))
        except Exception as error:
            item["status"] = "Failed"
            item["lastError"] = str(error)
            failed += 1
            results.append({"messageId": item.get("id"), "ok": False, "error": str(error)})
            store["whatsappDeliveryLog"].insert(0, delivery_log_entry(item, "Failed", str(error)))
    store["whatsappDeliveryLog"] = store.get("whatsappDeliveryLog", [])[:200]
    store["whatsappAutomationLastRun"] = {"at": iso_now(), "processed": len(results), "sent": sent, "failed": failed}
    updated_at = save_operations_state(store)
    append_event_log("whatsapp-queue-process", store["whatsappAutomationLastRun"])
    return {"ok": True, "processed": len(results), "sent": sent, "failed": failed, "results": results, "store": store, "updatedAt": updated_at}


def parse_iso(value):
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None


def read_json_file(path):
    try:
        with open(path, "r", encoding="utf-8") as file:
            return json.load(file)
    except (OSError, json.JSONDecodeError):
        return None


def write_json_file(path, payload):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    temp_path = f"{path}.tmp"
    with open(temp_path, "w", encoding="utf-8") as file:
        json.dump(payload, file)
    os.replace(temp_path, path)


def cache_age_seconds(payload):
    cached_at = parse_iso(payload.get("cachedAt") or payload.get("updatedAt"))
    if not cached_at:
        return float("inf")
    return (datetime.now(timezone.utc) - cached_at).total_seconds()


def weather_cache_is_fresh(payload):
    ttl = WEATHER_FALLBACK_TTL_SECONDS if payload.get("provider") == "Fallback Nassau Weather" else WEATHER_CACHE_TTL_SECONDS
    return cache_age_seconds(payload) < ttl


def save_json_cache(path, payload):
    cached = dict(payload)
    cached["cachedAt"] = iso_now()
    try:
        write_json_file(path, cached)
    except OSError as error:
        cached["cacheWarning"] = f"Cache write skipped: {error}"
    return cached


def save_weather_cache(payload):
    return save_json_cache(WEATHER_CACHE_FILE, payload)


def save_cruise_cache(payload):
    return save_json_cache(CRUISE_CACHE_FILE, payload)


def annotate_weather_payload(payload, cache_status, warning=""):
    result = dict(payload)
    result["cacheStatus"] = cache_status
    if warning:
        result["warning"] = warning
    return result


def annotate_cruise_payload(payload, cache_status, warning=""):
    result = dict(payload)
    result["cacheStatus"] = cache_status
    if warning:
        result["warning"] = warning
    return result


def weather_from_windy(api_key):
    data = request_json(WINDY_URL, {
        "lat": NASSAU_LAT, "lon": NASSAU_LON, "model": "gfs",
        "parameters": ["wind", "windGust", "temp", "precip"],
        "levels": ["surface"], "key": api_key,
    })
    timestamps = data.get("ts", [])
    records = []
    for index, timestamp in enumerate(timestamps[:168]):
        at = datetime.fromtimestamp(timestamp / 1000, timezone.utc)
        u = float(data.get("wind_u-surface", [0] * len(timestamps))[index] or 0)
        v = float(data.get("wind_v-surface", [0] * len(timestamps))[index] or 0)
        gust = float(data.get("gust-surface", [0] * len(timestamps))[index] or 0)
        wind_knots = round((u * u + v * v) ** 0.5 * 1.94384)
        records.append(weather_record(at, wind_knots, round(gust * 1.94384), 0, "Windy GFS"))
    return {"provider": "Windy", "sourceUrl": "https://www.windy.com/?25.056,-77.352,5", "updatedAt": iso_now(), "records": records}


def weather_record(at, wind_knots, gust_knots, rain_chance, source):
    return {
        "id": f"live-weather-{int(at.timestamp())}", "date": at.strftime("%Y-%m-%d"), "time": at.strftime("%H:%M"),
        "location": "Nassau, Bahamas", "windSpeed": wind_knots, "windGusts": gust_knots,
        "rainChance": rain_chance, "stormRisk": "Low" if rain_chance < 60 else "Moderate",
        "seaConditions": "Choppy" if wind_knots >= 20 else "Moderate" if wind_knots >= 12 else "Calm",
        "visibility": "Good", "notes": f"Live Nassau forecast from {source}.",
        "weatherSource": source, "apiProvider": source, "forecastId": f"{source.lower()}-{int(at.timestamp())}",
        "lastUpdated": iso_now(),
    }


def weather_from_open_meteo():
    query = urllib.parse.urlencode({
        "latitude": NASSAU_LAT, "longitude": NASSAU_LON,
        "hourly": "wind_speed_10m,wind_gusts_10m,precipitation_probability",
        "wind_speed_unit": "kn", "timezone": "America/Nassau", "forecast_days": 7,
    })
    data = request_json(f"{OPEN_METEO_URL}?{query}")
    hourly = data.get("hourly", {})
    records = []
    for index, stamp in enumerate(hourly.get("time", [])[:168]):
        at = datetime.fromisoformat(stamp).replace(tzinfo=timezone.utc)
        records.append(weather_record(
            at, round(float(hourly.get("wind_speed_10m", [0])[index] or 0)),
            round(float(hourly.get("wind_gusts_10m", [0])[index] or 0)),
            round(float(hourly.get("precipitation_probability", [0])[index] or 0)), "Open-Meteo",
        ))
    return {"provider": "Open-Meteo", "sourceUrl": "https://www.windy.com/?25.056,-77.352,5", "updatedAt": iso_now(), "records": records}


def met_no_rain_chance(precipitation_amount):
    if precipitation_amount <= 0:
        return 10
    if precipitation_amount < 0.5:
        return 25
    if precipitation_amount < 2:
        return 45
    return 70


def weather_from_met_no():
    query = urllib.parse.urlencode({"lat": NASSAU_LAT, "lon": NASSAU_LON})
    data = request_json(f"{MET_NO_URL}?{query}")
    records = []
    for item in data.get("properties", {}).get("timeseries", [])[:168]:
        at = datetime.fromisoformat(item["time"].replace("Z", "+00:00"))
        details = item.get("data", {}).get("instant", {}).get("details", {})
        next_hour = item.get("data", {}).get("next_1_hours", {}).get("details", {})
        wind_mps = float(details.get("wind_speed") or 0)
        gust_mps = float(details.get("wind_speed_of_gust") or wind_mps)
        precip = float(next_hour.get("precipitation_amount") or 0)
        records.append(weather_record(
            at,
            round(wind_mps * 1.94384),
            round(gust_mps * 1.94384),
            met_no_rain_chance(precip),
            "MET Norway",
        ))
    if not records:
        raise ValueError("MET Norway returned no Nassau forecast records")
    return {"provider": "MET Norway", "sourceUrl": "https://api.met.no/weatherapi/locationforecast/2.0/documentation", "updatedAt": iso_now(), "records": records}


def fallback_weather(error_message=""):
    now = datetime.now(timezone.utc)
    records = []
    for day in range(7):
        for hour in (8, 11, 14, 17):
            at = (now + timedelta(days=day)).replace(hour=hour, minute=0, second=0, microsecond=0)
            wind = 10 + ((day + hour) % 5)
            gust = wind + 5
            rain = 20 + ((day * 7 + hour) % 35)
            records.append(weather_record(at, wind, gust, rain, "Fallback Nassau Weather"))
    warning = "Live weather provider unavailable; using temporary Nassau planning fallback."
    if error_message:
        warning = f"{warning} {error_message}"
    return {
        "provider": "Fallback Nassau Weather",
        "sourceUrl": "https://www.windy.com/?25.056,-77.352,5",
        "updatedAt": iso_now(),
        "records": records,
        "warning": warning,
    }


def weather_forecast_payload():
    cached = read_json_file(WEATHER_CACHE_FILE)
    if cached and weather_cache_is_fresh(cached):
        return annotate_weather_payload(cached, "fresh-cache")
    try:
        key = os.environ.get("WINDY_API_KEY", "").strip()
        if key:
            payload = weather_from_windy(key)
        else:
            try:
                payload = weather_from_met_no()
            except (urllib.error.URLError, ValueError, KeyError, IndexError):
                payload = weather_from_open_meteo()
        return annotate_weather_payload(save_weather_cache(payload), "fresh")
    except (urllib.error.URLError, ValueError, KeyError, IndexError) as error:
        cached = read_json_file(WEATHER_CACHE_FILE)
        if cached:
            return annotate_weather_payload(
                cached,
                "stale-cache",
                f"Live weather provider unavailable; showing the last saved Nassau forecast. {error}",
            )
        return annotate_weather_payload(save_weather_cache(fallback_weather(str(error))), "fallback")


class CruiseScheduleParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_schedule = False
        self.in_row = False
        self.in_cell = False
        self.cell_parts = []
        self.cells = []
        self.ship = ""
        self.cruise_line = ""
        self.rows = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "table" and "portItemSchedule" in attrs.get("class", ""):
            self.in_schedule = True
        elif self.in_schedule and tag == "tr":
            self.in_row, self.cells, self.ship, self.cruise_line = True, [], "", ""
        elif self.in_row and tag == "td":
            self.in_cell, self.cell_parts = True, []
        elif self.in_cell and tag == "a" and "/ships/" in attrs.get("href", ""):
            self.ship = ""
        elif self.in_cell and tag == "img" and "cruise line" in attrs.get("alt", ""):
            self.cruise_line = re.sub(r"\s+cruise line$", "", attrs["alt"], flags=re.I)

    def handle_data(self, data):
        if self.in_cell:
            self.cell_parts.append(data.strip())

    def handle_endtag(self, tag):
        if self.in_cell and tag == "td":
            value = " ".join(part for part in self.cell_parts if part)
            self.cells.append(value)
            if len(self.cells) == 2:
                self.ship = value
            self.in_cell = False
        elif self.in_row and tag == "tr":
            if len(self.cells) >= 4 and re.search(r"\d{4}", self.cells[0]):
                date_text = re.sub(r"\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$", "", self.cells[0])
                try:
                    arrival_date = datetime.strptime(date_text, "%d %B, %Y").strftime("%Y-%m-%d")
                    self.rows.append({
                        "id": f"cruisemapper-{arrival_date}-{re.sub(r'[^a-z0-9]+', '-', self.ship.lower()).strip('-')}",
                        "arrivalDate": arrival_date, "shipName": self.ship, "cruiseLine": self.cruise_line,
                        "arrivalTime": self.cells[2], "departureTime": self.cells[3], "passengerCapacity": 0,
                        "terminalDock": "", "postedStatus": "No", "opportunityStatus": "New",
                        "notes": "Automatically synced from CruiseMapper Nassau schedule",
                    })
                except ValueError:
                    pass
            self.in_row = False
        elif self.in_schedule and tag == "table":
            self.in_schedule = False


def cruise_schedule():
    now = datetime.now()
    rows = []
    for offset in range(3):
        month = now.month + offset
        year = now.year + (month - 1) // 12
        month = (month - 1) % 12 + 1
        html_text = request_text(f"{CRUISEMAPPER_URL}?month={year:04d}-{month:02d}#schedule")
        parser = CruiseScheduleParser()
        parser.feed(html_text)
        rows.extend(parser.rows)
    unique = {f"{row['arrivalDate']}|{row['shipName']}": row for row in rows}
    return {"provider": "CruiseMapper", "sourceUrl": CRUISEMAPPER_URL, "updatedAt": iso_now(), "records": list(unique.values())}


def cruise_schedule_payload():
    cached = read_json_file(CRUISE_CACHE_FILE)
    if cached and cache_age_seconds(cached) < CRUISE_CACHE_TTL_SECONDS:
        return annotate_cruise_payload(cached, "fresh-cache")
    try:
        payload = cruise_schedule()
        return annotate_cruise_payload(save_cruise_cache(payload), "fresh")
    except (urllib.error.URLError, ValueError, KeyError, IndexError) as error:
        cached = read_json_file(CRUISE_CACHE_FILE)
        if cached:
            return annotate_cruise_payload(
                cached,
                "stale-cache",
                f"CruiseMapper unavailable; showing the last saved Nassau cruise schedule. {error}",
            )
        return annotate_cruise_payload({
            "provider": "CruiseMapper",
            "sourceUrl": CRUISEMAPPER_URL,
            "updatedAt": iso_now(),
            "records": [],
        }, "unavailable", f"CruiseMapper unavailable and no cached Nassau schedule is saved yet. {error}")


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_json(self, payload, status=200):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self):
        length = int(self.headers.get("Content-Length", "0") or 0)
        if not length:
            return {}
        raw = self.rfile.read(length).decode("utf-8")
        return json.loads(raw or "{}")

    def send_html(self, title, message, status=200):
        body = f"""<!doctype html><html><head><meta charset="utf-8"><title>{html.escape(title)}</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="font-family:system-ui;padding:28px;line-height:1.5"><h1>{html.escape(title)}</h1><p>{html.escape(message)}</p><p><a href="/index.html">Return to Reel Adventure Tours</a></p></body></html>""".encode()
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def handle_gmail_oauth_start(self):
        readiness = env_readiness(GMAIL_REQUIRED_ENV)
        if not readiness["configured"]:
            self.send_json({"error": "Gmail OAuth credentials are not configured", "missing": readiness["missing"], "updatedAt": iso_now()}, 400)
            return
        state = secrets.token_urlsafe(32)
        write_json_file(GMAIL_STATE_FILE, {"state": state, "createdAt": iso_now()})
        params = urllib.parse.urlencode({
            "client_id": os.environ["GMAIL_CLIENT_ID"],
            "redirect_uri": os.environ["GMAIL_REDIRECT_URI"],
            "response_type": "code",
            "scope": GMAIL_SCOPE,
            "access_type": "offline",
            "include_granted_scopes": "true",
            "prompt": "consent",
            "state": state,
        })
        self.send_response(302)
        self.send_header("Location", f"{GMAIL_AUTH_URL}?{params}")
        self.end_headers()

    def handle_gmail_oauth_callback(self):
        params = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        if params.get("error"):
            self.send_html("Gmail connection cancelled", params["error"][0], 400)
            return
        state = params.get("state", [""])[0]
        code = params.get("code", [""])[0]
        expected = (read_json_file(GMAIL_STATE_FILE) or {}).get("state", "")
        if not state or state != expected or not code:
            self.send_html("Gmail connection failed", "OAuth state or code was invalid. Start the connection again from the Owner profile.", 400)
            return
        token = request_form_json(GMAIL_TOKEN_URL, {
            "client_id": os.environ.get("GMAIL_CLIENT_ID", ""),
            "client_secret": os.environ.get("GMAIL_CLIENT_SECRET", ""),
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": os.environ.get("GMAIL_REDIRECT_URI", ""),
        })
        token["updatedAt"] = iso_now()
        saved = save_gmail_token(token)
        try:
            profile = request_authed_json(f"{GMAIL_API_ROOT}/profile", saved["access_token"])
            saved["email"] = profile.get("emailAddress", "")
            save_gmail_token(saved)
        except (urllib.error.URLError, ValueError, KeyError):
            pass
        self.send_html("Gmail connected", "The Owner Gmail account is connected. Return to the app and use Sync Gmail.")

    def handle_whatsapp_webhook_verify(self):
        params = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        verify_token = os.environ.get("WHATSAPP_WEBHOOK_VERIFY_TOKEN", "")
        if params.get("hub.mode", [""])[0] == "subscribe" and params.get("hub.verify_token", [""])[0] == verify_token and verify_token:
            challenge = params.get("hub.challenge", [""])[0].encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.send_header("Content-Length", str(len(challenge)))
            self.end_headers()
            self.wfile.write(challenge)
            return
        self.send_json({"error": "Webhook verification failed", "updatedAt": iso_now()}, 403)

    def do_GET(self):
        try:
            if self.path.startswith("/api/widget/boatbooker-weather.js"):
                body = request_text(BOATBOOKER_WIDGET_BUILDER_URL).encode()
                self.send_response(200)
                self.send_header("Content-Type", "text/javascript; charset=utf-8")
                self.send_header("Cache-Control", "public, max-age=3600")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
            if self.path.startswith("/api/weather/nassau"):
                self.send_json(weather_forecast_payload())
                return
            if self.path.startswith("/api/cruise/nassau"):
                self.send_json(cruise_schedule_payload())
                return
            if self.path.startswith("/api/store"):
                payload = load_operations_state()
                payload.update({"ok": True, "database": database_status(), "serverUpdatedAt": iso_now()})
                self.send_json(payload)
                return
            if self.path.startswith("/api/integrations/status"):
                self.send_json({
                    "ok": True,
                    "release": APP_RELEASE,
                    "gmail": {**env_readiness(GMAIL_REQUIRED_ENV), **gmail_token_status()},
                    "whatsapp": {**env_readiness(WHATSAPP_REQUIRED_ENV), "webhookConfigured": bool(os.environ.get("WHATSAPP_WEBHOOK_VERIFY_TOKEN")), "autoSendEnabled": WHATSAPP_AUTO_SEND_ENABLED, "customerAutoSend": WHATSAPP_CUSTOMER_AUTO_SEND},
                    "database": database_status(),
                    "updatedAt": iso_now(),
                })
                return
            if self.path.startswith("/api/gmail/oauth/start"):
                self.handle_gmail_oauth_start()
                return
            if self.path.startswith("/api/gmail/oauth/callback"):
                self.handle_gmail_oauth_callback()
                return
            if self.path.startswith("/api/gmail/sync"):
                self.send_json(gmail_sync_payload(urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)))
                return
            if self.path.startswith("/api/whatsapp/webhook"):
                self.handle_whatsapp_webhook_verify()
                return
            if self.path.startswith("/api/health"):
                self.send_json({
                    "ok": True,
                    "release": APP_RELEASE,
                    "windyConfigured": bool(os.environ.get("WINDY_API_KEY")),
                    "gmailConfigured": env_readiness(GMAIL_REQUIRED_ENV)["configured"],
                    "gmailConnected": gmail_token_status()["connected"],
                    "whatsappConfigured": env_readiness(WHATSAPP_REQUIRED_ENV)["configured"],
                    "whatsappAutoSendEnabled": WHATSAPP_AUTO_SEND_ENABLED,
                    "database": database_status(),
                    "updatedAt": iso_now(),
                })
                return
            super().do_GET()
        except (urllib.error.URLError, ValueError, KeyError, IndexError) as error:
            self.send_json({"error": str(error), "updatedAt": iso_now()}, 502)

    def do_POST(self):
        try:
            if self.path.startswith("/api/store"):
                body = self.read_json_body()
                incoming = body.get("store") if isinstance(body, dict) else None
                if not isinstance(incoming, dict):
                    self.send_json({"error": "store object is required", "updatedAt": iso_now()}, 400)
                    return
                existing = load_operations_state()
                previous_store = existing.get("store") if existing.get("hasStore") else None
                incoming["updatedAt"] = incoming.get("updatedAt") or iso_now()
                rule_changes = apply_notification_rules(previous_store, incoming)
                incoming["serverSyncedAt"] = iso_now()
                incoming["notificationRulesLastRun"] = {"at": iso_now(), "changes": rule_changes}
                updated_at = save_operations_state(incoming)
                append_event_log("store-sync", {"user": body.get("user", ""), "ruleChanges": rule_changes, "clientUpdatedAt": body.get("clientUpdatedAt", "")})
                self.send_json({"ok": True, "store": incoming, "updatedAt": updated_at, "ruleChanges": rule_changes})
                return
            if self.path.startswith("/api/whatsapp/send"):
                self.send_json(whatsapp_send_message(self.read_json_body()))
                return
            if self.path.startswith("/api/whatsapp/process-queue"):
                body = self.read_json_body()
                self.send_json(process_whatsapp_queue(body.get("limit"), bool(body.get("includeManual"))))
                return
            if self.path.startswith("/api/whatsapp/webhook"):
                event = self.read_json_body()
                inbound = save_whatsapp_webhook_event(event)
                self.send_json({"ok": True, "inboundCount": len(inbound), "updatedAt": iso_now()})
                return
            if self.path.startswith("/api/woodstock/sync"):
                body = self.read_json_body()
                api_url = str(body.get("apiUrl", "")).rstrip("/")
                api_key = str(body.get("apiKey", ""))
                last_sync = str(body.get("lastSyncAt", ""))
                if not api_url or not api_key:
                    self.send_json({"error": "Missing apiUrl or apiKey."}, 400)
                    return
                endpoint = f"{api_url}/bookings"
                if last_sync:
                    endpoint += f"?updated_since={urllib.parse.quote(last_sync)}"
                req = urllib.request.Request(
                    endpoint,
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Accept": "application/json",
                        "User-Agent": USER_AGENT,
                    }
                )
                with urllib.request.urlopen(req, timeout=15) as resp:
                    raw = json.loads(resp.read().decode())
                bookings = raw.get("bookings") or raw.get("data") or (raw if isinstance(raw, list) else [])
                append_event_log("woodstock_sync", {"count": len(bookings), "apiUrl": api_url})
                self.send_json({"bookings": bookings, "count": len(bookings), "updatedAt": iso_now()})
                return
            self.send_json({"error": "Unknown API route", "updatedAt": iso_now()}, 404)
        except (urllib.error.URLError, ValueError, KeyError, json.JSONDecodeError) as error:
            self.send_json({"error": str(error), "updatedAt": iso_now()}, 502)


if __name__ == "__main__":
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "4174"))
    print(f"Reel Adventure Operations server: http://{host}:{port}/index.html")
    ThreadingHTTPServer((host, port), AppHandler).serve_forever()
