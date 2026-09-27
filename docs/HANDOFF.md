---
createdAt: 2026-08-10
updatedAt: 2026-09-27
version: 1.71
status: active
---

# Handoff

## Completed outcome

The 2026-09-27 CSS consistency audit's Batch 1 font-load fixes (F1, F2) are complete and received a same-scope `PASS`. `index.html`'s Google Fonts request now includes Newsreader's italic axis at weight 400, so `.project-page__summary` renders a true italic instead of a browser-faked slant, and Inter weight 500, so `.section-nav__link[aria-current="true"]` and `.project-page__visual-title` render their intended medium weight instead of falling back to 400. Verified via `document.fonts` load status and computed styles on a live project page; no CSS or markup changed. This follows the prior completed outcome: the audit's Batch 0 decisions (X1–X6) and its H1/G3 heading/label findings, which unified `h2`'s two visual roles under a shared `.section-label-heading` class and moved all-caps mono off essential UI text onto Inter, sentence case.

## Next task candidate

None. `TODO.md` has no incomplete task. The audit's remaining unbuilt batches (below) are the most likely source of the next task; the developer should choose which one via `plan-next-task`.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/audit/2026-09-27-visual-css-consistency.md` (full findings, ROI, and fix-batch order; F1, F2, H1, and G3 marked resolved)
- `docs/DECISIONS.md` ("Reserve all-caps mono for supplementary labels…", "Remove the background gradient wash…", "Record the shipped visual system…" — all 2026-09-27)
- `docs/design/DESIGN.md` (rewritten to match the shipped site)
- `index.html` (Google Fonts request: Newsreader italic axis, Inter 500)
- `src/styles/patterns.css` (`.section-label-heading`), `src/components/ProjectPageLayout.tsx`, `src/pages/WorkPage.tsx`, `src/pages/CaseStudyPage.tsx`, `src/pages/ExperimentPage.tsx`
- `TODO.md` ("Font-load correctness (audit findings F1 and F2) — Complete"; "Heading semantics and label casing (audit findings H1 and G3) — Complete"; "Completed developer-directed CSS consistency audit, gradient removal, and design-doc reconciliation")

## Blockers

None.

## Constraints and deferred work

- The audit's remaining batches (F3/F4 in Batch 1, token hygiene, spacing normalisation, other heading findings H2–H4, remaining generic-pattern items) are unbuilt. `docs/audit/2026-09-27-visual-css-consistency.md` has the full list, ranked, in fix-batch order. F3 (Inter 600/700 requested but unused) and F4 (Newsreader 500 used only by the header wordmark) were left for a future task since they weren't part of the approved F1/F2 scope.
- The working tree carries developer work-in-progress unrelated to this task, observed but not touched: an uncommitted edit to `src/pages/ExperiencePage.tsx` (moving the role summary above the Technologies section) and two new untracked images under `public/images/alfred/`. Not reviewed or validated as part of this task.
- `docs/design/2026-09-27-adding-life-without-gradient.md` has unbuilt options for adding visual "life" now that the gradient is gone (tonal surfaces, editorial typographic craft, one kinetic moment, larger real evidence imagery, Swiss print marks, grain — in that recommended order). Revisit when picked back up.
- `NotFoundPage.css`'s `.not-found__action a` is the same essential-action pattern as the rest of the G3 fix but was out of that task's approved scope; still mono-caps.
- `docs/DECISIONS.md`'s "Remove the background gradient wash…" entry has a pre-existing wrong file reference (`docs/design/2026-09-27-visual-css-consistency.md`, should be `docs/audit/...`); cosmetic, noted during review, not yet fixed.
- Section-nav highlight can go stale (deliberately deferred in an earlier task): the scroll-spy in `SectionNav.tsx` only updates when a section crosses its 20–30% viewport band. Affects project pages and Experience; non-blocking.
- Two Experience nav labels wrap in the desktop rail ("Independent Product Project · 2025–Present", "Gamesys / Bally's Interactive · 2020–2022"); readable, revisit only if tighter labels are wanted.
- No redirects: restore them only if evidence shows traffic arriving at the retired `/case-studies` or `/projects` URLs (review trigger in `docs/DECISIONS.md`).
- Task D review improvements, non-blocking: `CaseStudyPage` and `ExperimentPage` keep an unreachable not-found fallback now that `WorkProjectPage` resolves slugs; the Work card e2e test does not assert the `::after` focus ring; the "does not duplicate list separators" e2e test loops over a single path.
- Work card image panels use one accent tint and repeat the project title; add real card images or per-project tints only when projects gain distinct result images.
- Hero classification: only UV Insect Trap has a hero (a real finished-result photo distinct from its gallery). Revisit only if a future case study or experiment gains a comparable finished-result image.
- Non-blocking, pre-existing repository note: the composite `pnpm validate` script fails on `.claude/settings.local.json` formatting, a file gitignored via the developer's global gitignore and unrelated to any tracked task. Scoped checks (`pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`) are unaffected. Revisit only if this recurs and warrants a Biome ignore-rule task.
