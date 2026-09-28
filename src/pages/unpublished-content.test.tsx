import { render, screen } from "@testing-library/react";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { routes, workProjectPath } from "../app/routes.ts";

vi.mock("../content/evidence-content.ts", async (importOriginal) => {
	const original =
		await importOriginal<typeof import("../content/evidence-content.ts")>();

	return {
		...original,
		caseStudies: original.caseStudies.slice(0, 1),
		projects: [],
	};
});

const { caseStudies: allCaseStudies } = await vi.importActual<
	typeof import("../content/evidence-content.ts")
>("../content/evidence-content.ts");
const { default: NotFoundPage } = await import("./NotFoundPage.tsx");
const { default: WorkPage } = await import("./WorkPage.tsx");
const { default: WorkProjectPage } = await import("./WorkProjectPage.tsx");

describe("unpublished content", () => {
	it("omits a section and its cards when nothing in it is published", () => {
		render(
			<MemoryRouter>
				<WorkPage />
			</MemoryRouter>,
		);

		expect(
			screen.getByRole("region", { name: "Case studies" }),
		).toBeInTheDocument();
		expect(
			screen.queryByRole("region", { name: "Experiments" }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: allCaseStudies[1]?.title }),
		).not.toBeInTheDocument();
	});

	it("renders the not-found page for an unpublished project's URL", async () => {
		const router = createMemoryRouter(
			[
				{ path: routes.workProject, Component: WorkProjectPage },
				{ path: "*", Component: NotFoundPage },
			],
			{ initialEntries: [workProjectPath(allCaseStudies[1]?.slug ?? "")] },
		);

		render(<RouterProvider router={router} />);

		expect(
			await screen.findByRole("heading", { name: "Page Not Found" }),
		).toBeInTheDocument();
	});
});
