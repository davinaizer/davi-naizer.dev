import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { WorkflowGraph } from "../types/evidence.ts";
import RoutingGraph from "./RoutingGraph.tsx";

const showModalDescriptor = Object.getOwnPropertyDescriptor(
	HTMLDialogElement.prototype,
	"showModal",
);
const closeDescriptor = Object.getOwnPropertyDescriptor(
	HTMLDialogElement.prototype,
	"close",
);

const graph: WorkflowGraph = {
	src: "/images/example/graph.svg",
	title: "Example routing graph",
	alt: "Example graph alt text",
	width: 400,
	height: 200,
	caption: "Example graph caption.",
	steps: ["First step.", "Second step."],
};

describe("RoutingGraph", () => {
	beforeEach(() => {
		Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
			configurable: true,
			value: vi.fn(function showModal(this: HTMLDialogElement) {
				this.setAttribute("open", "");
			}),
		});
		Object.defineProperty(HTMLDialogElement.prototype, "close", {
			configurable: true,
			value: vi.fn(function close(this: HTMLDialogElement) {
				this.removeAttribute("open");
				this.dispatchEvent(new Event("close"));
			}),
		});
	});

	afterEach(() => {
		if (showModalDescriptor) {
			Object.defineProperty(
				HTMLDialogElement.prototype,
				"showModal",
				showModalDescriptor,
			);
		}
		if (closeDescriptor) {
			Object.defineProperty(
				HTMLDialogElement.prototype,
				"close",
				closeDescriptor,
			);
		}
	});

	it("renders the image, caption, and a visible text version of the steps", () => {
		render(<RoutingGraph graph={graph} />);

		expect(screen.getByRole("img", { name: graph.alt })).toHaveAttribute(
			"src",
			graph.src,
		);
		expect(screen.getByText(graph.caption)).toBeInTheDocument();
		const steps = screen.getByRole("list", { name: "Routing graph as text" });
		expect(within(steps).getAllByRole("listitem")).toHaveLength(2);
	});

	it("opens the image in a lightbox and returns focus to the trigger on Close", () => {
		const { container } = render(<RoutingGraph graph={graph} />);

		const trigger = screen.getByRole("button", { name: graph.alt });
		fireEvent.click(trigger);

		expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce();
		const dialog = container.querySelector("dialog");
		if (!dialog) {
			throw new Error("Expected the lightbox dialog to render.");
		}
		expect(dialog).toHaveClass("project-page__lightbox--wide");
		expect(
			within(dialog).getByRole("img", { name: graph.alt }),
		).toHaveAttribute("src", graph.src);

		fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));

		expect(within(dialog).queryByRole("img")).not.toBeInTheDocument();
		expect(trigger).toHaveFocus();
	});
});
