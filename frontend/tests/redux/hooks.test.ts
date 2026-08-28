import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCurrentUser } from "../../src/redux/hooks";
import { useGetMeQuery } from "../../src/redux/api/authApi";

vi.mock("../../src/redux/api/authApi", () => ({
	useGetMeQuery: vi.fn(),
}));

const mockedUseGetMeQuery = vi.mocked(useGetMeQuery);

describe("useCurrentUser", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns isAuthenticated: false and isAdmin: false when there is no user", () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: undefined,
			isLoading: false,
			isError: false,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.isAdmin).toBe(false);
	});

	it("forwards isLoading and isError from the query", () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: undefined,
			isLoading: true,
			isError: true,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isLoading).toBe(true);
		expect(result.current.isError).toBe(true);
	});

	it('identifies admin when claims.IsAdmin === "true" (capital I)', () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: { email: "a@a.com", isEmailConfirmed: true, claims: { IsAdmin: "true" } },
			isLoading: false,
			isError: false,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.isAdmin).toBe(true);
	});

	it('identifies admin when claims.isAdmin === "true" (lowercase i)', () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: { email: "a@a.com", isEmailConfirmed: true, claims: { isAdmin: "true" } },
			isLoading: false,
			isError: false,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isAdmin).toBe(true);
	});

	it('returns isAdmin: false when claim is set to "false"', () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: { email: "a@a.com", isEmailConfirmed: true, claims: { isAdmin: "false" } },
			isLoading: false,
			isError: false,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.isAdmin).toBe(false);
	});

	it("returns isAdmin: false when user has no claims object", () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: { email: "a@a.com", isEmailConfirmed: true, claims: {} },
			isLoading: false,
			isError: false,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isAdmin).toBe(false);
	});
});
