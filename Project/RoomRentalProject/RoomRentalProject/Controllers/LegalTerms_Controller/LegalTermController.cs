using DAL.Models;
using DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository.Class;
using DAL.Repository.LegalTermsRP.LegalTermsRepository.Class;
using DAL.Tools.ListingHelper;
using DBL.LegalTerms_Service.LegalTermsService;
using DBL.LegalTerms_Service.LegalTermsService.LegalTermsActionClass;
using E_commerce.Controllers;
using E_commerce.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Utils.Constant;
using Utils.Enums;
using Utils.Model;

namespace RoomRentalProject.Controllers.LegalTerms_Controller
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = ConstantCode.AuthorizePolicy.AdminAccessPolicy)]
    public class LegalTermController : BaseAPIController
    {
        private readonly ILegalTermsService _legalTermService;

        public LegalTermController(ILegalTermsService legalTermService)
        {
            _legalTermService = legalTermService;
        }

        [HttpGet]
        [Route("GetLegalTermList")]
        public async Task<IActionResult> GetLegalTermList([FromQuery] LegalTermsListing_REQ oReq)
        {
            ApiResponse<PagedResult<LegalTermL>>? apiResponse = null;
            LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request Get Legal Term List");

            try
            {
                var oResp = await _legalTermService.GetPagedListAsync(oReq);

                apiResponse = ApiResponse<PagedResult<LegalTermL>>.CreateSuccessResponse(oResp.LegalTermListing, "Get List Successful");
            }
            catch (Exception ex)
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when Get Legal Term List, Message: {ex.Message}", ex);

                apiResponse = ApiResponse<PagedResult<LegalTermL>>.CreateErrorResponse($"Get User List Failed. Exception: {ex.Message}");
            }

            return Ok(apiResponse);
        }

        [HttpPost]
        [Route("CreateLegalTerm")]
        public async Task<IActionResult> CreateLegalTerm([FromBody] CreateLegalTerm_REQ oReq)
        {
            ApiResponse<string> apiResponse = null;

            try
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to create legal term, Request: {JsonConvert.SerializeObject(oReq)}");

                var oResp = await _legalTermService.CreateAsync(oReq);

                switch (oResp.Code)
                {
                    case RespCode.RespCode_Success:
                        // Create a success response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateSuccessResponse(oResp.Message);
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
                apiResponse = ApiResponse<String>.CreateErrorResponse($"Create legal term Failed. Exception: {ex.Message}");

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when create legal term, Message: {ex.Message}", ex);
            }


            return Ok(apiResponse);
        }

        [HttpPost]
        [Route("UpdateLegalTerm")]
        public async Task<IActionResult> UpdateLegalTerm([FromBody] EditLegalTerm_REQ oReq)
        {
            ApiResponse<string> apiResponse = null;

            try
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to update legal term, Request: {JsonConvert.SerializeObject(oReq)}");

                var oResp = await _legalTermService.UpdateAsync(oReq);

                switch (oResp.Code)
                {
                    case RespCode.RespCode_Success:
                        // Create a success response using ApiResponse<T>
                        apiResponse = ApiResponse<string>.CreateSuccessResponse(oResp.Message);
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
                apiResponse = ApiResponse<String>.CreateErrorResponse($"Update legal term Failed. Exception: {ex.Message}");

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when Update legal term, Message: {ex.Message}", ex);
            }


            return Ok(apiResponse);
        }

        [HttpPost]
        [Route("DeleteLegalTerm")]
        public async Task<IActionResult> DeleteLegalTerm([FromBody] int LegalTermId)
        {
            ApiResponse<string>? apiResponse = null;

            LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to delete legal term, LegalTermId: {LegalTermId}");

            try
            {
                var oResp = await _legalTermService.DeleteAsync(LegalTermId);

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

                apiResponse = ApiResponse<String>.CreateErrorResponse($"Delete Legal Term Failed. Exception: {ex.Message}");
            }
            return Ok(apiResponse);
        }

    }
}
