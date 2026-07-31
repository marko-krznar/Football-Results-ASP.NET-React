import { Box, Button, CircularProgress, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useAddTeamMutation, useGetTeamsQuery } from "../../redux/api/teamsApi";
import { useState } from "react";
import { useGetPlayersQuery } from "../../redux/api/playersApi";
import { useGetSeasonsQuery } from "../../redux/api/seasonsApi";

export default function AddTeam() {
	const [addTeam, { isLoading: isAdding }] = useAddTeamMutation();
	const { data: playersList, isLoading, error } = useGetPlayersQuery();
	const { data: seasonsList, isLoading: seasonsListIsLoading, error: seasonsListError } = useGetSeasonsQuery();
	const { data: teamsList, isLoading: teamsListIsLoading, error: teamsListError } = useGetTeamsQuery();
	const [successMsg, setSuccessMsg] = useState<string>("");
	const [formError, setFormError] = useState<string>("");
	const [selectedTeam, setSelectedTeam] = useState("");
	const [selectedSeason, setSelectedSeason] = useState("");
	const [selectedCaptain, setSelectedCaptain] = useState("");

	console.log(playersList, isLoading, error);
	console.log(seasonsList, seasonsListIsLoading, seasonsListError);
	console.log(teamsList, teamsListIsLoading, teamsListError);

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
			<Typography variant="h4" gutterBottom sx={{ color: "#fff", fontWeight: "bold", mb: 4 }}>
				Upravljanje timovima
			</Typography>

			{isAdding && <CircularProgress size={30} />}
			{successMsg && <h1>{successMsg}</h1>}
			{formError && <h1>{formError}</h1>}
			<Box component="form" onSubmit={handleSubmit}>
				<TextField
					id="outlined-select-team-name"
					select
					label="Tim"
					value={selectedTeam}
					onChange={(e) => setSelectedTeam(e.target.value)}
					helperText="Odaberi boju tima"
				>
					{teamName.map((option) => (
						<MenuItem key={option.value} value={option.label}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				{seasonsList && (
					<TextField
						id="outlined-select-season"
						select
						label="Sezona"
						value={selectedSeason}
						onChange={(e) => setSelectedSeason(e.target.value)}
						helperText="Odaberi sezonu"
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
						helperText="Odaberi kapetana"
					>
						{playersList.map((player) => (
							<MenuItem key={player.id} value={player.id}>
								{player.name}
							</MenuItem>
						))}
					</TextField>
				)}
				<Stack spacing={3}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						size="large"
						disabled={isAdding}
						sx={{ mt: 2 }}
					>
						{isAdding ? <CircularProgress size={24} /> : "Spremi Tim"}
					</Button>
				</Stack>
			</Box>
		</Stack>
	);
}
