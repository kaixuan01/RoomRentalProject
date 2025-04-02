using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TBooking
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public long PropertyId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public short Status { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public virtual TProperty Property { get; set; } = null!;

    public virtual EStatus StatusNavigation { get; set; } = null!;

    public virtual TUser User { get; set; } = null!;
}
