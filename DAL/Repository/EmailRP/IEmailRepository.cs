using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository.EmailRP
{
    public interface IEmailRepository
    {
        Task CreateAsync(TEmail email);
        Task UpdateAsync(TEmail oEmail);
        Task<List<TEmail>> GetSendEmailListAsync(int oRetryAttempt);
        Task<TEmail> GetSendEmailAsync(string oId);
    }
}
