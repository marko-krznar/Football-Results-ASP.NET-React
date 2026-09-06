namespace backend.Models;

public class PlayerDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
}

public class CreatePlayerDto
{
    public required string Name { get; set; }
}

public class UpdatePlayerDto
{
    public required string Name { get; set; }
}
