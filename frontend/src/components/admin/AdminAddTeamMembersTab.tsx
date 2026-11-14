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
} from "@mui/material";
import { useGetTeamsQuery } from "../../redux/api/teamsApi";
import { useState } from "react";
import { useGetPlayersQuery } from "../../redux/api/playersApi";
import React from "react";
import { useAddTeamMembersMutation } from "../../redux/api/teamMembersApi";

export default function AdminAddTeamMembersTab() {
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
		<Stack spacing={3}>
			<Box>
				<Typography variant="h3" component="h2" gutterBottom>
					Upravljanje članovima tima
				</Typography>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					Grupni odabir i dodjela igrača u odabranu ekipu.
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

					{teamsList && (
						<Box component="form" onSubmit={handleSubmit}>
							<Stack spacing={3}>
								<FormControl component="fieldset">
									<FormLabel
										id="team-select-label"
										sx={{ color: "text.secondary", "&.Mui-focused": { color: "primary.main" } }}
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
												control={<Radio color="primary" />}
												label={
													team.seasonName ? `${team.name} (${team.seasonName})` : team.name
												}
												sx={{ color: "text.primary" }}
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
										sx={{ mb: 1.5 }}
									>
										<Typography sx={{ fontWeight: 600, color: "text.primary" }}>Igrači</Typography>
										<Box>
											<Button
												size="small"
												onClick={() => setPersonName(playersList?.map((p) => p.id) ?? [])}
												disabled={!playersList?.length}
												sx={{ color: "primary.main", textTransform: "none", fontWeight: 600 }}
											>
												Odaberi sve
											</Button>
											<Button
												size="small"
												onClick={() => setPersonName([])}
												disabled={!personName.length}
												sx={{ color: "text.secondary", textTransform: "none" }}
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
												backgroundColor: "action.hover",
												border: "1px solid",
												borderColor: "divider",
												padding: 2,
												gap: 1,
												borderRadius: "12px",
											}}
										>
											{playersList.map((player) => (
												<FormControlLabel
													key={player.id}
													control={
														<Checkbox
															color="primary"
															checked={personName.includes(player.id)}
															onChange={() => {
																setPersonName((prev) =>
																	prev.includes(player.id)
																		? prev.filter((id) => id !== player.id)
																		: [...prev, player.id]
																);
															}}
														/>
													}
													label={
														<Typography variant="body2" sx={{ color: "text.primary" }}>
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
										size="medium"
										disabled={isAdding}
										sx={{
											mt: 2,
											borderRadius: "20px",
											px: 3,
											fontWeight: 600,
											textTransform: "none",
										}}
									>
										{isAdding ? "Spremanje…" : "Spremi članove"}
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
