---
name: implement-task
description: Implement one developer-approved Professional Site task from an accepted plan. Use after plan-next-task approval when the developer asks to implement the planned work. Preserve the approved scope, escalate material decisions, validate the result, and hand off to review-task without issuing the review verdict.
---

# Implement Task

## Purpose

Implement one small, developer-approved task from the `plan-next-task` workflow. Treat the approved plan as the implementation contract while preserving developer ownership of product, architecture, and material engineering decisions.


## Preconditions

Before changing files:

1. Confirm that the developer has explicitly approved a plan produced by `plan-next-task`.
2. Locate the approved plan in the conversation or its authorised `docs/plans/` record. Do not infer the task contract from the current diff, TODO item, or implementation request alone.
3. Confirm the plan's objective, scope, exclusions, assumptions, completion criteria, and validation requirements remain current.
4. Inspect relevant repository state and existing implementation evidence, including current changes, so user work is not overwritten.
5. If the plan is missing, unapproved, stale, or inconsistent with repository evidence, stop and return control to the developer. Ask for planning or plan revision rather than implementing by assumption.

## Inputs

- The explicitly developer-approved task plan.
- The developer's implementation request and bounded follow-up decisions.
- Relevant product, roadmap, architecture, decision, handoff, code, test, and repository-state evidence.

## Responsibilities

1. Keep the approved plan as the single source of implementation scope and acceptance criteria.
2. Route authority through the project rules: product requirements, roadmap, architecture, engineering principles, decisions, TODO, approved plan, then implementation evidence.
3. Implement the smallest coherent sequence that satisfies the approved objective and completion criteria.
4. Preserve existing behaviour outside the approved scope and avoid unrelated cleanup, refactoring, features, dependencies, or infrastructure.
5. Follow the repository's existing React, TypeScript, semantic HTML, accessibility, responsive, testing, and composition patterns.
6. Update task-relevant tests and documentation when required by the plan or by the changed behaviour; keep professional claims accurate, evidence-backed, and confidentiality-safe.
7. Explain meaningful implementation choices and trade-offs when they affect maintainability, behaviour, accessibility, or validation.
8. Keep personal and team contributions distinct in professional evidence and do not invent unsupported content.
9. Use the repository's `package.json` scripts through `pnpm` for validation; choose the smallest relevant checks first, then broaden them when the change warrants it.
10. Investigate failures with evidence, fix defects introduced by the implementation where the cause is clear, and rerun the relevant validation.
11. Record optional discoveries as future candidates rather than expanding the current task.
12. Preserve the developer's ownership of unresolved product, architecture, and material engineering decisions.

## Implementation sequence

1. Establish the baseline: inspect the relevant files, current tests, repository status, and existing behaviour.
2. Map each planned completion criterion to the implementation area and intended evidence.
3. Implement the approved change in small, reviewable steps.
4. Check the changed behaviour and nearby boundaries, including keyboard interaction, semantics, responsive layouts, and error states where applicable.
5. Run the plan's required validation and proportional repository checks.
6. Review the diff for scope, accidental changes, unsupported claims, dead code, warnings, and documentation consistency.
7. Report what changed, what was validated, and any explicit blockers or decisions required.

## Debugging

When implementation exposes a defect:

1. Reproduce the exact symptom with the smallest reliable feedback loop before changing the suspected cause.
2. Form falsifiable hypotheses and test one variable at a time where practical.
3. Make the smallest root-cause fix within the approved scope.
4. Rerun the original reproduction and add or update a regression check at the relevant public boundary when justified by the task.
5. If the fix requires broader scope, a new dependency, an architectural change, or an unresolved decision, stop and escalate instead of silently expanding the task.

## Boundaries

- Do not implement without explicit approval of a current `plan-next-task` plan.
- Do not redefine, silently amend, or approve the plan on the developer's behalf.
- Do not broaden the approved scope or pull in deferred work.
- Do not silently make product, architecture, content, dependency, deployment, or other material engineering decisions.
- Do not overwrite existing developer changes or revert unrelated work.
- Do not add speculative abstractions, infrastructure, dependencies, or tests without a demonstrated task requirement.
- Do not commit changes or create branches.
- Do not perform the formal task review, issue `PASS` or `CHANGES REQUIRED`, or mark the task complete.

## Escalation

Stop and return control to the developer when repository documents conflict, the approved plan is no longer valid, architecture or deployment must change, product requirements or professional evidence are incomplete, a significant decision is required, or acceptance cannot be demonstrated within the approved scope.

State:

- the evidence and affected plan criterion;
- the impact and why implementation cannot safely continue;
- the smallest credible alternatives and trade-offs; and
- the decision, clarification, or plan revision required.

Recommend an option when repository evidence supports one, but leave the material decision to the developer. Do not modify implementation or task state merely to avoid escalation.

## Output

When implementation is complete, provide a concise handoff containing:

1. The approved objective and implementation result.
2. Task-scoped files or areas changed.
3. Completion-criteria traceability, where useful.
4. Validation performed and its outcome.
5. Any remaining blockers, assumptions, warnings, or future candidates.
6. A clear statement that the implementation is ready for `review-task`, without a review verdict.

If implementation is incomplete, report the exact blocker and the work still required instead of claiming readiness.

## Completion criteria

- The approved objective and scope are implemented without unrelated changes.
- Every applicable plan completion criterion is satisfied or has an explicit blocker.
- Relevant tests, accessibility, responsive behaviour, documentation, and repository checks are validated proportionally.
- No known implementation-caused regression remains.
- Material decisions remain developer-owned and documented when accepted.
- The implementation is ready for formal `review-task`, but has not been formally reviewed or marked complete.
