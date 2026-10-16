import { Box, Card, CardContent, Typography, IconButton, Stack, Divider, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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

type TeamScoreColumnProps = {
	teamName: string;
	fallbackName: string;
	setsWon: number;
	isDarkJersey?: boolean;
};

function TeamScoreColumn({
	teamName,
	fallbackName,
	setsWon,
	isDarkJersey = false,
}: TeamScoreColumnProps) {
	return (
		<Stack alignItems="center" spacing={1} sx={{ minWidth: 80, flex: 1 }}>
			<Box
				sx={{
					width: 44,
					height: 44,
					borderRadius: "50%",
					backgroundColor: isDarkJersey ? "background.default" : "background.paper",
					border: 1,
					borderColor: isDarkJersey ? "divider" : "text.secondary",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: 2,
				}}
			>
				<Box
					sx={{
						width: 14,
						height: 14,
						borderRadius: "50%",
						backgroundColor: isDarkJersey ? "action.disabled" : "primary.light",
					}}
				/>
			</Box>
			<Typography
				variant="caption"
				fontWeight="bold"
				color="text.primary"
				sx={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
			>
				{teamName || fallbackName}
			</Typography>
			<Typography variant="h3" fontWeight="bold" color="primary.light" sx={{ lineHeight: 1 }}>
				{setsWon}
			</Typography>
		</Stack>
	);
}

type TeamRosterBoxProps = {
	teamName: string;
	fallbackName: string;
	playerNames: string[];
	isDarkJersey?: boolean;
};

function TeamRosterBox({
	teamName,
	fallbackName,
	playerNames,
	isDarkJersey = false,
}: TeamRosterBoxProps) {
	return (
		<Box>
			<Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 0.75 }}>
				<Box
					sx={{
						width: 7,
						height: 7,
						borderRadius: "50%",
						backgroundColor: isDarkJersey ? "text.secondary" : "background.paper",
						border: isDarkJersey ? 0 : 1,
						borderColor: "divider",
					}}
				/>
				<Typography
					variant="caption"
					fontWeight="bold"
					color="text.secondary"
					sx={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
				>
					{teamName || fallbackName}
				</Typography>
			</Stack>
			<Box
				sx={{
					p: 1.5,
					borderRadius: 2,
					backgroundColor: "action.hover",
					border: 1,
					borderColor: "divider",
				}}
			>
				<Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.5 }}>
					{playerNames.join(", ")}
				</Typography>
			</Box>
		</Box>
	);
}

export default function MatchesMobileCardList({
	data,
	setDeletingMatchId,
	setDeleteDialogOpen,
	setEditingMatchId,
	setEditModalOpen,
}: MatchesMobileCardListProps) {
	const { isAuthenticated, isAdmin } = useCurrentUser();

	return (
		<Stack spacing={2.5} sx={{ width: "100%" }}>
			{data.map((match: Match) => {
				const isUncounted = match.countsForStandings === false;
				const formattedDate = dayjs(match.date).locale("hr").format("ddd DD.MM.YYYY.");
				const locationText = match.location || "ŠD Hotanj";

				return (
					<Card
						key={match.id}
						variant="outlined"
						sx={{
							width: "100%",
							borderRadius: 3,
							p: "16px !important",
							backgroundColor: isUncounted ? "action.hover" : "background.paper",
							borderColor: isUncounted ? "warning.main" : "divider",
						}}
					>
						<CardContent sx={{ p: "0 !important", gap: 2, display: "flex", flexDirection: "column" }}>
							{/* Header: Date + Status Badge and Admin Actions */}
							<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
								<Box>
									<Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
										<Typography
											variant="h6"
											fontWeight="bold"
											color="text.primary"
											sx={{ lineHeight: 1.2 }}
										>
											{formattedDate}
										</Typography>
										{isUncounted && (
											<Chip
												size="small"
												label="Ne broji se"
												color="warning"
												variant="outlined"
												sx={{ height: 22, fontSize: "0.72rem", fontWeight: "bold" }}
											/>
										)}
									</Stack>

									<Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary">
										<LocationOnIcon sx={{ fontSize: 15, opacity: 0.8 }} />
										<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
											{locationText} • 19:00 h
										</Typography>
									</Stack>
								</Box>

								{/* Admin Actions */}
								{isAuthenticated && isAdmin && (
									<Stack direction="row" spacing={1}>
										<IconButton
											size="small"
											aria-label="edit"
											sx={{
												backgroundColor: "action.hover",
												borderRadius: 1.5,
												p: 0.8,
												border: 1,
												borderColor: "divider",
											}}
											onClick={() => {
												setEditingMatchId(match.id);
												setEditModalOpen(true);
											}}
										>
											<EditIcon sx={{ fontSize: 18 }} />
										</IconButton>
										<IconButton
											size="small"
											aria-label="delete"
											sx={{
												backgroundColor: "action.hover",
												borderRadius: 1.5,
												p: 0.8,
												border: 1,
												borderColor: "error.main",
											}}
											onClick={() => {
												setDeletingMatchId(match.id);
												setDeleteDialogOpen(true);
											}}
										>
											<DeleteIcon sx={{ fontSize: 18 }} color="error" />
										</IconButton>
									</Stack>
								)}
							</Stack>

							{isUncounted && match.note && (
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1,
										p: 1.2,
										borderRadius: 2,
										backgroundColor: "background.paper",
										border: 1,
										borderColor: "divider",
									}}
								>
									<InfoOutlinedIcon sx={{ fontSize: 18, color: "warning.main" }} />
									<Typography variant="caption" color="text.secondary">
										{match.note}
									</Typography>
								</Box>
							)}

							<Divider sx={{ my: 0.5, borderColor: "divider", opacity: 0.6 }} />

							{/* Scoreboard: Team 2 vs Team 1 */}
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								sx={{ px: 2, py: 1 }}
							>
								{/* Left Team (Black jersey) */}
								<TeamScoreColumn
									teamName={match.secondTeam.teamName}
									fallbackName="Crni"
									setsWon={isUncounted ? 0 : match.secondTeam.setsWon}
									isDarkJersey
								/>

								{/* Center: FT and colon */}
								<Stack alignItems="center" spacing={0.5} sx={{ px: 1 }}>
									<Box
										sx={{
											backgroundColor: "action.selected",
											borderRadius: 1,
											px: 1,
											py: 0.3,
										}}
									>
										<Typography
											variant="caption"
											fontWeight="bold"
											color="text.secondary"
											sx={{ letterSpacing: "0.05em" }}
										>
											{isUncounted ? "VOID" : "FT"}
										</Typography>
									</Box>
									<Typography variant="body1" fontWeight="bold" color="text.secondary">
										:
									</Typography>
								</Stack>

								{/* Right Team (White jersey) */}
								<TeamScoreColumn
									teamName={match.firstTeam.teamName}
									fallbackName="Bijeli"
									setsWon={isUncounted ? 0 : match.firstTeam.setsWon}
									isDarkJersey={false}
								/>
							</Stack>

							<Divider sx={{ my: 0.5, borderColor: "divider", opacity: 0.6 }} />

							{/* Set-by-Set Breakdown */}
							<Box>
								<Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1.25 }}>
									<Typography
										variant="caption"
										fontWeight="bold"
										color="text.secondary"
										sx={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
									>
										PO SETOVIMA
									</Typography>
								</Stack>

								{isUncounted && match.totalSets === 0 ? (
									<Typography color="text.secondary">-</Typography>
								) : (
								<Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
									{match.secondTeam.goalsPerSet.map((goal, index) => {
										const firstGoal = match.firstTeam.goalsPerSet[index] ?? 0;
										return (
											<Box
												key={index}
												sx={{
													display: "inline-flex",
													alignItems: "center",
													gap: 0.75,
													px: 1.5,
													py: 0.75,
													borderRadius: 2,
													backgroundColor: "action.hover",
													border: 1,
													borderColor: "divider",
												}}
											>
												<Typography
													variant="caption"
													color="text.secondary"
													sx={{ fontWeight: 500 }}
												>
													Set {index + 1}
												</Typography>
												<Typography
													variant="caption"
													color="primary.main"
													sx={{ fontWeight: 500 }}
												>
													-
												</Typography>
												<Typography variant="caption" fontWeight="bold" color="primary.light">
													{goal} : {firstGoal}
												</Typography>
											</Box>
										);
									})}
								</Stack>
								)}
							</Box>

							<Divider sx={{ my: 0.5, borderColor: "divider", opacity: 0.6 }} />

							{/* Rosters Section */}
							<Stack spacing={1.5}>
								{/* Left team roster */}
								<TeamRosterBox
									teamName={match.secondTeam.teamName}
									fallbackName="CRNI"
									playerNames={match.secondTeam.playerNames}
									isDarkJersey
								/>

								{/* Right team roster */}
								<TeamRosterBox
									teamName={match.firstTeam.teamName}
									fallbackName="BIJELI"
									playerNames={match.firstTeam.playerNames}
									isDarkJersey={false}
								/>
							</Stack>
						</CardContent>
					</Card>
				);
			})}
		</Stack>
	);
}
