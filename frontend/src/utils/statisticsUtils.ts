import type { Match } from "../redux/api/matchesApi";

export interface PlayerStat {
	name: string;
	totalAppearances: number;
	blackAppearances: number;
	whiteAppearances: number;
	wins: number;
	winPercentage: number;
}

export interface MatchRecord {
	match: Match;
	goalDifference: number;
	score: string;
	setScore: string;
}

export interface MatchGoalsRecord {
	match: Match;
	totalGoals: number;
}

export interface MatchSetsRecord {
	match: Match;
	totalSets: number;
}

export interface DeuceSetRecord {
	matchId: number;
	date: string;
	winningTeamName: string;
	losingTeamName: string;
	winningScore: number;
	losingScore: number;
	setNumber: number;
}

export interface SeasonDetailedStats {
	totalMatchesPlayed: number;
	totalCompetitiveMatches: number;
	playerStats: PlayerStat[];
	mostAppearancesOverall: PlayerStat[];
	mostAppearancesBlack: PlayerStat[];
	mostAppearancesWhite: PlayerStat[];
	highestWinBlack: MatchRecord | null;
	highestWinWhite: MatchRecord | null;
	matchWithMostGoals: MatchGoalsRecord | null;
	matchWithMostSets: MatchSetsRecord | null;
	longestDeuceSet: DeuceSetRecord | null;
	closestMatch: MatchRecord | null;
	winRateLeader: PlayerStat | null;
}

/**
 * Computes deep season statistics and record milestones across played matches.
 */
export function calculateSeasonStatistics(matches?: Match[]): SeasonDetailedStats {
	const defaultResult: SeasonDetailedStats = {
		totalMatchesPlayed: 0,
		totalCompetitiveMatches: 0,
		playerStats: [],
		mostAppearancesOverall: [],
		mostAppearancesBlack: [],
		mostAppearancesWhite: [],
		highestWinBlack: null,
		highestWinWhite: null,
		matchWithMostGoals: null,
		matchWithMostSets: null,
		longestDeuceSet: null,
		closestMatch: null,
		winRateLeader: null,
	};

	if (!matches || matches.length === 0) {
		return defaultResult;
	}

	const playerMap: Record<
		string,
		{
			displayName: string;
			totalAppearances: number;
			blackAppearances: number;
			whiteAppearances: number;
			wins: number;
		}
	> = {};

	let highestWinBlack: MatchRecord | null = null;
	let highestWinWhite: MatchRecord | null = null;
	let matchWithMostGoals: MatchGoalsRecord | null = null;
	let matchWithMostSets: MatchSetsRecord | null = null;
	let longestDeuceSet: DeuceSetRecord | null = null;
	let closestMatch: MatchRecord | null = null;
	let minGoalDiff = Number.POSITIVE_INFINITY;

	let competitiveCount = 0;

	for (const match of matches) {
		const isCompetitive = match.countsForStandings !== false;
		if (isCompetitive) {
			competitiveCount++;
		}

		const blackTeamName = match.firstTeam?.teamName || match.firstTeamName || "Crni";
		const whiteTeamName = match.secondTeam?.teamName || match.secondTeamName || "Bijeli";

		const blackSets = match.firstTeam?.setsWon ?? match.firstTeamSetsWon ?? 0;
		const whiteSets = match.secondTeam?.setsWon ?? match.secondTeamSetsWon ?? 0;
		const blackGoals = match.firstTeam?.totalGoals ?? match.firstTeamTotalGoals ?? 0;
		const whiteGoals = match.secondTeam?.totalGoals ?? match.secondTeamTotalGoals ?? 0;

		const blackPlayers = match.firstTeam?.playerNames ?? [];
		const whitePlayers = match.secondTeam?.playerNames ?? [];

		const matchWinnerSide: "black" | "white" | "draw" =
			blackSets > whiteSets ? "black" : whiteSets > blackSets ? "white" : "draw";

		// 1. Process player appearances & win tracking (all matches for attendance)
		for (const pName of blackPlayers) {
			const cleanName = pName.trim();
			if (!cleanName) continue;
			const key = cleanName.toLowerCase();
			if (!playerMap[key]) {
				playerMap[key] = {
					displayName: cleanName,
					totalAppearances: 0,
					blackAppearances: 0,
					whiteAppearances: 0,
					wins: 0,
				};
			}
			playerMap[key].totalAppearances += 1;
			playerMap[key].blackAppearances += 1;
			if (matchWinnerSide === "black") {
				playerMap[key].wins += 1;
			}
		}

		for (const pName of whitePlayers) {
			const cleanName = pName.trim();
			if (!cleanName) continue;
			const key = cleanName.toLowerCase();
			if (!playerMap[key]) {
				playerMap[key] = {
					displayName: cleanName,
					totalAppearances: 0,
					blackAppearances: 0,
					whiteAppearances: 0,
					wins: 0,
				};
			}
			playerMap[key].totalAppearances += 1;
			playerMap[key].whiteAppearances += 1;
			if (matchWinnerSide === "white") {
				playerMap[key].wins += 1;
			}
		}

		// 2. Process competitive records
		if (isCompetitive) {
			const goalDiff = Math.abs(blackGoals - whiteGoals);
			const totalGoals = blackGoals + whiteGoals;
			const totalSets = match.totalSets || blackSets + whiteSets;

			// Highest win for Black
			if (blackSets > whiteSets) {
				if (!highestWinBlack || goalDiff > highestWinBlack.goalDifference) {
					highestWinBlack = {
						match,
						goalDifference: goalDiff,
						score: `${blackGoals} - ${whiteGoals}`,
						setScore: `${blackSets}:${whiteSets}`,
					};
				}
			}

			// Highest win for White
			if (whiteSets > blackSets) {
				if (!highestWinWhite || goalDiff > highestWinWhite.goalDifference) {
					highestWinWhite = {
						match,
						goalDifference: goalDiff,
						score: `${whiteGoals} - ${blackGoals}`,
						setScore: `${whiteSets}:${blackSets}`,
					};
				}
			}

			// Match with most goals
			if (!matchWithMostGoals || totalGoals > matchWithMostGoals.totalGoals) {
				matchWithMostGoals = { match, totalGoals };
			}

			// Match with most sets
			if (!matchWithMostSets || totalSets > matchWithMostSets.totalSets) {
				matchWithMostSets = { match, totalSets };
			}

			// Closest thriller (excluding draws or handling minimal differential)
			if (blackSets !== whiteSets) {
				if (goalDiff < minGoalDiff) {
					minGoalDiff = goalDiff;
					closestMatch = {
						match,
						goalDifference: goalDiff,
						score: `${blackGoals} - ${whiteGoals}`,
						setScore: `${blackSets}:${whiteSets}`,
					};
				}
			}

			// Check sets for overtime deuces (score >= 7)
			const blackSetsGoals = match.firstTeam?.goalsPerSet || [];
			const whiteSetsGoals = match.secondTeam?.goalsPerSet || [];
			const maxSetIndex = Math.min(blackSetsGoals.length, whiteSetsGoals.length);

			for (let i = 0; i < maxSetIndex; i++) {
				const bScore = blackSetsGoals[i];
				const wScore = whiteSetsGoals[i];
				const winningScore = Math.max(bScore, wScore);
				const losingScore = Math.min(bScore, wScore);

				if (winningScore >= 7 && winningScore - losingScore >= 2) {
					const currentWinningTotal = longestDeuceSet
						? longestDeuceSet.winningScore + longestDeuceSet.losingScore
						: 0;
					const thisTotal = winningScore + losingScore;

					if (thisTotal > currentWinningTotal) {
						longestDeuceSet = {
							matchId: match.id,
							date: match.date,
							winningTeamName: bScore > wScore ? blackTeamName : whiteTeamName,
							losingTeamName: bScore > wScore ? whiteTeamName : blackTeamName,
							winningScore,
							losingScore,
							setNumber: i + 1,
						};
					}
				}
			}
		}
	}

	// Transform player stats
	const playerStats: PlayerStat[] = Object.values(playerMap).map((p) => {
		const winPercentage = p.totalAppearances > 0 ? Math.round((p.wins / p.totalAppearances) * 100) : 0;
		return {
			name: p.displayName,
			totalAppearances: p.totalAppearances,
			blackAppearances: p.blackAppearances,
			whiteAppearances: p.whiteAppearances,
			wins: p.wins,
			winPercentage,
		};
	});

	// Sort player lists
	const mostAppearancesOverall = [...playerStats]
		.sort((a, b) => b.totalAppearances - a.totalAppearances || a.name.localeCompare(b.name))
		.slice(0, 5);

	const mostAppearancesBlack = [...playerStats]
		.filter((p) => p.blackAppearances > 0)
		.sort((a, b) => b.blackAppearances - a.blackAppearances || a.name.localeCompare(b.name))
		.slice(0, 5);

	const mostAppearancesWhite = [...playerStats]
		.filter((p) => p.whiteAppearances > 0)
		.sort((a, b) => b.whiteAppearances - a.whiteAppearances || a.name.localeCompare(b.name))
		.slice(0, 5);

	// Win rate leader: min threshold 3 matches (or max played if everyone has < 3)
	const maxMatches = Math.max(0, ...playerStats.map((p) => p.totalAppearances));
	const threshold = maxMatches >= 3 ? 3 : Math.max(1, maxMatches);
	const qualifyingPlayers = playerStats.filter((p) => p.totalAppearances >= threshold);
	const winRateLeader =
		qualifyingPlayers.length > 0
			? [...qualifyingPlayers].sort((a, b) => b.winPercentage - a.winPercentage || b.wins - a.wins)[0]
			: null;

	return {
		totalMatchesPlayed: matches.length,
		totalCompetitiveMatches: competitiveCount,
		playerStats,
		mostAppearancesOverall,
		mostAppearancesBlack,
		mostAppearancesWhite,
		highestWinBlack,
		highestWinWhite,
		matchWithMostGoals,
		matchWithMostSets,
		longestDeuceSet,
		closestMatch,
		winRateLeader,
	};
}
