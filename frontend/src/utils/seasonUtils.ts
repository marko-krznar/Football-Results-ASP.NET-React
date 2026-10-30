import dayjs from "dayjs";
import "dayjs/locale/hr";
import type { Match } from "../redux/api/matchesApi";
import type { Season } from "../redux/api/seasonsApi";

export interface SeasonStats {
	matchCount: number;
	firstTeamWins: number;
	secondTeamWins: number;
	firstTeamSetsWon: number;
	secondTeamSetsWon: number;
	firstTeamName: string;
	secondTeamName: string;
	latestLocation?: string;
}

export type SeasonStatsMap = Record<number, SeasonStats>;

/**
 * Aggregates match statistics per season ID.
 */
export function calculateSeasonStatsMap(matches?: Match[]): SeasonStatsMap {
	const map: SeasonStatsMap = {};
	if (!matches) return map;

	matches.forEach((m) => {
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
}

/**
 * Returns leader or winner team name based on sets and match wins.
 */
export function getSeasonLeaderOrWinner(stats?: SeasonStats): string {
	if (!stats || stats.matchCount === 0) return "-";

	if (stats.firstTeamSetsWon > stats.secondTeamSetsWon) {
		return stats.firstTeamName || "Crni";
	}
	if (stats.secondTeamSetsWon > stats.firstTeamSetsWon) {
		return stats.secondTeamName || "Bijeli";
	}
	if (stats.firstTeamWins > stats.secondTeamWins) {
		return stats.firstTeamName || "Crni";
	}
	if (stats.secondTeamWins > stats.firstTeamWins) {
		return stats.secondTeamName || "Bijeli";
	}
	return "Neriješeno";
}

/**
 * Calculates next Monday game schedule date (Mondays at 19:00).
 */
export function getNextMatchDate(referenceDate: dayjs.Dayjs = dayjs()): dayjs.Dayjs {
	const dayOfWeek = referenceDate.day();
	if (dayOfWeek === 1) {
		if (referenceDate.hour() >= 20) {
			return referenceDate.add(7, "day");
		}
		return referenceDate;
	}
	const daysUntilMonday = (8 - dayOfWeek) % 7 || 7;
	return referenceDate.add(daysUntilMonday, "day");
}

/**
 * Formats season start and end date range.
 */
export function formatSeasonDuration(season: Season): string {
	const start = dayjs(season.startDate).locale("hr").format("DD.MM.YYYY.");
	const end = dayjs(season.endDate).locale("hr").format("DD.MM.YYYY.");
	return `${start} do ${end}`;
}
