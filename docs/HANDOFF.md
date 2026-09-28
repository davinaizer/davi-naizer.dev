---
createdAt: 2026-08-10
updatedAt: 2026-09-28
version: 1.89
status: active
---

# Handoff

## Completed outcome

**Alfred and UV Insect Trap now show real Work card and project-page hero images**, delivered with same-scope `PASS`. Alfred's card and hero use a new purpose-built filmstrip of three onboarding screenshots (value proposition, mood picker, Alfred's Pick recommendation), composited edge-to-edge with a black-to-background fade at both outer edges (no phone-bezel mockup); UV Insect Trap's card now shows its existing project-page hero photo too, at the developer's mid-task direction, accepted as a placeholder crop. This exercises the deferred branch of the Task D card-image decision, not a reversal of it — the other four projects keep the typographic panel. `WorkCard` (`WorkPage.tsx`/`.css`) now renders a project's `hero` generically; `evidence-content.ts` gained Alfred's `hero` and dropped its now-redundant gallery visual.

## Next task candidate

None. `TODO.md` has no incomplete task. The developer should bring a new objective to the next `plan-next-task` invocation.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/DECISIONS.md` ("Give Alfred and UV Insect Trap real card and hero images; adopt the filmstrip format for future hero images — 2026-09-28", with its review triggers; no separate plan file was saved), `TODO.md` ("Give Alfred and UV Insect Trap real card and hero images (developer-directed) — Complete")
- `src/pages/WorkPage.tsx`, `src/pages/WorkPage.css`, `src/content/evidence-content.ts`, `public/images/alfred/alfred-onboarding-filmstrip.jpg`
- `src/pages/WorkPage.test.tsx`, `src/pages/CaseStudyPage.test.tsx` (new card-image and hero-attribute coverage)
- Prior work: `docs/plans/2026-09-26-work-index-routing.md` (Task D, the card-image decision this task's deferred branch exercises), `docs/plans/2026-09-28-libre-franklin.md`, `docs/audit/2026-09-27-visual-css-consistency.md` (fully closed)

## Blockers

None.

## Constraints and deferred work

- `public/social-preview.png` is built in Figma; the Figma file is the source and lives outside the repo. Its role line reads "Senior Frontend Engineer" while the Home subtitle and `og:title` say "Senior Frontend & Product Engineer"; align one side if it matters. Social platforms cache preview images, so the new card may be slow to appear.
- The smoothing rule also lightens Newsreader and IBM Plex Mono on macOS and iOS; revisit if small serif or mono text reads too thin. Libre Franklin sets wider than Inter, so keep an eye on wrapping (review trigger in `docs/DECISIONS.md`).
- Font-swap verification covered overflow at 1280, 896, 640 and 320px with screenshots at all four widths; a keyboard focus pass and a fallback-font layout-shift measurement were not done.
- `docs/design/DESIGN.md` Components → Buttons still says "`label-mono` text" although buttons are sentence-case sans (pre-existing doc drift).
- The Outcomes list keeps its accent bar; revisit if it also reads heavy on case-study pages. Forced-colours rendering of the contribution and wordmark squares was not observed in a real forced-colours environment, nor the wordmark at 320px.
- No redirects: add a hash-preserving `/experience` redirect only if evidence shows traffic to it (review trigger in `docs/DECISIONS.md`; same policy for the retired `/case-studies` and `/projects`).
- Home's "Explore experience" button and "View career timeline" link lead to the Resume page under unchanged labels; the intro wraps to three lines at 320px. Revisit only if either reads poorly.
- The whole "Earlier career" section is commented out in `ResumePage.tsx`, so its CSS in `ResumePage.css` has no visual effect.
- Section-nav highlight can go stale (scroll-spy in `SectionNav.tsx` updates only when a section crosses its 20–30% viewport band); two timeline nav labels wrap in the desktop rail. Both non-blocking.
- Six low-ROI audit findings were closed as "no action needed" (G4, G8–G11, F5); see the audit doc before reopening.
- `.project-page__decisions-detail h3` duplicates `.experience__detail h3`'s seven properties across `patterns.css` and `ResumePage.css`; extract only if a third usage appears.
- `.primary-navigation a`, `.section-nav__link`, `.project-page__back`, and the footer links were deliberately kept out of the button/link consolidation (T13).
- `docs/design/2026-09-27-adding-life-without-gradient.md` holds unbuilt visual-life options; `NotFoundPage.css`'s `.not-found__action a` is still mono-caps; `docs/DECISIONS.md`'s gradient entry has a wrong file reference (cosmetic).
- Task D review improvements (non-blocking): `CaseStudyPage`/`ExperimentPage` keep an unreachable not-found fallback; the Work card e2e test does not assert the `::after` focus ring; one e2e test loops over a single path.
- Alfred and UV Insect Trap now have real Work card/hero images (filmstrip pattern documented in `docs/DECISIONS.md`); the other four projects (Vessel List, Promotional Workflow, HSBC, Atelier Florae) still show the typographic panel. UV's card crop is an accepted placeholder pending a purpose-built hero (review trigger in `docs/DECISIONS.md`).
- `public/images/alfred/alfred-landing-page.jpg` is now an unreferenced asset (its only gallery reference was removed this task); not deleted.
- The Work card `<img>` uses `loading="lazy"` even for the above-the-fold Alfred card, unlike the eager-loaded project-page hero (non-blocking; same class of issue the "Completed hero image lazy-loading fix" task addressed once already for `ProjectPageLayout`).
- Non-blocking: `pnpm validate` fails on `.claude/settings.local.json` formatting (gitignored, unrelated). Scoped checks are unaffected.
