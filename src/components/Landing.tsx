import { Box, Stack } from "@mui/material";
import LandingIntroCard from "./LandingIntroCard";
import LandingTotalResultCard from "./LandingTotalResultCard";
import LandingTerminResults from "./LandingTerminResults";
import LandingSquadsCard from "./LandingSquadsCard";

export default function Landing() {
	return (
		<Stack
			spacing={4}
			padding={4}
			alignItems="flex-start"
			flexDirection="row"
			flexWrap="wrap"
			gap={4}
			sx={{
				paddingTop: 4,
				paddingBottom: 4,
				backdropFilter: "blur(12px)",
				flexGrow: 1,
			}}
		>
			<Box
				display="flex"
				flexDirection="row"
				gap={4}
				flexGrow={1}
				overflow="hidden"
			>
				<LandingIntroCard />
				<LandingTotalResultCard />
			</Box>
			{/* <Typography variant="h2" align="center">
				ŠD Hotanj Velesajam
			</Typography>
			<Typography variant="h3" align="center">
				Termin ponedjeljkom u 19:00h
			</Typography> */}
			<LandingTerminResults />
			<LandingSquadsCard />
		</Stack>
	);
}
