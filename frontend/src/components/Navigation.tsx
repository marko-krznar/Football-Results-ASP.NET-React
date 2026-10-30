import {
	AppBar,
	Toolbar,
	Container,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	MenuItem,
	Divider,
	Select,
	Box,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link, useNavigate, useLocation } from "react-router";
import { useLogoutMutation, authApi } from "../redux/api/authApi";
import { useGetSeasonsQuery } from "../redux/api/seasonsApi";
import { useCurrentUser, useSelectedSeason } from "../redux/hooks";
import { setSelectedSeasonId } from "../redux/seasonSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getClosestSeasonId } from "../utils/getClosestSeasonIdUtils";

import NavigationLogo from "./navigation/NavigationLogo";
import MainNav, { MAIN_NAV_LINKS } from "./navigation/MainNav";
import SeasonAndAdminControls from "./navigation/SeasonAndAdminControls";
import LogoutModal from "./navigation/LogoutModal";

export default function Navigation() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const { user, isLoading, isAuthenticated, isAdmin } = useCurrentUser();
	const { data: seasons } = useGetSeasonsQuery();
	const selectedSeasonId = useSelectedSeason();
	const [logout] = useLogoutMutation();

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [logoutModalOpen, setLogoutModalOpen] = useState(false);

	const closestSeason = seasons && getClosestSeasonId(seasons);

	useEffect(() => {
		if (closestSeason) {
			dispatch(setSelectedSeasonId(closestSeason));
		}
	}, [closestSeason, dispatch]);

	const handleLogoutConfirm = async () => {
		try {
			await logout().unwrap();
		} catch {
			// ignore logout error
		}

		dispatch(authApi.util.resetApiState());
		setLogoutModalOpen(false);
		setMobileMenuOpen(false);
		navigate("/");
	};

	const closeMobileMenu = () => {
		setMobileMenuOpen(false);
	};

	const isActive = (to: string) =>
		to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

	return (
		<>
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
						{/* 1. Logo */}
						<NavigationLogo onNavigate={closeMobileMenu} />

						{/* 2. Main Navigation Links */}
						<MainNav />

						{/* 3. Season and Admin / Auth Controls */}
						<SeasonAndAdminControls
							seasons={seasons}
							isLoading={isLoading}
							isAuthenticated={isAuthenticated}
							isAdmin={isAdmin}
							user={user}
							onOpenLogoutModal={() => setLogoutModalOpen(true)}
						/>

						{/* Mobile hamburger button */}
						<IconButton
							onClick={() => setMobileMenuOpen(true)}
							sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}
							aria-label="Otvori navigaciju"
						>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</Container>

				{/* Mobile drawer */}
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
						<NavigationLogo onNavigate={closeMobileMenu} />

						<IconButton onClick={closeMobileMenu} aria-label="Zatvori navigaciju">
							<CloseIcon />
						</IconButton>
					</Box>

					<Divider />

					<List sx={{ px: 1, minWidth: 260 }}>
						{MAIN_NAV_LINKS.map((link) => (
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
								<Typography
									variant="caption"
									sx={{ color: "text.secondary", mb: 0.5, display: "block" }}
								>
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
									<ListItemButton
										component={Link}
										to="/admin"
										onClick={closeMobileMenu}
									>
										<ListItemIcon sx={{ minWidth: 36 }}>
											<AdminPanelSettingsIcon color="primary" />
										</ListItemIcon>
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
										<ListItemButton
											onClick={() => {
												setMobileMenuOpen(false);
												setLogoutModalOpen(true);
											}}
										>
											<ListItemIcon sx={{ minWidth: 36, color: "error.main" }}>
												<LogoutIcon />
											</ListItemIcon>
											<ListItemText
												primary="Odjava"
												secondary={user?.email}
												primaryTypographyProps={{ color: "error.main", fontWeight: 500 }}
											/>
										</ListItemButton>
									</ListItem>
								) : (
									<ListItem disablePadding>
										<ListItemButton
											component={Link}
											to="/login"
											onClick={closeMobileMenu}
										>
											<ListItemIcon sx={{ minWidth: 36 }}>
												<LoginIcon color="primary" />
											</ListItemIcon>
											<ListItemText primary="Prijava" />
										</ListItemButton>
									</ListItem>
								)}
							</>
						)}
					</List>
				</Drawer>
			</AppBar>

			{/* Logout Confirmation Modal */}
			<LogoutModal
				open={logoutModalOpen}
				onClose={() => setLogoutModalOpen(false)}
				onConfirm={handleLogoutConfirm}
			/>
		</>
	);
}
