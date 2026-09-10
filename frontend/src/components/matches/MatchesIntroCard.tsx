import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent } from "@mui/material";

export interface TotalResult {
	firstTeamName: string;
	firstTotalSetsWon: number;
	secondTeamName: string;
	secondTotalSetsWon: number;
}

export default function MatchesIntroCard({
	firstTeamName,
	firstTotalSetsWon,
	secondTeamName,
	secondTotalSetsWon,
}: TotalResult) {
	return (
		<Box>
			<Card sx={{ padding: "4rem !important", flexGrow: 1 }}>
				<CardContent>
					<Typography variant="subtitle2" textAlign="center">
						<span style={{ color: "#95CFFF" }}>Sveukupno</span>
					</Typography>
					<Box display="flex" justifyContent="center" alignItems="center" gap={4}>
						<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
							<Typography variant="subtitle1" fontWeight="bold" textAlign="center">
								{secondTotalSetsWon}
							</Typography>
							<Typography variant="body1" textAlign="center">
								{secondTeamName}
							</Typography>
						</Box>
						<Typography variant="body1">-</Typography>
						<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
							<Typography variant="subtitle1" fontWeight="bold" textAlign="center">
								{firstTotalSetsWon}
							</Typography>
							<Typography variant="body1" textAlign="center">
								{firstTeamName}
							</Typography>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}
