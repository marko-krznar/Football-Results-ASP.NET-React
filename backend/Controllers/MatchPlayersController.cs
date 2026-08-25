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
        var players = await _matchPlayersService.GetMatchPlayers(matchId);
        return Ok(players);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<IActionResult> SetMatchPlayers(int matchId, [FromBody] SetMatchPlayersDto dto)
    {
        var players = await _matchPlayersService.SetMatchPlayers(matchId, dto);
        return Ok(players);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{playerId}")]
    public async Task<IActionResult> RemoveMatchPlayer(int matchId, int playerId)
    {
        await _matchPlayersService.RemoveMatchPlayer(matchId, playerId);
        return NoContent();
    }
}