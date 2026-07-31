using backend.Models;
using backend.Services;
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
        try
        {
            var matches = await _matchesService.GetMatches();
            return Ok(matches);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
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

    [HttpPost("full")]
    public async Task<IActionResult> AddMatchWithDetails([FromBody] CreateMatchWithDetailsDto dto)
    {
        try
        {
            var match = await _matchesService.AddMatchWithDetails(dto);
            return CreatedAtAction(nameof(GetMatchById), new { id = match.Id }, match);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("display")]
    public async Task<IActionResult> GetAllMatchesDisplay()
    {
        try
        {
            var matches = await _matchesService.GetAllMatchesDisplay();
            return Ok(matches);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpGet("{id}/display")]
    public async Task<IActionResult> GetMatchDisplay(int id)
    {
        try
        {
            var match = await _matchesService.GetMatchDisplay(id);
            return Ok(match);
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}