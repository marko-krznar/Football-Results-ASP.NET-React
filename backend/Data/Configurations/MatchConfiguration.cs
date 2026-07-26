using backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configurations;

public class MatchConfiguration : IEntityTypeConfiguration<Match>
{
    public void Configure(EntityTypeBuilder<Match> builder)
    {
        builder.ToTable("matches", t =>
            t.HasCheckConstraint("CK_matches_teams_different", "first_team_id <> second_team_id"));

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(e => e.MatchDate)
            .HasColumnName("date")
            .IsRequired();

        builder.Property(e => e.SeasonId)
            .HasColumnName("season_id")
            .IsRequired();

        builder.Property(e => e.FirstTeamId)
            .HasColumnName("first_team_id")
            .IsRequired();

        builder.Property(e => e.SecondTeamId)
            .HasColumnName("second_team_id")
            .IsRequired();

        builder.HasOne(e => e.Season)
            .WithMany()
            .HasForeignKey(e => e.SeasonId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.FirstTeam)
            .WithMany()
            .HasForeignKey(e => e.FirstTeamId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.SecondTeam)
            .WithMany()
            .HasForeignKey(e => e.SecondTeamId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}