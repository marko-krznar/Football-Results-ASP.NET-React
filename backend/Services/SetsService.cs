using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class SetsService(AppDbContext context) : ISetsService
{
    private readonly AppDbContext _context = context;

    public async Task<List<SetDto>> GetSets(int matchId)
    {
        return await _context.Sets
            .Where(s => s.MatchId == matchId)
            .OrderBy(s => s.SetNumber)
            .Select(s => new SetDto
            {
                Id = s.Id,
                MatchId = s.MatchId,
                SetNumber = s.SetNumber,
                FirstTeamGoals = s.FirstTeamGoals,
                SecondTeamGoals = s.SecondTeamGoals
            })
            .ToListAsync();
    }

    public async Task<SetDto> AddOrUpdateSet(int matchId, UpsertSetDto dto)
    {
        _ = await _context.Matches.FindAsync(matchId)
            ?? throw new ArgumentException("Match not found.");

        var set = await _context.Sets
            .FirstOrDefaultAsync(s => s.MatchId == matchId && s.SetNumber == dto.SetNumber);

        if (set is null)
        {
            set = new Set
            {
                MatchId = matchId,
                SetNumber = dto.SetNumber,
                FirstTeamGoals = dto.FirstTeamGoals,
                SecondTeamGoals = dto.SecondTeamGoals
            };
            _context.Sets.Add(set);
        }
        else
        {
            set.FirstTeamGoals = dto.FirstTeamGoals;
            set.SecondTeamGoals = dto.SecondTeamGoals;
        }

        await _context.SaveChangesAsync();

        return new SetDto
        {
            Id = set.Id,
            MatchId = set.MatchId,
            SetNumber = set.SetNumber,
            FirstTeamGoals = set.FirstTeamGoals,
            SecondTeamGoals = set.SecondTeamGoals
        };
    }

    public async Task DeleteSet(int matchId, int setNumber)
    {
        var set = await _context.Sets
            .FirstOrDefaultAsync(s => s.MatchId == matchId && s.SetNumber == setNumber)
            ?? throw new ArgumentException("Set not found.");

        _context.Sets.Remove(set);
        await _context.SaveChangesAsync();
    }
}