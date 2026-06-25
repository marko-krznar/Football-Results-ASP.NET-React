import { Typography, Box, CardContent, Card, Container } from "@mui/material";
import { useAppSelector } from "../../redux-toolkit/hooks";
import MatchesIntro from "./MatchesIntro";
import MatchesItem from "./MatchesItem";

export default function Matches() {
	const matches = useAppSelector((state) => state.matches.data);

	return (
		<Container maxWidth="xl">
			<Box
				sx={{
					paddingBlock: 4,
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-start",
						gap: "4rem",
					}}
				>
					<MatchesIntro />
					<Card
						sx={{
							flex: 1,
						}}
					>
						<CardContent>
							<Typography variant="subtitle2" textAlign="center">
								<span style={{ color: "#95CFFF" }}>
									Sveukupno
								</span>
							</Typography>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								gap={4}
							>
								<Box
									display="flex"
									flexDirection="column"
									justifyContent="center"
									gap={2}
								>
									<Typography
										variant="subtitle1"
										fontWeight="bold"
										textAlign="center"
									>
										{matches[0].blackScore}
									</Typography>
									<Typography
										variant="body1"
										textAlign="center"
									>
										Crni
									</Typography>
								</Box>
								<Typography variant="body1">-</Typography>
								<Box
									display="flex"
									flexDirection="column"
									justifyContent="center"
									gap={2}
								>
									<Typography
										variant="subtitle1"
										fontWeight="bold"
										textAlign="center"
									>
										{matches[0].whiteScore}
									</Typography>
									<Typography
										variant="body1"
										textAlign="center"
									>
										Bijeli
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginTop: "2rem",
					}}
				>
					{matches.map((match) => (
						<MatchesItem key={match.id} match={match} />
					))}
				</div>
			</Box>
		</Container>
	);
}
