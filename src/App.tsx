/* eslint-disable @typescript-eslint/no-explicit-any */
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.scss";

import {
	Avatar,
	Divider,
	Stack,
	ThemeProvider,
	Typography,
	createTheme,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import mockPlayers from "./data/mockPlayers.json";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	const crni = mockPlayers.players.filter(
		(player: any) => player.team === "crni"
	);
	const bijeli = mockPlayers.players.filter(
		(player: any) => player.team === "bijeli"
	);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Stack spacing={4}>
				<Typography variant="h1" align="center">
					Ukupni rezultat
				</Typography>
				<Typography variant="h2" align="center">
					ŠD Hotanj Velesajam
				</Typography>
				<Typography variant="h3" align="center">
					Termin ponedjeljkom u 19:00h
				</Typography>
				<Typography variant="body2" align="center">
					Crni : Bijeli
				</Typography>
				<Typography variant="body2" align="center">
					2:5
				</Typography>
			</Stack>
			<Stack
				spacing={4}
				direction={"row"}
				divider={<Divider orientation="vertical" flexItem />}
				justifyContent={"center"}
			>
				<Stack spacing={2} divider={<Divider />}>
					<Typography variant="body2" align="center">
						Crni
					</Typography>
					<>
						{crni.map((player: any) => (
							<Stack
								spacing={2}
								direction={"row"}
								alignItems={"center"}
								minWidth={200}
							>
								<Avatar>{player.name[0]}</Avatar>
								<Typography
									variant="body1"
									align="center"
									key={player.id}
								>
									{player.name}
								</Typography>
							</Stack>
						))}
					</>
				</Stack>
				<Stack spacing={2} divider={<Divider />}>
					<Typography variant="body2" align="center">
						Bijeli
					</Typography>
					<>
						{bijeli.map((player: any) => (
							<Stack
								spacing={2}
								direction={"row"}
								alignItems={"center"}
								minWidth={200}
							>
								<Avatar>{player.name[0]}</Avatar>

								<Typography
									variant="body1"
									align="center"
									key={player.id}
								>
									{player.name}
								</Typography>
							</Stack>
						))}
					</>
				</Stack>
			</Stack>
			<Typography variant="body2" align="center">
				Termin 10.03.2026 19:00h
			</Typography>
			<Stack spacing={4}>
				<Typography variant="body2" align="center">
					Crni : Bijeli
				</Typography>
				<Typography variant="body2" align="center">
					4:6
				</Typography>
				<Typography variant="body2" align="center">
					5:5 - ne računa se jer nije završeno
				</Typography>
			</Stack>
		</ThemeProvider>
	);
}

export default App;
