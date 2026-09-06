using backend.Models;

namespace backend.Services;

public interface ITeamsService
{
    Task<List<TeamDto>> GetTeams();
    Task<TeamDto> AddTeam(CreateTeamDto dto);
    Task<TeamDto> UpdateTeam(int id, UpdateTeamDto dto);
}
