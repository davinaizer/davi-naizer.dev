---
createdAt: 2026-09-28
updatedAt: 2026-09-28
version: 1.0
status: complete
---

# Add a publish flag for Case Studies and Experiments

Developer-directed. Approved 2026-09-28. Supports PRODUCT_REQUIREMENTS honest, evidence-backed content. Milestone 5.

## Objective

Each Case Study or Experiment has an explicit `published` flag. Unpublished entries appear nowhere on the site, and their URLs render the not-found page. This lets the developer deploy only reviewed content while the rest is still under review.

## Evidence

- `caseStudies` (4) and `projects` (2, the Experiments) in `src/content/evidence-content.ts` are the only content sources. `WorkPage`, `WorkProjectPage`, `CaseStudyPage` and `ExperimentPage` all import them.
- Next-entry links are computed from array position, so they skip unpublished entries if the exported arrays are already filtered.
- No claim in `professional-content.ts` references a project.
- `public/sitemap.xml` is static and lists every project.

## Decision (approved)

Filter once in the content module. The full lists stay private and the exported `caseStudies` and `projects` contain only published entries, so consumers are unchanged. Rejected: filtering inside each page, which duplicates the rule in four places.

`published` is required on `EvidenceBase`, so every new entry needs an explicit choice.

Initial state: all six entries are `published: true` (developer confirmed all are ready).

## Scope

- Add `published: boolean` to `EvidenceBase` in `src/types/evidence.ts`.
- In `evidence-content.ts`, rename the raw arrays to private names, set the flag on all six entries, and export the filtered arrays. The filter is a small pure helper so tests can exercise it with fixtures.
- Hide an empty section on `WorkPage`.
- Keep `public/sitemap.xml` in step, guarded by a unit test.
- Record the decision in `docs/DECISIONS.md` with a review trigger, and add a one-line note to `docs/ARCHITECTURE.md`.

## Exclusions

No env vars or build-time flags, no preview or draft mode, no CMS, no routing, styling or page-component changes, no sitemap generation script.

## Risks

- If every Experiment is unpublished, Home's "Beyond the work" link to `#experiments` targets a hidden section. Left as is unless the chosen flags can produce this state; flag it in review if so.
- The sitemap stays hand-edited; the unit test is what keeps it honest.

## Completion criteria

1. An unpublished project's card is absent from `/work` (unit test on the filter and `WorkPage`).
2. Its `/work/<slug>` renders the not-found page (`WorkProjectPage` test).
3. Next-entry navigation skips unpublished entries.
4. The sitemap matches the published slugs exactly (unit test).
5. An empty section is not rendered on `/work` (test).
6. Typecheck, lint, unit tests and build pass. E2e runs only if the published set changes.
7. `DECISIONS.md` and `ARCHITECTURE.md` are updated.

## Implementation sequence

1. Add the `published` field to the type.
2. Rework `evidence-content.ts` (private raw arrays, flags, filter helper, filtered exports).
3. Add the empty-section guard in `WorkPage.tsx`.
4. Add tests: filter, not-found, empty section, sitemap match.
5. Confirm `sitemap.xml` matches the published set (currently all six, so no change expected).
6. Update `DECISIONS.md` and `ARCHITECTURE.md`.
7. Validate, then hand off to `review-task`.

## Validation

`pnpm` typecheck, lint, unit tests and build. Manual `pnpm dev` check with one project temporarily unpublished: `/work`, its direct URL, and the previous entry's next link. Restore the flag afterwards.
