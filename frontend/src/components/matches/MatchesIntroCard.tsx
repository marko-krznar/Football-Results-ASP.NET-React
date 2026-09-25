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

	const isSecondTeamLeading = secondTotalSetsWon >= firstTotalSetsWon;
	const isFirstTeamLeading = firstTotalSetsWon >= secondTotalSetsWon;

	const secondTeamColor = isSecondTeamLeading ? theme.palette.primary.main : theme.palette.text.primary;
	const firstTeamColor = isFirstTeamLeading ? theme.palette.primary.main : theme.palette.text.primary;

	return (
		<Box sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: "320px" } }}>
			<Card sx={{ p: { xs: 2, sm: 4, md: 6 }, width: "100%", flexGrow: 1 }}>
				<CardContent sx={{ p: "0 !important" }}>
					<Typography variant="subtitle2" textAlign="center" color={theme.palette.primary.main} sx={{ mb: 2 }}>
						Sveukupno
					</Typography>
					<Box display="flex" justifyContent="center" alignItems="center" gap={4}>
						<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
							<Typography
								variant="h2"
								component="p"
								fontWeight="bold"
								textAlign="center"
								color={secondTeamColor}
							>
								{secondTotalSetsWon}
							</Typography>
							<Typography
								variant="body1"
								textAlign="center"
								color={secondTeamColor}
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
								color={firstTeamColor}
							>
								{firstTotalSetsWon}
							</Typography>
							<Typography
								variant="body1"
								textAlign="center"
								color={firstTeamColor}
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
