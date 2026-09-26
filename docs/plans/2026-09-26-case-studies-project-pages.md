---
createdAt: 2026-09-26
updatedAt: 2026-09-26
version: 1.0
status: approved
---

# Case Studies Project Pages

**Governing PRD:** `docs/plans/2026-09-26-project-pages-prd.md` (v4, approved).
**Relation to `TODO.md` Task A:** This task delivers Task A scoped to Case Studies only. Experiments (`/projects/<slug>` and its index) is a deliberately separate follow-up task, per the PRD's stated rollout ("deliver Case Studies first with the shared layout, then Experiments as a follow-up task").

## Objective

Give each Case Study a directly linkable, consistently structured page built on a new shared project-page layout, and convert `/case-studies` into a card-grid index linking to those pages.

## Material decision: split Task A by area

`TODO.md` Task A bundles routes, a shared layout, and index conversion for both Case Studies (4 entries) and Experiments (2 entries) in one task. That surface area — a new shared layout component, section-nav scroll-spy, 4 new routes, an index rewrite, sitemap, and `docs/ARCHITECTURE.md` — is too large for one reviewable change.

**Decision:** scope this task to Case Studies only. Experiments follows as its own `plan-next-task` cycle once the shared layout is proven against real content.

## Scope

**In scope:**

- New shared project-page layout component rendering, top to bottom: back link, eyebrow, title, summary; section nav (inline on mobile, sticky right rail ≥56rem); technologies/tags strip; hero (omitted — no case study currently has a distinct result image separate from its gallery); body sections (Context, Problem, Role, Constraints, Decisions, Product/UX, Engineering — with `CaseStudyGallery` where visuals exist, Outcomes, Reflection); "Continue exploring" (relevant experience links + next case study in area).
- Section index with `IntersectionObserver` scroll-spy; anchor links work without JavaScript.
- Routes: `/case-studies/<slug>` for all 4 existing case studies (`alfred-what-to-do-next`, `signal-vessel-list-template-administration`, `promotional-content-production-workflow`, `hsbc-learning-portal-and-assessment-tools`).
- Convert `/case-studies` into a card-grid index linking to each page; the `/case-studies` URL itself keeps working (no redirect).
- Add the 4 new URLs to `public/sitemap.xml`.
- Update `docs/ARCHITECTURE.md` routing description for the new per-case-study routes and shared layout.
- Focused Vitest coverage for the new layout/index; Playwright coverage for direct entry to a case-study URL, anchor-based section navigation, and continued passing of the existing `/case-studies` journeys in `e2e/critical-journeys.spec.ts`.

**Excluded from this task:**

- Experiments (`/projects/<slug>`) routes and index conversion.
- Lightbox/full-size `<dialog>` gallery view (PRD Task C).
- Hero image sourcing review (PRD Task C) — no case study renders a hero in this task.
- Any change to `CaseStudy`/`Project` types, the Work chooser, or primary navigation.

## Assumptions

- No case study currently has a distinct "finished result" hero image separate from its gallery visuals (confirmed against `src/content/evidence-content.ts`), so no hero renders in this task.
- "Next project in area, content-array order" does not wrap: the last case study shows no "next" link.

## Risks

- Scroll-spy `rootMargin` (PRD starting point `-20% / -70%`) needs tuning against the longest case study (Alfred, ~10 sections). Treated as implementation-time tuning, not a blocker.

## Completion criteria

- Each of the 4 case studies is reachable at its own `/case-studies/<slug>` URL with header, section nav, tags, body sections, gallery (where present), and "Continue exploring."
- `/case-studies` renders as a card grid linking to each page; the existing `/case-studies` URL still resolves.
- Section nav anchors work with JavaScript disabled and highlight the active section on scroll in a real browser.
- `public/sitemap.xml` lists the 4 new URLs; `docs/ARCHITECTURE.md` reflects the new routes and shared layout.
- `pnpm validate`, `pnpm build`, and `pnpm test:e2e` pass with no regression to existing Work/Case Studies/navigation journeys.

## Implementation sequence

1. Add the per-case-study route to `src/app/routes.ts` and wire it in `src/app/router.tsx`.
2. Build the shared project-page layout component, reusing `CaseStudyGallery` and `ContextualContinuation`, with section nav and scroll-spy.
3. Add a case-study page route component using the layout; unknown slugs fall through to the existing `NotFoundPage` behaviour.
4. Rewrite `CaseStudiesPage` as a card-grid index over `caseStudies`.
5. Update `public/sitemap.xml` and `docs/ARCHITECTURE.md`.
6. Add/update Vitest coverage and Playwright coverage in `e2e/critical-journeys.spec.ts`.
7. Run `pnpm validate`, `pnpm build`, `pnpm test:e2e`.

## Validation

- `pnpm validate` (TypeScript, Biome, Vitest + axe component tests).
- `pnpm build`.
- `pnpm test:e2e` (Playwright/Chromium), including new direct-entry and anchor-navigation checks.
- Manual keyboard and 320px-width spot check of one case-study page's section nav.
