---
createdAt: 2026-09-28
updatedAt: 2026-09-28
version: 1.0
status: complete
---

# Make page and e2e tests independent of which projects are published

Developer-directed fix. Approved 2026-09-28 (e2e option A). Follow-up to `docs/plans/2026-09-28-publish-flag.md`. Milestone 5.

## Objective

Page and e2e tests verify behaviour, not which real entries are published. Only the sitemap test stays tied to content status, because the sitemap must match it.

## Evidence

After `2656165` unpublished four of six projects, six unit tests failed and `public/sitemap.xml` was stale. The page tests import the filtered lists and hard-code slugs (`atelier-florae`, `alfred-what-to-do-next`) and positions (`projects[1]`, `caseStudies[1]`). `e2e/critical-journeys.spec.ts` navigates to unpublished entries.

## Scope

1. Shared synthetic fixtures in `src/test/` (published and unpublished entries) and a `vi.mock` of `evidence-content.ts` that applies the real `onlyPublished` to them; rewrite the `CaseStudyPage`, `ExperimentPage`, `WorkProjectPage` and `unpublished-content` tests on them.
2. Remove the four unpublished URLs from `public/sitemap.xml`.
3. e2e (option A): derive targets from the content module's published set; a journey with no matching published entry is skipped with a stated reason.

## Exclusions

No production or page-component changes, no new test tooling, no change to which entries are published, no snapshot tests.

## Completion criteria

1. No unit test names a real project slug or title, or indexes the real lists by position, apart from the sitemap test.
2. Flipping any `published` value leaves `pnpm test` green except the sitemap test, which goes red only while the sitemap is stale.
3. `pnpm test:e2e` is green with the current flags and with one different entry unpublished.
4. `sitemap.xml` lists exactly the published projects plus the site pages.
5. Typecheck, check, unit tests and build pass; docs stay accurate.
