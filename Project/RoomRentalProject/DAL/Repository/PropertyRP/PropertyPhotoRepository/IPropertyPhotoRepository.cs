using DAL.Models;
using Utils.Enums;

namespace DAL.Repository.PropertyRP.PropertyPhotoRepository
{
    public interface IPropertyPhotoRepository
    {
        // Get photos for single property
        Task<List<TPropertyPhoto>> GetPropertyPhotosAsync(long propertyId, Enum_PhotoType? photoType);

        //Get photos for list of property
        Task<List<TPropertyPhoto>> GetPropertyPhotosAsync(List<long> propertyIds, Enum_PhotoType? photoType);

        Task CreateAsync(List<TPropertyPhoto> propertyPhotos);

        Task UpdateAsync(List<TPropertyPhoto> propertyPhotos);
    }
}