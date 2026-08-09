import {
	Box,
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
import MatchesIntro from "../components/matches/MatchesIntro";
import { useState } from "react";
import { useGetMatchesQuery, useGetTotalSeasonScoreQuery, useRemoveMatchMutation } from "../redux/api/matchesApi";
import EditMatchModal from "../components/matches/EditMatchModal";
import AddMatchModal from "../components/matches/AddMatchModal";
import MatchTabel from "../components/matches/MatchTabel";

export default function Matches() {
	const { data } = useGetMatchesQuery();
	const { data: totalSeasonScore } = useGetTotalSeasonScoreQuery(1);
	const [removeMatch] = useRemoveMatchMutation();
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editingMatchId, setEditingMatchId] = useState<number | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletingMatchId, setDeletingMatchId] = useState<number | null>(null);

	console.log("totalSeasonScore", totalSeasonScore);

	return (
		<Container maxWidth="xl">
			<Box
				sx={{
					paddingBlock: 4,
				}}
			>
				{totalSeasonScore && (
					<MatchesIntro
						firstTeamName={totalSeasonScore?.firstTeam.teamName}
						firstTotalSetsWon={totalSeasonScore?.firstTeam.totalSetsWon}
						secondTeamName={totalSeasonScore?.secondTeam.teamName}
						secondTotalSetsWon={totalSeasonScore?.secondTeam.totalSetsWon}
					/>
				)}
				{data && (
					<MatchTabel
						data={data}
						setDeletingMatchId={setDeletingMatchId}
						setDeleteDialogOpen={setDeleteDialogOpen}
						setEditingMatchId={setEditingMatchId}
						setEditModalOpen={setEditModalOpen}
					/>
				)}
			</Box>
			<AddMatchModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
			<EditMatchModal
				open={editModalOpen}
				matchId={editingMatchId}
				onClose={() => {
					setEditModalOpen(false);
					setEditingMatchId(null);
				}}
			/>
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
		</Container>
	);
}
