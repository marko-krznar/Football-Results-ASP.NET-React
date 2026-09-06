using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("manage")]
public class AuthController(IAuthService authService) : ControllerBase
{
    private readonly IAuthService _authService = authService;

    [Authorize]
    [HttpGet("user-info")]
    public async Task<IActionResult> GetInfo()
    {
        var userInfo = await _authService.GetUserInfo(User);
        if (userInfo is null)
        {
            return NotFound();
        }

        return Ok(new
        {
            Email = userInfo.Email,
            IsEmailConfirmed = userInfo.IsEmailConfirmed,
            Claims = userInfo.Claims
        });
    }
}
