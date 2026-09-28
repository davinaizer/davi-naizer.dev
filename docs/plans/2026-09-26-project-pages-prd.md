---
createdAt: 2026-09-26
updatedAt: 2026-09-26
version: 4.1
status: approved
---

# PRD: Project pages within Case Studies and Experiments

**Status:** Implemented. Tasks A, B, and C are complete and reviewed with `PASS`; see `docs/plans/2026-09-26-case-studies-project-pages.md`, `docs/plans/2026-09-26-experiments-project-pages.md`, and `docs/plans/2026-09-26-gallery-lightbox.md`.
**Governing decision:** `docs/DECISIONS.md` — "Do not merge Case Studies and Experiments; revamp project-page UX within the two areas" (2026-09-26).
**Scope:** Area index pages (`/case-studies`, `/projects`), individual project pages, and the shared project-page layout.

## Prototypes

- Project-page nav and gallery pattern (v1): https://claude.ai/artifact/9doMHjNo3uhyftgHuTJBMZ
- Card grid (originally the Work index; now the reference for each area index): https://claude.ai/artifact/2bNx1TMrhgngSZJjrGCcZS
- Project page, current (v2, Alfred): https://claude.ai/artifact/N6aqLrnmkhFSzadnLKYG2r

The prototypes were built without repository access. They validate interaction patterns, not routes, slugs, or breakpoints.

## Problem

Observed on the live site:

- `/case-studies` and `/projects` each render every project's full content on one page. There is no page for a single project and no scannable list of projects.
- Within a project, the content is a single long scroll with no anchors. Build images appear late, as a small row with inconsistent aspect ratios.
- The Work chooser shows category blurbs without project previews. Not addressed here: the 2026-09-25 decision keeps the chooser until visitor evidence shows it is unclear.

## Goals

1. From an area index, reach a single project through a page that shows real project previews.
2. Every project, case study or experiment, uses the same page layout, so a reader who has seen one knows what to expect from the next.
3. Keep the professional versus independent distinction structural, carried by the two areas.
4. Let a reader jump to any section of a project page without scrolling.
5. Present build and process images as a consistent, inspectable set, and show the finished result before the narrative when a real result image exists.

## Decisions

### Site structure: two areas kept

- `/work` remains the chooser. Primary navigation is unchanged.
- `/case-studies` holds professional evidence. `/projects` remains the stable public URL for Experiments.
- No merge of the two areas and no flattening into a single Work index.

### Area index pages

- `/case-studies` and `/projects` become card-grid indexes. Each card links to one project page.
- Case Studies and Experiments use the same card treatment. Experiments are not visually demoted.

### Routing

- Project pages live under their area, using the existing slugs: `/case-studies/<slug>` and `/projects/<slug>`.
- Examples: `/case-studies/alfred-what-to-do-next`, `/projects/atelier-florae`.
- Existing index URLs keep working, so no redirects are needed. The sitemap gains one entry per project page.
- Exact route wiring is confirmed in the task plan.

### Content model

- One shared project-page layout component renders the sections of either content type.
- `CaseStudy` (fixed fields) and `Project` (optional sections) remain separate types. Merging them requires a demonstrated need.
- Role remains its own named section, because it carries the personal versus team contribution boundary.
- Constraints remain their own named section. Folding them into Problem would change the 2026-08-31 explicit-fields decision and requires a new entry in `docs/DECISIONS.md` first.

### Project-page layout (same for both areas)

**Section index**

- Desktop: sticky right rail. Mobile: the same link list renders inline and wraps, below the title and above the hero image.
- The rail contains only the section nav, with the same shape for every project.
- One entry per existing subheading. The active entry follows scroll position via `IntersectionObserver`. Anchor links work without JavaScript.

**Content order, top to bottom**

1. Back link to the area index, eyebrow (area label), title, summary.
2. Section nav (inline on mobile only).
3. Technologies and tags strip.
4. Hero image showing the finished result, `16:9`, `object-fit: cover`. Omitted when the project has no real result image. No stock, placeholder, or generic images.
5. Body sections following the existing content fields.
6. Gallery with a consistent aspect ratio per image kind: `4:3` for landscape product and build photos, `1:2` for portrait app screenshots. Uniform border; hover and focus show the accent border.
7. "Continue exploring": related Experience links and a next-project link.

**Next project:** the next entry in the same area, in content-array order. Navigation does not cross between areas.

### Lightbox

- Gallery thumbnails are real `<button>` elements. Click, Enter, or Space opens a full-size view with caption.
- Closes with the close button, a click outside, or Escape.
- Focus stays inside the lightbox while open and returns to the triggering thumbnail on close.
- Implementation suggestion: the native `<dialog>` element with `showModal()` provides Escape handling and focus containment with less custom code.

### Breakpoint

- The desktop/mobile switch uses the existing `56rem` (896px) breakpoint. No new breakpoint value is added.

### Rejected: flattened navigation and `/work/<slug>` routing (v2 Option A)

Rejected by the 2026-09-26 decision. With UV Insect Trap and Atelier Florae added as experiments, the two-area distinction carries more weight, and the observed problem is presentation within each area. Flattening would also break the `/case-studies` and `/projects` URLs already shared. Revisit only under the 2026-09-25 review triggers.

## Deferred and remaining work

- **Scroll-spy threshold:** `rootMargin` of `-20% / -70%` was chosen against a 5–8 anchor page. Tune against real, longer pages during implementation.
- **Hero image sourcing:** a per-project content pass to identify which projects have a result image distinct from their gallery set. Projects without one render without a hero.

## Non-goals

- Merging Case Studies and Experiments, or flattening them into one Work index.
- Changing the Work chooser or primary navigation.
- A masonry or carousel gallery. Two or three images per section do not justify it.
- Image CDN or optimisation work beyond the existing build and lazy loading.
- Merging the `CaseStudy` and `Project` content types.
- Restructuring project content beyond the layout described above.

## Non-functional

- Built as React components in the existing app. No new dependencies.
- No new design tokens; everything maps to existing `tokens.css` variables.
- Breakpoints come from the existing scale.
- Route styles follow the existing CSS manifest and `@layer pages` convention.
- Accessibility, responsive behaviour at 320px, and the existing `pnpm validate`, `pnpm build`, and `pnpm test:e2e` checks apply.

## Rollout

1. Commit the in-progress Atelier Florae experiment against the current Experiments page.
2. Add per-project routes under each area with the shared layout: section nav, tags, hero where a real image exists, gallery, lightbox, "Continue exploring".
3. Convert `/case-studies` and `/projects` into card-grid indexes linking to those pages. Update the sitemap.

Steps 2 and 3 can ship separately. Each leaves the site deployable and changes no existing URL.

## Changelog

**v4 (2026-09-26)**

- Accepted all open-question recommendations: Role and Constraints remain named sections; hero omitted without a real image; one shared layout across the two content types without merging them; `56rem` breakpoint.
- Scroll-spy tuning and hero sourcing remain as deferred implementation work.

**v3 (2026-09-26)**

- Aligned with the 2026-09-26 decision: two areas kept, Work chooser unchanged.
- Rejected flattened navigation and `/work/<slug>` routing. Project pages live under their area with existing slugs.
- Card grid moved from the Work index to each area index.
- Next-project navigation scoped to the same area.
- Non-functional requirements updated for the React codebase.

**v2**

- Right rail limited to section nav. Technologies moved to a strip under the title.
- Lightbox focus containment and focus return added.
- Flat slug routing and next-project ordering proposed. Work index and navigation flattening prototyped. (Routing and flattening superseded in v3.)
