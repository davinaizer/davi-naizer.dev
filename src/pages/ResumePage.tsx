import { routes } from "../app/routes.ts";
import ContextualContinuation from "../components/ContextualContinuation.tsx";
import { professionalContent } from "../content/professional-content.ts";

function ResumePage() {
	const { resume } = professionalContent;
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
				<p className="eyebrow">Professional profile</p>
				<h1>Resume</h1>
				<p className="resume__intro page-intro">
					You can download my current resume for a concise overview of my
					experience, from frontend product development and architecture to
					developer tooling and recent native iOS work.
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

			<ContextualContinuation label="Get in touch" to={routes.contact} />
		</section>
	);
}

export default ResumePage;
