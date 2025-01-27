using DAL.Models;
using Utils.Enums;

namespace DAL.Repository.PropertyRP.PropertyLanguageRepository
{
    public interface IPropertyLanguageRepository
    {
        #region Management

        //Get 1 or many properties
        Task<List<TPropertyLanguage>> GetPropertyLanguagesAsync(List<long> propertyIds);

        //Get 1 or many properties with specific language
        Task<List<TPropertyLanguage>> GetPropertyLanguageAsync(List<long> propertyIds, Enum_LanguageId languageId);

        #endregion Management

        #region User

        //Get 1 with specific language
        Task<TPropertyLanguage> GetPropertyLanguageAsync(long propertyId, Enum_LanguageId languageId);

        #endregion User

        Task CreateAsync(List<TPropertyLanguage> propertyLanguages);

        Task UpdateAsync(List<TPropertyLanguage> propertyLanguages);
    }
}