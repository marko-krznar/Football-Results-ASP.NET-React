namespace backend.Models;

public class MatchDto
{
    public int Id { get; set; }
    public int SeasonId { get; set; }
    public string SeasonName { get; set; } = string.Empty;
    public DateOnly Date { get; set; }
    public string? Location { get; set; }
    public int FirstTeamId { get; set; }
    public string FirstTeamName { get; set; } = string.Empty;
    public int SecondTeamId { get; set; }
    public string SecondTeamName { get; set; } = string.Empty;
    public string? Note { get; set; }
    public int FirstTeamSetsWon { get; set; }
    public int SecondTeamSetsWon { get; set; }
    public int FirstTeamTotalGoals { get; set; }
    public int SecondTeamTotalGoals { get; set; }
}

public class CreateMatchDto
{
    public required int SeasonId { get; set; }
    public required DateOnly Date { get; set; }
    public string? Location { get; set; }
    public required int FirstTeamId { get; set; }
    public required int SecondTeamId { get; set; }
    public string? Note { get; set; }
}

public class CreateMatchWithDetailsDto
{
    public required int SeasonId { get; set; }
    public required DateOnly Date { get; set; }
    public string? Location { get; set; }
    public required int FirstTeamId { get; set; }
    public required int SecondTeamId { get; set; }
    public string? Note { get; set; }
    public List<UpsertSetDto> Sets { get; set; } = [];
    public List<int> FirstTeamPlayerIds { get; set; } = [];
    public List<int> SecondTeamPlayerIds { get; set; } = [];
}

public class UpdateMatchDto
{
    public required DateOnly Date { get; set; }
    public string? Location { get; set; }
    public string? Note { get; set; }
}

public class UpdateMatchWithDetailsDto
{
    public required DateOnly Date { get; set; }
    public string? Location { get; set; }
    public string? Note { get; set; }
    public List<UpsertSetDto> Sets { get; set; } = [];
    public List<int> FirstTeamPlayerIds { get; set; } = [];
    public List<int> SecondTeamPlayerIds { get; set; } = [];
}