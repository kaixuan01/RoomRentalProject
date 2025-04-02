using DAL.Models;
using DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository;
using DAL.Shared.Class;
using DAL.Tools.ListingHelper;
using DBL.AuditTrail_Service;
using DBL.LegalTerms_Service.LegalTermsCategoriesService.LegalTermsCategoriesActionClass;
using DBL.SystemConfig_Service;
using DBL.Tools;
using Utils.Constant;
using Utils.Enums;

namespace DBL.LegalTerms_Service.LegalTermsCategoriesService
{
    public class LegalTermsCategoriesService : ILegalTermsCategoriesService
    {
        private readonly ILegalTermsCategoriesRepository _legalTermsCategoriesRepository;
        private readonly ISystemConfigService _systemConfigService;
        private readonly IAuditTrailService _auditTrailService;

        public LegalTermsCategoriesService(ILegalTermsCategoriesRepository legalTermsCategoriesRepository, ISystemConfigService systemConfigService, IAuditTrailService auditTrailService)
        {
            _legalTermsCategoriesRepository = legalTermsCategoriesRepository;
            _systemConfigService = systemConfigService;
            _auditTrailService = auditTrailService;
        }

        public async Task<CreateLegalTermCategories_RESP> CreateAsync(CreateLegalTermCategories_REQ oReq)
        {
            var rtnValue = new CreateLegalTermCategories_RESP();

            if (oReq == null)
            {
                rtnValue.Code = RespCode.RespCode_Failed;
                rtnValue.Message = ErrorMessage.MissingRequiredField;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"oReq is null");
                return rtnValue;
            }

            try
            {
                var newLegalTermCategories = new TLegalTermsCategory
                {
                    IsActive = oReq.LegalTermCategories.IsActive,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = oReq.CreatedBy,
                };

                foreach (var item in oReq.LegalTermCategories.LegalTermCategoriesLanguages)
                {
                    newLegalTermCategories.TLegalTermsCategoriesLanguages.Add(new TLegalTermsCategoriesLanguage
                    {
                        LanguageId = (int)item.LanguageId,
                        CategoryName = item.CategoryName,
                        Description = item.Description,
                    });
                }

                // ## Create Legal Term Categories Record - Inclueded the Legal Terms
                await _legalTermsCategoriesRepository.CreateAsync(newLegalTermCategories);

                // Insert Audit Trail Record
                await _auditTrailService.CreateAuditTrailAsync(ConstantCode.Module.LegalTerms, ConstantCode.Action.Create, null, newLegalTermCategories);

                rtnValue.LegalTermCategoryId = newLegalTermCategories.Id;
                rtnValue.Code = RespCode.RespCode_Success;
                rtnValue.Message = RespCode.RespMessage_Insert_Successful;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"{RespCode.RespMessage_Insert_Successful}. Legal Term Category Id: {rtnValue.LegalTermCategoryId}");
            }
            catch (Exception ex)
            {
                rtnValue.Code = RespCode.RespCode_Exception;
                rtnValue.Message = ErrorMessage.GeneralError;
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, string.Format(ConstantCode.LogMessageTemplate.GeneralExceptionMessageTemplate, ex.Message));
            }

            return rtnValue;
        }

        public async Task<PagedResult<TLegalTermsCategory>> GetPagedListAsync(FilterParameters filterParameters)
        {
            var rtnValue = await _legalTermsCategoriesRepository.GetPagedListAsync(filterParameters, true);

            return rtnValue;
        }

        public async Task<TLegalTermsCategory> GetRecByIdAsync(int id)
        {
            var rtnValue = await _legalTermsCategoriesRepository.GetLegalTermsCategoriesById(id);

            return rtnValue;
        }

        public async Task<ShareResp> UpdateAsync(EditLegalTermCategories_REQ oReq)
        {
            var rtnValue = new ShareResp();

            if (oReq == null || oReq.LegalTermCategories == null)
            {
                rtnValue.Code = RespCode.RespCode_Failed;
                rtnValue.Message = ErrorMessage.MissingRequiredField;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"oReq is null");
                return rtnValue;
            }

            try
            {
                var oLegalTermCategory = await _legalTermsCategoriesRepository.GetLegalTermsCategoriesById(oReq.LegalTermCategories.Id);

                if (oLegalTermCategory == null)
                {
                    rtnValue.Code = RespCode.RespCode_Failed;
                    rtnValue.Message = ErrorMessage.DataNotFound;

                    LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"The requsted legal term category cannot be found. Id: {oReq.LegalTermCategories.Id}");
                    return rtnValue;
                }

                // Used to create audit trail record
                var copyLegalTermCategory = oLegalTermCategory.Clone();

                oLegalTermCategory.IsActive = oReq.LegalTermCategories.IsActive;
                oLegalTermCategory.UpdatedBy = oReq.UpdatedBy;
                oLegalTermCategory.UpdatedAt = DateTime.UtcNow;

                // ## Update Legal Term Category
                await _legalTermsCategoriesRepository.UpdateAsync(oLegalTermCategory);

                // Insert Audit Trail Record
                await _auditTrailService.CreateAuditTrailAsync(ConstantCode.Module.LegalTerms, ConstantCode.Action.Edit, copyLegalTermCategory, oLegalTermCategory);

                rtnValue.Code = RespCode.RespCode_Success;
                rtnValue.Message = RespCode.RespMessage_Update_Successful;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"{RespCode.RespMessage_Update_Successful}. Id: {oLegalTermCategory.Id}");
            }
            catch (Exception ex)
            {
                rtnValue.Code = RespCode.RespCode_Exception;
                rtnValue.Message = ErrorMessage.GeneralError;
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, string.Format(ConstantCode.LogMessageTemplate.GeneralExceptionMessageTemplate, ex.Message));
            }

            return rtnValue;
        }

        #region [ Delete ]

        public async Task<ShareResp> DeleteAsync(int id)
        {
            var rtnValue = new ShareResp();

            if (id < 0)
            {
                rtnValue.Code = RespCode.RespCode_Failed;
                rtnValue.Message = ErrorMessage.MissingRequiredField;
                return rtnValue;
            }

            try
            {
                var legalTermsCategory = await _legalTermsCategoriesRepository.GetLegalTermsCategoriesById(id);
                if (legalTermsCategory == null)
                {
                    rtnValue.Code = RespCode.RespCode_Failed;
                    rtnValue.Message = "Legal Term Category not found";

                    LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Legal Term Category not found, Id: {id}");
                    return rtnValue;
                }

                await _legalTermsCategoriesRepository.DeleteAsync(legalTermsCategory);

                await _auditTrailService.CreateAuditTrailAsync(ConstantCode.Module.LegalTerms, ConstantCode.Action.Delete, legalTermsCategory, null);

                rtnValue.Code = RespCode.RespCode_Success;
                rtnValue.Message = RespCode.RespMessage_Delete_Successful;
                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"{RespCode.RespMessage_Delete_Successful}. Legal Term Category Id: {id}");
            }
            catch (Exception ex)
            {
                rtnValue.Code = RespCode.RespCode_Exception;
                rtnValue.Message = ErrorMessage.GeneralError;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, string.Format(ConstantCode.LogMessageTemplate.GeneralExceptionMessageTemplate, ex.Message));
            }

            return rtnValue;
        }

        #endregion

    }
}
