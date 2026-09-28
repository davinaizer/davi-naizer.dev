---
title: Adding life without relying on the gradient wash
status: exploratory (Diagram Panel decided in full — see below; other options still open)
createdAt: 2026-09-27
updatedAt: 2026-09-27
---

# Adding Life Without Relying on the Gradient Wash

## Context

The gradient wash was removed (see `docs/DECISIONS.md`, "Remove the background gradient wash; hold DESIGN.md to DESIGN_PRINCIPLES.md's 'no gradients' rule," 2026-09-27). This note captures the design options discussed for adding "life" to the page through means other than a gradient, so they aren't lost before the current task finishes.

This is exploratory, not an approved plan. Most of it has not been built. Turning any remaining option into work still needs `plan-next-task`. One exception: the Diagram Panel component (below) is now fully decided and ready to plan directly.

## Diagnosis

A gradient wash only supplies atmosphere. If the page still feels flat with it, the likely gap is presence and craft, not atmosphere: nothing on the page is doing anything, and no single detail shows deliberate intent. Stacking a second decorative layer (grain, a background photo) tends to repeat the same fix rather than solve the actual gap.

## Direct answers to the two options raised

- **Background images:** only as real evidence — actual project screenshots, CAD renders, or product photos from the case studies. Never decorative or stock. This is already the position `docs/design/DESIGN.md` and `docs/plans/2026-09-26-work-index-routing.md` take on card imagery, and it should hold here too. The site's "life" should come from proof of work, not mood photography.
- **Tonal surfaces with slight colour variation:** proposed for insets generally (gallery figures, the lightbox, the analytics dialog). Still open for those — see the note under the Diagram Panel decision below, which resolved this question for one specific component but not for the others.

## Options considered

| # | Move | What it is | Why it fits this brief | Risk |
|---|---|---|---|---|
| 1 | **Tonal surfaces** | One extra near-black step for insets: gallery figures, the lightbox, the analytics dialog. Still bordered, still flat. | Reads as "pages in a folder," not "cards floating." Cheap and reversible. | Low. Hygiene, not a "life" fix on its own. Status: unresolved for these insets — see note below; decided *against* for the Diagram Panel specifically. |
| 2 | **Real evidence, shown bigger** | Give actual project artifacts more visual weight: a real hero image where one exists (UV Insect Trap already has one), a larger CAD or screenshot treatment, possibly a duotone tint in the accent hue over grayscale photos so they sit inside the palette. | The subject is proof of engineering work. Presence of real artifacts is more on-brief "life" than any decorative device. | Medium. Duotone photography is itself a recognizable technique; keep it subtle and only on real project images, never decorative ones. |
| 3 | **One kinetic signature moment** | Formalize the current-role timeline dot (flagged in the CSS audit as a one-off glow, finding G8) into a slow pulse: the one place motion carries meaning ("this is happening now"). No other load or scroll animation on the page. | Matches the principle that one orchestrated moment beats scattered hover effects. The seed already exists; it needs to become the only motion, done well. | Low, if kept to exactly one instance. |
| 4 | **Editorial typographic craft** | Pull a line from a case study's reflection into a large italic Newsreader pull-quote; add a running head or footnote-style annotation; a drop cap on the longest intro. | This is where "technical journal / architectural monograph" (`docs/design/DESIGN.md`, Brand & Style) stops being a mood-board line and becomes a real device. Sourced from the site's own writing, not a decorative layer. | Low, if restrained to one or two instances, not every section. |
| 5 | **Swiss print marks** | Faint crop-mark ticks at the container edge; a page-number-style counter in the margin on long pages (Experience, project pages). | Reinforces the grid language already in `DESIGN.md`. Genuinely unusual, not a common AI-generated tell. | Low, but easy to overdo into decoration for its own sake. |
| 6 | **Grain / paper texture** | A 2–3% noise overlay across the canvas. | Ties to the "premium technical journal" language in `DESIGN.md`. | **Highest risk.** Dark canvas plus subtle grain plus one accent is becoming its own recognizable generated-design pattern, the same way the gradient wash was. Reach for this only if nothing else moves the needle, and keep it barely perceptible. |

## Decision: Diagram Panel component (Option 2, applied to project diagrams) — RESOLVED

Reached across a series of design discussions about presenting the Alfred case study's system/flow diagrams, then verified against `tokens.css` and `DESIGN.md` in a Cowork cross-check, then finalized after a direct A/B comparison. Recorded here because it's a concrete instance of Option 2 and directly tested (and ultimately declined) the Option 1 tonal-surface idea for this one component.

**What it is:** a bordered, flat panel with a monospace filename-style title bar, used to present real project diagrams — pipeline flows, architecture, user flows. Not a device mockup, not a screenshot frame; the diagram is redrawn in the site's own tokens rather than photographed or dropped in with its original tool colours.

**Decided, in full:**

- **Surface: no fill.** Panel background = `--color-background` (`#131313`), identical to the page. Confirmed via A/B comparison — a separate fill token looked marginally better in isolation, but the difference was minimal, and no-fill matches `DESIGN.md`'s "no separate surface fills" directly, with no new token needed. Reversible if the case for a fill strengthens later.
  - *Note:* this closes the question for the Diagram Panel only. It does **not** resolve Option 1 for the panel's originally-proposed scope (gallery figures, lightbox, analytics dialog) — those are still open, and `DESIGN.md`'s self-contradiction ("no separate surface fills" in Structure vs. a "Tonal Layers" mention in Elevation) still stands for that broader question.
- **Border-radius: 0**, matching the site-wide rule (`DESIGN.md`, Shapes: "0 (Sharp)," enforced by omitting `border-radius` entirely rather than by a token).
- **Panel/divider border:** `--color-border-subtle` (`#4c4546`) — the same token used for resting card outlines elsewhere.
- **Title bar:** monospace filename only (e.g. `enrichment-pipeline.flow`) — no dots or other window-chrome marks. Three inert dots were in the first mockup but were never a decided element; dropped as pure decoration per `DESIGN.md` ("remove decorative containers") and `DESIGN_PRINCIPLES.md` (avoid treatments that "add hierarchy without adding meaning").
- **Active-path styling:** accent-coloured (`--color-accent`, `oklch(74% 0.16 275)`) node borders and connectors for the "live" path, **plus `--border-width-accent: 3px`** as a second, non-colour cue. Colour alone (`--color-accent` vs. `--color-border-strong`, ≈1.3:1 contrast) does not reliably distinguish active from inactive and would be a WCAG 1.4.1 (use of colour) risk on its own; width carries the distinction, colour reinforces it.
- **Inactive-node styling:** `--color-border-strong` (`#988e90`), not `--color-border-subtle` — the subtle border measured ~2:1 contrast against the background, below the 3:1 WCAG 1.4.11 floor for non-text graphics, so it can't be the only thing distinguishing an inactive node.
- **Line widths:** inactive node borders and connectors use `--border-width-default` (1px); the active path uses `--border-width-accent` (3px). The panel's own outline and title-bar divider also stay at `--border-width-default`. Stated explicitly because the width cue only works if the 1px baseline is fixed, and there are only two widths in the component.
- **Rendering (SVG):** diagrams are inline SVG styled from the component's CSS, not `<img>` or exported files, so they read the same tokens as the rest of the site: `stroke: var(--color-…)` and `stroke-width: var(--border-width-default | --border-width-accent)`. Strokes use `vector-effect: non-scaling-stroke`, because the no-horizontal-scroll rule means diagrams scale down to fit the panel via `viewBox`, and without it a 3px/1px pair would shrink below its token values on narrow screens. No new stroke tokens: the border-width tokens are reused as-is, and no hex values are hardcoded in the SVG markup.
- **Motion: none.** Option 3 owns the site's one kinetic moment (the role-timeline dot); this panel gets no hover state, no reveal-on-scroll, ever, by default.
- **Content rule:** real project diagrams only, per Option 2's own stance — no decorative or stock imagery.
- **No horizontal scroll** inside the panel. Diagrams must be laid out or simplified to fit at the panel's own width.
- **Reusable standard component**, applied across all known instances rather than built ad hoc per use.

**Confirmed tokens (verified against `tokens.css` directly):**

- `--color-background: #131313`
- `--color-border-subtle: #4c4546`
- `--color-border-strong: #988e90`
- `--color-text-secondary: #aaa4a5`
- `--color-text-primary: #e2e2e2`
- `--color-accent: oklch(74% 0.16 275)`
- `--border-width-accent: 3px`

Nothing about the token set blocks the final build for instance 1.

**Known instances (three):**

1. **Simplified pipeline spine (5 nodes) — hero.** Prototyped with confirmed tokens; needs the title-bar-dots removal, the width-based active-path cue, and the SVG rendering rules above (token-driven strokes, `non-scaling-stroke`) applied before it matches this decision exactly.
2. **Full pipeline (~15 nodes, with sub-annotations) — Engineering section.** Not yet designed. Given the no-horizontal-scroll decision, this needs either further simplification or a layout (wrapped/multi-row) that fits page width — a legibility constraint, not a styling one, and the main blocker to building this instance.
3. **User-flow diagram — near Decisions.** Not yet redrawn in the site's tokens.

**Minor gaps, don't block instance 1, settle in `plan-next-task`:**

- Title text style (presumably `label-mono` — unconfirmed).
- Node label colours: active → `--color-text-primary`, inactive → `--color-text-secondary`? Not explicitly decided, only implied by the mockup.
- Inactive connector colour (implied `--color-border-strong`, matching inactive node borders, but not explicitly stated as a rule).

## Recommended order, when this is picked back up

1. **#1, tonal surfaces (remaining scope).** Still open for gallery figures, the lightbox, and the analytics dialog — the Diagram Panel decision above resolved this question for one component, not for these.
2. **#4, typographic craft.** Highest ROI for "life," most specific to this brief, cheapest to try since it works on content that already exists.
3. **#3, one kinetic moment.** Small, half-built already, gives the page exactly one thing that feels alive rather than static.
4. **#2, real evidence shown bigger.** Bigger lift, gated on which projects have imagery worth featuring; worth its own pass once more case studies have artifacts. The Diagram Panel component is a fully-decided first slice of this and is ready for `plan-next-task` independent of the rest of Option 2 (photography, duotone treatment).
5. Hold #5 and #6 in reserve unless 1 to 4 together still feel thin. If needed, prefer #5 over #6: it is more distinctive and less likely to read as generic.

## Follow-up

Revisit after the current task. Turning a chosen option into work needs a task plan (`plan-next-task`); options 3 and 4 touch motion and typography respectively and may warrant a short decision record of their own once one is chosen.

**Diagram Panel is fully decided and ready for `plan-next-task`**, scoped to: build instance 1 (hero spine) per the spec above, including removing the title-bar dots, applying `--border-width-accent` to the active path (with `--border-width-default` everywhere else), and rendering as token-styled inline SVG; resolve the layout question for instance 2 (full pipeline, no-scroll constraint) before building it; settle the three minor label/colour gaps during implementation.
