---
title: AI Workflow Migration Plan
status: complete
createdAt: 2026-08-07
updatedAt: 2026-08-07
---

# AI Workflow Migration Plan

## Objective

Refine the project-local AI workflow so it consistently supports developer-owned implementation, deliberate learning, evidence-backed review, and predictable task closure.

Keep the workflow intentionally small:

```text
plan-next-task → implement-task → review-task → complete-task
```

Do not add, merge, rename, or remove skills unless later usage demonstrates recurring workflow friction.

## Approved principles

- The developer owns implementation and significant product, engineering, and architectural decisions.
- AI provides planning, explanation, implementation support, debugging, review, validation, and documentation assistance.
- The approved task plan is the implementation and review contract.
- Each skill has one responsibility and one explicit boundary with the next stage.
- Scope remains small, evidence-backed, and tied to a current product objective.
- Documentation records meaningful state and accepted decisions without duplicating code or routine activity.
- The workflow optimises for engineering capability and maintainability, not autonomy or maximum automation.

## Phase 1 — Refine task planning

**Status:** Complete

Update `plan-next-task` to:

- remove the unsupported handoff dependency;
- select work from explicit developer direction first, then the next valid `TODO.md` item;
- keep roadmap state and higher-level governance as constraints;
- preserve explicit approval, non-implementation, scope, and validation boundaries.

Validation:

- validate the skill package;
- confirm its `agents/openai.yaml` metadata remains aligned;
- run whitespace and patch-integrity checks.

## Phase 2 — Refine implementation skill

**Status:** Complete

Update `implement-task` to:

- calibrate assistance to the developer's requested level;
- protect deliberate implementation practice;
- keep optional discoveries outside the approved task;
- replace unverifiable claims about developer understanding with developer-confirmed readiness for review.

Validation:

- validate the skill package;
- confirm its `agents/openai.yaml` metadata remains aligned;
- run whitespace and patch-integrity checks.

## Phase 3 — Tighten review and completion handoffs

**Status:** Complete

Keep the responsibilities of `review-task` and `complete-task` unchanged while applying the approved contract clarifications:

- remove redundant handoff terminology from `review-task`;
- preserve the approved plan as the sole review baseline;
- clarify that material changes after `PASS` invalidate that review and must return to `review-task` before closure.

Validation:

- validate both skill packages;
- confirm both `agents/openai.yaml` files remain aligned;
- run whitespace and patch-integrity checks.

## Phase 4 — Verify the complete workflow

**Status:** Complete

Review the four skills together to confirm:

- stage responsibilities do not overlap;
- all transitions and stop conditions are explicit;
- developer ownership and decision authority are consistent;
- no unsupported artefacts or specialised skills were introduced;
- `README.md`, `PRODUCT_REQUIREMENTS.md`, `AGENTS.md`, and the skill contracts agree.

Run validation for every skill package and final repository checks. Report any remaining inconsistency without expanding the approved scope.

Verification result: `PASS`. The four skill packages validate, their metadata remains aligned, the workflow authorities agree, and no unsupported workflow artefact or specialised skill was introduced.

## Completion criteria

- All four phases are complete.
- Every skill package validates successfully.
- The workflow remains exactly four stages.
- The approved plan is the implementation and review contract.
- The repository contains no dependency on a nonexistent workflow handoff artefact.
- Developer ownership, learning, scope control, review independence, and documentation discipline are explicit and consistent.
