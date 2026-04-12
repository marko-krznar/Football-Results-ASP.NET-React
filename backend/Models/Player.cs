using System;
namespace backend.Models;

public class PlayerModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsCaptain { get; set; }
    public int Team { get; set; }
}
