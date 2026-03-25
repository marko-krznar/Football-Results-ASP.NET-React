import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

function LandingIntroCard() {
	return (
		<Card>
			<CardContent>
				<Typography variant="body1">
					Aktivna sezona: proljeće 2026.
				</Typography>
				<Typography variant="h1" fontWeight="bold">
					HPD PRSTEN{" "}
					<span style={{ color: "#95CFFF" }}>SUPERLIGA</span>
				</Typography>
				<Typography variant="body1">
					Praćenje rezultata, statistika i dinamike igre u realnom
					vremenu.
				</Typography>
				<Divider />
				<Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
					<Box>
						<Typography variant="body1">
							Odigrani termini
						</Typography>
						<Typography variant="subtitle2">6</Typography>
					</Box>
					<Box>
						<Typography variant="body1">
							Posljednji termin
						</Typography>
						<Typography variant="subtitle2">23.03.2026.</Typography>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}

export default LandingIntroCard;
