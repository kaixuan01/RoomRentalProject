using DAL.Models;
using DAL.Repository.PropertyRP.PropertyFacilityRepository;
using DAL.Repository.PropertyRP.PropertyLanguageRepository;
using DAL.Repository.PropertyRP.PropertyPhotoRepository;
using DAL.Repository.PropertyRP.PropertyRepository;
using DAL.Repository.PropertyRP.PropertyRepository.Class;
using DBL.Property_Service.PropertyActionClass;
using DBL.Tools;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Utils.Constant;
using Utils.Enums;

namespace DBL.Property_Service
{
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _propertyRepository;
        private readonly IPropertyFacilityRepository _propertyFacilityRepository;
        private readonly IPropertyLanguageRepository _propertyLanguageRepository;
        private readonly IPropertyPhotoRepository _propertyPhotoRepository;

        public PropertyService(IPropertyRepository propertyRepository, IPropertyFacilityRepository propertyFacilityRepository, IPropertyLanguageRepository propertyLanguageRepository, IPropertyPhotoRepository propertyPhotoRepository)
        {
            _propertyRepository = propertyRepository;
            _propertyFacilityRepository = propertyFacilityRepository;
            _propertyLanguageRepository = propertyLanguageRepository;
            _propertyPhotoRepository = propertyPhotoRepository;
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

                //Add logic if no selected language then fallback Eng
                var propertyLanguageQuery = await _propertyLanguageRepository.GetPropertyLanguageAsync(propertyIds, oReq.LanguageId);
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
                    item.PropertyLanguages = propertyLanguageQuery.Where(x => x.PropertyId == item.Id).Adapt<List<PropertyLanguageLItem>>();
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

        public async Task<TProperty> GetByIdAsync(long id)
        {
            var oProperty = await _propertyRepository.GetByIdAsync(id);
            var oPropertyPhotos = await _propertyPhotoRepository.GetPropertyPhotosAsync(id, null);

            LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Response Property: {JsonConvert.SerializeObject(oProperty)}");

            return oProperty;
        }

        // ## Create, Edit, Delete
        public async Task<CreateProperty_RESP> CreateAsync(CreateProperty_REQ oProperty)
        {
            var rtnValue = new CreateProperty_RESP();

            if (oProperty == null)
            {
                rtnValue.Code = RespCode.RespCode_Failed;
                rtnValue.Message = ErrorMessage.MissingRequiredField;

                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"oUser is null");
                return rtnValue;
            }
            try
            {
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

        public async Task<EditProperty_RESP> DeleteAsync(long id)
        {
            var rtnValue = new EditProperty_RESP();
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