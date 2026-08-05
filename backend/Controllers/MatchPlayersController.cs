using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/matches/{matchId}/players")]
[ApiController]
public class MatchPlayersController(IMatchPlayersService matchPlayersService) : ControllerBase
{
    private readonly IMatchPlayersService _matchPlayersService = matchPlayersService;

    [HttpGet]
    public async Task<IActionResult> GetMatchPlayers(int matchId)
    {
        try
        {
            var players = await _matchPlayersService.GetMatchPlayers(matchId);
            return Ok(players);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [Authorize]
    [HttpPut]
    public async Task<IActionResult> SetMatchPlayers(int matchId, [FromBody] SetMatchPlayersDto dto)
    {
        try
        {
            var players = await _matchPlayersService.SetMatchPlayers(matchId, dto);
            return Ok(players);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [Authorize]
    [HttpDelete("{playerId}")]
    public async Task<IActionResult> RemoveMatchPlayer(int matchId, int playerId)
    {
        try
        {
            await _matchPlayersService.RemoveMatchPlayer(matchId, playerId);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}