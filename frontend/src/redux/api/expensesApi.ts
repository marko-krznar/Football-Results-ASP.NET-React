/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expensesApi = createApi({
	reducerPath: "expensesApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api`, credentials: "include" }),
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
