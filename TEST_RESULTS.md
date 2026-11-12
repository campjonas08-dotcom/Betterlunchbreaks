# Validation — November 12, 2026

## Current revision

Dining dashboard uses curated sample wait, seating and forecast values plus a lunch-rush chart. Live-connection wording and editable scanner totals are removed. Dining Dollars is a separate `dollars.html` page with Overview, Log purchase, Activity and Settings views. Prior browser budgets and purchases retain their storage key and remain readable.

## Passed

- `node tests/budget-model.cjs`: deterministic daily accrual checks for today's earned funds, rollover, spending before setup, reserve, skipped school days, day-count override, future/completed terms, no-school-day ranges, weekends, negative availability, suggested today and projection.
- A direct comparison against the inspected reference repo's actual `computeStats` and `computeTodayTarget` functions passed for daily rate, earned funds, available spending, balance, projected balance and today's target across prior-spending, reserve, holiday and day-override combinations. Reference commit: `f6447d1f91ff4429b08a29a2acb35ddef3a20d66`.
- Python Playwright suite passed at 1440px, 390px and 320px with Chromium 156.0.8078.79: separate-page links and refresh, sample scenario values, eight-point chart, all tracker views, daily budget, skip dates and override, purchase arithmetic, storage persistence, cross-tab synchronization, CSV, invalid amounts/dates, safe note rendering, no horizontal overflow or JavaScript errors.
- Separate browser checks passed unavailable-storage warnings and in-memory behavior, corrupt-data recovery, and keyboard skip-link focus.
- Syntax checks for all four JavaScript files and `git diff --check` passed. Desktop dining and phone tracker screenshots were visually inspected in `/tmp/blb-test-artifacts`.

## Limits

Dining numbers are sample values. Budget state is manually entered and browser-local. No campus account, Firebase sync, multiple funds, or physical-device validation is claimed. The daily formula follows the reference repo's school-day model, including today, with weekends and configured skipped dates excluded. Purchase cents are integers; accrued amounts retain precision until currency display.

The existing Pages deployment is triggered by pushing to main; deployment status is checked separately. Direct public Pages browsing remains subject to environment network policy. Reusable startup/test instructions were updated in the environment draft; saving that draft does not publish the environment.
