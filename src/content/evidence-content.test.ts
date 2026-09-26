import { describe, expect, it } from "vitest";
import { caseStudies, projects } from "./evidence-content.ts";

describe("evidence content", () => {
	it("uses slugs that are unique across case studies and experiments", () => {
		const slugs = [...caseStudies, ...projects].map((entry) => entry.slug);

		expect(new Set(slugs).size).toBe(slugs.length);
	});
});
