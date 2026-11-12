# Dining Dollar Tracker port

Source: https://github.com/campjonas08-dotcom/Dining-dollar-tracker
Inspected source commit: f6447d1f91ff4429b08a29a2acb35ddef3a20d66.

At the owner's request, this copies the full main tracker script and stylesheet rather than maintaining a simplified rewrite. `dollars.html` hosts the app; `tracker/app.js` is the extracted original script, `tracker/style.css` the original stylesheet, and `tracker/auburn.css` the integration/theme layer.

Retained: original daily accrual/rollover calculations, onboarding/tutorial, multiple fund types and fund switching, reserve and quick-amount settings, purchase categories/notes, history search/filter/edit/delete, balance correction, insights and spending projections, term dates/holidays/day override, light/dark/system modes, CSV, backup/import, summary/card sharing and browser persistence.

Integration changes: Auburn palette/fonts/navigation; prominent daily spending budget; migration of prior `better-lunch-budget-v2` balances/history to the original `stipend_config_v5` format; storage warning; sheet keyboard focus/Escape handling; spreadsheet-safe CSV cells; cross-tab updates. Existing source format and backup compatibility are retained.

The reference site's configured Firebase project, external sync module, manifest and origin-wide service worker were not copied. This embedded tracker stores data locally and supports Backup/Restore for moving it. It does not contact or write into the reference Firebase project. The complete local tracker remains functional without external runtime dependencies.
