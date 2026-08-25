import {
	Alert,
	Box,
	Button,
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useGetMatchByIdQuery, useUpdateMatchWithDetailsMutation } from "../../redux/api/matchesApi";
import { useGetSetsQuery } from "../../redux/api/setsApi";
import { useGetMatchPlayersQuery } from "../../redux/api/matchPlayersApi";
import { useGetTeamMembersQuery } from "../../redux/api/teamMembersApi";

interface SetRow {
	setNumber: number;
	firstTeamGoals: number;
	secondTeamGoals: number;
}

interface EditMatchModalProps {
	open: boolean;
	matchId: number | null;
	onClose: () => void;
}

export default function EditMatchModal({ open, matchId, onClose }: EditMatchModalProps) {
	const { data: match } = useGetMatchByIdQuery(matchId ?? 0, { skip: !matchId });
	const { data: setsData } = useGetSetsQuery(matchId ?? 0, { skip: !matchId });
	const { data: matchPlayers } = useGetMatchPlayersQuery(matchId ?? 0, { skip: !matchId });
	const [updateMatchWithDetails] = useUpdateMatchWithDetailsMutation();
	const { data: BlackTeamPlayers } = useGetTeamMembersQuery(2);
	const { data: WhiteTeamPlayers } = useGetTeamMembersQuery(1);

	const MatchBlackTeamPlayerIds =
		matchPlayers && matchPlayers.filter((player) => player.teamId === 2).map((player) => player.playerId);
	const MatchWhiteTeamPlayerIds =
		matchPlayers && matchPlayers.filter((player) => player.teamId === 1).map((player) => player.playerId);

	const [date, setDate] = useState<string>("");
	const [sets, setSets] = useState<SetRow[]>([]);
	const [firstTeamPlayerIds, setFirstTeamPlayerIds] = useState<number[]>([]);
	const [secondTeamPlayerIds, setSecondTeamPlayerIds] = useState<number[]>([]);
	const [formError, setFormError] = useState("");

	useEffect(() => {
		if (match) {
			setDate(match.date);
		}
		if (setsData) {
			setSets(
				setsData.map((s) => ({
					setNumber: s.setNumber,
					firstTeamGoals: s.firstTeamGoals,
					secondTeamGoals: s.secondTeamGoals,
				}))
			);
		}
		if (matchPlayers) {
			setFirstTeamPlayerIds(MatchWhiteTeamPlayerIds ?? []);
			setSecondTeamPlayerIds(MatchBlackTeamPlayerIds ?? []);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [match, setsData, matchPlayers, open]);

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

	const handleSelectAllFirstTeam = () => {
		if (WhiteTeamPlayers === undefined) return;
		setFirstTeamPlayerIds(WhiteTeamPlayers.map((m) => m.playerId));
	};

	const handleClearFirstTeam = () => setFirstTeamPlayerIds([]);

	const handleSelectAllSecondTeam = () => {
		if (BlackTeamPlayers === undefined) return;
		setSecondTeamPlayerIds(BlackTeamPlayers.map((m) => m.playerId));
	};
	const handleClearSecondTeam = () => setSecondTeamPlayerIds([]);

	const handleSaveChanges = async () => {
		if (!matchId) return;

		try {
			await updateMatchWithDetails({
				id: matchId,
				date,
				sets,
				firstTeamPlayerIds,
				secondTeamPlayerIds,
			}).unwrap();
		} catch (err: unknown) {
			const apiError = err as { data?: { message?: string } };
			setFormError(apiError?.data?.message || "Greška pri ažuriranju utakmice.");
		}
	};
	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>Uredi utakmicu</DialogTitle>
			<DialogContent dividers>
				<Stack spacing={3}>
					<TextField
						label="Datum"
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						fullWidth
						slotProps={{ inputLabel: { shrink: true } }}
					/>

					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
								/>
								<TextField
									label={`Golovi ${match?.firstTeamName}`}
									type="number"
									value={set.firstTeamGoals}
									onChange={(e) =>
										handleSetFieldChange(index, "firstTeamGoals", Number(e.target.value))
									}
								/>
								<TextField
									label={`Golovi ${match?.secondTeamName}`}
									type="number"
									value={set.secondTeamGoals}
									onChange={(e) =>
										handleSetFieldChange(index, "secondTeamGoals", Number(e.target.value))
									}
									fullWidth
								/>
								<IconButton
									aria-label="Ukloni set"
									onClick={() => handleRemoveSetRow(index)}
									disabled={sets.length === 1}
									color="error"
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

					<Stack spacing={4}>
						<Box>
							<Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
								<Typography>Igrači - {match?.firstTeamName}</Typography>
								<Box>
									<Button size="small" onClick={handleSelectAllFirstTeam}>
										Odaberi sve
									</Button>
									<Button size="small" color="inherit" onClick={handleClearFirstTeam}>
										Očisti
									</Button>
								</Box>
							</Stack>
							{WhiteTeamPlayers && (
								<Box>
									{WhiteTeamPlayers.map((member) => (
										<FormControlLabel
											key={member.id}
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

						<Box>
							<Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
								<Typography>Igrači - {match?.secondTeamName}</Typography>
								<Box>
									<Button size="small" onClick={handleSelectAllSecondTeam}>
										Odaberi sve
									</Button>
									<Button size="small" color="inherit" onClick={handleClearSecondTeam}>
										Očisti
									</Button>
								</Box>
							</Stack>
							{BlackTeamPlayers && (
								<Box>
									{BlackTeamPlayers.map((member) => (
										<FormControlLabel
											key={member.id}
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
			<DialogActions sx={{ flexDirection: "column", alignItems: "stretch", gap: 1 }}>
				{formError && (
					<Alert severity="error" onClose={() => setFormError("")}>
						{formError}
					</Alert>
				)}
				<Stack direction="row" justifyContent="flex-end" spacing={1}>
					<Button onClick={onClose} color="inherit">
						Odustani
					</Button>
					<Button variant="contained" color="primary" onClick={handleSaveChanges}>
						Spremi promjene
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
