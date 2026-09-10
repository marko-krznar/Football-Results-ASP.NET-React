/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useGetExpensesQuery, useCreateExpenseMutation } from "../redux/api/expensesApi";
import {
	Typography,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TextField,
	Button,
	Stack,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

	const handleSubmit = async (e: React.SubmitEvent) => {
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
		<Stack gap={4} padding={4}>
			<Typography variant="h5">Troškovi za HPD prsten superligu</Typography>
			{isLoading && <Typography>Loading…</Typography>}
			{isError && <Typography color="error">Failed to load expenses.</Typography>}
			{expenses.length === 0 && (
				<Typography variant="body1" color="textSecondary">
					Nisu pronađeni troškovi.
				</Typography>
			)}
			{expenses.length > 0 && (
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Opcija</TableCell>
							<TableCell>Iznos (euri)</TableCell>
							<TableCell>Mjesec</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{expenses.map((exp: any) => (
							<TableRow key={exp.id}>
								<TableCell>{exp.option === 0 ? "HPD_PRSTEN" : "OTHER"}</TableCell>
								<TableCell>{exp.amount}</TableCell>
								<TableCell>{exp.date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			<Stack gap={2}>
				<Typography variant="h5" component="p">
					Upiši nove troškove
				</Typography>
				<Stack gap={2} component="form" onSubmit={handleSubmit}>
					<FormControl fullWidth>
						<FormLabel id="expense-option">Vrsta troška</FormLabel>
						<RadioGroup
							row
							aria-labelledby="expense-option"
							name="expense-option-radio-buttons-group"
							value={newExpense.option}
							onChange={handleChange}
						>
							<FormControlLabel value={0} control={<Radio />} label="HPD Prsten" />
							<FormControlLabel value={1} control={<Radio />} label="Ostalo" />
						</RadioGroup>
					</FormControl>
					<FormControl fullWidth>
						<TextField
							label="Amount"
							name="amount"
							type="number"
							value={newExpense.amount}
							onChange={handleChange}
							required
						/>
					</FormControl>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label="Date(month/day)"
							value={newExpense.date}
							openTo="month"
							views={["year", "month"]}
							onChange={(newValue) =>
								setNewExpense((prev: any) => ({
									...prev,
									date: newValue,
								}))
							}
						/>
					</LocalizationProvider>
					<TextField
						label="Description"
						name="description"
						value={newExpense.description}
						onChange={handleChange}
					/>
					{errorMsg && <Typography color="error">{errorMsg}</Typography>}
					<Button type="submit" variant="contained">
						Dodaj trošak
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
}
