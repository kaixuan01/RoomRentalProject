using DAL.Models;

namespace DBL.User_Service.UserTokensService
{
    public interface IUserTokensService
    {
        Task<TUserToken> GetByTokenAsync(string token);
        Task<TUserToken> GetByUserIdAsync(string UserId);
        Task<TUserToken> CreateAsync(string UserId, string TokenType);
        Task UpdateAsync(TUserToken userTokens);
    }
}
