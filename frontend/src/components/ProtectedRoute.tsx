import { Navigate, Outlet } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useCurrentUser } from "../redux/hooks";

export default function ProtectedRoute() {
	const { isLoading, isError, isAdmin } = useCurrentUser();

	if (isLoading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "60vh",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (isError || !isAdmin) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
