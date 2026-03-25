import { Box, Stack, Typography } from "@mui/material";

function LandingSquadsCard() {
	const bijeli = [
		"Mališa",
		"Marko",
		"Ante",
		"Dino",
		"Bebić",
		"Rotim",
		"Juka",
	];
	const crni = [
		"Tomo",
		"Vukovarac",
		"Bruno",
		"Filip",
		"Mate",
		"Perić",
		"Miro",
	];
	return (
		<Stack>
			<Box display="flex" flexDirection="row" gap={1} alignItems="center">
				<Typography variant="body1">Bijeli: </Typography>
				{bijeli.map((player) => player + ", ")}
			</Box>
			<Box display="flex" flexDirection="row" gap={1} alignItems="center">
				<Typography variant="body1">Crni: </Typography>
				{crni.map((player) => player + ", ")}
			</Box>
		</Stack>
	);
}

export default LandingSquadsCard;
