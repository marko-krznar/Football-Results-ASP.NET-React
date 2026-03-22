import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.scss";

import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "./components/Navigation";
import Landing from "./components/Landing";

const theme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		subtitle2: {
			fontSize: "2rem",
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
