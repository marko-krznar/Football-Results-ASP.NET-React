import React, { useState } from "react";
import { useGetExpensesQuery, useCreateExpenseMutation } from "../redux/api/expensesApi";
import { Typography, Button, Stack, Box } from "@mui/material";
import ExpenseGrid from "../components/expenses/ExpensesGrid";
import ModalAddExpense from "../components/common/ModalAddExpense";
import type { Expense } from "../types/expense";

export default function Expenses() {
	const { data: expenses = [], isLoading, isError } = useGetExpensesQuery();
	const [createExpense] = useCreateExpenseMutation();

	const [newExpense, setNewExpense] = useState<Expense>({
		option: 0,
		amount: null,
		date: null,
		description: "",
	});
	const [errorMsg, setErrorMsg] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setNewExpense((prev: Expense) => ({
			...prev,
			[name]: name === "amount" || name === "option" || name === "month" ? Number(value) : value,
		}));
	};

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();

		try {
			await createExpense({
				...newExpense,
				date: newExpense.date,
			}).unwrap();

			setNewExpense({
				option: 0,
				amount: 0,
				date: null,
				description: "",
			});

			setErrorMsg("");
		} catch (err) {
			console.log(err);
			setErrorMsg("Failed to create expense");
		}
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Stack gap={4} padding={4}>
			<Stack direction="row" gap={1} alignItems="flex-start">
				<Box flex={1}>
					<Typography variant="h3" component="h2" gutterBottom>
						Troškovi
					</Typography>
					<Typography variant="body1">Iznos za termin za HPD prsten superligu je 75€.</Typography>
				</Box>
				<Button variant="contained" onClick={handleOpen}>
					Dodaj novi trošak
				</Button>
			</Stack>
			{isLoading && <Typography>Loading…</Typography>}
			{isError && <Typography color="error">Failed to load expenses.</Typography>}
			{expenses.length === 0 && (
				<Typography variant="body1" color="textSecondary">
					Nisu pronađeni troškovi.
				</Typography>
			)}
			{expenses.length > 0 && <ExpenseGrid expenses={expenses} />}
			<ModalAddExpense
				open={open}
				handleClose={handleClose}
				newExpense={newExpense}
				setNewExpense={setNewExpense}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				errorMsg={errorMsg}
			/>
		</Stack>
	);
}
