---
title: Cloudflare Web Analytics manual rollout evidence
status: verified
createdAt: 2026-09-24
updatedAt: 2026-09-24
---

# Cloudflare Web Analytics Manual Rollout

## Scope

Implement the approved manual, production-only Cloudflare Web Analytics snippet and a persistent, on-demand opt-out control.

## Verified in the repository

- `src/app/cloudflare-analytics.ts` uses the newly generated public Cloudflare site token supplied by the developer.
- The beacon is added only in a production build on `davi-naizer.pages.dev`, unless an opt-out is stored in browser local storage.
- The loader fails closed if local storage cannot be read and avoids adding a second script when a Cloudflare beacon is already present.
- The footer provides an on-demand analytics settings dialog without an entry-time popup. The saved preference is applied on subsequent document loads.
- The disclosure describes the provider, analytics purpose, page/referrer/country/device/performance categories, Cloudflare's reported retention, and the opt-out control.
- Cloudflare's automatic Pages injection was disabled and a manual Web Analytics site was created, as reported by the developer. The newly generated token is configured in the source.

## Deployment verification

- On production, the manual beacon script loaded on initial entry. SPA route navigation produced Cloudflare RUM requests that returned HTTP 204.
- After opting out and reloading, the manual beacon script did not load. Re-enabling analytics restored it on the next document load.
- On `develop.davi-naizer.pages.dev`, no Cloudflare beacon script or analytics requests were observed.
- The developer manually tested the deployed analytics setup and Cloudflare dashboard and reported them working as expected.

## Repository validation

- `pnpm validate` passed: TypeScript, Biome, and 33 tests.
- `pnpm build` passed.
- `pnpm test:e2e` passed: 12 tests.
- PR #7's Quality and Cloudflare Pages checks passed.
- Cloudflare's dashboard range discrepancy remains documented in the approved plan: this site exposed a 30-day selectable range, while Cloudflare documents up to six months of data availability.
