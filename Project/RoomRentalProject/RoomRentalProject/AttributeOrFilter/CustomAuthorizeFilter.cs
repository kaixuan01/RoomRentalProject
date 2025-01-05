using DAL.Repository.UserRP.UserRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Utils.Enums;

namespace E_commerce.AttributeOrFilter
{
    public class CustomAuthorizeFilter : IAsyncActionFilter
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public CustomAuthorizeFilter(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var token = context.HttpContext.Request.Cookies["authToken"];
            if (!string.IsNullOrEmpty(token))
            {
                var username = GetUsernameByToken(token);
                var user = await _userRepository.GetByUsernameAsync(username);

                if (user != null && user.Status == (short)Enum_UserStatus.Blocked)
                {
                    // Clear cookies
                    context.HttpContext.Response.Cookies.Append("authToken", "", new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.None,
                        Expires = DateTime.UtcNow.AddDays(-1)
                    });

                    context.HttpContext.Response.Cookies.Append("refreshToken", "", new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.None,
                        Expires = DateTime.UtcNow.AddDays(-1)
                    });

                    context.HttpContext.Response.Cookies.Append("isBlocked", "true", new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.None,
                        Expires = DateTime.UtcNow.AddSeconds(10) // Expire after 10secs
                    });

                    context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Result = new StatusCodeResult(StatusCodes.Status401Unauthorized);
                    return;
                }
            }

            await next();
        }

        private string GetUsernameByToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]);
                var issuer = _configuration["JwtSettings:Issuer"];
                var audience = _configuration["JwtSettings:Audience"];

                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidIssuer = issuer,
                    ValidAudience = audience
                };

                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out _);
                var username = principal.FindFirstValue(ClaimTypes.Name);

                return username;
            }
            catch
            {
                return "";
            }
        }
    }

}
