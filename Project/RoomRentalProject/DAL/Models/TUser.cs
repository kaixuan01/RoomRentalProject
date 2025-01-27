using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TUser
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public short UserRoleId { get; set; }

    public int ICountFailedLogin { get; set; }

    public short Status { get; set; }

    public bool IsEmailVerified { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual EUserStatus StatusNavigation { get; set; } = null!;

    public virtual ICollection<TProperty> TPropertyApprovedByNavigations { get; set; } = new List<TProperty>();

    public virtual ICollection<TProperty> TPropertyCreatedByNavigations { get; set; } = new List<TProperty>();

    public virtual ICollection<TPropertyFacility> TPropertyFacilityCreatedByNavigations { get; set; } = new List<TPropertyFacility>();

    public virtual ICollection<TPropertyFacility> TPropertyFacilityUpdatedByNavigations { get; set; } = new List<TPropertyFacility>();

    public virtual ICollection<TPropertyLanguage> TPropertyLanguageCreatedByNavigations { get; set; } = new List<TPropertyLanguage>();

    public virtual ICollection<TPropertyLanguage> TPropertyLanguageUpdatedByNavigations { get; set; } = new List<TPropertyLanguage>();

    public virtual ICollection<TProperty> TPropertyOwners { get; set; } = new List<TProperty>();

    public virtual ICollection<TPropertyPhoto> TPropertyPhotoCreatedByNavigations { get; set; } = new List<TPropertyPhoto>();

    public virtual ICollection<TPropertyPhoto> TPropertyPhotoUpdatedByNavigations { get; set; } = new List<TPropertyPhoto>();

    public virtual ICollection<TProperty> TPropertyUpdatedByNavigations { get; set; } = new List<TProperty>();

    public virtual ICollection<TUserLoginHistory> TUserLoginHistories { get; set; } = new List<TUserLoginHistory>();

    public virtual ICollection<TUserToken> TUserTokens { get; set; } = new List<TUserToken>();

    public virtual EUserRole UserRole { get; set; } = null!;
}
