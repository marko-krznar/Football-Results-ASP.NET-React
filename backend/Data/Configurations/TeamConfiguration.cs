using backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configurations;

public class TeamConfiguration : IEntityTypeConfiguration<Team>
{
    public void Configure(EntityTypeBuilder<Team> builder)
    {
        builder.ToTable("teams");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(e => e.Name)
            .HasColumnName("name")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(e => e.SeasonId)
            .HasColumnName("season_id")
            .IsRequired();

        builder.Property(e => e.CaptainId)
            .HasColumnName("captain_id")
            .IsRequired();

        // Relacije
        builder.HasOne(e => e.Season)
            .WithMany()
            .HasForeignKey(e => e.SeasonId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.Captain)
            .WithMany()
            .HasForeignKey(e => e.CaptainId)
            .OnDelete(DeleteBehavior.Restrict);

        // Unique constraint (season_id, name)
        builder.HasIndex(e => new { e.SeasonId, e.Name }).IsUnique();
    }
}
