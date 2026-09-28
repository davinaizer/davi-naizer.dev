import type { ReactNode } from "react";
import { useMemo } from "react";
import { Link } from "react-router";
import type { Hero } from "../types/evidence.ts";
import SectionNav from "./SectionNav.tsx";

export type ProjectPageSection = {
	id: string;
	heading: string;
	content: ReactNode;
};

type ProjectPageLayoutProps = {
	id: string;
	areaLabel: string;
	backLink: { to: string; label: string };
	title: string;
	summary: string;
	tags?: readonly string[];
	hero?: Hero;
	sections: readonly ProjectPageSection[];
	continuation: ReactNode;
};

function ProjectPageLayout({
	id,
	areaLabel,
	backLink,
	title,
	summary,
	tags,
	hero,
	sections,
	continuation,
}: ProjectPageLayoutProps) {
	const navItems = useMemo(
		() =>
			sections.map((section) => ({ id: section.id, label: section.heading })),
		[sections],
	);
	const titleId = `${id}-title`;

	return (
		<article aria-labelledby={titleId} className="project-page page-section">
			<header className="project-page__header page-lead">
				<Link className="project-page__back" to={backLink.to}>
					{backLink.label}
				</Link>
				<p className="eyebrow">{areaLabel}</p>
				<h1 id={titleId}>{title}</h1>
				<p className="project-page__summary page-intro">{summary}</p>
			</header>

			<div className="section-layout">
				<SectionNav idPrefix={id} items={navItems} />

				<div className="section-layout__content project-page__content">
					{tags?.length ? (
						<ul aria-label="Technologies" className="tag-list">
							{tags.map((tag) => (
								<li key={tag}>{tag}</li>
							))}
						</ul>
					) : null}

					{hero ? (
						<img
							alt={hero.alt}
							className="project-page__hero"
							decoding="async"
							fetchPriority="high"
							loading="eager"
							src={hero.src}
						/>
					) : null}

					{sections.map((section) => (
						<section
							aria-labelledby={`${section.id}-heading`}
							className="project-page__section"
							id={section.id}
							key={section.id}
						>
							<h2
								className="section-label-heading"
								id={`${section.id}-heading`}
							>
								{section.heading}
							</h2>
							{section.content}
						</section>
					))}
				</div>
			</div>

			{continuation}
		</article>
	);
}

export default ProjectPageLayout;
