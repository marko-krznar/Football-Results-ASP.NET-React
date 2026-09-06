import Stack from "@mui/material/Stack";
import AddSeason from "../components/admin/AddSeason";
import AddTeam from "../components/admin/AddTeam";
import AddTeamMembers from "../components/admin/AddTeamMembers";
import ManagePlayers from "../components/admin/ManagePlayers";
import ManageTeams from "../components/admin/ManageTeams";

export default function Admin() {
	return (
		// TODO Make this as progress with steps
		<Stack spacing={4} sx={{ padding: 4 }}>
			<ManagePlayers />
			<AddSeason />
			<AddTeam />
			<ManageTeams />
			<AddTeamMembers />
		</Stack>
	);
}
