using backend.Models;

namespace backend.Services;

public interface ISeasonsService
{
    Task<List<SeasonDto>> GetSeasons();
    Task<SeasonDto> AddSeason(CreateSeasonDto dto);
}
