---
createdAt: 2026-09-26
updatedAt: 2026-09-26
version: 1.2
status: complete
workflowStage: complete
---

# CSS Audit Remediation Plan

## Project position

- **Completed:** The CSS audit remediation received a same-scope `PASS` and is closed. The earlier Case Studies layout refinement is also closed.
- **Current:** Milestone 5, Evidence-Driven Evolution.
- **Next outcome:** None recorded; no unchecked TODO candidate remains.
- **Workflow stage:** Complete after formal review `PASS`.

## Product objective and roadmap milestone

This supports Milestone 5 objectives to maintain frontend engineering fluency and demonstrate engineering judgement. It also preserves the product requirements for accessibility, responsive behaviour, maintainability, deployability, and proportionate performance work.

## Task objective and current evidence

Implement the confirmed recommendations from the Modern Web Guidance audit without introducing a new styling system or changing the rendered product design.

Current evidence:

- The production CSS still contains an external Google Fonts `@import` from `src/styles/tokens.css:1`.
- `src/styles/tokens.css:61` uses `100vh`, while the existing dialog styles already use `100dvh`.
- Home focus styles, `.case-studies__empty`, and some earlier-career styles have no active rendered markup. The earlier-career block is still represented only by commented JSX and requires care before removal.
- Global `section > * + *` and `li + li` rules create multiple local `margin-block-start: 0` overrides.
- The active timeline marker uses `box-shadow`, with no explicit forced-colors fallback.
- The current stylesheet already uses cascade layers, design tokens, logical properties, `clamp()`, `aspect-ratio`, `:focus-visible`, `accent-color`, native `<dialog>`, and reduced-motion handling. These are not replacement targets.

## Audit recommendations adopted

| Audit recommendation | Planned action | Evidence of completion |
| --- | --- | --- |
| Remove the external font `@import` request chain. | Retain the current Google Fonts selection for this task, move the stylesheet request to `index.html`, and add `preconnect` hints for the two font origins. | `src/styles/tokens.css` has no external `@import`; `index.html` owns the font links; the emitted application CSS has no external `@import`. |
| Delete confirmed dead CSS. | Remove the unused Home focus styles and `.case-studies__empty` rules. Leave the commented earlier-career CSS untouched unless that separate content decision is made. | No active-absent selectors remain in the confirmed dead-code list. |
| Prefer dynamic viewport units. | Keep a `100vh` fallback and add `100dvh` for the shell minimum-height token. | The shell uses the fallback/dynamic pair and preserves the existing dialog behaviour. |
| Reduce overmatching global flow rules. | Replace only the identified `li + li` and `section > * + *` compensating overrides with explicit local spacing or existing layout `gap` declarations. | The affected selectors have active consumers, and screenshot comparison shows unchanged spacing. |
| Provide forced-colors resilience. | Add a minimal system-colour fallback for the active timeline marker and focus outline. | Forced-colors verification passes, or the unavailable manual environment is recorded explicitly. |
| Remove low-risk redundancy. | Delete the duplicate dialog `max-block-size`, duplicate `font: inherit`, unnecessary `.contact__layout` flex rule, duplicate mobile media block, and unused empty layer names. | The diff contains no equivalent replacement rule and emitted CSS does not grow. |
| Avoid speculative modernization. | Do not add container queries, `content-visibility`, CSS Modules, utility frameworks, animation systems, or new dependencies. | Dependency manifest and styling boundaries remain unchanged. |

## Scope

- Retain the current externally hosted Google Fonts as the approved task default, while moving loading from CSS `@import` to HTML stylesheet links with appropriate connection hints. This improves request discovery but does not remove the external-origin privacy/reliability trade-off.
- Remove confirmed dead CSS for the unused Home focus styles and `.case-studies__empty`.
- Remove redundant declarations and media-query duplication, including the repeated dialog `max-block-size`, duplicated `font: inherit`, and the unnecessary `.contact__layout` flex rule.
- Replace the shell minimum-height token with a `100vh` fallback followed by `100dvh`.
- Add a minimal forced-colors fallback for the active timeline marker and focus treatment.
- Reduce the compensating overrides caused by broad list/section spacing selectors, preserving existing spacing through explicit local selectors or `gap` where already structurally appropriate.
- Remove unused `utilities` and `overrides` layer names from the layer-order declaration because no rules currently use them.
- Update the styling-architecture description if the declared layer order changes, keeping documentation aligned with the manifest.
- Keep the current global CSS manifest, cascade-layer model, route-owned stylesheets, static content model, and installed dependency set.

## Explicit exclusions

- No CSS Modules, utility framework, CSS-in-JS library, stylesheet dependency, or new CSS linting dependency.
- No container-query migration, `content-visibility`, animation system, theme redesign, or broad visual refresh.
- No body DOM, route, copy, content, navigation, or product-scope changes; document-head font resource links are in scope.
- No deletion of the commented earlier-career implementation unless the developer confirms that work is abandoned; its associated CSS remains a separate cleanup decision.
- No image-payload or responsive-image project; those are adjacent performance work, not CSS remediation.

## Assumptions, risks, blockers, and required decisions

- **Approved plan default:** Retain the current Google Fonts dependency and move it to HTML loading. Self-hosting or accepting system-font fallbacks is not part of this task; revise the plan before implementation if that policy is not acceptable.
- The repository continues to target Vite's default `baseline-widely-available` browser target.
- Spacing-selector changes can cause subtle layout regressions because the global rules currently affect nested sections and lists. Screenshot comparison is required.
- Forced-colors verification may require a manual browser check; if the environment cannot provide it, record the limitation rather than claiming full verification.
- No implementation blocker is known under the approved plan default.

## Completion criteria

1. The current font policy is implemented consistently: HTML owns the external stylesheet request, connection hints are present, and the CSS bundle has no external `@import`.
2. No confirmed dead selectors remain for active-absent Home focus content or `.case-studies__empty`.
3. The shell uses the dynamic viewport fallback without changing intended desktop or mobile composition.
4. The active timeline marker and focus treatment retain an identifiable system-colour fallback in forced-colors mode.
5. Broad spacing rules no longer require the identified compensating resets, or each retained exception has a clear active consumer.
6. The identified redundant declarations, duplicate mobile block, and unused layer names are removed without replacing them with equivalent complexity.
7. Architecture documentation matches the final cascade-layer manifest.
8. The body DOM, routes, copy, interaction behaviour, and intended visual design remain unchanged apart from font-loading timing.
9. The emitted CSS is no larger than the current 33.52 kB build output.
10. `pnpm validate`, `pnpm build`, `pnpm format:check`, `pnpm lint`, and the relevant end-to-end checks pass.
11. Responsive, focus, reduced-motion, and screenshot checks pass at the existing 320px, 390px, 768px, and desktop baseline sizes; forced-colors coverage is recorded as verified or unavailable.

## Implementation sequence

1. Capture the current build size and inspect all affected selectors before editing.
2. Move Google Fonts loading from `src/styles/tokens.css` to `index.html` with preconnect hints.
3. Delete confirmed dead CSS and remove the listed redundant declarations, media block, and unused layer names.
4. Add the dynamic viewport fallback and forced-colors rules.
5. Scope list/section spacing only where the current global rules demonstrably create compensating overrides.
6. Run the required validation and compare screenshots and emitted CSS size against the current baseline.
7. Hand the finished implementation to `review-task`; do not close the task without a same-scope `PASS`.

## Validation

- Static: `git diff --check`, `pnpm format:check`, `pnpm lint`, and `pnpm validate`.
- Build: `pnpm build`; record emitted CSS size and confirm the only font stylesheet request is owned by `index.html`, with no external CSS `@import` remaining.
- Browser: run the existing end-to-end suite and inspect the affected routes at the established mobile, tablet, and desktop sizes.
- Accessibility: keyboard focus traversal, reduced-motion behaviour, contrast preservation, native dialog behaviour, and forced-colors verification where available.
- Visual: compare the existing CSS-refactor baseline screenshots, with particular attention to Home, Experience, Case Studies, Contact, and the analytics dialog.
