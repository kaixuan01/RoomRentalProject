using DAL.Models;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.LegalTermsRP.LegalTermsLanguageRepository
{
    public interface ILegalTermsLanguageRepository : IListingHelper<TLegalTerm>
    {
        Task CreateAsync(TLegalTermsLanguage LegalTermLanguage);

        Task<TLegalTermsLanguage> GeTLegalTermsLanguageById(int Id);

        Task<TLegalTermsLanguage> GetLegalTermsLanguageByLegalTermIdNLanguageIdAsync(int legalTermId, int languageId);

        Task UpdateAsync(TLegalTermsLanguage LegalTermLanguage);

    }
}
