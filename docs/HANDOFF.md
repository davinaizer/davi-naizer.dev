---
createdAt: 2026-08-10
updatedAt: 2026-09-27
version: 1.75
status: active
---

# Handoff

## Completed outcome

Batch 2's button-consolidation finding (T8) is complete, delivered with same-scope `PASS`. Shared `.button--ghost` and `.button--primary` classes in `patterns.css` replaced the duplicated header-Contact/résumé-download block and reconciled the two different primary-button hovers (Home's hero action and the analytics dialog's confirm button) into one developer-chosen "unfill" treatment. Zero visual change on the three unchanged buttons; the intended hover-only change on the analytics dialog's primary button — verified via computed styles and hover screenshots for all four instances. A cascade-layer interaction (a pages-layer rule out-prioritising the shared components-layer button border on one edge) was caught and fixed with a local override. This follows Batch 2's five high-ROI findings (T1, T2, T4, T5, T6) and its four mechanical findings (T3, T7, T9, T11), both closed earlier.

## Next task candidate

None. `TODO.md` has no incomplete task. Three Batch 2 candidates remain, in the order the developer chose to sequence them: T10 (spacing deliberateness review — needs its own review pass), T12 (oklch fallback policy — **already decided**: evergreen browsers only, no fallback, so this is now a small documentation-close task), and T13 (Text/Link and Secondary button consolidation, added 2026-09-27 from a follow-up live audit). Each still needs its own `plan-next-task` pass.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/audit/2026-09-27-visual-css-consistency.md` (full findings, ROI, and fix-batch order; F1–F4, T1/T2/T3/T4/T5/T6/T7/T8/T9/T11, H1, and G3 marked resolved; T13 added from the follow-up buttons/links audit)
- `docs/audit/buttons-links-audit/` (screenshots behind the T13 finding)
- `docs/DECISIONS.md` ("Reserve all-caps mono for supplementary labels…", "Remove the background gradient wash…", "Record the shipped visual system…" — all 2026-09-27)
- `docs/design/DESIGN.md` (rewritten to match the shipped site)
- `index.html` (Google Fonts request: final Batch 1 set — Inter 400/500, Newsreader 400 roman+italic/600, IBM Plex Mono 400/500)
- `src/styles/tokens.css` (`--color-backdrop`, four new `--line-height-*` tokens), `src/styles/global.css` (shared `h2, h3` letter-spacing), `src/styles/patterns.css` (`.section-label-heading`, both `::backdrop` rules, `.tag-list`, `.button--ghost`, `.button--primary`)
- `src/styles/shell.css` (`.site-header__identity` at weight 400; `.site-header__contact` now layout-only, styled via `.button--ghost`)
- `src/pages/HomePage.css`, `src/pages/ResumePage.css`, `src/pages/ExperiencePage.css`, `src/pages/ContactPage.css`, `src/pages/WorkPage.css` (Batch 2 fixes)
- `src/components/ProjectPageLayout.tsx`, `src/pages/WorkPage.tsx`, `src/pages/ExperiencePage.tsx`, `src/pages/CaseStudyPage.tsx`, `src/pages/ExperimentPage.tsx` (`.tag-list` and `.section-label-heading` usages)
- `src/components/PrimaryNavigation.tsx`, `src/pages/ResumePage.tsx`, `src/pages/HomePage.tsx`, `src/components/AnalyticsSettings.tsx` (`.button--ghost`/`.button--primary` usages)
- `TODO.md` ("Batch 2: button consolidation (audit finding T8) — Complete"; "Batch 2 remainder: mechanical fixes (audit findings T3, T7, T9, T11) — Complete"; "Batch 2 token hygiene: high-ROI quick fixes (audit findings T1, T2, T4, T5, T6) — Complete"; "Remove unused font weights (audit findings F3 and F4) — Complete"; "Font-load correctness (audit findings F1 and F2) — Complete"; "Heading semantics and label casing (audit findings H1 and G3) — Complete"; "Completed developer-directed CSS consistency audit, gradient removal, and design-doc reconciliation")

## Blockers

None.

## Constraints and deferred work

- Batch 1 is fully closed. Batch 2 has ten of thirteen findings closed (T1–T9, T11); T10, T12, and T13 remain. T10 needs a deliberateness review of six off-scale spacing one-offs and six max-widths. T12's target-browser decision is already made (evergreen only, no fallback) — implementation is a small documentation close-out. T13 (added 2026-09-27) needs a plan for extracting a shared `.button--secondary` class and unifying three Text/Link CTAs; `.primary-navigation a`, `.section-nav__link`, and `.project-page__back` are deliberately excluded from that consolidation since they carry active/current-state navigation semantics. The rest of the audit is unbuilt: F5 (Batch 1, Low ROI), spacing normalisation (Batch 3), other heading findings H2–H4 (Batch 4), and remaining generic-pattern items (Batch 5). `docs/audit/2026-09-27-visual-css-consistency.md` has the full list, ranked, in fix-batch order.
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
