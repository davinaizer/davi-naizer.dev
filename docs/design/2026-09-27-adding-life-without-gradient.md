---
title: Adding life without relying on the gradient wash
status: exploratory
createdAt: 2026-09-27
---

# Adding Life Without Relying on the Gradient Wash

## Context

The gradient wash was considered for removal because the site felt empty without it, then kept as a deliberate choice (see `docs/DECISIONS.md`, "Record the shipped visual system," 2026-09-27). This note captures the design options discussed for adding "life" to the page through means other than a gradient, so they aren't lost before the current task finishes.

This is exploratory, not an approved plan. Nothing here has been built. Turning any of it into work still needs `plan-next-task`.

## Diagnosis

A gradient wash only supplies atmosphere. If the page still feels flat with it, the likely gap is presence and craft, not atmosphere: nothing on the page is doing anything, and no single detail shows deliberate intent. Stacking a second decorative layer (grain, a background photo) tends to repeat the same fix rather than solve the actual gap.

## Direct answers to the two options raised

- **Background images:** only as real evidence — actual project screenshots, CAD renders, or product photos from the case studies. Never decorative or stock. This is already the position `docs/design/DESIGN.md` and `docs/plans/2026-09-26-work-index-routing.md` take on card imagery, and it should hold here too. The site's "life" should come from proof of work, not mood photography.
- **Tonal surfaces with slight colour variation:** yes, and it fits the existing flat-stack direction. A luminance step is not a shadow and not a gradient; it is still flat, just two flats instead of one.

## Options considered

| # | Move | What it is | Why it fits this brief | Risk |
|---|---|---|---|---|
| 1 | **Tonal surfaces** | One extra near-black step (`#131313` to roughly `#17171a`) for insets: gallery figures, the lightbox, the analytics dialog. Still bordered, still flat. | Reads as "pages in a folder," not "cards floating." Cheap and reversible. | Low. Hygiene, not a "life" fix on its own. |
| 2 | **Real evidence, shown bigger** | Give actual project artifacts more visual weight: a real hero image where one exists (UV Insect Trap already has one), a larger CAD or screenshot treatment, possibly a duotone tint in the accent hue over grayscale photos so they sit inside the palette. | The subject is proof of engineering work. Presence of real artifacts is more on-brief "life" than any decorative device. | Medium. Duotone photography is itself a recognizable technique; keep it subtle and only on real project images, never decorative ones. |
| 3 | **One kinetic signature moment** | Formalize the current-role timeline dot (flagged in the CSS audit as a one-off glow, finding G8) into a slow pulse: the one place motion carries meaning ("this is happening now"). No other load or scroll animation on the page. | Matches the principle that one orchestrated moment beats scattered hover effects. The seed already exists; it needs to become the only motion, done well. | Low, if kept to exactly one instance. |
| 4 | **Editorial typographic craft** | Pull a line from a case study's reflection into a large italic Newsreader pull-quote; add a running head or footnote-style annotation; a drop cap on the longest intro. | This is where "technical journal / architectural monograph" (`docs/design/DESIGN.md`, Brand & Style) stops being a mood-board line and becomes a real device. Sourced from the site's own writing, not a decorative layer. | Low, if restrained to one or two instances, not every section. |
| 5 | **Swiss print marks** | Faint crop-mark ticks at the container edge; a page-number-style counter in the margin on long pages (Experience, project pages). | Reinforces the grid language already in `DESIGN.md`. Genuinely unusual, not a common AI-generated tell. | Low, but easy to overdo into decoration for its own sake. |
| 6 | **Grain / paper texture** | A 2–3% noise overlay across the canvas. | Ties to the "premium technical journal" language in `DESIGN.md`. | **Highest risk.** Dark canvas plus subtle grain plus one accent is becoming its own recognizable generated-design pattern, the same way the gradient wash is. Reach for this only if nothing else moves the needle, and keep it barely perceptible. |

## Recommended order, when this is picked back up

1. **#1, tonal surfaces.** Do this regardless; it is simply correct for the flat-stack system already in place.
2. **#4, typographic craft.** Highest ROI for "life," most specific to this brief, cheapest to try since it works on content that already exists.
3. **#3, one kinetic moment.** Small, half-built already, gives the page exactly one thing that feels alive rather than static.
4. **#2, real evidence shown bigger.** Bigger lift, gated on which projects have imagery worth featuring; worth its own pass once more case studies have artifacts.
5. Hold #5 and #6 in reserve unless 1 to 4 together still feel thin. If needed, prefer #5 over #6: it is more distinctive and less likely to read as generic.

## Follow-up

Revisit after the current task. Turning a chosen option into work needs a task plan (`plan-next-task`); options 3 and 4 touch motion and typography respectively and may warrant a short decision record of their own once one is chosen.
