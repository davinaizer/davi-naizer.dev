import { useEffect, useMemo, useState } from "react";

export type SectionNavItem = {
	id: string;
	label: string;
};

type SectionNavProps = {
	idPrefix: string;
	items: readonly SectionNavItem[];
};

function useActiveSectionId(ids: readonly string[]): string | null {
	const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

	useEffect(() => {
		// Reset synchronously: React Router does not remount this component when
		// only the route's :slug param changes (e.g. a "next project" link), so a
		// stale id from the previous page would otherwise persist until the
		// IntersectionObserver below fires its first, asynchronous callback.
		setActiveId(ids[0] ?? null);

		if (typeof IntersectionObserver === "undefined" || ids.length === 0) {
			return;
		}

		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((element): element is HTMLElement => element !== null);

		if (elements.length === 0) {
			return;
		}

		const visibleIds = new Set<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visibleIds.add(entry.target.id);
					} else {
						visibleIds.delete(entry.target.id);
					}
				}

				const nextActiveId = ids.find((id) => visibleIds.has(id));
				if (nextActiveId) {
					setActiveId(nextActiveId);
				}
			},
			{ rootMargin: "-20% 0px -70% 0px", threshold: 0 },
		);

		for (const element of elements) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	}, [ids]);

	return activeId;
}

function SectionNav({ idPrefix, items }: SectionNavProps) {
	const ids = useMemo(() => items.map((item) => item.id), [items]);
	const activeId = useActiveSectionId(ids);
	const labelId = `${idPrefix}-nav-label`;

	return (
		<nav aria-labelledby={labelId} className="section-nav">
			<p className="section-nav__label" id={labelId}>
				On this page
			</p>
			<ul>
				{items.map((item) => (
					<li key={item.id}>
						<a
							aria-current={item.id === activeId ? "true" : undefined}
							className="section-nav__link"
							href={`#${item.id}`}
						>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default SectionNav;
