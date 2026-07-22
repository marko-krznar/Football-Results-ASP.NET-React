using backend.Entities;

namespace backend.Models;

public class SeasonDto
{
    public int Id { get; set; }
    public int Year { get; set; }
    public string Type { get; set; } = string.Empty;
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class CreateSeasonDto
{
    public int Year { get; set; }
    public string Type { get; set; } = string.Empty; // "Spring" ili "Autumn"
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
}
