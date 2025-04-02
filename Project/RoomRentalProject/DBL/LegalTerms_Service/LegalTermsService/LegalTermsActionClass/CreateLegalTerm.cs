namespace DBL.LegalTerms_Service.LegalTermsService.LegalTermsActionClass
{
    public class CreateLegalTerm_REQ
    {
        public int LegalTermCategoryId { get; set; }

        public LegalTerm LegalTerm { get; set; }

        public int? CreatedBy { get; set; }
    }

    public class CreateLegalTerm_RESP
    {
        public string Code { get; set; }
        public string Message { get; set; }
    }
}
