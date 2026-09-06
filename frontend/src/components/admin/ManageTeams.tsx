import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Checkbox,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	IconButton,
	MenuItem,
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
import GroupIcon from "@mui/icons-material/Group";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useGetTeamsQuery, useUpdateTeamMutation, type TeamNew } from "../../redux/api/teamsApi";
import { useGetSeasonsQuery } from "../../redux/api/seasonsApi";
import { useGetPlayersQuery } from "../../redux/api/playersApi";
import {
	useGetTeamMembersQuery,
	useAddTeamMembersMutation,
	useRemoveTeamMemberMutation,
} from "../../redux/api/teamMembersApi";

export default function ManageTeams() {
	const { data: teamsList, isLoading: teamsLoading } = useGetTeamsQuery();
	const { data: seasonsList } = useGetSeasonsQuery();
	const { data: playersList } = useGetPlayersQuery();

	const [updateTeam, { isLoading: isUpdatingTeam }] = useUpdateTeamMutation();
	const [addTeamMembers, { isLoading: isAddingMembers }] = useAddTeamMembersMutation();
	const [removeTeamMember] = useRemoveTeamMemberMutation();

	// Global feedback
	const [successMsg, setSuccessMsg] = useState("");
	const [formError, setFormError] = useState("");

	// Edit Team Details State
	const [editTeamModalOpen, setEditTeamModalOpen] = useState(false);
	const [editingTeam, setEditingTeam] = useState<TeamNew | null>(null);
	const [editName, setEditName] = useState("");
	const [editSeasonId, setEditSeasonId] = useState<number | "">("");
	const [editCaptainId, setEditCaptainId] = useState<number | "">("");
	const [editTeamError, setEditTeamError] = useState("");

	// Manage Team Roster Modal State
	const [rosterModalOpen, setRosterModalOpen] = useState(false);
	const [selectedRosterTeam, setSelectedRosterTeam] = useState<TeamNew | null>(null);
	const [selectedNewPlayerIds, setSelectedNewPlayerIds] = useState<number[]>([]);
	const [rosterError, setRosterError] = useState("");

	const { data: currentMembers } = useGetTeamMembersQuery(selectedRosterTeam?.id ?? 0, {
		skip: !selectedRosterTeam,
	});

	// Handle Edit Team Details
	const handleOpenEditTeam = (team: TeamNew) => {
		setEditingTeam(team);
		setEditName(team.name);
		setEditSeasonId(team.seasonId);
		setEditCaptainId(team.captainId);
		setEditTeamError("");
		setEditTeamModalOpen(true);
	};

	const handleCloseEditTeam = () => {
		setEditTeamModalOpen(false);
		setEditingTeam(null);
		setEditTeamError("");
	};

	const handleEditTeamSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editingTeam || !editName || !editSeasonId || !editCaptainId) {
			setEditTeamError("Molimo ispunite sva polja.");
			return;
		}

		try {
			await updateTeam({
				id: editingTeam.id,
				name: editName,
				SeasonId: Number(editSeasonId),
				CaptainId: Number(editCaptainId),
			}).unwrap();

			handleCloseEditTeam();
			setSuccessMsg("Podaci o ekipi su uspješno ažurirani!");
			setFormError("");
		} catch (err: unknown) {
			const apiError = err as { data?: { message?: string } };
			setEditTeamError(apiError?.data?.message || "Greška pri ažuriranju ekipe.");
		}
	};

	// Handle Manage Team Roster
	const handleOpenRosterModal = (team: TeamNew) => {
		setSelectedRosterTeam(team);
		setSelectedNewPlayerIds([]);
		setRosterError("");
		setRosterModalOpen(true);
	};

	const handleCloseRosterModal = () => {
		setRosterModalOpen(false);
		setSelectedRosterTeam(null);
		setSelectedNewPlayerIds([]);
		setRosterError("");
	};

	const handleRemovePlayer = async (playerId: number) => {
		if (!selectedRosterTeam) return;
		setRosterError("");

		try {
			await removeTeamMember({ teamId: selectedRosterTeam.id, playerId }).unwrap();
			setSuccessMsg("Igrač je uklonjen iz ekipe!");
		} catch (err: unknown) {
			const apiError = err as { data?: { message?: string } };
			setRosterError(apiError?.data?.message || "Greška pri uklanjanju igrača.");
		}
	};

	const handleAddPlayersToTeam = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedRosterTeam || selectedNewPlayerIds.length === 0) return;
		setRosterError("");

		try {
			await addTeamMembers({
				teamId: selectedRosterTeam.id,
				playerIds: selectedNewPlayerIds,
			}).unwrap();

			setSelectedNewPlayerIds([]);
			setSuccessMsg("Novi igrači su dodani u ekipu!");
		} catch (err: unknown) {
			const apiError = err as { data?: { message?: string } };
			setRosterError(apiError?.data?.message || "Greška pri dodavanju igrača.");
		}
	};

	// Filter available players (exclude players already in team)
	const currentMemberPlayerIds = currentMembers?.map((m) => m.playerId) ?? [];
	const availablePlayersToAdd = playersList?.filter((p) => !currentMemberPlayerIds.includes(p.id)) ?? [];

	return (
		<Stack spacing={4}>
			<Typography variant="h4" gutterBottom sx={{ color: "#fff", fontWeight: "bold", mb: "1.5rem !important" }}>
				Uređivanje ekipa i sastava
			</Typography>

			<Card variant="outlined" sx={{ background: "#1E1F1E", borderColor: "#2E302F" }}>
				<CardContent>
					<Typography variant="h6" gutterBottom sx={{ color: "#fff", mb: 3 }}>
						Popis ekipa
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

					{teamsLoading ? (
						<CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
					) : (
						<TableContainer component={Paper} sx={{ background: "#121212", border: "1px solid #2E302F" }}>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Naziv ekipe</TableCell>
										<TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Sezona (Godina)</TableCell>
										<TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Kapetan</TableCell>
										<TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>Akcije</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{teamsList?.map((team) => (
										<TableRow key={team.id}>
											<TableCell sx={{ color: "#fff" }}>{team.name}</TableCell>
											<TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>{team.seasonName}</TableCell>
											<TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>{team.captainName || "-"}</TableCell>
											<TableCell align="right">
												<Stack direction="row" spacing={1} justifyContent="flex-end">
													<Button
														size="small"
														variant="outlined"
														startIcon={<EditIcon />}
														onClick={() => handleOpenEditTeam(team)}
													>
														Uredi
													</Button>
													<Button
														size="small"
														variant="contained"
														color="secondary"
														startIcon={<GroupIcon />}
														onClick={() => handleOpenRosterModal(team)}
													>
														Igrači
													</Button>
												</Stack>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</CardContent>
			</Card>

			{/* Edit Team Details Dialog */}
			<Dialog open={editTeamModalOpen} onClose={handleCloseEditTeam} maxWidth="xs" fullWidth>
				<DialogTitle>Uredi ekipu</DialogTitle>
				<Box component="form" onSubmit={handleEditTeamSubmit}>
					<DialogContent>
						<Stack spacing={2} sx={{ mt: 1 }}>
							{editTeamError && <Alert severity="error">{editTeamError}</Alert>}
							<TextField
								label="Naziv ekipe"
								value={editName}
								onChange={(e) => setEditName(e.target.value)}
								fullWidth
								required
							/>
							<TextField
								select
								label="Sezona (Godina)"
								value={editSeasonId}
								onChange={(e) => setEditSeasonId(Number(e.target.value))}
								fullWidth
								required
							>
								{seasonsList?.map((season) => (
									<MenuItem key={season.id} value={season.id}>
										{season.name}
									</MenuItem>
								))}
							</TextField>
							<TextField
								select
								label="Kapetan"
								value={editCaptainId}
								onChange={(e) => setEditCaptainId(Number(e.target.value))}
								fullWidth
								required
							>
								{playersList?.map((player) => (
									<MenuItem key={player.id} value={player.id}>
										{player.name}
									</MenuItem>
								))}
							</TextField>
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseEditTeam} variant="outlined">
							Odustani
						</Button>
						<Button type="submit" variant="contained" color="primary" disabled={isUpdatingTeam}>
							{isUpdatingTeam ? <CircularProgress size={24} /> : "Spremi promjene"}
						</Button>
					</DialogActions>
				</Box>
			</Dialog>

			{/* Manage Team Roster Modal */}
			<Dialog open={rosterModalOpen} onClose={handleCloseRosterModal} maxWidth="sm" fullWidth>
				<DialogTitle>
					Igrači ekipe - {selectedRosterTeam?.name} ({selectedRosterTeam?.seasonName})
				</DialogTitle>
				<DialogContent dividers>
					<Stack spacing={3}>
						{rosterError && <Alert severity="error">{rosterError}</Alert>}

						<Box>
							<Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
								Trenutni igrači u ekipi:
							</Typography>
							{currentMembers && currentMembers.length > 0 ? (
								<TableContainer component={Paper} variant="outlined">
									<Table size="small">
										<TableHead>
											<TableRow>
												<TableCell>Ime igrača</TableCell>
												<TableCell align="right">Ukloni</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{currentMembers.map((member) => (
												<TableRow key={member.id}>
													<TableCell>{member.playerName}</TableCell>
													<TableCell align="right">
														<IconButton
															color="error"
															size="small"
															onClick={() => handleRemovePlayer(member.playerId)}
															aria-label={`Ukloni ${member.playerName}`}
														>
															<DeleteOutlineIcon fontSize="small" />
														</IconButton>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							) : (
								<Typography variant="body2" color="text.secondary">
									Ova ekipa trenutno nema dodanih igrača.
								</Typography>
							)}
						</Box>

						{/* Form to add available players */}
						<Box component="form" onSubmit={handleAddPlayersToTeam}>
							<Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
								Dodaj nove igrače u ekipu:
							</Typography>
							{availablePlayersToAdd.length > 0 ? (
								<Stack spacing={2}>
									<Box
										sx={{
											maxHeight: 200,
											overflowY: "auto",
											p: 1,
											border: "1px solid rgba(255,255,255,0.12)",
											borderRadius: 1,
										}}
									>
										{availablePlayersToAdd.map((player) => (
											<FormControlLabel
												key={player.id}
												control={
													<Checkbox
														checked={selectedNewPlayerIds.includes(player.id)}
														onChange={() => {
															setSelectedNewPlayerIds((prev) =>
																prev.includes(player.id)
																	? prev.filter((id) => id !== player.id)
																	: [...prev, player.id]
															);
														}}
													/>
												}
												label={player.name}
												sx={{ display: "block" }}
											/>
										))}
									</Box>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										disabled={isAddingMembers || selectedNewPlayerIds.length === 0}
										startIcon={<AddIcon />}
									>
										{isAddingMembers ? <CircularProgress size= {24} /> : "Dodaj odabrane igrače"}
									</Button>
								</Stack>
							) : (
								<Typography variant="body2" color="text.secondary">
									Svi dostupni igrači su već u ovoj ekipi.
								</Typography>
							)}
						</Box>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseRosterModal} variant="outlined">
						Zatvori
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
}
