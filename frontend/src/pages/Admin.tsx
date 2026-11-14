import {
	Avatar,
	Box,
	Button,
	Chip,
	Container,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	Stack,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCurrentUser, useSelectedSeason } from "../redux/hooks";
import { useGetSeasonsQuery } from "../redux/api/seasonsApi";
import { useLogoutMutation, authApi } from "../redux/api/authApi";
import { setSelectedSeasonId } from "../redux/seasonSlice";
import LogoutModal from "../components/navigation/LogoutModal";

// Admin tab components
import AdminSeasonsTab from "../components/admin/AdminSeasonsTab";
import AdminAddTeamTab from "../components/admin/AdminAddTeamTab";
import AdminPlayersTab from "../components/admin/AdminPlayersTab";
import AdminTeamsTab from "../components/admin/AdminTeamsTab";
import AdminMatchesTab from "../components/admin/AdminMatchesTab";
import AdminExpensesTab from "../components/admin/AdminExpensesTab";

type AdminTab = "matches" | "seasons" | "teams" | "players" | "expenses";

interface NavItem {
	id: AdminTab;
	label: string;
	description: string;
	icon: React.ReactElement;
}

const NAV_ITEMS: NavItem[] = [
	{ id: "matches", label: "Termini", description: "Pregled i unos utakmica", icon: <SportsSoccerIcon /> },
	{ id: "seasons", label: "Sezone", description: "Kreiranje novih sezona", icon: <CalendarMonthIcon /> },
	{ id: "teams", label: "Timovi", description: "Sastavi i upravljanje ekipama", icon: <GroupsIcon /> },
	{ id: "players", label: "Igrači", description: "Popis i uređivanje igrača", icon: <PersonIcon /> },
	{ id: "expenses", label: "Troškovi", description: "Evidencija troškova dvorane", icon: <ReceiptLongIcon /> },
];

const SIDEBAR_WIDTH = 260;

const VALID_TABS = new Set<AdminTab>(["matches", "seasons", "teams", "players", "expenses"]);

function isValidTab(value: string | null): value is AdminTab {
	return VALID_TABS.has(value as AdminTab);
}

export default function Admin() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const { user, isAdmin } = useCurrentUser();
	const { data: seasons } = useGetSeasonsQuery();
	const selectedSeasonId = useSelectedSeason();
	const [logout] = useLogoutMutation();

	const [seasonAnchorEl, setSeasonAnchorEl] = useState<null | HTMLElement>(null);
	const [logoutModalOpen, setLogoutModalOpen] = useState(false);

	const rawTab = searchParams.get("tab");
	const activeTab: AdminTab = isValidTab(rawTab) ? rawTab : "matches";

	const handleTabChange = (tab: AdminTab) => {
		navigate(`/admin?tab=${tab}`, { replace: true });
	};

	const handleLogoutConfirm = async () => {
		try {
			await logout().unwrap();
		} catch {
			// ignore logout error
		}
		dispatch(authApi.util.resetApiState());
		setLogoutModalOpen(false);
		navigate("/");
	};

	const selectedSeason = seasons?.find((s) => s.id === selectedSeasonId);

	return (
		<Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
			{/* Modern Top Bar */}
			<Box
				component="header"
				sx={{
					position: "sticky",
					top: 0,
					zIndex: (t) => t.zIndex.appBar,
					backdropFilter: "blur(16px)",
					backgroundColor: "rgba(14, 15, 14, 0.8)",
					borderBottom: "1px solid",
					borderColor: "divider",
				}}
			>
				<Container maxWidth="xl">
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							minHeight: { xs: 64, sm: 72 },
							gap: 2,
						}}
					>
						{/* Left: Branding & Portal Badge */}
						<Stack direction="row" alignItems="center" spacing={2}>
							<Box
								component={Link}
								to="/"
								sx={{
									textDecoration: "none",
									color: "inherit",
									display: "flex",
									alignItems: "center",
									gap: 1.5,
								}}
							>
								<Box
									sx={{
										width: { xs: 36, sm: 42 },
										height: { xs: 36, sm: 42 },
										borderRadius: "12px",
										backgroundColor: "rgba(25, 118, 210, 0.14)",
										border: "1px solid",
										borderColor: "primary.dark",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: "primary.main",
									}}
								>
									<AdminPanelSettingsIcon sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem" } }} />
								</Box>
								<Box sx={{ display: "flex", flexDirection: "column" }}>
									<Stack direction="row" alignItems="center" spacing={1}>
										<Typography
											variant="body1"
											sx={{
												fontWeight: 700,
												color: "text.primary",
												lineHeight: 1.1,
												letterSpacing: "0.05em",
												}}
										>
											HPD PRSTEN
										</Typography>
										<Chip
											label="ADMIN"
											size="small"
											color="primary"
											variant="outlined"
											sx={{
												height: 20,
												fontSize: "0.65rem",
												fontWeight: 700,
												letterSpacing: "0.08em",
											}}
										/>
									</Stack>
									<Typography
										variant="caption"
										sx={{
											color: "text.secondary",
											letterSpacing: "0.08em",
											lineHeight: 1.2,
											display: { xs: "none", sm: "block" },
										}}
									>
										Upravljačka ploča lige
									</Typography>
								</Box>
							</Box>
						</Stack>

						{/* Right: Season selector, user indicator & back button */}
						<Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }}>
							{/* Season Dropdown */}
							{seasons && seasons.length > 0 && (
								<>
									<Button
										onClick={(e) => setSeasonAnchorEl(e.currentTarget)}
										startIcon={
											<FiberManualRecordIcon
												sx={{ fontSize: "0.5rem !important", color: "success.main" }}
											/>
										}
										endIcon={
											<KeyboardArrowDownIcon
												sx={{
													fontSize: "1rem !important",
													transition: "transform 0.2s",
													transform: seasonAnchorEl ? "rotate(180deg)" : "rotate(0deg)",
												}}
											/>
										}
										sx={{
											color: "text.primary",
											textTransform: "uppercase",
											fontWeight: 500,
											fontSize: "0.8rem",
											letterSpacing: "0.06em",
											borderRadius: "20px",
											px: 1.5,
											py: 0.75,
											border: "1px solid",
											borderColor: "divider",
											backgroundColor: "action.hover",
											"&:hover": { backgroundColor: "action.selected" },
										}}
									>
										{selectedSeason?.name ?? "Sezona"}
									</Button>
									<Menu
										anchorEl={seasonAnchorEl}
										open={Boolean(seasonAnchorEl)}
										onClose={() => setSeasonAnchorEl(null)}
										slotProps={{
											paper: {
												sx: {
													mt: 0.5,
													borderRadius: "12px",
													minWidth: 160,
													border: "1px solid",
													borderColor: "divider",
												},
											},
										}}
									>
										{seasons.map((season) => (
											<MenuItem
												key={season.id}
												selected={season.id === selectedSeasonId}
												onClick={() => {
													dispatch(setSelectedSeasonId(season.id));
													setSeasonAnchorEl(null);
												}}
											>
												{season.name}
											</MenuItem>
										))}
									</Menu>
								</>
							)}

							{/* User status chip (desktop) */}
							{!isMobile && user?.email && (
								<Tooltip title={`Prijavljeni ste kao ${user.email} (${isAdmin ? "Admin" : "Korisnik"})`}>
									<Stack
										direction="row"
										alignItems="center"
										spacing={1}
										sx={{
											px: 1.5,
											py: 0.5,
											borderRadius: "20px",
											backgroundColor: "action.hover",
											border: "1px solid",
											borderColor: "divider",
										}}
									>
										<Avatar
											sx={{
												width: 24,
												height: 24,
												fontSize: "0.75rem",
												bgcolor: "primary.main",
												color: "primary.contrastText",
												fontWeight: 700,
											}}
										>
											{user.email.charAt(0).toUpperCase()}
										</Avatar>
										<Typography
											variant="caption"
											sx={{
												color: "text.primary",
												fontWeight: 500,
												maxWidth: 140,
												overflow: "hidden",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap",
											}}
										>
											{user.email.split("@")[0]}
										</Typography>
									</Stack>
								</Tooltip>
							)}

							{/* Exit to public site button */}
							<Button
								component={Link}
								to="/"
								variant="outlined"
								size="small"
								startIcon={<ArrowBackIcon />}
								sx={{
									textTransform: "none",
									borderColor: "divider",
									color: "text.secondary",
									borderRadius: "20px",
									px: 1.5,
									py: 0.65,
									fontWeight: 500,
									fontSize: "0.82rem",
									"&:hover": {
										borderColor: "text.primary",
										color: "text.primary",
										backgroundColor: "rgba(255,255,255,0.04)",
									},
								}}
							>
								{isMobile ? "Izlaz" : "Povratak na stranicu"}
							</Button>
						</Stack>
					</Box>
				</Container>
			</Box>

			{/* Portal Body with Sidebar & Content */}
			<Container maxWidth="xl" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
				<Box
					sx={{
						display: "flex",
						flex: 1,
						gap: { md: 4 },
					}}
				>
					{/* Desktop sidebar */}
					{!isMobile && (
						<Paper
							elevation={0}
							component="nav"
							aria-label="Admin sidebar"
							sx={{
								width: SIDEBAR_WIDTH,
								flexShrink: 0,
								borderRight: "1px solid",
								borderColor: "divider",
								backgroundColor: "transparent",
								pt: 3,
								pb: 3,
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							<Box>
								<Typography
									variant="caption"
									sx={{
										px: 2,
										mb: 1.5,
										display: "block",
										fontWeight: 700,
										letterSpacing: "0.1em",
										color: "text.secondary",
										textTransform: "uppercase",
									}}
								>
									Upravljanje
								</Typography>
								<List disablePadding>
									{NAV_ITEMS.map((item) => {
										const isActive = activeTab === item.id;
										return (
											<ListItem key={item.id} disablePadding sx={{ mb: 0.75 }}>
												<ListItemButton
													selected={isActive}
													onClick={() => handleTabChange(item.id)}
													sx={{
														mx: 1,
														borderRadius: "12px",
														py: 1.25,
														px: 1.5,
														transition: "all 0.15s ease",
														border: isActive
															? (t) => `1px solid ${t.palette.divider}`
															: "1px solid transparent",
														backgroundColor: isActive
															? "action.selected"
															: "transparent",
														"&:hover": {
															backgroundColor: isActive
																? "action.focus"
																: "action.hover",
														},
													}}
												>
													<ListItemIcon
														sx={{
															color: isActive ? "primary.main" : "text.secondary",
															minWidth: 38,
														}}
													>
														{item.icon}
													</ListItemIcon>
													<ListItemText
														primary={item.label}
														secondary={item.description}
														primaryTypographyProps={{
															fontWeight: isActive ? 600 : 500,
															color: isActive ? "primary.main" : "text.primary",
															fontSize: "0.92rem",
														}}
														secondaryTypographyProps={{
															fontSize: "0.75rem",
															color: "text.secondary",
															noWrap: true,
														}}
													/>
												</ListItemButton>
											</ListItem>
										);
									})}
								</List>
							</Box>

							{/* Bottom of sidebar: Logout action */}
							<Box sx={{ px: 1, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
								<ListItemButton
									onClick={() => setLogoutModalOpen(true)}
									sx={{
										borderRadius: "12px",
										py: 1,
										color: "error.main",
										"&:hover": {
											backgroundColor: "rgba(211, 47, 47, 0.1)",
										},
									}}
								>
									<ListItemIcon sx={{ minWidth: 38, color: "error.main" }}>
										<LogoutIcon fontSize="small" />
									</ListItemIcon>
									<ListItemText
										primary="Odjava"
										primaryTypographyProps={{
											fontSize: "0.88rem",
											fontWeight: 500,
											color: "error.main",
										}}
									/>
								</ListItemButton>
							</Box>
						</Paper>
					)}

					{/* Main content area */}
					<Box
						component="main"
						sx={{
							flex: 1,
							overflow: "auto",
							py: { xs: 2.5, md: 3.5 },
							px: { xs: 0, md: 1 },
							minWidth: 0,
						}}
					>
						<AdminTabContent activeTab={activeTab} />
					</Box>
				</Box>
			</Container>

			{/* Logout Confirmation Modal */}
			<LogoutModal
				open={logoutModalOpen}
				onClose={() => setLogoutModalOpen(false)}
				onConfirm={handleLogoutConfirm}
			/>
		</Box>
	);
}

function AdminTabContent({ activeTab }: { activeTab: AdminTab }) {
	switch (activeTab) {
		case "matches":
			return <AdminMatchesTab />;

		case "seasons":
			return <AdminSeasonsTab />;

		case "teams":
			return (
				<Stack spacing={4}>
					<AdminAddTeamTab />
					<AdminTeamsTab />
				</Stack>
			);

		case "players":
			return <AdminPlayersTab />;

		case "expenses":
			return <AdminExpensesTab />;
	}
}

