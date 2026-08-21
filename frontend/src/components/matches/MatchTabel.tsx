import {
	Box,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Typography,
	IconButton,
	Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import "dayjs/locale/hr";
import { useTheme } from "@mui/material/styles";
import { useGetMeQuery } from "../../redux/api/authApi";

export interface MatchTeam {
	teamId: number;
	teamName: string;
	playerNames: string[];
	goalsPerSet: number[];
	setsWon: number;
	totalGoals: number;
}

export interface Match {
	id: number;
	date: string;
	location: string | null;
	note: string | null;
	totalSets: number;
	firstTeam: MatchTeam;
	secondTeam: MatchTeam;
}

type MatchTableProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: Match[] | any;
	setDeletingMatchId: React.Dispatch<React.SetStateAction<number | null>>;
	setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setEditingMatchId: React.Dispatch<React.SetStateAction<number | null>>;
	setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MatchTabel({
	data,
	setDeletingMatchId,
	setDeleteDialogOpen,
	setEditingMatchId,
	setEditModalOpen,
}: MatchTableProps) {
	const theme = useTheme();
	const { data: user } = useGetMeQuery();
	const isAuthenticated = !!user;

	return (
		<TableContainer sx={{ width: "100%", overflowX: "auto" }}>
			<Table aria-label="match table" sx={{ minWidth: 800 }}>
				<TableHead>
					<TableRow>
						<TableCell style={{ width: "12rem" }} sx={{ fontWeight: "bold" }}>Datum i lokacija</TableCell>
						<TableCell style={{ width: "6rem" }} sx={{ fontWeight: "bold" }}>Ekipa</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Igrači</TableCell>
						<TableCell style={{ width: "10rem" }} sx={{ fontWeight: "bold" }}>Po setovima</TableCell>
						<TableCell style={{ width: "3rem" }} sx={{ fontWeight: "bold" }}>Setovi</TableCell>
						{isAuthenticated && (
							<TableCell style={{ width: "2rem" }} colSpan={2} sx={{ fontWeight: "bold" }}>
								Akcije
							</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((match: Match) => (
						<TableRow key={match.id}>
							<TableCell style={{ width: "12rem" }}>
								<Typography variant="body1">
									{dayjs(match.date).locale("hr").format("ddd DD.MM.YYYY.")}
								</Typography>
								<Typography variant="body1">ŠD Hotanj 19:00</Typography>
							</TableCell>
							<TableCell style={{ width: "6rem" }}>
								<Typography variant="body1">Crni</Typography>
								<Typography variant="body1">Bijeli</Typography>
							</TableCell>
							<TableCell>
								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
									}}
								>
									<Typography>{match.secondTeam.playerNames.join(", ")}</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
									}}
								>
									<Typography>{match.firstTeam.playerNames.join(", ")}</Typography>
								</Box>
							</TableCell>
							<TableCell style={{ width: "10rem" }}>
								<Stack spacing={2} direction={"row"}>
									{match.secondTeam.goalsPerSet.map((goal, index) => (
										<Typography key={index}>{goal}</Typography>
									))}
								</Stack>
								<Stack spacing={2} direction={"row"}>
									{match.firstTeam.goalsPerSet.map((goal, index) => (
										<Typography key={index}>{goal}</Typography>
									))}
								</Stack>
							</TableCell>
							<TableCell style={{ width: "3rem" }}>
								<Typography>{match.secondTeam.setsWon}</Typography>
								<Typography>{match.firstTeam.setsWon}</Typography>
							</TableCell>
							{/* Column 6: Summary */}
							{/* <TableCell style={{ width: "3rem" }}>
										<Typography>{match.blackScore}</Typography>
										<Typography>{match.whiteScore}</Typography>
									</TableCell> */}
							{isAuthenticated && (
								<TableCell style={{ width: "1rem" }}>
									<IconButton
										sx={{
											borderRadius: "4px",
											background: theme.palette.divider,
										}}
										aria-label="edit"
										size="small"
										onClick={() => {
											setEditingMatchId(match.id);
											setEditModalOpen(true);
										}}
									>
										<EditIcon fontSize="inherit" />
									</IconButton>
								</TableCell>
							)}
							{isAuthenticated && (
								<TableCell style={{ width: "1rem" }}>
									<IconButton
										sx={{
											borderRadius: "4px",
											background: theme.palette.divider,
										}}
										aria-label="delete"
										size="small"
										onClick={() => {
											setDeletingMatchId(match.id);
											setDeleteDialogOpen(true);
										}}
									>
										<DeleteIcon fontSize="inherit" color="error" />
									</IconButton>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
