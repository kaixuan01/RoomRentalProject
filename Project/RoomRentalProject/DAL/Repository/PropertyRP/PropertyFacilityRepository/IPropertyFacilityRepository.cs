using DAL.Models;
using Utils.Enums;

namespace DAL.Repository.PropertyRP.PropertyFacilityRepository
{
    public interface IPropertyFacilityRepository
    {
        Task<List<TPropertyFacility>> GetFacilitiesAsync(List<long> propertyIds);

        Task<List<long>> GetPropertyIdsByFacilityTypesAsync(List<long?> propertyIds, List<Enum_FacilityType?> types);

        Task CreateAsync(List<TPropertyFacility> propertyFacilities);

        Task UpdateAsync(List<TPropertyFacility> propertyFacilities);

        Task DeleteAsync(long id);
    }
}