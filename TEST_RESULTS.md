# Validation results

Executed November 11, 2026 (America/Chicago) in the managed Linux cloud environment.

## Passed

`/workspace/.blb-tools/venv/bin/python tests/smoke.py` completed successfully using **Chromium 156.0.8078.79**, Playwright 1.62.0:

- Desktop viewport 1440 × 1000.
- Phone viewport 390 × 844 with mobile and touch emulation.
- Hall selection and preview return path; seating chart expand/collapse.
- Initial hall 141 filled / 183 open and visible section 8 filled / 16 open.
- Occupied-seat feedback, successful check-in, repeated check-in, and second-seat rejection. Successful check-in gives hall 142 / 182 and section 9 / 15, with matching overview/forecast counts.
- Refresh preserves a check-in. Checkout reopens the seat and reverses the counts.
- Direct `?table=A2` link and refresh reopen the right dialog. Reset persists across refresh.
- Invalid table link and unsafe sticker URL rejection.
- QR stickers for **all six demo tables**: rendered codes decoded with zxing-cpp to the exact GitHub Pages subpath and table query string. This validates QR content, not deployment.
- Print stylesheet displays the sticker and hides the app navigation.
- Keyboard skip link, Enter activation, modal tab loop, Escape dismissal, and no horizontal overflow at both tested widths. Keyboard testing exposed a modal focus wrap issue; explicit focus cycling was added and the suite passed afterward.
- Unavailable-storage fallback keeps check-in usable and reports that persistence will not work.
- No browser JavaScript exceptions during either viewport run.

`node --check app.js`, `node --check data.js`, and `git diff --check` passed. The documented dependency installation was repeated successfully in the dedicated `/workspace/.blb-tools/venv` environment. The local Python HTTP server served the app under `/Betterlunchbreaks/`, exercising repository-relative asset and query paths. Desktop and phone screenshots were inspected; test screenshots are generated outside the repository at `/tmp/blb-test-artifacts`.

## Not verified / blocked

- No physical iPhone/Safari or Android/Chrome was tested. These remain required pre-presentation checks. A WebKit launch was attempted; the WebKit executable is not installed. Chromium mobile emulation is the tested phone layout, not actual Safari or Android.
- No public deployment was performed. Git read access worked through the existing proxy; the GitHub API request was denied with CONNECT 403 by the network policy. GitHub Pages configuration permissions remain unverified. Follow the README's exact Pages setup steps after pushing the files.
- No campus data, real Tiger ID, live occupancy, scanner API, cross-device consistency, actual print output, or physical camera scan was tested. These are outside the static prototype or require a published URL/hardware.
- The external wireframe image and Canvas project files were not available as local inputs; their contents and presentation slot were not independently verified.
