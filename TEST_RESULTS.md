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

## Automatic Auburn time and consistent seating

Removed time selection and chart interaction. The dashboard now interpolates the sample crowd pattern from the current America/Chicago time (Auburn), refreshes every 30 seconds and on focus/return, and calculates every current metric from one rounded occupancy snapshot. Open seats equal 324 minus people inside. The table-wait estimate uses that same occupancy and is capped at 10 minutes. Forecasts calculate current, +15 and +30 minute snapshots using the same model.

`node tests/dining-model.cjs` passed all 1,440 minutes for bounded occupancy, exact occupancy-plus-seats totals, wait cap, invariant seating for equal occupancy, interpolation, midnight and CST/CDT conversion. Browser tests used a controlled clock and passed on desktop/phone/narrow: noon 309 inside/15 open, 12:20 302/22, and 12:40 292/32, with no user selector and a matching current forecast. The full tracker and migration/storage checks also passed. Phone rendering was visually inspected after this change.

## Sample Dining Dollars content

New unsaved trackers now start with 20 dated, categorized sample purchases ($180.45 total), a $500 term fund, $25 reserve and $319.55 balance. All entries use the original editable/persistent history model. Existing data/migration takes precedence. Settings provides an explicit confirmed sample loader; a sample notice offers fresh personal setup that persists without reseeding.

The full browser suite passed at desktop/phone/narrow, including adding a purchase to samples, persistence on reload, deleting it to restore the original balance, clearing samples into normal setup, cancellation of sample replacement without changing saved data, original tracker flows, and migration/storage-failure behavior. Daily model checks and syntax/whitespace checks passed. Sample rendering was inspected; term dates were then adjusted to show a comfortable accumulated spending allowance while retaining identical purchase/balance totals.
