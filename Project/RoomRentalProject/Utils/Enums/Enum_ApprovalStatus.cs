using System.ComponentModel;

namespace Utils.Enums
{
    public enum Enum_ApprovalStatus
    {
        [Description("None")]
        None = 0,

        [Description("Pending")]
        Pending = 1,

        [Description("Approved")]
        Approved = 2,

        [Description("Rejected")]
        Rejected = 3,

        [Description("InReview")]
        InReview = 4,

        [Description("Escalated")]
        Escalated = 5,

        [Description("Cancelled")]
        Cancelled = 6,
    }
}