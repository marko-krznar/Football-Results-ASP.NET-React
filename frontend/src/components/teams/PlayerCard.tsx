import { Avatar, Box, Card, Chip, Tooltip, Typography, useTheme } from "@mui/material";
import type { TeamMember } from "../../redux/api/teamMembersApi";

interface PlayerCardProps {
	player: TeamMember;
	teamType: "crni" | "bijeli";
	appearances?: number;
}

export default function PlayerCard({ player, teamType, appearances = 0 }: PlayerCardProps) {
	const theme = useTheme();
	const isWhiteTeam = teamType === "bijeli";

	// Extract initials (first letter of first name or single initial)
	const initial = player.playerName.trim().charAt(0).toUpperCase();

	// Format text in Croatian: 1 nastup, 2/3/4 nastupa, 5+ nastupa, 0 nastupa
	const getAppearancesLabel = (count: number) => {
		if (count % 10 === 1 && count % 100 !== 11) {
			return `${count} nastup`;
		}
		return `${count} nastupa`;
	};

	return (
		<Card
			elevation={0}
			sx={{
				position: "relative",
				bgcolor: "background.paper",
				border: 1,
				borderColor: "divider",
				borderRadius: 3,
				p: 2.5,
				pt: 3,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
				width: "100%",
				minHeight: 165,
				justifyContent: "space-between",
			}}
		>
			{/* Team indicator pill in upper-left corner */}
			<Box
				sx={{
					position: "absolute",
					top: 10,
					left: 10,
					px: 1,
					py: 0.2,
					borderRadius: 3,
					fontSize: "0.65rem",
					fontWeight: 700,
					letterSpacing: "0.03em",
					textTransform: "uppercase",
					bgcolor: isWhiteTeam ? "#ffffff" : "#111827",
					color: isWhiteTeam ? "#111827" : "#ffffff",
					border: 1,
					borderColor: isWhiteTeam ? "#e5e7eb" : "#374151",
					lineHeight: 1.3,
				}}
			>
				{isWhiteTeam ? "Bijeli" : "Crni"}
			</Box>

			{/* Avatar with team-aware styling */}
			<Avatar
				sx={{
					width: 48,
					height: 48,
					bgcolor: isWhiteTeam ? "#ffffff" : theme.palette.grey[800],
					color: isWhiteTeam ? "#111827" : "text.primary",
					fontWeight: 800,
					fontSize: "1.15rem",
					border: 1,
					borderColor: isWhiteTeam ? "#e5e7eb" : "divider",
					mb: 1,
					mt: 0.5,
				}}
			>
				{initial}
			</Avatar>

			{/* Player name with Tooltip for full name on hover */}
			<Box sx={{ mb: 1, width: "100%" }}>
				<Tooltip title={player.playerName} arrow enterDelay={200}>
					<Typography
						variant="body1"
						sx={{
							fontWeight: 700,
							color: "text.primary",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							cursor: "default",
						}}
					>
						{player.playerName}
					</Typography>
				</Tooltip>
			</Box>

			<Chip
				size="small"
				label={getAppearancesLabel(appearances)}
				sx={{
					height: 22,
					fontSize: "0.72rem",
					fontWeight: 600,
					borderRadius: 4,
					bgcolor: "rgba(255, 255, 255, 0.05)",
					color: "text.secondary",
					border: "1px solid rgba(255, 255, 255, 0.1)",
				}}
			/>
		</Card>
	);
}
