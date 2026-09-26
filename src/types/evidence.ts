export type Outcome = {
	statement: string;
	detail?: string;
};

export type Visual = {
	src: string;
	alt: string;
	title: string;
	caption: string;
	layout: "landscape" | "portrait";
};

export type Hero = {
	src: string;
	alt: string;
};

export type EvidenceReference =
	| { kind: "project"; slug: string }
	| { kind: "case-study"; slug: string };

type EvidenceBase = {
	slug: string;
	title: string;
	summary: string;
	context?: string;
	outcomes?: readonly Outcome[];
	hero?: Hero;
};

export type Project = EvidenceBase & {
	purpose: string;
	problem?: string;
	solution?: string;
	role?: string;
	decisions?: readonly string[];
	reflection?: string;
	visualsHeading?: string;
	visualsIntro?: string;
	visuals?: readonly Visual[];
	relatedExperienceSlugs?: readonly string[];
	capabilities?: readonly string[];
	technologies?: readonly string[];
};

export type CaseStudy = EvidenceBase & {
	relatedExperienceSlugs?: readonly string[];
	technologies?: readonly string[];
	context: string;
	problem: string;
	role: string;
	visuals?: readonly Visual[];
	constraints: readonly string[];
	decisions: readonly string[];
	productAndUx: string;
	engineering: string;
	outcomes: readonly Outcome[];
	reflection: string;
};
