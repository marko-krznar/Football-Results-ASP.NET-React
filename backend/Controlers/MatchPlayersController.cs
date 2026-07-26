using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controlers;

[Route("api/matches/{matchId}/players")]
[ApiController]
public class MatchPlayersController(IMatchPlayersService matchPlayersService) : ControllerBase
{
    private readonly IMatchPlayersService _matchPlayersService = matchPlayersService;

    [HttpGet]
    public async Task<IActionResult> GetMatchPlayers(int matchId)
    {
        var players = await _matchPlayersService.GetMatchPlayers(matchId);
        return Ok(players);
    }

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