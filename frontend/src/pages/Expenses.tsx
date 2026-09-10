/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useGetExpensesQuery, useCreateExpenseMutation } from "../redux/api/expensesApi";
import {
	Box,
	Typography,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TextField,
	Button,
	Paper,
} from "@mui/material";

export default function Expenses() {
	const { data: expenses = [], isLoading, isError } = useGetExpensesQuery();
	const [createExpense] = useCreateExpenseMutation();

	const [newExpense, setNewExpense] = useState<any>({ option: 0, amount: 0 });
	const [errorMsg, setErrorMsg] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setNewExpense((prev: any) => ({
			...prev,
			[name]: name === "amount" || name === "option" || name === "month" ? Number(value) : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await createExpense(newExpense).unwrap();
			setNewExpense({ option: 0, amount: 0 });
			setErrorMsg("");
		} catch (err) {
			console.log(err);
			setErrorMsg("Failed to create expense");
		}
	};
	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom>
				Expenses
			</Typography>

			{/* Expense List */}
			<Paper sx={{ mb: 4, p: 2 }}>
				{isLoading ? (
					<Typography>Loading…</Typography>
				) : isError ? (
					<Typography color="error">Failed to load expenses.</Typography>
				) : (
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Option</TableCell>
								<TableCell>Amount</TableCell>
								<TableCell>Month</TableCell>
								<TableCell>Date</TableCell>
								<TableCell>Description</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{expenses.map((exp: any) => (
								<TableRow key={exp.id}>
									<TableCell>{exp.id}</TableCell>
									<TableCell>{exp.option === 0 ? "HPD_PRSTEN" : "OTHER"}</TableCell>
									<TableCell>{exp.amount}</TableCell>
									<TableCell>{exp.month ?? "-"}</TableCell>
									<TableCell>{exp.date ?? "-"}</TableCell>
									<TableCell>{exp.description ?? "-"}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</Paper>

			{/* Add New Expense Form */}
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
			>
				<TextField
					select
					label="Option"
					name="option"
					value={newExpense.option}
					onChange={handleChange}
					SelectProps={{ native: true }}
				>
					<option value={0}>HPD_PRSTEN</option>
					<option value={1}>OTHER</option>
				</TextField>
				<TextField
					label="Amount"
					name="amount"
					type="number"
					value={newExpense.amount}
					onChange={handleChange}
					required
				/>
				<TextField
					label="Month (HPD)"
					name="month"
					type="number"
					value={newExpense.month ?? ""}
					onChange={handleChange}
				/>
				<TextField
					label="Date (Other)"
					name="date"
					type="date"
					value={newExpense.date ?? ""}
					onChange={handleChange}
				/>
				<TextField
					label="Description"
					name="description"
					value={newExpense.description ?? ""}
					onChange={handleChange}
				/>
				{errorMsg && <Typography color="error">{errorMsg}</Typography>}
				<Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
					Add Expense
				</Button>
			</Box>
		</Box>
	);
}
