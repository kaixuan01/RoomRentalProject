using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Utils.Enums;
using Utils.Tools;

namespace DAL.Repository.PropertyRP.PropertyLanguageRepository
{
    public class PropertyLanguageRepository : IPropertyLanguageRepository
    {
        private readonly AppDbContext _appDbContext;

        public PropertyLanguageRepository(AppDbContext context)
        {
            _appDbContext = context;
        }

        public async Task CreateAsync(List<TPropertyLanguage> propertyFacilities)
        {
            await _appDbContext.TPropertyLanguages.AddRangeAsync(propertyFacilities);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<List<TPropertyLanguage>> GetPropertyLanguageAsync(List<long> propertyIds, Enum_LanguageId languageId)
        {
            if (propertyIds.IsNullOrEmpty())
                return new List<TPropertyLanguage>();

            var languages = await _appDbContext.TPropertyLanguages
                .Where(p => propertyIds.Contains(p.PropertyId) && p.LanguageId == (int)languageId)
                .ToListAsync();

            return languages;
        }

        public async Task<TPropertyLanguage> GetPropertyLanguageAsync(long propertyId, Enum_LanguageId languageId)
        {
            var propertyLanguage = await _appDbContext.TPropertyLanguages
                    .FirstOrDefaultAsync(p => p.PropertyId == propertyId && p.LanguageId == (int)languageId);

            return propertyLanguage;
        }

        public async Task<List<TPropertyLanguage>> GetPropertyLanguagesAsync(List<long> propertyIds)
        {
            if (!propertyIds.IsNullOrEmpty())
                return new List<TPropertyLanguage>();

            var langauges = await _appDbContext.TPropertyLanguages
                .Where(p => propertyIds.Contains(p.PropertyId))
                .ToListAsync();

            return langauges;
        }

        public async Task UpdateAsync(List<TPropertyLanguage> propertyLanguages)
        {
            var propertyId = propertyLanguages.FirstOrDefault()?.PropertyId;

            var existingLanguages = await _appDbContext.TPropertyLanguages
                   .Where(pl => pl.PropertyId == propertyId)
                   .ToListAsync();

            foreach (var existing in existingLanguages)
            {
                var updated = propertyLanguages.FirstOrDefault(pl => pl.Id == existing.Id);
                if (updated != null)
                {
                    existing.PropertyId = updated.PropertyId;
                    existing.LanguageId = updated.LanguageId;
                    existing.Name = updated.Name;
                    existing.PropertyDescription = updated.PropertyDescription;
                    existing.UpdatedAt = DateTime.UtcNow; // Set the update timestamp
                    existing.UpdatedBy = updated.UpdatedBy; // Set the updated user
                }
            }

            // Save changes to the database
            await _appDbContext.SaveChangesAsync();
        }
    }
}