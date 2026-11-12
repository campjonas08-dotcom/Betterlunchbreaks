# Better Lunch Breaks

## Purpose and users

Help Auburn students plan a short lunch break with an estimated seating wait, rough seat availability, and a personal Dining Dollars spending plan. This release replaces table selection and QR check-in with hall-level scanner assumptions.

## Platform and scope

Static web app deployed to the existing GitHub Pages site. Use the isolated checkout at `/workspace/Betterlunchbreaks`; no new worktree is needed. Keep all runtime assets relative and local. The Edge is the supported hall; The Village is removed.

## Dining planning

Hypothetical scan-ins and scan-outs estimate people inside. Capacity and average visit length are explicit assumptions. Show approximate seat ranges, an estimated seating wait, short-term estimates, and editable scanner totals. Do not imply measured occupancy, exact seat availability, actual student scan integration, or food-line predictions. No table map, seat reservation, QR check-in, or manual checkout.

## Dining Dollars

Integrate the central budgeting ideas of `campjonas08-dotcom/Dining-dollar-tracker`: current balance, weekday allowance, spending pace, term settings, reserve, quick purchase logging, categories/notes, history/removal, CSV export, local persistence and same-browser tab updates. Do not imply an Auburn balance connection or cross-device sync.

## Design and accessibility

Preserve the incumbent navy/orange Auburn-inspired palette, self-hosted Barlow fonts, compact utility layout, responsive behavior, visible keyboard focus, readable status text and reduced-motion support. Use plain student-facing wording without prototype/demo/early-access labels. State hypothetical data and browser-local storage clearly. Maintain independent student attribution without official affiliation claims.

## Validation

Exercise estimator boundaries, scenario changes and invalid scans; budget calculations, cents, dates, invalid purchases/settings, persistence, cross-tab updates, CSV, safe rendering, unavailable/corrupt storage, keyboard access and desktop/mobile/narrow layout. Physical phone validation and live campus data integration are not covered by browser emulation.
