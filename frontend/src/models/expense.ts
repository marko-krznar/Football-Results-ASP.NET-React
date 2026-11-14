export interface ExpenseDto {
  id: number;
  option: number; // 0 = HPD_PRSTEN, 1 = OTHER, 2 = VELIKI_NOGOMET_NEDJELJOM, 3 = VELESAJAM_UTORKOM
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
