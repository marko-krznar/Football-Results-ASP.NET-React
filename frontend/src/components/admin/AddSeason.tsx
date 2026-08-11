import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useAddSeasonMutation } from "../../redux/api/seasonsApi";

export default function AddSeason() {
	const [addSeason, { isLoading: isAdding }] = useAddSeasonMutation();

	const [formError, setFormError] = useState<string>("");
	const [successMsg, setSuccessMsg] = useState<string>("");
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [type, setType] = useState<string>("Spring");
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormError("");
		setSuccessMsg("");

		if (!year || !type || !startDate || !endDate) {
			setFormError("Sva polja su obavezna.");
			return;
		}
		if (startDate > endDate) {
			setFormError("Datum završetka mora biti nakon datuma početka.");
			return;
		}

		try {
			await addSeason({
				year: Number(year),
				type,
				startDate,
				endDate,
			}).unwrap();
			setSuccessMsg("Sezona uspješno kreirana!");
			// Reset fields
			setStartDate("");
			setEndDate("");
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
						<Stack spacing={3}>
							<TextField
								label="Godina"
								type="number"
								value={year}
								onChange={(e) => setYear(Number(e.target.value))}
								required
								fullWidth
							/>

							<TextField
								select
								label="Tip Sezone"
								value={type}
								onChange={(e) => setType(e.target.value)}
								required
								fullWidth
							>
								<MenuItem value="Spring">Proljeće (Spring)</MenuItem>
								<MenuItem value="Autumn">Jesen (Autumn)</MenuItem>
							</TextField>

							<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
								<TextField
									label="Datum početka"
									type="date"
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									InputLabelProps={{ shrink: true }}
									required
									fullWidth
								/>
								<TextField
									label="Datum završetka"
									type="date"
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									InputLabelProps={{ shrink: true }}
									required
									fullWidth
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
					</Box>
				</CardContent>
			</Card>
		</Stack>
	);
}
