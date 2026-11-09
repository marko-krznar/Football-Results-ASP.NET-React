import { useMemo } from "react";
import {
	Container,
	Box,
	Typography,
	Grid,
	CircularProgress,
	Alert,
	Stack,
	Divider,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TimerIcon from "@mui/icons-material/Timer";
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
	const {
		data: matches,
		isLoading,
		error,
	} = useGetMatchesQuery(selectedSeasonId ?? 0, { skip: !selectedSeasonId });

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
								Rekordi susreta
							</Typography>
							<Grid container spacing={3}>
								{/* Najveća pobjeda Crnih */}
								<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
									<StatRecordCard
										title="Najveća pobjeda Crnih"
										subtitle={
											stats.highestWinBlack
												? `${formatDate(stats.highestWinBlack.match.date)} (Setovi: ${stats.highestWinBlack.setScore})`
												: "Nema pobjeda"
										}
										primaryValue={
											stats.highestWinBlack ? `+${stats.highestWinBlack.goalDifference}` : "-"
										}
										secondaryValue={
											stats.highestWinBlack
												? `Rezultat: ${stats.highestWinBlack.score} golova`
												: "Nema odigranih pobjeda"
										}
										badgeLabel="Crni"
										icon={<EmojiEventsIcon />}
									/>
								</Grid>

								{/* Najveća pobjeda Bijelih */}
								<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
									<StatRecordCard
										title="Najveća pobjeda Bijelih"
										subtitle={
											stats.highestWinWhite
												? `${formatDate(stats.highestWinWhite.match.date)} (Setovi: ${stats.highestWinWhite.setScore})`
												: "Nema pobjeda"
										}
										primaryValue={
											stats.highestWinWhite ? `+${stats.highestWinWhite.goalDifference}` : "-"
										}
										secondaryValue={
											stats.highestWinWhite
												? `Rezultat: ${stats.highestWinWhite.score} golova`
												: "Nema odigranih pobjeda"
										}
										badgeLabel="Bijeli"
										icon={<EmojiEventsIcon />}
									/>
								</Grid>

								{/* Najefikasniji susret (Najviše golova) */}
								<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
									<StatRecordCard
										title="Susret s najviše golova"
										subtitle={
											stats.matchWithMostGoals
												? `${formatDate(stats.matchWithMostGoals.match.date)} • ${stats.matchWithMostGoals.match.firstTeamSetsWon}:${stats.matchWithMostGoals.match.secondTeamSetsWon} setova`
												: "Nema susreta"
										}
										primaryValue={
											stats.matchWithMostGoals ? `${stats.matchWithMostGoals.totalGoals}` : "-"
										}
										secondaryValue={
											stats.matchWithMostGoals
												? `${stats.matchWithMostGoals.match.firstTeamTotalGoals} (Crni) : ${stats.matchWithMostGoals.match.secondTeamTotalGoals} (Bijeli)`
												: "Nema podataka"
										}
										badgeLabel="Golijada"
										icon={<WhatshotIcon />}
									/>
								</Grid>

								{/* Susret s najviše setova */}
								<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
									<StatRecordCard
										title="Najduži susret po setovima"
										subtitle={
											stats.matchWithMostSets
												? `${formatDate(stats.matchWithMostSets.match.date)} • ${stats.matchWithMostSets.match.firstTeamSetsWon}:${stats.matchWithMostSets.match.secondTeamSetsWon}`
												: "Nema susreta"
										}
										primaryValue={
											stats.matchWithMostSets ? `${stats.matchWithMostSets.totalSets} setova` : "-"
										}
										secondaryValue={
											stats.matchWithMostSets
												? `Ukupno setova u terminu`
												: "Nema podataka"
										}
										badgeLabel="Maraton"
										icon={<SportsScoreIcon />}
									/>
								</Grid>

								{/* Najduži deuce set */}
								<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
									<StatRecordCard
										title="Najduži set (produžeci / deuce)"
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
										badgeLabel="Drama"
										icon={<TimerIcon />}
									/>
								</Grid>

								{/* Najnapetiji susret (Closest Thriller) */}
								<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
									<StatRecordCard
										title="Najnapetiji susret"
										subtitle={
											stats.closestMatch
												? `${formatDate(stats.closestMatch.match.date)} (Setovi: ${stats.closestMatch.setScore})`
												: "Nema susreta"
										}
										primaryValue={
											stats.closestMatch ? `${stats.closestMatch.goalDifference} gola razlike` : "-"
										}
										secondaryValue={
											stats.closestMatch
												? `Konačni golovi: ${stats.closestMatch.score}`
												: "Nema podataka"
										}
										badgeLabel="Triler"
										icon={<MilitaryTechIcon />}
									/>
								</Grid>

								{/* Igrač s najvećim postotkom pobjeda (Lucky Charm) */}
								<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
									<StatRecordCard
										title="Najbolji postotak pobjeda"
										subtitle="Min. 3 nastupa u sezoni"
										primaryValue={stats.winRateLeader ? `${stats.winRateLeader.winPercentage}%` : "-"}
										secondaryValue={
											stats.winRateLeader
												? `${stats.winRateLeader.name} (${stats.winRateLeader.wins} pobjeda u ${stats.winRateLeader.totalAppearances} nastupa)`
												: "Nema kvalificiranih igrača"
										}
										badgeLabel="Talisman"
										icon={<EmojiEventsIcon />}
									/>
								</Grid>
							</Grid>
						</Box>

						<Divider />

						{/* ─── Player Leaderboards ─── */}
						<Box>
							<Typography variant="h4" fontWeight="bold" mb={2}>
								Poredak igrača po nastupima
							</Typography>
							<Grid container spacing={3}>
								{/* Najviše nastupa ukupno */}
								<Grid size={{ xs: 12, md: 4 }}>
									<PlayerLeaderboard
										title="Ukupno nastupa"
										description="Igrači s najviše odigranih termina u sezoni"
										players={stats.mostAppearancesOverall}
										countType="total"
									/>
								</Grid>

								{/* Najviše nastupa za Crne */}
								<Grid size={{ xs: 12, md: 4 }}>
									<PlayerLeaderboard
										title="Najviše nastupa za Crne"
										description="Top 5 igrača u crnom dresu"
										players={stats.mostAppearancesBlack}
										countType="black"
									/>
								</Grid>

								{/* Najviše nastupa za Bijele */}
								<Grid size={{ xs: 12, md: 4 }}>
									<PlayerLeaderboard
										title="Najviše nastupa za Bijele"
										description="Top 5 igrača u bijelom dresu"
										players={stats.mostAppearancesWhite}
										countType="white"
									/>
								</Grid>
							</Grid>
						</Box>
					</Stack>
				)}
			</Box>
		</Container>
	);
}
