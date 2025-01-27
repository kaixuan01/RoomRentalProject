using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TPropertyPhoto
{
    public long Id { get; set; }

    public long PropertyId { get; set; }

    public string PhotoFilePath { get; set; } = null!;

    public int PhotoType { get; set; }

    public virtual TProperty Property { get; set; } = null!;
}
