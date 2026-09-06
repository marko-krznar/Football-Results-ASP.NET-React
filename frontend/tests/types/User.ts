import { UserInfo } from "../../src/redux/api/authApi";

export interface CurrentUser {
	isAuthenticated: boolean;
	isAdmin: boolean;
	user: UserInfo | undefined;
	isLoading: boolean;
	isError: boolean;
}
