using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/matches")]
[ApiController]
public class MatchesController(IMatchesService matchesService) : ControllerBase
{
    private readonly IMatchesService _matchesService = matchesService;

    [HttpGet]
    public async Task<IActionResult> GetMatches()
    {
        var matches = await _matchesService.GetMatches();
        return Ok(matches);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMatchById(int id)
    {
        var match = await _matchesService.GetMatchById(id);
        return Ok(match);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> AddMatch([FromBody] CreateMatchDto dto)
    {
        var match = await _matchesService.AddMatch(dto);
        return CreatedAtAction(nameof(GetMatchById), new { id = match.Id }, match);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("full")]
    public async Task<IActionResult> AddMatchWithDetails([FromBody] CreateMatchWithDetailsDto dto)
    {
        var match = await _matchesService.AddMatchWithDetails(dto);
        return CreatedAtAction(nameof(GetMatchById), new { id = match.Id }, match);
    }

    [HttpGet("display")]
    public async Task<IActionResult> GetAllMatchesDisplay([FromQuery] int? seasonId = null)
    {
        var matches = await _matchesService.GetAllMatchesDisplay(seasonId);
        return Ok(matches);
    }

    [HttpGet("{id}/display")]
    public async Task<IActionResult> GetMatchDisplay(int id)
    {
        var match = await _matchesService.GetMatchDisplay(id);
        return Ok(match);
    }

    [HttpGet("latest-match-details")]
    public async Task<IActionResult> GetLatestMatchDetails()
    {
        var match = await _matchesService.GetLatestMatchDetails();
        return Ok(match);
    }

    [HttpGet("season/{seasonId}/score")]
    public async Task<IActionResult> GetSeasonScore(int seasonId)
    {
        var score = await _matchesService.GetSeasonScore(seasonId);
        return Ok(score);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMatch(int id)
    {
        await _matchesService.DeleteMatch(id);
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMatch(int id, [FromBody] UpdateMatchDto dto)
    {
        var match = await _matchesService.UpdateMatch(id, dto);
        return Ok(match);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/full")]
    public async Task<IActionResult> UpdateMatchWithDetails(int id, [FromBody] UpdateMatchWithDetailsDto dto)
    {
        var match = await _matchesService.UpdateMatchWithDetails(id, dto);
        return Ok(match);
    }
}