import type { MatchSet } from "../types/match";

/**
 * Checks if a score qualifies as a set win.
 * Rule: At least 6 goals and at least 2 goals difference.
 */
export const isSetWinner = (score: number, opponentScore: number) => {
	return score >= 6 && score - opponentScore >= 2;
};

/**
 * Calculates the total score of a match based on its sets.
 */
export const calculateMatchScore = (sets: MatchSet[]) => {
	let blackTotal = 0;
	let whiteTotal = 0;

	sets.forEach((set) => {
		if (isSetWinner(set.blackScore, set.whiteScore)) {
			blackTotal++;
		} else if (isSetWinner(set.whiteScore, set.blackScore)) {
			whiteTotal++;
		}
	});

	return { blackTotal, whiteTotal };
};
