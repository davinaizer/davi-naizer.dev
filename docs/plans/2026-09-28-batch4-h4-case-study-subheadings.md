---
title: Batch 4 — heading sub-level for case study "Product / UX" and "Engineering" (H4)
status: approved
createdAt: 2026-09-28
---

# Batch 4 — heading sub-level for case study "Product / UX" and "Engineering" (H4)

Approved plan. Implementation and review contract for this task.

## Project position

- **Completed:** Batch 4's H2 and H3 (heading-hierarchy fixes on `/work` and `/experience`) closed with `PASS`, committed `ebf20be`. Batches 1–3 and H1/G3 remain fully closed.
- **Current:** Milestone 5 (Evidence-Driven Evolution, ongoing). H4 is the one remaining Batch 4 defect; per `docs/audit/2026-09-27-visual-css-consistency.md`, it's independent of H2/H3 and scoped only to case-study pages.
- **Next outcome:** Closes Batch 4 entirely. Leaves only Batch 5 (generic-pattern/design-direction items) and F5 (Low ROI) as unbuilt audit work.
- **Workflow stage:** Approved by developer 2026-09-28 (Option 1). Implemented, including two developer-directed additions made during implementation — see "Mid-implementation additions" below. Pending review.

## Product objective and roadmap milestone

Continues the developer-directed CSS/markup consistency audit under Milestone 5. Non-goal: no content rewrite, no visual redesign of the Decisions section beyond adding two nested subheadings.

## Task objective and current evidence

Finding H4: case-study pages render "Product / UX" and "Engineering" as `h2` siblings of "Decisions" in the section-nav and page (`src/pages/CaseStudyPage.tsx:66–75`), even though both are prose elaborations *of* the preceding "Decisions" list, not independent top-level topics. Confirmed:

- `caseStudies` entries carry `productAndUx: string` and `engineering: string` — single prose paragraphs, same shape across all four case studies (`src/types/evidence.ts:56–57`, `src/content/evidence-content.ts`).
- This pattern exists only in `CaseStudyPage.tsx`. `ExperimentPage.tsx` has no equivalent subdivision.
- No other file references the `${slug}-product-ux` / `${slug}-engineering` section IDs — safe to remove as standalone anchors.
- `CaseStudyPage.test.tsx:44–55` asserts the section-nav's exact 10-item list, including "Product / UX" and "Engineering" as top-level entries — updated regardless of option chosen.

## Decision — Option 1 (approved)

Fold "Product / UX" and "Engineering" into the "Decisions" `ProjectPageSection`'s content as `h3` subheadings, each followed by its existing paragraph — no interface change needed, since `ProjectPageSection.content` is already `ReactNode`. They stop being separate top-level sections, so the section-nav ("On this page") drops from 10 to 8 links per case study, and the outline becomes `h1 → h2 (Decisions) → h3 (Product / UX, Engineering)` — correct, no longer siblings of what they subdivide.

Rejected: Option 2 (restructure `productAndUx`/`engineering` into list items) — both fields are full prose paragraphs, not enumerable points; forcing them into `<li>`s would fragment the writing or require a content rewrite, out of scope for this task.

## Mid-implementation additions (developer-directed)

Two follow-up decisions were made during implementation, both approved by the developer, that extended the file scope beyond the two files originally listed:

1. **Spacing fix.** This repository's CSS reset (`src/styles/reset.css`) zeroes all default margins, so the new `h3`/`p` elements initially rendered with no visible gap between the decisions list and the first subheading, and between each subheading and its own paragraph — a real visual defect, confirmed by the developer from a screenshot. Fix: wrapped the "Decisions" section's content in a new `.project-page__decisions-detail` element (keeping it as a single child of the `<section>`, so the existing `h2`-to-content spacing on every other section is untouched) and added scoped spacing rules in `src/styles/patterns.css`.
2. **Visual styling to match Experience.** The developer felt the unstyled `h3` default (an off-scale 18.72px Newsreader serif, confirmed via computed styles) looked inconsistent with the rest of the page. After discussion (validated against the `frontend-design` skill), the developer chose to restyle "Product / UX" and "Engineering" to exactly match `.experience__detail h3`'s existing treatment (`ExperiencePage.css`: 12px IBM Plex Mono, uppercase, `--color-accent-soft`, medium weight) rather than matching the "Decisions" `h2` label style, since that would have visually flattened the nesting the H4 fix was meant to introduce. Implemented as a scoped rule in `src/styles/patterns.css`.

## Scope

In scope:
- `src/pages/CaseStudyPage.tsx` — remove the two standalone `ProjectPageSection` entries for Product/UX and Engineering; append them as `h3`-headed subsections, wrapped in a `.project-page__decisions-detail` element, inside the "Decisions" section's content.
- `src/pages/CaseStudyPage.test.tsx` — update the section-nav list assertion (drop the two entries) and add an assertion that "Product / UX" and "Engineering" render as `h3` headings within the Decisions section.
- `src/styles/patterns.css` — added during implementation (see "Mid-implementation additions" above): `.project-page__decisions-detail` spacing rules and `h3` visual styling matching `.experience__detail h3`.

Explicit exclusions:
- No change to `ProjectPageLayout.tsx`, `src/types/evidence.ts`, or `src/content/evidence-content.ts` — content and shared layout are untouched.
- No change to `ExperimentPage.tsx` — it has no equivalent structure.
- Batch 5 and F5 — untouched.
- No rewriting of the `productAndUx`/`engineering` prose content itself.

## Assumptions, risks, blockers

"Product / UX" and "Engineering" are no longer independently deep-linkable via the section-nav (they become part of "Decisions"). This is the intended outcome of the fix, per the audit's own instruction to "check the section-nav still lists only top-level sections," not an unplanned side effect. No blockers.

## Completion criteria

1. Case-study pages have a correct heading outline: `h1 → h2 (per top-level section) → h3 (Product / UX, Engineering nested under Decisions)`, no heading-level skip (verified via updated `CaseStudyPage.test.tsx` and a manual heading-outline check on the Alfred case study).
2. The section-nav ("On this page") lists 8 top-level entries per case study (down from 10), no longer including "Product / UX" or "Engineering" (verified via test).
3. `pnpm typecheck`, `pnpm test`, `biome check src`, `pnpm build` pass; no new accessibility violations (axe checks stay green, including `heading-order`).
4. No visual regression on unrelated sections or on `/work`, `/experience` (spot-check one case study page).

## Implementation sequence

1. `CaseStudyPage.tsx`: remove the `product-ux` and `engineering` entries from the `sections` array; append their content as `<h3>` + `<p>` blocks inside the "Decisions" section's `content`.
2. `CaseStudyPage.test.tsx`: update the section-nav list assertion; add an assertion for the two nested `h3` headings within the Decisions section.
3. Run `pnpm typecheck`, `pnpm test`, `biome check src`, `pnpm build`; manually verify one case study page (e.g. Alfred) in the browser.

## Validation

Automated: typecheck, unit/component tests (incl. axe accessibility checks), lint, build. Manual: visual/heading-outline check of one case study page.
