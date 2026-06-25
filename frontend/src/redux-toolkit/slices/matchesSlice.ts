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
			id: 1782427863389,
			date: "2026-06-01",
			blackScore: 11,
			whiteScore: 9,
			sets: [
				{
					id: 1,
					blackScore: 6,
					whiteScore: 3,
				},
				{
					id: 2,
					blackScore: 3,
					whiteScore: 1,
				},
			],
			whiteTeamPlayers: [
				{
					id: 112,
					name: "Ante",
					isCaptain: true,
					team: 1,
				},
				{
					id: 113,
					name: "Haris",
					isCaptain: false,
					team: 1,
				},
				{
					id: 115,
					name: "Mališa",
					isCaptain: false,
					team: 1,
				},
				{
					id: 118,
					name: "Rotač",
					isCaptain: false,
					team: 1,
				},
				{
					id: 124,
					name: "Marko",
					isCaptain: false,
					team: 1,
				},
			],
			blackTeamPlayers: [
				{
					id: 100,
					name: "Vukovarac",
					isCaptain: true,
					team: 2,
				},
				{
					id: 103,
					name: "Lukas",
					isCaptain: false,
					team: 2,
				},
				{
					id: 104,
					name: "Perende",
					isCaptain: false,
					team: 2,
				},
				{
					id: 105,
					name: "Lovrić",
					isCaptain: false,
					team: 2,
				},
				{
					id: 106,
					name: "Bruno",
					isCaptain: false,
					team: 2,
				},
				{
					id: 107,
					name: "Miro",
					isCaptain: false,
					team: 2,
				},
				{
					id: 108,
					name: "Mate",
					isCaptain: false,
					team: 2,
				},
			],
		},
		{
			id: 1779751334171,
			date: "2026-05-25",
			blackScore: 10,
			whiteScore: 9,
			sets: [
				{
					id: 1,
					blackScore: 4,
					whiteScore: 6,
				},
				{
					id: 2,
					blackScore: 0,
					whiteScore: 3,
				},
			],
			whiteTeamPlayers: [
				{
					id: 112,
					name: "Ante",
					isCaptain: true,
					team: 1,
				},
				{
					id: 113,
					name: "Haris",
					isCaptain: false,
					team: 1,
				},
				{
					id: 119,
					name: "Dino",
					isCaptain: false,
					team: 1,
				},
				{
					id: 124,
					name: "Marko",
					isCaptain: false,
					team: 1,
				},
			],
			blackTeamPlayers: [
				{
					id: 100,
					name: "Vukovarac",
					isCaptain: true,
					team: 2,
				},
				{
					id: 103,
					name: "Lukas",
					isCaptain: false,
					team: 2,
				},
				{
					id: 104,
					name: "Perende",
					isCaptain: false,
					team: 2,
				},
				{
					id: 105,
					name: "Lovrić",
					isCaptain: false,
					team: 2,
				},
				{
					id: 106,
					name: "Bruno",
					isCaptain: false,
					team: 2,
				},
				{
					id: 107,
					name: "Miro",
					isCaptain: false,
					team: 2,
				},
				{
					id: 108,
					name: "Mate",
					isCaptain: false,
					team: 2,
				},
			],
		},
		{
			id: 1779748173335,
			date: "2026-05-18",
			blackScore: 10,
			whiteScore: 8,
			sets: [
				{
					id: 1,
					blackScore: 6,
					whiteScore: 1,
				},
			],
			whiteTeamPlayers: [
				{
					id: 113,
					name: "Haris",
					isCaptain: false,
					team: 1,
				},
				{
					id: 116,
					name: "Dama",
					isCaptain: false,
					team: 1,
				},
				{
					id: 118,
					name: "Rotač",
					isCaptain: false,
					team: 1,
				},
				{
					id: 124,
					name: "Marko",
					isCaptain: false,
					team: 1,
				},
			],
			blackTeamPlayers: [
				{
					id: 101,
					name: "Tomo",
					isCaptain: false,
					team: 2,
				},
				{
					id: 102,
					name: "Vinko",
					isCaptain: false,
					team: 2,
				},
				{
					id: 105,
					name: "Lovrić",
					isCaptain: false,
					team: 2,
				},
				{
					id: 106,
					name: "Bruno",
					isCaptain: false,
					team: 2,
				},
				{
					id: 110,
					name: "Jerga",
					isCaptain: false,
					team: 2,
				},
				{
					id: 111,
					name: "Mića",
					isCaptain: false,
					team: 2,
				},
			],
		},
		{
			id: 1778884175144,
			date: "2026-05-11",
			blackScore: 9,
			whiteScore: 8,
			sets: [
				{
					id: 1,
					blackScore: 5,
					whiteScore: 6,
				},
			],
			whiteTeamPlayers: [
				{
					id: 112,
					name: "Ante",
					isCaptain: true,
					team: 1,
				},
				{
					id: 113,
					name: "Haris",
					isCaptain: false,
					team: 1,
				},
				{
					id: 115,
					name: "Mališa",
					isCaptain: false,
					team: 1,
				},
				{
					id: 117,
					name: "Lale",
					isCaptain: false,
					team: 1,
				},
				{
					id: 118,
					name: "Rotač",
					isCaptain: false,
					team: 1,
				},
				{
					id: 119,
					name: "Dino",
					isCaptain: false,
					team: 1,
				},
				{
					id: 123,
					name: "Kulić",
					isCaptain: false,
					team: 1,
				},
				{
					id: 124,
					name: "Marko",
					isCaptain: false,
					team: 1,
				},
			],
			blackTeamPlayers: [
				{
					id: 102,
					name: "Vinko",
					isCaptain: false,
					team: 2,
				},
				{
					id: 104,
					name: "Perende",
					isCaptain: false,
					team: 2,
				},
				{
					id: 105,
					name: "Lovrić",
					isCaptain: false,
					team: 2,
				},
				{
					id: 106,
					name: "Bruno",
					isCaptain: false,
					team: 2,
				},
				{
					id: 107,
					name: "Miro",
					isCaptain: false,
					team: 2,
				},
				{
					id: 108,
					name: "Mate",
					isCaptain: false,
					team: 2,
				},
			],
		},
		{
			id: 1779750915740,
			date: "2026-05-04",
			blackScore: 9,
			whiteScore: 8,
			sets: [
				{
					id: 1,
					blackScore: 6,
					whiteScore: 3,
				},
				{
					id: 2,
					blackScore: 2,
					whiteScore: 6,
				},
			],
			whiteTeamPlayers: [
				{
					id: 115,
					name: "Mališa",
					isCaptain: false,
					team: 1,
				},
				{
					id: 116,
					name: "Dama",
					isCaptain: false,
					team: 1,
				},
				{
					id: 117,
					name: "Lale",
					isCaptain: false,
					team: 1,
				},
				{
					id: 118,
					name: "Rotač",
					isCaptain: false,
					team: 1,
				},
				{
					id: 119,
					name: "Dino",
					isCaptain: false,
					team: 1,
				},
				{
					id: 124,
					name: "Marko",
					isCaptain: false,
					team: 1,
				},
			],
			blackTeamPlayers: [
				{
					id: 100,
					name: "Vukovarac",
					isCaptain: true,
					team: 2,
				},
				{
					id: 101,
					name: "Tomo",
					isCaptain: false,
					team: 2,
				},
				{
					id: 103,
					name: "Lukas",
					isCaptain: false,
					team: 2,
				},
				{
					id: 106,
					name: "Bruno",
					isCaptain: false,
					team: 2,
				},
				{
					id: 107,
					name: "Miro",
					isCaptain: false,
					team: 2,
				},
				{
					id: 108,
					name: "Mate",
					isCaptain: false,
					team: 2,
				},
				{
					id: 111,
					name: "Mića",
					isCaptain: false,
					team: 2,
				},
			],
		},
		{
			// odgođeno jer se nismo skupili - potrebno je dodati takvu opciju
			id: 1778190651699,
			date: "2026-04-27",
			blackScore: 8,
			whiteScore: 7,
			sets: [
				{
					id: 1,
					blackScore: 0,
					whiteScore: 0,
				},
			],
			whiteTeamPlayers: [
				{
					id: 115,
					name: "-",
					isCaptain: false,
					team: 1,
				},
			],
			blackTeamPlayers: [
				{
					id: 100,
					name: "-",
					isCaptain: false,
					team: 2,
				},
			],
		},
		{
			id: 1,
			blackScore: 8,
			whiteScore: 7,
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
			blackScore: 6,
			whiteScore: 7,
			date: "2026-04-13",
			sets: [
				{ id: 1, blackScore: 3, whiteScore: 6 },
				{ id: 2, blackScore: 3, whiteScore: 4 },
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
			blackScore: 6,
			whiteScore: 6,
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
			blackScore: 4,
			whiteScore: 6,
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
			blackScore: 3,
			whiteScore: 6,
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
			blackScore: 2,
			whiteScore: 6,
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
		{
			id: 1782428257231,
			date: "2026-03-02",
			blackScore: 2,
			whiteScore: 5,
			sets: [
				{
					id: 1,
					blackScore: 7,
					whiteScore: 9,
				},
				{
					id: 2,
					blackScore: 4,
					whiteScore: 2,
				},
			],
			whiteTeamPlayers: [
				{
					id: 112,
					name: "Ante",
					isCaptain: true,
					team: 1,
				},
				{
					id: 114,
					name: "Bebić",
					isCaptain: false,
					team: 1,
				},
				{
					id: 115,
					name: "Mališa",
					isCaptain: false,
					team: 1,
				},
				{
					id: 116,
					name: "Dama",
					isCaptain: false,
					team: 1,
				},
				{
					id: 118,
					name: "Rotač",
					isCaptain: false,
					team: 1,
				},
				{
					id: 119,
					name: "Dino",
					isCaptain: false,
					team: 1,
				},
				{
					id: 121,
					name: "Juka",
					isCaptain: false,
					team: 1,
				},
				{
					id: 123,
					name: "Kulić",
					isCaptain: false,
					team: 1,
				},
				{
					id: 124,
					name: "Marko",
					isCaptain: false,
					team: 1,
				},
			],
			blackTeamPlayers: [
				{
					id: 100,
					name: "Vukovarac",
					isCaptain: true,
					team: 2,
				},
				{
					id: 101,
					name: "Tomo",
					isCaptain: false,
					team: 2,
				},
				{
					id: 103,
					name: "Lukas",
					isCaptain: false,
					team: 2,
				},
				{
					id: 104,
					name: "Perende",
					isCaptain: false,
					team: 2,
				},
				{
					id: 107,
					name: "Miro",
					isCaptain: false,
					team: 2,
				},
				{
					id: 108,
					name: "Mate",
					isCaptain: false,
					team: 2,
				},
			],
		},
		{
			id: 1782428745304,
			date: "2026-02-23",
			blackScore: 2,
			whiteScore: 4,
			sets: [
				{
					id: 1,
					blackScore: 6,
					whiteScore: 3,
				},
				{
					id: 2,
					blackScore: 5,
					whiteScore: 3,
				},
			],
			whiteTeamPlayers: [
				{
					id: 112,
					name: "Ante",
					isCaptain: true,
					team: 1,
				},
				{
					id: 113,
					name: "Haris",
					isCaptain: false,
					team: 1,
				},
				{
					id: 114,
					name: "Bebić",
					isCaptain: false,
					team: 1,
				},
				{
					id: 115,
					name: "Mališa",
					isCaptain: false,
					team: 1,
				},
				{
					id: 116,
					name: "Dama",
					isCaptain: false,
					team: 1,
				},
				{
					id: 117,
					name: "Lale",
					isCaptain: false,
					team: 1,
				},
				{
					id: 118,
					name: "Rotač",
					isCaptain: false,
					team: 1,
				},
				{
					id: 121,
					name: "Juka",
					isCaptain: false,
					team: 1,
				},
				{
					id: 124,
					name: "Marko",
					isCaptain: false,
					team: 1,
				},
			],
			blackTeamPlayers: [
				{
					id: 100,
					name: "Vukovarac",
					isCaptain: true,
					team: 2,
				},
				{
					id: 101,
					name: "Tomo",
					isCaptain: false,
					team: 2,
				},
				{
					id: 102,
					name: "Vinko",
					isCaptain: false,
					team: 2,
				},
				{
					id: 104,
					name: "Perende",
					isCaptain: false,
					team: 2,
				},
				{
					id: 106,
					name: "Bruno",
					isCaptain: false,
					team: 2,
				},
				{
					id: 107,
					name: "Miro",
					isCaptain: false,
					team: 2,
				},
				{
					id: 111,
					name: "Mića",
					isCaptain: false,
					team: 2,
				},
			],
		},
		{
			id: 1782428635748,
			date: "2026-02-16",
			blackScore: 1,
			whiteScore: 4,
			sets: [
				{
					id: 1,
					blackScore: 4,
					whiteScore: 6,
				},
				{
					id: 2,
					blackScore: 3,
					whiteScore: 6,
				},
			],
			whiteTeamPlayers: [
				{
					id: 112,
					name: "Ante",
					isCaptain: true,
					team: 1,
				},
				{
					id: 113,
					name: "Haris",
					isCaptain: false,
					team: 1,
				},
				{
					id: 115,
					name: "Mališa",
					isCaptain: false,
					team: 1,
				},
				{
					id: 116,
					name: "Dama",
					isCaptain: false,
					team: 1,
				},
				{
					id: 117,
					name: "Lale",
					isCaptain: false,
					team: 1,
				},
				{
					id: 118,
					name: "Rotač",
					isCaptain: false,
					team: 1,
				},
				{
					id: 119,
					name: "Dino",
					isCaptain: false,
					team: 1,
				},
				{
					id: 123,
					name: "Kulić",
					isCaptain: false,
					team: 1,
				},
			],
			blackTeamPlayers: [
				{
					id: 100,
					name: "Vukovarac",
					isCaptain: true,
					team: 2,
				},
				{
					id: 101,
					name: "Tomo",
					isCaptain: false,
					team: 2,
				},
				{
					id: 102,
					name: "Vinko",
					isCaptain: false,
					team: 2,
				},
				{
					id: 103,
					name: "Lukas",
					isCaptain: false,
					team: 2,
				},
				{
					id: 104,
					name: "Perende",
					isCaptain: false,
					team: 2,
				},
				{
					id: 105,
					name: "Lovrić",
					isCaptain: false,
					team: 2,
				},
				{
					id: 106,
					name: "Bruno",
					isCaptain: false,
					team: 2,
				},
				{
					id: 108,
					name: "Mate",
					isCaptain: false,
					team: 2,
				},
			],
		},
		{
			id: 1782428496907,
			date: "2026-02-09",
			blackScore: 1,
			whiteScore: 2,
			sets: [
				{
					id: 1,
					blackScore: 2,
					whiteScore: 6,
				},
				{
					id: 2,
					blackScore: 6,
					whiteScore: 4,
				},
			],
			whiteTeamPlayers: [
				{
					id: 112,
					name: "Ante",
					isCaptain: true,
					team: 1,
				},
				{
					id: 113,
					name: "Haris",
					isCaptain: false,
					team: 1,
				},
				{
					id: 116,
					name: "Dama",
					isCaptain: false,
					team: 1,
				},
				{
					id: 117,
					name: "Lale",
					isCaptain: false,
					team: 1,
				},
				{
					id: 118,
					name: "Rotač",
					isCaptain: false,
					team: 1,
				},
				{
					id: 119,
					name: "Dino",
					isCaptain: false,
					team: 1,
				},
				{
					id: 121,
					name: "Juka",
					isCaptain: false,
					team: 1,
				},
				{
					id: 123,
					name: "Kulić",
					isCaptain: false,
					team: 1,
				},
				{
					id: 124,
					name: "Marko",
					isCaptain: false,
					team: 1,
				},
			],
			blackTeamPlayers: [
				{
					id: 100,
					name: "Vukovarac",
					isCaptain: true,
					team: 2,
				},
				{
					id: 101,
					name: "Tomo",
					isCaptain: false,
					team: 2,
				},
				{
					id: 102,
					name: "Vinko",
					isCaptain: false,
					team: 2,
				},
				{
					id: 105,
					name: "Lovrić",
					isCaptain: false,
					team: 2,
				},
				{
					id: 107,
					name: "Miro",
					isCaptain: false,
					team: 2,
				},
				{
					id: 108,
					name: "Mate",
					isCaptain: false,
					team: 2,
				},
				{
					id: 111,
					name: "Mića",
					isCaptain: false,
					team: 2,
				},
			],
		},
		{
			id: 1782428367061,
			date: "2026-02-02",
			blackScore: 0,
			whiteScore: 1,
			sets: [
				{
					id: 1,
					blackScore: 3,
					whiteScore: 6,
				},
				{
					id: 2,
					blackScore: 5,
					whiteScore: 5,
				},
			],
			whiteTeamPlayers: [
				{
					id: 112,
					name: "Ante",
					isCaptain: true,
					team: 1,
				},
				{
					id: 113,
					name: "Haris",
					isCaptain: false,
					team: 1,
				},
				{
					id: 116,
					name: "Dama",
					isCaptain: false,
					team: 1,
				},
				{
					id: 117,
					name: "Lale",
					isCaptain: false,
					team: 1,
				},
				{
					id: 118,
					name: "Rotač",
					isCaptain: false,
					team: 1,
				},
				{
					id: 119,
					name: "Dino",
					isCaptain: false,
					team: 1,
				},
				{
					id: 121,
					name: "Juka",
					isCaptain: false,
					team: 1,
				},
				{
					id: 124,
					name: "Marko",
					isCaptain: false,
					team: 1,
				},
			],
			blackTeamPlayers: [
				{
					id: 100,
					name: "Vukovarac",
					isCaptain: true,
					team: 2,
				},
				{
					id: 101,
					name: "Tomo",
					isCaptain: false,
					team: 2,
				},
				{
					id: 102,
					name: "Vinko",
					isCaptain: false,
					team: 2,
				},
				{
					id: 105,
					name: "Lovrić",
					isCaptain: false,
					team: 2,
				},
				{
					id: 107,
					name: "Miro",
					isCaptain: false,
					team: 2,
				},
				{
					id: 111,
					name: "Mića",
					isCaptain: false,
					team: 2,
				},
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
		addMatch: (state, action: PayloadAction<MatchOverall>) => {
			state.data = [action.payload, ...state.data];
		},
	},
});

export const { setMatches, setLoading, setError, addMatch } =
	matchesSlice.actions;
export default matchesSlice.reducer;
