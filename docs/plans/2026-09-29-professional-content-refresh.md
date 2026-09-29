---
title: Verify and close the professional-content refresh
status: approved
createdAt: 2026-09-29
approvedAt: 2026-09-29
---

# Verify and close the professional-content refresh

Developer-directed and approved 2026-09-29. Milestone 5 — Evidence-Driven Evolution. Supports PRODUCT_REQUIREMENTS 4.1, 4.3, 4.4, and 4.5.

## Objective

Verify and close the existing developer-authored update to professional positioning, resume metadata, and the Alfred case study without expanding product scope. Preserve the current worktree implementation and add only the missing regression coverage and documentation resolution required for handoff.

## Evidence

- The canonical source is `/Users/naizer/Workspace/resume-builder/source/canon-resume`.
- The updated headline and professional-experience projection align with the canonical resume metadata and relevant experience sections.
- The updated document, Open Graph, and Twitter titles use `Senior Frontend Engineer`, matching the canonical title and social-preview role line.
- Alfred-specific governance and engineering claims are corroborated by `/Users/naizer/Workspace/_chaotic-focus/alfred-ios`, including nine agent skills with evaluation files, workflow-packet validation, routing modes, and SignalR implementation.
- Before this task, type-checking, scoped Biome checks, and the Vitest suite passed. The new `aiWorkflow` branch was not exercised because the first synthetic case-study fixture did not include that field.

## Scope

- Preserve the existing developer-authored changes in `index.html`, `public/davi-naizer-resume.pdf`, `src/content/evidence-content.ts`, `src/content/professional-content.ts`, `src/pages/CaseStudyPage.tsx`, `src/pages/CaseStudyPage.test.tsx`, and `src/types/evidence.ts`.
- Add synthetic `aiWorkflow` content to the first case-study fixture and assert the optional heading and paragraph through `CaseStudyPage.test.tsx`.
- Resolve the stale social-preview/title note in the completed Libre Franklin plan.
- Run proportional repository, browser, metadata, and artifact verification.
- Hand off to `review-task`; do not issue the formal review verdict or mark the task complete in this stage.

## Exclusions

- No exact-copy rewrite of the website-specific summary.
- No new case studies, projects, routes, dependencies, schema redesign, CSS changes, or changes to the canonical resume-builder repository.
- No broader content audit, unsupported professional claims, commit, or branch.

## Completion criteria

1. Public title surfaces use `Senior Frontend Engineer` consistently and remain aligned with canonical resume metadata.
2. Updated professional content remains aligned with the canonical resume without weakening contribution or evidence boundaries.
3. Alfred's optional AI-assisted workflow subsection renders correctly and is covered by a fixture-driven test.
4. Case studies without `aiWorkflow` remain unaffected.
5. Relevant checks pass and the repository remains buildable and deployable.
6. Task documentation no longer describes the resolved title mismatch as open, and the implementation is ready for formal review.

## Validation

- `git diff --check`
- `pnpm typecheck`
- `pnpm check` or the documented scoped equivalent if the unrelated `.claude/settings.local.json` formatting failure recurs
- `pnpm test`
- `pnpm build`
- `pnpm test:e2e`
- Manual inspection of the title metadata, Home, Resume, Alfred project page, responsive rendering, and the downloadable PDF artifact.
