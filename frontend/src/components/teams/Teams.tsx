/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Avatar,
	Box,
	Typography,
	Container,
	Stack,
	Divider,
} from "@mui/material";
import { useGetPlayersQuery } from "../../redux-toolkit/api/playersApi";
import mockPlayers from "../../data/mockPlayers.json";

export default function Teams() {
	const { data: backendPlayers, isLoading, error } = useGetPlayersQuery();

	const crni = mockPlayers.players.filter(
		(player: any) => player.team === "crni"
	);
	const bijeli = mockPlayers.players.filter(
		(player: any) => player.team === "bijeli"
	);

	return (
		<Container maxWidth="xl">
			<Box sx={{ mt: 4, mb: 2, paddingInline: 2 }}>
				<Typography variant="h5">Aktivni igrači</Typography>
				{isLoading && (
					<Typography variant="body2">
						Učitavanje igrača...
					</Typography>
				)}
				{error && (
					<Typography variant="body2" color="error">
						Greška pri dohvaćanju igrača s backenda.
					</Typography>
				)}
				{backendPlayers && (
					<Stack
						direction="row"
						flexWrap="wrap"
						gap={2}
						sx={{ mb: 4 }}
					>
						{backendPlayers.map((player) => (
							<Stack
								key={player.id}
								direction="row"
								alignItems="center"
								gap={1}
								sx={{
									background: "#1E1F1E",
									padding: "8px 16px",
									borderRadius: "8px",
									minWidth: "150px",
								}}
							>
								<Avatar
									sx={{
										width: 28,
										height: 28,
										fontSize: "0.9rem",
									}}
								>
									{player.name[0]}
								</Avatar>
								<Typography
									variant="body2"
									sx={{ color: "#fff" }}
								>
									{player.name}
								</Typography>
							</Stack>
						))}
						{backendPlayers.length === 0 && (
							<Typography
								variant="body2"
								sx={{ color: "#ADAAAA" }}
							>
								Nema igrača u bazi podataka.
							</Typography>
						)}
					</Stack>
				)}
			</Box>
			<Divider sx={{ mb: 2 }} />

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
