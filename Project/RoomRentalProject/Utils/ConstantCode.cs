namespace Utils
{
    public class ConstantCode
    {
        public class Module
        {
            public const string User = "User";
            public const string SystemConfig = "System Config";
            public const string Email = "Email";
            public const string UserTokens = "User Tokens";
        }

        public class Action
        {
            public const string Create = "Create";
            public const string Edit = "Edit";
            public const string Delete = "Delete";
            public const string View = "View";
        }

        public class UserStatus
        {
            public const string Active = "Active";
            public const string Blocked = "Blocked";
        }

        public class UserTokenType
        {
            public const string EmailConfirmation = "EmailConfirmation";
            public const string ResetPassword = "ResetPassword";
        }

        public class SystemConfig_Key
        {
            public const string MaxLoginFailedAttempt = "MaxLoginFailedAttempt";
            public const string EnableSendEmail_Background = "EnableSendEmail_Background";
            public const string SendEmailIntervalSec_Background = "SendEmailIntervalSec_Background";
            public const string SendEmailTotalRetry_Background = "SendEmailTotalRetry_Background";
            public const string UserTokenExpiration = "UserTokenExpiration";

        }

        public class TableName
        {
            public const string SystemConfig = "TSystemConfig";
            public const string User = "TUser";
            public const string UserTokens = "TUserTokens";
            public const string UserLoginHistory = "TUserLoginHistory";
            public const string UserRole = "EUserRole";
            public const string AuditTrail = "TAuditTrail";
            public const string AuditTrailDetails = "TAuditTrailDetails";
            public const string Email = "TEmail";
        }

        public class Resource
        {
            public class EmailTemplateDesign
            {
                public const string ConfirmEmailTemplate = "DBL.Resource.EmailTemplateDesign.ConfirmEmailTemplate.html";
                public const string ResetPasswordEmailTemplate = "DBL.Resource.EmailTemplateDesign.ResetPasswordEmailTemplate.html";
            }
        }

        public class EmailPlaceholder
        {
            public const string RecipientName = "RecipientName";
            public const string ConfirmEmailUrl = "ConfirmEmailUrl";
            public const string ExpiresDateTime = "ExpiresDateTime";
            public const string ResetPasswordUrl = "ResetPasswordUrl";

            
        }

        public class UrlPath
        {
            public const string ConfirmEmail = "/ConfirmEmail/{token}";
            public const string ResetPassword = "/Account/ResetPassword/{token}";
        }

        public class Status
        {
            public static readonly Dictionary<string, string> StatusDictionary = new Dictionary<string, string>
            {
                { Code_Pending, Pending },
                { Code_Completed, Completed },
                { Code_Failed, Failed }
            };

            public const string Code_Pending = "P";
            public const string Pending = "Pending";

            public const string Code_Completed = "C";
            public const string Completed = "Completed";

            public const string Code_Failed = "F";
            public const string Failed = "Failed";
        }
    }
}
