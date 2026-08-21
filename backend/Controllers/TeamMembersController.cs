using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/teams/{teamId}/members")]
[ApiController]
public class TeamMembersController(ITeamMembersService teamMembersService) : ControllerBase
{
    private readonly ITeamMembersService _teamMembersService = teamMembersService;

    [HttpGet]
    public async Task<IActionResult> GetTeamMembers(int teamId)
    {
        var members = await _teamMembersService.GetTeamMembers(teamId);
        return Ok(members);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> AddTeamMembers(int teamId, [FromBody] AddTeamMembersDto dto)
    {
        var members = await _teamMembersService.AddTeamMembers(teamId, dto);
        return Ok(members);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{playerId}")]
    public async Task<IActionResult> RemoveTeamMember(int teamId, int playerId)
    {
        await _teamMembersService.RemoveTeamMember(teamId, playerId);
        return NoContent();
    }
}