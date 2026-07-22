using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class SeasonsService(AppDbContext context) : ISeasonsService
{
    private readonly AppDbContext _context = context;

    public async Task<List<SeasonDto>> GetSeasons()
    {
        var seasons = await _context.Seasons.ToListAsync();
        return seasons.Select(s => new SeasonDto
        {
            Id = s.Id,
            Year = s.Year,
            Type = s.Type.ToString(),
            StartDate = s.StartDate,
            EndDate = s.EndDate,
            Name = s.Name
        }).ToList();
    }

    public async Task<SeasonDto> AddSeason(CreateSeasonDto dto)
    {
        if (!Enum.TryParse<SeasonType>(dto.Type, true, out var seasonType))
        {
            throw new ArgumentException("Invalid season type. Allowed values are 'Spring' or 'Autumn'.");
        }

        var season = new Season
        {
            Year = dto.Year,
            Type = seasonType,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate
        };

        _context.Seasons.Add(season);
        await _context.SaveChangesAsync();

        return new SeasonDto
        {
            Id = season.Id,
            Year = season.Year,
            Type = season.Type.ToString(),
            StartDate = season.StartDate,
            EndDate = season.EndDate,
            Name = season.Name
        };
    }
}
