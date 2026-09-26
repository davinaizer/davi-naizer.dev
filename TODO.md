---
createdAt: 2026-08-07
updatedAt: 2026-09-26
version: 1.47
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

**Experiments — not started.**

- [ ] Reuse the shared `ProjectPageLayout` component for `/projects/<slug>` routes and convert `/projects` into a card-grid index, following the Case Studies pattern.
- [ ] Add the experiment project pages to the sitemap and update `docs/ARCHITECTURE.md` routes.
- [ ] Keep existing URLs working; add focused unit and browser coverage; pass `pnpm validate`, `pnpm build`, and `pnpm test:e2e`.

#### B. Project-page section navigation

Delivered for Case Studies as part of Task A: sticky right rail above `56rem`, inline and wrapping below it; `IntersectionObserver` scroll-spy tuned against Alfred's ~10 sections; anchor links work without JavaScript. The shared `ProjectPageLayout` component carries this behaviour to Experiments automatically once its Task A routes land — no separate implementation is expected.

- [x] Add the section index: sticky right rail above `56rem`, inline and wrapping below it.
- [x] Highlight the active section on scroll; tune the scroll-spy threshold against real project pages.
- [x] Anchor links work without JavaScript; add focused coverage and pass the standard checks.

#### C. Gallery and lightbox

- [ ] Normalise gallery images per kind (`4:3` landscape photos, `1:2` portrait screenshots) with thumbnails as buttons.
- [ ] Add a full-size view with caption using the native `<dialog>` element: Escape and click-outside close, focus contained and returned.
- [ ] Complete the per-project hero image review and add heroes only where a real result image exists.
- [ ] Add focused accessibility and browser coverage; pass the standard checks.

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
