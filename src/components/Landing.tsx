import {
	Box,
	Button,
	Card,
	Chip,
	Divider,
	Stack,
	Typography,
} from "@mui/material";

export default function Landing() {
	return (
		<Stack
			spacing={4}
			padding={4}
			alignItems="flex-start"
			flexDirection="row"
			gap={4}
			sx={{
				paddingTop: 4,
				paddingBottom: 4,
				backdropFilter: "blur(12px)",
				flexGrow: 1,
			}}
		>
			{/* <Typography variant="h2" align="center">
				ŠD Hotanj Velesajam
			</Typography>
			<Typography variant="h3" align="center">
				Termin ponedjeljkom u 19:00h
			</Typography> */}
			<Card
				variant="elevation"
				sx={{
					padding: 4,
					display: "flex",
					flexDirection: "column",
					alignContent: "flex-start",
					gap: 2,
				}}
			>
				<Chip label="Odigrani termini: 6" />
				<Typography variant="subtitle1" align="center">
					Posljednji termin (ponedjeljak, 24.03.2026.)
				</Typography>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={2}
					flexWrap="wrap"
				>
					<Box>
						<Typography variant="subtitle2" align="center">
							1
						</Typography>
						<Typography variant="body2" align="center">
							Crni
						</Typography>
					</Box>
					<Typography variant="subtitle2" align="center">
						-
					</Typography>
					<Box>
						<Typography variant="subtitle2" align="center">
							0
						</Typography>
						<Typography variant="body2" align="center">
							Bijeli
						</Typography>
					</Box>
					<Box sx={{ width: "100%" }}>
						<Divider />
						<Typography variant="subtitle1" align="center">
							Setovi
						</Typography>
						<Typography variant="subtitle1" align="center">
							Set 1
						</Typography>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography variant="subtitle1" align="center">
								Crni
							</Typography>
							<Typography variant="subtitle1" align="center">
								6
							</Typography>
						</Box>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography variant="subtitle1" align="center">
								Bijeli
							</Typography>
							<Typography variant="subtitle1" align="center">
								3
							</Typography>
						</Box>
						<Typography variant="subtitle1" align="center">
							Set 2
						</Typography>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography variant="subtitle1" align="center">
								Crni
							</Typography>
							<Typography variant="subtitle1" align="center">
								5
							</Typography>
						</Box>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography variant="subtitle1" align="center">
								Bijeli
							</Typography>
							<Typography variant="subtitle1" align="center">
								3
							</Typography>
						</Box>
					</Box>
				</Stack>
				<Button variant="contained">Pogledaj sve termine</Button>
			</Card>
			<Card
				variant="elevation"
				sx={{
					padding: 4,
				}}
			>
				<Typography variant="subtitle1" align="center">
					Ukupni rezultat
				</Typography>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={2}
				>
					<Box>
						<Typography variant="subtitle2" align="center">
							4
						</Typography>
						<Typography variant="body2" align="center">
							Crni
						</Typography>
					</Box>
					<Typography variant="subtitle2" align="center">
						-
					</Typography>
					<Box>
						<Typography variant="subtitle2" align="center">
							6
						</Typography>
						<Typography variant="body2" align="center">
							Bijeli
						</Typography>
					</Box>
				</Stack>
			</Card>
		</Stack>
	);
}
