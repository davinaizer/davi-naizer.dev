import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "../test/axe.ts";
import type { Diagram } from "../types/evidence.ts";
import DiagramPanel from "./DiagramPanel.tsx";

const diagram: Diagram = {
	filename: "example-route.flow",
	title: "Example route: three stages",
	nodes: [
		{ label: "First", detail: "First detail" },
		{ label: "Second", detail: "Second detail" },
		{ label: "Third", detail: "Third detail" },
	],
	activeIndex: 1,
	caption: "Example caption.",
};

describe("DiagramPanel", () => {
	it("shows the filename, the caption, and the nodes in order", () => {
		render(<DiagramPanel diagram={diagram} />);

		expect(screen.getByText("example-route.flow")).toBeInTheDocument();
		expect(screen.getByText("Example caption.")).toBeInTheDocument();

		const flow = screen.getByRole("list", { name: diagram.title });
		expect(
			within(flow)
				.getAllByRole("listitem")
				.map((item) => item.textContent),
		).toEqual([
			"FirstFirst detail",
			"SecondSecond detail",
			"ThirdThird detail",
		]);
	});

	it("marks only the active node", () => {
		render(<DiagramPanel diagram={diagram} />);

		const items = screen.getAllByRole("listitem");
		expect(items[1]).toHaveClass("diagram-panel__node--active");
		expect(items[0]).not.toHaveClass("diagram-panel__node--active");
		expect(items[2]).not.toHaveClass("diagram-panel__node--active");
	});

	it("marks no node when activeIndex is omitted", () => {
		render(<DiagramPanel diagram={{ ...diagram, activeIndex: undefined }} />);

		for (const item of screen.getAllByRole("listitem")) {
			expect(item).not.toHaveClass("diagram-panel__node--active");
		}
	});

	it("has no detectable accessibility violations", async () => {
		const { container } = render(<DiagramPanel diagram={diagram} />);

		expect((await axe(container)).violations).toHaveLength(0);
	});
});
