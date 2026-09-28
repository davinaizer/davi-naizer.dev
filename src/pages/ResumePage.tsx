import { routes } from "../app/routes.ts";
import ContextualContinuation from "../components/ContextualContinuation.tsx";
import ExperienceTimeline, {
	experienceNavItems,
} from "../components/ExperienceTimeline.tsx";
import SectionNav from "../components/SectionNav.tsx";
import { professionalContent } from "../content/professional-content.ts";

function ResumePage() {
	const { resume, experience } = professionalContent;
	const { updatedAt } = resume;
	const formattedDate = updatedAt
		? new Intl.DateTimeFormat("en-GB", {
				day: "numeric",
				month: "long",
				year: "numeric",
				timeZone: "UTC",
			}).format(new Date(`${updatedAt}T00:00:00Z`))
		: null;

	return (
		<section className="resume page-section">
			<header className="resume__header page-lead">
				<h1>Resume</h1>
				<p className="resume__intro page-intro">
					Download my current resume, or read the full career timeline below.
				</p>
			</header>

			{formattedDate ? (
				<p className="resume__metadata">
					Updated <time dateTime={updatedAt}>{formattedDate}</time>
				</p>
			) : null}

			<p className="resume__action">
				<a className="button--ghost" href={resume.url} download>
					{resume.label}
				</a>
			</p>

			<div className="section-layout experience__layout">
				<SectionNav idPrefix="experience" items={experienceNavItems} />
				<div className="section-layout__content">
					<ExperienceTimeline entries={experience} />
				</div>
			</div>

			{/*<section
				aria-labelledby="experience-earlier-career-heading"
				className="experience__earlier-career"
			>
				<header className="experience__earlier-career-header">
					<p className="eyebrow">Earlier career</p>
					<h2 id="experience-earlier-career-heading">
						Starting out in support and web development
					</h2>
					<p className="page-intro">
						I started in computer support, then moved into web and digital
						learning.
					</p>
				</header>
				<ExperienceTimeline entries={earlierCareer} earlier />
			</section>*/}

			<ContextualContinuation label="Explore selected work" to={routes.work} />
		</section>
	);
}

export default ResumePage;
