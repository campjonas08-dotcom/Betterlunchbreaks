# Validation — November 12, 2026

## Current scope

Hall-level estimated seating waits from hypothetical scan-in/out totals, approximate open seating, short-term estimates, and browser-local Dining Dollars. Table selection, seat reservations, check-in/checkout, and QR generation are removed. The Village is excluded. Auburn styling is retained.

## Passed

Python Playwright with system Chromium 156.0.8078.79 executed the current `tests/smoke.py` suite at desktop (1440px), phone (390px), and narrow (320px) widths. All three passed:

- Normal/rush scenarios, rounded open-seat range, forecast rows, editable scan totals, invalid scan-out rejection, full/empty hall boundaries.
- Budget setup and balance, reserve, weekday allowance, future and completed terms, preserved purchase history when settings change.
- Purchase logging in integer cents, rejection above remaining balance, safe note rendering, purchase removal and restored balance.
- Browser refresh persistence, same-origin tab synchronization, CSV downloads containing logged purchases.
- No horizontal page overflow or JavaScript errors.
- No table dialogs or checkout controls and no Village/prototype/demo/early-access wording in rendered initial content.

Separate browser checks passed unavailable-storage behavior (visible persistence warning with usable session), corrupt-storage recovery and keyboard skip-link focus. Node estimator boundary checks passed for an empty hall, available seating, full hall, a queue, and nonnegative occupancy. `node --check app.js`, `node --check data.js`, local HTTP serving under `/Betterlunchbreaks/`, and `git diff --check` passed.

An initial phone layout overflow in date form columns was diagnosed and corrected using shrinkable grid columns. The complete browser suite passed after that change. Desktop, phone and narrow screenshots were visually inspected in `/tmp/blb-test-artifacts/*-wait-budget.png`. Obsolete seating styles were removed afterward without changing active selectors.

## Limits

Scan data, capacity, visit length, and arrival rates are hypothetical. These checks do not validate real campus occupancy, food-line waits, a campus balance integration, or physical iPhone/Android browsers. The tracker is manually entered and browser-local. No Firebase credentials or cloud sync from the reference tracker were copied.

## Publication

Deployment evidence is recorded below after publication. Direct access to the GitHub Pages hostname was denied by the running environment's network policy; GitHub repository and Actions pages were accessible. Reusable install/start instructions and the required Pages/API domains were saved in the environment draft. Saving a draft does not apply its settings or publish the environment.
