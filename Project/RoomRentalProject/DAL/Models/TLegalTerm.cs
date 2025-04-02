using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TLegalTerm
{
    public int Id { get; set; }

    public int? CategoryId { get; set; }

    public bool? IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public virtual TLegalTermsCategory? Category { get; set; }

    public virtual ICollection<TLegalTermsLanguage> TLegalTermsLanguages { get; set; } = new List<TLegalTermsLanguage>();
}
