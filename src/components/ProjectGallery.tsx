import type { ReactNode } from "react";
import { useRef, useState } from "react";
import type { Visual } from "../types/evidence.ts";

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
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: closes on a backdrop click; Escape already provides the native keyboard-equivalent close. */}
			<dialog
				aria-label={activeVisual?.title}
				className="project-page__lightbox"
				onClick={(event) => {
					if (event.target === dialogRef.current) {
						dialogRef.current?.close();
					}
				}}
				onClose={() => {
					setActiveIndex(null);
					triggerRef.current?.focus();
				}}
				ref={dialogRef}
			>
				{activeVisual ? (
					<div className="project-page__lightbox-inner">
						<button
							className="project-page__lightbox-close button--secondary"
							onClick={() => dialogRef.current?.close()}
							type="button"
						>
							Close
						</button>
						<img
							alt={activeVisual.alt}
							className="project-page__lightbox-image"
							src={activeVisual.src}
						/>
						<figcaption>
							<strong className="project-page__visual-title">
								{activeVisual.title}
							</strong>
							<p className="project-page__visual-caption">
								{activeVisual.caption}
							</p>
						</figcaption>
					</div>
				) : null}
			</dialog>
		</>
	);
}

export default ProjectGallery;
