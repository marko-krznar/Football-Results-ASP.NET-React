import { Box, Card, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BoltIcon from "@mui/icons-material/Bolt";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import type { Dayjs } from "dayjs";

interface SeasonMetricsOverviewProps {
	totalSeasons: number;
	activeSeasonName?: string;
	activeSeasonSubtitle: string;
	nextMatchDate: Dayjs;
}

export default function SeasonMetricsOverview({
	totalSeasons,
	activeSeasonName,
	activeSeasonSubtitle,
	nextMatchDate,
}: SeasonMetricsOverviewProps) {
	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
				gap: 3,
				mb: 5,
			}}
		>
			{/* Card 1: Total seasons */}
			<Card
				sx={{
					backgroundColor: "background.paper",
					borderRadius: 4,
					p: 3.5,
					border: 1,
					borderColor: "divider",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box>
					<Typography
						variant="caption"
						sx={{
							textTransform: "uppercase",
							letterSpacing: "0.08em",
							fontWeight: 700,
							color: "text.secondary",
							display: "block",
							mb: 0.5,
						}}
					>
						Ukupno Sezona
					</Typography>
					<Stack direction="row" alignItems="baseline" spacing={1.5}>
						<Typography variant="h3" component="span" sx={{ fontWeight: 800, lineHeight: 1 }}>
							{totalSeasons}
						</Typography>
						<Typography variant="body2" sx={{ color: "text.secondary" }}>
							Evidentirane lige
						</Typography>
					</Stack>
				</Box>
				<Box
					sx={{
						width: 48,
						height: 48,
						borderRadius: "50%",
						backgroundColor: "action.hover",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "text.primary",
					}}
				>
					<ViewModuleIcon />
				</Box>
			</Card>

			{/* Card 2: Currently active */}
			<Card
				sx={{
					backgroundColor: "background.paper",
					borderRadius: 4,
					p: 3.5,
					border: 1,
					borderColor: "divider",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box>
					<Typography
						variant="caption"
						sx={{
							textTransform: "uppercase",
							letterSpacing: "0.08em",
							fontWeight: 700,
							color: "text.secondary",
							display: "block",
							mb: 0.5,
						}}
					>
						Trenutno Aktivna
					</Typography>
					<Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 0.75, lineHeight: 1.1 }}>
						{activeSeasonName ?? "Nema aktivne"}
					</Typography>
					<Stack direction="row" alignItems="center" spacing={1}>
						<Box
							sx={{
								width: 8,
								height: 8,
								borderRadius: "50%",
								backgroundColor: "info.main",
							}}
						/>
						<Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
							{activeSeasonSubtitle}
						</Typography>
					</Stack>
				</Box>
				<Box
					sx={{
						width: 48,
						height: 48,
						borderRadius: "50%",
						backgroundColor: "action.hover",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "text.primary",
					}}
				>
					<BoltIcon />
				</Box>
			</Card>

			{/* Card 3: Next match date */}
			<Card
				sx={{
					backgroundColor: "background.paper",
					borderRadius: 4,
					p: 3.5,
					border: 1,
					borderColor: "divider",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box>
					<Typography
						variant="caption"
						sx={{
							textTransform: "uppercase",
							letterSpacing: "0.08em",
							fontWeight: 700,
							color: "text.secondary",
							display: "block",
							mb: 0.5,
						}}
					>
						Sljedeći Termin
					</Typography>
					<Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 0.75, lineHeight: 1.1 }}>
						Ponedjeljak 19:00h
					</Typography>
					<Stack direction="row" alignItems="center" spacing={0.5}>
						<LocationOnOutlinedIcon sx={{ fontSize: "1rem", color: "text.secondary" }} />
						<Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
							ŠD Hotanj • {nextMatchDate.locale("hr").format("DD.MM.YYYY.")}
						</Typography>
					</Stack>
				</Box>
				<Box
					sx={{
						width: 48,
						height: 48,
						borderRadius: "50%",
						backgroundColor: "action.hover",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "text.primary",
					}}
				>
					<CalendarMonthIcon />
				</Box>
			</Card>
		</Box>
	);
}
