import { useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetMatchesQuery, useGetTotalSeasonScoreQuery, useRemoveMatchMutation } from "../../redux/api/matchesApi";
import { useSelectedSeason } from "../../redux/hooks";
import { useGetSeasonsQuery } from "../../redux/api/seasonsApi";
import AddMatchModal from "../matches/AddMatchModal";
import EditMatchModal from "../matches/EditMatchModal";
import MatchTabel from "../matches/MatchTabel";
import MatchesMobileCardList from "../matches/MatchesMobileCardList";
import MatchesIntroCard from "../matches/MatchesIntroCard";

/**
 * Matches management tab for the Admin dashboard.
 * Reuses existing match components (create, edit, delete).
 */
export default function AdminMatchesTab() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const selectedSeasonId = useSelectedSeason();
	const { data } = useGetMatchesQuery(selectedSeasonId ?? 0, { skip: !selectedSeasonId });
	const { data: totalSeasonScore } = useGetTotalSeasonScoreQuery(selectedSeasonId ?? 0, {
		skip: !selectedSeasonId,
	});
	const { data: seasons } = useGetSeasonsQuery();
	const [removeMatch] = useRemoveMatchMutation();

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editingMatchId, setEditingMatchId] = useState<number | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletingMatchId, setDeletingMatchId] = useState<number | null>(null);

	const selectedSeason = seasons && seasons.find((s) => s.id === selectedSeasonId);

	return (
		<Stack spacing={4}>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Box>
					<Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
						Matches
					</Typography>
					{selectedSeason && (
						<Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mt: 0.5 }}>
							Season: {selectedSeason.name}
						</Typography>
					)}
				</Box>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={() => setAddModalOpen(true)}
					sx={{ whiteSpace: "nowrap" }}
				>
					Add Match
				</Button>
			</Stack>

			{totalSeasonScore && (
				<MatchesIntroCard
					firstTeamName={totalSeasonScore.firstTeam.teamName}
					firstTotalSetsWon={totalSeasonScore.firstTeam.totalSetsWon}
					secondTeamName={totalSeasonScore.secondTeam.teamName}
					secondTotalSetsWon={totalSeasonScore.secondTeam.totalSetsWon}
				/>
			)}

			{data &&
				(isMobile ? (
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
				))}

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
					aria-labelledby="admin-delete-dialog-title"
					aria-describedby="admin-delete-dialog-description"
				>
					<DialogTitle id="admin-delete-dialog-title">Confirm Delete</DialogTitle>
					<DialogContent>
						<DialogContentText id="admin-delete-dialog-description">
							Are you sure you want to permanently delete this match? This action cannot be undone.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								setDeleteDialogOpen(false);
								setDeletingMatchId(null);
							}}
						>
							Cancel
						</Button>
						<Button
							color="error"
							autoFocus
							onClick={() => {
								if (deletingMatchId !== null) {
									removeMatch({ matchId: deletingMatchId });
								}
								setDeleteDialogOpen(false);
								setDeletingMatchId(null);
							}}
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Stack>
	);
}
