import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import ProtectedRoute from "../../src/components/ProtectedRoute";
import React from "react";

const { mockedUseCurrentUser } = vi.hoisted(() => ({
	mockedUseCurrentUser: vi.fn(),
}));

vi.mock("../../src/redux/hooks", () => ({
	useCurrentUser: mockedUseCurrentUser,
}));

const renderWithRouter = () => {
	const router = createMemoryRouter(
		[
			{
				element: <ProtectedRoute />,
				children: [{ path: "/admin", element: <div>Admin content</div> }],
			},
			{ path: "/login", element: <div>Login page</div> },
		],
		{ initialEntries: ["/admin"] }
	);

	return render(<RouterProvider router={router} />);
};

describe("ProtectedRoute", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("shows a spinner while user is loading", () => {
		mockedUseCurrentUser.mockReturnValue({
			user: undefined,
			isLoading: true,
			isError: false,
			isAuthenticated: false,
			isAdmin: false,
		});

		renderWithRouter();

		expect(screen.getByRole("progressbar")).toBeInTheDocument();
		expect(screen.queryByText("Admin content")).not.toBeInTheDocument();
	});

	it("redirects to /login when there is an error fetching the user", () => {
		mockedUseCurrentUser.mockReturnValue({
			user: undefined,
			isLoading: false,
			isError: true,
			isAuthenticated: false,
			isAdmin: false,
		});

		renderWithRouter();

		expect(screen.getByText("Login page")).toBeInTheDocument();
	});

	it("redirects to /login when user is not an admin", () => {
		mockedUseCurrentUser.mockReturnValue({
			user: { email: "user@test.com", isEmailConfirmed: true, claims: {} },
			isLoading: false,
			isError: false,
			isAuthenticated: true,
			isAdmin: false,
		});

		renderWithRouter();

		expect(screen.getByText("Login page")).toBeInTheDocument();
	});

	it("renders protected content (Outlet) when user is an admin", () => {
		mockedUseCurrentUser.mockReturnValue({
			user: { email: "admin@test.com", isEmailConfirmed: true, claims: { isAdmin: "true" } },
			isLoading: false,
			isError: false,
			isAuthenticated: true,
			isAdmin: true,
		});

		renderWithRouter();

		expect(screen.getByText("Admin content")).toBeInTheDocument();
	});
});
