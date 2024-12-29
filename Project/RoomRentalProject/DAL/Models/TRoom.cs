using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TRoom
{
    public long Id { get; set; }

    public int OwnerId { get; set; }

    public string Address { get; set; } = null!;

    public decimal Price { get; set; }

    public string? RoomType { get; set; }

    public decimal? AreaSize { get; set; }

    public string? AdditionalServices { get; set; }

    public bool IsAvailable { get; set; }

    public bool IsApproved { get; set; }

    public int? ApprovedBy { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public virtual TUser? ApprovedByNavigation { get; set; }

    public virtual TUser? CreatedByNavigation { get; set; }

    public virtual TUser Owner { get; set; } = null!;

    public virtual ICollection<TRoomPhoto> TRoomPhotos { get; set; } = new List<TRoomPhoto>();

    public virtual TUser? UpdatedByNavigation { get; set; }
}
