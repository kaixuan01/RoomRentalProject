using Utils.Enums;

namespace DBL.LegalTerms_Service.LegalTermsService.LegalTermsActionClass
{
    public class LegalTerm
    {
        public int Id { get; set; }

        public bool IsActive { get; set; } = true;

        public List<LegalTermLanguages> LegalTermLanguages { get; set; }
    }

    public class LegalTermLanguages
    {
        public Enum_LanguageId LanguageId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
