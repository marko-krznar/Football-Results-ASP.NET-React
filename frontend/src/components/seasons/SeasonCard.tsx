import { Box, Card, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import type { Season } from "../../redux/api/seasonsApi";
import { formatSeasonDuration, getSeasonLeaderOrWinner, type SeasonStats } from "../../utils/seasonUtils";

const PLANNED_MATCHES_PER_SEASON = 16;

interface SeasonCardProps {
	season: Season;
	isActive: boolean;
	stats?: SeasonStats;
}

export default function SeasonCard({ season, isActive, stats }: SeasonCardProps) {
	const hasRealData = Boolean(stats && stats.matchCount > 0);
	const matchesPlayed = stats?.matchCount ?? 0;
	const progressPct = hasRealData
		? Math.min(Math.round((matchesPlayed / PLANNED_MATCHES_PER_SEASON) * 100), 100)
		: 0;
	const leaderOrWinner = getSeasonLeaderOrWinner(stats);

	return (
		<Card
			sx={{
				backgroundColor: "background.paper",
				borderRadius: 4,
				p: 4,
				border: 1,
				borderColor: isActive ? "primary.main" : "divider",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				gap: 3,
				position: "relative",
				boxShadow: (theme) => (isActive ? `0 0 24px -4px ${theme.palette.primary.main}26` : "none"),
			}}
		>
			{/* Header */}
			<Box>
				<Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
					<Box>
						<Typography
							variant="caption"
							sx={{
								textTransform: "uppercase",
								letterSpacing: "0.1em",
								fontWeight: 700,
								color: "text.secondary",
								display: "block",
							}}
						>
							{isActive ? "NATJECATELJSKA SEZONA" : "ARHIVIRANA SEZONA"}
						</Typography>
						<Typography variant="h3" component="h2" sx={{ fontWeight: 800, mt: 0.5 }}>
							{season.name}
						</Typography>
					</Box>

					{isActive ? (
						<Chip
							label="Aktivna sezona"
							size="small"
							sx={{
								backgroundColor: "info.main",
								color: "info.contrastText",
								fontWeight: 700,
								borderRadius: "16px",
								px: 0.5,
							}}
						/>
					) : (
						<Chip
							icon={<CheckCircleOutlineIcon sx={{ fontSize: "1rem !important", color: "inherit" }} />}
							label="Završena sezona"
							size="small"
							sx={{
								backgroundColor: "action.hover",
								color: "text.secondary",
								fontWeight: 600,
								borderRadius: "16px",
								px: 0.5,
								border: 1,
								borderColor: "divider",
							}}
						/>
					)}
				</Stack>
			</Box>

			{/* Duration pill banner */}
			<Box
				sx={{
					backgroundColor: "action.hover",
					borderRadius: 3,
					p: 2,
					display: "flex",
					alignItems: "center",
					gap: 2,
					border: 1,
					borderColor: "divider",
				}}
			>
				<CalendarTodayOutlinedIcon sx={{ color: "text.secondary", fontSize: "1.4rem" }} />
				<Box>
					<Typography
						variant="caption"
						sx={{
							textTransform: "uppercase",
							letterSpacing: "0.08em",
							fontWeight: 700,
							color: "text.secondary",
							display: "block",
						}}
					>
						TRAJANJE
					</Typography>
					<Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }}>
						{formatSeasonDuration(season)}
					</Typography>
				</Box>
			</Box>

			{/* 2 Stats capsules: Matches count & Leader / Winner */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
					gap: 1.5,
				}}
			>
				{/* Stat 1: Played rounds */}
				<Box
					sx={{
						backgroundColor: "action.hover",
						borderRadius: 3,
						p: 2,
						border: 1,
						borderColor: "divider",
					}}
				>
					<Typography
						variant="caption"
						sx={{
							textTransform: "uppercase",
							letterSpacing: "0.06em",
							fontWeight: 700,
							color: "text.secondary",
							display: "block",
							mb: 0.75,
						}}
					>
						{isActive ? "ODIGRANO" : "BROJ KOLA"}
					</Typography>
					<Stack direction="row" alignItems="baseline" spacing={0.75}>
						<Typography variant="h5" component="span" sx={{ fontWeight: 800 }}>
							{matchesPlayed}
						</Typography>
						<Typography variant="caption" sx={{ color: "text.secondary" }}>
							kola
						</Typography>
					</Stack>
				</Box>

				{/* Stat 2: Leader (Active) / Winner (Completed) */}
				<Box
					sx={{
						backgroundColor: "action.hover",
						borderRadius: 3,
						p: 2,
						border: 1,
						borderColor: "divider",
					}}
				>
					<Typography
						variant="caption"
						sx={{
							textTransform: "uppercase",
							letterSpacing: "0.06em",
							fontWeight: 700,
							color: "text.secondary",
							display: "block",
							mb: 0.75,
						}}
					>
						{isActive ? "VODEĆA EKIPA" : "POBJEDNIK SEZONE"}
					</Typography>
					<Stack direction="row" alignItems="center" spacing={0.75}>
						{isActive ? (
							hasRealData ? (
								<>
									<Box
										sx={{
											width: 8,
											height: 8,
											borderRadius: "50%",
											backgroundColor: "text.primary",
										}}
									/>
									<Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }} noWrap>
										{leaderOrWinner}
									</Typography>
								</>
							) : (
								<Typography variant="body1" sx={{ fontWeight: 700, color: "text.secondary" }}>
									-
								</Typography>
							)
						) : (
							<>
								<EmojiEventsOutlinedIcon sx={{ fontSize: "1.2rem", color: "primary.main" }} />
								<Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }} noWrap>
									{leaderOrWinner}
								</Typography>
							</>
						)}
					</Stack>
				</Box>
			</Box>

			{/* Progress / Completion row */}
			{isActive ? (
				<Box
					sx={{
						backgroundColor: "action.hover",
						borderRadius: 3,
						p: 2,
						border: 1,
						borderColor: "divider",
					}}
				>
					<Stack direction="row" alignItems="center" spacing={2}>
						{/* Circular progress percentage */}
						<Box
							sx={{
								width: 44,
								height: 44,
								borderRadius: "50%",
								border: 3,
								borderColor: "divider",
								borderTopColor: "primary.main",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexShrink: 0,
							}}
						>
							<Typography variant="caption" sx={{ fontWeight: 800 }}>
								{progressPct}%
							</Typography>
						</Box>

						<Box sx={{ width: "100%" }}>
							<Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
								{hasRealData ? "Napredak kalendara sezone" : "Sezona u pripremi"}
							</Typography>
							<Typography variant="caption" sx={{ color: "text.secondary" }}>
								{hasRealData
									? `${matchesPlayed} od planiranih ${PLANNED_MATCHES_PER_SEASON} termina odigrano`
									: "Nema odigranih termina"}
							</Typography>
							<LinearProgress
								variant="determinate"
								value={progressPct}
								sx={{
									height: 4,
									borderRadius: 2,
									mt: 0.75,
									backgroundColor: "action.focus",
									"& .MuiLinearProgress-bar": {
										backgroundColor: "primary.main",
									},
								}}
							/>
						</Box>
					</Stack>
				</Box>
			) : (
				<Box
					sx={{
						backgroundColor: "action.hover",
						borderRadius: 3,
						p: 2,
						border: 1,
						borderColor: "divider",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Stack direction="row" alignItems="center" spacing={1.75}>
						<Box
							sx={{
								width: 40,
								height: 40,
								borderRadius: "50%",
								backgroundColor: "action.selected",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "text.secondary",
							}}
						>
							<WorkspacePremiumOutlinedIcon />
						</Box>
						<Box>
							<Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
								{hasRealData ? "Kompletirana sezona" : "Arhivirana sezona"}
							</Typography>
							<Typography variant="caption" sx={{ color: "text.secondary" }}>
								{hasRealData
									? `Svi službeni rezultati verificirani (${matchesPlayed} kola)`
									: "Nema evidentiranih utakmica za ovu sezonu"}
							</Typography>
						</Box>
					</Stack>
				</Box>
			)}
		</Card>
	);
}
