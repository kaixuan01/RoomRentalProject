using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TAuditTrail
{
    public long Id { get; set; }

    public string Module { get; set; } = null!;

    public string TableName { get; set; } = null!;

    public string Action { get; set; } = null!;

    public string? Username { get; set; }

    public string? Remark { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<TAuditTrailDetail> TAuditTrailDetails { get; set; } = new List<TAuditTrailDetail>();
}
