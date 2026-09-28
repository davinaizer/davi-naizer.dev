import { Link, NavLink } from "react-router";
import { routes } from "../app/routes";

function PrimaryNavigation() {
	return (
		<header className="site-header">
			<div className="site-header__inner">
				<Link className="site-header__identity" to={routes.home}>
					Davi Naizer
				</Link>

				<nav className="primary-navigation" aria-label="Primary">
					<ul>
						<li>
							<NavLink to={routes.work}>Work</NavLink>
						</li>
						<li>
							<NavLink to={routes.resume}>Resume</NavLink>
						</li>
					</ul>
				</nav>

				<Link
					className="site-header__contact button--ghost"
					to={routes.contact}
				>
					Contact
				</Link>
			</div>
		</header>
	);
}

export default PrimaryNavigation;
