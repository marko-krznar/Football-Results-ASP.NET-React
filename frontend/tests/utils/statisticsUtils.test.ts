import { describe, it, expect } from "vitest";
import type { Match } from "../../src/redux/api/matchesApi";
import {
	calculateSeasonStatistics,
	type SeasonDetailedStats,
} from "../../src/utils/statisticsUtils";

describe("statisticsUtils", () => {
	const mockMatches: Match[] = [
		{
			id: 1,
			seasonId: 10,
			seasonName: "2025/2026",
			date: "2026-01-12",
			location: "Dvorana 1",
			firstTeamId: 1,
			firstTeamName: "Crni",
			secondTeamId: 2,
			secondTeamName: "Bijeli",
			note: null,
			countsForStandings: true,
			firstTeamSetsWon: 3,
			secondTeamSetsWon: 1,
			firstTeamTotalGoals: 23,
			secondTeamTotalGoals: 15,
			totalSets: 4,
			firstTeam: {
				teamId: 1,
				teamName: "Crni",
				playerNames: ["Luka", "Marko", "Ivan"],
				goalsPerSet: [6, 6, 5, 6],
				setsWon: 3,
				totalGoals: 23,
			},
			secondTeam: {
				teamId: 2,
				teamName: "Bijeli",
				playerNames: ["Petar", "Matej", "Ivan"], // note: Ivan played for Bijeli in this match? wait, Ivan in both or Ivan just one
				goalsPerSet: [3, 2, 6, 4],
				setsWon: 1,
				totalGoals: 15,
			},
		},
		{
			id: 2,
			seasonId: 10,
			seasonName: "2025/2026",
			date: "2026-01-19",
			location: "Dvorana 1",
			firstTeamId: 1,
			firstTeamName: "Crni",
			secondTeamId: 2,
			secondTeamName: "Bijeli",
			note: null,
			countsForStandings: true,
			firstTeamSetsWon: 1,
			secondTeamSetsWon: 3,
			firstTeamTotalGoals: 16,
			secondTeamTotalGoals: 25, // White won +9 differential
			totalSets: 4,
			firstTeam: {
				teamId: 1,
				teamName: "Crni",
				playerNames: ["Luka", "Filip", "Josip"],
				goalsPerSet: [3, 6, 4, 3],
				setsWon: 1,
				totalGoals: 16,
			},
			secondTeam: {
				teamId: 2,
				teamName: "Bijeli",
				playerNames: ["Petar", "Marko", "Toma"],
				goalsPerSet: [6, 4, 6, 9], // Set 4: 9-3, wait, set score 9-7 deuce test?
				setsWon: 3,
				totalGoals: 25,
			},
		},
		{
			id: 3,
			seasonId: 10,
			seasonName: "2025/2026",
			date: "2026-01-26",
			location: "Dvorana 1",
			firstTeamId: 1,
			firstTeamName: "Crni",
			secondTeamId: 2,
			secondTeamName: "Bijeli",
			note: null,
			countsForStandings: true,
			firstTeamSetsWon: 3,
			secondTeamSetsWon: 2, // 5 sets!
			firstTeamTotalGoals: 32,
			secondTeamTotalGoals: 30, // 62 goals total!
			totalSets: 5,
			firstTeam: {
				teamId: 1,
				teamName: "Crni",
				playerNames: ["Luka", "Marko", "Ivan"],
				goalsPerSet: [6, 7, 5, 8, 6],
				setsWon: 3,
				totalGoals: 32,
			},
			secondTeam: {
				teamId: 2,
				teamName: "Bijeli",
				playerNames: ["Petar", "Filip", "Toma"],
				goalsPerSet: [4, 9, 6, 6, 5], // Set 2: 7-9 (deuce!)
				setsWon: 2,
				totalGoals: 30,
			},
		},
		{
			id: 4,
			seasonId: 10,
			seasonName: "2025/2026",
			date: "2026-02-02",
			location: "Dvorana 1",
			firstTeamId: 1,
			firstTeamName: "Crni",
			secondTeamId: 2,
			secondTeamName: "Bijeli",
			note: "Friendly game - not counting towards standings",
			countsForStandings: false, // uncounted
			firstTeamSetsWon: 4,
			secondTeamSetsWon: 0,
			firstTeamTotalGoals: 24,
			secondTeamTotalGoals: 5,
			totalSets: 4,
			firstTeam: {
				teamId: 1,
				teamName: "Crni",
				playerNames: ["Luka", "Guest1"],
				goalsPerSet: [6, 6, 6, 6],
				setsWon: 4,
				totalGoals: 24,
			},
			secondTeam: {
				teamId: 2,
				teamName: "Bijeli",
				playerNames: ["Guest2", "Guest3"],
				goalsPerSet: [1, 2, 1, 1],
				setsWon: 0,
				totalGoals: 5,
			},
		},
	];

	it("computes player appearance stats correctly across teams and overall", () => {
		const stats: SeasonDetailedStats = calculateSeasonStatistics(mockMatches);

		// Luka played in all 4 matches (all for Crni)
		const luka = stats.playerStats.find((p) => p.name === "Luka");
		expect(luka).toBeDefined();
		expect(luka?.totalAppearances).toBe(4);
		expect(luka?.blackAppearances).toBe(4);
		expect(luka?.whiteAppearances).toBe(0);

		// Marko played in match 1 (Crni), match 2 (Bijeli), match 3 (Crni)
		const marko = stats.playerStats.find((p) => p.name === "Marko");
		expect(marko).toBeDefined();
		expect(marko?.totalAppearances).toBe(3);
		expect(marko?.blackAppearances).toBe(2);
		expect(marko?.whiteAppearances).toBe(1);

		// Attendance leaders
		expect(stats.mostAppearancesOverall?.[0].name).toBe("Luka");
		expect(stats.mostAppearancesOverall?.[0].totalAppearances).toBe(4);

		expect(stats.mostAppearancesBlack?.[0].name).toBe("Luka");
		expect(stats.mostAppearancesWhite?.[0].name).toBe("Petar");
	});

	it("computes highest win for White and Black correctly from competitive matches only", () => {
		const stats = calculateSeasonStatistics(mockMatches);

		// Match 4 had 24-5 (+19), but it was uncounted (`countsForStandings: false`)
		// Match 1: Crni 23, Bijeli 15 (+8 margin for Crni)
		// Match 2: Crni 16, Bijeli 25 (+9 margin for Bijeli)
		expect(stats.highestWinBlack?.match.id).toBe(1);
		expect(stats.highestWinBlack?.goalDifference).toBe(8);
		expect(stats.highestWinBlack?.score).toBe("23 - 15");

		expect(stats.highestWinWhite?.match.id).toBe(2);
		expect(stats.highestWinWhite?.goalDifference).toBe(9);
		expect(stats.highestWinWhite?.score).toBe("25 - 16");
	});

	it("finds match with most goals and match with most sets", () => {
		const stats = calculateSeasonStatistics(mockMatches);

		// Match 3 had 32 + 30 = 62 goals, 5 sets
		expect(stats.matchWithMostGoals?.match.id).toBe(3);
		expect(stats.matchWithMostGoals?.totalGoals).toBe(62);

		expect(stats.matchWithMostSets?.match.id).toBe(3);
		expect(stats.matchWithMostSets?.totalSets).toBe(5);
	});

	it("identifies longest deuce set", () => {
		const stats = calculateSeasonStatistics(mockMatches);

		// Match 3, set 2: Crni 7, Bijeli 9 (16 total points, winning score 9 >= 7)
		expect(stats.longestDeuceSet).toBeDefined();
		expect(stats.longestDeuceSet?.matchId).toBe(3);
		expect(stats.longestDeuceSet?.winningScore).toBe(9);
		expect(stats.longestDeuceSet?.losingScore).toBe(7);
	});

	it("computes closest thriller match", () => {
		const stats = calculateSeasonStatistics(mockMatches);

		// Match 3: 32 vs 30 -> goal difference 2
		expect(stats.closestMatch?.match.id).toBe(3);
		expect(stats.closestMatch?.goalDifference).toBe(2);
	});

	it("handles empty or undefined matches gracefully", () => {
		const stats = calculateSeasonStatistics(undefined);
		expect(stats.totalCompetitiveMatches).toBe(0);
		expect(stats.playerStats).toEqual([]);
		expect(stats.highestWinBlack).toBeNull();
		expect(stats.highestWinWhite).toBeNull();
		expect(stats.matchWithMostGoals).toBeNull();
	});
});
