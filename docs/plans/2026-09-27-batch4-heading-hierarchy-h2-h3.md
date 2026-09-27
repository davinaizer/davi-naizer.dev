---
title: Batch 4 heading hierarchy — H2 and H3
status: implemented
createdAt: 2026-09-27
updatedAt: 2026-09-27
---

# Batch 4 heading hierarchy — H2 and H3

Approved plan. Implementation and review contract for this task.

## Project position

- **Completed:** Batches 1–3 of the 2026-09-27 CSS audit are fully closed, plus H1 and G3 from Batch 4 (`docs/HANDOFF.md`).
- **Current:** Milestone 5 (Evidence-Driven Evolution, ongoing). Batch 4 (heading semantics) is next per the audit's fix order; H1 fixed the two-role `h2` problem but its own note flags H2 as a direct follow-on side effect, and H3 is a small, independent, unresolved defect on the same page family.
- **Next outcome:** `/work` and `/experience` will have a correct, un-inverted heading hierarchy. This leaves H4 (project-page sub-heading level, needs content restructuring) as the only unaddressed Batch 4 defect.
- **Workflow stage:** Approved by developer 2026-09-27 (H2's Option A later superseded by Option B, also developer-approved, during implementation — see Decision below). Implemented; pending review.

## Product objective and roadmap milestone

Supports the ongoing engineering-quality work under Milestone 5 (no fixed next milestone) and the developer-directed CSS consistency audit already in progress. Non-goal: this does not touch visual design direction (Batch 5) or the audit's remaining Low-ROI items.

## Task objective and current evidence

Fix two related Batch 4 defects, both confirmed live in code:

- **H2** — `/work`'s section headings ("Case studies", "Experiments") are `h2` using `.section-label-heading` (H1's mono-style label class), but each card title below is an `h3` at 24px (`.work__card h3 { font-size: var(--font-size-heading-md) }`, `src/pages/WorkPage.css:60`) — visually larger than its own parent heading. Source: `src/pages/WorkPage.tsx:58,84`.
- **H3** — On `/experience`, "Earlier career"'s `h2` and its `h3` entries render at the same 24px, because `.experience__entry h2, .experience__entry h3` share one rule (`src/pages/ExperiencePage.css:79–81`) with no separate step for the earlier-career `h3`s.

## Decision — H2 (superseded: Option A → Option B during implementation)

Originally approved as **Option A**: stop rendering "Case studies"/"Experiments" as headings (`<h2 className="section-label-heading">` → a non-heading `<p>`, kept as the `aria-labelledby` target). Implementation surfaced a regression this decision hadn't accounted for: the repository's `vitest-axe` check (`WorkPage.test.tsx`, only `color-contrast` disabled) flags the resulting `h1 → h3` level skip as a `heading-order` violation. This is a real defect under `CLAUDE.md`'s "treat … accessibility defects as defects," not a cosmetic best-practice note, so Option A was escalated back to the developer rather than silently patched around (e.g. by disabling the axe rule).

**Developer approved Option B instead (2026-09-27):** keep "Case studies"/"Experiments" as real `h2` elements, styled as the standard 24px serif title (`.work__section > h2 { font-size: var(--font-size-heading-md); }`, matching X3's "h2 is the 24px serif title"), and shrink the card `h3` to `--font-size-body-lg` (20px, `WorkPage.css`'s `.work__card h3`) so the visual hierarchy is correct without any heading-level skip. This reverses H1's earlier choice to give these two labels the `.section-label-heading` mono-label treatment, but keeps the semantic outline (`h1 → h2 → h3`) fully intact and passes `heading-order` cleanly.

## H3 fix (no open decision)

Shrink the earlier-career `h3` entries to `--font-size-body-lg` (1.25rem/20px) via a more specific selector (e.g. `.experience__timeline--earlier .experience__entry h3`), leaving "Earlier career"'s own `h2` at the existing 24px. This is the audit's own suggested fix.

## Scope

In scope:
- `src/pages/WorkPage.tsx` (H2, Option B: section headings stay real `h2`s, `.section-label-heading` class removed)
- `src/pages/WorkPage.css` (H2, Option B: `.work__section > h2` sized at 24px, `.work__card h3` shrunk to `--font-size-body-lg`)
- `src/pages/ExperiencePage.css` (H3: new selector for earlier-career entry `h3` size)
- Associated test updates if any assertion needs a heading-role check added/adjusted

Explicit exclusions:
- H4 (project-page `h3` sub-level / content restructuring) — separate task, larger scope, needs a content-structure decision and touches `CaseStudyPage.test.tsx`.
- H5–H7 and all Batch 5 items — untouched.
- No visual redesign beyond the two size/element changes described.

## Assumptions, risks, blockers

None outstanding — H2's option was resolved by developer approval. No blockers.

## Completion criteria

1. `/work`: "Case studies" and "Experiments" render as real `h2`s sized at 24px (larger than their card `h3`s, shrunk to `--font-size-body-lg`), giving a correct `h1 → h2 → h3` outline with no level skip (verified via existing/extended `WorkPage.test.tsx` assertions and a manual heading-outline and visual-size check).
2. `/experience`: earlier-career entry titles render visually smaller than the "Earlier career" heading (manual visual check + no regression in `ExperiencePage.test.tsx`).
3. `pnpm typecheck`, `pnpm test`, and `biome check src` pass; no new accessibility violations (existing jest-axe checks stay green).
4. No visual regression on unrelated elements (spot-check `/work` and `/experience` at desktop and mobile widths).

## Implementation sequence

1. `WorkPage.tsx`: remove `.section-label-heading` from the two section headings, keeping them as plain `h2`s; `WorkPage.css`: size `.work__section > h2` at 24px and shrink `.work__card h3` to `--font-size-body-lg`.
2. `ExperiencePage.css`: add the earlier-career-specific `h3` size rule.
3. Update/add test assertions confirming the corrected heading outline on both pages.
4. Run `pnpm typecheck`, `pnpm test`, `biome check src`; visually verify both pages.

## Validation

Automated: typecheck, unit/component tests (incl. existing accessibility checks), lint. Manual: visual check of `/work` and `/experience` heading sizes at desktop and mobile widths.
