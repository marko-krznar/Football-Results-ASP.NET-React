import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useAddSeasonMutation } from "../../redux/api/seasonsApi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

export default function AdminSeasonsTab() {
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
		<Stack spacing={3}>
			<Box>
				<Typography variant="h3" component="h1" gutterBottom>
					Upravljanje sezonama
				</Typography>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					Otvaranje nove natjecateljske sezone i definiranje razdoblja trajanja.
				</Typography>
			</Box>
			<Card
				variant="outlined"
				sx={{
					backgroundColor: "background.paper",
					borderColor: "divider",
					borderRadius: "1rem",
				}}
			>
				<CardContent>
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
											color: "text.secondary",
											"&.Mui-focused": { color: "primary.main" },
										}}
									>
										Tip sezone
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
											control={<Radio color="primary" />}
											label="Proljeće (Spring)"
											sx={{ color: "text.primary" }}
										/>
										<FormControlLabel
											value="Autumn"
											control={<Radio color="primary" />}
											label="Jesen (Autumn)"
											sx={{ color: "text.primary" }}
										/>
									</RadioGroup>
								</FormControl>

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

								<Stack direction="row" alignItems="center" justifyContent="flex-end">
									<Button
										type="submit"
										variant="contained"
										color="primary"
										size="medium"
										disabled={isAdding}
										sx={{
											mt: 2,
											borderRadius: "20px",
											px: 3,
											fontWeight: 600,
											textTransform: "none",
										}}
									>
										{isAdding ? "Spremanje…" : "Spremi sezonu"}
									</Button>
								</Stack>
							</Stack>
						</LocalizationProvider>
					</Box>
				</CardContent>
			</Card>
		</Stack>
	);
}
