import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/700.css";
import "./App.scss";

import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "./components/Navigation";
import Landing from "./components/Landing";

const theme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#0E0F0E",
		},
	},
	typography: {
		fontFamily: "Lexend, sans-serif",
		h1: {
			lineHeight: "1",
		},
		h3: {
			color: "#fff",
			fontWeight: "bold",
		},
		subtitle2: {
			fontSize: "2rem",
		},
		subtitle1: {
			fontSize: "6rem",
			lineHeight: "1",
			fontWeight: "bold",
		},
		body1: {
			color: "#ADAAAA",
		},
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: "1rem",
					marginTop: "0 !important", // TODO check if !important can be avoided
					padding: "2rem !important", // TODO check if !important can be avoided
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					display: "flex",
					flexDirection: "column",
					gap: "2rem",
					padding: "0 !important", // TODO check if !important can be avoided
				},
			},
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Navigation />
			<Landing />
		</ThemeProvider>
	);
}

export default App;
