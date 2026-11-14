import { Dayjs } from "dayjs";

export enum ExpenseOption {
	HPD_PRSTEN = 0,
	OSTALO = 1,
	VELIKI_NOGOMET_NEDJELJOM = 2,
	VELESAJAM_UTORKOM = 3,
}

export type ExpenseOptionValue =
	| ExpenseOption.HPD_PRSTEN
	| ExpenseOption.OSTALO
	| ExpenseOption.VELIKI_NOGOMET_NEDJELJOM
	| ExpenseOption.VELESAJAM_UTORKOM;

export interface Expense {
	id?: number;
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
