using System.ComponentModel;

namespace Utils.Enums
{
    public enum Enum_Status
    {
        [Description("None")]
        None = 0,

        [Description("Pending")]
        Pending = 1,

        [Description("Approved")]
        Approved = 2,

        [Description("Completed")]
        Completed = 3,

        [Description("Failed")]
        Failed = 4,

        [Description("Rejected")]
        Rejected = 5
    }
}
