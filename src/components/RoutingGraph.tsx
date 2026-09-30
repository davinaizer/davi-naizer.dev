import { useRef, useState } from "react";
import type { WorkflowGraph } from "../types/evidence.ts";
import ImageLightbox from "./ImageLightbox.tsx";

type RoutingGraphProps = {
	graph: WorkflowGraph;
};

function RoutingGraph({ graph }: RoutingGraphProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const [open, setOpen] = useState(false);

	return (
		<div className="routing-graph">
			<figure className="routing-graph__figure">
				<button
					className="project-page__visual-trigger"
					onClick={(event) => {
						triggerRef.current = event.currentTarget;
						setOpen(true);
						dialogRef.current?.showModal();
					}}
					type="button"
				>
					<img
						alt={graph.alt}
						decoding="async"
						height={graph.height}
						loading="lazy"
						src={graph.src}
						width={graph.width}
					/>
				</button>
				<figcaption>{graph.caption}</figcaption>
			</figure>
			<ol
				aria-label="Routing graph as text"
				className="marker-list routing-graph__steps"
			>
				{graph.steps.map((step) => (
					<li key={step}>{step}</li>
				))}
			</ol>
			<ImageLightbox
				dialogRef={dialogRef}
				image={open ? graph : null}
				onClose={() => {
					setOpen(false);
					triggerRef.current?.focus();
				}}
				wide
			/>
		</div>
	);
}

export default RoutingGraph;
