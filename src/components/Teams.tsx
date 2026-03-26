/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import mockPlayers from "../data/mockPlayers.json";

export default function Teams() {
	const crni = mockPlayers.players.filter(
		(player: any) => player.team === "crni"
	);
	const bijeli = mockPlayers.players.filter(
		(player: any) => player.team === "bijeli"
	);

	return (
		<Stack
			spacing={4}
			direction={"row"}
			divider={<Divider orientation="vertical" flexItem />}
			justifyContent={"center"}
		>
			<Stack spacing={2} divider={<Divider />}>
				<Typography variant="body2" align="center">
					Crni
				</Typography>
				{crni.map((player: any) => (
					<Stack
						spacing={2}
						direction={"row"}
						alignItems={"center"}
						minWidth={200}
						key={player.id}
					>
						<Avatar>{player.name[0]}</Avatar>
						<Typography variant="body1" align="center">
							{player.name}
						</Typography>
					</Stack>
				))}
			</Stack>
			<Stack spacing={2} divider={<Divider />}>
				<Typography variant="body2" align="center">
					Bijeli
				</Typography>
				<>
					{bijeli.map((player: any) => (
						<Stack
							spacing={2}
							direction={"row"}
							alignItems={"center"}
							minWidth={200}
							key={player.id}
						>
							<Avatar>{player.name[0]}</Avatar>

							<Typography variant="body1" align="center">
								{player.name}
							</Typography>
						</Stack>
					))}
				</>
			</Stack>
		</Stack>
	);
}
