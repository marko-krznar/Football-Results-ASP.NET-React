import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.scss";

import {
	ThemeProvider,
	createTheme,
	Container,
	Typography,
	Box,
	Paper,
	Grid,
	List,
	ListItem,
	ListItemText,
	Divider,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import mockData from "./data/mockData.json";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#90caf9",
		},
		secondary: {
			main: "#f48fb1",
		},
	},
});

function App() {
	const { match } = mockData;

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Container maxWidth="md" sx={{ py: 4 }}>
				<Paper elevation={3} sx={{ p: 4, textAlign: "center", mb: 4 }}>
					<Typography variant="h3" component="h1" gutterBottom>
						Nogometni Rezultati
					</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							gap: 4,
							my: 3,
						}}
					>
						<Typography variant="h4">{match.teams[0].name}</Typography>
						<Typography variant="h2" fontWeight="bold">
							{match.score}
						</Typography>
						<Typography variant="h4">{match.teams[1].name}</Typography>
					</Box>
				</Paper>

				<Grid container spacing={4}>
					{match.teams.map((team, index) => (
						<Grid item xs={12} sm={6} key={index}>
							<Paper elevation={2} sx={{ p: 2 }}>
								<Typography variant="h5" color="primary" gutterBottom>
									{team.name} ({team.players.length} igrača)
								</Typography>
								<Divider sx={{ mb: 1 }} />
								<List dense>
									{team.players.map((player, pIdx) => (
										<ListItem key={pIdx}>
											<ListItemText primary={player} />
										</ListItem>
									))}
								</List>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default App;
