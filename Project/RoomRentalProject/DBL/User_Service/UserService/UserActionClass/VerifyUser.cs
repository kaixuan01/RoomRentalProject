using DAL.Models;
using DAL.Repository.UserRP.UserRepository.Class;

namespace DBL.User_Service.UserService.UserActionClass
{
    public class VerifyUser_REQ
    {
        public string username { get; set; }
        public string password { get; set; }
    }

    public class VerifyUser_RESP
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public UserDto oUser { get; set; }
    }

}
