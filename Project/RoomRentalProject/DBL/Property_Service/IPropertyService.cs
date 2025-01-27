using DAL.Models;
using DAL.Repository.PropertyRP.PropertyRepository.Class;
using DBL.Property_Service.PropertyActionClass;

namespace DBL.Property_Service
{
    public interface IPropertyService
    {
        // ## Get Property
        Task<PropertyListing_RESP> GetPropertiesAsync(PropertyListing_REQ oReq);

        Task<TProperty> GetByIdAsync(long id);

        // ## Create, Edit, Delete
        Task<CreateProperty_RESP> CreateAsync(CreateProperty_REQ user);

        Task<EditProperty_RESP> UpdateAsync(EditProperty_REQ user);

        Task<EditProperty_RESP> DeleteAsync(long id);

        // ## Approval
        Task<EditProperty_RESP> UpdateStatusAsync(EditPropertyApprovalStatus_REQ user);

        // ##Update status
        Task<EditProperty_RESP> UpdateStatusAsync(EditPropertyStatus_REQ user);
    }
}