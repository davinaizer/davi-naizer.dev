import { Link } from "react-router";
import { caseStudyPath, routes } from "../app/routes.ts";
import ContextualContinuation from "../components/ContextualContinuation.tsx";
import { caseStudies as caseStudyContent } from "../content/evidence-content.ts";
import type { CaseStudy } from "../types/evidence.ts";

type CaseStudiesPageProps = {
	caseStudies?: readonly CaseStudy[];
};

function CaseStudiesPage({
	caseStudies = caseStudyContent,
}: CaseStudiesPageProps) {
	return (
		<section className="case-studies page-section">
			<header className="case-studies__header page-lead">
				<p className="eyebrow">Selected work</p>
				<h1>Case Studies</h1>
				<p className="case-studies__intro page-intro">
					A more detailed look at how I approached a problem, the decisions I
					made, and what I would do differently.
				</p>
			</header>

			{caseStudies.length ? (
				<ul aria-label="Case studies" className="case-studies__grid">
					{caseStudies.map((caseStudy) => (
						<li className="case-studies__card" key={caseStudy.slug}>
							<article aria-labelledby={`${caseStudy.slug}-heading`}>
								<p className="case-studies__card-label">Product case study</p>
								<h2 id={`${caseStudy.slug}-heading`}>
									<Link
										className="case-studies__card-link"
										to={caseStudyPath(caseStudy.slug)}
									>
										{caseStudy.title}
									</Link>
								</h2>
								<p className="case-studies__card-summary">
									{caseStudy.summary}
								</p>
								{caseStudy.technologies?.length ? (
									<ul
										aria-label="Technologies"
										className="case-studies__card-tags"
									>
										{caseStudy.technologies.map((technology) => (
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
				label="View the career context"
				to={routes.experience}
			/>
		</section>
	);
}

export default CaseStudiesPage;
