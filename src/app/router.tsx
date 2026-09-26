import { createBrowserRouter } from "react-router";
import CaseStudiesPage from "../pages/CaseStudiesPage.tsx";
import CaseStudyPage from "../pages/CaseStudyPage.tsx";
import ContactPage from "../pages/ContactPage.tsx";
import ExperiencePage from "../pages/ExperiencePage.tsx";
import ExperimentsPage from "../pages/ExperimentsPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import ResumePage from "../pages/ResumePage.tsx";
import WorkPage from "../pages/WorkPage.tsx";
import App from "./App.tsx";
import { routes } from "./routes.ts";

export default createBrowserRouter([
	{
		Component: App,
		children: [
			{ path: routes.home, Component: HomePage, index: true },
			{ path: routes.experience, Component: ExperiencePage },
			{ path: routes.work, Component: WorkPage },
			{ path: routes.experiments, Component: ExperimentsPage },
			{ path: routes.caseStudies, Component: CaseStudiesPage },
			{ path: routes.caseStudy, Component: CaseStudyPage },
			{ path: routes.resume, Component: ResumePage },
			{ path: routes.contact, Component: ContactPage },
			{ path: "*", Component: NotFoundPage },
		],
	},
]);
