import { Box, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/hr";

function LandingIntroCard({
	matchDate,
	season,
	isFriendly,
}: {
	matchDate?: string;
	season: string;
	isFriendly?: boolean;
}) {
	return (
		<Card
			sx={{
				flex: 2,
			}}
		>
			<CardContent>
				<Typography variant="body1">Odabrana sezona: {season}.</Typography>
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
				<Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
					{/* <Box>
						<Typography variant="body1">
							Odigrani termini
						</Typography>
						<Typography variant="subtitle2">7</Typography>
					</Box> */}
					<Box>
						<Typography variant="body1">Posljednji termin</Typography>
						<Typography variant="subtitle2">
							{matchDate ? dayjs(matchDate).locale("hr").format("DD.MM.YYYY.") : "-"}
						</Typography>
					</Box>
					{isFriendly && (
						<Chip
							size="small"
							label="Prijateljski termin"
							color="warning"
							variant="outlined"
							sx={{ fontWeight: "bold" }}
						/>
					)}
				</Box>
			</CardContent>
		</Card>
	);
}

export default LandingIntroCard;
