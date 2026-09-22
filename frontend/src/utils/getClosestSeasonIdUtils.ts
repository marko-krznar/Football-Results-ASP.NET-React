import dayjs from "dayjs";
import type { Season } from "../redux/api/seasonsApi";

/**
 * Returns the season ID that is closest to today's date.
 * @param {Array<{id: number, startDate: string, endDate: string}>} seasons
 * @returns {number|string|null} ID of the closest season
 */
export const getClosestSeasonId = (seasons: Season[]) => {
	if (!Array.isArray(seasons) || seasons.length === 0) return null;

	const today = dayjs();

	// Calculates the smallest day difference for a given season
	const getSeasonDiff = (season: Season) =>
		Math.min(Math.abs(dayjs(season.startDate).diff(today)), Math.abs(dayjs(season.endDate).diff(today)));

	const closestSeason = seasons.reduce((closest, current) =>
		getSeasonDiff(current) < getSeasonDiff(closest) ? current : closest
	);

	return closestSeason.id;
};
