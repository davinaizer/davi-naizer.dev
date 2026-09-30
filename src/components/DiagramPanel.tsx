import type { Diagram } from "../types/evidence.ts";

type DiagramPanelProps = {
	diagram: Diagram;
};

function DiagramPanel({ diagram }: DiagramPanelProps) {
	const { filename, title, nodes, activeIndex, caption } = diagram;

	return (
		<figure className="diagram-panel">
			<div className="diagram-panel__bar">{filename}</div>
			<ol aria-label={title} className="diagram-panel__flow">
				{nodes.map((node, index) => (
					<li
						className={
							index === activeIndex
								? "diagram-panel__node diagram-panel__node--active"
								: "diagram-panel__node"
						}
						key={node.label}
					>
						<span className="diagram-panel__label">{node.label}</span>
						<span className="diagram-panel__detail">{node.detail}</span>
					</li>
				))}
			</ol>
			<figcaption className="diagram-panel__caption">{caption}</figcaption>
		</figure>
	);
}

export default DiagramPanel;
