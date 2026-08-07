import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Player {
	id: number;
	name: string;
}

export const playersApi = createApi({
	reducerPath: "playersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_URL}/api`,
		prepareHeaders: (headers) => {
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getPlayers: builder.query<Player[], void>({
			query: () => "players",
		}),
	}),
});

export const { useGetPlayersQuery } = playersApi;
