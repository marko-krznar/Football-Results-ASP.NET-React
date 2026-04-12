using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controlers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private static readonly List<TeamModel> teams =
        [
            new TeamModel { Id = 1, Name = "White" },
            new TeamModel { Id = 2, Name = "Black" }
        ];
        private static readonly List<PlayerModel> players =
        [
            // Bijeli Tim
            new PlayerModel { Id = 1, Name = "Haris", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 2, Name = "Bebić", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 3, Name = "Mališa", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 4, Name = "Dama", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 5, Name = "Lale", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 6, Name = "Rotac", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 7, Name = "Dino", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 8, Name = "Šime", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 9, Name = "Juka", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 10, Name = "Paljak", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 11, Name = "Kulić", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 12, Name = "Marko", IsCaptain = false, Team = teams.First(t => t.Id == 1).Id },
            new PlayerModel { Id = 13, Name = "Ante", IsCaptain = true, Team = teams.First(t => t.Id == 1).Id },

            // Crni Tim
            new PlayerModel { Id = 25, Name = "Vukvarac", IsCaptain = true, Team = teams.First(t => t.Id == 2).Id },
            new PlayerModel { Id = 14, Name = "Tomo", IsCaptain = false, Team = teams.First(t => t.Id == 2).Id },
            new PlayerModel { Id = 15, Name = "Vinko", IsCaptain = false, Team = teams.First(t => t.Id == 2).Id },
            new PlayerModel { Id = 16, Name = "Lukas", IsCaptain = false, Team = teams.First(t => t.Id == 2).Id },
            new PlayerModel { Id = 17, Name = "Perende", IsCaptain = false, Team = teams.First(t => t.Id == 2).Id },
            new PlayerModel { Id = 18, Name = "Lovrić", IsCaptain = false, Team = teams.First(t => t.Id == 2).Id },
            new PlayerModel { Id = 19, Name = "Bruno", IsCaptain = false, Team = teams.First(t => t.Id == 2).Id },
            new PlayerModel { Id = 20, Name = "Miro", IsCaptain = false, Team = teams.First(t => t.Id == 2).Id },
            new PlayerModel { Id = 21, Name = "Mate", IsCaptain = false, Team = teams.First(t => t.Id == 2).Id },
            new PlayerModel { Id = 22, Name = "Mirko", IsCaptain = false, Team = teams.First(t => t.Id == 2).Id },
            new PlayerModel { Id = 23, Name = "Jerga", IsCaptain = false, Team = teams.First(t => t.Id == 2).Id },
            new PlayerModel { Id = 24, Name = "Mića", IsCaptain = false, Team = teams.First(t => t.Id == 2).Id }
        ];

        [HttpGet("white")]
        public ActionResult<List<PlayerModel>> GetPlayersWhiteTeam()
        {
            var whiteTeamPlayers = players.Where(p => p.Team == 1).ToList();
            return Ok(players);
        }

        [HttpGet("black")]
        public ActionResult<List<PlayerModel>> GetPlayersBlackTeam()
        {
            var blackTeamPlayers = players.Where(p => p.Team == 2).ToList();
            return Ok(blackTeamPlayers);
        }
    }
}
