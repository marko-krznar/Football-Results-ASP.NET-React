using backend.Models;

namespace backend.Services;

public interface ISetsService
{
    Task<List<SetDto>> GetSets(int matchId);
    Task<SetDto> AddOrUpdateSet(int matchId, UpsertSetDto dto);
    Task DeleteSet(int matchId, int setNumber);
}