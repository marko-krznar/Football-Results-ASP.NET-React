using System.Text.Json.Serialization;

namespace backend.Models;

public class Player
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsCaptain { get; set; }

    [JsonIgnore]
    public string Team { get; set; } = string.Empty;

}

public class SessionPlayer 
{
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public Player? Player { get; set; }
}

public class MatchSession 
{
    public int Id { get; set; }
    public DateTime PlayedAt { get; set; }
    public List<MatchSet> Sets { get; set; } = new();
    public List<SessionPlayer> WhiteTeam { get; set; } = new();
    public List<SessionPlayer> BlackTeam { get; set; } = new();

    public int FinalBlackSets => Sets.Count(s => s.Winner == "Black");
    public int FinalWhiteSets => Sets.Count(s => s.Winner == "White");
    public string OverallScore => $"{FinalBlackSets} : {FinalWhiteSets}";
}

public class MatchSet 
{
    public int Id { get; set; }
    public int MatchSessionId { get; set; }
    public int SetNumber { get; set; }
    public int BlackScore { get; set; }
    public int WhiteScore { get; set; }

    public string Winner 
    {
        get 
        {
            if (BlackScore >= 6 || WhiteScore >= 6) 
            {
                int diff = Math.Abs(BlackScore - WhiteScore);
                if ((BlackScore >= 5 && WhiteScore >= 5) && diff < 2) return "In Progress";
                return BlackScore > WhiteScore ? "Black" : "White";
            }
            return "In Progress";
        }
    }
}
