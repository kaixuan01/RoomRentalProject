using DBL.Shared;

namespace DBL.User_Service.UserService.UserActionClass
{
    public class CreateUser_REQ
    {
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public short UserRoleId { get; set; } = 2;
        public string? Phone { get; set; }
    }

    public class CreateUser_RESP : Common_RESP
    {
        public int UserId { get; set; }
    }
}