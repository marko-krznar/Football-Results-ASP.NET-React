import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/700.css";
import "./App.scss";

import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "./components/Navigation";
import AdminBottomNav from "./components/AdminBottomNav";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { theme } from "./theme";


function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Navigation />
			{/* Bottom padding ensures content is never hidden behind the fixed admin bottom nav on mobile */}
			<Box sx={{ pb: { xs: 7, md: 0 } }}>
				<Outlet />
			</Box>
			<AdminBottomNav />
		</ThemeProvider>
	);
}

export default App;
