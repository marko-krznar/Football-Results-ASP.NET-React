namespace backend.Models;

public class MatchTeamDisplayDto
{
    public int TeamId { get; set; }
    public string TeamName { get; set; } = string.Empty;
    public List<string> PlayerNames { get; set; } = [];
    public List<int> GoalsPerSet { get; set; } = [];
    public int SetsWon { get; set; }
    public int TotalGoals { get; set; }
}

public class MatchDisplayDto
{
    public int Id { get; set; }
    public int SeasonId { get; set; }
    public string SeasonName { get; set; } = string.Empty;
    public DateOnly Date { get; set; }
    public string? Location { get; set; }
    public string? Note { get; set; }
    public bool CountsForStandings { get; set; } = true;
    public int TotalSets { get; set; }
    public MatchTeamDisplayDto FirstTeam { get; set; } = new();
    public MatchTeamDisplayDto SecondTeam { get; set; } = new();
}
