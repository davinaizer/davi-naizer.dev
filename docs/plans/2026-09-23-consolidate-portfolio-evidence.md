---
title: Preserve Case Studies and repurpose Selected Projects as Experiments
status: approved
createdAt: "2026-09-23T22:00:00+01:00"
updatedAt: "2026-09-25T20:34:00+01:00"
lastModifiedAt: "2026-09-25T20:34:00+01:00"
---

# Preserve Case Studies and repurpose Selected Projects as Experiments

## Project position

- **Completed:** Milestones 1–4, production-only analytics, and Long-Form Reading Rhythm and Content Resilience are complete. Case Studies and Experiments implementation now preserves the professional narratives and transfers UV Insect Trap to the Project collection.
- **Current:** Milestone 5, Evidence-driven evolution. This approved implementation and its current product/engineering guidance are complete, reviewed with `PASS`, and closed.
- **Current content correction:** UV Insect Trap is now the first Experiment in the Project collection; duplicate professional Project records have been retired after their useful metadata was preserved in Case Studies.
- **Next outcome:** Keep Work as the primary navigation destination and retain two distinct evidence areas: professional Case Studies and independent Experiments. Do not merge the pages.
- **Workflow stage:** Approved plan implemented, reviewed with `PASS`, and closed.

## Objective and product fit

Give recruiters and hiring managers detailed professional evidence in Case Studies, while making room for selected projects built outside work in Experiments. Keep Work as the starting point for both. Preserve full case-study narratives and make the former Selected Projects page serve a different purpose rather than duplicating Case Studies.

This follows the Cognitive Fit principle in `AGENTS.md`: avoid duplicate narratives and keep maintenance low, while retaining separate areas where the content has a distinct purpose. Experience and Resume remain the quick career-scan routes.

## Agreed structure

- `/work` remains the Work chooser and primary navigation destination.
- `/case-studies` remains the home for professional case studies: Alfred, Signal template administration, Gamesys promotional-content workflow, and HSBC earlier career.
- The existing `/projects` route is repurposed as **Experiments**, for selected independent projects. Keep the route to avoid unnecessary route churn; update the page title, introductory copy, and Work chooser link, and retain `/projects` in the sitemap as an active destination.
- The home page’s **Beyond the work** section links to Experiments. The link makes the independent work discoverable without adding another home-page content area.
- Move the UV Insect Trap entry out of Case Studies and into Experiments. It is the first entry; other candidates such as Kawaii Bridge, Rhyme Adventure, and the LEGO EV3 project are not required in this implementation.

## Project metadata to preserve in Case Studies

Before retiring the three overlapping Project records, move useful, supported metadata into the matching Case Study. Add optional `technologies` and `relatedExperienceSlugs` fields to `CaseStudy` and render them in its existing metadata column. Keep the experience links functional and preserve the existing outcome qualifications.

| Project record | Retain in Case Study | Remove as duplicate or generic |
| --- | --- | --- |
| Signal — Vessel List Template Administration | Signal experience link; React, TypeScript, MobX, AG Grid, REST APIs | Repeated summary, context, purpose, problem, solution, and outcome; generic capability labels |
| Gamesys — Internal Content-production Workflow | Both Gamesys experience links; Node.js, Jira REST API, GitHub Enterprise REST API; the Case Study’s qualified “reported” outcome | Repeated summary, context, purpose, problem, and solution; generic capability labels; the unqualified duplicate outcome |
| Alfred | Both Alfred experience links; Swift, SwiftUI, REST APIs, Firebase, XCTest, XcodeGen; useful supported detail about use cases, dependency injection, authentication, and deep links | Shorter duplicate summary and narrative fields; generic capability labels |

The current links from Project records are five Experience anchors: one for Signal, two for Gamesys, and two for Alfred. Update the Work chooser to point to both destinations. Keep the existing Projects-to-Case-Studies continuation pointed at `/case-studies`; it remains useful after the rename. `claims` currently has no populated Project evidence references. Retain the `Project` content type for Experiments; review whether the `EvidenceReference` project variant has any active consumer before changing it.

## Experiment content and presentation

Repurpose the existing Projects page and content collection rather than creating another route or a second portfolio system. The Experiments page should make clear that its entries are independent projects, not paid case studies.

The content shape should support software prototypes and physical builds without requiring every entry to use identical sections. Reuse the current Project fields where they fit, and add only what is needed for this work: optional visuals, role/contribution, design or engineering decisions, and reflection. Each entry should be specific about what was built, how it changed, what was observed, and what remains unknown. Do not claim adoption, efficacy, or measured outcomes without evidence.

For the UV Insect Trap, preserve the current story’s useful detail: early suction and light problems; fan and grille trade-offs; the funnel that restricted airflow; assembly and cleaning; the final prototype photo and selected CAD views; the home-use observation; and the unexpected dog response to the steady fan sound. State that the iteration count comes from notes and recollection, and that the reported household result is not a measured mosquito-population change. Keep the voice conversational, practical, and evidence-led, consistent with CognitiveOS writing guidance.

## Scope

- Preserve `/work` as the chooser and primary navigation destination.
- Keep `/case-studies` and its four professional narratives as a distinct destination.
- Add optional technologies and related-experience metadata to Case Studies; populate Signal, Gamesys, and Alfred from the current Project records.
- Carry Alfred’s useful technical details into its case study when supported by the Project and Experience content.
- Retire the three overlapping professional Project records only after their useful metadata and links are preserved in Case Studies.
- Keep the Project model for Experiments. Move UV Insect Trap from the Case Studies collection to the repurposed Projects collection and support its visuals and experiment narrative with small, optional Project fields.
- Rename the Projects page presentation to **Experiments** and update `/work` chooser copy; retain the Experiments-to-Case-Studies continuation with clear wording.
- Add a link from the home page’s **Beyond the work** section to the Experiments page.
- Update the sitemap and current product, roadmap, architecture, decision, TODO, and handoff guidance to reflect the distinct areas. Keep completed TODO items and earlier decisions historical; mark superseded guidance rather than rewriting history.
- Update relevant unit and Playwright coverage for metadata, both destinations, the home-page link, direct entry, refresh, and responsive experiment visuals.

## Exclusions

- No merger of Case Studies and Experiments, and no removal of either page.
- No shortening of existing Case Studies to CV length or removal of supported history.
- No requirement to add Kawaii Bridge, Rhyme Adventure, or LEGO EV3 in this implementation; each remains subject to its own evidence and content review.
- No unsupported efficacy, adoption, metric, ownership, or validation claims.
- No analytics or broader navigation redesign.

## Assumptions, risks, and decisions

- The revised direction supersedes the earlier proposal to show all Case Studies on `/work` as the only evidence area. Work remains the chooser; `/case-studies` and `/projects` remain separate destinations, with `/projects` presented as Experiments.
- `/projects` stays a valid route under its existing path. This avoids a route change while the page’s user-facing name and purpose change.
- The main content risk is losing useful Project metadata while removing duplicate professional Project records. The mapping above is the preservation contract.
- The `Project` type must remain because Experiments will use it. Do not remove it as part of consolidating duplicate professional records. Remove the Project evidence-reference variant only if code inspection confirms there is no consumer and no current need.
- Experiment stories may use different section combinations. Keep optional content fields small and render absent sections cleanly rather than forcing every experiment into a Case Study template.
- Current product guidance should describe two distinct areas. Historical completed TODO entries and previous decisions remain historical, with superseded direction identified and linked to the replacement decision.
- Preserve the TODO sequence: analytics first, then Long-Form Reading Rhythm and Content Resilience, then this work. This plan does not reprioritize those tasks.

## Implementation sequence

1. Move useful metadata before retiring Project records. Add optional `technologies` and `relatedExperienceSlugs` to `CaseStudy`, populate the three matching Case Studies, and render both in the existing metadata column. Carry supported Alfred details about use cases, dependency injection, authentication, and deep links into the Case Study. Preserve the Gamesys outcome’s “reported” qualification.
2. Remove the three duplicate professional Project entries after checking every field and Experience link against the mapping above. Keep the `Project` type and collection for independent experiments. Check whether the `EvidenceReference` project variant has an active consumer before deciding its fate.
3. Repurpose the Projects page and remaining Project collection as Experiments. Move the UV Insect Trap entry and its three selected images there; add only the optional Project fields and rendering needed for its visuals and narrative. Keep experiment claims grounded in the source notes, recollection, and observed home use.
4. Update the Work chooser so its two links clearly lead to Case Studies and Experiments. Add the **Beyond the work** home-page link to the Experiments route. Keep the existing Experiments-to-Case-Studies continuation and the Case Studies-to-Experience links readable and accessible.
5. Update `public/sitemap.xml` to list `/work`, `/case-studies`, and `/projects` as the current evidence destinations. Update product requirements, roadmap, architecture, decisions, TODO, and handoff. Record a replacement decision for the two-area structure and mark the previous single-destination proposal superseded while retaining its historical record.
6. Update focused unit and Playwright coverage. Verify direct entry and refresh at `/work`, `/case-studies`, and `/projects`; confirm the Work chooser and home CTA reach the expected destinations and the Experiments visuals reflow at narrow widths.
7. Run `pnpm validate` and `pnpm build`, review the final content and diff, and update the handoff when the implementation is reviewed and closed.

## Acceptance criteria

- Work remains the primary navigation destination and presents two clearly distinct options: professional Case Studies and independent Experiments.
- `/case-studies` retains Alfred, Signal, Gamesys, and HSBC as detailed professional narratives. The UV Insect Trap is not presented as a professional Case Study.
- Case Studies display the preserved technologies and related Experience links for Signal, Gamesys, and Alfred. Gamesys retains the qualified reported outcome; the unqualified duplicate is absent.
- Alfred’s useful, supported technical details from its Project record are incorporated without inflating claims.
- The existing `/projects` route is titled and described as Experiments and contains the UV Insect Trap as its first entry. Its content structure supports later software or physical experiments without requiring every optional section.
- The home page’s **Beyond the work** section links to Experiments with wording that makes the destination clear.
- No duplicate Signal, Gamesys, or Alfred Project narratives remain in Experiments; their useful metadata and links are preserved in their Case Studies.
- The sitemap includes `/work`, `/case-studies`, and `/projects` as active destinations. Direct entry and refresh work for all three routes.
- Current product and engineering guidance consistently describes the two-area structure. Completed TODO history and superseded decisions remain clearly historical.
- Relevant unit tests, Playwright coverage, `pnpm validate`, and `pnpm build` pass; responsive layout and accessible links are verified.

## Validation

- Run the focused Case Study metadata and Experiments content tests, then run `pnpm test:e2e` for browser coverage.
- Run `pnpm validate` and `pnpm build`; report any pre-existing repository-wide validation issue separately from regressions caused by this change.
- Review Case Studies and Experiments at desktop and narrow widths. Verify direct entry and refresh for `/work`, `/case-studies`, and `/projects`, the Work chooser destinations, and the home-page Experiments link.

## Approval gate

This approved plan records the user's direction to retain two distinct evidence areas and repurpose Selected Projects as Experiments. The implementation and current guidance updates are delivered, formally reviewed with `PASS`, and closed.
