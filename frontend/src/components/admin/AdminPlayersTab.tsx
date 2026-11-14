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
import {
	useAddPlayerMutation,
	useGetPlayersQuery,
	useUpdatePlayerMutation,
	type Player,
} from "../../redux/api/playersApi";

export default function AdminPlayersTab() {
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
		<Stack spacing={3}>
			<Box>
				<Typography variant="h3" component="h2" gutterBottom>
					Upravljanje igračima
				</Typography>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					Popis registriranih igrača lige i brzo dodavanje novih članova.
				</Typography>
			</Box>

			<Card
				variant="outlined"
				sx={{
					backgroundColor: "background.paper",
					borderColor: "divider",
					borderRadius: "1rem",
				}}
			>
				<CardContent>
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

					{/* Quick add form */}
					<Box
						component="form"
						onSubmit={handleAddSubmit}
						sx={{
							p: 2,
							borderRadius: "12px",
							backgroundColor: "action.hover",
							border: "1px solid",
							borderColor: "divider",
							mb: 3,
						}}
					>
						<Typography variant="subtitle1" sx={{ color: "text.primary", mb: 2 }}>
							Novi igrač
						</Typography>
						<Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
							<TextField
								size="small"
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
								size="medium"
								disabled={isAdding}
								startIcon={<AddIcon />}
								sx={{
									borderRadius: "20px",
									px: 3,
									fontWeight: 600,
									textTransform: "none",
									whiteSpace: "nowrap",
								}}
							>
								{isAdding ? "Dodavanje…" : "Dodaj igrača"}
							</Button>
						</Stack>
					</Box>

					{/* Players table */}
					<Box sx={{ mt: 1 }}>
						{isFetching ? (
							<CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
						) : (
							<TableContainer>
								<Table size="small">
									<TableHead>
										<TableRow>
											<TableCell sx={{ color: "text.primary", fontWeight: "bold", width: 70 }}>
												ID
											</TableCell>
											<TableCell sx={{ color: "text.primary", fontWeight: "bold" }}>
												Ime i prezime
											</TableCell>
											<TableCell align="right" sx={{ color: "text.primary", fontWeight: "bold" }}>
												Akcije
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{playersList?.map((player) => (
											<TableRow
												key={player.id}
												sx={{ "&:hover": { backgroundColor: "action.hover" } }}
											>
												<TableCell sx={{ color: "text.secondary" }}>
													#{player.id}
												</TableCell>
												<TableCell sx={{ color: "text.primary", fontWeight: 500 }}>
													{player.name}
												</TableCell>
												<TableCell align="right">
													<IconButton
														color="primary"
														onClick={() => handleOpenEditModal(player)}
														aria-label={`Uredi ${player.name}`}
														size="small"
													>
														<EditIcon fontSize="small" />
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
