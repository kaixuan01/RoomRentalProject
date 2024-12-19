﻿using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TUserToken
{
    public string Id { get; set; } = null!;

    public string UserId { get; set; } = null!;

    /// <summary>
    /// Store Base64 Encoded Token
    /// </summary>
    public string Token { get; set; } = null!;

    /// <summary>
    /// Type of the token
    /// 1. EmailConfirmation = Used for confirming a newly created user&apos;s email address.
    /// 2. ResetPassword = Used when a user requests a password reset after forgetting their password.
    /// </summary>
    public string TokenType { get; set; } = null!;

    public DateTime CreatedDateTime { get; set; }

    public DateTime ExpiresDateTime { get; set; }

    public bool IsUsed { get; set; }

    public virtual TUser User { get; set; } = null!;
}
