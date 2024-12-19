using DAL.Models;

namespace DAL.Repository.SystemConfigRP
{
    public interface ISystemConfigRepository
    {
        Task<TSystemConfig> GetByKeyAsync(string key);
        Task UpdateAsync(TSystemConfig systemConfig);
        Task<List<TSystemConfig>> GetAllAsync();
    }
}
