import { Box, Container, Stack } from "@mui/material";
import { useGetLatestMatchQuery } from "../redux/api/matchesApi";
import LandingIntroCard from "../components/landing/LandingIntroCard";
import LandingSquadsCard from "../components/landing/LandingSquadsCard";
import LandingTerminResults from "../components/landing/LandingTerminResults";
import LandingTotalResultCard from "../components/landing/LandingTotalResultCard";

export default function Landing() {
	const { data } = useGetLatestMatchQuery();

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
				<Box display="flex" flexDirection="row" gap={4} flexGrow={1} overflow="hidden">
					<LandingIntroCard matchDate={data?.date} />
					<LandingTotalResultCard />
				</Box>
				{/* <Typography variant="h2" align="center">
				ŠD Hotanj Velesajam
			</Typography>
			<Typography variant="h3" align="center">
				Termin ponedjeljkom u 19:00h
			</Typography> */}
				<Box width={"100%"}>
					<LandingTerminResults
						totalSets={data?.totalSets}
						firstTeamGoals={data?.firstTeam.goalsPerSet}
						secondTeamGoals={data?.secondTeam.goalsPerSet}
						firstSetsWon={data?.firstTeam.setsWon}
						secondSetsWon={data?.secondTeam.setsWon}
					/>
				</Box>
				<Box>
					<LandingSquadsCard
						firstTeamPlayers={data?.firstTeam.playerNames}
						secondTeamPlayers={data?.secondTeam.playerNames}
					/>
				</Box>
			</Stack>
		</Container>
	);
}
