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
    /// Type of the token
    /// 0 - Email Confirmation = Used for confirming a newly created user&apos;s email address.
    /// 1 - Reset Password = Used when a user requests a password reset after forgetting their password.
    /// </summary>
    public short TokenType { get; set; }

    public DateTime CreatedDateTime { get; set; }

    public DateTime ExpiresDateTime { get; set; }

    public bool IsUsed { get; set; }

    public virtual TUser User { get; set; } = null!;
}
