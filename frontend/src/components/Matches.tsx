import {
	Typography,
	Box,
	Chip,
	CardContent,
	Card,
	Avatar,
	Container,
	Button,
} from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../redux-toolkit/hooks";
import AddMatchModal from "./AddMatchModal";
import AddIcon from "@mui/icons-material/Add";

export default function Matches() {
	const matches = useAppSelector((state) => state.matches.data);
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<Container maxWidth="xl">
			<Box
				sx={{
					paddingBlock: 4,
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-start",
						gap: "4rem",
					}}
				>
					<div
						style={{
							flex: 1,
							gap: "2rem",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography
								variant="subtitle2"
								color={"textPrimary"}
							>
								Statistika za sezonu 2026 proljeće
							</Typography>
							<Button
								variant="contained"
								startIcon={<AddIcon />}
								onClick={() => setIsModalOpen(true)}
							>
								Dodaj utakmicu
							</Button>
						</Box>
						<Typography variant="body1">
							Dobrodošli u pregled statistike za sezonu Proljeće
							2026. Naši susreti odvijaju se svakog ponedjeljka u
							19:00h u ŠD Hotanj. U nastavku možete istražiti
							povijest svih odigranih termina, uključujući točne
							datume, rezultate po setovima, konačne ishode te
							popise igrača koji su sudjelovali u svakom dvoboju.
						</Typography>
					</div>
					<Card
						sx={{
							// display: "flex",
							// alignItems: "center",
							// justifyContent: "center",
							flex: 1,
						}}
					>
						<CardContent>
							<Typography variant="subtitle2" textAlign="center">
								<span style={{ color: "#95CFFF" }}>
									Sveukupno
								</span>
							</Typography>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								gap={4}
							>
								<Box
									display="flex"
									flexDirection="column"
									justifyContent="center"
									gap={2}
								>
									<Typography
										variant="subtitle1"
										fontWeight="bold"
										textAlign="center"
									>
										9
									</Typography>
									<Typography
										variant="body1"
										textAlign="center"
									>
										Crni
									</Typography>
								</Box>
								<Typography variant="body1">-</Typography>
								<Box
									display="flex"
									flexDirection="column"
									justifyContent="center"
									gap={2}
								>
									<Typography
										variant="subtitle1"
										fontWeight="bold"
										textAlign="center"
									>
										8
									</Typography>
									<Typography
										variant="body1"
										textAlign="center"
									>
										Bijeli
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "4rem",
						marginTop: "2rem",
					}}
				>
					{matches.map((match) => (
						<div
							style={{
								border: "1px solid #1e1e1e",
								borderRadius: "1rem",
								padding: "2rem",
								display: "flex",
							}}
							key={match.id}
						>
							<Card>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
										gap: "8px",
										marginBottom: "8px",
									}}
								>
									<Typography variant="h6" fontWeight="bold">
										{match.date}
									</Typography>
									<div
										style={{
											display: "flex",
											gap: "16px",
											alignItems: "center",
										}}
									>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												gap: "8px",
											}}
										>
											<Typography variant="subtitle2">
												{match.blackScore}
											</Typography>
											<Typography variant="body1">
												Crni
											</Typography>
										</div>
										<Typography variant="body1">
											:
										</Typography>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												gap: "8px",
											}}
										>
											<Typography variant="subtitle2">
												{match.whiteScore}
											</Typography>
											<Typography variant="body1">
												Bijeli
											</Typography>
										</div>
									</div>
								</div>
							</Card>
							<div style={{ paddingInline: "2rem" }}>
								<div
									style={{
										display: "flex",
										gap: "16px",
										alignItems: "center",
									}}
								>
									<Typography variant="body1">
										Setovi
									</Typography>
									{match.sets.map((set) => (
										<Chip
											label={`${set.blackScore} - ${set.whiteScore}`}
										/>
									))}
								</div>
								<div
									style={{
										display: "flex",
										gap: "16px",
										marginBottom: "16px",
									}}
								>
									<Typography>Crni</Typography>
									{match.blackTeamPlayers.map((player) => (
										<Box
											display={"flex"}
											flexDirection="column"
											alignItems="center"
											gap={1}
										>
											<Avatar>
												{player.name.charAt(0)}
											</Avatar>
											<Typography variant="body2">
												{player.name}
											</Typography>
										</Box>
									))}
								</div>
								<div
									style={{
										display: "flex",
										gap: "16px",
										marginBottom: "16px",
									}}
								>
									<Typography>Bijeli</Typography>
									{match.whiteTeamPlayers.map((player) => (
										<Box
											display={"flex"}
											flexDirection="column"
											alignItems="center"
											gap={1}
										>
											<Avatar>
												{player.name.charAt(0)}
											</Avatar>
											<Typography variant="body2">
												{player.name}
											</Typography>
										</Box>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</Box>
			<AddMatchModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</Container>
	);
}
