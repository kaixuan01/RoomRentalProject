﻿using DAL.Models;
using DBL.Email_Service;
using DBL.SystemConfig_Service;
using Serilog;
using System.Net;
using System.Net.Mail;
using Utils;
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

        public SendEmailWorker(IServiceProvider serviceProvider)
        {
            _logger = new LoggerConfiguration()
            .WriteTo.File("Logs/SendEmailWorker/.txt", rollingInterval: RollingInterval.Day)
            .CreateLogger();

            _logHelper = new LogHelper(_logger);
            DBL.Tools.LogHelper.OnLogEvent += _logHelper.LogMessage;

            _serviceProvider = serviceProvider;
            // Resolve services from the service provider in the correct scope
            var scope = _serviceProvider.CreateScope();
            _systemConfigService = scope.ServiceProvider.GetRequiredService<ISystemConfigService>();
            _emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();
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
            string Status = string.Empty;
            string Remark = string.Empty;

            try
            {
                using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtpClient.Credentials = new NetworkCredential("smtpezsport@gmail.com", "qmqbgfhlspzpmajf");
                    smtpClient.EnableSsl = true;  // Enable SSL

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("smtpezsport@gmail.com", "Ez-Sport"),
                        Subject = oEmail.EmailSubject,
                        Body = oEmail.EmailContent,
                        IsBodyHtml = true
                    };

                    mailMessage.To.Add(new MailAddress(oEmail.RecipientEmail, oEmail.RecipientName));
                    await smtpClient.SendMailAsync(mailMessage);

                    _logHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Email Sent Successful.");

                    // Update email status to Completed;
                    Status = ConstantCode.Status.Code_Completed;

                    // Increment success count
                    successCount++;
                }
            }
            catch (Exception ex)
            {
                _logHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"An error occurred in send email.", ex);

                Status = ConstantCode.Status.Code_Failed;
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
