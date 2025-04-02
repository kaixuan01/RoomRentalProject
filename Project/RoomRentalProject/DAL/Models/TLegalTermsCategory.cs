using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TLegalTermsCategory
{
    public int Id { get; set; }

    public bool? IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public virtual ICollection<TLegalTerm> TLegalTerms { get; set; } = new List<TLegalTerm>();

    public virtual ICollection<TLegalTermsCategoriesLanguage> TLegalTermsCategoriesLanguages { get; set; } = new List<TLegalTermsCategoriesLanguage>();
}
