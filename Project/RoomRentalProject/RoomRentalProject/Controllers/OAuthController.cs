using DAL.Models;
using DAL.Repository.UserRP.UserRepository.Class;
using DBL.User_Service.UserService;
using DBL.User_Service.UserService.UserActionClass;
using E_commerce.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using Utils.Constant;
using Utils.Enums;
using Utils.Model;
using Utils.Tools;

namespace E_commerce.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class OAuthController : BaseAPIController
    {
        private readonly IUserService _userService;
        private readonly AuthToken _authToken;
        private readonly int _expireMins;

        public OAuthController(IUserService userService, AuthToken authToken, IConfiguration configuration)
        {
            _userService = userService;
            _authToken = authToken;

            var jwtSettings = configuration.GetSection("JwtSettings");
            _expireMins = int.Parse(jwtSettings["ExpireMins"]);
        }

        #region [ Register Account ]

        [HttpPost]
        [ApiVersion("1.0")]
        [Route("RegisterAcc")]
        public async Task<IActionResult> RegisterAcc([FromBody] CreateUser_REQ oUser)
        {
            ApiResponse<string>? apiResponse = null;

            try
            {
                if (!string.IsNullOrEmpty(oUser.Password))
                {
                    oUser.Password = PasswordHelper.HashPassword(oUser.Password);
                }

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to register account, Request: {JsonConvert.SerializeObject(oUser)}");

                var oResp = await _userService.CreateAsync(oUser);

                switch (oResp.Code)
                {
                    case RespCode.RespCode_Success:
                        // Create a success response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateSuccessResponse(null, "Register account succesful. Please check your email to verify your account.");
                        break;

                    case RespCode.RespCode_Failed:
                        // Create a error response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateErrorResponse(oResp.Message);

                        break;

                    default: // Default is throw exception message
                        // Create a error response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateErrorResponse(oResp.Message);

                        break;
                        // return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                apiResponse = ApiResponse<String>.CreateErrorResponse($"Register Acc Failed. Exception: {ex.Message}");

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when register account, Message: {ex.Message}", ex);
            }

            return Ok(apiResponse);
        }

        #endregion [ Register Account ]

        #region [ Login / Logout ]

        [HttpPost(Name = "OAuth")]
        public async Task<IActionResult> OAuth([FromBody] VerifyUser_REQ user)
        {
            if (!string.IsNullOrEmpty(user.Username) && !string.IsNullOrEmpty(user.Password))
            {
                var oVerifyResp = await _userService.VerifyUserAsync(user);

                if (oVerifyResp != null)
                {
                    switch (oVerifyResp.Code)
                    {
                        case RespCode.RespCode_Success:
                            var token = _authToken.GenerateJwtToken(user.Username, (Enum_UserRole)oVerifyResp.oUser.UserRoleId);
                            var refreshToken = AuthToken.GenerateToken();
                            // Update the refresh token in your storage
                            AuthToken.StoreRefreshToken(user.Username, refreshToken); // Implement StoreRefreshToken

                            // Set the tokens in cookies
                            SetCookies(token, refreshToken);

                            var response = ApiResponse<UserDto>.CreateSuccessResponse( oVerifyResp.oUser , "Login successful");
                            return Ok(response);

                        case RespCode.RespCode_Failed:
                            var errorResponse = ApiResponse<string>.CreateErrorResponse(oVerifyResp.Message);
                            return Ok(errorResponse);

                        default:
                            var exceptionResponse = ApiResponse<string>.CreateErrorResponse(oVerifyResp.Message);

                            return Ok(exceptionResponse);
                            // return Unauthorized();
                    }
                }
            }
            return Ok(ApiResponse<string>.CreateErrorResponse("Username or password cannot be empty"));
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                ClearCookies();

                // Retrieve the username from HttpContext.Items
                if (HttpContext.Items.TryGetValue("Username", out var username))
                {
                    // Use the username
                    string usernameStr = username as string;

                    LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Update User Login History, Username: {username}");

                    // Update user logout
                    await _userService.UpdateUserLogoutAsync(usernameStr);
                }

                var response = ApiResponse<string>.CreateSuccessResponse(null, "Logout successful");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<string>.CreateErrorResponse($"Logout failed, Exception: {ex.Message}");
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when logout, Exception: {ex.Message}");

                return Ok(response);
            }
        }

        #endregion [ Login / Logout ]

        #region [ Refresh Token ]

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshTokenAsync()
        {
            ApiResponse<string>? apiResponse = null;

            try
            {
                var authToken = Request.Cookies["authToken"];
                if (string.IsNullOrEmpty(authToken))
                {
                    ClearCookies();
                    LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"JWT Token not found");
                    return Unauthorized("JWT token not found.");
                }

                var username = User.FindFirstValue(ClaimTypes.Name);
                if (string.IsNullOrEmpty(username))
                {
                    ClearCookies();
                    LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Username not found by the JWT tokent");
                    return Unauthorized("User not found.");
                }

                var storedRefreshToken = AuthToken.GetRefreshToken(username);

                // Retrieve the refresh token from the cookie
                var refreshToken = Request.Cookies["refreshToken"];

                if (string.IsNullOrEmpty(refreshToken) || string.IsNullOrEmpty(storedRefreshToken))
                {
                    ClearCookies();
                    LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Refresh Token not found. Cookies refresh token: {refreshToken}, Stored Refresh Token: {storedRefreshToken}");
                    return Unauthorized("Refresh token not found.");
                }

                if (storedRefreshToken == refreshToken)
                {
                    var userRole = await _userService.GetUserRoleByUsernameAsync(username);
                    var newToken = _authToken.GenerateJwtToken(username, (Enum_UserRole)userRole);
                    var newRefreshToken = AuthToken.GenerateToken();

                    // Update stored refresh token
                    AuthToken.StoreRefreshToken(username, newRefreshToken);

                    // Set the new tokens in cookies
                    SetCookies(newToken, newRefreshToken);

                    apiResponse = ApiResponse<string>.CreateSuccessResponse(null, "Refresh token successful");
                }
                else
                {
                    ClearCookies();
                    LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Cookies refresh token not equal with localstorage. Cookies refresh token: {refreshToken}, Stored Refresh Token: {storedRefreshToken}");
                    return Unauthorized("Wrong Refresh Token.");
                }
            }
            catch (Exception ex)
            {
                apiResponse = ApiResponse<string>.CreateErrorResponse($"Refresh Token Failed. Exception: {ex.Message}");
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when refresh token, Message: {ex.Message}", ex);
            }

            return Ok(apiResponse);
        }

        #endregion [ Refresh Token ]

        #region [ Confirm Email ]

        #region [ Confirm Email Process ]

        [HttpPost("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmail_REQ oReq)
        {
            ApiResponse<string> response = null;

            try
            {
                // Update user logout
                var oResp = await _userService.UpdateUserConfirmEmailAsync(oReq.Token);

                if (oResp != null)
                {
                    switch (oResp.Code)
                    {
                        case RespCode.RespCode_Success:
                            response = ApiResponse<string>.CreateSuccessResponse(null, oResp.Message);
                            break;

                        default:
                            response = ApiResponse<string>.CreateErrorResponse(oResp.Message);
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                response = ApiResponse<string>.CreateErrorResponse($"Verify Email Failed, Exception: {ex.Message}");
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when verify user's email, Exception: {ex.Message}");
            }

            return Ok(response);
        }

        #endregion [ Confirm Email Process ]

        #region [ Resend Confirm Email ]

        [HttpPost("ResendConfirmEmail")]
        public async Task<IActionResult> ResendConfirmEmail([FromBody] ResendConfirmEmail_REQ oReq)
        {
            ApiResponse<string> response = null;

            try
            {
                // Update user logout
                var oResp = await _userService.ResendConfirmEmailAsync(oReq);

                if (oResp != null)
                {
                    switch (oResp.Code)
                    {
                        case RespCode.RespCode_Success:
                            response = ApiResponse<string>.CreateSuccessResponse(null, oResp.Message);
                            break;

                        default:
                            response = ApiResponse<string>.CreateErrorResponse(oResp.Message);
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                response = ApiResponse<string>.CreateErrorResponse($"Verify Email Failed, Exception: {ex.Message}");
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when verify user's email, Exception: {ex.Message}");
            }

            return Ok(response);
        }

        #endregion [ Resend Confirm Email ]

        #endregion [ Confirm Email ]

        #region [ Forgot / Reset Password Request ]

        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPassword_REQ oReq)
        {
            ApiResponse<string>? apiResponse = null;

            try
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Forgot Password Request, Email: {oReq.Email}");

                var oResp = await _userService.ForgotPasswordRequestAsync(oReq.Email);

                switch (oResp.Code)
                {
                    case RespCode.RespCode_Success:
                        // Create a success response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateSuccessResponse(null, "Forgot password request received. Please check your email for instructions to reset your password.");
                        break;

                    case RespCode.RespCode_Failed:
                        // Create a error response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateErrorResponse(oResp.Message);

                        break;

                    default: // Default is throw exception message
                        // Create a error response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateErrorResponse(oResp.Message);

                        break;
                }
            }
            catch (Exception ex)
            {
                apiResponse = ApiResponse<String>.CreateErrorResponse($"Forgot Password Request Failed. Exception: {ex.Message}");

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when forgot password request, Message: {ex.Message}", ex);
            }

            return Ok(apiResponse);
        }

        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPassword_REQ oReq)
        {
            ApiResponse<string>? apiResponse = null;

            try
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Reset Password Request, Token: {oReq.Token}");

                var oResp = await _userService.UpdateResetPasswordAsync(oReq);

                switch (oResp.Code)
                {
                    case RespCode.RespCode_Success:
                        // Create a success response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateSuccessResponse(null, oResp.Message);
                        break;

                    case RespCode.RespCode_Failed:
                        // Create a error response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateErrorResponse(oResp.Message);

                        break;

                    default: // Default is throw exception message
                        // Create a error response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateErrorResponse(oResp.Message);

                        break;
                        // return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                apiResponse = ApiResponse<String>.CreateErrorResponse($"Reset Password Request Failed. Exception: {ex.Message}");

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when reset password, Message: {ex.Message}", ex);
            }

            return Ok(apiResponse);
        }

        #endregion [ Forgot / Reset Password Request ]

        #region [ Function ]

        private void ClearCookies()
        {
            // Clear cookies by setting an expiration date in the past
            Response.Cookies.Append("authToken", "", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None, // Specify SameSite for cross-site context
                Expires = DateTime.UtcNow.AddDays(-1) // Set expiry date to past to delete the cookie
            });

            Response.Cookies.Append("refreshToken", "", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None, // Specify SameSite for cross-site context
                Expires = DateTime.UtcNow.AddDays(-1) // Set expiry date to past to delete the cookie
            });
        }

        private void SetCookies(string authToken, string refreshToken)
        {
            // var isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";

            Response.Cookies.Append("authToken", authToken, new CookieOptions
            {
                HttpOnly = true, // Prevent access via JavaScript
                Secure = true,   // Ensure the cookie is sent only over HTTPS
                SameSite = SameSiteMode.None, // Set none
                Expires = DateTime.UtcNow.AddMinutes(_expireMins),
            });

            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(_expireMins),
            });
        }

        #endregion [ Function ]
    }
}