import { describe, it, expect, vi, afterEach } from "vitest";
import { isSetWinner, calculateMatchScore, getCurrentDate } from "../../src/utils/matchUtils";

describe("isSetWinner", () => {
	it("vraća true kad je score >= 6 i razlika >= 2", () => {
		expect(isSetWinner(6, 4)).toBe(true);
		expect(isSetWinner(8, 6)).toBe(true);
		expect(isSetWinner(10, 3)).toBe(true);
	});

	it("vraća false ako score < 6", () => {
		expect(isSetWinner(5, 3)).toBe(false);
		expect(isSetWinner(0, 0)).toBe(false);
	});

	it("vraća false ako je razlika < 2", () => {
		expect(isSetWinner(6, 5)).toBe(false);
		expect(isSetWinner(7, 6)).toBe(false);
	});

	it("vraća false pri izjednačenom rezultatu", () => {
		expect(isSetWinner(6, 6)).toBe(false);
	});
});

describe("calculateMatchScore", () => {
	it("broji setove pravilno za oba tima", () => {
		const sets = [
			{ id: 1, blackScore: 6, whiteScore: 3 },
			{ id: 2, blackScore: 3, whiteScore: 6 },
			{ id: 3, blackScore: 7, whiteScore: 5 },
		];
		const { blackTotal, whiteTotal } = calculateMatchScore(sets);
		expect(blackTotal).toBe(2);
		expect(whiteTotal).toBe(1);
	});

	it("vraća 0-0 za praznu listu setova", () => {
		const { blackTotal, whiteTotal } = calculateMatchScore([]);
		expect(blackTotal).toBe(0);
		expect(whiteTotal).toBe(0);
	});

	it("ne broji neriješene setove", () => {
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

	it("vraća datum u formatu YYYY-MM-DD", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2026, 0, 5)); // 5.1.2026.

		expect(getCurrentDate()).toBe("2026-01-05");
	});

	it("ispravno dodaje vodeće nule za dan i mjesec", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 8, 9)); // 9.9.2025.

		expect(getCurrentDate()).toBe("2025-09-09");
	});

	it("ispravno formatira datum bez vodećih nula (dvoznamenkasti dan i mjesec)", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 11, 25)); // 25.12.2025.

		expect(getCurrentDate()).toBe("2025-12-25");
	});
});
