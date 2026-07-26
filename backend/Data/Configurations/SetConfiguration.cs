using backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configurations;

public class SetConfiguration : IEntityTypeConfiguration<Set>
{
    public void Configure(EntityTypeBuilder<Set> builder)
    {
        builder.ToTable("sets");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(e => e.SetNumber)
            .HasColumnName("set_number")
            .IsRequired();

        builder.Property(e => e.FirstTeamGoals)
            .HasColumnName("first_team_goals")
            .HasDefaultValue(0)
            .IsRequired();

        builder.Property(e => e.SecondTeamGoals)
            .HasColumnName("second_team_goals")
            .HasDefaultValue(0)
            .IsRequired();

        builder.Property(e => e.MatchId)
            .HasColumnName("match_id")
            .IsRequired();

        builder.HasOne(e => e.Match)
            .WithMany(m => m.Sets)
            .HasForeignKey(e => e.MatchId)
            .OnDelete(DeleteBehavior.Cascade);

        // Isti broj seta se ne može ponoviti unutar iste utakmice
        builder.HasIndex(e => new { e.MatchId, e.SetNumber }).IsUnique();
    }
}