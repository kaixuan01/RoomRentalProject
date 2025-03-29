using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Utils.Enums;
using Utils.Tools;

namespace DAL.Repository.PropertyRP.PropertyPhotoRepository
{
    public class PropertyPhotoRepository : IPropertyPhotoRepository
    {
        private readonly AppDbContext _appDbContext;

        public PropertyPhotoRepository(AppDbContext context)
        {
            _appDbContext = context;
        }

        public async Task CreateAsync(List<TPropertyPhoto> propertyPhotos)
        {
            await _appDbContext.TPropertyPhotos.AddRangeAsync(propertyPhotos);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<List<TPropertyPhoto>> GetPropertyPhotosAsync(long propertyId, Enum_PhotoType? photoType)
        {
            var query = _appDbContext.TPropertyPhotos
                .Where(p => p.PropertyId == propertyId);

            // Execute the query and return the result
            var photos = await query.ToListAsync();
            return photos;
        }

        public async Task<List<TPropertyPhoto>> GetPropertyPhotosAsync(List<long> propertyIds, Enum_PhotoType? photoType)
        {
            if (propertyIds.IsNullOrEmpty())
                return new List<TPropertyPhoto>();

            var query = _appDbContext.TPropertyPhotos
                .Where(p => propertyIds.Contains(p.PropertyId));

            // Apply the photoType filter only if it is not null
            if (photoType.HasValue)
                query = query.Where(p => p.PhotoType == (int)photoType.Value);

            // Execute the query and return the result
            var photos = await query.ToListAsync();
            return photos;
        }

        public async Task UpdateAsync(List<TPropertyPhoto> propertyPhotos)
        {
            if (!propertyPhotos.IsNullOrEmpty())
            {
                var propertyIds = propertyPhotos.Select(f => f.PropertyId).Distinct().ToList();

                var existingPhotos = await _appDbContext.TPropertyPhotos
                    .Where(f => propertyIds.Contains(f.PropertyId))
                    .ToListAsync();

                _appDbContext.TPropertyPhotos.RemoveRange(existingPhotos);

                await _appDbContext.TPropertyPhotos.AddRangeAsync(propertyPhotos);

                await _appDbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(long propertyId)
        {
            var facilities = _appDbContext.TPropertyPhotos
                .Where(f => f.PropertyId == propertyId);

            _appDbContext.TPropertyPhotos.RemoveRange(facilities);
            await _appDbContext.SaveChangesAsync();
        }
    }
}