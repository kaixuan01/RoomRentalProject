using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TUserToken
{
    public long Id { get; set; }

    public int UserId { get; set; }

    /// <summary>
    /// Store Base64 Encoded Token
    /// </summary>
    public string Token { get; set; } = null!;

    /// <summary>
    /// Please refer E_EmailToken table
    /// </summary>
    public short TokenType { get; set; }

    public DateTime CreatedDateTime { get; set; }

    public DateTime ExpiresDateTime { get; set; }

    public bool IsUsed { get; set; }

    public virtual EEmailToken TokenTypeNavigation { get; set; } = null!;

    public virtual TUser User { get; set; } = null!;
}
