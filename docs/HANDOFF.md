---
createdAt: 2026-08-10
updatedAt: 2026-09-26
version: 1.67
status: active
---

# Handoff

## Completed outcome

The Work card index and `/work/<slug>` routing task is complete and received a same-scope `PASS`: `/work` is the single card index (Case Studies then Experiments, shared card treatment with a typographic image panel), every project page is served at `/work/<slug>` through `WorkProjectPage`, and the old `/case-studies` and `/projects` routes are removed without redirects, so those URLs render the not-found page.

## Next task candidate

E. Project-page visual alignment

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/plans/2026-09-26-work-index-routing.md` (approved plan and no-redirects amendment)
- `docs/DECISIONS.md` (“Adopt the flattened Work index (Option A)…” — 2026-09-26, updated for no redirects)
- `docs/evidence/2026-09-26-option-a-prototypes/`
- `TODO.md` ("D. Work card index and `/work/<slug>` routing — Complete")
- `src/pages/WorkPage.tsx`, `src/pages/WorkProjectPage.tsx`, `src/app/routes.ts`

## Blockers

None.

## Constraints and deferred work

- No redirects: restore them only if evidence shows traffic arriving at the retired `/case-studies` or `/projects` URLs (review trigger in `docs/DECISIONS.md`).
- Review improvements, non-blocking: `CaseStudyPage` and `ExperimentPage` keep an unreachable not-found fallback now that `WorkProjectPage` resolves slugs; the Work card e2e test does not assert the `::after` focus ring; the "does not duplicate list separators" e2e test loops over a single path.
- Work card image panels use one accent tint and repeat the project title; add real card images or per-project tints only when projects gain distinct result images.
- Hero classification: only UV Insect Trap has a hero (a real finished-result photo distinct from its gallery). Revisit only if a future case study or experiment gains a comparable finished-result image.
- Non-blocking, pre-existing repository note: the composite `pnpm validate` script fails on `.claude/settings.local.json` formatting, a file gitignored via the developer's global gitignore and unrelated to any tracked task. Scoped checks (`pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`) are unaffected. Revisit only if this recurs and warrants a Biome ignore-rule task.
