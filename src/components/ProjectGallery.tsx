import type { ReactNode } from "react";
import type { Visual } from "../types/evidence.ts";

type ProjectGalleryProps = {
	intro?: ReactNode;
	visuals: readonly Visual[];
};

function ProjectGallery({ intro, visuals }: ProjectGalleryProps) {
	return (
		<>
			{intro ? <p className="project-page__gallery-intro">{intro}</p> : null}
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

export default ProjectGallery;
