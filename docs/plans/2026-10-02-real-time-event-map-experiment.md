---
createdAt: 2026-10-02
updatedAt: 2026-10-02
version: 1.0
status: approved
---

# Real-time Event Map experiment

## Objective

Create one anonymised, unpublished Experiment that demonstrates recent React and TypeScript work through a time-boxed frontend take-home. Preserve its value as evidence of learning, discovery, trial and error, and engineering judgement without naming the organisation or implying production use or business impact.

## Scope

- Add an unpublished `Project` record titled **Real-time Event Map** with the slug `real-time-event-map`.
- Ground the narrative in the final implementation, `NOTES.md`, and the chronological Git history from the supporting take-home repository.
- Distinguish the supplied brief and API from the developer's architecture, implementation, and technical decisions.
- Cover React, TypeScript, native `EventSource`, React Leaflet, client-side filtering, bounded in-memory state, connection states, deliberate scope choices, limitations, and learning.
- Copy the developer-supplied dashboard screenshot into `public/images/real-time-event-map/` and use it as a portrait gallery visual with accurate alternative text and a restrained caption.
- Keep `published: false` so the draft remains absent from Work, project routing, and the sitemap.

## Exclusions

- Do not name the organisation or include its product name, branding, supplied brief, API hostname, repository link, or live-demo link.
- Do not publish or modify the take-home source code.
- Do not link the Experiment to employment history.
- Do not claim production use, users, business impact, hiring success, company endorsement, custom retry logic, or comprehensive accessibility, responsive, testing, or performance validation.
- Do not add content fields, components, routes, styles, dependencies, tests, or additional visuals without demonstrated need.

## Evidence boundaries

- `NOTES.md` is the primary source for contemporaneous scope, alternatives, decisions, deferred work, and late observations.
- Git history establishes development order, not elapsed implementation time or effectiveness.
- Final code determines implemented behaviour when early notes or the architecture image differ from the shipped solution.
- Reported event rate and profiling observations remain qualified developer observations rather than reproducible benchmarks.
- The repository's `AGENTS.md` records AI assistance as research, pairing, review, debugging, and rubber-duck support; it assigns architecture, scope, technical choices, implementation ownership, and final submission to the developer.

## Completion criteria

1. The Experiment preserves its take-home origin while containing no identifying organisation reference or external source/demo link.
2. Every technical claim is supported by the final code, notes, or history and preserves the distinction between supplied requirements and authored work.
3. The narrative explains the implementation sequence and the reasons for local state, React Leaflet, client-side filters, one SSE owner, native reconnection, and the 500-event cap.
4. Limitations remain explicit: no automated test runner, no runtime payload validation, limited performance evidence, and no production or user outcomes.
5. The screenshot is stored durably, retains its map attribution, and is represented by accurate accessible text.
6. The entry remains unpublished and requires no architecture or content-contract change.
7. Repository validation passes and the diff contains only task-scoped files.

## Validation

- Search the new content and asset path for the organisation name, API hostname, repository URL, and demo URL.
- Confirm the slug is unique across both evidence collections.
- Run `pnpm validate` and `pnpm build`.
- Confirm the sitemap/published-content test passes without the new slug.
- Confirm `/work/real-time-event-map` remains unavailable while the entry is unpublished.
- Inspect the copied image at original resolution and verify its attribution and alternative text.
- Compare repository status before and after implementation.
