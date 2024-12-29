using DAL.Models;

namespace DBL.User_Service.UserTokensService
{
    public interface IUserTokensService
    {
        Task<TUserToken> GetByTokenAsync(string token);
        Task<TUserToken> GetByUserIdAsync(int UserId);
        Task<TUserToken> CreateAsync(int UserId, string TokenType);
        Task UpdateAsync(TUserToken userTokens);
    }
}
