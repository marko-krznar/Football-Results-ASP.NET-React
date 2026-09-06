import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useAddPlayerMutation, useGetPlayersQuery, useUpdatePlayerMutation, type Player } from "../../redux/api/playersApi";

export default function ManagePlayers() {
	const { data: playersList, isLoading: isFetching } = useGetPlayersQuery();
	const [addPlayer, { isLoading: isAdding }] = useAddPlayerMutation();
	const [updatePlayer, { isLoading: isUpdating }] = useUpdatePlayerMutation();

	const [newPlayerName, setNewPlayerName] = useState("");
	const [successMsg, setSuccessMsg] = useState("");
	const [formError, setFormError] = useState("");

	// Edit modal state
	const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
	const [editPlayerName, setEditPlayerName] = useState("");
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editError, setEditError] = useState("");

	const handleAddSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSuccessMsg("");
		setFormError("");

		if (!newPlayerName.trim()) {
			setFormError("Unesite ime igrača.");
			return;
		}

		try {
			await addPlayer({ name: newPlayerName.trim() }).unwrap();
			setSuccessMsg("Igrač je uspješno dodan!");
			setNewPlayerName("");
		} catch (err: unknown) {
			const apiError = err as { data?: { message?: string } };
			setFormError(apiError?.data?.message || "Greška pri dodavanju igrača.");
		}
	};

	const handleOpenEditModal = (player: Player) => {
		setEditingPlayer(player);
		setEditPlayerName(player.name);
		setEditError("");
		setEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setEditModalOpen(false);
		setEditingPlayer(null);
		setEditPlayerName("");
		setEditError("");
	};

	const handleEditSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editingPlayer || !editPlayerName.trim()) return;

		try {
			await updatePlayer({ id: editingPlayer.id, name: editPlayerName.trim() }).unwrap();
			handleCloseEditModal();
			setSuccessMsg("Igrač je uspješno ažuriran!");
		} catch (err: unknown) {
			const apiError = err as { data?: { message?: string } };
			setEditError(apiError?.data?.message || "Greška pri uređivanju igrača.");
		}
	};

	return (
		<Stack spacing={4}>
			<Typography variant="h4" gutterBottom sx={{ color: "#fff", fontWeight: "bold", mb: "1.5rem !important" }}>
				Upravljanje igračima
			</Typography>

			<Card variant="outlined" sx={{ background: "#1E1F1E", borderColor: "#2E302F" }}>
				<CardContent>
					<Typography variant="h6" gutterBottom sx={{ color: "#fff", mb: 3 }}>
						Dodaj novog igrača
					</Typography>

					{formError && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{formError}
						</Alert>
					)}
					{successMsg && (
						<Alert severity="success" sx={{ mb: 2 }}>
							{successMsg}
						</Alert>
					)}

					<Box component="form" onSubmit={handleAddSubmit}>
						<Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
							<TextField
								label="Ime i prezime igrača"
								value={newPlayerName}
								onChange={(e) => setNewPlayerName(e.target.value)}
								fullWidth
								required
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								size="large"
								disabled={isAdding}
								startIcon={<AddIcon />}
								sx={{ whiteSpace: "nowrap", height: "56px" }}
							>
								{isAdding ? <CircularProgress size={24} /> : "Dodaj igrača"}
							</Button>
						</Stack>
					</Box>

					<Box sx={{ mt: 4 }}>
						<Typography variant="h6" gutterBottom sx={{ color: "#fff", mb: 2 }}>
							Popis igrača
						</Typography>

						{isFetching ? (
							<CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
						) : (
							<TableContainer component={Paper} sx={{ background: "#121212", border: "1px solid #2E302F" }}>
								<Table size="small">
									<TableHead>
										<TableRow>
											<TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
											<TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Ime i prezime</TableCell>
											<TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>Akcije</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{playersList?.map((player) => (
											<TableRow key={player.id}>
												<TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>{player.id}</TableCell>
												<TableCell sx={{ color: "#fff" }}>{player.name}</TableCell>
												<TableCell align="right">
													<IconButton
														color="primary"
														onClick={() => handleOpenEditModal(player)}
														aria-label={`Uredi ${player.name}`}
													>
														<EditIcon />
													</IconButton>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						)}
					</Box>
				</CardContent>
			</Card>

			{/* Edit Player Modal */}
			<Dialog open={editModalOpen} onClose={handleCloseEditModal} maxWidth="xs" fullWidth>
				<DialogTitle>Uredi igrača</DialogTitle>
				<Box component="form" onSubmit={handleEditSubmit}>
					<DialogContent>
						{editError && (
							<Alert severity="error" sx={{ mb: 2 }}>
								{editError}
							</Alert>
						)}
						<TextField
							autoFocus
							margin="dense"
							label="Ime i prezime"
							type="text"
							fullWidth
							value={editPlayerName}
							onChange={(e) => setEditPlayerName(e.target.value)}
							required
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseEditModal} variant="outlined">
							Odustani
						</Button>
						<Button type="submit" variant="contained" color="primary" disabled={isUpdating}>
							{isUpdating ? <CircularProgress size={24} /> : "Spremi izmjene"}
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</Stack>
	);
}
