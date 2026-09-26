---
createdAt: 2026-08-10
updatedAt: 2026-09-26
version: 1.63
status: active
---

# Handoff

## Completed outcome

Task A ("Project pages and area indexes") is complete for both evidence areas and received a same-scope `PASS`: `/case-studies/<slug>` and `/projects/<slug>` routes on a shared `ProjectPageLayout` component (section nav with scroll-spy, tags strip, body sections, "Continue exploring"), with `/case-studies` and `/projects` both converted to card-grid indexes. The gallery component was generalized (`ProjectGallery`, replacing `CaseStudyGallery`) and a shared `Visual` type was extracted to support both content types without merging them.

## Next task candidate

C. Gallery and lightbox — normalise gallery images per kind (`4:3` landscape, `1:2` portrait) with thumbnails as buttons, add a full-size `<dialog>` view with caption (Escape/click-outside close, focus contained and returned), and complete the per-project hero image review.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution.
- **Workflow stage:** Task A (both areas) is complete; begin `plan-next-task` for PRD Task C.

## Evidence pointers

- `TODO.md` (Task C, under "Project pages within Case Studies and Experiments")
- `docs/plans/2026-09-26-project-pages-prd.md` (governing PRD)
- `docs/plans/2026-09-26-case-studies-project-pages.md` and `docs/plans/2026-09-26-experiments-project-pages.md` (completed task plans)
- `docs/ARCHITECTURE.md` (routing and styling sections)
- `src/components/ProjectPageLayout.tsx`
- `src/components/ProjectGallery.tsx`
- `src/pages/CaseStudyPage.tsx`, `src/pages/CaseStudiesPage.tsx`
- `src/pages/ExperimentPage.tsx`, `src/pages/ExperimentsPage.tsx`
- `public/sitemap.xml`

## Blockers

None.

## Constraints and deferred work

- Hero image sourcing and the gallery lightbox remain deferred to PRD Task C for both areas; no project currently renders a hero.
- Project-page prototypes were built without repository access; use them for interaction patterns only.
- Scroll-spy `rootMargin` was tuned against Case Studies' longest page (Alfred, ~10 sections); Experiments pages are shorter and have not needed re-tuning.
