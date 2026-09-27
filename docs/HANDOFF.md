---
createdAt: 2026-08-10
updatedAt: 2026-09-27
version: 1.74
status: active
---

# Handoff

## Completed outcome

Batch 2's four remaining mechanical findings (T3, T7, T9, T11) are complete, delivered with same-scope `PASS`. Four new line-height tokens (`--line-height-display`, `--line-height-snug`, `--line-height-relaxed`, `--line-height-caption`) replaced five hardcoded values in `HomePage.css` and `patterns.css`; a shared `.tag-list`/`.tag-list li` class in `patterns.css` replaced three duplicated tag-pill rulesets, reused by `ProjectPageLayout.tsx`, `WorkPage.tsx`, and `ExperiencePage.tsx`; `.home h1` moved from `margin-top` to `margin-block-start`; `--color-border-strong` was re-confirmed as still in use (no action needed). Zero visual change — verified via exact computed line-height ratios and identical tag-pill rendering across Home, Work, Experience, and a project page. This follows Batch 2's five high-ROI findings (T1, T2, T4, T5, T6, also closed) and Batch 1 (F1–F4, fully closed).

## Next task candidate

None. `TODO.md` has no incomplete task. Batch 2's remaining findings (T8, T10, T12 — below) are the most likely source of the next task, but each needs its own decision first; the developer should choose which one via `plan-next-task`.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/audit/2026-09-27-visual-css-consistency.md` (full findings, ROI, and fix-batch order; F1–F4, T1/T2/T3/T4/T5/T6/T7/T9/T11, H1, and G3 marked resolved)
- `docs/DECISIONS.md` ("Reserve all-caps mono for supplementary labels…", "Remove the background gradient wash…", "Record the shipped visual system…" — all 2026-09-27)
- `docs/design/DESIGN.md` (rewritten to match the shipped site)
- `index.html` (Google Fonts request: final Batch 1 set — Inter 400/500, Newsreader 400 roman+italic/600, IBM Plex Mono 400/500)
- `src/styles/tokens.css` (`--color-backdrop`, four new `--line-height-*` tokens), `src/styles/global.css` (shared `h2, h3` letter-spacing), `src/styles/patterns.css` (`.section-label-heading`, both `::backdrop` rules, `.tag-list`)
- `src/styles/shell.css` (`.site-header__identity` at weight 400)
- `src/pages/HomePage.css`, `src/pages/ResumePage.css`, `src/pages/ExperiencePage.css`, `src/pages/ContactPage.css`, `src/pages/WorkPage.css` (Batch 2 fixes)
- `src/components/ProjectPageLayout.tsx`, `src/pages/WorkPage.tsx`, `src/pages/ExperiencePage.tsx`, `src/pages/CaseStudyPage.tsx`, `src/pages/ExperimentPage.tsx` (`.tag-list` and `.section-label-heading` usages)
- `TODO.md` ("Batch 2 remainder: mechanical fixes (audit findings T3, T7, T9, T11) — Complete"; "Batch 2 token hygiene: high-ROI quick fixes (audit findings T1, T2, T4, T5, T6) — Complete"; "Remove unused font weights (audit findings F3 and F4) — Complete"; "Font-load correctness (audit findings F1 and F2) — Complete"; "Heading semantics and label casing (audit findings H1 and G3) — Complete"; "Completed developer-directed CSS consistency audit, gradient removal, and design-doc reconciliation")

## Blockers

None.

## Constraints and deferred work

- Batch 1 is fully closed. Batch 2 has nine of twelve findings closed (T1–T7, T9, T11); only T8, T10, and T12 remain, each blocked on its own decision: T8 needs a single-primary-hover choice before a `.button`/`.button--primary`/`.button--ghost` refactor; T10 needs a deliberateness review of six off-scale spacing one-offs and six max-widths; T12 needs a target-browser policy before deciding on `oklch()` fallbacks. The rest of the audit is unbuilt: F5 (Batch 1, Low ROI), spacing normalisation (Batch 3), other heading findings H2–H4 (Batch 4), and remaining generic-pattern items (Batch 5). `docs/audit/2026-09-27-visual-css-consistency.md` has the full list, ranked, in fix-batch order.
- `docs/design/2026-09-27-adding-life-without-gradient.md` has unbuilt options for adding visual "life" now that the gradient is gone (tonal surfaces, editorial typographic craft, one kinetic moment, larger real evidence imagery, Swiss print marks, grain — in that recommended order); a Diagram Panel decision (Option 2, applied to project diagrams) was finalised separately (commit `efe31f7`). Revisit the rest when picked back up.
- `NotFoundPage.css`'s `.not-found__action a` is the same essential-action pattern as the rest of the G3 fix but was out of that task's approved scope; still mono-caps.
- `docs/DECISIONS.md`'s "Remove the background gradient wash…" entry has a pre-existing wrong file reference (`docs/design/2026-09-27-visual-css-consistency.md`, should be `docs/audit/...`); cosmetic, noted during review, not yet fixed.
- Section-nav highlight can go stale (deliberately deferred in an earlier task): the scroll-spy in `SectionNav.tsx` only updates when a section crosses its 20–30% viewport band. Affects project pages and Experience; non-blocking.
- Two Experience nav labels wrap in the desktop rail ("Independent Product Project · 2025–Present", "Gamesys / Bally's Interactive · 2020–2022"); readable, revisit only if tighter labels are wanted.
- No redirects: restore them only if evidence shows traffic arriving at the retired `/case-studies` or `/projects` URLs (review trigger in `docs/DECISIONS.md`).
- Task D review improvements, non-blocking: `CaseStudyPage` and `ExperimentPage` keep an unreachable not-found fallback now that `WorkProjectPage` resolves slugs; the Work card e2e test does not assert the `::after` focus ring; the "does not duplicate list separators" e2e test loops over a single path.
- Work card image panels use one accent tint and repeat the project title; add real card images or per-project tints only when projects gain distinct result images.
- Hero classification: only UV Insect Trap has a hero (a real finished-result photo distinct from its gallery). Revisit only if a future case study or experiment gains a comparable finished-result image.
- Non-blocking, pre-existing repository note: the composite `pnpm validate` script fails on `.claude/settings.local.json` formatting, a file gitignored via the developer's global gitignore and unrelated to any tracked task. Scoped checks (`pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`) are unaffected. Revisit only if this recurs and warrants a Biome ignore-rule task.
