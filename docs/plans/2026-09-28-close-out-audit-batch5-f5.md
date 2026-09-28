---
title: Close out the audit — Batch 5 remainder + F5
status: approved
createdAt: 2026-09-28
---

# Close out the audit — Batch 5 remainder + F5

Approved plan. Implementation and review contract for this task.

## Project position

- **Completed:** Batch 5's G1 and H5 closed with `PASS`, committed `b86d3e2`. Batches 1–4 fully closed.
- **Current:** Milestone 5 (Evidence-Driven Evolution, ongoing). This bundles every remaining audit item — G2, G4, G8, G9, G10, G11, F5 — into one task, mirroring Batch 3's precedent (S1–S5 delivered as one `PASS`). Bundled at the developer's request to reduce planning granularity for the remaining low-ROI items.
- **Next outcome:** Closes the entire 2026-09-27 CSS/markup consistency audit. No further audit-derived work remains after this.
- **Workflow stage:** Approved by developer 2026-09-28. Not yet implemented.

## Product objective and roadmap milestone

Finishes the developer-directed CSS/markup consistency audit under Milestone 5.

## Task objective and current evidence, with recommendation per finding (all approved as-is)

| ID | Finding (verbatim from audit) | Evidence checked | Recommendation |
|---|---|---|---|
| **G2** | `.experience__contributions` numbers a list 01, 02, 03… but the contributions aren't a sequence. | `ExperiencePage.css:117–136` — confirmed live counter (`counter-reset`/`counter-increment`/`::before`). No test or e2e spec touches the counter or grid layout. | **Fix.** Replace the numbered counter with the accent-bar-border treatment already used by `.project-page__outcomes-list` (same role: a list of non-sequential statements) — remove the counter rules and two-column grid, add `border-inline-start` + `padding-inline-start`. |
| **G4** | Middle-dot meta strings ("Company · years · location"). | `ExperiencePage.tsx:12,46` — the audit's own text already says "Acceptable as-is." | **Confirmed, no action.** Matches the audit's own lean; not a defect. |
| **G8** | Timeline dot has a one-off glow ring (`box-shadow`). | `ExperiencePage.css:59` — small, deliberate-looking accent on the current-role marker. | **Confirmed, no action.** Per this repo's own principle ("replace working code only when a concrete benefit justifies the change"), keep it. |
| **G9** | The 3px accent bar is padded 24px in the section-nav vs 16px in the outcomes list. | `patterns.css:128` (`.section-nav__link`, `--space-3`) vs `patterns.css:200` (`.project-page__outcomes-list`, `--space-2`). | **Confirmed, no action.** Different roles — a clickable nav link needs a larger touch/click target than a bullet's text indent. |
| **G10** | `--color-border-subtle` (1.99:1) and `--color-accent-border` (2.32:1) contrast, used on card/tag/header-button borders. | `tokens.css` — every one of these borders sits alongside text, so the border is never the sole identifier of the control. | **Confirmed, no action.** Matches the audit's own lean ("likely acceptable"). |
| **G11** | 12px text carries primary navigation and every button. | `shell.css` — a real-viewing-distance call the audit explicitly leaves to the developer. | **Confirmed, no action** (developer default). |
| **F5** | Inter requests the `opsz` axis (14..32) for a single weight. | `index.html:11` — Inter is now requested at **two** weights (400, 500; the F2 fix added 500 after this finding was written), so the premise is stale. | **Confirmed, no action** — finding superseded by F2's later fix; `opsz` across two weights is normal variable-font usage. |

## Scope

In scope:
- `src/pages/ExperiencePage.css` — G2's fix (the only code change in this task).
- `docs/audit/2026-09-27-visual-css-consistency.md` — mark G4, G8, G9, G10, G11, and F5 resolved with a one-line "confirmed, no action" note each, same as how G6/G7/T11/T12 were closed earlier in this audit.

Explicit exclusions:
- No change to `ExperiencePage.tsx`, contribution content, or any other file.
- No revisiting of X1–X6 or any already-closed Batch 1–4 finding.

## Assumptions, risks, blockers

G8, G9, G10, and G11 were judgment calls recommended as "no action" and approved as-is by the developer. No blockers.

## Completion criteria

1. "Selected contributions" no longer renders numbered markers; reads as one continuous accent-bordered list, matching `.project-page__outcomes-list`.
2. `docs/audit/2026-09-27-visual-css-consistency.md` shows every remaining finding (G2, G4, G8–G11, F5) marked resolved.
3. `pnpm typecheck`, `pnpm test`, `biome check src`, `pnpm build` pass; no new accessibility violations.
4. Manual visual check of the Experience page (desktop and mobile) confirms G2's new treatment.

## Implementation sequence

1. `ExperiencePage.css`: apply G2's fix.
2. Update the audit doc to mark G4, G8, G9, G10, G11, F5 resolved with a short rationale each.
3. Run `pnpm typecheck`, `pnpm test`, `biome check src`, `pnpm build`; manually verify the Experience page.

## Validation

Automated: typecheck, unit/component tests, lint, build. Manual: visual check of Experience's "Selected contributions" lists.
