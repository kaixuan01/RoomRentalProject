using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TUserLoginHistory
{
    public string Id { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public DateTime? LoginDateTime { get; set; }

    public DateTime? LogoutDateTime { get; set; }

    public string? Remark { get; set; }

    public virtual TUser User { get; set; } = null!;
}
