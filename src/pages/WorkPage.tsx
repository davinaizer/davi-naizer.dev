import { Link } from "react-router";
import { workProjectPath, workSectionIds } from "../app/routes.ts";
import { caseStudies, projects } from "../content/evidence-content.ts";
import type { Hero } from "../types/evidence.ts";

type WorkCardProps = {
	slug: string;
	title: string;
	summary: string;
	areaLabel: string;
	tags?: readonly string[];
	hero?: Hero;
};

function WorkCard({
	slug,
	title,
	summary,
	areaLabel,
	tags,
	hero,
}: WorkCardProps) {
	return (
		<li className="work__card">
			<article aria-labelledby={`${slug}-card-heading`}>
				{hero ? (
					<img
						alt={hero.alt}
						className="work__card-image work__card-image--photo"
						loading="lazy"
						src={hero.src}
					/>
				) : (
					<div aria-hidden="true" className="work__card-image">
						{title}
					</div>
				)}
				<div className="work__card-body">
					<p className="work__card-label">{areaLabel}</p>
					<h3 id={`${slug}-card-heading`}>
						<Link className="work__card-link" to={workProjectPath(slug)}>
							{title}
						</Link>
					</h3>
					<p className="work__card-summary">{summary}</p>
					{tags?.length ? (
						<ul aria-label="Technologies" className="tag-list work__card-tags">
							{tags.map((tag) => (
								<li key={tag}>{tag}</li>
							))}
						</ul>
					) : null}
				</div>
			</article>
		</li>
	);
}

function WorkPage() {
	return (
		<section className="work page-section">
			<header className="work__header page-lead">
				<h1>Work</h1>
				<p className="work__intro page-intro">
					A selection of products, tools and workflows I’ve helped build, with
					more context on the problems and decisions behind them.
				</p>
			</header>

			{caseStudies.length > 0 ? (
				<section
					aria-labelledby="case-studies-heading"
					className="work__section"
					id={workSectionIds.caseStudies}
				>
					<h2 id="case-studies-heading">Case studies</h2>
					<p className="work__section-intro">
						Detailed accounts of how I approached a problem, the decisions I
						made, and what I would do differently.
					</p>
					<ul className="work__grid">
						{caseStudies.map((caseStudy) => (
							<WorkCard
								areaLabel="Product case study"
								hero={caseStudy.hero}
								key={caseStudy.slug}
								slug={caseStudy.slug}
								summary={caseStudy.summary}
								tags={caseStudy.technologies}
								title={caseStudy.title}
							/>
						))}
					</ul>
				</section>
			) : null}

			{projects.length > 0 ? (
				<section
					aria-labelledby="experiments-heading"
					className="work__section"
					id={workSectionIds.experiments}
				>
					<h2 id="experiments-heading">Experiments</h2>
					<p className="work__section-intro">
						Prototypes and builds I’ve explored independently, with notes on
						what I tried, observed, and would change.
					</p>
					<ul className="work__grid">
						{projects.map((project) => (
							<WorkCard
								areaLabel="Independent experiment"
								hero={project.hero}
								key={project.slug}
								slug={project.slug}
								summary={project.summary}
								tags={project.technologies}
								title={project.title}
							/>
						))}
					</ul>
				</section>
			) : null}
		</section>
	);
}

export default WorkPage;
