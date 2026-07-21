using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controlers;

[Route("api/players")]
[ApiController]
public class PlayersController(IPlayersService playersService) : ControllerBase
{
    private readonly IPlayersService _playersService = playersService;

    [HttpGet]
    public async Task<IActionResult> GetPlayers()
    {
        var players = await _playersService.GetPlayers();
        return Ok(players);
    }

    [HttpPost]
    public async Task<IActionResult> AddPlayer([FromBody] CreatePlayerDto dto)
    {
        var player = await _playersService.AddPlayer(dto);
        return CreatedAtAction(nameof(GetPlayers), new { id = player.Id }, player);
    }
}

