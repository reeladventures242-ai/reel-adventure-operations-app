#!/usr/bin/env python3
"""Serve the operations app with live Nassau weather and cruise schedule APIs."""

from datetime import datetime, timezone
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
import re
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
NASSAU_LAT = 25.056
NASSAU_LON = -77.352
CRUISEMAPPER_URL = "https://www.cruisemapper.com/ports/nassau-port-27"
WINDY_URL = "https://api.windy.com/api/point-forecast/v2"
OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"
BOATBOOKER_WIDGET_BUILDER_URL = "https://boatbooker.com/js/widgets/captainWeatherWidgetBuilder.js?v=1777446641"
USER_AGENT = "ReelAdventureOperations/1.0 (+local operations app)"


def request_json(url, data=None):
    body = json.dumps(data).encode() if data else None
    headers = {"User-Agent": USER_AGENT, "Accept": "application/json"}
    if body:
        headers["Content-Type"] = "application/json"
    with urllib.request.urlopen(urllib.request.Request(url, data=body, headers=headers), timeout=25) as response:
        return json.loads(response.read().decode("utf-8"))


def request_text(url):
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 ReelAdventureOperations/1.0"})
    with urllib.request.urlopen(request, timeout=25) as response:
        return response.read().decode("utf-8", errors="replace")


def iso_now():
    return datetime.now(timezone.utc).isoformat()


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
        html = request_text(f"{CRUISEMAPPER_URL}?month={year:04d}-{month:02d}#schedule")
        parser = CruiseScheduleParser()
        parser.feed(html)
        rows.extend(parser.rows)
    unique = {f"{row['arrivalDate']}|{row['shipName']}": row for row in rows}
    return {"provider": "CruiseMapper", "sourceUrl": CRUISEMAPPER_URL, "updatedAt": iso_now(), "records": list(unique.values())}


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
                key = os.environ.get("WINDY_API_KEY", "").strip()
                self.send_json(weather_from_windy(key) if key else weather_from_open_meteo())
                return
            if self.path.startswith("/api/cruise/nassau"):
                self.send_json(cruise_schedule())
                return
            if self.path.startswith("/api/health"):
                self.send_json({"ok": True, "windyConfigured": bool(os.environ.get("WINDY_API_KEY")), "updatedAt": iso_now()})
                return
            super().do_GET()
        except (urllib.error.URLError, ValueError, KeyError, IndexError) as error:
            self.send_json({"error": str(error), "updatedAt": iso_now()}, 502)


if __name__ == "__main__":
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "4174"))
    print(f"Reel Adventure Operations server: http://{host}:{port}/index.html")
    ThreadingHTTPServer((host, port), AppHandler).serve_forever()
