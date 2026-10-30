import { Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router";

export interface NavLinkItem {
	label: string;
	to: string;
}

export const MAIN_NAV_LINKS: NavLinkItem[] = [
	{ label: "Naslovna", to: "/" },
	{ label: "Termini", to: "/matches" },
	{ label: "Momčadi", to: "/teams" },
	{ label: "Sezone", to: "/seasons" },
];

export default function MainNav() {
	const location = useLocation();

	const isActive = (to: string) =>
		to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

	return (
		<Box
			component="nav"
			aria-label="Glavna navigacija"
			sx={{
				display: { xs: "none", md: "flex" },
				gap: 0.5,
				alignItems: "center",
			}}
		>
			{MAIN_NAV_LINKS.map((link) => {
				const active = isActive(link.to);
				return (
					<Button
						key={link.to}
						component={Link}
						to={link.to}
						sx={{
							color: active ? "text.primary" : "text.secondary",
							fontWeight: active ? 600 : 400,
							textTransform: "uppercase",
							fontSize: "0.8rem",
							letterSpacing: "0.06em",
							borderRadius: "20px",
							px: 2,
							py: 0.75,
							border: active
								? (theme) => `1px solid ${theme.palette.divider}`
								: "1px solid transparent",
							backgroundColor: active ? "rgba(255,255,255,0.05)" : "transparent",
							"&:hover": {
								backgroundColor: "rgba(255,255,255,0.06)",
								border: (theme) => `1px solid ${theme.palette.divider}`,
							},
						}}
					>
						{link.label}
					</Button>
				);
			})}
		</Box>
	);
}
