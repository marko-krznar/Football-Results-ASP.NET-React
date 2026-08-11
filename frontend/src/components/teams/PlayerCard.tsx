import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import type { TeamMember } from "../../redux/api/teamMembersApi";

interface PlayerCardProps {
	player: TeamMember;
}

export default function PlayerCard({ player }: PlayerCardProps) {
	const theme = useTheme();

	return (
		<Stack
			alignItems="center"
			gap={1}
			flexShrink={1}
			sx={{
				backgroundColor: theme.palette.grey[900],
				width: { xs: "100%", md: 200 },
			}}
			paddingY={2}
			borderRadius={2}
		>
			<Avatar>{player.playerName.charAt(0)}</Avatar>
			<Typography variant="body1" align="center">
				{player.playerName}
			</Typography>
		</Stack>
	);
}
