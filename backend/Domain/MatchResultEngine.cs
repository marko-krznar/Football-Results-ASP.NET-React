namespace backend.Domain;

public static class MatchResultEngine
{
    /// <summary>
    /// Evaluates if a given team score and opponent score qualify as a set victory.
    /// Rule: At least 6 goals scored AND at least a 2-goal difference.
    /// </summary>
    public static bool IsSetWinner(int teamGoals, int opponentGoals)
    {
        return teamGoals >= 6 && (teamGoals - opponentGoals) >= 2;
    }

    /// <summary>
    /// Calculates aggregate stats (sets won, total goals) for a pair of scores in a single set.
    /// </summary>
    public static (bool firstTeamWon, bool secondTeamWon) EvaluateSet(int firstTeamGoals, int secondTeamGoals)
    {
        bool firstWon = IsSetWinner(firstTeamGoals, secondTeamGoals);
        bool secondWon = IsSetWinner(secondTeamGoals, firstTeamGoals);
        return (firstWon, secondWon);
    }
}
