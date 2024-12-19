﻿using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TAuditTrail
{
    public string Id { get; set; } = null!;

    public string Module { get; set; } = null!;

    public string TableName { get; set; } = null!;

    public string Action { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string? Remark { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<TAuditTrailDetail> TAuditTrailDetails { get; set; } = new List<TAuditTrailDetail>();
}
