import { Dayjs } from "dayjs";

export enum ExpenseOption {
	HPD_PRSTEN = 0,
	OSTALO = 1,
}

export type ExpenseOptionValue = ExpenseOption.HPD_PRSTEN | ExpenseOption.OSTALO;

export interface Expense {
	option: number;
	amount: number | null;
	date: Dayjs | null;
	description: string;
}

export interface GridExpense extends Omit<Expense, "option" | "amount" | "date"> {
	option: string;
	amount: string;
	date: string;
}
