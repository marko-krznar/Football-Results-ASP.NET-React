using System;

namespace backend.Entities;

public class Team
{
    public int Id { get; set; }
    public required string Name { get; set; }
    
    public int SeasonId { get; set; } // referenca na tablicu sezone
    public Season? Season { get; set; }
    
    public int CaptainId { get; set; } // referenca na tablicu players
    public Player? Captain { get; set; }
}

