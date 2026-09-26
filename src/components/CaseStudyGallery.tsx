import type { CaseStudy } from "../types/evidence.ts";

function CaseStudyGallery({
	visuals,
}: {
	visuals: NonNullable<CaseStudy["visuals"]>;
}) {
	return (
		<>
			<p className="project-page__gallery-intro">
				These screenshots are from the Alfred app. The onboarding screens use
				Alfred’s earlier WhatNext name.
			</p>
			<ul className="project-page__visual-grid">
				{visuals.map((visual) => (
					<li
						className={`project-page__visual-item project-page__visual-item--${visual.layout}`}
						key={visual.src}
					>
						<figure
							className={`project-page__visual project-page__visual--${visual.layout}`}
						>
							<div className="project-page__visual-image">
								<img
									alt={visual.alt}
									decoding="async"
									loading="lazy"
									src={visual.src}
								/>
							</div>
							<figcaption>
								<strong className="project-page__visual-title">
									{visual.title}
								</strong>
								<p className="project-page__visual-caption">{visual.caption}</p>
							</figcaption>
						</figure>
					</li>
				))}
			</ul>
		</>
	);
}

export default CaseStudyGallery;
