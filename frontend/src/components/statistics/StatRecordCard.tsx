import { Card, CardContent, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";

interface StatRecordCardProps {
	title: string;
	subtitle?: string;
	primaryValue: string | number;
	secondaryValue?: string;
	badgeLabel?: string;
	badgeColor?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
	icon?: ReactNode;
}

export default function StatRecordCard({ title, subtitle, primaryValue, secondaryValue }: StatRecordCardProps) {
	return (
		<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
				<Box>
					<Typography variant="subtitle1" textTransform="uppercase" fontWeight="bold">
						{title}
					</Typography>
					{subtitle && (
						<Typography variant="body2" color="text.secondary" mt={3}>
							{subtitle}
						</Typography>
					)}
					{secondaryValue && (
						<Typography variant="body2" color="text.secondary" mt={1}>
							{secondaryValue}
						</Typography>
					)}
					<Typography variant="h3" fontWeight="bold" color="text.primary" sx={{ lineHeight: 1.1 }} mt={3}>
						{primaryValue}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
