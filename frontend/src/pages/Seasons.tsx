import { useState, useMemo } from "react";
import {
	Box,
	Container,
	Stack,
	Typography,
	Button,
	ToggleButton,
	ToggleButtonGroup,
	Card,
	CircularProgress,
	Alert,
	Chip,
	LinearProgress,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import BoltIcon from "@mui/icons-material/Bolt";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import dayjs from "dayjs";
import "dayjs/locale/hr";
import { useGetSeasonsQuery, type Season } from "../redux/api/seasonsApi";
import { useGetAllMatchesQuery, useGetMatchesQuery } from "../redux/api/matchesApi";
import { getClosestSeasonId } from "../utils/getClosestSeasonIdUtils";

type FilterTab = "all" | "active" | "completed";
type ViewMode = "grid" | "list";

export default function Seasons() {
	const { data: seasons, isLoading: seasonsLoading, error: seasonsError } = useGetSeasonsQuery();
	const { data: rawMatches } = useGetAllMatchesQuery();
	const { data: displayMatches } = useGetMatchesQuery(undefined);

	const [statusFilter, setStatusFilter] = useState<FilterTab>("all");
	const [viewMode, setViewMode] = useState<ViewMode>("grid");

	// Prefer rawMatches from /api/matches as it includes SeasonId and set scores directly
	const allMatches = useMemo(() => {
		if (rawMatches && rawMatches.length > 0) return rawMatches;
		return displayMatches ?? [];
	}, [rawMatches, displayMatches]);

	const activeSeasonId = useMemo(() => {
		if (!seasons || seasons.length === 0) return null;
		return getClosestSeasonId(seasons);
	}, [seasons]);

	const activeSeason = useMemo(() => {
		if (!seasons) return null;
		return seasons.find((s) => s.id === activeSeasonId) ?? seasons[0] ?? null;
	}, [seasons, activeSeasonId]);

	// Derive matches stats and season winners per season
	const seasonStatsMap = useMemo(() => {
		const map: Record<
			number,
			{
				matchCount: number;
				firstTeamWins: number;
				secondTeamWins: number;
				firstTeamSetsWon: number;
				secondTeamSetsWon: number;
				firstTeamName: string;
				secondTeamName: string;
				latestLocation?: string;
			}
		> = {};

		if (!allMatches) return map;

		allMatches.forEach((m) => {
			const sId = m.seasonId ?? (m as unknown as { SeasonId?: number }).SeasonId;
			if (!sId) return;

			const t1Name = m.firstTeam?.teamName || m.firstTeamName || "Crni";
			const t2Name = m.secondTeam?.teamName || m.secondTeamName || "Bijeli";
			const t1Sets = m.firstTeam?.setsWon ?? m.firstTeamSetsWon ?? 0;
			const t2Sets = m.secondTeam?.setsWon ?? m.secondTeamSetsWon ?? 0;

			if (!map[sId]) {
				map[sId] = {
					matchCount: 0,
					firstTeamWins: 0,
					secondTeamWins: 0,
					firstTeamSetsWon: 0,
					secondTeamSetsWon: 0,
					firstTeamName: t1Name,
					secondTeamName: t2Name,
					latestLocation: m.location || undefined,
				};
			}

			map[sId].matchCount += 1;
			map[sId].firstTeamSetsWon += t1Sets;
			map[sId].secondTeamSetsWon += t2Sets;

			if (m.location) {
				map[sId].latestLocation = m.location;
			}
			if (t1Sets > t2Sets) {
				map[sId].firstTeamWins += 1;
			} else if (t2Sets > t1Sets) {
				map[sId].secondTeamWins += 1;
			}
		});

		return map;
	}, [allMatches]);

	// Next Monday calculation: match is played every Monday at 19:00 at ŠD Hotanj
	const nextMonday = useMemo(() => {
		const now = dayjs();
		const dayOfWeek = now.day();
		if (dayOfWeek === 1) {
			// If today is Monday but after 20:00 (match completed), take next Monday
			if (now.hour() >= 20) {
				return now.add(7, "day");
			}
			return now;
		}
		// If not Monday, advance to upcoming Monday
		const daysUntilMonday = (8 - dayOfWeek) % 7 || 7;
		return now.add(daysUntilMonday, "day");
	}, []);

	const activeSeasonMatchCount = activeSeason ? seasonStatsMap[activeSeason.id]?.matchCount ?? 0 : 0;
	const activeSeasonSubtitle = useMemo(() => {
		if (!activeSeason) return "Nema aktivne sezone";
		if (activeSeasonMatchCount > 0) {
			return `U tijeku • ${activeSeasonMatchCount}. kolo`;
		}
		return "U tijeku • Sezona u pripremi";
	}, [activeSeason, activeSeasonMatchCount]);

	// Filtered list of seasons
	const filteredSeasons = useMemo(() => {
		if (!seasons) return [];
		return seasons.filter((season) => {
			const isActive = season.id === activeSeasonId;
			if (statusFilter === "active" && !isActive) return false;
			if (statusFilter === "completed" && isActive) return false;
			return true;
		});
	}, [seasons, statusFilter, activeSeasonId]);

	const formatSeasonDuration = (season: Season) => {
		const start = dayjs(season.startDate).locale("hr").format("DD.MM.YYYY.");
		const end = dayjs(season.endDate).locale("hr").format("DD.MM.YYYY.");
		return `${start} do ${end}`;
	};

	return (
		<Container maxWidth="xl" sx={{ py: 4 }}>
			{/* Top Metric Cards */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
					gap: 3,
					mb: 5,
				}}
			>
				{/* Card 1: Ukupno sezona */}
				<Card
					sx={{
						backgroundColor: "background.paper",
						borderRadius: 4,
						p: "1.75rem !important",
						border: (theme) => `1px solid ${theme.palette.divider}`,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Box>
						<Typography
							variant="caption"
							sx={{
								textTransform: "uppercase",
								letterSpacing: "0.08em",
								fontWeight: 700,
								color: "text.secondary",
								display: "block",
								mb: 0.5,
							}}
						>
							Ukupno Sezona
						</Typography>
						<Stack direction="row" alignItems="baseline" spacing={1.5}>
							<Typography variant="h3" component="span" sx={{ fontWeight: 800, lineHeight: 1 }}>
								{seasons?.length ?? 0}
							</Typography>
							<Typography variant="body2" sx={{ color: "text.secondary" }}>
								Evidentirane lige
							</Typography>
						</Stack>
					</Box>
					<Box
						sx={{
							width: 48,
							height: 48,
							borderRadius: "50%",
							backgroundColor: "rgba(255, 255, 255, 0.05)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "text.primary",
						}}
					>
						<ViewModuleIcon />
					</Box>
				</Card>

				{/* Card 2: Trenutno aktivna */}
				<Card
					sx={{
						backgroundColor: "background.paper",
						borderRadius: 4,
						p: "1.75rem !important",
						border: (theme) => `1px solid ${theme.palette.divider}`,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Box>
						<Typography
							variant="caption"
							sx={{
								textTransform: "uppercase",
								letterSpacing: "0.08em",
								fontWeight: 700,
								color: "text.secondary",
								display: "block",
								mb: 0.5,
							}}
						>
							Trenutno Aktivna
						</Typography>
						<Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 0.75, lineHeight: 1.1 }}>
							{activeSeason?.name ?? "Nema aktivne"}
						</Typography>
						<Stack direction="row" alignItems="center" spacing={1}>
							<Box
								sx={{
									width: 8,
									height: 8,
									borderRadius: "50%",
									backgroundColor: "info.main",
								}}
							/>
							<Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
								{activeSeasonSubtitle}
							</Typography>
						</Stack>
					</Box>
					<Box
						sx={{
							width: 48,
							height: 48,
							borderRadius: "50%",
							backgroundColor: "rgba(255, 255, 255, 0.05)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "text.primary",
						}}
					>
						<BoltIcon />
					</Box>
				</Card>

				{/* Card 3: Sljedeći termin */}
				<Card
					sx={{
						backgroundColor: "background.paper",
						borderRadius: 4,
						p: "1.75rem !important",
						border: (theme) => `1px solid ${theme.palette.divider}`,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Box>
						<Typography
							variant="caption"
							sx={{
								textTransform: "uppercase",
								letterSpacing: "0.08em",
								fontWeight: 700,
								color: "text.secondary",
								display: "block",
								mb: 0.5,
							}}
						>
							Sljedeći Termin
						</Typography>
						<Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 0.75, lineHeight: 1.1 }}>
							Ponedjeljak 19:00h
						</Typography>
						<Stack direction="row" alignItems="center" spacing={0.5}>
							<LocationOnOutlinedIcon sx={{ fontSize: "1rem", color: "text.secondary" }} />
							<Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
								ŠD Hotanj • {nextMonday.locale("hr").format("DD.MM.YYYY.")}
							</Typography>
						</Stack>
					</Box>
					<Box
						sx={{
							width: 48,
							height: 48,
							borderRadius: "50%",
							backgroundColor: "rgba(255, 255, 255, 0.05)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "text.primary",
						}}
					>
						<CalendarMonthIcon />
					</Box>
				</Card>
			</Box>

			{/* Page Header */}
			<Stack spacing={0.5} sx={{ mb: 4 }}>
				<Typography
					variant="caption"
					sx={{
						textTransform: "uppercase",
						letterSpacing: "0.14em",
						fontWeight: 700,
						color: "text.secondary",
						display: "block",
					}}
				>
					HPD PRSTEN • NATJECANJA
				</Typography>
				<Typography variant="h2" component="h1" sx={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
					Popis Sezona
				</Typography>
				<Typography variant="body1" sx={{ color: "text.secondary" }}>
					Pregled i arhiviranje natjecateljskih sezona lige HPD Prsten
				</Typography>
			</Stack>

			{/* Filter Tabs and View Toggle */}
			<Stack
				direction={{ xs: "column", sm: "row" }}
				justifyContent="space-between"
				alignItems={{ xs: "flex-start", sm: "center" }}
				spacing={2}
				sx={{ mb: 4 }}
			>
				<Box
					sx={{
						display: "flex",
						backgroundColor: "background.paper",
						borderRadius: "24px",
						p: 0.5,
						border: (theme) => `1px solid ${theme.palette.divider}`,
					}}
				>
					{(
						[
							{ key: "all", label: "Sve" },
							{ key: "active", label: "Aktivne" },
							{ key: "completed", label: "Završene" },
						] as const
					).map((tab) => {
						const selected = statusFilter === tab.key;
						return (
							<Button
								key={tab.key}
								size="small"
								onClick={() => setStatusFilter(tab.key)}
								sx={{
									textTransform: "none",
									fontWeight: selected ? 700 : 500,
									borderRadius: "20px",
									px: 2,
									py: 0.5,
									color: selected ? "text.primary" : "text.secondary",
									backgroundColor: selected ? "rgba(255, 255, 255, 0.12)" : "transparent",
									"&:hover": {
										backgroundColor: selected ? "rgba(255, 255, 255, 0.18)" : "rgba(255, 255, 255, 0.05)",
									},
								}}
							>
								{tab.label}
							</Button>
						);
					})}
				</Box>

				<ToggleButtonGroup
					value={viewMode}
					exclusive
					onChange={(_e, nextView) => {
						if (nextView) setViewMode(nextView);
					}}
					size="small"
					sx={{
						backgroundColor: "background.paper",
						borderRadius: "24px",
						border: (theme) => `1px solid ${theme.palette.divider}`,
						"& .MuiToggleButton-root": {
							border: 0,
							borderRadius: "20px",
							px: 1.2,
							py: 0.5,
							color: "text.secondary",
							"&.Mui-selected": {
								color: "text.primary",
								backgroundColor: "rgba(255, 255, 255, 0.12)",
							},
						},
					}}
				>
					<ToggleButton value="grid" aria-label="mrežni prikaz">
						<ViewModuleIcon fontSize="small" />
					</ToggleButton>
					<ToggleButton value="list" aria-label="popisni prikaz">
						<ViewListIcon fontSize="small" />
					</ToggleButton>
				</ToggleButtonGroup>
			</Stack>

			{/* Loading & Error States */}
			{seasonsLoading && (
				<Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
					<CircularProgress />
				</Box>
			)}

			{seasonsError && (
				<Alert severity="error" sx={{ mb: 4 }}>
					Greška pri učitavanju sezona.
				</Alert>
			)}

			{/* Season Cards Grid / List */}
			{!seasonsLoading && filteredSeasons && (
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns:
							viewMode === "grid" ? { xs: "1fr", md: "repeat(2, 1fr)" } : "1fr",
						gap: 3.5,
					}}
				>
					{filteredSeasons.map((season) => {
						const isActive = season.id === activeSeasonId;
						const stats = seasonStatsMap[season.id];
						const hasRealData = Boolean(stats && stats.matchCount > 0);
						const matchesPlayed = stats?.matchCount ?? 0;
						const totalPlanned = 16;
						const progressPct = hasRealData
							? Math.min(Math.round((matchesPlayed / totalPlanned) * 100), 100)
							: 0;

						let leaderOrWinner = "-";
						if (hasRealData && stats) {
							if (stats.firstTeamSetsWon > stats.secondTeamSetsWon) {
								leaderOrWinner = stats.firstTeamName || "Crni";
							} else if (stats.secondTeamSetsWon > stats.firstTeamSetsWon) {
								leaderOrWinner = stats.secondTeamName || "Bijeli";
							} else if (stats.firstTeamWins > stats.secondTeamWins) {
								leaderOrWinner = stats.firstTeamName || "Crni";
							} else if (stats.secondTeamWins > stats.firstTeamWins) {
								leaderOrWinner = stats.secondTeamName || "Bijeli";
							} else {
								leaderOrWinner = "Neriješeno";
							}
						}

						return (
							<Card
								key={season.id}
								sx={{
									backgroundColor: "background.paper",
									borderRadius: 4,
									p: "2rem !important",
									border: (theme) =>
										isActive
											? `1px solid ${theme.palette.info.light || theme.palette.primary.main}`
											: `1px solid ${theme.palette.divider}`,
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									gap: 3,
									position: "relative",
									boxShadow: (theme) =>
										isActive ? `0 0 24px -4px ${theme.palette.primary.main}26` : "none",
								}}
							>
								{/* Header */}
								<Box>
									<Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
										<Box>
											<Typography
												variant="caption"
												sx={{
													textTransform: "uppercase",
													letterSpacing: "0.1em",
													fontWeight: 700,
													color: "text.secondary",
													display: "block",
												}}
											>
												{isActive ? "NATJECATELJSKA SEZONA" : "ARHIVIRANA SEZONA"}
											</Typography>
											<Typography variant="h3" component="h2" sx={{ fontWeight: 800, mt: 0.5 }}>
												{season.name}
											</Typography>
										</Box>

										{isActive ? (
											<Chip
												label="Aktivna sezona"
												size="small"
												sx={{
													backgroundColor: "info.main",
													color: "info.contrastText",
													fontWeight: 700,
													borderRadius: "16px",
													px: 0.5,
												}}
											/>
										) : (
											<Chip
												icon={<CheckCircleOutlineIcon sx={{ fontSize: "1rem !important", color: "inherit" }} />}
												label="Završena sezona"
												size="small"
												sx={{
													backgroundColor: "rgba(255, 255, 255, 0.05)",
													color: "text.secondary",
													fontWeight: 600,
													borderRadius: "16px",
													px: 0.5,
													border: (theme) => `1px solid ${theme.palette.divider}`,
												}}
											/>
										)}
									</Stack>
								</Box>

								{/* Duration pill banner */}
								<Box
									sx={{
										backgroundColor: "rgba(255, 255, 255, 0.03)",
										borderRadius: 3,
										p: 2,
										display: "flex",
										alignItems: "center",
										gap: 2,
										border: (theme) => `1px solid ${theme.palette.divider}`,
									}}
								>
									<CalendarTodayOutlinedIcon sx={{ color: "text.secondary", fontSize: "1.4rem" }} />
									<Box>
										<Typography
											variant="caption"
											sx={{
												textTransform: "uppercase",
												letterSpacing: "0.08em",
												fontWeight: 700,
												color: "text.secondary",
												display: "block",
											}}
										>
											TRAJANJE
										</Typography>
										<Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }}>
											{formatSeasonDuration(season)}
										</Typography>
									</Box>
								</Box>

								{/* 2 Stats capsules: Broj kola & Vodeća ekipa (Active) / Pobjednik sezone (Completed) */}
								<Box
									sx={{
										display: "grid",
										gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
										gap: 1.5,
									}}
								>
									{/* Stat 1: Broj odigranih kola */}
									<Box
										sx={{
											backgroundColor: "rgba(255, 255, 255, 0.03)",
											borderRadius: 3,
											p: 2,
											border: (theme) => `1px solid ${theme.palette.divider}`,
										}}
									>
										<Typography
											variant="caption"
											sx={{
												textTransform: "uppercase",
												letterSpacing: "0.06em",
												fontWeight: 700,
												color: "text.secondary",
												display: "block",
												mb: 0.75,
											}}
										>
											{isActive ? "ODIGRANO" : "BROJ KOLA"}
										</Typography>
										<Stack direction="row" alignItems="baseline" spacing={0.75}>
											<Typography variant="h5" component="span" sx={{ fontWeight: 800 }}>
												{matchesPlayed}
											</Typography>
											<Typography variant="caption" sx={{ color: "text.secondary" }}>
												kola
											</Typography>
										</Stack>
									</Box>

									{/* Stat 2: Vodeća ekipa (Active) / Pobjednik sezone (Completed) */}
									<Box
										sx={{
											backgroundColor: "rgba(255, 255, 255, 0.03)",
											borderRadius: 3,
											p: 2,
											border: (theme) => `1px solid ${theme.palette.divider}`,
										}}
									>
										<Typography
											variant="caption"
											sx={{
												textTransform: "uppercase",
												letterSpacing: "0.06em",
												fontWeight: 700,
												color: "text.secondary",
												display: "block",
												mb: 0.75,
											}}
										>
											{isActive ? "VODEĆA EKIPA" : "POBJEDNIK SEZONE"}
										</Typography>
										<Stack direction="row" alignItems="center" spacing={0.75}>
											{isActive ? (
												hasRealData ? (
													<>
														<Box
															sx={{
																width: 8,
																height: 8,
																borderRadius: "50%",
																backgroundColor: "text.primary",
															}}
														/>
														<Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }} noWrap>
															{leaderOrWinner}
														</Typography>
													</>
												) : (
													<Typography variant="body1" sx={{ fontWeight: 700, color: "text.secondary" }}>
														-
													</Typography>
												)
											) : (
												<>
													<EmojiEventsOutlinedIcon sx={{ fontSize: "1.2rem", color: "primary.main" }} />
													<Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }} noWrap>
														{leaderOrWinner}
													</Typography>
												</>
											)}
										</Stack>
									</Box>
								</Box>

								{/* Progress / Completion row */}
								{isActive ? (
									<Box
										sx={{
											backgroundColor: "rgba(255, 255, 255, 0.02)",
											borderRadius: 3,
											p: 2,
											border: (theme) => `1px solid ${theme.palette.divider}`,
										}}
									>
										<Stack direction="row" alignItems="center" spacing={2}>
											{/* Circular progress badge */}
											<Box
												sx={{
													width: 44,
													height: 44,
													borderRadius: "50%",
													border: (theme) => `3px solid ${theme.palette.divider}`,
													borderTopColor: "primary.main",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													flexShrink: 0,
												}}
											>
												<Typography variant="caption" sx={{ fontWeight: 800 }}>
													{progressPct}%
												</Typography>
											</Box>

											<Box sx={{ width: "100%" }}>
												<Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
													{hasRealData ? "Napredak kalendara sezone" : "Sezona u pripremi"}
												</Typography>
												<Typography variant="caption" sx={{ color: "text.secondary" }}>
													{hasRealData
														? `${matchesPlayed} od planiranih ${totalPlanned} termina odigrano`
														: "Nema odigranih termina"}
												</Typography>
												<LinearProgress
													variant="determinate"
													value={progressPct}
													sx={{
														height: 4,
														borderRadius: 2,
														mt: 0.75,
														backgroundColor: "rgba(255,255,255,0.08)",
														"& .MuiLinearProgress-bar": {
															backgroundColor: "primary.main",
														},
													}}
												/>
											</Box>
										</Stack>
									</Box>
								) : (
									<Box
										sx={{
											backgroundColor: "rgba(255, 255, 255, 0.02)",
											borderRadius: 3,
											p: 2,
											border: (theme) => `1px solid ${theme.palette.divider}`,
											display: "flex",
											alignItems: "center",
										}}
									>
										<Stack direction="row" alignItems="center" spacing={1.75}>
											<Box
												sx={{
													width: 40,
													height: 40,
													borderRadius: "50%",
													backgroundColor: "rgba(255, 255, 255, 0.05)",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													color: "text.secondary",
												}}
											>
												<WorkspacePremiumOutlinedIcon />
											</Box>
											<Box>
												<Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
													{hasRealData ? "Kompletirana sezona" : "Arhivirana sezona"}
												</Typography>
												<Typography variant="caption" sx={{ color: "text.secondary" }}>
													{hasRealData
														? `Svi službeni rezultati verificirani (${matchesPlayed} kola)`
														: "Nema evidentiranih utakmica za ovu sezonu"}
												</Typography>
											</Box>
										</Stack>
									</Box>
								)}
							</Card>
						);
					})}
				</Box>
			)}

			{!seasonsLoading && filteredSeasons.length === 0 && (
				<Box sx={{ py: 6, textAlign: "center" }}>
					<Typography variant="body1" sx={{ color: "text.secondary" }}>
						Nema pronađenih sezona za odabrani filter.
					</Typography>
				</Box>
			)}
		</Container>
	);
}
