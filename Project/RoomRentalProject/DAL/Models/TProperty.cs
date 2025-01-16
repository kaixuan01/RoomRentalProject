namespace DAL.Models;

public partial class TProperty
{
    public long Id { get; set; }

    public int OwnerId { get; set; }

    public string Address { get; set; } = null!;

    public decimal Price { get; set; }

    public int PropertyType { get; set; }

    public decimal? AreaSize { get; set; }

    public decimal? Latitude { get; set; }

    public decimal? Longitude { get; set; }

    public int PropertyStatus { get; set; }

    public int ApprovalStatus { get; set; }

    public string Remark { get; set; } = null!;

    public int? ApprovedBy { get; set; }

    public DateTime? ApprovedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public virtual TUser? ApprovedByNavigation { get; set; }

    public virtual TUser? CreatedByNavigation { get; set; }

    public virtual TUser Owner { get; set; } = null!;

    public virtual ICollection<TPropertyPhoto> TPropertyPhotos { get; set; } = new List<TPropertyPhoto>();

    public virtual TUser? UpdatedByNavigation { get; set; }
}