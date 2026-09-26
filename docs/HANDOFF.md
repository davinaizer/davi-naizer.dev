---
createdAt: 2026-08-10
updatedAt: 2026-09-27
version: 1.68
status: active
---

# Handoff

## Completed outcome

The project-page visual alignment task is complete and received a same-scope `PASS`: project pages at `/work/<slug>` now follow the Option A prototype treatment. The empty band above the tags is gone; the section nav has an "On this page" label, sentence-case links, and a left accent bar on the active item; section headings are small uppercase mono labels; the summary is italic serif; and the back link is not underlined. The nav is named through `aria-labelledby` ("On this page"), replacing the former "Sections" name.

## Next task candidate

F. Experience page section navigation

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/plans/2026-09-26-project-page-visual-alignment.md` (approved plan)
- `docs/DECISIONS.md` (“Adopt the flattened Work index (Option A)…” — 2026-09-26)
- `docs/evidence/2026-09-26-option-a-prototypes/`
- `TODO.md` ("E. Project-page visual alignment — Complete")
- `src/components/ProjectPageLayout.tsx`, `src/styles/patterns.css` (`.project-page__*`)

## Blockers

None.

## Constraints and deferred work

- Section-nav highlight can go stale: the scroll-spy in `ProjectPageLayout.tsx` only updates when a section crosses its 20–30% viewport band, so scrolling back to the top of a page leaves the last-read section highlighted, and jumping to a short late section (for example Reflection) can highlight the next one. Pre-existing and non-blocking; consider handling it when the hook is extracted for Experience (Task F).
- The nav's accessible name is now "On this page"; Task F reuses it. Unit tests assert the name only, and `aria-current` is covered by e2e; add a unit test for the label and `aria-current` when the nav becomes a shared component if useful.
- No redirects: restore them only if evidence shows traffic arriving at the retired `/case-studies` or `/projects` URLs (review trigger in `docs/DECISIONS.md`).
- Task D review improvements, non-blocking: `CaseStudyPage` and `ExperimentPage` keep an unreachable not-found fallback now that `WorkProjectPage` resolves slugs; the Work card e2e test does not assert the `::after` focus ring; the "does not duplicate list separators" e2e test loops over a single path.
- Work card image panels use one accent tint and repeat the project title; add real card images or per-project tints only when projects gain distinct result images.
- Hero classification: only UV Insect Trap has a hero (a real finished-result photo distinct from its gallery). Revisit only if a future case study or experiment gains a comparable finished-result image.
- Non-blocking, pre-existing repository note: the composite `pnpm validate` script fails on `.claude/settings.local.json` formatting, a file gitignored via the developer's global gitignore and unrelated to any tracked task. Scoped checks (`pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`) are unaffected. Revisit only if this recurs and warrants a Biome ignore-rule task.
