import { useLocation, useNavigate } from "react-router";
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useCurrentUser } from "../redux/hooks";

const NAV_ITEMS = [
	{ value: "matches", label: "Matches", icon: <SportsSoccerIcon /> },
	{ value: "seasons", label: "Seasons", icon: <CalendarMonthIcon /> },
	{ value: "teams", label: "Teams", icon: <GroupsIcon /> },
	{ value: "players", label: "Players", icon: <PersonIcon /> },
	{ value: "expenses", label: "Expenses", icon: <ReceiptLongIcon /> },
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
				borderTop: "1px solid #2E302F",
			}}
		>
			<BottomNavigation
				value={activeTab}
				onChange={(_e, newValue: string) => {
					navigate(`/admin?tab=${newValue}`);
				}}
				sx={{
					background: "#1E1F1E",
					"& .MuiBottomNavigationAction-root": {
						color: "rgba(255,255,255,0.5)",
						minWidth: 0,
						"&.Mui-selected": {
							color: "primary.main",
						},
					},
				}}
			>
				{NAV_ITEMS.map((item) => (
					<BottomNavigationAction
						key={item.value}
						label={item.label}
						value={item.value}
						icon={item.icon}
					/>
				))}
			</BottomNavigation>
		</Paper>
	);
}
