using E_commerce.Tools;
using System.Net;
using System.Text.Json;
using Utils.Enums;

namespace E_commerce.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;

        public ExceptionMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }


        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception Message: {ex.Message}", ex);
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var result = JsonSerializer.Serialize(new { error = "Internal Server Error", message = exception.Message });
            LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Internal Server Error: {exception.Message}");
            return context.Response.WriteAsync(result);
        }
    }
}
