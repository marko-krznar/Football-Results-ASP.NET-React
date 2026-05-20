/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";

export default function MatchSets(matchSets: any) {
	const columns: Array<string> = ["Crni", "Bijeli"];

	return (
		<TableContainer>
			<Table size="small" aria-label="sets table">
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell>{column}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{matchSets.matchSets.map((matchSet: any) => (
						<TableRow key={matchSet.id}>
							<TableCell>{matchSet.blackScore}</TableCell>
							<TableCell>{matchSet.whiteScore}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
