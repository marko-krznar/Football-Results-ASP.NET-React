import { Stack, Typography } from "@mui/material";
import type { MatchSet } from "../../types/match";

interface MatchItemSetsProps {
	matchSets: MatchSet[];
}

export default function MatchSets({ matchSets }: MatchItemSetsProps) {
	return (
		<Stack spacing={2} direction="row">
			{matchSets.map((set) => (
				<Typography key={set.id}>
					{set.blackScore}:{set.whiteScore}
				</Typography>
			))}
		</Stack>
	);
}
