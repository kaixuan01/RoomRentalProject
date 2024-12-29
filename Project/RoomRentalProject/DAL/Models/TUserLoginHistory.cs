using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TUserLoginHistory
{
    public long Id { get; set; }

    public int UserId { get; set; }

    public DateTime? LoginDateTime { get; set; }

    public DateTime? LogoutDateTime { get; set; }

    public string? Remark { get; set; }

    public virtual TUser User { get; set; } = null!;
}
