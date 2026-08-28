import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import AddMatchModal from "../../../src/components/matches/AddMatchModal";
import { useGetSeasonsQuery } from "../../../src/redux/api/seasonsApi";
import { useGetTeamsQuery } from "../../../src/redux/api/teamsApi";
import { useAddMatchWithDetailsMutation } from "../../../src/redux/api/matchesApi";
import { useGetTeamMembersQuery } from "../../../src/redux/api/teamMembersApi";
import type {
	UseGetSeasonsQueryMockResult,
	UseGetTeamsQueryMockResult,
	UseGetTeamMembersQueryMockResult,
	UseAddMatchWithDetailsMutationMockResult,
	AddMatchWithDetailsTriggerResult,
} from "../../types/Match";
import React from "react";

vi.mock("../../../src/redux/api/seasonsApi", () => ({
	useGetSeasonsQuery: vi.fn(),
}));

vi.mock("../../../src/redux/api/teamsApi", () => ({
	useGetTeamsQuery: vi.fn(),
}));

vi.mock("../../../src/redux/api/matchesApi", () => ({
	useAddMatchWithDetailsMutation: vi.fn(),
}));

vi.mock("../../../src/redux/api/teamMembersApi", () => ({
	useGetTeamMembersQuery: vi.fn(),
}));

const mockedUseGetSeasonsQuery = vi.mocked(useGetSeasonsQuery);
const mockedUseGetTeamsQuery = vi.mocked(useGetTeamsQuery);
const mockedUseGetTeamMembersQuery = vi.mocked(useGetTeamMembersQuery);
const mockedUseAddMatchWithDetailsMutation = vi.mocked(useAddMatchWithDetailsMutation);

const mockSeasons = [{ id: 1, name: "Sezona 2026" }];

const mockTeams = [
	{ id: 10, name: "Bijeli" },
	{ id: 20, name: "Crni" },
];

const mockFirstTeamMembers = [
	{ playerId: 101, playerName: "Player White 1" },
	{ playerId: 102, playerName: "Player White 2" },
];

const mockSecondTeamMembers = [
	{ playerId: 201, playerName: "Player Black 1" },
	{ playerId: 202, playerName: "Player Black 2" },
];

describe("AddMatchModal", () => {
	const onCloseMock = vi.fn();
	const addMatchWithDetailsMock = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();

		mockedUseGetSeasonsQuery.mockReturnValue({
			data: mockSeasons,
			isLoading: false,
		} as unknown as UseGetSeasonsQueryMockResult);

		mockedUseGetTeamsQuery.mockReturnValue({
			data: mockTeams,
			isLoading: false,
		} as unknown as UseGetTeamsQueryMockResult);

		mockedUseGetTeamMembersQuery.mockImplementation((teamId: Parameters<typeof useGetTeamMembersQuery>[0]) => {
			if (teamId === 10) {
				return {
					data: mockFirstTeamMembers,
					isLoading: false,
				} as unknown as UseGetTeamMembersQueryMockResult;
			}
			if (teamId === 20) {
				return {
					data: mockSecondTeamMembers,
					isLoading: false,
				} as unknown as UseGetTeamMembersQueryMockResult;
			}
			return { data: [], isLoading: false } as unknown as UseGetTeamMembersQueryMockResult;
		});

		mockedUseAddMatchWithDetailsMutation.mockReturnValue([
			addMatchWithDetailsMock,
			{ isLoading: false },
		] as unknown as UseAddMatchWithDetailsMutationMockResult);
	});

	it("does not render when open is false", () => {
		const { container } = render(<AddMatchModal open={false} onClose={onCloseMock} />);
		expect(container.firstChild).toBeNull();
	});

	it("renders correctly when open is true", () => {
		render(<AddMatchModal open={true} onClose={onCloseMock} />);

		expect(screen.getByText("Dodaj utakmicu")).toBeInTheDocument();
		expect(screen.getByLabelText("Sezona")).toBeInTheDocument();
		expect(screen.getByLabelText("Datum")).toBeInTheDocument();
		expect(screen.getByText("Igrači - Bijeli")).toBeInTheDocument();
		expect(screen.getByText("Igrači - Crni")).toBeInTheDocument();
	});

	it("displays error message if submit is clicked without selecting season or date", async () => {
		mockedUseGetSeasonsQuery.mockReturnValue({
			data: undefined,
			isLoading: false,
		} as unknown as UseGetSeasonsQueryMockResult);

		render(<AddMatchModal open={true} onClose={onCloseMock} />);
		const submitButtons = screen.getAllByRole("button", { name: "Spremi utakmicu" });
		fireEvent.click(submitButtons[submitButtons.length - 1]);

		expect(await screen.findByText("Odaberi sezonu i datum.")).toBeInTheDocument();
	});

	it("handles set management (adding and removing set rows)", async () => {
		render(<AddMatchModal open={true} onClose={onCloseMock} />);

		expect(screen.getByLabelText("Set 1")).toBeInTheDocument();

		const addSetButton = screen.getByRole("button", { name: "Dodaj set" });
		fireEvent.click(addSetButton);

		expect(screen.getByLabelText("Set 2")).toBeInTheDocument();

		const removeButtons = screen.getAllByLabelText("Ukloni set");
		fireEvent.click(removeButtons[1]);

		expect(screen.queryByLabelText("Set 2")).not.toBeInTheDocument();
	});

	it("handles selecting and clearing all team members", () => {
		render(<AddMatchModal open={true} onClose={onCloseMock} />);

		const whitePlayer1Checkbox = screen.getByLabelText("Player White 1");
		const whitePlayer2Checkbox = screen.getByLabelText("Player White 2");

		expect(whitePlayer1Checkbox).toBeChecked();
		expect(whitePlayer2Checkbox).toBeChecked();

		const clearWhiteBtn = screen.getAllByRole("button", { name: "Očisti" })[0];
		fireEvent.click(clearWhiteBtn);

		expect(whitePlayer1Checkbox).not.toBeChecked();
		expect(whitePlayer2Checkbox).not.toBeChecked();

		const selectAllWhiteBtn = screen.getAllByRole("button", { name: "Odaberi sve" })[0];
		fireEvent.click(selectAllWhiteBtn);

		expect(whitePlayer1Checkbox).toBeChecked();
		expect(whitePlayer2Checkbox).toBeChecked();
	});

	it("submits the form successfully and triggers api call", async () => {
		addMatchWithDetailsMock.mockReturnValue({
			unwrap: () => Promise.resolve({ success: true }),
		} as unknown as AddMatchWithDetailsTriggerResult);

		render(<AddMatchModal open={true} onClose={onCloseMock} />);

		const selectAllButtons = screen.getAllByRole("button", { name: "Odaberi sve" });
		fireEvent.click(selectAllButtons[0]);
		fireEvent.click(selectAllButtons[1]);

		const submitButton = screen.getByRole("button", { name: "Spremi utakmicu" });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(addMatchWithDetailsMock).toHaveBeenCalledWith(
				expect.objectContaining({
					seasonId: 1,
					firstTeamId: 10,
					secondTeamId: 20,
					firstTeamPlayerIds: [101, 102],
					secondTeamPlayerIds: [201, 202],
				})
			);
		});

		expect(screen.getByText("Utakmica je uspješno spremljena!")).toBeInTheDocument();
	});

	it("shows form error when API mutation fails", async () => {
		addMatchWithDetailsMock.mockReturnValue({
			unwrap: () => Promise.reject({ data: { message: "Custom API Error" } }),
		} as unknown as AddMatchWithDetailsTriggerResult);

		render(<AddMatchModal open={true} onClose={onCloseMock} />);

		const submitButton = screen.getByRole("button", { name: "Spremi utakmicu" });
		fireEvent.click(submitButton);

		expect(await screen.findByText("Custom API Error")).toBeInTheDocument();
	});
});
