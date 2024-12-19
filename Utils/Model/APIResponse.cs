namespace Utils.Model
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T? Data { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public ApiResponse(bool success, string message, T? data)
        {
            Success = success;
            Message = message;
            Data = data;
        }

        public static ApiResponse<T> CreateSuccessResponse(T? data = default, string message = "Request was successful")
        {
            return new ApiResponse<T>(true, message, data);
        }

        public static ApiResponse<T> CreateErrorResponse(string msg)
        {
            return new ApiResponse<T>(false, msg, default(T));
        }
    }
}
