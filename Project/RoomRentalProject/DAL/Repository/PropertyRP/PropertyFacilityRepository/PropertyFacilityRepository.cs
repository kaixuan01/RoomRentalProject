using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Utils.Enums;

namespace DAL.Repository.PropertyRP.PropertyFacilityRepository
{
    public class PropertyFacilityRepository : IPropertyFacilityRepository
    {
        private readonly AppDbContext _appDbContext;

        public PropertyFacilityRepository(AppDbContext context)
        {
            _appDbContext = context;
        }

        public async Task<List<TPropertyFacility>> GetFacilitiesAsync(List<long> propertyIds)
        {
            if (!propertyIds.IsNullOrEmpty())
                return new List<TPropertyFacility>();

            var facilities = await _appDbContext.TPropertyFacilities
                .Where(p => propertyIds.Contains(p.PropertyId))
                .ToListAsync();

            return facilities;
        }

        public async Task<List<long>> GetPropertyIdsByFacilityTypesAsync(List<long?> propertyIds, List<Enum_FacilityType?> types)
        {
            // Start the query from the database table
            var query = _appDbContext.TPropertyFacilities.AsQueryable();

            // Filter by facility types if provided
            if (!types.IsNullOrEmpty())
                query = query.Where(f => types.Contains((Enum_FacilityType)f.FacilityType));

            // Filter by property IDs if provided
            if (!propertyIds.IsNullOrEmpty())
                query = query.Where(f => propertyIds.Contains(f.PropertyId));

            // Select distinct property IDs
            var result = await query
                .Select(f => f.PropertyId)
                .Distinct()
                .ToListAsync();

            return result;
        }

        public async Task CreateAsync(List<TPropertyFacility> propertyFacilities)
        {
            await _appDbContext.TPropertyFacilities.AddRangeAsync(propertyFacilities);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(List<TPropertyFacility> propertyFacilities)
        {
            if (!propertyFacilities.IsNullOrEmpty())
            {
                var propertyIds = propertyFacilities.Select(f => f.PropertyId).Distinct().ToList();

                var existingFacilities = await _appDbContext.TPropertyFacilities
                    .Where(f => propertyIds.Contains(f.PropertyId))
                    .ToListAsync();

                _appDbContext.TPropertyFacilities.RemoveRange(existingFacilities);

                await _appDbContext.TPropertyFacilities.AddRangeAsync(propertyFacilities);

                await _appDbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(long propertyId)
        {
            var facilities = _appDbContext.TPropertyFacilities
                .Where(f => f.PropertyId == propertyId);

            _appDbContext.TPropertyFacilities.RemoveRange(facilities);
            await _appDbContext.SaveChangesAsync();
        }
    }
}