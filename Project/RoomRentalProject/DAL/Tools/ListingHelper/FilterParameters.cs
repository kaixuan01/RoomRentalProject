namespace DAL.Tools.ListingHelper
{
    public class FilterParameters
    {
        public string? SearchTerm { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public bool? SortDescending { get; set; } = false;

        private string? _sortBy;
        public string? SortBy
        {
            get => _sortBy;
            set => _sortBy = !string.IsNullOrEmpty(value)
                ? char.ToUpper(value[0]) + value.Substring(1)
                : value;
        }
    }

    public class PagedResult<T>
    {
        public List<T> Items { get; set; }
        public int TotalCount { get; set; }
    }
}
