using DAL.Shared.Class;
using DAL.Tools.ListingHelper;
using Utils.Enums;

namespace DAL.Repository.PropertyRP.PropertyRepository.Class
{
    public class PropertyListing_REQ : FilterParameters
    {
        public int? OwnerId { get; set; }

        public string Address { get; set; } = null!;

        public decimal? FromPrice { get; set; }

        public decimal? ToPrice { get; set; }

        public List<Enum_PropertyType>? PropertyTypes { get; set; }

        public decimal? FromAreaSize { get; set; }

        public decimal? ToAreaSize { get; set; }

        public decimal? FromLatitude { get; set; }

        public decimal? ToLatitude { get; set; }

        public decimal? FromLongitude { get; set; }

        public decimal? ToLongitude { get; set; }

        public List<Enum_PropertyStatus>? PropertyStatuses { get; set; }

        public List<Enum_ApprovalStatus>? ApprovalStatuses { get; set; }

        public DateTime? FromApprovedAt { get; set; }

        public DateTime? ToApprovedAt { get; set; }

        public DateTime? FromCreatedAt { get; set; }

        public DateTime? ToCreatedAt { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? FromUpdatedAt { get; set; }

        public DateTime? ToUpdatedAt { get; set; }

        public Enum_LanguageId LanguageId { get; set; }

        public List<Enum_FacilityType> FacilityTypes { get; set; }

        public List<long> PropertyIds { get; set; }
    }

    public class PropertyListing_RESP : ShareResp
    {
        public PagedResult<PropertyL> PropertyList = new PagedResult<PropertyL>();
    }

    public class PropertyL
    {
        public long Id { get; set; }

        public int OwnerId { get; set; }

        public string Address { get; set; } = null!;

        public decimal Price { get; set; }

        public string PropertyType { get; set; }

        public decimal? AreaSize { get; set; }

        public decimal? Latitude { get; set; }

        public decimal? Longitude { get; set; }

        public string PropertyStatus { get; set; }

        public string ApprovalStatus { get; set; }

        public DateTime? ApprovedAt { get; set; }

        public DateTime CreatedAt { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public List<PropertyPhotoLItem> PropertyPhotos { get; set; }

        public List<Enum_FacilityType> FacilityTypes { get; set; }

        public List<PropertyLanguageLItem> PropertyLanguages { get; set; }
    }

    public class PropertyPhotoLItem
    {
        public Enum_PhotoType PhotoType { get; set; }
        public string PhotoFilePath { get; set; }
    }

    public class PropertyLanguageLItem
    {
        public Enum_LanguageId LanguageId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}