using DBL.Shared;

namespace DBL.User_Service.UserService.UserActionClass
{
    public class EditUser_REQ
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public short UserRoleId { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
    }

    public class EditUser_RESP : Common_RESP
    {
        public string UserId { get; set; }
    }
}