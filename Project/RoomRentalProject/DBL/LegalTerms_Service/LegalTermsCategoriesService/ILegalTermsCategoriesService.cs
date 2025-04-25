using DAL.Models;
using DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository.Class;
using DAL.Shared.Class;
using DBL.LegalTerms_Service.LegalTermsCategoriesService.LegalTermsCategoriesActionClass;

namespace DBL.LegalTerms_Service.LegalTermsCategoriesService
{
    public interface ILegalTermsCategoriesService
    {
        Task<LegalTermsCategoryListing_RESP> GetPagedListAsync(LegalTermsCategoriesListing_REQ oReq);
        Task<CreateLegalTermCategories_RESP> CreateAsync(CreateLegalTermCategories_REQ oReq);
        Task<ShareResp> DeleteAsync(int id);
        Task<TLegalTermsCategory> GetRecByIdAsync(int id);
        Task<ShareResp> UpdateAsync(EditLegalTermCategories_REQ oReq);
    }
}
