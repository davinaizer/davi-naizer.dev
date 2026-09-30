import type { RefObject } from "react";

export type LightboxImage = {
	src: string;
	alt: string;
	title: string;
	caption: string;
};

type ImageLightboxProps = {
	image: LightboxImage | null;
	dialogRef: RefObject<HTMLDialogElement | null>;
	onClose: () => void;
	/** Lets a large, text-heavy image use most of the viewport width. */
	wide?: boolean;
};

function ImageLightbox({
	image,
	dialogRef,
	onClose,
	wide = false,
}: ImageLightboxProps) {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: closes on a backdrop click; Escape already provides the native keyboard-equivalent close.
		<dialog
			aria-label={image?.title}
			className={
				wide
					? "project-page__lightbox project-page__lightbox--wide"
					: "project-page__lightbox"
			}
			onClick={(event) => {
				if (event.target === dialogRef.current) {
					dialogRef.current?.close();
				}
			}}
			onClose={onClose}
			ref={dialogRef}
		>
			{image ? (
				<div className="project-page__lightbox-inner">
					<button
						className="project-page__lightbox-close button--primary"
						onClick={() => dialogRef.current?.close()}
						type="button"
					>
						Close
					</button>
					<img
						alt={image.alt}
						className="project-page__lightbox-image"
						src={image.src}
					/>
					<figcaption>
						<strong className="project-page__visual-title">
							{image.title}
						</strong>
						<p className="project-page__visual-caption">{image.caption}</p>
					</figcaption>
				</div>
			) : null}
		</dialog>
	);
}

export default ImageLightbox;
