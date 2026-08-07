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
	Divider,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router";
import { useGetMeQuery, useLogoutMutation, authApi } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Navigation() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data: user, isLoading } = useGetMeQuery();
	const [logout] = useLogoutMutation();

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const isAuthenticated = !!user;

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
					}}
				>
					<Button
						component={Link}
						to="/"
						onClick={closeMobileMenu}
						sx={{
							gap: 1,
							minWidth: 0,
							px: { xs: 0, sm: 1 },
						}}
					>
						<SportsSoccerIcon
							sx={{
								fontSize: { xs: "1.7rem", sm: "2rem" },
							}}
						/>

						<Typography
							variant="body1"
							noWrap
							sx={{
								fontWeight: 700,
								fontSize: { xs: "0.9rem", sm: "1rem" },
								color: (theme) => theme.palette.primary.main,
							}}
						>
							HPD PRSTEN
						</Typography>
					</Button>

					<Box sx={{ flexGrow: 1 }} />

					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							gap: 1,
							alignItems: "center",
						}}
					>
						<Button component={Link} to="/" color="inherit">
							Naslovna
						</Button>

						<Button component={Link} to="/matches" color="inherit">
							Termini
						</Button>

						<Button component={Link} to="/teams" color="inherit">
							Momčadi
						</Button>

						<Button component={Link} to="/seasons" color="inherit">
							Sezone
						</Button>

						{!isLoading && isAuthenticated && (
							<Tooltip title="Admin panel">
								<Button
									component={Link}
									to="/admin"
									color="inherit"
									startIcon={<AdminPanelSettingsIcon />}
									sx={{
										color: (theme) => theme.palette.primary.main,
										fontWeight: 600,
									}}
								>
									Admin
								</Button>
							</Tooltip>
						)}

						{!isLoading && (
							<>
								{isAuthenticated ? (
									<Tooltip title={`Odjava (${user.email})`}>
										<Button
											id="nav-logout-btn"
											onClick={handleLogout}
											color="inherit"
											startIcon={<LogoutIcon />}
											sx={{
												ml: 1,
												borderRadius: "0.6rem",
												border: "1px solid rgba(255,255,255,0.12)",
												"&:hover": {
													backgroundColor: "rgba(255,255,255,0.06)",
												},
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
										variant="contained"
										startIcon={<LoginIcon />}
										sx={{
											ml: 1,
											borderRadius: "0.6rem",
											textTransform: "none",
											fontWeight: 600,
											background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
											boxShadow: "0 2px 8px rgba(25,118,210,0.35)",
											"&:hover": {
												boxShadow: "0 4px 14px rgba(25,118,210,0.5)",
												transform: "translateY(-1px)",
											},
											transition: "all 0.2s ease",
										}}
									>
										Prijava
									</Button>
								)}
							</>
						)}
					</Box>

					<IconButton
						onClick={() => setMobileMenuOpen(true)}
						sx={{
							display: { xs: "flex", md: "none" },
							ml: 1,
						}}
						aria-label="Otvori navigaciju"
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</Container>

			<Drawer anchor="right" open={mobileMenuOpen} onClose={closeMobileMenu}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						p: 2,
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
						}}
					>
						<SportsSoccerIcon color="primary" sx={{ fontSize: "1.8rem" }} />

						<Typography fontWeight={700} color="primary">
							HPD PRSTEN
						</Typography>
					</Box>

					<IconButton onClick={closeMobileMenu} aria-label="Zatvori navigaciju">
						<CloseIcon />
					</IconButton>
				</Box>

				<Divider />

				<List sx={{ px: 1 }}>
					<ListItem disablePadding>
						<ListItemButton component={Link} to="/" onClick={closeMobileMenu}>
							<ListItemText primary="Naslovna" />
						</ListItemButton>
					</ListItem>

					<ListItem disablePadding>
						<ListItemButton component={Link} to="/matches" onClick={closeMobileMenu}>
							<ListItemText primary="Termini" />
						</ListItemButton>
					</ListItem>

					<ListItem disablePadding>
						<ListItemButton component={Link} to="/teams" onClick={closeMobileMenu}>
							<ListItemText primary="Momčadi" />
						</ListItemButton>
					</ListItem>

					<ListItem disablePadding>
						<ListItemButton component={Link} to="/seasons" onClick={closeMobileMenu}>
							<ListItemText primary="Sezone" />
						</ListItemButton>
					</ListItem>

					{!isLoading && isAuthenticated && (
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

										<ListItemText primary="Odjava" secondary={user.email} />
									</ListItemButton>
								</ListItem>
							) : (
								<ListItem disablePadding>
									<ListItemButton component={Link} to="/login" onClick={closeMobileMenu}>
										<LoginIcon
											sx={{
												mr: 2,
												color: "primary.main",
											}}
										/>

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
