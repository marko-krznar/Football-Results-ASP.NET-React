/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Avatar,
	Box,
	Typography,
	Container,
	Stack,
	Divider,
} from "@mui/material";
import mockPlayers from "../../data/mockPlayers.json";

export default function Teams() {
	const crni = mockPlayers.players.filter(
		(player: any) => player.team === "crni"
	);
	const bijeli = mockPlayers.players.filter(
		(player: any) => player.team === "bijeli"
	);

	return (
		<Container maxWidth="xl">
			<Stack
				direction="row"
				alignItems="flex-start"
				gap={2}
				paddingBlock={4}
			>
				<Box
					sx={{
						flex: 1,
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
						flexWrap: "wrap",
						gap: 4,
						paddingBlock: 4,
						paddingRight: 4,
					}}
				>
					<Box sx={{ width: "100%" }}>
						<Typography variant="subtitle2" align="center">
							Crni
						</Typography>
					</Box>
					{crni.map((player: any) => (
						<Stack
							key={player.id}
							alignItems="center"
							gap={1}
							paddingInline={2}
							flexGrow={1}
						>
							<Avatar>{player.name[0]}</Avatar>
							<Typography variant="body1" align="center">
								{player.name}
							</Typography>
						</Stack>
					))}
				</Box>
				<Divider orientation="vertical" flexItem />
				<Box
					sx={{
						flex: 1,
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
						flexWrap: "wrap",
						gap: 4,
						paddingBlock: 4,
						paddingLeft: 4,
					}}
				>
					<Box sx={{ width: "100%" }}>
						<Typography variant="subtitle2" align="center">
							Bijeli
						</Typography>
					</Box>
					{bijeli.map((player: any) => (
						<Stack
							key={player.id}
							alignItems="center"
							gap={1}
							paddingInline={2}
							flexGrow={1}
						>
							<Avatar>{player.name[0]}</Avatar>
							<Typography variant="body1" align="center">
								{player.name}
							</Typography>
						</Stack>
					))}
				</Box>
			</Stack>
		</Container>
	);
}
