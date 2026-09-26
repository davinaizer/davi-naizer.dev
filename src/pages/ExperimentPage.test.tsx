import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import { experimentPath, routes } from "../app/routes.ts";
import { projects } from "../content/evidence-content.ts";
import { axe } from "../test/axe.ts";
import ExperimentPage from "./ExperimentPage.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

function renderExperimentPage(path: string) {
	const router = createMemoryRouter(
		[
			{ path: routes.experiment, Component: ExperimentPage },
			{ path: "*", Component: NotFoundPage },
		],
		{ initialEntries: [path] },
	);

	return render(<RouterProvider router={router} />);
}

describe("ExperimentPage", () => {
	it("renders the Atelier Florae experiment with a section nav, tags, and gallery", async () => {
		const project = projects.find((entry) => entry.slug === "atelier-florae");
		if (!project) {
			throw new Error("Expected the Atelier Florae experiment to exist.");
		}

		renderExperimentPage(experimentPath(project.slug));

		expect(
			await screen.findByRole("heading", { level: 1, name: project.title }),
		).toBeInTheDocument();
		expect(screen.getByText(project.summary)).toBeInTheDocument();

		const sectionNav = screen.getByRole("navigation", { name: "Sections" });
		expect(
			within(sectionNav)
				.getAllByRole("link")
				.map((link) => link.textContent),
		).toEqual([
			"Context",
			"Purpose",
			"Problem",
			"What I built",
			"My contribution",
			"Design and engineering decisions",
			"Brand system and launch materials",
			"What I observed",
			"Reflection",
		]);
		expect(
			within(sectionNav).getByRole("link", { name: "Context" }),
		).toHaveAttribute("href", `#${project.slug}-context`);

		const technologies = screen.getByRole("list", { name: "Technologies" });
		for (const technology of project.technologies ?? []) {
			expect(within(technologies).getByText(technology)).toBeInTheDocument();
		}

		for (const visual of project.visuals ?? []) {
			expect(screen.getByRole("img", { name: visual.alt })).toHaveAttribute(
				"src",
				visual.src,
			);
		}

		const backLink = screen.getByRole("link", { name: "All experiments" });
		expect(backLink).toHaveAttribute("href", routes.experiments);
	});

	it("links the next experiment in Continue exploring", async () => {
		const project = projects.find((entry) => entry.slug === "atelier-florae");
		const nextProject = projects[1];
		if (!project || !nextProject) {
			throw new Error("Expected at least two published experiments.");
		}

		renderExperimentPage(experimentPath(project.slug));
		await screen.findByRole("heading", { level: 1, name: project.title });

		const continuation = screen.getByRole("navigation", {
			name: "Continue exploring",
		});

		expect(
			within(continuation).queryByText(/^Relevant experience:/),
		).not.toBeInTheDocument();
		expect(
			within(continuation).getByRole("link", {
				name: `Next experiment: ${nextProject.title}`,
			}),
		).toHaveAttribute("href", experimentPath(nextProject.slug));
	});

	it("omits the next-experiment link for the last experiment in the area", async () => {
		const lastProject = projects[projects.length - 1];

		renderExperimentPage(experimentPath(lastProject.slug));
		await screen.findByRole("heading", { level: 1, name: lastProject.title });

		const continuation = screen.getByRole("navigation", {
			name: "Continue exploring",
		});
		expect(
			within(continuation).queryByText(/^Next experiment:/),
		).not.toBeInTheDocument();
	});

	it("renders a hero image only for the experiment with a real result photo", async () => {
		const uvInsectTrap = projects.find(
			(entry) => entry.slug === "uv-insect-trap",
		);
		if (!uvInsectTrap?.hero) {
			throw new Error("Expected the UV Insect Trap experiment to have a hero.");
		}

		const { unmount } = renderExperimentPage(experimentPath(uvInsectTrap.slug));
		expect(
			await screen.findByRole("heading", {
				level: 1,
				name: uvInsectTrap.title,
			}),
		).toBeInTheDocument();
		const heroImage = screen.getByRole("img", { name: uvInsectTrap.hero.alt });
		expect(heroImage).toHaveAttribute("src", uvInsectTrap.hero.src);
		expect(heroImage).toHaveAttribute("loading", "eager");
		expect(heroImage).toHaveAttribute("fetchpriority", "high");
		unmount();

		const atelierFlorae = projects.find(
			(entry) => entry.slug === "atelier-florae",
		);
		if (!atelierFlorae) {
			throw new Error("Expected the Atelier Florae experiment to exist.");
		}

		renderExperimentPage(experimentPath(atelierFlorae.slug));
		await screen.findByRole("heading", { level: 1, name: atelierFlorae.title });
		expect(
			screen.queryByRole("img", { name: uvInsectTrap.hero.alt }),
		).not.toBeInTheDocument();
	});

	it("renders the not-found page for an unknown experiment slug", async () => {
		renderExperimentPage(experimentPath("does-not-exist"));

		expect(
			await screen.findByRole("heading", { name: "Page Not Found" }),
		).toBeInTheDocument();
	});

	it("has no detectable accessibility violations", async () => {
		const project = projects.find((entry) => entry.slug === "uv-insect-trap");
		if (!project) {
			throw new Error("Expected the UV Insect Trap experiment to exist.");
		}

		const { container } = renderExperimentPage(experimentPath(project.slug));
		await screen.findByRole("heading", { level: 1, name: project.title });

		expect((await axe(container)).violations).toHaveLength(0);
	});
});
