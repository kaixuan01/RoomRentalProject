using DAL.Models;
using DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository;
using DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository.Class;
using DAL.Repository.LegalTermsRP.LegalTermsLanguageRepository;
using DAL.Repository.LegalTermsRP.LegalTermsRepository;
using DAL.Repository.LegalTermsRP.LegalTermsRepository.Class;
using DAL.Shared.Class;
using DAL.Tools.ListingHelper;
using DBL.AuditTrail_Service;
using DBL.LegalTerms_Service.LegalTermsService.LegalTermsActionClass;
using DBL.SystemConfig_Service;
using DBL.Tools;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Utils.Constant;
using Utils.Enums;

namespace DBL.LegalTerms_Service.LegalTermsService
{
    public class LegalTermsService : ILegalTermsService
    {
        private readonly ILegalTermsRepository _legalTermsRepository;
        private readonly ILegalTermsLanguageRepository _legalTermsLanguageRepository;
        private readonly ILegalTermsCategoriesRepository _legalTermsCategoriesRepository;
        private readonly ISystemConfigService _systemConfigService;
        private readonly IAuditTrailService _auditTrailService;

        public LegalTermsService(ILegalTermsRepository legalTermsRepository, ISystemConfigService systemConfigService, IAuditTrailService auditTrailService, ILegalTermsCategoriesRepository legalTermsCategoriesRepository, ILegalTermsLanguageRepository legalTermsLanguageRepository)
        {
            _legalTermsRepository = legalTermsRepository;
            _systemConfigService = systemConfigService;
            _auditTrailService = auditTrailService;
            _legalTermsCategoriesRepository = legalTermsCategoriesRepository;
            _legalTermsLanguageRepository = legalTermsLanguageRepository;
        }

        public async Task<CreateLegalTerm_RESP> CreateAsync(CreateLegalTerm_REQ oReq)
        {
            var rtnValue = new CreateLegalTerm_RESP();

            if (oReq == null || oReq.LegalTerm == null)
            {
                rtnValue.Code = RespCode.RespCode_Failed;
                rtnValue.Message = ErrorMessage.MissingRequiredField;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"oReq is null");
                return rtnValue;
            }

            try
            {
                var newLegalTerm = new TLegalTerm
                {
                    CategoryId = oReq.LegalTermCategoryId,
                    IsActive = oReq.LegalTerm.IsActive,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = oReq.CreatedBy,
                };

                foreach (var item1 in oReq.LegalTerm.LegalTermLanguages)
                {
                    newLegalTerm.TLegalTermsLanguages.Add(new TLegalTermsLanguage
                    {
                        LanguageId = (int)item1.LanguageId,
                        Title = item1.Title,
                        Content = item1.Content,
                    });
                }

                // ## Create Legal Terms
                await _legalTermsRepository.CreateAsync(newLegalTerm);

                // Insert Audit Trail Record
                await _auditTrailService.CreateAuditTrailAsync(ConstantCode.Module.LegalTerms, ConstantCode.Action.Create, null, newLegalTerm);

                rtnValue.Code = RespCode.RespCode_Success;
                rtnValue.Message = RespCode.RespMessage_Insert_Successful;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"{RespCode.RespMessage_Insert_Successful}. Legal Term Id: {newLegalTerm.Id}");
            }
            catch (Exception ex)
            {
                rtnValue.Code = RespCode.RespCode_Exception;
                rtnValue.Message = ErrorMessage.GeneralError;
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, string.Format(ConstantCode.LogMessageTemplate.GeneralExceptionMessageTemplate, ex.Message));
            }

            return rtnValue;
        }

        public async Task<EditLegalTerm_RESP> UpdateAsync(EditLegalTerm_REQ oReq)
        {
            var rtnValue = new EditLegalTerm_RESP();

            if (oReq == null || oReq.LegalTerm == null)
            {
                rtnValue.Code = RespCode.RespCode_Failed;
                rtnValue.Message = ErrorMessage.MissingRequiredField;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"oReq is null");
                return rtnValue;
            }

            try
            {
                var oLegalTermCategory = await _legalTermsCategoriesRepository.GetLegalTermsCategoriesById(oReq.LegalTermCategoryId);

                if(oLegalTermCategory == null)
                {
                    rtnValue.Code = RespCode.RespCode_Failed;
                    rtnValue.Message = ErrorMessage.DataNotFound;

                    LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"The requsted legal term category cannot be found. Id: {oReq.LegalTermCategoryId}");
                    return rtnValue;
                }

                var oLegalTerm = await _legalTermsRepository.GetLegalTermsById(oReq.LegalTerm.Id);

                if (oLegalTerm == null)
                {
                    rtnValue.Code = RespCode.RespCode_Failed;
                    rtnValue.Message = ErrorMessage.DataNotFound;

                    LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"The requsted legal term cannot be found. Id: {oReq.LegalTerm.Id}");
                    return rtnValue;
                }

                // Used to create audit trail record
                var copyLegalTerm = oLegalTerm.Clone();

                oLegalTerm.CategoryId = oLegalTermCategory.Id;
                oLegalTerm.IsActive = oReq.LegalTerm.IsActive;
                oLegalTerm.UpdatedBy = oReq.UpdatedBy;
                oLegalTerm.UpdatedAt = DateTime.UtcNow;

                // Update or add LegalTermLanguages
                foreach (var item in oReq.LegalTerm.LegalTermLanguages)
                {
                    var oLegalTermLanguages = oLegalTerm.TLegalTermsLanguages.Where(x => x.LanguageId == (int)item.LanguageId).FirstOrDefault();
                    //var oLegalTermLanguages = await _legalTermsLanguageRepository.GetLegalTermsLanguageByLegalTermIdNLanguageIdAsync(oLegalTerm.Id, (int)item.LanguageId);
                    
                    if (oLegalTermLanguages != null)
                    {
                        // Update existing entry
                        oLegalTermLanguages.Title = item.Title;
                        oLegalTermLanguages.Content = item.Content;
                    }
                    else
                    {
                        // Add a new entry if it doesn't exist
                        oLegalTerm.TLegalTermsLanguages.Add(new TLegalTermsLanguage
                        {
                            LanguageId = (int)item.LanguageId,
                            Title = item.Title,
                            Content = item.Content,
                            LegalTermId = oLegalTerm.Id
                        });
                    }
                }

                // ## Update Legal Terms
                await _legalTermsRepository.UpdateAsync(oLegalTerm);

                // Insert Audit Trail Record
                await _auditTrailService.CreateAuditTrailAsync(ConstantCode.Module.LegalTerms, ConstantCode.Action.Edit, copyLegalTerm, oLegalTerm);

                rtnValue.Code = RespCode.RespCode_Success;
                rtnValue.Message = RespCode.RespMessage_Update_Successful;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"{RespCode.RespMessage_Update_Successful}. Legal Term Id: {oLegalTerm.Id}");
            }
            catch (Exception ex)
            {
                rtnValue.Code = RespCode.RespCode_Exception;
                rtnValue.Message = ErrorMessage.GeneralError;
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, string.Format(ConstantCode.LogMessageTemplate.GeneralExceptionMessageTemplate, ex.Message));
            }

            return rtnValue;
        }

        public async Task<LegalTermsListing_RESP> GetPagedListAsync(LegalTermsListing_REQ oReq)
        {
            var rtnValue = new LegalTermsListing_RESP();

            var listingQuery = await _legalTermsRepository.GetLegalTermsListing(oReq);

            // Apply sorting
            if (!string.IsNullOrEmpty(oReq.SortBy))
            {
                listingQuery = oReq.SortDescending == true
                    ? listingQuery.OrderByDescending(e => EF.Property<object>(e, oReq.SortBy))
                    : listingQuery.OrderBy(e => EF.Property<object>(e, oReq.SortBy));
            }
            else
            {
                listingQuery = listingQuery.OrderBy(u => u.CategoryName); // Default sorting
            }

            rtnValue.LegalTermListing.TotalCount = listingQuery.Count();

            // Apply pagination
            var pagedListing = await listingQuery
                .Skip((oReq.PageNumber - 1) * oReq.PageSize)
                .Take(oReq.PageSize)
                .ToListAsync();

            LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Response Legal Terms List: {JsonConvert.SerializeObject(pagedListing)}");

            rtnValue.LegalTermListing.Items = pagedListing;
            rtnValue.Code = RespCode.RespCode_Success;
            rtnValue.Message = "Get Legal Terms List succesful";

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
                var legalTerm = await _legalTermsRepository.GetLegalTermsById(id);
                if (legalTerm == null)
                {
                    rtnValue.Code = RespCode.RespCode_Failed;
                    rtnValue.Message = "Legal Term not found";

                    LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Legal Term not found, Id: {id}");
                    return rtnValue;
                }

                await _legalTermsRepository.DeleteAsync(legalTerm);

                await _auditTrailService.CreateAuditTrailAsync(ConstantCode.Module.LegalTerms, ConstantCode.Action.Delete, legalTerm, null);

                rtnValue.Code = RespCode.RespCode_Success;
                rtnValue.Message = RespCode.RespMessage_Delete_Successful;
                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"{RespCode.RespMessage_Delete_Successful}. Id: {id}");
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
