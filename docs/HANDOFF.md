---
createdAt: 2026-08-10
updatedAt: 2026-09-28
version: 1.86
status: active
---

# Handoff

## Completed outcome

**The wordmark's round full stop is now a square everywhere**, delivered with same-scope `PASS`. The header wordmark and the Home h1 share one solid accent square (`patterns.css`, `Highlight` forced-colors fallback; the "." is no longer in the accessible name). `favicon.svg` (square stop, square tile) and the 16/32/512px favicons and `apple-touch-icon.png` were regenerated from it. `social-preview.png` was rebuilt with the site typefaces (Newsreader, Inter, IBM Plex Mono), the name baseline-aligned with the D mark, square stops, and no gradient wash (flat `#131313`). This follows the "Contributions square markers" task, also closed with `PASS`.

## Next task candidate

None. `TODO.md` has no incomplete task. The developer should bring a new objective to the next `plan-next-task` invocation.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/plans/2026-09-28-wordmark-square-stop.md` (approved plan, Option C decision, and the two social-image amendments), `TODO.md` ("Wordmark square stop — Complete"), `src/styles/patterns.css`, `public/favicon.svg`, `public/social-preview.png`
- `docs/plans/2026-09-28-contributions-square-markers.md` (approved plan and the Outcomes-bar decision), `TODO.md` ("Contributions square markers — Complete")
- `docs/plans/2026-09-28-merge-experience-into-resume.md` (approved plan, developer-directed amendment removing the header button, and re-review note)
- `docs/DECISIONS.md` ("Merge Experience into Resume — 2026-09-28", with its review trigger)
- `PRODUCT_REQUIREMENTS.md` §9 and `docs/ARCHITECTURE.md` (Navigation and rendering), both amended
- `src/pages/ResumePage.tsx`, `src/pages/ResumePage.css` (timeline `experience__*` rules moved here verbatim), `src/components/ExperienceTimeline.tsx`, `src/components/SectionNav.tsx`, `src/components/PrimaryNavigation.tsx`
- `e2e/critical-journeys.spec.ts` (Resume timeline, continuation, and removed-routes coverage)
- `TODO.md` ("Merge Experience into Resume (developer-directed) — Complete")
- Prior work: `docs/audit/2026-09-27-visual-css-consistency.md` (fully closed), `docs/design/DESIGN.md`

## Blockers

None.

## Constraints and deferred work

- The Outcomes list keeps its accent bar; revisit if it also reads heavy on case-study pages. Forced-colours rendering of the new marker was not observed in a real forced-colours environment.
- `public/social-preview.png` has no source file in the repo: it was rendered from a throwaway HTML page (site fonts, 1200×630, flat `#131313`). Editing it means re-creating that layout or editing the PNG; consider committing a source only if it needs regular changes.
- The wordmark square and forced-colours rendering were not observed at 320px or in a real forced-colours environment (rules verified in the built CSS only).
- No redirects: add a hash-preserving `/experience` redirect only if evidence shows traffic to it (review trigger in `docs/DECISIONS.md`; same policy for the retired `/case-studies` and `/projects`).
- Home's "Explore experience" button and "View career timeline" link now lead to the Resume page under unchanged labels; the intro wraps to three lines at 320px. Revisit only if either reads poorly.
- The whole "Earlier career" section is commented out in `ResumePage.tsx` (moved as-is from the old Experience page), so its CSS in `ResumePage.css` has no visual effect.
- Section-nav highlight can go stale (scroll-spy in `SectionNav.tsx` updates only when a section crosses its 20–30% viewport band); non-blocking.
- Two timeline nav labels wrap in the desktop rail ("Independent Product Project · 2025–Present", "Gamesys / Bally's Interactive · 2020–2022"); revisit only if tighter labels are wanted.
- Six low-ROI audit findings were closed as "no action needed" (G4, G8–G11, F5); see the audit doc before reopening.
- `.project-page__decisions-detail h3` duplicates `.experience__detail h3`'s seven properties across `patterns.css` and `ResumePage.css`; extract only if a third usage appears.
- `.primary-navigation a`, `.section-nav__link`, `.project-page__back`, and the footer links were deliberately kept out of the button/link consolidation (T13).
- `docs/design/2026-09-27-adding-life-without-gradient.md` holds unbuilt visual-life options; `NotFoundPage.css`'s `.not-found__action a` is still mono-caps; `docs/DECISIONS.md`'s gradient entry has a wrong file reference (cosmetic).
- Task D review improvements (non-blocking): `CaseStudyPage`/`ExperimentPage` keep an unreachable not-found fallback; the Work card e2e test does not assert the `::after` focus ring; one e2e test loops over a single path.
- Work card image panels use one accent tint; hero images exist only for UV Insect Trap. Add per-project visuals only when real result images exist.
- Non-blocking: `pnpm validate` fails on `.claude/settings.local.json` formatting (gitignored, unrelated). Scoped checks are unaffected.
