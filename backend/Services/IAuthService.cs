namespace backend.Services;

public interface IAuthService
{
    Task<UserInfoDto?> GetUserInfo(System.Security.Claims.ClaimsPrincipal claimsPrincipal);
}

public record UserInfoDto(string? Email, bool IsEmailConfirmed, Dictionary<string, string> Claims);
