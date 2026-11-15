import { Box, Button, Stack } from "@mui/material";

export type FilterTab = "all" | "active" | "completed";

interface SeasonFilterBarProps {
	statusFilter: FilterTab;
	onFilterChange: (status: FilterTab) => void;
}

const FILTER_OPTIONS: { key: FilterTab; label: string }[] = [
	{ key: "all", label: "Sve" },
	{ key: "active", label: "Aktivne" },
	{ key: "completed", label: "Završene" },
];

export default function SeasonFilterBar({
	statusFilter,
	onFilterChange,
}: SeasonFilterBarProps) {
	return (
		<Stack
			direction={{ xs: "column", sm: "row" }}
			justifyContent="space-between"
			alignItems={{ xs: "flex-start", sm: "center" }}
			spacing={2}
			sx={{ mb: 4 }}
		>
			{/* Status Filter Tabs */}
			<Box
				sx={{
					display: "flex",
					backgroundColor: "background.paper",
					borderRadius: "24px",
					p: 0.5,
					border: 1,
					borderColor: "divider",
				}}
			>
				{FILTER_OPTIONS.map((tab) => {
					const selected = statusFilter === tab.key;
					return (
						<Button
							key={tab.key}
							size="small"
							onClick={() => onFilterChange(tab.key)}
							sx={{
								textTransform: "none",
								fontWeight: selected ? 700 : 500,
								borderRadius: "20px",
								px: 2,
								py: 0.5,
								color: selected ? "text.primary" : "text.secondary",
								backgroundColor: selected ? "action.selected" : "transparent",
								"&:hover": {
									backgroundColor: selected ? "action.selected" : "action.hover",
								},
							}}
						>
							{tab.label}
						</Button>
					);
				})}
			</Box>
		</Stack>
	);
}
