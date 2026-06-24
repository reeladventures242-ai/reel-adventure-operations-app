# reel-adventure-operations-app
Operations management platform for Reel Adventure Tours including bookings, payroll, inventory, vessel checklists, cruise schedules, and reporting.

## Run with live data

```powershell
python server.py
```

Open `http://127.0.0.1:4174/index.html`.

The server automatically syncs Nassau cruise arrivals from CruiseMapper and live Nassau weather from Open-Meteo. To use Windy as the weather provider, set a Windy Point Forecast API key before starting:

```powershell
$env:WINDY_API_KEY="your-windy-point-forecast-key"
python server.py
```

## Production deployment

The repository includes a Render Blueprint (`render.yaml`) that runs the app and its live-data APIs together.

1. Open the repository in Render using **New > Blueprint**.
2. Select this repository and deploy the `reel-adventure-operations-app` service.
3. Optionally add `WINDY_API_KEY` in the Render environment settings. Without it, the app uses Open-Meteo.

## Supabase database

The app can use Supabase Postgres as its shared production database.

1. Create a Supabase project.
2. In Supabase, copy the Postgres connection string. The pooled connection string is recommended for hosted deployments.
3. In Render, open `reel-adventure-operations-app` > Environment.
4. Add `SUPABASE_DATABASE_URL` with the Supabase Postgres connection string.
5. Save and redeploy the latest GitHub commit.

When `SUPABASE_DATABASE_URL` is set, it takes priority over `DATABASE_URL`. The server creates the required `app_state` and `event_log` tables automatically. You can also run `supabase/schema.sql` in the Supabase SQL editor if you want to create the tables manually before first launch.

Do not commit Supabase passwords or service keys to GitHub. Use Render environment variables or GitHub repository secrets only.

## WhatsApp notification automation

The app stores WhatsApp queue items, delivery logs, and notification rules in the shared database. Owner, captain, and mate operational alerts can be marked for automatic WhatsApp Business delivery when the Meta credentials are configured.

Production defaults:

- `WHATSAPP_AUTO_SEND_ENABLED=1`: enables server-side processing for eligible operational alerts.
- `WHATSAPP_AUTO_SEND_LIMIT=10`: caps each queue-processing run.
- `WHATSAPP_CUSTOMER_AUTO_SEND=0`: keeps customer messages approval-required by default.

Use the WhatsApp page to review queue counts, process ready messages, and inspect delivery logs. Customer confirmations, invoices, payment reminders, and meeting-point messages should remain approval-required until the templates and consent flow are finalized.
