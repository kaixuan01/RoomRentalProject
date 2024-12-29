using DAL.Models;
using DAL.Tools.ListingHelper;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository.UserRP.UserLoginHistoryRepository
{
    public class UserLoginHistoryRepository : ListingHelper<TUserLoginHistory>, IUserLoginHistoryRepository
    {
        private readonly AppDbContext _appDbContext;

        public UserLoginHistoryRepository(AppDbContext context) : base(context)
        {
            _appDbContext = context;
        }

        public async Task CreateAsync(TUserLoginHistory userLoginHistory)
        {
            await _appDbContext.TUserLoginHistories.AddAsync(userLoginHistory);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<TUserLoginHistory> GetUserLoginHistoryByUserIdAsync(int UserId)
        {
            var latestLoginHistory = await _appDbContext.TUserLoginHistories
                .Where(x => x.UserId == UserId)
                .OrderByDescending(x => x.LoginDateTime)
                .FirstOrDefaultAsync();

            return latestLoginHistory;
        }

        public async Task UpdateAsync(TUserLoginHistory oRec)
        {
            // Attach the user entity to the context
            _appDbContext.Attach(oRec);

            // Mark all properties as modified
            _appDbContext.Entry(oRec).State = EntityState.Modified;

            // Save changes to the database
            await _appDbContext.SaveChangesAsync();
        }

    }
}
