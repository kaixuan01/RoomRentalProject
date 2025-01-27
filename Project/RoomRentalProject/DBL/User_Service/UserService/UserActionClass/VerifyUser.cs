using DAL.Repository.UserRP.UserRepository.Class;
using DBL.Shared;

namespace DBL.User_Service.UserService.UserActionClass
{
    public class VerifyUser_REQ
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class VerifyUser_RESP : Common_RESP
    {
        public UserDto oUser { get; set; }
    }
}