import { Box, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useAppSelector } from "../redux/hooks";
import { calculateMatchScore } from "../utils/matchUtils";

function LandingTerminResults() {
	const matches = useAppSelector((state) => state.matches.data);
	const { blackTotal, whiteTotal } = calculateMatchScore(matches[0].sets);

	return (
		<>
			<Box display="flex" flexDirection="column" gap={1} width="100%">
				<Typography variant="h3">Zadnji odigrani termin</Typography>
				<Typography variant="body1">Analiza setova i konačan ishod</Typography>
			</Box>
			<Box display="flex" flexDirection="row" gap={4} width="100%">
				<Card sx={{ flexGrow: 1 }}>
					<CardContent
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-around",
							flexWrap: "wrap",
							gap: 4,
						}}
					>
						<Box width="100%" display="flex" justifyContent="space-between" alignItems="center" gap={1}>
							<Chip label="Set 1" />
							<SportsSoccerIcon />
						</Box>
						<Box>
							<Typography variant="subtitle1" textAlign="center">
								{matches[0].sets[0].blackScore}
							</Typography>
							<Typography variant="body1" textAlign="center">
								Crni
							</Typography>
						</Box>
						<Divider orientation="vertical" flexItem />
						<Box>
							<Typography variant="subtitle1" textAlign="center">
								<span style={{ color: "#ADAAAA" }}>{matches[0].sets[0].whiteScore}</span>
							</Typography>
							<Typography variant="body1" textAlign="center">
								Bijeli
							</Typography>
						</Box>
					</CardContent>
				</Card>
				<Card sx={{ flexGrow: 1 }}>
					<CardContent
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-around",
							flexWrap: "wrap",
							gap: 4,
						}}
					>
						<Box width="100%" display="flex" justifyContent="space-between" alignItems="center" gap={1}>
							<Chip label="Set 2" />
							<SportsSoccerIcon />
						</Box>
						<Box>
							<Typography variant="subtitle1" textAlign="center">
								<span style={{ color: "#ADAAAA" }}>{matches[0].sets[1].blackScore}</span>
							</Typography>
							<Typography variant="body1" textAlign="center">
								Crni
							</Typography>
						</Box>
						<Divider orientation="vertical" flexItem />
						<Box>
							<Typography variant="subtitle1" textAlign="center">
								<span style={{ color: "#ADAAAA" }}>{matches[0].sets[1].whiteScore}</span>
							</Typography>
							<Typography variant="body1" textAlign="center">
								Bijeli
							</Typography>
						</Box>
					</CardContent>
				</Card>
				<Card
					sx={{
						display: "flex",
						flexDirection: "column",
						flexGrow: 1,
						gap: "2rem",
						backgroundColor: "#1D2126",
						border: "2px solid #344551",
					}}
				>
					<Typography variant="body1" textAlign="center" color="#95CFFF">
						Konačni rezultat
					</Typography>
					<CardContent
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-around",
							alignItems: "center",
							gap: 4,
						}}
					>
						<Box>
							<Typography variant="subtitle1" textAlign="center" color="#95CFFF">
								{blackTotal}
							</Typography>
							<Typography variant="body1" textAlign="center" color="#95CFFF">
								Crni
							</Typography>
						</Box>
						<Typography variant="subtitle2" textAlign="center" color="#ADAAAA">
							:
						</Typography>
						<Box>
							<Typography variant="subtitle1" textAlign="center" color="#ADAAAA">
								{whiteTotal}
							</Typography>
							<Typography variant="body1" textAlign="center">
								Bijeli
							</Typography>
						</Box>
					</CardContent>
					<Typography variant="body1" textAlign="center" color="#95CFFF">
						Pobjeda: Crni
					</Typography>
				</Card>
			</Box>
		</>
	);
}

export default LandingTerminResults;
