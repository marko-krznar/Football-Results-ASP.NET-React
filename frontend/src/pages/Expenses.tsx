import React, { useState } from "react";
import {
	useGetExpensesQuery,
	useCreateExpenseMutation,
	useUpdateExpenseMutation,
	useDeleteExpenseMutation,
} from "../redux/api/expensesApi";
import { Typography, Button, Stack, Box } from "@mui/material";
import ExpenseGrid from "../components/expenses/ExpensesGrid";
import ModalAddExpense from "../components/common/ModalAddExpense";
import ModalDeleteExpense from "../components/common/ModalDeleteExpense";
import type { Expense } from "../types/expense";
import dayjs from "dayjs";

export default function Expenses() {
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
		setExpenseForm({
			option: 0,
			amount: null,
			date: null,
			description: "",
		});
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
				await updateExpense({
					id: editingId,
					...expenseForm,
				}).unwrap();
			} else {
				await createExpense(expenseForm).unwrap();
			}

			setExpenseForm({
				option: 0,
				amount: null,
				date: null,
				description: "",
			});
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
		<Stack gap={4} padding={4}>
			<Stack direction="row" gap={1} alignItems="flex-start">
				<Box flex={1}>
					<Typography variant="h3" component="h2" gutterBottom>
						Troškovi
					</Typography>
					<Typography variant="body1">Iznos za termin za HPD prsten superligu je 75€.</Typography>
				</Box>
				<Button variant="contained" onClick={handleOpenAdd}>
					Dodaj novi trošak
				</Button>
			</Stack>

			{isLoading && <Typography>Loading…</Typography>}
			{isError && <Typography color="error">Failed to load expenses.</Typography>}

			{expenses.length === 0 && !isLoading && (
				<Typography variant="body1" color="textSecondary">
					Nisu pronađeni troškovi.
				</Typography>
			)}

			{expenses.length > 0 && (
				<ExpenseGrid
					expenses={expenses}
					onEdit={handleOpenEdit}
					onDelete={handleOpenDelete}
				/>
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
