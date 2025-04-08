using DAL.Models;
using DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository.Class;
using DAL.Tools.ListingHelper;
using DBL.LegalTerms_Service.LegalTermsCategoriesService;
using DBL.LegalTerms_Service.LegalTermsCategoriesService.LegalTermsCategoriesActionClass;
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
    public class LegalTermCategoriesController : BaseAPIController
    {
        private readonly ILegalTermsCategoriesService _legalTermCategoriesService;

        public LegalTermCategoriesController(ILegalTermsCategoriesService legalTermCategoriesService)
        {
            _legalTermCategoriesService = legalTermCategoriesService;
        }

        [HttpGet]
        [Route("GetLegalTermCategoriesList")]
        public async Task<IActionResult> GetLegalTermCategoriesList([FromQuery] LegalTermsCategoriesListing_REQ oReq)
        {
            ApiResponse<PagedResult<LegalTermCategoryL>>? apiResponse = null;
            LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request Get Legal Term List");

            try
            {
                var oResp = await _legalTermCategoriesService.GetPagedListAsync(oReq);

                apiResponse = ApiResponse<PagedResult<LegalTermCategoryL>>.CreateSuccessResponse(oResp.CategoryListing, "Get List Successful");
            }
            catch (Exception ex)
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when Get Legal Term List, Message: {ex.Message}", ex);

                apiResponse = ApiResponse<PagedResult<LegalTermCategoryL>>.CreateErrorResponse($"Get User List Failed. Exception: {ex.Message}");
            }

            return Ok(apiResponse);
        }

        [HttpGet]
        [Route("GetLegalTermCategoriesById")]
        public async Task<IActionResult> GetLegalTermCategoriesById([FromQuery] int LegalTermCategoryId)
        {
            ApiResponse<TLegalTermsCategory>? apiResponse = null;
            LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request Get Legal Term Categories Details, Id: {LegalTermCategoryId}");

            try
            {
                var oResp = await _legalTermCategoriesService.GetRecByIdAsync(LegalTermCategoryId);

                apiResponse = ApiResponse<TLegalTermsCategory>.CreateSuccessResponse(oResp, "Get Legal Term Categories Details Successful");
            }
            catch (Exception ex)
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when Get Legal Term Categories Details, Message: {ex.Message}", ex);

                apiResponse = ApiResponse<TLegalTermsCategory>.CreateErrorResponse($"Get Legal Term Categories Details. Exception: {ex.Message}");
            }

            return Ok(apiResponse);
        }

        [HttpPost]
        [Route("CreateLegalTermCategory")]
        public async Task<IActionResult> CreateLegalTermCategory([FromBody] CreateLegalTermCategories_REQ oReq)
        {
            ApiResponse<string> apiResponse = null;

            try
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to create legal term categories, Request: {JsonConvert.SerializeObject(oReq)}");

                var oResp = await _legalTermCategoriesService.CreateAsync(oReq);

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
                apiResponse = ApiResponse<String>.CreateErrorResponse($"Create legal term categories Failed. Exception: {ex.Message}");

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when create legal term categories, Message: {ex.Message}", ex);
            }


            return Ok(apiResponse);
        }

        [HttpPost]
        [Route("UpdateLegalTermCategory")]
        public async Task<IActionResult> UpdateLegalTermCategory([FromBody] EditLegalTermCategories_REQ oReq)
        {
            ApiResponse<string> apiResponse = null;

            try
            {
                LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to update legal term categories, Request: {JsonConvert.SerializeObject(oReq)}");

                var oResp = await _legalTermCategoriesService.UpdateAsync(oReq);

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
                apiResponse = ApiResponse<String>.CreateErrorResponse($"Update legal term categories Failed. Exception: {ex.Message}");

                LogHelper.FormatMainLogMessage(Enum_LogLevel.Error, $"Exception when update legal term categories, Message: {ex.Message}", ex);
            }

            return Ok(apiResponse);
        }

        [HttpPost]
        [Route("DeleteLegalTermCategory")]
        public async Task<IActionResult> DeleteLegalTermCategory([FromBody] int LegalTermCategoryId)
        {
            ApiResponse<string>? apiResponse = null;

            LogHelper.FormatMainLogMessage(Enum_LogLevel.Information, $"Receive Request to delete legal term category, LegalTermCategoryId: {LegalTermCategoryId}");

            try
            {
                var oResp = await _legalTermCategoriesService.DeleteAsync(LegalTermCategoryId);

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

                apiResponse = ApiResponse<String>.CreateErrorResponse($"Delete Legal Term Category Failed. Exception: {ex.Message}");
            }
            return Ok(apiResponse);
        }

    }
}
