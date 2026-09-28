import AnalyticsSettings from "../components/AnalyticsSettings.tsx";
import { Icon } from "../components/Icon.tsx";
import { professionalContent } from "../content/professional-content.ts";

function Footer() {
	const footerLinks = [
		...professionalContent.identity.profileLinks,
		professionalContent.contact[0],
	];

	return (
		<footer className="site-footer">
			<div className="site-footer__inner">
				<small>© 2026 Davi Naizer</small>
				<AnalyticsSettings />
				<nav aria-label="Social and contact links">
					<ul className="site-footer__links">
						{footerLinks.map((link) => (
							<li key={link.label}>
								<a aria-label={link.label} href={link.url}>
									<Icon label={link.label} />
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</footer>
	);
}

export default Footer;
