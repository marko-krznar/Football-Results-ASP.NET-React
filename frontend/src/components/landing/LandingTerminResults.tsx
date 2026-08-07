import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

function LandingTerminResults({
	totalSets,
	firstTeamGoals,
	secondTeamGoals,
	firstSetsWon,
	secondSetsWon,
}: {
	totalSets?: number;
	firstTeamGoals?: number[];
	secondTeamGoals?: number[];
	firstSetsWon?: number;
	secondSetsWon?: number;
}) {
	return (
		<>
			<Stack gap={2} marginBottom={4}>
				<Typography variant="h3">Zadnji odigrani termin</Typography>
				<Typography variant="body1">Analiza setova i konačan ishod</Typography>
			</Stack>
			<Stack
				spacing={4}
				sx={{
					flexDirection: { xs: "column", md: "row" },
					gap: 4,
				}}
			>
				{[...Array(totalSets)].map((_, index) => (
					<Card key={index} sx={{ flexGrow: 1 }}>
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
									{secondTeamGoals?.[index]}
								</Typography>
								<Typography variant="body1" textAlign="center">
									Crni
								</Typography>
							</Box>
							<Divider orientation="vertical" flexItem />
							<Box>
								<Typography variant="subtitle1" textAlign="center">
									{firstTeamGoals?.[index]}
								</Typography>
								<Typography variant="body1" textAlign="center">
									Bijeli
								</Typography>
							</Box>
						</CardContent>
					</Card>
				))}
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
								{secondSetsWon}
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
								{firstSetsWon}
							</Typography>
							<Typography variant="body1" textAlign="center">
								Bijeli
							</Typography>
						</Box>
					</CardContent>
					{/* <Typography variant="body1" textAlign="center" color="#95CFFF">
						Pobjeda: Crni
					</Typography> */}
				</Card>
			</Stack>
		</>
	);
}

export default LandingTerminResults;
