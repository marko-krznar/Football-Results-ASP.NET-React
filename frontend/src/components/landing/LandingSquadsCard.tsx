import { Avatar, Card, CardContent, Divider, Stack, Typography, useTheme } from "@mui/material";

function LandingSquadsCard({
	firstTeamPlayers,
	secondTeamPlayers,
}: {
	firstTeamPlayers?: string[];
	secondTeamPlayers?: string[];
}) {
	const theme = useTheme();

	return (
		<Card sx={{ flex: 1 }}>
			<CardContent sx={{ flexDirection: "row" }}>
				<Stack alignItems={"center"} gap={4} flexBasis={"50%"}>
					<Typography variant="subtitle2">Crni</Typography>
					<Stack direction="row" justifyContent="center" flexWrap="wrap" gap={2}>
						{firstTeamPlayers?.map((player) => {
							// if (player.isCaptain) {
							// 	return (
							// 		<Box
							// 			display="flex"
							// 			flexDirection="column"
							// 			alignItems="center"
							// 			paddingBlock={1}
							// 			paddingInline={3}
							// 			gap={1}
							// 		>
							// 			<Badge badgeContent="C" color="primary">
							// 				<Avatar>{player.name.charAt(0)}</Avatar>
							// 			</Badge>
							// 			<Typography variant="body2">{player.name}</Typography>
							// 		</Box>
							// 	);
							// }

							return (
								<Stack
									key={player}
									alignItems="center"
									paddingBlock={1}
									paddingInline={3}
									gap={1}
									width={200}
									flexShrink={1}
									sx={{
										backgroundColor: theme.palette.background.paper,
									}}
									paddingY={2}
									borderRadius={2}
								>
									<Avatar>{player.charAt(0)}</Avatar>
									<Typography variant="body2">{player}</Typography>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<Divider orientation="vertical" flexItem />
				<Stack alignItems={"center"} gap={4} flexBasis={"50%"}>
					<Typography variant="subtitle2">Bijeli</Typography>
					<Stack direction="row" justifyContent="center" flexWrap="wrap" gap={2}>
						{secondTeamPlayers?.map((player) => {
							// if (player.name === "Ante") {
							// 	return (
							// 		<Box
							// 			display="flex"
							// 			flexDirection="column"
							// 			alignItems="center"
							// 			paddingBlock={1}
							// 			paddingInline={3}
							// 			gap={1}
							// 		>
							// 			<Badge badgeContent="C" color="primary">
							// 				<Avatar>{player.name.charAt(0)}</Avatar>
							// 			</Badge>
							// 			<Typography variant="body2">{player.name}</Typography>
							// 		</Box>
							// 	);
							// }

							return (
								<Stack
									key={player}
									alignItems="center"
									paddingBlock={1}
									paddingInline={3}
									gap={1}
									width={200}
									flexShrink={1}
									sx={{
										backgroundColor: theme.palette.background.paper,
									}}
									paddingY={2}
									borderRadius={2}
								>
									<Avatar>{player.charAt(0)}</Avatar>
									<Typography variant="body2">{player}</Typography>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
}

export default LandingSquadsCard;
