import { Link, useParams } from "react-router";
import { routes, workProjectPath, workSectionPath } from "../app/routes.ts";
import DiagramPanel from "../components/DiagramPanel.tsx";
import ProjectGallery from "../components/ProjectGallery.tsx";
import ProjectPageLayout, {
	type ProjectPageSection,
} from "../components/ProjectPageLayout.tsx";
import { caseStudies } from "../content/evidence-content.ts";
import { professionalContent } from "../content/professional-content.ts";
import NotFoundPage from "./NotFoundPage.tsx";

function CaseStudyPage() {
	const { slug } = useParams<{ slug: string }>();
	const currentIndex = caseStudies.findIndex((entry) => entry.slug === slug);
	const caseStudy = caseStudies[currentIndex];

	if (!caseStudy) {
		return <NotFoundPage />;
	}

	const [aiLead, ...aiRest] = caseStudy.aiWorkflow ?? [];
	const nextCaseStudy = caseStudies[currentIndex + 1];
	const relatedExperience = (caseStudy.relatedExperienceSlugs ?? [])
		.map((experienceSlug) =>
			professionalContent.experience.find(
				(entry) => entry.slug === experienceSlug,
			),
		)
		.filter((entry): entry is NonNullable<typeof entry> => entry !== undefined);

	const sections: ProjectPageSection[] = [
		{
			id: `${caseStudy.slug}-context`,
			heading: "Context",
			content: <p>{caseStudy.context}</p>,
		},
		{
			id: `${caseStudy.slug}-problem`,
			heading: "Problem",
			content: <p>{caseStudy.problem}</p>,
		},
		{
			id: `${caseStudy.slug}-role`,
			heading: "Role",
			content: <p>{caseStudy.role}</p>,
		},
		{
			id: `${caseStudy.slug}-constraints`,
			heading: "Constraints",
			content: (
				<ul className="marker-list">
					{caseStudy.constraints.map((constraint) => (
						<li key={constraint}>{constraint}</li>
					))}
				</ul>
			),
		},
		{
			id: `${caseStudy.slug}-decisions`,
			heading: "Decisions",
			content: (
				<div className="project-page__decisions-detail">
					<h3 className="facet-label">Key decisions</h3>
					<ul className="marker-list">
						{caseStudy.decisions.map((decision) => (
							<li key={decision}>{decision}</li>
						))}
					</ul>
					<h3 className="facet-label">Product / UX</h3>
					<p>{caseStudy.productAndUx}</p>
					<h3 className="facet-label">Engineering</h3>
					<p>{caseStudy.engineering}</p>
					{aiLead ? (
						<>
							<h3 className="facet-label">AI-assisted workflow</h3>
							<p>{aiLead}</p>
							{caseStudy.aiWorkflowDiagrams?.map((diagram) => (
								<DiagramPanel diagram={diagram} key={diagram.filename} />
							))}
							{aiRest.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</>
					) : null}
				</div>
			),
		},
		{
			id: `${caseStudy.slug}-outcomes`,
			heading: "Outcomes",
			content: (
				<ul className="marker-list">
					{caseStudy.outcomes.map((outcome) => (
						<li key={outcome.statement}>
							{outcome.statement}
							{outcome.detail ? ` ${outcome.detail}` : null}
						</li>
					))}
				</ul>
			),
		},
		{
			id: `${caseStudy.slug}-reflection`,
			heading: "Reflection",
			content: <p>{caseStudy.reflection}</p>,
		},
	];

	if (caseStudy.visuals?.length) {
		sections.push({
			id: `${caseStudy.slug}-gallery`,
			heading: "App screens",
			content: (
				<ProjectGallery
					intro="These screenshots are from the Alfred app. The onboarding screens use Alfred’s earlier WhatNext name."
					visuals={caseStudy.visuals}
				/>
			),
		});
	}

	return (
		<ProjectPageLayout
			areaLabel="Product case study"
			backLink={{
				to: workSectionPath("caseStudies"),
				label: "All case studies",
			}}
			continuation={
				<nav aria-label="Continue exploring" className="project-page__continue">
					<h2
						className="section-label-heading"
						id={`${caseStudy.slug}-continue-exploring-heading`}
					>
						Continue exploring
					</h2>
					<ul className="project-page__continue-links">
						{relatedExperience.map((entry) => (
							<li key={entry.slug}>
								<Link to={`${routes.resume}#${entry.slug}`}>
									Relevant experience: {entry.role} at {entry.company}
								</Link>
							</li>
						))}
						{nextCaseStudy ? (
							<li>
								<Link to={workProjectPath(nextCaseStudy.slug)}>
									Next case study: {nextCaseStudy.title}
								</Link>
							</li>
						) : null}
					</ul>
				</nav>
			}
			hero={caseStudy.hero}
			id={caseStudy.slug}
			sections={sections}
			summary={caseStudy.summary}
			tags={caseStudy.technologies}
			title={caseStudy.title}
		/>
	);
}

export default CaseStudyPage;
