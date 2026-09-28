---
createdAt: 2026-08-10
updatedAt: 2026-09-28
version: 1.88
status: active
---

# Handoff

## Completed outcome

**The site's sans family is now Libre Franklin**, with font smoothing set on `html`, delivered with same-scope `PASS`. This supersedes the earlier IBM Plex Sans swap (`6ba764f`): Plex Sans rendered heavy on macOS because the site set no smoothing, and the fix plus Libre Franklin was chosen on the real site. `--font-family-sans` in `tokens.css`, the Google Fonts request in `index.html` (weights 400 and 500) and `html` in `global.css` changed; Newsreader and IBM Plex Mono and their roles are unchanged. `public/social-preview.png` is now a Figma-built 1200×630 card, and two stale `ResumePage.test.tsx` expectations from the canon-resume sync were updated.

## Next task candidate

None. `TODO.md` has no incomplete task. The developer should bring a new objective to the next `plan-next-task` invocation.

## Roadmap position

- **Milestone:** Milestone 5 - Evidence-Driven Evolution (ongoing; no fixed next milestone).
- **Workflow stage:** Task complete; no task is currently approved, in progress, or under review.

## Evidence pointers

- `docs/plans/2026-09-28-libre-franklin.md` (approved plan and its two developer-directed amendments), `docs/DECISIONS.md` ("Use Libre Franklin as the sans family and set font smoothing — 2026-09-28", with its review trigger; the Plex Sans entry is marked superseded), `TODO.md` ("Use Libre Franklin and set font smoothing — Complete")
- `src/styles/tokens.css`, `src/styles/global.css`, `index.html`, `public/social-preview.png`, `docs/design/DESIGN.md`
- `docs/plans/2026-09-28-ibm-plex-sans.md` (the superseded Plex Sans plan, kept as history)
- Prior work: `docs/audit/2026-09-27-visual-css-consistency.md` (fully closed), `docs/plans/2026-09-28-wordmark-square-stop.md`, `docs/plans/2026-09-28-merge-experience-into-resume.md`

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
- Work card image panels use one accent tint; hero images exist only for UV Insect Trap. Add per-project visuals only when real result images exist.
- Non-blocking: `pnpm validate` fails on `.claude/settings.local.json` formatting (gitignored, unrelated). Scoped checks are unaffected.
