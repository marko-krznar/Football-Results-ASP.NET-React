import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Season {
	id: number;
	year: number;
	type: string;
	startDate: string;
	endDate: string;
	name: string;
}

export interface CreateSeason {
	year: number;
	type: string;
	startDate: string;
	endDate: string;
}

export const seasonsApi = createApi({
	reducerPath: "seasonsApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api`, credentials: "include" }),
	tagTypes: ["Seasons"],
	endpoints: (builder) => ({
		getSeasons: builder.query<Season[], void>({
			query: () => "seasons",
			providesTags: ["Seasons"],
		}),
		addSeason: builder.mutation<Season, CreateSeason>({
			query: (body) => ({
				url: "seasons",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Seasons"],
		}),
	}),
});

export const { useGetSeasonsQuery, useAddSeasonMutation } = seasonsApi;
