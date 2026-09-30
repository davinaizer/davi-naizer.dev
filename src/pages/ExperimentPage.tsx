import { Link, useParams } from "react-router";
import { routes, workProjectPath, workSectionPath } from "../app/routes.ts";
import ProjectGallery from "../components/ProjectGallery.tsx";
import ProjectPageLayout, {
	type ProjectPageSection,
} from "../components/ProjectPageLayout.tsx";
import { projects } from "../content/evidence-content.ts";
import { professionalContent } from "../content/professional-content.ts";
import NotFoundPage from "./NotFoundPage.tsx";

function ExperimentPage() {
	const { slug } = useParams<{ slug: string }>();
	const currentIndex = projects.findIndex((entry) => entry.slug === slug);
	const project = projects[currentIndex];

	if (!project) {
		return <NotFoundPage />;
	}

	const nextProject = projects[currentIndex + 1];
	const relatedExperience = (project.relatedExperienceSlugs ?? [])
		.map((experienceSlug) =>
			professionalContent.experience.find(
				(entry) => entry.slug === experienceSlug,
			),
		)
		.filter((entry): entry is NonNullable<typeof entry> => entry !== undefined);

	const sections: ProjectPageSection[] = [];

	if (project.context) {
		sections.push({
			id: `${project.slug}-context`,
			heading: "Context",
			content: <p>{project.context}</p>,
		});
	}

	sections.push({
		id: `${project.slug}-purpose`,
		heading: "Purpose",
		content: <p>{project.purpose}</p>,
	});

	if (project.problem) {
		sections.push({
			id: `${project.slug}-problem`,
			heading: "Problem",
			content: <p>{project.problem}</p>,
		});
	}

	if (project.solution) {
		sections.push({
			id: `${project.slug}-solution`,
			heading: "What I built",
			content: <p>{project.solution}</p>,
		});
	}

	if (project.role) {
		sections.push({
			id: `${project.slug}-role`,
			heading: "My contribution",
			content: <p>{project.role}</p>,
		});
	}

	if (project.decisions?.length) {
		sections.push({
			id: `${project.slug}-decisions`,
			heading: "Design and engineering decisions",
			content: (
				<ul className="marker-list">
					{project.decisions.map((decision) => (
						<li key={decision}>{decision}</li>
					))}
				</ul>
			),
		});
	}

	if (project.visuals?.length) {
		sections.push({
			id: `${project.slug}-gallery`,
			heading: project.visualsHeading ?? "Project visuals",
			content: (
				<ProjectGallery
					intro={project.visualsIntro}
					visuals={project.visuals}
				/>
			),
		});
	}

	if (project.outcomes?.length) {
		sections.push({
			id: `${project.slug}-outcomes`,
			heading: "What I observed",
			content: (
				<ul className="marker-list">
					{project.outcomes.map((outcome) => (
						<li key={outcome.statement}>
							{outcome.statement}
							{outcome.detail ? ` ${outcome.detail}` : null}
						</li>
					))}
				</ul>
			),
		});
	}

	if (project.reflection) {
		sections.push({
			id: `${project.slug}-reflection`,
			heading: "Reflection",
			content: <p>{project.reflection}</p>,
		});
	}

	return (
		<ProjectPageLayout
			areaLabel="Independent experiment"
			backLink={{
				to: workSectionPath("experiments"),
				label: "All experiments",
			}}
			continuation={
				<nav aria-label="Continue exploring" className="project-page__continue">
					<h2
						className="section-label-heading"
						id={`${project.slug}-continue-exploring-heading`}
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
						{nextProject ? (
							<li>
								<Link to={workProjectPath(nextProject.slug)}>
									Next experiment: {nextProject.title}
								</Link>
							</li>
						) : null}
					</ul>
				</nav>
			}
			hero={project.hero}
			id={project.slug}
			sections={sections}
			summary={project.summary}
			tags={project.technologies}
			title={project.title}
		/>
	);
}

export default ExperimentPage;
