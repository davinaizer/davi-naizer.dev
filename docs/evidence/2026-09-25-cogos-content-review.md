---
title: CogOs website content review
status: implementation-complete
recordedAt: 2026-09-25
---

# CogOs Website Content Review

## Scope and method

This review compares the public website content with:

- the CogOs writing guidance in `Writing Style.md`;
- the project’s evidence, confidentiality, and contribution-boundary rules; and
- the canonical professional content in `/Users/naizer/Workspace/resume-builder/source/canon-resume`.

The downloadable resume artifact was outside the review scope.

The review distinguishes between:

- **Applied canonical update:** a clear source-of-truth correction made during this task.
- **Potential refinement:** a possible improvement that does not require immediate implementation.
- **High-confidence style flag:** wording that clearly conflicts with the CogOs writing guidance.
- **Keep:** wording whose conversational, qualified, or specific character is consistent with the guidance.

## Applied canonical updates

### Professional summary

`src/content/professional-content.ts` now uses the canonical summary language covering:

- product applications, internal tools, and delivery systems;
- commercial React, TypeScript, and JavaScript experience;
- recent native iOS development with Swift and SwiftUI;
- product-lifecycle experience and increasing responsibility;
- frontend architecture, developer tooling, workflow automation, and product ownership; and
- a practical interest in recurring sources of friction.

The existing content model stores the summary as one string, so the canonical paragraphs are represented as one continuous value rather than introducing a new content shape.

### The Signal Group

The Signal experience now follows the canonical contribution set. The update:

- includes permission-aware creation, editing, validation, and deletion flows in the Template Admin contribution;
- uses the canonical Vessels List wording;
- describes maintenance of shared UI components and migrations away from deprecated components;
- records focused tests, snapshots, and type, lint, SonarLint, and refactoring work; and
- retains the onboarding contribution.

The more detailed Case Study remains the place for additional supported context about the wider collaborative workflow and contribution boundary.

### Gamesys / Bally’s Interactive

The Senior Frontend Engineer entry now uses the canonical contribution set, including:

- the Jira REST API workflow improvement;
- the Node.js CLI for version-pinned promotional UI and pull-request delivery;
- the TypeScript migration and supporting CI and release practices;
- the React preview application and shared configuration infrastructure;
- onboarding and architecture documentation; and
- mentoring, code review, and production troubleshooting.

The Frontend Developer entry now includes the canonical configuration-driven promotional UI framework contribution and retains the canonical frontend, mentoring, and customer-facing product contributions.

### Content intentionally preserved

The following were not replaced with resume wording because they are website-specific and do not contradict the canonical source:

- the Home `homeExcerpt` and personal note;
- the headline and focus-area vocabulary;
- the planned career-break entry;
- earlier-career entries not represented in the current resume source;
- Case Studies;
- Experiments;
- contact, navigation, and continuation copy; and
- metadata, analytics disclosure, and social-preview copy.

## Public content inventory reviewed

| Surface | Source | Review result |
| --- | --- | --- |
| Identity and headline | `src/content/professional-content.ts` | Clear and defensible; retained. |
| Home summary and personal note | `src/content/professional-content.ts`, `src/pages/HomePage.tsx` | Conversational and human; no high-confidence style contradiction. |
| Experience timeline | `src/content/professional-content.ts`, `src/pages/ExperiencePage.tsx` | Matching canonical entries updated; site-only earlier career retained. |
| Work chooser | `src/pages/WorkPage.tsx` | Clear distinction between Case Studies and Experiments; retained. |
| Case Studies | `src/content/evidence-content.ts`, `src/pages/CaseStudiesPage.tsx`, `src/components/CaseStudyGallery.tsx` | Evidence-led and appropriately qualified; retained. |
| Experiments | `src/content/evidence-content.ts`, `src/pages/ExperimentsPage.tsx` | Practical, personal, and explicit about observation and uncertainty; retained. |
| Resume route copy | `src/pages/ResumePage.tsx` | Clear and restrained; retained. |
| Contact route copy | `src/pages/ContactPage.tsx` | Warm, direct, and operationally clear; retained. |
| Not-found copy | `src/pages/NotFoundPage.tsx` | Concise and useful; retained. |
| Primary navigation | `src/components/PrimaryNavigation.tsx` | Minimal and understandable; retained. |
| Footer and contact labels | `src/app/Footer.tsx`, `src/components/Icon.tsx` | Clear accessible names and restrained labels; retained. |
| Contextual continuation links | `src/components/ContextualContinuation.tsx` and route call sites | Destination-specific and non-promotional; retained. |
| Analytics disclosure | `src/components/AnalyticsSettings.tsx` | Factual, qualified, and transparent; retained. |
| Document metadata | `index.html`, `public/site.webmanifest` | Consistent with the professional positioning; potential consistency refinement below. |
| Indexing metadata | `public/robots.txt`, `public/sitemap.xml` | Functional route metadata; no editorial change required. |
| Social preview | `public/social-preview.png` and related `index.html` metadata | Clear and restrained; potential consistency refinement below. |

## CogOs writing-style findings

### High-confidence style flags

No high-confidence contradictions were identified in the reviewed conversational copy.

In particular, the following patterns were not treated as defects:

- first-person descriptions of contribution;
- direct acknowledgement of uncertainty or missing evidence;
- practical phrases such as “fixing what gets in the way” and “compare notes”;
- personal details in the Home page’s “Beyond the work” section;
- informal experiment observations such as the fan sound seeming to soothe the dogs; and
- reflective statements such as testing Alfred with users earlier.

These examples remain conversational without becoming inflated, corporate, or difficult to defend.

### Potential refinements

These are not high-confidence contradictions and were not changed automatically.

#### 1. Align the public positioning sentence across metadata

The website uses closely related versions of the following idea:

- site metadata: “the systems that make software easier to build, maintain, and use”;
- social preview: “the systems around them”;
- canonical summary: “the delivery systems behind them.”

The current versions are all understandable and consistent with the product. A future editorial pass could choose one formulation for the page description, social preview, and other public positioning surfaces. The canonical phrase is the strongest source-aligned candidate, but this is a consistency choice rather than a correctness issue.

#### 2. Review the accessible Case Studies collection label

`src/pages/CaseStudiesPage.tsx` uses the accessible collection label “Portfolio evidence”. The visible page presents professional Case Studies, and the product is intentionally not primarily a portfolio site. “Professional case studies” or “Case studies” would align more closely with the current information architecture.

This is a product-language and accessibility-label refinement, not a CogOs voice contradiction.

#### 3. Consider whether the Home excerpt needs a more observable description

The Home excerpt says that Davi enjoys “building software that is genuinely useful”. The wording is natural and consistent with the CogOs style, but “genuinely useful” is broad. If a future product or audience decision identifies a more specific recurring problem to foreground, this could be replaced with an observable example. No replacement is recommended without that evidence.

#### 4. Review the level of detail in earlier-career entries separately

The earlier-career entries are concise and conversational:

- “I worked as a freelancer on frontend and online learning projects.”
- “I developed web applications and digital learning content.”
- “I worked in computer support.”

They do not contradict the CogOs style. Their possible weakness is evidence depth rather than tone. Any expansion should be based on reliable source material and should remain a separate content decision.

## Content that should remain unchanged

The strongest existing writing should be preserved because it demonstrates the intended voice and evidence boundaries:

- Case Study role descriptions distinguish personal contribution from team ownership.
- Case Study constraints explicitly state when adoption, user feedback, or business impact is unavailable.
- Outcomes use “reported”, “observed”, or similar qualifiers where the evidence is limited.
- Alfred’s reflection acknowledges that user testing should have happened earlier without overstating product success.
- The UV Insect Trap narrative describes iterations, trade-offs, household observations, and remaining weaknesses without presenting them as measured product outcomes.
- Contact and analytics copy is direct without exaggerated warmth or legalistic overstatement.

## Final assessment

The site is broadly consistent with the CogOs writing style. The strongest recurring qualities are:

- calm, practical language;
- evidence before assertion;
- clear personal and team boundaries;
- explicit uncertainty;
- useful technical detail without unnecessary status signalling; and
- conversational phrasing that remains defensible in an interview.

The highest-confidence changes for this task were canonical-source corrections in the professional summary and matching experience entries. The remaining findings are optional consistency or content-depth refinements rather than urgent style corrections.
