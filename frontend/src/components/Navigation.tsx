import { AppBar, Toolbar, Button, Typography, Box, Container, Tooltip } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link, useNavigate } from "react-router";
import { useGetMeQuery, useLogoutMutation, authApi } from "../redux/api/authApi";
import { useDispatch } from "react-redux";

export default function Navigation() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { data: user, isLoading } = useGetMeQuery();
	const [logout] = useLogoutMutation();

	const isAuthenticated = !!user;

	const handleLogout = async () => {
		try {
			await logout().unwrap();
		} catch {
			// zanemarimo grešku pri odjavi
		}
		// Odmah obriši cijeli RTK Query cache — Navigation se ažurira sinkrono
		dispatch(authApi.util.resetApiState());
		navigate("/");
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
				<Toolbar disableGutters>
					<Button
						component={Link}
						to="/"
						sx={{
							gap: 1,
						}}
					>
						<SportsSoccerIcon sx={{ fontSize: "2rem" }} />
						<Typography
							variant="body1"
							noWrap
							sx={{
								fontWeight: 700,
								color: (theme) => theme.palette.primary.main,
							}}
						>
							HPD PRSTEN
						</Typography>
					</Button>

					<Box sx={{ flexGrow: 1 }} />

					<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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

						{/* Admin link — samo za prijavljene */}
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

						{/* Login / Logout gumb */}
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
				</Toolbar>
			</Container>
		</AppBar>
	);
}
