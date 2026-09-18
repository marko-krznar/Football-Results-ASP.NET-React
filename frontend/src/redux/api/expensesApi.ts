import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Expense } from "../../types/expense";
import dayjs from "dayjs";

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
			query: (expense) => {
				const body = {
					option: expense.option,
					amount: expense.amount,
					date: expense.date ? dayjs(expense.date).format("YYYY-MM-DD") : null,
					description: expense.description,
				};
				return {
					url: "expenses",
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["Expenses"],
		}),
		updateExpense: builder.mutation<Expense, Expense>({
			query: (expense) => {
				const body = {
					option: expense.option,
					amount: expense.amount,
					date: expense.date ? dayjs(expense.date).format("YYYY-MM-DD") : null,
					description: expense.description,
				};
				return {
					url: `expenses/${expense.id}`,
					method: "PUT",
					body,
				};
			},
			invalidatesTags: ["Expenses"],
		}),
		deleteExpense: builder.mutation<void, number>({
			query: (id) => ({
				url: `expenses/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Expenses"],
		}),
	}),
});

export const {
	useGetExpensesQuery,
	useCreateExpenseMutation,
	useUpdateExpenseMutation,
	useDeleteExpenseMutation,
} = expensesApi;
