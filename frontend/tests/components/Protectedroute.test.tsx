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
				children: [{ path: "/admin", element: <div>Admin sadržaj</div> }],
			},
			{ path: "/login", element: <div>Login stranica</div> },
		],
		{ initialEntries: ["/admin"] }
	);

	return render(<RouterProvider router={router} />);
};

describe("ProtectedRoute", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("prikazuje spinner dok se korisnik učitava", () => {
		mockedUseCurrentUser.mockReturnValue({
			user: undefined,
			isLoading: true,
			isError: false,
			isAuthenticated: false,
			isAdmin: false,
		});

		renderWithRouter();

		expect(screen.getByRole("progressbar")).toBeInTheDocument();
		expect(screen.queryByText("Admin sadržaj")).not.toBeInTheDocument();
	});

	it("preusmjerava na /login kad dođe do greške pri dohvatu korisnika", () => {
		mockedUseCurrentUser.mockReturnValue({
			user: undefined,
			isLoading: false,
			isError: true,
			isAuthenticated: false,
			isAdmin: false,
		});

		renderWithRouter();

		expect(screen.getByText("Login stranica")).toBeInTheDocument();
	});

	it("preusmjerava na /login kad korisnik nije admin", () => {
		mockedUseCurrentUser.mockReturnValue({
			user: { email: "user@test.com", isEmailConfirmed: true, claims: {} },
			isLoading: false,
			isError: false,
			isAuthenticated: true,
			isAdmin: false,
		});

		renderWithRouter();

		expect(screen.getByText("Login stranica")).toBeInTheDocument();
	});

	it("renderira zaštićeni sadržaj (Outlet) kad je korisnik admin", () => {
		mockedUseCurrentUser.mockReturnValue({
			user: { email: "admin@test.com", isEmailConfirmed: true, claims: { isAdmin: "true" } },
			isLoading: false,
			isError: false,
			isAuthenticated: true,
			isAdmin: true,
		});

		renderWithRouter();

		expect(screen.getByText("Admin sadržaj")).toBeInTheDocument();
	});
});
