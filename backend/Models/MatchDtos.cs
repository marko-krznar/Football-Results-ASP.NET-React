namespace backend.DTOs;

public class PlayerDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsCaptain { get; set; }
}

public class MatchSetDto
{
    public int Id { get; set; }
    public int SetNumber { get; set; }
    public int BlackScore { get; set; }
    public int WhiteScore { get; set; }
    public string Winner { get; set; } = string.Empty;
}

public class MatchSessionDto
{
    public int Id { get; set; }
    public DateTime PlayedAt { get; set; }
    public IEnumerable<MatchSetDto> Sets { get; set; } = [];
    public string OverallScore { get; set; } = string.Empty;
    public IEnumerable<PlayerDto> WhiteTeam { get; set; } = [];
    public IEnumerable<PlayerDto> BlackTeam { get; set; } = [];
}
