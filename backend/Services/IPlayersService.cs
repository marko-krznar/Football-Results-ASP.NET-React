using backend.Models;

namespace backend.Services;

public interface IPlayersService
{
    Task<List<PlayerDto>> GetPlayers();
    Task<PlayerDto> AddPlayer(CreatePlayerDto dto);
    Task<PlayerDto> UpdatePlayer(int id, UpdatePlayerDto dto);
}