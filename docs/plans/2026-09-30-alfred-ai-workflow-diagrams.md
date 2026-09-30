---
createdAt: 2026-09-30
updatedAt: 2026-09-30
version: 1.0
status: complete
---

# Add AI-workflow diagrams and correct the AI-assisted workflow copy in the Alfred case study

Developer-directed. Approved and reviewed with `PASS`. Supports PRODUCT_REQUIREMENTS honest, evidence-backed content.

## Objective

Show how Alfred was built with AI agents using two Diagram Panels, and correct the `aiWorkflow` copy so it matches the alfred-ios record: the workflow was built from scratch for Codex using its documentation, then compared with GSD, and only selected patterns were kept.

## Evidence (alfred-ios repository, read 2026-09-30)

- First commits touching `.agents`: 2026-03-18 (skills, workflow packet, machine-readable handoff block).
- 2026-03-23: `verify-ios.sh` introduced as the canonical verification wrapper.
- 2026-03-25: "enforce selector-first stage entry".
- Codex is the agent platform the skills were written for, and the developer used its documentation to learn what it offers and design around it (developer statement). The repo shows this as the `.agents/skills/<name>/` layout, per-skill `agents/openai.yaml`, and `docs/reference/skill-governance-adoption-plan.md` (2026-05-13, titled "Codex-Inspired"), which the developer describes as documentation-based design, not inspiration. `shared/references/skill-authoring.md` (lean `SKILL.md`, explicit `allow_implicit_invocation`, one-hop references) was created the same day.
- 2026-05-16: `alfred-workflow-governance-improvement-plan.md`: "adapt GSD as a process reference, not adopt it as a runtime". Result is `decisions.md` §1.6 with an accepted and a rejected list.
- Skills: nine, each with `evals/evals.json` (4 cases). Routing law, packet contract and re-entry rule are in `docs/governance/decisions.md` (canonical).
- Ordering (git): the Simplified/Full/Diagnostic routing first appears 2026-03-17/18 and the three-stage simplified flow doc on 2026-03-11, both about two months before the GSD comparison (2026-05-16). Request validation before routing was added 2026-03-19, selector-first entry enforced 2026-03-25, and docs-only tasks were pinned to Simplified on 2026-05-09 ("tighten workflow selector docs routing"). So the proportionality guard was Alfred's own design; GSD was compared against it, not the reason for it.
- Developer statement (not in the repo, unverified): the backend co-creator suggested GSD, the developer evaluated it against Alfred's architecture rather than adopting it, and the co-creator later regretted using it on the backend because of its long workflow and token cost. This is secondhand about another person's work and has no measurement behind it, so the copy does not use it. The design principle it supports (proportionate process) is in the copy instead.
- Backend proposal (developer screenshot of the backend repository, PR #3, not in any connected repo): opened by the developer with the PR description dated 4 April 2026, so before the 16 May GSD comparison. It proposes a server-only (`server/*`) version of the same workflow: governance docs, `tools/backend-build|test|verify`, and eight skills (selector, prompt-validator, system-auditor, plan-packet, backend-api-designer, backend-architect, code-reviewer, session-handoff). It deliberately adds no developer/implementation skill ("a defined workflow but flexibility in coding style"), excludes `client/*`, and lists missing backend test coverage as an explicit verification gap. State at screenshot time: Open, 15 commits, merge conflict on `CLAUDE.md`, review requested from the co-creator, zero reviews. It is a proposal, not evidence of adoption.
- Alfred `tools/` (complete set, five scripts): `verify-ios.sh` (build, test, full, debug/release build, widget build, single test target or identifier; serialised with a lock; logs per run; SwiftLint runs first), `validate-agent-skills.rb`, `audit-localizations.rb` (unused string-catalog entries), `generate-ios.sh` (XcodeGen), `generate-build-server.sh` (editor build server). A `Makefile` mirrors the verify modes.
- `validate-agent-skills.rb` checks: frontmatter keys, body length limits, required trigger and disambiguation terms, references to the canonical governance docs, no nested references, no-edit guardrails on non-implementation skills, `openai.yaml` metadata and invocation policy, eval files (focus, coverage tags, positive and negative trigger cases), and the prompt-validator output sections. It does not check packets, status blocks or timestamps.
- Limits found: `.github` holds only issue and PR templates, so there is no CI. SwiftLint enforcement is off by default in `verify-ios.sh` (`VERIFY_IOS_ENFORCE_SWIFTLINT=1` turns it on), although `invariants.md` describes strict enforcement. The copy therefore says nothing about strict lint gating or CI.
- SwiftLens (github.com/davinaizer/swiftlens, README read 2026-09-30): "WIP", 39 commits, 0 stars, Apple Silicon macOS only, deterministic syntax-tree rules (five built-in packs such as feature-isolation and dependency-direction), no documented real-world use. It is not part of Alfred: no `.swiftlens.yml` in the repo and no SwiftLens step in `verify-ios.sh` (a technology-stack audit doc lists one that does not exist). Prior art exists (Harmonize, SwiftLint custom rules), so no claim of novelty.
- GSD (github.com/open-gsd/gsd-core): five phases (Discuss, Plan, Execute, Verify, Ship), fresh-context subagents, `STATE.md`/`CONTEXT.md`, parallel execution waves. MIT.
- The only validator is `tools/validate-agent-skills.rb`. It checks skill frontmatter, `openai.yaml` sync, invocation policy, canonical-doc references and eval coverage tags. A grep found no packet, status-block or timestamp checks.

## Audience

Recruiters, hiring managers and engineering managers. The section should say what the system is, what it does, and why it is built that way. No dates or history; the design basis (Codex documentation) and the GSD comparison are one short closing statement.

## Problems in the current copy

1. Last sentence ("later found it resembled practices used at larger organisations; I did not copy it from a reference") is contradicted by the May 2026 comparison plans.
2. "scripts check the packet, status blocks, routing decisions, document timestamps" is not supported by the validator found. **Developer to confirm** whether other checks exist; the draft uses the narrower wording.
3. Terms such as "workflow packet" and "skills" are internal jargon and are not explained. The draft drops "packet" and defines "skill" once.
4. The outcome detail says "validation scripts"; only one was found.

## Draft copy (`aiWorkflow`, two paragraphs)

> Much of Alfred's code was written with AI coding agents, so I built the rules they work under. Every task starts with a router that classifies it: Simplified for small contained changes, Full for user-facing or cross-cutting features, and Diagnostic when the cause of a problem is unclear. Small changes take the short path, and the longer routes are used only when a task's complexity or uncertainty calls for them. Each route runs through separate stages, and each stage has its own written instructions for the agent (a "skill"): plan, UX, architecture, implementation, review, and handoff. A stage that lacks the previous stage's output sends the task back to the router. Only the implementation stage changes code; the handoff stage only updates documentation.
>
> Work is not finished until the repository's verification script passes, and a review checks the change against the project's architecture rules, for example that all navigation goes through a single router. If verification fails twice, the task goes back to the auditor or the router instead of getting another attempt. Progress is kept in repository documents rather than chat history, so a task can resume in a fresh session. A validation script checks each skill's structure, required guardrails, and evaluation coverage, and each skill has evaluation cases. I set the scope, acceptance criteria, and checks, and reviewed what the agents produced. I designed the skills for Codex, working from its documentation on skills, instructions, and invocation. I later compared the result with GSD, an open-source agent workflow framework. Instead of adopting it wholesale, I read it against Alfred's architecture and kept phase sequencing, durable state, fresh-context handoffs, and bounded re-entry after failed verification. I rejected its large command set, auto-approval, and parallel implementation, because each would add a second authority over routing and verification and more process than small tasks need.

Outcome detail edit: "validation scripts" becomes "the validation script".

**Decisions recorded 2026-09-30:** two diagrams (simplified route and full route); the co-creator is not credited for the GSD suggestion; the backend workflow PR was never adopted and stays out of the copy; whether to mention SwiftLens is open (below).

**SwiftLens: out of scope (decided 2026-09-30).** It is a separate, unfinished prototype (one rule type, not wired into Alfred's verification, no measured effect), so it adds little for the reader and invites questions the evidence cannot answer. It stays a candidate for a separate Experiments entry after its README and plan fixes; that would be its own plan.

**Still to confirm:** nothing blocks approval. The validation wording matches the script.

## Diagrams

Both use the Diagram Panel spec: no fill on `--color-background`, radius 0, `--color-border-subtle` panel border, filename-only title bar, active node `--color-accent` border at `--border-width-accent` with `--color-text-primary`, inactive `--color-border-strong` with `--color-text-secondary`, no shadow, gradient or motion, no horizontal scroll at hero width.

The system is shown as a simplified-versus-full pair, matching the enrichment pipeline diagram. Verification is not a node; it sits inside Implement and Review.

### D1 `simplified-route.flow` (5 nodes)

| # | Label | Detail |
| --- | --- | --- |
| 1 | Route | Router classifies the task |
| 2 | Plan | Scope and acceptance criteria |
| 3 | Implement | Approved plan only |
| 4 | Review | Architecture rules checked |
| 5 | Handoff | Documentation updated |

### D2 `full-route.flow` (6 nodes)

| # | Label | Detail |
| --- | --- | --- |
| 1 | Route | Router classifies the task |
| 2 | UX | User flow and states |
| 3 | Architecture | Boundaries and sequencing |
| 4 | Implement | Approved plan only |
| 5 | Review | Architecture rules checked |
| 6 | Handoff | Documentation updated |

Active node in both: Route, the mandatory gate. Captions: D1 covers small contained changes; D2 covers user-facing or cross-cutting features. Neither shows the Diagnostic route (an auditor stage that classifies unclear problems before any plan) or the two-failures re-entry loop; those are in the copy because the panel spec has no back-edges. Alternative if two panels feel repetitive: one D2-only panel with a caption noting that small changes skip UX and Architecture.

## Scope

- Add an optional `diagrams` field to `CaseStudy` (filename, nodes with label and detail, optional active index, caption).
- Add a `DiagramPanel` component: `<figure>`, ordered list for sequence, connectors `aria-hidden`, caption as `<figcaption>`. On narrow screens nodes stack vertically instead of scrolling.
- Render diagrams in `CaseStudyPage` inside the "AI-assisted workflow" subsection.
- Replace `aiWorkflow` and the outcome detail with the approved copy. `aiWorkflow` becomes `readonly string[]` (one paragraph per entry) so it can render as two paragraphs.
- Tests: component renders nodes in order, active node marked, page shows diagrams only when present.
- Record the Diagram Panel decision in `docs/DECISIONS.md`.

## Exclusions

No SwiftLens mention, no backend workflow PR (never adopted), no co-creator credit for GSD. No enrichment-pipeline diagram (co-creator's system; location of that content to be confirmed), no changes to other case studies, no new dependencies or charting library, no motion, no CMS, no claims about defects avoided or time saved.

## Risks

- Changing `aiWorkflow` to an array touches the type, page and any test that reads it.
- A mobile vertical stack changes the panel's look; confirm it is acceptable.
- Contrast of `--color-border-strong` on `#131313` should be checked as part of review.

## Completion criteria

1. Copy matches the alfred-ios evidence above and the developer has confirmed the two flagged items.
2. Both diagrams render at hero width with no horizontal scroll, and stack cleanly on mobile.
3. Active/inactive distinction is visible without colour (border width).
4. Typecheck, lint, unit tests and build pass.
5. `DECISIONS.md` updated.

## Implementation notes (2026-09-30)

- Field is `aiWorkflowDiagrams` (not `diagrams`) to make its scope explicit; `aiWorkflow` is now `readonly string[]`.
- The copy renders as three paragraphs (the plan's second paragraph was split before the Codex/GSD sentences); diagrams sit after the first.
- Decision 7 in the Alfred decisions list now says small changes take the Simplified route, to stay consistent with the five-node simplified diagram.
- Container breakpoint for stacking is 52rem (six nodes need about 52rem to stay in a row without breaking labels).
- Diagram styles are in `src/styles/diagram-panel.css`, imported from `index.css`; `patterns.css` is untouched.
- Validation done: `tsc -b` passes; real component output rendered with Node and checked structurally; layout checked in Chromium from 320px to 1440px (no overflow, equal node sizes, no mid-word breaks). Not run here (package registry blocked in the sandbox, installed packages are macOS-only): `pnpm check`, `pnpm test`, `pnpm build`, `pnpm test:e2e`.

### Review fixes (2026-09-30)

- B1: simplified-route caption now says the verification script runs at the end of Implement and Review checks that it passed.
- I1: "handoff packets" changed to "structured handoffs" in the Alfred outcome text.
- `tsc -b` passes after the change. `pnpm fix`, `pnpm validate` and `pnpm build` still need to be run locally.
