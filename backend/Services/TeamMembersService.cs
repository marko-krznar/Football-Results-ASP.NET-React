using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class TeamMembersService(AppDbContext context) : ITeamMembersService
{
    private readonly AppDbContext _context = context;

    public async Task<List<TeamMemberDto>> GetTeamMembers(int teamId)
    {
        return await _context.TeamMembers
            .Where(tm => tm.TeamId == teamId)
            .Include(tm => tm.Player)
            .Select(tm => new TeamMemberDto
            {
                Id = tm.Id,
                TeamId = tm.TeamId,
                PlayerId = tm.PlayerId,
                PlayerName = tm.Player != null ? tm.Player.Name : string.Empty
            })
            .ToListAsync();
    }

    public async Task<List<TeamMemberDto>> AddTeamMembers(int teamId, AddTeamMembersDto dto)
    {
        var team = await _context.Teams.FindAsync(teamId)
            ?? throw new ArgumentException("Team not found.");

        var playerIds = dto.PlayerIds.Distinct().ToList();

        // Provjeri postoje li svi igrači
        var postojeciIgraci = await _context.Players
            .Where(p => playerIds.Contains(p.Id))
            .Select(p => p.Id)
            .ToListAsync();

        var nepostojeci = playerIds.Except(postojeciIgraci).ToList();
        if (nepostojeci.Count > 0)
        {
            throw new ArgumentException($"Players not found: {string.Join(", ", nepostojeci)}.");
        }

        // Provjeri jesu li igrači već u NEKOJ DRUGOJ ekipi iste sezone
        var vecZauzeti = await _context.TeamMembers
            .Include(tm => tm.Team)
            .Where(tm => tm.Team.SeasonId == team.SeasonId
                      && tm.TeamId != teamId
                      && playerIds.Contains(tm.PlayerId))
            .Select(tm => tm.PlayerId)
            .ToListAsync();

        if (vecZauzeti.Count > 0)
        {
            throw new ArgumentException(
                $"Players already assigned to another team this season: {string.Join(", ", vecZauzeti)}.");
        }

        // Preskoči one koji su već u OVOJ ekipi (izbjegni duplikat)
        var vecUOvojEkipi = await _context.TeamMembers
            .Where(tm => tm.TeamId == teamId && playerIds.Contains(tm.PlayerId))
            .Select(tm => tm.PlayerId)
            .ToListAsync();

        var noviIgraci = playerIds.Except(vecUOvojEkipi).ToList();

        _context.TeamMembers.AddRange(
            noviIgraci.Select(playerId => new TeamMember { TeamId = teamId, PlayerId = playerId }));

        await _context.SaveChangesAsync();

        return await GetTeamMembers(teamId);
    }

    public async Task RemoveTeamMember(int teamId, int playerId)
    {
        var member = await _context.TeamMembers
            .FirstOrDefaultAsync(tm => tm.TeamId == teamId && tm.PlayerId == playerId)
            ?? throw new ArgumentException("Player is not a member of this team.");

        _context.TeamMembers.Remove(member);
        await _context.SaveChangesAsync();
    }
}