import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Set {
	id: number;
	matchId: number;
	setNumber: number;
	firstTeamGoals: number;
	secondTeamGoals: number;
}

export interface UpsertSetRequest {
	matchId: number;
	setNumber: number;
	firstTeamGoals: number;
	secondTeamGoals: number;
}

export interface DeleteSetRequest {
	matchId: number;
	setNumber: number;
}

// NAPOMENA: prilagodi baseUrl istom onome koji koristiš u teamsApi/playersApi
export const setsApi = createApi({
	reducerPath: "setsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	tagTypes: ["Sets"],
	endpoints: (builder) => ({
		getSets: builder.query<Set[], number>({
			query: (matchId) => `/matches/${matchId}/sets`,
			providesTags: (_result, _error, matchId) => [
				{ type: "Sets", id: matchId },
			],
		}),
		upsertSet: builder.mutation<Set, UpsertSetRequest>({
			query: ({ matchId, ...body }) => ({
				url: `/matches/${matchId}/sets`,
				method: "PUT",
				body,
			}),
			invalidatesTags: (_result, _error, { matchId }) => [
				{ type: "Sets", id: matchId },
			],
		}),
		deleteSet: builder.mutation<void, DeleteSetRequest>({
			query: ({ matchId, setNumber }) => ({
				url: `/matches/${matchId}/sets/${setNumber}`,
				method: "DELETE",
			}),
			invalidatesTags: (_result, _error, { matchId }) => [
				{ type: "Sets", id: matchId },
			],
		}),
	}),
});

export const { useGetSetsQuery, useUpsertSetMutation, useDeleteSetMutation } =
	setsApi;
