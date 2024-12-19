namespace Utils.Tools
{
    public class IdGeneratorHelper
    {
        private static readonly Random Random = new Random();

        public static string GenerateId()
        {
            // Get the current date and time (14 characters)
            var dateTimePart = DateTime.Now.ToString("yyyyMMddHHmmss");

            // Generate a random integer part (6 digits)
            var numericPart = Random.Next(100000, 999999); // 6-digit number

            // Combine both parts without a hyphen
            var id = dateTimePart + numericPart.ToString("D6"); // Ensure 6 digits with leading zeros if needed

            return id;
        }
    }
}
