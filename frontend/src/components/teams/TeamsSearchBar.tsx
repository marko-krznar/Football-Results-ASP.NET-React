import { InputAdornment, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface TeamsSearchBarProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
}

export default function TeamsSearchBar({ searchQuery, onSearchChange }: TeamsSearchBarProps) {
	return (
		<Stack direction="row" alignItems="center" width="100%">
			<TextField
				size="small"
				placeholder="Pretraži igrača po imenu..."
				value={searchQuery}
				onChange={(e) => onSearchChange(e.target.value)}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
							</InputAdornment>
						),
					},
				}}
				sx={{
					maxWidth: { xs: "100%", sm: 360 },
					flexGrow: 1,
					"& .MuiOutlinedInput-root": {
						borderRadius: 6,
						bgcolor: "background.paper",
						"& fieldset": {
							borderColor: "divider",
						},
						"&:hover fieldset": {
							borderColor: "primary.main",
						},
					},
				}}
			/>
		</Stack>
	);
}
