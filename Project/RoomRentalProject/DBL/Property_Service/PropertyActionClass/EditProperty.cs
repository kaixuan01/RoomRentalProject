using DBL.Shared;
using Utils.Enums;

namespace DBL.Property_Service.PropertyActionClass
{
    public class EditProperty_REQ
    {
        public long Id { get; set; }

        public string Address { get; set; } = null!;

        public decimal Price { get; set; }

        public Enum_PropertyType PropertyType { get; set; }

        public decimal? AreaSize { get; set; }

        public decimal? Latitude { get; set; }

        public decimal? Longitude { get; set; }

        public Enum_PropertyStatus PropertyStatus { get; set; } // Default SET Available

        public Enum_ApprovalStatus ApprovalStatus { get; set; } // Default SET None

        public string Remark { get; set; } = null!;

        public List<PropertyFacility_REQ> Facilities { get; set; }

        public List<PropertyLanguage_REQ> Languages { get; set; }

        public List<PropertyPhoto_REQ> Photos { get; set; }

        public string UpdatedBy { get; set; }
    }

    public class EditPropertyStatus_REQ
    {
        public long Id { get; set; }
        public Enum_PropertyStatus PropertyStatus { get; set; }
    }

    public class EditPropertyApprovalStatus_REQ
    {
        public long Id { get; set; }
        public Enum_ApprovalStatus ApprovalStatus { get; set; }
    }

    public class EditProperty_RESP : Common_RESP
    {
        public string Id { get; set; }
    }
}