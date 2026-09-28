---
title: Long-form content resilience
status: approved
createdAt: 2026-09-24
updatedAt: 2026-09-24
---

# Long-form content resilience

## Objective

Verify Experience, Selected Projects, and Case Studies under realistic long-content and rendering stress conditions, and correct only demonstrated layout inconsistencies. Preserve approved professional copy and the restrained editorial system.

## Project position

- **Completed:** The combined editorial review for Experience, Selected Projects, and Case Studies is marked complete in `TODO.md`; the production-only analytics rollout is also reviewed and closed.
- **Current:** Milestone 5 — Evidence-Driven Evolution. The remaining content-resilience checks are the next incomplete UX queue item.
- **Next outcome:** Clear the remaining long-form resilience work; the next incomplete TODO item is production layout review.
- **Workflow stage:** Approved for implementation and validation. The developer reports having manually tested in Safari, Chrome, and Firefox.

## Product objective

Support job applications, maintain frontend engineering fluency, and demonstrate engineering judgement through readable, resilient professional evidence.

## Scope

- Stress-test Experience, Selected Projects, and Case Studies with long headings and link labels, fallback fonts, overridden text spacing, and 320 CSS-pixel reflow.
- Verify representative desktop, mobile, 200% zoom, and reduced-motion layouts.
- Correct confirmed inconsistencies using existing tokens and shared patterns only.
- Preserve approved copy, claims, and evidence boundaries.

## Exclusions

- No professional-copy or claim changes, new tokens/components/dependencies, broad accessibility rework, or unrelated route changes.
- No Playwright browser-project expansion: the developer reports that manual checks have been performed in Safari, Chrome, and Firefox.
- No styling changes without an observed inconsistency.

## Completion criteria

1. The specified stress conditions have been manually checked on all three named browsers; no clipping, unintended overflow, or loss of readable hierarchy remains.
2. Any demonstrated issue is corrected with existing styling patterns, without changing approved content or evidence boundaries. If no issue is found, no styling change is required.
3. Desktop, mobile, 200% zoom, 320px reflow, and reduced-motion checks show no regression.
4. Existing automated checks pass: `pnpm test:e2e`, `pnpm validate`, and `pnpm build`.

## Implementation and validation sequence

1. Use the developer-reported manual Safari, Chrome, and Firefox checks as the cross-browser evidence; repeat a case if its coverage is uncertain or a code change affects it.
2. Correct only confirmed layout issues in the three route-owned styles or relevant shared styles.
3. Run the existing Playwright E2E suite (currently Chromium-only), `pnpm validate`, and `pnpm build`.
4. Review the rendered result and report any manual browser evidence not independently reproducible in the repository.
