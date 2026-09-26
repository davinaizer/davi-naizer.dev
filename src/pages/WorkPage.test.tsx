import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { routes, workProjectPath } from "../app/routes.ts";
import { caseStudies, projects } from "../content/evidence-content.ts";
import { axe } from "../test/axe.ts";
import WorkPage from "./WorkPage.tsx";

function renderWorkPage() {
	return render(
		<MemoryRouter initialEntries={[routes.work]}>
			<WorkPage />
		</MemoryRouter>,
	);
}

describe("WorkPage", () => {
	it("renders the page lead", () => {
		renderWorkPage();

		expect(
			screen.getByRole("heading", { level: 1, name: "Work" }),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"A selection of products, tools and workflows I’ve helped build, with more context on the problems and decisions behind them.",
			),
		).toBeInTheDocument();
	});

	it("lists Case Studies before Experiments, each card linking to its project page", () => {
		renderWorkPage();

		const caseStudySection = screen.getByRole("region", {
			name: "Case studies",
		});
		const experimentSection = screen.getByRole("region", {
			name: "Experiments",
		});
		expect(
			caseStudySection.compareDocumentPosition(experimentSection) &
				Node.DOCUMENT_POSITION_FOLLOWING,
		).toBeTruthy();
		expect(caseStudySection).toHaveAttribute("id", "case-studies");
		expect(experimentSection).toHaveAttribute("id", "experiments");

		for (const [section, entries, areaLabel] of [
			[caseStudySection, caseStudies, "Product case study"],
			[experimentSection, projects, "Independent experiment"],
		] as const) {
			const links = within(section).getAllByRole("link");
			expect(links.map((link) => link.getAttribute("href"))).toEqual(
				entries.map((entry) => workProjectPath(entry.slug)),
			);

			for (const entry of entries) {
				const card = within(section).getByRole("article", {
					name: entry.title,
				});
				expect(within(card).getByText(areaLabel)).toBeInTheDocument();
				expect(within(card).getByText(entry.summary)).toBeInTheDocument();
				expect(
					within(card).getByRole("link", { name: entry.title }),
				).toHaveAttribute("href", workProjectPath(entry.slug));

				if (entry.technologies?.length) {
					const tags = within(card).getByRole("list", {
						name: "Technologies",
					});
					for (const technology of entry.technologies) {
						expect(within(tags).getByText(technology)).toBeInTheDocument();
					}
				} else {
					expect(
						within(card).queryByRole("list", { name: "Technologies" }),
					).not.toBeInTheDocument();
				}
			}
		}
	});

	it("does not include the UV Insect Trap in the professional case studies", () => {
		renderWorkPage();

		expect(
			within(screen.getByRole("region", { name: "Case studies" })).queryByRole(
				"article",
				{ name: "UV Insect Trap" },
			),
		).not.toBeInTheDocument();
	});

	it("has no detectable accessibility violations", async () => {
		const { container } = renderWorkPage();

		expect((await axe(container)).violations).toHaveLength(0);
	});
});
