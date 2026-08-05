import { createBrowserRouter } from "react-router";
import App from "./App";
import Landing from "./components/Landing";
import Teams from "./components/teams/Teams";
import Seasons from "./components/seasons/Seasons";
import Admin from "./pages/Admin";
import Matches from "./pages/Matches";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
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
			{
				path: "seasons",
				element: <Seasons />,
			},
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: "admin",
						element: <Admin />,
					},
				],
			},
		],
	},
]);

