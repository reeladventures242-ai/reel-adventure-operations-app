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
