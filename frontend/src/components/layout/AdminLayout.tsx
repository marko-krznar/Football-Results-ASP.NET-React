import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "../../theme";
import AdminBottomNav from "../AdminBottomNav";
import { Outlet } from "react-router";
import "../../App.scss";

/**
 * AdminLayout: Dedicated layout for /admin routes.
 * Isolates admin work from public navigation and confines AdminBottomNav strictly to admin pages on mobile.
 */
export default function AdminLayout() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{/* Bottom padding ensures content is never hidden behind the fixed admin bottom nav on mobile */}
			<Box sx={{ pb: { xs: 7, md: 0 }, minHeight: "100vh" }}>
				<Outlet />
			</Box>
			<AdminBottomNav />
		</ThemeProvider>
	);
}
