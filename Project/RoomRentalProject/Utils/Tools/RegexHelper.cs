using System.Text.RegularExpressions;

namespace Utils.Tools
{
    public static class RegexHelper
    {
        /// <summary>
        /// Validates whether the provided email is in the correct format.
        /// </summary>
        /// <param name="email">The email address to validate.</param>
        /// <returns>True if the email is in a valid format; otherwise, false.</returns>
        public static bool IsEmailValid(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            string emailPattern = @"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
            return Regex.IsMatch(email, emailPattern);
        }

        /// <summary>
        /// Validates whether the provided Malaysian phone number is in the correct format.
        /// </summary>
        /// <param name="phoneNumber">The phone number to validate.</param>
        /// <returns>True if the phone number is in a valid format; otherwise, false.</returns>
        public static bool IsMalaysianPhoneNumberValid(string phoneNumber)
        {
            if (string.IsNullOrWhiteSpace(phoneNumber))
                return false;

            // Malaysian mobile and landline numbers format
            string phonePattern = @"^(?:\+60|60|0)?(1\d{1}-?\d{7,8}|[3-9]\d{1}-?\d{6,8})$";
            return Regex.IsMatch(phoneNumber, phonePattern);
        }
    }
}
