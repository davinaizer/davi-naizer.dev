import { Link } from "react-router";

type ContextualContinuationProps = {
	label: string;
	to: string;
};

function ContextualContinuation({ label, to }: ContextualContinuationProps) {
	return (
		<nav aria-label="Continue exploring" className="contextual-continuation">
			<Link className="button--text" to={to}>
				{label}
			</Link>
		</nav>
	);
}

export default ContextualContinuation;
