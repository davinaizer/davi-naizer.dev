---
title: Professional Site Analytics Baseline
status: complete
createdAt: 2026-09-16
updatedAt: 2026-09-24
---

# Professional Site Analytics Baseline

## Objective

Establish the smallest defensible, zero-cost analytics baseline for the production Professional Site using Cloudflare Web Analytics, with Google Search Console retained as the complementary search-visibility source.

The baseline should reduce uncertainty about route usage, discoverability, and real-user performance without turning the content-first site into a product-analytics system.

## Project position

- **Completed:** The MVP, release-readiness review, production Lighthouse diagnostics, analytics platform comparison, production Cloudflare Web Analytics activation, and the approved manual, production-only analytics rollout.
- **Current:** Production route and performance signals are observable through the manual beacon. The footer provides the disclosure and persistent opt-out; develop and local environments do not send analytics requests.
- **Next outcome:** Use the verified aggregate signals as bounded evidence for future content, UX, and performance decisions without turning the site into a product-analytics system.
- **Workflow stage:** This plan is implemented, reviewed with `PASS`, and closed on 2026-09-24.

## Product objective and roadmap milestone

This task supports the objectives to:

- support job applications;
- maintain frontend engineering fluency; and
- demonstrate engineering judgement.

It advances Milestone 5 — Evidence-Driven Evolution by adding measurement only where it can improve a real product or engineering decision.

## Decision context

### Observed

- The application is a browser-only React and TypeScript site with static, manually curated content.
- The production deployment is hosted on Cloudflare.
- Traffic volume is not a product success metric.
- Local and Lighthouse measurements exist, but field performance evidence is unavailable.
- The current site has no known requirement for custom events, campaign attribution, session replay, experiments, or user identification.

### Inferred

- Route usage, referrers, device context, and real-user performance are useful first signals.
- Direct measurement of resume or contact intent may become useful, but it is not currently a demonstrated blocker.
- A low-maintenance, reversible baseline has higher expected value than a more capable platform that creates additional configuration and privacy burden.

### Unknown

- Whether production traffic will be sufficient to produce useful field performance trends.
- Whether the current dashboard's maximum selectable range of 30 days reflects the effective history available for this site; Cloudflare documentation separately states six months.
- Whether direct resume-download, contact-link, or campaign measurement will later be needed.
- Whether Cloudflare's actual processing arrangement and the applicable treatment in each target EU jurisdiction support the statistical-only opt-out model; this plan does not make a legal conclusion.

## Working model

### Cloudflare Web Analytics

Use Cloudflare Web Analytics for:

- page views and visits;
- route and path usage, including client-side route changes;
- referrers;
- country-level location;
- device, browser, and operating-system context; and
- real-user performance and Core Web Vitals where traffic is available.

Cloudflare's current documentation states that Web Analytics is free, privacy-focused, supports SPA route tracking, and does not currently support UTM parameters or custom events. Its FAQ states that unsampled beacon data is retained for seven days, after which it is aggregated, and that analytics data is available for up to six months. The current dashboard evidence for this site exposes a maximum selectable range of 30 days; treat this as an observed dashboard-range limit, not as the retention period.

### Google Search Console

Use Google Search Console separately for:

- search impressions;
- search clicks;
- click-through rate;
- average position; and
- search queries and pages.

Search Console is complementary search evidence, not a replacement for site analytics and not a runtime dependency of the application.

### Privacy and consent treatment

Use Cloudflare Web Analytics only for aggregate statistical information used to improve the site. Do not track individual users, collect identity data, create profiles, monitor cross-site behaviour, measure advertising, or add custom events. Provide a clear analytics/privacy disclosure and a simple, free way to disable analytics. Do not show an entry-time popup: provide a persistent footer link that opens an accessible, compact analytics-settings panel. Analytics remains enabled by default under this opt-out model, and a saved opt-out prevents the beacon from loading on subsequent document loads. A mandatory consent banner or full consent-management platform is not part of this narrowly scoped model.

This is a working product and engineering treatment, not a legal conclusion for every UK or EU jurisdiction. The implementation must preserve the stated data boundary, identify Cloudflare and the relevant processing in the disclosure, verify the opt-out behaviour, and reassess the treatment if the audience, jurisdiction, processing, or purpose changes.

## Scope

- Confirm the Cloudflare Pages project and production hostname that should receive analytics.
- Use the newly generated public site token from the manual Web Analytics setup. The previous automatic Pages injection has been disabled.
- Load the manual Cloudflare beacon only on the confirmed production hostname and only when the visitor has not saved an opt-out.
- Verify page, route, referrer, device, and real-user performance signals where data is available.
- Confirm that preview and local environments are not included in the production measurement baseline.
- Add a persistent footer entry to an on-demand analytics-settings panel with a clear disclosure and one control to enable or disable analytics. Persist only the opt-out preference locally; do not show an entry-time popup.
- Record the observed setup, available signals, limitations, processing boundary, and privacy treatment in `docs/evidence/2026-09-24-analytics-manual-rollout.md`.
- Confirm Google Search Console remains the complementary search-visibility source.

## Explicit exclusions

- No Umami, PostHog, Google Analytics 4, or second behavioural analytics platform.
- No custom event or funnel workaround for resume downloads, contact links, or external-profile clicks.
- No UTM or campaign-attribution implementation in this task.
- No session replay, heatmaps, user identification, personal information, form content, or arbitrary event properties.
- No analytics npm dependency, API, server-side persistence layer, or dedicated runtime data model. Use only a single local browser preference to persist the opt-out.
- No general public-content rewrite or new product area; only the minimal analytics/privacy disclosure and opt-out control required by the accepted decision.
- No entry-time popup, mandatory consent banner, or full consent-management platform unless a jurisdiction-specific review or changed processing scope requires it.
- No performance optimisation based solely on newly collected telemetry; telemetry is evidence, not authorisation for unrelated remediation.

## Risks and controls

| Risk | Control |
| --- | --- |
| Low traffic produces unstable or unavailable field data | Report data availability honestly and keep Lighthouse results labelled as lab diagnostics. |
| Preview or developer activity pollutes production evidence | Disable Cloudflare automatic injection and load the manual snippet only on the confirmed production hostname; exclude owned traffic where the platform supports it. |
| Analytics is mistaken for career-outcome evidence | Treat page views, visits, and route journeys as behavioural proxies only; use direct recruiter and interview feedback for outcomes. |
| Vendor limitations create pressure for speculative tooling | Use the review triggers below; do not add a second platform without a demonstrated decision need. |
| The statistical-only treatment is not applicable in a target jurisdiction or Cloudflare cannot honour opt-out | Keep the purpose and data boundary narrow; document the jurisdictional finding and disable analytics or introduce a consent-gated integration only through an approved scope change. |
| Privacy expectations change or are unclear | Publish clear information, provide a simple free opt-out, and do not infer legal compliance from vendor claims. |

## Completion criteria

- Cloudflare Web Analytics is enabled through manual JS snippet installation and verified for the confirmed production deployment.
- Analytics data is observable for current production routes and real-user performance where traffic is available.
- Preview and local environments are excluded from the production baseline.
- The persistent footer settings link opens an accessible panel; no popup appears on initial entry.
- Analytics loads by default on production only, while a saved opt-out prevents the beacon from loading on subsequent document loads. The visitor can change the preference later from the footer.
- The known limitations are explicit: no custom events, UTM attribution, direct resume/contact-click measurement, or guaranteed long-term history; Cloudflare documents seven-day unsampled retention followed by aggregation and up to six months of analytics availability, while this site's dashboard currently exposes a maximum selectable range of 30 days.
- A clear analytics/privacy disclosure identifies the purpose, provider, relevant data categories, retention boundary, and opt-out path.
- The opt-out prevents subsequent analytics beacon collection, or the integration is disabled if that behaviour cannot be verified.
- The statistical-only treatment is recorded as a working product and engineering model, not a universal legal conclusion.
- No personal information, identity data, session replay, or arbitrary event properties are collected.
- Google Search Console is recorded as the complementary source for search visibility and queries.
- No additional analytics platform or unnecessary application dependency is introduced.
- No unvalidated career, recruiter, interview, or user-intent conclusion is drawn from analytics data.

## Implementation sequence

1. Confirm the production Cloudflare Pages project, hostname, and current deployment state. **Completed.**
2. Disable the previous automatic injection and create the manual Web Analytics site in Cloudflare. **Completed.**
3. Add the manual snippet to the application so it loads only on the production hostname and only when no opt-out preference is stored; do not add an analytics dependency. **Completed.**
4. Implement the persistent footer link and accessible, on-demand settings panel with the approved disclosure and opt-out control. Keep analytics enabled by default and apply a saved opt-out on subsequent document loads. **Completed.**
5. Deploy the manual configuration and source change. **Completed.**
6. Verify direct entry, client-side navigation, refresh, and representative routes in the production deployment. **Completed.**
7. Verify route beacon delivery, production-only loading, opt-out behavior, and Cloudflare signal ingestion. **Completed:** production RUM requests returned HTTP 204; the developer also manually confirmed the dashboard and settings behavior.
8. Confirm Search Console remains separate and complementary. **Confirmed.**
9. Record the observed setup, available signals, limitations, processing boundary, privacy treatment, and any unresolved jurisdictional unknowns in the implementation evidence. **Completed.**

## Validation

- The manual Cloudflare configuration was reported by the developer; live response and browser checks verified the manual production beacon and no analytics requests on the develop deployment.
- Production browser checks verified route beacon delivery, opt-out on subsequent page loads, and re-enabling from the footer settings.
- The footer settings panel was verified as on-demand, accessible, and usable at narrow widths.
- Source review confirmed no identity data or custom event properties are added.
- `pnpm validate`, `pnpm build`, and `pnpm test:e2e` passed; PR #7's Quality and Cloudflare Pages checks passed.
- Implementation evidence is recorded in `docs/evidence/2026-09-24-analytics-manual-rollout.md`.

## Rollback

Disable Cloudflare Web Analytics through the confirmed Cloudflare Pages or Web Analytics configuration. If a manual snippet was added, remove only that integration and redeploy. Rollback must not alter public content, route behaviour, or the application's content model.

## Review triggers

Reassess this working model only when a demonstrated need requires:

- direct measurement of resume, contact, or external-profile actions;
- UTM campaign attribution;
- history beyond the available Cloudflare retention period;
- detailed interaction diagnosis;
- experiments or feature flags; or
- analytics for a genuinely interactive product area.

## References

- [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/about/)
- [Cloudflare Web Analytics for SPAs](https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/)
- [Cloudflare Web Analytics FAQ](https://developers.cloudflare.com/web-analytics/faq/)
- [Google Search Console Performance report](https://support.google.com/webmasters/answer/7576553)
- [Product requirements](../../PRODUCT_REQUIREMENTS.md)
- [Architecture](../ARCHITECTURE.md)
- [Decision record](../DECISIONS.md#use-cloudflare-web-analytics-as-the-initial-zero-cost-baseline--2026-09-16)
