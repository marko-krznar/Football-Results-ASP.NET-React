import {
	Container,
	Typography,
	Stack,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	CircularProgress,
	Alert,
} from "@mui/material";
import { useGetSeasonsQuery } from "../../redux-toolkit/api/seasonsApi";

export default function Seasons() {
	const { data: seasons, isLoading, error } = useGetSeasonsQuery();

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Stack spacing={4}>
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
							<List>
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
