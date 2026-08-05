import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Divider,
	IconButton,
	Stack,
	TextField,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Checkbox,
	FormControlLabel,
	MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo, useState } from "react";
import { useGetSeasonsQuery } from "../../redux/api/seasonsApi";
import { useGetTeamsQuery } from "../../redux/api/teamsApi";
import { useAddMatchWithDetailsMutation } from "../../redux/api/matchesApi";
import { useGetTeamMembersQuery } from "../../redux/api/teamMembersApi";
import { getCurrentDate } from "../../utils/matchUtils";

interface SetRow {
	setNumber: number;
	firstTeamGoals: number;
	secondTeamGoals: number;
}

interface AddMatchProps {
	open: boolean;
	onClose: () => void;
}

export default function AddMatchModal({ open, onClose }: AddMatchProps) {
	const { data: seasonsList, isLoading: seasonsLoading } = useGetSeasonsQuery();
	const { data: teamsList, isLoading: teamsLoading } = useGetTeamsQuery();
	const [addMatchWithDetails, { isLoading: isSaving }] = useAddMatchWithDetailsMutation();

	// Uvijek postoje samo Bijeli i Crni - dohvati ih automatski, korisnik ih ne bira
	const firstTeam = teamsList?.find((team) => team.name === "Bijeli");
	const secondTeam = teamsList?.find((team) => team.name === "Crni");

	const firstTeamId = firstTeam && String(firstTeam.id);
	const secondTeamId = secondTeam && String(secondTeam.id);

	const { data: firstTeamMembersRaw } = useGetTeamMembersQuery(Number(firstTeamId));
	const { data: secondTeamMembersRaw } = useGetTeamMembersQuery(Number(secondTeamId));

	const [selectedSeason, setSelectedSeason] = useState<string>(seasonsList ? String(seasonsList[0].id) : "");
	const [date, setDate] = useState<string>(getCurrentDate());
	const [sets, setSets] = useState<SetRow[]>([{ setNumber: 1, firstTeamGoals: 0, secondTeamGoals: 0 }]);
	const [firstTeamPlayerIds, setFirstTeamPlayerIds] = useState<number[]>(
		firstTeamMembersRaw ? firstTeamMembersRaw.map((player) => player.playerId) : []
	);
	const [secondTeamPlayerIds, setSecondTeamPlayerIds] = useState<number[]>(
		secondTeamMembersRaw ? secondTeamMembersRaw.map((player) => player.playerId) : []
	);
	const [successMsg, setSuccessMsg] = useState<string>("");
	const [formError, setFormError] = useState<string>("");

	const handleSeasonChange = (value: string) => {
		setSelectedSeason(value);
		setFirstTeamPlayerIds([]);
		setSecondTeamPlayerIds([]);
	};

	const dedupeByPlayerId = (members: { playerId: number; playerName: string }[] | undefined) => {
		if (!members) return members;
		const seen = new Set<number>();
		return members.filter((m) => {
			if (seen.has(m.playerId)) return false;
			seen.add(m.playerId);
			return true;
		});
	};

	const firstTeamMembers = useMemo(() => dedupeByPlayerId(firstTeamMembersRaw), [firstTeamMembersRaw]);
	const secondTeamMembers = useMemo(() => dedupeByPlayerId(secondTeamMembersRaw), [secondTeamMembersRaw]);

	const handleSetFieldChange = (index: number, field: keyof SetRow, value: number) => {
		const minValue = field === "setNumber" ? 1 : 0;
		const safeValue = Number.isNaN(value) ? minValue : Math.max(minValue, value);

		setSets((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: safeValue } : s)));
	};

	const handleAddSetRow = () => {
		setSets((prev) => [
			...prev,
			{
				setNumber: prev.length > 0 ? prev[prev.length - 1].setNumber + 1 : 1,
				firstTeamGoals: 0,
				secondTeamGoals: 0,
			},
		]);
	};

	const handleRemoveSetRow = (index: number) => {
		setSets((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSelectAllFirstTeam = () => setFirstTeamPlayerIds(firstTeamMembers?.map((m) => m.playerId) ?? []);
	const handleClearFirstTeam = () => setFirstTeamPlayerIds([]);

	const handleSelectAllSecondTeam = () => setSecondTeamPlayerIds(secondTeamMembers?.map((m) => m.playerId) ?? []);
	const handleClearSecondTeam = () => setSecondTeamPlayerIds([]);

	const resetForm = () => {
		setSets([{ setNumber: 1, firstTeamGoals: 0, secondTeamGoals: 0 }]);
		setFirstTeamPlayerIds([]);
		setSecondTeamPlayerIds([]);
	};

	// TODO add type
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setFormError("");
		setSuccessMsg("");

		if (!selectedSeason || !date) {
			setFormError("Odaberi sezonu i datum.");
			return;
		}
		if (!firstTeam || !secondTeam) {
			setFormError("Za ovu sezonu nisu pronađene obje ekipe.");
			return;
		}
		if (sets.length === 0) {
			setFormError("Dodaj barem jedan set.");
			return;
		}

		try {
			await addMatchWithDetails({
				seasonId: Number(selectedSeason),
				date,
				firstTeamId: firstTeam.id,
				secondTeamId: secondTeam.id,
				sets,
				firstTeamPlayerIds,
				secondTeamPlayerIds,
			}).unwrap();

			setSuccessMsg("Utakmica je uspješno spremljena!");
			resetForm();
			setTimeout(() => {
				onClose();
				setSuccessMsg("");
			}, 1000);
		} catch (err: unknown) {
			const apiError = err as { data?: { message?: string } };
			setFormError(apiError?.data?.message || "Greška pri spremanju utakmice.");
		}
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pr: 2 }}>
				<Typography variant="h5" sx={{ fontWeight: "bold" }}>
					Dodaj utakmicu
				</Typography>
				<IconButton onClick={onClose} aria-label="Zatvori">
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers>
				<Stack spacing={3}>
					{successMsg && <Alert severity="success">{successMsg}</Alert>}
					{formError && <Alert severity="error">{formError}</Alert>}

					<TextField
						select
						label="Sezona"
						value={selectedSeason}
						onChange={(e) => handleSeasonChange(e.target.value)}
						disabled={seasonsLoading}
						helperText="Odaberi sezonu"
						fullWidth
					>
						{seasonsList?.map((season) => (
							<MenuItem key={season.id} value={season.id}>
								{season.name}
							</MenuItem>
						))}
					</TextField>

					{!teamsLoading && selectedSeason && (!firstTeam || !secondTeam) && (
						<Alert severity="warning">
							Za ovu sezonu nisu pronađene obje ekipe (Bijeli/Crni). Prvo ih kreiraj na stranici za ekipe.
						</Alert>
					)}

					<TextField
						label="Datum"
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						fullWidth
					/>

					<Divider />

					<Typography variant="h6">Setovi</Typography>
					<Stack spacing={2}>
						{sets.map((set, index) => (
							<Stack direction="row" spacing={2} alignItems="center" key={index}>
								<TextField
									label={`Set ${set.setNumber}`}
									type="number"
									value={set.setNumber}
									onChange={(e) => handleSetFieldChange(index, "setNumber", Number(e.target.value))}
									inputProps={{ min: 1 }}
									sx={{ width: 120 }}
								/>
								<TextField
									label={`Golovi ${firstTeam?.name ?? "Bijeli"}`}
									type="number"
									value={set.firstTeamGoals}
									onChange={(e) =>
										handleSetFieldChange(index, "firstTeamGoals", Number(e.target.value))
									}
									inputProps={{ min: 0 }}
									fullWidth
								/>
								<TextField
									label={`Golovi ${secondTeam?.name ?? "Crni"}`}
									type="number"
									value={set.secondTeamGoals}
									onChange={(e) =>
										handleSetFieldChange(index, "secondTeamGoals", Number(e.target.value))
									}
									inputProps={{ min: 0 }}
									fullWidth
								/>
								<IconButton
									aria-label="Ukloni set"
									onClick={() => handleRemoveSetRow(index)}
									disabled={sets.length === 1}
								>
									<DeleteOutlineIcon />
								</IconButton>
							</Stack>
						))}
						<Button
							startIcon={<AddIcon />}
							onClick={handleAddSetRow}
							variant="outlined"
							sx={{ alignSelf: "flex-start" }}
						>
							Dodaj set
						</Button>
					</Stack>

					<Divider />

					<Typography variant="h6">Igrači</Typography>
					<Stack direction={"column"} spacing={4}>
						<Box sx={{ flex: 1 }}>
							<Stack
								direction="row"
								spacing={1}
								alignItems="center"
								justifyContent="space-between"
								sx={{ mb: 1 }}
							>
								<Typography sx={{ fontWeight: "medium" }}>
									Igrači - {firstTeam?.name ?? "Bijeli"}
								</Typography>
								<Box>
									<Button
										size="small"
										onClick={handleSelectAllFirstTeam}
										disabled={!firstTeamMembers?.length}
									>
										Odaberi sve
									</Button>
									<Button
										size="small"
										color="inherit"
										onClick={handleClearFirstTeam}
										disabled={!firstTeamPlayerIds.length}
									>
										Očisti
									</Button>
								</Box>
							</Stack>
							{firstTeamMembers && (
								<Box>
									{firstTeamMembers.map((member) => (
										<FormControlLabel
											key={member.playerId}
											control={
												<Checkbox
													checked={firstTeamPlayerIds.includes(member.playerId)}
													onChange={() => {
														setFirstTeamPlayerIds((prev) =>
															prev.includes(member.playerId)
																? prev.filter((id) => id !== member.playerId)
																: [...prev, member.playerId]
														);
													}}
												/>
											}
											label={<Typography variant="body2">{member.playerName}</Typography>}
										/>
									))}
								</Box>
							)}
						</Box>

						<Box sx={{ flex: 1 }}>
							<Stack
								direction="row"
								spacing={1}
								alignItems="center"
								justifyContent="space-between"
								sx={{ mb: 1 }}
							>
								<Typography sx={{ fontWeight: "medium" }}>
									Igrači - {secondTeam?.name ?? "Crni"}
								</Typography>
								<Box>
									<Button
										size="small"
										onClick={handleSelectAllSecondTeam}
										disabled={!secondTeamMembers?.length}
									>
										Odaberi sve
									</Button>
									<Button
										size="small"
										color="inherit"
										onClick={handleClearSecondTeam}
										disabled={!secondTeamPlayerIds.length}
									>
										Očisti
									</Button>
								</Box>
							</Stack>
							{secondTeamMembers && (
								<Box>
									{secondTeamMembers.map((member) => (
										<FormControlLabel
											key={member.playerId}
											control={
												<Checkbox
													checked={secondTeamPlayerIds.includes(member.playerId)}
													onChange={() => {
														setSecondTeamPlayerIds((prev) =>
															prev.includes(member.playerId)
																? prev.filter((id) => id !== member.playerId)
																: [...prev, member.playerId]
														);
													}}
												/>
											}
											label={<Typography variant="body2">{member.playerName}</Typography>}
										/>
									))}
								</Box>
							)}
						</Box>
					</Stack>
				</Stack>
			</DialogContent>

			<DialogActions sx={{ p: 2 }}>
				<Button onClick={onClose} variant="outlined">
					Odustani
				</Button>
				<Button variant="contained" color="primary" disabled={isSaving} onClick={handleSubmit}>
					{isSaving ? <CircularProgress size={24} /> : "Spremi utakmicu"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
