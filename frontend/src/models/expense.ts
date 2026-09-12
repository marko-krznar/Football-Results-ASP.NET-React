export interface ExpenseDto {
  id: number;
  option: number; // 0 = HPD_PRSTEN, 1 = OTHER
  amount: number;
  month?: number;
  date?: string; // ISO date string
  description?: string;
}

export interface CreateExpenseDto {
  option: number;
  amount: number;
  month?: number;
  date?: string;
  description?: string;
}
