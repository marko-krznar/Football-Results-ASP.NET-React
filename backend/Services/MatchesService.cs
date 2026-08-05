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
            Location = dto.Location,
            Note = dto.Note,
        };

        _context.Matches.Add(match);
        await _context.SaveChangesAsync();

        return new MatchDto
        {
            Id = match.Id,
            SeasonId = match.SeasonId,
            SeasonName = season.Name,
            Date = match.MatchDate,
            Location = match.Location,
            Note = match.Note,
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

    public async Task<MatchDto> AddMatchWithDetails(CreateMatchWithDetailsDto dto)
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

        if (firstTeam.SeasonId != dto.SeasonId || secondTeam.SeasonId != dto.SeasonId)
        {
            throw new ArgumentException("Both teams must belong to the selected season.");
        }

        // Setovi - broj seta se ne smije ponavljati
        var setNumbers = dto.Sets.Select(s => s.SetNumber).ToList();
        if (setNumbers.Distinct().Count() != setNumbers.Count)
        {
            throw new ArgumentException("Duplicate set numbers are not allowed.");
        }

        // Igrač ne može biti upisan za obje ekipe u istoj utakmici
        var firstTeamPlayerIds = dto.FirstTeamPlayerIds.Distinct().ToList();
        var secondTeamPlayerIds = dto.SecondTeamPlayerIds.Distinct().ToList();
        var preklapanje = firstTeamPlayerIds.Intersect(secondTeamPlayerIds).ToList();
        if (preklapanje.Count > 0)
        {
            throw new ArgumentException(
                $"Players cannot play for both teams: {string.Join(", ", preklapanje)}.");
        }

        var sviIgraciId = firstTeamPlayerIds.Concat(secondTeamPlayerIds).Distinct().ToList();
        var postojeciIgraci = await _context.Players
            .Where(p => sviIgraciId.Contains(p.Id))
            .Select(p => p.Id)
            .ToListAsync();
        var nepostojeci = sviIgraciId.Except(postojeciIgraci).ToList();
        if (nepostojeci.Count > 0)
        {
            throw new ArgumentException($"Players not found: {string.Join(", ", nepostojeci)}.");
        }

        // Igrači moraju biti u sastavu odabrane ekipe za tu sezonu (team_members)
        var clanoviPrveEkipe = await _context.TeamMembers
            .Where(tm => tm.TeamId == dto.FirstTeamId)
            .Select(tm => tm.PlayerId)
            .ToListAsync();
        var nisuClanoviPrve = firstTeamPlayerIds.Except(clanoviPrveEkipe).ToList();
        if (nisuClanoviPrve.Count > 0)
        {
            throw new ArgumentException(
                $"Players are not members of the first team: {string.Join(", ", nisuClanoviPrve)}.");
        }

        var clanoviDrugeEkipe = await _context.TeamMembers
            .Where(tm => tm.TeamId == dto.SecondTeamId)
            .Select(tm => tm.PlayerId)
            .ToListAsync();
        var nisuClanoviDruge = secondTeamPlayerIds.Except(clanoviDrugeEkipe).ToList();
        if (nisuClanoviDruge.Count > 0)
        {
            throw new ArgumentException(
                $"Players are not members of the second team: {string.Join(", ", nisuClanoviDruge)}.");
        }

        // Sve se gradi u memoriji i sprema JEDNIM SaveChangesAsync pozivom = jedna transakcija
        var match = new Match
        {
            SeasonId = dto.SeasonId,
            MatchDate = dto.Date,
            FirstTeamId = dto.FirstTeamId,
            SecondTeamId = dto.SecondTeamId,
            Location = dto.Location,
            Note = dto.Note,
        };
        _context.Matches.Add(match);

        foreach (var s in dto.Sets)
        {
            _context.Sets.Add(new Set
            {
                Match = match,
                SetNumber = s.SetNumber,
                FirstTeamGoals = s.FirstTeamGoals,
                SecondTeamGoals = s.SecondTeamGoals
            });
        }

        foreach (var playerId in firstTeamPlayerIds)
        {
            _context.MatchPlayers.Add(new MatchPlayer
            {
                Match = match,
                TeamId = dto.FirstTeamId,
                PlayerId = playerId
            });
        }

        foreach (var playerId in secondTeamPlayerIds)
        {
            _context.MatchPlayers.Add(new MatchPlayer
            {
                Match = match,
                TeamId = dto.SecondTeamId,
                PlayerId = playerId
            });
        }

        await _context.SaveChangesAsync();

        return await GetMatchById(match.Id);
    }

    private static MatchDto ToDto(Match m)
    {
        var firstTeamSetsWon = m.Sets.Count(s => 
            s.FirstTeamGoals >= 6 && 
            s.FirstTeamGoals - s.SecondTeamGoals >= 2);

        var secondTeamSetsWon = m.Sets.Count(s => 
            s.SecondTeamGoals >= 6 && 
            s.SecondTeamGoals - s.FirstTeamGoals >= 2);

        return new MatchDto
        {
            Id = m.Id,
            SeasonId = m.SeasonId,
            SeasonName = m.Season != null ? m.Season.Name : string.Empty,
            Date = m.MatchDate,
            Location = m.Location,
            Note = m.Note,
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

    public async Task<MatchDisplayDto> GetMatchDisplay(int id)
    {
        var match = await _context.Matches
            .Include(m => m.FirstTeam)
            .Include(m => m.SecondTeam)
            .Include(m => m.Sets)
            .Include(m => m.MatchPlayers)
                .ThenInclude(mp => mp.Player)
            .FirstOrDefaultAsync(m => m.Id == id)
            ?? throw new ArgumentException("Match not found.");

        return ToDisplayDto(match);
    }

    public async Task<List<MatchDisplayDto>> GetAllMatchesDisplay()
    {
        var matches = await _context.Matches
            .Include(m => m.FirstTeam)
            .Include(m => m.SecondTeam)
            .Include(m => m.Sets)
            .Include(m => m.MatchPlayers)
                .ThenInclude(mp => mp.Player)
            .OrderByDescending(m => m.MatchDate)
            .ToListAsync();

        return matches.Select(ToDisplayDto).ToList();
    }

    private static MatchDisplayDto ToDisplayDto(Match m)
    {
        var sortedSets = m.Sets.OrderBy(s => s.SetNumber).ToList();
        var totalSets = sortedSets.Count;

        // Podaci o igračima za prvi i drugi tim
        var firstTeamPlayers = m.MatchPlayers
            .Where(mp => mp.TeamId == m.FirstTeamId && mp.Player != null)
            .Select(mp => mp.Player.Name)
            .ToList();

        var secondTeamPlayers = m.MatchPlayers
            .Where(mp => mp.TeamId == m.SecondTeamId && mp.Player != null)
            .Select(mp => mp.Player.Name)
            .ToList();

        // Osvojeni setovi
        var firstTeamSetsWon = sortedSets.Count(s => 
            s.FirstTeamGoals >= 6 && 
            s.FirstTeamGoals - s.SecondTeamGoals >= 2);
        var secondTeamSetsWon = sortedSets.Count(s => 
            s.SecondTeamGoals >= 6 && 
            s.SecondTeamGoals - s.FirstTeamGoals >= 2);

        // Ukupni golovi
        var firstTeamTotalGoals = sortedSets.Sum(s => s.FirstTeamGoals);
        var secondTeamTotalGoals = sortedSets.Sum(s => s.SecondTeamGoals);

        return new MatchDisplayDto
        {
            Id = m.Id,
            Date = m.MatchDate,
            Location = m.Location,
            Note = m.Note,
            TotalSets = totalSets,
            FirstTeam = new MatchTeamDisplayDto
            {
                TeamId = m.FirstTeamId,
                TeamName = m.FirstTeam?.Name ?? string.Empty,
                PlayerNames = firstTeamPlayers,
                GoalsPerSet = sortedSets.Select(s => s.FirstTeamGoals).ToList(),
                SetsWon = firstTeamSetsWon,
                TotalGoals = firstTeamTotalGoals
            },
            SecondTeam = new MatchTeamDisplayDto
            {
                TeamId = m.SecondTeamId,
                TeamName = m.SecondTeam?.Name ?? string.Empty,
                PlayerNames = secondTeamPlayers,
                GoalsPerSet = sortedSets.Select(s => s.SecondTeamGoals).ToList(),
                SetsWon = secondTeamSetsWon,
                TotalGoals = secondTeamTotalGoals
            }
        };
    }

    public async Task DeleteMatch(int id)
    {
        var match = await _context.Matches.FindAsync(id)
            ?? throw new ArgumentException("Match not found.");

        _context.Matches.Remove(match);
        await _context.SaveChangesAsync();
    }

    public async Task<MatchDto> UpdateMatch(int id, UpdateMatchDto dto)
    {
        var match = await _context.Matches
            .Include(m => m.Season)
            .Include(m => m.FirstTeam)
            .Include(m => m.SecondTeam)
            .Include(m => m.Sets)
            .FirstOrDefaultAsync(m => m.Id == id)
            ?? throw new ArgumentException("Match not found.");

        match.MatchDate = dto.Date;
        match.Location = dto.Location;
        match.Note = dto.Note;

        await _context.SaveChangesAsync();
        return ToDto(match);
    }

    public async Task<MatchDto> UpdateMatchWithDetails(int id, UpdateMatchWithDetailsDto dto)
    {
        var match = await _context.Matches
            .Include(m => m.Season)
            .Include(m => m.FirstTeam)
            .Include(m => m.SecondTeam)
            .Include(m => m.Sets)
            .Include(m => m.MatchPlayers)
            .FirstOrDefaultAsync(m => m.Id == id)
            ?? throw new ArgumentException("Match not found.");

        // Validacije
        var setNumbers = dto.Sets.Select(s => s.SetNumber).ToList();
        if (setNumbers.Distinct().Count() != setNumbers.Count)
        {
            throw new ArgumentException("Duplicate set numbers are not allowed.");
        }

        var firstTeamPlayerIds = dto.FirstTeamPlayerIds.Distinct().ToList();
        var secondTeamPlayerIds = dto.SecondTeamPlayerIds.Distinct().ToList();
        var preklapanje = firstTeamPlayerIds.Intersect(secondTeamPlayerIds).ToList();
        if (preklapanje.Count > 0)
        {
            throw new ArgumentException($"Players cannot play for both teams: {string.Join(", ", preklapanje)}.");
        }

        var sviIgraciId = firstTeamPlayerIds.Concat(secondTeamPlayerIds).Distinct().ToList();
        var postojeciIgraci = await _context.Players
            .Where(p => sviIgraciId.Contains(p.Id))
            .Select(p => p.Id)
            .ToListAsync();
        var nepostojeci = sviIgraciId.Except(postojeciIgraci).ToList();
        if (nepostojeci.Count > 0)
        {
            throw new ArgumentException($"Players not found: {string.Join(", ", nepostojeci)}.");
        }

        // Igrači moraju biti u sastavu odabranih ekipa
        var clanoviPrveEkipe = await _context.TeamMembers
            .Where(tm => tm.TeamId == match.FirstTeamId)
            .Select(tm => tm.PlayerId)
            .ToListAsync();
        var nisuClanoviPrve = firstTeamPlayerIds.Except(clanoviPrveEkipe).ToList();
        if (nisuClanoviPrve.Count > 0)
        {
            throw new ArgumentException($"Players are not members of the first team: {string.Join(", ", nisuClanoviPrve)}.");
        }

        var clanoviDrugeEkipe = await _context.TeamMembers
            .Where(tm => tm.TeamId == match.SecondTeamId)
            .Select(tm => tm.PlayerId)
            .ToListAsync();
        var nisuClanoviDruge = secondTeamPlayerIds.Except(clanoviDrugeEkipe).ToList();
        if (nisuClanoviDruge.Count > 0)
        {
            throw new ArgumentException($"Players are not members of the second team: {string.Join(", ", nisuClanoviDruge)}.");
        }

        // 1. Ažuriranje osnovnih podataka
        match.MatchDate = dto.Date;
        match.Location = dto.Location;
        match.Note = dto.Note;

        // 2. Ažuriranje setova (obriši stare i dodaj nove)
        _context.Sets.RemoveRange(match.Sets);
        foreach (var s in dto.Sets)
        {
            _context.Sets.Add(new Set
            {
                MatchId = match.Id,
                SetNumber = s.SetNumber,
                FirstTeamGoals = s.FirstTeamGoals,
                SecondTeamGoals = s.SecondTeamGoals
            });
        }

        // 3. Ažuriranje igrača (obriši stare i dodaj nove)
        _context.MatchPlayers.RemoveRange(match.MatchPlayers);
        foreach (var playerId in firstTeamPlayerIds)
        {
            _context.MatchPlayers.Add(new MatchPlayer
            {
                MatchId = match.Id,
                TeamId = match.FirstTeamId,
                PlayerId = playerId
            });
        }
        foreach (var playerId in secondTeamPlayerIds)
        {
            _context.MatchPlayers.Add(new MatchPlayer
            {
                MatchId = match.Id,
                TeamId = match.SecondTeamId,
                PlayerId = playerId
            });
        }

        await _context.SaveChangesAsync();
        return await GetMatchById(match.Id);
    }
}