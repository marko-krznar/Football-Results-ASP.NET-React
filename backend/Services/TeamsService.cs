using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class TeamsService(AppDbContext context) : ITeamsService
{
    private readonly AppDbContext _context = context;

    public async Task<List<TeamDto>> GetTeams()
    {
        return await _context.Teams
            .Include(t => t.Season)
            .Include(t => t.Captain)
            .Select(t => new TeamDto
            {
                Id = t.Id,
                Name = t.Name,
                SeasonId = t.SeasonId,
                SeasonName = t.Season != null ? t.Season.Name : string.Empty,
                CaptainId = t.CaptainId,
                CaptainName = t.Captain != null ? t.Captain.Name : string.Empty
            })
            .ToListAsync();
    }

    public async Task<TeamDto> AddTeam(CreateTeamDto dto)
    {
        // Provjeri postoji li sezona
        var season = await _context.Seasons.FindAsync(dto.SeasonId) 
            ?? throw new ArgumentException("Season not found.");

        // Provjeri postoji li igrač
        var captain = await _context.Players.FindAsync(dto.CaptainId) 
            ?? throw new ArgumentException("Player (Captain) not found.");

        // Provjeri jedinstvenost imena unutar sezone
        var teamExists = await _context.Teams.AnyAsync(t => t.SeasonId == dto.SeasonId && t.Name.ToLower() == dto.Name.ToLower());
        if (teamExists)
        {
            throw new ArgumentException($"Team with name '{dto.Name}' already exists in this season.");
        }

        var team = new Team
        {
            Name = dto.Name,
            SeasonId = dto.SeasonId,
            CaptainId = dto.CaptainId
        };

        _context.Teams.Add(team);
        await _context.SaveChangesAsync();

        return new TeamDto
        {
            Id = team.Id,
            Name = team.Name,
            SeasonId = team.SeasonId,
            SeasonName = season.Name,
            CaptainId = team.CaptainId,
            CaptainName = captain.Name
        };
    }

    public async Task<TeamDto> UpdateTeam(int id, UpdateTeamDto dto)
    {
        var team = await _context.Teams.FindAsync(id)
            ?? throw new ArgumentException("Team not found.");

        var season = await _context.Seasons.FindAsync(dto.SeasonId) 
            ?? throw new ArgumentException("Season not found.");

        var captain = await _context.Players.FindAsync(dto.CaptainId) 
            ?? throw new ArgumentException("Player (Captain) not found.");

        var teamExists = await _context.Teams.AnyAsync(t => t.Id != id && t.SeasonId == dto.SeasonId && t.Name.ToLower() == dto.Name.ToLower());
        if (teamExists)
        {
            throw new ArgumentException($"Team with name '{dto.Name}' already exists in this season.");
        }

        team.Name = dto.Name;
        team.SeasonId = dto.SeasonId;
        team.CaptainId = dto.CaptainId;

        await _context.SaveChangesAsync();

        return new TeamDto
        {
            Id = team.Id,
            Name = team.Name,
            SeasonId = team.SeasonId,
            SeasonName = season.Name,
            CaptainId = team.CaptainId,
            CaptainName = captain.Name
        };
    }
}
