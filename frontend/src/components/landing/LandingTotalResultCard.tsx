import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";

export interface LandingTotalResultTeamProps {
	teamId: number;
	teamName: string;
	totalSetsWon: number;
}

export interface LandingTotalResultCardProps {
	firstTeam: LandingTotalResultTeamProps;
	secondTeam: LandingTotalResultTeamProps;
}

function LandingTotalResultCard({ firstTeam, secondTeam }: LandingTotalResultCardProps) {
	const theme = useTheme();

	return (
		<Card
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minWidth: "254px",
				backgroundColor: theme.palette.background.paper,
				flex: 1,
			}}
		>
			<CardContent>
				<Typography variant="subtitle2" textAlign="center" color={theme.palette.primary.main}>
					Ukupni rezultat
				</Typography>
				<Box display="flex" justifyContent="center" alignItems="center" gap={4}>
					<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
						<Typography
							variant="h2"
							component="p"
							fontWeight="bold"
							textAlign="center"
							color={
								firstTeam.totalSetsWon > secondTeam.totalSetsWon
									? theme.palette.text.primary
									: theme.palette.primary.main
							}
						>
							{secondTeam.totalSetsWon}
						</Typography>
						<Typography
							variant="body1"
							textAlign="center"
							color={
								firstTeam.totalSetsWon > secondTeam.totalSetsWon
									? theme.palette.text.primary
									: theme.palette.primary.main
							}
						>
							{secondTeam.teamName}
						</Typography>
					</Box>
					<Typography variant="subtitle2" component="p">
						-
					</Typography>
					<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
						<Typography
							variant="h2"
							component="p"
							fontWeight="bold"
							textAlign="center"
							color={
								firstTeam.totalSetsWon < secondTeam.totalSetsWon
									? theme.palette.text.primary
									: theme.palette.primary.main
							}
						>
							{firstTeam.totalSetsWon}
						</Typography>
						<Typography
							variant="body1"
							textAlign="center"
							color={
								firstTeam.totalSetsWon < secondTeam.totalSetsWon
									? theme.palette.text.primary
									: theme.palette.primary.main
							}
						>
							{firstTeam.teamName}
						</Typography>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}

export default LandingTotalResultCard;
