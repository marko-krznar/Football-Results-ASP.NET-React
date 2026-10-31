import { Box, Chip, Stack, Typography } from "@mui/material";
import { TeamBannerCard } from "./TeamMatchupBanner";

interface TeamsHeaderProps {
	seasonName?: string;
	totalPlayers: number;
	blackTeamName?: string;
	blackCaptainName?: string;
	blackCount: number;
	whiteTeamName?: string;
	whiteCaptainName?: string;
	whiteCount: number;
}

export default function TeamsHeader({
	seasonName,
	totalPlayers,
	blackTeamName = "Crni",
	blackCaptainName,
	blackCount,
	whiteTeamName = "Bijeli",
	whiteCaptainName,
	whiteCount,
}: TeamsHeaderProps) {
	const currentSeasonLabel = seasonName
		? `SLUŽBENI SASTAVI SEZONA ${seasonName.toUpperCase()}`
		: "SLUŽBENI SASTAVI SEZONE";

	return (
		<Stack spacing={2} width="100%">
			<Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
				<Chip
					label={currentSeasonLabel}
					size="small"
					sx={{
						bgcolor: "rgba(56, 189, 248, 0.12)",
						color: "#38bdf8",
						border: "1px solid rgba(56, 189, 248, 0.25)",
						fontWeight: 600,
						fontSize: "0.75rem",
						letterSpacing: "0.05em",
						"& .MuiChip-label": {
							px: 1.5,
						},
					}}
				/>

				<Chip
					label={`Ukupno: ${totalPlayers} igrača`}
					size="small"
					sx={{
						bgcolor: "rgba(56, 189, 248, 0.12)",
						color: "#38bdf8",
						border: "1px solid rgba(56, 189, 248, 0.25)",
						fontWeight: 600,
						fontSize: "0.75rem",
						letterSpacing: "0.05em",
						"& .MuiChip-label": {
							px: 1.5,
						},
					}}
				/>
			</Stack>

			<Stack
				direction={{ xs: "column", lg: "row" }}
				justifyContent="space-between"
				alignItems={{ xs: "flex-start", lg: "center" }}
				gap={3}
				width="100%"
			>
				<Box sx={{ maxWidth: { xs: "100%", lg: "45%" } }}>
					<Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
						Pregled Momčadi
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{
							maxWidth: { xs: "100%", sm: "520px" },
							lineHeight: 1.6,
						}}
					>
						Aktualni rostri momčadi <strong>Crni</strong> i <strong>Bijeli</strong>. Susreti se odigravaju
						svakog ponedjeljka u 19:00h u dvorani ŠD Hotanj uz službeni protokol lige.
					</Typography>
				</Box>

				{/* Crni and Bijeli team cards next to Pregled Momčadi */}
				<Stack
					direction={{ xs: "column", sm: "row" }}
					spacing={2}
					alignItems="center"
					sx={{
						flexGrow: 1,
						width: { xs: "100%", lg: "auto" },
						maxWidth: { xs: "100%", lg: "55%" },
					}}
				>
					<TeamBannerCard
						teamName={blackTeamName}
						kitType="dark"
						captainName={blackCaptainName}
						playerCount={blackCount}
					/>

					<Box
						sx={{
							px: 1.25,
							py: 0.25,
							borderRadius: 4,
							bgcolor: "background.paper",
							border: 1,
							borderColor: "divider",
							color: "text.secondary",
							fontWeight: 800,
							fontSize: "0.7rem",
							textTransform: "uppercase",
							letterSpacing: "0.08em",
							flexShrink: 0,
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
			</Stack>
		</Stack>
	);
}
