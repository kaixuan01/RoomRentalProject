namespace Utils.Enums
{
    using System.ComponentModel;

    public enum Enum_PhotoType
    {
        [Description("None")]
        None = 0,

        [Description("Primary")]
        Primary = 1,

        [Description("Front View")]
        Front = 2,

        [Description("Back View")]
        Back = 3,

        [Description("Inside View")]
        Inside = 4,

        [Description("Outside View")]
        Outside = 5,

        [Description("Left Side View")]
        LeftSide = 6,

        [Description("Right Side View")]
        RightSide = 7,

        [Description("Top View")]
        Top = 8,

        [Description("Bottom View")]
        Bottom = 9,

        [Description("Close-Up View")]
        CloseUp = 10,
    }
}