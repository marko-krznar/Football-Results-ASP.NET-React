import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import dayjs from "dayjs";

function LandingIntroCard({ matchDate }: { matchDate?: string }) {
	return (
		<Card
			sx={{
				flex: 2,
			}}
		>
			<CardContent>
				<Typography variant="body1">Aktivna sezona: proljeće 2026.</Typography>
				<Typography
					variant="h1"
					fontWeight="bold"
					sx={{
						fontSize: {
							xs: "2.5rem",
							sm: "3rem",
							md: "4rem",
						},
					}}
				>
					HPD PRSTEN <span style={{ color: "primary.light" }}>SUPERLIGA</span>
				</Typography>
				<Typography variant="body1">
					Praćenje rezultata, statistika i dinamike igre u realnom vremenu.
				</Typography>
				<Divider />
				<Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
					{/* <Box>
						<Typography variant="body1">
							Odigrani termini
						</Typography>
						<Typography variant="subtitle2">7</Typography>
					</Box> */}
					<Box>
						<Typography variant="body1">Posljednji termin</Typography>
						<Typography variant="subtitle2">
							{dayjs(matchDate).locale("hr").format("DD.MM.YYYY.")}
						</Typography>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}

export default LandingIntroCard;
