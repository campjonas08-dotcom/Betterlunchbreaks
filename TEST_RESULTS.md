# Validation — November 12, 2026

## Current revision

Fixed all-day dining values with the highest waits at 11:30 AM–1 PM and smaller 9–10 AM/5–6 PM peaks. Separate Dining Dollars page now ports the full reference tracker script/styles, with Auburn theming and migration of prior balances/purchases. Source attribution and integration details are in `tracker/PORTING.md`.

## Passed

- `node tests/budget-model.cjs` exercises the actual ported `computeStats` and `computeTodayTarget`: daily accrual, today's funds, carried funds/weekends, setup spending, reserve, skipped dates, day override, future/completed terms and suggested spending.
- Python Playwright suite passed with Chromium 156.0.8078.79 at desktop 1440px, phone 390px and narrow 320px: all-day dining selections and peaks, chart time selection, full tracker onboarding/tutorial, daily metrics, purchase logging, history search/edit/delete, refresh persistence, category insights, balance correction, CSV export, backup/import restoration, holiday settings, multiple funds/switching, themes, keyboard sheet focus/Escape, no page overflow or JavaScript errors.
- Prior-release data migration passed: balance, reserve, term/skip days and purchase history survived migration and reload.
- Unavailable-storage behavior passed: visible warning and usable in-memory tracker session.
- JavaScript syntax and whitespace checks passed. Desktop and phone tracker/dining screenshots were visually inspected. Toast placement was then raised above bottom navigation without changing application behavior.

## Boundaries

Dining values are invented examples. The tracker runs locally without the reference Firebase project or an origin-wide service worker. Cross-device access uses backup/restore. Physical-device testing and direct public Pages browsing are not claimed. Deployment status is verified separately through the existing GitHub Pages workflow.

## People-inside emphasis

Updated the primary dining number, nearby-time panel, chart values/heights/accessible labels, peak-period summaries and recommendations to emphasize people inside and finding a table. Open seating is consistently derived from the sample capacity minus occupants. Estimated time to find a table remains as supporting text below the main statistics. The revised browser suite passed all desktop/phone/narrow flows and now asserts occupancy counts and chart labels in addition to the retained table-wait detail. Phone rendering was visually inspected. Tracker code remains unchanged.
