using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class EUserStatus
{
    public short Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<TUser> TUsers { get; set; } = new List<TUser>();
}
