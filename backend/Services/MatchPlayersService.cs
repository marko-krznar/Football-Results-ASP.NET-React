using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class MatchPlayersService(AppDbContext context) : IMatchPlayersService
{
    private readonly AppDbContext _context = context;

    public async Task<List<MatchPlayerDto>> GetMatchPlayers(int matchId)
    {
        return await _context.MatchPlayers
            .Where(mp => mp.MatchId == matchId)
            .Include(mp => mp.Player)
            .Select(mp => new MatchPlayerDto
            {
                Id = mp.Id,
                MatchId = mp.MatchId,
                TeamId = mp.TeamId,
                PlayerId = mp.PlayerId,
                PlayerName = mp.Player != null ? mp.Player.Name : string.Empty
            })
            .ToListAsync();
    }

    public async Task<List<MatchPlayerDto>> SetMatchPlayers(int matchId, SetMatchPlayersDto dto)
    {
        var match = await _context.Matches.FindAsync(matchId)
            ?? throw new ArgumentException("Match not found.");

        // Budući da postoje samo 2 ekipe (bijeli/crni), teamId mora biti jedna od te dvije
        if (dto.TeamId != match.FirstTeamId && dto.TeamId != match.SecondTeamId)
        {
            throw new ArgumentException("Team is not part of this match.");
        }

        var playerIds = dto.PlayerIds.Distinct().ToList();

        var postojeciIgraci = await _context.Players
            .Where(p => playerIds.Contains(p.Id))
            .Select(p => p.Id)
            .ToListAsync();

        var nepostojeci = playerIds.Except(postojeciIgraci).ToList();
        if (nepostojeci.Count > 0)
        {
            throw new ArgumentException($"Players not found: {string.Join(", ", nepostojeci)}.");
        }

        // Igrač ne može biti upisan za obje ekipe u istoj utakmici
        var vecUDrugojEkipi = await _context.MatchPlayers
            .Where(mp => mp.MatchId == matchId
                      && mp.TeamId != dto.TeamId
                      && playerIds.Contains(mp.PlayerId))
            .Select(mp => mp.PlayerId)
            .ToListAsync();

        if (vecUDrugojEkipi.Count > 0)
        {
            throw new ArgumentException(
                $"Players already assigned to the other team in this match: {string.Join(", ", vecUDrugojEkipi)}.");
        }

        // "Set" pristup - zamijeni cijeli sastav za tu ekipu/utakmicu novim odabirom iz modala
        var postojeciZaEkipu = _context.MatchPlayers
            .Where(mp => mp.MatchId == matchId && mp.TeamId == dto.TeamId);

        _context.MatchPlayers.RemoveRange(postojeciZaEkipu);

        _context.MatchPlayers.AddRange(
            playerIds.Select(playerId => new MatchPlayer
            {
                MatchId = matchId,
                TeamId = dto.TeamId,
                PlayerId = playerId
            }));

        await _context.SaveChangesAsync();

        return await GetMatchPlayers(matchId);
    }

    public async Task RemoveMatchPlayer(int matchId, int playerId)
    {
        var entry = await _context.MatchPlayers
            .FirstOrDefaultAsync(mp => mp.MatchId == matchId && mp.PlayerId == playerId)
            ?? throw new ArgumentException("Player is not part of this match.");

        _context.MatchPlayers.Remove(entry);
        await _context.SaveChangesAsync();
    }
}