---
createdAt: 2026-09-26
updatedAt: 2026-09-26
version: 1.1
status: complete
---

# Atelier Florae Experiment

## Objective

Add an independent Experiment documenting the Atelier Florae launch work from founder questionnaire and brand direction through 100 g candle packaging, customer touchpoints, early sales, and anonymous feedback.

## Scope

- Add one manually curated `Project` record to `src/content/evidence-content.ts`.
- Use the existing Experiment page and content contract without adding a route or schema.
- Add the accessible botanical seal and 100 g label sheet as public-safe visual references. The brand board was removed at review: it is an AI-generated concept with inaccurate details and a larger-format jar, not the final identity.
- Describe the beauty-salon and word-of-mouth launch channels, 85 candles sold over two months, and the five-response survey as evidence-qualified outcomes.
- Add focused assertions for the new narrative, outcomes, and visual assets.

## Exclusions

- No financial figures, customer names, payment QR codes, or raw survey responses.
- No claim that branding caused the sales outcome.
- No 200 g product image in the launch narrative; it is treated as an unconfirmed alternate or concept direction.
- No claims about the planned soap range beyond the fact that expansion was considered but did not continue after the move to the UK.
- No gallery-directory import, CMS, data pipeline, or new content abstraction.

## Evidence boundary

- Brand and packaging decisions are supported by the Atelier Florae export and supplied design files.
- Sales quantity, channels, anecdotal repeat purchases by some customers (no recorded count), and the decision not to publish financial figures are user-confirmed.
- Survey ratings and qualitative feedback are supported by the anonymous five-response CSV.
- Survey findings are early directional feedback, not representative validation or observed repeat purchasing.

## Validation

- Focused Experiment page tests and accessibility checks.
- `pnpm validate`.
- `pnpm build`.
- `pnpm test:e2e`.
- Manual review of the Experiment at desktop and 320 px widths, including image loading and absence of horizontal overflow.
