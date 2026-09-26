// src/app/routes.ts
export const routes = {
	home: "/",
	experience: "/experience",
	work: "/work",
	experiments: "/projects",
	caseStudies: "/case-studies",
	caseStudy: "/case-studies/:slug",
	resume: "/resume",
	contact: "/contact",
} as const satisfies Record<string, `/${string}`>;

export type AppRoute = (typeof routes)[keyof typeof routes];

export function caseStudyPath(slug: string): string {
	return `${routes.caseStudies}/${slug}`;
}
