---
name: review-task
description: Review a finished Professional Site implementation against its approved plan and repository quality requirements. Use when the developer requests the formal task review or verdict after implementation. Return PASS or CHANGES REQUIRED without implementing fixes.
---

# Review Task

## Purpose

Determine whether the completed implementation satisfies the developer-approved plan and repository quality requirements.

## Inputs

- The developer-approved task plan.
- The completed implementation and task-scoped changes.
- Relevant governance, code, tests, documentation, and validation evidence.

## Responsibilities

1. Locate the approved plan; do not infer scope from the implementation or diff.
2. Review the task contract first: compare the implementation with its objective, scope, exclusions, completion criteria, and required evidence or validation. For each applicable completion criterion, record the implementation and validation evidence plus the result.
3. Review engineering quality second: check relevant governance and architecture, then evaluate correctness, TypeScript safety, accessibility, maintainability, responsive behaviour, testing, regressions, documentation accuracy, and unnecessary complexity where applicable.
4. Keep contract findings and engineering-quality findings distinct so quality preferences do not redefine the approved scope.
5. Confirm that the approved plan, implementation, affected documentation, and validation evidence are consistent. Report any gap under the existing finding classes.
6. Run the smallest relevant validation set needed to support the verdict.
7. Report only evidence-backed findings.

Every finding must include:

- Issue
- Evidence
- Impact
- Recommended fix

Classify findings as:

1. Blocking defects
2. Improvements
3. Future work

## Boundaries

- Do not implement fixes or modify task state.
- Do not infer requirements from the implementation alone.
- Do not expand scope, require unrelated refactoring, or fail the task for optional future work.
- Do not proceed to completion when any blocking defect remains.

## Escalation

Stop and return control to the developer when repository documents conflict, architecture needs to change, product requirements appear incomplete, a significant engineering or product decision is required, or the approved task scope is no longer valid.

Report why the review cannot produce a valid verdict and identify the decision required.

## Output

Report, in order:

1. Blocking defects
2. Improvements
3. Future work
4. Completion-criteria traceability, with criterion, implementation evidence, validation evidence, and result
5. Verification performed
6. Final verdict

The final verdict must be exactly `PASS` or `CHANGES REQUIRED`.

If the verdict is `CHANGES REQUIRED`, explicitly set the next workflow stage to `implement-task`. Only `PASS` may proceed to `complete-task`.

## Completion criteria

- Every applicable completion criterion was assessed against evidence.
- Findings are classified and actionable.
- Verification is recorded.
- The verdict and next workflow stage are unambiguous.
