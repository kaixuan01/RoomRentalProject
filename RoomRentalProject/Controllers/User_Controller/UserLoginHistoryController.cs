using DAL.Models;
using DAL.Tools.ListingHelper;
using DBL.User_Service.UserLoginHistoryService;
using Microsoft.AspNetCore.Mvc;
using Utils.Model;

namespace E_commerce.Controllers.User_Controller
{
    public class UserLoginHistoryController : BaseAPIController
    {
        private readonly IUserLoginHistoryService _userLoginHistoryService;

        public UserLoginHistoryController(IUserLoginHistoryService userLoginHistoryService)
        {
            _userLoginHistoryService = userLoginHistoryService;
        }

        [HttpGet]
        [Route("GetUserLoginHistoryList")]
        public async Task<IActionResult> GetUserLoginHistoryList([FromQuery] FilterParameters filterParameters)
        {
            ApiResponse<PagedResult<TUserLoginHistory>>? apiResponse = null;

            try
            {
                var result = await _userLoginHistoryService.GetLoginHistoryList(filterParameters, false);

                // Create a success response using ApiResponse<T>
                apiResponse = ApiResponse<PagedResult<TUserLoginHistory>>.CreateSuccessResponse(result, "Get TUser Login History List Successful");
            }
            catch (Exception ex)
            {
                apiResponse = ApiResponse<PagedResult<TUserLoginHistory>>.CreateErrorResponse($"Get TUser Login History List Failed. Exception: {ex.Message}");
            }


            return Ok(apiResponse);
        }
    }
}
