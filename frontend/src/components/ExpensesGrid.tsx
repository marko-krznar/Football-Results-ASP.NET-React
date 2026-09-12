/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

const columns: GridColDef<[number]>[] = [
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
		flex: 1,
	},
];

export default function DataGridDemo({ expenses }: { expenses: any[] }) {
	const formatExpenses = expenses.map((expense: any) => ({
		...expense,
		option: expense.option === 0 ? "HPD Prsten" : "Ostalo",
		amount: expense.amount && `${expense.amount.toFixed(2)} €`,
		date:
			expense.date && expense.option === 0
				? dayjs(expense.date).format("MMMM")
				: dayjs(expense.date).format("DD.MM.YYYY - dddd"),
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
