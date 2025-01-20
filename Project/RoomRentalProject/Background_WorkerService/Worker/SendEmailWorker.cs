using DAL.Models;
using DBL.Email_Service;
using DBL.SystemConfig_Service;
using Serilog;
using System.Net;
using System.Net.Mail;
using Utils.Constant;
using Utils.Enums;
using LogHelper = Background_WorkerService.Tools.LogHelper;


namespace Background_WorkerService.Worker
{
    public class SendEmailWorker : IHostedLifecycleService
    {
        private readonly Serilog.ILogger _logger;
        private readonly IServiceProvider _serviceProvider;
        private readonly LogHelper _logHelper;
        private readonly ISystemConfigService _systemConfigService;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;  // Inject IConfiguration
        private readonly string _emailServer;
        private readonly int _emailPort;
        private readonly string _emailUser;
        private readonly string _emailUserPassword;
        private readonly string _emailAddress;
        private readonly string _emailDisplayName;
        private readonly string _logDir;

        public SendEmailWorker(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            _serviceProvider = serviceProvider;
            // Resolve services from the service provider in the correct scope
            var scope = _serviceProvider.CreateScope();
            _systemConfigService = scope.ServiceProvider.GetRequiredService<ISystemConfigService>();
            _emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();
            _configuration = configuration;

            // Retrieve email settings from appsettings.json using IConfiguration
            _emailServer = _configuration["EmailSettings:EmailServer"];
            _emailUser = _configuration["EmailSettings:EmailUser"];
            _emailUserPassword = _configuration["EmailSettings:EmailUserPassword"];
            _emailAddress = _configuration["EmailSettings:EmailAddress"];
            _emailDisplayName = _configuration["EmailSettings:EmailDisplayName"];

            // ## Setup Logger for Send Email Worker
            // Retrieve the directory path from the configuration
            _logDir = _configuration["Logging:LogDir:SendEmailWorkerDir"];


            _logger = new LoggerConfiguration()
            .WriteTo.File(_logDir, rollingInterval: RollingInterval.Day)
            .CreateLogger();

            _logHelper = new LogHelper(_logger);
            DBL.Tools.LogHelper.OnLogEvent += _logHelper.LogMessage;


            // Convert EmailSettings:ServerPort from string to integer
            if (!int.TryParse(configuration["EmailSettings:ServerPort"], out _emailPort))
            {
                // Handle the error (set a default or throw an exception)
                _emailPort = 587; // Default value if parsing fails
                _logHelper.FormatMainLogMessage(Enum_LogLevel.Error, "Invalid email port configuration. Using default port 587.");
            }

            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, "-------------------------------------------");
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, "        Retrieve Email Config.");
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, "-------------------------------------------");
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Email Server: {_emailServer}");
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Email Server Port: {_emailPort}");
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Email User: {_emailUser}");
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Email User Password: {_emailUserPassword}");
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Email Address: {_emailAddress}");
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Email Display Name: {_emailDisplayName}");
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Start at: {DateTimeOffset.Now}");

            return Task.CompletedTask;
        }

        public async Task StartedAsync(CancellationToken stoppingToken)
        {
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Started at: {DateTimeOffset.Now}");

            DateTime lastConfigFetchTime = DateTime.MinValue;
            TimeSpan configFetchInterval = TimeSpan.FromMinutes(1);
            TimeSpan sendEmailInterval = TimeSpan.FromSeconds(10); // Default interval in case config is invalid

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    // Fetch system config every minute
                    if ((DateTime.Now - lastConfigFetchTime) >= configFetchInterval)
                    {
                        _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, "-------------------------------------------");
                        _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, "        Retrieve System Config.");
                        _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, "-------------------------------------------");

                        var oSystemConfig = await _systemConfigService.GetSystemConfigList();
                        lastConfigFetchTime = DateTime.Now;

                        if (oSystemConfig == null || oSystemConfig.Count == 0)
                        {
                            _logHelper.FormatMainLogMessage(Enum_LogLevel.Error, "System Config not found.");
                            await Task.Delay(configFetchInterval, stoppingToken); // Wait until the next config fetch
                            continue; // Skip sending emails this cycle
                        }

                        var enableSendEmail = oSystemConfig.FirstOrDefault(i => i.Key == ConstantCode.SystemConfig_Key.EnableSendEmail_Background);
                        var intervalSendEmail = oSystemConfig.FirstOrDefault(i => i.Key == ConstantCode.SystemConfig_Key.SendEmailIntervalSec_Background);

                        // Update email sending interval based on config
                        if (int.TryParse(intervalSendEmail?.Value, out int secs))
                        {
                            sendEmailInterval = TimeSpan.FromSeconds(secs);
                        }
                        else
                        {
                            sendEmailInterval = TimeSpan.FromSeconds(10); // Default to 10 seconds
                        }

                        _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Send Email Function: {(enableSendEmail.Value.Contains("0") ? "Disabled" : "Enabled" )}, Interval Every {sendEmailInterval.TotalSeconds} Secs");

                        // Check if sending emails is enabled
                        if (enableSendEmail?.Value != "1")
                        {
                            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, "Email sending is disabled.");
                            await Task.Delay(configFetchInterval, stoppingToken); // Wait until the next config fetch
                            continue;
                        }
                    }

                    // If email sending is enabled, proceed to send emails
                    _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, "-------------------------------------------");
                    _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, "        Retrieve Send Email List.");
                    _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, "-------------------------------------------");

                    var oRecipientList = await _emailService.GetSendEmailListAsync();

                    if (oRecipientList == null || oRecipientList.Count == 0)
                    {
                        _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, "No emails need to be sent.");
                    }
                    else
                    {
                        _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Total emails to be sent: {oRecipientList.Count}");

                        int iCnt = 0;
                        int iFailedCnt = 0, iSuccessCnt = 0;

                        foreach (var oEmail in oRecipientList)
                        {
                            iCnt++;

                            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Processing Email No. {iCnt}, Email Id: {oEmail.Id}, Recipient Name: {oEmail.RecipientName}, Recipient Email: {oEmail.RecipientEmail}");
                            var oResult = await SendEmailAsync(oEmail);

                            iFailedCnt += oResult.FailureCount;
                            iSuccessCnt += oResult.SuccessCount;
                        }

                        _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Send Email Progress Completed. Total Success: {iSuccessCnt}, Total Failure: {iFailedCnt}.");
                    }

                    // Wait for the next email sending cycle
                    await Task.Delay(sendEmailInterval, stoppingToken);
                }
                catch (Exception ex)
                {
                    _logHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"An error occurred in the SendEmailWorker", ex);
                }
            }
        }

        public Task StartingAsync(CancellationToken cancellationToken)
        {
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Starting at: {DateTimeOffset.Now}");
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Stop at: {DateTimeOffset.Now}");

            return Task.CompletedTask;
        }

        public Task StoppedAsync(CancellationToken cancellationToken)
        {
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Stopped at: {DateTimeOffset.Now}");

            return Task.CompletedTask;
        }

        public Task StoppingAsync(CancellationToken cancellationToken)
        {
            _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Stopping at: {DateTimeOffset.Now}");

            return Task.CompletedTask;
        }

        private async Task<(int SuccessCount, int FailureCount)> SendEmailAsync(TEmail oEmail)
        {
            int successCount = 0;
            int failureCount = 0;
            short Status = (short)Enum_Status.Pending;
            string Remark = string.Empty;

            try
            {
                using (var smtpClient = new SmtpClient(_emailServer, _emailPort))  // Use your mail server address and port
                {
                    // Credentials for no-reply@stayseeker.xyz
                    smtpClient.Credentials = new NetworkCredential(_emailUser, _emailUserPassword);
                    smtpClient.EnableSsl = true;  // Enable SSL/TLS for secure email transmission

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(_emailAddress, _emailDisplayName),
                        Subject = oEmail.EmailSubject,
                        Body = oEmail.EmailContent,
                        IsBodyHtml = true
                    };

                    mailMessage.To.Add(new MailAddress(oEmail.RecipientEmail, oEmail.RecipientName));

                    // Send the email
                    await smtpClient.SendMailAsync(mailMessage);

                    _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Email Sent Successful.");

                    // Update email status to Completed
                    Status = (short)Enum_Status.Completed;

                    // Increment success count
                    successCount++;
                }
            }
            catch (SmtpException smtpEx)
            {
                // Handle SMTP exceptions (e.g., invalid credentials, issues with SMTP server, etc.)
                Console.WriteLine($"Error sending email: {smtpEx.Message}");
                _logHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Error sending email: {smtpEx.Message}");
                Status = (short)Enum_Status.Failed;
                Remark = $"Error sending email, Exception: {smtpEx.Message}";
                failureCount++;
            }
            catch (Exception ex)
            {
                _logHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"An error occurred in send email.", ex);

                Status = (short)Enum_Status.Failed;
                Remark = $"Failed to send email, Exception: {ex.Message}";
                failureCount++;

            }
            finally
            {
                // Update the email record in the database
                await _emailService.UpdateEmailAsync(oEmail.Id ,Status, Remark);
            }

            return (successCount, failureCount);

        }
    }
}
