import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { routes } from "../app/routes.ts";
import { projects } from "../content/evidence-content.ts";
import { professionalContent } from "../content/professional-content.ts";
import { axe } from "../test/axe.ts";
import ExperimentsPage from "./ExperimentsPage.tsx";

function renderExperimentsPage() {
	return render(
		<MemoryRouter>
			<ExperimentsPage />
		</MemoryRouter>,
	);
}

describe("ExperimentsPage", () => {
	it("renders the independent experiments", () => {
		renderExperimentsPage();

		expect(
			screen.getByRole("heading", { level: 1, name: "Experiments" }),
		).toBeInTheDocument();
		expect(
			screen.getByText(/personal experiments, not paid case studies/i),
		).toBeInTheDocument();

		const projectArticles = screen.getAllByRole("article");
		expect(projectArticles).toHaveLength(projects.length);

		for (const [index, project] of projects.entries()) {
			const article = projectArticles[index];
			expect(
				within(article).getByRole("heading", {
					level: 2,
					name: project.title,
				}),
			).toBeInTheDocument();
			expect(within(article).getByText(project.summary)).toBeInTheDocument();
		}
	});

	it("connects projects to relevant experience and capabilities", () => {
		renderExperimentsPage();

		for (const project of projects) {
			const article = screen
				.getByRole("heading", { level: 2, name: project.title })
				.closest("article");
			if (!article) {
				throw new Error(`Expected an article for ${project.title}.`);
			}

			const experienceSection = within(article).queryByRole("region", {
				name: `Relevant experience for ${project.title}`,
			});
			const experienceSlugs = project.relatedExperienceSlugs ?? [];
			if (experienceSlugs.length) {
				expect(experienceSection).not.toBeNull();
				const experienceLinks = within(
					experienceSection as HTMLElement,
				).getAllByRole("link");
				expect(experienceLinks).toHaveLength(experienceSlugs.length);

				for (const experienceSlug of experienceSlugs) {
					const experienceEntry = professionalContent.experience.find(
						(entry) => entry.slug === experienceSlug,
					);
					if (!experienceEntry) {
						throw new Error(`Missing experience entry for ${experienceSlug}.`);
					}

					expect(
						within(experienceSection as HTMLElement).getByRole("link", {
							name: `${experienceEntry.role} at ${experienceEntry.company}`,
						}),
					).toHaveAttribute(
						"href",
						`${routes.experience}#${experienceEntry.slug}`,
					);
				}
			}

			const capabilitiesSection = within(article).queryByRole("region", {
				name: `Capabilities for ${project.title}`,
			});
			for (const capability of project.capabilities ?? []) {
				expect(
					within(capabilitiesSection as HTMLElement).getByText(capability),
				).toBeInTheDocument();
				expect(professionalContent.summary.focusAreas).toContain(capability);
			}
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

	it("has no detectable accessibility violations", async () => {
		const { container } = renderExperimentsPage();

		expect((await axe(container)).violations).toHaveLength(0);
	});

	it("renders the UV experiment narrative, evidence, and visuals", () => {
		renderExperimentsPage();

		const uvProject = projects.find(
			(project) => project.slug === "uv-insect-trap",
		);
		if (!uvProject) {
			throw new Error("Expected the UV Insect Trap project to exist.");
		}

		const article = screen.getByRole("article", { name: "UV Insect Trap" });
		expect(
			within(article).getByRole("heading", { name: "What I built" }),
		).toBeInTheDocument();
		expect(
			within(article).getByRole("heading", {
				name: "Design and engineering decisions",
			}),
		).toBeInTheDocument();
		expect(
			within(article).getByText(
				/not a measured change in mosquito population/i,
			),
		).toBeInTheDocument();
		expect(
			within(article).getByText(
				"A 3D-printed trap shaped through repeated work on airflow, grille noise, and cleaning.",
			),
		).toBeInTheDocument();
		expect(
			within(article).getByText(
				/From my notes and recollection, I went through at least seven versions\./,
			),
		).toBeInTheDocument();
		for (const visual of uvProject.visuals ?? []) {
			expect(
				within(article).getByRole("img", { name: visual.alt }),
			).toHaveAttribute("src", visual.src);
		}
	});

	it("renders the Atelier Florae launch narrative and evidence", () => {
		renderExperimentsPage();

		const project = projects.find((entry) => entry.slug === "atelier-florae");
		if (!project) {
			throw new Error("Expected the Atelier Florae project to exist.");
		}

		const article = screen.getByRole("article", {
			name: "Atelier Florae: From Brand to Product",
		});

		expect(
			within(article).getByText(
				/100 g candle offer with a coherent brand, packaging system, and customer-feedback loop/i,
			),
		).toBeInTheDocument();
		expect(
			within(article).getByText(/sold 85 candles over two months/i),
		).toBeInTheDocument();
		expect(
			within(article).getByText(/Five anonymous survey respondents/i),
		).toBeInTheDocument();
		expect(
			within(article).getByText(/Bamboo fragrance slightly reminiscent/i),
		).toBeInTheDocument();

		for (const visual of project.visuals ?? []) {
			expect(
				within(article).getByRole("img", { name: visual.alt }),
			).toHaveAttribute("src", visual.src);
		}
	});
});
