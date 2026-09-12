/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expensesApi = createApi({
	reducerPath: "expensesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "/api/",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as any).auth?.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["Expenses"],
	endpoints: (builder) => ({
		getExpenses: builder.query<any[], void>({
			query: () => "expenses",
			providesTags: ["Expenses"],
		}),
		createExpense: builder.mutation<any, any>({
			query: (body) => ({
				url: "expenses",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Expenses"],
		}),
	}),
});

export const { useGetExpensesQuery, useCreateExpenseMutation } = expensesApi;
