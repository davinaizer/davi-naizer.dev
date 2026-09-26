import { createBrowserRouter } from "react-router";
import ContactPage from "../pages/ContactPage.tsx";
import ExperiencePage from "../pages/ExperiencePage.tsx";
import HomePage from "../pages/HomePage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import ResumePage from "../pages/ResumePage.tsx";
import WorkPage from "../pages/WorkPage.tsx";
import WorkProjectPage from "../pages/WorkProjectPage.tsx";
import App from "./App.tsx";
import { routes } from "./routes.ts";

export default createBrowserRouter([
	{
		Component: App,
		children: [
			{ path: routes.home, Component: HomePage, index: true },
			{ path: routes.experience, Component: ExperiencePage },
			{ path: routes.work, Component: WorkPage },
			{ path: routes.workProject, Component: WorkProjectPage },
			{ path: routes.resume, Component: ResumePage },
			{ path: routes.contact, Component: ContactPage },
			{ path: "*", Component: NotFoundPage },
		],
	},
]);
