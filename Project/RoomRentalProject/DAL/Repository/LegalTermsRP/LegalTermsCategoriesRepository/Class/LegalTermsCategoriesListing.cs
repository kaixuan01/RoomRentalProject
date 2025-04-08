using DAL.Shared.Class;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository.Class
{
    public class LegalTermsCategoriesListing_REQ : FilterParameters
    {
        public string? CategoryName { get; set; }
        public string? IsActive { get; set; }
    }

    public class LegalTermsCategoriesListing_RESP : ShareResp
    {
        public PagedResult<LegalTermCategoryL> CategoryListing = new PagedResult<LegalTermCategoryL>();
    }

    public class LegalTermCategoryL
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public bool IsActive { get; set; }
    }
}
