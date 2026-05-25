import { Typography, Box, Avatar } from "@mui/material";
import type { Player } from "../../types/match";

interface AvatarPlayerProps {
	player: Player;
}

export default function AvatarPlayer({ player }: AvatarPlayerProps) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 1,
			}}
		>
			<Avatar sx={{ width: 24, height: 24 }}>
				<Typography variant="caption">
					{player.name.charAt(0)}
				</Typography>
			</Avatar>
			<Typography variant="body2">{player.name}</Typography>
		</Box>
	);
}
