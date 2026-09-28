---
createdAt: 2026-09-28
updatedAt: 2026-09-28
version: 1.0
status: complete
---

# Replace Inter with IBM Plex Sans

Developer-directed. Approved 2026-09-28. Supports PRODUCT_REQUIREMENTS 4.1 (job applications) and engineering judgement. Milestone 5.

## Objective

Replace Inter with IBM Plex Sans as the site's sans family. Newsreader and IBM Plex Mono are unchanged, and the family roles are unchanged: Newsreader for headings, sans for body and interface text, mono for labels and metadata.

## Evidence and decision

- Developer visual review of four rendered variants (Inter, Libre Franklin, IBM Plex Sans, Atkinson Hyperlegible Next) on 2026-09-28. The developer judges Inter overused and startup-generic and chose IBM Plex Sans.
- Rationale: Plex Sans and Plex Mono are drawn as one family; Plex Sans is less overused than Inter; the choice is straightforward to justify.
- Alternatives considered: Libre Franklin (strongest editorial pairing, wider set) and Atkinson Hyperlegible Next (accessibility story, most personality-forward).
- Related: DECISIONS.md 2026-09-27 (three families kept, roles fixed). This plan does not reopen it.
- Material decision: `public/social-preview.png` was rendered with Inter. The developer chose option A: regenerate it with Plex Sans, consistent with the wordmark-square-stop precedent (option C).

## Scope

- `index.html`: replace the Inter request with `IBM+Plex+Sans:wght@400;500`.
- `src/styles/tokens.css`: set `--font-family-sans` to `"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif`.
- Retune metrics (letter-spacing, sizes, widths) only where a regression is observed, using existing tokens first.
- Regenerate `public/social-preview.png` (1200x630, same layout, Newsreader, IBM Plex Sans, IBM Plex Mono, square stops, flat `#131313`).
- Update `docs/design/DESIGN.md` (family name); add a `docs/DECISIONS.md` entry.

## Exclusions

Newsreader, Plex Mono or role changes; new weights or dependencies; self-hosting fonts; fallback size-adjust tuning; content, colour or layout redesign; rewriting historical decision, audit, plan and handoff prose that mentions Inter.

## Assumptions and risks

- Weights 400 and 500 only: those are the only sans weights in use (audit F3 removed the unused ones). Plex Sans has no optical-size axis.
- Plex Sans sets wider than Inter: check nav, chips and buttons for wrapping at desktop, `56rem`, `40rem` and 320px.
- Tracking on sans-set text was tuned for Inter: fix only visible regressions.

## Completion criteria

| Outcome | Evidence |
|---|---|
| No Inter remains in the shipped site (token, font request, DESIGN.md, social preview) | search of `src`, `index.html`, `docs/design/DESIGN.md`; visual check of the preview |
| Plex Sans loads and renders at 400 and 500 | `document.fonts` check in a browser |
| No wrapping or overflow regression at desktop, 56rem, 40rem, 320px | manual check on Home, Work, a project page, Resume, Contact, Not Found |
| Focus, contrast and accessibility unchanged | `pnpm test` (axe); visible focus spot check |
| Decision and design docs accurate | `DECISIONS.md` entry; `DESIGN.md` diff |
| Repository deployable | `pnpm typecheck`, `biome check src`, `pnpm test`, `pnpm build`, `pnpm test:e2e` |

`pnpm validate` still fails on the known unrelated `.claude/settings.local.json` formatting issue; scoped checks apply.

## Review trigger

Revisit if any wrapping or width regression appears at 320px, or if the sans reads poorly beside Newsreader in production.
