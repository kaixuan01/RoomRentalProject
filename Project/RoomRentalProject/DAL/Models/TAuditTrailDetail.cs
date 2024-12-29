using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TAuditTrailDetail
{
    public long Id { get; set; }

    public long AuditTrailId { get; set; }

    public string Field { get; set; } = null!;

    public string? OriginalData { get; set; }

    public string? NewData { get; set; }

    public virtual TAuditTrail AuditTrail { get; set; } = null!;
}
