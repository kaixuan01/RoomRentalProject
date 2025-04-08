using DAL.Models;
using DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository.Class;
using DAL.Repository.UserRP.UserRepository.Class;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository
{
    public interface ILegalTermsCategoriesRepository : IListingHelper<TLegalTermsCategory>
    {
        Task<IQueryable<LegalTermCategoryL>> GetLegalTermsCategoriesListing(LegalTermsCategoriesListing_REQ oReq);
        Task<List<TLegalTermsCategory>> GetLegalTermsListAsync();
        Task<TLegalTermsCategory> GetLegalTermsCategoriesById(int Id);
        Task CreateAsync(TLegalTermsCategory LegalTermsCategory);
        Task UpdateAsync(TLegalTermsCategory LegalTermsCategory);
        Task DeleteAsync(TLegalTermsCategory legalTermsCategory);
    }
}
