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
	isEdit = false,
}: {
	open: boolean;
	handleClose: () => void;
	newExpense: Expense;
	setNewExpense: React.Dispatch<React.SetStateAction<Expense>>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleSubmit: (e: React.SubmitEvent) => Promise<void>;
	errorMsg: string;
	isEdit?: boolean;
}) {
	return (
		<Portal>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-add-expense"
				aria-describedby="modal-add-expense-form"
				sx={{ justifyContent: "center", alignItems: "center" }}
			>
				<Stack
					gap={2}
					sx={{
						backgroundColor: "background.paper",
						width: { xs: "100%", sm: "80%" },
						height: { xs: "100%", sm: "auto" },
						maxWidth: { xs: "100vw", sm: "600px" },
						maxHeight: { xs: "100vh", sm: "90vh" },
						overflowY: "auto",
						p: { xs: 3, sm: "4rem" },
						justifyContent: { xs: "center", sm: "flex-start" },
					}}
				>
					<Typography variant="h3" component="p" textAlign="center" gutterBottom>
						{isEdit ? "Uredi trošak" : "Upiši nove troškove"}
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
								fullWidth
								label="Iznos"
								name="amount"
								type="number"
								value={newExpense.amount ?? ""}
								onChange={handleChange}
								required
							/>
						</FormControl>
						<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hr">
							<DatePicker
								label="Datum"
								slotProps={{ textField: { fullWidth: true } }}
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
							fullWidth
							label="Opis"
							name="description"
							value={newExpense.description || ""}
							onChange={handleChange}
						/>
						{errorMsg && <Typography color="error">{errorMsg}</Typography>}
						<Stack
							direction={{ xs: "column", sm: "row-reverse" }}
							justifyContent="flex-start"
							gap={2}
							sx={{ mt: 1 }}
						>
							<Button type="submit" variant="contained" fullWidth>
								{isEdit ? "Spremi izmjene" : "Dodaj trošak"}
							</Button>
							<Button variant="text" onClick={handleClose} fullWidth>
								Odustani
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Modal>
		</Portal>
	);
}
