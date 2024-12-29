using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TEmail
{
    public long Id { get; set; }

    public string? EmailSubject { get; set; }

    public string? EmailContent { get; set; }

    public string? RecipientName { get; set; }

    public string? RecipientEmail { get; set; }

    /// <summary>
    /// Status of the email
    /// P - Pending
    /// C - Completed
    /// F - Failed
    /// </summary>
    public string? Status { get; set; }

    public string? Remark { get; set; }

    public int IcntFailedSend { get; set; }

    public DateTime? CreatedDateTime { get; set; }

    public DateTime? SentDateTime { get; set; }
}
