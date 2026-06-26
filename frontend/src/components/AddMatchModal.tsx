import { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Box,
	Typography,
	IconButton,
	Checkbox,
	FormControlLabel,
	Stack,
	Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../redux-toolkit/hooks";
import { addMatch } from "../redux-toolkit/slices/matchesSlice";
import type { MatchOverall, MatchSet, Player } from "../types/match";
import mockPlayersData from "../data/mockPlayers.json";

interface AddMatchModalProps {
	open: boolean;
	onClose: () => void;
}

const allPlayers: Player[] = mockPlayersData.players.map((p, index) => {
	const isWhiteTeam = p.team === "bijeli";
	const isCaptain = isWhiteTeam ? p.name === "Ante" : p.name === "Vukovarac";
	
	return {
		id: index + 100,
		name: p.name,
		isCaptain: isCaptain,
		team: isWhiteTeam ? 1 : 2,
	};
});

export default function AddMatchModal({ open, onClose }: AddMatchModalProps) {
	const dispatch = useAppDispatch();
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
	const [sets, setSets] = useState<MatchSet[]>([
		{ id: 1, blackScore: 0, whiteScore: 0 },
	]);
	const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>([]);
	const [blackScore, setBlackScore] = useState(0);
	const [whiteScore, setWhiteScore] = useState(0);

	const [generatedJson, setGeneratedJson] = useState<string | null>(null);

	const handleTogglePlayer = (id: number) => {
		setSelectedPlayerIds((prev) =>
			prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
		);
	};

	const handleAddSet = () => {
		setSets([
			...sets,
			{ id: sets.length + 1, blackScore: 0, whiteScore: 0 },
		]);
	};

	const handleRemoveSet = (index: number) => {
		const newSets = sets.filter((_, i) => i !== index);
		setSets(newSets);
		updateOverallScore(newSets);
	};

	const updateOverallScore = (currentSets: MatchSet[]) => {
		let blackWins = 0;
		let whiteWins = 0;
		currentSets.forEach((set) => {
			if (set.blackScore > set.whiteScore) blackWins++;
			else if (set.whiteScore > set.blackScore) whiteWins++;
		});
		setBlackScore(blackWins);
		setWhiteScore(whiteWins);
	};

	const handleSetScoreChange = (
		index: number,
		field: "blackScore" | "whiteScore",
		value: number
	) => {
		const newSets = [...sets];
		newSets[index] = { ...newSets[index], [field]: value };
		setSets(newSets);
		updateOverallScore(newSets);
	};

	const handleSave = () => {
		const selectedPlayers = allPlayers.filter((p) =>
			selectedPlayerIds.includes(p.id)
		);
		const whiteTeamPlayers = selectedPlayers.filter((p) => p.team === 1);
		const blackTeamPlayers = selectedPlayers.filter((p) => p.team === 2);

		const newMatch: MatchOverall = {
			id: Date.now(),
			date,
			blackScore,
			whiteScore,
			sets,
			whiteTeamPlayers,
			blackTeamPlayers,
		};

		dispatch(addMatch(newMatch));
		setGeneratedJson(JSON.stringify(newMatch, null, "\t"));
	};

	const handleClose = () => {
		setGeneratedJson(null);
		setSelectedPlayerIds([]);
		setBlackScore(0);
		setWhiteScore(0);
		setSets([{ id: 1, blackScore: 0, whiteScore: 0 }]);
		onClose();
	};

	const whitePlayers = allPlayers.filter((p) => p.team === 1);
	const blackPlayers = allPlayers.filter((p) => p.team === 2);

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
			<DialogTitle>
				{generatedJson ? "Kopiraj JSON objekt" : "Dodaj novu utakmicu"}
			</DialogTitle>
			<DialogContent>
				{generatedJson ? (
					<Box sx={{ mt: 2 }}>
						<Typography variant="body2" gutterBottom>
							Kopirajte ovaj objekt u <code>matchesSlice.ts</code> ili <code>mockMatches.json</code>:
						</Typography>
						<TextField
							multiline
							fullWidth
							rows={15}
							value={generatedJson}
							InputProps={{
								readOnly: true,
								style: { fontFamily: "monospace", fontSize: "0.8rem" },
							}}
							onClick={(e) => (e.target as HTMLTextAreaElement).select()}
						/>
					</Box>
				) : (
					<Stack spacing={3} sx={{ mt: 1 }}>
						<Box display="flex" gap={2}>
							<TextField
								label="Datum"
								type="date"
								sx={{ flex: 2 }}
								value={date}
								onChange={(e) => setDate(e.target.value)}
								slotProps={{ inputLabel: { shrink: true } }}
							/>
							<TextField
								label="Konačno Crni"
								type="number"
								sx={{ flex: 1 }}
								value={blackScore}
								onChange={(e) => setBlackScore(parseInt(e.target.value) || 0)}
							/>
							<TextField
								label="Konačno Bijeli"
								type="number"
								sx={{ flex: 1 }}
								value={whiteScore}
								onChange={(e) => setWhiteScore(parseInt(e.target.value) || 0)}
							/>
						</Box>

						<Grid container spacing={4}>
							<Grid size={{ xs: 12, md: 6 }}>
								<Typography variant="h6" gutterBottom color="primary">
									Bijeli tim
								</Typography>
								<Grid container>
									{whitePlayers.map((player) => (
										<Grid size={{ xs: 6 }} key={player.id}>
											<FormControlLabel
												control={
													<Checkbox
														checked={selectedPlayerIds.includes(
															player.id
														)}
														onChange={() =>
															handleTogglePlayer(
																player.id
															)
														}
													/>
												}
												label={
													<Typography
														variant="body2"
														sx={{
															fontWeight:
																player.isCaptain
																	? "bold"
																	: "normal",
															color: player.isCaptain
																? "secondary.main"
																: "inherit",
														}}
													>
														{player.name}
														{player.isCaptain &&
															" (K)"}
													</Typography>
												}
											/>
										</Grid>
									))}
								</Grid>
							</Grid>

							<Grid size={{ xs: 12, md: 6 }}>
								<Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
									Crni tim
								</Typography>
								<Grid container>
									{blackPlayers.map((player) => (
										<Grid size={{ xs: 6 }} key={player.id}>
											<FormControlLabel
												control={
													<Checkbox
														checked={selectedPlayerIds.includes(
															player.id
														)}
														onChange={() =>
															handleTogglePlayer(
																player.id
															)
														}
													/>
												}
												label={
													<Typography
														variant="body2"
														sx={{
															fontWeight:
																player.isCaptain
																	? "bold"
																	: "normal",
															color: player.isCaptain
																? "secondary.main"
																: "inherit",
														}}
													>
														{player.name}
														{player.isCaptain &&
															" (K)"}
													</Typography>
												}
											/>
										</Grid>
									))}
								</Grid>
							</Grid>
						</Grid>

						<Box sx={{ borderTop: "1px solid #333", pt: 2 }}>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								mb={1}
							>
								<Typography variant="h6">Setovi</Typography>
								<Button
									startIcon={<AddIcon />}
									onClick={handleAddSet}
									variant="outlined"
									size="small"
								>
									Dodaj set
								</Button>
							</Box>
							{sets.map((set, index) => (
								<Box
									key={index}
									display="flex"
									gap={2}
									alignItems="center"
									mb={2}
								>
									<Typography sx={{ minWidth: 60 }}>
										Set {index + 1}
									</Typography>
									<TextField
										label="Crni"
										type="number"
										size="small"
										value={set.blackScore}
										onChange={(e) =>
											handleSetScoreChange(
												index,
												"blackScore",
												parseInt(e.target.value) || 0
											)
										}
									/>
									<TextField
										label="Bijeli"
										type="number"
										size="small"
										value={set.whiteScore}
										onChange={(e) =>
											handleSetScoreChange(
												index,
												"whiteScore",
												parseInt(e.target.value) || 0
											)
										}
									/>
									<IconButton
										onClick={() => handleRemoveSet(index)}
										disabled={sets.length === 1}
										color="error"
									>
										<DeleteIcon />
									</IconButton>
								</Box>
							))}
						</Box>
					</Stack>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>
					{generatedJson ? "Zatvori" : "Odustani"}
				</Button>
				{!generatedJson && (
					<Button
						onClick={handleSave}
						variant="contained"
						color="primary"
					>
						Spremi i Generiraj JSON
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
}
