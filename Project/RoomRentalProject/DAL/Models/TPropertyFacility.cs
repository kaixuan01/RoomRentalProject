namespace DAL.Models;

public partial class TPropertyFacility
{
    public long Id { get; set; }

    public long PropertyId { get; set; }

    public int FacilityType { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public virtual TUser? CreatedByNavigation { get; set; }

    public virtual TProperty Property { get; set; } = null!;

    public virtual TUser? UpdatedByNavigation { get; set; }
}