using DAL.Models;
using DAL.Repository.UserRP.UserRepository.Class;
using DAL.Tools.ListingHelper;
using DBL.User_Service.UserService;
using DBL.User_Service.UserService.UserActionClass;
using E_commerce.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Utils.Constant;
using Utils.Enums;
using Utils.Model;
using Utils.Tools;

namespace E_commerce.Controllers.User_Controller
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : BaseAPIController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("GetUserList")]
        public async Task<IActionResult> GetUserList([FromQuery] UserListing_REQ oReq)
        {
            ApiResponse<PagedResult<UserL>>? apiResponse = null;
            LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request Get User List, User Listing Request: {JsonConvert.SerializeObject(oReq)}");

            try
            {
                var oResp = await _userService.GetUserListingAsync(oReq);

                switch (oResp.Code)
                {
                    case RespCode.RespCode_Success:
                        // Create a success response using ApiResponse<T>
                        apiResponse = ApiResponse<PagedResult<UserL>>.CreateSuccessResponse(oResp.UserList, "Get User List Successful");
                        break;

                    case RespCode.RespCode_Failed:
                        // Create a error response using ApiResponse<T>
                        apiResponse = ApiResponse<PagedResult<UserL>>.CreateErrorResponse(oResp.Message);

                        break;
                    default: // Default is throw exception message
                        // Create a error response using ApiResponse<T>
                        apiResponse = ApiResponse<PagedResult<UserL>>.CreateErrorResponse(oResp.Message);

                        break;
                        // return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when Get User List, Message: {ex.Message}", ex);

                apiResponse = ApiResponse<PagedResult<UserL>>.CreateErrorResponse($"Get User List Failed. Exception: {ex.Message}");
            }

            return Ok(apiResponse);
        }

        [HttpGet]
        [Route("ViewUser")]
        public async Task<IActionResult> ViewUser([FromQuery] int id)
        {
            ApiResponse<TUser>? apiResponse = null;
            LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request Get User List, User Id: {id}");

            try
            {
                var result = await _userService.GetByIdAsync(id);

                // Create a success response using ApiResponse<T>
                apiResponse = ApiResponse<TUser>.CreateSuccessResponse(result, "Get User Successful");
            }
            catch (Exception ex)
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when Get User, Message: {ex.Message}", ex);

                apiResponse = ApiResponse<TUser>.CreateErrorResponse($"Get User Failed. Exception: {ex.Message}");
            }

            return Ok(apiResponse);
        }

        #region [ Create, Edit, Delete ]

        [HttpPost]
        [Route("AddUser")]
        [Authorize(Policy = ConstantCode.AuthorizePolicy.AdminAccessPolicy)]
        public async Task<IActionResult> AddUser([FromBody] CreateUser_REQ oUser)
        {
            ApiResponse<string>? apiResponse = null;

            try
            {
                if (!string.IsNullOrEmpty(oUser.password))
                {
                    oUser.password = PasswordHelper.HashPassword(oUser.password);
                }

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to add user, Request: {JsonConvert.SerializeObject(oUser)}");

                var oResp = await _userService.CreateAsync(oUser);

                switch (oResp.Code)
                {
                    case RespCode.RespCode_Success:
                        // Create a success response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateSuccessResponse(oResp.UserId.ToString(), oResp.Message);
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
                apiResponse = ApiResponse<String>.CreateErrorResponse($"Create User Failed. Exception: {ex.Message}");

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when create user, Message: {ex.Message}", ex);
            }


            return Ok(apiResponse);
        }

        [HttpPost]
        [Route("EditUser")]
        [Authorize(Policy = ConstantCode.AuthorizePolicy.AdminAccessPolicy)]
        public async Task<IActionResult> EditUser([FromBody] EditUser_REQ oUser)
        {
            ApiResponse<string>? apiResponse = null;

            LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to edit user, Request: {JsonConvert.SerializeObject(oUser)}");

            try
            {
                if (!string.IsNullOrEmpty(oUser.password))
                {
                    oUser.password = PasswordHelper.HashPassword(oUser.password);
                }

                var oResp = await _userService.UpdateAsync(oUser);

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
                apiResponse = ApiResponse<String>.CreateErrorResponse($"Edit User Failed. Exception: {ex.Message}");

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when edit user, Message: {ex.Message}", ex);
            }


            return Ok(apiResponse);
        }

        [HttpPost]
        [Route("DeleteUser")]
        [Authorize(Policy = ConstantCode.AuthorizePolicy.AdminAccessPolicy)]
        public async Task<IActionResult> DeleteUser([FromBody] int userId)
        {
            ApiResponse<string>? apiResponse = null;

            LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to delete user, userId: {userId}");

            try
            {
                var oResp = await _userService.DeleteAsync(userId);

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
                    default: // Default is throw exception
                        // Create a error response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateErrorResponse(oResp.Message);

                        break;
                        // return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when Delete, Message: {ex.Message}", ex);

                apiResponse = ApiResponse<String>.CreateErrorResponse($"Delete User Failed. Exception: {ex.Message}");
            }

            return Ok(apiResponse);
        }

        #endregion

        #region [ Set User Status ]

        [HttpPost]
        [Route("SetUserStatus")]
        [Authorize(Policy = ConstantCode.AuthorizePolicy.AdminAccessPolicy)]
        public async Task<IActionResult> SetUserStatus([FromBody] int userId)
        {
            ApiResponse<string>? apiResponse = null;

            LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to set user's status, User Id: {userId}");

            try
            {
                var oResp = await _userService.SetUserStatusAsync(userId);

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
                    default: // Default is throw exception
                        // Create a error response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateErrorResponse(oResp.Message);

                        break;
                        // return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when set user's status, Message: {ex.Message}", ex);

                apiResponse = ApiResponse<String>.CreateErrorResponse($"Set User's Status Failed. Exception: {ex.Message}");
            }

            return Ok(apiResponse);
        }

        #endregion
    }
}
