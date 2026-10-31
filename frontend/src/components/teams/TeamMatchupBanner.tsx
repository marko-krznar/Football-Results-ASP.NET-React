import { Box, Card, Chip, Stack, Typography, useTheme } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

interface TeamBannerProps {
	teamName: string;
	kitType: "dark" | "light";
	captainName?: string;
	playerCount: number;
}

export function TeamBannerCard({ teamName, kitType, captainName, playerCount }: TeamBannerProps) {
	const theme = useTheme();
	const isDark = kitType === "dark";

	return (
		<Card
			elevation={0}
			sx={{
				flex: 1,
				bgcolor: "background.paper",
				border: 1,
				borderColor: "divider",
				borderRadius: 3,
				p: 2,
				minWidth: { xs: "100%", sm: 260 },
			}}
		>
			<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
				{/* Left side: Icon + Name/Kit + Captain */}
				<Stack direction="row" spacing={1.5} alignItems="center">
					<Box
						sx={{
							width: 44,
							height: 44,
							borderRadius: 2,
							bgcolor: isDark ? theme.palette.grey[900] : theme.palette.grey[800],
							border: 1,
							borderColor: "divider",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexShrink: 0,
						}}
					>
						{isDark ? (
							<SportsSoccerIcon sx={{ color: "text.secondary" }} />
						) : (
							<Box
								sx={{
									width: 16,
									height: 16,
									borderRadius: "50%",
									bgcolor: "#ffffff",
								}}
							/>
						)}
					</Box>

					<Box>
						<Stack direction="row" spacing={1} alignItems="center">
							<Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
								{teamName}
							</Typography>
							<Chip
								label={isDark ? "TAMNI DRES" : "SVIJETLI DRES"}
								size="small"
								sx={{
									height: 18,
									fontSize: "0.62rem",
									fontWeight: 700,
									letterSpacing: "0.04em",
									borderRadius: 1,
									bgcolor: "rgba(255, 255, 255, 0.08)",
									color: "text.secondary",
								}}
							/>
						</Stack>
						<Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }} display="block">
							Kapetan: {captainName || "Nije dodijeljen"}
						</Typography>
					</Box>
				</Stack>

				{/* Right side: Player count */}
				<Stack alignItems="flex-end" flexShrink={0}>
					<Chip
						label={`${playerCount} igrača`}
						size="small"
						sx={{
							borderRadius: 6,
							fontWeight: 600,
							fontSize: "0.72rem",
							bgcolor: "rgba(255, 255, 255, 0.05)",
							border: 1,
							borderColor: "divider",
							color: "text.primary",
						}}
					/>
				</Stack>
			</Stack>
		</Card>
	);
}

interface TeamMatchupBannerProps {
	blackTeamName?: string;
	blackCaptainName?: string;
	blackCount: number;
	whiteTeamName?: string;
	whiteCaptainName?: string;
	whiteCount: number;
}

export default function TeamMatchupBanner({
	blackTeamName = "Crni",
	blackCaptainName,
	blackCount,
	whiteTeamName = "Bijeli",
	whiteCaptainName,
	whiteCount,
}: TeamMatchupBannerProps) {
	return (
		<Stack
			direction={{ xs: "column", lg: "row" }}
			alignItems="center"
			spacing={2}
			width="100%"
			sx={{ position: "relative" }}
		>
			<TeamBannerCard
				teamName={blackTeamName}
				kitType="dark"
				captainName={blackCaptainName}
				playerCount={blackCount}
			/>

			{/* VS badge */}
			<Box
				sx={{
					px: 1.5,
					py: 0.5,
					borderRadius: 4,
					bgcolor: "background.paper",
					border: 1,
					borderColor: "divider",
					color: "text.secondary",
					fontWeight: 800,
					fontSize: "0.75rem",
					textTransform: "uppercase",
					letterSpacing: "0.08em",
					zIndex: 1,
					alignSelf: "center",
				}}
			>
				vs
			</Box>

			<TeamBannerCard
				teamName={whiteTeamName}
				kitType="light"
				captainName={whiteCaptainName}
				playerCount={whiteCount}
			/>
		</Stack>
	);
}
