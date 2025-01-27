using DAL.Models;
using DAL.Repository.PropertyRP.PropertyRepository.Class;
using Utils.Enums;

namespace DAL.Repository.PropertyRP.PropertyRepository
{
    public interface IPropertyRepository
    {
        Task<IQueryable<PropertyL>> GetPropertyListing(PropertyListing_REQ oReq);

        Task<TProperty> GetByIdAsync(long id);

        Task<TProperty?> GetByOwnerIdAsync(int ownerId);

        Task CreateAsync(TProperty property);

        Task UpdateAsync(TProperty property);

        Task UpdateStatusAsync(List<long> ids, Enum_PropertyStatus status);
    }
}