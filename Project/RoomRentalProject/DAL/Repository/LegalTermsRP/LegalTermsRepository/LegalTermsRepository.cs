using DAL.Models;
using DAL.Tools.ListingHelper;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository.LegalTermsRP.LegalTermsRepository
{
    public class LegalTermsRepository : ListingHelper<TLegalTerm>, ILegalTermsRepository
    {
        private readonly AppDbContext _appDbContext;

        public LegalTermsRepository(AppDbContext context) : base(context)
        {
            _appDbContext = context;
        }

        public async Task CreateAsync(TLegalTerm LegalTerm)
        {
            await _appDbContext.TLegalTerms.AddAsync(LegalTerm);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<TLegalTerm> GetLegalTermsById(int Id)
        {
            return await _appDbContext.TLegalTerms
                        .Include(x => x.TLegalTermsLanguages) // Include related table
                        .Where(x => x.Id == Id)
                        .FirstOrDefaultAsync();
        }

        public async Task<List<TLegalTerm>> GetLegalTermsListByCategoryIdAsync(int CategoryId)
        {
            return await _appDbContext.TLegalTerms.Where(x => x.CategoryId == CategoryId).ToListAsync();
        }

        public async Task UpdateAsync(TLegalTerm LegalTerm)
        {
            // Attach the user entity to the context
            _appDbContext.Attach(LegalTerm);

            // Mark all properties as modified
            _appDbContext.Entry(LegalTerm).State = EntityState.Modified;

            // Save changes to the database
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(TLegalTerm legalTerm)
        {
            _appDbContext.TLegalTerms.Remove(legalTerm);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
