---
createdAt: 2026-08-10
updatedAt: 2026-09-27
version: 1.77
status: active
---

# Handoff

## Completed outcome

Batch 2's target-browser/oklch() finding (T12) is complete, delivered with same-scope `PASS`. Recorded the developer's decision in `docs/DECISIONS.md` ("Target modern evergreen browsers only; no CSS fallback for `oklch()`"): the site targets Safari 15.4+, Chrome/Edge 111+, Firefox 113+, with no RGB/hex fallback for the `oklch()`-based color tokens. Documentation-only; no source code changed. This follows Batch 2's spacing-and-max-width finding (T10, also closed with `PASS`).

**Note for whoever picks up the next task:** the working tree still has your own uncommitted, in-progress edit in `src/styles/patterns.css` (a `.project-page__back::before` arrow-prefix rule), untouched since before T10. It hasn't needed special handling in T12's or T10's commits since T12 didn't touch that file; T10 kept it out via a partial-file (`git apply --cached`) stage. Whoever commits it next should do so as its own separate commit.

## Next task candidate

None. `TODO.md` has no incomplete task. One Batch 2 candidate remains: T13 (Text/Link and Secondary button consolidation, added 2026-09-27 from a follow-up live audit) — needs its own `plan-next-task` pass.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/audit/2026-09-27-visual-css-consistency.md` (full findings, ROI, and fix-batch order; F1–F4, T1–T12, H1, and G3 marked resolved; T13 added from the follow-up buttons/links audit)
- `docs/audit/buttons-links-audit/` (screenshots behind the T13 finding)
- `docs/DECISIONS.md` ("Target modern evergreen browsers only; no CSS fallback for `oklch()`", "Reserve all-caps mono for supplementary labels…", "Remove the background gradient wash…", "Record the shipped visual system…" — all 2026-09-27)
- `docs/design/DESIGN.md` (rewritten to match the shipped site)
- `index.html` (Google Fonts request: final Batch 1 set — Inter 400/500, Newsreader 400 roman+italic/600, IBM Plex Mono 400/500)
- `src/styles/tokens.css` (`--color-backdrop`, four `--line-height-*` tokens, three `--measure-*` tokens, comments on `--space-tag-block`/`--space-marker-offset`), `src/styles/global.css` (shared `h2, h3` letter-spacing), `src/styles/patterns.css` (`.section-label-heading`, both `::backdrop` rules, `.tag-list`, `.button--ghost`, `.button--primary`, `.page-lead` and the lightbox now on `--measure-standard`)
- `src/styles/shell.css` (`.site-header__identity` at weight 400; `.site-header__contact` now layout-only, styled via `.button--ghost`)
- `src/pages/HomePage.css` (`.home__hero` on `--measure-wide`; `.home__highlight`/`.home__about` merged onto one shared `--measure-narrow` rule), `src/pages/ExperiencePage.css` (`.experience__entry` on `--measure-wide`, `.experience__earlier-career-header` on `--measure-standard`, bare `2rem` grid-column now `var(--space-4)`), `src/pages/ResumePage.css`, `src/pages/ContactPage.css`, `src/pages/WorkPage.css` (earlier Batch 2 fixes)
- `src/components/ProjectPageLayout.tsx`, `src/pages/WorkPage.tsx`, `src/pages/ExperiencePage.tsx`, `src/pages/CaseStudyPage.tsx`, `src/pages/ExperimentPage.tsx` (`.tag-list` and `.section-label-heading` usages)
- `src/components/PrimaryNavigation.tsx`, `src/pages/ResumePage.tsx`, `src/pages/HomePage.tsx`, `src/components/AnalyticsSettings.tsx` (`.button--ghost`/`.button--primary` usages)
- `TODO.md` ("Batch 2: target-browser policy and oklch() fallback close-out (audit finding T12) — Complete"; "Batch 2: spacing deliberateness review and max-width consolidation (audit finding T10) — Complete"; "Batch 2: button consolidation (audit finding T8) — Complete"; "Batch 2 remainder: mechanical fixes (audit findings T3, T7, T9, T11) — Complete"; "Batch 2 token hygiene: high-ROI quick fixes (audit findings T1, T2, T4, T5, T6) — Complete"; "Remove unused font weights (audit findings F3 and F4) — Complete"; "Font-load correctness (audit findings F1 and F2) — Complete"; "Heading semantics and label casing (audit findings H1 and G3) — Complete"; "Completed developer-directed CSS consistency audit, gradient removal, and design-doc reconciliation")

## Blockers

None.

## Constraints and deferred work

- Batch 1 is fully closed. Batch 2 has twelve of thirteen findings closed (T1–T12); only T13 remains. It needs a plan for extracting a shared `.button--secondary` class and unifying three Text/Link CTAs; `.primary-navigation a`, `.section-nav__link`, and `.project-page__back` are deliberately excluded from that consolidation since they carry active/current-state navigation semantics. The rest of the audit is unbuilt: F5 (Batch 1, Low ROI), spacing normalisation (Batch 3), other heading findings H2–H4 (Batch 4), and remaining generic-pattern items (Batch 5). `docs/audit/2026-09-27-visual-css-consistency.md` has the full list, ranked, in fix-batch order.
- `.experience__earlier-career-header`'s max-width token (T10) currently has no visual effect: the whole "Earlier career" section is commented out in `ExperiencePage.tsx` (pre-existing, unrelated to T10).
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
