import { Alert, AlertTitle, Box, Container, Skeleton, Stack } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import dayjs from "dayjs";
import "dayjs/locale/hr";
import { useGetMatchesQuery, useGetTotalSeasonScoreQuery } from "../redux/api/matchesApi";
import { useSelectedSeason } from "../redux/hooks";
import LandingIntroCard from "../components/landing/LandingIntroCard";
import LandingSquadsCard from "../components/landing/LandingSquadsCard";
import LandingTerminResults from "../components/landing/LandingTerminResults";
import LandingTotalResultCard from "../components/landing/LandingTotalResultCard";
import { useGetSeasonsQuery } from "../redux/api/seasonsApi";

export default function Landing() {
	const selectedSeasonId = useSelectedSeason();
	const { data: matches, isLoading: matchesLoading } = useGetMatchesQuery(selectedSeasonId ?? undefined, {
		skip: !selectedSeasonId,
	});
	const { data: seasons } = useGetSeasonsQuery();
	const { data: totalSeasonScoreQuery, isLoading: totalSeasonScoreLoading } = useGetTotalSeasonScoreQuery(
		selectedSeasonId ?? 1,
		{ skip: !selectedSeasonId }
	);

	const currentSeason = seasons && seasons.find((season) => season.id === selectedSeasonId);

	const latestMatch = matches && matches.length > 0 ? matches[0] : undefined;
	const isFriendly = latestMatch?.countsForStandings === false;
	const matchBefore = isFriendly
		? matches?.slice(1).find((m) => m.countsForStandings !== false) ?? matches?.[1]
		: undefined;
	const displayMatch = isFriendly ? matchBefore : latestMatch;

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
					{currentSeason && latestMatch && (
						<LandingIntroCard
							matchDate={latestMatch.date}
							season={currentSeason.name}
							isFriendly={isFriendly}
						/>
					)}
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

				{isFriendly && latestMatch && (
					<Alert
						severity="info"
						icon={<InfoOutlinedIcon />}
						sx={{
							width: "100%",
							borderRadius: 2,
							border: 1,
							borderColor: "warning.main",
							backgroundColor: "background.paper",
							"& .MuiAlert-icon": {
								color: "warning.main",
							},
						}}
					>
						<AlertTitle sx={{ fontWeight: "bold" }}>
							Zadnji termin ({dayjs(latestMatch.date).locale("hr").format("DD.MM.YYYY.")}) bio je prijateljski
						</AlertTitle>
						{latestMatch.note ? `${latestMatch.note}. ` : "Termin se ne broji za ligu. "}
						{displayMatch
							? `Prikazani su rezultati prethodnog termina (${dayjs(displayMatch.date).locale("hr").format("DD.MM.YYYY.")}).`
							: "Nema prethodnih rezultata za prikaz."}
					</Alert>
				)}

				{matchesLoading && <Skeleton variant="rounded" width={"100%"} height={200} />}
				{displayMatch && (
					<>
						<Box width={"100%"}>
							<LandingTerminResults
								totalSets={displayMatch.totalSets}
								firstTeamGoals={displayMatch.firstTeam.goalsPerSet}
								secondTeamGoals={displayMatch.secondTeam.goalsPerSet}
								firstSetsWon={displayMatch.firstTeam.setsWon}
								secondSetsWon={displayMatch.secondTeam.setsWon}
								title={
									isFriendly
										? `Rezultati prethodnog termina (${dayjs(displayMatch.date).locale("hr").format("DD.MM.YYYY.")})`
										: undefined
								}
							/>
						</Box>
						<Box>
							<LandingSquadsCard
								firstTeamPlayers={displayMatch.firstTeam.playerNames}
								secondTeamPlayers={displayMatch.secondTeam.playerNames}
							/>
						</Box>
					</>
				)}
			</Stack>
		</Container>
	);
}
