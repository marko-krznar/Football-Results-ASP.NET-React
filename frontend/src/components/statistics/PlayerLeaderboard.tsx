import {
	Card,
	CardContent,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Chip,
	Stack,
	Box,
} from "@mui/material";
import type { PlayerStat } from "../../utils/statisticsUtils";

interface PlayerLeaderboardProps {
	title: string;
	description?: string;
	players: PlayerStat[];
	countType: "total" | "black" | "white" | "winRate";
}

export default function PlayerLeaderboard({
	title,
	description,
	players,
	countType,
}: PlayerLeaderboardProps) {
	const getDisplayCount = (player: PlayerStat) => {
		switch (countType) {
			case "black":
				return `${player.blackAppearances} nastupa`;
			case "white":
				return `${player.whiteAppearances} nastupa`;
			case "winRate":
				return `${player.winPercentage}% (${player.wins}/${player.totalAppearances})`;
			case "total":
			default:
				return `${player.totalAppearances} nastupa`;
		}
	};

	const getPodiumBadge = (index: number) => {
		if (index === 0) return { label: "1.", color: "primary" as const };
		if (index === 1) return { label: "2.", color: "default" as const };
		if (index === 2) return { label: "3.", color: "default" as const };
		return { label: `${index + 1}.`, color: "default" as const };
	};

	return (
		<Card sx={{ height: "100%" }}>
			<CardContent>
				<Typography variant="h4" fontWeight="bold">
					{title}
				</Typography>
				{description && (
					<Typography variant="body2" color="text.secondary" mb={2}>
						{description}
					</Typography>
				)}

				{players.length === 0 ? (
					<Typography variant="body2" color="text.secondary" py={2}>
						Nema evidentiranih podataka za odabranu sezonu.
					</Typography>
				) : (
					<TableContainer>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell sx={{ width: 48, px: 1 }}>#</TableCell>
									<TableCell>Igrač</TableCell>
									<TableCell align="right">Učinak</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{players.map((player, idx) => {
									const badge = getPodiumBadge(idx);
									return (
										<TableRow key={player.name} hover>
											<TableCell sx={{ px: 1 }}>
												<Chip
													label={badge.label}
													size="small"
													color={badge.color}
													variant={idx === 0 ? "filled" : "outlined"}
													sx={{ fontWeight: "bold", minWidth: 28 }}
												/>
											</TableCell>
											<TableCell>
												<Typography variant="body1" fontWeight={idx === 0 ? "bold" : "normal"}>
													{player.name}
												</Typography>
											</TableCell>
											<TableCell align="right">
												<Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
													<Box>
														<Typography variant="body2" fontWeight="bold" color="text.primary">
															{getDisplayCount(player)}
														</Typography>
														{countType === "total" && (
															<Typography variant="caption" color="text.secondary">
																Crni: {player.blackAppearances} | Bijeli: {player.whiteAppearances}
															</Typography>
														)}
													</Box>
												</Stack>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</CardContent>
		</Card>
	);
}
