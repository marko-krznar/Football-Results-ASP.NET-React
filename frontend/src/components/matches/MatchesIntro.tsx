import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Stack } from "@mui/material";
import AddMatchModal from "./AddMatchModal";
import { useCurrentUser } from "../../redux/hooks";

function MatchesIntro({ season }: { season: string }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isAuthenticated, isAdmin } = useCurrentUser();

	return (
		<>
			<Stack spacing={2} alignItems={"flex-start"}>
				<Typography variant="subtitle2" color={"textPrimary"}>
					Statistika za sezonu {season}
				</Typography>
				<Typography variant="body1">
					Dobrodošli u pregled statistike za sezonu {season}. Naši susreti odvijaju se svakog ponedjeljka u
					19:00h u ŠD Hotanj. U nastavku možete istražiti povijest svih odigranih termina, uključujući točne
					datume, rezultate po setovima, konačne ishode te popise igrača koji su sudjelovali u svakom dvoboju.
				</Typography>
				{isAuthenticated && isAdmin && (
					<Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsModalOpen(true)}>
						Dodaj termin
					</Button>
				)}
			</Stack>
			{isModalOpen && <AddMatchModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />}
		</>
	);
}

export default MatchesIntro;
