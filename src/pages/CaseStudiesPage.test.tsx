import { render, screen, within } from "@testing-library/react";
import type { ComponentProps } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { caseStudyPath, routes } from "../app/routes.ts";
import { caseStudies } from "../content/evidence-content.ts";
import { axe } from "../test/axe.ts";
import type { CaseStudy } from "../types/evidence.ts";
import CaseStudiesPage from "./CaseStudiesPage.tsx";

const caseStudyFixture: CaseStudy = {
	slug: "fixture-case-study",
	title: "Fixture Case Study",
	summary: "A fixture for verifying the reusable case-study structure.",
	context: "A product team needed to improve a high-friction workflow.",
	problem: "The existing workflow was difficult to understand and maintain.",
	role: "Led the frontend implementation in collaboration with product and design.",
	constraints: ["Existing API contracts", "A small delivery team"],
	decisions: [
		"Keep the workflow explicit",
		"Validate the riskiest states first",
	],
	productAndUx:
		"Clarified the primary task and reduced unnecessary interaction.",
	engineering:
		"Separated state transitions from presentation and covered key states with tests.",
	outcomes: [
		{
			statement: "The workflow became easier to operate.",
			detail: "The qualitative outcome was observed during team use.",
		},
	],
	reflection:
		"The clearest boundary was more valuable than adding another abstraction.",
	technologies: ["React", "TypeScript"],
};

function renderCaseStudiesPage(
	props: ComponentProps<typeof CaseStudiesPage> = {},
) {
	return render(
		<MemoryRouter>
			<CaseStudiesPage {...props} />
		</MemoryRouter>,
	);
}

describe("CaseStudiesPage", () => {
	it("renders a card per case study linking to its project page", () => {
		renderCaseStudiesPage();

		for (const caseStudy of caseStudies) {
			const link = screen.getByRole("link", { name: caseStudy.title });
			expect(link).toHaveAttribute("href", caseStudyPath(caseStudy.slug));

			const card = screen.getByRole("article", { name: caseStudy.title });
			expect(within(card).getByText(caseStudy.summary)).toBeInTheDocument();
		}
	});

	it("does not include the UV Insect Trap in professional case studies", () => {
		renderCaseStudiesPage();

		expect(
			screen.queryByRole("article", { name: "UV Insect Trap" }),
		).not.toBeInTheDocument();
	});

	it("renders a fixture card with its summary and technologies", () => {
		renderCaseStudiesPage({ caseStudies: [caseStudyFixture] });

		const card = screen.getByRole("article", {
			name: caseStudyFixture.title,
		});
		expect(
			within(card).getByText(caseStudyFixture.summary),
		).toBeInTheDocument();

		const technologies = within(card).getByRole("list", {
			name: "Technologies",
		});
		for (const technology of caseStudyFixture.technologies ?? []) {
			expect(within(technologies).getByText(technology)).toBeInTheDocument();
		}
	});

	it("provides a contextual continuation to Experience", () => {
		renderCaseStudiesPage();

		expect(
			within(
				screen.getByRole("navigation", { name: "Continue exploring" }),
			).getByRole("link", { name: "View the career context" }),
		).toHaveAttribute("href", routes.experience);
	});

	it("has no detectable accessibility violations with fixture content", async () => {
		const { container } = renderCaseStudiesPage({
			caseStudies: [caseStudyFixture],
		});

		expect((await axe(container)).violations).toHaveLength(0);
	});
});
