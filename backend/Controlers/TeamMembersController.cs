using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controlers;

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

    [HttpPost]
    public async Task<IActionResult> AddTeamMembers(int teamId, [FromBody] AddTeamMembersDto dto)
    {
        try
        {
            var members = await _teamMembersService.AddTeamMembers(teamId, dto);
            return Ok(members);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{playerId}")]
    public async Task<IActionResult> RemoveTeamMember(int teamId, int playerId)
    {
        try
        {
            await _teamMembersService.RemoveTeamMember(teamId, playerId);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}