import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Card, CardContent, Chip, Divider, Stack } from "@mui/material";

interface MatchesIntroProps {
	season: string;
	totalMatches?: number;
}

function MatchesIntro({ season, totalMatches }: MatchesIntroProps) {
	// Split season name for highlighted rendering, e.g. "Jesen 2026" → ["Jesen", "2026"]
	const seasonParts = season.split(" ");
	const seasonLabel = seasonParts.slice(0, -1).join(" ");
	const seasonYear = seasonParts.slice(-1)[0];

	return (
		<Card sx={{ flex: 2, display: "flex", flexDirection: "column" }}>
			<CardContent sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 2 }}>
				{/* Chips row */}
				<Stack direction="row" flexWrap="wrap" gap={1}>
					<Chip
						icon={<FiberManualRecordIcon sx={{ fontSize: "0.6rem !important", color: "success.main !important" }} />}
						label="Sezona u tijeku"
						size="small"
						variant="outlined"
						sx={{ borderColor: "divider" }}
					/>
					<Chip
						icon={<AccessTimeIcon sx={{ fontSize: "0.9rem !important" }} />}
						label="Ponedjeljkom u 19:00h"
						size="small"
						variant="outlined"
						sx={{ borderColor: "divider" }}
					/>
					<Chip
						icon={<LocationOnIcon sx={{ fontSize: "0.9rem !important" }} />}
						label="ŠD Hotanj"
						size="small"
						variant="outlined"
						sx={{ borderColor: "divider" }}
					/>
				</Stack>

				{/* Big heading */}
				<Typography
					variant="h1"
					fontWeight="bold"
					sx={{
						fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
						lineHeight: 1.1,
					}}
				>
					Statistika za sezonu{" "}
					<Box component="span" color="primary.main">
						{seasonLabel}
					</Box>{" "}
					{seasonYear}
				</Typography>

				{/* Description */}
				<Typography variant="body1">
					Dobrodošli u pregled statistike za sezonu {season}. Naši susreti odvijaju se svakog
					ponedjeljka u 19:00h u ŠD Hotanj. U nastavku možete istražiti povijest svih odigranih
					termina, uključujući točne datume, rezultate po setovima, konačne ishode te popise igrača
					koji su sudjelovali u svakom dvoboju.
				</Typography>

				{/* Spacer */}
				<Box sx={{ flex: 1 }} />

				<Divider />

				{/* Bottom stats */}
				{totalMatches !== undefined && (
					<Typography variant="body2" color="text.secondary">
						{totalMatches} susreta
					</Typography>
				)}
			</CardContent>
		</Card>
	);
}

export default MatchesIntro;
