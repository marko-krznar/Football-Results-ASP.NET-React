import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Player {
	id: number;
	name: string;
}

export interface CreatePlayerRequest {
	name: string;
}

export interface UpdatePlayerRequest {
	id: number;
	name: string;
}

export const playersApi = createApi({
	reducerPath: "playersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_URL}/api`,
		credentials: "include",
	}),
	tagTypes: ["Players"],
	endpoints: (builder) => ({
		getPlayers: builder.query<Player[], void>({
			query: () => "players",
			providesTags: ["Players"],
		}),
		addPlayer: builder.mutation<Player, CreatePlayerRequest>({
			query: (body) => ({
				url: "players",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Players"],
		}),
		updatePlayer: builder.mutation<Player, UpdatePlayerRequest>({
			query: ({ id, ...body }) => ({
				url: `players/${id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Players"],
		}),
	}),
});

export const { useGetPlayersQuery, useAddPlayerMutation, useUpdatePlayerMutation } = playersApi;
