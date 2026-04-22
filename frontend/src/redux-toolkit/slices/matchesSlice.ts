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
			blackScore: 2,
			whiteScore: 0,
			date: "2026-04-20",
			sets: [
				{ id: 1, blackScore: 6, whiteScore: 3 },
				{ id: 2, blackScore: 6, whiteScore: 2 },
				{ id: 3, blackScore: 2, whiteScore: 2 },
			],
			whiteTeamPlayers: [
				{ id: 3, name: "Mališa", isCaptain: false, team: 1 },
				{ id: 4, name: "Dama", isCaptain: false, team: 1 },
				{ id: 6, name: "Rotac", isCaptain: false, team: 1 },
				{ id: 7, name: "Dino", isCaptain: false, team: 1 },
				{ id: 12, name: "Marko", isCaptain: false, team: 1 },
				{ id: 13, name: "Ante", isCaptain: true, team: 1 },
				{ id: 13, name: "Lale", isCaptain: true, team: 1 },
				{ id: 13, name: "Haris", isCaptain: true, team: 1 },
			],
			blackTeamPlayers: [
				{ id: 17, name: "Perende", isCaptain: false, team: 2 },
				{ id: 19, name: "Bruno", isCaptain: false, team: 2 },
				{ id: 20, name: "Miro", isCaptain: false, team: 2 },
				{ id: 20, name: "Vukovarac", isCaptain: false, team: 2 },
				{ id: 20, name: "Lukas", isCaptain: false, team: 2 },
				{ id: 20, name: "Mate", isCaptain: false, team: 2 },
			],
		},
		{
			id: 11,
			blackScore: 0,
			whiteScore: 1,
			date: "2026-04-13",
			sets: [
				{ id: 1, blackScore: 6, whiteScore: 3 },
				{ id: 2, blackScore: 4, whiteScore: 3 },
			],
			whiteTeamPlayers: [
				{ id: 3, name: "Marko", isCaptain: false, team: 1 },
				{ id: 4, name: "Dama", isCaptain: false, team: 1 },
				{ id: 6, name: "Mališa", isCaptain: false, team: 1 },
				{ id: 7, name: "Haris", isCaptain: false, team: 1 },
				{ id: 12, name: "Lale", isCaptain: false, team: 1 },
				{ id: 13, name: "Rotim", isCaptain: true, team: 1 },
				{ id: 13, name: "Dino", isCaptain: true, team: 1 },
			],
			blackTeamPlayers: [
				{ id: 17, name: "Tomo", isCaptain: false, team: 2 },
				{ id: 19, name: "Lukas", isCaptain: false, team: 2 },
				{ id: 20, name: "Filip", isCaptain: false, team: 2 },
				{ id: 20, name: "Miro", isCaptain: false, team: 2 },
				{ id: 20, name: "Mića", isCaptain: false, team: 2 },
				{ id: 20, name: "Bruno", isCaptain: false, team: 2 },
				{ id: 20, name: "Mate", isCaptain: false, team: 2 },
			],
		},
		{
			id: 2,
			blackScore: 2,
			whiteScore: 0,
			date: "2026-03-30",
			sets: [
				{ id: 1, blackScore: 6, whiteScore: 0 },
				{ id: 2, blackScore: 7, whiteScore: 5 },
			],
			whiteTeamPlayers: [
				{ id: 3, name: "Marko", isCaptain: false, team: 1 },
				{ id: 4, name: "Ante", isCaptain: false, team: 1 },
				{ id: 6, name: "Dama", isCaptain: false, team: 1 },
				{ id: 7, name: "Šime", isCaptain: false, team: 1 },
				{ id: 8, name: "Mališa", isCaptain: false, team: 1 },
				{ id: 12, name: "Rotim", isCaptain: false, team: 1 },
				{ id: 13, name: "Dino", isCaptain: true, team: 1 },
			],
			blackTeamPlayers: [
				{ id: 14, name: "Vukovarac", isCaptain: false, team: 2 },
				{ id: 15, name: "Bruno", isCaptain: false, team: 2 },
				{ id: 17, name: "Perić", isCaptain: false, team: 2 },
				{ id: 18, name: "Lovrić", isCaptain: false, team: 2 },
				{ id: 19, name: "Vinko", isCaptain: false, team: 2 },
				{ id: 20, name: "Tomo", isCaptain: false, team: 2 },
				{ id: 20, name: "Miro", isCaptain: false, team: 2 },
			],
		},
		{
			id: 3,
			blackScore: 1,
			whiteScore: 0,
			date: "2026-03-23",
			sets: [
				{ id: 1, blackScore: 6, whiteScore: 3 },
				{ id: 2, blackScore: 5, whiteScore: 3 },
			],
			whiteTeamPlayers: [
				{ id: 3, name: "Marko", isCaptain: false, team: 1 },
				{ id: 4, name: "Mališa", isCaptain: false, team: 1 },
				{ id: 6, name: "Ante", isCaptain: false, team: 1 },
				{ id: 7, name: "Dino", isCaptain: false, team: 1 },
				{ id: 8, name: "Bebić", isCaptain: false, team: 1 },
				{ id: 12, name: "Rotim", isCaptain: false, team: 1 },
				{ id: 13, name: "Juka", isCaptain: true, team: 1 },
			],
			blackTeamPlayers: [
				{ id: 14, name: "Tomo", isCaptain: false, team: 2 },
				{ id: 15, name: "Vukovarac", isCaptain: false, team: 2 },
				{ id: 17, name: "Bruno", isCaptain: false, team: 2 },
				{ id: 18, name: "Lovrić", isCaptain: false, team: 2 },
				{ id: 19, name: "Mate", isCaptain: false, team: 2 },
				{ id: 20, name: "Perić", isCaptain: false, team: 2 },
				{ id: 20, name: "Miro", isCaptain: false, team: 2 },
			],
		},
		{
			id: 4,
			blackScore: 0,
			whiteScore: 1,
			date: "2026-03-16",
			sets: [
				{ id: 1, blackScore: 6, whiteScore: 4 },
				{ id: 2, blackScore: 2, whiteScore: 2 },
			],
			whiteTeamPlayers: [
				{ id: 3, name: "Ante", isCaptain: false, team: 1 },
				{ id: 4, name: "Šime", isCaptain: false, team: 1 },
				{ id: 6, name: "Mališa", isCaptain: false, team: 1 },
				{ id: 7, name: "Dino", isCaptain: false, team: 1 },
				{ id: 8, name: "Juka", isCaptain: false, team: 1 },
				{ id: 12, name: "Rotim", isCaptain: false, team: 1 },
			],
			blackTeamPlayers: [
				{ id: 14, name: "Lukas", isCaptain: false, team: 2 },
				{ id: 15, name: "Lovrić", isCaptain: false, team: 2 },
				{ id: 17, name: "Vukovarac", isCaptain: false, team: 2 },
				{ id: 18, name: "Bruno", isCaptain: false, team: 2 },
				{ id: 19, name: "Perić", isCaptain: false, team: 2 },
				{ id: 20, name: "Mate", isCaptain: false, team: 2 },
				{ id: 20, name: "Miro", isCaptain: false, team: 2 },
			],
		},
		{
			id: 5,
			blackScore: 0,
			whiteScore: 1,
			date: "2026-03-9",
			sets: [{ id: 1, blackScore: 4, whiteScore: 6 }],
			whiteTeamPlayers: [
				{ id: 3, name: "Marko", isCaptain: false, team: 1 },
				{ id: 4, name: "Šime", isCaptain: false, team: 1 },
				{ id: 6, name: "Mališa", isCaptain: false, team: 1 },
				{ id: 7, name: "Bebić", isCaptain: false, team: 1 },
				{ id: 8, name: "Dino", isCaptain: false, team: 1 },
				{ id: 12, name: "Juka", isCaptain: false, team: 1 },
				{ id: 12, name: "Lale", isCaptain: false, team: 1 },
				{ id: 12, name: "Dama", isCaptain: false, team: 1 },
			],
			blackTeamPlayers: [
				{ id: 17, name: "Vukovarac", isCaptain: false, team: 2 },
				{ id: 18, name: "Bruno", isCaptain: false, team: 2 },
				{ id: 14, name: "Tomo", isCaptain: false, team: 2 },
				{ id: 15, name: "Lovrić", isCaptain: false, team: 2 },
				{ id: 19, name: "Mića", isCaptain: false, team: 2 },
				{ id: 20, name: "Mate", isCaptain: false, team: 2 },
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
