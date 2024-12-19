using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBL.User_Service.UserService.UserActionClass
{
    public class ConfirmEmail_REQ
    {
        public string Token { get; set; }
    }

    public class ResendConfirmEmail_REQ
    {
        public string? Token { get; set; }
        public string? Username { get; set; }
    }
}
