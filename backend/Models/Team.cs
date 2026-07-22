namespace backend.Models;

public class TeamDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int SeasonId { get; set; }
    public string SeasonName { get; set; } = string.Empty;
    public int CaptainId { get; set; }
    public string CaptainName { get; set; } = string.Empty;
}

public class CreateTeamDto
{
    public required string Name { get; set; }
    public int SeasonId { get; set; }
    public int CaptainId { get; set; }
}
