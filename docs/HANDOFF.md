---
createdAt: 2026-08-10
updatedAt: 2026-09-27
version: 1.80
status: active
---

# Handoff

## Completed outcome

Batch 4 heading-hierarchy fixes (H2, H3) of the 2026-09-27 CSS consistency audit are complete, delivered with same-scope `PASS`. `/work`'s "Case studies"/"Experiments" section headings stay real `h2`s restyled at the standard 24px serif size, with their card `h3`s shrunk to `--font-size-body-lg`, fixing the inverted visual hierarchy while keeping a correct `h1 → h2 → h3` outline. `/experience`'s dormant "Earlier career" entry titles got a smaller `h3` step than their section `h2` (no visible effect yet — that section is commented out). Mid-implementation, the originally approved fix for H2 (demote the labels to non-headings) was replaced with the above after it surfaced a `heading-order` violation in the repository's `vitest-axe` check; the developer approved the alternative. This follows Batch 3 (S1–S5) and H1/G3 (also Batch 4), all fully closed.

## Next task candidate

None. `TODO.md` has no incomplete task. The remaining audit work (Batch 4's H4, Batch 5 generic-pattern items, plus F5) is unbuilt and undecided — see Constraints below. The developer should choose the next task via `plan-next-task`.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/audit/2026-09-27-visual-css-consistency.md` (full findings, ROI, and fix-batch order; F1–F4, T1–T13, S1–S5, H1–H3, and G3 marked resolved — Batches 1–3 fully closed, Batch 4 partially closed: H4 remains)
- `docs/plans/2026-09-27-batch4-heading-hierarchy-h2-h3.md` (approved plan, including the mid-implementation H2 decision change from Option A to Option B)
- `docs/audit/buttons-links-audit/` (screenshots behind the T13 finding)
- `docs/DECISIONS.md` ("Target modern evergreen browsers only; no CSS fallback for `oklch()`", "Reserve all-caps mono for supplementary labels…", "Remove the background gradient wash…", "Record the shipped visual system…" — all 2026-09-27)
- `docs/design/DESIGN.md` (rewritten to match the shipped site)
- `index.html` (Google Fonts request: final Batch 1 set — Inter 400/500, Newsreader 400 roman+italic/600, IBM Plex Mono 400/500)
- `src/styles/tokens.css` (`--color-backdrop`, four `--line-height-*` tokens, three `--measure-*` tokens, comments on `--space-tag-block`/`--space-marker-offset`), `src/styles/global.css` (shared `h2, h3` letter-spacing), `src/styles/patterns.css` (`.section-label-heading`, both `::backdrop` rules, `.tag-list`, `.button--ghost`, `.button--primary`, `.button--secondary`, `.button--text`, `.page-lead`/`.section-layout` now on `--space-8`, gallery caption padding on `--space-3`)
- `src/styles/shell.css` (`.site-header__identity` at weight 400; `.site-header__contact` layout-only, styled via `.button--ghost`)
- `src/pages/WorkPage.tsx`/`WorkPage.css` (H2: section `h2`s no longer use `.section-label-heading`, sized at `--font-size-heading-md` via `.work__section > h2`; `.work__card h3` now `--font-size-body-lg`), `src/pages/ExperiencePage.css` (H3: `.experience__timeline--earlier .experience__entry-header h3` on `--font-size-body-lg`; also `.experience__entry` on `--measure-wide`, `.experience__layout` on `--space-8`, `.experience__earlier-career` divider padding on `--space-4`, `.experience__item` inline padding on `--space-6`)
- `src/pages/HomePage.css` (`.home__hero` on `--measure-wide`; `.home__highlight`/`.home__about` merged onto one shared `--measure-narrow` rule; `.home__actions a.button--ghost` and its `:hover` override for the download link; `.home a` catch-all replaced with `.home__highlight a, .home__about a`), `src/pages/ContactPage.css` (`.contact__links` on `--space-8`), `src/pages/ResumePage.css` (earlier Batch 2/3 fixes)
- `src/components/ProjectPageLayout.tsx`, `src/pages/ExperiencePage.tsx`, `src/pages/CaseStudyPage.tsx`, `src/pages/ExperimentPage.tsx` (`.tag-list` and `.section-label-heading` usages — `.section-label-heading` is no longer used on `/work`, only on project-page and Work-index-adjacent sub-labels)
- `src/components/PrimaryNavigation.tsx`, `src/pages/ResumePage.tsx`, `src/pages/HomePage.tsx`, `src/components/AnalyticsSettings.tsx`, `src/components/ProjectGallery.tsx`, `src/components/ContextualContinuation.tsx` (`.button--ghost`/`.button--primary`/`.button--secondary`/`.button--text` usages)
- `TODO.md` ("Batch 4: heading hierarchy (audit findings H2 and H3) — Complete"; "Batch 3: spacing normalisation (audit findings S1–S5) — Complete"; "Batch 2: extract shared Secondary and Text/Link button classes (audit finding T13) — Complete"; "Batch 2: target-browser policy and oklch() fallback close-out (audit finding T12) — Complete"; "Batch 2: spacing deliberateness review and max-width consolidation (audit finding T10) — Complete"; "Batch 2: button consolidation (audit finding T8) — Complete"; "Batch 2 remainder: mechanical fixes (audit findings T3, T7, T9, T11) — Complete"; "Batch 2 token hygiene: high-ROI quick fixes (audit findings T1, T2, T4, T5, T6) — Complete"; "Remove unused font weights (audit findings F3 and F4) — Complete"; "Font-load correctness (audit findings F1 and F2) — Complete"; "Heading semantics and label casing (audit findings H1 and G3) — Complete"; "Completed developer-directed CSS consistency audit, gradient removal, and design-doc reconciliation")

## Blockers

None.

## Constraints and deferred work

- Batches 1–3 and H1–H3/G3 of Batch 4 are all fully closed. The rest of the audit is unbuilt and undecided: F5 (Batch 1, Low ROI), H4 (Batch 4 — project pages have no `h3` sub-level; needs a content-structure decision, touches `CaseStudyPage.test.tsx`), and remaining generic-pattern items (Batch 5). `docs/audit/2026-09-27-visual-css-consistency.md` has the full list, ranked, in fix-batch order — the developer should choose whether/which to pick up next.
- `.primary-navigation a`, `.section-nav__link`, `.project-page__back`, `.site-footer__text-link`, and `.site-footer__links a` were deliberately kept out of the T13 button/link consolidation — the first three carry active/current-state navigation semantics, and the footer two are a muted utility action and (per developer decision, correcting the original audit note) a visually distinct icon treatment, respectively.
- `.experience__earlier-career`/`.experience__earlier-career-header`'s tokens (T10, S3) and the earlier-career entry `h3` sizing (H3) currently have no visual effect: the whole "Earlier career" section is commented out in `ExperiencePage.tsx` (pre-existing, unrelated to any of these tasks).
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
