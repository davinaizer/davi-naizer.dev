import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { routes, workProjectPath, workSectionPath } from "../app/routes.ts";
import { professionalContent } from "../content/professional-content.ts";
import { axe } from "../test/axe.ts";
import { fixtureCaseStudies } from "../test/evidence-fixtures.ts";
import CaseStudyPage from "./CaseStudyPage.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

vi.mock("../content/evidence-content.ts", () =>
	import("../test/evidence-fixtures.ts").then((module) =>
		module.evidenceContentMock(),
	),
);

const [first, draft, last] = fixtureCaseStudies;

function renderCaseStudyPage(path: string) {
	const router = createMemoryRouter(
		[
			{ path: routes.workProject, Component: CaseStudyPage },
			{ path: "*", Component: NotFoundPage },
		],
		{ initialEntries: [path] },
	);

	return render(<RouterProvider router={router} />);
}

describe("CaseStudyPage", () => {
	it("renders a case study with a section nav, tags, and gallery", async () => {
		renderCaseStudyPage(workProjectPath(first.slug));

		expect(
			await screen.findByRole("heading", { level: 1, name: first.title }),
		).toBeInTheDocument();
		expect(screen.getByText(first.summary)).toBeInTheDocument();

		const sectionNav = screen.getByRole("navigation", { name: "On this page" });
		expect(
			within(sectionNav)
				.getAllByRole("link")
				.map((link) => link.textContent),
		).toEqual([
			"Context",
			"Problem",
			"Role",
			"Constraints",
			"Decisions",
			"Outcomes",
			"Reflection",
			"App screens",
		]);
		expect(
			within(sectionNav).getByRole("link", { name: "Context" }),
		).toHaveAttribute("href", `#${first.slug}-context`);

		const decisionsSection = screen
			.getByRole("heading", { level: 2, name: "Decisions" })
			.closest("section");
		if (!decisionsSection) {
			throw new Error("Expected the Decisions section to be rendered.");
		}
		expect(
			within(decisionsSection).getByRole("heading", {
				level: 3,
				name: "Product / UX",
			}),
		).toBeInTheDocument();
		expect(
			within(decisionsSection).getByText(first.productAndUx),
		).toBeInTheDocument();
		expect(
			within(decisionsSection).getByRole("heading", {
				level: 3,
				name: "Engineering",
			}),
		).toBeInTheDocument();
		expect(
			within(decisionsSection).getByText(first.engineering),
		).toBeInTheDocument();
		if (first.aiWorkflow) {
			expect(
				within(decisionsSection).getByRole("heading", {
					level: 3,
					name: "AI-assisted workflow",
				}),
			).toBeInTheDocument();
			expect(
				within(decisionsSection).getByText(first.aiWorkflow),
			).toBeInTheDocument();
		}

		const technologies = screen.getByRole("list", { name: "Technologies" });
		for (const technology of first.technologies ?? []) {
			expect(within(technologies).getByText(technology)).toBeInTheDocument();
		}

		for (const visual of first.visuals ?? []) {
			expect(screen.getByRole("img", { name: visual.alt })).toHaveAttribute(
				"src",
				visual.src,
			);
		}

		const backLink = screen.getByRole("link", { name: "All case studies" });
		expect(backLink).toHaveAttribute("href", workSectionPath("caseStudies"));
	});

	it("renders a hero image with eager loading and high fetch priority", async () => {
		if (!first.hero) {
			throw new Error("Expected the fixture case study to have a hero.");
		}

		renderCaseStudyPage(workProjectPath(first.slug));
		await screen.findByRole("heading", { level: 1, name: first.title });

		const heroImage = screen.getByRole("img", { name: first.hero.alt });
		expect(heroImage).toHaveAttribute("src", first.hero.src);
		expect(heroImage).toHaveAttribute("loading", "eager");
		expect(heroImage).toHaveAttribute("fetchpriority", "high");
	});

	it("links the next published case study in Continue exploring, skipping unpublished ones", async () => {
		renderCaseStudyPage(workProjectPath(first.slug));
		await screen.findByRole("heading", { level: 1, name: first.title });

		const continuation = screen.getByRole("navigation", {
			name: "Continue exploring",
		});

		expect(
			within(continuation).getByRole("link", {
				name: `Next case study: ${last.title}`,
			}),
		).toHaveAttribute("href", workProjectPath(last.slug));
		expect(
			within(continuation).queryByText(draft.title, { exact: false }),
		).not.toBeInTheDocument();
	});

	it("links the related experience in Continue exploring", async () => {
		const entry = professionalContent.experience[0];

		renderCaseStudyPage(workProjectPath(first.slug));
		await screen.findByRole("heading", { level: 1, name: first.title });

		const continuation = screen.getByRole("navigation", {
			name: "Continue exploring",
		});
		expect(
			within(continuation).getByRole("link", {
				name: `Relevant experience: ${entry.role} at ${entry.company}`,
			}),
		).toHaveAttribute("href", `${routes.resume}#${entry.slug}`);
	});

	it("omits the next-case-study link for the last published case study", async () => {
		renderCaseStudyPage(workProjectPath(last.slug));
		await screen.findByRole("heading", { level: 1, name: last.title });

		const continuation = screen.getByRole("navigation", {
			name: "Continue exploring",
		});
		expect(
			within(continuation).queryByText(/^Next case study:/),
		).not.toBeInTheDocument();
	});

	it("renders the not-found page for an unknown case study slug", async () => {
		renderCaseStudyPage(workProjectPath("does-not-exist"));

		expect(
			await screen.findByRole("heading", { name: "Page Not Found" }),
		).toBeInTheDocument();
	});

	it("renders the not-found page for an unpublished case study", async () => {
		renderCaseStudyPage(workProjectPath(draft.slug));

		expect(
			await screen.findByRole("heading", { name: "Page Not Found" }),
		).toBeInTheDocument();
	});

	it("has no detectable accessibility violations", async () => {
		const { container } = renderCaseStudyPage(workProjectPath(first.slug));
		await screen.findByRole("heading", { level: 1, name: first.title });

		expect((await axe(container)).violations).toHaveLength(0);
	});
});
