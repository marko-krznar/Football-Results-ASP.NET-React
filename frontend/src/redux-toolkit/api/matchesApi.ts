import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Match {
	id: number;
	seasonId: number;
	seasonName: string;
	date: string; // DateOnly serializira se kao "YYYY-MM-DD"
	location: string | null;
	firstTeamId: number;
	firstTeamName: string;
	secondTeamId: number;
	secondTeamName: string;
	note: string | null;
	firstTeamSetsWon: number;
	secondTeamSetsWon: number;
	firstTeamTotalGoals: number;
	secondTeamTotalGoals: number;
}

export interface CreateMatchRequest {
	seasonId: number;
	date: string; // "YYYY-MM-DD"
	location?: string;
	firstTeamId: number;
	secondTeamId: number;
	note?: string;
}

export interface CreateMatchWithDetailsRequest {
	seasonId: number;
	date: string; // "YYYY-MM-DD"
	location?: string;
	firstTeamId: number;
	secondTeamId: number;
	note?: string;
	sets: {
		setNumber: number;
		firstTeamGoals: number;
		secondTeamGoals: number;
	}[];
	firstTeamPlayerIds: number[];
	secondTeamPlayerIds: number[];
}

// NAPOMENA: prilagodi baseUrl istom onome koji koristiš u teamsApi/playersApi
export const matchesApi = createApi({
	reducerPath: "matchesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	tagTypes: ["Matches"],
	endpoints: (builder) => ({
		getMatches: builder.query<Match[], void>({
			query: () => "/matches",
			providesTags: ["Matches"],
		}),
		getMatchById: builder.query<Match, number>({
			query: (id) => `/matches/${id}`,
			providesTags: (_result, _error, id) => [{ type: "Matches", id }],
		}),
		addMatch: builder.mutation<Match, CreateMatchRequest>({
			query: (body) => ({
				url: "/matches",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Matches"],
		}),
		addMatchWithDetails: builder.mutation<
			Match,
			CreateMatchWithDetailsRequest
		>({
			query: (body) => ({
				url: "/matches/full",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Matches"],
		}),
	}),
});

export const {
	useGetMatchesQuery,
	useGetMatchByIdQuery,
	useAddMatchMutation,
	useAddMatchWithDetailsMutation,
} = matchesApi;
