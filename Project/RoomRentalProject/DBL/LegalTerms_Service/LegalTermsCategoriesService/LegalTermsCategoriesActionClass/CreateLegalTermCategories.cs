namespace DBL.LegalTerms_Service.LegalTermsCategoriesService.LegalTermsCategoriesActionClass;

public class CreateLegalTermCategories_REQ
{
    public LegalTermCategories LegalTermCategories { get; set; }

    public int? CreatedBy { get; set; }
}

public class CreateLegalTermCategories_RESP
{
    public string Code { get; set; }
    public string Message { get; set; }
    public int LegalTermCategoryId { get; set; }
}
