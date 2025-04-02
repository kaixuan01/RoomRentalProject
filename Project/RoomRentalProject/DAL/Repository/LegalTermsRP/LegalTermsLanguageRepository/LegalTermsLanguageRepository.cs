using DAL.Models;
using DAL.Tools.ListingHelper;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository.LegalTermsRP.LegalTermsLanguageRepository
{
    public class LegalTermsLanguageRepository : ListingHelper<TLegalTerm>, ILegalTermsLanguageRepository
    {
        private readonly AppDbContext _appDbContext;

        public LegalTermsLanguageRepository(AppDbContext context) : base(context)
        {
            _appDbContext = context;
        }

        public async Task CreateAsync(TLegalTermsLanguage LegalTermLanguage)
        {
            await _appDbContext.TLegalTermsLanguages.AddAsync(LegalTermLanguage);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<TLegalTermsLanguage> GeTLegalTermsLanguageById(int Id)
        {
            return await _appDbContext.TLegalTermsLanguages
                            .Where(x => x.Id == Id)
                            .FirstOrDefaultAsync();
        }

        public async Task<TLegalTermsLanguage> GetLegalTermsLanguageByLegalTermIdNLanguageIdAsync(int legalTermId, int languageId)
        {
            return await _appDbContext.TLegalTermsLanguages.Where(x => x.LegalTermId == legalTermId && x.LanguageId == languageId).FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(TLegalTermsLanguage LegalTermLanguage)
        {
            // Attach the user entity to the context
            _appDbContext.Attach(LegalTermLanguage);

            // Mark all properties as modified
            _appDbContext.Entry(LegalTermLanguage).State = EntityState.Modified;

            // Save changes to the database
            await _appDbContext.SaveChangesAsync();
        }
    }
}
