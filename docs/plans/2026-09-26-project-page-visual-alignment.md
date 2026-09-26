---
createdAt: 2026-09-27
updatedAt: 2026-09-27
version: 1.0
status: approved
---

# Project-Page Visual Alignment

**Governing decision:** `docs/DECISIONS.md`, "Adopt the flattened Work index (Option A) with project pages under `/work` — 2026-09-26."
**Visual reference:** `docs/evidence/2026-09-26-option-a-prototypes/project-page-desktop.png` and `project-page-mobile.png`.
**Relation to `TODO.md`:** Implements "E. Project-page visual alignment."

## Objective

Make `/work/<slug>` pages match the project-page prototype's visual treatment without changing structure or routing.

## Current evidence

- The empty band above the tags comes from `.project-page__tags` having `margin-block-start: var(--layout-section-gap)`, stacked on the layout's own `--space-4` top margin.
- The section nav uses uppercase mono links, has no visible label, and is named with `aria-label="Sections"`.
- Section `h2`s are serif at `--font-size-heading-md`; the summary is upright body-lg sans; the back link inherits the global underline.
- The mobile prototype shows the inline nav wrapping under the title and summary, before the tags. The current DOM order already matches.

## Scope

**In scope:** `src/components/ProjectPageLayout.tsx`, the `.project-page__*` rules in `src/styles/patterns.css`, and the tests that query the nav name.

- Remove the empty band between the summary and the tags.
- Section nav: visible "On this page" label; sentence-case links with no underline; a left accent bar on the active item in the rail; inline and wrapping on mobile.
- Section `h2`s (and the "Continue exploring" heading) as small uppercase mono labels.
- Summary in italic serif.
- Back link without underline.

**Exclusions:** Role and Constraints stay named sections; the hero rule, `56rem` breakpoint, gallery, and lightbox are unchanged; no copy changes; no new dependencies or tokens unless an existing one cannot express the treatment; no nav extraction (Task F); no Work index restyle; no change to the "Continue exploring" links.

## Assumptions

1. The nav is labelled by the visible "On this page" text through `aria-labelledby`, replacing `aria-label="Sections"`. Tests that query the `"Sections"` name are updated; Task F inherits the new name.
2. The "Continue exploring" heading takes the same small mono label style as the section headings, matching the prototype.
3. Existing hover and focus states are kept because the prototype does not show them.

## Completion criteria

| Criterion | Evidence |
|---|---|
| No visible empty band between the summary and the tags | Desktop and 320 px screenshots against the prototype; measured gap check |
| Nav shows "On this page", sentence-case links without underline, and a left accent bar on the active item in the rail; inline and wrapping on mobile | Screenshots; component test for the nav name and `aria-current` |
| `h2`s, summary, and back link match the prototype treatment | Screenshots and computed-style spot checks |
| Role and Constraints sections, hero rule, `56rem` breakpoint, and lightbox unchanged | Existing component and e2e tests pass |
| No regressions in scroll-spy, keyboard focus, or 320 px overflow | Updated section-nav e2e tests; manual keyboard check |

## Validation

`pnpm typecheck`, `pnpm check` (scoped if the known unrelated `.claude/settings.local.json` formatting failure recurs), `pnpm test`, `pnpm build`, `pnpm test:e2e`; manual visual comparison at desktop and 320 px.
