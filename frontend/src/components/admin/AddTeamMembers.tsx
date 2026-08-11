import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControl,
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
import { useGetTeamsQuery } from "../../redux/api/teamsApi";
import { useState } from "react";
import { useGetPlayersQuery } from "../../redux/api/playersApi";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React from "react";
import { useAddTeamMembersMutation } from "../../redux/api/teamMembersApi";

export default function AddTeamMembers() {
	const [addTeamMembers, { isLoading: isAdding }] = useAddTeamMembersMutation();
	const { data: playersList, isLoading, error } = useGetPlayersQuery();
	const { data: teamsList, isLoading: teamsListIsLoading, error: teamsListError } = useGetTeamsQuery();
	const [successMsg, setSuccessMsg] = useState<string>("");
	const [formError, setFormError] = useState<string>("");
	const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
	const [personName, setPersonName] = React.useState<number[]>([]);
	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		if (selectedTeam === null || personName.length === 0) return;

		try {
			await addTeamMembers({
				teamId: selectedTeam,
				playerIds: personName,
			}).unwrap();

			setSuccessMsg("Igrači su uspješno dodani u tim!");
			setFormError("");
		} catch (err: unknown) {
			const apiError = err as { data?: { message?: string } };
			setFormError(apiError?.data?.message || "Greška pri dodavanju tima.");
		}
	};

	const handlePlayersChange = (event: SelectChangeEvent<number[]>) => {
		const { value } = event.target;
		setPersonName(typeof value === "string" ? value.split(",").map(Number) : value);
	};
	return (
		<Stack spacing={4}>
			<Typography variant="h4" gutterBottom sx={{ color: "#fff", fontWeight: "bold", mb: "1.5rem !important" }}>
				Upravljanje članovima tima
			</Typography>

			<Card variant="outlined" sx={{ background: "#1E1F1E", borderColor: "#2E302F" }}>
				<CardContent>
					<Typography variant="h6" gutterBottom sx={{ color: "#fff", mb: 3 }}>
						Dodaj članove u tim
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

					{teamsList && (
						<Box component="form" onSubmit={handleSubmit}>
							<Stack spacing={3}>
								<TextField
									id="outlined-select-currency"
									select
									label="Odaberi tim"
									fullWidth
									value={selectedTeam || ""}
									onChange={(e) => setSelectedTeam(Number(e.target.value))}
								>
									{teamsList.map((player) => (
										<MenuItem key={player.id} value={player.id}>
											{player.name}
										</MenuItem>
									))}
								</TextField>
								<FormControl fullWidth>
									<InputLabel id="demo-multiple-checkbox-label">Igrači</InputLabel>
									<Select
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										multiple
										value={personName}
										onChange={handlePlayersChange}
										input={<OutlinedInput label="Igrači" />}
										renderValue={(selected) =>
											playersList
												?.filter((p) => selected.includes(p.id))
												.map((p) => p.name)
												.join(", ")
										}
									>
										{playersList &&
											playersList.map((player) => {
												const selected = personName.includes(player.id);
												const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

												return (
													<MenuItem key={player.id} value={player.id}>
														<SelectionIcon
															fontSize="small"
															style={{
																marginRight: 8,
																padding: 9,
																boxSizing: "content-box",
															}}
														/>
														<ListItemText primary={player.name} />
													</MenuItem>
												);
											})}
									</Select>
								</FormControl>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									size="large"
									disabled={isAdding}
									sx={{ mt: 2 }}
								>
									{isAdding ? <CircularProgress size={24} /> : "Spremi Članove"}
								</Button>
							</Stack>
						</Box>
					)}
				</CardContent>
			</Card>
		</Stack>
	);
}
