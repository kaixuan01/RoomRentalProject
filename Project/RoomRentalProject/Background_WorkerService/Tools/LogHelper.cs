using System.Runtime.CompilerServices;
using Utils.Enums;

namespace Background_WorkerService.Tools
{
    public class LogHelper
    {
        private readonly Serilog.ILogger _logger;

        public LogHelper(Serilog.ILogger logger)
        {
            _logger = logger;
        }

        public void FormatMainLogMessage(Enum_LogLevel level, string message, Exception? ex = null, [CallerMemberName] string methodName = "")
        {
            // Format the log message
            var formattedMessage = $"Main ({methodName}) | {message}";

            LogMessage(level, formattedMessage, ex);
        }

        public void LogMessage(Enum_LogLevel level, string message, Exception? ex = null)
        {
            switch (level)
            {
                case Enum_LogLevel.Verbose:
                    if (ex != null)
                        _logger.Verbose(ex, message);
                    else
                        _logger.Verbose(message);
                    break;
                case Enum_LogLevel.Debug:
                    if (ex != null)
                        _logger.Debug(ex, message);
                    else
                        _logger.Debug(message);
                    break;
                case Enum_LogLevel.Information:
                    if (ex != null)
                        _logger.Information(ex, message);
                    else
                        _logger.Information(message);
                    break;
                case Enum_LogLevel.Warning:
                    if (ex != null)
                        _logger.Warning(ex, message);
                    else
                        _logger.Warning(message);
                    break;
                case Enum_LogLevel.Error:
                    if (ex != null)
                        _logger.Error(ex, message);
                    else
                        _logger.Error(message);
                    break;
                case Enum_LogLevel.Fatal:
                    if (ex != null)
                        _logger.Fatal(ex, message);
                    else
                        _logger.Fatal(message);
                    break;
                default:
                    if (ex != null)
                        _logger.Information(ex, message);
                    else
                        _logger.Information(message);
                    break;
            }
        }

    }
}
