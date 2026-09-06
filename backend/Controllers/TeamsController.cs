using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

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

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> AddTeam([FromBody] CreateTeamDto dto)
    {
        var team = await _teamsService.AddTeam(dto);
        return CreatedAtAction(nameof(GetTeams), new { id = team.Id }, team);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTeam(int id, [FromBody] UpdateTeamDto dto)
    {
        var updated = await _teamsService.UpdateTeam(id, dto);
        return Ok(updated);
    }
}
