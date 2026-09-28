---
createdAt: 2026-09-28
updatedAt: 2026-09-28
version: 1.0
status: complete
---

# Square stop on the wordmark

Developer-directed. Approved 2026-09-28. This is the implementation and review contract.

## Objective

Render the wordmark's full stop as a solid accent square instead of a round dot, matching the site's straight-line language (timeline marker, contribution markers). Supports the PRODUCT_REQUIREMENTS Design Philosophy. Evidence is developer visual review. Milestone 5.

## Approved decision

**Option C: regenerate the icon assets too.** The round dot and rounded tile also appear in `public/favicon.svg` and its raster derivatives (`favicon-16x16.png`, `favicon-32x32.png`, `favicon-512.png`, `apple-touch-icon.png`) and in `public/social-preview.png`. All are updated to the square stop.

## Amendment (2026-09-28, developer-directed, after implementation)

`social-preview.png` is rebuilt to use the site's typefaces instead of the earlier Arial-style type: Newsreader for the name and role, Inter for the tagline, IBM Plex Mono for the URL, loaded from the same Google Fonts request as `index.html`. Layout, dimensions (1200×630), text, frame and rule are kept. Follow-up developer directions: the name sits on the D mark's bottom edge (shared baseline), and the top-left gradient wash is removed so the card is the flat `#131313` canvas, matching the site's "no gradients" decision; the name is now mixed-case "Davi Naizer" with the square stop, matching the site wordmark. This supersedes the "paint out the round stops, leave everything else unchanged" approach for that file.

## Scope

**Site wordmark (CSS only)**
- Replace the two `::after` full stops (`.site-header__identity` in `shell.css`, `.home__identity` in `HomePage.css`) with one shared rule in `patterns.css`: an empty inline-block square in `--color-accent`, sized in `em` (about 0.15em, tuned visually), sitting on the baseline. No markup change.
- Forced-colours fallback (`Highlight`). Side effect: the "." no longer appears in the accessible name.

**Icon assets**
- `favicon.svg`: circle becomes a square. Tile corners become square too (assumption, consistent with the straight-line principle; flagged for review).
- Regenerate the four PNG icons from the updated SVG at their existing sizes.
- `social-preview.png`: replace both round stops (the "D." mark and the "DAVI NAIZER." title) with squares, leaving everything else unchanged (same dimensions, 1200×630).
- No change to `index.html`, `site.webmanifest` or any path.

Excluded: markup or content changes, glow or border on the square, new tokens or dependencies, the pre-existing gradient wash in `social-preview.png`, the unrelated modified `public/davi-naizer-resume.pdf`.

## Completion criteria

1. The header wordmark and the Home h1 end in a solid accent square; no round dot in the wordmark.
2. The square sits on the baseline and reads as a full stop at header and hero sizes.
3. Forced-colours shows the square; the accessible name no longer includes ".".
4. One shared definition; the two old `::after` rules are gone.
5. `favicon.svg` and all four PNG icons show a square stop, keep their existing sizes and paths, and remain legible at 16px.
6. `social-preview.png` keeps 1200×630 and its layout, with both stops square.
7. No markup, content or token changes; existing checks pass; no other public asset changes.

## Implementation sequence

1. Wordmark CSS: shared rule in `patterns.css`, delete the two old rules, forced-colours fallback, tune size and baseline.
2. Update `favicon.svg`; render the PNG icons from it.
3. Update `social-preview.png` (both stops).
4. Review all assets visually at actual and enlarged sizes.

## Validation

`pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`, `pnpm test:e2e`. Manual: header and Home hero at desktop and 320px including hover; each icon asset viewed; asset dimensions confirmed.
