namespace backend.Models;

public class SeasonTeamScoreDto
{
    public int TeamId { get; set; }
    public string TeamName { get; set; } = string.Empty;
    public int TotalSetsWon { get; set; }
}

public class SeasonScoreDto
{
    public int SeasonId { get; set; }
    public SeasonTeamScoreDto FirstTeam { get; set; } = new();
    public SeasonTeamScoreDto SecondTeam { get; set; } = new();
}