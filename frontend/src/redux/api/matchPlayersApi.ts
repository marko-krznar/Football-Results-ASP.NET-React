import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface MatchPlayer {
	id: number;
	matchId: number;
	teamId: number;
	playerId: number;
	playerName: string;
}

export interface SetMatchPlayersRequest {
	matchId: number;
	teamId: number;
	playerIds: number[];
}

export interface RemoveMatchPlayerRequest {
	matchId: number;
	playerId: number;
}

// NAPOMENA: prilagodi baseUrl istom onome koji koristiš u teamsApi/playersApi
export const matchPlayersApi = createApi({
	reducerPath: "matchPlayersApi",
	// baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api`, credentials: "include" }),
	tagTypes: ["MatchPlayers"],
	endpoints: (builder) => ({
		getMatchPlayers: builder.query<MatchPlayer[], number>({
			query: (matchId) => `/matches/${matchId}/players`,
			providesTags: (_result, _error, matchId) => [{ type: "MatchPlayers", id: matchId }],
		}),
		setMatchPlayers: builder.mutation<MatchPlayer[], SetMatchPlayersRequest>({
			query: ({ matchId, teamId, playerIds }) => ({
				url: `/matches/${matchId}/players`,
				method: "PUT",
				body: { teamId, playerIds },
			}),
			invalidatesTags: (_result, _error, { matchId }) => [{ type: "MatchPlayers", id: matchId }],
		}),
		removeMatchPlayer: builder.mutation<void, RemoveMatchPlayerRequest>({
			query: ({ matchId, playerId }) => ({
				url: `/matches/${matchId}/players/${playerId}`,
				method: "DELETE",
			}),
			invalidatesTags: (_result, _error, { matchId }) => [{ type: "MatchPlayers", id: matchId }],
		}),
	}),
});

export const { useGetMatchPlayersQuery, useSetMatchPlayersMutation, useRemoveMatchPlayerMutation } = matchPlayersApi;
