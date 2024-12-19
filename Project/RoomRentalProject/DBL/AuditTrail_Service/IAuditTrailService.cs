using DAL.Models;
using DAL.Tools.ListingHelper;

namespace DBL.AuditTrail_Service
{
    public interface IAuditTrailService
    {
        Task CreateAuditTrailAsync<T>(string module, string action, T originalObject, T newObject);

        /// <summary>
        /// Create Audit Trail with Dictionary, compare Key & Value
        /// </summary>
        /// <param name="module"></param>
        /// <param name="action"></param>
        /// <param name="originalObject"></param>
        /// <param name="newObject"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task CreateAuditTrailAsync(string module, string action, string tableName, Dictionary<string, string> originalObject, Dictionary<string, string> newObject);

        Task<PagedResult<TAuditTrail>> GetPagedListAsync(FilterParameters filterParameters);
    }
}
