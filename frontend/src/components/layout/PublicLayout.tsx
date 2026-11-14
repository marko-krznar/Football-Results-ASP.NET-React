import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../../theme";
import Navigation from "../Navigation";
import { Outlet } from "react-router";
import "../../App.scss";

/**
 * PublicLayout: Wraps all public consumer-facing routes (/, /matches, /statistics, /teams, /seasons).
 * Contains public Navigation header and Outlet. 100% read-only, free from floating admin bars.
 */
export default function PublicLayout() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Navigation />
			<Outlet />
		</ThemeProvider>
	);
}
