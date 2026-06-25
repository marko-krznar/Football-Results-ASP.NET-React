import { Typography } from "@mui/material";
import type { MatchSet } from "../../types/match";
import { isSetWinner } from "../../utils/matchUtils";

interface MatchItemSetsProps {
	matchSets: MatchSet[];
}

export default function MatchItemSets({ matchSets }: MatchItemSetsProps) {
	return (
		<div style={{ display: "flex", gap: "1rem" }}>
			{matchSets.map((matchSet: MatchSet) => (
				<div key={matchSet.id}>
					<Typography
						color={
							isSetWinner(matchSet.blackScore, matchSet.whiteScore)
								? "primary"
								: "textSecondary"
						}
					>
						{matchSet.blackScore}
					</Typography>
					<Typography
						color={
							isSetWinner(matchSet.whiteScore, matchSet.blackScore)
								? "primary"
								: "textSecondary"
						}
					>
						{matchSet.whiteScore}
					</Typography>
				</div>
			))}
		</div>
	);
}
