import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddMatch from "./AddMatchModal";
import { Stack } from "@mui/material";

function MatchesIntro() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<div
				style={{
					flex: 1,
					gap: "2rem",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Typography variant="subtitle2" color={"textPrimary"}>
						Statistika za sezonu 2026 proljeće
					</Typography>
				</Box>
				<Typography variant="body1">
					Dobrodošli u pregled statistike za sezonu Proljeće 2026. Naši susreti odvijaju se svakog ponedjeljka
					u 19:00h u ŠD Hotanj. U nastavku možete istražiti povijest svih odigranih termina, uključujući točne
					datume, rezultate po setovima, konačne ishode te popise igrača koji su sudjelovali u svakom dvoboju.
				</Typography>
				<Stack spacing={2} direction={"row"}>
					<Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsModalOpen(true)}>
						Dodaj termin
					</Button>
				</Stack>
			</div>
			<AddMatch open={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
}

export default MatchesIntro;
