using System;

namespace backend.Models;

public class MatchOverallModel
{
    public int Id { get; set; }
    public int BlackScore { get; set; }
    public int WhiteScore { get; set; }
    public DateTimeOffset Date { get; set; }
    public required List<SetModel> Sets { get; set; }
    public required List<PlayerModel> WhiteTeamPlayers { get; set; }
    public required List<PlayerModel> BlackTeamPlayers { get; set; }
}
