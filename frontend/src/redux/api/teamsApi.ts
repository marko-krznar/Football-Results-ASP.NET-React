import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Team {
	id: number;
	name: string;
	SeasonId: number;
	CaptainId: number;
}

export interface TeamNew {
	id: number;
	name: string;
	seasonId: number;
	seasonName: string;
	captainId: number;
	captainName: string;
}

export interface CreateTeam {
	name: string;
	SeasonId: number;
	CaptainId: number;
}

export const teamsApi = createApi({
	reducerPath: "teamsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_URL}/api`,
		credentials: "include",
	}),
	tagTypes: ["Teams"],
	endpoints: (builder) => ({
		getTeams: builder.query<TeamNew[], void>({
			query: () => "teams",
			providesTags: ["Teams"],
		}),
		addTeam: builder.mutation<Team, CreateTeam>({
			query: (body) => ({
				url: "teams",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Teams"],
		}),
	}),
});

export const { useGetTeamsQuery, useAddTeamMutation } = teamsApi;
