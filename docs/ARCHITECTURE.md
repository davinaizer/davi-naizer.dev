---
createdAt: 2026-08-10
updatedAt: 2026-09-26
version: 1.11
status: active
---

# Architecture

## Purpose

This document defines the current architecture and the constraints that future changes must preserve. It describes confirmed structure rather than speculative future systems.

`PRODUCT_REQUIREMENTS.md` and `ROADMAP.md` take precedence. `docs/ENGINEERING_PRINCIPLES.md`, `docs/DECISIONS.md`, task plans, and implementation must remain consistent with this document.

## System context

The product is a browser-based React and TypeScript application whose domain is professional experience and supporting work evidence. Its primary user is the developer; recruiters, hiring managers, and engineers are secondary users.

The application must remain intentionally small, content-first, accessible, maintainable, and deployable. React and TypeScript are product requirements because implementation is also deliberate frontend practice.

## Current runtime architecture

- Vite provides the local development and production build system.
- React provides application composition and rendering.
- TypeScript runs in strict mode and emits no application JavaScript during type checking.
- React Router v8 Data Mode owns client-side route matching through route objects, `createBrowserRouter`, and `RouterProvider`.
- The browser is the only current runtime. No server application, API, persistence layer, or background process exists.
- Rendering and navigation currently require client-side JavaScript. The consequences and review triggers are recorded in `docs/DECISIONS.md`.
- Cloudflare Pages hosts the Vite `dist` output. Its production deployment tracks `main`; preview deployments do not update the production URL.

## Application boundaries

```text
src/main.tsx
  -> src/app/router.tsx
    -> src/app/App.tsx
      -> src/pages/*
      -> src/components/*
```

- `src/main.tsx` is the browser entry point. It validates the root element and mounts the router.
- `src/app/router.tsx` is the route configuration boundary. Route paths and their page components are defined there.
- `src/app/App.tsx` is the shared application shell. It composes the header, primary navigation, route outlet, and footer.
- `src/app/` contains application-wide composition owned by the shell or router.
- `src/pages/` contains route-level page components. Pages compose content and reusable UI for one route.
- `src/components/` contains reusable UI that is not owned by one route.
- `src/index.css` is the global style entry point and imports the global styling layers.
- `src/styles/reset.css` establishes browser-normalising defaults.
- `src/styles/tokens.css` defines CSS-first semantic design tokens.
- `src/styles/global.css` applies document-level typography, content flow, and layout defaults.

Keep these boundaries shallow. Introduce new layers only when a current requirement or repeated change pressure demonstrates that the existing structure is insufficient.

## Styling architecture

`src/index.css` is the ordered CSS manifest. It declares the cascade order `reset`, `tokens`, `base`, `layout`, `components`, and `pages`, then imports each stylesheet into its assigned layer. `src/main.tsx` imports this manifest before the router so the emitted stylesheet order is deterministic.

`src/styles/` owns reset rules, design tokens, document defaults, shell styling, and shared patterns. `src/pages/` owns route-specific stylesheets colocated with their page components; the manifest imports those files into the `pages` layer. Shared Experiments and Case Studies evidence-list base structure lives in `src/styles/patterns.css`, while route-specific grid widths, modifiers, and cascade-sensitive responsive overrides remain with the pages.

Keep selectors page-prefixed when they belong to one route. Add a shared selector only after stable semantic reuse is demonstrated and its layer and responsive cascade boundaries are understood. Do not introduce a utility framework, CSS Modules, or a component styling abstraction without a concrete requirement.

## Navigation and rendering

The root route renders the shared application shell and nested page routes through an outlet. The route configuration includes the implemented product areas, a Work index that links to professional Case Studies and independent Experiments, and a catch-all not-found page. Experiments is the route's user-facing name and route-constant key; it retains the existing `/projects` URL. `/case-studies` is a card-grid index; each card links to a `/case-studies/<slug>` page built on the shared `ProjectPageLayout` component, which renders a case study's sections with a scroll-spy section nav and a "Continue exploring" link to relevant experience and the next case study in the area. Unknown slugs render the existing not-found page rather than a route-level error boundary. Experiments (`/projects`) has not yet adopted this per-project page pattern; it remains a single page listing every project in full. The sitemap lists `/work`, `/case-studies` and its project-page URLs, and `/projects` as active evidence destinations.

The shared shell provides a home-linked identity, direct routes to Experience, Work, and Resume, and a distinct Contact link. Experiments and Case Studies remain independently addressable but are not primary navigation destinations; Work is the chooser for both, and Home's “Beyond the work” section links to Experiments. Home owns the professional summary and focus-area content. There is no separate Engineering area; engineering judgement is communicated through experience, experiments, case studies, and the implementation itself. Use semantic links and document structure so navigation remains understandable and keyboard accessible. Prefer content that does not require unnecessary interaction to discover. Client-side routing is the current delivery architecture; progressive enhancement beyond semantic browser foundations remains subject to demonstrated product need and the review triggers in `docs/DECISIONS.md`.

## Content and data

Current page content is held in manually curated TypeScript modules. `src/content/professional-content.ts` owns the editorially approved professional projection: identity, professional summary, stable-slugged experience entries, claim references, resume access, and contact. `src/content/evidence-content.ts` owns projects used for independent experiments, professional case studies, outcomes, and typed evidence references. Project experiment narratives support optional visuals, contribution, decisions, and reflection; entries render only the sections they provide. Professional claims own one-way references to experience and supporting evidence; the model stores no reciprocal relationship arrays. Home composes core content and has no separate content model.

Content remains static and manually curated in the site. Do not introduce a CMS, database, API, state-management library, additional content abstraction, or PKM integration until a current product requirement or repeated maintenance problem justifies it. The repository is public, so only approved site content may be committed: PKM source files and source-governance metadata must not be copied into, imported into, or stored in this repository, whether or not the website would render them. Relationship references are manually curated stable slugs with no runtime resolver. Site content must preserve evidence accuracy, contribution boundaries, confidentiality, chronology, and reuse requirements from `PRODUCT_REQUIREMENTS.md`.

## Quality attributes

All architectural changes must preserve:

- strict TypeScript and explicit runtime guards at external boundaries;
- semantic HTML and accessibility as product requirements;
- intentional responsive behaviour;
- readable, content-first presentation;
- small, focused, reversible changes where practical;
- measured performance decisions;
- proportional automated and manual validation;
- a buildable and deployable repository.

Biome owns linting, formatting, and import organisation. TypeScript owns static type checking. Vitest owns non-interactive unit and component test execution in JSDOM. React Testing Library owns rendered DOM and semantic assertions. `vitest-axe` provides component-level automated accessibility regression checks. The `test` script runs the component suite; `validate` runs type checking, Biome checks, and component tests. Playwright owns bounded Chromium critical-journey tests in `e2e/`; `test:e2e` starts the local Vite server and runs that browser suite. Vitest excludes `e2e/` so the runners remain independent.

## Dependency and abstraction policy

Add a dependency only when it solves a concrete current problem better than the platform or existing dependencies. Prefer composition and direct code over speculative wrappers, generic infrastructure, or premature abstractions.

Keep code close to the route, component, or application boundary that owns it. Extract shared behaviour only when reuse, change pressure, testability, or a clearer public interface justifies the new boundary.

## Currently undefined

The following are not architectural commitments:

- a PKM export/import format or toolchain;
- PKM integration;
- reusable visual primitives and component-level styling boundaries;
- browser-level automated accessibility testing, including CSS-dependent colour-contrast checks;
- remote data loading, persistence, APIs, or server processes;
- global client state management;
- server rendering or static generation;

- performance budgets.

Resolve each area through the smallest task that has enough current evidence to make the decision. Record long-lived decisions in `docs/DECISIONS.md`.

## Review triggers

Review this architecture when a task proposes:

- a new runtime, framework, dependency category, or application layer;
- a server, API, persistence mechanism, CMS, or global state store;
- a change to rendering, routing, deployment, or content ownership;
- a boundary that conflicts with the current source structure;
- repeated implementation or testing friction that the current boundaries cannot resolve cleanly;
- evidence that an existing architectural choice prevents a product requirement from being met.

Update this document only after the architectural change is accepted. Record why a significant choice was made, its consequences, and its review triggers in `docs/DECISIONS.md`.
