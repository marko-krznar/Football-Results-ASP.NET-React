export interface Expense {
	id: number;
	option: number;
	amount: number;
	date: string;
	description?: string;
}

export interface GridExpense {
	id: number;
	option: string; // Transformed to a string for display
	amount: string | 0; // Transformed to a string with currency formatting
	date: string; // Formatted date
	description?: string;
}
