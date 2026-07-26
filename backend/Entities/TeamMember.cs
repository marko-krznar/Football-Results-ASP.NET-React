using System;

namespace backend.Entities;

public class TeamMember
{
    public int Id { get; set; }
    public int TeamId { get; set; }
    public int PlayerId { get; set; }

    public Team Team { get; set; } = null!;
    public Player Player { get; set; } = null!;
}