---
createdAt: 2026-08-10
updatedAt: 2026-09-26
version: 1.66
status: active
---

# Handoff

## Completed outcome

The hero image lazy-loading fix is complete and received a same-scope `PASS`: the hero `<img>` in `ProjectPageLayout.tsx` (UV Insect Trap, the only current hero) now uses `loading="eager"` and `fetchPriority="high"` instead of `loading="lazy"`, resolving the non-blocking LCP-timing nicety noted at the "Gallery and lightbox" review. This closes the small deferred-work item left after "Project pages within Case Studies and Experiments" completed.

## Next task candidate

D. Work card index and `/work/<slug>` routing

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/DECISIONS.md` (“Adopt the flattened Work index (Option A)…” — 2026-09-26)
- `docs/evidence/2026-09-26-option-a-prototypes/`
- `TODO.md` ("Completed hero image lazy-loading fix")
- `src/components/ProjectPageLayout.tsx` (hero `<img>` attributes)
- `src/pages/ExperimentPage.test.tsx` (hero attribute assertions)

## Blockers

None.

## Constraints and deferred work

- Hero classification: only UV Insect Trap has a hero (a real finished-result photo distinct from its gallery). Revisit only if a future case study or experiment gains a comparable finished-result image.
- Non-blocking, pre-existing repository note: the composite `pnpm validate` script fails on `.claude/settings.local.json` formatting, a file gitignored via the developer's global gitignore and unrelated to any tracked task. Scoped checks (`pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`) are unaffected. Revisit only if this recurs and warrants a Biome ignore-rule task.
