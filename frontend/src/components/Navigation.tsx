import {
	AppBar,
	Toolbar,
	Button,
	Typography,
	Box,
	Container,
	Tooltip,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	MenuItem,
	Divider,
	Menu,
	Select,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link, useNavigate, useLocation } from "react-router";
import { useLogoutMutation, authApi } from "../redux/api/authApi";
import { useGetSeasonsQuery } from "../redux/api/seasonsApi";
import { useCurrentUser, useSelectedSeason } from "../redux/hooks";
import { setSelectedSeasonId } from "../redux/seasonSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getClosestSeasonId } from "../utils/getClosestSeasonIdUtils";

const navLinks = [
	{ label: "Naslovna", to: "/" },
	{ label: "Termini", to: "/matches" },
	{ label: "Momčadi", to: "/teams" },
	{ label: "Sezone", to: "/seasons" },
];

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

export default function Navigation() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const { user, isLoading, isAuthenticated, isAdmin } = useCurrentUser();
	const { data: seasons } = useGetSeasonsQuery();
	const selectedSeasonId = useSelectedSeason();
	const [logout] = useLogoutMutation();

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [seasonAnchorEl, setSeasonAnchorEl] = useState<null | HTMLElement>(null);
	const seasonMenuOpen = Boolean(seasonAnchorEl);

	const closestSeason = seasons && getClosestSeasonId(seasons);

	useEffect(() => {
		if (closestSeason) {
			dispatch(setSelectedSeasonId(closestSeason));
		}
	}, [closestSeason, dispatch]);

	const handleLogout = async () => {
		try {
			await logout().unwrap();
		} catch {
			// ignore logout error
		}

		dispatch(authApi.util.resetApiState());
		setMobileMenuOpen(false);
		navigate("/");
	};

	const closeMobileMenu = () => {
		setMobileMenuOpen(false);
	};

	const handleSeasonMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setSeasonAnchorEl(event.currentTarget);
	};

	const handleSeasonMenuClose = () => {
		setSeasonAnchorEl(null);
	};

	const handleSeasonSelect = (id: number) => {
		dispatch(setSelectedSeasonId(id));
		handleSeasonMenuClose();
	};

	const selectedSeason = seasons?.find((s) => s.id === selectedSeasonId);

	const isActive = (to: string) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

	return (
		<AppBar
			position="sticky"
			color="transparent"
			elevation={0}
			sx={{
				backdropFilter: "blur(12px)",
				borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
			}}
		>
			<Container maxWidth="xl">
				<Toolbar
					disableGutters
					sx={{
						minHeight: { xs: 64, sm: 72 },
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					{/* ── Logo ── */}
					<Button
						component={Link}
						to="/"
						onClick={closeMobileMenu}
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

					{/* ── Desktop nav links ── */}
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							gap: 0.5,
							alignItems: "center",
						}}
					>
						{navLinks.map((link) => {
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

					{/* ── Desktop right actions ── */}
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							gap: 1,
							alignItems: "center",
						}}
					>
						{/* Season pill picker */}
						{seasons && seasons.length > 0 && (
							<>
								<Button
									onClick={handleSeasonMenuOpen}
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
												transform: seasonMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
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
										"&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
									}}
								>
									{selectedSeason?.name ?? "Sezona"}
								</Button>

								<Menu
									anchorEl={seasonAnchorEl}
									open={seasonMenuOpen}
									onClose={handleSeasonMenuClose}
									slotProps={{
										paper: {
											sx: { mt: 0.5, borderRadius: "12px", minWidth: 160 },
										},
									}}
								>
									{seasons.map((season) => (
										<MenuItem
											key={season.id}
											selected={season.id === selectedSeasonId}
											onClick={() => handleSeasonSelect(season.id)}
										>
											{season.name}
										</MenuItem>
									))}
								</Menu>
							</>
						)}

						{/* Admin link */}
						{!isLoading && isAuthenticated && isAdmin && (
							<Button
								component={Link}
								to="/admin"
								endIcon={<AdminPanelSettingsIcon />}
								sx={{
									color: "text.primary",
									textTransform: "uppercase",
									fontWeight: 600,
									fontSize: "0.8rem",
									letterSpacing: "0.06em",
									borderRadius: "20px",
									px: 2,
									py: 0.75,
									"&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
								}}
							>
								Admin
							</Button>
						)}

						{/* Auth button */}
						{!isLoading && (
							<>
								{isAuthenticated ? (
									<Tooltip title={`Odjava (${user?.email})`}>
										<Button
											id="nav-logout-btn"
											onClick={handleLogout}
											endIcon={<LogoutIcon sx={{ fontSize: "1rem !important" }} />}
											sx={{
												color: "text.primary",
												textTransform: "uppercase",
												fontWeight: 600,
												fontSize: "0.8rem",
												letterSpacing: "0.06em",
												borderRadius: "20px",
												px: 2,
												py: 0.75,
												"&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
											}}
										>
											Odjava
										</Button>
									</Tooltip>
								) : (
									<Button
										id="nav-login-btn"
										component={Link}
										to="/login"
										endIcon={<LoginIcon sx={{ fontSize: "1rem !important" }} />}
										sx={{
											color: (theme) => theme.palette.background.default,
											backgroundColor: "text.primary",
											textTransform: "uppercase",
											fontWeight: 600,
											fontSize: "0.8rem",
											letterSpacing: "0.06em",
											borderRadius: "20px",
											px: 2,
											py: 0.75,
											"&:hover": {
												backgroundColor: "text.primary",
												opacity: 0.88,
											},
										}}
									>
										Prijava
									</Button>
								)}
							</>
						)}
					</Box>

					{/* ── Mobile hamburger ── */}
					<IconButton
						onClick={() => setMobileMenuOpen(true)}
						sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}
						aria-label="Otvori navigaciju"
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</Container>

			{/* ── Mobile drawer ── */}
			<Drawer anchor="right" open={mobileMenuOpen} onClose={closeMobileMenu}>
				{/* Drawer header */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						p: 2,
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
						<LogoIconBox>
							<SportsSoccerIcon sx={{ fontSize: "1.4rem", color: "text.primary" }} />
						</LogoIconBox>
						<LogoWordmark />
					</Box>

					<IconButton onClick={closeMobileMenu} aria-label="Zatvori navigaciju">
						<CloseIcon />
					</IconButton>
				</Box>

				<Divider />

				<List sx={{ px: 1 }}>
					{navLinks.map((link) => (
						<ListItem key={link.to} disablePadding>
							<ListItemButton
								component={Link}
								to={link.to}
								onClick={closeMobileMenu}
								selected={isActive(link.to)}
							>
								<ListItemText primary={link.label} />
							</ListItemButton>
						</ListItem>
					))}

					{seasons && seasons.length > 0 && (
						<Box sx={{ px: 2, py: 1 }}>
							<Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5, display: "block" }}>
								Odaberi sezonu
							</Typography>
							<Select
								fullWidth
								size="small"
								value={selectedSeasonId ?? ""}
								onChange={(e) => dispatch(setSelectedSeasonId(Number(e.target.value)))}
							>
								{seasons.map((season) => (
									<MenuItem key={season.id} value={season.id}>
										{season.name}
									</MenuItem>
								))}
							</Select>
						</Box>
					)}

					{!isLoading && isAuthenticated && isAdmin && (
						<>
							<Divider sx={{ my: 1 }} />

							<ListItem disablePadding>
								<ListItemButton component={Link} to="/admin" onClick={closeMobileMenu}>
									<AdminPanelSettingsIcon sx={{ mr: 2 }} color="primary" />

									<ListItemText
										primary="Admin panel"
										primaryTypographyProps={{
											fontWeight: 600,
											color: "primary.main",
										}}
									/>
								</ListItemButton>
							</ListItem>
						</>
					)}

					{!isLoading && (
						<>
							<Divider sx={{ my: 1 }} />

							{isAuthenticated ? (
								<ListItem disablePadding>
									<ListItemButton onClick={handleLogout}>
										<LogoutIcon sx={{ mr: 2 }} />

										<ListItemText primary="Odjava" secondary={user?.email} />
									</ListItemButton>
								</ListItem>
							) : (
								<ListItem disablePadding>
									<ListItemButton component={Link} to="/login" onClick={closeMobileMenu}>
										<LoginIcon sx={{ mr: 2, color: "primary.main" }} />

										<ListItemText primary="Prijava" />
									</ListItemButton>
								</ListItem>
							)}
						</>
					)}
				</List>
			</Drawer>
		</AppBar>
	);
}
