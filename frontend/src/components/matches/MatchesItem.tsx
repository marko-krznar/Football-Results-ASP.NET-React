import {
	Typography,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import MatchSets from "./MatchItemSets";
import type { MatchOverall } from "../../types/match";
import { calculateMatchScore } from "../../utils/matchUtils";

interface MatchesItemProps {
	match: MatchOverall;
}

export default function MatchesItem({ match }: MatchesItemProps) {
	const { blackTotal, whiteTotal } = calculateMatchScore(match.sets);

	return (
		<TableContainer>
			<Table aria-label="match table">
				<TableBody>
					<TableRow>
						{/* Column 1: Summary */}
						<TableCell style={{ width: "12rem" }}>
							<Typography variant="body1">
								{match.date}
							</Typography>
							<Typography variant="body1">
								ŠD Hotanj 19:00
							</Typography>
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
									gap: "0.5rem",
									flexWrap: "wrap",
								}}
							>
								{match.blackTeamPlayers.map((player, index) => (
									<Typography key={player.id}>
										{player.name}
										{index <
										match.blackTeamPlayers.length - 1
											? ","
											: ""}
									</Typography>
								))}
							</Box>

							{/* White Team */}
							<Box
								sx={{
									display: "flex",
									gap: "0.5rem",
									flexWrap: "wrap",
								}}
							>
								{match.whiteTeamPlayers.map((player, index) => (
									<Typography key={player.id}>
										{player.name}
										{index <
										match.whiteTeamPlayers.length - 1
											? ","
											: ""}
									</Typography>
								))}
							</Box>
						</TableCell>

						{/* Column 4: Sets */}
						<TableCell style={{ width: "10rem" }}>
							<MatchSets matchSets={match.sets} />
						</TableCell>

						{/* Column 5: Sets Summary */}
						<TableCell style={{ width: "3rem" }}>
							<Typography>{blackTotal}</Typography>
							<Typography>{whiteTotal}</Typography>
						</TableCell>

						{/* Column 6: Summary */}
						<TableCell style={{ width: "3rem" }}>
							<Typography>{match.blackScore}</Typography>
							<Typography>{match.whiteScore}</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
