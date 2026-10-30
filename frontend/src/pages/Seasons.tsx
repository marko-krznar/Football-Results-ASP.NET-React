import { useState, useMemo } from "react";
import {
	Box,
	Container,
	Stack,
	Typography,
	CircularProgress,
	Alert,
} from "@mui/material";
import dayjs from "dayjs";
import { useGetSeasonsQuery } from "../redux/api/seasonsApi";
import { useGetAllMatchesQuery, useGetMatchesQuery } from "../redux/api/matchesApi";
import { getClosestSeasonId } from "../utils/getClosestSeasonIdUtils";
import {
	calculateSeasonStatsMap,
	getNextMatchDate,
} from "../utils/seasonUtils";
import SeasonMetricsOverview from "../components/seasons/SeasonMetricsOverview";
import SeasonFilterBar, { type FilterTab, type ViewMode } from "../components/seasons/SeasonFilterBar";
import SeasonCard from "../components/seasons/SeasonCard";

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
		return calculateSeasonStatsMap(allMatches);
	}, [allMatches]);

	// Next Monday calculation: match is played every Monday at 19:00 at ŠD Hotanj
	const nextMatchDate = useMemo(() => getNextMatchDate(), []);

	const activeSeasonMatchCount = activeSeason ? seasonStatsMap[activeSeason.id]?.matchCount ?? 0 : 0;
	const activeSeasonSubtitle = useMemo(() => {
		if (!activeSeason) return "Nema aktivne sezone";
		if (activeSeasonMatchCount > 0) {
			return `U tijeku • ${activeSeasonMatchCount}. kolo`;
		}
		return "U tijeku • Sezona u pripremi";
	}, [activeSeason, activeSeasonMatchCount]);

	// Filtered list of seasons (active season first, then inactive seasons)
	const filteredSeasons = useMemo(() => {
		if (!seasons) return [];
		return [...seasons]
			.filter((season) => {
				const isActive = season.id === activeSeasonId;
				if (statusFilter === "active" && !isActive) return false;
				if (statusFilter === "completed" && isActive) return false;
				return true;
			})
			.sort((a, b) => {
				const aIsActive = a.id === activeSeasonId;
				const bIsActive = b.id === activeSeasonId;
				if (aIsActive && !bIsActive) return -1;
				if (!aIsActive && bIsActive) return 1;
				return dayjs(b.startDate).valueOf() - dayjs(a.startDate).valueOf();
			});
	}, [seasons, statusFilter, activeSeasonId]);

	return (
		<Container maxWidth="xl" sx={{ py: 4 }}>
			{/* Top Metric Cards */}
			<SeasonMetricsOverview
				totalSeasons={seasons?.length ?? 0}
				activeSeasonName={activeSeason?.name}
				activeSeasonSubtitle={activeSeasonSubtitle}
				nextMatchDate={nextMatchDate}
			/>

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
				<Typography
					variant="h2"
					component="h1"
					sx={{ fontWeight: 900, letterSpacing: "-0.02em", color: "text.primary" }}
				>
					Popis Sezona
				</Typography>
				<Typography variant="body1" sx={{ color: "text.secondary" }}>
					Pregled i arhiviranje natjecateljskih sezona lige HPD Prsten
				</Typography>
			</Stack>

			{/* Filter Tabs and View Toggle */}
			<SeasonFilterBar
				statusFilter={statusFilter}
				onFilterChange={setStatusFilter}
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>

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
					{filteredSeasons.map((season) => (
						<SeasonCard
							key={season.id}
							season={season}
							isActive={season.id === activeSeasonId}
							stats={seasonStatsMap[season.id]}
						/>
					))}
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
