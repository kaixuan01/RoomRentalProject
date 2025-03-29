using DAL.Models;
using DAL.Repository.PropertyRP.PropertyFacilityRepository;
using DAL.Repository.PropertyRP.PropertyLanguageRepository;
using DAL.Repository.PropertyRP.PropertyPhotoRepository;
using DAL.Repository.PropertyRP.PropertyRepository;
using DAL.Repository.PropertyRP.PropertyRepository.Class;
using DAL.Shared.Class;
using DBL.AuditTrail_Service;
using DBL.Property_Service.PropertyActionClass;
using DBL.Tools;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Utils.Constant;
using Utils.Enums;
using Utils.Tools;

namespace DBL.Property_Service
{
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _propertyRepository;
        private readonly IPropertyFacilityRepository _propertyFacilityRepository;
        private readonly IPropertyLanguageRepository _propertyLanguageRepository;
        private readonly IPropertyPhotoRepository _propertyPhotoRepository;
        private readonly IAuditTrailService _auditTrailService;

        public PropertyService(IPropertyRepository propertyRepository, IPropertyFacilityRepository propertyFacilityRepository, IPropertyLanguageRepository propertyLanguageRepository
            , IPropertyPhotoRepository propertyPhotoRepository, IAuditTrailService auditTrailService)
        {
            _propertyRepository = propertyRepository;
            _propertyFacilityRepository = propertyFacilityRepository;
            _propertyLanguageRepository = propertyLanguageRepository;
            _propertyPhotoRepository = propertyPhotoRepository;
            _auditTrailService = auditTrailService;
        }

        // ## Get Property
        public async Task<PropertyListing_RESP> GetPropertiesAsync(PropertyListing_REQ oReq)
        {
            var rtnValue = new PropertyListing_RESP();

            try
            {
                var filterFacilityPropertyIds = new List<long>();

                if (!oReq.PropertyTypes.IsNullOrEmpty())
                {
                    oReq.PropertyIds = await _propertyFacilityRepository.GetPropertyIdsByFacilityTypesAsync(null, oReq.FacilityTypes);
                }

                var propertyQuery = await _propertyRepository.GetPropertyListing(oReq);
                var propertyIds = propertyQuery.Select(x => x.Id).ToList();

                var propertyPhotoQuery = await _propertyPhotoRepository.GetPropertyPhotosAsync(propertyIds, Enum_PhotoType.Primary);

                //Add logic for facility filter
                var propertyFacilityQuery = await _propertyFacilityRepository.GetFacilitiesAsync(propertyIds);

                // Apply sorting
                if (!string.IsNullOrEmpty(oReq.SortBy))
                {
                    propertyQuery = oReq.SortDescending == true
                        ? propertyQuery.OrderByDescending(e => EF.Property<object>(e, oReq.SortBy))
                        : propertyQuery.OrderBy(e => EF.Property<object>(e, oReq.SortBy));
                }
                else
                {
                    propertyQuery = propertyQuery.OrderBy(u => u.UpdatedAt); // Default sorting
                }

                rtnValue.PropertyList.TotalCount = propertyQuery.Count();

                // Apply pagination
                var pagedProperties = await propertyQuery
                    .Skip((oReq.PageNumber - 1) * oReq.PageSize)
                    .Take(oReq.PageSize)
                    .ToListAsync();

                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Response User List: {JsonConvert.SerializeObject(pagedProperties)}");

                rtnValue.PropertyList.Items = pagedProperties;
                foreach (var item in rtnValue.PropertyList.Items)
                {
                    //item.PropertyLanguages = propertyLanguageQuery.Where(x => x.PropertyId == item.Id).Adapt<List<PropertyLanguageLItem>>();
                    item.PropertyPhotos = propertyPhotoQuery.Where(x => x.PropertyId == item.Id).Adapt<List<PropertyPhotoLItem>>();
                    item.FacilityTypes = propertyFacilityQuery.Where(x => x.PropertyId == item.Id).Select(x => x.FacilityType).Adapt<List<Enum_FacilityType>>();
                }
                rtnValue.Code = RespCode.RespCode_Success;
                rtnValue.Message = "Get Property List succesful";
            }
            catch (Exception ex)
            {
                rtnValue.Code = RespCode.RespCode_Exception;
                rtnValue.Message = ErrorMessage.GeneralError;
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, string.Format(ConstantCode.LogMessageTemplate.GeneralExceptionMessageTemplate, ex.Message));
            }
            return rtnValue;
        }

        public async Task<TProperty> GetByIdAsync(long id, Enum_LanguageId languageId)
        {
            var oProperty = await _propertyRepository.GetByIdAsync(id, (int)languageId);
            var oPropertyPhotos = await _propertyPhotoRepository.GetPropertyPhotosAsync(id, null);

            LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Response Property: {JsonConvert.SerializeObject(oProperty)}");

            return oProperty;
        }

        // ## Create, Edit, Delete
        public async Task<CreateProperty_RESP> CreateAsync(CreateProperty_REQ oProperty)
        {
            //TODO need to fix created by
            var rtnValue = new CreateProperty_RESP();

            if (oProperty == null)
            {
                rtnValue.Code = RespCode.RespCode_Failed;
                rtnValue.Message = ErrorMessage.MissingRequiredField;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"oProperty is null");
                return rtnValue;
            }
            try
            {
                var propertyId = await _propertyRepository.CreateAsync(oProperty.Adapt<TProperty>());

                if (!oProperty.Facilities.IsNullOrEmpty())
                {
                    await _propertyFacilityRepository.CreateAsync(oProperty.Facilities.Select(x => new TPropertyFacility
                    {
                        PropertyId = propertyId,
                        FacilityType = (int)x.FacilityType,
                        CreatedBy = 1,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedBy = 1,
                        UpdatedAt = DateTime.UtcNow,
                    }).ToList());
                }

                if (!oProperty.Languages.IsNullOrEmpty())
                {
                    await _propertyLanguageRepository.CreateAsync(oProperty.Languages.Select(x => new TPropertyLanguage
                    {
                        PropertyId = propertyId,
                        LanguageId = (int)x.LanguageId,
                        Name = x.Name,
                        PropertyDescription = x.Description,
                        CreatedBy = 1,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedBy = 1,
                        UpdatedAt = DateTime.UtcNow,
                    }).ToList());
                }

                if (!oProperty.Photos.IsNullOrEmpty())
                {
                    await _propertyPhotoRepository.CreateAsync(oProperty.Photos.Select(x => new TPropertyPhoto
                    {
                        PropertyId = propertyId,
                        PhotoType = (int)x.PhotoType,
                        CreatedBy = 1,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedBy = 1,
                        UpdatedAt = DateTime.UtcNow,
                    }).ToList());
                }
            }
            catch (Exception ex)
            {
                rtnValue.Code = RespCode.RespCode_Exception;
                rtnValue.Message = ErrorMessage.GeneralError;
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, string.Format(ConstantCode.LogMessageTemplate.GeneralExceptionMessageTemplate, ex.Message));
            }

            return rtnValue;
        }

        public async Task<EditProperty_RESP> UpdateAsync(EditProperty_REQ user)
        {
            var rtnValue = new EditProperty_RESP();

            return rtnValue;
        }

        public async Task<ShareResp> DeleteAsync(long id)
        {
            var rtnValue = new ShareResp();

            if (id < 0)
            {
                rtnValue.Code = RespCode.RespCode_Failed;
                rtnValue.Message = ErrorMessage.GeneralError;
                return rtnValue;
            }

            try
            {
                var property = await _propertyRepository.GetByIdAsync(id);
                if (property == null)
                {
                    rtnValue.Code = RespCode.RespCode_Failed;
                    rtnValue.Message = "Property not found";

                    LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Property not found, Property Id: {id}");
                    return rtnValue;
                }

                await _propertyFacilityRepository.DeleteAsync(id);
                await _propertyLanguageRepository.DeleteAsync(id);
                await _propertyPhotoRepository.DeleteAsync(id);
                await _propertyPhotoRepository.DeleteAsync(id);

                await _auditTrailService.CreateAuditTrailAsync(ConstantCode.Module.Property, ConstantCode.Action.Delete, property, null);

                rtnValue.Code = RespCode.RespCode_Success;
                rtnValue.Message = RespCode.RespMessage_Delete_Successful;
                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"{RespCode.RespMessage_Delete_Successful}. Property Id: {id}");
            }
            catch (Exception ex)
            {
                rtnValue.Code = RespCode.RespCode_Exception;
                rtnValue.Message = ErrorMessage.GeneralError;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, string.Format(ConstantCode.LogMessageTemplate.GeneralExceptionMessageTemplate, ex.Message));
            }

            return rtnValue;
        }

        // ## Approval
        public async Task<EditProperty_RESP> UpdateStatusAsync(EditPropertyApprovalStatus_REQ user)
        {
            var rtnValue = new EditProperty_RESP();
            return rtnValue;
        }

        // ##Update status
        public async Task<EditProperty_RESP> UpdateStatusAsync(EditPropertyStatus_REQ user)
        {
            var rtnValue = new EditProperty_RESP();
            return rtnValue;
        }
    }
}