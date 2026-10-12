import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { useGetTeamsQuery } from "../../redux/api/teamsApi";
import { useState } from "react";
import { useGetPlayersQuery } from "../../redux/api/playersApi";
import React from "react";
import { useAddTeamMembersMutation } from "../../redux/api/teamMembersApi";

export default function AdminAddTeamMembersTab() {
	const theme = useTheme();
	const [addTeamMembers, { isLoading: isAdding }] = useAddTeamMembersMutation();
	const { data: playersList } = useGetPlayersQuery();
	const { data: teamsList } = useGetTeamsQuery();
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
	return (
		<Stack spacing={4}>
			<Box>
				<Typography variant="h3" component="h2" gutterBottom>
					Upravljanje članovima tima
				</Typography>
			</Box>

			<Card variant="outlined" sx={{ background: "#1E1F1E", borderColor: "#2E302F" }}>
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

					{teamsList && (
						<Box component="form" onSubmit={handleSubmit}>
							<Stack spacing={3}>
								<FormControl component="fieldset">
									<FormLabel
										id="team-select-label"
										sx={{ color: "rgba(255, 255, 255, 0.7)", "&.Mui-focused": { color: "#fff" } }}
									>
										Odaberi tim
									</FormLabel>
									<RadioGroup
										row
										aria-labelledby="team-select-label"
										name="team-select"
										value={selectedTeam ?? ""}
										onChange={(e) => setSelectedTeam(Number(e.target.value))}
									>
										{teamsList.map((team) => (
											<FormControlLabel
												key={team.id}
												value={team.id}
												control={
													<Radio
														sx={{
															color: "rgba(255, 255, 255, 0.7)",
															"&.Mui-checked": { color: "#fff" },
														}}
													/>
												}
												label={
													team.seasonName ? `${team.name} (${team.seasonName})` : team.name
												}
												sx={{ color: "#fff" }}
											/>
										))}
									</RadioGroup>
								</FormControl>
								<Box sx={{ mt: 1 }}>
									<Stack
										direction="row"
										spacing={1}
										alignItems="center"
										justifyContent="space-between"
										sx={{ mb: 1 }}
									>
										<Typography sx={{ fontWeight: "medium", color: "#fff" }}>Igrači</Typography>
										<Box>
											<Button
												size="small"
												onClick={() => setPersonName(playersList?.map((p) => p.id) ?? [])}
												disabled={!playersList?.length}
												sx={{ color: "#fff" }}
											>
												Odaberi sve
											</Button>
											<Button
												size="small"
												color="inherit"
												onClick={() => setPersonName([])}
												disabled={!personName.length}
												sx={{ color: "rgba(255, 255, 255, 0.7)" }}
											>
												Očisti
											</Button>
										</Box>
									</Stack>
									{playersList && (
										<Box
											sx={{
												display: "grid",
												gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
												backgroundColor: theme.palette.background.paper,
												padding: 2,
												gap: 1,
												borderRadius: 2,
											}}
										>
											{playersList.map((player) => (
												<FormControlLabel
													key={player.id}
													control={
														<Checkbox
															checked={personName.includes(player.id)}
															onChange={() => {
																setPersonName((prev) =>
																	prev.includes(player.id)
																		? prev.filter((id) => id !== player.id)
																		: [...prev, player.id]
																);
															}}
															sx={{
																color: "rgba(255, 255, 255, 0.7)",
																"&.Mui-checked": { color: "#fff" },
															}}
														/>
													}
													label={
														<Typography variant="body2" sx={{ color: "#fff" }}>
															{player.name}
														</Typography>
													}
												/>
											))}
										</Box>
									)}
								</Box>
								<Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
									<Button
										type="submit"
										variant="contained"
										color="primary"
										size="large"
										disabled={isAdding}
										sx={{ mt: 2 }}
									>
										Spremi Članove
									</Button>
								</Stack>
							</Stack>
						</Box>
					)}
				</CardContent>
			</Card>
		</Stack>
	);
}
