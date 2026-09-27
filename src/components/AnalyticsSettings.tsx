import { type FormEvent, useRef, useState } from "react";
import {
	isAnalyticsOptedOut,
	saveAnalyticsOptOut,
} from "../app/cloudflare-analytics.ts";

function AnalyticsSettings() {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [analyticsEnabled, setAnalyticsEnabled] = useState(
		() => !isAnalyticsOptedOut(),
	);
	const [saveError, setSaveError] = useState("");

	function savePreference(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!saveAnalyticsOptOut(!analyticsEnabled)) {
			setSaveError(
				"Your preference could not be saved. The current analytics setting has not changed.",
			);
			return;
		}

		window.location.reload();
	}

	return (
		<>
			<button
				aria-controls="analytics-settings-dialog"
				aria-haspopup="dialog"
				className="site-footer__text-link"
				onClick={() => dialogRef.current?.showModal()}
				type="button"
			>
				Privacy &amp; analytics
			</button>
			<dialog
				aria-labelledby="analytics-settings-title"
				aria-modal="true"
				className="analytics-settings__dialog"
				id="analytics-settings-dialog"
				ref={dialogRef}
			>
				<form className="analytics-settings__form" onSubmit={savePreference}>
					<h2 id="analytics-settings-title">Analytics settings</h2>
					<p>
						Cloudflare Web Analytics provides aggregate reports about page
						visits, referrers, country-level visits, device and browser context,
						and site performance to help me improve the site. Cloudflare states
						that it does not collect visitors’ personal data.
					</p>
					<p>
						Cloudflare reports that unsampled beacon data is retained for seven
						days, then aggregated; analytics data is available for up to six
						months.
					</p>
					<label className="analytics-settings__choice">
						<input
							checked={analyticsEnabled}
							onChange={(event) => {
								setAnalyticsEnabled(event.currentTarget.checked);
								setSaveError("");
							}}
							type="checkbox"
						/>
						<span>Allow Cloudflare analytics on this site</span>
					</label>
					<p className="analytics-settings__note">
						Your choice is saved in this browser. Changes take effect after the
						page reloads; you can change this setting at any time.
					</p>
					{saveError ? (
						<p aria-live="polite" className="analytics-settings__error">
							{saveError}
						</p>
					) : null}
					<div className="analytics-settings__actions">
						<button
							className="analytics-settings__button"
							onClick={() => dialogRef.current?.close()}
							type="button"
						>
							Close
						</button>
						<button
							className="analytics-settings__button button--primary"
							type="submit"
						>
							Save preferences
						</button>
					</div>
				</form>
			</dialog>
		</>
	);
}

export default AnalyticsSettings;
