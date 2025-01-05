using System.ComponentModel;
using System.Reflection;

namespace Utils.Tools
{
    public static class EnumExtensions
    {
        /// <summary>
        /// Retrieves the description of an enum value based on the <see cref="DescriptionAttribute"/>.
        /// </summary>
        /// <param name="value">The enum value for which the description is to be retrieved.</param>
        /// <returns>
        /// The description specified by the <see cref="DescriptionAttribute"/> if it exists; 
        /// otherwise, the string representation of the enum value.
        /// </returns>
        public static string GetDescription(this Enum value)
        {
            var field = value.GetType().GetField(value.ToString());
            if (field == null)
                return value.ToString();
            var attribute = (DescriptionAttribute?)field.GetCustomAttribute(typeof(DescriptionAttribute));
            return attribute?.Description ?? value.ToString();
        }
    }
}
