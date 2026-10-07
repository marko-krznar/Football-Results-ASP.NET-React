using backend.Domain;
using Xunit;

namespace backend.Tests.Domain;

public class MatchResultEngineTests
{
    [Theory]
    [InlineData(6, 0, true)]
    [InlineData(6, 4, true)]
    [InlineData(7, 5, true)]
    [InlineData(5, 3, false)] // Less than 6 goals
    [InlineData(6, 5, false)] // Less than 2 goals difference
    [InlineData(6, 6, false)]
    public void IsSetWinner_ShouldEvaluateCorrectly(int teamGoals, int opponentGoals, bool expected)
    {
        var result = MatchResultEngine.IsSetWinner(teamGoals, opponentGoals);
        Assert.Equal(expected, result);
    }
}
