import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import dayjs from "dayjs";

function LandingIntroCard() {
	const matches = useAppSelector((state) => state.matches.data);

	return (
		<Card
			sx={{
				flex: 2,
			}}
		>
			<CardContent>
				<Typography variant="body1">Aktivna sezona: proljeće 2026.</Typography>
				<Typography variant="h1" fontWeight="bold">
					HPD PRSTEN <span style={{ color: "#95CFFF" }}>SUPERLIGA</span>
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
							{dayjs(matches[0].date).locale("hr").format("DD.MM.YYYY.")}
						</Typography>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}

export default LandingIntroCard;
