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
        try
        {
            var members = await _teamMembersService.GetTeamMembers(teamId);
            return Ok(members);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [Authorize]
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

    [Authorize]
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