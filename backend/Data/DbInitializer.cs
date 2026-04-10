using backend.Models;

namespace backend.Data;

public static class DbInitializer
{
    public static void Initialize(AppDbContext context)
    {
        if (context.MatchSessions.Any() || context.Players.Any())
        {
            return; // Database has been seeded
        }

        // Seed Players
        var players = new List<Player>
        {
            // Bijeli Tim
            new Player { Id = 1, Name = "Haris", IsCaptain = false, Team = "White" },
            new Player { Id = 2, Name = "Bebić", IsCaptain = false, Team = "White" },
            new Player { Id = 3, Name = "Mališa", IsCaptain = false, Team = "White" },
            new Player { Id = 4, Name = "Dama", IsCaptain = false, Team = "White" },
            new Player { Id = 5, Name = "Lale", IsCaptain = false, Team = "White" },
            new Player { Id = 6, Name = "Rotac", IsCaptain = false, Team = "White" },
            new Player { Id = 7, Name = "Dino", IsCaptain = false, Team = "White" },
            new Player { Id = 8, Name = "Šime", IsCaptain = false, Team = "White" },
            new Player { Id = 9, Name = "Juka", IsCaptain = false, Team = "White" },
            new Player { Id = 10, Name = "Paljak", IsCaptain = false, Team = "White" },
            new Player { Id = 11, Name = "Kulić", IsCaptain = false, Team = "White" },
            new Player { Id = 12, Name = "Marko", IsCaptain = false, Team = "White" },
            new Player { Id = 13, Name = "Ante", IsCaptain = true, Team = "White" }, // Kapetan

            // Crni Tim
            new Player { Id = 25, Name = "Vukvarac", IsCaptain = true, Team = "Black" }, // Kapetan
            new Player { Id = 14, Name = "Tomo", IsCaptain = false, Team = "Black" },
            new Player { Id = 15, Name = "Vinko", IsCaptain = false, Team = "Black" },
            new Player { Id = 16, Name = "Lukas", IsCaptain = false, Team = "Black" },
            new Player { Id = 17, Name = "Perende", IsCaptain = false, Team = "Black" },
            new Player { Id = 18, Name = "Lovrić", IsCaptain = false, Team = "Black" },
            new Player { Id = 19, Name = "Bruno", IsCaptain = false, Team = "Black" },
            new Player { Id = 20, Name = "Miro", IsCaptain = false, Team = "Black" },
            new Player { Id = 21, Name = "Mate", IsCaptain = false, Team = "Black" },
            new Player { Id = 22, Name = "Mirko", IsCaptain = false, Team = "Black" },
            new Player { Id = 23, Name = "Jerga", IsCaptain = false, Team = "Black" },
            new Player { Id = 24, Name = "Mića", IsCaptain = false, Team = "Black" }
        };

        // Seed Session 1
        var session1 = new MatchSession
        {
            Id = 1,
            PlayedAt = new DateTime(2024, 3, 23).Date,
            Sets = new List<MatchSet>
            {
                new MatchSet { Id = 1, SetNumber = 1, BlackScore = 6, WhiteScore = 3 },
                new MatchSet { Id = 2, SetNumber = 2, BlackScore = 5, WhiteScore = 3 }
            },
            WhiteTeam = new List<SessionPlayer>
            {
                new SessionPlayer { PlayerId = 3 },
                new SessionPlayer { PlayerId = 4 },
                new SessionPlayer { PlayerId = 6 },
                new SessionPlayer { PlayerId = 7 },
                new SessionPlayer { PlayerId = 8 },
                new SessionPlayer { PlayerId = 12 },
                new SessionPlayer { PlayerId = 13 },
            },
            BlackTeam = new List<SessionPlayer> {
                new SessionPlayer { PlayerId = 14 },
                new SessionPlayer { PlayerId = 15 },
                new SessionPlayer { PlayerId = 17 },
                new SessionPlayer { PlayerId = 18 },
                new SessionPlayer { PlayerId = 19 },
                new SessionPlayer { PlayerId = 20 },
            }
        };

        // Seed Session 2
        var session2 = new MatchSession
        {
            Id = 2,
            PlayedAt = new DateTime(2024, 3, 30).Date,
            Sets = new List<MatchSet>
            {
                new MatchSet { Id = 21, SetNumber = 1, BlackScore = 6, WhiteScore = 0 },
                new MatchSet { Id = 22, SetNumber = 2, BlackScore = 7, WhiteScore = 5 }
            },
            WhiteTeam = new List<SessionPlayer>
            {
                new SessionPlayer { PlayerId = 3 },
                new SessionPlayer { PlayerId = 4 },
                new SessionPlayer { PlayerId = 6 },
                new SessionPlayer { PlayerId = 7 },
                new SessionPlayer { PlayerId = 8 },
                new SessionPlayer { PlayerId = 12 },
                new SessionPlayer { PlayerId = 13 },
            }.Where(x => x != null).ToList()!,
            BlackTeam = new List<SessionPlayer> {
                new SessionPlayer { PlayerId = 14 },
                new SessionPlayer { PlayerId = 15 },
                new SessionPlayer { PlayerId = 17 },
                new SessionPlayer { PlayerId = 18 },
                new SessionPlayer { PlayerId = 19 },
                new SessionPlayer { PlayerId = 20 },
            }
        };

        context.Players.AddRange(players);
        context.MatchSessions.AddRange(session1, session2);
        context.SaveChanges();
    }
}
