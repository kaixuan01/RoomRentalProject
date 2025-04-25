using DAL.Models;
using DAL.Repository.LegalTermsRP.LegalTermsRepository.Class;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.LegalTermsRP.LegalTermsRepository
{
    public interface ILegalTermsRepository : IListingHelper<TLegalTerm>
    {
        Task<List<TLegalTerm>> GetLegalTermsListByCategoryIdAsync(int CategoryId);
        Task<IQueryable<LegalTermL>> GetLegalTermsListing(LegalTermsListing_REQ oReq);
        Task<TLegalTerm> GetLegalTermsById(int Id);
        Task CreateAsync(TLegalTerm LegalTerm);
        Task UpdateAsync(TLegalTerm LegalTerm);
        Task DeleteAsync(TLegalTerm legalTerm);
    }
}
