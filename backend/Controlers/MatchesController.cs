using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controlers;

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
        try
        {
            var match = await _matchesService.GetMatchById(id);
            return Ok(match);
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddMatch([FromBody] CreateMatchDto dto)
    {
        try
        {
            var match = await _matchesService.AddMatch(dto);
            return CreatedAtAction(nameof(GetMatchById), new { id = match.Id }, match);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}