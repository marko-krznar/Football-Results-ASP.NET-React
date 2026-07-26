namespace backend.Models;

public class TeamMemberDto
{
    public int Id { get; set; }
    public int TeamId { get; set; }
    public int PlayerId { get; set; }
    public string PlayerName { get; set; } = string.Empty;
}

public class AddTeamMembersDto
{
    public required List<int> PlayerIds { get; set; }
}