using System.ComponentModel;

namespace Utils.Enums
{
    public enum Enum_UserStatus
    {
        [Description("None")]
        None = 0,

        [Description("Active")]
        Active = 1,

        [Description("Inactive")]
        Inactive = 2,

        [Description("Blocked")]
        Blocked = 3,
    }
}
