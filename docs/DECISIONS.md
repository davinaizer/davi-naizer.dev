---
createdAt: 2026-08-07
updatedAt: 2026-09-26
version: 1.25
status: active
order: ASC
---

# Decisions

## Do not merge Case Studies and Experiments; revamp project-page UX within the two areas — 2026-09-26

**Decision:** Do not merge Case Studies and Experiments into a single route or evidence area. The two-area structure from 2026-09-25 stands: `/work` remains the chooser, `/case-studies` holds professional evidence, and `/projects` remains the stable public URL for Experiments. Replace the planned merge work with a UX/UI revamp of how projects are presented inside those areas: individual project pages, a shared project-page layout, and area index pages that preview projects instead of rendering every project in full. The detailed scope, routes, and acceptance criteria belong to the approved task plan.

**Rationale:** The merge was proposed before UV Insect Trap and Atelier Florae were identified as further independent experiments. With more experiments to add, the professional versus independent distinction carries more weight, and the observed problem is the presentation within each area (every project concatenated on one page, no single-project page, no in-page navigation, inconsistent visuals) rather than the existence of two areas. Revamping presentation addresses that problem without route churn or breaking URLs already shared.

**Consequence:** The flat `/work/<slug>` routing and removal of the Work chooser proposed in the 2026-09-26 project-page design PRD are not adopted. Project pages must remain within their existing area, and the primary navigation, sitemap entries for `/work`, `/case-studies`, and `/projects`, and the `CaseStudy` and `Project` content types are retained unless the task plan justifies a specific change.

**Review triggers:** Reconsider a merged or flattened structure only under the 2026-09-25 review triggers, in particular if visitor evidence shows the Work chooser is unclear.

**Supersedes:** The earlier plan to merge Case Studies and Experiments into one area.

## Keep professional Case Studies and independent Experiments as distinct Work destinations — 2026-09-25

**Decision:** Keep `/work` as the evidence chooser and maintain two distinct areas: `/case-studies` for detailed professional evidence and `/projects` presented as Experiments for selected independent builds and prototypes. Keep `/projects` as the stable public URL while naming its route constant and page presentation `experiments`. Link to Experiments from Home's “Beyond the work” section. Keep the `Project` content type for Experiments, with optional visuals, role or contribution, decisions, and reflection so entries can use only the sections that fit. Preserve professional Project metadata and Experience links in their Case Studies before removing duplicate Project narratives.

**Rationale:** Professional Case Studies and independent experiments have different evidence contexts. Keeping them separate helps visitors understand the distinction, avoids duplicated professional narratives, and gives personal prototypes room for observed details and unknowns without forcing them into the professional case-study structure. Reusing `/projects` avoids route churn while making the purpose of the destination clear.

**Consequence:** Work remains the entry point to both areas; the shell's primary navigation remains unchanged. The sitemap retains `/work`, `/case-studies`, and `/projects`. Experiment entries remain manually curated Project records, and claims continue to own any evidentiary references rather than adding reciprocal relationships.

**Review triggers:** Reconsider the two-area structure if repeated content maintenance demonstrates duplication, if independent experiments cannot be distinguished clearly from professional evidence, or if visitor evidence shows the Work chooser is unclear.

**Supersedes:** The earlier planning proposal to present all Case Studies on `/work` as the only evidence area. That proposal remains historical; the approved two-area direction is recorded in `docs/plans/2026-09-23-consolidate-portfolio-evidence.md`.

## Use a central CSS import manifest for layered route-owned styles — 2026-09-19

**Decision:** Keep route-owned stylesheet files colocated with their route components in `src/pages/`, using matching filenames and page-prefixed selectors. Import those files through `src/index.css` with explicit `@layer pages` assignments instead of direct component imports. Keep `src/index.css` as the ordered manifest for all static CSS so reset, tokens, shared styles, and route styles have a deterministic cascade order. This supersedes the direct component import and non-registry portions of the 2026-08-14 route-owned CSS decision.

**Rationale:** Explicit cascade layers require a stable stylesheet import boundary. A central manifest makes the layer order visible and deterministic while preserving file ownership and route-level discoverability. The current application statically loads all route modules, so moving CSS imports into the manifest does not introduce a demonstrated loading or code-splitting cost. This avoids CSS Modules, a dependency, or a broader styling abstraction.

**Consequence:** Route CSS remains easy to find beside its owning page, but page components no longer import their styles directly. New route-owned styles must be added to both `src/pages/` and the `pages` section of `src/index.css`. The manifest is now responsible for preserving the documented cascade order; route-specific selectors remain prefixed to limit collisions.

**Review triggers:** Reconsider this boundary if route-level code splitting becomes necessary, static CSS loading creates measurable performance cost, the manifest becomes difficult to maintain, or a scoped styling approach provides a concrete benefit without weakening discoverability.

**Deferred:** CSS Modules, utility frameworks, dynamic stylesheet loading, and generated CSS manifests remain undefined until a demonstrated requirement justifies them.

## Extend the shared CSS pattern layer for evidence-list reuse — 2026-09-19

**Status:** The shared evidence-list structure remains in use; Projects is now presented as Experiments under the 2026-09-25 two-area decision.

**Decision:** Extend `src/styles/patterns.css` beyond the original four semantic patterns to own the verified base structure shared by the Projects and Case Studies evidence lists. Keep route-specific grid widths, content modifiers, list resets with cascade-sensitive overrides, and responsive modifiers in the colocated page stylesheets. Do not change the rendered DOM or introduce generic utility classes.

**Rationale:** Projects and Case Studies have stable semantic reuse across their list containers, entries, metadata structure, typography, and base spacing. The shared declarations remove substantial duplication without erasing the meaningful route-specific differences. Keeping cascade-sensitive and responsive overrides local avoids lower-layer shared rules overriding page-owned behavior.

**Consequence:** `patterns.css` now contains a small cross-route evidence-list pattern using the existing page-prefixed selectors. New evidence-list variants should first demonstrate the same structure and cascade boundary before joining the shared selectors. No React component abstraction or dependency is introduced.

**Review triggers:** Reconsider this boundary if the Projects and Case Studies structures diverge, shared selector lists become difficult to maintain, route-specific exceptions multiply, or a scoped styling approach provides a concrete benefit.

**Deferred:** Shared Work/Contact list patterns, generic list-reset utilities, generic metadata or action-link classes, CSS Modules, utility frameworks, and React wrapper components remain undefined until demonstrated reuse or a concrete requirement justifies them.

## Use Cloudflare Web Analytics as the initial zero-cost baseline — 2026-09-16

**Decision:** Use Cloudflare Web Analytics as the initial production analytics baseline for the Professional Site, limited to aggregate statistical analytics that improve the site. Use Google Search Console as the complementary source for search visibility and queries. Do not track individual users, collect identity data, create profiles, monitor cross-site behaviour, measure advertising, add custom events, or introduce Umami, PostHog, Google Analytics 4, or another behavioural analytics platform at this stage. Provide a clear analytics/privacy disclosure and a simple, free way to disable analytics. A mandatory consent banner is not the default for this narrowly scoped model.

**Rationale:** The site is already hosted on Cloudflare, and the current product is a browser-only, static, manually curated professional-evidence site. Cloudflare provides a free, low-maintenance way to observe route usage, referrers, devices, and real-user performance while the site has no demonstrated need for advanced product analytics. The intended signals align with aggregate site-improvement analytics rather than user tracking. This is a reversible, proportionate commitment that addresses the current absence of field performance evidence without optimising analytics as an isolated subsystem.

**Consequence:** The baseline can inform content findability, route usage, and real-user performance decisions, but it cannot directly measure custom actions such as resume downloads or contact-link clicks, UTM campaigns, or custom funnels. The initial measurement must remain production-only and must not collect personal information, identity data, session replay, or arbitrary event properties. The public disclosure must identify Cloudflare, the statistical purposes, the relevant data categories, the retention boundary, and the opt-out path. The implementation must verify that an opt-out prevents subsequent beacon collection. This is a working product and engineering treatment, not a legal conclusion for every UK or EU jurisdiction; applicable local requirements must be reassessed before relying on the model in a new audience or jurisdiction. Page views and visits are behavioural evidence, not evidence of recruiter engagement, interview impact, or career outcomes.

**Review triggers:** Reassess the platform and privacy treatment if a real decision requires custom events, direct CTA measurement, UTM attribution, history beyond the available retention period, advanced interaction diagnosis, experiments, measurement for a genuinely interactive product area, individual-level processing, a new audience or jurisdiction, or a Cloudflare configuration that cannot honour the opt-out. Do not add another platform solely to obtain more detailed metrics without a demonstrated decision need.

**Deferred:** Umami, PostHog, Google Analytics 4, session replay, heatmaps, custom event taxonomy, campaign attribution, a full consent-management platform, a mandatory consent banner, and a dedicated analytics data layer remain undefined until a review trigger demonstrates that the Cloudflare baseline or its privacy treatment is insufficient.

## Use the resume builder as canonical professional copy — 2026-09-15

**Decision:** Treat `/Users/naizer/Workspace/markdown-resume-builder/source/canon-resume` as the canonical source for professional summary and experience copy. The Professional Site remains a manually curated public projection and may add approved project and case-study narrative, but it must not contradict the canonical résumé content.

**Rationale:** Maintaining the same career wording independently in two repositories creates avoidable drift in role names, chronology, attribution, technologies, and measured outcomes. The resume builder already owns the reviewed professional narrative.

**Consequence:** When professional copy differs, validate it against the canonical resume-builder source and update the site projection accordingly. Website-specific navigation, labels, calls to action, project framing, and case-study structure remain owned by this repository. The site does not import the other repository at runtime or build time.

**Review triggers:** Reconsider the manual projection only if repeated synchronization work justifies a separate approved export contract. Do not introduce a runtime dependency between the repositories.

## Remove the Engineering area and obsolete routes — 2026-09-15

**Decision:** Remove the Engineering route and area permanently from the product scope. Communicate engineering judgement through professional experience, selected projects, case studies, and the implementation itself rather than through a separate destination. Remove the obsolete `/summary` compatibility redirect because Home is the only supported destination for professional-summary content.

**Rationale:** A separate Engineering area would duplicate evidence already expressed more clearly through career context and concrete work. Removing it simplifies the information architecture and keeps the website focused on professional experience and case studies. Publicly reachable placeholder or legacy routes also conflict with the requirement that every page justify its existence.

**Consequence:** `/engineering` and `/summary` use the standard not-found route. Primary navigation contains Experience, Work, and Resume, with Contact presented separately. Product requirements, roadmap scope, architecture, content contracts, and execution tracking no longer include a standalone Engineering area.

**Review triggers:** Reconsider the overall information architecture only if evidence from real users shows that professional experience, projects, and case studies cannot communicate engineering judgement clearly. Do not restore the Engineering route as a default expansion path.

## Consolidate Professional Summary into Home — 2026-09-15

**Decision:** Remove the dedicated Professional Summary page because Home already renders the same approved summary and complete focus-area content. Keep the shared professional-summary content contract because Home consumes it. The later “Remove unfinished and obsolete routes” decision supersedes the original compatibility redirect.

**Rationale:** The dedicated route added no unique evidence, context, or interaction and was discoverable only through a Home-page action. Consolidating the content removes an unnecessary navigation step and better satisfies the product requirement that every page justify its existence.

**Consequence:** Home is the sole presentation owner for the professional summary and focus areas. The Summary component, route constant, route-specific styling, test, Home action, and legacy redirect are removed.

**Review triggers:** Introduce a dedicated summary destination again only when approved content or a user need cannot be represented clearly on Home without harming its hierarchy or initial comprehension.

## Allocate Alfred: What To Do Next as the first case study — 2026-08-31

**Status:** The case-study allocation remains current. The companion Alfred Selected Projects record was retired under “Keep professional Case Studies and independent Experiments as distinct Work destinations — 2026-09-25.”

**Decision:** Allocate Alfred to the Case Studies area as **Alfred: What To Do Next**, using the stable slug `alfred-what-to-do-next`. Treat Alfred and the possible future name UpNext as the same project identity; UpNext is not used as the current public case-study name. Keep the existing `alfred` Selected Projects record unchanged as the shorter project projection. Beacon remains deferred.

**Rationale:** The reviewed Alfred evidence provides the strongest current basis for one deeper narrative: clear product intent, mobile UX and implementation ownership, layered architecture, asynchronous recommendation integration, explicit decision states, and broad test coverage. The evidence also gives clear limits: the work is exploratory, and user validation, adoption, public launch, market success, and unsupported metrics are unavailable.

**Consequence:** The first populated `CaseStudy` record expands the existing Alfred project narrative without importing source material, private paths, provenance, or governance metadata. Public copy must preserve the shared product-direction and backend-ownership boundary and must describe results as implementation evidence rather than validated user or business outcomes.

**Review triggers:** Reconsider the public name if the project is formally renamed, if new evidence changes the approved contribution or confidentiality boundary, or if public validation establishes a stronger outcome. Any later allocation of Beacon or another case study remains a separate decision.

## Use explicit fields for reusable case-study narratives — 2026-08-31

**Decision:** Define `CaseStudy` with explicit fields for context, problem, role, constraints, decisions, product and user experience, engineering, outcomes, and reflection. Render each field as a named page section and keep case-study content manually curated.

**Rationale:** A case study needs a repeatable narrative that supports product, UX, engineering, attribution, outcomes, and interview reflection without hiding meaning inside a generic approach field or flexible content-block system. Explicit fields keep the content contract understandable and make omissions visible during editorial review.

**Consequence:** The case-study contract is stricter than the project contract and does not inherit optional narrative fields. The page supports fixture-driven verification of populated content, while case-study content and allocation remain governed by separate approved decisions.

**Review triggers:** Reconsider the fields if an approved case study cannot be represented clearly, repeated narrative changes create meaningful maintenance pressure, or a demonstrated product requirement requires a different content boundary. Any flexible block model, content source, or governance metadata proposal remains a separate decision.

## Select a small set of distinct evidence projects — 2026-08-24

**Status:** Historical selection decision. The three professional Project records were retired after their useful metadata was preserved in Case Studies; see “Keep professional Case Studies and independent Experiments as distinct Work destinations — 2026-09-25.”

**Decision:** Select three public-safe project narratives for the Selected Projects area: **Vessel List Template Administration**, **an internal content-production workflow**, and **Alfred**. Map them to the existing experience entries for Signal, Gamesys / Bally's, and the independent product venture / planned career break respectively. Use these narratives to represent distinct evidence dimensions: production product and frontend delivery; workflow-oriented product engineering and automation; and recent product-engineering ownership, architecture, and learning in an unfamiliar ecosystem.

**Rationale:** The set is intentionally small and avoids representing every employer or technology. Vessel List Template Administration provides the clearest recent production React and TypeScript product evidence. The internal content-production workflow adds distinct systems, workflow, validation, and delivery evidence without exposing internal project details. Alfred is the most recent project and validates the product-engineer direction through end-to-end product development, shared product and architecture decisions, and recent work in an unfamiliar ecosystem. Together they add depth beyond the CV without duplicating the same narrative.

**Consequence:** The selected identities are public-safe working descriptions rather than an import of PKM project records. Future project content must remain within the approved experience evidence, contribution boundaries, outcome confidence, and confidentiality rules. Alfred must be described as recent exploratory or private-validation work where applicable; no public-launch, adoption, or market-success claims are implied. The separate Alfred case-study allocation keeps the existing Selected Projects record as its shorter projection. Beacon's micro-frontend POC is not part of this set and remains deferred.

**Review triggers:** Reconsider the set if a selected narrative cannot be represented clearly by the existing `Project` contract, public-safe review disallows its current abstraction, or later approved content demonstrates that another candidate provides more distinct evidence with less duplication. Any decision to allocate Alfred to a case study or replace it with Beacon must be made before project content implementation and recorded separately.

**Deferred:** Project records, final public copy, stable project slugs, evidence relationships, project-page rendering, and Beacon implementation remain deferred to later approved tasks.

## Establish public evidence governance rules — 2026-08-24

**Decision:** Treat evidence confidence, contribution boundaries, and confidentiality as editorial publication gates for manually curated public content rather than public application metadata or runtime validation. Publish claims and outcomes only when the available evidence supports the strength of the statement. Distinguish measured outcomes from qualitative outcomes, and omit or reframe unsupported, uncertain, or unverifiable claims. Describe personal contribution separately from team, client, or organisational contribution without implying sole ownership where the work was collaborative. Distinguish production work from exploratory work. Publish only approved public-safe abstractions, excluding confidential employer or client information, private metrics, internal system details, secrets, personal information, and private source-governance metadata.

**Rationale:** The product must provide useful professional evidence without overstating ownership, impact, certainty, or public disclosure. Editorial gates preserve honest boundaries while keeping the public content model small, static, and manually curated. Confidence and confidentiality are properties of the publication decision and source governance, not information that the public application needs to render or resolve.

**Consequence:** The `Project`, `CaseStudy`, `Outcome`, and `ProfessionalClaim` contracts contain only public presentation data. Narrative fields and outcomes support clear contribution boundaries but do not certify evidence or encode private governance state. Future content must be reviewed against these rules before it is added to the public repository. When evidence or confidentiality is uncertain, the content is excluded or rewritten at a safer level of abstraction.

**Review triggers:** Reconsider this policy if repeated editorial errors show that manual review is insufficient, public users need an explicit evidence-status presentation, or an approved public content source requires a different governance boundary. Any schema, runtime validation, provenance, or synchronisation proposal must be reviewed as a separate decision.

**Deferred:** Public confidence labels, publication-status fields, provenance, source links, confidentiality metadata, automated content governance, PKM import or synchronisation, and claim content remain undefined until a demonstrated requirement and separate approved task justify them.

## Define claim-owned relationships between evidence and professional experience — 2026-08-24

**Decision:** Add stable `slug` identifiers to `ExperienceEntry`, define `EvidenceReference` as a discriminated reference to a project or case-study record, and define `ProfessionalClaim` with optional experience references and required supporting-evidence references. Add an empty claims collection to `ProfessionalContent`. Claims own the one-way relationships; evidence and experience do not store reciprocal claim arrays.

**Rationale:** The PKM schema makes claims the reusable assertion boundary and lets claims reference the experiences and evidence that support them. A claim-owned relationship model preserves that ownership without importing PKM entities, wiki links, provenance, or a general knowledge graph. Stable slugs make the manually curated public projection addressable without coupling identifiers to display copy.

**Consequence:** Existing experience copy remains unchanged while each entry gains a stable public slug. The current site content contains no claim records yet; `ProfessionalContent.claims` is initialised empty. Evidence references are manually curated strings distinguished by evidence kind, with no runtime resolver or reciprocal relationship state.

**Review triggers:** Reconsider the relationship owner when public content requires derived reverse indexes, relationship resolution becomes error-prone, or a validated content source replaces manual curation. Review the identifier strategy if display-independent stable slugs cannot remain unique.

**Deferred at the time of this decision:** Evidence confidence, contribution-boundary, and confidentiality rules were left to a separate governance decision; claim content, relationship rendering, and PKM import or synchronisation remain deferred.

## Use project-owned presentation connections for selected-project context — 2026-08-31

**Status:** The optional fields remain part of the Project content contract. Current professional evidence connections are rendered on the corresponding Case Studies under the 2026-09-25 two-area decision; the Project model remains for independent experiments.

**Decision:** Store optional `relatedExperienceSlugs` and capability labels on manually curated `Project` records. Use stable `ExperienceEntry.slug` values for one-way navigation from selected projects to the experience timeline. Treat capabilities as a curated subset of the existing professional summary focus areas. These are presentation-level connections and do not replace `ProfessionalClaim` as the owner of evidentiary relationships.

**Rationale:** The selected project set already has an approved mapping to existing experience entries, and the summary already provides a small, public capability vocabulary. Project-level context makes the relationship visible where the evidence is read without introducing a capability entity, reciprocal relationship state, or a general relationship resolver.

**Consequence:** Project entries can show relevant experience links and capability signals, while experience entries expose stable anchors for direct navigation. Claim content and claim-owned evidence relationships remain separate and deferred. No new route, dependency, API, CMS, or PKM integration is required.

**Review triggers:** Reconsider this boundary if capabilities require independent descriptions or routes, project labels repeatedly drift from the summary vocabulary, relationship maintenance becomes error-prone, or public claims require explicit claim rendering.

**Deferred:** Capability records, capability routes, reverse project indexes, claim content, runtime relationship validation, and reciprocal relationship arrays remain undefined until a demonstrated requirement justifies them.

## Define a static evidence contract from approved PKM projection patterns — 2026-08-24

**Decision:** Add `src/content/evidence.ts` as a separate local TypeScript contract for `Outcome`, `Project`, and `CaseStudy`. Use explicit narrative fields for case studies rather than a flexible section or block model. Let `Project` own purpose, problem, solution, technologies, and outcomes, and let `CaseStudy` own personal contribution and narrative decisions. Keep the contract limited to manually curated site content.

**Rationale:** The PKM entity schema distinguishes a project from the experiences and claims derived from it. Its project contract owns purpose, problem, solution, technologies, and outcomes, while its experience contract owns factual actions and outcomes. The site contract adopts those useful ownership boundaries without reproducing PKM entities, relationships, or private editorial metadata such as evidence levels, provenance, unsupported claims, missing-evidence notes, and source links.

**Consequence:** The repository contains only approved site content. Because the repository is public, PKM source files and source-governance metadata must not be committed, imported, or represented as hidden application fields. Stable slugs identify site records, unknown optional fields are omitted, and claim-owned relationships are defined separately. The evidence contract adds no content values, routes, rendering, runtime validation, or PKM integration.

**Review triggers:** Reconsider the contract when approved evidence content cannot be represented clearly, repeated narrative changes justify a different boundary, or a demonstrated requirement supports a validated public export. Any import or synchronisation proposal must be reviewed as a separate architecture decision.

**Deferred at the time of this decision:** Evidence confidence, contribution-boundary, confidentiality, and publication-governance rules were left to a separate governance decision; claim content and project and case-study implementation remained deferred.

## Use a contact-specific public-link contract — 2026-08-24

**Decision:** Keep `PublicLink` limited to the shared `label` and `url` fields used by identity profile links and resume access. Define `ContactLink` as a contact-specific extension with `category`, `actionLabel`, and optional `description` fields, and use it for `ProfessionalContent.contact`.

**Rationale:** Contact options need editorial context and clear actions as the contact area grows, while category and description copy do not apply naturally to every public link. A specialised type preserves the small shared link contract, keeps public content typed and manually curated, and avoids route-level label mappings or duplicated presentation copy.

**Consequence:** Contact content can render a concise metadata category, an actionable link label, and optional supporting copy without changing profile-link or resume content. The contact route remains static and uses native accessible links; no new content source, runtime validation, or shared component is introduced.

**Review triggers:** Reconsider this boundary when multiple public-link consumers need the same contextual fields, contact descriptions create repeated editorial maintenance, or a broader public-link vocabulary is required by an approved content area.

**Deferred:** Contact forms, contact-link icons, external service integrations, and a generalised metadata schema remain undefined until a demonstrated requirement exists.

## Colocate route-owned CSS with route components — 2026-08-14

**Decision:** Keep global styling layers in `src/styles/` and import them through `src/index.css`. Place CSS that belongs exclusively to one route alongside that route component in `src/pages/`, using a matching filename and a direct component import—for example, `ProjectsPage.tsx` imports `./ProjectsPage.css`. Continue to scope selectors with distinctive page prefixes. Migrate the existing Home route stylesheet to `src/pages/HomePage.css` as part of adopting this convention; subsequent route-owned styles follow it by default.

**Rationale:** Page components and their presentation change together. Colocation makes the ownership, discovery, maintenance, and removal of route-specific styles explicit without introducing CSS Modules, a dependency, or a component abstraction. The repository has a demonstrated need for a second page-owned stylesheet; maintaining a central registry for route-owned CSS would separate related implementation without providing a current benefit.

**Consequence:** `src/index.css` remains the entry point for reset, tokens, document-wide rules, and shared-shell styling; it is not the registry for route-owned styles. Route components directly import their own CSS. `HomePage.tsx` now owns the import for its migrated stylesheet. Shared styling patterns are not introduced merely to remove local repetition: revisit a shared styling boundary after the remaining core pages provide sufficient evidence of stable semantic reuse.

**Review triggers:** Reconsider this boundary when route-local styles cause cascade-order defects, selector collisions, repeated import or testing friction, or when stable reuse demonstrates the need for a shared styling layer, CSS Modules, or another scoped styling approach.

**Deferred:** CSS Modules and any broad stylesheet reorganisation remain undefined until a demonstrated requirement exists. The accepted shared pattern boundary and its remaining exclusions are recorded below.

## Add a small shared CSS pattern layer for stable core route reuse — 2026-08-24

**Decision:** Keep route-owned CSS colocated with route components and add `src/styles/patterns.css`, imported through `src/index.css`, for the four stable semantic patterns `.page-section`, `.page-lead`, `.eyebrow`, and `.page-intro`. Keep route-specific classes and modifiers in each page stylesheet.

**Rationale:** Contact and Core Navigation completed the core route set, and the four routes demonstrated repeated semantic styling with no need for a component abstraction. A small CSS layer removes verified duplication while preserving the shallow route ownership boundary and relevant frontend practice.

**Consequence:** The shared layer owns only the four extracted patterns and their shared mobile page-section adjustment. Home layout and focus styling, Experience timeline styling, and Resume-specific responsive treatment remain colocated with their routes. No dependency, CSS Module, utility framework, or React wrapper is introduced.

**Review triggers:** Reconsider the boundary if shared selectors cause cascade-order defects, semantic roles diverge, route-specific modifiers become difficult to understand, or later evidence justifies extracting additional patterns.

**Deferred:** `.tag-list`, `.tag`, `.page-metadata`, `.action-link`, `.section-divider`, generic list-reset utilities, CSS Modules, utility frameworks, and React wrapper components remain undefined until demonstrated reuse or a concrete requirement justifies them.

## Use a local TypeScript contract for public professional content — 2026-08-12

**Decision:** Use `src/content/professional.ts` as the initial local, typed contract for the public professional-content projection. It exports types for public links, identity, summary, experience entries, resume access, and the aggregate projection. Content remains static and manually curated in the site; this task introduces no content values.

**Rationale:** Identity, summary, and experience information will be reused across core routes, so route-local definitions would duplicate a known public boundary. A TypeScript module gives strict compile-time checking and straightforward React imports without adding parsing, runtime validation, dependencies, or build complexity. Markdown is better suited to future narrative content, while JSON becomes useful only when the PKM can produce an accepted public export that warrants a validated import boundary.

**Consequence:** `src/content/professional.ts` is the local source of truth for the public-content shape, while the canonical resume-builder source owns approved professional summary and experience wording. Collections are readonly; experience dates are represented as distinct start and optional end values so current roles can be unambiguous. `ResumeAccess` composes `PublicLink` with an optional updated date. The module contains no runtime imports, paths, provenance, confidentiality, or source-governance metadata from the canonical repository.

**Review triggers:** Reconsider this representation when accepted public-ready PKM records and repeated manual-transfer friction justify a versioned static export and validated import or generation step; when editorial authoring needs show that a narrative representation is required; or when a content requirement cannot be expressed cleanly by the current contract.

**Deferred:** PKM export/import tooling, JSON or Markdown content formats, runtime or build-time PKM integration, schema-validation dependencies, CMS or remote data loading, and public content values remain undefined until a demonstrated requirement or later approved content task exists.

## Use an editorially approved projection for public professional content — 2026-08-12

**Decision:** Define public professional content as a small, editorially approved projection: identity (name, professional headline, optional broad location, and profile links); professional summary (summary and focus areas); experience (company, role, start and end date or present, optional broad location, responsibilities, selected contributions and outcomes, and optional technologies); resume access (label, URL, and optional updated date); and contact (explicitly approved public email, URL, and professional links). Home composes identity, a short summary, selected experience highlights, and calls to Resume and Contact; it has no separate content model.

**Rationale:** The current PKM material contains converted historical sources but no accepted knowledge entities, claims, provenance records, generated resume, or evidence map. Publishing directly from it, performance reviews, or derived audits would risk unsupported claims, ambiguous chronology, confidentiality exposure, and unclear personal-versus-team attribution. A minimal projection supports the Milestone 2 professional experience while keeping public content accurate, reusable, and proportionate.

**Consequence:** Public experience entries use approved company, role, dates, optional broad location, responsibilities, selected contributions, selected outcomes, and optional technologies. Published dates use one approved consistent precision, normally month/year; uncertain employment or role boundaries must be resolved rather than inferred. Contributions and outcomes require editorial review for attribution, evidence, chronology, and confidentiality. PKM visibility, provenance, confidentiality, attribution, outcome-type, and publication-approval controls remain private source-governance metadata, not public application fields.

**Review triggers:** Reconsider this boundary when the PKM contains accepted public-ready records with sufficient governance metadata, when a public content area needs fields beyond the recorded vocabulary, or when a product requirement requires a content source, loading mechanism, or integration.

**Deferred:** PKM integration, CMS or remote data loading, generated resume, and further project or case-study structures remain undefined until a demonstrated requirement exists.

## Use Cloudflare Pages for static application deployment — 2026-08-12

**Decision:** Deploy the Vite-built application to Cloudflare Pages. Retain React Router browser-history routing and configure the project to build with `pnpm build` and publish the `dist` directory. Use Cloudflare Pages' SPA fallback behaviour so direct requests to client-side routes are served by the application entry document. Configure `main` as the Cloudflare Pages production branch; Cloudflare deploys `davi-naizer.pages.dev` only when a commit reaches `main`.

**Rationale:** Cloudflare Pages provides a proportional static deployment target for the browser-only application without an application server, runtime dependency, or routing-architecture change. Deploying the protected `main` branch keeps the public site aligned with the repository's production history while avoiding deployment credentials, a second deployment workflow, and release-management ceremony that the current product does not require. Cloudflare preview deployments may be used for pull requests, but they do not update the production URL.

**Consequence:** GitHub branch protection must require the existing Quality Gate before pull requests can merge to `main`; after merge, Cloudflare Pages independently builds and deploys that commit. The existing GitHub Actions workflow remains responsible for repository checks rather than deployment. A Cloudflare account and Pages project are required. The initial deployment uses `https://davi-naizer.pages.dev`; a custom domain is not part of this decision.

**Review triggers:** Reconsider this target or deployment policy when the product requires server-side rendering, server-side logic, authenticated APIs, a deployment capability Cloudflare Pages cannot provide, material delivery reliability issues, an explicit release-approval requirement, or a demonstrated need for deployment to wait for checks on the merged commit.

**Deferred:** Custom-domain configuration, server-side capabilities, making preview deployments a required release gate, automated production smoke testing, and release- or tag-triggered deployment remain undefined until a demonstrated requirement exists.

## Use Playwright with Chromium for bounded critical-journey testing — 2026-08-11

**Decision:** Use Playwright with a Chromium project for browser-driven testing of the current critical journeys. Run the suite through `pnpm test:e2e`. Keep Playwright specs in `e2e/` and exclude that directory from Vitest discovery.

**Rationale:** The shared shell and route structure now have stable browser-observable behaviour that JSDOM cannot fully verify: direct route entry, client-side navigation, and recovery from an unknown route. Chromium provides a proportional real-browser baseline without prematurely committing to cross-browser, mobile, or visual-regression coverage.

**Consequence:** Playwright starts the local Vite server for the suite and covers the Work route, representative Home and primary navigation, and not-found recovery. Vitest continues to own non-interactive unit and component tests through `pnpm test`; the test directories remain separate so each runner executes only its own suite. The GitHub Actions Quality Gate runs `pnpm test:e2e` alongside `pnpm validate` and `pnpm build` for pull requests targeting `main` and pushes to `main`. Deployment remains outside this workflow.

**Review triggers:** Reconsider this boundary when a supported deployment target needs route-fallback verification, critical interactions require additional browser coverage, browser-specific defects appear, CI execution becomes slow or unreliable, or browser-level accessibility checks provide demonstrated value.

**Deferred:** Cross-browser and mobile coverage, browser-level automated accessibility checks, visual regression testing, network mocking, broad route coverage, and deployment remain undefined until a demonstrated requirement exists.

## Use Vitest, React Testing Library, and axe checks for the initial component-test foundation — 2026-08-11

**Decision:** Use Vitest with JSDOM for non-interactive unit and component test execution, React Testing Library for rendered DOM and semantic assertions, and `vitest-axe` for automated accessibility regression checks. Run the suite through `pnpm test` and include it in `pnpm validate`.

**Rationale:** The current application has a shared React shell and primary navigation whose semantic links, route-aware active state, and landmark structure are stable, user-observable behaviour. A Vite-aligned runner with DOM-level assertions establishes a fast, proportional feedback loop without adding browser automation or testing every placeholder route. Axe checks add useful regression coverage for detectable rendered-DOM accessibility defects and supplement—rather than replace—the existing manual keyboard, responsive, and contrast verification.

**Consequence:** Tests use router-aware in-memory rendering and live beside the shell and reusable component they cover. JSDOM does not provide the canvas support required for axe's `color-contrast` rule, so that rule is disabled in component tests; concrete contrast remains subject to real-browser/manual verification. The production runtime and bundle are unaffected because the test tooling is development-only.

**Review triggers:** Reconsider this boundary when critical user journeys require browser-driven verification, when browser-only behaviour or CSS-dependent accessibility checks need automated coverage, when repeated test setup obscures intent, or when test execution becomes slow or unreliable.

**Deferred:** Browser-level automated accessibility testing, visual regression testing, network mocking, and broad page-level coverage remain undefined until a demonstrated requirement exists.

## Use a centred primary navigation and Work evidence hub — 2026-08-11

**Status:** Historical navigation decision. Its grouping of Projects and Case Studies is updated by “Keep professional Case Studies and independent Experiments as distinct Work destinations — 2026-09-25”; the Work chooser and stable `/projects` path remain.

**Decision:** Use a shared header with a home-linked identity at the left, centred direct navigation to Experience, Work, and Resume, and a visually distinct Contact link at the right. Add a Work index route that groups the existing Projects and Case Studies routes. Preserve Projects and Case Studies as independently addressable routes without presenting them as primary-navigation items. The original Summary-route decision is superseded by “Consolidate Professional Summary into Home,” and the separate Engineering area is removed by “Remove the Engineering area and obsolete routes.”

**Rationale:** Recruiters need direct access to career history, the CV, and contact details, while hiring managers need a concise path to professional evidence and engineering judgement. Projects provide scan-friendly evidence and case studies provide selected depth, so grouping them under Work establishes their relationship without hiding destinations behind a dropdown. A three-column CSS Grid keeps the core navigation genuinely centred even though the identity and Contact link have different widths.

**Consequence:** `/work` is the durable evidence entry point; `/projects` and `/case-studies` remain stable direct destinations. The header has no separate Home item because the identity links home. Contact uses anchor semantics because it navigates. Responsive CSS reflows the same visible links rather than introducing a menu control or client state.

**Review triggers:** Reconsider the primary navigation when additional evidence areas make the Work grouping unclear, when measured navigation behaviour indicates the visible-link model is unusable at supported viewports, or when user evidence justifies a different navigation interaction.

**Deferred:** The future relationship between individual projects and case studies, custom focus treatment, and any dropdown or menu interaction remain undefined until a demonstrated requirement exists.

## Use reference hex values for the initial CSS token foundation — 2026-08-10

**Decision:** Use the hex values defined in `docs/design/DESIGN.md` for the initial CSS token foundation. Defer OKLCH colour values until a demonstrated need justifies their adoption.

**Rationale:** `docs/DESIGN_PRINCIPLES.md` establishes OKLCH as the long-term colour direction, while the current visual reference supplies specific hex values. Converting those values now would add a colour-authoring decision without a current requirement for themes, derived palettes, or token transformation. Semantic CSS custom properties preserve a clear future conversion path without changing the approved foundation visuals.

**Consequence:** `src/styles/tokens.css` remains the CSS-first source for the implemented palette and uses the reference hex values. Accessibility still requires contrast verification at the point where a colour is assigned to a concrete text, control, or focus treatment.

**Review triggers:** Reconsider this decision when the product needs colour modes, derived colour scales, systematic contrast adjustment, a token-generation pipeline, or another demonstrated colour-maintenance problem.

**Deferred:** OKLCH conversion, derived colour tokens, theme modes, and token transformation tooling remain undefined until a review trigger is met.

## Use React Router v8 in Data Mode — 2026-08-09 23:43 BST

**Decision:** Use React Router v8 in Data Mode for client-side routing, with route objects, `createBrowserRouter`, and `RouterProvider`.

**Rationale:** The product requires multiple durable MVP routes and shared navigation. React Router is an established routing solution that integrates with the existing React and Vite foundation while providing relevant practice with modern routing concepts. Data Mode establishes a maintainable route configuration and supports future loaders, actions, pending states, and error boundaries without requiring those capabilities before a concrete need exists.

Adopting Next.js solely for its routing system would replace the current application architecture and revisit completed foundation work. The product does not currently require its server rendering, Server Component, or full-stack capabilities, so that migration would be disproportionate to the present routing requirement.

**Consequence:** The current application is rendered and routed on the client, so its content and navigation require JavaScript. This is an accepted limitation of the present foundation, not a claim that the product already provides no-JavaScript access.

**Review triggers:** Reconsider the rendering architecture if measured accessibility, performance, resilience, discoverability, deployment, or user evidence shows that client-only rendering prevents a product requirement from being met. Any replacement must solve a demonstrated problem proportionally rather than introduce server rendering or a framework migration for technology signalling.

**Deferred:** Loaders, actions, and other data-routing capabilities will be introduced only when required by a route. Server rendering, static generation, and framework migration remain undefined until a review trigger demonstrates a concrete need.

## Use Biome for baseline linting and formatting — 2026-08-07 18:00 BST

**Decision:** Use Biome as the project's baseline linter and formatter while retaining TypeScript for type checking.

**Rationale:** Biome provides the required linting, formatting, and import organisation through one dependency and one configuration file. This keeps the initial quality foundation proportional to the current application while preserving separate, explicit TypeScript validation.

**Deferred:** Testing tools and their package scripts will be selected when the testing approach is defined.
