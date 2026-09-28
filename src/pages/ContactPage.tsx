import { professionalContent } from "../content/professional-content.ts";

function ContactPage() {
	const { contact } = professionalContent;

	return (
		<section className="contact page-section">
			<div className="contact__layout">
				<header className="contact__header page-lead">
					<h1>Contact</h1>
					<p className="contact__intro">
						If you’d like to talk about an opportunity, a project, or simply
						compare notes, feel free to email me or find me on LinkedIn.
					</p>
				</header>

				<ul aria-label="Professional contact links" className="contact__links">
					{contact.map((link) => (
						<li className="contact__link" key={link.label}>
							<div className="contact__content">
								<p className="contact__metadata">{link.category}</p>
								<a aria-label={link.actionLabel} href={link.url}>
									<span className="contact__title">{link.actionLabel}</span>
									<span aria-hidden="true" className="contact__action">
										{link.label === "Email" ? "Open email" : "View profile"}
									</span>
								</a>
								{link.description ? (
									<p className="contact__description">{link.description}</p>
								) : null}
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

export default ContactPage;
