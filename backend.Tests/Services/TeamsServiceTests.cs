using backend.Data;
using backend.Entities;
using backend.Models;
using backend.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Xunit;

namespace backend.Tests.Services;

public class TeamsServiceTests : IDisposable
{
    private readonly AppDbContext _context;
    private readonly TeamsService _service;

    public TeamsServiceTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _context = new AppDbContext(options);
        _service = new TeamsService(_context);
    }

    [Fact]
    public async Task AddTeam_ShouldCreateTeam_WhenDataIsValid()
    {
        // Arrange
        var season = new Season { Year = 2024, Type = SeasonType.Autumn };
        var captain = new Player { Name = "Ivica Horvat" };
        _context.Seasons.Add(season);
        _context.Players.Add(captain);
        await _context.SaveChangesAsync();

        var dto = new CreateTeamDto
        {
            Name = "Crni",
            SeasonId = season.Id,
            CaptainId = captain.Id
        };

        // Act
        var result = await _service.AddTeam(dto);

        // Assert
        result.Name.Should().Be("Crni");
        result.SeasonName.Should().Be("Jesen 2024");
        result.CaptainName.Should().Be("Ivica Horvat");
    }

    [Fact]
    public async Task AddTeam_ShouldThrow_WhenSeasonNotFound()
    {
        // Arrange
        var captain = new Player { Name = "Test Igrač" };
        _context.Players.Add(captain);
        await _context.SaveChangesAsync();

        var dto = new CreateTeamDto { Name = "Test", SeasonId = 999, CaptainId = captain.Id };

        // Act
        var act = async () => await _service.AddTeam(dto);

        // Assert
        await act.Should().ThrowAsync<ArgumentException>()
            .WithMessage("Season not found.");
    }

    [Fact]
    public async Task AddTeam_ShouldThrow_WhenTeamNameDuplicateInSameSeason()
    {
        // Arrange
        var season = new Season { Year = 2024, Type = SeasonType.Autumn };
        var captain = new Player { Name = "Test Igrač" };
        _context.Seasons.Add(season);
        _context.Players.Add(captain);
        await _context.SaveChangesAsync();

        // Dodaj prvu ekipu
        _context.Teams.Add(new Team { Name = "Crni", SeasonId = season.Id, CaptainId = captain.Id });
        await _context.SaveChangesAsync();

        // Pokušaj dodati drugu s istim imenom (case insensitive)
        var dto = new CreateTeamDto { Name = "crni", SeasonId = season.Id, CaptainId = captain.Id };

        // Act
        var act = async () => await _service.AddTeam(dto);

        // Assert
        await act.Should().ThrowAsync<ArgumentException>()
            .WithMessage("Team with name 'crni' already exists in this season.");
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
