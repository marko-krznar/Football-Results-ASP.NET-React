import { Box, Card, CardContent, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

function LandingTerminResults({
	totalSets,
	firstTeamGoals,
	secondTeamGoals,
	firstSetsWon,
	secondSetsWon,
}: {
	totalSets: number;
	firstTeamGoals: number[];
	secondTeamGoals: number[];
	firstSetsWon: number;
	secondSetsWon: number;
}) {
	const theme = useTheme();

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
								<Chip label={`Set ${index + 1}`} />
								<SportsSoccerIcon />
							</Box>
							<Box>
								<Typography variant="h2" component="p" textAlign="center" fontWeight="bold">
									{secondTeamGoals?.[index]}
								</Typography>
								<Typography variant="body1" textAlign="center">
									Crni
								</Typography>
							</Box>
							<Divider orientation="vertical" flexItem />
							<Box>
								<Typography variant="h2" component="p" textAlign="center" fontWeight="bold">
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
					<Typography variant="body1" textAlign="center" color={theme.palette.primary.main}>
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
							<Typography
								variant="h2"
								component="p"
								textAlign="center"
								fontWeight="bold"
								color={
									secondSetsWon > firstSetsWon
										? theme.palette.primary.main
										: theme.palette.text.primary
								}
							>
								{secondSetsWon}
							</Typography>
							<Typography
								variant="body1"
								textAlign="center"
								color={
									secondSetsWon > firstSetsWon
										? theme.palette.primary.main
										: theme.palette.text.primary
								}
							>
								Crni
							</Typography>
						</Box>
						<Typography variant="subtitle2" textAlign="center">
							:
						</Typography>
						<Box>
							<Typography
								variant="h2"
								component="p"
								textAlign="center"
								fontWeight="bold"
								color={
									firstSetsWon > secondSetsWon
										? theme.palette.primary.main
										: theme.palette.text.primary
								}
							>
								{firstSetsWon}
							</Typography>
							<Typography
								variant="body1"
								textAlign="center"
								color={
									firstSetsWon > secondSetsWon
										? theme.palette.primary.main
										: theme.palette.text.primary
								}
							>
								Bijeli
							</Typography>
						</Box>
					</CardContent>
				</Card>
			</Stack>
		</>
	);
}

export default LandingTerminResults;
