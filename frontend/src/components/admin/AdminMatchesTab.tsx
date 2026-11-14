import { useState } from "react";
import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Fab,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetMatchesQuery, useRemoveMatchMutation } from "../../redux/api/matchesApi";
import { useSelectedSeason } from "../../redux/hooks";
import { useGetSeasonsQuery } from "../../redux/api/seasonsApi";
import AddMatchModal from "../matches/AddMatchModal";
import EditMatchModal from "../matches/EditMatchModal";
import MatchTabel from "../matches/MatchTabel";
import MatchesMobileCardList from "../matches/MatchesMobileCardList";

/**
 * Matches management tab for the Admin dashboard.
 * Reuses existing match components (create, edit, delete).
 */
export default function AdminMatchesTab() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const selectedSeasonId = useSelectedSeason();
	const { data } = useGetMatchesQuery(selectedSeasonId ?? 0, { skip: !selectedSeasonId });
	const { data: seasons } = useGetSeasonsQuery();
	const [removeMatch] = useRemoveMatchMutation();

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editingMatchId, setEditingMatchId] = useState<number | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletingMatchId, setDeletingMatchId] = useState<number | null>(null);

	const selectedSeason = seasons && seasons.find((s) => s.id === selectedSeasonId);

	return (
		<Stack spacing={3}>
			<Stack
				direction={{ xs: "column", sm: "row" }}
				alignItems={{ xs: "flex-start", sm: "center" }}
				justifyContent="space-between"
				spacing={2}
			>
				<Box>
					<Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
						<Typography variant="h3" component="h1">
							Upravljanje terminima
						</Typography>
						{data && (
							<Chip
								label={`${data.length} termina`}
								size="small"
								sx={{
									backgroundColor: "action.selected",
									border: "1px solid",
									borderColor: "divider",
									fontWeight: 600,
									color: "text.secondary",
								}}
							/>
						)}
					</Stack>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						{selectedSeason
							? `Pregled, unos i uređivanje odigranih termina za sezonu ${selectedSeason.name}`
							: "Pregled, unos i uređivanje odigranih termina"}
					</Typography>
				</Box>

				<Button
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={() => setAddModalOpen(true)}
					sx={{
						display: { xs: "none", sm: "inline-flex" },
						borderRadius: "20px",
						px: 2.5,
						py: 1,
						fontWeight: 600,
						textTransform: "none",
						whiteSpace: "nowrap",
					}}
				>
					Novi termin
				</Button>
			</Stack>

			<Box
				sx={{
					display: { xs: "flex", sm: "none" },
					position: "fixed",
					bottom: 76,
					right: 16,
					zIndex: (t) => t.zIndex.speedDial,
				}}
			>
				<Fab
					variant="extended"
					color="primary"
					onClick={() => setAddModalOpen(true)}
					aria-label="Dodaj termin"
				>
					<AddIcon sx={{ mr: 1 }} />
					Dodaj termin
				</Fab>
			</Box>

			{data &&
				(isMobile ? (
					<MatchesMobileCardList
						data={data}
						showActions
						setDeletingMatchId={setDeletingMatchId}
						setDeleteDialogOpen={setDeleteDialogOpen}
						setEditingMatchId={setEditingMatchId}
						setEditModalOpen={setEditModalOpen}
					/>
				) : (
					<MatchTabel
						data={data}
						showActions
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
					<DialogTitle id="admin-delete-dialog-title">Potvrda brisanja</DialogTitle>
					<DialogContent>
						<DialogContentText id="admin-delete-dialog-description">
							Jeste li sigurni da želite trajno izbrisati ovaj termin? Ova radnja se ne može poništiti.
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
							Izbriši
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Stack>
	);
}
