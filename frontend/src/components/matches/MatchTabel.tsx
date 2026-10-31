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

/** Pill showing a single set result, e.g. "SET 1 / 6 : 8" */
function SetPill({ setIndex, blackGoals, whiteGoals }: { setIndex: number; blackGoals: number; whiteGoals: number }) {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: "inline-flex",
				flexDirection: "column",
				alignItems: "center",
				px: 1.5,
				py: 0.75,
				borderRadius: 2,
				border: `1px solid ${theme.palette.divider}`,
				backgroundColor: theme.palette.action.hover,
				minWidth: 68,
			}}
		>
			<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: "0.06em" }}>
				Set {setIndex + 1}
			</Typography>
			<Typography variant="body2" fontWeight="bold" color="text.primary">
				{blackGoals} : {whiteGoals}
			</Typography>
		</Box>
	);
}

/** Final outcome badge: shows setsWon, winner dot + name */
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
				alignItems: "flex-end",
				gap: 0.5,
				px: 1.5,
				py: 1,
				borderRadius: 2,
				border: `1px solid ${theme.palette.divider}`,
				backgroundColor: theme.palette.background.paper,
				minWidth: 80,
			}}
		>
			<Typography variant="body1" fontWeight="bold" color="text.primary">
				{blackSetsWon} : {whiteSetsWon}
			</Typography>
			<Stack direction="row" spacing={0.5} alignItems="center">
				<FiberManualRecordIcon sx={{ fontSize: "0.5rem", color: "primary.main" }} />
				<Typography variant="caption" fontWeight="bold" color="primary.main" sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
					{winnerName}
				</Typography>
			</Stack>
		</Box>
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
			<Table aria-label="match table" sx={{ minWidth: 800 }}>
				<TableHead>
					<TableRow>
						<TableCell sx={{ fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.72rem", color: "text.secondary" }}>
							Datum i lokacija
						</TableCell>
						<TableCell sx={{ fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.72rem", color: "text.secondary" }}>
							Igrači
						</TableCell>
						<TableCell sx={{ fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.72rem", color: "text.secondary" }}>
							<Stack direction="row" spacing={0.75} alignItems="center">
								<InfoOutlinedIcon sx={{ fontSize: "0.9rem", opacity: 0.7 }} />
								<span>Rezultati po setovima</span>
							</Stack>
						</TableCell>
						<TableCell
							align="right"
							sx={{ fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.72rem", color: "text.secondary" }}
						>
							Konačni ishod
						</TableCell>
						{isAuthenticated && isAdmin && (
							<TableCell sx={{ width: "5rem" }} />
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((match: Match) => {
						const isUncounted = match.countsForStandings === false;
						const formattedDay = dayjs(match.date).locale("hr").format("ddd");
						const formattedDate = dayjs(match.date).locale("hr").format("DD.MM.YYYY.");
						const locationText = match.location || "ŠD Hotanj";

						return (
							<TableRow
								key={match.id}
								sx={{
									verticalAlign: "top",
									"&:hover": { backgroundColor: "action.hover" },
								}}
							>
								{/* --- Date & Location --- */}
								<TableCell sx={{ width: "160px", pt: 2 }}>
									<Stack spacing={0.5} alignItems="flex-start">
										<Stack direction="row" spacing={0.75} alignItems="center">
											<FiberManualRecordIcon sx={{ fontSize: "0.55rem", color: "primary.main" }} />
											<Typography variant="body2" fontWeight="bold" color="text.primary">
												{formattedDay}. {formattedDate}
											</Typography>
										</Stack>
										<Stack direction="row" spacing={0.5} alignItems="center" sx={{ pl: 1.5 }}>
											<LocationOnIcon sx={{ fontSize: "0.85rem", color: "text.secondary" }} />
											<Typography variant="caption" color="text.secondary">
												{locationText} 19:00
											</Typography>
										</Stack>
										{isUncounted && (
											<Box sx={{ pl: 1.5 }}>
												<Chip
													size="small"
													label="Ne broji se"
													color="warning"
													variant="outlined"
													sx={{ height: 20, fontSize: "0.7rem", fontWeight: "bold" }}
												/>
											</Box>
										)}
									</Stack>
								</TableCell>

								{/* --- Players --- */}
								<TableCell sx={{ pt: 2 }}>
									<Stack spacing={1}>
										{/* Black team */}
										<Box>
											<Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 0.25 }}>
												<Box
													sx={{
														width: 7,
														height: 7,
														borderRadius: "50%",
														backgroundColor: "text.secondary",
													}}
												/>
												<Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
													Crni:
												</Typography>
											</Stack>
											<Typography variant="body2" color="text.primary">
												{match.secondTeam.playerNames.join(", ")}
											</Typography>
										</Box>

										{/* White team */}
										<Box>
											<Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 0.25 }}>
												<Box
													sx={{
														width: 7,
														height: 7,
														borderRadius: "50%",
														backgroundColor: "background.paper",
														border: "1px solid",
														borderColor: "divider",
													}}
												/>
												<Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
													Bijeli:
												</Typography>
											</Stack>
											<Typography variant="body2" color="text.primary">
												{match.firstTeam.playerNames.join(", ")}
											</Typography>
										</Box>

										{isUncounted && match.note && (
											<Stack direction="row" spacing={0.5} alignItems="center">
												<InfoOutlinedIcon sx={{ fontSize: 14, color: "warning.main" }} />
												<Typography variant="caption" color="text.secondary" fontStyle="italic">
													{match.note}
												</Typography>
											</Stack>
										)}
									</Stack>
								</TableCell>

								{/* --- Set results --- */}
								<TableCell sx={{ pt: 2 }}>
									{isUncounted && match.totalSets === 0 ? (
										<Typography color="text.secondary">-</Typography>
									) : (
										<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
											{match.secondTeam.goalsPerSet.map((blackGoal, index) => (
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

								{/* --- Final outcome --- */}
								<TableCell align="right" sx={{ pt: 2 }}>
									{isUncounted ? (
										<Typography color="text.secondary">-</Typography>
									) : (
										<FinalOutcomeBadge
											blackSetsWon={match.secondTeam.setsWon}
											whiteSetsWon={match.firstTeam.setsWon}
											blackTeamName={match.secondTeam.teamName || "Crni"}
											whiteTeamName={match.firstTeam.teamName || "Bijeli"}
										/>
									)}
								</TableCell>

								{/* --- Admin actions --- */}
								{isAuthenticated && isAdmin && (
									<TableCell sx={{ width: "5rem", pt: 2 }}>
										<Stack direction="row" spacing={0.5}>
											<IconButton
												sx={{
													borderRadius: "4px",
													background: theme.palette.divider,
												}}
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
												sx={{
													borderRadius: "4px",
													background: theme.palette.divider,
												}}
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
