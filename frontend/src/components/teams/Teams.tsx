import { Avatar, Box, Typography, Container, Stack, Divider, CircularProgress, Alert, useTheme } from "@mui/material";
import { useGetTeamMembersQuery } from "../../redux/api/teamMembersApi";
import type { SerializedError } from "@reduxjs/toolkit";

export default function Teams() {
	const theme = useTheme();
	const {
		data: blackPlayers,
		isLoading: blackPlayersIsLoading,
		error: blackPlayersError,
	} = useGetTeamMembersQuery(2);
	const {
		data: whitePlayers,
		isLoading: whitePlayersIsLoading,
		error: whitePlayersError,
	} = useGetTeamMembersQuery(1);

	const error = blackPlayersError || whitePlayersError;

	return (
		<Container maxWidth="xl">
			<Stack direction="row" alignItems="flex-start" gap={2} paddingBlock={4}>
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
								paddingBlock: 4,
								paddingRight: 4,
							}}
						>
							<Box sx={{ width: "100%" }}>
								<Typography variant="subtitle2" align="center">
									Crni
								</Typography>
							</Box>
							{blackPlayers &&
								blackPlayers.map((player) => (
									<Stack
										key={player.id}
										alignItems="center"
										gap={1}
										width={200}
										flexShrink={1}
										sx={{
											backgroundColor: theme.palette.grey[900],
										}}
										paddingY={2}
										borderRadius={2}
									>
										<Avatar>{player.playerName.charAt(0)}</Avatar>
										<Typography variant="body1" align="center">
											{player.playerName}
										</Typography>
									</Stack>
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
								paddingBlock: 4,
								paddingLeft: 4,
							}}
						>
							<Box sx={{ width: "100%" }}>
								<Typography variant="subtitle2" align="center">
									Bijeli
								</Typography>
							</Box>
							{whitePlayers &&
								whitePlayers.map((player) => (
									<Stack
										key={player.id}
										alignItems="center"
										gap={1}
										width={200}
										flexShrink={1}
										sx={{
											backgroundColor: theme.palette.grey[900],
										}}
										paddingY={2}
										borderRadius={2}
									>
										<Avatar>{player.playerName.charAt(0)}</Avatar>
										<Typography variant="body1" align="center">
											{player.playerName}
										</Typography>
									</Stack>
								))}
						</Box>
					</>
				)}
			</Stack>
		</Container>
	);
}
