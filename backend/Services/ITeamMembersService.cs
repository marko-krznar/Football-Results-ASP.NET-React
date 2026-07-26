using backend.Models;

namespace backend.Services;

public interface ITeamMembersService
{
    Task<List<TeamMemberDto>> GetTeamMembers(int teamId);
    Task<List<TeamMemberDto>> AddTeamMembers(int teamId, AddTeamMembersDto dto);
    Task RemoveTeamMember(int teamId, int playerId);
}