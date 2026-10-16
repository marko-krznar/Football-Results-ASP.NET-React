import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import LandingIntroCard from "../../../src/components/landing/LandingIntroCard";

describe("LandingIntroCard", () => {
	it("renders season name and match date", () => {
		render(
			<LandingIntroCard
				season="2025/2026"
				matchDate="2026-10-15"
			/>
		);

		expect(screen.getByText("Odabrana sezona: 2025/2026.")).toBeInTheDocument();
		expect(screen.getByText("Posljednji termin")).toBeInTheDocument();
		expect(screen.queryByText("Prijateljski termin")).not.toBeInTheDocument();
	});

	it("renders friendly match badge when isFriendly is true", () => {
		render(
			<LandingIntroCard
				season="2025/2026"
				matchDate="2026-10-15"
				isFriendly
			/>
		);

		expect(screen.getByText("Prijateljski termin")).toBeInTheDocument();
	});
});
