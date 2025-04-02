using DAL.Models;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.LegalTermsRP.LegalTermsRepository
{
    public interface ILegalTermsRepository : IListingHelper<TLegalTerm>
    {
        Task<List<TLegalTerm>> GetLegalTermsListByCategoryIdAsync(int CategoryId);
        Task<TLegalTerm> GetLegalTermsById(int Id);
        Task CreateAsync(TLegalTerm LegalTerm);
        Task UpdateAsync(TLegalTerm LegalTerm);
        Task DeleteAsync(TLegalTerm legalTerm);
    }
}
