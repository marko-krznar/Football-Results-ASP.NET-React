using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddMatchSetAndMatchPlayerEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "matches",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    season_id = table.Column<int>(type: "integer", nullable: false),
                    first_team_id = table.Column<int>(type: "integer", nullable: false),
                    second_team_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_matches", x => x.id);
                    table.CheckConstraint("CK_matches_teams_different", "first_team_id <> second_team_id");
                    table.ForeignKey(
                        name: "FK_matches_seasons_season_id",
                        column: x => x.season_id,
                        principalTable: "seasons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_matches_teams_first_team_id",
                        column: x => x.first_team_id,
                        principalTable: "teams",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_matches_teams_second_team_id",
                        column: x => x.second_team_id,
                        principalTable: "teams",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "match_players",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    match_id = table.Column<int>(type: "integer", nullable: false),
                    team_id = table.Column<int>(type: "integer", nullable: false),
                    player_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_match_players", x => x.id);
                    table.ForeignKey(
                        name: "FK_match_players_matches_match_id",
                        column: x => x.match_id,
                        principalTable: "matches",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_match_players_players_player_id",
                        column: x => x.player_id,
                        principalTable: "players",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_match_players_teams_team_id",
                        column: x => x.team_id,
                        principalTable: "teams",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "sets",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    set_number = table.Column<int>(type: "integer", nullable: false),
                    first_team_goals = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    second_team_goals = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    match_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sets", x => x.id);
                    table.ForeignKey(
                        name: "FK_sets_matches_match_id",
                        column: x => x.match_id,
                        principalTable: "matches",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_match_players_match_id_player_id",
                table: "match_players",
                columns: new[] { "match_id", "player_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_match_players_player_id",
                table: "match_players",
                column: "player_id");

            migrationBuilder.CreateIndex(
                name: "IX_match_players_team_id",
                table: "match_players",
                column: "team_id");

            migrationBuilder.CreateIndex(
                name: "IX_matches_first_team_id",
                table: "matches",
                column: "first_team_id");

            migrationBuilder.CreateIndex(
                name: "IX_matches_season_id",
                table: "matches",
                column: "season_id");

            migrationBuilder.CreateIndex(
                name: "IX_matches_second_team_id",
                table: "matches",
                column: "second_team_id");

            migrationBuilder.CreateIndex(
                name: "IX_sets_match_id_set_number",
                table: "sets",
                columns: new[] { "match_id", "set_number" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "match_players");

            migrationBuilder.DropTable(
                name: "sets");

            migrationBuilder.DropTable(
                name: "matches");
        }
    }
}
