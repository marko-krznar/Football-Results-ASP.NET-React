import { Box, Card, CardContent, Typography } from "@mui/material";

function LandingTotalResultCard() {
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
							4
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
							6
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
