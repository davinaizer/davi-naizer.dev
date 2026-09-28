import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import { professionalContent } from "../content/professional-content.ts";
import HomePage from "../pages/HomePage.tsx";
import { axe } from "../test/axe.ts";
import App from "./App.tsx";
import { routes, workSectionPath } from "./routes.ts";

function renderApp() {
	const router = createMemoryRouter(
		[
			{
				Component: App,
				children: [{ index: true, Component: HomePage }],
			},
		],
		{ initialEntries: [routes.home] },
	);

	return render(<RouterProvider router={router} />);
}

describe("App", () => {
	it("renders the shared shell around the current route content", async () => {
		renderApp();

		expect(screen.getByRole("link", { name: "Davi Naizer" })).toHaveAttribute(
			"href",
			routes.home,
		);
		expect(
			screen.getByRole("navigation", { name: "Primary" }),
		).toBeInTheDocument();
		expect(
			within(screen.getByRole("banner")).getByRole("link", {
				name: "Contact",
			}),
		).toHaveAttribute("href", routes.contact);
		expect(await screen.findByRole("main")).toHaveTextContent("Davi Naizer");
		expect(
			screen.getByText("Senior Frontend & Product Engineer"),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: "Explore experience" }),
		).toHaveAttribute("href", routes.resume);
		expect(
			screen.getByRole("link", { name: "Download Resume" }),
		).toHaveAttribute("href", professionalContent.resume.url);
		expect(
			screen.getByRole("link", { name: "Download Resume" }),
		).toHaveAttribute("download");
		expect(
			screen.getByRole("link", {
				name: "Explore my independent experiments",
			}),
		).toHaveAttribute("href", workSectionPath("experiments"));
		expect(screen.getByText("© 2026 Davi Naizer")).toBeInTheDocument();
		const footerNavigation = screen.getByRole("navigation", {
			name: "Social and contact links",
		});
		expect(
			within(footerNavigation).getByRole("link", { name: "LinkedIn" }),
		).toHaveAttribute("href", "https://www.linkedin.com/in/davi-naizer");
		expect(
			within(footerNavigation).getByRole("link", { name: "GitHub" }),
		).toHaveAttribute("href", "https://github.com/davinaizer");
		expect(
			within(footerNavigation).getByRole("link", { name: "Email" }),
		).toHaveAttribute("href", "mailto:davi.naizer@gmail.com");
	});

	it("has no detectable accessibility violations", async () => {
		const { container } = renderApp();

		await screen.findByRole("main");
		expect((await axe(container)).violations).toHaveLength(0);
	});
});
