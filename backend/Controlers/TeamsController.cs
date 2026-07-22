using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controlers;

[Route("api/teams")]
[ApiController]
public class TeamsController(ITeamsService teamsService) : ControllerBase
{
    private readonly ITeamsService _teamsService = teamsService;

    [HttpGet]
    public async Task<IActionResult> GetTeams()
    {
        var teams = await _teamsService.GetTeams();
        return Ok(teams);
    }

    [HttpPost]
    public async Task<IActionResult> AddTeam([FromBody] CreateTeamDto dto)
    {
        try
        {
            var team = await _teamsService.AddTeam(dto);
            return CreatedAtAction(nameof(GetTeams), new { id = team.Id }, team);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
