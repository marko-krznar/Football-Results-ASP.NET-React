import React, { useState } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	MenuItem,
	Stack,
	Box,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	Divider,
	CircularProgress,
	Alert,
} from "@mui/material";
import {
	useGetSeasonsQuery,
	useAddSeasonMutation,
} from "../../redux-toolkit/api/seasonsApi";

export default function Seasons() {
	const { data: seasons, isLoading, error } = useGetSeasonsQuery();
	const [addSeason, { isLoading: isAdding }] = useAddSeasonMutation();

	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [type, setType] = useState<string>("Spring");
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [formError, setFormError] = useState<string>("");
	const [successMsg, setSuccessMsg] = useState<string>("");

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
		} catch (err: any) {
			setFormError(err?.data?.message || "Greška pri dodavanju sezone.");
		}
	};

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Typography
				variant="h4"
				gutterBottom
				sx={{ color: "#fff", fontWeight: "bold", mb: 4 }}
			>
				Upravljanje Sezonama
			</Typography>

			<Stack spacing={4}>
				{/* Form Card */}
				<Card
					variant="outlined"
					sx={{ background: "#1E1F1E", borderColor: "#2E302F" }}
				>
					<CardContent>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: "#fff", mb: 3 }}
						>
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
									onChange={(e) =>
										setYear(Number(e.target.value))
									}
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
									<MenuItem value="Spring">
										Proljeće (Spring)
									</MenuItem>
									<MenuItem value="Autumn">
										Jesen (Autumn)
									</MenuItem>
								</TextField>

								<Stack
									direction={{ xs: "column", sm: "row" }}
									spacing={2}
								>
									<TextField
										label="Datum početka"
										type="date"
										value={startDate}
										onChange={(e) =>
											setStartDate(e.target.value)
										}
										InputLabelProps={{ shrink: true }}
										required
										fullWidth
									/>
									<TextField
										label="Datum završetka"
										type="date"
										value={endDate}
										onChange={(e) =>
											setEndDate(e.target.value)
										}
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
									{isAdding ? (
										<CircularProgress size={24} />
									) : (
										"Spremi Sezonu"
									)}
								</Button>
							</Stack>
						</Box>
					</CardContent>
				</Card>

				{/* Seasons List Card */}
				<Card
					variant="outlined"
					sx={{ background: "#1E1F1E", borderColor: "#2E302F" }}
				>
					<CardContent>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: "#fff", mb: 2 }}
						>
							Popis Sezona
						</Typography>

						{isLoading && <CircularProgress size={30} />}
						{error && (
							<Alert severity="error">
								Greška pri učitavanju sezona.
							</Alert>
						)}

						{seasons && (
							<List
								divider={
									<Divider sx={{ borderColor: "#2E302F" }} />
								}
							>
								{seasons.map((season) => (
									<ListItem key={season.id} sx={{ px: 0 }}>
										<ListItemText
											primary={
												<Typography
													sx={{
														color: "#fff",
														fontWeight: "medium",
													}}
												>
													{season.name} ({season.year}
													)
												</Typography>
											}
											secondary={
												<Typography
													variant="body2"
													sx={{ color: "#ADAAAA" }}
												>
													Trajanje: {season.startDate}{" "}
													do {season.endDate} | Tip:{" "}
													{season.type}
												</Typography>
											}
										/>
									</ListItem>
								))}
								{seasons.length === 0 && (
									<Typography
										sx={{ color: "#ADAAAA", py: 2 }}
									>
										Nema dodanih sezona.
									</Typography>
								)}
							</List>
						)}
					</CardContent>
				</Card>
			</Stack>
		</Container>
	);
}
