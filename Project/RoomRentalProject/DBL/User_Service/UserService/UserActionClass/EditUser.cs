namespace DBL.User_Service.UserService.UserActionClass
{
    public class EditUser_REQ
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? password { get; set; }
        public string? email { get; set; }
        public short userRoleId { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
    }

    public class EditUser_RESP
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public string UserId { get; set; }
    }
}
