import { Box, Chip, Stack, Typography } from "@mui/material";

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
		<Stack display="flex" flexDirection="column" gap={2} width="100%">
			<Typography variant="body1">Bijeli</Typography>
			<Box display="flex" flexDirection="row" gap={1} alignItems="center">
				{bijeli.map((player) => (
					<Chip label={player} />
				))}
			</Box>
			<Typography variant="body1">Crni </Typography>
			<Box display="flex" flexDirection="row" gap={1} alignItems="center">
				{crni.map((player) => (
					<Chip label={player} />
				))}
			</Box>
		</Stack>
	);
}

export default LandingSquadsCard;
