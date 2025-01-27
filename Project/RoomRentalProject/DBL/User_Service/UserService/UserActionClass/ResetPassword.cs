using System.ComponentModel.DataAnnotations;

namespace DBL.User_Service.UserService.UserActionClass
{
    public class ForgotPassword_REQ
    {
        [EmailAddress]
        public string Email { get; set; }
    }

    public class ResetPassword_REQ
    {
        public string Token { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
