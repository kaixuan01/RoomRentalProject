using System.ComponentModel;

namespace Utils.Enums
{
    public enum Enum_UserStatus
    {
        [Description("Active")]
        Active = 0,

        [Description("Inactive")]
        Inactive = 1,

        [Description("Blocked")]
        Blocked = 1,
    }
}
