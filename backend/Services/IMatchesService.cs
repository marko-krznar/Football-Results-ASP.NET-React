using backend.Models;

namespace backend.Services;

public interface IMatchesService
{
    Task<List<MatchDto>> GetMatches();
    Task<MatchDto> GetMatchById(int id);
    Task<MatchDto> AddMatch(CreateMatchDto dto);
}