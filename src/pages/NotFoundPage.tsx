import { Link } from "react-router";
import { routes } from "../app/routes";

function NotFoundPage() {
	return (
		<section className="not-found page-section">
			<header className="not-found__header page-lead">
				<h1>Page Not Found</h1>
				<p className="not-found__intro page-intro">
					The page you requested does not exist or may have moved.
				</p>
			</header>

			<p className="not-found__action">
				<Link to={routes.home}>Return home</Link>
			</p>
		</section>
	);
}

export default NotFoundPage;
