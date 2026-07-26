namespace backend.Models;

public class MatchPlayerDto
{
    public int Id { get; set; }
    public int MatchId { get; set; }
    public int TeamId { get; set; }
    public int PlayerId { get; set; }
    public string PlayerName { get; set; } = string.Empty;
}

public class SetMatchPlayersDto
{
    public required int TeamId { get; set; }
    public required List<int> PlayerIds { get; set; }
}