---
createdAt: 2026-09-28
updatedAt: 2026-09-28
version: 1.0
status: complete
---

# Square markers for "Selected contributions"

Developer-directed. Approved 2026-09-28. This is the implementation and review contract.

## Objective

Replace the continuous accent bar on `.experience__contributions` (Resume timeline) with one small hanging square marker per item, echoing the timeline's square marker. Supports the PRODUCT_REQUIREMENTS Design Philosophy (calm, restrained, content-first). Evidence is developer visual review, not measured data. Milestone 5.

## Approved decision

`.project-page__outcomes-list` keeps its accent bar (**Option A: contributions only**). The Outcomes bar sits in a different context with no timeline to echo, and the audit's G2 fix treated the two lists as separate roles. Review trigger: revisit if the bar also reads heavy on case-study pages.

## Scope (CSS only)

- Remove the `border-inline-start` bar from `.experience__contributions`.
- Add an `li::before` square: size `calc(var(--size-timeline-dot) / 2)`, colour `--color-accent-border`, hung in the left gutter (`li` positioned, `padding-inline-start` sized to fit), aligned to the first line's optical centre.
- Item gap `--space-1` to `--space-2`.
- Forced-colors fallback (`Highlight`) in the existing `@media (forced-colors: active)` block; check the 40rem override.

Excluded: any markup or content change, the Technologies tags, the timeline marker, new tokens, classes or dependencies, the Outcomes list.

## Completion criteria

1. No continuous bar; each contribution has its own square aligned to the first line, including wrapped items (screenshots at desktop and 320px).
2. The list reads visibly quieter and matches the timeline's square language.
3. Item spacing reads as separation.
4. Forced-colors mode still shows a marker.
5. No horizontal overflow at 320px; the Outcomes list is unchanged.
6. No markup, content or token changes; existing checks pass.

## Implementation sequence

1. Edit `.experience__contributions` in `src/pages/ResumePage.css`: `li` positioning, `::before` marker, spacing.
2. Add the forced-colors fallback.
3. Tune offsets visually on two- and three-line items.
4. Check at or below 40rem.

## Validation

`pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`, `pnpm test:e2e`. Manual: `/resume` at desktop, 56rem, 40rem and 320px, plus forced-colors emulation.
