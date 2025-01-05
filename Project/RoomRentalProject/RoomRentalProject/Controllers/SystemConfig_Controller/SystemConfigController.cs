using DAL.Models;
using DBL.SystemConfig_Service;
using E_commerce.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Utils.Constant;
using Utils.Enums;
using Utils.Model;

namespace E_commerce.Controllers.SystemConfig_Controller
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = nameof(Enum_UserRole.Admin))]
    public class SystemConfigController : BaseAPIController
    {
        private readonly ISystemConfigService _systemConfigService;

        public SystemConfigController(ISystemConfigService systemConfigSevice)
        {
            _systemConfigService = systemConfigSevice;
        }

        [HttpGet]
        [Route("GetSystemConfigList")]
        public async Task<IActionResult> GetSystemConfigList()
        {
            ApiResponse<List<TSystemConfig>>? apiResponse = null;

            try
            {
                var result = await _systemConfigService.GetSystemConfigList();

                // Create a success response using ApiResponse<T>
                apiResponse = ApiResponse<List<TSystemConfig>>.CreateSuccessResponse(result, "Get System Config List Successful");
            }
            catch (Exception ex)
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when System Config List, Message: {ex.Message}", ex);

                apiResponse = ApiResponse<List<TSystemConfig>>.CreateErrorResponse($"Get System Config Failed. Exception: {ex.Message}");
            }

            return Ok(apiResponse);
        }

        [HttpPost]
        [Route("UpdateSystemConfig")]
        public async Task<IActionResult> UpdateSystemConfig([FromBody] UpdateSystemConfig_REQ oReq)
        {
            ApiResponse<string>? apiResponse = null;

            try
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to update system config, Request: {JsonConvert.SerializeObject(oReq)}");

                var oResp = await _systemConfigService.UpdateAsync(oReq);

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
                apiResponse = ApiResponse<String>.CreateErrorResponse($"Update System Config Failed. Exception: {ex.Message}");

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when update system config, Message: {ex.Message}", ex);
            }


            return Ok(apiResponse);
        }

    }
}
