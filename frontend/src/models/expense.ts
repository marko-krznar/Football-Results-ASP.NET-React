export interface ExpenseDto {
  id: number;
  option: number; // 0 = HPD_PRSTEN, 1 = OTHER
  amount: number;
  date?: string; // YYYY-MM-DD
  description?: string;
}

export interface CreateExpenseDto {
  option: number;
  amount: number;
  date?: string;
  description?: string;
}

export interface UpdateExpenseDto {
  option: number;
  amount: number;
  date?: string;
  description?: string;
}
