import type { ReactNode } from "react";
import { useRef, useState } from "react";
import type { Visual } from "../types/evidence.ts";
import ImageLightbox from "./ImageLightbox.tsx";

type ProjectGalleryProps = {
	intro?: ReactNode;
	visuals: readonly Visual[];
};

function ProjectGallery({ intro, visuals }: ProjectGalleryProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const activeVisual = activeIndex === null ? null : visuals[activeIndex];

	function openVisual(index: number, trigger: HTMLButtonElement) {
		triggerRef.current = trigger;
		setActiveIndex(index);
		dialogRef.current?.showModal();
	}

	return (
		<>
			{intro ? <p className="project-page__gallery-intro">{intro}</p> : null}
			<ul className="project-page__visual-grid">
				{visuals.map((visual, index) => (
					<li className="project-page__visual-item" key={visual.src}>
						<figure
							className={`project-page__visual project-page__visual--${visual.layout}`}
						>
							<button
								className="project-page__visual-trigger"
								onClick={(event) => openVisual(index, event.currentTarget)}
								type="button"
							>
								<div className="project-page__visual-image">
									<img
										alt={visual.alt}
										decoding="async"
										loading="lazy"
										src={visual.src}
									/>
								</div>
							</button>
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
			<ImageLightbox
				dialogRef={dialogRef}
				image={activeVisual}
				onClose={() => {
					setActiveIndex(null);
					triggerRef.current?.focus();
				}}
			/>
		</>
	);
}

export default ProjectGallery;
