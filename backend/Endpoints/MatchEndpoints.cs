using backend.Data;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints;

public static class MatchEndpoints
{
    public static void MapMatchEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/matches");

        group.MapGet("/", async (AppDbContext context, int page = 1, int pageSize = 20) =>
        {
            var sessions = await context.MatchSessions
                .Include(m => m.Sets)
                .Include(m => m.WhiteTeam)
                    .ThenInclude(p => p.Player)
                .Include(m => m.BlackTeam)
                    .ThenInclude(p => p.Player)
                .OrderByDescending(m => m.PlayedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var matchDtos = sessions.Select(s => new MatchSessionDto
            {
                Id = s.Id,
                PlayedAt = s.PlayedAt,
                Sets = s.Sets.Select(set => new MatchSetDto
                {
                    Id = set.Id,
                    SetNumber = set.SetNumber,
                    BlackScore = set.BlackScore,
                    WhiteScore = set.WhiteScore,
                    Winner = set.Winner
                }),
                OverallScore = s.OverallScore,
                WhiteTeam = s.WhiteTeam.Select(sp => new PlayerDto
                {
                    Id = sp.Player?.Id ?? 0,
                    Name = sp.Player?.Name ?? string.Empty,
                    IsCaptain = sp.Player?.IsCaptain ?? false
                }),
                BlackTeam = s.BlackTeam.Select(sp => new PlayerDto
                {
                    Id = sp.Player?.Id ?? 0,
                    Name = sp.Player?.Name ?? string.Empty,
                    IsCaptain = sp.Player?.IsCaptain ?? false
                })
            });

            return Results.Ok(matchDtos);
        })
        .WithName("GetMatches");

        // Ovdje možete lako dodati nove endpointove, npr.:
        // group.MapGet("/{id}", async (int id, AppDbContext context) => { ... });
        // group.MapPost("/", async (MatchSessionDto match, AppDbContext context) => { ... });
    }
}
