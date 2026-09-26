// src/app/routes.ts
export const routes = {
	home: "/",
	experience: "/experience",
	work: "/work",
	workProject: "/work/:slug",
	resume: "/resume",
	contact: "/contact",
} as const satisfies Record<string, `/${string}`>;

export type AppRoute = (typeof routes)[keyof typeof routes];

export const workSectionIds = {
	caseStudies: "case-studies",
	experiments: "experiments",
} as const;

export type WorkSection = keyof typeof workSectionIds;

export function workProjectPath(slug: string): string {
	return `${routes.work}/${slug}`;
}

export function workSectionPath(section: WorkSection): string {
	return `${routes.work}#${workSectionIds[section]}`;
}
