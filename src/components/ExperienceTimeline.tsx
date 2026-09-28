import { professionalContent } from "../content/professional-content.ts";
import type { ExperienceEntry } from "../types/professional.ts";

function navLabel(entry: ExperienceEntry): string {
	const startYear = entry.startDate.slice(-4);
	const endYear = entry.endDate?.slice(-4) ?? "Present";
	const years = startYear === endYear ? startYear : `${startYear}–${endYear}`;

	return `${entry.company} · ${years}`;
}

export const experienceNavItems = professionalContent.experience.map(
	(entry) => ({
		id: entry.slug,
		label: navLabel(entry),
	}),
);

export function ExperienceTimeline({
	entries,
	earlier = false,
}: {
	entries: readonly ExperienceEntry[];
	earlier?: boolean;
}) {
	return (
		<ol
			className={`experience__timeline${earlier ? " experience__timeline--earlier" : ""}`}
		>
			{entries.map((entry) => {
				const dates = `${entry.startDate} – ${entry.endDate ?? "Present"}`;
				const roleSummary = entry.responsibilities?.[0];

				return (
					<li
						className="experience__item"
						key={`${entry.company}-${entry.role}-${entry.startDate}`}
					>
						<article className="experience__entry" id={entry.slug}>
							<header className="experience__entry-header">
								<p className="experience__chronology">{dates}</p>
								{earlier ? <h3>{entry.role}</h3> : <h2>{entry.role}</h2>}
								<p className="experience__company">
									<span>{entry.company}</span>
									{entry.location ? ` · ${entry.location}` : null}
								</p>
							</header>

							{roleSummary ? (
								<p className="experience__summary">{roleSummary}</p>
							) : null}

							{entry.technologies?.length ? (
								<section className="experience__detail">
									<h3>Technologies</h3>
									<ul className="tag-list">
										{entry.technologies.map((technology) => (
											<li key={technology}>{technology}</li>
										))}
									</ul>
								</section>
							) : null}

							{entry.contributions?.length ? (
								<section className="experience__detail">
									<h3>Selected contributions</h3>
									<ul className="experience__contributions">
										{entry.contributions.map((contribution) => (
											<li key={contribution}>{contribution}</li>
										))}
									</ul>
								</section>
							) : null}
						</article>
					</li>
				);
			})}
		</ol>
	);
}

export default ExperienceTimeline;
