using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controlers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private static readonly List<MatchOverallModel> matches =
        [
            new MatchOverallModel {
                Id = 1,
                BlackScore = 0,
                WhiteScore = 0,
                Date = new DateTime(2024, 3, 23).Date,
                Sets =
                [
                    new SetModel { Id = 1, BlackScore = 6, WhiteScore = 3 },
                    new SetModel { Id = 2, BlackScore = 5, WhiteScore = 3 }
                ],
                WhiteTeamPlayers = [
                    new PlayerModel { Id = 3, Name = "Mališa", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 4, Name = "Dama", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 6, Name = "Rotac", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 7, Name = "Dino", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 8, Name = "Šime", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 12, Name = "Marko", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 13, Name = "Ante", IsCaptain = true, Team = 1 }
                ],
                BlackTeamPlayers = [
                    new PlayerModel { Id = 14, Name = "Tomo", IsCaptain = false, Team = 2 },
                    new PlayerModel { Id = 15, Name = "Vinko", IsCaptain = false, Team = 2 },
                    new PlayerModel { Id = 17, Name = "Perende", IsCaptain = false, Team = 2 },
                    new PlayerModel { Id = 18, Name = "Lovrić", IsCaptain = false, Team = 2 },
                    new PlayerModel { Id = 19, Name = "Bruno", IsCaptain = false, Team = 2 },
                    new PlayerModel { Id = 20, Name = "Miro", IsCaptain = false, Team = 2 },
                ],
            },
            new MatchOverallModel {
                Id = 1,
                BlackScore = 0,
                WhiteScore = 0,
                Date = new DateTime(2024, 3, 30).Date,
                Sets =
                [
                    new SetModel { Id = 1, BlackScore = 6, WhiteScore = 0 },
                    new SetModel { Id = 2, BlackScore = 7, WhiteScore = 5 }
                ],
                WhiteTeamPlayers = [
                    new PlayerModel { Id = 3, Name = "Mališa", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 4, Name = "Dama", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 6, Name = "Rotac", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 7, Name = "Dino", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 8, Name = "Šime", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 12, Name = "Marko", IsCaptain = false, Team = 1 },
                    new PlayerModel { Id = 13, Name = "Ante", IsCaptain = true, Team = 1 }
                ],
                BlackTeamPlayers = [
                    new PlayerModel { Id = 14, Name = "Tomo", IsCaptain = false, Team = 2 },
                    new PlayerModel { Id = 15, Name = "Vinko", IsCaptain = false, Team = 2 },
                    new PlayerModel { Id = 17, Name = "Perende", IsCaptain = false, Team = 2 },
                    new PlayerModel { Id = 18, Name = "Lovrić", IsCaptain = false, Team = 2 },
                    new PlayerModel { Id = 19, Name = "Bruno", IsCaptain = false, Team = 2 },
                    new PlayerModel { Id = 20, Name = "Miro", IsCaptain = false, Team = 2 },
                ],

            },
        ];

        [HttpGet("matches")]
        public ActionResult<List<PlayerModel>> GetPlayersWhiteTeam()
        {
            var matchList = matches.ToList();
            return Ok(matchList);
        }

        [HttpGet("latest-match")]
        public ActionResult<List<PlayerModel>> GetLatestMatch()
        {
            var latesMatch = matches
                .OrderByDescending(m => m.Date)
                .FirstOrDefault();
            return Ok(latesMatch);
        }
    }
}
