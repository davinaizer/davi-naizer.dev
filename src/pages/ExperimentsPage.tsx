import { Link } from "react-router";
import { experimentPath, routes } from "../app/routes.ts";
import ContextualContinuation from "../components/ContextualContinuation.tsx";
import { projects as projectContent } from "../content/evidence-content.ts";
import type { Project } from "../types/evidence.ts";

type ExperimentsPageProps = {
	projects?: readonly Project[];
};

function ExperimentsPage({ projects = projectContent }: ExperimentsPageProps) {
	return (
		<section className="experiments page-section">
			<header className="experiments__header page-lead">
				<p className="eyebrow">Independent work</p>
				<h1>Experiments</h1>
				<p className="experiments__intro page-intro">
					Prototypes and builds I’ve explored independently. These are personal
					experiments, not paid case studies; each records what I tried,
					observed, and would change.
				</p>
			</header>

			{projects.length ? (
				<ul aria-label="Experiments" className="experiments__grid">
					{projects.map((project) => (
						<li className="experiments__card" key={project.slug}>
							<article aria-labelledby={`${project.slug}-heading`}>
								<p className="experiments__card-label">
									Independent experiment
								</p>
								<h2 id={`${project.slug}-heading`}>
									<Link
										className="experiments__card-link"
										to={experimentPath(project.slug)}
									>
										{project.title}
									</Link>
								</h2>
								<p className="experiments__card-summary">{project.summary}</p>
								{project.technologies?.length ? (
									<ul
										aria-label="Technologies"
										className="experiments__card-tags"
									>
										{project.technologies.map((technology) => (
											<li key={technology}>{technology}</li>
										))}
									</ul>
								) : null}
							</article>
						</li>
					))}
				</ul>
			) : null}

			<ContextualContinuation
				label="Read the case studies"
				to={routes.caseStudies}
			/>
		</section>
	);
}

export default ExperimentsPage;
