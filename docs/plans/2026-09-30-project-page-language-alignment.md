---
createdAt: 2026-09-30
updatedAt: 2026-09-30
version: 1.0
status: complete
---

# Align project-page lists and section labels with the Resume visual language

Developer-directed. Approved 2026-09-30 (Option B). This is the implementation and review contract. Supports the PRODUCT_REQUIREMENTS Design Philosophy (calm, restrained, content-first). Milestone 5. The `2026-09-30-alfred-ai-workflow-diagrams.md` plan was approved later and is implemented first (developer decision, 2026-09-30); this plan proceeds after it and must be reconciled with its changes to `CaseStudyPage.tsx`.

## Objective

Make Case Study and Experiment pages use the same list, marker and label patterns as Resume, so the site reads as one visual language.

## Evidence

- Resume: per-item square markers in `--color-accent-border` (`.experience__contributions`), mono uppercase tracked `--color-accent-soft` labels.
- Project pages: disc bullets (`.project-page__list`: Constraints, Decisions), a continuous accent bar (`.project-page__outcomes-list`), grey sans `h2` section titles (`.section-label-heading`). The Decisions `h3`s already use the mono label style.
- The 2026-09-28 contributions-markers plan set the review trigger "revisit if the Outcomes bar also reads heavy on case-study pages"; this request meets it.

## Approved decision (Option B)

- Project-page `h2` section titles take the Resume label style: mono, uppercase, tracked, `--color-accent-soft`.
- The Decisions `h3` sub-labels take the existing sans `.section-label-heading` style so the two levels stay distinct. (Superseded by the amendment below: they use `.facet-label`.)
- This supersedes the project-page-heading part of the 2026-09-27 decision ("Reserve all-caps mono for supplementary labels") and the matching `docs/design/DESIGN.md` Mono Labels line.
- Accepted trade-off: the sidebar section nav stays sentence case while headings display uppercase (`text-transform` only; DOM text and accessible names unchanged). Review trigger: reconsider if the mismatch reads as inconsistent.
- The marker rules move to a shared `.marker-list` pattern in `src/styles/patterns.css`, extending the four-pattern entry at `DECISIONS.md:351`.

## Scope

- Add `.marker-list` to `patterns.css` (marker, spacing, forced-colors fallback), moving the rules out of `ResumePage.css`.
- Add the class to the Resume contributions list (`ExperienceTimeline.tsx`).
- Apply it to Constraints, Decisions and Outcomes in `CaseStudyPage.tsx` and `ExperimentPage.tsx`; remove `.project-page__list` and `.project-page__outcomes-list`.
- Restyle project-page `h2` and `h3` labels as above.
- Update `DECISIONS.md` and `DESIGN.md`.

Excluded: content or copy changes, new tokens or dependencies, gallery, lightbox, cards, continuation links, `ContextualContinuation`, the Work index, Home, Contact and Footer (read-only check only; findings become future candidates), the Alfred diagrams plan.

## Completion criteria

1. Constraints, Decisions and Outcomes on both page types show per-item square markers; no disc bullets or bars remain (screenshots: Alfred, UV Insect Trap, one more Experiment; desktop and 320px).
2. The Resume contributions list renders the same as before (before/after check). (Its `h3` labels changed per the amendment below.)
3. Project-page `h2` titles use the Resume label style; `h3` sub-labels are visibly a lower level.
4. Wrapped items keep the marker aligned to the first line; no horizontal overflow at 320px; a marker is visible under forced-colors emulation.
5. `DECISIONS.md` and `DESIGN.md` reflect the outcome with no contradicting stale rule.
6. Existing checks pass; no markup or content change beyond the one class addition.

## Implementation sequence

1. Add `.marker-list` to `patterns.css`; remove the moved rules from `ResumePage.css`.
2. Add `marker-list` to the Resume contributions list; confirm the Resume is unchanged.
3. Apply it to the project-page lists; remove the old classes.
4. Restyle project-page `h2` and `h3` labels; check the sidebar nav alongside.
5. Visual pass at desktop, 56rem, 40rem and 320px; update decision docs.

## Validation

`pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`, `pnpm test:e2e`. Manual: `/resume`, `/work/alfred`, `/work/uv-insect-trap` and one Experiment page at the four widths, plus forced-colors emulation and the Resume before/after comparison.

## Amendment (developer-directed, 2026-09-30)

After implementation, the developer reviewed rendered mockups and chose Option C ("quiet sans", no hairlines) for facet labels, applied to both Work and Resume:

- New shared `.facet-label` (`patterns.css`): Libre Franklin, medium, body size, primary text colour. Replaces the grey `.section-label-heading` on the Decisions `h3`s and the mono `h3` labels in Resume's entry detail.
- New `h3` "Key decisions" above the Decisions bullets (case-study pages only; Experiment decisions have no sub-facets).
- Resume's Technologies and Selected contributions labels change from mono accent to `.facet-label`. `.experience__entry h3` size rule scoped to `.experience__entry-header h3` so it no longer enlarges the detail labels.
- Supersedes criterion 3's "`h3` sub-labels use `.section-label-heading`" wording and the Resume-unchanged criterion 2 for these two labels only. Marker list rendering on Resume is unchanged.
- Excluded: hairlines, hanging labels, Engineering copy restructuring (future candidate: split Engineering into short scannable lines and surface the ownership sentence; needs developer approval of copy).
