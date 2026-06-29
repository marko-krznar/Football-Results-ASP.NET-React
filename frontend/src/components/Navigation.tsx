import {
	AppBar,
	Toolbar,
	Button,
	Typography,
	Box,
	Container,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Link } from "react-router";
import Authentication from "./authentication/Authentication";

export default function Navigation() {
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

					<Box sx={{ display: "flex", gap: 1 }}>
						<Button component={Link} to="/" color="inherit">
							Naslovna
						</Button>
						<Button component={Link} to="/matches" color="inherit">
							Termini
						</Button>
						<Button component={Link} to="/teams" color="inherit">
							Momčadi
						</Button>
						{/* TODO feature to be added */}
						{/* <Button href="#text-buttons" color="inherit">
							Troškovi
						</Button> */}
					</Box>

					<Authentication />
				</Toolbar>
			</Container>
		</AppBar>
	);
}
