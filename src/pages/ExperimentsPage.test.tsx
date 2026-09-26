import { render, screen, within } from "@testing-library/react";
import type { ComponentProps } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { experimentPath, routes } from "../app/routes.ts";
import { projects } from "../content/evidence-content.ts";
import { axe } from "../test/axe.ts";
import type { Project } from "../types/evidence.ts";
import ExperimentsPage from "./ExperimentsPage.tsx";

const projectFixture: Project = {
	slug: "fixture-experiment",
	title: "Fixture Experiment",
	summary: "A fixture for verifying the reusable experiment card structure.",
	purpose: "Verify the card-grid index renders fixture content correctly.",
	technologies: ["React", "TypeScript"],
};

function renderExperimentsPage(
	props: ComponentProps<typeof ExperimentsPage> = {},
) {
	return render(
		<MemoryRouter>
			<ExperimentsPage {...props} />
		</MemoryRouter>,
	);
}

describe("ExperimentsPage", () => {
	it("renders a card per experiment linking to its project page", () => {
		renderExperimentsPage();

		for (const project of projects) {
			const link = screen.getByRole("link", { name: project.title });
			expect(link).toHaveAttribute("href", experimentPath(project.slug));

			const card = screen.getByRole("article", { name: project.title });
			expect(within(card).getByText(project.summary)).toBeInTheDocument();
		}
	});

	it("renders a fixture card with its summary and technologies", () => {
		renderExperimentsPage({ projects: [projectFixture] });

		const card = screen.getByRole("article", { name: projectFixture.title });
		expect(within(card).getByText(projectFixture.summary)).toBeInTheDocument();

		const technologies = within(card).getByRole("list", {
			name: "Technologies",
		});
		for (const technology of projectFixture.technologies ?? []) {
			expect(within(technologies).getByText(technology)).toBeInTheDocument();
		}
	});

	it("provides a contextual continuation to case studies", () => {
		renderExperimentsPage();

		expect(
			within(
				screen.getByRole("navigation", { name: "Continue exploring" }),
			).getByRole("link", { name: "Read the case studies" }),
		).toHaveAttribute("href", routes.caseStudies);
	});

	it("has no detectable accessibility violations with fixture content", async () => {
		const { container } = renderExperimentsPage({
			projects: [projectFixture],
		});

		expect((await axe(container)).violations).toHaveLength(0);
	});
});
