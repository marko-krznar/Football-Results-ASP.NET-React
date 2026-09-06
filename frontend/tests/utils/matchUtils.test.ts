import { describe, it, expect, vi, afterEach } from "vitest";
import { isSetWinner, calculateMatchScore, getCurrentDate } from "../../src/utils/matchUtils";

describe("isSetWinner", () => {
	it("returns true when score is >= 6 and difference is >= 2", () => {
		expect(isSetWinner(6, 4)).toBe(true);
		expect(isSetWinner(8, 6)).toBe(true);
		expect(isSetWinner(10, 3)).toBe(true);
	});

	it("returns false when score is < 6", () => {
		expect(isSetWinner(5, 3)).toBe(false);
		expect(isSetWinner(0, 0)).toBe(false);
	});

	it("returns false when difference is < 2", () => {
		expect(isSetWinner(6, 5)).toBe(false);
		expect(isSetWinner(7, 6)).toBe(false);
	});

	it("returns false for a tie score", () => {
		expect(isSetWinner(6, 6)).toBe(false);
	});
});

describe("calculateMatchScore", () => {
	it("counts sets correctly for both teams", () => {
		const sets = [
			{ id: 1, blackScore: 6, whiteScore: 3 },
			{ id: 2, blackScore: 3, whiteScore: 6 },
			{ id: 3, blackScore: 7, whiteScore: 5 },
		];
		const { blackTotal, whiteTotal } = calculateMatchScore(sets);
		expect(blackTotal).toBe(2);
		expect(whiteTotal).toBe(1);
	});

	it("returns 0-0 for an empty sets list", () => {
		const { blackTotal, whiteTotal } = calculateMatchScore([]);
		expect(blackTotal).toBe(0);
		expect(whiteTotal).toBe(0);
	});

	it("does not count tied sets", () => {
		const sets = [
			{ id: 1, blackScore: 5, whiteScore: 5 },
			{ id: 2, blackScore: 6, whiteScore: 5 },
		];
		const { blackTotal, whiteTotal } = calculateMatchScore(sets);
		expect(blackTotal).toBe(0);
		expect(whiteTotal).toBe(0);
	});
});

describe("getCurrentDate", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("returns date in YYYY-MM-DD format", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2026, 0, 5)); // 5.1.2026.

		expect(getCurrentDate()).toBe("2026-01-05");
	});

	it("correctly pads single-digit day and month with leading zeros", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 8, 9)); // 9.9.2025.

		expect(getCurrentDate()).toBe("2025-09-09");
	});

	it("correctly formats date without padding for double-digit day and month", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 11, 25)); // 25.12.2025.

		expect(getCurrentDate()).toBe("2025-12-25");
	});
});
