import { Container, Typography, Stack, List, ListItem, ListItemText, CircularProgress, Alert } from "@mui/material";
import { useGetSeasonsQuery } from "../redux/api/seasonsApi";
import dayjs from "dayjs";

export default function Seasons() {
	const { data: seasons, isLoading, error } = useGetSeasonsQuery();

	return (
		<Container maxWidth="xl">
			<Stack py={4}>
				<Typography variant="h3" component={"p"}>
					Popis Sezona
				</Typography>
				{isLoading && <CircularProgress size={30} />}
				{error && <Alert severity="error">Greška pri učitavanju sezona.</Alert>}
				{seasons && (
					<List>
						{seasons.map((season) => (
							<ListItem key={season.id} disablePadding>
								<ListItemText
									primary={<Typography>{season.name}</Typography>}
									secondary={
										<Typography variant="body2">
											Trajanje: {dayjs(season.startDate).locale("hr").format("DD.MM.YYYY.")} do{" "}
											{dayjs(season.endDate).locale("hr").format("DD.MM.YYYY.")}
										</Typography>
									}
								/>
							</ListItem>
						))}
						{seasons.length === 0 && <Typography>Nema dodanih sezona.</Typography>}
					</List>
				)}
			</Stack>
		</Container>
	);
}
