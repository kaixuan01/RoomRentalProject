using System.ComponentModel.DataAnnotations;

namespace DBL.User_Service.UserService.UserActionClass
{
    public class ForgotPassword_REQ
    {
        [EmailAddress]
        public string email { get; set; }
    }

    public class ResetPassword_REQ
    {
        public string token { get; set; }
        public string newPassword { get; set; }
        public string confirmPassword { get; set; }
    }
}
