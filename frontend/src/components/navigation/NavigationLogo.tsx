import { Box, Button, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Link } from "react-router";

interface NavigationLogoProps {
	onNavigate?: () => void;
}

/** Rounded-square container that wraps the logo icon */
function LogoIconBox({ children }: { children: React.ReactNode }) {
	return (
		<Box
			sx={{
				width: { xs: 38, sm: 44 },
				height: { xs: 38, sm: 44 },
				borderRadius: "10px",
				backgroundColor: "rgba(255,255,255,0.07)",
				border: (theme) => `1px solid ${theme.palette.divider}`,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexShrink: 0,
			}}
		>
			{children}
		</Box>
	);
}

/** Stacked "HPD PRSTEN / REKREATIVNA LIGA" wordmark */
function LogoWordmark() {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
			<Typography
				variant="body1"
				noWrap
				sx={{
					fontWeight: 700,
					color: "text.primary",
					lineHeight: 1.1,
					letterSpacing: "0.05em",
				}}
			>
				HPD PRSTEN
			</Typography>
			<Typography
				variant="caption"
				noWrap
				sx={{
					color: "text.secondary",
					letterSpacing: "0.1em",
					lineHeight: 1.3,
				}}
			>
				REKREATIVNA LIGA
			</Typography>
		</Box>
	);
}

export default function NavigationLogo({ onNavigate }: NavigationLogoProps) {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start",
				flex: { md: 1 },
				minWidth: { md: 240 },
			}}
		>
			<Button
				component={Link}
				to="/"
				onClick={onNavigate}
				sx={{
					gap: 1.5,
					minWidth: 0,
					px: { xs: 0, sm: 0.5 },
					textTransform: "uppercase",
					"&:hover": { backgroundColor: "transparent" },
				}}
			>
				<LogoIconBox>
					<SportsSoccerIcon
						sx={{ fontSize: { xs: "1.4rem", sm: "1.6rem" }, color: "text.primary" }}
					/>
				</LogoIconBox>
				<LogoWordmark />
			</Button>
		</Box>
	);
}
