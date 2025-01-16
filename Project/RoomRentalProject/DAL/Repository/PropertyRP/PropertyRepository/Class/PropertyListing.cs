using DAL.Shared.Class;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.PropertyRP.PropertyRepository.Class
{
    public class PropertyListing_REQ : FilterParameters
    {
        public int OwnerId { get; set; }

        public string Address { get; set; } = null!;

        public decimal Price { get; set; }

        public int PropertyType { get; set; }

        public decimal? AreaSize { get; set; }

        public decimal? Latitude { get; set; }

        public decimal? Longitude { get; set; }

        public int PropertyStatus { get; set; }

        public int ApprovalStatus { get; set; }

        public DateTime? ApprovedAt { get; set; }

        public DateTime CreatedAt { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }

    public class PropertyListing_RESP : ShareResp
    {
        public PagedResult<PropertyL> UserList = new PagedResult<PropertyL>();
    }

    public class PropertyL
    {
        public long Id { get; set; }
        
        public int OwnerId { get; set; }

        public string Address { get; set; } = null!;

        public decimal Price { get; set; }

        public int PropertyType { get; set; }

        public decimal? AreaSize { get; set; }

        public decimal? Latitude { get; set; }

        public decimal? Longitude { get; set; }

        public int PropertyStatus { get; set; }

        public int ApprovalStatus { get; set; }

        public DateTime? ApprovedAt { get; set; }

        public DateTime CreatedAt { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}