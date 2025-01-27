using System.ComponentModel;

namespace Utils.Enums
{
    public enum Enum_PropertyStatus
    {
        [Description("None")]
        None = 0,

        [Description("Available")]
        Available = 1,

        [Description("Reserved")]
        Reserved = 2,

        [Description("Occupied")]
        Occupied = 3,

        [Description("Under Maintenance")]
        UnderMaintenance = 4,

        [Description("Out Of Service")]
        OutOfService = 5,
    }
}