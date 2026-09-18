import {
	Portal,
	Modal,
	Stack,
	Typography,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	TextField,
	Button,
	useTheme,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Expense } from "../../types/expense";

export default function ModalAddExpense({
	open,
	handleClose,
	newExpense,
	setNewExpense,
	handleChange,
	handleSubmit,
	errorMsg,
}: {
	open: boolean;
	handleClose: () => void;
	newExpense: Expense;
	setNewExpense: React.Dispatch<React.SetStateAction<Expense>>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleSubmit: (e: React.SubmitEvent) => Promise<void>;
	errorMsg: string;
}) {
	const theme = useTheme();

	return (
		<Portal>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-add-expense"
				aria-describedby="modal-add-expense-form"
				sx={{ justifyContent: "center", alignItems: "center" }}
			>
				<Stack gap={2} sx={{ backgroundColor: theme.palette.grey[900], width: "80%", padding: "4rem" }}>
					<Typography variant="h3" component="p" textAlign="center" gutterBottom>
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
									setNewExpense((prev) => ({
										...prev,
										option: Number(newOption.target.value),
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
									setNewExpense((prev: Expense) => ({
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
						<Stack direction="row" justifyContent="flex-end">
							<Button type="submit" variant="contained">
								Dodaj trošak
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Modal>
		</Portal>
	);
}
