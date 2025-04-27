namespace DBL.LegalTerms_Service.LegalTermsService.LegalTermsActionClass
{
    public class EditLegalTerm_REQ
    {
        public LegalTerm LegalTerm { get; set; }

        public int? UpdatedBy { get; set; }
    }

    public class EditLegalTerm_RESP
    {
        public string Code { get; set; }
        public string Message { get; set; }
    }
}
