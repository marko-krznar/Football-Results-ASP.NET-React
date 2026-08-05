import { Navigate, Outlet } from "react-router";
import { useGetMeQuery } from "../redux/api/authApi";
import { Box, CircularProgress } from "@mui/material";

export default function ProtectedRoute() {
	const { isLoading, isError } = useGetMeQuery();

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

	if (isError) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
