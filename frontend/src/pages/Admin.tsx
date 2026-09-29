import {
	Box,
	Container,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate, useSearchParams } from "react-router";

// Existing admin components — migrated as-is
import AddSeason from "../components/admin/AddSeason";
import AddTeam from "../components/admin/AddTeam";
import AddTeamMembers from "../components/admin/AddTeamMembers";
import ManagePlayers from "../components/admin/ManagePlayers";
import ManageTeams from "../components/admin/ManageTeams";

// Matches tab reuses the full Matches page content
import AdminMatchesTab from "../components/admin/AdminMatchesTab";

// Expenses tab reuses the Expenses page content
import AdminExpensesTab from "../components/admin/AdminExpensesTab";

type AdminTab = "matches" | "seasons" | "teams" | "players" | "expenses";

interface NavItem {
	id: AdminTab;
	label: string;
	icon: React.ReactElement;
}

const NAV_ITEMS: NavItem[] = [
	{ id: "matches", label: "Matches", icon: <SportsSoccerIcon /> },
	{ id: "seasons", label: "Seasons", icon: <CalendarMonthIcon /> },
	{ id: "teams", label: "Teams", icon: <GroupsIcon /> },
	{ id: "players", label: "Players", icon: <PersonIcon /> },
	{ id: "expenses", label: "Expenses", icon: <ReceiptLongIcon /> },
];

const SIDEBAR_WIDTH = 220;

const VALID_TABS = new Set<AdminTab>(["matches", "seasons", "teams", "players", "expenses"]);

function isValidTab(value: string | null): value is AdminTab {
	return VALID_TABS.has(value as AdminTab);
}

export default function Admin() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const rawTab = searchParams.get("tab");
	const activeTab: AdminTab = isValidTab(rawTab) ? rawTab : "matches";

	const handleTabChange = (tab: AdminTab) => {
		navigate(`/admin?tab=${tab}`, { replace: true });
	};

	return (
		<Box
			sx={{
				display: "flex",
				minHeight: "calc(100vh - 64px)",
			}}
		>
			{/* Desktop sidebar — hidden on mobile (global AdminBottomNav handles mobile nav) */}
			{!isMobile && (
				<Paper
					elevation={0}
					sx={{
						width: SIDEBAR_WIDTH,
						flexShrink: 0,
						borderRight: "1px solid",
						borderColor: "#2E302F",
						background: "#1E1F1E",
						minHeight: "100%",
						pt: 3,
					}}
				>
					<Typography
						variant="overline"
						sx={{
							color: "rgba(255,255,255,0.4)",
							px: 2,
							display: "block",
							mb: 1,
							letterSpacing: 1.5,
						}}
					>
						Admin Panel
					</Typography>
					<Divider sx={{ borderColor: "#2E302F", mb: 1 }} />
					<List disablePadding>
						{NAV_ITEMS.map((item) => {
							const isActive = activeTab === item.id;
							return (
								<ListItem key={item.id} disablePadding>
									<ListItemButton
										selected={isActive}
										onClick={() => handleTabChange(item.id)}
										sx={{
											mx: 1,
											borderRadius: 1,
											mb: 0.5,
											"&.Mui-selected": {
												backgroundColor: "rgba(25, 118, 210, 0.15)",
												"&:hover": {
													backgroundColor: "rgba(25, 118, 210, 0.22)",
												},
											},
										}}
									>
										<ListItemIcon
											sx={{
												color: isActive ? "primary.main" : "rgba(255,255,255,0.55)",
												minWidth: 40,
											}}
										>
											{item.icon}
										</ListItemIcon>
										<ListItemText
											primary={item.label}
											primaryTypographyProps={{
												fontWeight: isActive ? 600 : 400,
												color: isActive ? "primary.main" : "rgba(255,255,255,0.8)",
												fontSize: "0.9rem",
											}}
										/>
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>
				</Paper>
			)}

			{/* Main content area */}
			<Box sx={{ flex: 1, overflow: "auto" }}>
				<Container maxWidth="xl" sx={{ py: 4 }}>
					<AdminTabContent activeTab={activeTab} />
				</Container>
			</Box>
		</Box>
	);
}

function AdminTabContent({ activeTab }: { activeTab: AdminTab }) {
	switch (activeTab) {
		case "matches":
			return <AdminMatchesTab />;

		case "seasons":
			return (
				<Stack spacing={4}>
					<Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
						Seasons
					</Typography>
					<AddSeason />
				</Stack>
			);

		case "teams":
			return (
				<Stack spacing={4}>
					<Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
						Teams
					</Typography>
					<AddTeam />
					<ManageTeams />
					<AddTeamMembers />
				</Stack>
			);

		case "players":
			return <ManagePlayers />;

		case "expenses":
			return <AdminExpensesTab />;
	}
}
