import {
	Alert,
	Box,
	Button,
	Chip,
	CircularProgress,
	Divider,
	FormControl,
	IconButton,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	TextField,
	Typography,
	type SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useMemo, useState, type FormEvent } from "react";
import { useGetSeasonsQuery } from "../../redux/api/seasonsApi";
import { useGetTeamsQuery } from "../../redux/api/teamsApi";
import { useAddMatchWithDetailsMutation } from "../../redux/api/matchesApi";
import { useGetTeamMembersQuery } from "../../redux/api/teamMembersApi";

interface SetRow {
	setNumber: number;
	firstTeamGoals: number;
	secondTeamGoals: number;
}

const MenuProps = {
	slotProps: {
		paper: {
			style: { maxHeight: 48 * 4.5 + 8, width: 280 },
		},
	},
};

export default function AddMatch() {
	const { data: seasonsList, isLoading: seasonsLoading } = useGetSeasonsQuery();
	const { data: teamsList, isLoading: teamsLoading } = useGetTeamsQuery();
	const [addMatchWithDetails, { isLoading: isSaving }] = useAddMatchWithDetailsMutation();

	const [selectedSeason, setSelectedSeason] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [sets, setSets] = useState<SetRow[]>([{ setNumber: 1, firstTeamGoals: 0, secondTeamGoals: 0 }]);
	const [firstTeamPlayerIds, setFirstTeamPlayerIds] = useState<number[]>([]);
	const [secondTeamPlayerIds, setSecondTeamPlayerIds] = useState<number[]>([]);
	const [successMsg, setSuccessMsg] = useState<string>("");
	const [formError, setFormError] = useState<string>("");

	// Uvijek postoje samo Bijeli i Crni - dohvati ih automatski, korisnik ih ne bira
	const firstTeam = teamsList?.find((team) => team.name === "Bijeli");
	const secondTeam = teamsList?.find((team) => team.name === "Crni");

	const firstTeamId = firstTeam ? String(firstTeam.id) : "";
	const secondTeamId = secondTeam ? String(secondTeam.id) : "";

	const handleSeasonChange = (value: string) => {
		setSelectedSeason(value);
		setFirstTeamPlayerIds([]);
		setSecondTeamPlayerIds([]);
	};

	// Igrače nudimo samo iz sastava odabrane ekipe (team_members) - isto
	// pravilo koje backend validira, pa korisnik ne može ni odabrati krivo
	const { data: firstTeamMembersRaw, isLoading: firstTeamMembersLoading } = useGetTeamMembersQuery(
		Number(firstTeamId)
	);
	const { data: secondTeamMembersRaw, isLoading: secondTeamMembersLoading } = useGetTeamMembersQuery(
		Number(secondTeamId)
	);

	// Zaštita: ako backend/baza vrati duplicirane retke za istog igrača
	// (isti playerId dvaput), makni duplikate prije renderiranja - inače
	// React puca na "two children with the same key"
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

	const handleFirstPlayersChange = (event: SelectChangeEvent<number[]>) => {
		const { value } = event.target;
		setFirstTeamPlayerIds(typeof value === "string" ? value.split(",").map(Number) : value);
	};

	const handleSecondPlayersChange = (event: SelectChangeEvent<number[]>) => {
		const { value } = event.target;
		setSecondTeamPlayerIds(typeof value === "string" ? value.split(",").map(Number) : value);
	};

	const handleSelectAllFirstTeam = () => setFirstTeamPlayerIds(firstTeamMembers?.map((m) => m.playerId) ?? []);
	const handleClearFirstTeam = () => setFirstTeamPlayerIds([]);
	const handleRemoveFirstTeamPlayer = (id: number) =>
		setFirstTeamPlayerIds((prev) => prev.filter((pid) => pid !== id));

	const handleSelectAllSecondTeam = () => setSecondTeamPlayerIds(secondTeamMembers?.map((m) => m.playerId) ?? []);
	const handleClearSecondTeam = () => setSecondTeamPlayerIds([]);
	const handleRemoveSecondTeamPlayer = (id: number) =>
		setSecondTeamPlayerIds((prev) => prev.filter((pid) => pid !== id));

	const resetForm = () => {
		setSets([{ setNumber: 1, firstTeamGoals: 0, secondTeamGoals: 0 }]);
		setFirstTeamPlayerIds([]);
		setSecondTeamPlayerIds([]);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
		} catch (err: unknown) {
			const apiError = err as { data?: { message?: string } };
			setFormError(apiError?.data?.message || "Greška pri spremanju utakmice.");
		}
	};

	const renderPlayerChips = (
		selected: number[],
		members: { playerId: number; playerName: string }[] | undefined,
		onRemove: (id: number) => void
	) => (
		<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
			{selected.map((id) => {
				const player = members?.find((m) => m.playerId === id);
				return (
					<Chip
						key={id}
						label={player?.playerName ?? id}
						size="small"
						onDelete={() => onRemove(id)}
						// spriječi da klik na X otvori/zatvori Select (klik bi inače "propao" na input ispod)
						onMouseDown={(e) => e.stopPropagation()}
					/>
				);
			})}
		</Box>
	);

	return (
		<Stack spacing={4}>
			<Typography variant="h4" gutterBottom sx={{ color: "#fff", fontWeight: "bold", mb: 4 }}>
				Dodaj utakmicu
			</Typography>

			{successMsg && <Alert severity="success">{successMsg}</Alert>}
			{formError && <Alert severity="error">{formError}</Alert>}

			<Box component="form" onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<TextField
						select
						label="Sezona"
						value={selectedSeason}
						onChange={(e) => handleSeasonChange(e.target.value)}
						disabled={seasonsLoading}
						helperText="Odaberi sezonu"
					>
						{seasonsList?.map((season) => (
							<MenuItem key={season.id} value={season.id}>
								{season.name}
							</MenuItem>
						))}
					</TextField>

					<Stack direction="row" spacing={2}>
						<TextField
							label="Prva ekipa"
							value={teamsLoading ? "Učitavanje…" : firstTeam?.name ?? "—"}
							InputProps={{ readOnly: true }}
							disabled
							fullWidth
						/>
						<TextField
							label="Druga ekipa"
							value={teamsLoading ? "Učitavanje…" : secondTeam?.name ?? "—"}
							InputProps={{ readOnly: true }}
							disabled
							fullWidth
						/>
					</Stack>

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
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>

					<Divider />

					<Typography variant="h6" sx={{ color: "#fff" }}>
						Setovi
					</Typography>
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
									label={`Golovi ${firstTeam?.name}`}
									type="number"
									value={set.firstTeamGoals}
									onChange={(e) =>
										handleSetFieldChange(index, "firstTeamGoals", Number(e.target.value))
									}
									inputProps={{ min: 0 }}
									fullWidth
								/>
								<TextField
									label={`Golovi ${secondTeam?.name}`}
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

					<Typography variant="h6" sx={{ color: "#fff" }}>
						Igrači
					</Typography>
					<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
						<Stack sx={{ width: "100%" }} spacing={1}>
							<FormControl sx={{ width: "100%" }} disabled={!firstTeam || firstTeamMembersLoading}>
								<InputLabel id="first-team-players-label">
									Igrači - {firstTeam?.name ?? "prva ekipa"}
								</InputLabel>
								<Select
									labelId="first-team-players-label"
									multiple
									value={firstTeamPlayerIds}
									onChange={handleFirstPlayersChange}
									input={<OutlinedInput label={`Igrači - ${firstTeam?.name ?? "prva ekipa"}`} />}
									renderValue={(selected) =>
										renderPlayerChips(selected, firstTeamMembers, handleRemoveFirstTeamPlayer)
									}
									MenuProps={MenuProps}
								>
									{firstTeamMembers?.map((member) => {
										const isSelected = firstTeamPlayerIds.includes(member.playerId);
										const SelectionIcon = isSelected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

										return (
											<MenuItem key={member.playerId} value={member.playerId}>
												<SelectionIcon fontSize="small" style={{ marginRight: 8 }} />
												<ListItemText primary={member.playerName} />
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
							<Stack direction="row" spacing={1}>
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
							</Stack>
						</Stack>

						<Stack sx={{ width: "100%" }} spacing={1}>
							<FormControl sx={{ width: "100%" }} disabled={!secondTeam || secondTeamMembersLoading}>
								<InputLabel id="second-team-players-label">
									Igrači - {secondTeam?.name ?? "druga ekipa"}
								</InputLabel>
								<Select
									labelId="second-team-players-label"
									multiple
									value={secondTeamPlayerIds}
									onChange={handleSecondPlayersChange}
									input={<OutlinedInput label={`Igrači - ${secondTeam?.name ?? "druga ekipa"}`} />}
									renderValue={(selected) =>
										renderPlayerChips(selected, secondTeamMembers, handleRemoveSecondTeamPlayer)
									}
									MenuProps={MenuProps}
								>
									{secondTeamMembers?.map((member) => {
										const isSelected = secondTeamPlayerIds.includes(member.playerId);
										const SelectionIcon = isSelected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

										return (
											<MenuItem key={member.playerId} value={member.playerId}>
												<SelectionIcon fontSize="small" style={{ marginRight: 8 }} />
												<ListItemText primary={member.playerName} />
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
							<Stack direction="row" spacing={1}>
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
							</Stack>
						</Stack>
					</Stack>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						size="large"
						disabled={isSaving}
						sx={{ mt: 2 }}
					>
						{isSaving ? <CircularProgress size={24} /> : "Spremi utakmicu"}
					</Button>
				</Stack>
			</Box>
		</Stack>
	);
}
