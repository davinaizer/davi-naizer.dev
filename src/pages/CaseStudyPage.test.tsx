import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import { routes, workProjectPath, workSectionPath } from "../app/routes.ts";
import { caseStudies } from "../content/evidence-content.ts";
import { professionalContent } from "../content/professional-content.ts";
import { axe } from "../test/axe.ts";
import CaseStudyPage from "./CaseStudyPage.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

function renderCaseStudyPage(path: string) {
	const router = createMemoryRouter(
		[
			{ path: routes.workProject, Component: CaseStudyPage },
			{ path: "*", Component: NotFoundPage },
		],
		{ initialEntries: [path] },
	);

	return render(<RouterProvider router={router} />);
}

describe("CaseStudyPage", () => {
	it("renders the Alfred case study with a section nav, tags, and gallery", async () => {
		const caseStudy = caseStudies.find(
			({ slug }) => slug === "alfred-what-to-do-next",
		);
		if (!caseStudy) {
			throw new Error("Expected the Alfred case study to be published.");
		}

		renderCaseStudyPage(workProjectPath(caseStudy.slug));

		expect(
			await screen.findByRole("heading", { level: 1, name: caseStudy.title }),
		).toBeInTheDocument();
		expect(screen.getByText(caseStudy.summary)).toBeInTheDocument();

		const sectionNav = screen.getByRole("navigation", { name: "On this page" });
		expect(
			within(sectionNav)
				.getAllByRole("link")
				.map((link) => link.textContent),
		).toEqual([
			"Context",
			"Problem",
			"Role",
			"Constraints",
			"Decisions",
			"Product / UX",
			"Engineering",
			"Outcomes",
			"Reflection",
			"App screens",
		]);
		expect(
			within(sectionNav).getByRole("link", { name: "Context" }),
		).toHaveAttribute("href", `#${caseStudy.slug}-context`);

		const technologies = screen.getByRole("list", { name: "Technologies" });
		for (const technology of caseStudy.technologies ?? []) {
			expect(within(technologies).getByText(technology)).toBeInTheDocument();
		}

		for (const visual of caseStudy.visuals ?? []) {
			expect(screen.getByRole("img", { name: visual.alt })).toHaveAttribute(
				"src",
				visual.src,
			);
		}

		const backLink = screen.getByRole("link", { name: "All case studies" });
		expect(backLink).toHaveAttribute("href", workSectionPath("caseStudies"));
	});

	it("links relevant experience and the next case study in Continue exploring", async () => {
		const caseStudy = caseStudies.find(
			({ slug }) => slug === "alfred-what-to-do-next",
		);
		const nextCaseStudy = caseStudies[1];
		if (!caseStudy || !nextCaseStudy) {
			throw new Error("Expected at least two published case studies.");
		}

		renderCaseStudyPage(workProjectPath(caseStudy.slug));
		await screen.findByRole("heading", { level: 1, name: caseStudy.title });

		const continuation = screen.getByRole("navigation", {
			name: "Continue exploring",
		});

		for (const experienceSlug of caseStudy.relatedExperienceSlugs ?? []) {
			const entry = professionalContent.experience.find(
				(candidate) => candidate.slug === experienceSlug,
			);
			if (!entry) {
				throw new Error(`Missing experience entry for ${experienceSlug}.`);
			}

			expect(
				within(continuation).getByRole("link", {
					name: `Relevant experience: ${entry.role} at ${entry.company}`,
				}),
			).toHaveAttribute("href", `${routes.experience}#${entry.slug}`);
		}

		expect(
			within(continuation).getByRole("link", {
				name: `Next case study: ${nextCaseStudy.title}`,
			}),
		).toHaveAttribute("href", workProjectPath(nextCaseStudy.slug));
	});

	it("omits the next-case-study link for the last case study in the area", async () => {
		const lastCaseStudy = caseStudies[caseStudies.length - 1];

		renderCaseStudyPage(workProjectPath(lastCaseStudy.slug));
		await screen.findByRole("heading", {
			level: 1,
			name: lastCaseStudy.title,
		});

		const continuation = screen.getByRole("navigation", {
			name: "Continue exploring",
		});
		expect(
			within(continuation).queryByText(/^Next case study:/),
		).not.toBeInTheDocument();
	});

	it("renders the not-found page for an unknown case study slug", async () => {
		renderCaseStudyPage(workProjectPath("does-not-exist"));

		expect(
			await screen.findByRole("heading", { name: "Page Not Found" }),
		).toBeInTheDocument();
	});

	it("has no detectable accessibility violations", async () => {
		const caseStudy = caseStudies.find(
			({ slug }) => slug === "alfred-what-to-do-next",
		);
		if (!caseStudy) {
			throw new Error("Expected the Alfred case study to be published.");
		}

		const { container } = renderCaseStudyPage(workProjectPath(caseStudy.slug));
		await screen.findByRole("heading", { level: 1, name: caseStudy.title });

		expect((await axe(container)).violations).toHaveLength(0);
	});
});
