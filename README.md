# Better Lunch Breaks

An Auburn-styled dining dashboard and the full Dining Dollar Tracker app on a separate page. Static HTML/CSS/JavaScript, no build step.

## Run and test

Use the existing isolated checkout; no additional worktree is needed.

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory /workspace
```

Serve `/Betterlunchbreaks/` and `/Betterlunchbreaks/dollars.html` to test the GitHub Pages subpath. Browser tests use Python Playwright and system `/usr/bin/chromium`:

```sh
cd /workspace/Betterlunchbreaks
python3 -m venv /workspace/.blb-tools/venv
/workspace/.blb-tools/venv/bin/python -m pip install -r tests/requirements.txt
node tests/budget-model.cjs
node tests/dining-model.cjs
/workspace/.blb-tools/venv/bin/python tests/smoke.py
node --check tracker/app.js
node --check dining.js
node --check data.js
git diff --check
```

`BLB_TEST_URL` overrides the URL; `BLB_ARTIFACTS` the screenshot directory (default `/tmp/blb-test-artifacts`). No external runtime assets are required.

## Dining dashboard

`data.js` contains fixed example people-inside counts and supporting table-wait numbers from 7 AM through 8 PM. Lunch has the most people inside (11:30 AM–1 PM, about 280–310 people), with smaller breakfast (9–10 AM, about 190–220 people) and dinner (5–6 PM, about 210–255 people) peaks. `dining.js` automatically follows Auburn time (`America/Chicago`, including daylight saving), refreshing every 30 seconds and when the tab regains focus. It interpolates the sample crowd pattern minute by minute. People inside, open seats, percent full, table wait and +15/+30-minute forecasts come from the same snapshot. Open seats always equal 324 minus the displayed people count. Table wait is capped at 10 minutes, remains secondary, and is based on the same occupancy. The all-day chart is informational; there is no time selector. Numbers are made up for the planning concept; a small sample-data note supplies context. No scanner controls, connection-status copy, table maps, or QR check-in remains. The Village stays removed.

## Full Dining Dollars app

`dollars.html` now embeds the main [Dining Dollar Tracker](https://github.com/campjonas08-dotcom/Dining-dollar-tracker) script and styles, integrated with Auburn colors, fonts and site navigation. See `tracker/PORTING.md` for source attribution and modifications.

The original tracker provides daily accrued funds and rollover, available-to-spend balance, multiple funds, term settings/holidays/day count, purchase logging/categories/notes, searchable editable history, balance corrections, insights/projections, themes, CSV and backup/restore. The full app's calculations are retained, rather than a new simplified tracker.

Daily accrual = (term budget − reserve) / school days. Earned funds include today's school day. Available to spend = earned funds − spending so far, including spending before setup. Unspent funds carry forward. This is distinct from the account balance; correcting the latter does not change earned allowance, as in the source app.

Existing `better-lunch-budget-v2` data migrates into the source app's `stipend_config_v5` structure on first use. The old key is preserved. Existing source-format data takes precedence. Migration retains balances, purchase history, dates, reserves and skipped days. The app is browser-local; use backup/restore to transfer data. No Firebase project or source site's service worker is installed.

## Deploy

Push to the existing `main` branch without changing repository visibility or Pages settings. Check the existing `pages build and deployment` run, then the public routes:

- https://campjonas08-dotcom.github.io/Betterlunchbreaks/
- https://campjonas08-dotcom.github.io/Betterlunchbreaks/dollars.html

A push is separate from deployment success. GitHub Actions is accessible in this environment; direct public Pages browsing may be blocked by network policy. Publishing the reusable cloud environment is separate from website deployment.
