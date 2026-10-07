import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
	useGetExpensesQuery,
	useCreateExpenseMutation,
	useUpdateExpenseMutation,
	useDeleteExpenseMutation,
} from "../../redux/api/expensesApi";
import ExpenseGrid from "../expenses/ExpensesGrid";
import ModalAddExpense from "../common/ModalAddExpense";
import ModalDeleteExpense from "../common/ModalDeleteExpense";
import type { Expense } from "../../types/expense";
import dayjs from "dayjs";

/**
 * Expenses management tab for the Admin dashboard.
 * Mirrors the content of the /expenses page, embedded inside the admin shell.
 */
export default function AdminExpensesTab() {
	const { data: expenses = [], isLoading, isError } = useGetExpensesQuery();
	const [createExpense] = useCreateExpenseMutation();
	const [updateExpense] = useUpdateExpenseMutation();
	const [deleteExpense] = useDeleteExpenseMutation();

	const [expenseForm, setExpenseForm] = useState<Expense>({
		option: 0,
		amount: null,
		date: null,
		description: "",
	});
	const [editingId, setEditingId] = useState<number | null>(null);
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [openModal, setOpenModal] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);

	const handleOpenAdd = () => {
		setEditingId(null);
		setExpenseForm({ option: 0, amount: null, date: null, description: "" });
		setErrorMsg("");
		setOpenModal(true);
	};

	const handleOpenEdit = (expense: Expense) => {
		setEditingId(expense.id ?? null);
		setExpenseForm({
			id: expense.id,
			option: expense.option,
			amount: expense.amount,
			date: expense.date ? dayjs(expense.date) : null,
			description: expense.description || "",
		});
		setErrorMsg("");
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setEditingId(null);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setExpenseForm((prev: Expense) => ({
			...prev,
			[name]: name === "amount" || name === "option" ? Number(value) : value,
		}));
	};

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		try {
			if (editingId) {
				await updateExpense({ id: editingId, ...expenseForm }).unwrap();
			} else {
				await createExpense(expenseForm).unwrap();
			}
			setExpenseForm({ option: 0, amount: null, date: null, description: "" });
			setErrorMsg("");
			handleCloseModal();
		} catch (err) {
			console.error(err);
			setErrorMsg(editingId ? "Failed to update expense" : "Failed to create expense");
		}
	};

	const handleOpenDelete = (id: number) => {
		setExpenseToDelete(id);
		setDeleteDialogOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (expenseToDelete !== null) {
			try {
				await deleteExpense(expenseToDelete).unwrap();
			} catch (err) {
				console.error("Failed to delete expense:", err);
			}
		}
		setDeleteDialogOpen(false);
		setExpenseToDelete(null);
	};

	return (
		<Stack spacing={4}>
			<Stack direction="row" gap={1} alignItems="flex-start">
				<Box flex={1}>
					<Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
						Troškovi
					</Typography>
					<Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mt: 0.5 }}>
						Troškovi za termin na ŠD Hotanj je 75€.
					</Typography>
				</Box>
				<Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>
					Add Expense
				</Button>
			</Stack>

			{isLoading && <Typography>Loading…</Typography>}
			{isError && <Typography color="error">Failed to load expenses.</Typography>}

			{expenses.length === 0 && !isLoading && (
				<Typography variant="body1" color="textSecondary">
					No expenses found.
				</Typography>
			)}

			{expenses.length > 0 && (
				<ExpenseGrid expenses={expenses} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />
			)}

			<ModalAddExpense
				open={openModal}
				handleClose={handleCloseModal}
				newExpense={expenseForm}
				setNewExpense={setExpenseForm}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				errorMsg={errorMsg}
				isEdit={editingId !== null}
			/>

			<ModalDeleteExpense
				open={deleteDialogOpen}
				handleClose={() => setDeleteDialogOpen(false)}
				handleConfirm={handleConfirmDelete}
			/>
		</Stack>
	);
}
