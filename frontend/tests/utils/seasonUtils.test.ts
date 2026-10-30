import { describe, it, expect } from "vitest";
import dayjs from "dayjs";
import {
	calculateSeasonStatsMap,
	getSeasonLeaderOrWinner,
	getNextMatchDate,
	formatSeasonDuration,
} from "../../src/utils/seasonUtils";
import type { Match } from "../../src/redux/api/matchesApi";
import type { Season } from "../../src/redux/api/seasonsApi";

describe("seasonUtils", () => {
	it("calculateSeasonStatsMap aggregates match counts, sets won, and team wins per season", () => {
		const matches = [
			{
				id: 1,
				seasonId: 10,
				firstTeamName: "Crni",
				secondTeamName: "Bijeli",
				firstTeamSetsWon: 2,
				secondTeamSetsWon: 1,
				firstTeam: { setsWon: 2, teamName: "Crni" },
				secondTeam: { setsWon: 1, teamName: "Bijeli" },
				location: "ŠD Hotanj",
			},
			{
				id: 2,
				seasonId: 10,
				firstTeamName: "Crni",
				secondTeamName: "Bijeli",
				firstTeamSetsWon: 1,
				secondTeamSetsWon: 2,
				firstTeam: { setsWon: 1, teamName: "Crni" },
				secondTeam: { setsWon: 2, teamName: "Bijeli" },
			},
		] as unknown as Match[];

		const statsMap = calculateSeasonStatsMap(matches);
		expect(statsMap[10]).toBeDefined();
		expect(statsMap[10].matchCount).toBe(2);
		expect(statsMap[10].firstTeamSetsWon).toBe(3);
		expect(statsMap[10].secondTeamSetsWon).toBe(3);
		expect(statsMap[10].firstTeamWins).toBe(1);
		expect(statsMap[10].secondTeamWins).toBe(1);
		expect(statsMap[10].latestLocation).toBe("ŠD Hotanj");
	});

	it("getSeasonLeaderOrWinner derives correct winner or tie", () => {
		expect(getSeasonLeaderOrWinner(undefined)).toBe("-");

		expect(
			getSeasonLeaderOrWinner({
				matchCount: 1,
				firstTeamWins: 1,
				secondTeamWins: 0,
				firstTeamSetsWon: 3,
				secondTeamSetsWon: 1,
				firstTeamName: "Crni",
				secondTeamName: "Bijeli",
			})
		).toBe("Crni");

		expect(
			getSeasonLeaderOrWinner({
				matchCount: 2,
				firstTeamWins: 1,
				secondTeamWins: 1,
				firstTeamSetsWon: 3,
				secondTeamSetsWon: 3,
				firstTeamName: "Crni",
				secondTeamName: "Bijeli",
			})
		).toBe("Neriješeno");
	});

	it("getNextMatchDate returns the upcoming Monday at 19:00", () => {
		// Tuesday
		const tuesday = dayjs("2026-10-27T10:00:00");
		const nextMonday = getNextMatchDate(tuesday);
		expect(nextMonday.day()).toBe(1); // 1 = Monday
		expect(nextMonday.format("YYYY-MM-DD")).toBe("2026-11-02");

		// Monday afternoon before match
		const mondayEarly = dayjs("2026-10-26T14:00:00");
		expect(getNextMatchDate(mondayEarly).format("YYYY-MM-DD")).toBe("2026-10-26");

		// Monday night after match
		const mondayLate = dayjs("2026-10-26T21:00:00");
		expect(getNextMatchDate(mondayLate).format("YYYY-MM-DD")).toBe("2026-11-02");
	});

	it("formatSeasonDuration formats start and end dates correctly", () => {
		const season = {
			id: 1,
			name: "Sezona 2026/2027",
			startDate: "2026-09-01",
			endDate: "2027-06-01",
		} as Season;

		expect(formatSeasonDuration(season)).toBe("01.09.2026. do 01.06.2027.");
	});
});
