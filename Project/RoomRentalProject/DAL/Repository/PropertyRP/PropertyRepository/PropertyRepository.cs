using DAL.Models;
using DAL.Repository.PropertyRP.PropertyRepository.Class;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Utils.Enums;
using Utils.Tools;

namespace DAL.Repository.PropertyRP.PropertyRepository
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly AppDbContext _appDbContext;

        public PropertyRepository(AppDbContext context)
        {
            _appDbContext = context;
        }

        public async Task<long> CreateAsync(TProperty property)
        {
            await _appDbContext.TProperties.AddAsync(property);
            await _appDbContext.SaveChangesAsync();

            return property.Id;
        }

        public async Task<PropertyL> GetByIdAsync(long id, int? languageId = null)
        {
            var query = _appDbContext.TProperties
                .Where(property => property.Id == id)
                .Join(_appDbContext.TPropertyLanguages,
                      property => property.Id,
                      language => language.PropertyId,
                      (property, language) => new { property, language });

            if (languageId.HasValue)
            {
                query = query.Where(joined => joined.language.Id == languageId.Value);
            }

            var result = await query
                .GroupBy(joined => joined.property)
                .Select(group => new PropertyL
                {
                    Id = group.Key.Id,
                    OwnerId = group.Key.OwnerId,
                    Address = group.Key.Address,
                    Price = group.Key.Price,
                    PropertyType = ((Enum_PropertyType)group.Key.PropertyType).GetDescription(),
                    AreaSize = group.Key.AreaSize,
                    Latitude = group.Key.Latitude,
                    Longitude = group.Key.Longitude,
                    PropertyStatus = ((Enum_PropertyStatus)group.Key.PropertyStatus).GetDescription(),
                    ApprovalStatus = ((Enum_ApprovalStatus)group.Key.ApprovalStatus).GetDescription(),
                    ApprovedAt = group.Key.ApprovedAt,
                    CreatedAt = group.Key.CreatedAt,
                    CreatedBy = group.Key.CreatedBy,
                    UpdatedAt = group.Key.UpdatedAt,
                    PropertyLanguages = group.Select(joined => new PropertyLanguageLItem
                    {
                        LanguageId = (Enum_LanguageId)joined.language.Id,
                        Name = joined.language.Name,
                        Description = joined.language.PropertyDescription
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            return result;
        }

        public async Task<TProperty?> GetByOwnerIdAsync(int ownerId)
        {
            return await _appDbContext.TProperties.FirstOrDefaultAsync(x => x.OwnerId == ownerId);
        }

        public async Task<IQueryable<PropertyL>> GetPropertyListing(PropertyListing_REQ oReq)
        {
            var query = _appDbContext.TProperties
                .AsQueryable();

            // Apply filters
            if (oReq.OwnerId.HasValue)
                query = query.Where(u => u.OwnerId == oReq.OwnerId);

            if (!string.IsNullOrEmpty(oReq.Address))
                query = query.Where(u => u.Address.Contains(oReq.Address));

            if (oReq.FromPrice.HasValue)
                query = query.Where(u => u.Price >= oReq.FromPrice.Value);

            if (oReq.ToPrice.HasValue)
                query = query.Where(u => u.Price <= oReq.ToPrice.Value);

            if (oReq.FromAreaSize.HasValue)
                query = query.Where(u => u.AreaSize >= oReq.FromAreaSize.Value);

            if (oReq.ToAreaSize.HasValue)
                query = query.Where(u => u.AreaSize <= oReq.ToAreaSize.Value);

            if (oReq.FromLatitude.HasValue)
                query = query.Where(u => u.Latitude >= oReq.FromLatitude.Value);

            if (oReq.ToLatitude.HasValue)
                query = query.Where(u => u.Latitude <= oReq.ToLatitude.Value);

            if (oReq.FromLongitude.HasValue)
                query = query.Where(u => u.Longitude >= oReq.FromLongitude.Value);

            if (oReq.ToLongitude.HasValue)
                query = query.Where(u => u.Longitude <= oReq.ToLongitude.Value);

            if (!oReq.PropertyTypes.IsNullOrEmpty())
                query = query.Where(u => oReq.PropertyTypes.Adapt<List<int>>().Contains(u.PropertyType));

            if (!oReq.PropertyStatuses.IsNullOrEmpty())
                query = query.Where(u => oReq.PropertyStatuses.Adapt<List<int>>().Contains(u.PropertyStatus));

            if (!oReq.ApprovalStatuses.IsNullOrEmpty())
                query = query.Where(u => oReq.ApprovalStatuses.Adapt<List<int>>().Contains(u.ApprovalStatus));

            if (oReq.FromApprovedAt.HasValue)
                query = query.Where(u => u.ApprovedAt >= oReq.FromApprovedAt.Value);

            if (oReq.ToApprovedAt.HasValue)
                query = query.Where(u => u.ApprovedAt <= oReq.ToApprovedAt.Value);

            if (oReq.FromCreatedAt.HasValue)
                query = query.Where(u => u.CreatedAt >= oReq.FromCreatedAt.Value);

            if (oReq.ToCreatedAt.HasValue)
                query = query.Where(u => u.CreatedAt <= oReq.ToCreatedAt.Value);

            if (oReq.CreatedBy.HasValue)
                query = query.Where(u => u.CreatedBy == oReq.CreatedBy);

            if (oReq.FromUpdatedAt.HasValue)
                query = query.Where(u => u.UpdatedAt >= oReq.FromUpdatedAt.Value);

            if (oReq.ToUpdatedAt.HasValue)
                query = query.Where(u => u.UpdatedAt <= oReq.ToUpdatedAt.Value);

            if (!oReq.PropertyIds.IsNullOrEmpty())
                query = query.Where(u => oReq.PropertyIds.Contains(u.Id));

            var result = query.Join(
                    _appDbContext.TPropertyLanguages,
                    property => property.Id,
                    language => language.PropertyId,
                    (property, language) => new { property, language })
                .Where(joined => joined.language.Id == (int)oReq.LanguageId)
                .Select(joined => new PropertyL
                {
                    Id = joined.property.Id,
                    OwnerId = joined.property.OwnerId,
                    Address = joined.property.Address,
                    Price = joined.property.Price,
                    PropertyType = ((Enum_PropertyType)joined.property.PropertyType).GetDescription(),
                    AreaSize = joined.property.AreaSize,
                    Latitude = joined.property.Latitude,
                    Longitude = joined.property.Longitude,
                    PropertyStatus = ((Enum_PropertyStatus)joined.property.PropertyStatus).GetDescription(),
                    ApprovalStatus = ((Enum_ApprovalStatus)joined.property.ApprovalStatus).GetDescription(),
                    ApprovedAt = joined.property.ApprovedAt,
                    CreatedAt = joined.property.CreatedAt,
                    CreatedBy = joined.property.CreatedBy,
                    UpdatedAt = joined.property.UpdatedAt,
                    PropertyLanguages = new List<PropertyLanguageLItem>
                    {
                        new PropertyLanguageLItem
                        {
                            LanguageId = (Enum_LanguageId)joined.language.Id, // Convert to Enum if necessary
                            Name = joined.language.Name,
                            Description = joined.language.PropertyDescription
                        }
                    }
                });

            return result;
        }

        public async Task UpdateAsync(TProperty property)
        {
            // Attach the user entity to the context
            _appDbContext.Attach(property);

            // Mark all properties as modified
            _appDbContext.Entry(property).State = EntityState.Modified;

            // Save changes to the database
            await _appDbContext.SaveChangesAsync();
        }

        public async Task UpdateStatusAsync(List<long> ids, Enum_PropertyStatus status)
        {
            var propertiesToUpdate = await _appDbContext.TProperties
                .Where(p => ids.Contains(p.Id))
                .ToListAsync();

            foreach (var property in propertiesToUpdate)
                property.PropertyStatus = (int)status;

            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(long id)
        {
            var property = await _appDbContext.TProperties.FindAsync(id);

            _appDbContext.TProperties.Remove(property);
            await _appDbContext.SaveChangesAsync();
        }
    }
}