import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import type { Hero } from "../types/evidence.ts";

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

function useActiveSectionId(ids: readonly string[]): string | null {
	const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

	useEffect(() => {
		// Reset synchronously: React Router does not remount this component when
		// only the route's :slug param changes (e.g. a "next project" link), so a
		// stale id from the previous page would otherwise persist until the
		// IntersectionObserver below fires its first, asynchronous callback.
		setActiveId(ids[0] ?? null);

		if (typeof IntersectionObserver === "undefined" || ids.length === 0) {
			return;
		}

		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((element): element is HTMLElement => element !== null);

		if (elements.length === 0) {
			return;
		}

		const visibleIds = new Set<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visibleIds.add(entry.target.id);
					} else {
						visibleIds.delete(entry.target.id);
					}
				}

				const nextActiveId = ids.find((id) => visibleIds.has(id));
				if (nextActiveId) {
					setActiveId(nextActiveId);
				}
			},
			{ rootMargin: "-20% 0px -70% 0px", threshold: 0 },
		);

		for (const element of elements) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	}, [ids]);

	return activeId;
}

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
	const sectionIds = useMemo(
		() => sections.map((section) => section.id),
		[sections],
	);
	const activeId = useActiveSectionId(sectionIds);
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

			<div className="project-page__layout">
				<nav aria-label="Sections" className="project-page__nav">
					<ul>
						{sections.map((section) => (
							<li key={section.id}>
								<a
									aria-current={section.id === activeId ? "true" : undefined}
									className="project-page__nav-link"
									href={`#${section.id}`}
								>
									{section.heading}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<div className="project-page__content">
					{tags?.length ? (
						<ul aria-label="Technologies" className="project-page__tags">
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
							loading="lazy"
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
							<h2 id={`${section.id}-heading`}>{section.heading}</h2>
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
