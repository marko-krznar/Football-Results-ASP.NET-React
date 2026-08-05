using backend.Models;

namespace backend.Services;

public interface IMatchesService
{
    Task<List<MatchDto>> GetMatches();
    Task<MatchDto> GetMatchById(int id);
    Task<MatchDto> AddMatch(CreateMatchDto dto);
    Task<MatchDto> AddMatchWithDetails(CreateMatchWithDetailsDto dto);
    Task<MatchDisplayDto> GetMatchDisplay(int id);
    Task<List<MatchDisplayDto>> GetAllMatchesDisplay();
    Task DeleteMatch(int id);
    Task<MatchDto> UpdateMatch(int id, UpdateMatchDto dto);
    Task<MatchDto> UpdateMatchWithDetails(int id, UpdateMatchWithDetailsDto dto);
}