/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO fix any types
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function MatchTabel({
	data,
	setDeletingMatchId,
	setDeleteDialogOpen,
	setEditingMatchId,
	setEditModalOpen,
}: {
	data: any[];
	setDeletingMatchId: any;
	setDeleteDialogOpen: any;
	setEditingMatchId: any;
	setEditModalOpen: any;
}) {
	return (
		<Box sx={{ mb: 6, mt: 6 }}>
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
												{match.secondTeam.playerNames.map((name: string) => `${name}, `)}
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
	);
}
