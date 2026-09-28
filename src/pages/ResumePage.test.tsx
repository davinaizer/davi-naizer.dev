import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { routes } from "../app/routes.ts";
import { professionalContent } from "../content/professional-content.ts";
import { axe } from "../test/axe.ts";
import ResumePage from "./ResumePage.tsx";

function renderResumePage() {
	return render(
		<MemoryRouter>
			<ResumePage />
		</MemoryRouter>,
	);
}

describe("ResumePage", () => {
	it("renders the approved resume access content", () => {
		renderResumePage();

		expect(
			screen.getByRole("heading", { level: 1, name: "Resume" }),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Download my current resume, or read the full career timeline below.",
			),
		).toBeInTheDocument();

		const resumeLink = screen.getByRole("link", {
			name: professionalContent.resume.label,
		});
		expect(resumeLink).toHaveAttribute("href", professionalContent.resume.url);
		expect(resumeLink).toHaveAttribute("download");

		const updatedAt = professionalContent.resume.updatedAt;
		if (!updatedAt) {
			throw new Error("Expected the approved resume update date.");
		}

		const updatedDateLabel = new Intl.DateTimeFormat("en-GB", {
			day: "numeric",
			month: "long",
			year: "numeric",
			timeZone: "UTC",
		}).format(new Date(`${updatedAt}T00:00:00Z`));
		const updatedDate = screen.getByText(updatedDateLabel);
		expect(updatedDate.tagName).toBe("TIME");
		expect(updatedDate).toHaveAttribute("datetime", updatedAt);
	});

	it("places the download action before the experience timeline", () => {
		const { container } = renderResumePage();

		const download = screen.getByRole("link", {
			name: professionalContent.resume.label,
		});
		const timeline = container.querySelector(".experience__timeline");
		if (!timeline) {
			throw new Error("Expected the experience timeline to be rendered.");
		}

		expect(
			download.compareDocumentPosition(timeline) &
				Node.DOCUMENT_POSITION_FOLLOWING,
		).toBeTruthy();
	});

	it("renders the approved experience in reverse chronological order", () => {
		const { container } = renderResumePage();

		const roleTimeline = container.querySelector<HTMLOListElement>(
			".experience__timeline:not(.experience__timeline--earlier)",
		);
		if (!roleTimeline) {
			throw new Error("Expected the current-role timeline to be rendered.");
		}

		const currentExperience = within(roleTimeline);
		const roleHeadings = currentExperience.getAllByRole("heading", {
			level: 2,
		});
		expect(roleHeadings.map(({ textContent }) => textContent)).toEqual(
			professionalContent.experience.map(({ role }) => role),
		);

		for (const entry of professionalContent.experience) {
			expect(
				currentExperience.getAllByText(entry.company).length,
			).toBeGreaterThan(0);
			expect(
				currentExperience
					.getByRole("heading", { level: 2, name: entry.role })
					.closest("article"),
			).toHaveAttribute("id", entry.slug);

			expect(
				currentExperience.getByText(
					`${entry.startDate} – ${entry.endDate ?? "Present"}`,
				),
			).toBeInTheDocument();
			if (entry.location) {
				expect(
					currentExperience.getAllByText(entry.location, { exact: false })
						.length,
				).toBeGreaterThan(0);
			}

			for (const responsibility of entry.responsibilities ?? []) {
				expect(
					currentExperience.getAllByText(responsibility).length,
				).toBeGreaterThan(0);
			}
			for (const contribution of entry.contributions ?? []) {
				expect(
					currentExperience.getAllByText(contribution).length,
				).toBeGreaterThan(0);
			}
			for (const technology of entry.technologies ?? []) {
				expect(
					currentExperience.getAllByText(technology).length,
				).toBeGreaterThan(0);
			}
		}
	});

	it("lists one section-nav link per entry, in timeline order", () => {
		renderResumePage();

		const links = within(
			screen.getByRole("navigation", { name: "On this page" }),
		).getAllByRole("link");

		expect(links.map((link) => link.getAttribute("href"))).toEqual(
			professionalContent.experience.map(({ slug }) => `#${slug}`),
		);
		expect(links[0]).toHaveTextContent(
			"Independent Product Project · 2025–Present",
		);
		expect(
			within(
				screen.getByRole("navigation", { name: "On this page" }),
			).getByRole("link", { name: "The Signal Group · 2023–2024" }),
		).toHaveAttribute(
			"href",
			"#signal-group-senior-frontend-software-engineer-2023-2024",
		);
	});

	it("omits empty optional detail sections", () => {
		renderResumePage();

		const careerBreak = screen
			.getByRole("heading", { level: 2, name: "Planned Career Break" })
			.closest("article");
		if (!careerBreak) {
			throw new Error(
				"Expected career-break entry to be rendered as an article.",
			);
		}

		expect(
			within(careerBreak).queryByRole("heading", {
				level: 3,
				name: "Selected contributions",
			}),
		).not.toBeInTheDocument();
		expect(
			within(careerBreak).queryByRole("heading", {
				level: 3,
				name: "Technologies",
			}),
		).not.toBeInTheDocument();
	});

	it("provides a contextual continuation to Work", () => {
		renderResumePage();

		expect(
			within(
				screen.getByRole("navigation", { name: "Continue exploring" }),
			).getByRole("link", { name: "Explore selected work" }),
		).toHaveAttribute("href", routes.work);
	});

	it("has no detectable accessibility violations", async () => {
		const { container } = renderResumePage();

		expect((await axe(container)).violations).toHaveLength(0);
	});
});
