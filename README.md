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
node --check dining.js
node --check budget-model.js
node tests/budget-model.cjs
git diff --check
```

`BLB_TEST_URL` overrides the target and `BLB_ARTIFACTS` the screenshot directory (default `/tmp/blb-test-artifacts`). No external runtime assets are required.

## Dining page

`index.html` uses curated sample data in `data.js` for three dining periods at The Edge. It displays dining waits, approximate seating, short-term waits, and a lunch-rush chart. The data is illustrative; a short sample-data note appears below the chart. The dining page has no budget form, scanner controls, or connection-status copy. The Village remains excluded.

## Dining Dollars page

`dollars.html` is a separate page with Overview, Log purchase, Activity, and Settings views. It shares the existing browser storage key `better-lunch-budget-v2`, preserving previously saved balances and purchases.

`budget-model.js` follows `computeStats` and `computeTodayTarget` in [Dining Dollar Tracker](https://github.com/campjonas08-dotcom/Dining-dollar-tracker), inspected at `f6447d1f91ff4429b08a29a2acb35ddef3a20d66`:

- School days are weekdays excluding configured skipped dates. An optional day-count override uses the first N school days in the term.
- Daily spending budget = (total term budget − reserve) / school days.
- Earned so far = daily spending budget × school days through today, inclusive.
- Spending so far includes the difference between total budget and starting balance, plus logged purchases.
- Available to spend = earned so far − spending so far. Unspent funds carry forward; negative availability indicates spending ahead of pace.
- Suggested spending today divides positive available funds by remaining school days plus today if it is a school day, matching the reference repo's target calculation.
- Account balance = starting balance − logged purchases. Projection uses average spending per elapsed school day, as in the reference.

Purchase amounts use integer cents; accrual retains fractional cents until display. Daily funds are not recalculated from remaining balance. The tracker supports categories/notes, quick amounts, history removal, CSV export, local persistence, same-origin tab updates, and visible storage-failure warnings. Updating settings preserves purchases. Existing data without skip dates or an override continues to load. Dates use the visitor's calendar. Firebase/account sync and multiple funds are not integrated.

Run `node tests/budget-model.cjs` for deterministic accrual tests in addition to the browser suite. Browser checks exercise both pages at the GitHub Pages subpath, all tracker views, persistence, CSV, validation, storage failures and responsive layouts.

## Publish

The existing repository uses GitHub Pages from `main` at its root. Push reviewed changes without changing repository visibility or Pages settings. Check the `pages build and deployment` run after pushing and then validate the public URL:

https://campjonas08-dotcom.github.io/Betterlunchbreaks/

A successful push alone is not deployment verification. Direct access to the Pages hostname may require an environment network setting; the public GitHub Actions page is separately accessible. Environment draft publication and website deployment are separate actions.
