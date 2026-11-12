# Better Lunch Breaks

An Auburn-styled dining planning app with hypothetical hall scan data and a personal Dining Dollars tracker. Static HTML, CSS, and JavaScript; no build step, login, or live campus integration.

## Run and test

Use the existing checkout; tasks are already isolated and do not need another Git worktree.

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory /workspace
```

Serve the `/Betterlunchbreaks/` subpath to exercise GitHub Pages asset paths. Python 3 is the only application runtime prerequisite. Tests use system `/usr/bin/chromium` and a local Python environment:

```sh
cd /workspace/Betterlunchbreaks
python3 -m venv /workspace/.blb-tools/venv
/workspace/.blb-tools/venv/bin/python -m pip install -r tests/requirements.txt
/workspace/.blb-tools/venv/bin/python tests/smoke.py
node --check app.js
node --check data.js
git diff --check
```

`BLB_TEST_URL` overrides the target and `BLB_ARTIFACTS` the screenshot directory (default `/tmp/blb-test-artifacts`). No external runtime assets are required.

## Wait estimates

The Edge has three hypothetical scan scenarios. Scan-ins minus scan-outs estimate people inside. Assumed capacity is 324 and average visit duration is 35 minutes; neither is a verified campus measurement. Above capacity, assumed seating turnover estimates a wait. Available seats are shown in rounded ranges rather than individual locations. Future waits project each scenario's assumed arrival rate and estimated departures; no learned predictive model is claimed. The expandable explanation provides editable scan totals. Negative occupancy is clamped and invalid scan totals are rejected. Waits refer to seating, not the food line.

There are no table maps, seat reservations, manual student check-ins, or table QR flows. Old `?table=` links safely open the overview. The Village remains removed.

## Dining Dollars

Inspired by [Dining Dollar Tracker](https://github.com/campjonas08-dotcom/Dining-dollar-tracker), inspected at `f6447d1f91ff4429b08a29a2acb35ddef3a20d66`. This integrated tracker provides a starting balance, total term budget, reserve, editable term dates, remaining weekday allowance, spending pace, quick purchase amounts, categories/notes, purchase removal, CSV export, browser persistence, and same-origin tab updates. It does not import that app's Firebase account configuration, service worker, multi-fund model, or cross-device sync.

Money uses integer cents. Balance = starting balance minus logged purchases. Remaining weekday allowance divides balance less reserve across weekdays from today (or term start, if later) to term end, inclusive. Weekends are excluded; holidays are included. Spending pace compares total-budget spending against elapsed weekdays. Dates use the visitor's local calendar. Purchases cannot exceed the remaining balance. Updating term settings preserves purchases; starting balance is the baseline before all purchases logged here. Browser storage key: `better-lunch-budget-v2`. No campus account balance is read. Storage failures show a visible warning and retain an in-memory session. Corrupt data is rejected without crashing.

## Publish

The existing repository uses GitHub Pages from `main` at its root. Push reviewed changes without changing repository visibility or Pages settings. Check the `pages build and deployment` run after pushing and then validate the public URL:

https://campjonas08-dotcom.github.io/Betterlunchbreaks/

A successful push alone is not deployment verification. Direct access to the Pages hostname may require an environment network setting; the public GitHub Actions page is separately accessible. Environment draft publication and website deployment are separate actions.
