import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Expense } from "../../types/expense";

export const expensesApi = createApi({
	reducerPath: "expensesApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api`, credentials: "include" }),
	tagTypes: ["Expenses"],
	endpoints: (builder) => ({
		getExpenses: builder.query<Expense[], void>({
			query: () => "expenses",
			providesTags: ["Expenses"],
		}),
		createExpense: builder.mutation<Expense, Expense>({
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
