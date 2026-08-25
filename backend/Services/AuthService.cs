using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace backend.Services;

public class AuthService(UserManager<IdentityUser> userManager) : IAuthService
{
    private readonly UserManager<IdentityUser> _userManager = userManager;

    public async Task<UserInfoDto?> GetUserInfo(ClaimsPrincipal claimsPrincipal)
    {
        var user = await _userManager.GetUserAsync(claimsPrincipal);
        if (user is null)
        {
            return null;
        }

        var email = await _userManager.GetEmailAsync(user);
        var isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(user);

        var roles = await _userManager.GetRolesAsync(user);
        var claimsDict = new Dictionary<string, string>
        {
            { "IsAdmin", roles.Contains("Admin").ToString().ToLower() }
        };

        return new UserInfoDto(email, isEmailConfirmed, claimsDict);
    }
}
