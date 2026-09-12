/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useGetExpensesQuery, useCreateExpenseMutation } from "../redux/api/expensesApi";
import {
	Typography,
	TextField,
	Button,
	Stack,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Box,
	Modal,
	Portal,
	useTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import DataGridDemo from "../components/ExpensesGrid";

export default function Expenses() {
	const theme = useTheme();

	const { data: expenses = [], isLoading, isError } = useGetExpensesQuery();
	const [createExpense] = useCreateExpenseMutation();

	const [newExpense, setNewExpense] = useState<{
		option: number;
		amount: number;
		date: Dayjs | null;
		description: string;
	}>({ option: 0, amount: 0, date: null, description: "" });
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
			const formattedDate = newExpense.date ? newExpense.date.format("YYYY-MM-DD") : null;
			await createExpense({
				...newExpense,
				date: formattedDate,
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
					<Typography variant="h5" component="h2">
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
			{expenses.length > 0 && <DataGridDemo expenses={expenses} />}
			<Portal>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-add-expense"
					aria-describedby="modal-add-expense-form"
					sx={{ justifyContent: "center", alignItems: "center" }}
				>
					<Stack gap={2} sx={{ backgroundColor: theme.palette.grey[900], width: "80%", padding: "4rem" }}>
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
									onChange={(newOption) =>
										setNewExpense((prev: any) => ({
											...prev,
											option: newOption.target.value,
										}))
									}
								>
									<FormControlLabel value={0} control={<Radio />} label="HPD Prsten" />
									<FormControlLabel value={1} control={<Radio />} label="Ostalo" />
								</RadioGroup>
							</FormControl>
							<FormControl fullWidth>
								<TextField
									label="Iznos"
									name="amount"
									type="number"
									value={newExpense.amount}
									onChange={handleChange}
									required
								/>
							</FormControl>
							<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hr">
								<DatePicker
									label="Datum"
									value={newExpense.date}
									onChange={(newValue) =>
										setNewExpense((prev: any) => ({
											...prev,
											date: newValue,
										}))
									}
								/>
							</LocalizationProvider>
							<TextField
								label="Opis"
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
				</Modal>
			</Portal>
		</Stack>
	);
}
