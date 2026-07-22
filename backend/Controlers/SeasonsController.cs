using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controlers;

[Route("api/seasons")]
[ApiController]
public class SeasonsController(ISeasonsService seasonsService) : ControllerBase
{
    private readonly ISeasonsService _seasonsService = seasonsService;

    [HttpGet]
    public async Task<IActionResult> GetSeasons()
    {
        var seasons = await _seasonsService.GetSeasons();
        return Ok(seasons);
    }

    [HttpPost]
    public async Task<IActionResult> AddSeason([FromBody] CreateSeasonDto dto)
    {
        try
        {
            var season = await _seasonsService.AddSeason(dto);
            return CreatedAtAction(nameof(GetSeasons), new { id = season.Id }, season);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
