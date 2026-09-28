import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { routes, workProjectPath, workSectionPath } from "../app/routes.ts";
import { professionalContent } from "../content/professional-content.ts";
import { axe } from "../test/axe.ts";
import { fixtureProjects } from "../test/evidence-fixtures.ts";
import ExperimentPage from "./ExperimentPage.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

vi.mock("../content/evidence-content.ts", () =>
	import("../test/evidence-fixtures.ts").then((module) =>
		module.evidenceContentMock(),
	),
);

const [full, draft, last] = fixtureProjects;

function renderExperimentPage(path: string) {
	const router = createMemoryRouter(
		[
			{ path: routes.workProject, Component: ExperimentPage },
			{ path: "*", Component: NotFoundPage },
		],
		{ initialEntries: [path] },
	);

	return render(<RouterProvider router={router} />);
}

describe("ExperimentPage", () => {
	it("renders an experiment with a section nav, tags, and gallery", async () => {
		renderExperimentPage(workProjectPath(full.slug));

		expect(
			await screen.findByRole("heading", { level: 1, name: full.title }),
		).toBeInTheDocument();
		expect(screen.getByText(full.summary)).toBeInTheDocument();

		const sectionNav = screen.getByRole("navigation", { name: "On this page" });
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
			"Fixture visuals heading",
			"What I observed",
			"Reflection",
		]);
		expect(
			within(sectionNav).getByRole("link", { name: "Context" }),
		).toHaveAttribute("href", `#${full.slug}-context`);

		const technologies = screen.getByRole("list", { name: "Technologies" });
		for (const technology of full.technologies ?? []) {
			expect(within(technologies).getByText(technology)).toBeInTheDocument();
		}

		for (const visual of full.visuals ?? []) {
			expect(screen.getByRole("img", { name: visual.alt })).toHaveAttribute(
				"src",
				visual.src,
			);
		}

		const backLink = screen.getByRole("link", { name: "All experiments" });
		expect(backLink).toHaveAttribute("href", workSectionPath("experiments"));
	});

	it("renders only the sections an experiment provides", async () => {
		renderExperimentPage(workProjectPath(last.slug));
		await screen.findByRole("heading", { level: 1, name: last.title });

		const sectionNav = screen.getByRole("navigation", { name: "On this page" });
		expect(
			within(sectionNav)
				.getAllByRole("link")
				.map((link) => link.textContent),
		).toEqual(["Purpose"]);
	});

	it("links the next published experiment in Continue exploring, skipping unpublished ones", async () => {
		const entry = professionalContent.experience[0];

		renderExperimentPage(workProjectPath(full.slug));
		await screen.findByRole("heading", { level: 1, name: full.title });

		const continuation = screen.getByRole("navigation", {
			name: "Continue exploring",
		});

		expect(
			within(continuation).getByRole("link", {
				name: `Relevant experience: ${entry.role} at ${entry.company}`,
			}),
		).toHaveAttribute("href", `${routes.resume}#${entry.slug}`);
		expect(
			within(continuation).getByRole("link", {
				name: `Next experiment: ${last.title}`,
			}),
		).toHaveAttribute("href", workProjectPath(last.slug));
	});

	it("omits the next-experiment link for the last published experiment", async () => {
		renderExperimentPage(workProjectPath(last.slug));
		await screen.findByRole("heading", { level: 1, name: last.title });

		const continuation = screen.getByRole("navigation", {
			name: "Continue exploring",
		});
		expect(
			within(continuation).queryByText(/^Next experiment:/),
		).not.toBeInTheDocument();
	});

	it("renders a hero image only when the experiment has one", async () => {
		if (!last.hero) {
			throw new Error("Expected the fixture experiment to have a hero.");
		}

		const { unmount } = renderExperimentPage(workProjectPath(last.slug));
		await screen.findByRole("heading", { level: 1, name: last.title });
		const heroImage = screen.getByRole("img", { name: last.hero.alt });
		expect(heroImage).toHaveAttribute("src", last.hero.src);
		expect(heroImage).toHaveAttribute("loading", "eager");
		expect(heroImage).toHaveAttribute("fetchpriority", "high");
		unmount();

		renderExperimentPage(workProjectPath(full.slug));
		await screen.findByRole("heading", { level: 1, name: full.title });
		expect(
			screen.queryByRole("img", { name: last.hero.alt }),
		).not.toBeInTheDocument();
	});

	it("renders the not-found page for an unknown experiment slug", async () => {
		renderExperimentPage(workProjectPath("does-not-exist"));

		expect(
			await screen.findByRole("heading", { name: "Page Not Found" }),
		).toBeInTheDocument();
	});

	it("renders the not-found page for an unpublished experiment", async () => {
		renderExperimentPage(workProjectPath(draft.slug));

		expect(
			await screen.findByRole("heading", { name: "Page Not Found" }),
		).toBeInTheDocument();
	});

	it("has no detectable accessibility violations", async () => {
		const { container } = renderExperimentPage(workProjectPath(full.slug));
		await screen.findByRole("heading", { level: 1, name: full.title });

		expect((await axe(container)).violations).toHaveLength(0);
	});
});
