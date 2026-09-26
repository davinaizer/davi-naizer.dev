---
createdAt: 2026-08-10
updatedAt: 2026-09-27
version: 1.69
status: active
---

# Handoff

## Completed outcome

The Experience page section navigation task is complete and received a same-scope `PASS`: `/experience` now has an "On this page" nav (sticky right rail above `56rem`, inline and wrapping below) with one link per role, labelled `Company · years`, targeting the existing entry ids. The nav and its scroll-spy were extracted into a shared `SectionNav` component that project pages also use, with no change to their behaviour. As a developer-directed amendment, each Experience entry now shows Technologies above its summary in a single-column layout.

## Next task candidate

None. `TODO.md` has no incomplete task; the Option A sequence (D, E, F) is complete.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/plans/2026-09-27-experience-section-nav.md` (approved plan)
- `src/components/SectionNav.tsx`, `src/components/ProjectPageLayout.tsx`, `src/pages/ExperiencePage.tsx`
- `src/styles/patterns.css` (`.section-layout*`, `.section-nav*`), `src/pages/ExperiencePage.css`
- `TODO.md` ("F. Experience page section navigation — Complete")
- `docs/DECISIONS.md` (“Adopt the flattened Work index (Option A)…” — 2026-09-26)

## Blockers

None.

## Constraints and deferred work

- Section-nav highlight can go stale (deliberately deferred in Task F): the scroll-spy in `SectionNav.tsx` only updates when a section crosses its 20–30% viewport band, so scrolling back to the top of a page leaves the last-read section highlighted, and jumping to a short late section (for example Reflection) can highlight the next one. Affects project pages and Experience; non-blocking.
- Two Experience nav labels wrap in the desktop rail ("Independent Product Project · 2025–Present", "Gamesys / Bally's Interactive · 2020–2022"); readable, revisit only if tighter labels are wanted.
- No redirects: restore them only if evidence shows traffic arriving at the retired `/case-studies` or `/projects` URLs (review trigger in `docs/DECISIONS.md`).
- Task D review improvements, non-blocking: `CaseStudyPage` and `ExperimentPage` keep an unreachable not-found fallback now that `WorkProjectPage` resolves slugs; the Work card e2e test does not assert the `::after` focus ring; the "does not duplicate list separators" e2e test loops over a single path.
- Work card image panels use one accent tint and repeat the project title; add real card images or per-project tints only when projects gain distinct result images.
- Hero classification: only UV Insect Trap has a hero (a real finished-result photo distinct from its gallery). Revisit only if a future case study or experiment gains a comparable finished-result image.
- Non-blocking, pre-existing repository note: the composite `pnpm validate` script fails on `.claude/settings.local.json` formatting, a file gitignored via the developer's global gitignore and unrelated to any tracked task. Scoped checks (`pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`) are unaffected. Revisit only if this recurs and warrants a Biome ignore-rule task.
