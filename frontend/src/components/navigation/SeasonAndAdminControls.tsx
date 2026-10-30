import { useState } from "react";
import {
	Box,
	Button,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { setSelectedSeasonId } from "../../redux/seasonSlice";
import { useSelectedSeason } from "../../redux/hooks";
import type { Season } from "../../redux/api/seasonsApi";
import type { UserInfo } from "../../redux/api/authApi";

interface SeasonAndAdminControlsProps {
	seasons?: Season[];
	isLoading: boolean;
	isAuthenticated: boolean;
	isAdmin: boolean;
	user?: UserInfo | null;
	onOpenLogoutModal: () => void;
}

export default function SeasonAndAdminControls({
	seasons,
	isLoading,
	isAuthenticated,
	isAdmin,
	user,
	onOpenLogoutModal,
}: SeasonAndAdminControlsProps) {
	const dispatch = useDispatch();
	const selectedSeasonId = useSelectedSeason();

	// Season dropdown state
	const [seasonAnchorEl, setSeasonAnchorEl] = useState<null | HTMLElement>(null);
	const seasonMenuOpen = Boolean(seasonAnchorEl);

	// User / Admin dropdown state
	const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
	const userMenuOpen = Boolean(userMenuAnchorEl);

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

	const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setUserMenuAnchorEl(event.currentTarget);
	};

	const handleUserMenuClose = () => {
		setUserMenuAnchorEl(null);
	};

	const handleLogoutClick = () => {
		handleUserMenuClose();
		onOpenLogoutModal();
	};

	const selectedSeason = seasons?.find((s) => s.id === selectedSeasonId);

	return (
		<Box
			sx={{
				display: { xs: "none", md: "flex" },
				gap: 1,
				alignItems: "center",
				justifyContent: "flex-end",
				flex: { md: 1 },
				minWidth: { md: 240 },
			}}
		>
			{/* Season dropdown picker */}
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

			{/* User / Admin / Auth actions */}
			{!isLoading && (
				<>
					{isAuthenticated ? (
						<>
							<Tooltip title={user?.email ? `Prijavljeni: ${user.email}` : "Korisnički izbornik"}>
								<Button
									id="nav-user-menu-btn"
									onClick={handleUserMenuOpen}
									endIcon={
										<KeyboardArrowDownIcon
											sx={{
												fontSize: "1rem !important",
												transition: "transform 0.2s",
												transform: userMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
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
									{isAdmin ? "Admin" : (user?.email?.split("@")[0] ?? "Profil")}
								</Button>
							</Tooltip>

							<Menu
								id="nav-user-menu"
								anchorEl={userMenuAnchorEl}
								open={userMenuOpen}
								onClose={handleUserMenuClose}
								slotProps={{
									paper: {
										sx: { mt: 0.5, borderRadius: "12px", minWidth: 160 },
									},
								}}
							>
								{/* Admin panel link */}
								{isAdmin && (
									<MenuItem
										key="admin-main"
										component={Link}
										to="/admin"
										onClick={handleUserMenuClose}
									>
										<ListItemIcon>
											<AdminPanelSettingsIcon fontSize="small" color="primary" />
										</ListItemIcon>
										<ListItemText
											primary="Admin panel"
											primaryTypographyProps={{ fontWeight: 600, color: "primary.main" }}
										/>
									</MenuItem>
								)}

								{isAdmin && <Divider sx={{ my: 0.5 }} />}

								{/* Logout button */}
								<MenuItem
									id="nav-logout-btn"
									onClick={handleLogoutClick}
									sx={{ color: "error.main" }}
								>
									<ListItemIcon sx={{ color: "error.main" }}>
										<LogoutIcon fontSize="small" />
									</ListItemIcon>
									<ListItemText
										primary="Odjava"
										primaryTypographyProps={{ fontWeight: 500 }}
									/>
								</MenuItem>
							</Menu>
						</>
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
	);
}
