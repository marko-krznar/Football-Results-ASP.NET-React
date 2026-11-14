import {
	Box,
	Card,
	CardContent,
	Chip,
	Container,
	Divider,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import MatchesIntro from "../components/matches/MatchesIntro";
import { useGetMatchesQuery, useGetTotalSeasonScoreQuery } from "../redux/api/matchesApi";
import { useSelectedSeason } from "../redux/hooks";
import MatchTabel from "../components/matches/MatchTabel";
import MatchesMobileCardList from "../components/matches/MatchesMobileCardList";
import MatchesIntroCard from "../components/matches/MatchesIntroCard";
import { useGetSeasonsQuery } from "../redux/api/seasonsApi";

export default function Matches() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const selectedSeasonId = useSelectedSeason();
	const { data } = useGetMatchesQuery(selectedSeasonId ?? 0, { skip: !selectedSeasonId });
	const { data: totalSeasonScore } = useGetTotalSeasonScoreQuery(selectedSeasonId ?? 0, { skip: !selectedSeasonId });
	const { data: seasons } = useGetSeasonsQuery();

	const selectedSeason = seasons && seasons.find((season) => season.id === selectedSeasonId);
	const totalMatches = data?.length;

	return (
		<Container maxWidth="xl">
			<Box sx={{ paddingBlock: 4 }}>
				{/* ─── Top hero row ─── */}
				<Stack direction={{ xs: "column", sm: "row" }} spacing={4} sx={{ width: "100%", mb: 4 }}>
					{selectedSeason && (
						<MatchesIntro
							season={selectedSeason.name}
							totalMatches={totalMatches}
						/>
					)}
					{totalSeasonScore && (
						<MatchesIntroCard
							firstTeamName={totalSeasonScore.firstTeam.teamName}
							firstTotalSetsWon={totalSeasonScore.firstTeam.totalSetsWon}
							secondTeamName={totalSeasonScore.secondTeam.teamName}
							secondTotalSetsWon={totalSeasonScore.secondTeam.totalSetsWon}
						/>
					)}
				</Stack>

				{/* ─── Table section ─── */}
				{data && (
					<Card>
						<CardContent>
							{/* Table header */}
							<Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={1}>
								<Box>
									<Typography variant="h4" fontWeight="bold">
										Tablica odigranih termina
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Detaljan pregled sastava, rezultata po setovima i konačnog ishoda
									</Typography>
								</Box>
								<Chip label={`Prikazano: ${data.length} susreta`} variant="outlined" sx={{ borderColor: "divider" }} />
							</Stack>

							<Divider />

							{isMobile ? (
								<MatchesMobileCardList data={data} />
							) : (
								<MatchTabel data={data} />
							)}
						</CardContent>
					</Card>
				)}
			</Box>
		</Container>
	);
}

