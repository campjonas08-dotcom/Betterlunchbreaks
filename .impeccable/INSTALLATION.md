# Project-local Impeccable

Installed from the Codex-compatible distribution in `pbakaus/impeccable`, skill version **4.8.2**, upstream commit `b4bff1626c344067788c2679f048a20057c7cc5a`.

The project skill is `.agents/skills/impeccable/SKILL.md`; references and launch scripts are included beside it. The Apache 2.0 license is included in that directory. No application dependency or production script tag is added.

The context launcher ran successfully against `index.html`. In this cloud environment, use `IMPECCABLE_HOME=/workspace/.blb-tools/impeccable` for its checksum-verified engine cache. The cache is outside the checkout and must not be committed. A fresh environment may download the pinned engine again from GitHub releases.

`PRODUCT.md` captures the user-confirmed scope. `.impeccable/config.json` records the user's code-first preference. The working app remains the source of truth for existing behavior; read `DESIGN_REVIEW.md` before design changes.

Commit the skill and these project context/config files so later project sessions can discover them. If subsequently created, commit `DESIGN.md`, `.impeccable/design.json`, `.impeccable/surfaces/`, `.impeccable/live/config.json`, and `.impeccable/critique/ignore.md` too. Do not blanket-ignore `.impeccable/`; local runtime artifacts should be ignored individually. Reload or start a new coding session if the client needs to refresh its skill picker.
