import {
	Typography,
	Box,
	CardContent,
	Card,
	Avatar,
	Container,
	Chip,
} from "@mui/material";
import { useAppSelector } from "../../redux-toolkit/hooks";
import MatchesIntro from "./MatchesIntro";
import MatchSets from "./MatchSets";

export default function Matches() {
	const matches = useAppSelector((state) => state.matches.data);

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
					<MatchesIntro />
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
											gap: "1rem",
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
							<div
								style={{
									paddingInline: "2rem",
									display: "flex",
									alignItems: "flex-start",
									flexGrow: 1,
									gap: "2rem",
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "2rem",
										flexGrow: 1,
									}}
								>
									<div
										style={{
											display: "flex",
											gap: "1rem",
											flexDirection: "column",
										}}
									>
										<div>
											<Chip label="Crni" />
										</div>
										<div
											style={{
												display: "flex",
												gap: "1rem",
											}}
										>
											{match.blackTeamPlayers.map(
												(player) => (
													<Box
														display={"flex"}
														flexDirection="column"
														alignItems="center"
														gap={1}
													>
														<Avatar>
															{player.name.charAt(
																0
															)}
														</Avatar>
														<Typography variant="body2">
															{player.name}
														</Typography>
													</Box>
												)
											)}
										</div>
									</div>
									<div
										style={{
											display: "flex",
											gap: "1rem",
											flexDirection: "column",
										}}
									>
										<div>
											<Chip label="Bijeli" />
										</div>
										<div
											style={{
												display: "flex",
												gap: "1rem",
											}}
										>
											{match.whiteTeamPlayers.map(
												(player) => (
													<Box
														display={"flex"}
														flexDirection="column"
														alignItems="center"
														gap={1}
													>
														<Avatar>
															{player.name.charAt(
																0
															)}
														</Avatar>
														<Typography variant="body2">
															{player.name}
														</Typography>
													</Box>
												)
											)}
										</div>
									</div>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "1rem",
									}}
								>
									<div>
										<Chip label="Setovi" />
									</div>
									<MatchSets matchSets={match.sets} />
								</div>
							</div>
						</div>
					))}
				</div>
			</Box>
		</Container>
	);
}
