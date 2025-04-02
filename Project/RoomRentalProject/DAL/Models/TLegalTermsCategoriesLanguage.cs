using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TLegalTermsCategoriesLanguage
{
    public int Id { get; set; }

    public int CategoryId { get; set; }

    public int LanguageId { get; set; }

    public string CategoryName { get; set; } = null!;

    public string? Description { get; set; }

    public virtual TLegalTermsCategory Category { get; set; } = null!;
}
