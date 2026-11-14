import { createBrowserRouter } from "react-router";
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout";
import Landing from "./pages/Landing";
import Teams from "./pages/Teams";
import Admin from "./pages/Admin";
import Matches from "./pages/Matches";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Seasons from "./pages/Seasons";
import Statistics from "./pages/Statistics";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/",
		element: <PublicLayout />,
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
				path: "statistics",
				element: <Statistics />,
			},
			{
				path: "teams",
				element: <Teams />,
			},
			{
				path: "seasons",
				element: <Seasons />,
			},
		],
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: "/admin",
				element: <AdminLayout />,
				children: [
					{
						index: true,
						element: <Admin />,
					},
				],
			},
		],
	},
]);
