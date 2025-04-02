using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TLegalTermsLanguage
{
    public int Id { get; set; }

    public int LegalTermId { get; set; }

    public int LanguageId { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public virtual TLegalTerm LegalTerm { get; set; } = null!;
}
