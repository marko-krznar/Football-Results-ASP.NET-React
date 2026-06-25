export interface Player {
	id: number;
	name: string;
	isCaptain: boolean;
	team: number;
}

export interface MatchSet {
	id: number;
	blackScore: number;
	whiteScore: number;
}

export interface MatchOverall {
	id: number;
	blackScore: number;
	whiteScore: number;
	date: string;
	sets: MatchSet[];
	whiteTeamPlayers: Player[];
	blackTeamPlayers: Player[];
}
