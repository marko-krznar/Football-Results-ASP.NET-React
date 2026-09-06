import { Box, Typography, Container, Stack, Divider, CircularProgress, Alert } from "@mui/material";
import { useGetTeamMembersQuery } from "../redux/api/teamMembersApi";
import { useGetTeamsQuery } from "../redux/api/teamsApi";
import { useSelectedSeason } from "../redux/hooks";
import type { SerializedError } from "@reduxjs/toolkit";
import PlayerCard from "../components/teams/PlayerCard";

export default function Teams() {
	const selectedSeasonId = useSelectedSeason();
	const { data: teamsList } = useGetTeamsQuery();

	const seasonTeams = teamsList?.filter((t) => !selectedSeasonId || t.seasonId === selectedSeasonId);
	const blackTeam = seasonTeams?.find((t) => t.name === "Crni") || teamsList?.find((t) => t.name === "Crni");
	const whiteTeam = seasonTeams?.find((t) => t.name === "Bijeli") || teamsList?.find((t) => t.name === "Bijeli");

	const blackTeamId = blackTeam?.id ?? 2;
	const whiteTeamId = whiteTeam?.id ?? 1;

	const {
		data: blackPlayers,
		isLoading: blackPlayersIsLoading,
		error: blackPlayersError,
	} = useGetTeamMembersQuery(blackTeamId, { skip: !blackTeamId });
	const {
		data: whitePlayers,
		isLoading: whitePlayersIsLoading,
		error: whitePlayersError,
	} = useGetTeamMembersQuery(whiteTeamId, { skip: !whiteTeamId });

	const error = blackPlayersError || whitePlayersError;

	return (
		<Container maxWidth="xl">
			<Stack
				alignItems="flex-start"
				gap={2}
				paddingBlock={4}
				sx={{
					flexDirection: { xs: "column", md: "row" },
				}}
			>
				{error && (
					<Alert sx={{ width: "100%" }} severity="error">
						{"status" in error && error.status
							? typeof error.data === "string"
								? error.data
								: `Error: ${error.status}`
							: (error as SerializedError).message || "An unknown error occurred."}
					</Alert>
				)}
				{(blackPlayersIsLoading || whitePlayersIsLoading) && !error && (
					<Box sx={{ width: "100%", textAlign: "center", padding: 4 }}>
						<CircularProgress aria-label="Loading…" />
					</Box>
				)}
				{(blackPlayers || whitePlayers) && !error && (
					<>
						<Box
							sx={{
								flex: 1,
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-start",
								flexWrap: "wrap",
								gap: 4,
								paddingBlock: { xs: 0, md: 4 },
								paddingRight: { xs: 0, md: 4 },
							}}
						>
							<Box sx={{ width: "100%" }}>
								<Typography variant="subtitle2" align="center">
									Crni
								</Typography>
							</Box>
							{blackPlayers &&
								blackPlayers.map((player) => (
									<PlayerCard key={player.id} player={player} />
								))}
						</Box>
						<Divider orientation="vertical" flexItem />
						<Box
							sx={{
								flex: 1,
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-start",
								flexWrap: "wrap",
								gap: 4,
								paddingBlock: { xs: 0, md: 4 },
								paddingLeft: { xs: 0, md: 4 },
							}}
						>
							<Box sx={{ width: "100%" }}>
								<Typography variant="subtitle2" align="center">
									Bijeli
								</Typography>
							</Box>
							{whitePlayers &&
								whitePlayers.map((player) => (
									<PlayerCard key={player.id} player={player} />
								))}
						</Box>
					</>
				)}
			</Stack>
		</Container>
	);
}
