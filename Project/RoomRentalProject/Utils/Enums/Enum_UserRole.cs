using System.ComponentModel;

namespace Utils.Enums
{
    public enum Enum_UserRole 
    {
        [Description("Admin")]
        Admin = 0,

        [Description("Owner")]
        Owner = 1,

        [Description("Normal User")]
        NormalUser = 2
    }
}