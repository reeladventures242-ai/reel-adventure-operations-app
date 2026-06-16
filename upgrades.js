/* ═══════════════════════════════════════════════════════════════════════
   upgrades.js — Reel Adventure Tours Operations App
   All upgrades load after app.js and patch it in place.

   1. WhatsApp Quick-Send Modal (topbar button + card buttons)
   2. WhatsApp Business API activation guide in Settings
   3. Woodstock booking sync
   4. Supabase shared database
   5. Push notifications to crew phones
   6. Auto-patch existing app.js functions
   ═══════════════════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────────────────────────
   1. WHATSAPP QUICK-SEND MODAL
   ─────────────────────────────────────────────────────────────────────── */

const WA_QUICK_CATEGORIES = [
  { label: 'Booking Confirmation', icon: '✅', template: 'Customer Booking Confirmation', role: 'Customer' },
  { label: 'Trip Reminder',        icon: '⏰', template: 'Trip Reminder',                 role: 'Customer' },
  { label: 'Meeting Point',        icon: '📍', template: 'Meeting Point Message',          role: 'Customer' },
  { label: 'Payment Reminder',     icon: '💳', template: 'Invoice / Payment Reminder',    role: 'Customer' },
  { label: 'Captain Alert',        icon: '🧢', template: 'Captain Assignment',             role: 'Captain'  },
  { label: 'Mate Alert',           icon: '⚓', template: 'Mate Assignment',               role: 'Mate'     },
  { label: 'Owner Alert',          icon: '👑', template: 'Owner Assignment Alert',         role: 'Owner'    },
  { label: 'Weather Alert',        icon: '🌦️', template: 'Weather Alert',                 role: 'Customer' },
  { label: 'Pre-Trip Checklist',   icon: '📋', template: 'Pre Trip Checklist Reminder',   role: 'Captain'  },
  { label: 'Payment Receipt',      icon: '🧾', template: 'Payment Receipt',               role: 'Customer' },
];

let _waCurrentCategory = '';
let _waCurrentRole = 'Customer';

function openWhatsAppQuickSend(category = null, tripId = '', invoiceId = '') {
  document.getElementById('waQuickModal')?.remove();

  const apiLive = store?.integrationStatus?.whatsappConfigured;
  const statusPill = apiLive
    ? '<span class="wa-status-pill wa-live">🟢 Business API Live</span>'
    : '<span class="wa-status-pill wa-manual">🟡 Opens in WhatsApp</span>';

  const tripOptions = (store?.trips || [])
    .filter(t => t.status !== 'Cancelled')
    .sort((a, b) => String(a.tripDate || '').localeCompare(String(b.tripDate || '')))
    .map(t => `<option value="${escapeHtml(t.id)}" ${t.id === tripId ? 'selected' : ''}>
      ${escapeHtml(formatDate(t.tripDate))} · ${escapeHtml(t.customer || 'Trip')}
    </option>`)
    .join('');

  const categoryGrid = WA_QUICK_CATEGORIES.map(cat => `
    <button type="button" class="wa-cat-btn ${category === cat.template ? 'wa-cat-selected' : ''}"
      onclick="waSelectCategory('${escapeHtml(cat.template)}','${escapeHtml(cat.role)}')">
      <span class="wa-cat-icon">${cat.icon}</span>
      <span>${escapeHtml(cat.label)}</span>
      <small>${escapeHtml(cat.role)}</small>
    </button>`).join('');

  let previewBody = '';
  if (category && typeof whatsappContextDefaults === 'function') {
    const defaults = whatsappContextDefaults(category, tripId, invoiceId);
    previewBody = defaults.body || '';
  }

  document.body.insertAdjacentHTML('beforeend', `
    <div class="wa-modal-backdrop" id="waQuickModal" onclick="waBackdropClose(event)">
      <div class="wa-modal-sheet" role="dialog" aria-modal="true" aria-label="Send WhatsApp message">
        <div class="wa-modal-handle"></div>
        <div class="wa-modal-head">
          <div>
            <h3>📲 Send WhatsApp</h3>
            <p>One tap to send or open in WhatsApp ${statusPill}</p>
          </div>
          <button type="button" class="wa-modal-close" onclick="document.getElementById('waQuickModal').remove()">×</button>
        </div>

        <select class="wa-trip-select" id="waQuickTrip" onchange="waRefreshPreview()">
          <option value="">— Select a trip (optional) —</option>
          ${tripOptions}
        </select>

        <div class="wa-cat-grid">${categoryGrid}</div>

        <div id="waQuickComposer" style="${category ? '' : 'display:none'}">
          <div class="wa-composer-fields">
            <input id="waQuickPhone" type="tel" placeholder="Phone with country code e.g. 12425550100"
              class="wa-field">
            <input id="waQuickRecipient" type="text" placeholder="Recipient name"
              class="wa-field">
          </div>
          <textarea id="waQuickBody" class="wa-body-field"
            placeholder="Select a category above to populate the message...">${escapeHtml(previewBody)}</textarea>
          <div class="wa-send-row">
            <button type="button" class="wa-send-btn" onclick="waFireSend()">
              ${apiLive ? '🚀 Send via API' : '📲 Open in WhatsApp'}
            </button>
            <button type="button" class="wa-copy-btn" onclick="waCopyMsg()">Copy</button>
          </div>
        </div>
      </div>
    </div>`);

  if (tripId) {
    const sel = document.getElementById('waQuickTrip');
    if (sel) sel.value = tripId;
  }
  if (category) waSelectCategory(category, WA_QUICK_CATEGORIES.find(c => c.template === category)?.role || 'Customer', false);
}

function waBackdropClose(e) {
  if (e.target.id === 'waQuickModal') document.getElementById('waQuickModal')?.remove();
}

function waSelectCategory(template, role, scroll = true) {
  _waCurrentCategory = template;
  _waCurrentRole = role || 'Customer';
  document.querySelectorAll('.wa-cat-btn').forEach(btn => {
    btn.classList.toggle('wa-cat-selected',
      btn.textContent.trim().startsWith(WA_QUICK_CATEGORIES.find(c => c.template === template)?.icon || '___'));
  });
  waRefreshPreview();
  const composer = document.getElementById('waQuickComposer');
  if (composer) {
    composer.style.display = '';
    if (scroll) composer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function waRefreshPreview() {
  if (!_waCurrentCategory || typeof whatsappContextDefaults !== 'function') return;
  const tripId = document.getElementById('waQuickTrip')?.value || '';
  const defaults = whatsappContextDefaults(_waCurrentCategory, tripId, '');
  const body = document.getElementById('waQuickBody');
  const phone = document.getElementById('waQuickPhone');
  const recipient = document.getElementById('waQuickRecipient');
  if (body && !body.dataset.userEdited) body.value = defaults.body || '';
  if (phone && !phone.value) phone.value = defaults.phone || '';
  if (recipient && !recipient.value) recipient.value = defaults.recipientName || '';
  if (body) body.addEventListener('input', () => { body.dataset.userEdited = '1'; }, { once: true });
}

async function waFireSend() {
  const phone = document.getElementById('waQuickPhone')?.value?.trim() || '';
  const body = document.getElementById('waQuickBody')?.value?.trim() || '';
  const recipient = document.getElementById('waQuickRecipient')?.value?.trim() || 'Customer';
  const tripId = document.getElementById('waQuickTrip')?.value || '';

  if (!body) { toast('Add a message before sending.'); return; }
  if (!phone) { toast('Enter a phone number.'); return; }

  const digits = typeof whatsappDigits === 'function' ? whatsappDigits(phone) : phone.replace(/\D/g,'');
  if (!digits || digits.length < 7) { toast('Phone number not valid. Include country code.'); return; }

  // Save to queue
  if (store && Array.isArray(store.whatsappQueue)) {
    store.whatsappQueue.unshift({
      id: typeof makeId === 'function' ? makeId('wa-quick') : `wa-${Date.now()}`,
      recipientName: recipient,
      recipientRole: _waCurrentRole,
      phoneNumber: phone,
      category: _waCurrentCategory || 'Custom',
      messageBody: body,
      relatedTrip: tripId,
      status: 'Opened in WhatsApp',
      createdAt: new Date().toISOString(),
      sentAt: new Date().toISOString(),
      createdBy: typeof currentUserLabel === 'function' ? currentUserLabel() : 'User'
    });
    if (typeof saveStore === 'function') saveStore();
  }

  // Try Business API if live
  if (store?.integrationStatus?.whatsappConfigured && typeof isCompanyOwnerUser === 'function' && isCompanyOwnerUser()) {
    try {
      const resp = await fetch('api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone, messageBody: body, category: _waCurrentCategory })
      });
      const payload = await resp.json();
      if (!resp.ok || payload.error) throw new Error(payload.error || 'Send failed');
      document.getElementById('waQuickModal')?.remove();
      toast(`✅ Sent to ${recipient} via WhatsApp Business API.`);
      return;
    } catch (err) {
      console.warn('Business API fallback to wa.me:', err.message);
    }
  }

  // Manual fallback — open wa.me
  window.open(`https://wa.me/${digits}?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
  document.getElementById('waQuickModal')?.remove();
  toast(`WhatsApp opened for ${recipient}. Tap Send in WhatsApp.`);
}

async function waCopyMsg() {
  const body = document.getElementById('waQuickBody')?.value || '';
  try { await navigator.clipboard.writeText(body); } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = body;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  toast('Message copied.');
}

// Card-level WhatsApp button — call from any trip/booking card
function renderCardWaButton(tripId, category = 'Customer Booking Confirmation') {
  return `<button type="button" class="card-wa-btn"
    onclick="event.stopPropagation();openWhatsAppQuickSend('${escapeHtml(category)}','${escapeHtml(tripId)}')">
    📲 WhatsApp
  </button>`;
}


/* ───────────────────────────────────────────────────────────────────────
   2. WHATSAPP BUSINESS API ACTIVATION BANNER
   ─────────────────────────────────────────────────────────────────────── */

function waActivationBannerMarkup() {
  const configured = store?.integrationStatus?.whatsappConfigured;
  if (configured) return `
    <div class="upgrade-banner upgrade-banner-green">
      <div>
        <strong>🟢 WhatsApp Business API is Live</strong>
        <small>Messages send directly from this app without opening WhatsApp.</small>
      </div>
      <button class="upgrade-banner-btn" onclick="refreshIntegrationStatus()">Check Status</button>
    </div>`;

  return `
    <div class="upgrade-banner">
      <div>
        <strong>📲 Activate WhatsApp Business API</strong>
        <small>Add 3 environment variables in Render — takes about 5 minutes.</small>
      </div>
      <button class="upgrade-banner-btn" onclick="showWaActivationSteps()">How to Activate</button>
    </div>`;
}

function showWaActivationSteps() {
  document.getElementById('waSteps')?.remove();
  const host = document.querySelector('.settings-grid') || document.getElementById('page-settings');
  if (!host) return;
  host.insertAdjacentHTML('afterbegin', `
    <div id="waSteps" class="card card-pad upgrade-steps-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h3>🚀 Activate WhatsApp Business API</h3>
        <button onclick="document.getElementById('waSteps').remove()"
          style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:#999">×</button>
      </div>
      <ol class="upgrade-steps-list">
        <li>Go to <a href="https://developers.facebook.com" target="_blank" rel="noopener">developers.facebook.com</a>
          → My Apps → Your App → WhatsApp → API Setup</li>
        <li>Copy your <strong>Phone Number ID</strong> and create a <strong>Permanent Access Token</strong></li>
        <li>Open <a href="https://dashboard.render.com" target="_blank" rel="noopener">Render Dashboard</a>
          → your service → <strong>Environment</strong> → Add Variables:
          <pre class="upgrade-pre">WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_permanent_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=any_secret_word</pre>
          Click <strong>Save Changes</strong> — Render redeploys automatically.
        </li>
        <li>Come back here and tap <strong>Check Status</strong> — the banner turns green.</li>
      </ol>
      <p class="notice success" style="margin-top:14px">
        Once live, the 📲 WhatsApp button in the topbar sends directly — no more opening WhatsApp manually.
      </p>
      <button class="btn btn-primary" onclick="refreshIntegrationStatus()">Check Status Now</button>
    </div>`);
}


/* ───────────────────────────────────────────────────────────────────────
   3. WOODSTOCK BOOKING SYNC
   ─────────────────────────────────────────────────────────────────────── */

function woodstockBannerMarkup() {
  const settings = store?.woodstockSettings || {};
  const configured = Boolean(settings.apiUrl && settings.apiKey);
  const lastSync = settings.lastSyncAt
    ? `Last sync: ${new Date(settings.lastSyncAt).toLocaleString()}`
    : 'Not yet synced';

  return `
    <div class="upgrade-banner upgrade-banner-dark">
      <div>
        <strong>🔗 Woodstock Booking Sync</strong>
        <small>${escapeHtml(lastSync)}</small>
      </div>
      <button class="upgrade-banner-btn" onclick="${configured ? 'runWoodstockSync()' : 'showWoodstockSetup()'}">
        ${configured ? '🔄 Sync Now' : 'Connect Woodstock'}
      </button>
    </div>`;
}

function showWoodstockSetup() {
  document.getElementById('woodstockSetup')?.remove();
  const settings = store?.woodstockSettings || {};
  const host = document.querySelector('.settings-grid') || document.getElementById('page-settings');
  if (!host) return;
  host.insertAdjacentHTML('afterbegin', `
    <div id="woodstockSetup" class="card card-pad upgrade-steps-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h3>🔗 Connect Woodstock</h3>
        <button onclick="document.getElementById('woodstockSetup').remove()"
          style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:#999">×</button>
      </div>
      <p style="color:#666;font-size:0.88rem;margin-bottom:16px">
        Enter your Woodstock API details. New bookings will automatically appear in
        Bookings / Trips for dispatch assignment.
      </p>
      <form onsubmit="saveWoodstockSettings(event)">
        <div class="form-grid">
          <div class="field">
            <label>Woodstock API Base URL</label>
            <input name="apiUrl" type="url" required
              placeholder="https://api.woodstock.com/v1"
              value="${escapeHtml(settings.apiUrl || '')}">
          </div>
          <div class="field">
            <label>API Key / Token</label>
            <input name="apiKey" type="password" required
              placeholder="Your Woodstock API key"
              value="${escapeHtml(settings.apiKey || '')}">
          </div>
          <div class="field">
            <label>Sync Interval</label>
            <select name="syncInterval">
              <option value="15" ${settings.syncInterval == 15 ? 'selected' : ''}>Every 15 minutes</option>
              <option value="30" ${(settings.syncInterval == 30 || !settings.syncInterval) ? 'selected' : ''}>Every 30 minutes</option>
              <option value="60" ${settings.syncInterval == 60 ? 'selected' : ''}>Every hour</option>
            </select>
          </div>
          <div class="field">
            <label>Auto-create trips from Woodstock bookings?</label>
            <select name="autoCreateTrips">
              <option value="yes" ${settings.autoCreateTrips !== 'no' ? 'selected' : ''}>Yes — create trip automatically</option>
              <option value="no" ${settings.autoCreateTrips === 'no' ? 'selected' : ''}>No — review before creating trip</option>
            </select>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" type="submit">Save & Connect</button>
          <button class="btn btn-outline" type="button"
            onclick="document.getElementById('woodstockSetup').remove()">Cancel</button>
        </div>
      </form>
    </div>`);
}

function saveWoodstockSettings(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  if (!store.woodstockSettings) store.woodstockSettings = {};
  Object.assign(store.woodstockSettings, {
    apiUrl: data.apiUrl,
    apiKey: data.apiKey,
    syncInterval: Number(data.syncInterval || 30),
    autoCreateTrips: data.autoCreateTrips,
    lastSyncAt: store.woodstockSettings.lastSyncAt || ''
  });
  if (typeof addAudit === 'function')
    addAudit('updated', 'Woodstock', 'Woodstock API connection configured.');
  if (typeof saveStore === 'function') saveStore();
  document.getElementById('woodstockSetup')?.remove();
  toast('Woodstock connected. Running first sync...');
  runWoodstockSync();
}

async function runWoodstockSync() {
  const settings = store?.woodstockSettings;
  if (!settings?.apiUrl || !settings?.apiKey) {
    showWoodstockSetup();
    return;
  }
  toast('Syncing bookings from Woodstock...');
  try {
    const response = await fetch('/api/woodstock/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiUrl: settings.apiUrl,
        apiKey: settings.apiKey,
        lastSyncAt: settings.lastSyncAt || ''
      })
    });
    if (!response.ok) throw new Error(`Woodstock sync returned ${response.status}`);
    const payload = await response.json();
    const bookings = payload.bookings || [];
    let created = 0, updated = 0;

    bookings.forEach(raw => {
      const booking = normalizeWoodstockBooking(raw);
      const existing = (store.bookings || []).find(b =>
        (b.woodstockId && b.woodstockId === booking.woodstockId) ||
        (b.customer === booking.customer && b.date === booking.date && b.time === booking.time)
      );
      if (existing) {
        Object.assign(existing, booking, { id: existing.id });
        updated++;
      } else {
        store.bookings.push({ ...booking, id: typeof makeId === 'function' ? makeId('bookings') : `b-${Date.now()}-${Math.random()}` });
        created++;
      }
    });

    // Auto-create trips if configured
    if (settings.autoCreateTrips !== 'no' && typeof createTripFromBooking === 'function') {
      store.bookings
        .filter(b => b.woodstockId && b.date && b.time && !store.trips.some(t => t.bookingId === b.id))
        .forEach(b => createTripFromBooking(b.id, true));
    }

    store.woodstockSettings.lastSyncAt = new Date().toISOString();

    if (typeof addAudit === 'function')
      addAudit('synced', 'Woodstock', `${created} new, ${updated} updated bookings from Woodstock.`);
    if (created || updated && typeof addNotification === 'function')
      addNotification('Woodstock sync complete',
        `${created} new and ${updated} updated bookings imported.`,
        'success', { category: 'Woodstock' });

    if (typeof saveStore === 'function') saveStore();
    if (typeof renderRoute === 'function') renderRoute(currentRoute);
    toast(`Woodstock sync: ${created} new, ${updated} updated bookings.`);
  } catch (error) {
    toast(`Woodstock sync failed: ${error.message}. Check API credentials in Settings.`);
  }
}

function normalizeWoodstockBooking(raw = {}) {
  // Maps Woodstock field names → app booking schema.
  // Adjust keys here once you have Woodstock's API docs.
  const price  = Number(raw.total_price || raw.price || raw.amount || 0);
  const deposit = Number(raw.deposit_paid || raw.deposit || 0);
  return {
    woodstockId:   raw.id || raw.booking_id || raw.reference || '',
    order:         raw.reference || raw.booking_number || raw.id || '',
    customer:      raw.customer_name || raw.guest_name || raw.name || '',
    phone:         raw.phone || raw.customer_phone || raw.mobile || '',
    email:         raw.email || raw.customer_email || '',
    date:          raw.tour_date || raw.date || raw.booking_date || '',
    time:          raw.start_time || raw.time || raw.departure_time || '',
    hours:         Number(raw.duration_hours || raw.hours || 4),
    product:       raw.tour_type || raw.product || raw.package_name || '',
    guests:        Number(raw.guest_count || raw.passengers || raw.pax || 0),
    source:        'Woodstock',
    price,
    deposit,
    balance:       Math.max(price - deposit, 0),
    status:        raw.status || 'Confirmed',
    notes:         raw.notes || raw.special_requests || ''
  };
}

// Start auto-sync timer — called from init() patch below
function startWoodstockAutoSync() {
  const settings = store?.woodstockSettings;
  if (!settings?.apiUrl || !settings?.apiKey) return;
  const ms = Number(settings.syncInterval || 30) * 60 * 1000;
  setInterval(runWoodstockSync, ms);
}


/* ───────────────────────────────────────────────────────────────────────
   4. SUPABASE SHARED DATABASE
   ─────────────────────────────────────────────────────────────────────── */

// These are injected by Render environment via server.py as a meta tag or
// window globals. If not present, Supabase is simply not active.
const SUPA_URL  = window.SUPABASE_URL  || '';
const SUPA_KEY  = window.SUPABASE_ANON_KEY || '';
const SUPA_ON   = Boolean(SUPA_URL && SUPA_KEY);

async function pushToSupabase() {
  if (!SUPA_ON) return;
  try {
    await fetch(`${SUPA_URL}/rest/v1/operations_store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPA_KEY,
        'Authorization': `Bearer ${SUPA_KEY}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({ id: 'main', data: store, updated_at: new Date().toISOString() })
    });
  } catch (e) { console.warn('Supabase push failed:', e); }
}

async function pullFromSupabase() {
  if (!SUPA_ON) return;
  try {
    const resp = await fetch(
      `${SUPA_URL}/rest/v1/operations_store?id=eq.main&select=data,updated_at`,
      { headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` } }
    );
    const rows = await resp.json();
    if (!rows?.length) return;
    const remote = rows[0];
    if (typeof storeTime === 'function' && storeTime(remote.updated_at) > storeTime(store.updatedAt)) {
      if (typeof applySharedStore === 'function') applySharedStore(remote.data, 'supabase-pull');
    }
  } catch (e) { console.warn('Supabase pull failed:', e); }
}

function supabaseBannerMarkup() {
  if (SUPA_ON) return `
    <div class="upgrade-banner upgrade-banner-green">
      <div>
        <strong>🗄️ Shared Database Active — Supabase</strong>
        <small>Your whole team sees the same live data.</small>
      </div>
      <button class="upgrade-banner-btn"
        onclick="pullFromSupabase().then(()=>toast('Pulled latest shared data.'))">
        Pull Latest
      </button>
    </div>`;

  return `
    <div class="upgrade-banner upgrade-banner-dark">
      <div>
        <strong>🗄️ Connect Shared Database</strong>
        <small>Currently each device has its own data copy. Connect Supabase so your team shares live data.</small>
      </div>
      <button class="upgrade-banner-btn" onclick="showSupabaseSetup()">Connect Free</button>
    </div>`;
}

function showSupabaseSetup() {
  document.getElementById('supabaseSetup')?.remove();
  const host = document.querySelector('.settings-grid') || document.getElementById('page-settings');
  if (!host) return;
  host.insertAdjacentHTML('afterbegin', `
    <div id="supabaseSetup" class="card card-pad upgrade-steps-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h3>🗄️ Connect Supabase — Free Shared Database</h3>
        <button onclick="document.getElementById('supabaseSetup').remove()"
          style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:#999">×</button>
      </div>
      <ol class="upgrade-steps-list">
        <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener">supabase.com</a>
          → New Project → name it <strong>reel-adventure-ops</strong></li>
        <li>Settings → API → copy <strong>Project URL</strong> and <strong>anon public key</strong></li>
        <li>In <a href="https://dashboard.render.com" target="_blank" rel="noopener">Render</a>
          → your service → Environment → add:
          <pre class="upgrade-pre">SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_ANON_KEY=your_anon_public_key</pre>
        </li>
        <li>In Supabase → SQL Editor → run this once:
          <pre class="upgrade-pre">CREATE TABLE IF NOT EXISTS operations_store (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);</pre>
        </li>
        <li>Redeploy on Render — all team members will share live data immediately.</li>
      </ol>
      <p class="notice success">Free Supabase tier is plenty for Reel Adventure Tours operations.</p>
      <button class="btn btn-primary"
        onclick="toast('Set up Supabase and redeploy Render — the banner turns green automatically.');document.getElementById('supabaseSetup').remove()">
        Got it
      </button>
    </div>`);
}


/* ───────────────────────────────────────────────────────────────────────
   5. PUSH NOTIFICATIONS TO CREW PHONES
   ─────────────────────────────────────────────────────────────────────── */

async function requestPushPermission() {
  if (!('Notification' in window)) {
    toast('Push notifications are not supported on this browser.');
    return;
  }
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    if (typeof addAudit === 'function')
      addAudit('enabled', 'Push Notifications', `${typeof currentUserLabel === 'function' ? currentUserLabel() : 'User'} enabled push notifications.`);
    if (typeof saveStore === 'function') saveStore();
    toast('✅ Push notifications enabled. Alerts will now appear on this device.');
  } else {
    toast('Push notifications denied. Enable them in your browser settings.');
  }
}

function sendLocalPush(title, body, options = {}) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  const n = new Notification(title, {
    body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    ...options
  });
  n.onclick = () => { window.focus(); n.close(); };
}

function notifyCrewPush(trip) {
  if (!trip) return;
  const date = typeof formatDate === 'function' ? formatDate(trip.tripDate) : trip.tripDate;
  const time = typeof formatTime === 'function' ? formatTime(trip.startTime) : trip.startTime;
  if (trip.captain)
    sendLocalPush('Captain Assignment', `${trip.customer || 'A trip'} · ${date} ${time} · ${trip.vessel || ''}`);
  if (trip.mate && trip.mate !== 'None')
    sendLocalPush('Mate Assignment', `${trip.customer || 'A trip'} · ${date} ${time} · ${trip.vessel || ''}`);
}

function pushNotificationBannerMarkup() {
  const granted = typeof Notification !== 'undefined' && Notification.permission === 'granted';
  if (granted) return `
    <div class="upgrade-banner upgrade-banner-green">
      <div>
        <strong>🔔 Push Notifications Active</strong>
        <small>Trip and assignment alerts appear on this device.</small>
      </div>
    </div>`;
  return `
    <div class="upgrade-banner">
      <div>
        <strong>🔔 Enable Push Notifications</strong>
        <small>Get trip assignments and alerts on your phone — even when the app is in the background.</small>
      </div>
      <button class="upgrade-banner-btn" onclick="requestPushPermission()">Enable</button>
    </div>`;
}


/* ───────────────────────────────────────────────────────────────────────
   6. PATCH EXISTING app.js FUNCTIONS
   These run after app.js loads to wire in new features.
   ─────────────────────────────────────────────────────────────────────── */

// Patch settingsMarkup() to include upgrade banners at the top
(function patchSettingsMarkup() {
  const original = window.settingsMarkup;
  if (typeof original !== 'function') return;
  window.settingsMarkup = function() {
    const upgradeBanners = `
      <div class="settings-span upgrade-banners-section">
        <h3 style="margin:0 0 10px;font-size:1rem;color:#555">Upgrades & Integrations</h3>
        ${waActivationBannerMarkup()}
        ${woodstockBannerMarkup()}
        ${supabaseBannerMarkup()}
        ${pushNotificationBannerMarkup()}
      </div>`;
    return upgradeBanners + original();
  };
})();

// Patch renderUnifiedWorkflowCard() to add WhatsApp button on each booking card
(function patchWorkflowCard() {
  const original = window.renderUnifiedWorkflowCard;
  if (typeof original !== 'function') return;
  window.renderUnifiedWorkflowCard = function(record) {
    let html = original(record);
    const { booking, trip } = record;
    if (trip) {
      // Insert WhatsApp button into the card footer
      html = html.replace(
        '</footer></article>',
        `${renderCardWaButton(trip.id, 'Customer Booking Confirmation')}</footer></article>`
      );
    }
    return html;
  };
})();

// Patch renderDispatchTripNode() to add WhatsApp button next to "Open editor"
(function patchDispatchTree() {
  const original = window.renderDispatchTripNode;
  if (typeof original !== 'function') return;
  window.renderDispatchTripNode = function(trip) {
    let html = original(trip);
    html = html.replace(
      '>Open editor</button>',
      `>Open editor</button>
       <button class="card-wa-btn" type="button"
         onclick="event.stopPropagation();openWhatsAppQuickSend('Customer Booking Confirmation','${escapeHtml(trip.id)}')">
         📲
       </button>`
    );
    return html;
  };
})();

// Patch renderRoleTripCard() to add WhatsApp button on captain/mate dashboards
(function patchRoleTripCard() {
  const original = window.renderRoleTripCard;
  if (typeof original !== 'function') return;
  window.renderRoleTripCard = function(trip, role) {
    let html = original(trip, role);
    const cat = role === 'captain' ? 'Captain Assignment' : 'Mate Assignment';
    html = html.replace(
      '<div class="assignment-actions">',
      `<div class="assignment-actions">
       ${renderCardWaButton(trip.id, cat)}`
    );
    return html;
  };
})();

// Patch saveRecord() to send push notification when a trip is saved
(function patchSaveRecord() {
  const original = window.saveRecord;
  if (typeof original !== 'function') return;
  window.saveRecord = function(event, route) {
    original(event, route);
    if (route === 'trips') {
      const form = event?.currentTarget;
      if (form) {
        const data = Object.fromEntries(new FormData(form).entries());
        notifyCrewPush(data);
        // Also push to Supabase on every save
        if (SUPA_ON) pushToSupabase();
      }
    }
  };
})();

// Patch init() to start Woodstock auto-sync and Supabase pull
(function patchInit() {
  const original = window.init;
  if (typeof original !== 'function') return;
  window.init = function() {
    original();
    startWoodstockAutoSync();
    if (SUPA_ON) {
      pullFromSupabase();
      setInterval(pullFromSupabase, 20000); // pull every 20s for real-time feel
    }
  };
})();


/* ───────────────────────────────────────────────────────────────────────
   CSS — injected at runtime so no styles.css edit needed
   ─────────────────────────────────────────────────────────────────────── */

(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* WhatsApp topbar button */
    .btn-whatsapp {
      background: #25D366;
      color: #fff;
      border: none;
      font-weight: 600;
      border-radius: 8px;
      padding: 6px 12px;
      cursor: pointer;
      font-size: 0.82rem;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: background 0.15s;
      white-space: nowrap;
    }
    .btn-whatsapp:hover { background: #1ebe5d; }

    /* Quick-send modal */
    .wa-modal-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 2000;
      display: flex; align-items: flex-end; justify-content: center;
    }
    .wa-modal-sheet {
      background: #fff;
      border-radius: 20px 20px 0 0;
      padding: 16px 18px 36px;
      width: 100%; max-width: 540px;
      box-shadow: 0 -4px 32px rgba(0,0,0,0.2);
      animation: waSlideUp 0.22s ease;
      max-height: 90vh;
      overflow-y: auto;
    }
    @keyframes waSlideUp {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }
    .wa-modal-handle {
      width: 40px; height: 4px;
      background: #ddd; border-radius: 4px;
      margin: 0 auto 14px;
    }
    .wa-modal-head {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: 12px;
    }
    .wa-modal-head h3 { margin: 0 0 2px; font-size: 1.1rem; }
    .wa-modal-head p { margin: 0; font-size: 0.82rem; color: #666; }
    .wa-modal-close {
      background: none; border: none; font-size: 1.5rem;
      cursor: pointer; color: #999; padding: 0; line-height: 1;
    }
    .wa-status-pill {
      display: inline-block; padding: 2px 8px;
      border-radius: 20px; font-size: 0.72rem; font-weight: 600;
      margin-left: 6px; vertical-align: middle;
    }
    .wa-live   { background: #d4f5e0; color: #1a7a40; }
    .wa-manual { background: #fff3cd; color: #856404; }
    .wa-trip-select, .wa-field {
      width: 100%; box-sizing: border-box;
      border: 1.5px solid #ddd; border-radius: 8px;
      padding: 9px 12px; font-size: 0.9rem;
      margin-bottom: 10px;
    }
    .wa-cat-grid {
      display: grid; grid-template-columns: repeat(2, 1fr);
      gap: 8px; margin-bottom: 14px;
    }
    .wa-cat-btn {
      background: #f4f8f4;
      border: 1.5px solid #c8e6c9;
      color: #1a5c34; border-radius: 10px;
      padding: 9px 10px; font-size: 0.8rem; font-weight: 600;
      cursor: pointer; text-align: left; line-height: 1.3;
      transition: background 0.12s;
      display: flex; flex-direction: column; gap: 2px;
    }
    .wa-cat-btn:hover { background: #d4f5e0; }
    .wa-cat-selected { background: #d4f5e0 !important; border-color: #25D366 !important; }
    .wa-cat-btn small { font-weight: 400; color: #555; font-size: 0.72rem; }
    .wa-cat-icon { font-size: 1rem; margin-bottom: 2px; }
    .wa-composer-fields { display: flex; flex-direction: column; gap: 0; }
    .wa-body-field {
      width: 100%; box-sizing: border-box;
      border: 1.5px solid #ddd; border-radius: 8px;
      padding: 10px 12px; font-size: 0.9rem;
      min-height: 100px; resize: vertical; margin-bottom: 10px;
    }
    .wa-send-row { display: flex; gap: 8px; }
    .wa-send-btn {
      flex: 1; background: #25D366; color: #fff; border: none;
      border-radius: 8px; padding: 11px 16px;
      font-weight: 700; font-size: 0.95rem; cursor: pointer;
    }
    .wa-send-btn:hover { background: #1ebe5d; }
    .wa-copy-btn {
      background: #f4f8f4; color: #1a7a40;
      border: 1.5px solid #25D366; border-radius: 8px;
      padding: 11px 16px; font-weight: 600; cursor: pointer;
    }

    /* Card WhatsApp button */
    .card-wa-btn {
      background: #25D366; color: #fff; border: none;
      border-radius: 7px; padding: 5px 11px;
      font-size: 0.78rem; font-weight: 600;
      cursor: pointer; display: inline-flex;
      align-items: center; gap: 3px;
    }
    .card-wa-btn:hover { background: #1ebe5d; }

    /* Upgrade banners */
    .upgrade-banner {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; padding: 12px 16px;
      background: linear-gradient(90deg, #081d33 0%, #0e3158 100%);
      color: #fff; border-radius: 10px; margin-bottom: 10px;
    }
    .upgrade-banner strong { display: block; font-size: 0.92rem; }
    .upgrade-banner small  { opacity: 0.75; font-size: 0.78rem; }
    .upgrade-banner-green {
      background: linear-gradient(90deg, #1a7a40 0%, #25D366 100%);
    }
    .upgrade-banner-dark {
      background: linear-gradient(90deg, #1b1b2f 0%, #2d2d5e 100%);
    }
    .upgrade-banner-btn {
      background: #fff; color: #081d33; border: none;
      border-radius: 7px; padding: 7px 14px;
      font-weight: 700; font-size: 0.82rem;
      cursor: pointer; white-space: nowrap; flex-shrink: 0;
    }
    .upgrade-banner-btn:hover { background: #f0f4ff; }
    .upgrade-banners-section { margin-bottom: 16px; }

    /* Upgrade steps cards */
    .upgrade-steps-card { border: 2px solid #25D366 !important; margin-bottom: 16px; }
    .upgrade-steps-list {
      padding-left: 20px; line-height: 1.9;
      font-size: 0.9rem; margin: 12px 0;
    }
    .upgrade-steps-list li { margin-bottom: 8px; }
    .upgrade-pre {
      background: #f4f4f4; border-radius: 8px;
      padding: 10px 14px; margin: 8px 0;
      font-size: 0.82rem; white-space: pre-wrap;
      border: 1px solid #e0e0e0;
    }

    /* Settings span helper */
    .settings-span { grid-column: 1 / -1; }
  `;
  document.head.appendChild(style);
})();
