import {
	Box,
	Card,
	CardContent,
	Chip,
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Divider,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import MatchesIntro from "../components/matches/MatchesIntro";
import { useState } from "react";
import { useGetMatchesQuery, useGetTotalSeasonScoreQuery, useRemoveMatchMutation } from "../redux/api/matchesApi";
import { useSelectedSeason } from "../redux/hooks";
import EditMatchModal from "../components/matches/EditMatchModal";
import AddMatchModal from "../components/matches/AddMatchModal";
import MatchTabel from "../components/matches/MatchTabel";
import MatchesMobileCardList from "../components/matches/MatchesMobileCardList";
import MatchesIntroCard from "../components/matches/MatchesIntroCard";
import { useGetSeasonsQuery } from "../redux/api/seasonsApi";
import dayjs from "dayjs";
import "dayjs/locale/hr";

export default function Matches() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const selectedSeasonId = useSelectedSeason();
	const { data } = useGetMatchesQuery(selectedSeasonId ?? 0, { skip: !selectedSeasonId });
	const { data: totalSeasonScore } = useGetTotalSeasonScoreQuery(selectedSeasonId ?? 0, { skip: !selectedSeasonId });
	const { data: seasons } = useGetSeasonsQuery();
	const [removeMatch] = useRemoveMatchMutation();
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editingMatchId, setEditingMatchId] = useState<number | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletingMatchId, setDeletingMatchId] = useState<number | null>(null);

	const selectedSeason = seasons && seasons.find((season) => season.id === selectedSeasonId);

	// Derive last updated date from the most recent match
	const lastUpdated =
		data && data.length > 0
			? dayjs(data[0].date).locale("hr").format("ddd DD.MM.YYYY.")
			: undefined;

	// Count only ranked matches
	const rankedMatchCount = data ? data.filter((m) => m.countsForStandings !== false).length : undefined;

	return (
		<Container maxWidth="xl">
			<Box sx={{ paddingBlock: 4 }}>
				{/* ─── Top hero row ─── */}
				<Stack direction={{ xs: "column", sm: "row" }} spacing={4} sx={{ width: "100%", mb: 4 }}>
					{selectedSeason && (
						<MatchesIntro
							season={selectedSeason.name}
							matchCount={rankedMatchCount}
							lastUpdatedDate={lastUpdated}
						/>
					)}
					{totalSeasonScore && (
						<MatchesIntroCard
							firstTeamName={totalSeasonScore.firstTeam.teamName}
							firstTotalSetsWon={totalSeasonScore.firstTeam.totalSetsWon}
							secondTeamName={totalSeasonScore.secondTeam.teamName}
							secondTotalSetsWon={totalSeasonScore.secondTeam.totalSetsWon}
							totalMatches={data?.length}
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
								<MatchesMobileCardList
									data={data}
									setDeletingMatchId={setDeletingMatchId}
									setDeleteDialogOpen={setDeleteDialogOpen}
									setEditingMatchId={setEditingMatchId}
									setEditModalOpen={setEditModalOpen}
								/>
							) : (
								<MatchTabel
									data={data}
									setDeletingMatchId={setDeletingMatchId}
									setDeleteDialogOpen={setDeleteDialogOpen}
									setEditingMatchId={setEditingMatchId}
									setEditModalOpen={setEditModalOpen}
								/>
							)}
						</CardContent>
					</Card>
				)}
			</Box>

			{addModalOpen && <AddMatchModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />}
			{editModalOpen && (
				<EditMatchModal
					open={editModalOpen}
					matchId={editingMatchId}
					onClose={() => {
						setEditModalOpen(false);
						setEditingMatchId(null);
					}}
				/>
			)}
			{deleteDialogOpen && (
				<Dialog
					open={deleteDialogOpen}
					onClose={() => {
						setDeleteDialogOpen(false);
						setDeletingMatchId(null);
					}}
					aria-labelledby="delete-dialog-title"
					aria-describedby="delete-dialog-description"
				>
					<DialogTitle id="delete-dialog-title">{"Potvrda brisanja"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="delete-dialog-description">
							Jeste li sigurni da želite sigurno obrisati podatke o ovoj utakmici? Ova akcija se ne može
							poništiti.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								setDeleteDialogOpen(false);
								setDeletingMatchId(null);
							}}
						>
							Odustani
						</Button>
						<Button
							onClick={() => {
								if (deletingMatchId !== null) {
									removeMatch({ matchId: deletingMatchId });
								}
								setDeleteDialogOpen(false);
								setDeletingMatchId(null);
							}}
							color="error"
							autoFocus
						>
							Obriši
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Container>
	);
}
