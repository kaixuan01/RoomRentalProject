using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Utils.Enums;

namespace Utils.Tools
{
    public class AuthToken
    {
        private readonly string _key;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly int _expireMins;

        public AuthToken(IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JwtSettings");

            _key = jwtSettings["Key"];
            _issuer = jwtSettings["Issuer"];
            _audience = jwtSettings["Audience"];
            _expireMins = int.Parse(jwtSettings["ExpireMins"]);
        }

        public string GenerateJwtToken(string username, Enum_UserRole userRole)
        {
            if (userRole == null)
            {
                throw new Exception("User Role not found when generate JWT.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, userRole.ToString()) // Add user role as a claim
                }),
                Expires = DateTime.Now.AddMinutes(_expireMins),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _issuer, // The issuer value from configuration
                Audience = _audience // The audience value from configuration
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static string GenerateToken()
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var tokenBytes = new byte[32]; // 256-bit token
                rng.GetBytes(tokenBytes);
                return Convert.ToBase64String(tokenBytes);
            }
        }

        #region [ Refresh Token ] 

        private static readonly ConcurrentDictionary<string, string> Tokens = new ConcurrentDictionary<string, string>();

        public static void StoreRefreshToken(string username, string refreshToken)
        {
            Tokens[username] = refreshToken;
        }

        public static string GetRefreshToken(string username)
        {
            Tokens.TryGetValue(username, out var refreshToken);
            return refreshToken;
        }

        public static void RemoveRefreshToken(string username)
        {
            Tokens.TryRemove(username, out _);
        }

        #endregion

    }
}
