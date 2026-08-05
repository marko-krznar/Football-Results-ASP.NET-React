using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/matches/{matchId}/sets")]
[ApiController]
public class SetsController(ISetsService setsService) : ControllerBase
{
    private readonly ISetsService _setsService = setsService;

    [HttpGet]
    public async Task<IActionResult> GetSets(int matchId)
    {
        try
        {
            var sets = await _setsService.GetSets(matchId);
            return Ok(sets);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [Authorize]
    [HttpPut]
    public async Task<IActionResult> AddOrUpdateSet(int matchId, [FromBody] UpsertSetDto dto)
    {
        try
        {
            var set = await _setsService.AddOrUpdateSet(matchId, dto);
            return Ok(set);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [Authorize]
    [HttpDelete("{setNumber}")]
    public async Task<IActionResult> DeleteSet(int matchId, int setNumber)
    {
        try
        {
            await _setsService.DeleteSet(matchId, setNumber);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}