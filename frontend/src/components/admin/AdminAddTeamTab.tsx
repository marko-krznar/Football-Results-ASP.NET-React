import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	FormControlLabel,
	FormLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { useAddTeamMutation } from "../../redux/api/teamsApi";
import { useState } from "react";
import { useGetPlayersQuery } from "../../redux/api/playersApi";
import { useGetSeasonsQuery } from "../../redux/api/seasonsApi";

export default function AdminAddTeamTab() {
	const theme = useTheme();
	const [addTeam, { isLoading: isAdding }] = useAddTeamMutation();
	const { data: playersList } = useGetPlayersQuery();
	const { data: seasonsList } = useGetSeasonsQuery();
	const [successMsg, setSuccessMsg] = useState<string>("");
	const [formError, setFormError] = useState<string>("");
	const [selectedTeam, setSelectedTeam] = useState("");
	const [selectedSeason, setSelectedSeason] = useState("");
	const [selectedCaptain, setSelectedCaptain] = useState("");
	const teamName = [
		{
			value: "bijeli",
			label: "Bijeli",
		},
		{
			value: "crni",
			label: "Crni",
		},
	];

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();

		try {
			await addTeam({
				name: selectedTeam,
				SeasonId: Number(selectedSeason),
				CaptainId: Number(selectedCaptain),
			}).unwrap();

			setSuccessMsg("Tim je uspješno kreiran!");
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
					Upravljanje timovima
				</Typography>
			</Box>

			<Card variant="outlined" sx={{ background: theme.palette.grey[900] }}>
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

					<Box component="form" onSubmit={handleSubmit}>
						<Stack spacing={3}>
							<FormControl component="fieldset">
								<FormLabel id="team-color-label">Tim</FormLabel>
								<RadioGroup
									row
									aria-labelledby="team-color-label"
									name="team-color"
									value={selectedTeam}
									onChange={(e) => setSelectedTeam(e.target.value)}
								>
									{teamName.map((option) => (
										<FormControlLabel
											key={option.value}
											value={option.label}
											control={
												<Radio
													sx={{
														color: "rgba(255, 255, 255, 0.7)",
														"&.Mui-checked": { color: "#fff" },
													}}
												/>
											}
											label={option.label}
											sx={{ color: "#fff" }}
										/>
									))}
								</RadioGroup>
							</FormControl>
							{seasonsList && (
								<TextField
									id="outlined-select-season"
									select
									label="Sezona"
									value={selectedSeason}
									onChange={(e) => setSelectedSeason(e.target.value)}
									fullWidth
								>
									{seasonsList.map((seasson) => (
										<MenuItem key={seasson.id} value={seasson.id}>
											{seasson.name}
										</MenuItem>
									))}
								</TextField>
							)}
							{playersList && (
								<TextField
									id="outlined-select-currency"
									select
									label="Kapetan"
									value={selectedCaptain}
									onChange={(e) => setSelectedCaptain(e.target.value)}
									fullWidth
								>
									{playersList.map((player) => (
										<MenuItem key={player.id} value={player.id}>
											{player.name}
										</MenuItem>
									))}
								</TextField>
							)}
							<Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
								<Button
									type="submit"
									variant="contained"
									color="primary"
									size="large"
									disabled={isAdding}
									sx={{ mt: 2 }}
								>
									Spremi Tim
								</Button>
							</Stack>
						</Stack>
					</Box>
				</CardContent>
			</Card>
		</Stack>
	);
}
