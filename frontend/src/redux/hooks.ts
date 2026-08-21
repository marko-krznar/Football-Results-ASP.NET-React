import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useGetMeQuery } from "./api/authApi";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useCurrentUser = () => {
	const { data: user, isLoading, isError } = useGetMeQuery();
	return {
		user,
		isLoading,
		isError,
		isAuthenticated: !!user,
		isAdmin: user?.claims?.IsAdmin === "true" || user?.claims?.isAdmin === "true",
	};
};
