using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Shared.Class;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.LegalTermsRP.LegalTermsRepository.Class
{
    public class LegalTermsListing_REQ : FilterParameters
    {
        public string? CategoryName { get; set; }
        public string? Title { get; set; }
        public string? IsActive { get; set; }
    }

    public class LegalTermsListing_RESP : ShareResp
    {
        public PagedResult<LegalTermL> LegalTermListing = new PagedResult<LegalTermL>();
    }

    public class LegalTermL
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string Title { get; set; }
        public bool IsActive { get; set; }
    }
}
