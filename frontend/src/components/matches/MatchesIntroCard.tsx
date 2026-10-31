import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Stack, useTheme } from "@mui/material";

export interface TotalResult {
	firstTeamName: string;
	firstTotalSetsWon: number;
	secondTeamName: string;
	secondTotalSetsWon: number;
}

function TeamBlock({
	isDark,
	name,
	score,
	isWinner,
}: {
	isDark: boolean;
	name: string;
	score: number;
	isWinner: boolean;
}) {
	const theme = useTheme();
	return (
		<Stack alignItems="center" spacing={1.5}>
			{/* Jersey circle */}
			<Box
				sx={{
					width: 56,
					height: 56,
					borderRadius: "50%",
					backgroundColor: isDark ? theme.palette.background.default : theme.palette.background.paper,
					border: `1px solid ${theme.palette.divider}`,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: 3,
				}}
			>
				<Box
					sx={{
						width: 18,
						height: 18,
						borderRadius: "50%",
						backgroundColor: isDark ? theme.palette.action.disabled : theme.palette.primary.light,
					}}
				/>
			</Box>

			{/* Score */}
			<Typography
				variant="h2"
				fontWeight="bold"
				color={isWinner ? "text.primary" : "text.secondary"}
				sx={{ lineHeight: 1 }}
			>
				{score}
			</Typography>

			{/* Team name */}
			<Stack spacing={0.25} alignItems="center">
				<Typography
					variant="caption"
					fontWeight="bold"
					sx={{
						textTransform: "uppercase",
						letterSpacing: "0.1em",
						color: isWinner ? "text.primary" : "text.secondary",
					}}
				>
					{name}
				</Typography>
			</Stack>
		</Stack>
	);
}

export default function MatchesIntroCard({
	firstTeamName,
	firstTotalSetsWon,
	secondTeamName,
	secondTotalSetsWon,
}: TotalResult) {
	const secondWins = secondTotalSetsWon >= firstTotalSetsWon;
	const firstWins = firstTotalSetsWon >= secondTotalSetsWon;

	return (
		<Box sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: "280px" } }}>
			<Card sx={{ width: "100%", height: "100%" }}>
				<CardContent sx={{ height: "100%", justifyContent: "center" }}>
					{/* Label */}
					<Typography
						variant="caption"
						color="text.secondary"
						sx={{ textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", display: "block" }}
					>
						Sveukupno
					</Typography>

					{/* Teams + score */}
					<Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
						{/* Left: second team (Crni) */}
						<TeamBlock
							isDark
							name={secondTeamName || "Crni"}
							score={secondTotalSetsWon}
							isWinner={secondWins}
						/>

						{/* Center separator */}
						<Typography variant="h4" color="text.secondary" sx={{ pb: 4 }}>
							:
						</Typography>

						{/* Right: first team (Bijeli) */}
						<TeamBlock
							isDark={false}
							name={firstTeamName || "Bijeli"}
							score={firstTotalSetsWon}
							isWinner={firstWins}
						/>
					</Stack>
				</CardContent>
			</Card>
		</Box>
	);
}
