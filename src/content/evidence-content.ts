import type { CaseStudy, Project } from "../types/evidence.ts";

export function onlyPublished<T extends { published: boolean }>(
	entries: readonly T[],
): readonly T[] {
	return entries.filter((entry) => entry.published);
}

const allCaseStudies: readonly CaseStudy[] = [
	{
		slug: "alfred-what-to-do-next",
		published: true,
		title: "Alfred: What To Do Next",
		summary:
			"A native iOS product exploring how to help people decide what to do next.",
		relatedExperienceSlugs: [
			"independent-product-venture-product-engineer-co-creator-2025",
			"self-employed-planned-career-break-2024-2025",
		],
		technologies: [
			"Swift",
			"SwiftUI",
			"WidgetKit",
			"REST APIs",
			"SignalR",
			"Firebase",
			"XCTest",
			"XcodeGen",
		],
		hero: {
			src: "/images/alfred/alfred-onboarding-filmstrip.jpg",
			alt: "Three Alfred onboarding screens in sequence: the app’s value proposition, the “What fits tonight?” mood picker, and a recommended venue under Alfred’s Pick.",
		},
		visuals: [
			{
				src: "/images/alfred/alfred-idea-flow.jpg",
				alt: "Four Alfred app screens: a suggested outdoor walk, an idea-entry form, a board-game gathering recommendation, and a past-events list.",
				title: "From an idea to a plan",
				caption:
					"The core experience follows a continuous decision loop: discover what matters now, capture an idea, develop it through recommendations, make a choice, and turn that choice into a scheduled event.",
				layout: "landscape",
			},
		],
		context:
			"Alfred is an iOS app for helping people turn an idea into something they can actually do. I built the app with another engineer through our independent venture, Chaotic Focus. I owned the iOS work, while he built the C#/.NET backend, enrichment pipeline, and React/TypeScript web client. The app is currently being tested privately through TestFlight.",
		problem:
			"The product was designed to help move an idea or intention toward a concrete next action. A browsing-first experience would leave the decision unresolved, so the core problem was to make recommendation, choice, and commitment understandable as one flow.",
		role: "I built the native iOS application and the engineering workflow used to develop it. I shared product direction, architecture, and integration decisions with my co-creator, and I handled project management: planning in Notion and Trello, meeting notes, and weekly one-to-ones. My co-creator built the backend, the enrichment pipeline, and the web client.",
		constraints: [
			"The app is in private TestFlight validation; I have no public user feedback or adoption data.",
			"Recommendation generation was asynchronous, so the app needed to show progress, completion, and refresh states.",
			"The mobile app needed clear boundaries between feature presentation, domain logic, data mapping, infrastructure, and application routing.",
			"My co-creator owned the API, data layer, LLM enrichment pipeline, and web client. I worked against those contracts and shared decisions that affected both sides, but I did not build them.",
			"Much of the code was written with AI assistance, so the risk was drift from the architecture. I needed rules, checks, and review that did not rely on remembering the conventions.",
		],
		decisions: [
			"I connected ideas, recommendations, decisions, and scheduled events instead of treating recommendations as something to browse. This narrowed the exploration but gave each idea a clearer next step.",
			"I kept onboarding lightweight: explain the value, capture a small amount of context, show a first recommendation, and offer a way to commit to it. The trade-off was having less information up front.",
			"I separated screen state, domain logic, data mapping, infrastructure, and routing. It created more types and files, but made features easier to isolate and test.",
			"Recommendation generation could take time, so I let someone capture an idea while the result arrived later through the API and real-time updates. That meant the app also needed clear waiting, completion, and refresh states.",
			"I kept accepting, dismissing, scheduling, deferring, and refreshing as distinct actions. This made it clearer where someone was in the process, although it added more state for the app to manage.",
			"I replaced the first polling implementation with SignalR/WebSocket updates, so the app learns when a recommendation is ready instead of asking repeatedly. The trade-off was handling reconnects, retries, and duplicate deliveries.",
			"I wrote down how coding agents may work in the repository: route the task first, separate planning from implementation and review, and keep durable state in the project docs. The process adds overhead, so small, contained changes take a shorter route that skips UX and architecture work.",
		],
		productAndUx:
			"The design took someone from onboarding and a few preferences to an idea, a recommendation, and a commitment. It gave one recommendation a clear rationale while keeping other options available. This was the product direction, not a finding from user validation.",
		engineering:
			"I kept screen state in view models and moved business rules into use cases, with repositories and API services handling data access. Idea capture checked for missing details and possible duplicates before submitting. Recommendation generation could take time, so the feed showed waiting, ready, and error states. I replaced the first polling implementation with SignalR/WebSocket updates, including automatic reconnection, a five-second retry, and duplicate-result handling. Accepting or dismissing a recommendation updated the idea, while scheduling carried it into event creation. I also worked on authentication, deep links, widgets, CarPlay, notifications, maps, and a Lock Screen widget for speaking an idea. I owned the iOS app; my co-creator owned the API and enrichment services.",
		aiWorkflow: [
			"Much of Alfred's code was written with AI coding agents, so I wrote down the rules they work under. A router sends small changes through a short path, user-facing or cross-cutting work through a fuller UX and architecture path, and unclear problems through diagnosis first. Planning, implementation, review, and handoff stay separate, and only implementation may change code.",
			"A change is not finished until the repository's verification script passes and a review checks it against the architecture rules. If verification fails twice, the task returns to diagnosis or routing instead of getting another attempt. Progress stays in project documents rather than chat history, so the work can resume in a fresh session. I set the scope, acceptance criteria, and checks, then reviewed what the agents produced.",
			"I designed these Codex skills from its documentation, then compared the result with the open-source GSD workflow. I kept its useful ideas around phases, durable state, fresh-context handoffs, and returning to an earlier stage after failed verification. I left out its larger command set, auto-approval, and parallel implementation because they would add more process and a second authority over routing and verification.",
		],
		aiWorkflowGraph: {
			src: "/images/alfred/alfred-routing-graph.svg",
			title: "Alfred agent workflow routing",
			alt: "Routing graph of the Alfred agent workflow. A prompt-only request goes to prompt-validator, which never executes it. Every other request goes to workflow-selector, which routes in priority order: a Diagnostic trigger goes to system-auditor, visible behaviour, flow or state goes to ux-ui-designer and then architect, and small, contained, low-risk work (the default) goes to plan-packet. The auditor can send work to developer for a contained fix, to plan-packet, to architect for a structural redesign, or end with a report-only audit. Approved work reaches developer, which runs the verification script, then code-reviewer, then session-handoff. The reviewer returns changes by flaw type, and a developer scope flaw returns to plan-packet or architect. A second failed verification goes to system-auditor if scope is unchanged, or to workflow-selector if it changed. The same routing follows as a list.",
			width: 1770,
			height: 790,
			caption:
				"Routing in the Alfred agent workflow. Arrows show the normal flow and dashed lines show re-entry. Diagnostic wins when any trigger is present.",
			steps: [
				"A prompt-only request goes to prompt-validator, which tightens the prompt and asks questions and never executes it. Every other request goes to workflow-selector.",
				"workflow-selector routes in priority order: a Diagnostic trigger (for example flaky behaviour, a regression, concurrency, or an unclear fault boundary) goes to system-auditor; visible behaviour, flow, or state goes to ux-ui-designer and then architect; small, contained, low-risk work, the default, goes to plan-packet.",
				"system-auditor classifies the problem and edits nothing. It sends a contained fix to developer, work that needs a packet to plan-packet, a structural redesign to architect, or ends with a report-only audit.",
				"plan-packet fixes scope, acceptance criteria, and verification. Once approved, developer implements the packet and runs the verification script.",
				"code-reviewer checks the invariants and that verification ran. On approval, session-handoff updates the documentation and ends the task.",
				"When the reviewer requests changes, the work returns by flaw type: implementation to developer, planning to plan-packet, architecture to architect, a routing mistake to system-auditor, missing context to workflow-selector. A scope flaw found by developer returns to plan-packet or architect.",
				"If verification fails twice, the task goes to system-auditor when scope is unchanged, or to workflow-selector when scope changed.",
			],
		},
		outcomes: [
			{
				statement:
					"The iOS app connected onboarding, idea capture, recommendations, planning, authentication, and app state into one product flow.",
			},
			{
				statement:
					"I added automated tests for routing, view models, domain services, data mapping, repositories, notifications, real-time refresh, and design-system utilities.",
			},
			{
				statement:
					"I set up an agent workflow that checked AI-assisted changes against the repository's architecture and verification rules before review.",
				detail:
					"The evidence is the repository itself: the governance documents, the skills and their evaluation cases, and the validation script. I have no measurement of defects avoided or time saved.",
			},
		],
		reflection:
			"I would test the idea with users earlier. I would keep the architecture boundaries that made features easier to isolate or test. I would also add contract tests against the backend earlier, so client and server changes are checked against each other, not only through the app.",
	},
	{
		slug: "signal-vessel-list-template-administration",
		published: false,
		title: "Vessel List Template Administration",
		summary:
			"A self-service, role-aware workflow for creating and managing reusable templates in Signal Ocean’s Vessel List.",
		relatedExperienceSlugs: [
			"signal-group-senior-frontend-software-engineer-2023-2024",
		],
		technologies: ["React", "TypeScript", "MobX", "AG Grid", "REST APIs"],
		context:
			"As a Senior Frontend Software Engineer at The Signal Group, I worked with a cross-functional team on the Vessel List area of Signal Ocean. The application used a large React and TypeScript monorepo, shared frontend state, and metadata-driven APIs.",
		problem:
			"Creating reusable Vessel List templates involved support requests and manual engineering work. The workflow needed to let company administrators create and manage templates while making permissions, validation, and the resulting data states clear to administrators and end users.",
		role: "I contributed collaborative frontend implementation across the Template Admin workflow, from forms and state integration through testing, fixes, and production release. Product, design, backend, and QA partners contributed to the wider work; I did not own the platform, backend services, or the feature alone.",
		constraints: [
			"The feature had to fit an established React and TypeScript monorepo, shared application state, and existing API contracts.",
			"Administrator and end-user workflows required permission-aware creation, editing, read-only, validation, and deletion states.",
			"Template configuration sat alongside a data-intensive Vessel List with shared UI components and grid behaviour.",
			"The available evidence supports implementation and production release, but does not establish adoption, time saved, or other business impact.",
		],
		decisions: [
			"Keep the administrator workflow permission-aware, with distinct create, edit, and delete actions, and carry those permissions through the corresponding UI states.",
			"Represent validation and read-only states in the frontend so that configuration errors and unavailable actions are visible in context.",
			"Integrate template operations with the existing metadata-driven APIs and shared frontend state, keeping request and response mappings aligned with the backend contracts without taking ownership of backend design.",
			"Move Template Admin state and behaviour into a focused context while refactoring existing store usage, keeping the new workflow integrated with the surrounding Vessel List application.",
		],
		productAndUx:
			"The experience connected the existing “Save as Template” entry point to modal and form flows for creating and maintaining templates. It handled input validation, dropdown values, map-preview coordinates, administrator permissions, and the different editing, read-only, and deletion states needed across administrator and end-user workflows.",
		engineering:
			"I worked in React and TypeScript across Template Admin and the wider Vessel List. The implementation included context and store changes, API request mapping, DTO and enum alignment, role and feature-permission checks, and AG Grid configuration. I also maintained focused tests and snapshots, addressed type, lint, SonarLint, and review feedback, and contributed to modernising deprecated shared UI components.",
		outcomes: [
			{
				statement:
					"The frontend workflow progressed through implementation, testing, fixes, and production release, supporting role-based template creation and management.",
			},
			{
				statement:
					"The work included permission-aware editing, validation, read-only and deletion states integrated with frontend state and metadata-driven APIs.",
			},
		],
		reflection:
			"A production release confirms delivery, but not whether the workflow reduced support effort or became easy to use. I would pair implementation evidence with administrator feedback and usage evidence before making those outcome claims.",
	},
	{
		slug: "promotional-content-production-workflow",
		published: false,
		title: "A Repeatable Promotional Content Workflow",
		summary:
			"A set of internal authoring, preview, and delivery tools made a repetitive promotional-content workflow faster and easier to review.",
		relatedExperienceSlugs: [
			"gamesys-ballys-senior-frontend-engineer-2020-2022",
			"ballys-interactive-frontend-tech-lead-2022-2023",
		],
		technologies: ["Node.js", "Jira REST API", "GitHub Enterprise REST API"],
		context:
			"At Gamesys/Bally’s Interactive, I contributed to a collaborative set of tools supporting configuration-driven promotional content. This case study focuses on making the authoring and delivery workflow more repeatable, while keeping employer-specific systems and campaign details private.",
		problem:
			"Producing and delivering promotional UI involved repetitive setup across templates, configuration, versions, and repositories. The production cycle could take days, and each delivery needed to remain compatible with its target configuration and pass review before release.",
		role: "As a frontend engineer, I contributed to the Node.js tooling and preview workflow alongside other engineers and partner teams. My work included maintaining and migrating tooling to TypeScript, improving generated-content validation, and supporting reviewable delivery. The wider toolchain and its outcomes were collaborative.",
		constraints: [
			"Generated UI had to match the target configuration and compatible framework versions.",
			"Delivery used a pull request and left the merge and release decision for human review.",
			"The workflow operated within an existing internal ecosystem; its product names, campaign information, and repository details are not public.",
			"The accepted outcome is a reported reduction from days to minutes. There is no independent adoption count or broader business-impact measurement in the available evidence.",
		],
		decisions: [
			"Use reusable templates and guided inputs to generate promotional UI consistently, reducing repeated manual setup while keeping the chosen configuration explicit.",
			"Pin compatible framework versions in generated output so a delivery has a clear, reproducible dependency baseline.",
			"Add a preview workflow that checks generated UI against real configuration before delivery, making configuration problems easier to spot before review.",
			"Prepare changes through a pull request for review, keeping the final release decision with the team.",
		],
		productAndUx:
			"The authoring flow guided an engineer through the required content choices, generated a working set of files from reusable templates, and provided a preview against the target configuration. The workflow connected creation, validation, and review so that the next step was visible without hiding the release decision behind automation.",
		engineering:
			"The toolchain used Node.js, with the command-line tooling migrated to TypeScript. It generated version-pinned UI from templates, validated generated output in a preview application against real configuration, and prepared changes for pull-request-based delivery. I also introduced supporting CI and release practices around the tooling. Internal package names, endpoints, repository identifiers, and campaign data are omitted.",
		outcomes: [
			{
				statement:
					"The reported production cycle for the promotional-content workflow fell from days to minutes.",
			},
			{
				statement:
					"Template-based generation, configuration preview, and reviewable delivery made the production path more repeatable while retaining a human review step.",
			},
		],
		reflection:
			"I would make conflict and file-change behaviour clearer before delivery, then measure cycle time and support effort consistently. The current evidence supports the reported speed improvement, but it does not establish adoption scale or a measured effect on quality.",
	},
	{
		slug: "hsbc-learning-portal-and-assessment-tools",
		published: false,
		title: "Building Tools for Employee Learning",
		summary:
			"I changed the course search and built a tool for creating question banks and randomised assessments.",
		context:
			"I joined HSBC’s Training & Development team as an analyst in July 2005 and stayed until July 2007. My work included the employee learning portal and tools for creating assessments.",
		problem:
			"Employees had started reporting slow access and difficulty finding material as the learning catalogue grew. The training team also needed a way to create randomised assessments without editing database records directly.",
		role: "I was the department’s only developer, so I designed and built the updated portal and the assessment authoring tool.",
		constraints: [
			"The tools had to fit an XML-based learning portal and the existing Flash assessment player.",
			"I no longer have the project files or a performance benchmark to measure the search change.",
			"The course names and assessment questions were internal, so I’ve left them out.",
		],
		decisions: [
			"I replaced the course catalogue’s brute-force search with binary search to make lookups faster.",
			"I built a form-based tool so training staff could create question banks without editing database records directly.",
			"I exported the question data as XML for the existing Flash assessment player.",
		],
		productAndUx:
			"For employees, the goal was to make course material easier to find. For the training team, I built a form-based way to maintain question banks and create randomised tests, then export the questions to the assessment player.",
		engineering:
			"The portal stored course content in XML. The authoring tool used ASP and an MDB database, then exported XML for the Flash assessment player. Those were the tools I used at the time.",
		outcomes: [
			{
				statement:
					"I replaced the course search’s brute-force loop with binary search. I remember a substantial speed-up, but I no longer have a before-and-after measurement.",
			},
			{
				statement:
					"I built a tool for creating question banks and randomised assessments. I don’t have figures for how often it was used or how many assessments it produced.",
			},
		],
		reflection:
			"I would measure the search before and after changing it, using the same catalog for both runs. That would let me show the improvement instead of relying on memory.",
	},
];

const allProjects: readonly Project[] = [
	{
		slug: "atelier-florae",
		published: false,
		title: "Atelier Florae: From Brand to Product",
		summary:
			"An end-to-end brand and packaging system for a small artisanal candle launch, shaped through early market testing and customer feedback.",
		visualsHeading: "Brand system and launch materials",
		visualsIntro:
			"These references show the visual system and the 100 g launch materials. Customer details, payment information, and financial records are intentionally excluded.",
		visuals: [
			{
				src: "/images/atelier-florae/atelier-florae-100g-labels.png",
				alt: "A printable sheet of Atelier Florae 100 g scented candle labels and circular botanical seal stickers in five fragrance variants.",
				title: "The 100 g launch labels",
				caption:
					"The first market test used a smaller 100 g candle so the business could explore an accessible entry price and learn from early customers.",
				layout: "portrait",
			},
			{
				src: "/images/atelier-florae/atelier-florae-seal.svg",
				alt: "Gold botanical lotus seal for the Atelier Florae identity.",
				title: "Botanical seal",
				caption:
					"The seal gave the small business a recognisable mark that could carry across labels, packaging, signage, and customer materials.",
				layout: "portrait",
			},
		],
		context:
			"Atelier Florae was a small family business started in Brazil. Before the first candles went to market, I worked with the founder to understand her taste through a detailed questionnaire and used that to shape a restrained botanical direction.",
		purpose:
			"Test a lower-priced 100 g candle offer with a coherent brand, packaging system, and customer-feedback loop.",
		problem:
			"The business needed to enter the market without relying on generic handmade-product cues. The first launch also needed to make an unfamiliar small brand feel considered while keeping the product accessible enough to test demand and price.",
		solution:
			"I created the brand identity, botanical seal, wordmark direction, palette, typography, candle labels, seal stickers, table sign, and thank-you card. The initial candles were sold through a beauty salon and then through family and friends by word of mouth.",
		role: "I led the brand and visual design work from discovery through launch materials. I used Gemini and GPT as iterative design and critique tools, while the questionnaire, selection, and final decisions remained mine.",
		decisions: [
			"Start with 100 g candles rather than a larger format so the business could test market entry and price with a lower commitment for customers.",
			"Use a detailed questionnaire and iterative critique to understand the founder's taste and avoid a generic craft-market identity. AI tools supported exploration, but did not replace selection or judgement.",
			"Build one botanical system across the seal, wordmark direction, palette, typography, labels, display sign, and thank-you card so the physical customer experience felt connected.",
			"Add an anonymous survey invitation to the launch materials so early feedback could cover overall experience, aroma, packaging, and repeat-purchase intent.",
		],
		outcomes: [
			{
				statement:
					"The initial launch sold 85 candles over two months through a beauty salon and word of mouth among family and friends.",
			},
			{
				statement:
					"Five anonymous survey respondents rated the overall experience 5 out of 5, with average aroma and packaging ratings of 4.8 out of 5.",
				detail:
					"All five said they would buy again. Some customers did return to buy more than once, although I do not have a recorded repeat-purchase count. The survey result was stated intent from a small self-selected sample, not representative market validation.",
			},
			{
				statement:
					"Early feedback supported the presentation and identified practical next steps for the product range.",
				detail:
					"One respondent found the Bamboo fragrance slightly reminiscent of cleaning products; other suggestions included individual fragrance testers and new fragrances.",
			},
		],
		reflection:
			"The project showed that a small physical-product launch depends on the system around the object as much as the object itself: positioning, label hierarchy, display information, payment and feedback touchpoints all shape the experience. If I continued, I would test fragrance options earlier and keep product variants explicit. Expansion into soaps was planned, but the work stopped when we moved to the UK, so this entry documents the initial launch rather than a finished product line.",
		technologies: [
			"Brand strategy",
			"Visual identity",
			"Packaging design",
			"Print materials",
			"Anonymous survey",
		],
	},
	{
		slug: "uv-insect-trap",
		published: true,
		title: "UV Insect Trap",
		summary:
			"A 3D-printed trap shaped through repeated work on airflow, grille noise, and cleaning.",
		hero: {
			src: "/images/uv-insect-trap/uv-drawing-hero.png",
			alt: "A recoloured OnShape engineering drawing of the UV insect trap: the front elevation on the left and an isometric view on the right.",
		},
		visualsHeading: "CAD views and the finished prototype",
		visualsIntro:
			"These views show the CAD design and the finished, printed prototype.",
		visuals: [
			{
				src: "/images/uv-insect-trap/cad-assembly-view.jpg",
				alt: "A front cutaway CAD render, in colour, of the trap's light tower, filter, funnel, and grille stacked inside the body.",
				title: "Enclosure and grille",
				caption:
					"This view shows how the outer body, upper grille, and light tower fit together.",
				layout: "portrait",
			},
			{
				src: "/images/uv-insect-trap/cad-grille-top-view.jpg",
				alt: "A top-down CAD render, in colour, of the circular grille vanes arranged around the UV light tower's gold cap.",
				title: "Grille geometry",
				caption:
					"The top view shows the curved vanes I adjusted while working on airflow and fan noise.",
				layout: "landscape",
			},
			{
				src: "/images/uv-insect-trap/final-prototype.jpeg",
				alt: "The assembled black 3D-printed insect trap on a wood counter, glowing blue from its UV light and spinning grille.",
				title: "The finished prototype",
				caption:
					"The assembled trap in home use, with its UV light visible through the grille.",
				layout: "portrait",
			},
		],
		context:
			"Mosquitoes were a persistent problem at home. I wanted to try a chemical-free trap, using UV light to attract insects and a fan to draw them into a collection area. I looked at existing products and light-based attraction, then started modelling a version I could make and test myself.",
		purpose:
			"Explore whether a home-built UV-and-fan trap could be made practical to assemble, clean, and live with.",
		problem:
			"The first prototype had almost no suction, and the UV light was too weak. Increasing airflow with a larger fan brought a new problem: the fan and grille made a high-pitched whine. The design had to move air, fit the filter and wiring, and still be practical to assemble and clean.",
		role: "I took it from research through Onshape modelling, component selection, printing, assembly, and home testing. I built around an off-the-shelf fan, UV LEDs, and electronics.",
		decisions: [
			"The first version barely pulled air, so I fitted a larger fan and redesigned the body around it. I added an internal filter, screw mounts, snap joints, and a route for the wiring.",
			"The larger fan moved more air but made a high-pitched whine. I tried different grille angles, sizes, and shapes, using a NACA 0030 airfoil as a reference for the vanes. I kept the version that sounded best when I used it.",
			"I tried a funnel, but it restricted airflow; widening the vanes did not help, so I removed it.",
		],
		solution:
			"I modelled the enclosure in Onshape and printed it in PLA. The larger fan improved airflow, while the internal filter, cable route, screw mounts, and snap joints made the prototype easier to assemble and use.",
		outcomes: [
			{
				statement: "Household use suggested the trap was catching mosquitoes.",
				detail:
					"Someone else in the household reported seeing it catch mosquitoes during regular use, and we noticed fewer mosquito problems indoors while it ran — not a measured change. An overnight outdoor test caught moths and other flying insects, but no mosquitoes.",
			},
			{
				statement:
					"The fan's steady sound seemed to have a calming effect on the household's dogs.",
				detail:
					"Less barking and better sleep were noticed while the trap was running — an informal, unmeasured household observation.",
			},
		],
		reflection:
			"From my notes and recollection, I went through at least seven versions. Dust build-up was manageable, but cleaning meant removing the top grille. The wire between the light tower and body made this awkward and felt fragile. Each change moved the problem somewhere else: a bigger fan improved suction but created a whine, and a funnel restricted airflow. If I made another one, I would add a connector so the top is easier to remove.",
		technologies: ["CAD", "OnShape", "3D Printing"],
	},
];

export const caseStudies = onlyPublished(allCaseStudies);
export const projects = onlyPublished(allProjects);
