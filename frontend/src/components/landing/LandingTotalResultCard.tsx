import { Box, Card, CardContent, Typography } from "@mui/material";

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
	return (
		<Card
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minWidth: "254px",
				backgroundColor: "#262727",
				flex: 1,
			}}
		>
			<CardContent>
				<Typography variant="subtitle2" textAlign="center">
					<span style={{ color: "#95CFFF" }}>Ukupni rezultat</span>
				</Typography>
				<Box display="flex" justifyContent="center" alignItems="center" gap={4}>
					<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
						<Typography variant="subtitle1" fontWeight="bold" textAlign="center">
							{secondTeam.totalSetsWon}
						</Typography>
						<Typography variant="body1" textAlign="center">
							{secondTeam.teamName}
						</Typography>
					</Box>
					<Typography variant="body1">-</Typography>
					<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
						<Typography variant="subtitle1" fontWeight="bold" textAlign="center">
							{firstTeam.totalSetsWon}
						</Typography>
						<Typography variant="body1" textAlign="center">
							{firstTeam.teamName}
						</Typography>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}

export default LandingTotalResultCard;
