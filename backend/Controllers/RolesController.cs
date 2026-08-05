using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/roles")]
[ApiController]
[Authorize]
public class RolesController(
    RoleManager<IdentityRole> roleManager,
    UserManager<IdentityUser> userManager) : ControllerBase
{
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;
    private readonly UserManager<IdentityUser> _userManager = userManager;

    [HttpGet]
    public async Task<IActionResult> GetRoles()
    {
        var roles = await _roleManager.Roles.ToListAsync();
        return Ok(roles);
    }

    [HttpPost]
    public async Task<IActionResult> CreateRole([FromBody] CreateRoleDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.RoleName))
        {
            return BadRequest("Naziv role ne može biti prazan.");
        }

        var roleExists = await _roleManager.RoleExistsAsync(dto.RoleName);
        if (roleExists)
        {
            return BadRequest("Rola već postoji.");
        }

        var result = await _roleManager.CreateAsync(new IdentityRole(dto.RoleName));
        if (result.Succeeded)
        {
            return Ok(new { message = $"Rola '{dto.RoleName}' je uspješno kreirana." });
        }

        return BadRequest(result.Errors);
    }

    [HttpPost("assign")]
    public async Task<IActionResult> AssignRole([FromBody] AssignRoleDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.RoleName))
        {
            return BadRequest("Email i naziv role su obavezni.");
        }

        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null)
        {
            return NotFound("Korisnik nije pronađen.");
        }

        var roleExists = await _roleManager.RoleExistsAsync(dto.RoleName);
        if (!roleExists)
        {
            return BadRequest("Rola ne postoji.");
        }

        var result = await _userManager.AddToRoleAsync(user, dto.RoleName);
        if (result.Succeeded)
        {
            return Ok(new { message = $"Rola '{dto.RoleName}' je uspješno dodijeljena korisniku {dto.Email}." });
        }

        return BadRequest(result.Errors);
    }
}

public class CreateRoleDto
{
    public string RoleName { get; set; } = string.Empty;
}

public class AssignRoleDto
{
    public string Email { get; set; } = string.Empty;
    public string RoleName { get; set; } = string.Empty;
}
