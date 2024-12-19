using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TUser
{
    public string Id { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    /// <summary>
    /// User role id in E_UserRole table
    /// </summary>
    public int UserRoleId { get; set; }

    /// <summary>
    /// Used to count user login failed attempt.
    /// </summary>
    public int ICountFailedLogin { get; set; }

    /// <summary>
    /// User Status
    /// False (0) - Active
    /// True (1)  - Blocked
    /// </summary>
    public bool IsBlocked { get; set; }

    public bool IsEmailVerified { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<TUserLoginHistory> TUserLoginHistories { get; set; } = new List<TUserLoginHistory>();

    public virtual ICollection<TUserToken> TUserTokens { get; set; } = new List<TUserToken>();

    public virtual EUserRole UserRole { get; set; } = null!;
}
