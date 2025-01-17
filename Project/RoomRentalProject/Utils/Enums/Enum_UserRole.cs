using System.ComponentModel;

namespace Utils.Enums
{
    public enum Enum_UserRole 
    {
        [Description("None")]
        None = 0,

        [Description("Admin")]
        Admin = 1,

        [Description("Owner")]
        Owner = 2,

        [Description("Normal User")]
        NormalUser = 3
    }
}