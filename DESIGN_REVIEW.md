# Better Lunch Breaks: initial code and design review

Reviewed the current implementation after the user confirmed the original product scope and code-first workflow. This document records findings and a proposed next design pass; it does not claim the proposed visual system is already implemented or approved as an official Auburn identity.

## Working foundation

The static stack fits the GitHub Pages deployment goal. There is no reason to replace it with a framework to accomplish the requested redesign.

| File | Responsibility | Preserve during design work |
| --- | --- | --- |
| `index.html` | Content, landmarks, hall picker, overview, seating region, three native dialogs | Element IDs consumed by JavaScript, labels, demo disclosures, query-link entry flow, printable sticker |
| `styles.css` | Visual tokens, layout, responsive breakpoints, focus, reduced motion, print rules | Touch target sizing, keyboard focus, responsive behavior, print isolation, hidden-state handling |
| `data.js` | Synthetic tables and hall/section count calculations | One count source; 324 hall seats, 24 displayed seats, baseline counts and one-seat delta |
| `app.js` | Rendering, check-in/checkout, storage, QR links, profile, reset | All paths and rejection feedback; storage key and refresh continuity |
| `tests/smoke.py` | Browser acceptance and QR decoding | Existing behavioral assertions; add checks only where changed behavior warrants them |
| `vendor/qrcode.js` | Local QR code generation | Offline/local runtime dependency and license notice |

The model separates synthetic occupancy from the UI well. Native buttons and dialogs, explicit seat symbols/labels, live status regions, and local runtime assets are useful foundations. The app already supports the pitch without a camera or second device.

## Findings, in priority order

### 1. The mobile task starts too far down the page

At the tested **390 × 844** viewport, the available-seat number begins at approximately **y=776 px** and the seating-chart action at **y=1353 px**. The intro alone consumes 277 px before the hall picker. At **1440 × 1000**, the seating action starts at y=1050 px, also below the initial viewport.

For a student deciding quickly between classes, the hall, open-seat count, wait, and seating action should appear earlier. Reduce the introductory space and bring the primary action alongside the dining snapshot. Preserve the forecast, recommendation, hall picker, and demo disclosures rather than removing them to achieve the shorter path.

### 2. The incumbent identity does not deliver the requested Auburn theme

`styles.css` currently centers dark green (`--ink: #183a32`), cream, and lime. Its oversized serif introduction and botanical/starburst decoration establish a different tone from the user's requested Auburn-themed dining utility.

Proposed direction: navy-led structure, warm orange accents, white or subtle neutral surfaces, confident collegiate typography, and clear numeric hierarchy. Express the school connection through color, naming, and disciplined details. Do not invent an official logo, campus photography, endorsement, or affiliation.

### 3. Important supporting text is too small

At phone width, `.stat-label` computes to **8 px**; forecast labels and some disclosures are similarly small. Demo status matters to product trust and should remain readable, not be reduced to decorative fine print.

Increase ordinary supporting text and labels, reduce excessive tracking at small sizes, and preserve hierarchy through weight and spacing. Aim for comfortable 14–16 px reading text and generally 12 px or larger supporting labels, with contrast verified against the actual chosen colors.

### 4. Checked-in status and feedback deserve stronger placement

`#my-seat` and the global `#status` region are after the entire workspace. The table dialog gives immediate check-in feedback, but once dismissed, the persistent seat and checkout control can sit below a long chart. Invalid-link feedback is also far below the initial viewport even though the chart opens.

In the design pass, place the active check-in and important status near the relevant dining action, or provide a compact persistent summary with an accessible route to checkout. Keep the existing live-region behavior and all checkout/reset functionality.

### 5. CSS and markup are hard to maintain

Most CSS rules are compressed onto one line and several HTML sections are single long lines. This makes focused review and safe visual iteration unnecessarily difficult. `--orange` does not currently govern every orange highlight, and background/text colors are repeated as literals.

Format the affected source as part of the design implementation, define semantic tokens for surfaces/text/borders/actions/seat states, and keep breakpoints and print rules easy to locate. This is maintainability work, not a reason to add a build pipeline or rewrite the interaction layer.

### 6. Review the recommendation's certainty

“Have 25 minutes? There’s room for lunch” can sound like a guarantee even though the estimate covers only a synthetic queue and does not know walking or eating time. The current supporting text already qualifies it.

Keep the student benefit, sample assumptions, and to-go option, but give the qualification sufficient prominence. Do not introduce a real arrival-time calculator or personalized schedule claim without a separate product decision.

### 7. Browser and deployment evidence still has limits

Chromium desktop and touch/mobile emulation are verified. Physical iPhone/Safari, Android/Chrome, actual printed output, and physical camera scans are not. GitHub `main` contains the prototype, but the public Pages site remains unverified because the environment denied API/site access. None of these should be presented as completed validation.

## Proposed next design pass

Treat this surface as a task-oriented dining app. The user should immediately recognize the chosen hall, understand the sample crowd/wait, and find the seating action. The product's existing features and honest demo disclosures are the contract.

1. Make a compact mobile header and short introduction; keep hall selection close to The Edge overview.
2. Give available seats and wait the strongest information hierarchy, with a prominent seating action beside them.
3. Establish the Auburn-inspired navy/orange direction through a coherent set of tokens and readable type, avoiding decorative clutter or official-affiliation claims.
4. Keep the forecast compact and explicitly illustrative; retain the eat-in/later/to-go decision support.
5. Refine the seating layout and table dialog while preserving symbols, accessible names, table IDs, validation feedback, and QR links.
6. Make active-seat status and checkout easy to recover on a small screen; retain reset and printable stickers.
7. Re-run the acceptance suite and inspect the rendered overview, seating, checked-in state, dialogs, and print view at narrow and desktop widths. Test physical Safari/Chrome before the pitch.

Record the selected visual system in `DESIGN.md` when that design pass establishes it. Do not document the current green theme as the desired Auburn direction.

## Baseline validation for this review

Re-ran `tests/smoke.py` with Playwright 1.62.0 and **Chromium 156.0.8078.79** at **1440 × 1000** and **390 × 844**. Both viewport runs passed hall selection, seat counts, occupied/repeat checks, check-in, refresh persistence, checkout, reset, direct table links, invalid links, all six QR decodes, print visibility, keyboard focus/dismissal, and overflow checks. Unavailable-storage fallback passed. No JavaScript exceptions were reported. `node --check app.js`, `node --check data.js`, and `git diff --check` passed.

Fresh screenshots were inspected at `/tmp/blb-impeccable-baseline/initial-390.png` and `/tmp/blb-impeccable-baseline/initial-1440.png`; these are local review artifacts, not committed product assets. The coordinate measurements above were taken from the current browser-rendered DOM.

Initialization adds project context, the Impeccable skill/config, and this review only. Application HTML, CSS, JavaScript, data, tests, QR dependency, and existing behavior remain unchanged in this phase.
