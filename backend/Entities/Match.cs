using System;

namespace backend.Entities;

public class Match
{
    public int Id { get; set; }
    public DateOnly MatchDate { get; set; }
    public int SeasonId { get; set; }
    public int FirstTeamId { get; set; }
    public int SecondTeamId { get; set; }

    public Season? Season { get; set; }
    public Team? FirstTeam { get; set; }
    public Team? SecondTeam { get; set; }
    public ICollection<Set> Sets { get; set; } = [];
    public ICollection<MatchPlayer> MatchPlayers { get; set; } = [];
}