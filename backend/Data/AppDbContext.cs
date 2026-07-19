using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    // public DbSet<MatchSession> MatchSessions => Set<MatchSession>();
    // public DbSet<MatchSet> MatchSets => Set<MatchSet>();
    public DbSet<Player> Players => Set<Player>();
    // public DbSet<SessionPlayer> SessionPlayers => Set<SessionPlayer>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // modelBuilder.Entity<MatchSession>()
        //     .HasMany(m => m.WhiteTeam)
        //     .WithOne()
        //     .HasForeignKey("WhiteMatchSessionId");

        // modelBuilder.Entity<MatchSession>()
        //     .HasMany(m => m.BlackTeam)
        //     .WithOne()
        //     .HasForeignKey("BlackMatchSessionId");

        base.OnModelCreating(modelBuilder);
    }
}
