using DAL.Models;
using DAL.Repository.EmailRP;
using DBL.SystemConfig_Service;
using DBL.Tools;
using DBL.User_Service.UserTokensService;
using Microsoft.Extensions.Configuration;
using Utils;
using Utils.Enums;
using Utils.Tools;

namespace DBL.Email_Service
{
    public class EmailService : IEmailService
    {
        private readonly IEmailRepository _emailRepository;
        private readonly ISystemConfigService _systemConfigService; 
        private readonly IUserTokensService _userTokenService;
        private readonly string _reactBaseUrl;

        public EmailService(IEmailRepository emailRepository, IConfiguration configuration, ISystemConfigService systemConfigService, IUserTokensService userTokensService) {
        
            _emailRepository = emailRepository;
            _systemConfigService = systemConfigService;
            _userTokenService = userTokensService;

            // Get the secret key from appsettings.json
            _reactBaseUrl = configuration["ReactSettings:BaseUrl"];
        }

        #region [ Get Email List ]

        public async Task<List<TEmail>> GetSendEmailListAsync()
        {
            var oSystemConfig = await _systemConfigService.GetSystemConfigList();
            int oRetryAttempt = 3;
            if (oSystemConfig.Count > 0)
            {
                var oRetryConfig = oSystemConfig.FirstOrDefault(i => i.Key == ConstantCode.SystemConfig_Key.SendEmailTotalRetry_Background);
                if (int.TryParse(oRetryConfig?.Value, out int total))
                {
                    oRetryAttempt = total;
                }
            }

            var result = await _emailRepository.GetSendEmailListAsync(oRetryAttempt);
            return result;
        }

        #endregion

        #region [ Update Email ]

        public async Task UpdateEmailAsync(long oId, string oStatus, string oRemark)
        {
            try
            {
                var email = await _emailRepository.GetSendEmailAsync(oId);

                if (email == null)
                {
                    LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Email not found");

                    return;
                }

                email.Status = oStatus;
                email.Remark = string.IsNullOrEmpty(email.Remark) ? oRemark : email.Remark + "\n" + oRemark;

                // Add Failed Count for Send Email Failed
                if (email.Status.Contains(ConstantCode.Status.Code_Failed))
                {
                    email.IcntFailedSend++;
                }

                await _emailRepository.UpdateAsync(email);

                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Update Email Successful. Email Id: {email.Id}, Status: {ConstantCode.Status.StatusDictionary[email.Status]}");
            }
            catch (Exception ex)
            {
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Update Email Failed. Email Id: {oId}, Exception: {ex.Message}", ex);
            }

        }

        #endregion

        #region [ Send Email Function ]

        public async Task SendConfirmEmailAsync(TUser oUser)
        {
            if (oUser == null)
            {
                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Send Confirm Email failed. User not found");
                throw new Exception("Failed to send confirm email. User not found");
            }

            LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Send Confirm Email request. User Id: {oUser.Id}, recipient name: {oUser.Name}, recipient email: {oUser.Email}");

            try
            {
                var oUserToken = await _userTokenService.CreateAsync(oUser.Id, ConstantCode.UserTokenType.EmailConfirmation);

                string confirmEmailUrl = GenerateUrlHelper.GenerateUrl(_reactBaseUrl, ConstantCode.UrlPath.ConfirmEmail, oUserToken.Token);

                var placeholders = new Dictionary<string, string>
                {
                    { ConstantCode.EmailPlaceholder.RecipientName, oUser.Name },
                    { ConstantCode.EmailPlaceholder.ConfirmEmailUrl, confirmEmailUrl },
                    { ConstantCode.EmailPlaceholder.ExpiresDateTime, oUserToken.ExpiresDateTime.ToString("MMMM dd, yyyy hh:mm tt") },
                };

                var emailContent = await PrepareEmailContentAsync(ConstantCode.Resource.EmailTemplateDesign.ConfirmEmailTemplate, placeholders);

                var email = new TEmail
                {
                    EmailSubject = "Email Confirmation",
                    EmailContent = emailContent,
                    RecipientName = oUser.Name,
                    RecipientEmail = oUser.Email,
                    Status = ConstantCode.Status.Code_Pending,
                    CreatedDateTime = DateTime.Now
                };

                await _emailRepository.CreateAsync(email);

                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Send Confirm Email Successful. Recipient name: {oUser.Name}, recipient email: {oUser.Email}");
            }
            catch (Exception ex)
            {
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Send Confirm Email Failed. Recipient name: {oUser.Name}, recipient email: {oUser.Email}", ex);
            }

        }

        public async Task SendResetPasswordEmailAsync(TUser oUser)
        {
            if (oUser == null)
            {
                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Send Reset Password Email failed. User not found");
                throw new Exception("Failed to send reset password email. User not found");
            }

            LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Send reset password email request. User Id: {oUser.Id}, recipient name: {oUser.Name}, recipient email: {oUser.Email}");

            try
            {
                var oUserToken = await _userTokenService.CreateAsync(oUser.Id, ConstantCode.UserTokenType.ResetPassword);

                string resetPasswordEmailUrl = GenerateUrlHelper.GenerateUrl(_reactBaseUrl, ConstantCode.UrlPath.ResetPassword, oUserToken.Token);

                var placeholders = new Dictionary<string, string>
                {
                    { ConstantCode.EmailPlaceholder.RecipientName, oUser.Name },
                    { ConstantCode.EmailPlaceholder.ResetPasswordUrl, resetPasswordEmailUrl },
                    { ConstantCode.EmailPlaceholder.ExpiresDateTime, oUserToken.ExpiresDateTime.ToString("MMMM dd, yyyy hh:mm tt") },
                };

                var emailContent = await PrepareEmailContentAsync(ConstantCode.Resource.EmailTemplateDesign.ResetPasswordEmailTemplate, placeholders);

                var email = new TEmail
                {
                    EmailSubject = "Reset Password",
                    EmailContent = emailContent,
                    RecipientName = oUser.Name,
                    RecipientEmail = oUser.Email,
                    Status = ConstantCode.Status.Code_Pending,
                    CreatedDateTime = DateTime.Now
                };

                await _emailRepository.CreateAsync(email);

                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Send Reset Password Email Successful. Recipient name: {oUser.Name}, recipient email: {oUser.Email}");
            }
            catch (Exception ex)
            {
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Send Reset Password Email Failed. Recipient name: {oUser.Name}, recipient email: {oUser.Email}", ex);
            }
        }

        #endregion

        #region [ Function ]

        public async Task<string> PrepareEmailContentAsync(string templateName, Dictionary<string, string> placeholders)
        {
            var templateContent = ReadResourceHelper.ReadResource(templateName);
            return EmailTemplateHelper.ReplacePlaceholders(templateContent, placeholders);
        }

        #endregion
    }
}
