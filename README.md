# Better Lunch Breaks

A mobile-friendly, fully static dining hall prototype for Auburn ENGR 1100, Section 002, Group 2. No login, backend, build step, analytics, or campus data feed. The Edge is interactive; The Village is a labeled preview. The mock profile collects no student ID or location.

## Run locally

From `/workspace` (or the directory containing this checkout):

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory /workspace
```

Open the `Betterlunchbreaks/` path on that local server. Serving the repository as a subdirectory deliberately exercises the GitHub Pages path layout. On another machine, adjust the server directory to the checkout's parent. All runtime assets, including QR generation, are local. Use an HTTP server rather than opening `index.html` as a file.

## GitHub Pages

1. Commit and push these files to `main` in `campjonas08-dotcom/Betterlunchbreaks` using your normal Git workflow.
2. In the repository, open **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, `main`, and `/ (root)`, then **Save**. Preserve the repository's existing visibility. If Pages is unavailable for the account/visibility combination, consult the repository owner; do not change visibility just to enable it.
3. Wait for GitHub's Pages deployment to succeed. The expected URL is `https://campjonas08-dotcom.github.io/Betterlunchbreaks/` (not yet verified).
4. Verify that URL and `https://campjonas08-dotcom.github.io/Betterlunchbreaks/?table=A1`, including a refresh of the table link. Run the smoke suite against the public URL if reachable.
5. Open **View seating chart → Print a table sticker**, enter the verified public URL **including `/Betterlunchbreaks/`**, choose a table, and generate/print. Each table gets its own `?table=A1` through `?table=A6` link. Test with an actual phone camera before the pitch. A generated QR is not evidence that the destination has been published.

Current onboarding environment: Git read access succeeded; GitHub API access was blocked at the proxy with a CONNECT 403 for `api.github.com`. The prototype is prepared for pushing to main; no public deployment is claimed verified. Add `api.github.com` to environment network access for API-based deployment checks; usable write/Pages permissions must still be verified. No GitHub token is required merely to read through the existing platform Git proxy.

## Demo model and state

- `data.js` owns the synthetic table model and count calculations. Initial hall occupancy is **141 of 324 filled / 183 open**. The window section shows **24 seats across six tables**, with **8 initially taken / 16 open**. The other sections account for 133 filled seats. One browser check-in adds exactly one filled seat to both section and hall totals.
- `app.js` owns interactions and persistence. `better-lunch-breaks-v1` in localStorage contains only a synthetic seat label. Refresh preserves a check-in. Tabs on the same origin synchronize storage events; separate browsers/devices do **not** share state. No simultaneous multi-user guarantees are claimed. A storage failure produces a visible persistence warning while keeping the current session usable.
- Occupied seats remain interactive to explain that they are taken. Repeat check-ins and a second seat request never increment counts. Invalid table parameters show feedback and the seating chart. Reset returns to the original sample state, preserving no check-in.
- The **~7-minute wait**, **~50 seats open at noon**, **~170 at 1:30 p.m.**, hours, recommendation, occupancy, and floor plan are fixed illustrative scenarios, not live measurements or predictions. The “now” forecast count follows the demo state. Floor plan and capacity are not claims about The Edge's actual layout.
- Manual checkout is required. Forgotten check-outs and stale counts are unresolved pilot design questions, not silently auto-corrected by this prototype.

## Four-minute pitch walkthrough

1. **0:00–0:40:** Reset the demo. Introduce the short-break problem; select The Edge. Point out 183 seats open and the simulated 7-minute line.
2. **0:40–1:20:** Compare now to the sample noon rush. Explain eating in versus coming back later or taking food to go. Check your own walking/class schedule; the app doesn't know it.
3. **1:20–2:20:** Open the seating chart. Explain open ○, taken ×, and your seat ✓. Try a demo scan for A1, click taken seat 1 for feedback, then open seat 2. Show 142 filled / 182 open and the saved check-in.
4. **2:20–3:00:** Click the same seat again to show repeat protection, close the dialog, refresh, then check out. Show the count returning to 141 / 183.
5. **3:00–4:00:** Show a printed sticker and the mock profile. Explain browser-local synthetic data, manual checkout, and the campus work needed for a real pilot. Reset for the next audience.

The prototype supports the pitch; it does not replace the required PowerPoint, 60-second commercial, or presentation sketch. Plan for **Wednesday, November 18, 2026, 11:59 p.m. Auburn time** based on the written night-before instruction for the November 19 presentation. The Canvas header differs; verify the exact slot and original project rubric with the instructor. The linked hand-drawn wireframe image was not available in the checkout; this implementation follows the supplied description rather than claiming visual fidelity to an unseen image.

## Validation

The application needs only Python 3 for a local server. Browser tests use Python Playwright and system Chromium; QR validation additionally uses Pillow and zxing-cpp. In this cloud environment:

```sh
python3 -m venv /workspace/.blb-tools/venv
/workspace/.blb-tools/venv/bin/python -m pip install -r tests/requirements.txt
# Start the server above in another terminal, then:
cd /workspace/Betterlunchbreaks
/workspace/.blb-tools/venv/bin/python tests/smoke.py
node --check app.js
node --check data.js
git diff --check
```

`BLB_TEST_URL` overrides the test target, and `BLB_ARTIFACTS` sets the screenshot directory (default `/tmp/blb-test-artifacts`). The tests use `/usr/bin/chromium`; install a system Chromium or adjust that explicit path on other systems. There is no build step or application dependency install.

See `TEST_RESULTS.md` for actual outcomes and platform limits. Before presenting, test the published page in Safari on a physical iPhone and Chrome on a physical Android phone; desktop mobile emulation does not prove those devices work.

## Toward a campus pilot

Auburn participation is needed for actual capacity and accessible floor plans, dining wait measurements, shared occupancy infrastructure, real identity integration and permissions, privacy/retention review, signage placement, accessible alternatives to QR scanning, forgotten-checkout rules, and validation that occupancy estimates are reliable. Real Tiger ID, scanner integration, GPS, live feeds, and shared cross-device state are deliberately deferred.

`vendor/qrcode.js` is qrcode-generator 1.4.4 by Kazuhiko Arase, MIT licensed. See `vendor/LICENSE.txt`. This site has no affiliation claim or official Auburn authentication.
