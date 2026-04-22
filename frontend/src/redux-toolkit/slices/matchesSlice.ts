import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MatchOverall } from "../../types/match";

interface MatchesState {
	data: MatchOverall[];
	loading: boolean;
	error: string | null;
}

const initialState: MatchesState = {
	data: [
		{
			id: 1,
			blackScore: 1,
			whiteScore: 0,
			date: "2026-03-23",
			sets: [
				{ id: 1, blackScore: 6, whiteScore: 3 },
				{ id: 2, blackScore: 5, whiteScore: 3 },
			],
			whiteTeamPlayers: [
				{ id: 3, name: "Mališa", isCaptain: false, team: 1 },
				{ id: 4, name: "Dama", isCaptain: false, team: 1 },
				{ id: 6, name: "Rotac", isCaptain: false, team: 1 },
				{ id: 7, name: "Dino", isCaptain: false, team: 1 },
				{ id: 8, name: "Šime", isCaptain: false, team: 1 },
				{ id: 12, name: "Marko", isCaptain: false, team: 1 },
				{ id: 13, name: "Ante", isCaptain: true, team: 1 },
			],
			blackTeamPlayers: [
				{ id: 14, name: "Tomo", isCaptain: false, team: 2 },
				{ id: 15, name: "Vinko", isCaptain: false, team: 2 },
				{ id: 17, name: "Perende", isCaptain: false, team: 2 },
				{ id: 18, name: "Lovrić", isCaptain: false, team: 2 },
				{ id: 19, name: "Bruno", isCaptain: false, team: 2 },
				{ id: 20, name: "Miro", isCaptain: false, team: 2 },
			],
		},
	],
	loading: false,
	error: null,
};

const matchesSlice = createSlice({
	name: "matches",
	initialState,
	reducers: {
		setMatches: (state, action: PayloadAction<MatchOverall[]>) => {
			state.data = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
	},
});

export const { setMatches, setLoading, setError } = matchesSlice.actions;
export default matchesSlice.reducer;
