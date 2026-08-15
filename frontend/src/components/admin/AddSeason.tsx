import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	createTheme,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	ThemeProvider,
	Typography,
	useTheme,
} from "@mui/material";
import { useState } from "react";
import { useAddSeasonMutation } from "../../redux/api/seasonsApi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

export default function AddSeason() {
	const outerTheme = useTheme();
	const pickerTheme = createTheme(outerTheme, {
		typography: {
			subtitle1: {
				fontSize: "1rem",
				lineHeight: "1.5",
				fontWeight: "normal",
			},
		},
	});

	const [addSeason, { isLoading: isAdding }] = useAddSeasonMutation();

	const [formError, setFormError] = useState<string>("");
	const [successMsg, setSuccessMsg] = useState<string>("");
	const [yearVal, setYearVal] = useState<Dayjs | null>(dayjs());
	const [type, setType] = useState<string>("Spring");
	const [startDate, setStartDate] = useState<Dayjs | null>(null);
	const [endDate, setEndDate] = useState<Dayjs | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormError("");
		setSuccessMsg("");

		if (!yearVal || !type || !startDate || !endDate) {
			setFormError("Sva polja su obavezna.");
			return;
		}
		if (startDate.isAfter(endDate)) {
			setFormError("Datum završetka mora biti nakon datuma početka.");
			return;
		}

		try {
			await addSeason({
				year: yearVal.year(),
				type,
				startDate: startDate.format("YYYY-MM-DD"),
				endDate: endDate.format("YYYY-MM-DD"),
			}).unwrap();
			setSuccessMsg("Sezona uspješno kreirana!");
			// Reset fields
			setStartDate(null);
			setEndDate(null);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setFormError(err?.data?.message || "Greška pri dodavanju sezone.");
		}
	};

	return (
		<Stack spacing={4}>
			<Typography variant="h4" gutterBottom sx={{ color: "#fff", fontWeight: "bold", mb: "1.5rem !important" }}>
				Upravljanje Sezonama
			</Typography>
			{/* Form Card */}
			<Card variant="outlined" sx={{ background: "#1E1F1E", borderColor: "#2E302F" }}>
				<CardContent>
					<Typography variant="h6" gutterBottom sx={{ color: "#fff", mb: 3 }}>
						Dodaj novu sezonu
					</Typography>

					{formError && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{formError}
						</Alert>
					)}
					{successMsg && (
						<Alert severity="success" sx={{ mb: 2 }}>
							{successMsg}
						</Alert>
					)}

					<Box component="form" onSubmit={handleSubmit}>
						<ThemeProvider theme={pickerTheme}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Stack spacing={3}>
									<DatePicker
										label="Godina"
										views={["year"]}
										value={yearVal}
										onChange={(newValue) => setYearVal(newValue)}
										slotProps={{
											textField: { required: true, fullWidth: true },
										}}
									/>

									<FormControl component="fieldset">
										<FormLabel
											id="season-type-label"
											sx={{
												color: "rgba(255, 255, 255, 0.7)",
												"&.Mui-focused": { color: "#fff" },
											}}
										>
											Tip Sezone
										</FormLabel>
										<RadioGroup
											row
											aria-labelledby="season-type-label"
											name="season-type"
											value={type}
											onChange={(e) => setType(e.target.value)}
										>
											<FormControlLabel
												value="Spring"
												control={
													<Radio
														sx={{
															color: "rgba(255, 255, 255, 0.7)",
															"&.Mui-checked": { color: "#fff" },
														}}
													/>
												}
												label="Proljeće (Spring)"
												sx={{ color: "#fff" }}
											/>
											<FormControlLabel
												value="Autumn"
												control={
													<Radio
														sx={{
															color: "rgba(255, 255, 255, 0.7)",
															"&.Mui-checked": { color: "#fff" },
														}}
													/>
												}
												label="Jesen (Autumn)"
												sx={{ color: "#fff" }}
											/>
										</RadioGroup>
									</FormControl>

									<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
										<DatePicker
											label="Datum početka"
											value={startDate}
											onChange={(newValue) => setStartDate(newValue)}
											slotProps={{ textField: { required: true, fullWidth: true } }}
										/>
										<DatePicker
											label="Datum završetka"
											value={endDate}
											onChange={(newValue) => setEndDate(newValue)}
											slotProps={{ textField: { required: true, fullWidth: true } }}
										/>
									</Stack>

									<Button
										type="submit"
										variant="contained"
										color="primary"
										size="large"
										disabled={isAdding}
										sx={{ mt: 2 }}
									>
										{isAdding ? <CircularProgress size={24} /> : "Spremi Sezonu"}
									</Button>
								</Stack>
							</LocalizationProvider>
						</ThemeProvider>
					</Box>
				</CardContent>
			</Card>
		</Stack>
	);
}
