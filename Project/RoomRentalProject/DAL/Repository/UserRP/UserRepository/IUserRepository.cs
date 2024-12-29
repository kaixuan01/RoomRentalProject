using DAL.Models;
using DAL.Repository.UserRP.UserRepository.Class;

namespace DAL.Repository.UserRP.UserRepository
{
    public interface IUserRepository
    {
        Task<IQueryable<UserL>> GetUserListing(UserListing_REQ oReq);
        Task<TUser> GetByIdAsync(int id);
        Task<TUser> GetByUsernameAsync(string username);
        Task<TUser> GetByEmailAsync(string email);
        Task<int> GetUserRoleByUsernameAsync(string username);
        Task CreateAsync(TUser user);
        Task UpdateAsync(TUser user);
        Task DeleteAsync(TUser user);
        Task<bool> IsUsernameExistAsync(string username);
        Task<bool> IsEmailExistAsync(string email, int? userId = null);

    }
}
