import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { routes, workProjectPath } from "../app/routes.ts";
import {
	fixtureCaseStudies,
	fixtureProjects,
} from "../test/evidence-fixtures.ts";
import NotFoundPage from "./NotFoundPage.tsx";
import WorkProjectPage from "./WorkProjectPage.tsx";

vi.mock("../content/evidence-content.ts", () =>
	import("../test/evidence-fixtures.ts").then((module) =>
		module.evidenceContentMock(),
	),
);

function renderWorkProjectPage(path: string) {
	const router = createMemoryRouter(
		[
			{ path: routes.workProject, Component: WorkProjectPage },
			{ path: "*", Component: NotFoundPage },
		],
		{ initialEntries: [path] },
	);

	return render(<RouterProvider router={router} />);
}

describe("WorkProjectPage", () => {
	it("renders a case study at /work/<slug>", async () => {
		const [caseStudy] = fixtureCaseStudies;

		renderWorkProjectPage(workProjectPath(caseStudy.slug));

		expect(
			await screen.findByRole("heading", { level: 1, name: caseStudy.title }),
		).toBeInTheDocument();
		expect(screen.getByText("Product case study")).toBeInTheDocument();
	});

	it("renders an experiment at /work/<slug>", async () => {
		const [project] = fixtureProjects;

		renderWorkProjectPage(workProjectPath(project.slug));

		expect(
			await screen.findByRole("heading", { level: 1, name: project.title }),
		).toBeInTheDocument();
		expect(screen.getByText("Independent experiment")).toBeInTheDocument();
	});

	it("renders the not-found page for an unknown slug", async () => {
		renderWorkProjectPage(workProjectPath("does-not-exist"));

		expect(
			await screen.findByRole("heading", { name: "Page Not Found" }),
		).toBeInTheDocument();
	});
});
