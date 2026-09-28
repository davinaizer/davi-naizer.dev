import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { fixtureCaseStudies } from "../test/evidence-fixtures.ts";
import WorkPage from "./WorkPage.tsx";

vi.mock("../content/evidence-content.ts", async () => {
	const { evidenceContentMock } = await import("../test/evidence-fixtures.ts");

	return { ...(await evidenceContentMock()), projects: [] };
});

describe("WorkPage with no published experiments", () => {
	it("omits the Experiments section and keeps the Case studies section", () => {
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
			screen.getByRole("heading", {
				level: 3,
				name: fixtureCaseStudies[0].title,
			}),
		).toBeInTheDocument();
	});
});
