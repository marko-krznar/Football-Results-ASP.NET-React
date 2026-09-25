import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import MatchesIntroCard from "../../../src/components/matches/MatchesIntroCard";

describe("MatchesIntroCard", () => {
	it("renders total scores correctly", () => {
		render(
			<MatchesIntroCard
				firstTeamName="Bijeli"
				firstTotalSetsWon={12}
				secondTeamName="Crni"
				secondTotalSetsWon={15}
			/>
		);

		expect(screen.getByText("Sveukupno")).toBeInTheDocument();
		expect(screen.getByText("Bijeli")).toBeInTheDocument();
		expect(screen.getByText("Crni")).toBeInTheDocument();
		expect(screen.getByText("12")).toBeInTheDocument();
		expect(screen.getByText("15")).toBeInTheDocument();
	});
});
