import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import MatchesMobileCardList from "../../../src/components/matches/MatchesMobileCardList";
import { Match } from "../../../src/components/matches/MatchTabel";
import * as hooks from "../../../src/redux/hooks";
import { CurrentUser } from "../../types/User";
import React from "react";

vi.mock("../../../src/redux/hooks", () => ({
	useCurrentUser: vi.fn(),
}));

const mockMatches: Match[] = [
	{
		id: 42,
		date: "2026-08-28",
		location: "ŠD Hotanj",
		note: "Napeta utakmica",
		totalSets: 3,
		firstTeam: {
			teamId: 1,
			teamName: "Bijeli",
			playerNames: ["Ivan", "Marko"],
			goalsPerSet: [4, 8, 5],
			setsWon: 1,
			totalGoals: 17,
		},
		secondTeam: {
			teamId: 2,
			teamName: "Crni",
			playerNames: ["Luka", "Matej"],
			goalsPerSet: [6, 3, 7],
			setsWon: 2,
			totalGoals: 16,
		},
	},
];

const mockCurrentUser: CurrentUser = {
	isAuthenticated: false,
	isAdmin: false,
	user: undefined,
	isLoading: false,
	isError: false,
};

describe("MatchesMobileCardList", () => {
	const setDeletingMatchId = vi.fn();
	const setDeleteDialogOpen = vi.fn();
	const setEditingMatchId = vi.fn();
	const setEditModalOpen = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders mobile card details correctly for anonymous user", () => {
		vi.spyOn(hooks, "useCurrentUser").mockReturnValue({
			...mockCurrentUser,
			isAuthenticated: false,
			isAdmin: false,
		});

		render(
			<MatchesMobileCardList
				data={mockMatches}
				setDeletingMatchId={setDeletingMatchId}
				setDeleteDialogOpen={setDeleteDialogOpen}
				setEditingMatchId={setEditingMatchId}
				setEditModalOpen={setEditModalOpen}
			/>
		);

		expect(screen.getAllByText("Crni")[0]).toBeInTheDocument();
		expect(screen.getAllByText("Bijeli")[0]).toBeInTheDocument();
		expect(screen.getByText("Ivan, Marko")).toBeInTheDocument();
		expect(screen.getByText("Luka, Matej")).toBeInTheDocument();
		expect(screen.queryByLabelText("edit")).not.toBeInTheDocument();
		expect(screen.queryByLabelText("delete")).not.toBeInTheDocument();
	});

	it("renders admin action buttons and triggers callbacks on click", () => {
		vi.spyOn(hooks, "useCurrentUser").mockReturnValue({
			...mockCurrentUser,
			isAuthenticated: true,
			isAdmin: true,
		});

		render(
			<MatchesMobileCardList
				data={mockMatches}
				setDeletingMatchId={setDeletingMatchId}
				setDeleteDialogOpen={setDeleteDialogOpen}
				setEditingMatchId={setEditingMatchId}
				setEditModalOpen={setEditModalOpen}
			/>
		);

		const editBtn = screen.getByLabelText("edit");
		const deleteBtn = screen.getByLabelText("delete");

		expect(editBtn).toBeInTheDocument();
		expect(deleteBtn).toBeInTheDocument();

		fireEvent.click(editBtn);
		expect(setEditingMatchId).toHaveBeenCalledWith(42);
		expect(setEditModalOpen).toHaveBeenCalledWith(true);

		fireEvent.click(deleteBtn);
		expect(setDeletingMatchId).toHaveBeenCalledWith(42);
		expect(setDeleteDialogOpen).toHaveBeenCalledWith(true);
	});
});
