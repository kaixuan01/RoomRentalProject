using DAL.Repository.LegalTermsRP.LegalTermsRepository.Class;
using DAL.Shared.Class;
using DBL.LegalTerms_Service.LegalTermsService.LegalTermsActionClass;

namespace DBL.LegalTerms_Service.LegalTermsService
{
    public interface ILegalTermsService
    {
        Task<LegalTermsListing_RESP> GetPagedListAsync(LegalTermsListing_REQ oReq);
        Task<CreateLegalTerm_RESP> CreateAsync(CreateLegalTerm_REQ oReq);
        Task<EditLegalTerm_RESP> UpdateAsync(EditLegalTerm_REQ oReq);
        Task<ShareResp> DeleteAsync(int id);
    }
}
