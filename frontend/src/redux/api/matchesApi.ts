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
	totalSets: number;
	firstTeam: {
		teamId: number;
		teamName: string;
		playerNames: string[];
		goalsPerSet: number[];
		setsWon: number;
		totalGoals: number;
	};
	secondTeam: {
		teamId: number;
		teamName: string;
		playerNames: string[];
		goalsPerSet: number[];
		setsWon: number;
		totalGoals: number;
	};
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

export interface UpdateMatchRequest {
	id: number;
	date: string; // "YYYY-MM-DD"
	location?: string;
	note?: string;
}

export interface UpdateMatchWithDetailsRequest {
	id: number;
	date: string; // "YYYY-MM-DD"
	location?: string;
	note?: string;
	sets: {
		setNumber: number;
		firstTeamGoals: number;
		secondTeamGoals: number;
	}[];
	firstTeamPlayerIds: number[];
	secondTeamPlayerIds: number[];
}

export interface Team {
	teamId: number;
	teamName: string;
	totalSetsWon: number;
}

export interface SeasonSummary {
	seasonId: number;
	firstTeam: Team;
	secondTeam: Team;
}

export const matchesApi = createApi({
	reducerPath: "matchesApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api`, credentials: "include" }),
	tagTypes: ["Matches"],
	endpoints: (builder) => ({
		getMatches: builder.query<Match[], void>({
			query: () => "/matches/display",
			providesTags: ["Matches"],
		}),
		getMatchById: builder.query<Match, number>({
			query: (id) => `/matches/${id}`,
			providesTags: (_result, _error, id) => [{ type: "Matches", id }],
		}),
		getLatestMatch: builder.query<Match, void>({
			query: () => "/matches/latest-match-details",
			providesTags: ["Matches"],
		}),
		addMatch: builder.mutation<Match, CreateMatchRequest>({
			query: (body) => ({
				url: "/matches",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Matches"],
		}),
		addMatchWithDetails: builder.mutation<Match, CreateMatchWithDetailsRequest>({
			query: (body) => ({
				url: "/matches/full",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Matches"],
		}),
		getTotalSeasonScore: builder.query<SeasonSummary, number>({
			query: (id) => `/matches/season/${id}/score`,
			providesTags: (_result, _error, id) => [{ type: "Matches", id }],
		}),
		removeMatch: builder.mutation<void, { matchId: number }>({
			query: ({ matchId }) => {
				console.log("Match ID:", matchId);

				return {
					url: `/matches/${matchId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["Matches"],
		}),
		updateMatch: builder.mutation<Match, UpdateMatchRequest>({
			query: ({ id, ...body }) => ({
				url: `/matches/${id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Matches"],
		}),
		updateMatchWithDetails: builder.mutation<Match, UpdateMatchWithDetailsRequest>({
			query: ({ id, ...body }) => ({
				url: `/matches/${id}/full`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Matches"],
		}),
	}),
});

export const {
	useGetMatchesQuery,
	useGetMatchByIdQuery,
	useGetLatestMatchQuery,
	useAddMatchMutation,
	useAddMatchWithDetailsMutation,
	useGetTotalSeasonScoreQuery,
	useRemoveMatchMutation,
	useUpdateMatchMutation,
	useUpdateMatchWithDetailsMutation,
} = matchesApi;
