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

	it("vraća isAuthenticated: false i isAdmin: false kad nema korisnika", () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: undefined,
			isLoading: false,
			isError: false,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.isAdmin).toBe(false);
	});

	it("prosljeđuje isLoading i isError iz upita", () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: undefined,
			isLoading: true,
			isError: true,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isLoading).toBe(true);
		expect(result.current.isError).toBe(true);
	});

	it('prepoznaje admina kad je claims.IsAdmin === "true" (veliko I)', () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: { email: "a@a.com", isEmailConfirmed: true, claims: { IsAdmin: "true" } },
			isLoading: false,
			isError: false,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.isAdmin).toBe(true);
	});

	it('prepoznaje admina kad je claims.isAdmin === "true" (malo i)', () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: { email: "a@a.com", isEmailConfirmed: true, claims: { isAdmin: "true" } },
			isLoading: false,
			isError: false,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isAdmin).toBe(true);
	});

	it('vraća isAdmin: false kad je claim postavljen na "false"', () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: { email: "a@a.com", isEmailConfirmed: true, claims: { isAdmin: "false" } },
			isLoading: false,
			isError: false,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.isAdmin).toBe(false);
	});

	it("vraća isAdmin: false kad korisnik nema claims objekt", () => {
		mockedUseGetMeQuery.mockReturnValue({
			data: { email: "a@a.com", isEmailConfirmed: true, claims: {} },
			isLoading: false,
			isError: false,
		} as unknown as ReturnType<typeof useGetMeQuery>);

		const { result } = renderHook(() => useCurrentUser());

		expect(result.current.isAdmin).toBe(false);
	});
});
