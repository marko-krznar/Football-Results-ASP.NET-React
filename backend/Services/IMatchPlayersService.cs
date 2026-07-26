using backend.Models;

namespace backend.Services;

public interface IMatchPlayersService
{
    Task<List<MatchPlayerDto>> GetMatchPlayers(int matchId);
    Task<List<MatchPlayerDto>> SetMatchPlayers(int matchId, SetMatchPlayersDto dto);
    Task RemoveMatchPlayer(int matchId, int playerId);
}