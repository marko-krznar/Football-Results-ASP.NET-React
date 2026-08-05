import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
	email: string;
	password: string;
}

export interface UserInfo {
	email: string;
	isEmailConfirmed: boolean;
	claims: Record<string, string>;
}

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "/",
		credentials: "include",
	}),
	tagTypes: ["Auth"],
	endpoints: (builder) => ({
		login: builder.mutation<void, LoginRequest>({
			query: (body) => ({
				url: "login?useCookies=true",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Auth"],
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: "logout",
				method: "POST",
			}),
			invalidatesTags: ["Auth"],
		}),
		getMe: builder.query<UserInfo, void>({
			query: () => "manage/info",
			providesTags: ["Auth"],
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;
