import { useLocation, useNavigate } from "react-router";
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useCurrentUser } from "../redux/hooks";

const NAV_ITEMS = [
	{ value: "matches", label: "Termini", icon: <SportsSoccerIcon fontSize="small" /> },
	{ value: "seasons", label: "Sezone", icon: <CalendarMonthIcon fontSize="small" /> },
	{ value: "teams", label: "Ekipe", icon: <GroupsIcon fontSize="small" /> },
	{ value: "players", label: "Igrači", icon: <PersonIcon fontSize="small" /> },
	{ value: "expenses", label: "Troškovi", icon: <ReceiptLongIcon fontSize="small" /> },
];

/**
 * Global admin bottom navigation bar — visible on mobile (xs–sm)
 * for any logged-in admin, on all pages.
 * Navigates to /admin with a `tab` search param to restore the active tab.
 */
export default function AdminBottomNav() {
	const { isAdmin, isLoading } = useCurrentUser();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const navigate = useNavigate();
	const location = useLocation();

	// Only show on mobile for admins
	if (!isMobile || isLoading || !isAdmin) return null;

	// Derive the active tab from the current URL search params (when on /admin)
	const params = new URLSearchParams(location.search);
	const activeTab = params.get("tab") ?? "matches";

	return (
		<Paper
			elevation={8}
			sx={{
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: (t) => t.zIndex.appBar,
			}}
		>
			<BottomNavigation
				sx={{
					height: "auto",
				}}
				showLabels
				value={activeTab}
				onChange={(_e, newValue: string) => {
					navigate(`/admin?tab=${newValue}`);
				}}
			>
				{NAV_ITEMS.map((item) => (
					<BottomNavigationAction
						key={item.value}
						label={item.label}
						value={item.value}
						icon={item.icon}
						sx={(t) => ({
							py: 1.5,
							minWidth: 0,
							"& .MuiBottomNavigationAction-label": {
								...t.typography.caption,
								"&.Mui-selected": {
									...t.typography.caption,
								},
							},
						})}
					/>
				))}
			</BottomNavigation>
		</Paper>
	);
}

