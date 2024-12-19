using DAL.Models;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.AuditTrailRP
{
    public interface IAuditTrailRepository : IListingHelper<TAuditTrail>
    {
        Task CreateAsync(TAuditTrail auditTrail);
    }
}
