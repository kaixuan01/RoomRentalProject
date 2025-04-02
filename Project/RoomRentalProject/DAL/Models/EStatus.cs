using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class EStatus
{
    public short Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<TBooking> TBookings { get; set; } = new List<TBooking>();

    public virtual ICollection<TEmail> TEmails { get; set; } = new List<TEmail>();
}
