---
createdAt: 2026-09-26
updatedAt: 2026-09-26
version: 1.0
status: approved
---

# Experiments Project Pages

**Governing PRD:** `docs/plans/2026-09-26-project-pages-prd.md` (v4, approved).
**Relation to `TODO.md` Task A:** Completes Task A. Case Studies were delivered separately in `docs/plans/2026-09-26-case-studies-project-pages.md`, which deferred Experiments as its own `plan-next-task` cycle "once the shared layout is proven against real content."

## Objective

Reuse the shared `ProjectPageLayout` component for `/projects/<slug>` routes (Atelier Florae, UV Insect Trap) and convert `/projects` into a card-grid index, mirroring the completed Case Studies pattern.

## Scope

**In scope:**

- `/projects/<slug>` routes for both experiments, added via `routes.experiment` and an `experimentPath` helper.
- `ExperimentPage.tsx` using `ProjectPageLayout`, mapping `Project`'s optional fields to named sections in their existing order: Context (when present), Purpose, Problem, What I built, My contribution, Design and engineering decisions, Gallery, What I observed, Reflection. Unknown slugs render `NotFoundPage`.
- Generalizing the former `CaseStudyGallery` into `ProjectGallery`, accepting an optional `intro` prop instead of a hardcoded Alfred-specific caption, so Experiments reuses the same gallery markup and `project-page__visual-*` CSS instead of duplicating it. `CaseStudyPage` now passes its existing caption text explicitly; its rendered output is unchanged.
- Extracting a shared `Visual` type in `src/types/evidence.ts` used by both `CaseStudy` and `Project` (previously duplicated inline object types).
- "Continue exploring": relevant-experience links (none currently set on either experiment) plus a next-experiment link in `projects` array order (Atelier Florae → UV Insect Trap; the last entry has no next link).
- `ExperimentsPage.tsx` rewritten as a card-grid index over `projects`, mirroring `CaseStudiesPage.tsx`; `ExperimentsPage.css` replaced with card-grid styles mirroring `CaseStudiesPage.css` (the prior bespoke narrative/visual-grid styles are now unused).
- `public/sitemap.xml` gains the 2 new URLs; `docs/ARCHITECTURE.md` routing paragraph updated to describe both areas as card-grid indexes over the shared layout.
- `TODO.md` Task A Experiments checklist items marked complete.
- Rewritten `ExperimentsPage.test.tsx` (index) and new `ExperimentPage.test.tsx` (mirroring `CaseStudyPage.test.tsx`); updated `e2e/critical-journeys.spec.ts` for index→page navigation, direct entry, section-nav behaviour, and continuation links.

**Excluded from this task:**

- Lightbox/full-size `<dialog>` gallery view and hero-image sourcing (PRD Task C).
- Any change to the `CaseStudy`/`Project` content shape beyond the shared `Visual` type, the Work chooser, or primary navigation.
- Adding `relatedExperienceSlugs` or `capabilities` content to either experiment.

## Assumptions

- `Project.context`, previously rendered as unheaded lead-in text on the concatenated Experiments page, becomes its own first named "Context" section, since `ProjectPageLayout`'s section nav requires one heading per entry. No wording changes.
- Generalizing the gallery component (rather than duplicating it for Experiments) is the smaller-footprint option consistent with the PRD's "one shared layout" decision; it does not change Case Studies' rendered output.
- Next-project ordering follows the existing `projects` array order, per the Case Studies plan's precedent.
- Neither current experiment has `relatedExperienceSlugs` or `capabilities` set, so "Continue exploring" shows only the next-experiment link for both pages; this reflects existing content, not a gap introduced by this task.

## Risks

- The existing Playwright assertions target `/projects` rendering full narrative content inline (e.g. the "UV Insect Trap" heading and its visuals region visible directly on the index). These are rewritten to match index→page navigation, matching how the Case Studies journeys were restructured. Test-authoring effort, not product risk.
- Scroll-spy `rootMargin` (`-20% / -70%`) was tuned against Case Studies' longest page (~10 sections); Experiments pages are shorter, so behaviour is expected to hold, verified in the browser.

## Completion criteria

- Both experiments are reachable at their own `/projects/<slug>` URL with header, section nav, tags (where present), gallery (where present), and "Continue exploring."
- `/projects` renders as a card grid linking to each experiment page; the existing `/projects` URL still resolves.
- Section nav anchors work without JavaScript and highlight the active section on scroll in a real browser.
- `public/sitemap.xml` lists the 2 new URLs; `docs/ARCHITECTURE.md` reflects both areas as card-grid indexes over the shared layout.
- `TODO.md` Task A Experiments checklist items are marked complete.
- `pnpm validate`, `pnpm build`, and `pnpm test:e2e` pass with no regression to existing Work/Experiments/navigation journeys.

## Implementation sequence

1. Extract the shared `Visual` type; generalize `CaseStudyGallery` into `ProjectGallery` with an `intro` prop; update `CaseStudyPage.tsx` to pass its existing caption text explicitly.
2. Add the `/projects/:slug` route and `experimentPath` helper; wire `ExperimentPage` in the router.
3. Build `ExperimentPage.tsx` on `ProjectPageLayout`.
4. Rewrite `ExperimentsPage.tsx` as a card-grid index; replace `ExperimentsPage.css`.
5. Update `public/sitemap.xml`, `docs/ARCHITECTURE.md`, and `TODO.md`.
6. Rewrite/add Vitest coverage for both pages.
7. Update `e2e/critical-journeys.spec.ts`.
8. Run `pnpm validate`, `pnpm build`, `pnpm test:e2e`.

## Validation

- `pnpm validate` (TypeScript, Biome, Vitest + axe component tests).
- `pnpm build`.
- `pnpm test:e2e` (Playwright/Chromium), including direct-entry, anchor-navigation, and card-grid index checks for Experiments.
- Manual keyboard and 320px-width spot check of one experiment page's section nav.
