using DAL.Models;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.UserRP.UserLoginHistoryRepository
{
    public interface IUserLoginHistoryRepository : IListingHelper<TUserLoginHistory>
    {
        Task CreateAsync(TUserLoginHistory user);
        Task UpdateAsync(TUserLoginHistory oRec);
        Task<TUserLoginHistory> GetUserLoginHistoryByUserIdAsync(int UserId);

    }
}
