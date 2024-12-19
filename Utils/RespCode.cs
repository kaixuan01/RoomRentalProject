namespace Utils
{
    public class RespCode
    {
        public const string RespCode_Success = "0"; // Use this when everything fine
        public const string RespCode_Failed = "1";


        public const string RespCode_Exception = "99"; // Use this RespCode when throw exception.

        public const string RespMessage_Insert_Successful = "Record Insert Successful";
        public const string RespMessage_Update_Successful = "Record Update Successful";
        public const string RespMessage_Delete_Successful = "Record Delete Successful";
    }

    public class ErrorMessage
    {
        // General error when something goes wrong unexpectedly
        public const string GeneralError = "An unexpected error occurred. Please try again later.";

        // Error when the system fails to process a request
        public const string ProcessingError = "Unable to process your request at this time. Please try again later.";

        // Error for when an action is not permitted or access is denied
        public const string AccessDenied = "You do not have permission to perform this action.";

        // Error for invalid inputs or data
        public const string InvalidInput = "The information you provided is invalid. Please check and try again.";

        // Error when the system can't find the requested data
        public const string DataNotFound = "The requested data could not be found.";

        // Error for authentication failures (e.g., incorrect login credentials)
        public const string AuthenticationFailed = "Login failed. Please check your username and password and try again.";

        // Error for when a required field is missing or not filled out
        public const string MissingRequiredField = "Please fill out all required fields and try again.";

        // Error for when an operation or feature is temporarily unavailable
        public const string ServiceUnavailable = "This service is currently unavailable. Please try again later.";

        // Error for when there's a conflict, such as duplicate data
        public const string ConflictError = "A conflict occurred. This item may already exist.";

        // Error for when there's an issue with file upload or download
        public const string FileError = "There was an error handling your file. Please try again.";

        // Error for when a session times out
        public const string SessionTimeout = "Your session has timed out. Please log in again.";

        // Error for when input exceeds allowed limits (e.g., character length, file size)
        public const string ExceededLimit = "Your input exceeds the allowed limit. Please reduce and try again.";
    }

}
