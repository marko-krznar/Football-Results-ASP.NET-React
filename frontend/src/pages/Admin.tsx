import Stack from "@mui/material/Stack";
import AddSeason from "../components/admin/AddSeason";
import AddTeam from "../components/admin/AddTeam";

export default function Admin() {
	return (
		<Stack spacing={4}>
			<AddSeason />
			<AddTeam />
		</Stack>
	);
}
