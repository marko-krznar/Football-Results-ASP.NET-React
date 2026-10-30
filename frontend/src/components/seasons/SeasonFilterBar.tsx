import { Box, Button, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";

export type FilterTab = "all" | "active" | "completed";
export type ViewMode = "grid" | "list";

interface SeasonFilterBarProps {
	statusFilter: FilterTab;
	onFilterChange: (status: FilterTab) => void;
	viewMode: ViewMode;
	onViewModeChange: (mode: ViewMode) => void;
}

const FILTER_OPTIONS: { key: FilterTab; label: string }[] = [
	{ key: "all", label: "Sve" },
	{ key: "active", label: "Aktivne" },
	{ key: "completed", label: "Završene" },
];

export default function SeasonFilterBar({
	statusFilter,
	onFilterChange,
	viewMode,
	onViewModeChange,
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

			{/* Grid / List View Toggle */}
			<ToggleButtonGroup
				value={viewMode}
				exclusive
				onChange={(_e, nextView) => {
					if (nextView) onViewModeChange(nextView);
				}}
				size="small"
				sx={{
					backgroundColor: "background.paper",
					borderRadius: "24px",
					border: 1,
					borderColor: "divider",
					"& .MuiToggleButton-root": {
						border: 0,
						borderRadius: "20px",
						px: 1.2,
						py: 0.5,
						color: "text.secondary",
						"&.Mui-selected": {
							color: "text.primary",
							backgroundColor: "action.selected",
						},
					},
				}}
			>
				<ToggleButton value="grid" aria-label="mrežni prikaz">
					<ViewModuleIcon fontSize="small" />
				</ToggleButton>
				<ToggleButton value="list" aria-label="popisni prikaz">
					<ViewListIcon fontSize="small" />
				</ToggleButton>
			</ToggleButtonGroup>
		</Stack>
	);
}
