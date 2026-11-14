import { Card, CardContent, Typography, Box } from "@mui/material";

interface StatRecordCardProps {
	title: string;
	subtitle?: string;
	primaryValue: string | number;
	secondaryValue?: string;
}

export default function StatRecordCard({
	title,
	subtitle,
	primaryValue,
	secondaryValue,
}: StatRecordCardProps) {
	return (
		<Card
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				backgroundColor: "background.paper",
				border: 1,
				borderColor: "divider",
			}}
		>
			<CardContent
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					p: 3,
					"&:last-child": { pb: 3 },
				}}
			>
				{/* Top bar: title and subtitle */}
				<Box>
					<Typography
						variant="caption"
						textTransform="uppercase"
						fontWeight={700}
						letterSpacing="0.08em"
						color="text.secondary"
						display="block"
						mb={subtitle ? 1 : 0}
					>
						{title}
					</Typography>

					{subtitle && (
						<Typography variant="body2" color="text.secondary">
							{subtitle}
						</Typography>
					)}
				</Box>

				{/* Bottom section: values */}
				<Box mt={3}>
					<Typography variant="h3" fontWeight="bold" color="text.primary" sx={{ lineHeight: 1.1 }}>
						{primaryValue}
					</Typography>
					{secondaryValue && (
						<Typography variant="body2" color="text.secondary" mt={1}>
							{secondaryValue}
						</Typography>
					)}
				</Box>
			</CardContent>
		</Card>
	);
}
