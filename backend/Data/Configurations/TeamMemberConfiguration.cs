using backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configurations;

public class TeamMemberConfiguration : IEntityTypeConfiguration<TeamMember>
{
    public void Configure(EntityTypeBuilder<TeamMember> builder)
    {
        builder.ToTable("team_members");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(e => e.TeamId)
            .HasColumnName("team_id")
            .IsRequired();

        builder.Property(e => e.PlayerId)
            .HasColumnName("player_id")
            .IsRequired();

        // Relacije
        builder.HasOne(e => e.Team)
            .WithMany(t => t.TeamMembers)
            .HasForeignKey(e => e.TeamId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.Player)
            .WithMany()
            .HasForeignKey(e => e.PlayerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Unique constraint (team_id, player_id) - isti igrač ne može biti dvaput u istoj ekipi
        builder.HasIndex(e => new { e.TeamId, e.PlayerId }).IsUnique();
    }
}
