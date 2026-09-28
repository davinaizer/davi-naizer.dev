---
title: Production focus visibility and colour contrast review
status: developer-reported
recordedAt: 2026-09-24
---

# Production Focus Visibility and Colour Contrast Review

- **Target:** `https://davi-naizer.pages.dev/`
- **Method:** Manual review; results reported by the developer.
- **Checks:** Keyboard focus visibility and colour contrast, as scoped by the approved task plan.

## Reported results

The developer reports that all manual checks passed in each browser and viewport category:

| Browser | Mobile | Mobile landscape | Desktop |
| --- | --- | --- | --- |
| Safari | Pass | Pass | Pass |
| Chrome | Pass | Pass | Pass |
| Firefox | Pass | Pass | Pass |

- **Route scope:** The plan covers `/`, `/experience`, `/work`, `/projects`, `/case-studies`, `/resume`, and `/contact`. The developer reports Lighthouse scores were virtually the same across routes; individual values were not supplied.
- **Manual environment details:** Exact viewport dimensions, browser versions, and test date were not supplied.
- **Manual issues:** No failures were reported.

## Supplemental automated evidence

A developer-provided Chrome Lighthouse screenshot shows an Accessibility score of 100 for a desktop audit. The audited URL/route, browser version, and run date are not visible. The developer reports virtually the same score across routes, but exact per-route values were not supplied. This automated score supplements but does not replace the manual cross-browser checks.

## Playwright production audit

A temporary Playwright script used the installed Chromium browser and `axe-core` 4.13.0 against all seven routes at three explicit viewport sizes: 390 × 844, 844 × 390, and 1280 × 800. All 21 route/viewport requests returned HTTP 200.

- The axe `color-contrast` rule reported zero violations. It marked 1,360 nodes incomplete because it could not resolve the page's radial-gradient background; incomplete results are not passes.
- A screenshot-pixel sample masked text, sampled three horizontal points along the centerline of visible text elements, and compared each computed foreground colour with the rendered background pixel. Across 5,964 samples, the lowest observed ratios by foreground colour were:

| Foreground | Sampled background | Lowest observed ratio | Threshold used |
| --- | --- | ---: | ---: |
| `#e2e2e2` (normal text) | `#1e213b` | 12.13:1 | 4.5:1 |
| `#e2e2e2` (large text) | `#1e213a` | 12.15:1 | 3:1 |
| `#aaa4a5` | `#1f213c` | 6.39:1 | 4.5:1 |
| `#8ea0ff` | `#1d2037` | 6.56:1 | 4.5:1 |
| `#b9c6ff` (normal text) | `#292d4e` | 7.97:1 | 4.5:1 |
| `#b9c6ff` (large text) | `#1c1e32` | 9.82:1 | 3:1 |
| `#131313` on the primary action surface | `#8ea0ff` | 7.63:1 | 4.5:1 |

These are sampled minima, not exhaustive per-glyph results; gradient cases remain subject to the manual review.

Keyboard traversal checked 243 focus-visible states across the same 21 route/viewport combinations. All exposed a computed 2px solid outline. A screenshot sample of the first focused header identity link confirmed the rendered outline colour `#8ea0ff`; its contrast against the adjacent background pixels was 6.73:1 on mobile, 7.18:1 on mobile landscape, and 6.53:1 on desktop. This pixel-level focus sample covers that representative control; the other states were checked for the computed outline.

- `pnpm test:e2e`: 12 tests passed.
- `pnpm validate`: typecheck, Biome, and 33 unit tests passed. The test run emitted JSDOM `Window.scrollTo()` not-implemented messages, but exited successfully.
- The temporary measurement script was removed; no source code or dependency changes were made.
