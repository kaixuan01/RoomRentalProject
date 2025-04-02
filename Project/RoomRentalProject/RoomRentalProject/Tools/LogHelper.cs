using Org.BouncyCastle.Crypto.Prng;
using Serilog;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using Utils.Enums;

namespace E_commerce.Tools
{
    public class LogHelper
    {
        public static void FormatMainLogMessage(Enum_LogLevel level, string message, Exception? ex = null, [CallerMemberName] string methodName = "")
        {
            // Format the log message
            var formattedMessage = $"Main ({methodName}) | {message}";

            LogMessage(level, formattedMessage, ex);
        }

        public static void LogMessage(Enum_LogLevel level, string message, Exception? ex = null)
        {
            switch (level)
            {
                case Enum_LogLevel.Verbose:
                    if (ex != null)
                        Log.Verbose(ex, message);
                    else
                        Log.Verbose(message);
                    break;
                case Enum_LogLevel.Debug:
                    if (ex != null)
                        Log.Debug(ex, message);
                    else
                        Log.Debug(message);
                    break;
                case Enum_LogLevel.Information:
                    if (ex != null)
                        Log.Information(ex, message);
                    else
                        Log.Information(message);
                    break;
                case Enum_LogLevel.Warning:
                    if (ex != null)
                        Log.Warning(ex, message);
                    else
                        Log.Warning(message);
                    break;
                case Enum_LogLevel.Error:
                    if (ex != null)
                        Log.Error(ex, message);
                    else
                        Log.Error(message);
                    break;
                case Enum_LogLevel.Fatal:
                    if (ex != null)
                        Log.Fatal(ex, message);
                    else
                        Log.Fatal(message);
                    break;
                default:
                    if (ex != null)
                        Log.Information(ex, message);
                    else
                        Log.Information(message);
                    break;
            }
        }

    }
}
