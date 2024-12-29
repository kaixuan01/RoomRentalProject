using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TRoomPhoto
{
    public long Id { get; set; }

    public long RoomId { get; set; }

    public string Photo { get; set; } = null!;

    public virtual TRoom Room { get; set; } = null!;
}
