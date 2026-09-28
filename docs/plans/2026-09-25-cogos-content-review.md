---
title: Canonical content alignment and CogOs content review
status: approved
createdAt: "2026-09-25"
updatedAt: "2026-09-25"
---

# Canonical content alignment and CogOs content review

## Project position

- **Completed:** Milestones 1–4, analytics, UX refinement, long-form content resilience, and the Case Studies/Experiments split.
- **Current:** Milestone 5 — Evidence-Driven Evolution. The canonical source is `/Users/naizer/Workspace/resume-builder/source/canon-resume`.
- **Next outcome:** Align the public professional projection with the canonical resume, then produce a full website-content review report identifying potential CogOs-style changes.
- **Workflow stage:** Approved implementation.

## Objective

Reconcile the public professional summary and matching experience entries with the canonical resume source. Review all public website content except the PDF resume against the CogOs writing style, apply only high-confidence canonical updates, and record potential style changes without rewriting site-specific evidence narratives automatically.

## Scope

- Update matching professional summary and experience content in `src/content/professional-content.ts`.
- Preserve site-specific content where it does not contradict the canonical source.
- Review route, shell, metadata, image, analytics, case-study, and experiment copy, excluding the PDF resume.
- Record applied changes, potential editorial refinements, and high-confidence CogOs-style contradictions in `docs/evidence/2026-09-25-cogos-content-review.md`.
- Update focused tests only if changed copy requires it.

## Exclusions

- Do not inspect, compare, modify, or report on `public/davi-naizer-resume.pdf`.
- Do not remove site-only earlier-career entries solely because they are absent from the resume source.
- Do not rewrite Case Studies or Experiments into resume entries.
- Do not introduce new claims, metrics, projects, routes, dependencies, or architecture.

## Content decisions

- Canonical wording takes precedence for matching summary and professional-experience content.
- Website-specific presentation copy remains local when it adds context without contradicting professional claims.
- Conversational wording is flagged only when there is high confidence that it conflicts with a specific CogOs principle; natural conversational language is not treated as a defect by itself.

## Completion criteria

- Matching professional content is reconciled against the canonical source.
- Site-only content is retained or changed only with an evidence-based reason.
- The report covers every public website content surface except the PDF.
- The report distinguishes applied canonical updates, high-confidence style flags, optional refinements, and content that should remain unchanged.
- No unsupported claims, confidential content, or inflated ownership is introduced.
- Relevant tests, `pnpm validate`, `pnpm build`, and `git diff --check` pass.

## Validation

- Compare changed content directly with the confirmed canonical summary, professional-experience, and core-skills files.
- Run focused content/page tests, `pnpm validate`, and `pnpm build`.
- Verify the PDF is absent from the report and diff.
- Review the final diff for scope, claim safety, and preservation of unrelated user changes.
