import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import TeamsHeader from "../../../src/components/teams/TeamsHeader";
import TeamsSearchBar from "../../../src/components/teams/TeamsSearchBar";
import TeamMatchupBanner, { TeamBannerCard } from "../../../src/components/teams/TeamMatchupBanner";
import PlayerCard from "../../../src/components/teams/PlayerCard";

describe("Teams components", () => {
	describe("TeamsHeader", () => {
		it("renders title, season badge, total player count pill, and team cards next to title", () => {
			render(
				<TeamsHeader
					seasonName="Jesen 2026"
					totalPlayers={24}
					blackTeamName="Crni"
					blackCaptainName="Mate Nenadić"
					blackCount={12}
					whiteTeamName="Bijeli"
					whiteCaptainName="Marko Krznar"
					whiteCount={12}
				/>
			);

			expect(screen.getByRole("heading", { name: "Pregled Momčadi" })).toBeInTheDocument();
			expect(screen.getByText("SLUŽBENI SASTAVI SEZONA JESEN 2026")).toBeInTheDocument();
			expect(screen.getByText("Ukupno: 24 igrača")).toBeInTheDocument();
			expect(screen.getByText("TAMNI DRES")).toBeInTheDocument();
			expect(screen.getByText("SVIJETLI DRES")).toBeInTheDocument();
			expect(screen.getByText("Kapetan: Mate Nenadić")).toBeInTheDocument();
			expect(screen.getByText("Kapetan: Marko Krznar")).toBeInTheDocument();
			expect(screen.getByText("vs")).toBeInTheDocument();
		});
	});

	describe("TeamsSearchBar", () => {
		it("calls onSearchChange when input changes", () => {
			const onSearchChange = vi.fn();

			render(
				<TeamsSearchBar
					searchQuery=""
					onSearchChange={onSearchChange}
				/>
			);

			const searchInput = screen.getByPlaceholderText("Pretraži igrača po imenu...");
			fireEvent.change(searchInput, { target: { value: "Mate" } });
			expect(onSearchChange).toHaveBeenCalledWith("Mate");
			expect(screen.queryByText(/prijavljenih/i)).not.toBeInTheDocument();
		});
	});

	describe("TeamMatchupBanner & TeamBannerCard", () => {
		it("renders team card banner without spremni za mec", () => {
			render(
				<TeamBannerCard
					teamName="Crni"
					kitType="dark"
					captainName="Mate Nenadić"
					playerCount={12}
				/>
			);

			expect(screen.getByText("TAMNI DRES")).toBeInTheDocument();
			expect(screen.getByText("Kapetan: Mate Nenadić")).toBeInTheDocument();
			expect(screen.getByText("12 igrača")).toBeInTheDocument();
			expect(screen.queryByText("Spremni za meč")).not.toBeInTheDocument();
		});

		it("renders matchup details for Crni and Bijeli teams", () => {
			render(
				<TeamMatchupBanner
					blackTeamName="Crni"
					blackCaptainName="Mate Nenadić"
					blackCount={12}
					whiteTeamName="Bijeli"
					whiteCaptainName="Marko Krznar"
					whiteCount={12}
				/>
			);

			expect(screen.getByText("TAMNI DRES")).toBeInTheDocument();
			expect(screen.getByText("SVIJETLI DRES")).toBeInTheDocument();
			expect(screen.getByText("vs")).toBeInTheDocument();
		});
	});

	describe("PlayerCard", () => {
		it("renders player name, initial, team corner pill, and real appearance count", () => {
			const dummyPlayer = {
				id: 1,
				teamId: 1,
				playerId: 10,
				playerName: "Mate Nenadić",
			};

			render(
				<PlayerCard
					player={dummyPlayer}
					teamType="crni"
					appearances={5}
				/>
			);

			expect(screen.getByText("Mate Nenadić")).toBeInTheDocument();
			expect(screen.getByText("M")).toBeInTheDocument();
			expect(screen.getByText("Crni")).toBeInTheDocument();
			expect(screen.getByText("5 nastupa")).toBeInTheDocument();
		});

		it("formats singular appearance count correctly and renders Bijeli team pill", () => {
			const dummyPlayer = {
				id: 2,
				teamId: 1,
				playerId: 11,
				playerName: "Ivan Paljak",
			};

			render(
				<PlayerCard
					player={dummyPlayer}
					teamType="bijeli"
					appearances={1}
				/>
			);

			expect(screen.getByText("Ivan Paljak")).toBeInTheDocument();
			expect(screen.getByText("Bijeli")).toBeInTheDocument();
			expect(screen.getByText("1 nastup")).toBeInTheDocument();
		});
	});
});
