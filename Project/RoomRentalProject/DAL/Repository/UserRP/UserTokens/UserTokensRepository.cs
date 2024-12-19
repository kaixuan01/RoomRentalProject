using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository.UserRP.UserTokens
{
    public class UserTokensRepository : IUserTokensRepository
    {
        private readonly AppDbContext _appDbContext;

        public UserTokensRepository(AppDbContext context)
        {
            _appDbContext = context;
        }

        public async Task CreateAsync(TUserToken userTokens)
        {
            await _appDbContext.TUserTokens.AddAsync(userTokens);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<TUserToken> GetByTokenAsync(string token)
        {
            var oUserToken = await _appDbContext.TUserTokens
                .Where(x => x.Token == token)
                .OrderByDescending(x => x.CreatedDateTime)
                .FirstOrDefaultAsync();

            return oUserToken;
        }

        public async Task<TUserToken> GetByUserIdAsync(string UserId)
        {
            var oUserToken = await _appDbContext.TUserTokens
                           .Where(x => x.UserId == UserId)
                           .OrderByDescending(x => x.CreatedDateTime)
                           .FirstOrDefaultAsync();

            return oUserToken;
        }

        public async Task UpdateAsync(TUserToken userTokens)
        {
            // Attach the user entity to the context
            _appDbContext.Attach(userTokens);

            // Mark all properties as modified
            _appDbContext.Entry(userTokens).State = EntityState.Modified;

            // Save changes to the database
            await _appDbContext.SaveChangesAsync();
        }
    }
}
