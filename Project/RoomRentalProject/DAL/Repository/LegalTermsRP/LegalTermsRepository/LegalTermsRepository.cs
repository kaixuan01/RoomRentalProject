using DAL.Models;
using DAL.Repository.LegalTermsRP.LegalTermsCategoriesRepository.Class;
using DAL.Repository.LegalTermsRP.LegalTermsRepository.Class;
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

        public async Task<IQueryable<LegalTermL>> GetLegalTermsListing(LegalTermsListing_REQ oReq)
        {
            var englishLangId = (int)Utils.Enums.Enum_LanguageId.English;

            var query = _appDbContext.TLegalTermsLanguages
                .Where(x => x.LanguageId == englishLangId);

            // Apply either SearchTerm or Title filter, but not both
            if (!string.IsNullOrEmpty(oReq.SearchTerm))
            {
                query = query.Where(x => x.Title.Contains(oReq.SearchTerm));
            }
            else
            {
                if (!string.IsNullOrEmpty(oReq.Title))
                {
                    query = query.Where(x => oReq.Title.Contains(x.Title));
                }

                if (!string.IsNullOrEmpty(oReq.IsActive))
                {
                    var activeList = oReq.IsActive
                        .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                        .Select(val => bool.TryParse(val, out var parsed) ? parsed : (bool?)null)
                        .Where(val => val.HasValue)
                        .Select(val => val.Value)
                        .ToList();

                    if (activeList.Any())
                    {
                        query = query.Where(u => activeList.Contains(u.LegalTerm.IsActive ?? false));
                    }
                }
            }

            var result = query.Select(x => new LegalTermL
            {
                Id = x.LegalTerm.Id,
                Title = x.Title,
                CategoryName = x.LegalTerm.Category.TLegalTermsCategoriesLanguages
                                .Where(c => c.LanguageId == englishLangId)
                                .Select(c => c.CategoryName)
                                .FirstOrDefault(),
                IsActive = x.LegalTerm.IsActive.GetValueOrDefault()
            });

            return result;
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
