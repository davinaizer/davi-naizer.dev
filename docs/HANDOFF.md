---
createdAt: 2026-08-10
updatedAt: 2026-09-27
version: 1.70
status: active
---

# Handoff

## Completed outcome

The 2026-09-27 CSS consistency audit's Batch 0 decisions (X1–X6) and its H1/G3 findings are complete. `h2` no longer means two things: the heading level is unchanged everywhere, and the small-label role (project-page section headings, "Continue exploring", the Work index's section headings) now uses a shared `.section-label-heading` class. All-caps tracked mono is reserved for supplementary metadata (eyebrows, chronology, tags, card labels, résumé metadata); navigation, buttons, the back link, continuation links, and section headings render in Inter, sentence case. The heading/label task received a same-scope `PASS`. Separately, developer-directed and validated but not run through the formal review stage: the fixed background gradient wash was removed to match `docs/DESIGN_PRINCIPLES.md`'s "no gradients" rule, and `docs/design/DESIGN.md` was rewritten to describe the shipped visual system instead of its original, superseded reference values.

## Next task candidate

None. `TODO.md` has no incomplete task.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/audit/2026-09-27-visual-css-consistency.md` (full findings, ROI, and fix-batch order; H1 and G3 marked resolved)
- `docs/DECISIONS.md` ("Reserve all-caps mono for supplementary labels…", "Remove the background gradient wash…", "Record the shipped visual system…" — all 2026-09-27)
- `docs/design/DESIGN.md` (rewritten to match the shipped site)
- `src/styles/patterns.css` (`.section-label-heading`), `src/components/ProjectPageLayout.tsx`, `src/pages/WorkPage.tsx`, `src/pages/CaseStudyPage.tsx`, `src/pages/ExperimentPage.tsx`
- `TODO.md` ("Heading semantics and label casing (audit findings H1 and G3) — Complete"; "Completed developer-directed CSS consistency audit, gradient removal, and design-doc reconciliation")

## Blockers

None.

## Constraints and deferred work

- The audit's remaining batches (spacing normalisation, token hygiene, other heading findings H2–H4, remaining generic-pattern items) are unbuilt. `docs/audit/2026-09-27-visual-css-consistency.md` has the full list, ranked, in fix-batch order.
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
