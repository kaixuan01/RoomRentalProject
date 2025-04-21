using DAL.Models;
using DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository.Class;
using DAL.Repository.UserRP.UserRepository.Class;
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
                .Include(x => x.TLegalTermsCategoriesLanguages) // <-- Include related table
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

        public async Task<IQueryable<LegalTermCategoryL>> GetLegalTermsCategoriesListing(LegalTermsCategoriesListing_REQ oReq)
        {
            var query = _appDbContext.TLegalTermsCategoriesLanguages
                        .Where(x => x.LanguageId.Equals((int)Utils.Enums.Enum_LanguageId.English))
                        .Include(x => x.Category)
                        .AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(oReq.SearchTerm))
            {
                query = query.Where(u => u.CategoryName.Contains(oReq.SearchTerm));
            }
            else
            {
                if (!string.IsNullOrEmpty(oReq.CategoryName))
                {
                    query = query.Where(u => u.CategoryName.Contains(oReq.CategoryName));
                }

                if (!string.IsNullOrEmpty(oReq.IsActive))
                {
                    query = query.Where(u => oReq.IsActive.Contains(u.Category.IsActive.ToString()));
                }
            }

            var result = query
                .Select(u => new LegalTermCategoryL
                {
                    Id = u.CategoryId,
                    CategoryName = u.CategoryName,
                    IsActive = u.Category.IsActive.GetValueOrDefault()
                });

            return result;

        }
    }
}
