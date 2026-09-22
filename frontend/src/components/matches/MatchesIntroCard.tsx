import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, useTheme } from "@mui/material";

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
	const theme = useTheme();

	return (
		<Box>
			<Card sx={{ padding: "4rem !important", flexGrow: 1 }}>
				<CardContent>
					<Typography variant="subtitle2" textAlign="center" color={theme.palette.primary.main}>
						Sveukupno
					</Typography>
					<Box display="flex" justifyContent="center" alignItems="center" gap={4}>
						<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
							<Typography
								variant="h2"
								component="p"
								fontWeight="bold"
								textAlign="center"
								color={
									secondTotalSetsWon < firstTotalSetsWon
										? theme.palette.text.primary
										: theme.palette.primary.main
								}
							>
								{secondTotalSetsWon}
							</Typography>
							<Typography
								variant="body1"
								textAlign="center"
								color={
									secondTotalSetsWon < firstTotalSetsWon
										? theme.palette.text.primary
										: theme.palette.primary.main
								}
							>
								{secondTeamName}
							</Typography>
						</Box>
						<Typography variant="body1">-</Typography>
						<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
							<Typography
								variant="h2"
								component="p"
								fontWeight="bold"
								textAlign="center"
								color={
									firstTotalSetsWon < secondTotalSetsWon
										? theme.palette.text.primary
										: theme.palette.primary.main
								}
							>
								{firstTotalSetsWon}
							</Typography>
							<Typography
								variant="body1"
								textAlign="center"
								color={
									firstTotalSetsWon < secondTotalSetsWon
										? theme.palette.text.primary
										: theme.palette.primary.main
								}
							>
								{firstTeamName}
							</Typography>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}
