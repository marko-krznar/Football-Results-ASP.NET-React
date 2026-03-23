import { Stack, Typography, useTheme } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

export default function Navigation() {
	const theme = useTheme();

	return (
		<Stack
			direction="row"
			spacing={1}
			alignItems="center"
			sx={{
				padding: 2,
				borderBottom: `1px solid ${theme.palette.text.secondary}`,
				backdropFilter: "blur(12px)",
			}}
		>
			<SportsSoccerIcon />
			<Typography variant="subtitle1">HPD Prsten Superliga</Typography>
		</Stack>
	);
}
