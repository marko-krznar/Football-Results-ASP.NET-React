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
        var sets = await _setsService.GetSets(matchId);
        return Ok(sets);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<IActionResult> AddOrUpdateSet(int matchId, [FromBody] UpsertSetDto dto)
    {
        var set = await _setsService.AddOrUpdateSet(matchId, dto);
        return Ok(set);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{setNumber}")]
    public async Task<IActionResult> DeleteSet(int matchId, int setNumber)
    {
        await _setsService.DeleteSet(matchId, setNumber);
        return NoContent();
    }
}