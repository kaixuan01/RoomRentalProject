using DAL.Models;
using DAL.Tools.ListingHelper;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository
{
    public class LegalTermsCategoriesRepository : ListingHelper<TLegalTermsCategory>, ILegalTermsCategoriesRepository
    {
        private readonly AppDbContext _appDbContext;

        public LegalTermsCategoriesRepository(AppDbContext context) : base(context)
        {
            _appDbContext = context;
        }

        public async Task CreateAsync(TLegalTermsCategory LegalTermsCategory)
        {
            await _appDbContext.TLegalTermsCategories.AddAsync(LegalTermsCategory);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<TLegalTermsCategory> GetLegalTermsCategoriesById(int Id)
        {
            return await _appDbContext.TLegalTermsCategories
                            .Where(x => x.Id == Id)
                            .FirstOrDefaultAsync();
        }

        public async Task<List<TLegalTermsCategory>> GetLegalTermsListAsync()
        {
            return await _appDbContext.TLegalTermsCategories.ToListAsync();
        }

        public async Task UpdateAsync(TLegalTermsCategory LegalTermsCategory)
        {
            // Attach the user entity to the context
            _appDbContext.Attach(LegalTermsCategory);

            // Mark all properties as modified
            _appDbContext.Entry(LegalTermsCategory).State = EntityState.Modified;

            // Save changes to the database
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(TLegalTermsCategory legalTermsCategory)
        {
            _appDbContext.TLegalTermsCategories.Remove(legalTermsCategory);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
