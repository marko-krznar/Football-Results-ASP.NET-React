import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid, GridFooterContainer, GridPagination } from "@mui/x-data-grid";
import { IconButton, Stack, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import type { Expense, GridExpense } from "../../types/expense";

interface ExpenseGridProps {
	expenses: Array<Expense>;
	onEdit: (expense: Expense) => void;
	onDelete: (id: number) => void;
}

export default function ExpenseGrid({ expenses, onEdit, onDelete }: ExpenseGridProps) {
	const totalSum = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);

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
		{
			field: "actions",
			headerName: "Akcije",
			flex: 1,
			sortable: false,
			filterable: false,
			renderCell: (params) => {
				const rawExpense = expenses.find((e) => e.id === params.row.id);
				return (
					<Stack direction="row" spacing={1}>
						<IconButton size="small" color="primary" onClick={() => rawExpense && onEdit(rawExpense)}>
							<EditIcon fontSize="small" />
						</IconButton>
						<IconButton size="small" color="error" onClick={() => params.row.id && onDelete(params.row.id)}>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Stack>
				);
			},
		},
	];

	const formatExpenses = expenses.map((expense: Expense) => ({
		...expense,
		id: expense.id,
		option: expense.option === 0 ? "HPD Prsten" : "Ostalo",
		amount: expense.amount ? `${expense.amount.toFixed(2)} €` : "0.00 €",
		date:
			expense.date && expense.option === 0
				? dayjs(expense.date).locale("hr").format("MMMM")
				: dayjs(expense.date).locale("hr").format("DD.MM.YYYY - dddd"),
	}));

	const CustomFooter = () => (
		<GridFooterContainer sx={{ paddingX: 2, paddingY: 1, justifyContent: "space-between" }}>
			<Box>
				<Typography variant="subtitle1" fontWeight="bold">
					Ukupno: {totalSum.toFixed(2)} €
				</Typography>
			</Box>
			<GridPagination />
		</GridFooterContainer>
	);

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
			slots={{
				footer: CustomFooter,
			}}
		/>
	);
}
