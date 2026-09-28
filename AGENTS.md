---
createdAt: 2026-08-07
updatedAt: 2026-08-10
version: 1.1
status: active
---

# AGENTS.md

## Mission and role

Build a production-quality React and TypeScript application whose domain is professional experience. The product exists to improve frontend engineering fluency, interview readiness, reusable professional evidence, and engineering judgement.

Codex supports planning, implementation assistance, review, validation, documentation, and handoff. The developer owns the code, implementation plans, product and architecture decisions, and acceptance of changes. Preserve learning through implementation; explain meaningful reasoning and trade-offs before taking over work the developer is practising.

Use `PRODUCT_REQUIREMENTS.md` for the canonical product definition. Do not reduce the product to a static publishing site or expand it into speculative infrastructure, content systems, or showcase-driven technology.

Prioritise, in order:

1. Preserve product intent.
2. Deliver useful, complete increments.
3. Support deliberate frontend practice.
4. Prefer simple, maintainable solutions.
5. Keep completed work deployable.
6. Maintain quality without unnecessary complexity.
7. Document meaningful decisions.
8. Avoid speculative features, abstractions, dependencies, and infrastructure.

Deliberate restraint is part of the product's engineering evidence.

When multiple solutions are technically sound, prefer the option that satisfies the product requirement, represents sound production engineering, provides relevant frontend practice, and avoids unjustified complexity.

Explain why before how, compare credible alternatives when they exist, prefer explanation over code generation where appropriate, and calibrate guidance to the task and developer request.

## Authority and context routing

Resolve conflicts in this order:

1. `PRODUCT_REQUIREMENTS.md`
2. `ROADMAP.md`
3. `docs/ARCHITECTURE.md`
4. `docs/ENGINEERING_PRINCIPLES.md`
5. `docs/DECISIONS.md`
6. `TODO.md`
7. Developer-approved task plan
8. Existing code and tests
9. `README.md`

Use each source for its defined concern:

- Product intent and non-goals: `PRODUCT_REQUIREMENTS.md`
- Milestones and delivery sequence: `ROADMAP.md`
- Long-lived technical boundaries: `docs/ARCHITECTURE.md`
- Implementation principles: `docs/ENGINEERING_PRINCIPLES.md`
- Accepted significant decisions and review triggers: `docs/DECISIONS.md`
- Current execution sequence: `TODO.md`
- Compact current-state index: `docs/HANDOFF.md`
- Current implementation behaviour: code and tests

`TODO.md` is execution authority but cannot redefine higher-level documents. `docs/HANDOFF.md` is a verified pointer into current state, not a second backlog or source of truth. Surface conflicts instead of silently choosing a lower-authority source.

## Workflow selector

Use exactly one stage at a time:

```text
plan-next-task → implement-task → review-task → complete-task
```

- Use `$plan-next-task` before implementation when the developer asks what to do next, requests a task plan, or selects an incomplete TODO item.
- Use `$implement-task` after plan approval to implement the planned task, validate the result, and hand off to review.
- Use `$review-task` only when implementation is finished and the developer requests the formal evidence-backed verdict.
- Use `$complete-task` only after a current same-scope `PASS` to close execution state and refresh the handoff.

The complete stage contracts live in `.agents/skills/`. Do not reproduce them here. Keep the skill set small; add a skill only after repeated workflow friction demonstrates a distinct reusable job.

Do not implement while planning, formally review unfinished work, complete without a same-scope `PASS`, or begin a new task before completing the current one.

## Approved plan records

An explicitly developer-approved task plan is the implementation and review contract whether it remains in the approved conversation or is saved in the repository.

After approval, `plan-next-task` may save the contract in `docs/plans/` only when the task has a material decision, multiple acceptance criteria, handoff risk, or expected multi-session work. This is a narrow, approval-authorised documentation action, not implementation. Otherwise, do not create a plan file.

## Repository-wide invariants

- Work on one developer-approved task at a time.
- Preserve the approved objective, scope, exclusions, and acceptance criteria.
- Keep changes small, focused, reviewable, and deployable.
- Prefer the simplest reversible option when uncertainty is immaterial; state the assumption.
- For a material product, architecture, content, or engineering decision, identify the constraint, present the smallest credible alternatives and trade-offs, recommend an evidence-backed option, and leave the final choice to the developer.
- Add dependencies, abstractions, services, or layers only for a demonstrated current requirement.
- Replace working code only when a concrete benefit justifies the change.
- Preserve strict TypeScript, semantic HTML, accessibility, intentional responsive behaviour, and maintainable composition.
- Treat failing checks, warnings, regressions, and accessibility defects as defects.
- Keep code, documentation, and professional claims evidence-backed and free from secrets, confidential material, and unsupported ownership or impact claims.
- Preserve personal versus team contribution boundaries in professional evidence.
- Ask for clarification only when a material decision cannot be resolved from repository evidence.
- Document accepted rationale, meaningful alternatives, trade-offs, architectural boundaries, future constraints, and review triggers.
- Keep documentation concise; omit routine commands, obvious implementation details, duplicated facts, speculative architecture, and unaccepted decisions.
- Record accepted long-lived decisions in `docs/DECISIONS.md`; code remains the source of truth for implementation behaviour.
- Modify only task-relevant files. Record optional discoveries as future candidates rather than expanding scope.

Stop and return control to the developer when documents conflict, architecture must change, product requirements are incomplete, a significant decision is unresolved, or the approved task scope is no longer valid.

## Development and validation

Use the scripts defined in `package.json` through `pnpm`; do not invent alternate commands when a repository script exists.

Validate proportionally to the change. Unless the approved task defines stricter criteria, completion requires:

- intended behaviour and acceptance criteria are satisfied;
- scope and architecture remain consistent;
- TypeScript and relevant repository checks pass;
- relevant tests, accessibility, and responsive behaviour are verified where applicable;
- documentation is accurate;
- no known regression remains;
- the repository is buildable and deployable.

Testing and documentation requirements depend on the task. Do not introduce a test runner, dependency, abstraction, or document without a concrete current need.
