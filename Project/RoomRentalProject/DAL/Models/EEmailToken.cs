using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class EEmailToken
{
    public short Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<TUserToken> TUserTokens { get; set; } = new List<TUserToken>();
}
