import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Chip, Divider, LinearProgress, Stack, useTheme } from "@mui/material";

export interface TotalResult {
	firstTeamName: string;
	firstTotalSetsWon: number;
	secondTeamName: string;
	secondTotalSetsWon: number;
	totalMatches?: number;
}

function TeamCircle({ isDark }: { isDark: boolean }) {
	const theme = useTheme();
	return (
		<Box
			sx={{
				width: 52,
				height: 52,
				borderRadius: "50%",
				backgroundColor: isDark ? theme.palette.background.default : theme.palette.background.paper,
				border: `1px solid ${theme.palette.divider}`,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				boxShadow: 3,
				mb: 1,
			}}
		>
			<Box
				sx={{
					width: 16,
					height: 16,
					borderRadius: "50%",
					backgroundColor: isDark ? theme.palette.action.disabled : theme.palette.primary.light,
				}}
			/>
		</Box>
	);
}

export default function MatchesIntroCard({
	firstTeamName,
	firstTotalSetsWon,
	secondTeamName,
	secondTotalSetsWon,
	totalMatches,
}: TotalResult) {
	const theme = useTheme();
	const total = firstTotalSetsWon + secondTotalSetsWon;
	const secondPct = total > 0 ? Math.round((secondTotalSetsWon / total) * 100) : 0;
	const firstPct = total > 0 ? Math.round((firstTotalSetsWon / total) * 100) : 0;
	const diff = Math.abs(secondTotalSetsWon - firstTotalSetsWon);
	const leaderName = secondTotalSetsWon >= firstTotalSetsWon ? secondTeamName : firstTeamName;

	// Which side is "leading" — highlight with primary color
	const secondColor =
		secondTotalSetsWon >= firstTotalSetsWon ? theme.palette.text.primary : theme.palette.text.secondary;
	const firstColor =
		firstTotalSetsWon >= secondTotalSetsWon ? theme.palette.text.primary : theme.palette.text.secondary;

	return (
		<Box sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: "320px" } }}>
			<Card sx={{ width: "100%" }}>
				<CardContent>
					{/* Header row */}
					<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
						<Box>
							<Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>
								Omjer pobjeda
							</Typography>
							<Typography variant="h4" fontWeight="bold" color="text.primary">
								Sveukupno
							</Typography>
						</Box>
						{totalMatches !== undefined && (
							<Chip label={`${totalMatches} Susreta`} size="small" variant="outlined" sx={{ borderColor: "divider" }} />
						)}
					</Stack>

					{/* Team score row */}
					<Stack direction="row" justifyContent="space-between" alignItems="center">
						{/* Left team: second (Crni) */}
						<Stack alignItems="center" spacing={0}>
							<TeamCircle isDark />
							<Typography variant="h2" fontWeight="bold" color={secondColor} sx={{ lineHeight: 1 }}>
								{secondTotalSetsWon}
							</Typography>
							<Typography
								variant="caption"
								fontWeight="bold"
								color="text.secondary"
								sx={{ textTransform: "uppercase", letterSpacing: "0.08em", mt: 0.25 }}
							>
								{secondTeamName}
							</Typography>
							<Typography variant="caption" color="text.secondary">
								{secondPct}% pobjeda
							</Typography>
						</Stack>

						{/* Center: OMJER label */}
						<Stack alignItems="center" spacing={0.5}>
							<Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
								Omjer
							</Typography>
						</Stack>

						{/* Right team: first (Bijeli) */}
						<Stack alignItems="center" spacing={0}>
							<TeamCircle isDark={false} />
							<Typography variant="h2" fontWeight="bold" color={firstColor} sx={{ lineHeight: 1 }}>
								{firstTotalSetsWon}
							</Typography>
							<Typography
								variant="caption"
								fontWeight="bold"
								color="text.secondary"
								sx={{ textTransform: "uppercase", letterSpacing: "0.08em", mt: 0.25 }}
							>
								{firstTeamName}
							</Typography>
							<Typography variant="caption" color="text.secondary">
								{firstPct}% pobjeda
							</Typography>
						</Stack>
					</Stack>

					<Divider />

					{/* Progress bar section */}
					<Box>
						<Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
							<Typography variant="caption" color="text.secondary">
								{secondTeamName} ({secondTotalSetsWon})
							</Typography>
							<Typography variant="caption" color="text.secondary">
								{firstTeamName} ({firstTotalSetsWon})
							</Typography>
						</Stack>
						<LinearProgress
							variant="determinate"
							value={secondPct}
							sx={{
								height: 6,
								borderRadius: 3,
								backgroundColor: theme.palette.action.hover,
								"& .MuiLinearProgress-bar": {
									borderRadius: 3,
									backgroundColor: theme.palette.primary.main,
								},
							}}
						/>
						{diff > 0 && (
							<Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: "block" }}>
								{leaderName} trenutno vode s {diff} pobjedom razlike.
							</Typography>
						)}
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}
