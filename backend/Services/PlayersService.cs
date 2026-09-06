using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class PlayersService(AppDbContext context) : IPlayersService
{
    private readonly AppDbContext _context = context;

    public async Task<List<PlayerDto>> GetPlayers()
    {
        return await _context.Players
            .Select(p => new PlayerDto
            {
                Id = p.Id,
                Name = p.Name
            })
            .ToListAsync();
    }

    public async Task<PlayerDto> AddPlayer(CreatePlayerDto dto)
    {
        var player = new Entities.Player
        {
            Name = dto.Name
        };

        _context.Players.Add(player);
        await _context.SaveChangesAsync();

        return new PlayerDto
        {
            Id = player.Id,
            Name = player.Name
        };
    }

    public async Task<PlayerDto> UpdatePlayer(int id, UpdatePlayerDto dto)
    {
        var player = await _context.Players.FindAsync(id)
            ?? throw new ArgumentException("Player not found.");

        player.Name = dto.Name;
        await _context.SaveChangesAsync();

        return new PlayerDto
        {
            Id = player.Id,
            Name = player.Name
        };
    }
}