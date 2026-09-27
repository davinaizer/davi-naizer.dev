---
createdAt: 2026-08-10
updatedAt: 2026-09-27
version: 1.73
status: active
---

# Handoff

## Completed outcome

The 2026-09-27 CSS consistency audit's Batch 2 high-ROI token-hygiene findings (T1, T2, T4, T5, T6) are complete, delivered with same-scope `PASS`. Mono/caption labels (`.home__actions a`, `.home__role-date`, `.home a`, `.resume__metadata`) now share one line-height; `.experience__summary` uses type-scale tokens instead of a hardcoded 17px/1.55; all six 24px-serif-heading locations (Home ×2, Experience ×2, Work card, Contact) now share one letter-spacing via a new shared `h2, h3` rule in `global.css`, with `.contact__title` (a `<span>`) getting the same tracking directly and `.section-label-heading` (a differently-styled `<h2>` used in four places) explicitly excluded from it; both dialog `::backdrop` rules now use one new `--color-backdrop` token; `.resume__metadata` renders uppercase like other mono labels. No markup changed. This follows Batch 1 (F1–F4, fully closed) and, before that, the audit's Batch 0 decisions (X1–X6) and H1/G3 heading/label findings.

## Next task candidate

None. `TODO.md` has no incomplete task. The audit's remaining unbuilt findings (below) are the most likely source of the next task; the developer should choose which one via `plan-next-task`.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/audit/2026-09-27-visual-css-consistency.md` (full findings, ROI, and fix-batch order; F1–F4, T1/T2/T4/T5/T6, H1, and G3 marked resolved)
- `docs/DECISIONS.md` ("Reserve all-caps mono for supplementary labels…", "Remove the background gradient wash…", "Record the shipped visual system…" — all 2026-09-27)
- `docs/design/DESIGN.md` (rewritten to match the shipped site)
- `index.html` (Google Fonts request: final Batch 1 set — Inter 400/500, Newsreader 400 roman+italic/600, IBM Plex Mono 400/500)
- `src/styles/tokens.css` (`--color-backdrop`), `src/styles/global.css` (shared `h2, h3` letter-spacing), `src/styles/patterns.css` (`.section-label-heading`, both `::backdrop` rules)
- `src/styles/shell.css` (`.site-header__identity` at weight 400)
- `src/pages/HomePage.css`, `src/pages/ResumePage.css`, `src/pages/ExperiencePage.css`, `src/pages/ContactPage.css` (Batch 2 fixes)
- `src/components/ProjectPageLayout.tsx`, `src/pages/WorkPage.tsx`, `src/pages/CaseStudyPage.tsx`, `src/pages/ExperimentPage.tsx` (`.section-label-heading` usages)
- `TODO.md` ("Batch 2 token hygiene: high-ROI quick fixes (audit findings T1, T2, T4, T5, T6) — Complete"; "Remove unused font weights (audit findings F3 and F4) — Complete"; "Font-load correctness (audit findings F1 and F2) — Complete"; "Heading semantics and label casing (audit findings H1 and G3) — Complete"; "Completed developer-directed CSS consistency audit, gradient removal, and design-doc reconciliation")

## Blockers

None.

## Constraints and deferred work

- Batch 1 is fully closed. Batch 2 has five High-ROI findings closed (T1, T2, T4, T5, T6); the rest of the audit is unbuilt: F5 (Batch 1, Low ROI), T3/T7–T12 (Batch 2 — T3 needs new line-height token names, T7/T8 need component-level refactors and T8 a hover-style decision, T9–T12 are Low ROI or need a browser-support decision), spacing normalisation (Batch 3), other heading findings H2–H4 (Batch 4), and remaining generic-pattern items (Batch 5). `docs/audit/2026-09-27-visual-css-consistency.md` has the full list, ranked, in fix-batch order.
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
