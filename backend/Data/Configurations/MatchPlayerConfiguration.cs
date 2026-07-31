using backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configurations;

public class MatchPlayerConfiguration : IEntityTypeConfiguration<MatchPlayer>
{
    public void Configure(EntityTypeBuilder<MatchPlayer> builder)
    {
        builder.ToTable("match_players");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(e => e.MatchId)
            .HasColumnName("match_id")
            .IsRequired();

        builder.Property(e => e.TeamId)
            .HasColumnName("team_id")
            .IsRequired();

        builder.Property(e => e.PlayerId)
            .HasColumnName("player_id")
            .IsRequired();

        builder.HasOne(e => e.Match)
            .WithMany(m => m.MatchPlayers)
            .HasForeignKey(e => e.MatchId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.Team)
            .WithMany()
            .HasForeignKey(e => e.TeamId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.Player)
            .WithMany()
            .HasForeignKey(e => e.PlayerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Igrač se ne može pojaviti dvaput u istoj utakmici
        builder.HasIndex(e => new { e.MatchId, e.PlayerId }).IsUnique();
    }
}