import { Box, Card, Stack, Typography } from "@mui/material";

export default function Landing() {
	return (
		<Stack spacing={4} alignItems="center">
			{/* <Typography variant="h2" align="center">
				ŠD Hotanj Velesajam
			</Typography>
			<Typography variant="h3" align="center">
				Termin ponedjeljkom u 19:00h
			</Typography> */}
			<Card variant="elevation" sx={{ padding: 4 }}>
				<Typography variant="subtitle1" align="center">
					Ukupni rezultat
				</Typography>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={2}
				>
					<Box>
						<Typography variant="subtitle2" align="center">
							3
						</Typography>
						<Typography variant="body2" align="center">
							Crni
						</Typography>
					</Box>
					<Typography variant="subtitle2" align="center">
						-
					</Typography>
					<Box>
						<Typography variant="subtitle2" align="center">
							6
						</Typography>
						<Typography variant="body2" align="center">
							Bijeli
						</Typography>
					</Box>
				</Stack>
			</Card>
			<Typography variant="body2" align="center">
				Odigrani termini: 5
			</Typography>
		</Stack>
	);
}
