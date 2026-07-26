using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using dotenv.net;
using Scalar.AspNetCore;

DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddControllers();
builder.Services.AddScoped<IPlayersService, PlayersService>();
builder.Services.AddScoped<ISeasonsService, SeasonsService>();
builder.Services.AddScoped<ITeamsService, TeamsService>();
builder.Services.AddScoped<ITeamMembersService, TeamMembersService>();
builder.Services.AddScoped<IMatchPlayersService, MatchPlayersService>();
builder.Services.AddScoped<IMatchesService, MatchesService>();
builder.Services.AddScoped<ISetsService, SetsService>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(IdentityConstants.ApplicationScheme)
    .AddIdentityCookies();

builder.Services.AddAuthorization();

builder.Services.AddIdentityCore<IdentityUser>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddApiEndpoints();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseCors("AllowReact");

app.UseAuthentication();
app.UseAuthorization();

app.MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();
})
.RequireAuthorization();

app.MapControllers();

app.Run();
