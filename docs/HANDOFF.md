---
createdAt: 2026-08-10
updatedAt: 2026-09-26
version: 1.62
status: active
---

# Handoff

## Completed outcome

Case Studies project pages are complete and received a same-scope `PASS`: `/case-studies/<slug>` routes on a shared `ProjectPageLayout` component (section nav with scroll-spy, tags strip, body sections, "Continue exploring"), and `/case-studies` converted to a card-grid index. Experiments (`/projects`) was deliberately excluded from this task and remains on the original single-page layout.

## Next task candidate

A. Project pages and area indexes — Experiments (reuse `ProjectPageLayout` for `/projects/<slug>` routes and convert `/projects` into a card-grid index, following the Case Studies pattern).

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution.
- **Workflow stage:** Case Studies project pages are complete; begin `plan-next-task` for the Experiments project-pages task.

## Evidence pointers

- `TODO.md` (Task A, Experiments sub-section; Task B is satisfied for Case Studies and carries to Experiments automatically via the shared component; Task C remains open)
- `docs/plans/2026-09-26-project-pages-prd.md` (governing PRD)
- `docs/plans/2026-09-26-case-studies-project-pages.md` (completed task plan, including the decision to split by area)
- `docs/ARCHITECTURE.md` (routing section)
- `src/components/ProjectPageLayout.tsx`
- `src/pages/CaseStudyPage.tsx`
- `src/pages/CaseStudiesPage.tsx`
- `src/pages/ExperimentsPage.tsx` (not yet migrated)
- `public/sitemap.xml`

## Blockers

None.

## Constraints and deferred work

- Hero image sourcing and the gallery lightbox remain deferred to PRD Task C for both areas.
- Project-page prototypes were built without repository access; use them for interaction patterns only.
- Scroll-spy `rootMargin` was tuned against Case Studies' longest page (Alfred, ~10 sections); re-check against Experiments' longest page once it exists.
