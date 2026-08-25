import { Box, Container, Skeleton, Stack } from "@mui/material";
import { useGetLatestMatchQuery, useGetTotalSeasonScoreQuery } from "../redux/api/matchesApi";
import LandingIntroCard from "../components/landing/LandingIntroCard";
import LandingSquadsCard from "../components/landing/LandingSquadsCard";
import LandingTerminResults from "../components/landing/LandingTerminResults";
import LandingTotalResultCard from "../components/landing/LandingTotalResultCard";

export default function Landing() {
	const { data: latestMatch, isLoading: latestMatchLoading } = useGetLatestMatchQuery();
	const { data: totalSeasonScoreQuery, isLoading: totalSeasonScoreLoading } = useGetTotalSeasonScoreQuery(1); //TODO replace with real season id

	return (
		<Container maxWidth="xl">
			<Stack
				spacing={4}
				alignItems="flex-start"
				flexDirection="row"
				flexWrap="wrap"
				gap={4}
				sx={{
					paddingTop: 4,
					paddingBottom: 4,
					backdropFilter: "blur(12px)",
					flexGrow: 1,
				}}
			>
				<Box
					display="flex"
					gap={4}
					flexGrow={1}
					overflow="hidden"
					sx={{
						flexDirection: { xs: "column", md: "row" },
					}}
				>
					<LandingIntroCard matchDate={latestMatch?.date} />
					{totalSeasonScoreLoading && (
						<Box flexGrow={1} flexShrink={1}>
							<Skeleton variant="rounded" height={"100%"} />
						</Box>
					)}
					{totalSeasonScoreQuery && (
						<LandingTotalResultCard
							firstTeam={totalSeasonScoreQuery.firstTeam}
							secondTeam={totalSeasonScoreQuery.secondTeam}
						/>
					)}
				</Box>
				{/* <Typography variant="h2" align="center">
				ŠD Hotanj Velesajam
			</Typography>
			<Typography variant="h3" align="center">
				Termin ponedjeljkom u 19:00h
			</Typography> */}
				{latestMatchLoading && <Skeleton variant="rounded" width={"100%"} height={200} />}
				{latestMatch && (
					<>
						<Box width={"100%"}>
							<LandingTerminResults
								totalSets={latestMatch.totalSets}
								firstTeamGoals={latestMatch.firstTeam.goalsPerSet}
								secondTeamGoals={latestMatch.secondTeam.goalsPerSet}
								firstSetsWon={latestMatch.firstTeam.setsWon}
								secondSetsWon={latestMatch.secondTeam.setsWon}
							/>
						</Box>
						<Box>
							<LandingSquadsCard
								firstTeamPlayers={latestMatch.firstTeam.playerNames}
								secondTeamPlayers={latestMatch.secondTeam.playerNames}
							/>
						</Box>
					</>
				)}
			</Stack>
		</Container>
	);
}
