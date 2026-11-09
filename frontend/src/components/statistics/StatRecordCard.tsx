import { Card, CardContent, Stack, Typography, Box, Chip } from "@mui/material";
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

export default function StatRecordCard({
	title,
	subtitle,
	primaryValue,
	secondaryValue,
	badgeLabel,
	badgeColor = "primary",
	icon,
}: StatRecordCardProps) {
	return (
		<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
				<Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1} mb={2}>
					<Box>
						<Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight="bold" letterSpacing="0.08em">
							{title}
						</Typography>
						{subtitle && (
							<Typography variant="body2" color="text.secondary" mt={0.5}>
								{subtitle}
							</Typography>
						)}
					</Box>
					<Stack direction="row" spacing={1} alignItems="center">
						{badgeLabel && <Chip label={badgeLabel} size="small" color={badgeColor} variant="outlined" />}
						{icon && <Box sx={{ color: "primary.main", display: "flex", alignItems: "center" }}>{icon}</Box>}
					</Stack>
				</Stack>

				<Box>
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
