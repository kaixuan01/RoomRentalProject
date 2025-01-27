using DBL.Shared;
using System.ComponentModel.DataAnnotations;
using Utils.Enums;

namespace DBL.Property_Service.PropertyActionClass
{
    public class CreateProperty_REQ
    {
        [Required]
        public int OwnerId { get; set; }

        [Required]
        public string Address { get; set; } = null!;

        [Required]
        public decimal Price { get; set; }

        [Required]
        public Enum_PropertyType PropertyType { get; set; }

        [Required]
        public decimal? AreaSize { get; set; }

        [Required]
        public decimal? Latitude { get; set; }

        [Required]
        public decimal? Longitude { get; set; }

        public Enum_PropertyStatus PropertyStatus { get; set; } // Default SET Available

        public Enum_ApprovalStatus ApprovalStatus { get; set; } // Default SET None

        public string Remark { get; set; } = null!;

        public List<PropertyFacility_REQ> Facilities { get; set; }

        [Required]
        [MinLength(1)]
        public List<PropertyLanguage_REQ> Languages { get; set; }

        [Required]
        [MinLength(1)]
        public List<PropertyPhoto_REQ> Photos { get; set; }

        public string CreatedBy { get; set; }
    }

    public class CreateProperty_RESP : Common_RESP
    {
        public long Id { get; set; }
    }
}