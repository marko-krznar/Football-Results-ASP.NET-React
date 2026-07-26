using System;

namespace backend.Entities;

public class Set
{
    public int Id { get; set; }
    public int SetNumber { get; set; }
    public int FirstTeamGoals { get; set; }
    public int SecondTeamGoals { get; set; }
    public int MatchId { get; set; }

    public Match? Match { get; set; }
}
