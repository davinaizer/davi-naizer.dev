---
createdAt: 2026-09-26
updatedAt: 2026-09-26
version: 1.1
status: approved
---

# Work Card Index and `/work/<slug>` Routing

**Governing decision:** `docs/DECISIONS.md`, "Adopt the flattened Work index (Option A) with project pages under `/work` — 2026-09-26."
**Visual reference:** `docs/evidence/2026-09-26-option-a-prototypes/`.
**Relation to `TODO.md`:** Implements "D. Work card index and `/work/<slug>` routing" under "Apply Option A: Work index and prototype visuals."

## Objective

Make `/work` the single card index for all project evidence, serve every project page at `/work/<slug>`, and remove the old `/case-studies` and `/projects` URLs without redirects. This supports `PRODUCT_REQUIREMENTS.md` 4.1 (job applications) by reaching any project from `/work` in one step.

## Current evidence

- `/work` is a two-link chooser (`WorkPage.tsx`); `/case-studies` and `/projects` are separate card-grid indexes with their own page components, CSS and tests.
- Project pages are at `/case-studies/:slug` and `/projects/:slug` (`router.tsx`, `routes.ts`).
- Old paths are referenced in `HomePage.tsx`, `public/sitemap.xml`, `docs/ARCHITECTURE.md` (routes paragraph), unit tests, and about 20 cases in `e2e/critical-journeys.spec.ts`.
- Only UV Insect Trap has a real hero image; the other five projects have no result image.

## Decision recorded

**Card image area for projects without a real image: Option A.** Every card shows the same typographic panel containing the project name, as in the prototype. It is not a stock or placeholder photograph, so it satisfies the decision's constraint. UV Insect Trap's hero photo is not reused on its card. Real card images are deferred until more projects have distinct result images. Rejected: real image where a hero exists with a panel otherwise (inconsistent cards, extra conditional and crop concern); dropping the image area (departs from the prototype).

## Amendment (2026-09-26)

The developer directed that no redirects are needed because the site had just been published; the not-found page is sufficient for the retired URLs. `public/_redirects`, its unit test, and the preview-deployment redirect verification were removed from scope. `docs/DECISIONS.md` and `TODO.md` were updated to match.

## Scope

**In scope**

- `/work` shows the page lead, then a Case Studies section and an Experiments section, each with a short intro and a two-column card grid (one column on narrow screens), the same card treatment in both. Each section heading has an anchor id (`case-studies`, `experiments`).
- Card anatomy: `16:10` typographic panel with the project name, area eyebrow, non-underlined serif title, one-line summary, and tags. The whole card is one link with a visible focus state and an accent border on hover and focus.
- One `/work/:slug` route with a small resolver that looks the slug up in case studies, then projects, and otherwise renders the existing not-found page. `CaseStudyPage` and `ExperimentPage` remain separate over the shared `ProjectPageLayout`, because the content types stay separate.
- Back link goes to `/work#case-studies` or `/work#experiments`. The next-project link stays within the same section, in content order.
- Remove the `/case-studies` and `/projects` index routes, pages, CSS and tests, and update the `src/index.css` manifest. Replace the old route constants and path helpers with `/work/:slug` equivalents.
- Update Home's experiments link to `/work#experiments`, `public/sitemap.xml`, and the `docs/ARCHITECTURE.md` routes paragraph.
- Add a test that slugs are unique across both content types.
- Update and add unit and e2e coverage.

**Excluded**

- Project-page visual changes (empty band, section-nav style, headings, summary treatment): task E.
- Experience page section navigation: task F.
- New content or images, and any change to the `CaseStudy` or `Project` types.
- Changes to the Continue exploring links beyond their targets.
- New dependencies and analytics changes.

## Assumptions, risks, blockers

- Confirm `ScrollRestoration` scrolls to `/work#experiments` on direct entry and on back-link navigation.
- `NavLink` prefix matching keeps Work active on project pages; this is expected.
- No blockers.

## Completion criteria

| Outcome | Evidence |
|---|---|
| `/work` shows both sections with the shared card treatment, two columns wide and one column at 320 px | Component test; e2e; desktop and 320 px comparison against the prototype screenshots |
| Each card is a single link with an accessible name, a visible focus state and an accent hover border | Component test with axe; keyboard e2e |
| Each project opens at `/work/<slug>`; back and next links stay within the same section | e2e for one case study and one experiment |
| Slugs are unique across both content types | Unit test |
| `/case-studies` and `/projects` (and their project paths) are no longer routes and render the not-found page | e2e removed-routes test |
| Home, sitemap and `docs/ARCHITECTURE.md` no longer reference the old paths | Search plus updated tests |

## Implementation sequence

1. Routes: replace the four old route constants with `/work/:slug` and its path helper; add the resolver route; delete the old index routes.
2. Build the Work index and card in `WorkPage`, moving styles into `WorkPage.css`. Delete `CaseStudiesPage` and `ExperimentsPage` with their CSS and tests, and update the `src/index.css` manifest.
3. Point the case-study and experiment back links and next links at `/work` paths.
4. Update the sitemap, Home link and `docs/ARCHITECTURE.md`.
5. Update unit and e2e tests to the new URLs; add the slug-uniqueness test.

## Validation

- `pnpm validate`, `pnpm build`, `pnpm test:e2e`.
- Manual desktop and 320 px comparison against the prototype screenshots.
