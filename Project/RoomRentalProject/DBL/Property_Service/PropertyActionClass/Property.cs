using Microsoft.AspNetCore.Http;
using Utils.Enums;

namespace DBL.Property_Service.PropertyActionClass
{
    public class PropertyFacility_REQ
    {
        public Enum_FacilityType FacilityType { get; set; }
    }

    public class PropertyLanguage_REQ
    {
        public Enum_LanguageId LanguageId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class PropertyPhoto_REQ
    {
        public IFormFile Photo { get; set; }
        public Enum_PhotoType PhotoType { get; set; }
    }

    public class PropertyFacility_RESP
    {
        public Enum_FacilityType FacilityType { get; set; }
    }

    public class PropertyLanguage_RESP
    {
        public Enum_LanguageId LanguageId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class PropertyPhoto_RESP
    {
        public string PhotoFilePath { get; set; }
        public Enum_PhotoType PhotoType { get; set; }
    }
}