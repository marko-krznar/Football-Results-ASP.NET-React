using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class MatchesService(AppDbContext context) : IMatchesService
{
    private readonly AppDbContext _context = context;

    public async Task<List<MatchDto>> GetMatches()
    {
        return await _context.Matches
            .Include(m => m.Season)
            .Include(m => m.FirstTeam)
            .Include(m => m.SecondTeam)
            .Include(m => m.Sets)
            .Select(m => ToDto(m))
            .ToListAsync();
    }

    public async Task<MatchDto> GetMatchById(int id)
    {
        var match = await _context.Matches
            .Include(m => m.Season)
            .Include(m => m.FirstTeam)
            .Include(m => m.SecondTeam)
            .Include(m => m.Sets)
            .FirstOrDefaultAsync(m => m.Id == id)
            ?? throw new ArgumentException("Match not found.");

        return ToDto(match);
    }

    public async Task<MatchDto> AddMatch(CreateMatchDto dto)
    {
        var season = await _context.Seasons.FindAsync(dto.SeasonId)
            ?? throw new ArgumentException("Season not found.");

        if (dto.FirstTeamId == dto.SecondTeamId)
        {
            throw new ArgumentException("A team cannot play against itself.");
        }

        var firstTeam = await _context.Teams.FindAsync(dto.FirstTeamId)
            ?? throw new ArgumentException("First team not found.");

        var secondTeam = await _context.Teams.FindAsync(dto.SecondTeamId)
            ?? throw new ArgumentException("Second team not found.");

        // Obje ekipe moraju pripadati istoj sezoni kao i utakmica
        if (firstTeam.SeasonId != dto.SeasonId || secondTeam.SeasonId != dto.SeasonId)
        {
            throw new ArgumentException("Both teams must belong to the selected season.");
        }

        var match = new Match
        {
            SeasonId = dto.SeasonId,
            MatchDate = dto.Date,
            FirstTeamId = dto.FirstTeamId,
            SecondTeamId = dto.SecondTeamId,
        };

        _context.Matches.Add(match);
        await _context.SaveChangesAsync();

        return new MatchDto
        {
            Id = match.Id,
            SeasonId = match.SeasonId,
            SeasonName = season.Name,
            Date = match.MatchDate,
            FirstTeamId = match.FirstTeamId,
            FirstTeamName = firstTeam.Name,
            SecondTeamId = match.SecondTeamId,
            SecondTeamName = secondTeam.Name,
            FirstTeamSetsWon = 0,
            SecondTeamSetsWon = 0,
            FirstTeamTotalGoals = 0,
            SecondTeamTotalGoals = 0
        };
    }

    private static MatchDto ToDto(Match m)
    {
        var firstTeamSetsWon = m.Sets.Count(s => s.FirstTeamGoals > s.SecondTeamGoals);
        var secondTeamSetsWon = m.Sets.Count(s => s.SecondTeamGoals > s.FirstTeamGoals);

        return new MatchDto
        {
            Id = m.Id,
            SeasonId = m.SeasonId,
            SeasonName = m.Season != null ? m.Season.Name : string.Empty,
            Date = m.MatchDate,
            FirstTeamId = m.FirstTeamId,
            FirstTeamName = m.FirstTeam != null ? m.FirstTeam.Name : string.Empty,
            SecondTeamId = m.SecondTeamId,
            SecondTeamName = m.SecondTeam != null ? m.SecondTeam.Name : string.Empty,
            FirstTeamSetsWon = firstTeamSetsWon,
            SecondTeamSetsWon = secondTeamSetsWon,
            FirstTeamTotalGoals = m.Sets.Sum(s => s.FirstTeamGoals),
            SecondTeamTotalGoals = m.Sets.Sum(s => s.SecondTeamGoals)
        };
    }
}