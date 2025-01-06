using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Utils;
using Utils.Enums;

namespace DAL.Repository.EmailRP
{
    public class EmailRepository : IEmailRepository
    {
        private readonly AppDbContext _appDbContext;

        public EmailRepository(AppDbContext context)
        {
            _appDbContext = context;
        }

        public async Task CreateAsync(TEmail email)
        {
            await _appDbContext.TEmails.AddAsync(email);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(TEmail oEmail)
        {
            // Attach the user entity to the context
            _appDbContext.Attach(oEmail);

            // Mark all properties as modified
            _appDbContext.Entry(oEmail).State = EntityState.Modified;

            // Save changes to the database
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<List<TEmail>> GetSendEmailListAsync(int oRetryAttempt)
        {
            if (oRetryAttempt <= 0)
            {
                throw new ArgumentException("Retry attempts must be greater than zero.", nameof(oRetryAttempt));
            }

            return await _appDbContext.TEmails
                        .Where(e => e.Status == (short)Enum_Status.Pending ||
                                    (e.Status == (short)Enum_Status.Failed && e.IcntFailedSend < oRetryAttempt))  // Filter for pending or failed emails within retry limit
                        .OrderBy(e => e.CreatedDateTime)  // Order by creation date to process oldest emails first
                        .ToListAsync();  // Execute the query and return the results as a list
        }

        public async Task<TEmail> GetSendEmailAsync(long oId)
        {
            return await _appDbContext.TEmails.FirstOrDefaultAsync(x => x.Id == oId);
        }
    }
}
