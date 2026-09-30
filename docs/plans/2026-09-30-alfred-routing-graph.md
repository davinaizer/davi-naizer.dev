---
createdAt: 2026-09-30
updatedAt: 2026-09-30
version: 1.0
status: complete
---

# Replace the Alfred flat diagrams with a routing graph

Developer-directed. Approved 2026-09-30 by the developer, including the recommended narrow-screen behaviour (text version below 52rem). Supports PRODUCT_REQUIREMENTS honest, evidence-backed content. Supersedes the diagram implementation of `2026-09-30-alfred-ai-workflow-diagrams.md` (the copy from that plan stays).

## Objective

The Alfred case study shows where and why work branches in the AI-assisted workflow, not only the stage order. The two flat Diagram Panel flows (Simplified, Full) are dropped and replaced by one routing graph.

## Approved design

The developer approved the graph: `docs/design/alfred-routing-graph.svg` (source) and `.png` (3540px). Dark, tokenised, filename bar `alfred-routing.flow`. Drawn in code because the draw.io renderer was unreachable; there is no `.drawio` file.

Contents, each traced to the alfred-ios sources (`docs/governance/decisions.md` 1.3, 1.5, 2.1 to 2.3; `.agents/skills/*/SKILL.md` Handoff sections):

- Entry: "Prompt-only request?" sends prompt-only requests to `prompt-validator` (never executes); everything else goes to `workflow-selector`.
- Route decision, in priority order: 1 any Diagnostic trigger, to `system-auditor`; 2 visible behaviour, flow or state, to `ux-ui-designer` then `architect`; 3 small, contained, low-risk (default), to `plan-packet`.
- Auditor outcome: developer (contained fix), plan-packet (needs a packet), architect (structural redesign), End (report-only).
- Shared finish: `developer` (runs `verify-ios.sh`), `code-reviewer`, `session-handoff` on approval.
- Re-entry (dashed): reviewer returns work to developer, plan-packet, architect, system-auditor or workflow-selector by flaw type; a developer scope flaw returns to plan-packet or architect; a second failed verification goes to the auditor (scope unchanged) or selector (scope changed).

## Scope

- Add the SVG (PNG as fallback) under `public/images/` and render it in the Alfred "AI-assisted workflow" subsection, after the first paragraph, as the current diagrams are.
- Add a typed, optional image field to `CaseStudy` (source, alt text, caption, width and height) in place of `aiWorkflowDiagrams`.
- Add a visible text version of the flow (ordered list) with alt text summarising the graph; the routing logic must not exist only in the picture.
- Remove `aiWorkflowDiagrams`, `DiagramPanel` (component, test, `diagram-panel.css` and its `index.css` import) and the two flat diagram entries.
- Update fixtures and `CaseStudyPage` tests; supersede the 2026-09-30 Diagram Panel entry in `docs/DECISIONS.md` with a new entry.

## Exclusions

No dates or timeline, no SwiftLens, no GSD diagram, no enrichment-pipeline diagram, no change to the `aiWorkflow` paragraphs beyond references to the old diagrams, nothing from `2026-09-30-project-page-language-alignment.md`, no draw.io file.

## Decision recorded as an assumption (developer to confirm)

Narrow screens: the graph is 1770px wide and cannot fit a phone without horizontal scroll, which the Diagram Panel spec forbids. Recommended: below 52rem of container width, show the text version of the flow instead of the image. Alternative: a second, vertical graph variant. Reversible either way.

## Risks

- Text baked into the image is not selectable and is fixed in size; mitigated by the text version and alt text.
- The graph uses fallback fonts (DejaVu); the site fonts differ slightly.
- Content drift: the graph must be regenerated if alfred-ios governance changes.
- The previous task was committed (`529f763`) before this task started.

## Completion criteria

1. Every branch and exit in the graph appears in the alt text and text version.
2. The graph renders at hero width; no horizontal scroll from 320px to 1440px.
3. The old diagram component, styles, fields and tests are gone; no unused code remains.
4. Existing copy and contribution boundaries are unchanged.
5. `pnpm validate` and `pnpm build` pass (run by the developer).

## Implementation sequence

1. Close the previous task (commit).
2. Add image assets and the typed field; update the Alfred entry and fixtures.
3. Render image plus text version in `CaseStudyPage`; add the narrow-screen behaviour.
4. Remove the old component, CSS and tests; update `DECISIONS.md`.
5. Layout check in Chromium (320, 768, 1440); developer runs `pnpm validate` and `pnpm build`.

## Amendment (developer-directed, 2026-09-30)

At the readability check the inline graph rendered at about half scale (labels around 6.5px at a 1440px viewport). The developer chose option (a): open the graph full size in the existing lightbox, like the gallery images.

- Extract the lightbox dialog from `ProjectGallery` into a shared `ImageLightbox` component (behaviour unchanged; gallery tests still pass); add a `wide` modifier (`92vw`).
- Add a `RoutingGraph` component (image as a button, caption, steps list, lightbox); `CaseStudyPage` renders it in place of the inline markup. `WorkflowGraph` gains a `title` for the lightbox.
- Add `RoutingGraph.test.tsx` (render, open, close and focus return).
- Excluded: a vertical graph variant, scrolling at natural size.
- Also developer-directed: `zoom-in` cursor on every lightbox trigger (gallery and graph) and the work-card accent-border hover/focus on the graph figure (gallery thumbnails already had it).
- Developer-committed after review (`98c8925`): the lightbox Close button uses `.button--primary` with a filled hover for contrast over images. That commit carried a misplaced CSS hunk in `patterns.css`; the final commit of this task corrects it.
