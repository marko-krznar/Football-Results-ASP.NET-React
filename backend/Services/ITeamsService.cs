using backend.Models;

namespace backend.Services;

public interface ITeamsService
{
    Task<List<TeamDto>> GetTeams();
    Task<TeamDto> AddTeam(CreateTeamDto dto);
}
