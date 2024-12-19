using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace DAL.Tools.ListingHelper
{
    public class ListingHelper<TEntity> : IListingHelper<TEntity> where TEntity : class
    {
        private readonly AppDbContext _context;

        public ListingHelper(AppDbContext context)
        {
            _context = context;
        }

        #region [ Get Page List with Entity ]

        public async Task<PagedResult<TEntity>> GetPagedListAsync(FilterParameters parameters, bool includeForeignRelationship = false)
        {
            var query = _context.Set<TEntity>().AsQueryable();

            if (includeForeignRelationship)
            {
                // Automatically include all navigation properties (foreign key relationships)
                var navigationProperties = _context.Model.FindEntityType(typeof(TEntity))
                                                    .GetNavigations()
                                                    .Select(n => n.Name);

                foreach (var navigationProperty in navigationProperties)
                {
                    query = query.Include(navigationProperty);
                }
            }

            if (!string.IsNullOrEmpty(parameters.SearchTerm))
            {
                query = query.SearchByFields(parameters.SearchTerm);
            }

            if (!string.IsNullOrEmpty(parameters.SortBy) && parameters.SortDescending.HasValue)
            {
                // Apply sorting based on SortBy and SortDescending
                query = query.OrderByProperty(parameters.SortBy, (bool)parameters.SortDescending);
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((parameters.PageNumber - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .AsNoTracking()  // Ensure no tracking to avoid unintended side effects
                .ToListAsync();

            return new PagedResult<TEntity>
            {
                Items = items,
                TotalCount = totalCount
            };
        }

        #endregion

        #region [ Get Page List with Dynamic ]

        public async Task<PagedResult<dynamic>> GetPagedListDynamicAsync(FilterParameters parameters, bool includeForeignRelationship = false, params string[] excludeProperties)
        {
            var query = _context.Set<TEntity>().AsQueryable();


            if (!string.IsNullOrEmpty(parameters.SearchTerm))
            {
                query = query.SearchByFields(parameters.SearchTerm);
            }

            if (!string.IsNullOrEmpty(parameters.SortBy) && parameters.SortDescending.HasValue)
            {
                query = query.OrderByProperty(parameters.SortBy, (bool)parameters.SortDescending);
            }

            var totalCount = await query.CountAsync();

            // Dynamically select properties excluding the specified ones
            var properties = typeof(TEntity).GetProperties()
                .Where(p => !excludeProperties.Contains(p.Name))
                .Select(p => p.Name);

            if (!includeForeignRelationship)
            {
                var navigationProperties = _context.Model.FindEntityType(typeof(TEntity))
                                                    .GetNavigations()
                                                    .Select(n => n.Name);

                // Filter out the properties that should be excluded
                properties = properties
                    .Where(p => !navigationProperties.Contains(p))
                    .ToList();
            }

            var queryResult = query.Select($"new({string.Join(",", properties)})");

            var items = await queryResult
                .Skip((parameters.PageNumber - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .ToDynamicListAsync();

            return new PagedResult<dynamic>
            {
                Items = items,
                TotalCount = totalCount
            };
        }

        #endregion
    }
}
