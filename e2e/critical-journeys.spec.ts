import { expect, test } from "@playwright/test";

test("renders a durable route when opened directly", async ({ page }) => {
	await page.goto("/work");

	await expect(page).toHaveURL(/\/work$/);
	await expect(
		page.getByRole("heading", { level: 1, name: "Work" }),
	).toBeVisible();
	await expect(
		page
			.getByRole("navigation", { name: "Primary" })
			.getByRole("link", { name: "Work" }),
	).toHaveAttribute("aria-current", "page");
	await page.reload();
	await expect(
		page.getByRole("heading", { level: 1, name: "Work" }),
	).toBeVisible();

	await expect(
		page.getByRole("heading", { level: 2, name: "Case studies" }),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { level: 2, name: "Experiments" }),
	).toBeVisible();
});

test("lays out the Work cards in two columns on desktop and one column at 320 px", async ({
	page,
}) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto("/work");

	const cards = page.locator(".work__card");
	const first = await cards.nth(0).boundingBox();
	const second = await cards.nth(1).boundingBox();
	if (!first || !second) {
		throw new Error("Expected the Work cards to be measurable.");
	}
	expect(second.y).toBe(first.y);
	expect(second.x).toBeGreaterThan(first.x);

	await page.setViewportSize({ width: 320, height: 900 });
	await page.goto("/work");
	const narrowFirst = await cards.nth(0).boundingBox();
	const narrowSecond = await cards.nth(1).boundingBox();
	if (!narrowFirst || !narrowSecond) {
		throw new Error("Expected the narrow Work cards to be measurable.");
	}
	expect(narrowSecond.y).toBeGreaterThan(narrowFirst.y);
	expect(narrowSecond.x).toBe(narrowFirst.x);

	const hasHorizontalOverflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth >
			document.documentElement.clientWidth,
	);
	expect(hasHorizontalOverflow).toBe(false);
});

test("scrolls to the Experiments section when opened with its anchor", async ({
	page,
}) => {
	await page.goto("/work#experiments");

	await expect(
		page.getByRole("heading", { level: 2, name: "Experiments" }),
	).toBeInViewport();
	await expect
		.poll(() => page.evaluate(() => window.scrollY))
		.toBeGreaterThan(0);
});

test("links from the Work index to a case-study and an experiment page", async ({
	page,
}) => {
	await page.goto("/work");
	await page.getByRole("link", { name: "Alfred: What To Do Next" }).click();

	await expect(page).toHaveURL(/\/work\/alfred-what-to-do-next$/);
	await expect(
		page.getByRole("heading", { level: 1, name: "Alfred: What To Do Next" }),
	).toBeVisible();

	await page.goto("/work");
	await page
		.getByRole("link", { name: "Atelier Florae: From Brand to Product" })
		.click();

	await expect(page).toHaveURL(/\/work\/atelier-florae$/);
	await expect(
		page.getByRole("heading", {
			level: 1,
			name: "Atelier Florae: From Brand to Product",
		}),
	).toBeVisible();
});

test("makes each Work card one link with an accent hover border and a visible focus ring", async ({
	page,
}) => {
	await page.goto("/work");

	const card = page.locator(".work__card").first();
	const link = card.getByRole("link", { name: "Alfred: What To Do Next" });
	await expect(card.getByRole("link")).toHaveCount(1);
	await expect(link).toHaveCSS("text-decoration-line", "none");

	const defaultBorder = await card.evaluate(
		(element) => getComputedStyle(element).borderTopColor,
	);
	await card.hover();
	await expect(card).not.toHaveCSS("border-top-color", defaultBorder);

	await page.mouse.move(0, 0);
	await page.keyboard.press("Tab");
	await link.focus();
	await expect(link).toBeFocused();
	await expect(card).not.toHaveCSS("border-top-color", defaultBorder);

	await card.click({ position: { x: 10, y: 10 } });
	await expect(page).toHaveURL(/\/work\/alfred-what-to-do-next$/);
});

test("opens a case-study project page directly and navigates its section nav", async ({
	page,
}) => {
	await page.goto("/work/alfred-what-to-do-next");

	await expect(
		page.getByRole("heading", { level: 1, name: "Alfred: What To Do Next" }),
	).toBeVisible();
	await page.reload();
	await expect(
		page.getByRole("heading", { level: 1, name: "Alfred: What To Do Next" }),
	).toBeVisible();

	const sectionNav = page.getByRole("navigation", { name: "On this page" });
	await sectionNav.getByRole("link", { name: "Reflection" }).click();

	await expect(page).toHaveURL(/#alfred-what-to-do-next-reflection$/);
	await expect(
		page.getByRole("heading", { level: 2, name: "Reflection" }),
	).toBeInViewport();
});

test("keeps the project-page section nav beside the content on desktop and inline on mobile", async ({
	page,
}) => {
	await page.setViewportSize({ width: 1024, height: 900 });
	await page.goto("/work/alfred-what-to-do-next");

	const nav = page.getByRole("navigation", { name: "On this page" });
	const content = page.locator(".project-page__content");
	const desktopNavBox = await nav.boundingBox();
	const desktopContentBox = await content.boundingBox();
	if (!desktopNavBox || !desktopContentBox) {
		throw new Error("Expected project-page layout boxes to be measurable.");
	}
	expect(desktopNavBox.x).toBeGreaterThan(desktopContentBox.x);

	await page.setViewportSize({ width: 320, height: 900 });
	await page.goto("/work/alfred-what-to-do-next");
	const mobileNavBox = await nav.boundingBox();
	const mobileContentBox = await content.boundingBox();
	if (!mobileNavBox || !mobileContentBox) {
		throw new Error(
			"Expected mobile project-page layout boxes to be measurable.",
		);
	}
	expect(mobileNavBox.y).toBeLessThan(mobileContentBox.y);

	const hasHorizontalOverflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth >
			document.documentElement.clientWidth,
	);
	expect(hasHorizontalOverflow).toBe(false);
});

test("continues to the next case study and back to the index from a project page", async ({
	page,
}) => {
	await page.goto("/work/alfred-what-to-do-next");

	const continuation = page.getByRole("navigation", {
		name: "Continue exploring",
	});
	await continuation.getByRole("link", { name: /^Next case study:/ }).click();
	await expect(page).toHaveURL(
		/\/work\/signal-vessel-list-template-administration$/,
	);

	await page.getByRole("link", { name: "All case studies" }).click();
	await expect(page).toHaveURL(/\/work#case-studies$/);
	await expect(
		page.getByRole("heading", { level: 2, name: "Case studies" }),
	).toBeInViewport();
});

test("navigates the Resume timeline by role with a sticky rail on desktop and an inline nav on mobile", async ({
	page,
}) => {
	await page.setViewportSize({ width: 1024, height: 900 });
	await page.goto("/resume");

	const nav = page.getByRole("navigation", { name: "On this page" });
	const link = nav.getByRole("link", { name: "The Signal Group · 2023–2024" });
	const navBox = await nav.boundingBox();
	const timelineBox = await page.locator(".experience__timeline").boundingBox();
	if (!navBox || !timelineBox) {
		throw new Error("Expected Resume layout boxes to be measurable.");
	}
	expect(navBox.x).toBeGreaterThan(timelineBox.x);

	await link.click();
	await expect(page).toHaveURL(
		/#signal-group-senior-frontend-software-engineer-2023-2024$/,
	);
	await expect(
		page.getByRole("heading", {
			level: 2,
			name: "Senior Frontend Software Engineer",
		}),
	).toBeInViewport();
	await expect(link).toHaveAttribute("aria-current", "true");

	await page.setViewportSize({ width: 320, height: 900 });
	await page.goto("/resume");
	const mobileNavBox = await nav.boundingBox();
	const mobileTimelineBox = await page
		.locator(".experience__timeline")
		.boundingBox();
	if (!mobileNavBox || !mobileTimelineBox) {
		throw new Error("Expected mobile Resume layout boxes to be measurable.");
	}
	expect(mobileNavBox.y).toBeLessThan(mobileTimelineBox.y);
	expect(
		await page.evaluate(
			() =>
				document.documentElement.scrollWidth >
				document.documentElement.clientWidth,
		),
	).toBe(false);
});

test("resets the section-nav active state when moving to the next case study", async ({
	page,
}) => {
	await page.goto("/work/alfred-what-to-do-next");

	const sectionNav = page.getByRole("navigation", { name: "On this page" });
	const contextLink = sectionNav.getByRole("link", { name: "Context" });
	await expect(contextLink).toHaveAttribute("aria-current", "true");

	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await expect(contextLink).not.toHaveAttribute("aria-current", "true");

	await page
		.getByRole("navigation", { name: "Continue exploring" })
		.getByRole("link", { name: /^Next case study:/ })
		.click();

	await expect(page).toHaveURL(
		/\/work\/signal-vessel-list-template-administration$/,
	);
	await expect(
		sectionNav.getByRole("link", { name: "Context" }),
	).toHaveAttribute("aria-current", "true");
});

test("opens an experiment project page directly and navigates its section nav", async ({
	page,
}) => {
	await page.goto("/work/atelier-florae");

	await expect(
		page.getByRole("heading", {
			level: 1,
			name: "Atelier Florae: From Brand to Product",
		}),
	).toBeVisible();
	await page.reload();
	await expect(
		page.getByRole("heading", {
			level: 1,
			name: "Atelier Florae: From Brand to Product",
		}),
	).toBeVisible();

	const sectionNav = page.getByRole("navigation", { name: "On this page" });
	await sectionNav.getByRole("link", { name: "Reflection" }).click();

	await expect(page).toHaveURL(/#atelier-florae-reflection$/);
	await expect(
		page.getByRole("heading", { level: 2, name: "Reflection" }),
	).toBeInViewport();
});

test("continues to the next experiment and back to the index from a project page", async ({
	page,
}) => {
	await page.goto("/work/atelier-florae");

	const continuation = page.getByRole("navigation", {
		name: "Continue exploring",
	});
	await continuation.getByRole("link", { name: /^Next experiment:/ }).click();
	await expect(page).toHaveURL(/\/work\/uv-insect-trap$/);

	await page.getByRole("link", { name: "All experiments" }).click();
	await expect(page).toHaveURL(/\/work#experiments$/);
	await expect(
		page.getByRole("heading", { level: 2, name: "Experiments" }),
	).toBeInViewport();
});

test("navigates through the shell and Work routes", async ({ page }) => {
	await page.goto("/");
	await page
		.getByRole("link", { name: "Explore my independent experiments" })
		.click();
	await expect(page).toHaveURL(/\/work#experiments$/);
	await expect(
		page.getByRole("heading", { level: 2, name: "Experiments" }),
	).toBeInViewport();

	const primaryNavigation = page.getByRole("navigation", { name: "Primary" });
	await page.goto("/");

	await primaryNavigation.getByRole("link", { name: "Resume" }).click();
	await expect(page).toHaveURL(/\/resume$/);
	await expect(
		page.getByRole("heading", { level: 1, name: "Resume" }),
	).toBeVisible();

	await primaryNavigation.getByRole("link", { name: "Work" }).click();
	await expect(page).toHaveURL(/\/work$/);
	await expect(
		page.getByRole("heading", { level: 1, name: "Work" }),
	).toBeVisible();

	await expect(
		page.getByRole("heading", { level: 3, name: "UV Insect Trap" }),
	).toBeVisible();
	await page.reload();
	await expect(
		page.getByRole("heading", { level: 3, name: "UV Insect Trap" }),
	).toBeVisible();

	await page.getByRole("link", { name: "UV Insect Trap" }).click();
	await expect(page).toHaveURL(/\/work\/uv-insect-trap$/);
	await expect(
		page.getByRole("heading", { level: 1, name: "UV Insect Trap" }),
	).toBeVisible();

	await page.setViewportSize({ width: 320, height: 900 });
	const experimentVisuals = page.getByRole("region", {
		name: "CAD design views",
	});
	await expect(experimentVisuals).toBeVisible();
	await expect(experimentVisuals.getByRole("img")).toHaveCount(2);
	await expect(experimentVisuals.getByRole("img").first()).toBeVisible();
	const hasExperimentOverflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth >
			document.documentElement.clientWidth,
	);
	expect(hasExperimentOverflow).toBe(false);

	await primaryNavigation.getByRole("link", { name: "Work" }).click();
	await expect(page).toHaveURL(/\/work$/);

	await primaryNavigation.getByRole("link", { name: "Resume" }).click();
	await expect(page).toHaveURL(/\/resume$/);
	await expect(page.getByRole("heading", { name: "Resume" })).toBeVisible();

	await page.getByRole("banner").getByRole("link", { name: "Contact" }).click();
	await expect(page).toHaveURL(/\/contact$/);
	await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
});

test("opens the gallery lightbox from a thumbnail and closes it with Escape, returning focus", async ({
	page,
}) => {
	await page.goto("/work/uv-insect-trap");

	const gallery = page.getByRole("region", { name: "CAD design views" });
	const thumbnail = gallery.getByRole("button", { name: /Angled CAD view/ });
	await thumbnail.click();

	const dialog = page.getByRole("dialog", { name: "Enclosure and grille" });
	await expect(dialog).toBeVisible();
	await expect(
		dialog.getByRole("img", { name: /Angled CAD view/ }),
	).toBeVisible();

	await page.keyboard.press("Escape");
	await expect(dialog).not.toBeVisible();
	await expect(thumbnail).toBeFocused();
});

test("closes the gallery lightbox on a backdrop click, returning focus to the thumbnail", async ({
	page,
}) => {
	await page.goto("/work/uv-insect-trap");

	const gallery = page.getByRole("region", { name: "CAD design views" });
	const thumbnail = gallery.getByRole("button", { name: /Angled CAD view/ });
	await thumbnail.click();

	const dialog = page.getByRole("dialog", { name: "Enclosure and grille" });
	await expect(dialog).toBeVisible();

	await page.mouse.click(5, 5);
	await expect(dialog).not.toBeVisible();
	await expect(thumbnail).toBeFocused();
});

test("opens the gallery lightbox with the keyboard and closes it with the close button", async ({
	page,
}) => {
	await page.goto("/work/uv-insect-trap");

	const gallery = page.getByRole("region", { name: "CAD design views" });
	const thumbnail = gallery.getByRole("button", { name: /Angled CAD view/ });
	await thumbnail.focus();
	await page.keyboard.press("Enter");

	const dialog = page.getByRole("dialog", { name: "Enclosure and grille" });
	await expect(dialog).toBeVisible();

	await dialog.getByRole("button", { name: "Close" }).click();
	await expect(dialog).not.toBeVisible();
	await expect(thumbnail).toBeFocused();
});

test("restores the top of the destination after navigating from the bottom", async ({
	page,
}) => {
	await page.goto("/resume");
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await expect
		.poll(() => page.evaluate(() => window.scrollY))
		.toBeGreaterThan(0);

	await page
		.getByRole("navigation", { name: "Continue exploring" })
		.getByRole("link", { name: "Explore selected work" })
		.click();

	await expect(page).toHaveURL(/\/work$/);
	await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("continues between long-form routes", async ({ page }) => {
	const continuations = [
		{
			from: "/resume",
			label: "Explore selected work",
			to: /\/work$/,
		},
	] as const;

	for (const { from, label, to } of continuations) {
		await page.goto(from);
		await page
			.getByRole("navigation", { name: "Continue exploring" })
			.getByRole("link", { name: label })
			.click();
		await expect(page).toHaveURL(to);
	}
});

test("keeps contextual continuations usable at a narrow viewport", async ({
	page,
}) => {
	const continuations = [
		{ path: "/resume", label: "Explore selected work" },
	] as const;

	await page.setViewportSize({ width: 320, height: 900 });

	for (const { path, label } of continuations) {
		await page.goto(path);

		const continuation = page.getByRole("navigation", {
			name: "Continue exploring",
		});
		await expect(continuation).toBeVisible();
		await expect(continuation.getByRole("link", { name: label })).toBeVisible();

		const hasHorizontalOverflow = await page.evaluate(
			() =>
				document.documentElement.scrollWidth >
				document.documentElement.clientWidth,
		);
		expect(hasHorizontalOverflow).toBe(false);
	}
});

test("does not duplicate list separators before continuations", async ({
	page,
}) => {
	for (const path of ["/resume"]) {
		await page.goto(path);

		await expect(
			page.getByRole("navigation", { name: "Continue exploring" }),
		).toHaveCSS("border-top-width", "0px");
	}
});

test("supports keyboard traversal through the shell navigation", async ({
	page,
}) => {
	await page.goto("/");
	await page.evaluate(() => document.body.focus());

	const header = page.getByRole("banner");
	const links = [
		header.getByRole("link", { name: "Davi Naizer" }),
		header
			.getByRole("navigation", { name: "Primary" })
			.getByRole("link", { name: "Work" }),
		header
			.getByRole("navigation", { name: "Primary" })
			.getByRole("link", { name: "Resume" }),
		header.getByRole("link", { name: "Contact" }),
	];

	for (const link of links) {
		await page.keyboard.press("Tab");
		await expect(link).toBeFocused();
	}
});

test("keeps shell links visible without horizontal overflow at a narrow viewport", async ({
	page,
}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/");

	const header = page.getByRole("banner");
	for (const name of ["Davi Naizer", "Work", "Resume", "Contact"]) {
		await expect(header.getByRole("link", { name })).toBeVisible();
	}

	const hasHorizontalOverflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth >
			document.documentElement.clientWidth,
	);
	expect(hasHorizontalOverflow).toBe(false);
});

test("opens analytics settings only when requested and remains usable on mobile", async ({
	page,
}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/");

	const settingsButton = page.getByRole("button", {
		name: "Privacy & analytics",
	});
	const dialog = page.getByRole("dialog", { name: "Analytics settings" });

	await expect(settingsButton).toBeVisible();
	await expect(dialog).not.toBeVisible();
	await settingsButton.click();
	await expect(dialog).toBeVisible();
	await expect(dialog.getByRole("checkbox")).toBeChecked();

	const hasHorizontalOverflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth >
			document.documentElement.clientWidth,
	);
	expect(hasHorizontalOverflow).toBe(false);

	await dialog.getByRole("button", { name: "Close" }).click();
	await expect(dialog).not.toBeVisible();
});

test("persists an analytics opt-out and reflects it when settings reopen", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Privacy & analytics" }).click();

	const dialog = page.getByRole("dialog", { name: "Analytics settings" });
	await dialog.getByRole("checkbox").uncheck();
	await dialog.getByRole("button", { name: "Save preferences" }).click();

	await expect
		.poll(() =>
			page.evaluate(() =>
				localStorage.getItem("professional-site.analytics-opt-out"),
			),
		)
		.toBe("true");

	await page.getByRole("button", { name: "Privacy & analytics" }).click();
	await expect(
		page
			.getByRole("dialog", { name: "Analytics settings" })
			.getByRole("checkbox"),
	).not.toBeChecked();
});

test("recovers from an unknown route", async ({ page }) => {
	await page.goto("/unknown-route");

	await expect(
		page.getByRole("heading", { name: "Page Not Found" }),
	).toBeVisible();
	await expect(
		page.getByText("The page you requested does not exist or may have moved."),
	).toBeVisible();

	await page.getByRole("link", { name: "Return home" }).click();
	await expect(page).toHaveURL(/\/$/);
	await expect(
		page.getByRole("heading", { name: "Davi Naizer" }),
	).toBeVisible();
});

test("does not expose removed routes", async ({ page }) => {
	for (const path of [
		"/engineering",
		"/experience",
		"/summary",
		"/case-studies",
		"/projects",
		"/case-studies/alfred-what-to-do-next",
		"/projects/atelier-florae",
	]) {
		await page.goto(path);
		await expect(
			page.getByRole("heading", { name: "Page Not Found" }),
		).toBeVisible();
	}
});
