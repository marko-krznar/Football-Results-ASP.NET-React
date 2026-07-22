using System;

namespace backend.Entities;

public enum SeasonType
{
    Spring,
    Autumn
}

public class Season
{
    public int Id { get; set; }
    public required int Year { get; set; }
    public required SeasonType Type { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public string Name =>
        Type == SeasonType.Autumn
            ? $"Jesen {Year}"
            : $"Proljeće {Year}";
}
