import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { router } from "../../src/routes";
import seasonReducer from "../../src/redux/seasonSlice";
import React from "react";

const { mockedUseCurrentUser, mockedUseGetSeasonsQuery } = vi.hoisted(() => ({
	mockedUseCurrentUser: vi.fn(),
	mockedUseGetSeasonsQuery: vi.fn(),
}));

vi.mock("../../src/redux/hooks", async (importOriginal) => {
	const actual = await importOriginal<typeof import("../../src/redux/hooks")>();
	return {
		...actual,
		useCurrentUser: mockedUseCurrentUser,
		useSelectedSeason: () => 1,
	};
});

vi.mock("../../src/redux/api/seasonsApi", async (importOriginal) => {
	const actual = await importOriginal<typeof import("../../src/redux/api/seasonsApi")>();
	return {
		...actual,
		useGetSeasonsQuery: mockedUseGetSeasonsQuery,
	};
});

vi.mock("../../src/pages/Landing", () => ({
	default: () => <div data-testid="landing-page">Landing Page</div>,
}));

vi.mock("../../src/pages/Admin", () => ({
	default: () => <div data-testid="admin-page">Admin Page</div>,
}));

function renderRoute(initialEntry: string) {
	const testStore = configureStore({
		reducer: {
			season: seasonReducer,
		},
	});

	const memoryRouter = createMemoryRouter(router.routes, { initialEntries: [initialEntry] });
	return render(
		<Provider store={testStore}>
			<RouterProvider router={memoryRouter} />
		</Provider>
	);
}

describe("Route Layout Separation (PublicLayout vs AdminLayout)", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockedUseGetSeasonsQuery.mockReturnValue({
			data: [{ id: 1, name: "2025/2026", isActive: true, startDate: "2025-09-01", endDate: "2026-06-01" }],
		});
	});

	it("public routes do NOT render AdminBottomNav or admin sidebar, even when logged in as admin", () => {
		mockedUseCurrentUser.mockReturnValue({
			user: { email: "admin@test.com", isEmailConfirmed: true, claims: { isAdmin: "true" } },
			isLoading: false,
			isError: false,
			isAuthenticated: true,
			isAdmin: true,
		});

		renderRoute("/");

		// Public navigation should be present
		expect(screen.getByLabelText("Glavna navigacija")).toBeInTheDocument();

		// Admin bottom nav items must NOT be present on public pages
		expect(screen.queryByTestId("admin-bottom-nav")).not.toBeInTheDocument();
		expect(screen.queryByRole("navigation", { name: "Admin navigacija" })).not.toBeInTheDocument();
	});

	it("admin routes do NOT render public MainNav header", () => {
		mockedUseCurrentUser.mockReturnValue({
			user: { email: "admin@test.com", isEmailConfirmed: true, claims: { isAdmin: "true" } },
			isLoading: false,
			isError: false,
			isAuthenticated: true,
			isAdmin: true,
		});

		renderRoute("/admin");

		// Public navigation should NOT be present in admin layout
		expect(screen.queryByLabelText("Glavna navigacija")).not.toBeInTheDocument();
	});
});
