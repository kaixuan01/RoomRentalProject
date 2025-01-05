using System.ComponentModel;

namespace Utils.Enums
{
    public enum Enum_Status
    {
        [Description("Pending")]
        Pending = 0,

        [Description("Approved")]
        Approved = 1,

        [Description("Completed")]
        Completed = 2,

        [Description("Failed")]
        Failed = 3,

        [Description("Rejected")]
        Rejected = 4
    }
}
