using DAL.Models;

namespace DAL.Repository.UserRP.UserRole
{
    public interface IUserRoleRepository
    {
        Task<List<EUserRole>> GetUserRoleListingAsync();
    }
}
