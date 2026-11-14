import { useMemo } from "react";
import { Container, Box, Typography, Grid, CircularProgress, Alert, Stack, Divider } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/hr";

import { useGetMatchesQuery } from "../redux/api/matchesApi";
import { useGetSeasonsQuery } from "../redux/api/seasonsApi";
import { useSelectedSeason } from "../redux/hooks";
import { calculateSeasonStatistics } from "../utils/statisticsUtils";
import StatRecordCard from "../components/statistics/StatRecordCard";
import PlayerLeaderboard from "../components/statistics/PlayerLeaderboard";

export default function Statistics() {
	const selectedSeasonId = useSelectedSeason();
	const { data: seasons } = useGetSeasonsQuery();
	const { data: matches, isLoading, error } = useGetMatchesQuery(selectedSeasonId ?? 0, { skip: !selectedSeasonId });

	const selectedSeason = seasons?.find((s) => s.id === selectedSeasonId);

	const stats = useMemo(() => {
		return calculateSeasonStatistics(matches);
	}, [matches]);

	const formatDate = (dateStr?: string) => {
		if (!dateStr) return "-";
		return dayjs(dateStr).locale("hr").format("DD.MM.YYYY.");
	};

	return (
		<Container maxWidth="xl">
			<Box sx={{ paddingBlock: 4 }}>
				{/* Top Header */}
				<Stack spacing={1} mb={4}>
					<Typography variant="h3" fontWeight="bold">
						Statistika sezone
					</Typography>
					<Typography variant="body1" color="text.secondary">
						{selectedSeason
							? `Detaljna analitika, rekordi susreta i poredak igrača za sezonu ${selectedSeason.name}`
							: "Pregled rekorda i statistike"}
					</Typography>
				</Stack>

				{isLoading && (
					<Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
						<CircularProgress />
					</Box>
				)}

				{error && (
					<Alert severity="error" sx={{ mb: 4 }}>
						Neuspješno dohvaćanje podataka o susretima za odabranu sezonu.
					</Alert>
				)}

				{!isLoading && !error && (
					<Stack spacing={4}>
						{/* ─── Highlights Row 1: Team & Match Records ─── */}
						<Box>
							<Typography variant="h4" fontWeight="bold" mb={2}>
								Istaknuti rekordi sezone
							</Typography>
							<Grid container spacing={3}>
								{/* Najefikasniji susret (Najviše golova) */}
								<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
									<StatRecordCard
										title="Susret s najviše golova"
										subtitle={
											stats.matchWithMostGoals
												? `${formatDate(stats.matchWithMostGoals.match.date)} • ${
														stats.matchWithMostGoals.match.firstTeam?.setsWon ??
 														stats.matchWithMostGoals.match.firstTeamSetsWon ??
 														0
 												  }:${
 														stats.matchWithMostGoals.match.secondTeam?.setsWon ??
 														stats.matchWithMostGoals.match.secondTeamSetsWon ??
 														0
 												  } setova`
 												: "Nema susreta"
 										}
 										primaryValue={
 											stats.matchWithMostGoals ? `${stats.matchWithMostGoals.totalGoals} golova` : "-"
 										}
 										secondaryValue={
 											stats.matchWithMostGoals
 												? `${
 														stats.matchWithMostGoals.match.firstTeam?.totalGoals ??
 														stats.matchWithMostGoals.match.firstTeamTotalGoals ??
 														0
 												  } (${stats.matchWithMostGoals.match.firstTeam?.teamName || "Crni"}) : ${
 														stats.matchWithMostGoals.match.secondTeam?.totalGoals ??
 														stats.matchWithMostGoals.match.secondTeamTotalGoals ??
 														0
 												  } (${stats.matchWithMostGoals.match.secondTeam?.teamName || "Bijeli"})`
 												: "Nema podataka"
 										}
 									/>
 								</Grid>

 								{/* Najduži deuce set */}
 								<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
 									<StatRecordCard
 										title="Najduži set"
 										subtitle={
 											stats.longestDeuceSet
 												? `${formatDate(stats.longestDeuceSet.date)} • Set ${stats.longestDeuceSet.setNumber}`
 												: "Bez produžetaka"
 										}
 										primaryValue={
 											stats.longestDeuceSet
 												? `${stats.longestDeuceSet.winningScore} : ${stats.longestDeuceSet.losingScore}`
 												: "-"
 										}
 										secondaryValue={
 											stats.longestDeuceSet
 												? `Pobjednik seta: ${stats.longestDeuceSet.winningTeamName}`
 												: "Niti jedan set nije dosegao 7 golova"
 										}
 									/>
 								</Grid>

 								{/* Igrač s najvećim postotkom pobjeda (Lucky Charm) */}
 								<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
 									<StatRecordCard
 										title="Najbolji postotak pobjeda"
 										subtitle="Min. 3 nastupa u sezoni"
 										primaryValue={stats.winRateLeader ? `${stats.winRateLeader.winPercentage}%` : "-"}
 										secondaryValue={
 											stats.winRateLeader
 												? `${stats.winRateLeader.name} (${stats.winRateLeader.wins} pobjeda u ${stats.winRateLeader.totalAppearances} nastupa)`
 												: "Nema kvalificiranih igrača"
 										}
 									/>
 								</Grid>
							</Grid>
						</Box>

						<Divider />

						{/* ─── White and Black statistics ─── */}
						<Box>
							<Grid container spacing={4}>
								{/* Statistika za Crne */}
								<Grid size={{ xs: 12, md: 6 }}>
									<Stack spacing={3}>
										<Typography variant="h4" fontWeight="bold">
											Crni tim
										</Typography>
										<StatRecordCard
											title="Najveća pobjeda Crnih"
											subtitle={
												stats.highestWinBlack
													? `${formatDate(stats.highestWinBlack.match.date)} • Setovi ${stats.highestWinBlack.setScore}`
													: "Nema pobjeda"
											}
											primaryValue={
												stats.highestWinBlack ? `+${stats.highestWinBlack.goalDifference} golova` : "-"
											}
											secondaryValue={
												stats.highestWinBlack
													? `Konačni golovi: ${stats.highestWinBlack.score}`
													: "Nema odigranih pobjeda"
											}
										/>
										<PlayerLeaderboard
											title="Najviše nastupa za Crne"
											description="Top 5 igrača u crnom dresu"
											players={stats.mostAppearancesBlack}
											countType="black"
										/>
									</Stack>
								</Grid>

								{/* Statistika za Bijele */}
								<Grid size={{ xs: 12, md: 6 }}>
									<Stack spacing={3}>
										<Typography variant="h4" fontWeight="bold">
											Bijeli tim
										</Typography>
										<StatRecordCard
											title="Najveća pobjeda Bijelih"
											subtitle={
												stats.highestWinWhite
													? `${formatDate(stats.highestWinWhite.match.date)} • Setovi ${stats.highestWinWhite.setScore}`
													: "Nema pobjeda"
											}
											primaryValue={
												stats.highestWinWhite ? `+${stats.highestWinWhite.goalDifference} golova` : "-"
											}
											secondaryValue={
												stats.highestWinWhite
													? `Konačni golovi: ${stats.highestWinWhite.score}`
													: "Nema odigranih pobjeda"
											}
										/>
										<PlayerLeaderboard
											title="Najviše nastupa za Bijele"
											description="Top 5 igrača u bijelom dresu"
											players={stats.mostAppearancesWhite}
											countType="white"
										/>
									</Stack>
								</Grid>
							</Grid>
						</Box>
					</Stack>
				)}
			</Box>
		</Container>
	);
}
