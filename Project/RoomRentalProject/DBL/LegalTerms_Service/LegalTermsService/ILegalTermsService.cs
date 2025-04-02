using DAL.Models;
using DAL.Shared.Class;
using DAL.Tools.ListingHelper;
using DBL.LegalTerms_Service.LegalTermsService.LegalTermsActionClass;

namespace DBL.LegalTerms_Service.LegalTermsService
{
    public interface ILegalTermsService
    {
        Task<PagedResult<TLegalTerm>> GetPagedListAsync(FilterParameters filterParameters);
        Task<CreateLegalTerm_RESP> CreateAsync(CreateLegalTerm_REQ oReq);
        Task<EditLegalTerm_RESP> UpdateAsync(EditLegalTerm_REQ oReq);
        Task<ShareResp> DeleteAsync(int id);
    }
}
