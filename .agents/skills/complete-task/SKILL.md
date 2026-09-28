---
name: complete-task
description: Complete one accepted Professional Site task. Use only after review-task returns a current same-scope PASS and the developer asks to close or complete the task. Verify final state, update execution documentation, and refresh the concise handoff without planning the next task.
---

# Complete Task

## Purpose

Close the accepted task cleanly without beginning or planning another task.

## Inputs

- The developer-approved task plan.
- A `PASS` verdict from `review-task`.
- The accepted implementation and final repository state.

## Responsibilities

1. Confirm `review-task` returned `PASS` for the approved plan.
2. Confirm the completion criteria and relevant final validation results.
3. Verify the repository remains working and deployable.
4. Update `TODO.md` to record the completed task.
5. Update documentation only where the accepted implementation made it inaccurate.
6. Record accepted significant decisions in `docs/DECISIONS.md` when appropriate.
7. Identify the next task candidate from current execution state without planning it.
8. Update `docs/HANDOFF.md` as a compact current-state index for the next `plan-next-task` invocation.
9. Report completion, validation, documentation changes, and known non-blocking limitations.
10. Once every completion criterion is satisfied and validation is green, commit the task's changes to git with a short Conventional Commits (v1.0.0) message, as the final action.

## Boundaries

- Do not implement fixes or close a task without `PASS`.
- Do not plan the next task or create a detailed next-task plan.
- Do not introduce architecture or make new product or engineering decisions.
- Do not modify unrelated files.
- Do not push.
- Do not begin the next workflow stage.
- Commit only the task's own files: the reviewed implementation plus this stage's own documentation updates (`TODO.md`, `docs/HANDOFF.md`, and any doc the task touched). Check `git status`/`git diff` before staging and stage those paths explicitly — never `git add -A` or `git add .` — so an unrelated in-progress change elsewhere in the working tree is never swept in.
- If validation fails, or the working tree holds anything beyond the task's own files that can't be safely excluded, stop and surface it instead of committing.

## Handoff contract

Keep `docs/HANDOFF.md` concise and replace its current-state content rather than accumulating history. Include only verified information:

- completed outcome;
- next task candidate copied exactly from current `TODO.md`;
- current roadmap milestone and workflow state;
- direct pointers to relevant implementation and governance evidence;
- blockers;
- task-specific constraints or deferred work not already captured by the referenced authorities.

Use `None` where a field has no applicable value. Prefer pointers over copied explanations. Do not include roadmap text, architecture summaries, diffs, validation logs, commit history, detailed implementation instructions, or a plan for the next task. `TODO.md` remains execution authority; the handoff is a progressive-disclosure index.

## Escalation

Stop and return control to the developer when repository documents conflict, architecture needs to change, product requirements appear incomplete, a significant engineering or product decision is required, or the approved task scope is no longer valid.

Any material change after `PASS` invalidates that verdict. Return the changed implementation to `review-task`; do not close the task until the current repository state has a matching `PASS`.

## Commit format

Conventional Commits v1.0.0, one line, no body: `type(scope): short imperative description`. Pick `type` from the change's nature (`feat`, `fix`, `refactor`, `docs`, `test`, `chore`, etc.) and `scope` from the affected area (a route, component, or doc set). Keep it short — this is a closing commit for an already-reviewed change, not a place to re-explain the task; the plan, review, and `TODO.md` entry carry the detail. Append this repository's standing attribution trailer if one is configured for commits in this session.

## Output

State:

1. Completion result
2. Validation confirmed
3. Execution and documentation updates
4. Known non-blocking limitations
5. Handoff update
6. Next task candidate, without scope or implementation planning
7. The commit made (message and included files)

The commit is the final action. The task and workflow end here.

## Completion criteria

- The accepted task satisfies its approved plan.
- Final relevant validation passes.
- `TODO.md` and affected documentation are accurate.
- `docs/HANDOFF.md` accurately indexes the completed outcome and next task candidate.
- Accepted significant decisions are recorded where necessary.
- The repository remains deployable.
- The next task has not been planned or started.
- The task's changes are committed with a Conventional Commits-formatted message; nothing outside the task's own files was included.
