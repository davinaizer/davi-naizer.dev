import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Visual } from "../types/evidence.ts";
import ProjectGallery from "./ProjectGallery.tsx";

const showModalDescriptor = Object.getOwnPropertyDescriptor(
	HTMLDialogElement.prototype,
	"showModal",
);
const closeDescriptor = Object.getOwnPropertyDescriptor(
	HTMLDialogElement.prototype,
	"close",
);

const visuals: readonly Visual[] = [
	{
		src: "/images/example/one.jpg",
		alt: "First example visual",
		title: "First visual",
		caption: "Caption for the first visual.",
		layout: "landscape",
	},
	{
		src: "/images/example/two.jpg",
		alt: "Second example visual",
		title: "Second visual",
		caption: "Caption for the second visual.",
		layout: "portrait",
	},
];

describe("ProjectGallery", () => {
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

	it("renders each thumbnail as a button and opens the lightbox with its image and caption", () => {
		const { container } = render(<ProjectGallery visuals={visuals} />);

		const trigger = screen.getByRole("button", {
			name: "First example visual",
		});
		fireEvent.click(trigger);

		expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce();
		const dialog = container.querySelector("dialog");
		if (!dialog) {
			throw new Error("Expected the lightbox dialog to render.");
		}
		expect(
			within(dialog).getByRole("img", { name: "First example visual" }),
		).toHaveAttribute("src", "/images/example/one.jpg");
		expect(
			within(dialog).getByText("Caption for the first visual."),
		).toBeInTheDocument();
	});

	it("closes the lightbox and returns focus to the triggering thumbnail on Close", () => {
		const { container } = render(<ProjectGallery visuals={visuals} />);

		const trigger = screen.getByRole("button", {
			name: "Second example visual",
		});
		fireEvent.click(trigger);

		const dialog = container.querySelector("dialog");
		if (!dialog) {
			throw new Error("Expected the lightbox dialog to render.");
		}
		fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));

		expect(HTMLDialogElement.prototype.close).toHaveBeenCalledOnce();
		expect(within(dialog).queryByRole("img")).not.toBeInTheDocument();
		expect(trigger).toHaveFocus();
	});

	it("closes the lightbox on a backdrop click and returns focus to the triggering thumbnail", () => {
		const { container } = render(<ProjectGallery visuals={visuals} />);

		const trigger = screen.getByRole("button", {
			name: "First example visual",
		});
		fireEvent.click(trigger);

		const dialog = container.querySelector("dialog");
		if (!dialog) {
			throw new Error("Expected the lightbox dialog to render.");
		}
		fireEvent.click(dialog);

		expect(HTMLDialogElement.prototype.close).toHaveBeenCalledOnce();
		expect(trigger).toHaveFocus();
	});

	it("does not close the lightbox when a click lands on its content", () => {
		const { container } = render(<ProjectGallery visuals={visuals} />);

		fireEvent.click(
			screen.getByRole("button", { name: "First example visual" }),
		);

		const dialog = container.querySelector("dialog");
		if (!dialog) {
			throw new Error("Expected the lightbox dialog to render.");
		}
		fireEvent.click(
			within(dialog).getByRole("img", { name: "First example visual" }),
		);

		expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
	});
});
