using DAL.Models;
using DAL.Shared.Class;

namespace DBL.SystemConfig_Service
{
    public interface ISystemConfigService
    {
        Task<ShareResp> UpdateAsync(UpdateSystemConfig_REQ oReq);

        Task<List<TSystemConfig>> GetSystemConfigList();

        Task<TSystemConfig> GetSystemConfigByKeyAsync(string key);
    }
}
