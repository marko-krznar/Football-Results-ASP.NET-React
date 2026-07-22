import { Box, Card, CardContent, Typography } from "@mui/material";
import { useAppSelector } from "../redux-toolkit/hooks";

function LandingTotalResultCard() {
	const matches = useAppSelector((state) => state.matches.data);

	return (
		<Card
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minWidth: "254px",
				backgroundColor: "#262727",
				flex: 1,
			}}
		>
			<CardContent>
				<Typography variant="subtitle2" textAlign="center">
					<span style={{ color: "#95CFFF" }}>Ukupni rezultat</span>
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
							{matches[0].blackScore}
						</Typography>
						<Typography variant="body1" textAlign="center">
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
							{matches[0].whiteScore}
						</Typography>
						<Typography variant="body1" textAlign="center">
							Bijeli
						</Typography>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}

export default LandingTotalResultCard;
