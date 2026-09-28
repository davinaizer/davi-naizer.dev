import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { routes } from "../app/routes.ts";
import { axe } from "../test/axe.ts";
import PrimaryNavigation from "./PrimaryNavigation.tsx";

const navigationItems = [
	{ name: "Work", href: routes.work },
	{ name: "Resume", href: routes.resume },
] as const;

describe("PrimaryNavigation", () => {
	it("renders the complete primary navigation contract in order", () => {
		render(
			<MemoryRouter initialEntries={[routes.work]}>
				<PrimaryNavigation />
			</MemoryRouter>,
		);

		const navigation = screen.getByRole("navigation", { name: "Primary" });
		const links = within(navigation).getAllByRole("link");

		expect(links).toHaveLength(navigationItems.length);
		expect(links.map((link) => link.textContent)).toEqual(
			navigationItems.map((item) => item.name),
		);
		expect(links.map((link) => link.getAttribute("href"))).toEqual(
			navigationItems.map((item) => item.href),
		);
	});

	it("marks only the current route as active", () => {
		render(
			<MemoryRouter initialEntries={[routes.work]}>
				<PrimaryNavigation />
			</MemoryRouter>,
		);

		const navigation = screen.getByRole("navigation", { name: "Primary" });

		expect(
			within(navigation).getByRole("link", { name: "Work" }),
		).toHaveAttribute("aria-current", "page");
		for (const item of navigationItems.filter(
			(item) => item.href !== routes.work,
		)) {
			expect(
				within(navigation).getByRole("link", { name: item.name }),
			).not.toHaveAttribute("aria-current");
		}
	});

	it("has no detectable accessibility violations", async () => {
		const { container } = render(
			<MemoryRouter initialEntries={[routes.work]}>
				<PrimaryNavigation />
			</MemoryRouter>,
		);

		expect((await axe(container)).violations).toHaveLength(0);
	});
});
