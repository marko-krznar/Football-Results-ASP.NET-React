import { useState } from "react";
import { useNavigate } from "react-router";
import {
	Box,
	Button,
	Container,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	Alert,
	CircularProgress,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLoginMutation } from "../redux/api/authApi";

export default function LoginPage() {
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMsg(null);
		try {
			await login({ email, password }).unwrap();
			navigate("/admin");
		} catch {
			setErrorMsg("Pogrešan email ili lozinka. Pokušajte ponovo.");
		}
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background:
					"radial-gradient(ellipse at 50% 0%, rgba(25, 118, 210, 0.15) 0%, transparent 60%), #0E0F0E",
				position: "relative",
				overflow: "hidden",
				"&::before": {
					content: '""',
					position: "absolute",
					top: "-20%",
					left: "50%",
					transform: "translateX(-50%)",
					width: "600px",
					height: "600px",
					borderRadius: "50%",
					background:
						"radial-gradient(circle, rgba(25, 118, 210, 0.08) 0%, transparent 70%)",
					pointerEvents: "none",
				},
			}}
		>
			<Container maxWidth="xs">
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 3,
						backgroundColor: "rgba(255,255,255,0.04)",
						border: "1px solid rgba(255,255,255,0.08)",
						borderRadius: "1.5rem",
						padding: { xs: "2rem 1.5rem", sm: "3rem 2.5rem" },
						backdropFilter: "blur(20px)",
						boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
					}}
				>
					{/* Logo */}
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 1,
						}}
					>
						<Box
							sx={{
								width: 64,
								height: 64,
								borderRadius: "50%",
								background:
									"linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								boxShadow: "0 8px 24px rgba(25, 118, 210, 0.4)",
								mb: 0.5,
							}}
						>
							<SportsSoccerIcon
								sx={{ fontSize: "2rem", color: "#fff" }}
							/>
						</Box>
						<Typography
							variant="h5"
							fontWeight={700}
							sx={{ color: "#fff", letterSpacing: "-0.5px" }}
						>
							HPD PRSTEN
						</Typography>
						<Typography
							variant="body2"
							sx={{
								color: "rgba(255,255,255,0.4)",
								letterSpacing: "0.08em",
								textTransform: "uppercase",
								fontSize: "0.7rem",
							}}
						>
							Admin portal
						</Typography>
					</Box>

					{/* Naslov */}
					<Box sx={{ textAlign: "center", mt: -1 }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: 1,
								mb: 0.5,
							}}
						>
							<LockOutlinedIcon
								sx={{
									fontSize: "1.1rem",
									color: "rgba(255,255,255,0.5)",
								}}
							/>
							<Typography
								variant="body1"
								sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}
							>
								Prijavite se
							</Typography>
						</Box>
					</Box>

					{/* Forma */}
					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							gap: 2,
						}}
					>
						{errorMsg && (
							<Alert
								severity="error"
								sx={{
									borderRadius: "0.75rem",
									backgroundColor: "rgba(211, 47, 47, 0.12)",
									border: "1px solid rgba(211, 47, 47, 0.3)",
									color: "#f48fb1",
									"& .MuiAlert-icon": { color: "#f44336" },
								}}
							>
								{errorMsg}
							</Alert>
						)}

						<TextField
							id="login-email"
							label="Email adresa"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							fullWidth
							autoComplete="email"
							autoFocus
							size="small"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "0.75rem",
									backgroundColor: "rgba(255,255,255,0.05)",
									"& fieldset": {
										borderColor: "rgba(255,255,255,0.1)",
									},
									"&:hover fieldset": {
										borderColor: "rgba(255,255,255,0.25)",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#1976d2",
									},
								},
								"& .MuiInputLabel-root": {
									color: "rgba(255,255,255,0.4)",
								},
								"& .MuiInputBase-input": {
									color: "#fff",
								},
							}}
						/>

						<TextField
							id="login-password"
							label="Lozinka"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							fullWidth
							autoComplete="current-password"
							size="small"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setShowPassword((v) => !v)}
											edge="end"
											size="small"
											sx={{ color: "rgba(255,255,255,0.4)" }}
										>
											{showPassword ? (
												<VisibilityOff fontSize="small" />
											) : (
												<Visibility fontSize="small" />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "0.75rem",
									backgroundColor: "rgba(255,255,255,0.05)",
									"& fieldset": {
										borderColor: "rgba(255,255,255,0.1)",
									},
									"&:hover fieldset": {
										borderColor: "rgba(255,255,255,0.25)",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#1976d2",
									},
								},
								"& .MuiInputLabel-root": {
									color: "rgba(255,255,255,0.4)",
								},
								"& .MuiInputBase-input": {
									color: "#fff",
								},
							}}
						/>

						<Button
							id="login-submit"
							type="submit"
							variant="contained"
							fullWidth
							disabled={isLoading}
							sx={{
								mt: 1,
								borderRadius: "0.75rem",
								padding: "0.75rem",
								fontWeight: 600,
								fontSize: "0.95rem",
								background:
									"linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
								boxShadow: "0 4px 16px rgba(25, 118, 210, 0.35)",
								textTransform: "none",
								letterSpacing: "0.02em",
								transition: "all 0.2s ease",
								"&:hover": {
									background:
										"linear-gradient(135deg, #1e88e5 0%, #1976d2 100%)",
									boxShadow: "0 6px 20px rgba(25, 118, 210, 0.5)",
									transform: "translateY(-1px)",
								},
								"&:active": {
									transform: "translateY(0)",
								},
								"&.Mui-disabled": {
									background: "rgba(255,255,255,0.1)",
									color: "rgba(255,255,255,0.3)",
								},
							}}
						>
							{isLoading ? (
								<CircularProgress size={20} sx={{ color: "#fff" }} />
							) : (
								"Prijava"
							)}
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
