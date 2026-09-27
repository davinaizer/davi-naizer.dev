---
title: Visual and CSS consistency audit
status: diagnostic
createdAt: 2026-09-27
---

# Visual and CSS Consistency Audit

## Scope and method

Phase 1 audit of the `develop` deploy (`https://develop.davi-naizer.pages.dev/`) at commit `d633958`. The live pages were checked at a 1440px viewport with computed styles: `/`, `/work`, `/experience`, `/resume`, `/contact` and all six `/work/<slug>` pages. Source CSS and TSX were read alongside. Contrast ratios were calculated from the tokens in `src/styles/tokens.css`.

Not covered: there is no `/about` route (About is the `#about` section on Home), and the 404 page, lightbox, analytics dialog and mobile widths were read from CSS only, not rendered.

The audit checklist is the "AI-generated design tells" list from the `frontend-design` skill. This document is diagnostic. It changes no code, and the fix order below is a proposal that needs an approved task plan before implementation.

**Classification:** **D** = defect (breaks consistency). **J** = judgment call (works, but confirm it was a choice).

**Scoring:** Impact 1–5 (5 = most visible or most damaging to consistency). Effort XS (minutes), S (under an hour), M (a few hours), L (a day or more, or needs design decisions). ROI is Impact against Effort and risk: High, Medium or Low.

## Summary

| Metric | Value |
|---|---|
| Font families loaded | 3 (Newsreader, Inter, IBM Plex Mono); kept by decision X1 |
| Google Fonts requests | 1 `<link>` stylesheet (`index.html:9–12`); no `@import` |
| Text contrast pairs failing WCAG AA | 0 |
| Colours outside the token set | 2 (backdrop overlays) |
| Border radius / shadows | 0 everywhere, except one glow ring |
| Defects (D) | 24 (G1 counted once, as D/J; T13 added 2026-09-27 from the follow-up buttons/links audit) |
| Judgment calls (J) | 16 (G6 and G7 confirmed intentional by X4, no action) |
| Defects fixed since audit | G5 (gradient removed); H5 pending |

**Headline:** the token system is strong and text contrast is comfortably AA. The problems are font-loading mismatches, tokens bypassed by hard-coded values, an `h2` that means two different things, and heavy template chrome (eyebrows, uppercase mono labels, numbered lists).

## Findings and fix order

Findings are grouped into batches in the order they should be fixed. The batching rule is that decisions come first, then fixes that change nothing visually, then fixes that change appearance.

- **Batch 0** needs decisions before any code.
- **Batches 1–2** are safe and can ship quickly.
- **Batch 3** is a small visual change.
- **Batch 4** changes markup and semantics.
- **Batch 5** carries the design-direction work that Batch 0 unlocks.

### Batch 0: Decisions to make first (no code)

These decisions change the size of every later batch. Record accepted outcomes in `docs/DECISIONS.md`.

| ID | Decision | Why it comes first | Impact | Effort | ROI |
|---|---|---|---|---|---|
| **X1** | ~~Keep three font families, or drop to two?~~ **Decided 2026-09-27: keep all three.** Newsreader for headings, Inter for body, IBM Plex Mono for labels. Newsreader is not suited to long body copy, so the serif body option was rejected. | The audit brief targets 1–2, but each face has a distinct role. Batch 1 stays at full scope. | 5 | Done | n/a |
| **X2** | ~~Keep an eyebrow above every h1, or remove or reserve it?~~ **Decided 2026-09-27: keep an eyebrow only where it adds information the heading does not.** | Sets the scope of G1 and H5 (below) and what the h1 block spacing becomes. | 4 | Done | n/a |
| **X3** | ~~What should an `h2` look like?~~ **Decided 2026-09-27: `h2` is the 24px serif title.** The 12px mono label role gets its own class. | Sets the heading fix in Batch 4. Consequence to settle in H1: the project-page section headings (Context, Problem, Role…) are `h2` mono labels today. | 4 | Done | n/a |
| **X4** | ~~Are the flagged judgment calls confirmed choices?~~ **Resolved 2026-09-27 against the repo's own design docs** (`docs/design/DESIGN.md`, `docs/DESIGN_PRINCIPLES.md`, `docs/plans/2026-09-26-work-index-routing.md`): square corners are documented and stay (G6); text plates on work cards are a documented decision and stay (G7); the gradient wash was reconsidered on 2026-09-27 and removed instead (G5), so `DESIGN.md` now states "no gradients" plainly; uppercase mono labels are documented for categories, dates and tags only, so navigation, buttons and section headings exceed the spec (G3). | Anything not confirmed goes on the fix list. | 3 | Done | n/a |
| **X5** | ~~Reconcile~~ **Done 2026-09-27: `DESIGN.md` updated to the shipped design and the decision recorded in `DECISIONS.md` (v1.28).** Original finding: reconcile `docs/design/DESIGN.md` with the shipped design. The doc said Inter for all headlines, `#cfc4c5` secondary text, `#bec2ff` accent, `label-mono` 13px at 0.05em; the site used Newsreader headings, `#aaa4a5`, `#8ea0ff` (`oklch(74% .16 275)`) and 12px at 0.095em. No entry in `docs/DECISIONS.md` covered Newsreader. | Under the repo's authority order, docs are authoritative over code, so the drift had to be resolved before Batch 2 and 5 work. | 3 | Done | n/a |
| **X6** | ~~Should mono-caps cover navigation, buttons and section headings, or only supplementary labels?~~ **Decided 2026-09-27 (Option A): only supplementary labels.** Navigation, buttons, the back link, continuation links and section headings move to Inter, sentence case (finding G3). Recorded in `docs/DECISIONS.md`. | Sets the scope of G3 and, once H1 gives section headings their own class, closes the last open item from the generic-pattern check. | 4 | Done | n/a |

**Suggested approach:** X1 is settled (three families, fixed roles above), so the remaining work is to hold each face to its role. For X2 and X3, pick the pattern that the majority of pages already use, so the fix touches the fewest files. X2 is settled too: the eyebrow stays only where it adds information (see the per-instance list under G1).

### Batch 1: Font-load correctness (no visual redesign)

Low risk, high ROI. Each item fixes a mismatch between what is requested from Google Fonts and what CSS uses.

| ID | Finding | Location | Class | Impact | Effort | ROI | How to address |
|---|---|---|---|---|---|---|---|
| **F1** | ~~Faux italic. `font-style: italic` on Newsreader, but no italic face is requested. The browser slants the regular weight on all six project pages.~~ **Fixed 2026-09-27.** | `patterns.css:63`, `index.html:11` | D | 4 | XS | Done | Requested Newsreader's italic axis at weight 400 (`ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400`). Decided to keep the italic treatment rather than remove it. |
| **F2** | ~~Inter weight 500 is used in three places but only 400/600/700 are requested. 500 falls back to 400, so the intended emphasis never renders.~~ **Fixed 2026-09-27.** | `patterns.css` (`section-nav__link[aria-current]`, `.project-page__visual-title`), `ExperiencePage` current nav link | D | 3 | XS | Done | Requested Inter 500 explicitly rather than changing the rules to 600/400. |
| **F3** | ~~Inter 600 and 700 are requested but no rule uses them. They are never downloaded, but they add stylesheet weight and misrepresent intent.~~ **Fixed 2026-09-27.** | `index.html:11` | D | 2 | XS | Done | Removed the unused 600/700 weights from the Inter request; Inter is now requested at 400 and 500 only. |
| **F4** | ~~Newsreader 500 is used by exactly one element, the header wordmark.~~ **Fixed 2026-09-27.** | `shell.css` `.site-header__identity` | J | 1 | XS | Done | Moved the wordmark to weight 400 and dropped Newsreader 500 from the request; Newsreader is now requested at 400 (roman and italic) and 600. |
| **F5** | Inter requests the `opsz` axis (14..32) for a single weight. | `index.html:11` | J | 1 | XS | Low | Drop `opsz` if only one weight remains and no visible difference is seen. Measure the file-size delta before deciding. |

**Target font set after Batch 1** (three families, per X1): Inter 400 (plus 500 if F2 requests it); Newsreader 400, 600 (plus italic 400 if F1 keeps it); Plex Mono 400, 500.

### Batch 2: Token hygiene (no visual change, or negligible)

Pure refactors that keep the token system honest. Ship as one small change with a before/after screenshot check.

| ID | Finding | Location | Class | Impact | Effort | ROI | How to address |
|---|---|---|---|---|---|---|---|
| **T1** | ~~Mono label style renders at two line-heights (16.2px vs 19.2px). Some rules omit `--line-height-label`.~~ **Fixed 2026-09-27.** | `HomePage.css` (`.home__actions a`, `.home__role-date`, `.home a`), `ResumePage.css` | D | 3 | XS | Done | Added `line-height: var(--line-height-label)` to the four rules directly, rather than extracting a new utility class. |
| **T2** | ~~17px / 1.55 hard-coded for a single element, off the type scale.~~ **Fixed 2026-09-27.** | `ExperiencePage.css:107–108` | D | 3 | XS | Done | Switched `.experience__summary` to `--font-size-body` (16px) with `--line-height-body`. |
| **T3** | ~~Line-heights 0.95, 1.2, 1.45, 1.5, 1.55 are hard-coded.~~ **Fixed 2026-09-27.** | `HomePage.css`, `patterns.css`, `ExperiencePage.css` | D | 2 | S | Done | Added `--line-height-display` (0.95), `--line-height-snug` (1.2), `--line-height-relaxed` (1.45 — not named by the original finding, added for consistency), and `--line-height-caption` (1.5) to `tokens.css`. The 1.55 instance was already resolved by T2. |
| **T4** | ~~24px serif heading tracking is inconsistent: -0.015em on Experience, 0 elsewhere.~~ **Fixed 2026-09-27.** | `ExperiencePage.css`, `WorkPage.css`, `ContactPage.css`, `HomePage.css` | D | 2 | XS | Done | Set `letter-spacing: var(--letter-spacing-heading-md)` once on the shared `h2, h3` rule in `global.css`, removed the two now-redundant per-page overrides in `ExperiencePage.css`, and added the missing tracking directly to `.contact__title` (a `<span>`, not a heading element, so it doesn't inherit the shared rule). `.section-label-heading` (a `<h2>` with fully overridden typography) was given an explicit `letter-spacing: normal` so it doesn't inherit the new heading tracking. |
| **T5** | ~~Backdrop overlays `rgb(0 0 0 / .8)` and `.65` are hard-coded outside tokens with different alphas for the same job.~~ **Fixed 2026-09-27.** | `patterns.css` (lightbox, analytics dialog) | D | 2 | XS | Done | Added `--color-backdrop: rgb(0 0 0 / 0.8)` to `tokens.css` (the lightbox's existing, stronger value) and used it in both places; the analytics-settings dialog backdrop is now slightly darker. |
| **T6** | ~~`.resume__metadata` is the only mono label in mixed case.~~ **Fixed 2026-09-27.** | `ResumePage.css:1–7` | D | 2 | XS | Done | Added `text-transform: uppercase` directly, alongside the T1 fix. |
| **T7** | ~~Tag pill CSS is copy-pasted into three rulesets.~~ **Fixed 2026-09-27.** | `patterns.css`, `WorkPage.css`, `ExperiencePage.css` | D | 3 | S | Done | Extracted `.tag-list`/`.tag-list li` once into `patterns.css`; `ProjectPageLayout.tsx`, `WorkPage.tsx`, and `ExperiencePage.tsx` now use it. `.work__card-tags` kept as a margin-only modifier class. |
| **T8** | ~~Header Contact button and `.resume__action a` duplicate an identical block. Primary buttons on Home and in the analytics dialog have different hovers.~~ **Fixed 2026-09-27.** | `shell.css`, `ResumePage.css`, `HomePage.css`, `patterns.css` | D | 3 | S–M | Done | Introduced `.button--ghost` and `.button--primary` in `patterns.css` (no separate `.button` base — ghost and primary share no properties beyond border width/style). Unified the primary hover to the developer's chosen "unfill" treatment. |
| **T9** | ~~Physical `margin-top` on `.home h1`; the rest of the codebase uses logical properties.~~ **Fixed 2026-09-27.** | `HomePage.css:5` | D | 1 | XS | Done | Changed to `margin-block-start`. |
| **T10** | ~~Off-scale one-offs: `0.35rem`, `0.45rem`, `0.3rem`, `0.15rem`, `4.75rem`, `2rem` column, and six different max-widths (48–70rem).~~ **Fixed 2026-09-27.** | Various | J | 2 | S | Done | Confirmed all six spacing one-offs as deliberate; documented `--space-tag-block`/`--space-marker-offset` with comments, swapped the bare `2rem` for `var(--space-4)`. Consolidated the six max-widths into `--measure-narrow` (48rem), `--measure-standard` (62rem), and `--measure-wide` (70rem), accepting three small width changes (`.home__highlight` −4rem, the lightbox +2rem, `.experience__entry` +2rem). |
| **T11** | ~~`--color-border-strong` is defined but unused on the main pages.~~ **Confirmed 2026-09-27: no action needed.** | `tokens.css` | J | 1 | XS | Done | Re-verified: still used in 5 places (dialog and lightbox borders in `patterns.css`, `ContactPage.css`). |
| **T12** | ~~The `oklch()` tokens are correct, but there is no fallback for older browsers.~~ **Resolved 2026-09-27: no fallback needed.** | `tokens.css` | J | 1 | S | Done | Decided in `docs/DECISIONS.md` ("Target modern evergreen browsers only; no CSS fallback for `oklch()`"): the site targets evergreen browsers only (Safari 15.4+, Chrome/Edge 111+, Firefox 113+), which have supported `oklch()` since ~2023. No code change. |
| **T13** | ~~Follow-up live audit (`docs/audit/buttons-links-audit/`, 2026-09-27) found more interactive-element duplication beyond T8's primary/ghost buttons: three near-identical underlined text CTAs with no shared class (Home's "Download Resume", `.site-footer__text-link`, `.contextual-continuation__link`), and one bordered "secondary" button that exists only inline in one component (`.analytics-settings__button`'s "Close", no reusable class). `.site-footer__links a` (footer social icons) already matches `.button--ghost`'s hover recipe exactly but isn't wired to it.~~ **Fixed 2026-09-27.** | `HomePage.css`, `patterns.css`, `AnalyticsSettings.tsx`, `ProjectGallery.tsx`, `ContextualContinuation.tsx` | D | 2 | S–M | Done | Added `.button--secondary`, extracted from `.analytics-settings__button` and applied to both it and `.project-page__lightbox-close` — a second, exact duplicate the original note missed. Added `.button--text`, applied to the Experience and Résumé continuation links. Developer-directed amendment: Home's "Download Resume" uses `.button--ghost` instead (matching the Résumé page's identical action), not the planned `.button--text`. Corrected this note: the footer social icons do **not** match `.button--ghost`; both they and `.site-footer__text-link` were excluded by developer decision. `.primary-navigation a`, `.section-nav__link`, and `.project-page__back` stayed separate as planned. Review caught and fixed two cascade/state regressions: the ghost hover border-color and the lightbox close button's `:focus-visible` state. |

### Batch 3: Spacing normalisation (small visual change)

Do after Batch 2 so spacing is compared on tokenised CSS. Check each page by eye afterwards.

| ID | Finding | Location | Class | Impact | Effort | ROI | How to address |
|---|---|---|---|---|---|---|---|
| **S1** | `.home a` catch-all adds 24px top margin and mono styling to every anchor in `.home`, including the two hero buttons, on top of the 24px on `.home__actions`. This is a specificity clash. | `HomePage.css` (last `.home a` rule) | D | 4 | S | **High** | Scope it to `.home__continue a` (the continuation links only), or give those links a class. Re-check the hero button rhythm and the continuation-link weight (currently 400 underlined on Home vs 500 not underlined elsewhere). |
| **S2** | Intro-to-first-content gap differs by page: 32px (project), 64px (`/work`), 120px (`/experience`, `/contact`). | `patterns.css`, `WorkPage.css`, `ExperiencePage.css`, `ContactPage.css` | D | 4 | S | **High** | Pick one gap from `--layout-section-gap` or `--space-8` and apply it via one shared class after `.page-lead`. |
| **S3** | Divider sections use different padding after the rule: 32px (Home, "Continue exploring") vs 48px (Earlier career). | `HomePage.css`, `patterns.css`, `ExperiencePage.css` | D | 2 | XS | **High** | Use one token (`--space-4`) for all three. |
| **S4** | Marker-row inline padding: 40px (Experience) vs 48px (Contact), same 48px block padding. | `ExperiencePage.css:42`, `ContactPage.css:20` | D | 2 | XS | **High** | Use one value for both. |
| **S5** | Card padding differs: work-card body 24px, gallery caption 16px. | `WorkPage.css`, `patterns.css` | J | 1 | XS | Low | Keep if intentional (different card types). Otherwise align. |

### Batch 4: Heading semantics and hierarchy (markup + CSS)

Depends on X3. Touches TSX and needs test updates (`CaseStudyPage.test.tsx`, `WorkPage.test.tsx`, `ExperiencePage.test.tsx`).

| ID | Finding | Location | Class | Impact | Effort | ROI | How to address |
|---|---|---|---|---|---|---|---|
| **H1** | ~~`h2` has two visual roles: a 24px serif title (Home, Experience) and a 12px mono label (project pages, Work sections).~~ **Fixed.** | `patterns.css`, `WorkPage.css`/`.tsx`, `ProjectPageLayout.tsx`, `CaseStudyPage.tsx`, `ExperimentPage.tsx` | D | 5 | M | Done | Kept heading level unchanged (still `h2`; correct outline, and consistent with the deferred `h3` sub-level in H4). Added a shared `.section-label-heading` class, applied to project-page section headings (including "Continue exploring" in `CaseStudyPage.tsx`/`ExperimentPage.tsx`, not just `ProjectPageLayout.tsx`) and the Work index's section headings (replacing `.work__section-title`). Home and Experience's `h2` were already correct and untouched. |
| **H2** | `/work` visual hierarchy is inverted: 12px `h2` "Case studies" above 24px `h3` cards. | `WorkPage.tsx:58,84`, `WorkPage.css` | D | 4 | S | **High** | Follow the outcome of H1. Either make the section `h2` visually larger than the card `h3`, or render the mono label as a non-heading with an accessible group name. |
| **H3** | `/experience` "Earlier career" `h2` and its `h3` entries are the same 24px. | `ExperiencePage.css:29–31` | D | 3 | XS | **High** | Give the `h3` entries a smaller step (for example `--font-size-body-lg`), or make "Earlier career" the visually larger heading. |
| **H4** | Project pages have no `h3`. "Product / UX" and "Engineering" sit as `h2` siblings of "Decisions", though they subdivide it. | `ProjectPageLayout.tsx:84`, content data | D | 3 | M | Medium | Add a sub-heading level for nested sections (`h3`), or restructure content so subdivisions are lists. Check the section-nav still lists only top-level sections. |
| **H5** | Empty `<p class="eyebrow"></p>` renders only a bar. | `HomePage.tsx:13` | D | 2 | XS | **High** | Remove the element (per X2 it has no content to add). Do this together with G1. |
| **H6** | Wordmark and h1 both read "Davi Naizer." with the accent period on the Home screen. | `shell.css`, `HomePage.css` | J | 1 | XS | Low | Keep if it is a repeated brand device. Otherwise drop the period on one. |
| **H7** | `/contact` and `/resume` have only an `h1`; contact link titles are spans. | `ContactPage.tsx` | J | 2 | S | Low | Consider `h2`s for the contact link titles for screen-reader navigation. |

### Batch 5: Template tells and design direction (needs Batch 0)

The highest-visibility items, and the ones that depend on your answers to X1–X6. Do these last, and one at a time, to keep changes reviewable.

| ID | Finding | Location | Class | Impact | Effort | ROI | How to address |
|---|---|---|---|---|---|---|---|
| **G1** | `.eyebrow` above every h1, and above Home "Current role" and "A little about me". Several restate the h1 or add nothing ("Page status", "Professional profile", "Get in touch"). | `ContactPage.tsx:10`, `ResumePage.tsx:20`, `WorkPage.tsx:45`, `NotFoundPage.tsx:8`, `HomePage.tsx:38,52`, `ExperiencePage.tsx:89,108`, `ProjectPageLayout.tsx:49` | D/J | 4 | S | **High** | Per X2, per instance: **keep** the project-page area label (`ProjectPageLayout.tsx:49`, it says Case study or Experiment, which the title does not), Home "Current role" (`HomePage.tsx:38`) and Experience "Earlier career" (`ExperiencePage.tsx:108`, it names the period; the h2 is "Starting out in support and web development"). **Remove** "Selected work" (`/work`), "Career history" (`/experience`), "Professional profile" (`/resume`), "Get in touch" (`/contact`), "Page status" (404), the empty Home hero eyebrow (H5) and Home "A little about me" (`HomePage.tsx:52`, the h2 is "Beyond the work" and this adds nothing). Then tidy `.page-lead` spacing (see S2, H5). Also align the project-page label ("Case study") with the card label ("Product case study") so one name is used for one thing. |
| **G2** | `.experience__contributions` numbers a list 01, 02, 03… but the contributions are not a sequence. | `ExperiencePage.css:112–123` | D | 4 | S | **High** | Replace the counters with a plain marker (the 2px accent bar already used elsewhere) or a normal `<ul>`. Keep numbering only for genuinely ordered content. |
| **G3** | ~~ALL-CAPS tracked mono is the entire label system: nav, buttons, back link, h2 labels, chronology, home links.~~ **Fixed.** | `shell.css`, `patterns.css`, `HomePage.css`, `ResumePage.css`, `WorkPage.css`/`.tsx`, `ProjectPageLayout.tsx`, `CaseStudyPage.tsx`, `ExperimentPage.tsx` | D | 4 | M | Done | Navigation, the header Contact button, home hero actions, home inline links, the résumé button, the back link, continuation links, and section headings (via H1's new class) all render in Inter, sentence case. Mono-caps stays for eyebrows, the chronology line, tags, card area labels and résumé metadata (unchanged, unscoped). `NotFoundPage.css`'s `.not-found__action a` (the 404 page's action link) is the same essential-action pattern but was not in the approved plan's file list, so it was left mono-caps; logged as a future candidate. No test changes needed (confirmed no test asserted the old class names, mono styling, or heading levels). |
| **G4** | Middle-dot meta strings ("Company · years · location"). | `ExperiencePage.tsx:12,46` | J | 2 | S | Low | Replace with separate elements or a definition list if it reads templated. Acceptable as-is. |
| **G5** | ~~Near-black `#131313` with one bright accent, plus a fixed radial gradient wash.~~ **Fixed 2026-09-27.** | `tokens.css`, `global.css` | D | 3 | XS | Done | The gradient was briefly confirmed as deliberate, then removed on reflection rather than excepting `DESIGN_PRINCIPLES.md`'s "decorative gradients" prohibition (see `docs/DECISIONS.md`). `--gradient-accent-start`, `--gradient-accent-middle` and the `body` `background-image` are removed; the canvas is a flat fill. Options for adding "life" without a gradient are tracked separately in `docs/design/2026-09-27-adding-life-without-gradient.md` and remain unbuilt. |
| **G6** | Zero radius and hairline dividers everywhere give a broadsheet feel. | Site-wide | J | 2 | S | Low | Confirmed by X4: `DESIGN.md:120–122` specifies 0 radius as a deliberate Swiss-style choice. No action. |
| **G7** | Work cards render the project title as uppercase mono on a tint, standing in for an image. | `WorkPage.css:25–41` | J | 3 | M | Medium | Confirmed by X4: `docs/plans/2026-09-26-work-index-routing.md` chose one typographic panel on every card, because only UV Insect Trap has a real hero image and mixing would make cards inconsistent. No action. Revisit when more projects have distinct result images. (My earlier note that Alfred and Atelier Florae had usable card imagery was wrong: those are app screens and labels, not hero images.) |
| **G8** | The timeline dot has a one-off glow ring (`box-shadow: 0 0 0 .3rem`). | `ExperiencePage.css:59` | J | 1 | XS | Low | Keep or replace with a border. |
| **G9** | The 3px accent bar is padded 24px in the section-nav and 16px in the outcomes list. | `patterns.css` | J | 1 | XS | Low | Align if they should read as one device. |
| **G10** | Contrast: `--color-border-subtle` is 1.99:1 and `--color-accent-border` is 2.32:1 on the background. Used as card, tag and header-button borders. | `tokens.css` | J | 2 | S | Low | Only matters where a border is the sole identifier of an interactive control. The work-card link and header Contact button carry text as well, so likely acceptable. Confirm, and if not, raise the interactive-border tokens to 3:1. |
| **G11** | 12px text carries primary navigation and every button. | `shell.css` | J | 2 | S | Low | Confirm size at real viewing distance. Raise nav to 14px if it looks small. |

## Passing checks (no action)

- Text contrast: every text/background pair passes AA, most also AAA (primary 14.3:1, secondary 7.6:1, accent 7.6:1, accent-soft 11.1:1, background on accent 7.6:1).
- No cream + terracotta palette, no SaaS card shadows, no em-dash labels, no "→" suffixes.
- Motion is limited to 140ms link colour transitions, respects `prefers-reduced-motion`, and has no entrance animations.
- Google Fonts: one stylesheet request with `preconnect` and `display=swap`. Only latin-subset woff2 files download. No family is unused.
- Spacing has a consistent 8px base (`--space-unit`), and page-section padding is the same on every page.

## Recommended sequence and effort

1. **Batch 0** (decisions): about 1 hour total. Unblocks everything else.
2. **Batch 1** (fonts): about 30 minutes. Fixes real rendering defects (F1, F2), so do it first.
3. **Batch 2** (tokens): about half a day. No visible change, reduces drift.
4. **Batch 3** (spacing): about 1–2 hours. First visible change; S1 is the most likely to have been noticed already.
5. **Batch 4** (headings): about half a day including test updates.
6. **Batch 5** (tells and direction): one item at a time, sized by the Batch 0 decisions.

**Highest ROI if time is short:** F1, F2, S1, T1, T2, T5, T6, S2, G2 and H5. All are XS or S, and together they remove the most visible inconsistencies and the two clearest template tells.

## Follow-up

Turning any batch into work follows the repository workflow: add it to `TODO.md` and plan it with `plan-next-task` before implementation. All of X1–X6 are now decided and recorded in `docs/DECISIONS.md`. The finding IDs in this document (F, T, S, H, G, X) are stable references for plans and commits.
