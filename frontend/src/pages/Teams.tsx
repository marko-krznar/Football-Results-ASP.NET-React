import { useMemo, useState } from "react";
import { Alert, Box, CircularProgress, Container, Grid, Stack } from "@mui/material";
import type { SerializedError } from "@reduxjs/toolkit";
import { useGetTeamMembersQuery } from "../redux/api/teamMembersApi";
import { useGetTeamsQuery } from "../redux/api/teamsApi";
import { useGetSeasonsQuery } from "../redux/api/seasonsApi";
import { useGetMatchesQuery } from "../redux/api/matchesApi";
import { useSelectedSeason } from "../redux/hooks";
import TeamsHeader from "../components/teams/TeamsHeader";
import TeamsSearchBar from "../components/teams/TeamsSearchBar";
import PlayerCard from "../components/teams/PlayerCard";

export default function Teams() {
	const selectedSeasonId = useSelectedSeason();
	const { data: seasonsList } = useGetSeasonsQuery();
	const { data: teamsList } = useGetTeamsQuery();
	const { data: matchesList } = useGetMatchesQuery(selectedSeasonId ?? 0, { skip: !selectedSeasonId });

	const [searchQuery, setSearchQuery] = useState("");

	// Resolve current season name
	const currentSeason = seasonsList?.find((s) => s.id === selectedSeasonId);
	const seasonName = currentSeason?.name;

	// Resolve Crni and Bijeli teams for the selected season or default
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
	const isLoading = (blackPlayersIsLoading || whitePlayersIsLoading) && !error;

	// Calculate real appearances for each player from matchesList
	const appearanceCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		if (!matchesList) return counts;

		matchesList.forEach((match) => {
			const firstTeamPlayers = match.firstTeam?.playerNames ?? [];
			const secondTeamPlayers = match.secondTeam?.playerNames ?? [];
			const matchPlayers = new Set([...firstTeamPlayers, ...secondTeamPlayers]);

			matchPlayers.forEach((playerName) => {
				const trimmed = playerName.trim().toLowerCase();
				counts[trimmed] = (counts[trimmed] || 0) + 1;
			});
		});

		return counts;
	}, [matchesList]);

	// Search filter logic
	const filteredBlackPlayers = useMemo(() => {
		if (!blackPlayers) return [];
		if (!searchQuery.trim()) return blackPlayers;
		const query = searchQuery.toLowerCase();
		return blackPlayers.filter((p) => p.playerName.toLowerCase().includes(query));
	}, [blackPlayers, searchQuery]);

	const filteredWhitePlayers = useMemo(() => {
		if (!whitePlayers) return [];
		if (!searchQuery.trim()) return whitePlayers;
		const query = searchQuery.toLowerCase();
		return whitePlayers.filter((p) => p.playerName.toLowerCase().includes(query));
	}, [whitePlayers, searchQuery]);

	const totalPlayersCount = (blackPlayers?.length ?? 0) + (whitePlayers?.length ?? 0);

	return (
		<Container maxWidth="xl" sx={{ py: 4 }}>
			<Stack spacing={4}>
				{/* Top Header with Pregled Momčadi & Team Cards next to it */}
				<TeamsHeader
					seasonName={seasonName}
					totalPlayers={totalPlayersCount}
					blackTeamName={blackTeam?.name || "Crni"}
					blackCaptainName={blackTeam?.captainName}
					blackCount={blackPlayers?.length ?? 0}
					whiteTeamName={whiteTeam?.name || "Bijeli"}
					whiteCaptainName={whiteTeam?.captainName}
					whiteCount={whitePlayers?.length ?? 0}
				/>

				{/* Search Bar */}
				<TeamsSearchBar
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
				/>

				{error && (
					<Alert severity="error" sx={{ width: "100%" }}>
						{"status" in error && error.status
							? typeof error.data === "string"
								? error.data
								: `Error: ${error.status}`
							: (error as SerializedError).message || "An unknown error occurred."}
					</Alert>
				)}

				{isLoading && (
					<Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
						<CircularProgress aria-label="Loading…" />
					</Box>
				)}

				{!isLoading && !error && (
					<Grid container spacing={4}>
						{/* Crni Column */}
						<Grid size={{ xs: 12, md: 6 }}>
							<Grid container spacing={2}>
								{filteredBlackPlayers.map((player) => {
									const appearances = appearanceCounts[player.playerName.trim().toLowerCase()] ?? 0;
									return (
										<Grid key={player.id} size={{ xs: 12, sm: 6, lg: 4 }}>
											<PlayerCard
												player={player}
												teamType="crni"
												appearances={appearances}
											/>
										</Grid>
									);
								})}
							</Grid>
						</Grid>

						{/* Bijeli Column */}
						<Grid size={{ xs: 12, md: 6 }}>
							<Grid container spacing={2}>
								{filteredWhitePlayers.map((player) => {
									const appearances = appearanceCounts[player.playerName.trim().toLowerCase()] ?? 0;
									return (
										<Grid key={player.id} size={{ xs: 12, sm: 6, lg: 4 }}>
											<PlayerCard
												player={player}
												teamType="bijeli"
												appearances={appearances}
											/>
										</Grid>
									);
								})}
							</Grid>
						</Grid>
					</Grid>
				)}
			</Stack>
		</Container>
	);
}
