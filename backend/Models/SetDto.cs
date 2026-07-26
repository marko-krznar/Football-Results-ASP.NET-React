namespace backend.Models;

public class SetDto
{
    public int Id { get; set; }
    public int MatchId { get; set; }
    public int SetNumber { get; set; }
    public int FirstTeamGoals { get; set; }
    public int SecondTeamGoals { get; set; }
}

public class UpsertSetDto
{
    public required int SetNumber { get; set; }
    public required int FirstTeamGoals { get; set; }
    public required int SecondTeamGoals { get; set; }
}