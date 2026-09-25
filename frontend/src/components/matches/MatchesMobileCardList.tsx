import { Box, Card, CardContent, Typography, IconButton, Stack, Chip, Divider, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import "dayjs/locale/hr";
import { useCurrentUser } from "../../redux/hooks";
import type { Match } from "./MatchTabel";

type MatchesMobileCardListProps = {
	data: Match[];
	setDeletingMatchId: React.Dispatch<React.SetStateAction<number | null>>;
	setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setEditingMatchId: React.Dispatch<React.SetStateAction<number | null>>;
	setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MatchesMobileCardList({
	data,
	setDeletingMatchId,
	setDeleteDialogOpen,
	setEditingMatchId,
	setEditModalOpen,
}: MatchesMobileCardListProps) {
	const theme = useTheme();
	const { isAuthenticated, isAdmin } = useCurrentUser();

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			{data.map((match: Match) => {
				const formattedDate = dayjs(match.date).locale("hr").format("ddd DD.MM.YYYY.");
				const locationText = match.location || "ŠD Hotanj 19:00";

				return (
					<Card key={match.id} variant="outlined" sx={{ width: "100%", borderRadius: 2 }}>
						<CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
							{/* Header: Date & Location */}
							<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
								<Box>
									<Typography variant="subtitle2" fontWeight="bold" color="text.primary">
										{formattedDate}
									</Typography>
									<Typography variant="caption" color="text.secondary">
										{locationText}
									</Typography>
								</Box>

								{/* Admin Actions */}
								{isAuthenticated && isAdmin && (
									<Stack direction="row" spacing={1}>
										<IconButton
											size="small"
											aria-label="edit"
											sx={{ background: theme.palette.divider, borderRadius: "4px" }}
											onClick={() => {
												setEditingMatchId(match.id);
												setEditModalOpen(true);
											}}
										>
											<EditIcon fontSize="small" />
										</IconButton>
										<IconButton
											size="small"
											aria-label="delete"
											sx={{ background: theme.palette.divider, borderRadius: "4px" }}
											onClick={() => {
												setDeletingMatchId(match.id);
												setDeleteDialogOpen(true);
											}}
										>
											<DeleteIcon fontSize="small" color="error" />
										</IconButton>
									</Stack>
								)}
							</Stack>

							<Divider sx={{ my: 1 }} />

							{/* Score Line */}
							<Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ py: 1 }}>
								<Box textAlign="center" flex={1}>
									<Typography variant="body1" fontWeight="bold">
										{match.secondTeam.teamName || "Crni"}
									</Typography>
									<Typography variant="h4" fontWeight="bold" color={theme.palette.primary.main}>
										{match.secondTeam.setsWon}
									</Typography>
								</Box>

								<Typography variant="h5" color="text.secondary" sx={{ px: 1 }}>
									:
								</Typography>

								<Box textAlign="center" flex={1}>
									<Typography variant="body1" fontWeight="bold">
										{match.firstTeam.teamName || "Bijeli"}
									</Typography>
									<Typography variant="h4" fontWeight="bold" color={theme.palette.primary.main}>
										{match.firstTeam.setsWon}
									</Typography>
								</Box>
							</Stack>

							<Divider sx={{ my: 1 }} />

							{/* Set-by-Set Breakdown */}
							<Typography
								variant="caption"
								color="text.secondary"
								fontWeight="bold"
								sx={{ display: "block", mb: 0.5 }}
							>
								Po setovima:
							</Typography>
							<Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.5, mb: 1.5 }}>
								{match.secondTeam.goalsPerSet.map((goal, index) => {
									const firstGoal = match.firstTeam.goalsPerSet[index] ?? 0;
									return (
										<Chip
											key={index}
											label={`Set ${index + 1}: ${goal} - ${firstGoal}`}
											size="small"
											variant="outlined"
										/>
									);
								})}
							</Stack>

							{/* Player Rosters */}
							<Box sx={{ mt: 1 }}>
								<Typography variant="caption" color="text.secondary" fontWeight="bold">
									{match.secondTeam.teamName || "Crni"}:
								</Typography>
								<Typography variant="body2" color="text.primary" sx={{ mb: 0.5 }}>
									{match.secondTeam.playerNames.join(", ")}
								</Typography>

								<Typography variant="caption" color="text.secondary" fontWeight="bold">
									{match.firstTeam.teamName || "Bijeli"}:
								</Typography>
								<Typography variant="body2" color="text.primary">
									{match.firstTeam.playerNames.join(", ")}
								</Typography>
							</Box>
						</CardContent>
					</Card>
				);
			})}
		</Stack>
	);
}
