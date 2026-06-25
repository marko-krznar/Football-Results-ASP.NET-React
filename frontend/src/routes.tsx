import { createBrowserRouter } from "react-router";
import App from "./App";
import Landing from "./components/Landing";
import Matches from "./components/matches/Matches";
import Teams from "./components/teams/Teams";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: "matches",
				element: <Matches />,
			},
			{
				path: "teams",
				element: <Teams />,
			},
		],
	},
]);
