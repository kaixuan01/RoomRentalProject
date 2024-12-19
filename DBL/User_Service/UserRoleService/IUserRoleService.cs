using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBL.User_Service.UserRoleService
{
    public interface IUserRoleService
    {
        Task<List<EUserRole>> GetUserRoleListingAsync();
    }
}
