using DAL.Shared.Class;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.UserRP.UserRepository.Class
{
    public class UserListing_REQ : FilterParameters
    {
        public string? Username { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Role { get; set; }
        public int? Status { get; set; }
    }

    public class UserListing_RESP : ShareResp
    {
        public PagedResult<UserL> UserList = new PagedResult<UserL>();
    }

    public class UserL
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public short? Role { get; set; }
        public short? Status { get; set; }
    }
}
