import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import MatchItemSets from "../../../src/components/matches/MatchItemSets";
import React from "react";

const mockSets = [
	{ id: 1, blackScore: 6, whiteScore: 2 },
	{ id: 2, blackScore: 3, whiteScore: 7 },
];

describe("MatchItemSets", () => {
	it("renders scores of all sets", () => {
		render(<MatchItemSets matchSets={mockSets} />);
		expect(screen.getByText("6")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
		expect(screen.getByText("7")).toBeInTheDocument();
	});

	it("renders an empty component for an empty list", () => {
		const { container } = render(<MatchItemSets matchSets={[]} />);
		expect(container.firstChild?.childNodes).toHaveLength(0);
	});
});
