using DAL.Models;
using DAL.Repository.UserRP.UserRepository.Class;
using Microsoft.EntityFrameworkCore;
using Utils.Enums;
using Utils.Tools;

namespace DAL.Repository.UserRP.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _appDbContext;

        public UserRepository(AppDbContext context)
        {
            _appDbContext = context;
        }

        public async Task<IQueryable<UserL>> GetUserListing(UserListing_REQ oReq)
        {
            var query = _appDbContext.TUsers
                .Include(u => u.UserRole) // Include the UserRole navigation property
                .AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(oReq.SearchTerm))
            {
                query = query.Where(u =>
                    u.Username.Contains(oReq.SearchTerm) ||
                    u.Name.Contains(oReq.SearchTerm) ||
                    u.Email.Contains(oReq.SearchTerm) ||
                    u.Phone.Contains(oReq.SearchTerm) ||
                    u.UserRole.Name.Contains(oReq.SearchTerm)
                );
            }
            else
            {
                if (!string.IsNullOrEmpty(oReq.Username))
                {
                    query = query.Where(u => u.Username.Contains(oReq.Username));
                }

                if (!string.IsNullOrEmpty(oReq.Name))
                {
                    query = query.Where(u => u.Name.Contains(oReq.Name));
                }

                if (!string.IsNullOrEmpty(oReq.Email))
                {
                    query = query.Where(u => u.Email.Contains(oReq.Email));
                }

                if (!string.IsNullOrEmpty(oReq.Phone))
                {
                    query = query.Where(u => u.Phone.Contains(oReq.Phone));
                }

                if (!string.IsNullOrEmpty(oReq.Role))
                {
                    var roleIds = oReq.Role.Split(',').Select(int.Parse).ToList();
                    query = query.Where(u => roleIds.Contains(u.UserRoleId));
                }

                if (oReq.Status.HasValue)
                {
                    // Apply status filter
                    query = query.Where(u => u.Status == oReq.Status.Value);
                }
            }

            var result = query
                .Select(u => new UserL
                {
                    Id = u.Id,
                    Username = u.Username,
                    Name = u.Name,
                    Email = u.Email,
                    Phone = u.Phone,
                    Role = u.UserRole.Name, // Map UserRole.Name to role
                    Status = ((Enum_UserStatus)u.Status).GetDescription()
                });

            return result;
        }

        #region [ Get User ]

        public async Task<TUser> GetByIdAsync(int id)
        {
            return await _appDbContext.TUsers.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<TUser> GetByUsernameAsync(string username)
        {
            return await _appDbContext.TUsers.FirstOrDefaultAsync(x => x.Username == username);
        }

        public async Task<TUser> GetByEmailAsync(string email)
        {
            return await _appDbContext.TUsers.FirstOrDefaultAsync(x => x.Email == email);
        }

        #endregion [ Get User ]

        #region [ Get User's Role ]

        public async Task<int> GetUserRoleByUsernameAsync(string username)
        {
            return await _appDbContext.TUsers
                .Where(x => x.Username == username)
                .Select(x => x.UserRoleId)
                .FirstOrDefaultAsync();
        }

        #endregion [ Get User's Role ]

        public async Task CreateAsync(TUser user)
        {
            await _appDbContext.TUsers.AddAsync(user);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(TUser oUser)
        {
            // Attach the user entity to the context
            _appDbContext.Attach(oUser);

            // Mark all properties as modified
            _appDbContext.Entry(oUser).State = EntityState.Modified;

            // Save changes to the database
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(TUser user)
        {
            _appDbContext.TUsers.Remove(user);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<bool> IsUsernameExistAsync(string username)
        {
            return await _appDbContext.TUsers.AnyAsync(user => user.Username == username);
        }

        public async Task<bool> IsEmailExistAsync(string email, int? userId = null)
        {
            return await _appDbContext.TUsers
                .AnyAsync(user => user.Email == email && (userId == null ? true : user.Id != userId));
        }
    }
}