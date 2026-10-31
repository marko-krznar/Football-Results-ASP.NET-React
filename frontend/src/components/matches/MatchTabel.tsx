import {
	Box,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Typography,
	IconButton,
	Stack,
	Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import dayjs from "dayjs";
import "dayjs/locale/hr";
import { useTheme } from "@mui/material/styles";
import { useCurrentUser } from "../../redux/hooks";

export interface MatchTeam {
	teamId: number;
	teamName: string;
	playerNames: string[];
	goalsPerSet: number[];
	setsWon: number;
	totalGoals: number;
}

export interface Match {
	id: number;
	date: string;
	location: string | null;
	note: string | null;
	countsForStandings?: boolean;
	totalSets: number;
	firstTeam: MatchTeam;
	secondTeam: MatchTeam;
}

type MatchTableProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: Match[] | any;
	setDeletingMatchId: React.Dispatch<React.SetStateAction<number | null>>;
	setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setEditingMatchId: React.Dispatch<React.SetStateAction<number | null>>;
	setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TH_SX = {
	fontWeight: 700,
	textTransform: "uppercase" as const,
	letterSpacing: "0.08em",
	fontSize: "0.7rem",
	color: "text.secondary",
	borderBottom: "1px solid",
	borderColor: "divider",
	py: 1.5,
	whiteSpace: "nowrap" as const,
};

/** Small pill for a single set score */
function SetPill({
	setIndex,
	blackGoals,
	whiteGoals,
}: {
	setIndex: number;
	blackGoals: number;
	whiteGoals: number;
}) {
	return (
		<Box
			sx={{
				display: "inline-flex",
				flexDirection: "column",
				alignItems: "center",
				px: 1.25,
				py: 0.5,
				borderRadius: 1.5,
				border: "1px solid",
				borderColor: "divider",
				backgroundColor: "action.hover",
				minWidth: 60,
				gap: 0.25,
			}}
		>
			<Typography
				variant="caption"
				color="text.secondary"
				sx={{ fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.05em", lineHeight: 1 }}
			>
				Set {setIndex + 1}
			</Typography>
			<Typography variant="body2" fontWeight="bold" color="text.primary" sx={{ lineHeight: 1 }}>
				{blackGoals} : {whiteGoals}
			</Typography>
		</Box>
	);
}

/** Highlighted final outcome badge */
function FinalOutcomeBadge({
	blackSetsWon,
	whiteSetsWon,
	blackTeamName,
	whiteTeamName,
}: {
	blackSetsWon: number;
	whiteSetsWon: number;
	blackTeamName: string;
	whiteTeamName: string;
}) {
	const theme = useTheme();
	const blackWon = blackSetsWon > whiteSetsWon;
	const winnerName = blackWon ? blackTeamName || "Crni" : whiteTeamName || "Bijeli";

	return (
		<Box
			sx={{
				display: "inline-flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 0.5,
				px: 2,
				py: 1,
				borderRadius: 2,
				border: `1px solid ${theme.palette.divider}`,
				backgroundColor: theme.palette.background.paper,
				minWidth: 72,
			}}
		>
			<Typography variant="body1" fontWeight="bold" color="text.primary" sx={{ lineHeight: 1 }}>
				{blackSetsWon} : {whiteSetsWon}
			</Typography>
			<Stack direction="row" spacing={0.4} alignItems="center">
				<FiberManualRecordIcon sx={{ fontSize: "0.45rem", color: "primary.main" }} />
				<Typography
					variant="caption"
					fontWeight="bold"
					color="primary.main"
					sx={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.07em", lineHeight: 1 }}
				>
					{winnerName}
				</Typography>
			</Stack>
		</Box>
	);
}

/** Small dot used for team indicators */
function TeamDot({ dark }: { dark: boolean }) {
	return (
		<Box
			sx={{
				width: 7,
				height: 7,
				borderRadius: "50%",
				flexShrink: 0,
				backgroundColor: dark ? "text.secondary" : "background.paper",
				border: dark ? 0 : "1px solid",
				borderColor: "divider",
			}}
		/>
	);
}

export default function MatchTabel({
	data,
	setDeletingMatchId,
	setDeleteDialogOpen,
	setEditingMatchId,
	setEditModalOpen,
}: MatchTableProps) {
	const theme = useTheme();
	const { isAuthenticated, isAdmin } = useCurrentUser();

	return (
		<TableContainer sx={{ width: "100%", overflowX: "auto" }}>
			<Table aria-label="match table" sx={{ minWidth: 780, borderCollapse: "separate", borderSpacing: 0 }}>
				<TableHead>
					<TableRow>
						<TableCell sx={{ ...TH_SX, width: 155 }}>Datum i lokacija</TableCell>
						<TableCell sx={{ ...TH_SX }}>Igrači</TableCell>
						<TableCell sx={{ ...TH_SX }}>
							<Stack direction="row" spacing={0.5} alignItems="center">
								<InfoOutlinedIcon sx={{ fontSize: "0.85rem", opacity: 0.6 }} />
								<span>Rezultati po setovima</span>
							</Stack>
						</TableCell>
						<TableCell sx={{ ...TH_SX, width: 110, textAlign: "right" }}>Konačni ishod</TableCell>
						{isAuthenticated && isAdmin && (
							<TableCell sx={{ ...TH_SX, width: 64 }} />
						)}
					</TableRow>
				</TableHead>

				<TableBody>
					{data.map((match: Match, rowIndex: number) => {
						const isUncounted = match.countsForStandings === false;
						const isOdd = rowIndex % 2 === 0;

						return (
							<TableRow
								key={match.id}
								sx={{
									verticalAlign: "top",
									backgroundColor: isOdd ? "transparent" : "action.hover",
									"&:hover": { backgroundColor: "action.selected" },
									transition: "background-color 0.15s",
								}}
							>
								{/* ── Date & Location ── */}
								<TableCell sx={{ py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
									<Stack spacing={0.5}>
										<Stack direction="row" spacing={0.75} alignItems="center">
											<FiberManualRecordIcon
												sx={{ fontSize: "0.5rem", color: isUncounted ? "warning.main" : "primary.main", flexShrink: 0 }}
											/>
											<Typography variant="body2" fontWeight="bold" color="text.primary" sx={{ lineHeight: 1.3 }}>
												{dayjs(match.date).locale("hr").format("ddd. DD.MM.YYYY.")}
											</Typography>
										</Stack>
										<Stack direction="row" spacing={0.5} alignItems="center" sx={{ pl: 1.5 }}>
											<LocationOnIcon sx={{ fontSize: "0.8rem", color: "text.secondary", flexShrink: 0 }} />
											<Typography variant="caption" color="text.secondary">
												{match.location || "ŠD Hotanj"} 19:00
											</Typography>
										</Stack>
										{isUncounted && (
											<Box sx={{ pl: 1.5 }}>
												<Chip
													size="small"
													label="Ne broji se"
													color="warning"
													variant="outlined"
													sx={{ height: 18, fontSize: "0.65rem", fontWeight: "bold" }}
												/>
											</Box>
										)}
									</Stack>
								</TableCell>

								{/* ── Players ── */}
								<TableCell sx={{ py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
									<Stack spacing={1.25}>
										<Stack spacing={0.4}>
											<Stack direction="row" spacing={0.6} alignItems="center">
												<TeamDot dark />
												<Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.07em" }}>
													Crni:
												</Typography>
											</Stack>
											<Typography variant="body2" color="text.primary">
												{match.secondTeam.playerNames.join(", ")}
											</Typography>
										</Stack>

										<Stack spacing={0.4}>
											<Stack direction="row" spacing={0.6} alignItems="center">
												<TeamDot dark={false} />
												<Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.07em" }}>
													Bijeli:
												</Typography>
											</Stack>
											<Typography variant="body2" color="text.primary">
												{match.firstTeam.playerNames.join(", ")}
											</Typography>
										</Stack>

										{isUncounted && match.note && (
											<Stack direction="row" spacing={0.5} alignItems="flex-start">
												<InfoOutlinedIcon sx={{ fontSize: "0.85rem", color: "warning.main", mt: 0.15, flexShrink: 0 }} />
												<Typography variant="caption" color="text.secondary" fontStyle="italic">
													{match.note}
												</Typography>
											</Stack>
										)}
									</Stack>
								</TableCell>

								{/* ── Set results ── */}
								<TableCell sx={{ py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
									{isUncounted && match.totalSets === 0 ? (
										<Typography variant="body2" color="text.secondary">
											—
										</Typography>
									) : (
										<Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
											{match.secondTeam.goalsPerSet.map((blackGoal: number, index: number) => (
												<SetPill
													key={index}
													setIndex={index}
													blackGoals={blackGoal}
													whiteGoals={match.firstTeam.goalsPerSet[index] ?? 0}
												/>
											))}
										</Stack>
									)}
								</TableCell>

								{/* ── Final outcome ── */}
								<TableCell
									align="right"
									sx={{ py: 2, borderBottom: "1px solid", borderColor: "divider" }}
								>
									{isUncounted ? (
										<Typography variant="body2" color="text.secondary">
											—
										</Typography>
									) : (
										<FinalOutcomeBadge
											blackSetsWon={match.secondTeam.setsWon}
											whiteSetsWon={match.firstTeam.setsWon}
											blackTeamName={match.secondTeam.teamName || "Crni"}
											whiteTeamName={match.firstTeam.teamName || "Bijeli"}
										/>
									)}
								</TableCell>

								{/* ── Admin actions ── */}
								{isAuthenticated && isAdmin && (
									<TableCell sx={{ py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
										<Stack direction="row" spacing={0.5}>
											<IconButton
												sx={{ borderRadius: 1, background: theme.palette.divider }}
												aria-label="edit"
												size="small"
												onClick={() => {
													setEditingMatchId(match.id);
													setEditModalOpen(true);
												}}
											>
												<EditIcon fontSize="inherit" />
											</IconButton>
											<IconButton
												sx={{ borderRadius: 1, background: theme.palette.divider }}
												aria-label="delete"
												size="small"
												onClick={() => {
													setDeletingMatchId(match.id);
													setDeleteDialogOpen(true);
												}}
											>
												<DeleteIcon fontSize="inherit" color="error" />
											</IconButton>
										</Stack>
									</TableCell>
								)}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
