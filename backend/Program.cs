using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Service registration
builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("FootballDb"));

var app = builder.Build();

// 2. Initial data seeding with Players, Sessions and Sets
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (!context.MatchSessions.Any())
    {
        // Seed Players
        var p1 = new Player { Id = 1, Name = "Ivan" };
        var p2 = new Player { Id = 2, Name = "Marko" };
        var p3 = new Player { Id = 3, Name = "Luka" };
        var p4 = new Player { Id = 4, Name = "Pero" };

        context.Players.AddRange(p1, p2, p3, p4);

        // Seed Session 1
        var session1 = new MatchSession 
        { 
            Id = 1, 
            PlayedAt = DateTime.UtcNow,
            Sets = new List<MatchSet>
            {
                new MatchSet { Id = 1, SetNumber = 1, BlackScore = 6, WhiteScore = 4 },
                new MatchSet { Id = 2, SetNumber = 2, BlackScore = 6, WhiteScore = 8 }
            },
            Players = new List<SessionPlayer>
            {
                new SessionPlayer { Id = 1, PlayerId = 1, Team = "Black" },
                new SessionPlayer { Id = 2, PlayerId = 2, Team = "Black" },
                new SessionPlayer { Id = 3, PlayerId = 3, Team = "White" },
                new SessionPlayer { Id = 4, PlayerId = 4, Team = "White" }
            }
        };

        context.MatchSessions.Add(session1);
        context.SaveChanges();
    }
}

// 3. Middleware configuration
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

// 4. ENDPOINT: GET /api/matches (returns sessions + sets + players)
app.MapGet("/api/matches", async (AppDbContext context) =>
{
    var sessions = await context.MatchSessions
        .Include(m => m.Sets)
        .Include(m => m.Players)
            .ThenInclude(p => p.Player) // Important: Includes Player details (Name)
        .ToListAsync();

    return Results.Ok(sessions);
})
.WithName("GetMatches");

app.Run();
