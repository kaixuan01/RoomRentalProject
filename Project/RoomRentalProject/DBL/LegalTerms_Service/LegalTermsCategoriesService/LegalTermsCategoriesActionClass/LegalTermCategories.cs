using System.ComponentModel.DataAnnotations;
using Utils.Enums;

namespace DBL.LegalTerms_Service.LegalTermsCategoriesService.LegalTermsCategoriesActionClass
{
    public class LegalTermCategories
    {
        public int Id { get; set; }
        public bool IsActive { get; set; } = true;

        [Required]
        [MinLength(1)]
        public List<LegalTermCategoriesLanguages> LegalTermCategoriesLanguages { get; set; }
    }

    public class LegalTermCategoriesLanguages
    {
        public Enum_LanguageId LanguageId { get; set; }
        public string CategoryName { get; set; }
    }
}
