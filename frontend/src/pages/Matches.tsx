import {
	Typography,
	Box,
	CardContent,
	Card,
	Container,
	Divider,
	TableContainer,
	Table,
	TableBody,
	TableCell,
	TableRow,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MatchesIntro from "../components/matches/MatchesIntro";
import { useAppSelector } from "../redux/hooks";
import { useState } from "react";
import AddMatch from "../components/matches/AddMatch";
import { useGetMatchesQuery, useRemoveMatchMutation } from "../redux/api/matchesApi";
import EditMatchModal from "../components/matches/EditMatchModal";

export default function Matches() {
	const matches = useAppSelector((state) => state.matches.data);
	const { data } = useGetMatchesQuery();
	const [removeMatch] = useRemoveMatchMutation();
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editingMatchId, setEditingMatchId] = useState<number | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletingMatchId, setDeletingMatchId] = useState<number | null>(null);

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
							flex: 1,
						}}
					>
						<CardContent>
							<Typography variant="subtitle2" textAlign="center">
								<span style={{ color: "#95CFFF" }}>Sveukupno</span>
							</Typography>
							<Box display="flex" justifyContent="center" alignItems="center" gap={4}>
								<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
									<Typography variant="subtitle1" fontWeight="bold" textAlign="center">
										{matches[0].blackScore}
									</Typography>
									<Typography variant="body1" textAlign="center">
										Crni
									</Typography>
								</Box>
								<Typography variant="body1">-</Typography>
								<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
									<Typography variant="subtitle1" fontWeight="bold" textAlign="center">
										{matches[0].whiteScore}
									</Typography>
									<Typography variant="body1" textAlign="center">
										Bijeli
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</div>
				<Box sx={{ mb: 6, mt: 6 }}>
					<Typography variant="h1" component="p" textTransform={"uppercase"}>
						Pravi podaci
					</Typography>
					{data && (
						<TableContainer>
							<Table aria-label="match table">
								<TableBody>
									{data.map((match: any) => (
										<TableRow>
											{/* Column 1: Summary */}
											<TableCell style={{ width: "12rem" }}>
												<Typography variant="body1">{match.date}</Typography>
												<Typography variant="body1">ŠD Hotanj 19:00</Typography>
											</TableCell>

											{/* Column 2: Teams */}
											<TableCell style={{ width: "6rem" }}>
												<Typography variant="body1">Crni</Typography>
												<Typography variant="body1">Bijeli</Typography>
											</TableCell>

											{/* Column 3: TeamPlayers */}
											<TableCell>
												{/* Black Team */}
												<Box
													sx={{
														display: "flex",
														flexWrap: "wrap",
													}}
												>
													<Typography>
														{match.secondTeam.playerNames.map(
															(name: string) => `${name}, `
														)}
													</Typography>
												</Box>

												{/* White Team */}
												<Box
													sx={{
														display: "flex",
														flexWrap: "wrap",
													}}
												>
													<Typography>
														{match.firstTeam.playerNames.map((name: string) => `${name}, `)}
													</Typography>
												</Box>
											</TableCell>

											{/* Column 4: Sets */}
											<TableCell style={{ width: "10rem" }}>
												<Box>{match.secondTeam.goalsPerSet.map((goal: string) => goal)}</Box>
												<Box>{match.firstTeam.goalsPerSet.map((goal: string) => goal)}</Box>
											</TableCell>

											{/* Column 5: Sets Summary */}
											<TableCell style={{ width: "3rem" }}>
												<Typography>{match.secondTeam.setsWon}</Typography>
												<Typography>{match.firstTeam.setsWon}</Typography>
											</TableCell>

											{/* Column 6: Summary */}
											{/* <TableCell style={{ width: "3rem" }}>
												<Typography>{match.blackScore}</Typography>
												<Typography>{match.whiteScore}</Typography>
											</TableCell> */}

											{/* Column 6: Delete */}
											<TableCell style={{ width: "1rem" }}>
												<IconButton
													aria-label="delete"
													size="large"
													onClick={() => {
														setDeletingMatchId(match.id);
														setDeleteDialogOpen(true);
													}}
												>
													<DeleteIcon fontSize="inherit" color="error" />
												</IconButton>
											</TableCell>
											{/* Column 6: Edit */}
											<TableCell style={{ width: "1rem" }}>
												<IconButton
													aria-label="edit"
													size="large"
													onClick={() => {
														setEditingMatchId(match.id);
														setEditModalOpen(true);
													}}
												>
													<EditIcon fontSize="inherit" />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Box>
				<Divider />
				{/*
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginTop: "2rem",
					}}
				>
					{matches.map((match) => (
						<MatchesItem key={match.id} match={match} />
					))}
				</div>
				*/}
			</Box>
			<AddMatch />
			<EditMatchModal
				open={editModalOpen}
				matchId={editingMatchId}
				onClose={() => {
					setEditModalOpen(false);
					setEditingMatchId(null);
				}}
			/>
			<Dialog
				open={deleteDialogOpen}
				onClose={() => {
					setDeleteDialogOpen(false);
					setDeletingMatchId(null);
				}}
				aria-labelledby="delete-dialog-title"
				aria-describedby="delete-dialog-description"
			>
				<DialogTitle id="delete-dialog-title">
					{"Potvrda brisanja"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="delete-dialog-description">
						Jeste li sigurni da želite sigurno obrisati podatke o ovoj utakmici? Ova akcija se ne može poništiti.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setDeleteDialogOpen(false);
							setDeletingMatchId(null);
						}}
					>
						Odustani
					</Button>
					<Button
						onClick={() => {
							if (deletingMatchId !== null) {
								removeMatch({ matchId: deletingMatchId });
							}
							setDeleteDialogOpen(false);
							setDeletingMatchId(null);
						}}
						color="error"
						autoFocus
					>
						Obriši
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}
