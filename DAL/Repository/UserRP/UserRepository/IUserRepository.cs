using DAL.Models;
using DAL.Repository.UserRP.UserRepository.Class;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.UserRP.UserRepository
{
    public interface IUserRepository
    {
        Task<IQueryable<UserL>> GetUserListing(UserListing_REQ oReq);
        Task<TUser> GetByIdAsync(string id);
        Task<TUser> GetByUsernameAsync(string username);
        Task<TUser> GetByEmailAsync(string email);
        Task<int> GetUserRoleByUsernameAsync(string username);
        Task CreateAsync(TUser user);
        Task UpdateAsync(TUser user);
        Task DeleteAsync(TUser user);
        Task<bool> IsUsernameExistAsync(string username);
        Task<bool> IsEmailExistAsync(string email, string? userId = null);

    }
}
