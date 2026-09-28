---
createdAt: 2026-09-28
updatedAt: 2026-09-28
version: 1.0
status: complete
---

# Merge Experience into Resume

Developer-directed. Approved 2026-09-28. This is the implementation and review contract.

## Objective

A hiring manager reaches the resume download and the full experience timeline from one page (`/resume`), and the download is reachable from every page. Supports PRODUCT_REQUIREMENTS 4.1 (job applications). Milestone 5.

## Approved decisions

1. **PRD/architecture amendment approved.** Amend `PRODUCT_REQUIREMENTS.md` §9 (MVP scope: Experience no longer a separate page) and `docs/ARCHITECTURE.md` (shell routes), and add a `docs/DECISIONS.md` entry with rationale and a review trigger (revisit if the merged page hurts scannability).
2. **No redirect.** `/experience` renders the existing not-found page (Option A), consistent with the 2026-09-26 precedent for `/case-studies` and `/projects`.
3. **Assumptions accepted:**
   - Intro copy: "Download my current resume, or read the full career timeline below." No new professional claims.
   - Merged page keeps one continuation, "Explore selected work"; "Get in touch" is dropped (Contact is in header and footer).
   - `ExperiencePage.css` rules move verbatim into `ResumePage.css` (`experience__*` class names kept; `index.css` import updated). `ExperienceTimeline` extracted to `src/components/`. The commented-out "Earlier career" block moves as-is.
   - Home labels unchanged; "Explore experience" and "View career timeline" retarget to `/resume`.
   - Header gets a `.button--ghost` download button beside Contact, same `resume.url`, `resume.label` and `download`. A minimal `shell.css` fix is in scope only if needed for 320–375px; if it cannot fit cleanly, return to the developer.

## Amendment (2026-09-28, developer-directed, after review)

The header "Download Resume" button (assumption, criterion 3, sequence step 4) was implemented, then **removed at the developer's direction**. The download remains on `/resume` and the Home hero. Criterion 3 is withdrawn, and the "reachable from any page" goal is no longer required. `shell.css` and `PrimaryNavigation.tsx` are unchanged apart from removing the Experience nav item. Re-reviewed with `PASS`. The Objective, Scope, sequence step 4/7 and Validation lines that mention the header button are superseded by this amendment.

## Scope

In: timeline and `SectionNav` rendered unchanged on `/resume` under h1, short intro, "Updated" date and download button; remove Experience route, page, nav item and sitemap entry; header download button; retarget all former `/experience` links (keeping `#<slug>` anchors) to `/resume`; update tests and docs.

Out: timeline content or structure changes, PDF regeneration, analytics, new dependencies, redesign, redirects.

## Completion criteria

1. `/resume` shows h1, intro, date, download button, then the timeline; first entry visible without scrolling past unrelated content (component test for order; manual at 1280×800 and 375px).
2. Timeline and section nav unchanged: same entries, ids, nav links, styling, anchors (ported Experience assertions; visual comparison).
3. Header download button works from every route and uses the same url, label and `download` as the page and hero buttons (tests plus manual on a few routes).
4. No orphans: no Experience nav item, route or sitemap entry; every former `/experience` link resolves; case-study "Relevant experience" links land on the right entry (repo-wide search plus link check).
5. `/experience` renders not-found (router or e2e test).
6. Accessibility: one h1, correct heading order, one "Continue exploring" landmark, sensible keyboard order, axe clean.
7. PRD §9, `ARCHITECTURE.md` and `DECISIONS.md` consistent with the change.

## Implementation sequence

1. Repo-wide search for `experience` and `/experience` (`src/`, `e2e/`, `public/`, `README.md`, `docs/`) to confirm the full link and test list.
2. Extract `ExperienceTimeline` (with `navLabel`, `navItems`) to `src/components/ExperienceTimeline.tsx`, unchanged.
3. Rebuild `ResumePage.tsx`; merge CSS into `ResumePage.css`; fix the `index.css` import.
4. Add the header download button in `PrimaryNavigation.tsx` (`shell.css` tweak only if needed).
5. Remove `ExperiencePage.tsx` and its CSS, `routes.experience`, the router entry, the nav item and the sitemap line.
6. Retarget Home, `CaseStudyPage`, `ExperimentPage` and any others found in step 1 to `routes.resume`.
7. Merge `ExperiencePage.test.tsx` into `ResumePage.test.tsx`; update Home, case-study, experiment, nav and e2e tests; add the header button test.
8. Update PRD §9, `ARCHITECTURE.md` and `DECISIONS.md`. Revert is a single `git revert`.

## Validation

`pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`, `pnpm test:e2e`. `pnpm validate` still fails only on the known unrelated `.claude/settings.local.json` formatting issue. Manual: `/resume` at desktop, 56rem, 40rem and 320px; header at 320–375px; header download from two other routes; a case-study "Relevant experience" link.

## Notes

- `TODO.md` gets an entry for this task at implementation start (Backlog Rules: problem, evidence, objective, why now).
- Evidence for the IA change is developer judgement; analytics cannot measure resume clicks.
