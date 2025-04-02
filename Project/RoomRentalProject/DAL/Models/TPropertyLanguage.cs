using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TPropertyLanguage
{
    public long Id { get; set; }

    public long PropertyId { get; set; }

    public int LanguageId { get; set; }

    public string Name { get; set; } = null!;

    public string? PropertyDescription { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public virtual TUser? CreatedByNavigation { get; set; }

    public virtual TProperty Property { get; set; } = null!;

    public virtual TUser? UpdatedByNavigation { get; set; }
}
