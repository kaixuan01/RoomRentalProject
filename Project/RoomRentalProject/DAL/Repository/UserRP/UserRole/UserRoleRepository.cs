using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository.UserRP.UserRole
{
    public class UserRoleRepository : IUserRoleRepository
    {
        private readonly AppDbContext _appDbContext;

        public UserRoleRepository(AppDbContext context)
        {
            _appDbContext = context;
        }

        public async Task<List<EUserRole>> GetUserRoleListingAsync()
        {
            return await _appDbContext.EUserRoles.ToListAsync();
        }
    }
}
