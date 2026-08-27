using backend.Data;
using backend.Entities;
using backend.Models;
using backend.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace backend.Tests.Services;

public class MatchesServiceTests : IDisposable
{
    private readonly AppDbContext _context;
    private readonly MatchesService _service;

    public MatchesServiceTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _context = new AppDbContext(options);
        _service = new MatchesService(_context);
    }

    [Fact]
    public async Task AddMatch_ShouldThrow_WhenTeamPlaysAgainstItself()
    {
        // Arrange
        var season = new Season { Year = 2024, Type = SeasonType.Autumn };
        _context.Seasons.Add(season);
        await _context.SaveChangesAsync();

        var dto = new CreateMatchDto
        {
            SeasonId = season.Id,
            Date = DateOnly.FromDateTime(DateTime.Today),
            FirstTeamId = 1,
            SecondTeamId = 1,
            Location = "SD Hotanj"
        };

        // Act
        var act = async () => await _service.AddMatch(dto);

        // Assert
        await act.Should().ThrowAsync<ArgumentException>()
            .WithMessage("A team cannot play against itself.");
    }

    [Fact]
    public async Task AddMatchWithDetails_ShouldThrow_WhenDuplicateSetNumbers()
    {
        // Arrange
        var season = new Season { Year = 2024, Type = SeasonType.Autumn };
        var player1 = new Player { Name = "Igrač 1" };
        var player2 = new Player { Name = "Igrač 2" };
        _context.Seasons.Add(season);
        _context.Players.AddRange(player1, player2);
        await _context.SaveChangesAsync();

        var team1 = new Team { Name = "Crni", SeasonId = season.Id, CaptainId = player1.Id };
        var team2 = new Team { Name = "Bijeli", SeasonId = season.Id, CaptainId = player2.Id };
        _context.Teams.AddRange(team1, team2);
        await _context.SaveChangesAsync();

        _context.TeamMembers.Add(new TeamMember { TeamId = team1.Id, PlayerId = player1.Id });
        _context.TeamMembers.Add(new TeamMember { TeamId = team2.Id, PlayerId = player2.Id });
        await _context.SaveChangesAsync();

        var dto = new CreateMatchWithDetailsDto
        {
            SeasonId = season.Id,
            Date = DateOnly.FromDateTime(DateTime.Today),
            FirstTeamId = team1.Id,
            SecondTeamId = team2.Id,
            Sets = new List<UpsertSetDto>
            {
                new() { SetNumber = 1, FirstTeamGoals = 6, SecondTeamGoals = 3 },
                new() { SetNumber = 1, FirstTeamGoals = 3, SecondTeamGoals = 6 } // Duplicirani broj seta
            },
            FirstTeamPlayerIds = [player1.Id],
            SecondTeamPlayerIds = [player2.Id]
        };

        // Act
        var act = async () => await _service.AddMatchWithDetails(dto);

        // Assert
        await act.Should().ThrowAsync<ArgumentException>()
            .WithMessage("Duplicate set numbers are not allowed.");
    }

    [Fact]
    public async Task AddMatchWithDetails_ShouldThrow_WhenPlayerInBothTeams()
    {
        // Arrange
        var season = new Season { Year = 2024, Type = SeasonType.Autumn };
        var player1 = new Player { Name = "Igrač 1" };
        _context.Seasons.Add(season);
        _context.Players.Add(player1);
        await _context.SaveChangesAsync();

        var team1 = new Team { Name = "Crni", SeasonId = season.Id, CaptainId = player1.Id };
        var team2 = new Team { Name = "Bijeli", SeasonId = season.Id, CaptainId = player1.Id };
        _context.Teams.AddRange(team1, team2);
        await _context.SaveChangesAsync();

        _context.TeamMembers.Add(new TeamMember { TeamId = team1.Id, PlayerId = player1.Id });
        _context.TeamMembers.Add(new TeamMember { TeamId = team2.Id, PlayerId = player1.Id });
        await _context.SaveChangesAsync();

        var dto = new CreateMatchWithDetailsDto
        {
            SeasonId = season.Id,
            Date = DateOnly.FromDateTime(DateTime.Today),
            FirstTeamId = team1.Id,
            SecondTeamId = team2.Id,
            Sets = [],
            FirstTeamPlayerIds = [player1.Id],
            SecondTeamPlayerIds = [player1.Id] // Igrač u obje ekipe
        };

        // Act
        var act = async () => await _service.AddMatchWithDetails(dto);

        // Assert
        await act.Should().ThrowAsync<ArgumentException>()
            .WithMessage($"Players cannot play for both teams: {player1.Id}.");
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
