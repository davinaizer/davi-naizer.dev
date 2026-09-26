---
createdAt: 2026-09-26
updatedAt: 2026-09-26
version: 1.0
status: approved
---

# Gallery and Lightbox

**Governing PRD:** `docs/plans/2026-09-26-project-pages-prd.md` (v4, approved), PRD Task C.
**Relation to `TODO.md`:** Implements "C. Gallery and lightbox" under "Project pages within Case Studies and Experiments."

## Objective

Normalise gallery images into two consistent aspect-ratio kinds with real button thumbnails, add a native-`<dialog>` lightbox with caption and focus containment, and complete the per-project hero image review deferred by the PRD.

## Current evidence

- `Visual.layout` (`src/types/evidence.ts`) has three kinds today (`flow`, `screen`, `grid`); `screen` (9:16) is defined but unused by any content entry.
- Only three entries have visuals: Alfred (`flow`, two wide 3:2 screenshot composites, rendered full-width with no crop), Atelier Florae (`grid`, a portrait label sheet + a square seal mark), UV Insect Trap (`grid`, one portrait "final prototype" photo + two ~4:3 CAD renders).
- `grid`/`screen` rendering already uses a fixed-ratio box with `object-fit: contain` (no cropping); `flow` uses `object-fit: contain` at the image's own ratio with a full-width grid span.
- No lightbox, no `<dialog>` usage, and no thumbnail buttons exist anywhere in the codebase.
- No test file exists yet for `ProjectGallery` or `ProjectPageLayout`; one e2e spec file exists (`e2e/critical-journeys.spec.ts`).

## Scope

**In scope:**

- Replace `Visual.layout: "flow" | "screen" | "grid"` with two kinds: `landscape` (4:3) and `portrait` (1:2). Keep `object-fit: contain` (no destructive cropping); kind only sets the frame ratio.
- Reclassify existing visuals: Alfred's two images and the two UV Insect Trap CAD renders → `landscape`; the Atelier Florae label sheet, the Atelier Florae seal, and the UV Insect Trap final-prototype photo → `portrait`. Retire the full-width `flow` grid-span special case so every thumbnail is a uniform grid tile.
- Convert each thumbnail to a real `<button>`; keep the visible title/caption beneath it as today.
- Add a lightbox using `<dialog>` + `showModal()`: opens on click/Enter/Space, shows the full image and caption, closes via a close button, backdrop click, or Escape; contains focus while open and returns focus to the triggering thumbnail on close.
- Add an optional hero field to the content model, rendered 16:9 `object-fit: cover` between the tags strip and body sections, only where a real finished-result image exists.
- **Hero outcome:** only UV Insect Trap qualifies. Promote `final-prototype.jpeg` to hero and remove it from that project's gallery list (avoids showing the same image twice). No other case study or experiment has a finished-result image distinct from its process/screenshot set, so no other hero is added.
- Focused Vitest coverage for the gallery/lightbox (thumbnail button semantics, open/close, focus return); an e2e addition for real keyboard/Escape/click-outside/focus behaviour in a browser.
- `pnpm validate`, `pnpm build`, `pnpm test:e2e`.

**Excluded from this task:**

- Reordering the gallery section relative to Outcomes/Reflection.
- Sourcing or generating any new image assets.
- Cropping/`object-fit: cover` on gallery thumbnails, masonry/carousel layouts, image CDN/optimisation work.
- Any change to the `CaseStudy`/`Project` type merge, routing, or the section-nav/scroll-spy behaviour.

## Assumptions

- Keeping `object-fit: contain` for gallery tiles (no cropping) satisfies "normalise... per kind" without lossy crops of the seal mark or label sheet.
- `object-fit: cover` at 16:9 on the UV Insect Trap hero (a portrait 3:4 photo) will need a deliberate `object-position` to keep the trap in frame; verified visually during implementation.
- Merging `flow` into `landscape` (dropping the full-width special case) is consistent with the PRD's "one shared layout" and "normalise... per kind" intent, since Alfred's composites (3:2) are closer to landscape than portrait and are not literally an app-screenshot pattern.

## Risks

- Alfred's images move from a dedicated full-width band to a standard grid tile; this is a visible layout change on the Alfred case-study page, scoped and expected by "normalise."
- The hero crop on UV Insect Trap needs a manual look to confirm the subject stays in frame.

## Completion criteria

- Exactly two gallery kinds (`landscape` 4:3, `portrait` 1:2) drive every visual's frame; no destructive cropping.
- Thumbnails are real, keyboard-operable buttons.
- Lightbox opens the full-size image and caption, closes via button/Escape/click-outside, traps and returns focus.
- Hero renders 16:9 only for UV Insect Trap; no other project shows a hero.
- No regression to existing routes/section nav.
- `pnpm validate`, `pnpm build`, `pnpm test:e2e` pass.

## Implementation sequence

1. Update `Visual` type and reclassify existing content entries; add the optional hero field and set it for UV Insect Trap only; remove the promoted image from that project's gallery array.
2. Update `patterns.css`: collapse the three layout classes into two frame ratios, drop the `flow` full-width span, add hero and dialog styles using existing tokens.
3. Convert `ProjectGallery` thumbnails to `<button>`; add lightbox state and a `<dialog>` (open/active-index/close, focus-return ref).
4. Render the hero (when present) in `ProjectPageLayout`, between the tags strip and body sections.
5. Add focused Vitest coverage for the gallery/lightbox; extend Playwright coverage for keyboard, Escape, click-outside, and focus return.
6. Run `pnpm validate`, `pnpm build`, `pnpm test:e2e`; manual visual pass on Alfred, Atelier Florae, and UV Insect Trap pages at desktop/mobile/320px.

## Validation

- `pnpm validate` (TypeScript, Biome, Vitest + axe component tests).
- `pnpm build`.
- `pnpm test:e2e` (Playwright/Chromium), including lightbox keyboard/Escape/click-outside/focus-return checks.
- Manual visual check of hero cropping and gallery/lightbox behaviour on the three affected project pages at representative viewports.
