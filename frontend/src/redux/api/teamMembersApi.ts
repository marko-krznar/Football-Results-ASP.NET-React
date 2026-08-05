import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TeamMember {
	id: number;
	teamId: number;
	playerId: number;
	playerName: string;
}

export interface AddTeamMembersRequest {
	teamId: number;
	playerIds: number[];
}

export const teamMembersApi = createApi({
	reducerPath: "teamMembersApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
	tagTypes: ["TeamMembers"],
	endpoints: (builder) => ({
		getTeamMembers: builder.query<TeamMember[], number>({
			query: (teamId) => `/teams/${teamId}/members`,
			providesTags: (_result, _error, teamId) => [{ type: "TeamMembers", id: teamId }],
		}),
		addTeamMembers: builder.mutation<TeamMember[], AddTeamMembersRequest>({
			query: ({ teamId, playerIds }) => ({
				url: `/teams/${teamId}/members`,
				method: "POST",
				body: { playerIds },
			}),
			invalidatesTags: (_result, _error, { teamId }) => [{ type: "TeamMembers", id: teamId }],
		}),
		removeTeamMember: builder.mutation<void, { teamId: number; playerId: number }>({
			query: ({ teamId, playerId }) => ({
				url: `/teams/${teamId}/members/${playerId}`,
				method: "DELETE",
			}),
			invalidatesTags: (_result, _error, { teamId }) => [{ type: "TeamMembers", id: teamId }],
		}),
	}),
});

export const { useGetTeamMembersQuery, useAddTeamMembersMutation, useRemoveTeamMemberMutation } = teamMembersApi;
