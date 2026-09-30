import { vi } from "vitest";
import { professionalContent } from "../content/professional-content.ts";
import type { CaseStudy, Project, Visual } from "../types/evidence.ts";

const visual: Visual = {
	src: "/fixtures/screen.png",
	alt: "Fixture screen",
	title: "Fixture screen title",
	caption: "Fixture screen caption.",
	layout: "landscape",
};

const outcomes = [{ statement: "Fixture outcome.", detail: "Fixture detail." }];

// A draft sits between two published entries so tests can show that
// navigation skips it.
export const fixtureCaseStudies: readonly CaseStudy[] = [
	{
		slug: "fixture-case-study-one",
		published: true,
		title: "Fixture Case Study One",
		summary: "Summary of fixture case study one.",
		context: "Context one.",
		problem: "Problem one.",
		role: "Role one.",
		constraints: ["Constraint one."],
		decisions: ["Decision one."],
		productAndUx: "Product and UX one.",
		engineering: "Engineering one.",
		aiWorkflow: [
			"AI-assisted workflow fixture.",
			"AI-assisted workflow second paragraph fixture.",
		],
		aiWorkflowDiagrams: [
			{
				filename: "fixture-route.flow",
				title: "Fixture route: two stages",
				nodes: [
					{ label: "First", detail: "First detail" },
					{ label: "Second", detail: "Second detail" },
				],
				activeIndex: 0,
				caption: "Fixture diagram caption.",
			},
		],
		outcomes,
		reflection: "Reflection one.",
		technologies: ["Fixture Tech A", "Fixture Tech B"],
		hero: { src: "/fixtures/hero-one.png", alt: "Fixture hero one" },
		visuals: [visual],
		relatedExperienceSlugs: [professionalContent.experience[0].slug],
	},
	{
		slug: "fixture-case-study-draft",
		published: false,
		title: "Fixture Case Study Draft",
		summary: "Summary of the unpublished fixture case study.",
		context: "Draft context.",
		problem: "Draft problem.",
		role: "Draft role.",
		constraints: ["Draft constraint."],
		decisions: ["Draft decision."],
		productAndUx: "Draft product and UX.",
		engineering: "Draft engineering.",
		outcomes,
		reflection: "Draft reflection.",
	},
	{
		slug: "fixture-case-study-two",
		published: true,
		title: "Fixture Case Study Two",
		summary: "Summary of fixture case study two.",
		context: "Context two.",
		problem: "Problem two.",
		role: "Role two.",
		constraints: ["Constraint two."],
		decisions: ["Decision two."],
		productAndUx: "Product and UX two.",
		engineering: "Engineering two.",
		outcomes,
		reflection: "Reflection two.",
	},
];

export const fixtureProjects: readonly Project[] = [
	{
		slug: "fixture-experiment-one",
		published: true,
		title: "Fixture Experiment One",
		summary: "Summary of fixture experiment one.",
		context: "Experiment context one.",
		purpose: "Purpose one.",
		problem: "Experiment problem one.",
		solution: "Solution one.",
		role: "Contribution one.",
		decisions: ["Experiment decision one."],
		visualsHeading: "Fixture visuals heading",
		visuals: [visual],
		outcomes,
		reflection: "Experiment reflection one.",
		technologies: ["Fixture Tech C"],
		relatedExperienceSlugs: [professionalContent.experience[0].slug],
	},
	{
		slug: "fixture-experiment-draft",
		published: false,
		title: "Fixture Experiment Draft",
		summary: "Summary of the unpublished fixture experiment.",
		purpose: "Draft purpose.",
	},
	{
		slug: "fixture-experiment-two",
		published: true,
		title: "Fixture Experiment Two",
		summary: "Summary of fixture experiment two.",
		purpose: "Purpose two.",
		hero: { src: "/fixtures/hero-two.png", alt: "Fixture hero two" },
	},
];

// For `vi.mock("../content/evidence-content.ts", ...)`: serves the fixtures
// through the real `onlyPublished`, so the flag's behaviour is under test.
export async function evidenceContentMock() {
	const original = await vi.importActual<
		typeof import("../content/evidence-content.ts")
	>("../content/evidence-content.ts");

	return {
		...original,
		caseStudies: original.onlyPublished(fixtureCaseStudies),
		projects: original.onlyPublished(fixtureProjects),
	};
}
