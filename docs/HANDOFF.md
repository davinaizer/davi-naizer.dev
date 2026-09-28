---
createdAt: 2026-08-10
updatedAt: 2026-09-28
version: 1.87
status: active
---

# Handoff

## Completed outcome

**The site's sans family is now IBM Plex Sans instead of Inter**, delivered with same-scope `PASS`. `--font-family-sans` in `tokens.css` and the Google Fonts request in `index.html` changed (weights 400 and 500); Newsreader and IBM Plex Mono and their roles are unchanged. The `public/social-preview.png` tagline was redrawn in Plex Sans, and `docs/design/DESIGN.md` names the new family. This follows the wordmark square stop, also closed with `PASS`.

## Next task candidate

None. `TODO.md` has no incomplete task. The developer should bring a new objective to the next `plan-next-task` invocation.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/plans/2026-09-28-ibm-plex-sans.md` (approved plan and the social-preview decision), `docs/DECISIONS.md` ("Replace Inter with IBM Plex Sans as the sans family — 2026-09-28", with its review trigger), `TODO.md` ("Replace Inter with IBM Plex Sans — Complete")
- `src/styles/tokens.css`, `index.html`, `public/social-preview.png`, `docs/design/DESIGN.md`
- `docs/plans/2026-09-28-wordmark-square-stop.md` (previous task; created the social-preview layout)
- Prior work: `docs/audit/2026-09-27-visual-css-consistency.md` (fully closed), `docs/plans/2026-09-28-merge-experience-into-resume.md`, `docs/plans/2026-09-28-contributions-square-markers.md`

## Blockers

None.

## Constraints and deferred work

- Verification of the font swap covered overflow at 1280, 896, 640 and 320px on all main routes, with screenshots reviewed only at 1280 and 320px. A keyboard focus pass and the 896/640px visuals were not done; spot-check when convenient.
- `public/social-preview.png` has no source file in the repo. The tagline was patched over the existing PNG; changing it again means repeating that or recreating the layout. Social platforms cache preview images, so the new card may be slow to appear.
- `docs/design/DESIGN.md` Components → Buttons still says "`label-mono` text" although buttons are sentence-case Plex Sans (pre-existing doc drift).
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
- Work card image panels use one accent tint; hero images exist only for UV Insect Trap. Add per-project visuals only when real result images exist.
- Non-blocking: `pnpm validate` fails on `.claude/settings.local.json` formatting (gitignored, unrelated). Scoped checks are unaffected.
