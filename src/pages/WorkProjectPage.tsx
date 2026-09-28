import { useParams } from "react-router";
import { caseStudies, projects } from "../content/evidence-content.ts";
import CaseStudyPage from "./CaseStudyPage.tsx";
import ExperimentPage from "./ExperimentPage.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

function WorkProjectPage() {
	const { slug } = useParams<{ slug: string }>();

	if (caseStudies.some((entry) => entry.slug === slug)) {
		return <CaseStudyPage />;
	}

	if (projects.some((entry) => entry.slug === slug)) {
		return <ExperimentPage />;
	}

	return <NotFoundPage />;
}

export default WorkProjectPage;
