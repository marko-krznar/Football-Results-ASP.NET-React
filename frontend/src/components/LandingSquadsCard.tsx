import {
	Avatar,
	Badge,
	Box,
	Card,
	CardContent,
	Divider,
	Typography,
} from "@mui/material";

function LandingSquadsCard() {
	const bijeli = [
		"Mališa",
		"Marko",
		"Ante",
		"Dino",
		"Bebić",
		"Rotim",
		"Juka",
	];
	const crni = [
		"Tomo",
		"Vukovarac",
		"Bruno",
		"Filip",
		"Mate",
		"Perić",
		"Miro",
	];
	return (
		<Card sx={{ flex: 1 }}>
			<CardContent sx={{ flexDirection: "row" }}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					gap={2}
					flex={1}
				>
					<Typography variant="subtitle2">Crni </Typography>
					<Box
						display="flex"
						flexDirection="row"
						alignItems="center"
						justifyContent="center"
						flexWrap="wrap"
						gap={2}
					>
						{crni.map((player) => {
							if (player === "Vukovarac") {
								return (
									<Box
										display="flex"
										flexDirection="column"
										alignItems="center"
										paddingBlock={1}
										paddingInline={3}
										gap={1}
									>
										<Badge badgeContent="C" color="primary">
											<Avatar>{player.charAt(0)}</Avatar>
										</Badge>
										<Typography variant="body2">
											{player}
										</Typography>
									</Box>
								);
							}

							return (
								<Box
									display="flex"
									flexDirection="column"
									alignItems="center"
									paddingBlock={1}
									paddingInline={3}
									gap={1}
								>
									<Avatar>{player.charAt(0)}</Avatar>
									<Typography variant="body2">
										{player}
									</Typography>
								</Box>
							);
						})}
					</Box>
				</Box>
				<Divider orientation="vertical" flexItem />
				<Box
					display="flex"
					flexDirection="column"
					gap={2}
					alignItems="center"
					flex={1}
				>
					<Typography variant="subtitle2">Bijeli</Typography>
					<Box
						display="flex"
						flexDirection="row"
						alignItems="center"
						justifyContent="center"
						flexWrap="wrap"
						gap={2}
					>
						{bijeli.map((player) => {
							if (player === "Ante") {
								return (
									<Box
										display="flex"
										flexDirection="column"
										alignItems="center"
										paddingBlock={1}
										paddingInline={3}
										gap={1}
									>
										<Badge badgeContent="C" color="primary">
											<Avatar>{player.charAt(0)}</Avatar>
										</Badge>
										<Typography variant="body2">
											{player}
										</Typography>
									</Box>
								);
							}

							return (
								<Box
									display="flex"
									flexDirection="column"
									alignItems="center"
									paddingBlock={1}
									paddingInline={3}
									gap={1}
								>
									<Avatar>{player.charAt(0)}</Avatar>
									<Typography variant="body2">
										{player}
									</Typography>
								</Box>
							);
						})}
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}

export default LandingSquadsCard;
