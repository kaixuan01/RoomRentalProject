namespace DAL.Tools.ListingHelper
{
    public interface IListingHelper<TEntity> where TEntity : class
    {
        /// <summary>
        /// Retrieves a paginated list of entities, with optional filtering and sorting, for a specified entity type.
        /// 
        /// This helper function combines multiple features to support efficient data retrieval in a paginated format:
        /// 
        /// 1. **Filtering by Search Term:** If a search term is provided, the function dynamically filters the results based on the term.
        ///    It checks all string properties of the entity and includes records where the search term is found in any of these properties.
        ///    This approach ensures that the search functionality is flexible and automatically adapts to the entity's properties.
        /// 
        /// 2. **Dynamic Sorting:** The function allows dynamic sorting based on a specified property name and order (ascending/descending).
        ///    It uses reflection to build the sorting expression, making it adaptable to any entity and property.
        /// 
        /// 3. **Paging:** The function supports pagination by skipping a specified number of records and returning a subset based on the page size.
        /// 
        /// **Parameters:**
        /// - `parameters`: An object containing filtering, sorting, and paging information such as `SearchTerm`, `SortBy`, `SortDescending`, `PageNumber`, and `PageSize`.
        /// 
        /// **Returns:**
        /// - A `PagedResult<TEntity>` object that contains the paginated list of entities and the total count of records.
        /// 
        /// **Usage:**
        /// This function is designed to be reusable across different entities in the application. It provides a standardized way to handle
        /// listing operations with filtering, sorting, and paging, ensuring consistency and reducing the need for repetitive code.
        /// </summary>
        Task<PagedResult<dynamic>> GetPagedListDynamicAsync(FilterParameters parameters, bool includeForeignRelationship = false, params string[] excludeProperties);
        Task<PagedResult<TEntity>> GetPagedListAsync(FilterParameters parameters, bool includeForeignRelationship = false);

    }
}
