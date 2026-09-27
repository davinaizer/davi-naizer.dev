import { Link } from "react-router";
import { routes, workSectionPath } from "../app/routes.ts";
import { professionalContent } from "../content/professional-content.ts";

function HomePage() {
	const { identity, summary, experience, resume } = professionalContent;
	const currentExperience = experience[0];
	const currentRoleSummary = currentExperience.responsibilities?.[0];

	return (
		<section className="home page-section">
			<div className="home__hero page-lead">
				<p className="eyebrow"></p>
				<h1 className="home__identity">{identity.name}</h1>
				<p className="home__headline">{identity.headline}</p>
				<p className="home__summary page-intro">{summary.homeExcerpt}</p>
				<nav
					aria-label="Explore core professional areas"
					className="home__actions"
				>
					<ul>
						<li className="home__action-primary">
							<Link className="button--primary" to={routes.experience}>
								Explore experience
							</Link>
						</li>
						<li>
							<a className="button--ghost" download href={resume.url}>
								{resume.label}
							</a>
						</li>
					</ul>
				</nav>
			</div>

			<section
				aria-labelledby="current-role-heading"
				className="home__highlight"
			>
				<p className="eyebrow">Current role</p>
				<p className="home__role-date">
					{currentExperience.startDate} –{" "}
					{currentExperience.endDate ?? "Present"}
				</p>
				<h2 id="current-role-heading">{currentExperience.role}</h2>
				<p>{currentExperience.company}</p>
				{currentRoleSummary ? (
					<p className="home__role-summary">{currentRoleSummary}</p>
				) : null}
				<Link to={routes.experience}>View career timeline</Link>
			</section>

			<section aria-labelledby="about-heading" className="home__about">
				<p className="eyebrow">A little about me</p>
				<h2 id="about-heading">Beyond the work</h2>
				<p>{summary.personalNote}</p>
				<Link to={workSectionPath("experiments")}>
					Explore my independent experiments
				</Link>
			</section>
		</section>
	);
}

export default HomePage;
