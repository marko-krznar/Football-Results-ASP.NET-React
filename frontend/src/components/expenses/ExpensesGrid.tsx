import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import type { Expense, GridExpense } from "../../types/expense";

const columns: GridColDef<GridExpense>[] = [
	{
		field: "option",
		headerName: "Opcija",
		flex: 1,
	},
	{
		field: "amount",
		headerName: "Iznos (euri)",
		flex: 1,
	},
	{
		field: "date",
		headerName: "Vrijeme",
		flex: 1,
	},
	{
		field: "description",
		headerName: "Opis",
		flex: 2,
	},
];

export default function ExpenseGrid({ expenses }: { expenses: Array<Expense> }) {
	const formatExpenses = expenses.map((expense: Expense) => ({
		...expense,
		option: expense.option === 0 ? "HPD Prsten" : "Ostalo",
		amount: expense.amount ? `${expense.amount.toFixed(2)} €` : "0.00 €",
		date:
			expense.date && expense.option === 0
				? dayjs(expense.date).locale("hr").format("MMMM")
				: dayjs(expense.date).locale("hr").format("DD.MM.YYYY - dddd"),
	}));

	return (
		<DataGrid
			rows={formatExpenses}
			columns={columns}
			initialState={{
				pagination: {
					paginationModel: { pageSize: 5 },
				},
			}}
			pageSizeOptions={[5]}
		/>
	);
}
