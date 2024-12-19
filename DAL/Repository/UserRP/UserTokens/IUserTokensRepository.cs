using DAL.Models;

namespace DAL.Repository.UserRP.UserTokens
{
    public interface IUserTokensRepository
    {
        Task<TUserToken> GetByTokenAsync(string token);
        Task<TUserToken> GetByUserIdAsync(string UserId);
        Task CreateAsync(TUserToken userTokens);
        Task UpdateAsync(TUserToken userTokens);
    }
}
