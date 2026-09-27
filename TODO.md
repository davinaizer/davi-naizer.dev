---
createdAt: 2026-08-07
updatedAt: 2026-09-27
version: 1.60
status: active
---

---

# TODO

## Purpose

This document tracks the current execution sequence derived from `ROADMAP.md`.

It does not redefine roadmap scope, architecture, or product requirements.

Tasks should be completed in order unless repository evidence or explicit developer direction justifies changing the sequence.

Each task should remain small enough to:

- plan independently;
- implement through `implement-task`;
- review against explicit acceptance criteria;
- complete without starting unrelated work.

Task boundaries should balance developer implementation effort with reliable AI-assisted review:

- Each task should have one primary objective and preferably no more than one material decision.
- Combine implementation with its direct acceptance checks; record those checks as task criteria rather than separate tasks.
- Separate product, architecture, content, or engineering decisions when they materially affect later implementation.
- Separate diagnosis or measurement from remediation when the remediation scope is not yet known.
- Keep the change surface and validation set small enough for `review-task` to assess completely from the approved plan and task-scoped evidence.
- Prefer a separate task when a failure would otherwise return several unrelated concerns to `implement-task`.

---

## Completed Governance

- [x] Create the initial `ROADMAP.md` derived from `PRODUCT_REQUIREMENTS.md`.
- [x] Align the project-local AI workflow and skills with the developer-owned collaboration model.
- [x] Optimise agent guidance discoverability and context efficiency while preserving governance semantics.

---

## Milestone 1 — Application Foundation

### Project Bootstrap

- [x] Initialise and validate the React application with strict TypeScript.
- [x] Configure and validate the development, build, type-checking, linting, and formatting tooling.

### Application Structure

- [x] Establish the initial source structure and application entry boundaries.
- [x] Create the semantic application shell and baseline page composition.
- [x] Establish the MVP route structure and navigation behaviour.
- [x] Verify usable content and navigation with minimal client-side behaviour where practical.

### Styling Foundation

- [x] Define the initial global CSS, design tokens, typography, and spacing primitives.
- [x] Apply the styling foundation and existing design principles to the application shell.
- [x] Establish responsive shell and navigation behaviour.

### Accessibility Foundation

- [x] Establish keyboard-accessible navigation and visible focus behaviour.
- [x] Validate shell semantics, baseline colour contrast, and representative viewport layouts.

### Quality Foundation

- [x] Establish the initial unit/component testing and automated accessibility-validation approach where justified.
- [x] Establish end-to-end testing for a bounded set of critical journeys.
- [x] Configure CI to run the established relevant quality checks.

### Deployment Foundation

- [x] Select the simplest suitable deployment target.
- [x] Configure, deploy, and validate the application foundation using the approved deployment target.

#### Milestone 1 Completion

- [x] Complete Milestone 1 after confirming:
  - the application builds and deploys;
  - strict TypeScript and relevant quality checks pass;
  - baseline accessibility and responsive behaviour are verified;
  - the structure remains understandable and maintainable; and
  - no speculative architecture or unnecessary dependency was introduced.

---

## Milestone 2 — Core Professional Experience

### Content Foundation

- [x] Define the minimum content structure required for core professional information.
- [x] Decide where professional content should live and how it should be represented.
- [x] Add the approved professional identity and summary content.
- [x] Add the approved experience content, résumé, and contact.

### Home

- [x] Implement the Home experience, communicating professional focus within the initial viewport and providing clear routes to relevant core areas.

### Experience

- [x] Implement the career timeline with clear chronology, defensible contribution boundaries, and content suitable for interview preparation and reuse.

### Resume

- [x] Add production-ready access to the current CV.

### Contact

- [x] Add and validate accessible professional contact links.

### Core Navigation

- [x] Connect and validate all core professional areas through consistent keyboard-accessible and responsive navigation.

#### Milestone 2 Completion

- [x] Complete Milestone 2 after confirming:
  - professional identity is understandable within one or two minutes;
  - core content is clear, accessible, responsive, and deployable;
  - professional evidence remains accurate and defensible; and
    - the core profile does not require unnecessary interaction to understand.

### Shared CSS Patterns

- [x] Extract high-confidence shared page styles for the core routes.
- [x] Complete the approved CSS refactor: centralize repeated values, define cascade layers, deduplicate verified evidence-list patterns, remove dead tokens, document the structure, and enforce CSS selector hygiene.

---

## Milestone 3 — Professional Evidence

### Evidence Model

- [x] Define the minimum structure for projects, case studies, and outcomes.
- [x] Define how evidence connects back to experience and professional claims.
- [x] Establish rules for evidence confidence, contribution boundaries, and confidentiality.

### Selected Projects

- [x] Select the smallest set of projects that add distinct evidence.
- [x] Implement the Selected Projects experience.
- [x] Connect projects to relevant experience and capabilities.

### Case Studies

- [x] Define the minimum reusable case-study structure.
- [x] Write and implement one deliberately bounded case study that validates the approved structure.

Add further case studies only when they provide distinct evidence.

### Evidence Connections

- [x] Connect selected projects to the relevant experience and capability context.

#### Milestone 3 Completion

- [x] Complete Milestone 3 after confirming:
  - every evidence area adds useful depth beyond the CV;
  - claims are supported by defensible evidence;
  - personal and team contributions are clearly distinguished;
  - evidence supports interview preparation and professional reuse; and
  - the product has not drifted into a general knowledge-management system.

---

## Milestone 4 — MVP Release Readiness

**Status:** Complete, validated, and approved on 2026-09-15 for the implemented MVP scope.

### Integration

- [x] Review navigation, information architecture, and content hierarchy across all MVP areas.
- [x] Resolve material duplication and inconsistent interaction patterns identified by the integration review.

### Accessibility

- [x] Review keyboard behaviour, focus, semantics, and automated accessibility results across the MVP.
- [x] Resolve material accessibility issues identified by the accessibility review.

### Responsive Behaviour

- [x] Review layouts, readability, and navigation at representative mobile, tablet, and desktop viewports.
- [x] Resolve material issues identified by the responsive-behaviour review.

### Testing

- [x] Review and strengthen test coverage for a bounded set of critical user journeys, then run the complete relevant test suite.

### Performance

- [x] Review production build output and identify any material performance concern within the implemented scope.
- [x] Confirm no measured local build concern requires pre-publication remediation.

Do not optimise without measured need.

### Content Review

- [x] Verify professional claims and contribution boundaries against the canonical resume-builder content.
- [x] Review all public content for confidentiality, accuracy, and presentation quality.
- [x] Validate internal routes and the configured resume, contact, project, and external-link targets.

### Production Readiness

- [x] Validate pre-publication readiness through the production build, relevant automated checks, and product-scope confirmation.
- [x] Approve the implemented MVP for publication follow-up.

#### Milestone 4 Completion

- [x] Complete Milestone 4 after confirming:
  - all MVP areas are complete and coherent;
  - relevant checks pass;
  - accessibility and responsive behaviour are verified;
  - local production build output has no identified material performance concern;
  - public content is accurate and safe to publish; and
  - the application is ready for the separate publication and live-production verification tasks below.

---

## Milestone 5 — Evidence-Driven Evolution

The developer-requested UX review is sufficient evidence for the bounded refinement queue below. Do not add unrelated speculative features to this milestone.

### Priority Analytics

This is the highest-priority Milestone 5 task following the 2026-09-16 decision to establish the smallest defensible, zero-cost analytics baseline for the production site.

The implementation and validation contract is recorded in `docs/plans/2026-09-16-analytics.md`.

- [x] Enable and verify Cloudflare Web Analytics for the production deployment.
- [x] Confirm that the baseline provides useful route, page, referrer, device, and real-user performance signals for the current browser-only site.
- [x] Record the known boundaries: no custom events, UTM attribution, or direct resume/contact-click measurement; no personal information, session replay, or second analytics platform without a demonstrated need.
- [x] Keep the measurement production-only, privacy-minimised, and free of unnecessary dependencies or public-content changes.

Acceptance criteria:

- Cloudflare analytics data is observable for the current production routes and real-user performance where traffic is available.
- The known limitations are explicit, and no unvalidated career or user-intent conclusions are drawn from page views.
- Google Search Console remains the complementary source for search visibility and queries.
- No additional analytics platform is introduced unless a real decision is blocked by the Cloudflare baseline.

Current evidence: `docs/evidence/2026-09-16-analytics-baseline.md` (initial activation) and `docs/evidence/2026-09-24-analytics-manual-rollout.md` (manual production rollout and verification).

### Priority UX Refinement Queue

This queue records the developer-requested UX craftsmanship review from 2026-09-16. It deliberately excludes a broad accessibility rework: the existing semantic, keyboard, focus, contrast, responsive, and automated-accessibility foundations are complete, and the current site scores 100 for accessibility in Lighthouse.

Complete these tasks in order. Preserve the restrained, content-first design and do not introduce decorative animation, additional product areas, or unnecessary dependencies.

The implementation and validation contract for this queue is recorded in `docs/plans/2026-09-16-ux-revamp.md`.

### 1. User Intent and UX Baseline — Complete

- [x] Treat the assumed recruiter, hiring-manager, engineer, and contact-ready journeys as hypotheses and map each one to its intended outcome, entry points, content needs, and likely continuation.
- [x] Inventory the current navigation, text links, primary actions, contact rows, resume download, project and experience links, and footer controls without changing their presentation.
- [x] Record current affordances, target boundaries, hover, active, focus-visible, visited-state relevance, accessible names, route outcomes, and representative keyboard order.
- [x] Capture a representative desktop, mobile, 200% zoom, reduced-motion, and font-loading baseline, distinguishing observed defects from unvalidated assumptions.
- [x] Produce a task-scoped findings record that confirms or narrows the remediation work below; do not implement speculative fixes during the baseline.

Evidence: `docs/evidence/2026-09-16-ux-baseline.md`

Acceptance criteria:

- every proposed UX change traces to a named visitor intent or an observed interaction, content, accessibility, responsive, or performance issue;
- assumptions are labelled and are not presented as user-research findings;
- WCAG 2.2 target-size exceptions are applied correctly rather than treating every inline link as a button;
- Lighthouse and lab measurements are recorded as diagnostics, not claimed as field evidence; and
- the next remediation task is small enough for one implementation and review cycle.

### 2. Interaction Affordance Refinement

- [x] Use the approved baseline findings to normalise only inconsistent navigation, link, action, contact-row, resume-download, and footer interaction treatments.
- [x] Preserve persistent link affordances where context alone does not make interactivity clear, and ensure visual hit areas have unambiguous boundaries and destinations.
- [x] Add short state transitions only where they improve feedback, and provide an explicit reduced-motion fallback.
- [x] Verify that interaction feedback remains clear without relying on motion or colour alone and that existing accessible names and touch targets are preserved.

Acceptance criteria:

- equivalent interactions use equivalent visual feedback;
- state changes feel immediate and restrained rather than decorative;
- keyboard focus remains at least as clear as the current implementation;
- no layout shift, animated entrance, parallax, cursor effect, or new dependency is introduced; and
- relevant component tests and representative keyboard/pointer checks pass.

### 3. Reading Journey Continuity

- [x] Use the confirmed intent map to define the smallest useful set of contextual end-of-page links for the long-form Experience, Selected Projects, Case Studies, and Resume routes.
- [x] Implement one quiet, reusable continuation pattern that clearly names the destination and does not compete with the page content or global navigation.
- [x] Verify route behaviour, keyboard order, responsive wrapping, and deep-link compatibility.

Acceptance criteria:

- long pages no longer end without a useful next step;
- each destination follows the site's information architecture rather than forming a forced linear funnel;
- the pattern uses semantic links and existing typography, spacing, and accent tokens; and
- Home, Work, Contact, and the global footer are not duplicated unnecessarily.

### 4. Long-Form Reading Rhythm and Content Resilience

- [x] Review Experience, Selected Projects, and Case Studies together for paragraph measure, heading separation, metadata hierarchy, section rhythm, and narrow-screen density.
- [x] Test realistic stress cases including long headings, long link labels, fallback fonts, overridden text spacing, and content reflow at 320 CSS pixels.
- [x] Correct only demonstrated inconsistencies using existing tokens and shared patterns before adding any new token or component.
- [x] Verify representative desktop, mobile, 200% zoom, and reduced-motion layouts without changing approved professional copy.

Acceptance criteria:

- narrative copy, supporting metadata, and evidence sections remain visually distinct;
- readable line lengths and hierarchy are preserved across representative widths;
- repeated structures have consistent spacing without flattening meaningful hierarchy; and
- no content claim or evidence boundary changes as part of the visual pass.

### 5. Not-Found Experience Polish

- [x] Bring the existing not-found route into the established editorial visual language.
- [x] Add concise orientation and one clear route back to useful content without adding novelty, illustration, or unnecessary choices.
- [x] Add or update the focused route test and verify direct entry to an unknown URL.

Acceptance criteria:

- the page feels intentional and consistent with the rest of the site;
- visitors can recover with one obvious action;
- the response remains concise, accessible, and responsive; and
- the route introduces no special-case shell or dependency.

### Completed developer-directed Case Studies layout fix

- [x] Keep the Case Studies narrative in one grid column so metadata height does not create a gap before later sections.
- [x] Add focused component and browser regression coverage; pass `pnpm validate`, `pnpm build`, and `pnpm test:e2e`.
- [x] Complete formal review and close the task with `PASS`.

### Completed developer-directed navigation fix

- [x] Restore the destination scroll position to the top for internal route navigation through the shared React Router shell.
- [x] Verify the behaviour from the bottom of a long-form route with a browser-level regression test and the relevant quality checks.

### Preserve Case Studies and repurpose Selected Projects as Experiments

Completed and reviewed with `PASS`. The approved scope and acceptance criteria are recorded in `docs/plans/2026-09-23-consolidate-portfolio-evidence.md`.

- [x] Keep Work as the chooser for professional Case Studies and independent Experiments; preserve `/projects` as the Experiments URL.
- [x] Preserve useful professional Project metadata and Experience links in Case Studies, then remove the duplicate professional Project records.
- [x] Move UV Insect Trap into Experiments with evidence-qualified narrative and optional visuals and reflection.
- [x] Update the home Experiments link, sitemap, current product and engineering guidance, and focused unit and browser coverage.
- [x] Pass `pnpm validate`, `pnpm build`, and `pnpm test:e2e`.
- [x] Complete formal review and close the task.

### Add Atelier Florae as an Experiment

Completed and reviewed with `PASS`. The approved scope and acceptance criteria are recorded in `docs/plans/2026-09-26-atelier-florae-experiment.md`.

- [x] Add the Atelier Florae Project record, public-safe visuals, and focused Experiments page assertions.
- [x] Remove the AI-generated brand board at review; record user-confirmed repeat purchases in the plan's evidence boundary.
- [x] Pass `pnpm validate`, `pnpm build`, and `pnpm test:e2e` (developer-run after the review fix).
- [x] Complete formal review and close the task with `PASS`.

### Project pages within Case Studies and Experiments

Developer-directed. Scope, layout, and constraints are defined in `docs/plans/2026-09-26-project-pages-prd.md` under the 2026-09-26 decision to keep the two evidence areas.

- **Problem:** `/case-studies` and `/projects` render every project in full on one page; there is no single-project page, no scannable list, and no in-page navigation.
- **Evidence:** the live site; the problem grows as Experiments gain UV Insect Trap and Atelier Florae.
- **Objective:** supports job applications (4.1) by giving each project a directly linkable, consistently structured page.
- **Why now:** new Experiments are being added, and each one lengthens the concatenated pages.

Complete these tasks in order. Plan each one separately with `plan-next-task`.

#### A. Project pages and area indexes

**Case Studies — complete.** Delivered and reviewed with `PASS`. The approved scope, the decision to split this task by area, and acceptance criteria are recorded in `docs/plans/2026-09-26-case-studies-project-pages.md`.

- [x] Add `/case-studies/<slug>` routes with a shared `ProjectPageLayout` component: header, section nav, tags strip, body sections, "Continue exploring", and next case study within the area. Hero remains omitted until a case study has a real result image distinct from its gallery (PRD Task C).
- [x] Convert `/case-studies` into a card-grid index linking to the project pages.
- [x] Add the case-study project pages to the sitemap and update `docs/ARCHITECTURE.md` routes.
- [x] Keep existing URLs working; add focused unit and browser coverage; pass `pnpm validate`, `pnpm build`, and `pnpm test:e2e`.

**Experiments — complete.** Delivered per `docs/plans/2026-09-26-experiments-project-pages.md`.

- [x] Reuse the shared `ProjectPageLayout` component for `/projects/<slug>` routes and convert `/projects` into a card-grid index, following the Case Studies pattern.
- [x] Add the experiment project pages to the sitemap and update `docs/ARCHITECTURE.md` routes.
- [x] Keep existing URLs working; add focused unit and browser coverage; pass `pnpm validate`, `pnpm build`, and `pnpm test:e2e`.

#### B. Project-page section navigation

Delivered for Case Studies as part of Task A: sticky right rail above `56rem`, inline and wrapping below it; `IntersectionObserver` scroll-spy tuned against Alfred's ~10 sections; anchor links work without JavaScript. The shared `ProjectPageLayout` component carries this behaviour to Experiments automatically once its Task A routes land — no separate implementation is expected.

- [x] Add the section index: sticky right rail above `56rem`, inline and wrapping below it.
- [x] Highlight the active section on scroll; tune the scroll-spy threshold against real project pages.
- [x] Anchor links work without JavaScript; add focused coverage and pass the standard checks.

#### C. Gallery and lightbox

Completed and reviewed with `PASS`. The approved scope and acceptance criteria are recorded in `docs/plans/2026-09-26-gallery-lightbox.md`.

- [x] Normalise gallery images per kind (`4:3` landscape photos, `1:2` portrait screenshots) with thumbnails as buttons.
- [x] Add a full-size view with caption using the native `<dialog>` element: Escape and click-outside close, focus contained and returned.
- [x] Complete the per-project hero image review and add heroes only where a real result image exists.
- [x] Add focused accessibility and browser coverage; pass the standard checks.

### Completed hero image lazy-loading fix

Closes the non-blocking LCP-timing nicety noted at the Task C review: the hero `<img>` used `loading="lazy"` despite rendering near the initial viewport.

- [x] Change the hero `<img>` in `ProjectPageLayout.tsx` to `loading="eager"` with `fetchPriority="high"`.
- [x] Extend the existing hero test in `ExperimentPage.test.tsx` to assert the new attributes; pass `pnpm typecheck`, `pnpm test`, and `pnpm build`.
- [x] Complete formal review and close the task with `PASS`.

### Apply Option A: Work index and prototype visuals

Developer-directed. Governed by the `DECISIONS.md` entry “Adopt the flattened Work index (Option A) with project pages under `/work` — 2026-09-26.” Visual reference: `docs/evidence/2026-09-26-option-a-prototypes/`. Constraints settled in `docs/plans/2026-09-26-project-pages-prd.md` v4 still apply where the decision says so.

- **Problem:** the implemented project pages kept the intermediate `/work` chooser and area index pages, and the visual treatment does not match the prototypes (for example, an empty band above the tags, underlined card titles, and a different section-nav style).
- **Evidence:** comparison of the local build against the prototypes on 2026-09-26.
- **Objective:** supports job applications (4.1) by reaching any project from `/work` in one step, with one consistent page experience.
- **Why now:** most of the structure already exists; the remaining gap is routing, the index, and visuals.

Complete these tasks in order. Plan each one separately with `plan-next-task`.

#### D. Work card index and `/work/<slug>` routing — Complete

Delivered and reviewed with `PASS`. The approved scope, the card-image decision (option A: a uniform typographic panel with the project name), and the amendment dropping redirects are recorded in `docs/plans/2026-09-26-work-index-routing.md`.

- [x] Turn `/work` into the card index: page lead, then a Case Studies section and an Experiments section, each with a short intro and a two-column card grid (one column on narrow screens), same card treatment in both.
- [x] Cards follow the prototype anatomy: image area at `16:10`, then area eyebrow, serif title (not underlined), one-line summary, and tags; the whole card is one link with a visible focus state and an accent border on hover and focus.
- [x] Resolve the one material decision in planning: what the card image area shows for projects without a real image (option A: a uniform typographic panel with the project name).
- [x] Serve project pages at `/work/<slug>`; back link returns to the matching `/work` section; next-project link stays within the same section in content order.
- [x] Remove the `/case-studies` and `/projects` index and project routes outright; the old URLs render the existing not-found page (no redirects, per the developer's 2026-09-26 direction, since the site had just been published).
- [x] Update Home and any other links to the area pages, the sitemap, and `docs/ARCHITECTURE.md` routes; add a test that slugs are unique across both content types.
- [x] Add focused unit and browser coverage; pass `pnpm typecheck`, scoped `biome check`, `pnpm test`, `pnpm build`, and `pnpm test:e2e` (`pnpm validate` still fails only on the known unrelated `.claude/settings.local.json` formatting issue).

#### E. Project-page visual alignment — Complete

Delivered and reviewed with `PASS`. The approved scope, the `aria-labelledby` nav-name assumption, and acceptance criteria are recorded in `docs/plans/2026-09-26-project-page-visual-alignment.md`.

- [x] Remove the empty band between the summary and the tags strip.
- [x] Section nav follows the prototype: “On this page” label, sentence-case links without underline, and a left accent bar marking the active section; the inline mobile version wraps under the title.
- [x] Section headings use the prototype's small uppercase monospace label style; the summary uses the prototype's italic serif treatment; the back link is not underlined.
- [x] Keep Role and Constraints as named sections, the hero rule, the `56rem` breakpoint, and the existing lightbox behaviour.
- [x] Verify at desktop and 320 px widths against the prototype screenshots; pass `pnpm typecheck`, scoped `biome check`, `pnpm test`, `pnpm build`, and `pnpm test:e2e` (`pnpm validate` still fails only on the known unrelated `.claude/settings.local.json` formatting issue).

#### F. Experience page section navigation — Complete

Delivered and reviewed with `PASS`. The approved scope, the link-label decision (`Company · years`), and the deferral of the stale-highlight fix are recorded in `docs/plans/2026-09-27-experience-section-nav.md`.

- [x] Extract the section nav and its scroll-spy from `ProjectPageLayout` into a shared `SectionNav` component used by both the project pages and Experience, with no change to project-page behaviour.
- [x] Add the nav to Experience: sticky right rail above `56rem`, inline and wrapping below it, one link per role entry pointing at the existing entry `id`, active entry highlighted on scroll.
- [x] Resolve in planning: the link label for each entry (`Company · years`, for example `The Signal Group · 2023–2024`).
- [x] Anchor links keep working without JavaScript and from existing case-study links; add focused coverage; verify at desktop and 320 px; pass `pnpm typecheck`, scoped `biome check`, `pnpm test`, `pnpm build`, and `pnpm test:e2e` (`pnpm validate` still fails only on the known unrelated `.claude/settings.local.json` formatting issue).
- [x] Developer-directed amendment: move each entry's Technologies list above its summary and make entries single-column for more horizontal space.

### Completed developer-directed CSS consistency audit, gradient removal, and design-doc reconciliation

Developer-directed. Findings, ranked ROI, and fix batches are recorded in `docs/audit/2026-09-27-visual-css-consistency.md`. The Batch 0 decisions (X1–X6) and the gradient-removal reversal are recorded in `docs/DECISIONS.md`. Options for adding visual "life" without a gradient are captured, unbuilt, in `docs/design/2026-09-27-adding-life-without-gradient.md` for a future task.

- [x] Run a Phase 1 visual/CSS consistency audit across the full site (type scale, colour tokens, spacing, component consistency, generic-pattern check, Google Fonts load).
- [x] Decide the audit's Batch 0 questions: keep all three type families (X1); show an eyebrow only where it adds information (X2); `h2` is the 24px serif title (X3); confirm square corners and the work-card text plate as intentional, and reconcile the gradient and label-casing findings against the repo's own design docs (X4); reconcile `docs/design/DESIGN.md` with the shipped site (X5); reserve all-caps mono for supplementary labels only (X6).
- [x] Remove the fixed background gradient wash (`--gradient-accent-start`/`--gradient-accent-middle`, and the `body` `background-image`) so the canvas matches `docs/DESIGN_PRINCIPLES.md`'s existing "no gradients" rule.
- [x] Update `docs/design/DESIGN.md` to describe the shipped visual system (Newsreader/Inter/IBM Plex Mono roles, the OKLCH accent, no gradients, the mono-label split) instead of its original, superseded reference values.
- [x] Pass `pnpm typecheck`, `biome check src`, `pnpm test`, and `pnpm build`.

### Heading semantics and label casing (audit findings H1 and G3) — Complete

Delivered and reviewed with `PASS`. Findings, decisions, and rationale are recorded in `docs/audit/2026-09-27-visual-css-consistency.md` (H1, G3) and `docs/DECISIONS.md` ("Reserve all-caps mono for supplementary labels…").

- [x] Resolve `h2`'s two visual roles: keep the heading level unchanged everywhere (still `h2`, correct outline, consistent with the deferred `h3` sub-level in finding H4); give the small-label role a shared `.section-label-heading` class instead of an ancestor selector or a page-local class name.
- [x] Apply `.section-label-heading` to project-page section headings (`ProjectPageLayout.tsx`), the "Continue exploring" heading (`CaseStudyPage.tsx`, `ExperimentPage.tsx`), and the Work index's section headings (`WorkPage.tsx`, replacing `.work__section-title`).
- [x] Move all-caps tracked mono off essential UI text onto Inter, sentence case: primary navigation and the header Contact button (`shell.css`), home hero actions and inline links (`HomePage.css`), the résumé download button (`ResumePage.css`), the project-page back link and continuation links (`patterns.css`). Mono-caps stays only for eyebrows, the chronology line, tags, card area labels, and résumé metadata.
- [x] Verify at desktop and the `56rem`/`40rem` breakpoints on Home, Work, a project page, Experience, and Résumé; pass `pnpm typecheck`, `biome check src`, `pnpm test`, and `pnpm build` (no test needed updating: none asserted the old class names, mono styling, or heading levels).
- [x] `NotFoundPage.css`'s `.not-found__action a` is the same essential-action pattern but was out of scope; left mono-caps, tracked as a future candidate.

### Font-load correctness (audit findings F1 and F2) — Complete

Delivered and reviewed with `PASS`. Findings and fix guidance are recorded in `docs/audit/2026-09-27-visual-css-consistency.md` (Batch 1, F1, F2).

- [x] Request Newsreader's italic axis in `index.html` so `.project-page__summary`'s existing `font-style: italic` renders a true italic face instead of a browser-faked slant (F1).
- [x] Request Inter weight 500 in `index.html` so `.section-nav__link[aria-current="true"]` and `.project-page__visual-title` render the intended medium weight instead of falling back to 400 (F2).
- [x] Verify both faces load (`document.fonts`) and render correctly on a project page; pass `pnpm typecheck`, `biome check src`, `pnpm test`, and `pnpm build`.

### Remove unused font weights (audit findings F3 and F4) — Complete

Delivered and reviewed with `PASS`. Findings and fix guidance are recorded in `docs/audit/2026-09-27-visual-css-consistency.md` (Batch 1, F3, F4). Developer amended F4 during planning: drop Newsreader 500 and move the wordmark to 400, rather than keep it at 500.

- [x] Remove the unused Inter 600 and 700 weights from the `index.html` font request (F3).
- [x] Move `.site-header__identity` (the header wordmark) to `var(--font-weight-regular)` and drop the now-unused Newsreader 500 from the `index.html` font request (F4).
- [x] Verify no visual regression via `document.fonts` and a browser check on Home and Résumé; pass `pnpm typecheck`, `biome check src`, `pnpm test`, and `pnpm build`.

### Batch 2 token hygiene: high-ROI quick fixes (audit findings T1, T2, T4, T5, T6) — Complete

Delivered and reviewed with `PASS`. Findings and fix guidance are recorded in `docs/audit/2026-09-27-visual-css-consistency.md` (Batch 2). Scoped to the five High-ROI/XS-effort findings only; T3 and T7–T12 remain unbuilt future candidates.

- [x] Add `line-height: var(--line-height-label)` to `.home__actions a`, `.home__role-date`, `.home a`, and `.resume__metadata` so mono/caption labels stop rendering at two different line-heights (T1).
- [x] Switch `.experience__summary` from a hardcoded `1.0625rem`/`1.55` to `--font-size-body`/`--line-height-body` (T2).
- [x] Set `letter-spacing: var(--letter-spacing-heading-md)` once on the shared `h2, h3` rule in `global.css`, remove the two now-redundant per-page overrides in `ExperiencePage.css`, add the same tracking directly to `.contact__title` (a `<span>`, not a heading), and give `.section-label-heading` an explicit `letter-spacing: normal` so its four `<h2>` usages don't inherit the new tracking (T4).
- [x] Add a `--color-backdrop` token and use it in both `::backdrop` rules (lightbox, analytics-settings dialog), canonicalising on the lightbox's existing `rgb(0 0 0 / 0.8)` (T5).
- [x] Add `text-transform: uppercase` to `.resume__metadata` (T6).
- [x] Verify computed styles and visuals across Home, Résumé, Experience, Work, Contact, and both dialogs at desktop and mobile widths; pass `pnpm typecheck`, `biome check src`, `pnpm test`, and `pnpm build`.

### Batch 2 remainder: mechanical fixes (audit findings T3, T7, T9, T11) — Complete

Delivered and reviewed with `PASS`. Findings and fix guidance are recorded in `docs/audit/2026-09-27-visual-css-consistency.md` (Batch 2). Scoped to the four findings needing no developer decision; T8, T10, and T12 remain unbuilt future candidates, each needing its own decision (a hover-style choice, a deliberateness review of off-scale spacing values, and a browser-support policy for `oklch()` fallbacks).

- [x] Add `--line-height-display` (0.95), `--line-height-snug` (1.2), `--line-height-relaxed` (1.45), and `--line-height-caption` (1.5) to `tokens.css`; use them in place of the five hardcoded line-height values in `HomePage.css` and `patterns.css` (T3).
- [x] Extract `.tag-list`/`.tag-list li` once into `patterns.css`, reused by `ProjectPageLayout.tsx`, `WorkPage.tsx`, and `ExperiencePage.tsx`; keep `.work__card-tags` as a margin-only modifier (T7).
- [x] Change `.home h1` from `margin-top` to `margin-block-start` (T9).
- [x] Re-confirm `--color-border-strong` is still used (dialog and lightbox borders, `ContactPage.css`); no code change needed (T11).
- [x] Verify computed styles (exact line-height ratios) and tag-pill rendering across Home, Work, Experience, and a project page; pass `pnpm typecheck`, `biome check src`, `pnpm test`, and `pnpm build`.

### Batch 2: button consolidation (audit finding T8) — Complete

Delivered and reviewed with `PASS`. Findings and fix guidance are recorded in `docs/audit/2026-09-27-visual-css-consistency.md` (Batch 2, T8). The developer resolved T8's one material decision (a single primary-button hover) after reviewing the three existing hover treatments. T10 and T12 remain unbuilt future candidates; a follow-up live audit also queued T13 (Text/Link and Secondary button consolidation) into the same Batch 2 remainder.

- [x] Add shared `.button--ghost` and `.button--primary` classes to `patterns.css`; skip a separate `.button` base class since ghost and primary share no properties beyond border width/style.
- [x] Apply `.button--ghost` to the header Contact link (`PrimaryNavigation.tsx`, `shell.css`) and the résumé download link (`ResumePage.tsx`, `ResumePage.css`), removing the duplicated block.
- [x] Apply `.button--primary` to Home's "Explore experience" button (`HomePage.tsx`, `HomePage.css`) and the analytics dialog's "Save preferences" button (`AnalyticsSettings.tsx`), unifying their hover to the developer's chosen "unfill" treatment (solid accent fades to transparent, text becomes accent-soft, border stays accent).
- [x] Verify zero visual change on the header Contact and résumé buttons, zero visual change on Home's primary button (including a cascade-layer fix so all four border edges stay consistent), and the intended hover-only change on the analytics dialog's primary button; pass `pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`, and `pnpm test:e2e`.

---

## Post-MVP Publication Follow-up

These tasks are intentionally separate from the approved application scope. Complete them when the production domain and publication window are confirmed.

### Publication Metadata

- [x] Add a production meta description.
- [x] Add the canonical URL after confirming the production domain.
- [x] Add Open Graph and social-preview metadata and an approved preview image.
- [x] Add favicon and site-icon assets.
- [x] Decide and implement the production indexing policy, including `robots.txt` and a sitemap if required.

### Live Production Verification

- [x] Verify direct entry and refresh behaviour for all client-side routes on the current Cloudflare Pages preview deployment.
- [x] Verify the resume download, email, LinkedIn, project, case-study, and experience-anchor links on the current Cloudflare Pages preview deployment.
- [x] Re-run route and link verification after the current changes are merged to the Cloudflare Pages production branch.
- [x] Run production performance, accessibility, SEO, and best-practice measurements.
- [x] Review representative production layouts in Safari, Chrome, and Firefox across mobile, tablet, and desktop viewports.

Evidence: `docs/evidence/2026-09-24-production-layout-review.md`.
- [x] Verify production focus visibility and colour contrast in real browsers.

Evidence: `docs/evidence/2026-09-24-production-focus-contrast-review.md`.
- [x] Review and implement the CSS audit remediation plan: `docs/plans/2026-09-26-css-audit-remediation.md`.

Evidence: `docs/plans/2026-09-26-css-audit-remediation.md`.

---

## Backlog Rules

Do not add a backlog item solely because it may be useful later.

Before adding work, identify:

1. the current problem;
2. the evidence that the problem exists;
3. the product objective it supports;
4. why it should be addressed now rather than deferred.

If those cannot be stated clearly, do not add the task.
