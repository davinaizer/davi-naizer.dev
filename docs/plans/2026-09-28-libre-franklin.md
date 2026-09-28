---
createdAt: 2026-09-28
updatedAt: 2026-09-28
version: 1.0
status: complete
---

# Replace IBM Plex Sans with Libre Franklin and set font smoothing

Developer-directed. Approved 2026-09-28. Follow-up to `docs/plans/2026-09-28-ibm-plex-sans.md`, whose outcome this reverses. Supports PRODUCT_REQUIREMENTS 4.1 and engineering judgement. Milestone 5.

## Objective

Accept and finish the developer-authored font change so the code, preview image, decision record and design doc agree and the repository is deployable. Sans family: Libre Franklin. Newsreader and IBM Plex Mono are unchanged.

## Evidence

- After `6ba764f` shipped IBM Plex Sans, the developer saw it render heavier than the mockup. Diagnosis: the site set no font smoothing, while the mockup set `-webkit-font-smoothing: antialiased`. Compared on the real Home paragraph, default smoothing was visibly bolder; `antialiased` looked like regular weight. The computed weight was 400 and only the 400 and 500 faces loaded, so this was not a weight bug.
- The developer tried Atkinson Hyperlegible Next, then chose Libre Franklin plus a global smoothing rule, and judged it acceptable on the real site.

## Already in the working tree (developer-authored)

- `index.html`: `Libre+Franklin:wght@400;500` replaces the Plex Sans request.
- `src/styles/tokens.css`: `--font-family-sans` is `"Libre Franklin", ui-sans-serif, system-ui, sans-serif`.
- `src/styles/global.css`: `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` on `html`. The same file also has a whitespace-only rewrap of the `a` transition, unrelated to this task.

## Decision (approved)

Record the reversal as a superseding `DECISIONS.md` entry, and mark the 2026-09-28 Plex Sans entry as superseded in place, as the gradient entry was handled (option A). Option B, rewriting the Plex Sans entry, was rejected because it contradicts the committed history and loses the smoothing finding.

## Scope

- Verify the source changes as written.
- Redraw the `public/social-preview.png` tagline in Libre Franklin, same position, colour and footprint, inside the frame.
- Update `docs/design/DESIGN.md` to name Libre Franklin.
- Add the superseding decision recording Libre Franklin and the global smoothing rule (deliberate consequence: it also lightens Newsreader and Plex Mono on macOS and iOS; other platforms unchanged).
- Refresh `TODO.md` and `docs/HANDOFF.md`; keep the Plex Sans history accurate as a reversed intermediate step.
- Commit the source changes with the doc updates.

## Amendment (2026-09-28, developer-directed, after the first review returned `CHANGES REQUIRED`)

`pnpm test` failed with two stale expectations in `src/pages/ResumePage.test.tsx`, left behind by commit `1043600` (canon-resume sync). The developer confirmed the content changes were intentional (the current role now starts 01/2026, and "Planned Career Break" was renamed "Career Break") and chose to include the test fix in this task rather than a separate one. Scope added: update those two expectations only ("2025–Present" to "2026–Present"; "Planned Career Break" to "Career Break"). No content change. Related but unaffected: the plan's "Repository deployable" criterion now includes a green `pnpm test`.

## Amendment (2026-09-28, developer-directed, after the second review returned `CHANGES REQUIRED`)

The developer rebuilt `public/social-preview.png` in Figma instead of the tagline redraw described under Scope and the criteria above. Those preview items are superseded: the card is a new layout (D mark on the right, the site's periwinkle accent, role line "Senior Frontend Engineer"), and the criterion is that it is exactly 1200x630 to match the `og:image:width` and `og:image:height` in `index.html`. The first export was 1198x630 and was re-exported at 1200x630 (verified with `file`). The Figma file is the source and lives outside the repo. Open item for the developer: the card's role line differs from the "Senior Frontend & Product Engineer" used by the site's Home subtitle and `og:title`.

## Exclusions

Further font exploration; weight or metric changes beyond a demonstrated regression; Newsreader and Plex Mono changes; the unrelated `DESIGN.md` Buttons `label-mono` drift; rewriting historical decision, audit or plan prose; amending the earlier Plex Sans commit or its plan.

## Assumptions and risks

- Weights 400 and 500 suffice for the sans; the serif carries the 600 rules.
- Libre Franklin is the widest candidate: check nav, buttons, chips and wrapping at 1280, 896, 640 and 320px, with screenshots at every width.
- The redrawn tagline must fit the preview frame.
- If `biome check src` flags the unrelated `a` transition rewrap in `global.css`, restore the original formatting for that hunk; if clean, leave it out of this task's commit.

## Completion criteria

| Outcome | Evidence |
|---|---|
| No Plex Sans or Inter in shipped code, preview or `DESIGN.md`, except as historical prose | search of `src`, `index.html`, `docs/design`; view of the preview |
| Libre Franklin loads at 400 and 500 | `document.fonts` check in a browser |
| Smoothing is applied | computed `-webkit-font-smoothing` on `html` |
| No wrapping or overflow regression at four widths | overflow check at 1280, 896, 640, 320px on the main routes, plus screenshots at all four |
| Preview matches the site | tagline in Libre Franklin, inside the frame, 1200x630 |
| Decision and docs accurate | superseding `DECISIONS.md` entry; `DESIGN.md` diff; refreshed `TODO.md` and `HANDOFF.md` |
| Repository deployable | `pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`, `pnpm test:e2e` |

`pnpm validate` still fails only on the known unrelated `.claude/settings.local.json` formatting issue; scoped checks apply.

## Review trigger

Revisit if wrapping or width regressions appear, or if the sans or the smoothing rule reads poorly in production.
