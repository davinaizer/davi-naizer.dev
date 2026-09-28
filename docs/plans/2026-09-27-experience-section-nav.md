---
createdAt: 2026-09-27
updatedAt: 2026-09-27
version: 1.0
status: complete
---

# Experience Page Section Navigation

**Relation to `TODO.md`:** Implements "F. Experience page section navigation."

## Objective

Give `/experience` an in-page role navigation that reuses the project-page section nav, so a recruiter can jump straight to a role. Project-page behaviour and appearance do not change.

## Current evidence

- The nav markup and scroll-spy (`useActiveSectionId`) live inside `src/components/ProjectPageLayout.tsx`; the nav and layout styles are `.project-page__nav*` and `.project-page__layout` in `src/styles/patterns.css`.
- Each Experience entry is an `<article id={entry.slug}>`, so anchors already exist.
- Slugs are long, and company names repeat ("Self-employed", "Gamesys"), so neither is a usable label alone.

## Decisions

- **Link label (developer-approved, option A):** `Company · years`, for example `The Signal Group · 2023–2024`. Years are derived from the existing `MM/YYYY` strings; no content-model change. The current role reads `… · 2025–Present`; identical start and end years collapse to one year.
- **Amendment (developer-directed, after implementation):** each entry's Technologies list moves above its summary and entries become single-column, giving the text more horizontal space.
- **Stale-highlight fix deferred:** the scroll-spy behaviour is extracted unchanged. Recorded as a future candidate.

## Scope

**In scope**

- Extract a shared `SectionNav` component (including the scroll-spy hook) from `ProjectPageLayout`.
- Rename the nav and two-column layout styles to neutral shared names in `patterns.css`, keeping the look unchanged.
- Add the nav to Experience: sticky right rail above `56rem`, inline and wrapping below, one link per entry, active entry highlighted on scroll.
- Focused unit and browser coverage.

**Exclusions:** the stale-highlight fix; content or timeline restyling; the commented-out earlier-career block; new dependencies; route or content-type changes.

## Completion criteria

| Outcome | Evidence |
|---|---|
| Project pages behave and look unchanged. | Existing project-page tests and e2e pass; visual check at desktop and 320 px. |
| Experience shows a nav named "On this page" with one link per entry, in timeline order. | Unit test. |
| Each link targets `#<entry.slug>`; anchors work without JavaScript and from case-study links. | Unit assertion; existing case-study anchor e2e. |
| The active link carries `aria-current` while scrolling. | e2e. |
| Sticky rail above `56rem`; inline and wrapping below. | Manual check at desktop and 320 px. |
| No accessibility regressions. | Existing axe test on Experience passes. |

## Validation

`pnpm typecheck`, scoped `biome check`, `pnpm test`, `pnpm build`, `pnpm test:e2e`. `pnpm validate` still fails only on the known unrelated `.claude/settings.local.json` formatting issue.
