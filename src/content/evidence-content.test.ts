import { describe, expect, it } from "vitest";
import sitemap from "../../public/sitemap.xml?raw";
import { caseStudies, onlyPublished, projects } from "./evidence-content.ts";

describe("evidence content", () => {
	it("uses slugs that are unique across case studies and experiments", () => {
		const slugs = [...caseStudies, ...projects].map((entry) => entry.slug);

		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it("keeps only published entries", () => {
		const entries = [
			{ slug: "live", published: true },
			{ slug: "draft", published: false },
		];

		expect(onlyPublished(entries)).toEqual([{ slug: "live", published: true }]);
	});

	it("lists exactly the published project pages in the sitemap", () => {
		const sitemapSlugs = [...sitemap.matchAll(/\/work\/([^<]+)</g)].map(
			(match) => match[1],
		);
		const publishedSlugs = [...caseStudies, ...projects].map(
			(entry) => entry.slug,
		);

		expect([...sitemapSlugs].sort()).toEqual([...publishedSlugs].sort());
	});
});
