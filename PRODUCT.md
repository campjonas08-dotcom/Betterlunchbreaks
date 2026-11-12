# Better Lunch Breaks

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are Auburn University students with a short break between classes. They need to decide whether to eat in, return later, or get a to-go plate before walking to a dining hall. The initial demonstration is for ENGR 1100 Section 002, Group 2 and its presentation audience.

## Product Purpose

Help students make a quick dining decision by bringing seating availability, a sample food-line wait, and a short crowd forecast together. Demonstrate how table QR links and manual seat check-in/check-out could keep a seating view useful.

Success for this release means a student can understand the sample dining situation, explore a seat, check in, refresh without losing the check-in, and check out during a four-minute pitch. Counts must stay consistent throughout.

## Positioning

This is a student-built dining decision prototype for the time between classes. Its demonstrated mechanism combines a hall overview, a table/seat view, and table-specific QR links. It does not claim measured time savings, live campus integration, official Auburn sponsorship, or operational readiness for a campus rollout.

## Operating Context

- Mobile website intended for Safari on iPhone and Chrome on Android, with a usable desktop and keyboard experience.
- Fully static HTML, CSS, and JavaScript; GitHub Pages is the deployment target. Preserve project-relative assets and query-parameter links under the repository subpath.
- Existing checkout: `campjonas08-dotcom/Betterlunchbreaks`. Use the existing isolated checkout; no new worktree is needed.
- The site supports the class pitch. It does not replace the separate PowerPoint, 60-second commercial, or presentation sketch.
- Local server and validation instructions are in `README.md`. Deployment status must be verified independently; a successful push does not establish a live Pages site.

## Capabilities and Constraints

The user confirmed this existing scope during Impeccable initialization. Preserve every working feature during design work:

1. Dining hall selection: The Edge is interactive, The Village is an explicitly labeled preview.
2. Hall overview: seats filled/open, capacity, crowd level, sample wait, and forecast.
3. Seating chart: six demo tables, labeled seat states, and explicit section-versus-hall counts.
4. Table-specific `?table=A1` through `?table=A6` links, including direct entry and refresh.
5. On-screen demo scan, seat selection, occupied-seat feedback, repeat-check-in protection, and one checked-in seat per browser.
6. Manual checkout that reopens the seat and reverses counts.
7. Browser-local persistence, reset, same-browser tab synchronization, and clear feedback when storage is unavailable.
8. Printable table QR stickers with “Please scan your seat.” and a configurable published URL.
9. Mock student profile and visible demo status.

All occupancy, wait, forecast, hours, and floor-plan data remain synthetic and visibly identified as demo data. The initial model is 141/324 seats filled and 183 open; the displayed window section contains 24 seats, eight initially taken. A successful check-in changes hall and section counts by exactly one. See `data.js` for the source of truth.

No backend, real Tiger ID authentication, student-ID collection, GPS/location collection, camera/scanner integration, campus data feed, or shared cross-device occupancy in this release. Manual checkout is required; forgotten check-outs remain a pilot design question. Preserve repository visibility.

## Brand Commitments

- Product name: Better Lunch Breaks.
- The user explicitly requested a polished Auburn-themed mobile website.
- Clear, approachable student-facing language. Keep instructions short and explain actions and outcomes plainly.
- Do not imply official Auburn affiliation, real authentication, or verified campus measurements.
- Preserve the table-sticker wording “Please scan your seat.”
- The original hand-drawn wireframe is described in the supplied brief, but its image was not available locally. Do not claim a visual match to an unseen asset.

## Evidence on Hand

- `index.html`: current page content, hall selection, dialogs, disclosure copy, and action controls.
- `styles.css`: current responsive visual implementation; it is evidence of the incumbent design, not an approved Auburn brand system.
- `data.js`: synthetic table/seat model and count calculations.
- `app.js`: all interaction, persistence, deep-link, and QR generation behavior.
- `tests/smoke.py`: existing acceptance tests for the core flows, keyboard operation, responsive overflow, QR decoding, printing visibility, and unavailable storage.
- `README.md` and `TEST_RESULTS.md`: run/deployment instructions, sample assumptions, walkthrough, and prior validation limits.
- No approved campus photography, logo asset package, testimonials, live data, or verified pilot outcomes are supplied. Do not invent them.

## Product Principles

1. Make the dining decision quick: prioritize the hall, available seats, wait, and next action.
2. Preserve trust: clearly distinguish synthetic examples from real campus information.
3. Keep counts and seat states consistent, including refresh, reset, and rejection paths.
4. Keep the pitch repeatable and the workflow usable without another device.
5. Improve presentation without sacrificing working features or the static deployment model.

## Accessibility & Inclusion

Use readable text, touch-friendly controls, visible keyboard focus, meaningful labels, and understandable status messages. Seat states must remain distinguishable through symbols and words as well as color. Preserve keyboard access, modal focus management, reduced-motion support, and printable QR fallback links. Validate narrow layouts without horizontal overflow. Real iPhone/Safari and Android/Chrome testing remains outstanding; Chromium emulation must not be described as physical-device validation.

## Open Decisions

- Actual campus capacity/layout, accessibility arrangements, shared-state design, stale/forgotten-checkout policy, and identity/data permissions need Auburn participation before a pilot.
- A live GitHub Pages URL remains unverified in this environment. Do not treat the expected URL as deployed without checking it.
- Exact presentation slot and the differing Canvas deadline/header still need instructor verification; keep scheduling detail in the README, not the core dining UI.
