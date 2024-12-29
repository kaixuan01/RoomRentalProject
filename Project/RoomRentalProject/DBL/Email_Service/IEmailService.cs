using DAL.Models;

namespace DBL.Email_Service
{
    public interface IEmailService
    {
        Task SendConfirmEmailAsync(TUser oUser);
        Task SendResetPasswordEmailAsync(TUser oUser);

        Task UpdateEmailAsync(long oId, string oStatus, string oRemark);
        Task<List<TEmail>> GetSendEmailListAsync();

    }
}
