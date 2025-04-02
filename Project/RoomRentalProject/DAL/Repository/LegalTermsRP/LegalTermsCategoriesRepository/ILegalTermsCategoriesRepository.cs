using DAL.Models;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository
{
    public interface ILegalTermsCategoriesRepository : IListingHelper<TLegalTermsCategory>
    {
        Task<List<TLegalTermsCategory>> GetLegalTermsListAsync();
        Task<TLegalTermsCategory> GetLegalTermsCategoriesById(int Id);
        Task CreateAsync(TLegalTermsCategory LegalTermsCategory);
        Task UpdateAsync(TLegalTermsCategory LegalTermsCategory);
        Task DeleteAsync(TLegalTermsCategory legalTermsCategory);
    }
}
