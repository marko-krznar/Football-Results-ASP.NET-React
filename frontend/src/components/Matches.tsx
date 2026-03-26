import { Stack, Typography } from "@mui/material";

export default function Matches() {
	return (
		<>
			<Typography variant="body2" align="center">
				Termin 10.03.2026 19:00h
			</Typography>
			<Stack spacing={4}>
				<Typography variant="body2" align="center">
					Crni : Bijeli
				</Typography>
				<Typography variant="body2" align="center">
					4:6
				</Typography>
				<Typography variant="body2" align="center">
					5:5 - ne računa se jer nije završeno
				</Typography>
			</Stack>
		</>
	);
}
