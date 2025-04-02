using DAL.Models;
using DAL.Shared.Class;
using DAL.Tools.ListingHelper;
using DBL.LegalTerms_Service.LegalTermsCategoriesService.LegalTermsCategoriesActionClass;

namespace DBL.LegalTerms_Service.LegalTermsCategoriesService
{
    public interface ILegalTermsCategoriesService
    {
        Task<PagedResult<TLegalTermsCategory>> GetPagedListAsync(FilterParameters filterParameters);
        Task<CreateLegalTermCategories_RESP> CreateAsync(CreateLegalTermCategories_REQ oReq);
        Task<ShareResp> DeleteAsync(int id);
        Task<TLegalTermsCategory> GetRecByIdAsync(int id);
        Task<ShareResp> UpdateAsync(EditLegalTermCategories_REQ oReq);
    }
}
