import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Card, CardContent, Stack } from "@mui/material";
import AddMatchModal from "./AddMatchModal";

function MatchesIntro({ totalBlack, totalWhite }: { totalBlack: number; totalWhite: number }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Stack direction={"row"} spacing={8}>
				<Stack spacing={2} alignItems={"flex-start"}>
					<Typography variant="subtitle2" color={"textPrimary"}>
						Statistika za sezonu 2026 proljeće
					</Typography>
					<Typography variant="body1">
						Dobrodošli u pregled statistike za sezonu Proljeće 2026. Naši susreti odvijaju se svakog
						ponedjeljka u 19:00h u ŠD Hotanj. U nastavku možete istražiti povijest svih odigranih termina,
						uključujući točne datume, rezultate po setovima, konačne ishode te popise igrača koji su
						sudjelovali u svakom dvoboju.
					</Typography>
					<Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsModalOpen(true)}>
						Dodaj termin
					</Button>
				</Stack>
				<Box>
					<Card sx={{ padding: "4rem !important" }}>
						<CardContent>
							<Typography variant="subtitle2" textAlign="center">
								<span style={{ color: "#95CFFF" }}>Sveukupno</span>
							</Typography>
							<Box display="flex" justifyContent="center" alignItems="center" gap={4}>
								<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
									<Typography variant="subtitle1" fontWeight="bold" textAlign="center">
										{totalBlack}
									</Typography>
									<Typography variant="body1" textAlign="center">
										Crni
									</Typography>
								</Box>
								<Typography variant="body1">-</Typography>
								<Box display="flex" flexDirection="column" justifyContent="center" gap={2}>
									<Typography variant="subtitle1" fontWeight="bold" textAlign="center">
										{totalWhite}
									</Typography>
									<Typography variant="body1" textAlign="center">
										Bijeli
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Box>
			</Stack>
			<AddMatchModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
}

export default MatchesIntro;
